# Servicios de Openiis UI

## Servicios Disponibles

### OpeniisThemeService

Gestiona los temas de la aplicación (classic, neutral, vivid, custom).

### OpeniisModeService

Gestiona el modo claro/oscuro.

## Cómo Funcionan Juntos

Los servicios trabajan en coordinación para aplicar los atributos correctos al `<body>`:

```html
<!-- Resultado final en el body -->
<body data-openiis-theme="classic" data-theme="light"></body>
```

### Atributos Aplicados

- `data-openiis-theme`: Controlado por `OpeniisThemeService`
  - Valores: `classic`, `neutral`, `vivid`, `custom`
- `data-theme`: Controlado por `OpeniisModeService`
  - Valores: `light`, `dark`

### Coordinación Automática

1. **OpeniisThemeService** aplica `data-openiis-theme`
2. **OpeniisModeService** aplica `data-theme` y re-aplica el tema
3. Ambos servicios se coordinan automáticamente

## Uso Básico

```typescript
import { OpeniisThemeService, OpeniisModeService } from 'openiis-ui';

constructor(
  private themeService: OpeniisThemeService,
  private modeService: OpeniisModeService
) {}

// Cambiar tema
this.themeService.setTheme('neutral');

// Cambiar modo
this.modeService.setMode('dark');

// Alternar modo
this.modeService.toggleMode();
```

## CSS Variables

Los estilos CSS usan ambos atributos:

```css
/* Tema classic en modo light */
[data-openiis-theme="classic"][data-theme="light"] {
  --color-background: #ffffff;
  --color-text-primary: #171717;
}

/* Tema classic en modo dark */
[data-openiis-theme="classic"][data-theme="dark"] {
  --color-background: #0f0f0f;
  --color-text-primary: #fafafa;
}
```

## Solución de Problemas

### Solo aparece un atributo

Si solo ves `data-theme="classic"` en lugar de ambos atributos:

1. **Verificar que ambos servicios estén inyectados**:

   ```typescript
   constructor(
     private themeService: OpeniisThemeService,
     private modeService: OpeniisModeService
   ) {}
   ```

2. **Verificar que los estilos estén cargados**:

   ```json
   {
     "styles": ["node_modules/openiis-ui/src/styles/root.css", "node_modules/openiis-ui/src/styles/themes/classic.css"]
   }
   ```

3. **Verificar el orden de inicialización**:
   ```typescript
   ngOnInit() {
     // Primero establecer el tema
     this.themeService.setTheme('classic');

     // Luego establecer el modo
     this.modeService.setMode('light');
   }
   ```

### Los estilos no se aplican

1. **Verificar que los atributos estén presentes**:

   ```javascript
   console.log(document.body.getAttribute("data-openiis-theme"));
   console.log(document.body.getAttribute("data-theme"));
   ```

2. **Verificar que las variables CSS estén definidas**:
   ```css
   /* Debe existir en tus estilos */
   [data-openiis-theme="classic"][data-theme="light"] {
     --color-background: #ffffff;
   }
   ```

## Ejemplo Completo

```typescript
import { Component, OnInit } from "@angular/core";
import { OpeniisThemeService, OpeniisModeService } from "openiis-ui";

@Component({
  selector: "app-root",
  template: `
    <div class="container">
      <h1>Mi Aplicación</h1>

      <button (click)="toggleTheme()">Cambiar Tema</button>

      <button (click)="toggleMode()">Cambiar Modo</button>
    </div>
  `,
  styles: [
    `
      .container {
        background-color: var(--color-background);
        color: var(--color-text-primary);
        padding: var(--space-4);
      }
    `,
  ],
})
export class AppComponent implements OnInit {
  private themes = ["classic", "neutral", "vivid", "custom"];
  private currentThemeIndex = 0;

  constructor(
    private themeService: OpeniisThemeService,
    private modeService: OpeniisModeService,
  ) {}

  ngOnInit() {
    // Inicializar con tema y modo por defecto
    this.themeService.setTheme("classic");
    this.modeService.setMode("light");
  }

  toggleTheme() {
    this.currentThemeIndex = (this.currentThemeIndex + 1) % this.themes.length;
    this.themeService.setTheme(this.themes[this.currentThemeIndex] as any);
  }

  toggleMode() {
    this.modeService.toggleMode();
  }
}
```

## Configuración en angular.json

```json
{
  "architect": {
    "build": {
      "options": {
        "styles": ["src/styles.css", "node_modules/openiis-ui/src/styles/root.css", "node_modules/openiis-ui/src/styles/themes/classic.css", "node_modules/openiis-ui/src/styles/themes/neutral.css", "node_modules/openiis-ui/src/styles/themes/vivid.css"]
      }
    }
  }
}
```
