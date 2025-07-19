# Button

Componente de botón versátil con múltiples variantes, tamaños y funcionalidades avanzadas.

## 📦 Instalación

```typescript
import { OpeniisButtonComponent } from 'openiis-ui';

@Component({
  imports: [OpeniisButtonComponent],
})
```

## ⚙️ Properties

| Property          | Tipo                                     | Default     | Descripción                 |
| ----------------- | ---------------------------------------- | ----------- | --------------------------- |
| `text`            | `string`                                 | `''`        | Texto del botón             |
| `type`            | `ButtonVariant`                          | `'primary'` | Tipo de botón               |
| `size`            | `ButtonSize`                             | `'md'`      | Tamaño del botón            |
| `htmlType`        | `ButtonType`                             | `'button'`  | Tipo HTML del botón         |
| `disabled`        | `boolean`                                | `false`     | Estado deshabilitado        |
| `loading`         | `boolean`                                | `false`     | Estado de carga             |
| `iconLeft`        | `string`                                 | `''`        | Icono izquierdo             |
| `iconRight`       | `string`                                 | `''`        | Icono derecho               |
| `iconOnly`        | `boolean`                                | `false`     | Solo mostrar icono          |
| `fullWidth`       | `boolean`                                | `false`     | Ancho completo              |
| `tooltipText`     | `string`                                 | `''`        | Texto del tooltip           |
| `tooltipPosition` | `'top' \| 'bottom' \| 'left' \| 'right'` | `'top'`     | Posición del tooltip        |
| `tooltipVariant`  | `'default' \| 'danger'`                  | `'default'` | Variante del tooltip        |
| `title`           | `string`                                 | `''`        | Título del botón            |
| `hasDropdown`     | `boolean`                                | `false`     | Botón con dropdown          |
| `dropdownOpen`    | `boolean`                                | `false`     | Estado del dropdown         |
| `ariaLabel`       | `string`                                 | `''`        | Etiqueta aria               |
| `ariaDescribedBy` | `string`                                 | `''`        | Referencia aria describedby |
| `extraClasses`    | `string`                                 | `''`        | Clases CSS adicionales      |
| `responsive`      | `boolean`                                | `false`     | Botón responsivo            |

## 📡 Events

| Event            | Tipo         | Descripción                    |
| ---------------- | ------------ | ------------------------------ |
| `clickEvent`     | `MouseEvent` | Emitido al hacer clic          |
| `dropdownToggle` | `boolean`    | Emitido al toggle del dropdown |

## 🎨 Tipos de Botón

| Tipo                | Color        | Uso                   |
| ------------------- | ------------ | --------------------- |
| `primary`           | Azul         | Acción principal      |
| `secondary`         | Gris         | Acción secundaria     |
| `success`           | Verde        | Confirmación          |
| `warning`           | Naranja      | Advertencia           |
| `danger`            | Rojo         | Eliminación           |
| `info`              | Azul         | Información           |
| `outline-primary`   | Azul         | Principal con borde   |
| `outline-secondary` | Gris         | Secundario con borde  |
| `outline-success`   | Verde        | Éxito con borde       |
| `outline-warning`   | Naranja      | Advertencia con borde |
| `outline-danger`    | Rojo         | Peligro con borde     |
| `outline-info`      | Azul         | Info con borde        |
| `ghost`             | Transparente | Fantasma              |
| `text`              | Texto        | Solo texto            |
| `link`              | Enlace       | Como enlace           |
| `subtle`            | Sutil        | Sutil                 |
| `icon`              | Icono        | Solo icono            |

## 📏 Tamaños

| Tamaño | Altura | Uso               |
| ------ | ------ | ----------------- |
| `xs`   | 24px   | Muy pequeño       |
| `sm`   | 32px   | Pequeño           |
| `md`   | 40px   | Mediano (default) |
| `lg`   | 48px   | Grande            |
| `xl`   | 56px   | Muy grande        |

## 💡 Ejemplos Prácticos

### 1. Botones Básicos

```html
<openiis-button text="Primary Button" type="primary" (clickEvent)="onPrimaryClick()"> </openiis-button>

<openiis-button text="Secondary Button" type="secondary" (clickEvent)="onSecondaryClick()"> </openiis-button>

<openiis-button text="Success Button" type="success" (clickEvent)="onSuccessClick()"> </openiis-button>

<openiis-button text="Danger Button" type="danger" (clickEvent)="onDangerClick()"> </openiis-button>
```

```typescript
export class MyComponent {
  onPrimaryClick() {
    console.log("Primary button clicked");
  }

  onSecondaryClick() {
    console.log("Secondary button clicked");
  }

  onSuccessClick() {
    console.log("Success button clicked");
  }

  onDangerClick() {
    console.log("Danger button clicked");
  }
}
```

### 2. Botones con Iconos

```html
<openiis-button text="Save" type="success" iconLeft="save" (clickEvent)="saveData()"> </openiis-button>

<openiis-button text="Delete" type="danger" iconRight="delete" (clickEvent)="deleteItem()"> </openiis-button>

<openiis-button type="icon" iconLeft="settings" tooltipText="Settings" (clickEvent)="openSettings()"> </openiis-button>
```

```typescript
export class MyComponent {
  saveData() {
    console.log("Saving data...");
  }

  deleteItem() {
    console.log("Deleting item...");
  }

  openSettings() {
    console.log("Opening settings...");
  }
}
```

