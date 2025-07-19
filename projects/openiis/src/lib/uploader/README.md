# Uploader

Componente de carga de archivos elegante y reutilizable con múltiples variantes, drag & drop, vista previa de imágenes y validaciones avanzadas.

## 📦 Instalación

```typescript
import { OpeniisUploaderComponent } from 'openiis-ui';

@Component({
  imports: [OpeniisUploaderComponent],
})
```

## ⚙️ Properties

| Property            | Tipo              | Default                  | Descripción                       |
| ------------------- | ----------------- | ------------------------ | --------------------------------- |
| `variant`           | `UploaderVariant` | `'basic'`                | Tipo de uploader                  |
| `size`              | `UploaderSize`    | `'md'`                   | Tamaño del componente             |
| `disabled`          | `boolean`         | `false`                  | Si el uploader está deshabilitado |
| `config`            | `UploadConfig`    | `{}`                     | Configuración del uploader        |
| `title`             | `string`          | `''`                     | Título personalizado              |
| `description`       | `string`          | `''`                     | Descripción personalizada         |
| `showInfo`          | `boolean`         | `true`                   | Si mostrar información adicional  |
| `selectFile`        | `string`          | `'Seleccionar archivos'` | Texto del botón de selección      |
| `removeTooltipFile` | `string`          | `'Eliminar archivo'`     | Tooltip para eliminar archivo     |
| `clearAllText`      | `string`          | `'Limpiar todo'`         | Texto del botón limpiar todo      |

## 📡 Events

| Event          | Tipo                             | Descripción                           |
| -------------- | -------------------------------- | ------------------------------------- |
| `filesAdded`   | `EventEmitter<FileUploadItem[]>` | Se emite cuando se agregan archivos   |
| `fileRemoved`  | `EventEmitter<string>`           | Se emite cuando se elimina un archivo |
| `filesCleared` | `EventEmitter<void>`             | Se emite cuando se limpian todos      |

## 🎨 Variantes

| Variante        | Descripción                  | Uso                       |
| --------------- | ---------------------------- | ------------------------- |
| `basic`         | Uploader básico (default)    | Carga general de archivos |
| `image-preview` | Con vista previa de imágenes | Galerías de fotos         |
| `multi-file`    | Para múltiples archivos      | Documentos múltiples      |
| `compact`       | Versión compacta             | Espacios reducidos        |
| `avatar`        | Para fotos de perfil         | Avatares de usuario       |

## 📏 Tamaños

| Tamaño | Descripción       | Uso                    |
| ------ | ----------------- | ---------------------- |
| `sm`   | Pequeño           | Espacios reducidos     |
| `md`   | Mediano (default) | Uso general            |
| `lg`   | Grande            | Carga principal        |
| `xl`   | Extra grande      | Áreas de carga grandes |

## ⚙️ Configuración (UploadConfig)

| Property             | Tipo       | Default | Descripción                     |
| -------------------- | ---------- | ------- | ------------------------------- |
| `maxFileSize`        | `number`   | `10`    | Tamaño máximo en MB             |
| `allowedTypes`       | `string[]` | `['*']` | Tipos de archivo permitidos     |
| `maxFiles`           | `number`   | `10`    | Número máximo de archivos       |
| `enableResize`       | `boolean`  | `false` | Si habilitar redimensionamiento |
| `compressionQuality` | `number`   | `0.8`   | Calidad de compresión (0-1)     |
| `maxWidth`           | `number`   | `1920`  | Ancho máximo en píxeles         |
| `maxHeight`          | `number`   | `1080`  | Alto máximo en píxeles          |

## 🏗️ Interfaces

```typescript
type UploaderVariant = "basic" | "image-preview" | "multi-file" | "compact" | "avatar";
type UploaderSize = "sm" | "md" | "lg" | "xl";

interface UploadConfig {
  maxFileSize?: number;
  allowedTypes?: string[];
  maxFiles?: number;
  enableResize?: boolean;
  compressionQuality?: number;
  maxWidth?: number;
  maxHeight?: number;
}

interface FileUploadItem {
  id: string;
  file: File;
  name: string;
  size: number;
  type: string;
  thumbnailUrl?: string;
  progress?: number;
  status?: "pending" | "uploading" | "completed" | "error";
}
```

## 💡 Ejemplos Prácticos

### 1. Cargador de Archivos Básico

