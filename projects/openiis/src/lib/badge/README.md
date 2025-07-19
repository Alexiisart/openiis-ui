# Badge

Componente de insignia elegante y reutilizable con múltiples variantes, tamaños, estilos, formas y posiciones para mostrar información, estados y contadores.

## 📦 Instalación

```typescript
import { OpeniisBadgeComponent } from 'openiis-ui';

@Component({
  imports: [OpeniisBadgeComponent],
})
```

## ⚙️ Properties

| Property         | Tipo            | Default     | Descripción                 |
| ---------------- | --------------- | ----------- | --------------------------- |
| `variant`        | `BadgeVariant`  | `'default'` | Variante de color del badge |
| `size`           | `BadgeSize`     | `'md'`      | Tamaño del badge            |
| `style`          | `BadgeStyle`    | `'filled'`  | Estilo del badge            |
| `shape`          | `BadgeShape`    | `'rounded'` | Forma del badge             |
| `position`       | `BadgePosition` | `undefined` | Posición del badge          |
| `text`           | `string`        | `undefined` | Texto del badge             |
| `icon`           | `string`        | `undefined` | Icono principal             |
| `count`          | `number`        | `undefined` | Contador numérico           |
| `maxCount`       | `number`        | `99`        | Máximo valor para mostrar   |
| `leftIcon`       | `string`        | `undefined` | Icono izquierdo             |
| `rightIcon`      | `string`        | `undefined` | Icono derecho               |
| `closable`       | `boolean`       | `false`     | Permitir cerrar badge       |
| `animated`       | `boolean`       | `false`     | Animaciones                 |
| `pulsing`        | `boolean`       | `false`     | Efecto pulsante             |
| `hidden`         | `boolean`       | `false`     | Ocultar badge               |
| `clickable`      | `boolean`       | `false`     | Hacer badge clickeable      |
| `disabled`       | `boolean`       | `false`     | Deshabilitar badge          |
| `ariaLabel`      | `string`        | `undefined` | ARIA label                  |
| `title`          | `string`        | `undefined` | Tooltip                     |
| `role`           | `string`        | `'status'`  | Rol ARIA                    |
| `maxWidth`       | `string`        | `undefined` | Ancho máximo                |
| `zIndex`         | `number`        | `undefined` | Z-index                     |
| `closeAriaLabel` | `string`        | `'Cerrar'`  | ARIA label para cerrar      |

## 📡 Events

| Event   | Tipo  | Descripción                    |
| ------- | ----- | ------------------------------ |
| `click` | `any` | Emitido al hacer clic en badge |
| `close` | `any` | Emitido al cerrar badge        |

## 📏 Tamaños

| Tamaño | Font-size | Padding | Gap | Uso               |
| ------ | --------- | ------- | --- | ----------------- |
| `xs`   | 10px      | 4px     | 4px | Muy compacto      |
| `sm`   | 11px      | 4px     | 4px | Compacto          |
| `md`   | 12px      | 4px     | 4px | Mediano (default) |
| `lg`   | 14px      | 8px     | 8px | Grande            |
| `xl`   | 16px      | 8px     | 8px | Extra grande      |

## 🎨 Variantes

| Variante    | Descripción            | Uso                    |
| ----------- | ---------------------- | ---------------------- |
| `default`   | Color neutro (default) | Estados generales      |
| `primary`   | Color primario         | Acciones principales   |
| `secondary` | Color secundario       | Información secundaria |
| `success`   | Color de éxito         | Confirmaciones         |
| `warning`   | Color de advertencia   | Alertas                |
| `danger`    | Color de peligro       | Errores                |
| `info`      | Color informativo      | Información            |

## 🎭 Estilos

| Estilo    | Descripción            | Uso                  |
| --------- | ---------------------- | -------------------- |
| `filled`  | Fondo sólido (default) | Estados prominentes  |
| `outline` | Solo contorno          | Estados sutiles      |
| `soft`    | Fondo suave            | Estados informativos |
| `dot`     | Solo punto             | Indicadores mínimos  |

## 🔷 Formas

