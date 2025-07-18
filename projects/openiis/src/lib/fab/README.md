# FAB (Floating Action Button) Component

El componente FAB es un botón flotante circular que representa la acción principal de una pantalla. Está diseñado siguiendo las especificaciones de Material Design para ser prominente y accesible.

## Características

- **6 variantes de color**: primary, secondary, success, warning, danger, info
- **4 tamaños**: sm, md, lg, xl
- **4 posiciones**: bottom-right, bottom-left, top-right, top-left
- **3 tipos de posicionamiento**: fixed, absolute, static
- **Modo extendido**: Con texto e icono
- **Estados avanzados**: loading, disabled, hidden
- **Interacciones**: click, hover, focus con eventos
- **Animaciones**: entrada, ripple effect, hover
- **Comportamiento inteligente**: ocultarse al hacer scroll, auto-ocultar
- **Accesibilidad**: ARIA completo, navegación por teclado
- **Responsive**: Adaptable a diferentes dispositivos

## Uso Básico

```html
<!-- FAB simple -->
<app-fab icon="fas fa-plus" (fabClick)="onFabClick()"></app-fab>

<!-- FAB con variante -->
<app-fab icon="fas fa-edit" variant="secondary" size="lg"> </app-fab>

<!-- FAB extendido -->
<app-fab icon="fas fa-message" text="Nuevo mensaje" extended="true" variant="primary"> </app-fab>
```

## Propiedades

| Propiedad       | Tipo                              | Valor por defecto | Descripción                              |
| --------------- | --------------------------------- | ----------------- | ---------------------------------------- |
| `variant`       | `FabVariant`                      | `'primary'`       | Variante de color del FAB                |
| `size`          | `FabSize`                         | `'md'`            | Tamaño del FAB                           |
| `position`      | `FabPosition`                     | `'bottom-right'`  | Posición del FAB                         |
| `positioning`   | `FabPositioning`                  | `'fixed'`         | Tipo de posicionamiento                  |
| `icon`          | `string`                          | `undefined`       | Clase CSS del icono                      |
| `text`          | `string`                          | `undefined`       | Texto para FAB extendido                 |
| `extended`      | `boolean`                         | `false`           | Si el FAB está en modo extendido         |
| `type`          | `'button' \| 'submit' \| 'reset'` | `'button'`        | Tipo de botón HTML                       |
| `disabled`      | `boolean`                         | `false`           | Si el FAB está deshabilitado             |
| `loading`       | `boolean`                         | `false`           | Si el FAB está en estado de carga        |
| `animated`      | `boolean`                         | `true`            | Si el FAB tiene animaciones              |
| `rippleEnabled` | `boolean`                         | `true`            | Si el efecto ripple está habilitado      |
| `ariaLabel`     | `string`                          | `undefined`       | Etiqueta ARIA para accesibilidad         |
| `title`         | `string`                          | `undefined`       | Título del FAB (tooltip)                 |
| `bottomOffset`  | `string`                          | `'24px'`          | Desplazamiento desde abajo               |
| `rightOffset`   | `string`                          | `'24px'`          | Desplazamiento desde la derecha          |
| `leftOffset`    | `string`                          | `'24px'`          | Desplazamiento desde la izquierda        |
| `topOffset`     | `string`                          | `'24px'`          | Desplazamiento desde arriba              |
| `zIndex`        | `number`                          | `1000`            | Índice Z para posicionamiento            |
| `hideOnScroll`  | `boolean`                         | `false`           | Si se oculta al hacer scroll hacia abajo |
| `autoHide`      | `boolean`                         | `false`           | Si se oculta automáticamente             |
| `autoHideDelay` | `number`                          | `3000`            | Tiempo en ms para auto-ocultar           |

## Eventos

| Evento          | Tipo                       | Descripción                            |
| --------------- | -------------------------- | -------------------------------------- |
| `fabClick`      | `EventEmitter<MouseEvent>` | Se emite cuando se hace clic en el FAB |
| `fabMouseEnter` | `EventEmitter<void>`       | Se emite cuando el mouse entra al FAB  |
| `fabMouseLeave` | `EventEmitter<void>`       | Se emite cuando el mouse sale del FAB  |
| `fabFocus`      | `EventEmitter<void>`       | Se emite cuando el FAB recibe focus    |
| `fabBlur`       | `EventEmitter<void>`       | Se emite cuando el FAB pierde focus    |

## Tipos

```typescript
type FabVariant = "primary" | "secondary" | "success" | "warning" | "danger" | "info";
type FabSize = "sm" | "md" | "lg" | "xl";
type FabPosition = "bottom-right" | "bottom-left" | "top-right" | "top-left";
type FabPositioning = "fixed" | "absolute" | "static";
```

## Métodos Públicos

| Método     | Descripción                    |
| ---------- | ------------------------------ |
| `show()`   | Muestra el FAB                 |
| `hide()`   | Oculta el FAB                  |
| `toggle()` | Alterna la visibilidad del FAB |

## Ejemplos de Uso

### Variantes de Color

```html
<app-fab icon="fas fa-plus" variant="primary"></app-fab>
<app-fab icon="fas fa-edit" variant="secondary"></app-fab>
<app-fab icon="fas fa-check" variant="success"></app-fab>
<app-fab icon="fas fa-exclamation" variant="warning"></app-fab>
<app-fab icon="fas fa-times" variant="danger"></app-fab>
<app-fab icon="fas fa-info" variant="info"></app-fab>
```

