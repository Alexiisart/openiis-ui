# SvgIconService

Servicio avanzado para carga y procesamiento dinámico de iconos SVG con transformaciones en tiempo real y múltiples métodos de implementación.

## Características Principales

- **API Ultra-Simple**: Una línea de código para iconos completos
- **Transformaciones Dinámicas**: Colores, tamaños, rotaciones en tiempo real
- **Caché Inteligente**: Carga una vez, usa múltiples veces
- **Directivas Múltiples**: Desde súper simple hasta control total
- **Manejo de Errores**: SVG de respaldo automático
- **Procesamiento Automático**: Colores fill/stroke, viewBox, dimensiones

## Instalación y Configuración

### Importación Básica

```typescript
import { SvgIconService } from "./svg-icon.service";
import { SvgIconDirective, EasyIconDirective } from "./svg-icon.directive";

@Component({
  imports: [SvgIconDirective, EasyIconDirective],
  // ...
})
export class MyComponent {
  constructor(private svgIconService: SvgIconService) {}
}
```

### Configuración Global (Opcional)

```typescript
// En app.config.ts o module
export class AppComponent implements OnInit {
  constructor(private svgIconService: SvgIconService) {}

  ngOnInit() {
    // Configurar estilos globales
    this.svgIconService.setGlobalIconStyles({
      transition: "all 0.3s ease",
      cursor: "pointer",
    });

    // Pre-cargar iconos comunes
    this.svgIconService.preloadIcons(["assets/icons/heart.svg", "assets/icons/star.svg", "assets/icons/user.svg"]);
  }
}
```

## Métodos de Uso

### 1. Método Ultra-Simple (EasyIcon)

Perfecto para iconos básicos con configuración mínima:

```html
<!-- Un icono con color y tamaño -->
<div easyIcon="assets/heart.svg, #e74c3c, 24px"></div>

<!-- Con fondo -->
<div easyIcon="assets/star.svg, #f1c40f, 32px, #ffffff"></div>

<!-- Con opacidad -->
<div easyIcon="assets/user.svg, #3498db, 28px, transparent, 0.8"></div>

<!-- Configuración completa -->
<div easyIcon="assets/settings.svg, #34495e, 40px, #ecf0f1, 1, 45deg"></div>
```

**Formato**: `ruta, color, tamaño, fondo?, opacidad?, rotación?`

### 2. Método de Control Detallado

Para transformaciones avanzadas y control granular:

```html
<!-- Control básico -->
<div svgIcon="assets/icons/notification.svg" svgColor="#e67e22" svgSize="36px"></div>

<!-- Con transformaciones -->
<div svgIcon="assets/icons/arrow.svg" svgColor="#2ecc71" svgSize="32px" svgBackground="#ffffff" svgOpacity="0.9" svgRotate="90"></div>

<!-- Con animaciones hover -->
<div svgIcon="assets/icons/heart.svg" svgColor="#e74c3c" svgSize="28px" [svgHoverScale]="1.2" [svgHoverRotate]="15"></div>

<!-- Volteo horizontal/vertical -->
<div svgIcon="assets/icons/chevron.svg" svgColor="#3498db" svgSize="24px" [svgFlipH]="true" [svgFlipV]="false"></div>
```

### 3. Método Programático

Para uso dinámico desde el componente TypeScript:

```typescript
export class IconDemoComponent implements OnInit {
  constructor(private svgIconService: SvgIconService) {}

  async loadDynamicIcon() {
    try {
      // Cargar icono con configuración
      const iconElement = await this.svgIconService.icon("assets/icons/star.svg", {
        color: "#f1c40f",
        size: "48px",
        background: "#2c3e50",
        opacity: 0.9,
        rotate: 0,
      });

      // Agregar al DOM
      const container = document.getElementById("icon-container");
      container?.appendChild(iconElement);
    } catch (error) {
      console.error("Error cargando icono:", error);
    }
  }

  async updateIconColor(element: HTMLElement, newColor: string) {
    // Cambiar color dinámicamente
    await this.svgIconService.updateIconColor(element, newColor);
  }

  generateInlineIcon(): string {
    // Para uso en innerHTML o plantillas dinámicas
    return this.svgIconService.inlineIcon("assets/icons/check.svg", {
      color: "#27ae60",
      size: "20px",
    });
  }
}
```

## Configuración de Opciones

### IconOptions Interface

```typescript
interface IconOptions {
  color?: string; // Color fill/stroke (#hex, rgb, hsl, nombres CSS)
  size?: string; // Tamaño (px, em, rem, %)
  background?: string; // Color de fondo
  opacity?: number; // Opacidad (0-1)
  rotate?: number; // Rotación en grados
  flipH?: boolean; // Volteo horizontal
  flipV?: boolean; // Volteo vertical
  hoverScale?: number; // Escala en hover
  hoverRotate?: number; // Rotación en hover
  transition?: string; // Transición CSS personalizada
}
```

