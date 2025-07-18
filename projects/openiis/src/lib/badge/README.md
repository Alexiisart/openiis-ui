# Openiis Badge Component

El `OpeniisBadgeComponent` es un elemento versátil para mostrar información secundaria como notificaciones, estados, contadores, etiquetas y más.

## Características

- ✅ **7 variantes de color**: default, primary, secondary, success, warning, danger, info
- ✅ **5 tamaños**: xs, sm, md, lg, xl
- ✅ **4 estilos**: filled, outline, soft, dot
- ✅ **3 formas**: rounded, pill, square
- ✅ **Posicionamiento**: top-right, top-left, bottom-right, bottom-left
- ✅ **Iconos**: Soporte para Material Icons
- ✅ **Interactividad**: Clickable, closable, disabled
- ✅ **Animaciones**: Entrada animada, pulsante
- ✅ **Accesibilidad**: ARIA labels, navegación por teclado
- ✅ **Responsive**: Adaptable a diferentes tamaños de pantalla
- ✅ **Content Projection**: Soporte para contenido personalizado

## Importación

```typescript
import { OpeniisBadgeComponent } from "./components/badge/badge.component";
```

## Uso Básico

```html
<!-- Badge simple -->
<openiis-badge>Nuevo</openiis-badge>

<!-- Badge con variante -->
<openiis-badge variant="primary">Importante</openiis-badge>

<!-- Badge con contador -->
<openiis-badge variant="danger" [count]="5"></openiis-badge>

<!-- Badge dot -->
<openiis-badge variant="success" style="dot"></openiis-badge>
```

## Propiedades

| Propiedad        | Tipo            | Valor por defecto | Descripción                          |
| ---------------- | --------------- | ----------------- | ------------------------------------ |
| `variant`        | `BadgeVariant`  | `'default'`       | Variante de color del badge          |
| `size`           | `BadgeSize`     | `'md'`            | Tamaño del badge                     |
| `style`          | `BadgeStyle`    | `'filled'`        | Estilo visual del badge              |
| `shape`          | `BadgeShape`    | `'rounded'`       | Forma del badge                      |
| `position`       | `BadgePosition` | `undefined`       | Posición absoluta del badge          |
| `text`           | `string`        | `undefined`       | Texto a mostrar en el badge          |
| `count`          | `number`        | `undefined`       | Número a mostrar en el badge         |
| `maxCount`       | `number`        | `99`              | Número máximo antes de mostrar '+'   |
| `leftIcon`       | `string`        | `undefined`       | Icono Material Icons a la izquierda  |
| `icon`           | `string`        | `undefined`       | Icono Material Icons principal       |
| `rightIcon`      | `string`        | `undefined`       | Icono Material Icons a la derecha    |
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

## Eventos

| Evento  | Tipo                  | Descripción                              |
| ------- | --------------------- | ---------------------------------------- |
| `click` | `EventEmitter<Event>` | Se emite cuando se hace clic en el badge |
| `close` | `EventEmitter<Event>` | Se emite cuando se cierra el badge       |

## Ejemplos de Uso

### Variantes de Color

```html
<openiis-badge variant="default">Default</openiis-badge>
<openiis-badge variant="primary">Primary</openiis-badge>
<openiis-badge variant="secondary">Secondary</openiis-badge>
<openiis-badge variant="success">Success</openiis-badge>
<openiis-badge variant="warning">Warning</openiis-badge>
<openiis-badge variant="danger">Danger</openiis-badge>
<openiis-badge variant="info">Info</openiis-badge>
```

### Tamaños

```html
<openiis-badge size="xs">XS</openiis-badge>
<openiis-badge size="sm">SM</openiis-badge>
<openiis-badge size="md">MD</openiis-badge>
<openiis-badge size="lg">LG</openiis-badge>
<openiis-badge size="xl">XL</openiis-badge>
```

### Estilos

```html
<openiis-badge style="filled">Filled</openiis-badge>
<openiis-badge style="outline">Outline</openiis-badge>
<openiis-badge style="soft">Soft</openiis-badge>
<openiis-badge style="dot"></openiis-badge>
```

### Formas

```html
<openiis-badge shape="rounded">Rounded</openiis-badge>
<openiis-badge shape="pill">Pill</openiis-badge>
<openiis-badge shape="square">Square</openiis-badge>
```

### Con Iconos

```html
<openiis-badge leftIcon="star">Favorito</openiis-badge>
<openiis-badge rightIcon="arrow_forward">Siguiente</openiis-badge>
<openiis-badge icon="notifications" variant="primary">Notificación</openiis-badge>
<openiis-badge leftIcon="warning" rightIcon="close" closable variant="warning">Advertencia</openiis-badge>
```

### Contadores

```html
<openiis-badge variant="danger" [count]="3">Mensajes</openiis-badge>
<openiis-badge variant="primary" [count]="150" [maxCount]="99">Notificaciones</openiis-badge>
<openiis-badge variant="info" [count]="0">Sin elementos</openiis-badge>
```

### Posicionamiento