### Tamaños

```html
<app-fab icon="fas fa-plus" size="sm"></app-fab>
<app-fab icon="fas fa-plus" size="md"></app-fab>
<app-fab icon="fas fa-plus" size="lg"></app-fab>
<app-fab icon="fas fa-plus" size="xl"></app-fab>
```

### Posiciones

```html
<app-fab icon="fas fa-plus" position="bottom-right"></app-fab>
<app-fab icon="fas fa-plus" position="bottom-left"></app-fab>
<app-fab icon="fas fa-plus" position="top-right"></app-fab>
<app-fab icon="fas fa-plus" position="top-left"></app-fab>
```

### FAB Extendido

```html
<app-fab icon="fas fa-plus" text="Crear nuevo" extended="true" variant="primary"> </app-fab>

<app-fab icon="fas fa-message" text="Enviar mensaje" extended="true" variant="success" size="lg"> </app-fab>
```

### Estados

```html
<!-- FAB deshabilitado -->
<app-fab icon="fas fa-plus" disabled="true"> </app-fab>

<!-- FAB en carga -->
<app-fab icon="fas fa-save" loading="true" text="Guardando..."> </app-fab>

<!-- FAB oculto -->
<app-fab icon="fas fa-plus" hidden="true"> </app-fab>
```

### Posicionamiento Personalizado

```html
<app-fab icon="fas fa-plus" positioning="absolute" bottomOffset="32px" rightOffset="32px"> </app-fab>

<app-fab icon="fas fa-plus" positioning="static" class="custom-position"> </app-fab>
```

### Comportamiento Avanzado

```html
<!-- FAB que se oculta al hacer scroll -->
<app-fab icon="fas fa-arrow-up" hideOnScroll="true" (fabClick)="scrollToTop()"> </app-fab>

<!-- FAB que se oculta automáticamente -->
<app-fab icon="fas fa-info" text="Información" extended="true" autoHide="true" autoHideDelay="5000"> </app-fab>
```

### Con Eventos

```html
<app-fab icon="fas fa-plus" variant="primary" (fabClick)="onAddClick($event)" (fabMouseEnter)="onFabHover()" (fabFocus)="onFabFocus()"> </app-fab>
```

## Casos de Uso Comunes

### Acción Principal

```html
<app-fab icon="fas fa-plus" variant="primary" ariaLabel="Crear nuevo elemento" (fabClick)="createNew()"> </app-fab>
```

### Navegación

```html
<app-fab icon="fas fa-arrow-up" variant="secondary" position="bottom-right" hideOnScroll="true" ariaLabel="Volver arriba" (fabClick)="scrollToTop()"> </app-fab>
```

### Acción Contextual

```html
<app-fab icon="fas fa-edit" text="Editar" extended="true" variant="primary" positioning="absolute" (fabClick)="editItem()"> </app-fab>
```

### Múltiples Acciones

```html
<div class="fab-group">
  <app-fab icon="fas fa-plus" variant="primary" size="lg" (fabClick)="showActions()"> </app-fab>

  <app-fab icon="fas fa-edit" variant="secondary" size="sm" *ngIf="showSubActions"> </app-fab>

  <app-fab icon="fas fa-delete" variant="danger" size="sm" *ngIf="showSubActions"> </app-fab>
</div>
```

## Accesibilidad

- Soporte completo para lectores de pantalla
- Navegación por teclado (Enter, Space)
- Roles ARIA apropiados
- Etiquetas descriptivas configurables
- Focus management adecuado
- Contraste suficiente en todos los estados

## Personalización

El componente utiliza variables CSS personalizadas:

```css
.fab {
  --z-index-fab: 1000;
  --fab-elevation-1: 0 1px 3px rgba(0, 0, 0, 0.12);
  --fab-elevation-2: 0 3px 6px rgba(0, 0, 0, 0.16);
  --fab-elevation-3: 0 10px 20px rgba(0, 0, 0, 0.19);
  --fab-elevation-4: 0 14px 28px rgba(0, 0, 0, 0.25);
  --fab-elevation-5: 0 19px 38px rgba(0, 0, 0, 0.3);
}
```

## Mejores Prácticas

1. **Usar para acciones principales**: El FAB debe representar la acción más importante de la pantalla
2. **Una sola acción**: Evitar múltiples FABs en la misma vista
3. **Posición consistente**: Mantener la misma posición en toda la aplicación
4. **Iconos reconocibles**: Usar iconos universalmente entendidos
5. **Etiquetas descriptivas**: Siempre incluir `ariaLabel` para accesibilidad

## Notas de Implementación

- El componente es standalone y no requiere módulos adicionales
- Incluye gestión automática de eventos de scroll
- Utiliza Material Design elevation system
- Soporta tanto iconos como texto en modo extendido
- Optimizado para dispositivos móviles y táctiles
- Compatible con diferentes sistemas de iconos (Font Awesome, Material Icons, etc.)

## Responsive Design

El componente se adapta automáticamente a diferentes tamaños de pantalla:

- En móviles, los tamaños se reducen ligeramente
- Los offsets se ajustan para mejor ergonomía
- Las animaciones se respetan según las preferencias del usuario
