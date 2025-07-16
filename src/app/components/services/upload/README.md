# UploadService

## Descripción

El `OpeniisUploadService` proporciona una gestión completa de archivos locales con validación, compresión de imágenes, generación de previews y manejo de colas de archivos. **No incluye funcionalidad de subida a servidor** - está diseñado para manejar archivos localmente.

## Características

- ✅ **Validación completa:** Tipo, tamaño, cantidad de archivos
- ✅ **Compresión de imágenes:** Optimización automática con calidad configurable
- ✅ **Previews automáticos:** Generación de thumbnails para imágenes
- ✅ **Cola de archivos:** Gestión centralizada con observables reactivos
- ✅ **Configuración flexible:** Múltiples opciones de configuración
- ✅ **Manejo de errores:** Validación robusta con mensajes descriptivos
- ✅ **Múltiples formatos:** Soporte para imágenes, PDFs, documentos
- ✅ **Drag & Drop:** Integración perfecta con componentes de upload

## Importación

```typescript
import { OpeniisUploadService, UploadConfig, FileUploadItem } from "./services/upload.service";
```

## Uso Básico

### 1. Inyectar el servicio

```typescript
import { Component } from "@angular/core";
import { OpeniisUploadService, UploadConfig, FileUploadItem } from "../services/upload.service";

@Component({
  selector: "app-file-manager",
  template: `
    <div class="file-manager">
      <input type="file" multiple (change)="onFilesSelected($event)" #fileInput />

      <div class="file-list">
        <div *ngFor="let item of uploadedFiles" class="file-item">
          <img *ngIf="item.thumbnailUrl" [src]="item.thumbnailUrl" alt="Preview" />
          <span>{{ item.name }}</span>
          <button (click)="removeFile(item.id)">Eliminar</button>
        </div>
      </div>
    </div>
  `,
})
export class FileManagerComponent {
  uploadedFiles: FileUploadItem[] = [];

  uploadConfig: UploadConfig = {
    maxFileSize: 5, // 5MB
    allowedTypes: ["image/*", "application/pdf"],
    maxFiles: 10,
    compressionQuality: 0.8,
  };

  constructor(private uploadService: OpeniisUploadService) {
    // Suscribirse a cambios en la cola
    this.uploadService.getQueue().subscribe((files) => {
      this.uploadedFiles = files;
    });
  }

  onFilesSelected(event: Event) {
    const input = event.target as HTMLInputElement;
    if (input.files) {
      this.uploadService.addFiles(input.files, this.uploadConfig).subscribe({
        next: (newFiles) => {
          console.log("Archivos agregados:", newFiles);
        },
        error: (error) => {
          console.error("Error al agregar archivos:", error);
        },
      });
    }
  }

  removeFile(fileId: string) {
    this.uploadService.removeFile(fileId);
  }
}
```

### 2. Configuración avanzada

```typescript
// Configuración para imágenes con compresión
const imageConfig: UploadConfig = {
  maxFileSize: 10, // 10MB
  allowedTypes: ["image/jpeg", "image/png", "image/webp"],
  maxFiles: 20,
  compressionQuality: 0.7,
  enableResize: true,
  maxWidth: 1920,
  maxHeight: 1080,
};

// Configuración para documentos
const documentConfig: UploadConfig = {
  maxFileSize: 25, // 25MB
  allowedTypes: ["application/pdf", ".doc", ".docx", ".xls", ".xlsx"],
  maxFiles: 5,
};
```

### 3. Manejo avanzado de archivos

```typescript
// Validar archivo antes de agregar
const file = files[0];
const validation = this.uploadService.validateFile(file, this.config);
if (!validation.valid) {
  console.error(validation.error);
  return;
}

// Obtener todos los archivos para envío
const allFiles = this.uploadService.getAllFiles();
allFiles.forEach(({ id, file, name }) => {
  // Enviar al servidor o procesar
  this.sendToServer(file);
});

// Limpiar cola después del procesamiento
this.uploadService.clearQueue();
```

## Métodos Disponibles

