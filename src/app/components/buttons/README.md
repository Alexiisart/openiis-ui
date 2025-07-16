# Openiis Button Component

El `OpeniisButtonComponent` es un componente de botón altamente configurable y reutilizable que incluye todos los tipos de botones necesarios para el proyecto.

## Características

- ✅ **16 variantes de estilo**: primary, secondary, success, warning, danger, info, outline variants, ghost, text, link, subtle, icon
- ✅ **5 tamaños**: xs, sm, md, lg, xl
- ✅ **Iconos**: Soporte para Material Icons y SVG assets
- ✅ **Estados**: loading, disabled, active
- ✅ **Tooltips**: Integrados con posicionamiento configurable
- ✅ **Accesibilidad**: ARIA labels completos y navegación por teclado
- ✅ **Responsive**: Ancho completo configurable
- ✅ **TypeScript**: Tipado completo y seguro
- ✅ **Standalone**: No requiere módulos adicionales

## Importación

```typescript
import { OpeniisButtonComponent } from "./components/buttons/button.component";
```

## Uso Básico

```html
<openiis-button text="Guardar" (clickEvent)="save()"></openiis-button>
```

## Tipos de Botones

### Principales

- `primary` - Botón principal (azul)
- `secondary` - Botón secundario (gris)
- `success` - Botón de éxito (verde)
- `warning` - Botón de advertencia (amarillo)
- `danger` - Botón de peligro (rojo)
- `info` - Botón informativo (azul claro)

### Outline

- `outline-primary` - Botón outline principal
- `outline-secondary` - Botón outline secundario
- `outline-success` - Botón outline de éxito
- `outline-warning` - Botón outline de advertencia
- `outline-danger` - Botón outline de peligro
- `outline-info` - Botón outline informativo

### Especiales

- `ghost` - Botón fantasma (transparente)
- `icon` - Solo icono
- `text` - Solo texto
- `link` - Estilo de enlace
- `subtle` - Sutil

## Tamaños

- `xs` - Extra pequeño (24px)
- `sm` - Pequeño (32px)
- `md` - Mediano (40px) - **Por defecto**
- `lg` - Grande (48px)
- `xl` - Extra grande (56px)

## Propiedades

| Propiedad         | Tipo                                     | Por defecto | Descripción                            |
| ----------------- | ---------------------------------------- | ----------- | -------------------------------------- |
| `text`            | `string`                                 | `''`        | Texto del botón                        |
| `type`            | `ButtonVariant`                          | `'primary'` | Tipo/variante del botón                |
| `size`            | `ButtonSize`                             | `'md'`      | Tamaño del botón                       |
| `htmlType`        | `'button' \| 'submit' \| 'reset'`        | `'button'`  | Tipo HTML del botón                    |
| `disabled`        | `boolean`                                | `false`     | Si el botón está deshabilitado         |
| `loading`         | `boolean`                                | `false`     | Muestra spinner de carga               |
| `iconLeft`        | `string`                                 | `''`        | Icono Material Icons a la izquierda    |
| `iconRight`       | `string`                                 | `''`        | Icono Material Icons a la derecha      |
| `iconOnly`        | `boolean`                                | `false`     | Solo mostrar icono (ocultar texto)     |
| `iconAsset`       | `string`                                 | `''`        | Ruta al archivo SVG del icono          |
| `fullWidth`       | `boolean`                                | `false`     | Ocupa todo el ancho disponible         |
| `tooltipText`     | `string`                                 | `''`        | Texto del tooltip                      |
| `tooltipPosition` | `'top' \| 'bottom' \| 'left' \| 'right'` | `'top'`     | Posición del tooltip                   |
| `tooltipVariant`  | `'default' \| 'danger'`                  | `'default'` | Variante visual del tooltip            |
| `title`           | `string`                                 | `''`        | Título del botón (tooltip alternativo) |
| `hasDropdown`     | `boolean`                                | `false`     | Si el botón tiene un dropdown asociado |
| `color`           | `string`                                 | `undefined` | Color personalizado para el botón      |

## Eventos

| Evento       | Tipo                  | Descripción           |
| ------------ | --------------------- | --------------------- |
| `clickEvent` | `EventEmitter<Event>` | Emitido al hacer clic |

## Ejemplos de Uso

### Botón básico

```html
<openiis-button text="Guardar" type="primary" (clickEvent)="save()"></openiis-button>
```

### Botón con icono

```html
<openiis-button text="Crear Lista" iconLeft="add" size="lg" type="primary" (clickEvent)="createList()"> </openiis-button>
```

### Botón solo icono con tooltip

```html
<openiis-button type="icon" iconLeft="delete" size="sm" tooltipText="Eliminar elemento" tooltipPosition="top" tooltipVariant="danger" (clickEvent)="delete()"> </openiis-button>
```

### Botón con icono SVG

```html
<openiis-button type="icon" iconAsset="assets/linkedin.svg" size="lg" tooltipText="Visitar LinkedIn" (clickEvent)="openLinkedIn()"> </openiis-button>
```

### Botón de carga

```html
<openiis-button text="Guardando..." type="primary" [loading]="isLoading" [disabled]="isLoading" (clickEvent)="save()"> </openiis-button>
```