```html
<openiis-uploader variant="basic" [config]="basicUploadConfig" title="Cargar archivos" description="Cualquier tipo de archivo" selectFile="Seleccionar archivos" removeTooltipFile="Eliminar archivo" clearAllText="Limpiar todo" (filesAdded)="onFilesAdded($event)"> </openiis-uploader>
```

```typescript
export class MyComponent {
  basicUploadConfig: UploadConfig = {
    maxFileSize: 10,
    allowedTypes: ["image/*", "application/pdf", ".doc", ".docx"],
    maxFiles: 5,
  };

  onFilesAdded(files: FileUploadItem[]): void {
    console.log("Archivos agregados:", files);
    files.forEach((fileItem) => {
      console.log(`Archivo: ${fileItem.name}, Tamaño: ${fileItem.size} bytes`);
    });
  }
}
```

### 2. Cargador de Archivos Compacto

```html
<openiis-uploader variant="compact" size="sm" [config]="compactUploadConfig" selectFile="Seleccionar archivos" removeTooltipFile="Eliminar archivo" clearAllText="Limpiar todo" (filesAdded)="onFilesAdded($event)"> </openiis-uploader>
```

```typescript
export class MyComponent {
  compactUploadConfig: UploadConfig = {
    maxFileSize: 5,
    allowedTypes: ["*"],
    maxFiles: 3,
  };
}
```

### 3. Galería de Imágenes

```html
<openiis-uploader variant="image-preview" size="lg" [config]="imageUploadConfig" title="Galería de fotos" description="Múltiples archivos" selectFile="Seleccionar archivos" removeTooltipFile="Eliminar archivo" clearAllText="Limpiar todo" (filesAdded)="onFilesAdded($event)"> </openiis-uploader>
```

```typescript
export class MyComponent {
  imageUploadConfig: UploadConfig = {
    maxFileSize: 5,
    allowedTypes: ["image/*"],
    maxFiles: 10,
    enableResize: true,
    compressionQuality: 0.8,
  };
}
```

### 4. Avatar de Usuario

```html
<div style="max-width: 200px; margin: 0 auto">
  <openiis-uploader variant="avatar" [config]="avatarUploadConfig" selectFile="Seleccionar archivos" removeTooltipFile="Eliminar archivo" clearAllText="Limpiar todo" (filesAdded)="onAvatarUploaded($event[0])"> </openiis-uploader>
</div>
```

```typescript
export class MyComponent {
  avatarUploadConfig: UploadConfig = {
    maxFileSize: 2,
    allowedTypes: ["image/jpeg", "image/png"],
    maxFiles: 1,
    enableResize: true,
    maxWidth: 400,
    maxHeight: 400,
  };

  onAvatarUploaded(file: FileUploadItem): void {
    console.log("Avatar seleccionado:", file);
  }
}
```

### 5. Documentos Oficiales

```html
<openiis-uploader variant="multi-file" [config]="documentUploadConfig" title="Cargar documentos" description="Currículum y documentos" selectFile="Seleccionar archivos" removeTooltipFile="Eliminar archivo" clearAllText="Limpiar todo" [showInfo]="true" (filesAdded)="onDocumentsAdded($event)"> </openiis-uploader>
```

```typescript
export class MyComponent {
  documentUploadConfig: UploadConfig = {
    maxFileSize: 20,
    allowedTypes: ["application/pdf", ".doc", ".docx", ".xls", ".xlsx", ".ppt", ".pptx"],
    maxFiles: 5,
  };

  onDocumentsAdded(files: FileUploadItem[]): void {
    console.log("Documentos agregados:", files);
  }
}
```

### 6. Archivos Múltiples

```html
<openiis-uploader
  variant="basic"
  size="md"
  [config]="{
    maxFileSize: 5,
    allowedTypes: ['image/*'],
    maxFiles: 3,
  }"
  title="Múltiples archivos"
  description="Archivos múltiples"
  selectFile="Seleccionar archivos"
  removeTooltipFile="Eliminar archivo"
  clearAllText="Limpiar todo"
  (filesAdded)="onFilesAdded($event)"
>
</openiis-uploader>
```

### 7. Tamaño Pequeño

