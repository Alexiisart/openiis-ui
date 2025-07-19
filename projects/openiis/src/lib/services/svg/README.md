# SVG Icon Directive

Directiva Angular para cargar y manipular iconos SVG de forma dinámica con múltiples opciones de personalización.

## 📦 Instalación

```typescript
import { SvgIconDirective, EasyIconDirective } from 'openiis-ui';

@Component({
  imports: [SvgIconDirective, EasyIconDirective],
})
```

## ⚙️ Properties

| Property         | Tipo               | Default | Descripción                    |
| ---------------- | ------------------ | ------- | ------------------------------ |
| `svgIcon`        | `string`           | `''`    | Ruta del archivo SVG           |
| `svgColor`       | `string`           | `''`    | Color del icono                |
| `svgBackground`  | `string`           | `''`    | Color de fondo                 |
| `svgWidth`       | `string \| number` | `''`    | Ancho del icono                |
| `svgHeight`      | `string \| number` | `''`    | Alto del icono                 |
| `svgSize`        | `string \| number` | `''`    | Tamaño uniforme (ancho y alto) |
| `svgStroke`      | `string`           | `''`    | Color del trazo                |
| `svgStrokeWidth` | `string \| number` | `''`    | Grosor del trazo               |
| `svgOpacity`     | `number`           | `1`     | Opacidad del icono             |
| `svgRotate`      | `number`           | `0`     | Rotación en grados             |
| `svgFlipH`       | `boolean`          | `false` | Voltear horizontalmente        |
| `svgFlipV`       | `boolean`          | `false` | Voltear verticalmente          |
| `svgClass`       | `string`           | `''`    | Clase CSS personalizada        |

## 💡 Easy Icon Directive (Prioritario)

### Sintaxis Simplificada

```html
<!-- Formato: "path,color,width,height" -->
<div easyIcon="assets/home.svg,#f39c12,50px"></div>
<div easyIcon="assets/fixed.svg,#e74c3c,20px"></div>
<div easyIcon="assets/key.svg,#3498db,60px"></div>
```

### Ejemplos Prácticos

#### 1. Icono Básico

```html
<div svgIcon="assets/icons/heart.svg"></div>
```

#### 2. Icono con Color y Tamaño

```html
<div svgIcon="assets/icons/notification.svg" svgColor="#e67e22" svgSize="36px"></div>
```

#### 3. Icono con Efectos

```html
<div svgIcon="assets/icons/arrow.svg" svgColor="#2ecc71" svgSize="32px" svgBackground="#ffffff" svgOpacity="0.9" svgRotate="90"></div>
```

#### 4. Icono Dinámico

````html
<div svgIcon="assets/home.svg" [svgColor]="getStatusColor()" svgSize="50px" [svgRotate]="isLoading ? 180 : 0"></div>
``` ```typescript export class MyComponent { isLoading = false; getStatusColor(): string { return this.isLoading ? "#f39c12" : "#27ae60"; } }
````

#### 5. Icono con Tema Adaptativo

```html
<div svgIcon="assets/icons/theme-adaptive.svg" [svgColor]="getThemeIconColor()" svgSize="24px"></div>
```

```typescript
export class MyComponent {
  constructor(private themeService: ThemeService) {}

  getThemeIconColor(): string {
    return this.themeService.isDarkMode() ? "#ffffff" : "#000000";
  }
}
```

## 🏗️ Interfaces

```typescript
interface SvgIconOptions {
  color?: string;
  backgroundColor?: string;
  width?: string | number;
  height?: string | number;
  className?: string;
  strokeColor?: string;
  strokeWidth?: string | number;
  opacity?: number;
  fontSize?: string | number;
  rotate?: number;
  flipHorizontal?: boolean;
  flipVertical?: boolean;
}

interface SvgIconResult {
  html: SafeHtml;
  element: HTMLElement;
  destroy: () => void;
}
```

## 🔧 Uso del Servicio

### Carga de Iconos

```typescript
export class MyComponent {
  constructor(private svgIconService: SvgIconService) {}

  loadIcon() {
    this.svgIconService
      .icon("assets/icons/star.svg", {
        color: "#f39c12",
        width: "24px",
        height: "24px",
      })
      .subscribe((result) => {
        // result.element contiene el elemento SVG
        // result.destroy() para limpiar
      });
  }
}
```

### Iconos Inline

