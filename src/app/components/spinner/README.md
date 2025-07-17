# Spinner Component

## Descripción

El componente `OpeniisSpinnerComponent` es un indicador de carga altamente configurable que informa al usuario de que una operación asíncrona está en progreso. Soporta múltiples variantes visuales, tamaños, colores y velocidades, así como opciones de posicionamiento y accesibilidad.

## Características

- ✅ 8 variantes: circle, dots, bars, pulse, wave, ring, bounce, fade
- ✅ 5 tamaños: xs, sm, md, lg, xl
- ✅ 8 colores por defecto del sistema de diseño
- ✅ 3 velocidades de animación
- ✅ Texto opcional para describir la operación
- ✅ Modo overlay de pantalla completa con color personalizable
- ✅ Posicionamiento inline, centrado o overlay
- ✅ Totalmente accesible (rol, ARIA, prefers-reduced-motion, high-contrast)
- ✅ Personalización de tamaño, color o velocidad mediante variables CSS
- ✅ Responsive y listo para móviles

## Uso Básico

```html
<openiis-spinner></openiis-spinner>
```

## Props

| Prop           | Tipo                                                                                            | Default                   | Descripción                                                            |
| -------------- | ----------------------------------------------------------------------------------------------- | ------------------------- | ---------------------------------------------------------------------- |
| `variant`      | `"circle" \| "dots" \| "bars" \| "pulse" \| "wave" \| "ring" \| "bounce" \| "fade"`             | `"circle"`                | Variante visual del spinner.                                           |
| `size`         | `"xs" \| "sm" \| "md" \| "lg" \| "xl"`                                                          | `"md"`                    | Tamaño predefinido.                                                    |
| `color`        | `"primary" \| "secondary" \| "success" \| "warning" \| "danger" \| "info" \| "light" \| "dark"` | `"primary"`               | Color principal del spinner.                                           |
| `speed`        | `"slow" \| "normal" \| "fast"`                                                                  | `"normal"`                | Velocidad de la animación.                                             |
| `text`         | `string`                                                                                        | `undefined`               | Texto que se muestra bajo (o al lado de) la animación.                 |
| `overlay`      | `boolean`                                                                                       | `false`                   | Muestra el spinner como overlay a pantalla completa.                   |
| `overlayColor` | `string`                                                                                        | `'rgba(255,255,255,0.8)'` | Color de fondo del overlay.                                            |
| `customSize`   | `string`                                                                                        | `undefined`               | Sobrescribe `--spinner-size` con cualquier unidad (`px`, `rem`, etc.). |
| `customColor`  | `string`                                                                                        | `undefined`               | Sobrescribe `--spinner-color` con cualquier color CSS.                 |
| `customSpeed`  | `string`                                                                                        | `undefined`               | Sobrescribe `--spinner-speed` (ej. `750ms`).                           |
| `centered`     | `boolean`                                                                                       | `false`                   | Centra el spinner vertical y horizontalmente dentro de su contenedor.  |
| `inline`       | `boolean`                                                                                       | `false`                   | Muestra el spinner inline con el texto o contenido adyacente.          |
| `visible`      | `boolean`                                                                                       | `true`                    | Controla la visibilidad sin destruir el componente.                    |
| `ariaLabel`    | `string`                                                                                        | `'Cargando...'`           | Etiqueta de accesibilidad.                                             |
| `ariaLive`     | `"polite" \| "assertive" \| "off"`                                                              | `"polite"`                | Estrategia ARIA de anuncio de actualizaciones.                         |
| `role`         | `string`                                                                                        | `'status'`                | Rol ARIA del contenedor.                                               |

## Variantes

| Variante | Vista                               |
| -------- | ----------------------------------- |
| `circle` | Círculo que gira (por defecto)      |
| `dots`   | Tres puntos que laten               |
| `bars`   | Barras verticales que suben y bajan |
| `pulse`  | Círculo que late                    |
| `wave`   | Onda de barras                      |
| `ring`   | Anillo doble giratorio              |
| `bounce` | Tres bolas que rebotan              |
| `fade`   | Ocho líneas que se desvanecen       |

## Ejemplos

### Spinner centrado a pantalla completa

```html
<openiis-spinner variant="pulse" overlay="true" overlayColor="rgba(0,0,0,0.45)"></openiis-spinner>
```

### Spinner inline con texto

```html
<button [disabled]="saving">
  Guardando datos @if(saving){
  <openiis-spinner inline="true" size="sm" color="light"></openiis-spinner>
  }
</button>
```

### Spinner totalmente personalizado

```html
<openiis-spinner variant="ring" [customSize]="'64px'" [customColor]="'#ff5722'" [customSpeed]="'600ms'" text="Procesando..."></openiis-spinner>
```

## Accesibilidad

- El componente usa `role="status"` y `aria-live="polite"` para anunciar cambios.
- La propiedad `ariaLabel` permite proporcionar una descripción personalizada.
- Respeta las preferencias de `prefers-reduced-motion` y alto contraste del usuario.

## Notas

- Para evitar reflujo de layout, utilice la prop `visible` en lugar de `*ngIf` cuando solo quiera mostrar/ocultar la animación.
- Al usar overlay, se agrega un fondo semitransparente que puede personalizarse con `overlayColor`.
- El spinner es completamente independiente: no requiere dependencias externas más allá de `@angular/common`.
