# Badge Component

El componente Badge es un elemento versátil para mostrar información secundaria como notificaciones, estados, contadores, etiquetas y más.

## Características

- **7 variantes de color**: default, primary, secondary, success, warning, danger, info
- **5 tamaños**: xs, sm, md, lg, xl
- **4 estilos**: filled, outline, soft, dot
- **3 formas**: rounded, pill, square
- **Posicionamiento**: top-right, top-left, bottom-right, bottom-left
- **Iconos**: Soporte para iconos izquierdo y derecho
- **Interactividad**: Clickable, closable, disabled
- **Animaciones**: Entrada animada, pulsante
- **Accesibilidad**: ARIA labels, navegación por teclado
- **Responsive**: Adaptable a diferentes tamaños de pantalla

## Uso Básico

```html
<!-- Badge simple -->
<app-badge>Nuevo</app-badge>

<!-- Badge con variante -->
<app-badge variant="primary">Importante</app-badge>

<!-- Badge con contador -->
<app-badge variant="danger" [count]="5"></app-badge>

<!-- Badge dot -->
<app-badge variant="success" style="dot"></app-badge>
```

## Propiedades

| Propiedad        | Tipo            | Valor por defecto | Descripción                          |
| ---------------- | --------------- | ----------------- | ------------------------------------ |
| `variant`        | `BadgeVariant`  | `'default'`       | Variante de color del badge          |
| `size`           | `BadgeSize`     | `'md'`            | Tamaño del badge                     |
| `style`          | `BadgeStyle`    | `'filled'`        | Estilo visual del badge              |
| `shape`          | `BadgeShape`    | `'rounded'`       | Forma del badge                      |
| `position`       | `BadgePosition` | `undefined`       | Posición absoluta del badge          |
| `count`          | `number`        | `undefined`       | Número a mostrar en el badge         |
| `maxCount`       | `number`        | `99`              | Número máximo antes de mostrar '+'   |
| `leftIcon`       | `string`        | `undefined`       | Clase CSS del icono izquierdo        |
| `rightIcon`      | `string`        | `undefined`       | Clase CSS del icono derecho          |
| `closable`       | `boolean`       | `false`           | Si el badge puede cerrarse           |
| `animated`       | `boolean`       | `false`           | Si el badge aparece animado          |
| `pulsing`        | `boolean`       | `false`           | Si el badge tiene animación pulsante |
| `hidden`         | `boolean`       | `false`           | Si el badge está oculto              |
| `clickable`      | `boolean`       | `false`           | Si el badge es clickeable            |
| `disabled`       | `boolean`       | `false`           | Si el badge está deshabilitado       |
| `ariaLabel`      | `string`        | `undefined`       | Etiqueta ARIA para accesibilidad     |
| `title`          | `string`        | `undefined`       | Título del badge (tooltip)           |
| `role`           | `string`        | `'status'`        | Rol ARIA del badge                   |
| `maxWidth`       | `string`        | `undefined`       | Ancho máximo del badge               |
| `zIndex`         | `number`        | `undefined`       | Índice Z para posicionamiento        |
| `closeAriaLabel` | `string`        | `'Cerrar'`        | Etiqueta ARIA del botón cerrar       |

## Tipos

```typescript
type BadgeVariant = "default" | "primary" | "secondary" | "success" | "warning" | "danger" | "info";
type BadgeSize = "xs" | "sm" | "md" | "lg" | "xl";
type BadgeStyle = "filled" | "outline" | "soft" | "dot";
type BadgeShape = "rounded" | "pill" | "square";
type BadgePosition = "top-right" | "top-left" | "bottom-right" | "bottom-left";
```

## Ejemplos de Uso

### Variantes de Color

```html
<app-badge variant="default">Default</app-badge>
<app-badge variant="primary">Primary</app-badge>
<app-badge variant="secondary">Secondary</app-badge>
<app-badge variant="success">Success</app-badge>
<app-badge variant="warning">Warning</app-badge>
<app-badge variant="danger">Danger</app-badge>
<app-badge variant="info">Info</app-badge>
```

