import { Component } from '@angular/core';
import { OpeniisUploaderComponent } from '../components/uploader/uploader.component';
import { FileUploadItem, UploadConfig } from '../components/uploader';
import { TranslateModule } from '@ngx-translate/core';

@Component({
  selector: 'app-uploader-sec',
  template: `
    <!-- Sección de Cargador de Archivos -->
    <section id="basic-uploader" class="demo-section">
      <h2>{{ 'uploader.cargador_de_archivos' | translate }}</h2>

      <div class="demo-subsection">
        <h3>{{ 'uploader.variantes_básicas' | translate }}</h3>
        <div class="demo-grid">
          <div class="demo-item">
            <h4>{{ 'uploader.cargador_de_archivos_básico' | translate }}</h4>
            <openiis-uploader
              variant="basic"
              [config]="basicUploadConfig"
              title="{{ 'uploader.cargar_archivos' | translate }}"
              description="{{
                'uploader.cualquier_tipo_de_archivo' | translate
              }}"
              selectFile="{{ 'uploader.seleccionar_archivos' | translate }}"
              removeTooltipFile="{{ 'uploader.eliminar_archivo' | translate }}"
              clearAllText="{{ 'uploader.limpiar_todo' | translate }}"
              (filesAdded)="onFilesAdded($event)"
            >
            </openiis-uploader>
          </div>

          <div class="demo-item">
            <h4>{{ 'uploader.cargador_de_archivos_compacto' | translate }}</h4>
            <openiis-uploader
              variant="compact"
              size="sm"
              [config]="compactUploadConfig"
              selectFile="{{ 'uploader.seleccionar_archivos' | translate }}"
              removeTooltipFile="{{ 'uploader.eliminar_archivo' | translate }}"
              clearAllText="{{ 'uploader.limpiar_todo' | translate }}"
              (filesAdded)="onFilesAdded($event)"
            >
            </openiis-uploader>
          </div>
        </div>
      </div>

      <div class="demo-subsection">
        <h3>{{ 'uploader.variantes_especializadas' | translate }}</h3>
        <div class="demo-grid">
          <div class="demo-item">
            <h4>{{ 'uploader.galería_de_imágenes' | translate }}</h4>
            <openiis-uploader
              variant="image-preview"
              size="lg"
              [config]="imageUploadConfig"
              title="{{ 'uploader.galería_de_fotos' | translate }}"
              description="{{ 'uploader.múltiples_archivos' | translate }}"
              selectFile="{{ 'uploader.seleccionar_archivos' | translate }}"
              removeTooltipFile="{{ 'uploader.eliminar_archivo' | translate }}"
              clearAllText="{{ 'uploader.limpiar_todo' | translate }}"
              (filesAdded)="onFilesAdded($event)"
            >
            </openiis-uploader>
          </div>

          <div class="demo-item">
            <h4>{{ 'uploader.avatar_de_usuario' | translate }}</h4>
            <div style="max-width: 200px; margin: 0 auto">
              <openiis-uploader
                variant="avatar"
                [config]="avatarUploadConfig"
                selectFile="{{ 'uploader.seleccionar_archivos' | translate }}"
                removeTooltipFile="{{
                  'uploader.eliminar_archivo' | translate
                }}"
                clearAllText="{{ 'uploader.limpiar_todo' | translate }}"
                (filesAdded)="onAvatarUploaded($event[0])"
              >
              </openiis-uploader>
            </div>
          </div>
        </div>
      </div>

      <div id="advanced-uploader" class="demo-subsection">
        <h3>{{ 'uploader.configuraciones_avanzadas' | translate }}</h3>
        <div class="demo-grid">
          <div class="demo-item">
            <h4>{{ 'uploader.documentos_oficiales' | translate }}</h4>
            <openiis-uploader
              variant="multi-file"
              [config]="documentUploadConfig"
              title="{{ 'uploader.cargar_documentos' | translate }}"
              description="{{ 'uploader.currículum_y_documentos' | translate }}"
              selectFile="{{ 'uploader.seleccionar_archivos' | translate }}"
              removeTooltipFile="{{ 'uploader.eliminar_archivo' | translate }}"
              clearAllText="{{ 'uploader.limpiar_todo' | translate }}"
              [showInfo]="true"
              (filesAdded)="onDocumentsAdded($event)"
            >
            </openiis-uploader>
          </div>

          <div class="demo-item">
            <h4>{{ 'uploader.archivos_múltiples' | translate }}</h4>
            <openiis-uploader
              variant="basic"
              size="md"
              [config]="{
                maxFileSize: 5,
                allowedTypes: ['image/*'],
                maxFiles: 3
              }"
              title="{{ 'uploader.múltiples_archivos' | translate }}"
              description="{{ 'uploader.archivos_múltiples' | translate }}"
              selectFile="{{ 'uploader.seleccionar_archivos' | translate }}"
              removeTooltipFile="{{ 'uploader.eliminar_archivo' | translate }}"
              clearAllText="{{ 'uploader.limpiar_todo' | translate }}"
              (filesAdded)="onFilesAdded($event)"
            >
            </openiis-uploader>
          </div>
        </div>
      </div>

      <div class="demo-subsection">
        <h3>{{ 'uploader.tamaños_y_estados' | translate }}</h3>
        <div class="demo-grid">
          <div class="demo-item">
            <h4>{{ 'uploader.tamaño_pequeño' | translate }}</h4>
            <openiis-uploader
              variant="basic"
              size="sm"
              [config]="{
                maxFileSize: 2,
                maxFiles: 2
              }"
              title="{{ 'uploader.cargador_de_archivos_pequeño' | translate }}"
              selectFile="{{ 'uploader.seleccionar_archivos' | translate }}"
              removeTooltipFile="{{ 'uploader.eliminar_archivo' | translate }}"
              clearAllText="{{ 'uploader.limpiar_todo' | translate }}"
              [showInfo]="false"
            >
            </openiis-uploader>
          </div>

          <div class="demo-item">
            <h4>{{ 'uploader.tamaño_extra_grande' | translate }}</h4>
            <openiis-uploader
              variant="basic"
              size="xl"
              [config]="{
                maxFileSize: 50,
                maxFiles: 10
              }"
              title="{{ 'uploader.área_de_carga_grande' | translate }}"
              description="{{ 'uploader.múltiples_archivos' | translate }}"
              selectFile="{{ 'uploader.seleccionar_archivos' | translate }}"
              removeTooltipFile="{{ 'uploader.eliminar_archivo' | translate }}"
              clearAllText="{{ 'uploader.limpiar_todo' | translate }}"
            >
            </openiis-uploader>
          </div>

          <div class="demo-item">
            <h4>{{ 'uploader.estado_deshabilitado' | translate }}</h4>
            <openiis-uploader
              variant="basic"
              size="md"
              [disabled]="true"
              title="{{
                'uploader.cargador_de_archivos_deshabilitado' | translate
              }}"
              description="{{ 'uploader.archivos_múltiples' | translate }}"
              selectFile="{{ 'uploader.seleccionar_archivos' | translate }}"
              removeTooltipFile="{{ 'uploader.eliminar_archivo' | translate }}"
              clearAllText="{{ 'uploader.limpiar_todo' | translate }}"
            >
            </openiis-uploader>
          </div>
        </div>
      </div>

      <div id="real-cases" class="demo-subsection">
        <h3>{{ 'uploader.casos_de_uso_reales' | translate }}</h3>
        <div class="demo-grid">
          <div class="demo-item">
            <h4>{{ 'uploader.currículum_y_documentos' | translate }}</h4>
            <openiis-uploader
              variant="basic"
              [config]="{
                maxFileSize: 10,
                allowedTypes: ['application/pdf', '.doc', '.docx'],
                maxFiles: 3
              }"
              title="{{ 'uploader.carga_tu_cv_y_documentos' | translate }}"
              description="{{ 'uploader.documentos_oficiales' | translate }}"
              selectFile="{{ 'uploader.seleccionar_archivos' | translate }}"
              removeTooltipFile="{{ 'uploader.eliminar_archivo' | translate }}"
              clearAllText="{{ 'uploader.limpiar_todo' | translate }}"
              (filesAdded)="onFilesAdded($event)"
            >
            </openiis-uploader>
          </div>

          <div class="demo-item">
            <h4>{{ 'uploader.portafolio_creativo' | translate }}</h4>
            <openiis-uploader
              variant="image-preview"
              [config]="{
                maxFileSize: 10,
                allowedTypes: ['image/*'],
                maxFiles: 20,
                enableResize: true,
                compressionQuality: 0.9
              }"
              title="{{ 'uploader.carga_tu_portafolio' | translate }}"
              description="{{ 'uploader.galería_de_imágenes' | translate }}"
              selectFile="{{ 'uploader.seleccionar_archivos' | translate }}"
              removeTooltipFile="{{ 'uploader.eliminar_archivo' | translate }}"
              clearAllText="{{ 'uploader.limpiar_todo' | translate }}"
              (filesAdded)="onGalleryUploaded($event)"
            >
            </openiis-uploader>
          </div>

          <div class="demo-item">
            <h4>{{ 'uploader.archivos_mixtos' | translate }}</h4>
            <openiis-uploader
              variant="multi-file"
              [config]="{
                maxFileSize: 25,
                allowedTypes: ['*'],
                maxFiles: 15
              }"
              title="{{ 'uploader.cualquier_tipo_de_archivo' | translate }}"
              description="{{ 'uploader.archivos_múltiples' | translate }}"
              selectFile="{{ 'uploader.seleccionar_archivos' | translate }}"
              removeTooltipFile="{{ 'uploader.eliminar_archivo' | translate }}"
              clearAllText="{{ 'uploader.limpiar_todo' | translate }}"
              (filesAdded)="onFilesAdded($event)"
            >
            </openiis-uploader>
          </div>
        </div>
      </div>
    </section>
  `,
  imports: [OpeniisUploaderComponent, TranslateModule],
})
export class UploaderSecComponent {
  basicUploadConfig: UploadConfig = {
    maxFileSize: 10,
    allowedTypes: ['image/*', 'application/pdf', '.doc', '.docx'],
    maxFiles: 5,
  };

