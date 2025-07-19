# Tooltip

Componente de tooltip elegante y reutilizable con múltiples posiciones, variantes de color y soporte completo para accesibilidad.

## 📦 Instalación

```typescript
import { OpeniisTooltipComponent } from 'openiis-ui';

@Component({
  imports: [OpeniisTooltipComponent],
})
```

## ⚙️ Properties

| Property   | Tipo              | Default     | Descripción                   |
| ---------- | ----------------- | ----------- | ----------------------------- |
| `text`     | `string`          | `''`        | Texto a mostrar en el tooltip |
| `position` | `TooltipPosition` | `'top'`     | Posición del tooltip          |
| `variant`  | `TooltipVariant`  | `'default'` | Variante de color del tooltip |
| `visible`  | `boolean`         | `false`     | Si el tooltip está visible    |

## 📡 Events

Este componente no emite eventos directamente, pero se integra con otros componentes para mostrar tooltips.

## 📍 Posiciones

| Posición | Descripción                   | Uso                   |
| -------- | ----------------------------- | --------------------- |
| `top`    | Arriba del elemento (default) | Información general   |
| `bottom` | Debajo del elemento           | Explicaciones largas  |
| `left`   | A la izquierda del elemento   | Menús laterales       |
| `right`  | A la derecha del elemento     | Información adicional |

## 🎨 Variantes

| Variante  | Descripción            | Uso                    |
| --------- | ---------------------- | ---------------------- |
| `default` | Color oscuro (default) | Información general    |
| `danger`  | Color rojo             | Advertencias y errores |

## 🏗️ Interfaces

```typescript
type TooltipPosition = "top" | "bottom" | "left" | "right";
type TooltipVariant = "default" | "danger";
```

## 💡 Ejemplos Prácticos

### 1. Tooltip Superior

```html
<div class="tooltip-demo-container">
  <div class="tooltip-trigger" (mouseenter)="showTooltipTop = true" (mouseleave)="showTooltipTop = false">
    <span>Hover aquí arriba</span>
    <openiis-tooltip text="Este es un tooltip en la parte superior" position="top" variant="default" [visible]="showTooltipTop"> </openiis-tooltip>
  </div>
</div>
```

```typescript
export class MyComponent {
  showTooltipTop = false;
}
```

### 2. Tooltip Inferior

```html
<div class="tooltip-demo-container">
  <div class="tooltip-trigger" (mouseenter)="showTooltipBottom = true" (mouseleave)="showTooltipBottom = false">
    <span>Hover aquí abajo</span>
    <openiis-tooltip text="Tooltip en la parte inferior" position="bottom" variant="default" [visible]="showTooltipBottom"> </openiis-tooltip>
  </div>
</div>
```

```typescript
export class MyComponent {
  showTooltipBottom = false;
}
```

### 3. Tooltip Izquierda

```html
<div class="tooltip-demo-container">
  <div class="tooltip-trigger" (mouseenter)="showTooltipLeft = true" (mouseleave)="showTooltipLeft = false">
    <span>Hover aquí izquierda</span>
    <openiis-tooltip text="Tooltip a la izquierda" position="left" variant="default" [visible]="showTooltipLeft"> </openiis-tooltip>
  </div>
</div>
```

```typescript
export class MyComponent {
  showTooltipLeft = false;
}
```

### 4. Tooltip Derecha

```html
<div class="tooltip-demo-container">
  <div class="tooltip-trigger" (mouseenter)="showTooltipRight = true" (mouseleave)="showTooltipRight = false">
    <span>Hover aquí derecha</span>
    <openiis-tooltip text="Tooltip a la derecha" position="right" variant="default" [visible]="showTooltipRight"> </openiis-tooltip>
  </div>
</div>
```

```typescript
export class MyComponent {
  showTooltipRight = false;
}
```

### 5. Tooltip Default

```html
<div class="tooltip-demo-container">
  <div class="tooltip-trigger" (mouseenter)="showTooltipDefault = true" (mouseleave)="showTooltipDefault = false">
    <span>Tooltip normal</span>
    <openiis-tooltip text="Tooltip con variante por defecto" position="top" variant="default" [visible]="showTooltipDefault"> </openiis-tooltip>
  </div>
</div>
```

```typescript
export class MyComponent {
  showTooltipDefault = false;
}
```

### 6. Tooltip Danger

```html
<div class="tooltip-demo-container">
  <div class="tooltip-trigger danger" (mouseenter)="showTooltipDanger = true" (mouseleave)="showTooltipDanger = false">
    <span>Tooltip peligro</span>
    <openiis-tooltip text="Tooltip con variante de peligro" position="top" variant="danger" [visible]="showTooltipDanger"> </openiis-tooltip>
  </div>
</div>
```

```typescript
export class MyComponent {
  showTooltipDanger = false;
}
```

### 7. Tooltip con Contenido Dinámico

```html
<div class="tooltip-demo-container">
  <div class="tooltip-trigger" (mouseenter)="showDynamicTooltip = true" (mouseleave)="showDynamicTooltip = false">
    <span>Información dinámica</span>
    <openiis-tooltip [text]="getDynamicTooltipText()" position="top" variant="default" [visible]="showDynamicTooltip"> </openiis-tooltip>
  </div>
</div>
```

