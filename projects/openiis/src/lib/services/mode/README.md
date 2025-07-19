# OpeniisModeService

Servicio simple para gestionar el modo claro/oscuro en tu aplicación.

## Características

- ✅ Cambio automático entre modo claro y oscuro
- ✅ Guardado en localStorage
- ✅ Detección automática de preferencias del sistema
- ✅ Aplicación automática al DOM
- ✅ API simple y fácil de usar

## Instalación

```typescript
import { OpeniisModeService } from "openiis-ui";
```

## Uso Básico

### Inyectar el servicio

```typescript
@Component({
  // ...
})
export class MyComponent {
  constructor(private modeService: OpeniisModeService) {}
}
```

### Cambiar el modo

```typescript
// Cambiar a modo oscuro
this.modeService.setMode("dark");

// Cambiar a modo claro
this.modeService.setMode("light");

// Alternar entre modos
this.modeService.toggleMode();
```

### Verificar el modo actual

```typescript
// Obtener modo actual
const currentMode = this.modeService.getCurrentMode(); // 'light' | 'dark'

// Verificar si está en modo oscuro
const isDark = this.modeService.isDarkMode(); // true | false

// Suscribirse a cambios
this.modeService.currentMode$.subscribe((mode) => {
  console.log("Modo actual:", mode);
});
```

## Ejemplos Prácticos

### Botón para cambiar modo

```typescript
@Component({
  template: `
    <button (click)="toggleMode()">
      {{ isDarkMode ? "☀️ Claro" : "🌙 Oscuro" }}
    </button>
  `,
})
export class ThemeToggleComponent {
  isDarkMode = false;

  constructor(private modeService: OpeniisModeService) {
    this.modeService.currentMode$.subscribe((mode) => {
      this.isDarkMode = mode === "dark";
    });
  }

  toggleMode() {
    this.modeService.toggleMode();
  }
}
```

### Switch para cambiar modo

```typescript
@Component({
  template: ` <openiis-switch [checked]="isDarkMode" (checkedChange)="onModeChange($event)" label="Modo oscuro"> </openiis-switch> `,
})
export class ThemeSwitchComponent {
  isDarkMode = false;

  constructor(private modeService: OpeniisModeService) {
    this.modeService.currentMode$.subscribe((mode) => {
      this.isDarkMode = mode === "dark";
    });
  }

  onModeChange(checked: boolean) {
    this.modeService.setMode(checked ? "dark" : "light");
  }
}
```

### Dropdown para seleccionar modo

```typescript
@Component({
  template: ` <openiis-dropdown [options]="modeOptions" [selectedValue]="currentMode" (selectionChanged)="onModeChange($event)"> </openiis-dropdown> `,
})
export class ThemeDropdownComponent {
  currentMode = "light";
  modeOptions = [
    { value: "light", label: "☀️ Claro" },
    { value: "dark", label: "🌙 Oscuro" },
  ];

  constructor(private modeService: OpeniisModeService) {
    this.modeService.currentMode$.subscribe((mode) => {
      this.currentMode = mode;
    });
  }

  onModeChange(mode: string) {
    this.modeService.setMode(mode as "light" | "dark");
  }
}
```

## Cómo Funciona

### 1. Inicialización

- Al cargar, el servicio busca el modo guardado en localStorage
- Si no hay modo guardado, detecta las preferencias del sistema
- Aplica automáticamente el modo al DOM

### 2. Cambio de Modo

- Al cambiar el modo, se actualiza el localStorage
- Se aplica automáticamente al DOM con `data-theme="light"` o `data-theme="dark"`
- Se notifica a todos los suscriptores

### 3. CSS Automático

El servicio aplica automáticamente el atributo `data-theme` al body y html:

```css
/* Modo claro */
[data-theme="light"] {
  --color-background: #ffffff;
  --color-text: #171717;
}

/* Modo oscuro */
[data-theme="dark"] {
  --color-background: #0f0f0f;
  --color-text: #fafafa;
}
```

## API Completa

| Método             | Descripción           | Retorna                         |
| ------------------ | --------------------- | ------------------------------- |
| `setMode(mode)`    | Establece el modo     | `void`                          |
| `toggleMode()`     | Alterna entre modos   | `void`                          |
| `getCurrentMode()` | Obtiene modo actual   | `'light' \| 'dark'`             |
| `isDarkMode()`     | Verifica si es oscuro | `boolean`                       |
| `currentMode$`     | Observable del modo   | `Observable<'light' \| 'dark'>` |

## Notas Importantes

- ✅ El modo se guarda automáticamente en localStorage
- ✅ Se detectan las preferencias del sistema automáticamente
- ✅ Los cambios se aplican inmediatamente al DOM
- ✅ Funciona con cualquier tema (classic, neutral, vivid, custom)
- ✅ No requiere configuración adicional

## Solución de Problemas

**El modo no cambia**: Verifica que los estilos CSS usen `[data-theme="dark"]` y `[data-theme="light"]`.

**No se guarda el modo**: Verifica que localStorage esté habilitado en el navegador.

**No detecta preferencias del sistema**: El navegador debe soportar `prefers-color-scheme`.
