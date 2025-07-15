import {
  Component,
  Input,
  Output,
  EventEmitter,
  ChangeDetectionStrategy,
  OnInit,
  OnDestroy,
  ViewChild,
  ElementRef,
  ChangeDetectorRef,
} from '@angular/core';
import { CommonModule } from '@angular/common';
import { Subject } from 'rxjs';
import {
  OpeniisUploadService,
  UploadConfig,
  FileUploadItem,
} from '../services/upload.service';
import { OpeniisButtonComponent } from '../buttons/button.component';

/**
 * Tipos de variantes disponibles para el componente uploader
 */
export type UploaderVariant =
  | 'basic' // Uploader básico con funcionalidad estándar
  | 'image-preview' // Uploader con vista previa de imágenes
  | 'multi-file' // Uploader para múltiples archivos
  | 'compact' // Versión compacta del uploader
  | 'avatar'; // Uploader específico para avatares/fotos de perfil

/**
 * Tamaños disponibles para el componente
 */
export type UploaderSize = 'sm' | 'md' | 'lg' | 'xl';

/**
 * Componente para carga de archivos con múltiples variantes y configuraciones
 *
 * @example
 * <openiis-uploader
 *   variant="basic"
 *   [config]="{maxFileSize: 10, allowedTypes: ['image/*']}"
 *   title="Subir archivos"
 *   (filesAdded)="onFilesAdded($event)"
 * >
 * </openiis-uploader>
 */
@Component({
  selector: 'openiis-uploader',
  standalone: true,
  imports: [CommonModule, OpeniisButtonComponent],
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: `
    <div [class]="containerClasses" #dropZone>
      <!-- Input oculto -->
      <input
        #fileInput
        type="file"
        [accept]="acceptedTypesString"
        [multiple]="variant !== 'avatar'"
        (change)="onFileSelected($event)"
        style="display: none"
      />

      <!-- Avatar variant -->
      @if (variant === 'avatar') {
      <div class="avatar-uploader">
        <div class="avatar-preview" (click)="onDropZoneClick()">
          @if (files.length > 0 && files[0].thumbnailUrl) {
          <img
            [src]="files[0].thumbnailUrl"
            [alt]="files[0].name"
            class="avatar-image"
          />
          } @if (files.length === 0 && !isDragOver && !disabled) {
          <div class="avatar-placeholder">
            <span class="material-icons-outlined">person</span>
          </div>
          }
          <div class="avatar-overlay">
            <span class="material-icons-outlined">camera_alt</span>
          </div>
        </div>
      </div>
      }

      <!-- Otros variants -->
      @if (variant !== 'avatar') {
      <div class="upload-area">
        <!-- Drop zone -->
        <div
          class="drop-zone"
          [class.drag-over]="isDragOver"
          [class.disabled]="disabled"
          (click)="onDropZoneClick()"
          (dragover)="onDragOver($event)"
          (dragleave)="onDragLeave($event)"
          (drop)="onDrop($event)"
        >
          <div class="drop-zone-content">
            <span class="material-icons-outlined upload-icon"
              >cloud_upload</span
            >
            @if (title || getDefaultTitle()) {
            <h3 class="upload-title">
              {{ title || getDefaultTitle() }}
            </h3>
            } @if (description || getDefaultDescription()) {
            <p class="upload-description">
              {{ description || getDefaultDescription() }}
            </p>
            }
            <openiis-button
              type="outline-primary"
              text="{{ selectFile || 'Seleccionar archivos' }}"
              iconLeft="folder_open"
              size="sm"
              [disabled]="disabled"
              (clickEvent)="onButtonClick($event)"
            >
            </openiis-button>
            @if (showInfo && getInfoText()) {
            <p class="upload-info">
              {{ getInfoText() }}
            </p>
            }
          </div>
        </div>

        <!-- Lista de archivos -->
        @if (files.length > 0) {
        <div class="files-list">
          <!-- Vista de galería para imágenes -->
          @if (variant === 'image-preview') {
          <div class="image-grid">
            @for (file of files; track file.id) {
            <div class="image-item">
              <div class="image-preview">
                @if (file.thumbnailUrl) {
                <img
                  [src]="file.thumbnailUrl"
                  [alt]="file.name"
                  class="preview-image"
                />
                } @if (!file.thumbnailUrl) {
                <div class="preview-placeholder">
                  <span class="material-icons-outlined">image</span>
                </div>
                }
                <openiis-button
                  type="icon"
                  iconLeft="close"
                  size="xs"
                  tooltipText="{{ removeTooltipFile || 'Eliminar archivo' }}"
                  (clickEvent)="removeFile(file.id)"
                >
                </openiis-button>
              </div>
              <p class="file-name">{{ file.name }}</p>
            </div>
            }
          </div>
          }

          <!-- Vista de lista para otros variants -->
          @if (variant !== 'image-preview') {
          <div class="file-items">
            @for (file of files; track file.id) {
            <div class="file-item">
              <div class="file-info">
                <span class="material-icons-outlined file-icon">
                  {{ getFileIcon(file.type) }}
                </span>
                <div class="file-details">
                  <span class="file-name">{{ file.name }}</span>
                  <span class="file-size">{{ formatFileSize(file.size) }}</span>
                </div>
              </div>
              <openiis-button
                type="icon"
                iconLeft="close"
                size="xs"
                tooltipText="{{ removeTooltipFile || 'Eliminar archivo' }}"
                (clickEvent)="removeFile(file.id)"
              >
              </openiis-button>
            </div>
            }
          </div>
          }

          <!-- Acciones -->
          @if (variant !== 'compact') {
          <div class="upload-actions">
            <openiis-button
              type="outline-secondary"
              text="{{ clearAllText || 'Limpiar todo' }}"
              iconLeft="clear_all"
              size="sm"
              (clickEvent)="clearAll()"
            >
            </openiis-button>
            <span class="file-count">
              {{ files.length }} archivo{{ files.length === 1 ? '' : 's' }} ({{
                getTotalSize()
              }})
            </span>
          </div>
          }
        </div>
        }
      </div>
      }
    </div>
  `,
  styleUrls: ['./uploader.component.css'],
})
export class OpeniisUploaderComponent implements OnInit, OnDestroy {
  @ViewChild('fileInput') fileInput!: ElementRef<HTMLInputElement>;
  @ViewChild('dropZone') dropZone!: ElementRef<HTMLDivElement>;

