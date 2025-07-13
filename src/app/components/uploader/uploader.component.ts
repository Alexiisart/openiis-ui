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
} from '@angular/core';
import { CommonModule } from '@angular/common';
import { Subject, takeUntil } from 'rxjs';
import {
  OpeniisUploadService,
  UploadConfig,
  FileUploadItem,
} from '../../services/upload.service';
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
              text="Seleccionar archivos"
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
                  tooltipText="Eliminar archivo"
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
                tooltipText="Eliminar archivo"
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
              text="Limpiar todo"
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

  /** Evento emitido cuando se agregan archivos */
  @Output() filesAdded = new EventEmitter<FileUploadItem[]>();

  /** Evento emitido cuando se elimina un archivo */
  @Output() fileRemoved = new EventEmitter<string>();

  /** Evento emitido cuando se limpian todos los archivos */
  @Output() filesCleared = new EventEmitter<void>();

  /** Lista de archivos cargados */
  files: FileUploadItem[] = [];

  /** Estado de arrastre sobre la zona de drop */
  isDragOver = false;

  private destroy$ = new Subject<void>();

  constructor(private uploadService: OpeniisUploadService) {}

  ngOnInit(): void {
    this.uploadService.uploadQueue
      .pipe(takeUntil(this.destroy$))
      .subscribe((files) => {
        this.files = files;
      });
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
   * Agrega archivos al uploader
   * @param fileList Lista de archivos a agregar
   */
  addFiles(fileList: FileList): void {
    const effectiveConfig = { ...this.config };

    this.uploadService.addFiles(fileList, effectiveConfig).subscribe({
      next: (newFiles) => {
        this.filesAdded.emit(newFiles);
      },
      error: (error) => {
        console.error('Error adding files:', error);
      },
    });
  }

  /**
   * Elimina un archivo por su ID
   * @param id ID del archivo a eliminar
   */
  removeFile(id: string): void {
    this.uploadService.removeFile(id);
    this.fileRemoved.emit(id);
  }

  /**
   * Limpia todos los archivos
   */
  clearAll(): void {
    this.uploadService.clearQueue();
    this.filesCleared.emit();
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
}
