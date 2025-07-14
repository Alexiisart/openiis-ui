import { Component, Input } from '@angular/core';
import { OpeniisUploaderComponent } from '../components/uploader/uploader.component';
import { FileUploadItem, UploadConfig } from '../components/uploader';

@Component({
  selector: 'app-uploader-sec',
  template: `
    <!-- Sección de Uploader -->
    <section class="demo-section">
      <h2>Uploader</h2>

      <div class="demo-subsection">
        <h3>Variantes Básicas</h3>
        <div class="demo-grid">
          <div class="demo-item">
            <h4>Uploader Básico</h4>
            <openiis-uploader
              variant="basic"
              [config]="basicUploadConfig"
              title="Subir Archivos"
              description="Arrastra archivos aquí o haz clic para seleccionar"
              (filesAdded)="onFilesAdded($event)"
            >
            </openiis-uploader>
          </div>

          <div class="demo-item">
            <h4>Uploader Compacto</h4>
            <openiis-uploader
              variant="compact"
              size="sm"
              [config]="compactUploadConfig"
              (filesAdded)="onFilesAdded($event)"
            >
            </openiis-uploader>
          </div>
        </div>
      </div>

      <div class="demo-subsection">
        <h3>Variantes Especializadas</h3>
        <div class="demo-grid">
          <div class="demo-item">
            <h4>Galería de Imágenes</h4>
            <openiis-uploader
              variant="image-preview"
              size="lg"
              [config]="imageUploadConfig"
              title="Galería de Fotos"
              description="Solo imágenes - con preview automático"
              (filesAdded)="onFilesAdded($event)"
            >
            </openiis-uploader>
          </div>

          <div class="demo-item">
            <h4>Avatar de Usuario</h4>
            <div style="max-width: 200px; margin: 0 auto">
              <openiis-uploader
                variant="avatar"
                [config]="avatarUploadConfig"
                (filesAdded)="onAvatarUploaded($event[0])"
              >
              </openiis-uploader>
            </div>
          </div>
        </div>
      </div>

      <div class="demo-subsection">
        <h3>Configuraciones Avanzadas</h3>
        <div class="demo-grid">
          <div class="demo-item">
            <h4>Documentos Oficiales</h4>
            <openiis-uploader
              variant="multi-file"
              [config]="documentUploadConfig"
              title="Subir Documentos"
              description="PDF, Word, Excel y PowerPoint"
              [showInfo]="true"
              (filesAdded)="onDocumentsAdded($event)"
            >
            </openiis-uploader>
          </div>

          <div class="demo-item">
            <h4>Archivos Múltiples</h4>
            <openiis-uploader
              variant="basic"
              size="md"
              [config]="{
                maxFileSize: 5,
                allowedTypes: ['image/*'],
                maxFiles: 3
              }"
              title="Múltiples Archivos"
              description="Selecciona hasta 3 archivos"
              (filesAdded)="onFilesAdded($event)"
            >
            </openiis-uploader>
          </div>
        </div>
      </div>

      <div class="demo-subsection">
        <h3>Tamaños y Estados</h3>
        <div class="demo-grid">
          <div class="demo-item">
            <h4>Tamaño Pequeño</h4>
            <openiis-uploader
              variant="basic"
              size="sm"
              [config]="{
                maxFileSize: 2,
                maxFiles: 2
              }"
              title="Uploader Pequeño"
              [showInfo]="false"
            >
            </openiis-uploader>
          </div>

          <div class="demo-item">
            <h4>Tamaño Extra Grande</h4>
            <openiis-uploader
              variant="basic"
              size="xl"
              [config]="{
                maxFileSize: 50,
                maxFiles: 10
              }"
              title="Área de Subida Grande"
              description="Perfecta para múltiples archivos grandes"
            >
            </openiis-uploader>
          </div>

          <div class="demo-item">
            <h4>Estado Deshabilitado</h4>
            <openiis-uploader
              variant="basic"
              size="md"
              [disabled]="true"
              title="Uploader Deshabilitado"
              description="No se pueden subir archivos"
            >
            </openiis-uploader>
          </div>
        </div>
      </div>

      <div class="demo-subsection">
        <h3>Casos de Uso Reales</h3>
        <div class="demo-grid">
          <div class="demo-item">
            <h4>Currículum y Documentos</h4>
            <openiis-uploader
              variant="basic"
              [config]="{
                maxFileSize: 10,
                allowedTypes: ['application/pdf', '.doc', '.docx'],
                maxFiles: 3
              }"
              title="Sube tu CV y documentos"
              description="PDF y documentos de Word únicamente"
              (filesAdded)="onFilesAdded($event)"
            >
            </openiis-uploader>
          </div>

          <div class="demo-item">
            <h4>Portafolio Creativo</h4>
            <openiis-uploader
              variant="image-preview"
              [config]="{
                maxFileSize: 10,
                allowedTypes: ['image/*'],
                maxFiles: 20,
                enableResize: true,
                compressionQuality: 0.9
              }"
              title="Sube tu portafolio"
              description="Imágenes de alta calidad con compresión automática"
              (filesAdded)="onGalleryUploaded($event)"
            >
            </openiis-uploader>
          </div>

          <div class="demo-item">
            <h4>Archivos Mixtos</h4>
            <openiis-uploader
              variant="multi-file"
              [config]="{
                maxFileSize: 25,
                allowedTypes: ['*'],
                maxFiles: 15
              }"
              title="Cualquier tipo de archivo"
              description="Sin restricciones de tipo, solo tamaño"
              (filesAdded)="onFilesAdded($event)"
            >
            </openiis-uploader>
          </div>
        </div>
      </div>
    </section>
  `,
  imports: [OpeniisUploaderComponent],
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