```typescript
export class MyComponent {
  showDynamicTooltip = false;

  getDynamicTooltipText(): string {
    return `Información actualizada: ${new Date().toLocaleTimeString()}`;
  }
}
```

### 8. Tooltip con Estados Condicionales

```html
<div class="tooltip-demo-container">
  <div class="tooltip-trigger" (mouseenter)="showConditionalTooltip = true" (mouseleave)="showConditionalTooltip = false">
    <span>{{ buttonText }}</span>
    <openiis-tooltip [text]="getConditionalTooltipText()" [position]="tooltipPosition" [variant]="tooltipVariant" [visible]="showConditionalTooltip"> </openiis-tooltip>
  </div>
</div>
```

```typescript
export class MyComponent {
  showConditionalTooltip = false;
  isEnabled = true;

  get buttonText(): string {
    return this.isEnabled ? "Activar" : "Desactivar";
  }

  getConditionalTooltipText(): string {
    return this.isEnabled ? "Haz clic para activar la función" : "Haz clic para desactivar la función";
  }

  get tooltipPosition(): "top" | "bottom" | "left" | "right" {
    return "top";
  }

  get tooltipVariant(): "default" | "danger" {
    return this.isEnabled ? "default" : "danger";
  }
}
```

### 9. Tooltip Integrado en Botones

```html
<openiis-button text="Botón con Tooltip" type="primary" tooltipText="Información adicional del botón" tooltipPosition="top" (clickEvent)="onButtonClick()"> </openiis-button>
```

```typescript
export class MyComponent {
  onButtonClick() {
    console.log("Botón clickeado");
  }
}
```

### 10. Tooltip en Dropdowns

```html
<openiis-dropdown [options]="dropdownOptions" [selectedValue]="selectedOption" tooltip="Selecciona una opción del dropdown" tooltipPosition="bottom" (selectionChanged)="onSelectionChange($event)"> </openiis-dropdown>
```

```typescript
export class MyComponent {
  dropdownOptions = [
    { value: "option1", label: "Opción 1" },
    { value: "option2", label: "Opción 2" },
    { value: "option3", label: "Opción 3" },
  ];
  selectedOption = "option1";

  onSelectionChange(value: string) {
    console.log("Opción seleccionada:", value);
  }
}
```

## ⚡ Comportamiento

### Estados

- **Oculto**: Estado por defecto (invisible)
- **Visible**: Cuando se activa el hover/focus
- **Transición**: Animación suave de entrada/salida

### Interacciones

- **Hover**: Se muestra al pasar el mouse
- **Focus**: Se muestra al recibir foco (accesibilidad)
- **Auto-posicionamiento**: Se ajusta según el espacio disponible

### Responsive

- **Móvil**: Tamaños reducidos automáticamente
- **Desktop**: Tamaños completos
- **Accesibilidad**: Soporte completo para lectores

## ✅ Características

- ✅ 4 posiciones configurables (top, bottom, left, right)
- ✅ 2 variantes de color (default, danger)
- ✅ Posicionamiento automático
- ✅ Animaciones suaves
- ✅ Responsive design
- ✅ Accesibilidad completa
- ✅ Soporte para lectores de pantalla
- ✅ ARIA roles y labels
- ✅ Transiciones CSS optimizadas
- ✅ Z-index automático
- ✅ Pointer events deshabilitados
- ✅ Contenido dinámico
- ✅ Integración con otros componentes

## 🎨 Estilos Automáticos

- **Posiciones**: Cada posición tiene estilos únicos
- **Variantes**: Colores y sombras específicas
- **Responsive**: Se adapta automáticamente en móviles
- **Animaciones**: Transiciones suaves
- **Accesibilidad**: Indicadores de foco y ARIA

## 🔧 Funcionalidades Especiales

### Integración con Componentes

```typescript
// Tooltips automáticos en botones
<openiis-button tooltipText="Información" tooltipPosition="top">
```

### Posicionamiento Inteligente

```typescript
// Se ajusta automáticamente según el espacio disponible
position = "top"; // Intenta arriba, si no hay espacio va abajo
```

### Variantes de Color

```typescript
// Diferentes colores según el contexto
variant = "default"; // Negro para información general
variant = "danger"; // Rojo para advertencias
```

### Contenido Dinámico

```typescript
// Tooltip con contenido que cambia
[text] = "getDynamicContent()";
```

## 🚨 Solución de Problemas

| Problema                  | Solución                                                                         |
| ------------------------- | -------------------------------------------------------------------------------- |
| Tooltip no aparece        | Verifica que `visible` esté en `true` y el contenedor tenga `position: relative` |
| Posición incorrecta       | Verifica que `position` esté configurado correctamente                           |
| Color no cambia           | Verifica que `variant` esté configurado                                          |
| Responsive no funciona    | Verifica que el CSS responsive esté cargado                                      |
| Accesibilidad no funciona | Verifica que el elemento tenga focus/hover                                       |
| Z-index conflictos        | Verifica que no haya elementos con z-index mayor                                 |

## 🐞 Reportar Problemas

Si encuentras algún problema en la lógica del componente, por favor
[🐞Reportalo](https://github.com/Alexiisart/openiis-ui/issues/new)
