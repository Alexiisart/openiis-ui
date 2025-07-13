# Sistema de Botones Centralizado

Este sistema proporciona un componente `ButtonComponent` centralizado y reutilizable que incluye todos los tipos de botones del proyecto.

## Importación

```typescript
import { ButtonComponent, type ButtonType, type ButtonSize } from "./shared/atomic/buttons";
```

## Uso Básico

```html
<app-button type="primary" text="Guardar" (clickEvent)="save()"> </app-button>
```

## Tipos de Botones

### Primarios

- `primary` - Botón principal (azul)
- `secondary` - Botón secundario (gris)
- `danger` - Botón de peligro (rojo)
- `success` - Botón de éxito (verde)
- `warning` - Botón de advertencia (amarillo)

### Outline

- `outline-primary` - Botón outline principal
- `outline-secondary` - Botón outline secundario
- `outline-danger` - Botón outline de peligro

### Especiales

- `ghost` - Botón fantasma (transparente)
- `icon` - Solo icono
- `text` - Solo texto
- `subtle` - Sutil
- `link` - Estilo de enlace

## Tamaños

- `xs` - Extra pequeño (24px)
- `sm` - Pequeño (32px)
- `md` - Mediano (40px) - **Por defecto**
- `lg` - Grande (48px)
- `xl` - Extra grande (56px)

## Propiedades

| Propiedad         | Tipo                                     | Por defecto | Descripción                                                                         |
| ----------------- | ---------------------------------------- | ----------- | ----------------------------------------------------------------------------------- |
| `type`            | `ButtonType`                             | `'primary'` | Tipo/variante del botón                                                             |
| `size`            | `ButtonSize`                             | `'md'`      | Tamaño del botón                                                                    |
| `text`            | `string`                                 | `undefined` | Texto del botón                                                                     |
| `iconLeft`        | `string`                                 | `undefined` | Icono Material Icons a la izquierda                                                 |
| `iconRight`       | `string`                                 | `undefined` | Icono Material Icons a la derecha                                                   |
| `disabled`        | `boolean`                                | `false`     | Si el botón está deshabilitado                                                      |
| `loading`         | `boolean`                                | `false`     | Muestra spinner de carga                                                            |
| `fullWidth`       | `boolean`                                | `false`     | Ocupa todo el ancho disponible                                                      |
| `responsive`      | `boolean`                                | `false`     | Full width en móvil                                                                 |
| `htmlType`        | `'button' \| 'submit' \| 'reset'`        | `'button'`  | Tipo HTML del botón                                                                 |
| `ariaLabel`       | `string`                                 | `undefined` | Label para accesibilidad                                                            |
| `title`           | `string`                                 | `undefined` | Tooltip del botón                                                                   |
| `extraClasses`    | `string`                                 | `undefined` | Clases CSS adicionales                                                              |
| `tooltipText`     | `string`                                 | `undefined` | Texto del tooltip (solo para type="icon"). Si está vacío, usa `title` como fallback |
| `tooltipPosition` | `'top' \| 'bottom' \| 'left' \| 'right'` | `'top'`     | Posición del tooltip                                                                |

## Eventos

| Evento       | Tipo                  | Descripción           |
| ------------ | --------------------- | --------------------- |
| `clickEvent` | `EventEmitter<Event>` | Emitido al hacer clic |

## Ejemplos

### Botón con icono

```html
<app-button type="primary" text="Crear Lista" iconLeft="add" size="lg" (clickEvent)="createList()"> </app-button>
```

### Botón solo icono con tooltip

```html
<app-button type="icon" iconLeft="delete" size="sm" tooltipText="Eliminar elemento" tooltipPosition="top" (clickEvent)="delete()"> </app-button>
```

### Botón icono con tooltip rojo (delete)

```html
<app-button type="icon" iconLeft="delete" size="sm" tooltipText="Eliminar permanentemente" tooltipPosition="bottom" (clickEvent)="delete()"> </app-button>
```

**Notas importantes:**

- El tooltip se muestra automáticamente en botones de tipo `icon` cuando se proporciona `tooltipText` o `title`
- Si `tooltipText` está vacío pero `title` tiene valor, se usará `title` como texto del tooltip
- Cuando `iconLeft` o `iconRight` es "delete", el tooltip automáticamente se muestra en color rojo
- Si no se proporciona ni `tooltipText` ni `title`, no se mostrará el tooltip

### Botón icono usando solo title

```html
<app-button type="icon" iconLeft="info" size="sm" title="Ver información" (clickEvent)="showInfo()"> </app-button>
```

### Botón de carga

```html
<app-button type="primary" text="Guardando..." [loading]="isLoading" [disabled]="isLoading" (clickEvent)="save()"> </app-button>
```

### Botón responsive

```html
<app-button type="secondary" text="Cancelar" responsive="true" (clickEvent)="cancel()"> </app-button>
```

### Botón outline

```html
<app-button type="outline-danger" text="Eliminar Todo" iconLeft="delete_sweep" (clickEvent)="deleteAll()"> </app-button>
```

### Botón fantasma

```html
<app-button type="ghost" text="Opciones" iconRight="arrow_drop_down" (clickEvent)="showOptions()"> </app-button>
```

## Migración

Para migrar botones existentes:

### Antes

```html
<button class="primary-btn" (click)="save()">
  <span class="material-icons-outlined">save</span>
  Guardar
</button>
```

### Después

```html
<app-button type="primary" text="Guardar" iconLeft="save" (clickEvent)="save()"> </app-button>
```

## Beneficios

✅ **Consistencia visual** - Todos los botones siguen el mismo sistema de diseño  
✅ **Mantenimiento centralizado** - Un solo lugar para cambios de estilo  
✅ **TypeScript** - Tipos seguros para todas las propiedades  
✅ **Accesibilidad** - ARIA labels y navegación por teclado  
✅ **Responsive** - Adaptación automática a diferentes tamaños  
✅ **Estados** - Loading, disabled, hover, etc.  
✅ **Iconos** - Soporte completo para Material Icons  
✅ **Flexibilidad** - Múltiples variantes y tamaños
