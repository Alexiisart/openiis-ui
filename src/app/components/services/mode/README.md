# ModeService

## Descripción

El `OpeniisModeService` gestiona el modo claro/oscuro de la aplicación, proporcionando una interfaz reactiva para cambiar entre temas y persistir las preferencias del usuario.

## Características

- ✅ **Modo reactivo:** Observable para cambios en tiempo real
- ✅ **Persistencia:** Guarda preferencias en localStorage
- ✅ **Detección automática:** Detecta preferencias del sistema
- ✅ **Toggle sencillo:** Método para alternar entre modos
- ✅ **Aplicación automática:** Aplica el modo al DOM automáticamente
- ✅ **TypeScript:** Tipado fuerte para los modos disponibles

## Importación

```typescript
import { OpeniisModeService, ThemeMode } from "./services/mode.service";
```

## Uso Básico

### 1. Inyectar el servicio

```typescript
import { Component } from "@angular/core";
import { OpeniisModeService, ThemeMode } from "../services/mode.service";

@Component({
  selector: "app-theme-toggle",
  template: `
    <button (click)="toggleTheme()">
      {{ currentMode === "light" ? "🌙" : "☀️" }}
      {{ currentMode === "light" ? "Modo Oscuro" : "Modo Claro" }}
    </button>
  `,
})
export class ThemeToggleComponent {
  currentMode: ThemeMode = "light";

  constructor(private modeService: OpeniisModeService) {
    // Suscribirse a cambios de modo
    this.modeService.currentMode$.subscribe((mode) => {
      this.currentMode = mode;
    });
  }

  toggleTheme() {
    this.modeService.toggleMode();
  }
}
```

### 2. Obtener el modo actual

```typescript
// Obtener el modo actual de forma síncrona
const currentMode = this.modeService.getCurrentMode();

// Suscribirse a cambios de modo
this.modeService.currentMode$.subscribe((mode) => {
  console.log("Modo actual:", mode);
});
```

### 3. Establecer modo específico

```typescript
// Cambiar a modo oscuro
this.modeService.setMode("dark");

// Cambiar a modo claro
this.modeService.setMode("light");
```

## Métodos Disponibles

| Método                     | Descripción                       | Parámetros  | Retorno                 |
| -------------------------- | --------------------------------- | ----------- | ----------------------- |
| `getCurrentMode()`         | Obtiene el modo actual            | Ninguno     | `ThemeMode`             |
| `setMode(mode: ThemeMode)` | Establece un modo específico      | `ThemeMode` | `void`                  |
| `toggleMode()`             | Alterna entre modo claro y oscuro | Ninguno     | `void`                  |
| `currentMode$`             | Observable del modo actual        | -           | `Observable<ThemeMode>` |

## Tipos Disponibles

```typescript
type ThemeMode = "light" | "dark";
```

## Ejemplo Completo: Toggle de Tema

```typescript
import { Component, OnInit, OnDestroy } from "@angular/core";
import { Subscription } from "rxjs";
import { OpeniisModeService, ThemeMode } from "../services/mode.service";

@Component({
  selector: "app-theme-controller",
  template: `
    <div class="theme-controller">
      <button class="theme-toggle" (click)="toggleTheme()" [attr.aria-label]="getToggleLabel()">
        <span class="theme-icon">
          {{ currentMode === "light" ? "🌙" : "☀️" }}
        </span>

        <span class="theme-text">
          {{ currentMode === "light" ? "Modo Oscuro" : "Modo Claro" }}
        </span>
      </button>

      <div class="theme-options">
        <button (click)="setSpecificMode('light')" [class.active]="currentMode === 'light'">☀️ Claro</button>

        <button (click)="setSpecificMode('dark')" [class.active]="currentMode === 'dark'">🌙 Oscuro</button>
      </div>
    </div>
  `,
  styles: [
    `
      .theme-controller {
        display: flex;
        gap: var(--space-2);
        align-items: center;
      }

      .theme-toggle {
        display: flex;
        align-items: center;
        gap: var(--space-1);
        padding: var(--space-2);
        border: 1px solid var(--color-border);
        border-radius: var(--radius-md);
        background: var(--color-surface);
        cursor: pointer;
        transition: all 0.2s ease;
      }

      .theme-toggle:hover {
        background: var(--color-surface-hover);
      }

      .theme-options button {
        padding: var(--space-1) var(--space-2);
        border: 1px solid var(--color-border);
        background: var(--color-surface);
        cursor: pointer;
        transition: all 0.2s ease;
      }

      .theme-options button.active {
        background: var(--color-primary-500);
        color: white;
      }
    `,
  ],
})
export class ThemeControllerComponent implements OnInit, OnDestroy {
  currentMode: ThemeMode = "light";
  private subscription: Subscription = new Subscription();

  constructor(private modeService: OpeniisModeService) {}

  ngOnInit() {
    // Obtener modo inicial
    this.currentMode = this.modeService.getCurrentMode();

    // Suscribirse a cambios
    this.subscription.add(
      this.modeService.currentMode$.subscribe((mode) => {
        this.currentMode = mode;
      })
    );
  }

  ngOnDestroy() {
    this.subscription.unsubscribe();
  }

  toggleTheme() {
    this.modeService.toggleMode();
  }

  setSpecificMode(mode: ThemeMode) {
    this.modeService.setMode(mode);
  }

  getToggleLabel(): string {
    return this.currentMode === "light" ? "Cambiar a modo oscuro" : "Cambiar a modo claro";
  }
}
```

