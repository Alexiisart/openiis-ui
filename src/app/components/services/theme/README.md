# ThemeService

## Descripción

El `OpeniisThemeService` gestiona los temas visuales de la aplicación, proporcionando 4 tipos de temas predefinidos (classic, neutral, vivid, custom) con soporte para configuración personalizada de colores y persistencia de preferencias.

## Características

- ✅ **4 temas predefinidos:** classic, neutral, vivid, custom
- ✅ **Tema personalizado:** Configuración de colores custom con generación automática de paletas
- ✅ **Persistencia:** Guarda preferencias y configuraciones en localStorage
- ✅ **Observable reactivo:** Cambios en tiempo real con BehaviorSubject
- ✅ **Aplicación automática:** Inyección automática de variables CSS
- ✅ **Generación de paletas:** Creación automática de variaciones de color
- ✅ **TypeScript:** Tipado completo para temas y configuraciones

## Importación

```typescript
import { OpeniisThemeService, OpeniisTheme, CustomThemeConfig } from "./services/theme.service";
```

## Uso Básico

### 1. Inyectar el servicio

```typescript
import { Component } from "@angular/core";
import { OpeniisThemeService, OpeniisTheme } from "../services/theme.service";

@Component({
  selector: "app-theme-selector",
  template: `
    <div class="theme-selector">
      <h3>Seleccionar Tema</h3>
      <select (change)="onThemeChange($event)" [value]="currentTheme">
        <option value="classic">Classic</option>
        <option value="neutral">Neutral</option>
        <option value="vivid">Vivid</option>
        <option value="custom">Custom</option>
      </select>
    </div>
  `,
})
export class ThemeSelectorComponent {
  currentTheme: OpeniisTheme = "classic";

  constructor(private themeService: OpeniisThemeService) {
    // Suscribirse a cambios de tema
    this.themeService.currentTheme$.subscribe((theme) => {
      this.currentTheme = theme;
    });
  }

  onThemeChange(event: Event) {
    const select = event.target as HTMLSelectElement;
    this.themeService.setTheme(select.value as OpeniisTheme);
  }
}
```

### 2. Configurar tema personalizado

```typescript
// Establecer tema custom con configuración
const customConfig: CustomThemeConfig = {
  primary: "#ff6b35",
  accent: "#4ecdc4",
  background: "#f8f9fa",
  surface: "#ffffff",
  text: "#333333",
};

this.themeService.setCustomTheme(customConfig);
```

### 3. Obtener configuración actual

```typescript
// Obtener tema actual
const currentTheme = this.themeService.getCurrentTheme();

// Obtener configuración custom actual
this.themeService.customConfig$.subscribe((config) => {
  if (config) {
    console.log("Configuración custom:", config);
  }
});
```

## Métodos Disponibles

| Método                   | Descripción                    | Parámetros          | Retorno                                 |
| ------------------------ | ------------------------------ | ------------------- | --------------------------------------- |
| `getCurrentTheme()`      | Obtiene el tema actual         | Ninguno             | `OpeniisTheme`                          |
| `setTheme(theme)`        | Establece un tema predefinido  | `OpeniisTheme`      | `void`                                  |
| `setCustomTheme(config)` | Configura el tema custom       | `CustomThemeConfig` | `void`                                  |
| `resetToDefault()`       | Restablece al tema classic     | Ninguno             | `void`                                  |
| `currentTheme$`          | Observable del tema actual     | -                   | `Observable<OpeniisTheme>`              |
| `customConfig$`          | Observable de la config custom | -                   | `Observable<CustomThemeConfig \| null>` |

## Tipos Disponibles

```typescript
type OpeniisTheme = "classic" | "neutral" | "vivid" | "custom";

interface CustomThemeConfig {
  primary: string;
  accent?: string;
  background?: string;
  surface?: string;
  text?: string;
}
```

## Temas Predefinidos

