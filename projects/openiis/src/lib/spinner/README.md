# Spinner

Componente de indicador de carga elegante y reutilizable con múltiples variantes, tamaños, colores y velocidades de animación.

## 📦 Instalación

```typescript
import { OpeniisSpinnerComponent } from 'openiis-ui';

@Component({
  imports: [OpeniisSpinnerComponent],
})
```

## ⚙️ Properties

| Property       | Tipo                               | Default                      | Descripción                           |
| -------------- | ---------------------------------- | ---------------------------- | ------------------------------------- |
| `variant`      | `SpinnerVariant`                   | `'circle'`                   | Tipo de animación del spinner         |
| `size`         | `SpinnerSize`                      | `'md'`                       | Tamaño del spinner                    |
| `color`        | `SpinnerColor`                     | `'primary'`                  | Color del spinner                     |
| `speed`        | `SpinnerSpeed`                     | `'normal'`                   | Velocidad de la animación             |
| `text`         | `string`                           | `undefined`                  | Texto de carga opcional               |
| `overlay`      | `boolean`                          | `false`                      | Si mostrar overlay de fondo           |
| `overlayColor` | `string`                           | `'rgba(255, 255, 255, 0.8)'` | Color del overlay                     |
| `customSize`   | `string`                           | `undefined`                  | Tamaño personalizado (CSS)            |
| `customColor`  | `string`                           | `undefined`                  | Color personalizado (CSS)             |
| `customSpeed`  | `string`                           | `undefined`                  | Velocidad personalizada (CSS)         |
| `ariaLabel`    | `string`                           | `'Cargando...'`              | Etiqueta para accesibilidad           |
| `ariaLive`     | `'polite' \| 'assertive' \| 'off'` | `'polite'`                   | Nivel de anuncio para lectores        |
| `role`         | `string`                           | `'status'`                   | Rol ARIA del componente               |
| `centered`     | `boolean`                          | `false`                      | Si centrar el spinner                 |
| `inline`       | `boolean`                          | `false`                      | Si mostrar inline con otros elementos |
| `visible`      | `boolean`                          | `true`                       | Si el spinner está visible            |

## 📡 Events

Este componente no emite eventos directamente, pero se integra con otros componentes para mostrar estados de carga.

## 🎨 Variantes

| Variante | Descripción                        | Uso                  |
| -------- | ---------------------------------- | -------------------- |
| `circle` | Círculo giratorio (default)        | Carga general        |
| `dots`   | Puntos animados                    | Carga de datos       |
| `bars`   | Barras animadas                    | Procesamiento        |
| `pulse`  | Pulso expandible                   | Carga de archivos    |
| `wave`   | Ondas animadas                     | Carga de contenido   |
| `ring`   | Anillo giratorio                   | Carga de formularios |
| `bounce` | Pelotas rebotando                  | Carga divertida      |
| `fade`   | Elementos que aparecen/desaparecen | Carga elegante       |

## 📏 Tamaños

| Tamaño | Descripción              | Uso               |
| ------ | ------------------------ | ----------------- |
| `xs`   | Extra pequeño (16px)     | Iconos pequeños   |
| `sm`   | Pequeño (20px)           | Botones pequeños  |
| `md`   | Mediano (24px) - default | Uso general       |
| `lg`   | Grande (32px)            | Carga principal   |
| `xl`   | Extra grande (40px)      | Carga de pantalla |

## 🎨 Colores

| Color       | Descripción               | Uso                   |
| ----------- | ------------------------- | --------------------- |
| `primary`   | Color principal (default) | Uso general           |
| `secondary` | Color secundario          | Elementos secundarios |
| `success`   | Color de éxito            | Operaciones exitosas  |
| `warning`   | Color de advertencia      | Advertencias          |
| `danger`    | Color de error            | Errores y problemas   |
| `info`      | Color informativo         | Información           |
| `light`     | Color claro               | Fondos claros         |
| `dark`      | Color oscuro              | Fondos oscuros        |

## ⚡ Velocidades

| Velocidad | Descripción           | Uso          |
| --------- | --------------------- | ------------ |
| `slow`    | Lenta (2s)            | Carga lenta  |
| `normal`  | Normal (1s) - default | Uso general  |
| `fast`    | Rápida (0.5s)         | Carga rápida |

## 🏗️ Interfaces

```typescript
type SpinnerVariant = "circle" | "dots" | "bars" | "pulse" | "wave" | "ring" | "bounce" | "fade";
type SpinnerSize = "xs" | "sm" | "md" | "lg" | "xl";
type SpinnerColor = "primary" | "secondary" | "success" | "warning" | "danger" | "info" | "light" | "dark";
type SpinnerSpeed = "slow" | "normal" | "fast";
```

