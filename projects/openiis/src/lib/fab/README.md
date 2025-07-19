# FAB (Floating Action Button)

Botón de acción flotante para acciones principales con posicionamiento flexible, estados avanzados y animaciones suaves.

## 📦 Instalación

```typescript
import { OpeniisFabComponent } from 'openiis-ui';

@Component({
  imports: [OpeniisFabComponent],
})
```

## ⚙️ Properties

| Property        | Tipo                              | Default          | Descripción                  |
| --------------- | --------------------------------- | ---------------- | ---------------------------- |
| `variant`       | `FabVariant`                      | `'primary'`      | Variante de color del FAB    |
| `size`          | `FabSize`                         | `'md'`           | Tamaño del FAB               |
| `position`      | `FabPosition`                     | `'bottom-right'` | Posición del FAB             |
| `positioning`   | `FabPositioning`                  | `'fixed'`        | Tipo de posicionamiento      |
| `icon`          | `string`                          | `undefined`      | Icono Material Icons         |
| `text`          | `string`                          | `undefined`      | Texto para FAB extendido     |
| `extended`      | `boolean`                         | `false`          | Modo FAB extendido           |
| `type`          | `'button' \| 'submit' \| 'reset'` | `'button'`       | Tipo de botón                |
| `disabled`      | `boolean`                         | `false`          | Deshabilitar FAB             |
| `loading`       | `boolean`                         | `false`          | Estado de carga              |
| `animated`      | `boolean`                         | `true`           | Habilitar animaciones        |
| `rippleEnabled` | `boolean`                         | `true`           | Habilitar efecto ripple      |
| `ariaLabel`     | `string`                          | `undefined`      | Etiqueta ARIA                |
| `title`         | `string`                          | `undefined`      | Título del tooltip           |
| `bottomOffset`  | `string`                          | `'24px'`         | Offset inferior              |
| `rightOffset`   | `string`                          | `'24px'`         | Offset derecho               |
| `leftOffset`    | `string`                          | `'24px'`         | Offset izquierdo             |
| `topOffset`     | `string`                          | `'24px'`         | Offset superior              |
| `zIndex`        | `number`                          | `1000`           | Índice z del FAB             |
| `hideOnScroll`  | `boolean`                         | `false`          | Ocultar al hacer scroll      |
| `autoHide`      | `boolean`                         | `false`          | Ocultar automáticamente      |
| `autoHideDelay` | `number`                          | `3000`           | Delay para auto-ocultar (ms) |

## 📡 Events

| Event           | Tipo         | Descripción                    |
| --------------- | ------------ | ------------------------------ |
| `fabClick`      | `MouseEvent` | Emitido al hacer clic          |
| `fabMouseEnter` | `void`       | Emitido al entrar con el mouse |
| `fabMouseLeave` | `void`       | Emitido al salir con el mouse  |
| `fabFocus`      | `void`       | Emitido al obtener focus       |
| `fabBlur`       | `void`       | Emitido al perder focus        |

## 🎨 Variantes de Color

| Variante    | Color   | Uso                   |
| ----------- | ------- | --------------------- |
| `primary`   | Azul    | Acción principal      |
| `secondary` | Gris    | Acción secundaria     |
| `success`   | Verde   | Acción de éxito       |
| `warning`   | Naranja | Acción de advertencia |
| `danger`    | Rojo    | Acción de peligro     |
| `info`      | Cian    | Acción informativa    |

## 📏 Tamaños

| Tamaño | Dimensiones | Uso               |
| ------ | ----------- | ----------------- |
| `sm`   | 40px × 40px | Pequeño           |
| `md`   | 48px × 48px | Mediano (default) |
| `lg`   | 64px × 64px | Grande            |
| `xl`   | 80px × 80px | Muy grande        |

## 🎯 Posiciones

| Posición       | Ubicación                  |
| -------------- | -------------------------- |
| `bottom-right` | Esquina inferior derecha   |
| `bottom-left`  | Esquina inferior izquierda |
| `top-right`    | Esquina superior derecha   |
| `top-left`     | Esquina superior izquierda |

## 🏗️ Tipos de Posicionamiento

| Tipo       | Comportamiento             |
| ---------- | -------------------------- |
| `fixed`    | Fijo en la pantalla        |
| `absolute` | Posicionado relativo       |
| `static`   | Flujo normal del documento |

## 💡 Ejemplos Prácticos

### 1. FAB Básico

```html
<openiis-fab icon="add" variant="primary" (fabClick)="onFabClick($event)"> </openiis-fab>
```

```typescript
export class MyComponent {
  onFabClick(event: MouseEvent) {
    console.log("FAB clicked:", event);
  }
}
```

### 2. FAB Extendido

```html
<openiis-fab icon="add" text="Nuevo Item" [extended]="true" variant="success" position="bottom-right" (fabClick)="onExtendedFabClick($event)"> </openiis-fab>
```

```typescript
export class MyComponent {
  onExtendedFabClick(event: MouseEvent) {
    console.log("Extended FAB clicked:", event);
  }
}
```

### 3. FAB con Loading

```html
<openiis-fab icon="save" variant="primary" [loading]="isSaving" [disabled]="isSaving" (fabClick)="onSaveClick($event)"> </openiis-fab>
```

```typescript
export class MyComponent {
  isSaving = false;

  onSaveClick(event: MouseEvent) {
    this.isSaving = true;
    // Simular guardado
    setTimeout(() => {
      this.isSaving = false;
    }, 2000);
  }
}
```

### 4. FAB con Auto-hide