### Botón ancho completo

```html
<openiis-button text="Continuar" type="primary" fullWidth="true" (clickEvent)="continue()"> </openiis-button>
```

### Botón outline con icono

```html
<openiis-button text="Eliminar Todo" type="outline-danger" iconLeft="delete_sweep" (clickEvent)="deleteAll()"> </openiis-button>
```

### Botón fantasma

```html
<openiis-button text="Opciones" type="ghost" iconRight="arrow_drop_down" hasDropdown="true" (clickEvent)="showOptions()"> </openiis-button>
```

### Botón con color personalizado

```html
<openiis-button text="Personalizado" type="icon" iconAsset="assets/github.svg" [color]="'var(--color-text-primary)'" (clickEvent)="customAction()"> </openiis-button>
```

## Variantes de Estilo

### Botones principales

```html
<openiis-button text="Primary" type="primary"></openiis-button>
<openiis-button text="Secondary" type="secondary"></openiis-button>
<openiis-button text="Success" type="success"></openiis-button>
<openiis-button text="Warning" type="warning"></openiis-button>
<openiis-button text="Danger" type="danger"></openiis-button>
<openiis-button text="Info" type="info"></openiis-button>
```

### Botones outline

```html
<openiis-button text="Primary" type="outline-primary"></openiis-button>
<openiis-button text="Secondary" type="outline-secondary"></openiis-button>
<openiis-button text="Success" type="outline-success"></openiis-button>
<openiis-button text="Warning" type="outline-warning"></openiis-button>
<openiis-button text="Danger" type="outline-danger"></openiis-button>
<openiis-button text="Info" type="outline-info"></openiis-button>
```

### Botones especiales

```html
<openiis-button text="Ghost" type="ghost"></openiis-button>
<openiis-button text="Text" type="text"></openiis-button>
<openiis-button text="Link" type="link"></openiis-button>
<openiis-button text="Subtle" type="subtle"></openiis-button>
<openiis-button iconLeft="settings" type="icon"></openiis-button>
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
<openiis-button text="Guardar" type="primary" iconLeft="save" (clickEvent)="save()"> </openiis-button>
```

## Integración con Tooltips

El componente incluye integración completa con tooltips:

- **Automático**: Los botones de tipo `icon` muestran tooltips automáticamente
- **Posicionamiento**: 4 posiciones disponibles (top, bottom, left, right)
- **Variantes**: Default y danger para diferentes contextos
- **Fallback**: Usa `title` si `tooltipText` no está definido

## Accesibilidad

- ✅ **ARIA Labels**: Soporte completo para etiquetas ARIA
- ✅ **Navegación por teclado**: Tab, Enter, Space
- ✅ **Estados**: Manejo de estados disabled y loading
- ✅ **Contraste**: Cumple con WCAG 2.1 AA
- ✅ **Lectores de pantalla**: Descripción clara de la funcionalidad

## Integración con Servicios

### SvgIconService

El componente utiliza el `SvgIconService` para cargar y renderizar iconos SVG de manera eficiente.

```typescript
// El servicio se inyecta automáticamente
// Los iconos SVG se cargan dinámicamente según la propiedad iconAsset
```

## Casos de Uso Comunes

### Navegación Social

```html
<div class="social-buttons">
  <a href="https://linkedin.com/company/openiis" target="_blank">
    <openiis-button size="lg" type="icon" iconAsset="assets/linkedin.svg" tooltipText="Seguir en LinkedIn" [color]="'var(--color-text-primary)'"></openiis-button>
  </a>

  <a href="https://github.com/openiis/ui" target="_blank">
    <openiis-button size="lg" type="icon" iconAsset="assets/github.svg" tooltipText="Ver en GitHub" [color]="'var(--color-text-primary)'"></openiis-button>
  </a>
</div>
```

### Formularios

```html
<div class="form-actions">
  <openiis-button text="Cancelar" type="secondary" (clickEvent)="cancel()"> </openiis-button>

  <openiis-button text="Guardar" type="primary" htmlType="submit" [loading]="saving" [disabled]="!form.valid" (clickEvent)="save()"> </openiis-button>
</div>
```

### Acciones Destructivas

```html
<openiis-button text="Eliminar Cuenta" type="outline-danger" iconLeft="delete_forever" tooltipText="Esta acción no se puede deshacer" tooltipVariant="danger" (clickEvent)="deleteAccount()"> </openiis-button>
```

## Beneficios

✅ **Consistencia visual**: Todos los botones siguen el mismo sistema de diseño  
✅ **Mantenimiento centralizado**: Un solo lugar para cambios de estilo  
✅ **TypeScript**: Tipos seguros para todas las propiedades  
✅ **Accesibilidad**: ARIA labels y navegación por teclado integrados  
✅ **Responsive**: Adaptación automática a diferentes tamaños  
✅ **Estados**: Loading, disabled, hover, etc. incluidos  
✅ **Iconos**: Soporte completo para Material Icons y SVG assets  
✅ **Flexibilidad**: Múltiples variantes, tamaños y configuraciones  
✅ **Tooltips**: Sistema de tooltips integrado y configurable  
✅ **Rendimiento**: Detección de cambios optimizada con OnPush