## 💡 Ejemplos Prácticos

### 1. Spinner Básico

```html
<openiis-spinner variant="circle" size="md" color="primary"> </openiis-spinner>
```

### 2. Diferentes Variantes

```html
<div class="spinner-examples">
  <!-- Circle spinner -->
  <openiis-spinner variant="circle" size="md" color="primary"></openiis-spinner>

  <!-- Dots spinner -->
  <openiis-spinner variant="dots" size="md" color="success"></openiis-spinner>

  <!-- Bars spinner -->
  <openiis-spinner variant="bars" size="md" color="warning"></openiis-spinner>

  <!-- Pulse spinner -->
  <openiis-spinner variant="pulse" size="md" color="danger"></openiis-spinner>
</div>
```

### 3. Diferentes Tamaños

```html
<div class="spinner-sizes">
  <openiis-spinner variant="circle" size="xs" color="primary"></openiis-spinner>
  <openiis-spinner variant="circle" size="sm" color="primary"></openiis-spinner>
  <openiis-spinner variant="circle" size="md" color="primary"></openiis-spinner>
  <openiis-spinner variant="circle" size="lg" color="primary"></openiis-spinner>
  <openiis-spinner variant="circle" size="xl" color="primary"></openiis-spinner>
</div>
```

### 4. Spinner con Texto

```html
<openiis-spinner variant="circle" size="md" color="primary" text="Cargando..."> </openiis-spinner>
```

### 5. Spinner con Overlay

```html
<openiis-spinner variant="circle" size="lg" color="primary" [overlay]="true" overlayColor="rgba(0, 0, 0, 0.5)" text="Procesando datos..."> </openiis-spinner>
```

### 6. Spinner Centrado

```html
<openiis-spinner variant="pulse" size="xl" color="success" [centered]="true" text="Guardando cambios..."> </openiis-spinner>
```

### 7. Spinner Inline

```html
<div class="inline-content">
  <span>Procesando:</span>
  <openiis-spinner variant="dots" size="sm" color="info" [inline]="true"></openiis-spinner>
  <span>archivos...</span>
</div>
```

### 8. Spinner con Tamaño Personalizado

```html
<openiis-spinner variant="ring" color="primary" customSize="60px" text="Carga personalizada"> </openiis-spinner>
```

### 9. Spinner con Color Personalizado

```html
<openiis-spinner variant="wave" size="lg" customColor="#ff6b6b" text="Carga con color personalizado"> </openiis-spinner>
```

### 10. Spinner con Velocidad Personalizada

```html
<openiis-spinner variant="bounce" size="md" color="warning" customSpeed="0.3s" text="Carga rápida"> </openiis-spinner>
```

### 11. Spinner Condicional

```html
<openiis-spinner variant="circle" size="md" color="primary" [visible]="isLoading" text="Cargando datos..."> </openiis-spinner>
```

```typescript
export class MyComponent {
  isLoading = false;

  loadData() {
    this.isLoading = true;
    // Simular carga
    setTimeout(() => {
      this.isLoading = false;
    }, 3000);
  }
}
```

### 12. Spinner con Estados Dinámicos

```html
<openiis-spinner [variant]="spinnerVariant" [size]="spinnerSize" [color]="spinnerColor" [text]="spinnerText" [visible]="isLoading"> </openiis-spinner>
```

```typescript
export class MyComponent {
  isLoading = false;
  loadingType = "data";

  get spinnerVariant(): "circle" | "dots" | "bars" | "pulse" | "wave" | "ring" | "bounce" | "fade" {
    switch (this.loadingType) {
      case "file":
        return "pulse";
      case "data":
        return "dots";
      case "form":
        return "ring";
      default:
        return "circle";
    }
  }

  get spinnerSize(): "xs" | "sm" | "md" | "lg" | "xl" {
    return this.loadingType === "file" ? "lg" : "md";
  }

  get spinnerColor(): "primary" | "secondary" | "success" | "warning" | "danger" | "info" | "light" | "dark" {
    switch (this.loadingType) {
      case "file":
        return "success";
      case "data":
        return "primary";
      case "form":
        return "info";
      default:
        return "primary";
    }
  }

  get spinnerText(): string {
    switch (this.loadingType) {
      case "file":
        return "Subiendo archivo...";
      case "data":
        return "Cargando datos...";
      case "form":
        return "Procesando formulario...";
      default:
        return "Cargando...";
    }
  }
}
```

### 13. Spinner en Botones