| Método           | Descripción                  | Parámetros                            | Retorno                                    |
| ---------------- | ---------------------------- | ------------------------------------- | ------------------------------------------ |
| `addFiles()`     | Agrega archivos a la cola    | `FileList \| File[]`, `UploadConfig?` | `Observable<FileUploadItem[]>`             |
| `removeFile()`   | Elimina un archivo por ID    | `string`                              | `void`                                     |
| `clearQueue()`   | Limpia toda la cola          | Ninguno                               | `void`                                     |
| `getQueue()`     | Observable de la cola actual | Ninguno                               | `Observable<FileUploadItem[]>`             |
| `validateFile()` | Valida un archivo individual | `File`, `UploadConfig?`               | `{valid: boolean, error?: string}`         |
| `getAllFiles()`  | Obtiene todos los archivos   | Ninguno                               | `{id: string, file: File, name: string}[]` |

## Configuración (UploadConfig)

| Propiedad            | Tipo       | Defecto                                           | Descripción                      |
| -------------------- | ---------- | ------------------------------------------------- | -------------------------------- |
| `maxFileSize`        | `number`   | `10`                                              | Tamaño máximo en MB              |
| `allowedTypes`       | `string[]` | `['image/*', 'application/pdf', '.doc', '.docx']` | Tipos MIME permitidos            |
| `maxFiles`           | `number`   | `5`                                               | Cantidad máxima de archivos      |
| `compressionQuality` | `number`   | `0.8`                                             | Calidad de compresión (0-1)      |
| `enableResize`       | `boolean`  | `false`                                           | Habilitar redimensionado         |
| `maxWidth`           | `number`   | `1920`                                            | Ancho máximo para redimensionado |
| `maxHeight`          | `number`   | `1080`                                            | Alto máximo para redimensionado  |

## Interfaz FileUploadItem

```typescript
interface FileUploadItem {
  id: string;
  file: File;
  name: string;
  size: number;
  type: string;
  url?: string;
  thumbnailUrl?: string;
}
```

## Ejemplo Completo: Gestor de Archivos Avanzado