  /** Tipo de variante del uploader */
  @Input() variant: UploaderVariant = 'basic';

  /** Tamaño del componente */
  @Input() size: UploaderSize = 'md';

  /** Estado deshabilitado */
  @Input() disabled: boolean = false;

  /** Configuración del uploader */
  @Input() config: UploadConfig = {};

  /** Título personalizado */
  @Input() title: string = '';

  /** Descripción personalizada */
  @Input() description: string = '';

  /** Mostrar información adicional */
  @Input() showInfo: boolean = true;

  /** Texto para el botón de selección de archivos */
  @Input() selectFile: string = 'Seleccionar archivos';

  /** Texto para el tooltip de eliminación de archivos */
  @Input() removeTooltipFile: string = 'Eliminar archivo';

  /** Texto para el botón de limpiar todo */
  @Input() clearAllText: string = 'Limpiar todo';

  /** Evento emitido cuando se agregan archivos */
  @Output() filesAdded = new EventEmitter<FileUploadItem[]>();

  /** Evento emitido cuando se elimina un archivo */
  @Output() fileRemoved = new EventEmitter<string>();

  /** Evento emitido cuando se limpian todos los archivos */
  @Output() filesCleared = new EventEmitter<void>();

  /** Lista de archivos cargados - ahora cada instancia tiene su propia lista */
  files: FileUploadItem[] = [];

  /** Estado de arrastre sobre la zona de drop */
  isDragOver = false;

  private destroy$ = new Subject<void>();

  constructor(
    private uploadService: OpeniisUploadService,
    private cdr: ChangeDetectorRef
  ) {}

  ngOnInit(): void {
    // Ya no nos suscribimos al servicio global, cada componente maneja sus propios archivos
  }

  ngOnDestroy(): void {
    this.destroy$.next();
    this.destroy$.complete();
  }

  /**
   * Obtiene las clases CSS del contenedor
   * @returns String con las clases CSS concatenadas
   */
  get containerClasses(): string {
    return [
      'openiis-uploader',
      `variant-${this.variant}`,
      `size-${this.size}`,
      this.disabled ? 'disabled' : '',
    ]
      .filter(Boolean)
      .join(' ');
  }