| Tema      | Descripción                   | Colores Principales            |
| --------- | ----------------------------- | ------------------------------ |
| `classic` | Tema clásico y profesional    | Azul (#007bff), gris neutro    |
| `neutral` | Tonos grises elegantes        | Grises (#6c757d), minimalista  |
| `vivid`   | Colores vibrantes y modernos  | Verde (#28a745), naranja       |
| `custom`  | Personalizable por el usuario | Definido por CustomThemeConfig |

## Ejemplo Completo: Selector de Tema Avanzado

```typescript
import { Component, OnInit, OnDestroy } from "@angular/core";
import { Subscription } from "rxjs";
import { OpeniisThemeService, OpeniisTheme, CustomThemeConfig } from "../services/theme.service";

@Component({
  selector: "app-advanced-theme-selector",
  template: `
    <div class="theme-manager">
      <h3>Gestión de Temas</h3>

      <!-- Selector de temas predefinidos -->
      <div class="theme-presets">
        <h4>Temas Predefinidos</h4>
        <div class="theme-options">
          <button *ngFor="let theme of availableThemes" (click)="selectTheme(theme)" [class.active]="currentTheme === theme">
            {{ getThemeLabel(theme) }}
          </button>
        </div>
      </div>

      <!-- Configurador de tema custom -->
      <div class="custom-theme" *ngIf="currentTheme === 'custom'">
        <h4>Tema Personalizado</h4>
        <div class="color-inputs">
          <label>
            Color Primario:
            <input type="color" [(ngModel)]="customConfig.primary" (change)="updateCustomTheme()" />
          </label>

          <label>
            Color Acento:
            <input type="color" [(ngModel)]="customConfig.accent" (change)="updateCustomTheme()" />
          </label>

          <label>
            Fondo:
            <input type="color" [(ngModel)]="customConfig.background" (change)="updateCustomTheme()" />
          </label>
        </div>

        <button (click)="resetToDefault()">Restablecer Default</button>
      </div>
    </div>
  `,
  styles: [
    `
      .theme-manager {
        padding: var(--space-4);
        background: var(--color-surface);
        border-radius: var(--radius-lg);
      }

      .theme-options {
        display: flex;
        gap: var(--space-2);
        flex-wrap: wrap;
      }

      .theme-options button {
        padding: var(--space-2) var(--space-3);
        border: 1px solid var(--color-border);
        background: var(--color-background);
        border-radius: var(--radius-md);
        cursor: pointer;
        transition: all 0.2s ease;
      }

      .theme-options button.active {
        background: var(--color-primary-500);
        color: white;
        border-color: var(--color-primary-500);
      }

      .color-inputs {
        display: grid;
        grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
        gap: var(--space-3);
        margin: var(--space-3) 0;
      }

      .color-inputs label {
        display: flex;
        flex-direction: column;
        gap: var(--space-1);
      }

      .color-inputs input[type="color"] {
        width: 100%;
        height: 40px;
        border: none;
        border-radius: var(--radius-md);
        cursor: pointer;
      }
    `,
  ],
})
export class AdvancedThemeSelectorComponent implements OnInit, OnDestroy {
  currentTheme: OpeniisTheme = "classic";
  customConfig: CustomThemeConfig = {
    primary: "#007bff",
    accent: "#6c757d",
    background: "#ffffff",
  };

  availableThemes: OpeniisTheme[] = ["classic", "neutral", "vivid", "custom"];
  private subscription: Subscription = new Subscription();

  constructor(private themeService: OpeniisThemeService) {}

  ngOnInit() {
    // Suscribirse a cambios de tema
    this.subscription.add(
      this.themeService.currentTheme$.subscribe((theme) => {
        this.currentTheme = theme;
      })
    );

    // Suscribirse a cambios de configuración custom
    this.subscription.add(
      this.themeService.customConfig$.subscribe((config) => {
        if (config) {
          this.customConfig = { ...config };
        }
      })
    );
  }

  ngOnDestroy() {
    this.subscription.unsubscribe();
  }

  selectTheme(theme: OpeniisTheme) {
    this.themeService.setTheme(theme);
  }

  updateCustomTheme() {
    if (this.currentTheme === "custom") {
      this.themeService.setCustomTheme(this.customConfig);
    }
  }

  resetToDefault() {
    this.themeService.resetToDefault();
  }

  getThemeLabel(theme: OpeniisTheme): string {
    const labels = {
      classic: "Clásico",
      neutral: "Neutral",
      vivid: "Vibrante",
      custom: "Personalizado",
    };
    return labels[theme];
  }
}
```

## Casos de Uso Avanzados

### Constructor de Temas Dinámico

```typescript
@Component({
  template: `
    <div class="theme-builder">
      <h3>Constructor de Temas</h3>

      <div class="preview-section">
        <div class="theme-preview" [style]="getPreviewStyles()">
          <h4>Vista Previa</h4>
          <p>Este es un ejemplo de texto con el tema actual.</p>
          <button>Botón de Ejemplo</button>
        </div>
      </div>

      <div class="color-controls">
        <div class="color-control">
          <label>Color Primario:</label>
          <input type="color" [(ngModel)]="previewConfig.primary" (input)="updatePreview()" />
          <span>{{ previewConfig.primary }}</span>
        </div>

        <div class="color-control">
          <label>Color de Acento:</label>
          <input type="color" [(ngModel)]="previewConfig.accent" (input)="updatePreview()" />
          <span>{{ previewConfig.accent }}</span>
        </div>

        <div class="color-control">
          <label>Fondo:</label>
          <input type="color" [(ngModel)]="previewConfig.background" (input)="updatePreview()" />
          <span>{{ previewConfig.background }}</span>
        </div>
      </div>

      <div class="actions">
        <button (click)="applyTheme()">Aplicar Tema</button>
        <button (click)="saveTheme()">Guardar Tema</button>
        <button (click)="resetPreview()">Restablecer</button>
      </div>
    </div>
  `,
})
export class ThemeBuilderComponent {
  previewConfig: CustomThemeConfig = {
    primary: "#007bff",
    accent: "#6c757d",
    background: "#ffffff",
    surface: "#f8f9fa",
    text: "#212529",
  };

  constructor(private themeService: OpeniisThemeService) {}

  updatePreview() {
    // Actualizar vista previa en tiempo real
    this.applyPreviewStyles();
  }

  applyTheme() {
    this.themeService.setCustomTheme(this.previewConfig);
  }

  saveTheme() {
    // Guardar configuración personalizada
    localStorage.setItem("user-custom-theme", JSON.stringify(this.previewConfig));
  }

  resetPreview() {
    this.previewConfig = {
      primary: "#007bff",
      accent: "#6c757d",
      background: "#ffffff",
      surface: "#f8f9fa",
      text: "#212529",
    };
    this.updatePreview();
  }

  getPreviewStyles() {
    return {
      "background-color": this.previewConfig.background,
      color: this.previewConfig.text,
      border: `2px solid ${this.previewConfig.primary}`,
    };
  }

  private applyPreviewStyles() {
    // Lógica para aplicar estilos de vista previa
  }
}
```

### Gestión de Temas por Usuario

```typescript
@Injectable()
export class UserThemeService {
  constructor(private themeService: OpeniisThemeService, private userService: UserService) {}

  loadUserTheme(userId: string) {
    const savedTheme = this.getUserThemePreference(userId);
    if (savedTheme) {
      if (savedTheme.type === "custom") {
        this.themeService.setCustomTheme(savedTheme.config);
      } else {
        this.themeService.setTheme(savedTheme.type);
      }
    }
  }

  saveUserTheme(userId: string, theme: OpeniisTheme, customConfig?: CustomThemeConfig) {
    const themePreference = {
      type: theme,
      config: customConfig,
      timestamp: Date.now(),
    };

    localStorage.setItem(`user-theme-${userId}`, JSON.stringify(themePreference));
  }

  private getUserThemePreference(userId: string) {
    const saved = localStorage.getItem(`user-theme-${userId}`);
    return saved ? JSON.parse(saved) : null;
  }
}
```

## Mejores Prácticas

### ✅ DO - Buenas Prácticas

- **Validación de colores:** Validar formatos de color antes de aplicar
- **Contraste adecuado:** Asegurar contraste suficiente para accesibilidad
- **Fallbacks:** Proporcionar valores por defecto para configuraciones incompletas
- **Performance:** Debounce los cambios de color en tiempo real

### ❌ DON'T - Evitar

- **Colores inválidos:** No aplicar colores sin validar formato
- **Cambios frecuentes:** No actualizar tema en cada keystroke
- **Configuraciones incompletas:** No dejar propiedades undefined sin fallback
- **Memory leaks:** No olvidar cleanup de suscripciones

## Integración con CSS

### Variables CSS Generadas

```css
/* Variables que genera automáticamente el servicio */
:root {
  /* Tema Classic */
  --classic-primary-50: #e3f2fd;
  --classic-primary-500: #007bff;
  --classic-primary-900: #0d47a1;

  /* Tema Custom */
  --custom-primary-50: #fff3e0;
  --custom-primary-500: #ff6b35;
  --custom-primary-900: #e65100;

  /* Variables activas según tema seleccionado */
  --color-primary: var(--classic-primary-500);
  --color-surface: #ffffff;
  --color-background: #f8f9fa;
}
```

### Uso en Componentes

```css
.component {
  background: var(--color-surface);
  color: var(--color-text);
  border: 1px solid var(--color-primary);
}

.button-primary {
  background: var(--color-primary-500);
  color: white;
}

.button-primary:hover {
  background: var(--color-primary-600);
}
```

## Consideraciones de Rendimiento

- **CSS Custom Properties:** Cambios instantáneos sin re-render
- **Caching:** Configuraciones guardadas en localStorage
- **Lazy Loading:** Paletas generadas solo cuando se necesitan
- **Debouncing:** Evitar updates excesivos durante edición

## Implementación Interna

### Generación de Paletas

El servicio genera automáticamente:

1. **Variaciones de brillo:** 50, 100, 200, ..., 900
2. **Colores complementarios:** Para accent y secondary
3. **Estados de hover:** Variaciones automáticas
4. **Modo oscuro:** Adaptación automática de colores

### Persistencia

- **LocalStorage:** Para preferencias del usuario
- **Formato JSON:** Configuraciones serializadas
- **Versionado:** Para compatibilidad futura
- **Migración:** Actualización automática de formatos antiguos

## Dependencias

- `@angular/core` - Para funcionalidad de servicio
- `rxjs` - Para observables reactivos
- Browser APIs - localStorage, CSS Custom Properties