### 3. Botones con Estados

```html
<openiis-button text="Loading Button" type="primary" [loading]="true" (clickEvent)="loadData()"> </openiis-button>

<openiis-button text="Disabled Button" type="secondary" [disabled]="true" (clickEvent)="disabledAction()"> </openiis-button>

<openiis-button text="Full Width" type="success" [fullWidth]="true" (clickEvent)="fullWidthAction()"> </openiis-button>
```

```typescript
export class MyComponent {
  loadData() {
    console.log("Loading data...");
  }

  disabledAction() {
    console.log("This should not execute");
  }

  fullWidthAction() {
    console.log("Full width action");
  }
}
```

### 4. Botones Outline

```html
<openiis-button text="Outline Primary" type="outline-primary" (clickEvent)="outlinePrimary()"> </openiis-button>

<openiis-button text="Outline Success" type="outline-success" (clickEvent)="outlineSuccess()"> </openiis-button>

<openiis-button text="Outline Danger" type="outline-danger" (clickEvent)="outlineDanger()"> </openiis-button>
```

```typescript
export class MyComponent {
  outlinePrimary() {
    console.log("Outline primary clicked");
  }

  outlineSuccess() {
    console.log("Outline success clicked");
  }

  outlineDanger() {
    console.log("Outline danger clicked");
  }
}
```

### 5. Botones con Tooltip

```html
<openiis-button text="Help" type="info" iconLeft="help" tooltipText="Click for help" tooltipPosition="top" (clickEvent)="showHelp()"> </openiis-button>

<openiis-button type="icon" iconLeft="warning" tooltipText="This action is dangerous" tooltipVariant="danger" tooltipPosition="bottom" (clickEvent)="dangerousAction()"> </openiis-button>
```

```typescript
export class MyComponent {
  showHelp() {
    console.log("Showing help...");
  }

  dangerousAction() {
    console.log("Dangerous action executed");
  }
}
```

### 6. Botones con Dropdown

```html
<openiis-button text="Actions" type="primary" iconRight="arrow_drop_down" [hasDropdown]="true" [dropdownOpen]="dropdownOpen" (dropdownToggle)="onDropdownToggle($event)" (clickEvent)="toggleDropdown()"> </openiis-button>
```

```typescript
export class MyComponent {
  dropdownOpen = false;

  toggleDropdown() {
    this.dropdownOpen = !this.dropdownOpen;
  }

  onDropdownToggle(isOpen: boolean) {
    console.log("Dropdown is now:", isOpen ? "open" : "closed");
  }
}
```

### 7. Botones Responsivos

```html
<openiis-button text="Responsive Button" type="primary" [responsive]="true" (clickEvent)="responsiveAction()"> </openiis-button>

<openiis-button text="Large Button" type="success" size="lg" (clickEvent)="largeAction()"> </openiis-button>

<openiis-button text="Small Button" type="secondary" size="sm" (clickEvent)="smallAction()"> </openiis-button>
```

```typescript
export class MyComponent {
  responsiveAction() {
    console.log("Responsive action");
  }

  largeAction() {
    console.log("Large button action");
  }

  smallAction() {
    console.log("Small button action");
  }
}
```

## 🏗️ Interfaces

```typescript
type ButtonVariant = undefined | "primary" | "secondary" | "success" | "warning" | "danger" | "info" | "outline-primary" | "outline-secondary" | "outline-success" | "outline-warning" | "outline-danger" | "outline-info" | "ghost" | "text" | "link" | "subtle" | "icon";

type ButtonType = "button" | "submit" | "reset";
type ButtonSize = "xs" | "sm" | "md" | "lg" | "xl";
```

## ⚡ Comportamiento

- **Estados**: Normal, hover, focus, disabled, loading
- **Accesibilidad**: Soporte completo para ARIA
- **Responsive**: Se adapta a diferentes tamaños de pantalla
- **Tooltip**: Aparece en hover con posiciones configurables
- **Dropdown**: Toggle automático con evento
- **Iconos**: Soporte para iconos izquierdo y derecho

## ✅ Características

- ✅ 17 tipos de botón diferentes
- ✅ 5 tamaños configurables
- ✅ Estados de loading y disabled
- ✅ Iconos izquierdo y derecho
- ✅ Botones de solo icono
- ✅ Tooltips configurables
- ✅ Dropdown integrado
- ✅ Ancho completo opcional
- ✅ Completamente responsive
- ✅ Integración con temas Openiis UI
- ✅ Accesibilidad completa
- ✅ Soporte para SVG icons

## 🚨 Solución de Problemas

| Problema              | Solución                                             |
| --------------------- | ---------------------------------------------------- |
| Botón no responde     | Verifica que no esté `disabled` o `loading`          |
| Icono no aparece      | Verifica que `iconLeft` o `iconRight` esté definido  |
| Tooltip no funciona   | Verifica que `tooltipText` esté definido             |
| Estilos no se aplican | Asegúrate de que el tema Openiis UI esté configurado |
| Dropdown no funciona  | Verifica que `hasDropdown` esté en `true`            |

## 🐞 Reportar Problemas

Si encuentras algún problema en la lógica del componente, por favor
[🐞Reportalo](https://github.com/Alexiisart/openiis-ui/issues/new)