```html
<div style="position: relative; display: inline-block;">
  <button>Notificaciones</button>
  <openiis-badge variant="danger" [count]="5" position="top-right" size="sm"> </openiis-badge>
</div>
```

### Interactivo

```html
<openiis-badge variant="primary" clickable animated (click)="onBadgeClick()"> Clickeable </openiis-badge>

<openiis-badge variant="warning" closable (close)="onBadgeClose()"> Cerrable </openiis-badge>
```

### Animado

```html
<openiis-badge variant="success" animated pulsing>Animado</openiis-badge>
```

### Estados

```html
<openiis-badge disabled>Deshabilitado</openiis-badge>
<openiis-badge hidden>Oculto</openiis-badge>
<openiis-badge clickable>Clickeable</openiis-badge>
```

### Con Texto Personalizado

```html
<openiis-badge variant="info" text="Beta" shape="pill"></openiis-badge> <openiis-badge variant="success" text="Completado" size="lg"></openiis-badge>
```

## Casos de Uso Comunes

### Indicador de Notificaciones

```html
<div class="notification-item">
  <span class="material-icons-outlined">notifications</span>
  <openiis-badge variant="danger" [count]="unreadCount" position="top-right" size="sm"> </openiis-badge>
</div>
```

### Estados de Usuario

```html
<div class="user-status">
  <img src="avatar.jpg" alt="Avatar" />
  <openiis-badge variant="success" style="dot" position="bottom-right" title="En línea"> </openiis-badge>
</div>
```

### Etiquetas de Producto

```html
<div class="product-card">
  <openiis-badge variant="primary" shape="pill" size="sm" leftIcon="new_releases"> Nuevo </openiis-badge>
  <openiis-badge variant="warning" shape="pill" size="sm" leftIcon="trending_up"> Popular </openiis-badge>
</div>
```

### Información Contextual

```html
<openiis-badge leftIcon="info" variant="primary" text="Aún en beta. Síguenos en LinkedIn y GitHub mientras preparamos el lanzamiento en npm." size="lg" style="outline" shape="pill"> </openiis-badge>
```

### Contador de Carrito

```html
<div class="cart-icon">
  <span class="material-icons-outlined">shopping_cart</span>
  <openiis-badge variant="danger" [count]="cartItems" position="top-right" [maxCount]="99" animated> </openiis-badge>
</div>
```

## Content Projection

El componente soporta contenido personalizado mediante `ng-content`:

```html
<openiis-badge variant="primary" shape="pill">
  <span class="material-icons-outlined">star</span>
  Favorito
</openiis-badge>

<openiis-badge variant="success">
  <strong>¡Nuevo!</strong>
  <small>Funcionalidad disponible</small>
</openiis-badge>
```

## Accesibilidad

- ✅ **Roles ARIA**: Usa `role="status"` por defecto, configurable
- ✅ **Labels**: Soporte para `ariaLabel` y `title`
- ✅ **Navegación por teclado**: Para badges clickeables
- ✅ **Lectores de pantalla**: Anuncios apropiados para contadores y estados
- ✅ **Contraste**: Cumple con WCAG 2.1 AA en todas las variantes
- ✅ **Focus management**: Gestión correcta del foco para elementos interactivos

## Personalización CSS

```css
.badge {
  /* Variables CSS personalizables */
  --badge-font-family: var(--font-primary);
  --badge-font-weight: 500;
  --badge-letter-spacing: 0.025em;
  --badge-border-radius: 6px;
  --badge-transition: all 0.2s cubic-bezier(0.4, 0, 0.2, 1);

  /* Animaciones */
  --badge-animation-duration: 0.3s;
  --badge-pulse-duration: 2s;
}

/* Personalización por variante */
.badge[data-variant="primary"] {
  --badge-bg: var(--primary-500);
  --badge-color: white;
  --badge-border: var(--primary-500);
}

.badge[data-style="soft"] {
  --badge-bg: var(--primary-50);
  --badge-color: var(--primary-700);
  --badge-border: transparent;
}
```

## Mejores Prácticas

1. **Uso de contadores**: Para números > 99, usar la propiedad `maxCount`
2. **Posicionamiento**: Usar `position` para badges overlay, evitar para badges inline
3. **Accesibilidad**: Siempre proporcionar `ariaLabel` para badges informativos
4. **Animaciones**: Usar `pulsing` solo para llamar la atención, no para badges permanentes
5. **Colores**: Usar variantes semánticas (success para éxito, danger para errores)
6. **Tamaño**: Ajustar el `size` según el contexto (xs/sm para overlay, md/lg para standalone)

## Notas de Implementación

- ✅ **Standalone Component**: No requiere módulos adicionales
- ✅ **OnPush Change Detection**: Optimizado para rendimiento
- ✅ **Content Projection**: Soporte completo para contenido personalizado
- ✅ **Event Handling**: Manejo seguro de eventos click y close
- ✅ **Responsive**: Variables CSS que se adaptan a diferentes tamaños
- ✅ **SSR Compatible**: Funciona correctamente en Server-Side Rendering