```html
<openiis-fab icon="share" variant="info" [autoHide]="true" [autoHideDelay]="5000" position="bottom-left" (fabClick)="onShareClick($event)"> </openiis-fab>
```

```typescript
export class MyComponent {
  onShareClick(event: MouseEvent) {
    console.log("Share FAB clicked:", event);
  }
}
```

### 5. FAB que se oculta al hacer scroll

```html
<openiis-fab icon="arrow_upward" variant="secondary" [hideOnScroll]="true" position="bottom-right" (fabClick)="onScrollToTop($event)"> </openiis-fab>
```

```typescript
export class MyComponent {
  onScrollToTop(event: MouseEvent) {
    window.scrollTo({ top: 0, behavior: "smooth" });
  }
}
```

### 6. FAB con Diferentes Posiciones

```html
<!-- FAB en esquina superior derecha -->
<openiis-fab icon="settings" variant="warning" position="top-right" (fabClick)="onSettingsClick($event)"> </openiis-fab>

<!-- FAB en esquina superior izquierda -->
<openiis-fab icon="menu" variant="danger" position="top-left" (fabClick)="onMenuClick($event)"> </openiis-fab>
```

```typescript
export class MyComponent {
  onSettingsClick(event: MouseEvent) {
    console.log("Settings clicked:", event);
  }

  onMenuClick(event: MouseEvent) {
    console.log("Menu clicked:", event);
  }
}
```

### 7. FAB con Contenido Personalizado

```html
<openiis-fab variant="primary" size="lg" position="bottom-right" (fabClick)="onCustomFabClick($event)">
  <svg width="24" height="24" viewBox="0 0 24 24">
    <path fill="currentColor" d="M12 2L2 7l10 5 10-5-10-5zM2 17l10 5 10-5M2 12l10 5 10-5" />
  </svg>
</openiis-fab>
```

```typescript
export class MyComponent {
  onCustomFabClick(event: MouseEvent) {
    console.log("Custom FAB clicked:", event);
  }
}
```

### 8. FAB con Estados Avanzados

```html
<openiis-fab icon="favorite" variant="danger" size="xl" [animated]="true" [rippleEnabled]="true" [disabled]="isDisabled" [loading]="isLoading" ariaLabel="Agregar a favoritos" title="Haz clic para agregar a favoritos" (fabClick)="onFavoriteClick($event)" (fabMouseEnter)="onFabHover()" (fabMouseLeave)="onFabLeave()"> </openiis-fab>
```

```typescript
export class MyComponent {
  isDisabled = false;
  isLoading = false;

  onFavoriteClick(event: MouseEvent) {
    console.log("Favorite clicked:", event);
  }

  onFabHover() {
    console.log("FAB hovered");
  }

  onFabLeave() {
    console.log("FAB left");
  }
}
```

## 🏗️ Interfaces

```typescript
type FabVariant = "primary" | "secondary" | "success" | "warning" | "danger" | "info";
type FabSize = "sm" | "md" | "lg" | "xl";
type FabPosition = "bottom-right" | "bottom-left" | "top-right" | "top-left";
type FabPositioning = "fixed" | "absolute" | "static";
```

## ⚡ Comportamiento

- **Posicionamiento flexible**: Fixed, absolute o static
- **Estados visuales**: Hover, focus, active, disabled, loading
- **Animaciones suaves**: Transiciones y efectos ripple
- **Auto-ocultado**: Ocultar automáticamente después de un delay
- **Hide on scroll**: Ocultar al hacer scroll hacia abajo
- **Responsive**: Se adapta automáticamente en móviles
- **Accesibilidad**: Soporte completo para ARIA y navegación por teclado

## ✅ Características

- ✅ 6 variantes de color diferentes
- ✅ 4 tamaños configurables
- ✅ 4 posiciones predefinidas
- ✅ 3 tipos de posicionamiento
- ✅ Modo extendido con texto
- ✅ Estados loading y disabled
- ✅ Efecto ripple opcional
- ✅ Auto-ocultado configurable
- ✅ Hide on scroll
- ✅ Animaciones suaves
- ✅ Completamente responsive
- ✅ Accesibilidad completa
- ✅ Navegación por teclado
- ✅ Contenido personalizable
- ✅ Tooltips automáticos

## 🎨 Estilos Automáticos

- **Sombras dinámicas**: Cambian según el estado
- **Efectos hover**: Elevación y transformación
- **Estados focus**: Outline visible
- **Loading spinner**: Integrado automáticamente
- **Ripple effect**: Efecto de onda al hacer clic
- **Responsive**: Tamaños adaptativos en móviles
- **Animaciones**: Transiciones suaves

## 🚨 Solución de Problemas

| Problema                      | Solución                                                    |
| ----------------------------- | ----------------------------------------------------------- |
| FAB no aparece                | Verifica que `positioning` esté en `'fixed'` o `'absolute'` |
| FAB se oculta automáticamente | Verifica `autoHide` y `autoHideDelay`                       |
| FAB no responde al scroll     | Verifica que `hideOnScroll` esté en `true`                  |
| Estilos no se aplican         | Asegúrate de que el tema Openiis UI esté configurado        |
| FAB no es accesible           | Verifica `ariaLabel` y navegación por teclado               |
| Animaciones no funcionan      | Verifica que `animated` esté en `true`                      |

## 🐞 Reportar Problemas

Si encuentras algún problema en la lógica del componente, por favor
[🐞Reportalo](https://github.com/Alexiisart/openiis-ui/issues/new)