  imageUploadConfig: UploadConfig = {
    maxFileSize: 5,
    allowedTypes: ['image/*'],
    maxFiles: 10,
    enableResize: true,
    compressionQuality: 0.8,
  };

  documentUploadConfig: UploadConfig = {
    maxFileSize: 20,
    allowedTypes: [
      'application/pdf',
      '.doc',
      '.docx',
      '.xls',
      '.xlsx',
      '.ppt',
      '.pptx',
    ],
    maxFiles: 5,
  };

  avatarUploadConfig: UploadConfig = {
    maxFileSize: 2,
    allowedTypes: ['image/jpeg', 'image/png'],
    maxFiles: 1,
    enableResize: true,
    maxWidth: 400,
    maxHeight: 400,
  };

  compactUploadConfig: UploadConfig = {
    maxFileSize: 5,
    allowedTypes: ['*'],
    maxFiles: 3,
  };

  onFilesAdded(files: FileUploadItem[]): void {
    console.log('Archivos agregados:', files);
    files.forEach((fileItem) => {
      console.log(`Archivo: ${fileItem.name}, Tamaño: ${fileItem.size} bytes`);
    });
  }

  onFileRemoved(fileId: string): void {
    console.log('Archivo eliminado:', fileId);
  }

  onFilesCleared(): void {
    console.log('Todos los archivos eliminados');
  }

  onUploadCompleted(files: FileUploadItem[]): void {
    console.log('Archivos listos:', files);
    this.showToastMessage('success');
  }

  onUploadError(error: { file: FileUploadItem; error: string }): void {
    console.log('Error con archivo:', error);
    this.showToastMessage('danger');
  }

  onAvatarUploaded(file: FileUploadItem): void {
    console.log('Avatar seleccionado:', file);
    this.showToastMessage('success');
  }

  onDocumentsAdded(files: FileUploadItem[]): void {
    console.log('Documentos agregados:', files);
  }

  onGalleryUploaded(files: FileUploadItem[]): void {
    console.log('Imágenes agregadas a galería:', files);
  }

  /* ===== TOAST METHODS ===== */
  showSuccessToast = false;
  showWarningToast = false;
  showDangerToast = false;
  showInfoToast = false;

  showToastMessage(type: string): void {
    switch (type) {
      case 'success':
        this.showSuccessToast = true;
        break;
      case 'warning':
        this.showWarningToast = true;
        break;
      case 'danger':
        this.showDangerToast = true;
        break;
      case 'info':
        this.showInfoToast = true;
        break;
    }
  }
}