  /**
   * Obtiene los tipos de archivo aceptados en formato string
   * @returns String con los tipos de archivo aceptados
   */
  get acceptedTypesString(): string {
    return this.config.allowedTypes?.join(',') || '*';
  }

  /**
   * Maneja el clic en la zona de drop
   */
  onDropZoneClick(): void {
    if (!this.disabled) {
      this.fileInput.nativeElement.click();
    }
  }

  /**
   * Maneja el clic en el botón de selección
   * @param event Evento del clic
   */
  onButtonClick(event: any): void {
    event.stopPropagation();
    this.onDropZoneClick();
  }

  /**
   * Maneja la selección de archivos desde el input
   * @param event Evento de cambio del input
   */
  onFileSelected(event: Event): void {
    const target = event.target as HTMLInputElement;
    if (target.files && target.files.length > 0) {
      this.addFiles(target.files);
      target.value = '';
    }
  }

  /**
   * Maneja el evento dragover
   * @param event Evento de arrastre
   */
  onDragOver(event: DragEvent): void {
    if (this.disabled) return;

    event.preventDefault();
    event.stopPropagation();
    this.isDragOver = true;
  }

  /**
   * Maneja el evento dragleave
   * @param event Evento de arrastre
   */
  onDragLeave(event: DragEvent): void {
    if (this.disabled) return;

    event.preventDefault();
    event.stopPropagation();

    const rect = this.dropZone.nativeElement.getBoundingClientRect();
    const x = event.clientX;
    const y = event.clientY;

    if (x < rect.left || x > rect.right || y < rect.top || y > rect.bottom) {
      this.isDragOver = false;
    }
  }

  /**
   * Maneja el evento drop
   * @param event Evento de drop
   */
  onDrop(event: DragEvent): void {
    if (this.disabled) return;

    event.preventDefault();
    event.stopPropagation();
    this.isDragOver = false;

    const files = event.dataTransfer?.files;
    if (files && files.length > 0) {
      this.addFiles(files);
    }
  }

  /**
   * Agrega archivos al uploader (ahora maneja su propia lista)
   * @param fileList Lista de archivos a agregar
   */
  async addFiles(fileList: FileList): Promise<void> {
    const fileArray = Array.from(fileList);
    const effectiveConfig = { ...this.config };
    const maxFiles = effectiveConfig.maxFiles || 5;

    // Validar límite de archivos
    if (this.files.length + fileArray.length > maxFiles) {
      console.error(`Máximo ${maxFiles} archivos permitidos`);
      return;
    }

    const newItems: FileUploadItem[] = [];

    for (const file of fileArray) {
      // Validar archivo usando el servicio
      const validation = this.uploadService.validateFile(file, effectiveConfig);
      if (!validation.valid) {
        console.error(validation.error);
        continue;
      }

      const item: FileUploadItem = {
        id: this.generateId(),
        file: file,
        name: file.name,
        size: file.size,
        type: file.type,
      };

      // Generar preview para imágenes
      if (file.type.startsWith('image/')) {
        try {
          item.thumbnailUrl = await this.generatePreview(file);
        } catch (error) {
          console.error('Error generando preview:', error);
        }
      }

      newItems.push(item);
    }

    // Agregar a la lista local del componente
    this.files = [...this.files, ...newItems];
    this.cdr.detectChanges();

    // Emitir evento
    this.filesAdded.emit(newItems);
  }

  /**
   * Elimina un archivo por su ID (de la lista local)
   * @param id ID del archivo a eliminar
   */
  removeFile(id: string): void {
    this.files = this.files.filter((item) => item.id !== id);
    this.cdr.detectChanges();
    this.fileRemoved.emit(id);
  }

  /**
   * Limpia todos los archivos (de la lista local)
   */
  clearAll(): void {
    this.files = [];
    this.cdr.detectChanges();
    this.filesCleared.emit();
  }

  /**
   * Obtiene todos los archivos de esta instancia específica
   */
  getAllFiles(): { id: string; file: File; name: string }[] {
    return this.files.map((item) => ({
      id: item.id,
      file: item.file,
      name: item.name,
    }));
  }