```typescript
import { Component, OnInit, OnDestroy } from "@angular/core";
import { Subscription } from "rxjs";
import { OpeniisUploadService, UploadConfig, FileUploadItem } from "../services/upload.service";

@Component({
  selector: "app-advanced-file-manager",
  template: `
    <div class="file-manager">
      <div class="upload-area" (dragover)="onDragOver($event)" (drop)="onDrop($event)" [class.dragover]="isDragOver">
        <div class="upload-content">
          <h3>Arrastra archivos aquí o</h3>
          <button (click)="fileInput.click()">Seleccionar Archivos</button>
          <input #fileInput type="file" multiple (change)="onFilesSelected($event)" style="display: none;" />
        </div>
      </div>

      <div class="config-panel">
        <h4>Configuración</h4>
        <label>
          Tamaño máximo (MB):
          <input type="number" [(ngModel)]="config.maxFileSize" min="1" max="100" />
        </label>

        <label>
          Máximo archivos:
          <input type="number" [(ngModel)]="config.maxFiles" min="1" max="50" />
        </label>

        <label>
          Calidad compresión:
          <input type="range" [(ngModel)]="config.compressionQuality" min="0.1" max="1" step="0.1" />
          {{ config.compressionQuality }}
        </label>
      </div>

      <div class="file-grid" *ngIf="uploadedFiles.length > 0">
        <div *ngFor="let item of uploadedFiles" class="file-card">
          <div class="file-preview">
            <img *ngIf="item.thumbnailUrl" [src]="item.thumbnailUrl" alt="Preview" />
            <div *ngIf="!item.thumbnailUrl" class="file-icon">📄</div>
          </div>

          <div class="file-info">
            <span class="file-name">{{ item.name }}</span>
            <span class="file-size">{{ formatFileSize(item.size) }}</span>
          </div>

          <button class="remove-btn" (click)="removeFile(item.id)">❌</button>
        </div>
      </div>

      <div class="actions" *ngIf="uploadedFiles.length > 0">
        <button (click)="processFiles()">Procesar Archivos</button>
        <button (click)="clearAll()">Limpiar Todo</button>
      </div>
    </div>
  `,
  styles: [
    `
      .file-manager {
        max-width: 800px;
        margin: 0 auto;
        padding: var(--space-4);
      }

      .upload-area {
        border: 2px dashed var(--color-border);
        border-radius: var(--radius-lg);
        padding: var(--space-8);
        text-align: center;
        transition: all 0.3s ease;
        margin-bottom: var(--space-4);
      }

      .upload-area.dragover {
        border-color: var(--color-primary-500);
        background: var(--color-primary-50);
      }

      .config-panel {
        background: var(--color-surface);
        padding: var(--space-4);
        border-radius: var(--radius-md);
        margin-bottom: var(--space-4);
      }

      .config-panel label {
        display: block;
        margin-bottom: var(--space-2);
      }

      .file-grid {
        display: grid;
        grid-template-columns: repeat(auto-fill, minmax(200px, 1fr));
        gap: var(--space-3);
        margin-bottom: var(--space-4);
      }

      .file-card {
        background: var(--color-surface);
        border-radius: var(--radius-md);
        padding: var(--space-3);
        position: relative;
        border: 1px solid var(--color-border);
      }

      .file-preview img {
        width: 100%;
        height: 120px;
        object-fit: cover;
        border-radius: var(--radius-sm);
      }

      .file-icon {
        width: 100%;
        height: 120px;
        display: flex;
        align-items: center;
        justify-content: center;
        font-size: 3rem;
        background: var(--color-background);
        border-radius: var(--radius-sm);
      }

      .file-info {
        margin-top: var(--space-2);
      }

      .file-name {
        display: block;
        font-weight: 500;
        font-size: 0.9rem;
        overflow: hidden;
        text-overflow: ellipsis;
        white-space: nowrap;
      }

      .file-size {
        display: block;
        font-size: 0.8rem;
        color: var(--color-text-secondary);
        margin-top: var(--space-1);
      }

      .remove-btn {
        position: absolute;
        top: var(--space-1);
        right: var(--space-1);
        background: rgba(255, 255, 255, 0.9);
        border: none;
        border-radius: 50%;
        width: 24px;
        height: 24px;
        cursor: pointer;
        display: flex;
        align-items: center;
        justify-content: center;
      }

      .actions {
        display: flex;
        gap: var(--space-2);
        justify-content: center;
      }

      .actions button {
        padding: var(--space-2) var(--space-4);
        border: 1px solid var(--color-border);
        border-radius: var(--radius-md);
        background: var(--color-primary-500);
        color: white;
        cursor: pointer;
        transition: all 0.2s ease;
      }

      .actions button:hover {
        background: var(--color-primary-600);
      }
    `,
  ],
})
export class AdvancedFileManagerComponent implements OnInit, OnDestroy {
  uploadedFiles: FileUploadItem[] = [];
  isDragOver = false;

  config: UploadConfig = {
    maxFileSize: 10,
    allowedTypes: ["image/*", "application/pdf", ".doc", ".docx"],
    maxFiles: 20,
    compressionQuality: 0.8,
    enableResize: true,
    maxWidth: 1920,
    maxHeight: 1080,
  };

  private subscription: Subscription = new Subscription();

  constructor(private uploadService: OpeniisUploadService) {}

  ngOnInit() {
    this.subscription.add(
      this.uploadService.getQueue().subscribe((files) => {
        this.uploadedFiles = files;
      })
    );
  }

  ngOnDestroy() {
    this.subscription.unsubscribe();
  }

  onDragOver(event: DragEvent) {
    event.preventDefault();
    this.isDragOver = true;
  }

  onDrop(event: DragEvent) {
    event.preventDefault();
    this.isDragOver = false;

    if (event.dataTransfer?.files) {
      this.addFiles(event.dataTransfer.files);
    }
  }

  onFilesSelected(event: Event) {
    const input = event.target as HTMLInputElement;
    if (input.files) {
      this.addFiles(input.files);
    }
  }

  private addFiles(files: FileList) {
    this.uploadService.addFiles(files, this.config).subscribe({
      next: (newFiles) => {
        console.log(`${newFiles.length} archivos agregados exitosamente`);
      },
      error: (error) => {
        alert(`Error: ${error}`);
      },
    });
  }

  removeFile(fileId: string) {
    this.uploadService.removeFile(fileId);
  }

  clearAll() {
    this.uploadService.clearQueue();
  }

  processFiles() {
    const files = this.uploadService.getAllFiles();
    console.log("Procesando archivos:", files);

    // Aquí procesarías los archivos según tus necesidades
    files.forEach(({ id, file, name }) => {
      console.log(`Procesando: ${name} (${file.size} bytes)`);
      // Enviar al servidor, comprimir, etc.
    });
  }

  formatFileSize(bytes: number): string {
    if (bytes === 0) return "0 Bytes";
    const k = 1024;
    const sizes = ["Bytes", "KB", "MB", "GB"];
    const i = Math.floor(Math.log(bytes) / Math.log(k));
    return parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + " " + sizes[i];
  }
}
```

