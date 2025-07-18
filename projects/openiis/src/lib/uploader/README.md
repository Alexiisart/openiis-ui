# Uploader Component

## Descripción

El componente `OpeniisUploaderComponent` es un **input file mejorado** que actúa como un selector de archivos avanzado con múltiples variantes visuales. **NO incluye lógica de subida a servidores** - simplemente maneja archivos de forma local para que tú decidas qué hacer con ellos.

## Características

- ✅ Drag & drop nativo con retroalimentación visual
- ✅ 5 variantes diferentes (basic, image-preview, multi-file, compact, avatar)
- ✅ Preview automático de imágenes
- ✅ Validación de archivos (tipo, tamaño, cantidad)
- ✅ Gestión de cola de archivos local
- ✅ Compresión y redimensionado de imágenes
- ✅ Soporte para múltiples tamaños (sm, md, lg, xl)
- ✅ Accesibilidad completa (ARIA, teclado)
- ✅ Responsive design
- ✅ Soporte para temas (light/dark)

## ¿Qué hace exactamente?

Este componente es un **input type="file" mejorado**. Te permite:

1. **Seleccionar archivos** con drag & drop o click
2. **Validar archivos** automáticamente
3. **Ver previews** de imágenes
4. **Gestionar una cola** de archivos seleccionados
5. **Acceder a los archivos File** originales para tu uso

**NO hace subidas automáticas** - tú decides si y cómo subir los archivos a tu backend.

## Uso Básico

```typescript
// En tu componente
export class MiComponente {
  config: UploadConfig = {
    maxFileSize: 5, // MB
    allowedTypes: ["image/*", ".pdf"],
    maxFiles: 3,
  };

  onFilesAdded(files: FileUploadItem[]): void {
    console.log("Archivos seleccionados:", files);

    // Acceder a los archivos File originales
    files.forEach((fileItem) => {
      const file = fileItem.file; // File nativo de JavaScript
      console.log(`Archivo: ${file.name}, Tamaño: ${file.size}`);

      // Aquí puedes hacer lo que quieras con el archivo:
      // - Subirlo a tu backend
      // - Procesarlo localmente
      // - Etc.
    });
  }
}
```

```html
<!-- En tu template -->
<openiis-uploader variant="basic" [config]="config" title="Seleccionar archivos" description="Arrastra archivos aquí" (filesAdded)="onFilesAdded($event)"> </openiis-uploader>
```

## Variantes Disponibles

### 1. Basic (`basic`)

Uploader estándar con drag & drop y lista de archivos.

```html
<openiis-uploader variant="basic" [config]="config"> </openiis-uploader>
```

### 2. Image Preview (`image-preview`)

Vista de galería para imágenes con thumbnails.

```html
<openiis-uploader variant="image-preview" [config]="imageConfig" title="Galería de imágenes"> </openiis-uploader>
```

### 3. Multi-file (`multi-file`)

Optimizado para múltiples archivos de diferentes tipos.

```html
<openiis-uploader variant="multi-file" [config]="multiConfig"> </openiis-uploader>
```

### 4. Compact (`compact`)

Versión compacta para espacios reducidos.

```html
<openiis-uploader variant="compact" size="sm" [config]="compactConfig"> </openiis-uploader>
```

### 5. Avatar (`avatar`)

Circular, para una sola imagen (fotos de perfil).

```html
<openiis-uploader variant="avatar" [config]="avatarConfig"> </openiis-uploader>
```

## Configuración (UploadConfig)

```typescript
interface UploadConfig {
  maxFileSize?: number; // Tamaño máximo en MB (default: 10)
  allowedTypes?: string[]; // Tipos permitidos (default: ['*'])
  maxFiles?: number; // Máximo número de archivos (default: 5)
  compressionQuality?: number; // Calidad de compresión 0-1 (default: 0.8)
  enableResize?: boolean; // Habilitar redimensionado (default: false)
  maxWidth?: number; // Ancho máximo en px (default: 1920)
  maxHeight?: number; // Alto máximo en px (default: 1080)
}
```

### Ejemplos de configuración:

```typescript
// Solo imágenes
const imageConfig: UploadConfig = {
  maxFileSize: 5,
  allowedTypes: ["image/*"],
  maxFiles: 10,
  enableResize: true,
  compressionQuality: 0.8,
};

// Documentos de oficina
const documentConfig: UploadConfig = {
  maxFileSize: 20,
  allowedTypes: [".pdf", ".doc", ".docx", ".xls", ".xlsx"],
  maxFiles: 5,
};

// Avatar
const avatarConfig: UploadConfig = {
  maxFileSize: 2,
  allowedTypes: ["image/jpeg", "image/png"],
  maxFiles: 1,
  enableResize: true,
  maxWidth: 400,
  maxHeight: 400,
};
```

## Propiedades del Componente

| Propiedad     | Tipo              | Default   | Descripción                  |
| ------------- | ----------------- | --------- | ---------------------------- |
| `variant`     | `UploaderVariant` | `'basic'` | Tipo de uploader             |
| `size`        | `UploaderSize`    | `'md'`    | Tamaño del componente        |
| `disabled`    | `boolean`         | `false`   | Estado deshabilitado         |
| `config`      | `UploadConfig`    | `{}`      | Configuración de validación  |
| `title`       | `string`          | `''`      | Título del uploader          |
| `description` | `string`          | `''`      | Descripción del uploader     |
| `showInfo`    | `boolean`         | `true`    | Mostrar información de ayuda |

## Eventos

| Evento         | Tipo               | Descripción                                |
| -------------- | ------------------ | ------------------------------------------ |
| `filesAdded`   | `FileUploadItem[]` | Se emite cuando se agregan archivos        |
| `fileRemoved`  | `string`           | Se emite cuando se elimina un archivo (ID) |
| `filesCleared` | `void`             | Se emite cuando se limpia la cola          |

## Métodos del Servicio

El `OpeniisUploadService` proporciona métodos para gestionar archivos:

```typescript
// Inyectar el servicio
constructor(private uploadService: OpeniisUploadService) {}

// Métodos útiles
this.uploadService.getCurrentQueue()        // Obtener cola actual
this.uploadService.clearQueue()            // Limpiar cola
this.uploadService.removeFile(id)          // Eliminar archivo específico
this.uploadService.getFile(id)             // Obtener File por ID
this.uploadService.getAllFiles()           // Obtener todos los archivos
this.uploadService.compressImage(file)     // Comprimir imagen
```

## Gestión de Estado

```typescript
// Suscribirse a cambios en la cola
this.uploadService.uploadQueue.subscribe((files) => {
  console.log("Files in queue:", files);
});

// Validar archivo manualmente
const validation = this.uploadService.validateFile(file, {
  maxFileSize: 5,
  allowedTypes: ["image/*"],
});
```

## Ejemplo Completo: Subir a tu Backend

```typescript
export class MiComponente {
  constructor(private uploadService: OpeniisUploadService, private http: HttpClient) {}

  async onFilesAdded(files: FileUploadItem[]): Promise<void> {
    for (const fileItem of files) {
      try {
        // Crear FormData con el archivo
        const formData = new FormData();
        formData.append("file", fileItem.file);

        // Subir a tu backend
        const response = await this.http.post("/api/upload", formData).toPromise();

        console.log("Archivo subido:", response);

        // Eliminar de la cola local si quieres
        this.uploadService.removeFile(fileItem.id);
      } catch (error) {
        console.error("Error subiendo archivo:", error);
      }
    }
  }

  // Botón para subir todos los archivos pendientes
  subirTodos(): void {
    const archivos = this.uploadService.getAllFiles();
    archivos.forEach((item) => {
      // Tu lógica de subida aquí
      this.subirArchivo(item.file);
    });
  }
}
```

## Estilos CSS

El componente usa clases CSS modulares:

- `.openiis-uploader` - Contenedor principal
- `.variant-{variant}` - Clases por variante
- `.size-{size}` - Clases por tamaño
- `.disabled` - Estado deshabilitado

## Dependencias

- `OpeniisButtonComponent`
- `OpeniisUploadService`

## Notas

- El componente maneja **solo archivos locales**
- **No incluye lógica de subida** a servidores
- Es tu responsabilidad implementar la subida a tu backend
- Los archivos File originales están disponibles en `fileItem.file`
- Las imágenes se comprimen automáticamente si está habilitado
- Soporte completo para accesibilidad y responsive design