## Integración con CSS

El servicio aplica automáticamente el atributo `data-theme` al body:

```css
/* Estilos base */
:root {
  --color-background: #ffffff;
  --color-text: #000000;
  --color-primary: #007bff;
}

/* Modo oscuro */
[data-theme="dark"] {
  --color-background: #1a1a1a;
  --color-text: #ffffff;
  --color-primary: #4dabf7;
}

/* Aplicar variables */
body {
  background-color: var(--color-background);
  color: var(--color-text);
  transition: background-color 0.3s ease, color 0.3s ease;
}
```

## Casos de Uso Avanzados

### Sistema de Preferencias

```typescript
@Component({
  template: `
    <div class="preferences-panel">
      <h3>Preferencias de Tema</h3>

      <div class="preference-group">
        <h4>Modo de Color</h4>
        <label>
          <input type="radio" [value]="'light'" [(ngModel)]="selectedMode" (change)="updateMode()" />
          Modo Claro
        </label>
        <label>
          <input type="radio" [value]="'dark'" [(ngModel)]="selectedMode" (change)="updateMode()" />
          Modo Oscuro
        </label>
      </div>

      <div class="current-status"><strong>Modo actual:</strong> {{ currentMode === "light" ? "Claro" : "Oscuro" }}</div>
    </div>
  `,
})
export class PreferencesPanelComponent implements OnInit, OnDestroy {
  currentMode: ThemeMode = "light";
  selectedMode: ThemeMode = "light";
  private subscription = new Subscription();

  constructor(private modeService: OpeniisModeService) {}

  ngOnInit() {
    this.subscription.add(
      this.modeService.currentMode$.subscribe((mode) => {
        this.currentMode = mode;
        this.selectedMode = mode;
      })
    );
  }

  ngOnDestroy() {
    this.subscription.unsubscribe();
  }

  updateMode() {
    this.modeService.setMode(this.selectedMode);
  }
}
```

### Detección de Preferencias del Sistema

```typescript
@Component({
  template: `
    <div class="system-detection">
      <p>Preferencia del sistema: {{ systemPreference }}</p>
      <button (click)="useSystemPreference()">Usar Preferencia del Sistema</button>
    </div>
  `,
})
export class SystemPreferenceComponent {
  systemPreference: ThemeMode = "light";

  constructor(private modeService: OpeniisModeService) {
    this.detectSystemPreference();
  }

  detectSystemPreference() {
    const prefersDark = window.matchMedia("(prefers-color-scheme: dark)").matches;
    this.systemPreference = prefersDark ? "dark" : "light";
  }

  useSystemPreference() {
    this.modeService.setMode(this.systemPreference);
  }
}
```

## Mejores Prácticas

### ✅ DO - Buenas Prácticas

- **Cleanup de suscripciones:** Siempre desuscribirse en ngOnDestroy
- **Estados consistentes:** Verificar el modo actual antes de cambios
- **Transiciones suaves:** Usar CSS transitions para cambios visuales
- **Accesibilidad:** Proporcionar labels descriptivos para controles

### ❌ DON'T - Evitar

- **Memory leaks:** No olvidar desuscribirse de observables
- **Cambios abruptos:** No cambiar modo sin transiciones visuales
- **Estados inconsistentes:** No asumir el modo sin verificar
- **Uso innecesario:** No suscribirse si solo necesitas el valor actual

## Consideraciones de Rendimiento

- **Observable único:** Un solo observable para todos los componentes
- **LocalStorage:** Persistencia eficiente sin impacto en performance
- **CSS Variables:** Cambios de tema instantáneos sin re-render
- **System Preference:** Detección automática al inicializar

## Implementación Interna

El servicio gestiona:

1. **BehaviorSubject:** Para emitir cambios de modo
2. **LocalStorage:** Para persistir preferencias del usuario
3. **DOM Manipulation:** Aplicar atributos data-theme al body
4. **System Detection:** Detectar preferencias del sistema operativo

## Dependencias

- `@angular/core` - Para funcionalidad de servicio
- `rxjs` - Para manejo reactivo con observables
- Browser APIs - localStorage y matchMedia