### Ejemplos de Configuración

```typescript
// Configuración básica
const basicOptions: IconOptions = {
  color: "#3498db",
  size: "24px",
};

// Configuración avanzada
const advancedOptions: IconOptions = {
  color: "#e74c3c",
  size: "32px",
  background: "#ffffff",
  opacity: 0.8,
  rotate: 45,
  flipH: false,
  flipV: true,
  hoverScale: 1.1,
  hoverRotate: 10,
  transition: "all 0.4s cubic-bezier(0.4, 0, 0.2, 1)",
};

// Configuración para botones
const buttonIconOptions: IconOptions = {
  color: "#ffffff",
  size: "18px",
  hoverScale: 1.15,
  transition: "transform 0.2s ease",
};
```

## Ejemplos Avanzados

### Galería de Iconos Dinámicos

```typescript
@Component({
  template: `
    <div class="icon-gallery">
      <div class="icon-grid">
        <div *ngFor="let icon of icons; let i = index" [easyIcon]="getIconConfig(icon, i)" class="gallery-icon" (click)="selectIcon(icon)"></div>
      </div>
    </div>
  `,
  styles: `
    .icon-grid {
      display: grid;
      grid-template-columns: repeat(auto-fill, minmax(60px, 1fr));
      gap: 16px;
      padding: 20px;
    }

    .gallery-icon {
      width: 60px;
      height: 60px;
      display: flex;
      align-items: center;
      justify-content: center;
      border-radius: 12px;
      cursor: pointer;
      transition: all 0.3s ease;
    }

    .gallery-icon:hover {
      transform: translateY(-4px);
      box-shadow: 0 8px 25px rgba(0,0,0,0.15);
    }
  `,
})
export class IconGalleryComponent {
  icons = ["assets/icons/heart.svg", "assets/icons/star.svg", "assets/icons/user.svg", "assets/icons/settings.svg", "assets/icons/notification.svg"];

  colors = ["#e74c3c", "#f1c40f", "#3498db", "#2ecc71", "#9b59b6"];
  backgrounds = ["#ffffff", "#f8f9fa", "#e9ecef", "#dee2e6", "#ced4da"];

  getIconConfig(iconPath: string, index: number): string {
    const color = this.colors[index % this.colors.length];
    const background = this.backgrounds[index % this.backgrounds.length];
    return `${iconPath}, ${color}, 28px, ${background}, 0.9`;
  }

  selectIcon(iconPath: string) {
    console.log("Icono seleccionado:", iconPath);
  }
}
```

### Sistema de Estado con Iconos

```typescript
@Component({
  template: `
    <div class="status-indicator">
      <div svgIcon="assets/icons/status.svg" [svgColor]="getStatusColor()" svgSize="24px" [svgRotate]="isLoading ? 360 : 0" [style.animation]="isLoading ? 'spin 1s linear infinite' : 'none'"></div>
      <span class="status-text">{{ getStatusText() }}</span>
    </div>
  `,
  styles: `
    @keyframes spin {
      from { transform: rotate(0deg); }
      to { transform: rotate(360deg); }
    }

    .status-indicator {
      display: flex;
      align-items: center;
      gap: 8px;
      padding: 8px 12px;
      border-radius: 6px;
      background: var(--surface-color);
    }
  `,
})
export class StatusIndicatorComponent {
  @Input() status: "loading" | "success" | "error" | "warning" = "loading";

  get isLoading(): boolean {
    return this.status === "loading";
  }

  getStatusColor(): string {
    const colors = {
      loading: "#6c757d",
      success: "#28a745",
      error: "#dc3545",
      warning: "#ffc107",
    };
    return colors[this.status];
  }

  getStatusText(): string {
    const texts = {
      loading: "Procesando...",
      success: "Completado",
      error: "Error",
      warning: "Advertencia",
    };
    return texts[this.status];
  }
}
```

### Iconos con Badges Dinámicos

```typescript
@Component({
  template: `
    <div class="icon-with-badge" [class.has-notification]="hasNotification">
      <div easyIcon="assets/icons/notification.svg, #6c757d, 28px" class="main-icon"></div>
      <div *ngIf="notificationCount > 0" easyIcon="assets/icons/circle.svg, #dc3545, 20px" class="badge">
        <span class="badge-count">{{ getDisplayCount() }}</span>
      </div>
    </div>
  `,
  styles: `
    .icon-with-badge {
      position: relative;
      display: inline-block;
    }

    .badge {
      position: absolute;
      top: -8px;
      right: -8px;
      display: flex;
      align-items: center;
      justify-content: center;
      min-width: 20px;
      height: 20px;
      border-radius: 50%;
    }

    .badge-count {
      color: white;
      font-size: 11px;
      font-weight: 600;
      line-height: 1;
    }

    .has-notification .main-icon {
      animation: pulse 2s infinite;
    }

    @keyframes pulse {
      0%, 100% { opacity: 1; }
      50% { opacity: 0.7; }
    }
  `,
})
export class IconWithBadgeComponent {
  @Input() notificationCount: number = 0;

  get hasNotification(): boolean {
    return this.notificationCount > 0;
  }

  getDisplayCount(): string {
    return this.notificationCount > 99 ? "99+" : this.notificationCount.toString();
  }
}
```