  /**
   * Obtiene un archivo específico por ID
   */
  getFile(id: string): File | null {
    const item = this.files.find((item) => item.id === id);
    return item ? item.file : null;
  }

  /**
   * Calcula y formatea el tamaño total de los archivos
   * @returns String con el tamaño total formateado
   */
  getTotalSize(): string {
    const totalBytes = this.files.reduce((sum, file) => sum + file.size, 0);
    return this.formatFileSize(totalBytes);
  }

  /**
   * Formatea el tamaño de archivo en bytes a una unidad legible
   * @param bytes Tamaño en bytes
   * @returns String con el tamaño formateado
   */
  formatFileSize(bytes: number): string {
    if (bytes === 0) return '0 B';

    const k = 1024;
    const sizes = ['B', 'KB', 'MB', 'GB'];
    const i = Math.floor(Math.log(bytes) / Math.log(k));

    return parseFloat((bytes / Math.pow(k, i)).toFixed(1)) + ' ' + sizes[i];
  }

  /**
   * Obtiene el icono correspondiente al tipo MIME
   * @param mimeType Tipo MIME del archivo
   * @returns String con el nombre del icono
   */
  getFileIcon(mimeType: string): string {
    if (mimeType.startsWith('image/')) return 'image';
    if (mimeType.startsWith('video/')) return 'movie';
    if (mimeType.startsWith('audio/')) return 'music_note';
    if (mimeType.includes('pdf')) return 'picture_as_pdf';
    if (mimeType.includes('word') || mimeType.includes('document'))
      return 'description';
    if (mimeType.includes('sheet') || mimeType.includes('excel'))
      return 'table_chart';
    if (mimeType.includes('presentation') || mimeType.includes('powerpoint'))
      return 'slideshow';
    if (
      mimeType.includes('zip') ||
      mimeType.includes('rar') ||
      mimeType.includes('compressed')
    )
      return 'archive';
    if (mimeType.includes('text')) return 'article';
    return 'insert_drive_file';
  }

  /**
   * Obtiene el título por defecto según la variante
   * @returns String con el título por defecto
   */
  getDefaultTitle(): string {
    switch (this.variant) {
      case 'avatar':
        return 'Foto de perfil';
      case 'image-preview':
        return 'Subir imágenes';
      case 'multi-file':
        return 'Subir archivos';
      case 'compact':
        return '';
      default:
        return 'Subir archivos';
    }
  }

  /**
   * Obtiene la descripción por defecto según la variante
   * @returns String con la descripción por defecto
   */
  getDefaultDescription(): string {
    switch (this.variant) {
      case 'avatar':
        return '';
      case 'image-preview':
        return 'Arrastra imágenes aquí o haz clic para seleccionar';
      case 'compact':
        return '';
      default:
        return 'Arrastra archivos aquí o haz clic para seleccionar';
    }
  }

  /**
   * Obtiene el texto informativo sobre las restricciones de carga
   * @returns String con la información de restricciones
   */
  getInfoText(): string {
    const config = { ...this.config };
    const maxSize = config.maxFileSize || 10;
    const maxFiles = config.maxFiles || 5;
    const allowedTypes = config.allowedTypes;

    let info = `Máximo ${maxFiles} archivo${
      maxFiles === 1 ? '' : 's'
    }, ${maxSize}MB cada uno`;

    if (
      allowedTypes &&
      allowedTypes.length > 0 &&
      !allowedTypes.includes('*')
    ) {
      const types = allowedTypes
        .map((type) => {
          if (type.includes('/')) return type.split('/')[1].toUpperCase();
          return type.replace('.', '').toUpperCase();
        })
        .slice(0, 3)
        .join(', ');
      info += `. Tipos: ${types}${allowedTypes.length > 3 ? '...' : ''}`;
    }

    return info;
  }

  /**
   * Generar preview de imagen
   */
  private generatePreview(file: File): Promise<string> {
    return new Promise((resolve, reject) => {
      const reader = new FileReader();
      reader.onload = (e) => resolve(e.target?.result as string);
      reader.onerror = reject;
      reader.readAsDataURL(file);
    });
  }

  /**
   * Generar ID único
   */
  private generateId(): string {
    return Date.now().toString(36) + Math.random().toString(36).substr(2);
  }
}
