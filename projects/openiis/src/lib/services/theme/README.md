# OpeniisThemeService

Servicio para gestionar los temas de la aplicación con soporte para modo claro/oscuro.

## Características

- ✅ 4 temas predefinidos: classic, neutral, vivid, custom
- ✅ Soporte completo para modo claro/oscuro
- ✅ Temas personalizables con colores propios
- ✅ Guardado automático en localStorage
- ✅ API simple y reactiva

## Temas Disponibles

| Tema      | Descripción             | Colores       |
| --------- | ----------------------- | ------------- |
| `classic` | Tema clásico elegante   | Teal/Azul     |
| `neutral` | Tema neutro profesional | Grises        |
| `vivid`   | Tema vibrante moderno   | Colores vivos |
| `custom`  | Tema personalizado      | Tus colores   |

## Instalación

```typescript
import { OpeniisThemeService } from "openiis-ui";
```

## Uso Básico

### Inyectar el servicio

```typescript
@Component({
  // ...
})
export class MyComponent {
  constructor(private themeService: OpeniisThemeService) {}
}
```

### Cambiar tema

```typescript
// Cambiar a tema clásico
this.themeService.setTheme("classic");

// Cambiar a tema neutro
this.themeService.setTheme("neutral");

// Cambiar a tema vibrante
this.themeService.setTheme("vivid");
```

### Verificar tema actual

```typescript
// Obtener tema actual
const currentTheme = this.themeService.getCurrentTheme();

// Suscribirse a cambios
this.themeService.currentTheme$.subscribe((theme) => {
  console.log("Tema actual:", theme);
});
```

## Tema Personalizado

### Crear tema personalizado

```typescript
// Tema con color primario
this.themeService.setCustomTheme({
  primary: "#3498db", // Azul
});

// Tema completo
this.themeService.setCustomTheme({
  primary: "#e74c3c", // Rojo
  accent: "#f39c12", // Naranja
  background: "#ffffff", // Fondo blanco
  surface: "#f8f9fa", // Superficie gris claro
  text: "#2c3e50", // Texto oscuro
});
```

### Restablecer tema por defecto

```typescript
this.themeService.resetToDefault(); // Vuelve a 'classic'
```

## Ejemplos Prácticos

### Dropdown para seleccionar tema

```typescript
@Component({
  template: ` <openiis-dropdown [options]="themeOptions" [selectedValue]="currentTheme" (selectionChanged)="onThemeChange($event)"> </openiis-dropdown> `,
})
export class ThemeSelectorComponent {
  currentTheme = "classic";
  themeOptions = [
    { value: "classic", label: "🎨 Clásico" },
    { value: "neutral", label: "⚪ Neutro" },
    { value: "vivid", label: "🌈 Vibrante" },
    { value: "custom", label: "🎨 Personalizado" },
  ];

  constructor(private themeService: OpeniisThemeService) {
    this.themeService.currentTheme$.subscribe((theme) => {
      this.currentTheme = theme;
    });
  }

  onThemeChange(theme: string) {
    this.themeService.setTheme(theme as any);
  }
}
```

### Botones para cambiar tema

```typescript
@Component({
  template: `
    <div class="theme-buttons">
      <button *ngFor="let theme of themes" (click)="setTheme(theme.value)" [class.active]="currentTheme === theme.value">
        {{ theme.label }}
      </button>
    </div>
  `,
})
export class ThemeButtonsComponent {
  currentTheme = "classic";
  themes = [
    { value: "classic", label: "Clásico" },
    { value: "neutral", label: "Neutro" },
    { value: "vivid", label: "Vibrante" },
  ];

  constructor(private themeService: OpeniisThemeService) {
    this.themeService.currentTheme$.subscribe((theme) => {
      this.currentTheme = theme;
    });
  }

  setTheme(theme: string) {
    this.themeService.setTheme(theme as any);
  }
}
```

### Selector de color personalizado

```typescript
@Component({
  template: `
    <div class="color-picker">
      <input type="color" [value]="customColor" (change)="onColorChange($event)" />
      <button (click)="applyCustomTheme()">Aplicar Tema Personalizado</button>
    </div>
  `,
})
export class CustomThemeComponent {
  customColor = "#3498db";

  constructor(private themeService: OpeniisThemeService) {}

  onColorChange(event: any) {
    this.customColor = event.target.value;
  }

  applyCustomTheme() {
    this.themeService.setCustomTheme({
      primary: this.customColor,
    });
  }
}
```

## Cómo Funciona

### 1. Aplicación de Temas

El servicio aplica automáticamente los atributos al DOM:

```html
<!-- Tema clásico -->
<body data-openiis-theme="classic" data-theme="light">
  <!-- Tema personalizado -->
  <body data-openiis-theme="custom" data-theme="dark"></body>
</body>
```

### 2. Variables CSS

Cada tema define sus propias variables CSS:

```css
/* Tema clásico */
[data-openiis-theme="classic"] {
  --primary-500: #14b8a6;
  --color-background: #ffffff;
  --color-text-primary: #171717;
}

/* Modo oscuro */
[data-openiis-theme="classic"][data-theme="dark"] {
  --color-background: #0f0f0f;
  --color-text-primary: #fafafa;
}
```

### 3. Tema Personalizado

Los temas personalizados generan automáticamente una paleta completa:

```typescript
// Solo necesitas especificar el color primario
this.themeService.setCustomTheme({
  primary: "#e74c3c", // Rojo
});

// El servicio genera automáticamente:
// - Paleta de 50 a 900 tonos
// - Colores neutrales
// - Variables CSS completas
```

## API Completa

| Método                   | Descripción                  | Parámetros                                      | Retorna                                 |
| ------------------------ | ---------------------------- | ----------------------------------------------- | --------------------------------------- |
| `setTheme(theme)`        | Establece el tema            | `'classic' \| 'neutral' \| 'vivid' \| 'custom'` | `void`                                  |
| `setCustomTheme(config)` | Establece tema personalizado | `CustomThemeConfig`                             | `void`                                  |
| `resetToDefault()`       | Restablece a tema clásico    | -                                               | `void`                                  |
| `getCurrentTheme()`      | Obtiene tema actual          | -                                               | `OpeniisTheme`                          |
| `getCustomConfig()`      | Obtiene configuración custom | -                                               | `CustomThemeConfig \| null`             |
| `currentTheme$`          | Observable del tema          | -                                               | `Observable<OpeniisTheme>`              |
| `customConfig$`          | Observable de config custom  | -                                               | `Observable<CustomThemeConfig \| null>` |

## Tipos Disponibles

```typescript
type OpeniisTheme = "classic" | "neutral" | "vivid" | "custom";

interface CustomThemeConfig {
  primary: string; // Color principal (requerido)
  accent?: string; // Color de acento
  background?: string; // Color de fondo
  surface?: string; // Color de superficie
  text?: string; // Color de texto
}
```

## Notas Importantes

- ✅ Los temas se guardan automáticamente en localStorage
- ✅ Funciona perfectamente con el modo oscuro
- ✅ Los temas personalizados generan paletas automáticamente
- ✅ No requiere configuración CSS adicional
- ✅ Compatible con todos los componentes de Openiis UI

## Solución de Problemas

**El tema no cambia**: Verifica que los estilos CSS usen `[data-openiis-theme="nombre"]`.

**Tema personalizado no se aplica**: Asegúrate de especificar al menos el color `primary`.

**No se guarda el tema**: Verifica que localStorage esté habilitado en el navegador.

**Colores no se ven bien**: Los temas personalizados generan paletas automáticamente, pero puedes ajustar manualmente.