## Optimización y Rendimiento

### Pre-carga de Iconos

```typescript
// En AppComponent o servicio de inicialización
export class AppInitService {
  constructor(private svgIconService: SvgIconService) {}

  async initializeApp() {
    // Pre-cargar iconos críticos
    const criticalIcons = ["assets/icons/menu.svg", "assets/icons/close.svg", "assets/icons/search.svg", "assets/icons/user.svg"];

    await this.svgIconService.preloadIcons(criticalIcons);
    console.log("Iconos críticos pre-cargados");
  }
}
```

### Gestión de Caché

```typescript
export class IconCacheService {
  constructor(private svgIconService: SvgIconService) {}

  // Limpiar caché selectivamente
  clearIconCache(patterns: string[] = []) {
    // El servicio maneja automáticamente el caché
    // pero puedes implementar limpieza personalizada
    patterns.forEach((pattern) => {
      // Lógica de limpieza por patrón
    });
  }

  // Obtener estadísticas de caché
  getCacheStats() {
    // Implementar métricas de uso del caché
    return {
      totalIcons: 0,
      cacheHits: 0,
      cacheMisses: 0,
    };
  }
}
```

## Manejo de Errores

### Estrategias de Fallback

```typescript
@Component({
  template: `
    <!-- Icono principal con fallback automático -->
    <div svgIcon="assets/icons/custom-icon.svg" svgColor="#3498db" svgSize="24px" (error)="handleIconError($event)"></div>

    <!-- Fallback manual -->
    <div *ngIf="iconLoadFailed" class="fallback-icon">📄</div>
  `,
})
export class IconWithFallbackComponent {
  iconLoadFailed = false;

  handleIconError(error: any) {
    console.warn("Error cargando icono:", error);
    this.iconLoadFailed = true;
  }
}
```

### Logging y Debugging

```typescript
export class IconDebugService {
  constructor(private svgIconService: SvgIconService) {}

  enableDebugMode() {
    // Habilitar logs detallados
    this.svgIconService.setDebugMode(true);
  }

  logIconUsage() {
    // Estadísticas de uso de iconos
    const stats = this.svgIconService.getUsageStats();
    console.table(stats);
  }
}
```

## Integración con Temas

### Iconos Adaptativos

```typescript
@Component({
  template: ` <div svgIcon="assets/icons/theme-adaptive.svg" [svgColor]="getThemeIconColor()" svgSize="24px" class="theme-icon"></div> `,
})
export class ThemeAdaptiveIconComponent {
  constructor(private svgIconService: SvgIconService, private themeService: ThemeService) {}

  getThemeIconColor(): string {
    const currentTheme = this.themeService.getCurrentTheme();

    const themeColors = {
      light: "#2c3e50",
      dark: "#ecf0f1",
      auto: this.getSystemThemeColor(),
    };

    return themeColors[currentTheme] || "#6c757d";
  }

  private getSystemThemeColor(): string {
    return window.matchMedia("(prefers-color-scheme: dark)").matches ? "#ecf0f1" : "#2c3e50";
  }
}
```

## Mejores Prácticas

### ✅ DO - Recomendaciones

1. **Usar EasyIcon para casos simples**: Una línea para iconos básicos
2. **Pre-cargar iconos críticos**: Mejora la experiencia del usuario
3. **Implementar fallbacks**: Siempre tener un plan B
4. **Aprovechar el caché**: El servicio optimiza automáticamente
5. **Usar colores consistentes**: Seguir el sistema de design

### ❌ DON'T - Evitar

1. **Cargar iconos muy grandes**: Optimizar SVGs antes de usar
2. **Olvidar cleanup**: El servicio limpia automáticamente
3. **Hardcodear rutas**: Usar constantes o configuración
4. **Ignorar errores**: Implementar manejo apropiado
5. **Sobrecargar transformaciones**: Usar con moderación

## Compatibilidad

- **Angular 15+** - Versión mínima requerida
- **Navegadores modernos** - Chrome 80+, Firefox 75+, Safari 13+
- **TypeScript 4.7+** - Para mejor tipado
- **RxJS 7+** - Para observables y operadores

## Dependencias

- **@angular/core** - Funcionalidad base de Angular
- **@angular/common/http** - Para carga HTTP de SVGs
- **rxjs** - Manejo de observables y caché

## Contribución

Para contribuir al SvgIconService:

1. Mantener compatibilidad con API existente
2. Agregar tests para nuevas funcionalidades
3. Documentar cambios en este README
4. Seguir patrones de código establecidos
