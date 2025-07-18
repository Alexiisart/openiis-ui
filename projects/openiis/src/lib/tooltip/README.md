# Componente Tooltip

Componente tooltip reutilizable que puede posicionarse en diferentes ubicaciones y soporta diferentes variantes de color.

## Importación

```typescript
import { TooltipComponent } from "./shared/components/tooltip";
```

## Uso Básico

```html
<app-tooltip text="Texto del tooltip" position="top" variant="default" [visible]="showTooltip">
  <button>Elemento con tooltip</button>
</app-tooltip>
```

## Propiedades

| Propiedad  | Tipo                                     | Por defecto | Descripción                   |
| ---------- | ---------------------------------------- | ----------- | ----------------------------- |
| `text`     | `string`                                 | `''`        | Texto a mostrar en el tooltip |
| `position` | `'top' \| 'bottom' \| 'left' \| 'right'` | `'top'`     | Posición del tooltip          |
| `variant`  | `'default' \| 'danger'`                  | `'default'` | Variante de color del tooltip |
| `visible`  | `boolean`                                | `false`     | Si el tooltip está visible    |

## Posiciones Disponibles

- `top` - Arriba del elemento
- `bottom` - Abajo del elemento
- `left` - A la izquierda del elemento
- `right` - A la derecha del elemento

## Variantes de Color

- `default` - Tooltip negro con texto blanco
- `danger` - Tooltip rojo con texto blanco (para acciones destructivas)

## Ejemplos

### Tooltip básico

```html
<app-tooltip text="Información adicional" position="top" [visible]="showTooltip">
  <span>Elemento con información</span>
</app-tooltip>
```

### Tooltip de peligro

```html
<app-tooltip text="Esta acción eliminará el elemento" position="bottom" variant="danger" [visible]="showTooltip">
  <button class="delete-btn">Eliminar</button>
</app-tooltip>
```

### Con diferentes posiciones

```html
<!-- Arriba -->
<app-tooltip text="Tooltip arriba" position="top" [visible]="showTooltip">
  <button>Top</button>
</app-tooltip>

<!-- Abajo -->
<app-tooltip text="Tooltip abajo" position="bottom" [visible]="showTooltip">
  <button>Bottom</button>
</app-tooltip>

<!-- Izquierda -->
<app-tooltip text="Tooltip izquierda" position="left" [visible]="showTooltip">
  <button>Left</button>
</app-tooltip>

<!-- Derecha -->
<app-tooltip text="Tooltip derecha" position="right" [visible]="showTooltip">
  <button>Right</button>
</app-tooltip>
```

## Integración con Botones

El componente `ButtonComponent` incluye soporte automático para tooltips cuando `type="icon"`:

```html
<app-button type="icon" iconLeft="info" tooltipText="Información" tooltipPosition="top" (clickEvent)="showInfo()"> </app-button>
```

### Tooltip rojo automático para delete

```html
<app-button type="icon" iconLeft="delete" tooltipText="Eliminar elemento" (clickEvent)="delete()"> </app-button>
```

**Nota:** Cuando el botón tiene `iconLeft="delete"` o `iconRight="delete"`, el tooltip automáticamente cambia a la variante `danger` (rojo).

## Características

✅ **Posicionamiento inteligente** - Se adapta a los bordes de la pantalla  
✅ **Animaciones suaves** - Transiciones de opacidad y visibilidad  
✅ **Responsive** - Se adapta a dispositivos móviles  
✅ **Accesibilidad** - Incluye atributos ARIA apropiados  
✅ **Fácil de usar** - API simple y clara  
✅ **Tipado TypeScript** - Tipos seguros para todas las propiedades