### Tamaños

```html
<app-badge size="xs">XS</app-badge>
<app-badge size="sm">SM</app-badge>
<app-badge size="md">MD</app-badge>
<app-badge size="lg">LG</app-badge>
<app-badge size="xl">XL</app-badge>
```

### Estilos

```html
<app-badge style="filled">Filled</app-badge>
<app-badge style="outline">Outline</app-badge>
<app-badge style="soft">Soft</app-badge>
<app-badge style="dot"></app-badge>
```

### Formas

```html
<app-badge shape="rounded">Rounded</app-badge>
<app-badge shape="pill">Pill</app-badge>
<app-badge shape="square">Square</app-badge>
```

### Con Iconos

```html
<app-badge leftIcon="fas fa-star">Favorito</app-badge>
<app-badge rightIcon="fas fa-arrow-right">Siguiente</app-badge>
<app-badge leftIcon="fas fa-bell" rightIcon="fas fa-times" closable>Notificación</app-badge>
```

### Contadores

```html
<app-badge variant="danger" [count]="3">Mensajes</app-badge>
<app-badge variant="primary" [count]="150" [maxCount]="99">Notificaciones</app-badge>
<app-badge variant="success" [count]="0">Sin elementos</app-badge>
```

### Posicionamiento

```html
<div style="position: relative; display: inline-block;">
  <button>Notificaciones</button>
  <app-badge variant="danger" [count]="5" position="top-right" size="sm"> </app-badge>
</div>
```

### Interactivo

```html
<app-badge variant="primary" clickable animated (click)="onBadgeClick()"> Clickeable </app-badge>

<app-badge variant="warning" closable (close)="onBadgeClose()"> Cerrable </app-badge>
```

### Animado

```html
<app-badge variant="success" animated pulsing> Animado </app-badge>
```

### Estados

```html
<app-badge disabled>Deshabilitado</app-badge>
<app-badge hidden>Oculto</app-badge>
<app-badge clickable>Clickeable</app-badge>
```

## Casos de Uso Comunes

### Notificaciones

```html
<div class="notification-item">
  <app-badge variant="danger" [count]="unreadCount" position="top-right" size="sm"> </app-badge>
  <i class="fas fa-bell"></i>
</div>
```

### Estados de Elementos

```html
<div class="item-status">
  <app-badge variant="success" style="dot"></app-badge>
  <span>En línea</span>
</div>
```

### Etiquetas de Contenido

```html
<div class="content-tags">
  <app-badge variant="primary" shape="pill">Nuevo</app-badge>
  <app-badge variant="warning" shape="pill">Popular</app-badge>
  <app-badge variant="success" shape="pill">Recomendado</app-badge>
</div>
```

### Contadores de Elementos

```html
<div class="cart-badge">
  <app-badge variant="danger" [count]="cartItems" position="top-right" [maxCount]="99"> </app-badge>
  <i class="fas fa-shopping-cart"></i>
</div>
```

## Accesibilidad

- Soporte completo para lectores de pantalla
- Navegación por teclado para badges clickeables
- Roles ARIA apropiados
- Etiquetas descriptivas configurables
- Contraste adecuado en todos los estados

## Personalización

El componente utiliza variables CSS personalizadas que pueden ser sobrescritas:

```css
.badge {
  --badge-font-family: var(--font-primary);
  --badge-font-weight: 500;
  --badge-letter-spacing: 0.025em;
  --badge-border-radius: 6px;
  --badge-transition: all 0.2s cubic-bezier(0.4, 0, 0.2, 1);
}
```

## Notas de Implementación

- El componente es standalone y no requiere módulos adicionales
- Utiliza OnPush change detection para mejor rendimiento
- Soporta content projection para contenido personalizado
- Incluye animaciones suaves y transiciones
- Responsive y compatible con diferentes dispositivos
- Optimizado para impresión y alto contraste