```html
<button [disabled]="isLoading" (click)="handleSubmit()">
  <openiis-spinner variant="dots" size="sm" color="light" [visible]="isLoading" [inline]="true"></openiis-spinner>
  {{ isLoading ? 'Guardando...' : 'Guardar' }}
</button>
```

### 14. Spinner en Formularios

```html
<form (ngSubmit)="submitForm()">
  <div class="form-content" [class.loading]="isSubmitting">
    <!-- Campos del formulario -->
    <input type="text" placeholder="Nombre" />
    <input type="email" placeholder="Email" />

    <!-- Spinner de carga -->
    <openiis-spinner variant="ring" size="md" color="primary" [visible]="isSubmitting" [overlay]="true" text="Enviando formulario..."></openiis-spinner>
  </div>

  <button type="submit" [disabled]="isSubmitting">Enviar</button>
</form>
```

### 15. Spinner en Tablas

```html
<table>
  <thead>
    <tr>
      <th>Nombre</th>
      <th>Email</th>
      <th>Acciones</th>
    </tr>
  </thead>
  <tbody>
    <tr *ngFor="let user of users">
      <td>{{ user.name }}</td>
      <td>{{ user.email }}</td>
      <td>
        <openiis-spinner variant="dots" size="xs" color="primary" [visible]="user.loading" [inline]="true"></openiis-spinner>
        <button (click)="editUser(user)">Editar</button>
      </td>
    </tr>
  </tbody>
</table>
```

## ⚡ Comportamiento

### Estados

- **Visible**: Estado por defecto (mostrando animación)
- **Oculto**: Cuando `visible` es `false`
- **Overlay**: Cuando `overlay` es `true` (cubre toda la pantalla)

### Animaciones

- **Circle**: Rotación continua
- **Dots**: Puntos que aparecen/desaparecen
- **Bars**: Barras que cambian de altura
- **Pulse**: Expansión y contracción
- **Wave**: Ondas que se propagan
- **Ring**: Anillo que gira
- **Bounce**: Pelotas que rebotan
- **Fade**: Elementos que aparecen/desaparecen

### Responsive

- **Móvil**: Tamaños reducidos automáticamente
- **Desktop**: Tamaños completos
- **Accesibilidad**: Soporte completo para lectores

## ✅ Características

- ✅ 8 variantes de animación diferentes
- ✅ 5 tamaños predefinidos
- ✅ 8 colores temáticos
- ✅ 3 velocidades de animación
- ✅ Soporte para overlay completo
- ✅ Texto de carga opcional
- ✅ Tamaños y colores personalizados
- ✅ Modo inline y centrado
- ✅ Accesibilidad completa
- ✅ ARIA roles y labels
- ✅ Animaciones CSS optimizadas
- ✅ Responsive design
- ✅ Soporte para lectores de pantalla
- ✅ Reducción de movimiento
- ✅ Alto contraste
- ✅ Modo impresión

## 🎨 Estilos Automáticos

- **Variantes**: Cada variante tiene animación única
- **Tamaños**: Escalado proporcional automático
- **Colores**: Integración con el sistema de colores
- **Responsive**: Adaptación automática en móviles
- **Accesibilidad**: Indicadores de estado y ARIA

## 🔧 Funcionalidades Especiales

### Overlay Completo

```typescript
// Spinner que cubre toda la pantalla
<openiis-spinner [overlay]="true" overlayColor="rgba(0, 0, 0, 0.7)">
```

### Tamaños Personalizados

```typescript
// Tamaño específico en CSS
customSize = "80px";
```

### Colores Personalizados

```typescript
// Color específico
customColor = "#ff6b6b";
```

### Velocidades Personalizadas

```typescript
// Velocidad específica
customSpeed = "0.3s";
```

### Modo Inline

```typescript
// Spinner que se integra con texto
[inline] = "true";
```

## 🚨 Solución de Problemas

| Problema                  | Solución                                              |
| ------------------------- | ----------------------------------------------------- |
| Spinner no aparece        | Verifica que `visible` esté en `true`                 |
| Animación no funciona     | Verifica que `variant` esté configurado correctamente |
| Color no cambia           | Verifica que `color` esté configurado                 |
| Tamaño incorrecto         | Verifica que `size` esté configurado                  |
| Overlay no funciona       | Verifica que `overlay` esté en `true`                 |
| Texto no aparece          | Verifica que `text` esté configurado                  |
| Responsive no funciona    | Verifica que el CSS responsive esté cargado           |
| Accesibilidad no funciona | Verifica que `ariaLabel` esté configurado             |

## 🐞 Reportar Problemas

Si encuentras algún problema en la lógica del componente, por favor
[🐞Reportalo](https://github.com/Alexiisart/openiis-ui/issues/new)