| Forma     | Descripción                  | Uso                  |
| --------- | ---------------------------- | -------------------- |
| `rounded` | Bordes redondeados (default) | Uso general          |
| `pill`    | Forma de píldora             | Etiquetas largas     |
| `square`  | Bordes cuadrados             | Indicadores técnicos |

## 📍 Posiciones

| Posición       | Descripción                | Uso                  |
| -------------- | -------------------------- | -------------------- |
| `top-right`    | Esquina superior derecha   | Notificaciones       |
| `top-left`     | Esquina superior izquierda | Estados de elementos |
| `bottom-right` | Esquina inferior derecha   | Contadores           |
| `bottom-left`  | Esquina inferior izquierda | Indicadores          |

## 🏗️ Interfaces

```typescript
type BadgeVariant = "default" | "primary" | "secondary" | "success" | "warning" | "danger" | "info";
type BadgeSize = "xs" | "sm" | "md" | "lg" | "xl";
type BadgeStyle = "filled" | "outline" | "soft" | "dot";
type BadgeShape = "rounded" | "pill" | "square";
type BadgePosition = "top-right" | "top-left" | "bottom-right" | "bottom-left";
```

## 💡 Ejemplos Prácticos

### 1. Badge Básico

```html
<openiis-badge text="Nuevo" variant="primary" size="md" style="filled"> </openiis-badge>
```

```typescript
export class MyComponent {
  // Badge básico sin configuración adicional
}
```

### 2. Badge con Contador

```html
<openiis-badge [count]="notifications" variant="danger" size="sm" style="filled" shape="pill"> </openiis-badge>
```

```typescript
export class MyComponent {
  notifications = 5;
}
```

### 3. Badge con Iconos

```html
<openiis-badge text="En línea" leftIcon="wifi" variant="success" size="md" style="soft"> </openiis-badge>

<openiis-badge text="Editar" rightIcon="edit" variant="info" size="sm" style="outline" [clickable]="true"> </openiis-badge>
```

```typescript
export class MyComponent {
  // Badges con iconos
}
```

### 4. Badge Clickeable y Cerrable

```html
<openiis-badge text="Filtro activo" variant="primary" size="md" style="filled" [clickable]="true" [closable]="true" (click)="onBadgeClick()" (close)="onBadgeClose()"> </openiis-badge>
```

```typescript
export class MyComponent {
  onBadgeClick() {
    console.log("Badge clicked");
  }

  onBadgeClose() {
    console.log("Badge closed");
  }
}
```

### 5. Badge con Posición

```html
<div class="relative">
  <button class="notification-button">
    Notificaciones
    <openiis-badge [count]="unreadCount" variant="danger" size="sm" position="top-right" [animated]="true"> </openiis-badge>
  </button>
</div>
```

```typescript
export class MyComponent {
  unreadCount = 12;
}
```

### 6. Badge con Diferentes Estilos

```html
<!-- Filled -->
<openiis-badge text="Completado" variant="success" style="filled"> </openiis-badge>

<!-- Outline -->
<openiis-badge text="Pendiente" variant="warning" style="outline"> </openiis-badge>

<!-- Soft -->
<openiis-badge text="Información" variant="info" style="soft"> </openiis-badge>

<!-- Dot -->
<openiis-badge variant="danger" style="dot" size="lg"> </openiis-badge>
```

```typescript
export class MyComponent {
  // Badges con diferentes estilos
}
```

### 7. Badge con Diferentes Formas

```html
<!-- Rounded (default) -->
<openiis-badge text="Etiqueta" variant="primary" shape="rounded"> </openiis-badge>

<!-- Pill -->
<openiis-badge text="Etiqueta muy larga" variant="secondary" shape="pill"> </openiis-badge>

<!-- Square -->
<openiis-badge text="Técnico" variant="info" shape="square"> </openiis-badge>
```

```typescript
export class MyComponent {
  // Badges con diferentes formas
}
```

### 8. Badge con Estados Especiales