## Casos de Uso Avanzados

### Procesamiento de Imágenes

```typescript
@Component({
  template: `
    <div class="image-processor">
      <h3>Procesador de Imágenes</h3>

      <div class="upload-section">
        <input type="file" accept="image/*" multiple (change)="onImagesSelected($event)" />
      </div>

      <div class="processing-options">
        <label>
          Calidad de compresión:
          <input type="range" [(ngModel)]="compressionQuality" min="0.1" max="1" step="0.1" />
          {{ compressionQuality }}
        </label>

        <label>
          Redimensionar:
          <input type="checkbox" [(ngModel)]="enableResize" />
        </label>

        <div *ngIf="enableResize" class="resize-options">
          <label>
            Ancho máximo:
            <input type="number" [(ngModel)]="maxWidth" min="100" max="4000" />
          </label>
          <label>
            Alto máximo:
            <input type="number" [(ngModel)]="maxHeight" min="100" max="4000" />
          </label>
        </div>
      </div>

      <div class="preview-grid" *ngIf="processedImages.length > 0">
        <div *ngFor="let image of processedImages" class="image-preview">
          <img [src]="image.thumbnailUrl" [alt]="image.name" />
          <div class="image-info">
            <span>{{ image.name }}</span>
            <span>{{ formatFileSize(image.size) }}</span>
          </div>
        </div>
      </div>
    </div>
  `,
})
export class ImageProcessorComponent {
  compressionQuality = 0.8;
  enableResize = false;
  maxWidth = 1920;
  maxHeight = 1080;
  processedImages: FileUploadItem[] = [];

  constructor(private uploadService: OpeniisUploadService) {}

  onImagesSelected(event: Event) {
    const input = event.target as HTMLInputElement;
    if (input.files) {
      const config: UploadConfig = {
        maxFileSize: 50, // 50MB para imágenes grandes
        allowedTypes: ["image/jpeg", "image/png", "image/webp"],
        maxFiles: 50,
        compressionQuality: this.compressionQuality,
        enableResize: this.enableResize,
        maxWidth: this.maxWidth,
        maxHeight: this.maxHeight,
      };

      this.uploadService.addFiles(input.files, config).subscribe({
        next: (newImages) => {
          this.processedImages = [...this.processedImages, ...newImages];
        },
        error: (error) => {
          console.error("Error procesando imágenes:", error);
        },
      });
    }
  }

  formatFileSize(bytes: number): string {
    if (bytes === 0) return "0 Bytes";
    const k = 1024;
    const sizes = ["Bytes", "KB", "MB", "GB"];
    const i = Math.floor(Math.log(bytes) / Math.log(k));
    return parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + " " + sizes[i];
  }
}
```

### Validación Personalizada

```typescript
@Injectable()
export class CustomUploadValidationService {
  constructor(private uploadService: OpeniisUploadService) {}

  validateBusinessDocuments(files: FileList): Observable<FileUploadItem[]> {
    const businessConfig: UploadConfig = {
      maxFileSize: 10,
      allowedTypes: ["application/pdf", ".docx", ".xlsx"],
      maxFiles: 10,
    };

    // Validaciones adicionales
    const validFiles: File[] = [];
    const errors: string[] = [];

    Array.from(files).forEach((file) => {
      // Validación de nombre de archivo
      if (file.name.includes(" ")) {
        errors.push(`${file.name}: Los nombres no pueden contener espacios`);
        return;
      }

      // Validación de contenido (ejemplo básico)
      if (file.type === "application/pdf" && file.size < 1024) {
        errors.push(`${file.name}: El PDF parece estar vacío`);
        return;
      }

      validFiles.push(file);
    });

    if (errors.length > 0) {
      return throwError(() => errors.join("\n"));
    }

    return this.uploadService.addFiles(validFiles, businessConfig);
  }

  validateProfileImages(files: FileList): Observable<FileUploadItem[]> {
    const profileConfig: UploadConfig = {
      maxFileSize: 5,
      allowedTypes: ["image/jpeg", "image/png"],
      maxFiles: 1,
      compressionQuality: 0.9,
      enableResize: true,
      maxWidth: 800,
      maxHeight: 800,
    };

    // Solo permitir una imagen de perfil
    if (files.length > 1) {
      return throwError(() => "Solo se permite una imagen de perfil");
    }

    const file = files[0];

    // Verificar aspect ratio cuadrado (para avatares)
    return new Observable((observer) => {
      const img = new Image();
      img.onload = () => {
        const aspectRatio = img.width / img.height;
        if (Math.abs(aspectRatio - 1) > 0.1) {
          observer.error("La imagen debe ser aproximadamente cuadrada");
          return;
        }

        this.uploadService.addFiles([file], profileConfig).subscribe({
          next: (result) => observer.next(result),
          error: (error) => observer.error(error),
          complete: () => observer.complete(),
        });
      };

      img.src = URL.createObjectURL(file);
    });
  }
}
```