```html
<openiis-uploader
  variant="basic"
  size="sm"
  [config]="{
    maxFileSize: 2,
    maxFiles: 2,
  }"
  title="Cargador de archivos pequeño"
  selectFile="Seleccionar archivos"
  removeTooltipFile="Eliminar archivo"
  clearAllText="Limpiar todo"
  [showInfo]="false"
>
</openiis-uploader>
```

### 8. Tamaño Extra Grande

```html
<openiis-uploader
  variant="basic"
  size="xl"
  [config]="{
    maxFileSize: 50,
    maxFiles: 10,
  }"
  title="Área de carga grande"
  description="Múltiples archivos"
  selectFile="Seleccionar archivos"
  removeTooltipFile="Eliminar archivo"
  clearAllText="Limpiar todo"
>
</openiis-uploader>
```

### 9. Estado Deshabilitado

```html
<openiis-uploader variant="basic" size="md" [disabled]="true" title="Cargador de archivos deshabilitado" description="Archivos múltiples" selectFile="Seleccionar archivos" removeTooltipFile="Eliminar archivo" clearAllText="Limpiar todo"> </openiis-uploader>
```

### 10. Currículum y Documentos

```html
<openiis-uploader
  variant="basic"
  [config]="{
    maxFileSize: 10,
    allowedTypes: ['application/pdf', '.doc', '.docx'],
    maxFiles: 3,
  }"
  title="Carga tu CV y documentos"
  description="Documentos oficiales"
  selectFile="Seleccionar archivos"
  removeTooltipFile="Eliminar archivo"
  clearAllText="Limpiar todo"
  (filesAdded)="onFilesAdded($event)"
>
</openiis-uploader>
```

### 11. Portafolio Creativo

```html
<openiis-uploader
  variant="image-preview"
  [config]="{
    maxFileSize: 10,
    allowedTypes: ['image/*'],
    maxFiles: 20,
    enableResize: true,
    compressionQuality: 0.9,
  }"
  title="Carga tu portafolio"
  description="Galería de imágenes"
  selectFile="Seleccionar archivos"
  removeTooltipFile="Eliminar archivo"
  clearAllText="Limpiar todo"
  (filesAdded)="onGalleryUploaded($event)"
>
</openiis-uploader>
```

```typescript
export class MyComponent {
  onGalleryUploaded(files: FileUploadItem[]): void {
    console.log("Imágenes agregadas a galería:", files);
  }
}
```

### 12. Archivos Mixtos

```html
<openiis-uploader
  variant="multi-file"
  [config]="{
    maxFileSize: 25,
    allowedTypes: ['*'],
    maxFiles: 15,
  }"
  title="Cualquier tipo de archivo"
  description="Archivos múltiples"
  selectFile="Seleccionar archivos"
  removeTooltipFile="Eliminar archivo"
  clearAllText="Limpiar todo"
  (filesAdded)="onFilesAdded($event)"
>
</openiis-uploader>
```

### 13. Uploader con Eventos Completos

```html
<openiis-uploader variant="basic" [config]="{ maxFileSize: 10, maxFiles: 5 }" title="Uploader completo" description="Con todos los eventos" (filesAdded)="onFilesAdded($event)" (fileRemoved)="onFileRemoved($event)" (filesCleared)="onFilesCleared()"> </openiis-uploader>
```

```typescript
export class MyComponent {
  onFilesAdded(files: FileUploadItem[]): void {
    console.log("Archivos agregados:", files);
  }

  onFileRemoved(fileId: string): void {
    console.log("Archivo eliminado:", fileId);
  }

  onFilesCleared(): void {
    console.log("Todos los archivos eliminados");
  }
}
```

### 14. Uploader con Manejo de Errores

```html
<openiis-uploader variant="basic" [config]="{ maxFileSize: 10, maxFiles: 5 }" title="Uploader con manejo de errores" (filesAdded)="onFilesAdded($event)" (fileRemoved)="onFileRemoved($event)" (filesCleared)="onFilesCleared()"> </openiis-uploader>
```

```typescript
export class MyComponent {
  onUploadCompleted(files: FileUploadItem[]): void {
    console.log("Archivos listos:", files);
    this.showToastMessage("success");
  }

  onUploadError(error: { file: FileUploadItem; error: string }): void {
    console.log("Error con archivo:", error);
    this.showToastMessage("danger");
  }

  showToastMessage(type: string): void {
    switch (type) {
      case "success":
        this.showSuccessToast = true;
        break;
      case "danger":
        this.showDangerToast = true;
        break;
    }
  }
}
```