```html
<!-- Animado -->
<openiis-badge text="Nuevo" variant="primary" [animated]="true"> </openiis-badge>

<!-- Pulsante -->
<openiis-badge text="Urgente" variant="danger" [pulsing]="true"> </openiis-badge>

<!-- Deshabilitado -->
<openiis-badge text="No disponible" variant="secondary" [disabled]="true"> </openiis-badge>

<!-- Oculto -->
<openiis-badge text="Oculto" variant="info" [hidden]="true"> </openiis-badge>
```

```typescript
export class MyComponent {
  // Badges con estados especiales
}
```

### 9. Badge con Contenido Personalizado

```html
<openiis-badge variant="success" size="lg" style="filled" shape="pill">
  <span class="custom-content">
    <i class="fas fa-check"></i>
    Aprobado
  </span>
</openiis-badge>
```

```typescript
export class MyComponent {
  // Badge con contenido personalizado
}
```

### 10. Badge con Máximo Contador

```html
<openiis-badge [count]="150" [maxCount]="99" variant="danger" size="sm"> </openiis-badge>
```

```typescript
export class MyComponent {
  // Mostrará "99+" en lugar de "150"
}
```

## ⚡ Comportamiento

### Estados

- **Normal**: Estado por defecto
- **Clickeable**: Con efectos hover y focus
- **Deshabilitado**: Sin interacciones
- **Oculto**: No visible
- **Animado**: Con transiciones
- **Pulsante**: Con efecto pulsante

### Interacciones

- **Clic**: Ejecuta acción si es clickeable
- **Teclado**: Enter/Space para activar
- **Cerrar**: Botón X si es closable
- **Contador**: Muestra número o "99+"

### Responsive

- **Móvil**: Tamaños reducidos automáticamente
- **Desktop**: Tamaños completos
- **Accesibilidad**: Soporte completo para lectores

## ✅ Características

- ✅ 7 variantes de color (default, primary, secondary, success, warning, danger, info)
- ✅ 5 tamaños configurables (xs, sm, md, lg, xl)
- ✅ 4 estilos visuales (filled, outline, soft, dot)
- ✅ 3 formas (rounded, pill, square)
- ✅ 4 posiciones (top-right, top-left, bottom-right, bottom-left)
- ✅ Iconos izquierdo y derecho
- ✅ Contador con máximo configurable
- ✅ Estados clickeable y closable
- ✅ Animaciones y efectos pulsantes
- ✅ Estados disabled y hidden
- ✅ Responsive design
- ✅ Accesibilidad completa
- ✅ Navegación por teclado
- ✅ Tooltips personalizables

## 🎨 Estilos Automáticos

- **Variantes**: Cada variante tiene colores únicos
- **Estados**: Hover, active, disabled, focus
- **Responsive**: Se adapta automáticamente en móviles
- **Animaciones**: Transiciones suaves
- **Accesibilidad**: Indicadores de foco y ARIA

## 🔧 Funcionalidades Especiales

### Contador Inteligente

```typescript
// Muestra "99+" si el contador excede maxCount
[count] = "150"[maxCount] = "99";
```

### Posicionamiento Absoluto

```typescript
// Posiciona el badge sobre un elemento
position = "top-right";
```

### Iconos Material Icons

```typescript
// Iconos izquierdo y derecho
leftIcon = "wifi";
rightIcon = "close";
```

### Estados Programáticos

```typescript
// Controlar visibilidad
[hidden] = "true"[disabled] = "true"[animated] = "true"[pulsing] = "true";
```

## 🚨 Solución de Problemas

| Problema                  | Solución                                              |
| ------------------------- | ----------------------------------------------------- |
| Badge no responde         | Verifica que `clickable` esté en `true`               |
| Contador no aparece       | Verifica que `count` esté definido                    |
| Iconos no aparecen        | Verifica que Material Icons esté importado            |
| Posición no funciona      | Verifica que el contenedor tenga `position: relative` |
| Animaciones no funcionan  | Verifica que `animated` esté en `true`                |
| Responsive no funciona    | Verifica que el CSS responsive esté cargado           |
| Accesibilidad no funciona | Verifica que `ariaLabel` esté configurado             |

## 🐞 Reportar Problemas

Si encuentras algún problema en la lógica del componente, por favor
[🐞Reportalo](https://github.com/Alexiisart/openiis-ui/issues/new)