### Integración con Backend

```typescript
@Injectable()
export class FileUploadIntegrationService {
  constructor(private uploadService: OpeniisUploadService, private http: HttpClient) {}

  uploadToServer(files: FileUploadItem[]): Observable<any> {
    const formData = new FormData();

    files.forEach((fileItem, index) => {
      formData.append(`file_${index}`, fileItem.file, fileItem.name);
    });

    return this.http.post("/api/upload", formData, {
      reportProgress: true,
      observe: "events",
    });
  }

  uploadWithProgress(files: FileUploadItem[]): Observable<{ progress: number; result?: any }> {
    return this.uploadToServer(files).pipe(
      map((event) => {
        if (event.type === HttpEventType.UploadProgress) {
          const progress = event.total ? Math.round((event.loaded / event.total) * 100) : 0;
          return { progress };
        } else if (event.type === HttpEventType.Response) {
          return { progress: 100, result: event.body };
        }
        return { progress: 0 };
      })
    );
  }

  batchUpload(batchSize: number = 3): Observable<any> {
    const allFiles = this.uploadService.getAllFiles();
    const batches: FileUploadItem[][] = [];

    // Dividir archivos en lotes
    for (let i = 0; i < allFiles.length; i += batchSize) {
      batches.push(allFiles.slice(i, i + batchSize));
    }

    // Subir lotes secuencialmente
    return from(batches).pipe(
      concatMap((batch) => this.uploadToServer(batch)),
      reduce((acc, result) => [...acc, result], [] as any[])
    );
  }
}
```

## Mejores Prácticas

### ✅ DO - Buenas Prácticas

- **Validación temprana:** Validar archivos antes de procesar
- **Feedback visual:** Mostrar progress y estados de carga
- **Manejo de errores:** Proporcionar mensajes descriptivos
- **Optimización:** Comprimir imágenes para reducir tamaño
- **Cleanup:** Liberar URLs de objetos después de usar

### ❌ DON'T - Evitar

- **Archivos sin validar:** No procesar archivos sin validación
- **Memory leaks:** No olvidar revocar URLs de objetos
- **Tamaños excesivos:** No permitir archivos demasiado grandes
- **Tipos peligrosos:** No permitir tipos de archivo ejecutables

## Consideraciones de Rendimiento

- **Compresión automática:** Para optimizar el rendimiento de red
- **Lazy loading de previews:** Generar thumbnails solo cuando se necesiten
- **Batch processing:** Procesar archivos en lotes para evitar bloqueos
- **Memory management:** Liberar recursos automáticamente

## Implementación Interna

### Validación de Archivos

El servicio verifica:

1. **Tipo MIME:** Compatibilidad con tipos permitidos
2. **Extensión:** Validación adicional por extensión de archivo
3. **Tamaño:** Límites configurables por archivo
4. **Cantidad:** Límites de archivos totales en cola

### Compresión de Imágenes

Proceso automático:

1. **Canvas API:** Para redimensionado y compresión
2. **Quality control:** Configuración de calidad JPEG
3. **Format preservation:** Mantener formato original cuando posible
4. **Fallback:** Archivo original si la compresión falla

## Dependencias

- `@angular/core` - Para funcionalidad de servicio
- `rxjs` - Para manejo reactivo y observables
- Browser APIs - File API, Canvas API, URL.createObjectURL