```typescript
export class MyComponent {
  @ViewChild("iconContainer") iconContainer!: ElementRef;

  constructor(private svgIconService: SvgIconService) {}

  loadInlineIcon() {
    this.svgIconService.inlineIcon(this.iconContainer.nativeElement, "assets/icons/check.svg", { color: "#27ae60", size: "24px" }).subscribe((destroyFn) => {
      // destroyFn() para limpiar cuando sea necesario
    });
  }
}
```

### Actualización de Colores

```typescript
export class MyComponent {
  updateIconColor() {
    this.svgIconService.updateIconColor("assets/icons/star.svg", {
      color: "#e74c3c",
    });
  }
}
```

### Pre-carga de Iconos

```typescript
export class MyComponent {
  constructor(private svgIconService: SvgIconService) {}

  preloadCriticalIcons() {
    const criticalIcons = ["assets/icons/heart.svg", "assets/icons/star.svg", "assets/icons/user.svg", "assets/icons/settings.svg"];

    this.svgIconService.preloadIcons(criticalIcons).subscribe((success) => {
      console.log("Iconos críticos cargados:", success);
    });
  }
}
```

### Configuración Global

```typescript
export class MyComponent {
  constructor(private svgIconService: SvgIconService) {}

  setGlobalStyles() {
    this.svgIconService.setGlobalIconStyles({
      color: "#34495e",
      width: "24px",
      height: "24px",
      opacity: 0.8,
    });
  }
}
```

### Limpieza de Cache

```typescript
export class MyComponent {
  constructor(private svgIconService: SvgIconService) {}

  clearCache() {
    this.svgIconService.clearCache();
  }
}
```

## ⚡ Comportamiento

### Estados

- **Cargando**: Durante la carga del SVG
- **Cargado**: Icono visible y funcional
- **Error**: Icono de error mostrado
- **Destruido**: Limpieza de recursos

### Optimizaciones

- **Cache**: Iconos cacheados automáticamente
- **Preload**: Carga anticipada de iconos críticos
- **Lazy Loading**: Carga bajo demanda
- **Memory Management**: Limpieza automática de recursos

### Responsive

- **Tamaños dinámicos**: Adaptación automática
- **Colores temáticos**: Cambio según tema
- **Animaciones**: Efectos suaves
- **Accesibilidad**: Soporte completo para lectores

## ✅ Características

- ✅ Carga dinámica de SVGs
- ✅ Personalización completa de colores
- ✅ Tamaños configurables
- ✅ Rotación y volteado
- ✅ Opacidad y efectos
- ✅ Cache automático
- ✅ Pre-carga de iconos
- ✅ Configuración global
- ✅ Manejo de errores
- ✅ Limpieza de memoria
- ✅ Responsive design
- ✅ Accesibilidad completa
- ✅ Easy Icon Directive
- ✅ Integración con servicios
- ✅ Animaciones CSS

## 🎨 Estilos Automáticos

- **Colores**: Integración con CSS variables
- **Tamaños**: Escalado proporcional
- **Efectos**: Transiciones suaves
- **Responsive**: Adaptación automática
- **Temas**: Soporte para modo oscuro/claro

## 🔧 Funcionalidades Especiales

### Cache Inteligente

```typescript
// Los iconos se cachean automáticamente
// No se vuelven a cargar si ya están en memoria
```

### Pre-carga

```typescript
// Cargar iconos críticos antes de usarlos
this.svgIconService.preloadIcons(["icon1.svg", "icon2.svg"]);
```

### Configuración Global

```typescript
// Aplicar estilos a todos los iconos
this.svgIconService.setGlobalIconStyles({ color: "#333" });
```

### Easy Icon

```typescript
// Sintaxis simplificada
<div easyIcon="path.svg,#color,24px,24px"></div>
```

## 🚨 Solución de Problemas

| Problema               | Solución                                                         |
| ---------------------- | ---------------------------------------------------------------- |
| Icono no aparece       | Verifica que la ruta del SVG sea correcta                        |
| Color no cambia        | Verifica que `svgColor` esté configurado                         |
| Tamaño incorrecto      | Verifica que `svgSize` o `svgWidth/svgHeight` estén configurados |
| Error de carga         | Verifica que el archivo SVG exista y sea válido                  |
| Memoria no se libera   | Llama a `destroy()` cuando sea necesario                         |
| Cache no funciona      | Verifica que el servicio esté inyectado correctamente            |
| Responsive no funciona | Verifica que los tamaños sean dinámicos                          |

## 🐞 Reportar Problemas

Si encuentras algún problema en la lógica del componente, por favor
[🐞Reportalo](https://github.com/Alexiisart/openiis-ui/issues/new)
