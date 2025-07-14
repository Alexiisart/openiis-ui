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
  @Input() basicUploadConfig!: UploadConfig;
  @Input() compactUploadConfig!: UploadConfig;
  @Input() imageUploadConfig!: UploadConfig;
  @Input() avatarUploadConfig!: UploadConfig;
  @Input() documentUploadConfig!: UploadConfig;
  @Input() onFilesAdded!: (files: FileUploadItem[]) => void;
  @Input() onAvatarUploaded!: (file: FileUploadItem) => void;
  @Input() onDocumentsAdded!: (files: FileUploadItem[]) => void;
  @Input() onGalleryUploaded!: (files: FileUploadItem[]) => void;
}