### 15. Uploader Condicional

```html
<openiis-uploader [variant]="uploaderVariant" [size]="uploaderSize" [config]="uploaderConfig" [title]="uploaderTitle" [description]="uploaderDescription" [disabled]="isUploaderDisabled" (filesAdded)="onFilesAdded($event)"> </openiis-uploader>
```

```typescript
export class MyComponent {
  uploaderVariant: "basic" | "image-preview" | "multi-file" | "compact" | "avatar" = "basic";
  uploaderSize: "sm" | "md" | "lg" | "xl" = "md";
  isUploaderDisabled = false;

  get uploaderConfig(): UploadConfig {
    return {
      maxFileSize: 10,
      allowedTypes: ["*"],
      maxFiles: 5,
    };
  }

  get uploaderTitle(): string {
    return "Cargar archivos";
  }

  get uploaderDescription(): string {
    return "Selecciona los archivos que deseas subir";
  }

  onFilesAdded(files: FileUploadItem[]): void {
    console.log("Archivos agregados:", files);
  }
}
```

## ⚡ Comportamiento

### Estados

- **Habilitado**: Estado por defecto (funcional)
- **Deshabilitado**: Cuando `disabled` es `true`
- **Drag Over**: Cuando se arrastra archivos sobre el área
- **Cargando**: Durante el proceso de carga

### Interacciones

- **Click**: Abre el selector de archivos
- **Drag & Drop**: Arrastrar archivos al área
- **Validación**: Verifica tipo, tamaño y cantidad
- **Vista previa**: Para imágenes y avatares

### Responsive

- **Móvil**: Adaptación automática en pantallas pequeñas
- **Desktop**: Diseño optimizado para pantallas grandes
- **Accesibilidad**: Soporte completo para lectores

## ✅ Características

- ✅ 5 variantes diferentes (basic, image-preview, multi-file, compact, avatar)
- ✅ 4 tamaños predefinidos (sm, md, lg, xl)
- ✅ Drag & drop nativo
- ✅ Vista previa de imágenes
- ✅ Validación de archivos
- ✅ Configuración avanzada
- ✅ Eventos completos
- ✅ Estados deshabilitados
- ✅ Responsive design
- ✅ Accesibilidad completa
- ✅ Integración con Upload service
- ✅ Compresión de imágenes
- ✅ Redimensionamiento automático
- ✅ Tipos de archivo personalizables
- ✅ Límites de tamaño y cantidad
- ✅ Tooltips informativos

## 🎨 Estilos Automáticos

- **Variantes**: Cada variante tiene diseño único
- **Tamaños**: Escalado proporcional automático
- **Drag & Drop**: Indicadores visuales de estado
- **Responsive**: Adaptación automática en móviles
- **Accesibilidad**: Indicadores de estado y ARIA

## 🔧 Funcionalidades Especiales

### Drag & Drop

```typescript
// Arrastrar archivos al área
// El componente maneja automáticamente el drag & drop
```

### Vista Previa

```typescript
// Vista previa automática para imágenes
variant = "image-preview";
```

### Validación Avanzada

```typescript
// Configuración de validación
[config]="{
  maxFileSize: 10,
  allowedTypes: ['image/*'],
  maxFiles: 5
}"
```

### Compresión

```typescript
// Compresión automática de imágenes
[config]="{
  enableResize: true,
  compressionQuality: 0.8
}"
```

## 🚨 Solución de Problemas

| Problema                  | Solución                                                  |
| ------------------------- | --------------------------------------------------------- |
| Archivos no se cargan     | Verifica que `config` esté configurado correctamente      |
| Drag & drop no funciona   | Verifica que `disabled` no esté en `true`                 |
| Vista previa no aparece   | Verifica que `variant` sea `image-preview`                |
| Validación falla          | Verifica `maxFileSize`, `allowedTypes` y `maxFiles`       |
| Eventos no se emiten      | Verifica que los métodos estén definidos en el componente |
| Responsive no funciona    | Verifica que el CSS responsive esté cargado               |
| Accesibilidad no funciona | Verifica que los tooltips estén configurados              |

## 🐞 Reportar Problemas

Si encuentras algún problema en la lógica del componente, por favor
[🐞Reportalo](https://github.com/Alexiisart/openiis-ui/issues/new)
