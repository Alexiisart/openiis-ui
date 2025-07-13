# Switch Component

Un componente Switch/Toggle interactivo y personalizable para Angular con múltiples variantes visuales y soporte completo para formularios reactivos.

## Características

- ✅ **6 variantes visuales**: default, primary, success, warning, danger, subtle
- ✅ **5 tamaños**: xs, sm, md, lg, xl
- ✅ **Estados completos**: normal, hover, focus, disabled, readonly, error
- ✅ **Formularios reactivos**: Compatible con ControlValueAccessor
- ✅ **Accesibilidad**: ARIA labels, navegación por teclado
- ✅ **Animaciones**: Transiciones suaves y naturales
- ✅ **Iconos opcionales**: Iconos personalizables en el thumb
- ✅ **Responsive**: Adaptado para dispositivos móviles

## Uso Básico

```typescript
import { OpeniiswitchComponent } from "./components/switch";

@Component({
  selector: "app-example",
  standalone: true,
  imports: [OpeniiswitchComponent],
  template: ` <openiis-switch label="Habilitar notificaciones" [checked]="isEnabled" (checkedChange)="onToggle($event)"> </openiis-switch> `,
})
export class ExampleComponent {
  isEnabled = false;

  onToggle(checked: boolean) {
    this.isEnabled = checked;
  }
}
```

## Propiedades

### Configuración Visual

| Propiedad       | Tipo         | Valor por defecto | Descripción                                                         |
| --------------- | ------------ | ----------------- | ------------------------------------------------------------------- |
| `size`          | `SwitchSize` | `'md'`            | Tamaño del switch: xs, sm, md, lg, xl                               |
| `variant`       | `SwitchType` | `'default'`       | Variante visual: default, primary, success, warning, danger, subtle |
| `label`         | `string`     | `''`              | Texto de la etiqueta                                                |
| `showIcons`     | `boolean`    | `false`           | Mostrar iconos en el thumb                                          |
| `checkedIcon`   | `string`     | `'check'`         | Icono cuando está encendido                                         |
| `uncheckedIcon` | `string`     | `'close'`         | Icono cuando está apagado                                           |

### Estado y Funcionalidad

| Propiedad   | Tipo      | Valor por defecto | Descripción                           |
| ----------- | --------- | ----------------- | ------------------------------------- |
| `checked`   | `boolean` | `false`           | Estado del switch (encendido/apagado) |
| `disabled`  | `boolean` | `false`           | Estado deshabilitado                  |
| `readonly`  | `boolean` | `false`           | Estado solo lectura                   |
| `helpText`  | `string`  | `''`              | Texto de ayuda                        |
| `errorText` | `string`  | `''`              | Texto de error                        |

### Accesibilidad

| Propiedad         | Tipo     | Valor por defecto        | Descripción                          |
| ----------------- | -------- | ------------------------ | ------------------------------------ |
| `switchId`        | `string` | Generado automáticamente | ID único del switch                  |
| `ariaLabel`       | `string` | `''`                     | ARIA label para lectores de pantalla |
| `ariaDescribedBy` | `string` | `''`                     | ARIA describedby para referencias    |
| `title`           | `string` | `''`                     | Título para tooltip                  |

### Personalización

| Propiedad      | Tipo     | Valor por defecto | Descripción            |
| -------------- | -------- | ----------------- | ---------------------- |
| `extraClasses` | `string` | `''`              | Clases CSS adicionales |

## Eventos

| Evento          | Tipo                       | Descripción                     |
| --------------- | -------------------------- | ------------------------------- |
| `checkedChange` | `EventEmitter<boolean>`    | Emitido cuando el estado cambia |
| `focusEvent`    | `EventEmitter<FocusEvent>` | Emitido al recibir foco         |
| `blurEvent`     | `EventEmitter<FocusEvent>` | Emitido al perder foco          |

## Ejemplos de Uso

### Tamaños Disponibles

```html
<openiis-switch size="xs" label="Extra pequeño"></openiis-switch>
<openiis-switch size="sm" label="Pequeño"></openiis-switch>
<openiis-switch size="md" label="Mediano"></openiis-switch>
<openiis-switch size="lg" label="Grande"></openiis-switch>
<openiis-switch size="xl" label="Extra grande"></openiis-switch>
```

### Variantes de Color

```html
<openiis-switch variant="default" label="Default"></openiis-switch>
<openiis-switch variant="primary" label="Primary"></openiis-switch>
<openiis-switch variant="success" label="Success"></openiis-switch>
<openiis-switch variant="warning" label="Warning"></openiis-switch>
<openiis-switch variant="danger" label="Danger"></openiis-switch>
<openiis-switch variant="subtle" label="Subtle"></openiis-switch>
```

### Con Iconos

```html
<openiis-switch label="Modo oscuro" [showIcons]="true" checkedIcon="☽" uncheckedIcon="☀" [checked]="isDarkMode"> </openiis-switch>
```

### Estados Especiales

```html
<openiis-switch label="Deshabilitado" [disabled]="true"> </openiis-switch>

<openiis-switch label="Solo lectura" [readonly]="true" [checked]="true"> </openiis-switch>

<openiis-switch label="Con error" errorText="Este campo es requerido"> </openiis-switch>
```

### Con Formularios Reactivos

```typescript
import { FormControl, FormGroup, ReactiveFormsModule } from "@angular/forms";

@Component({
  selector: "app-form",
  standalone: true,
  imports: [ReactiveFormsModule, OpeniiswitchComponent],
  template: `
    <form [formGroup]="form">
      <openiis-switch label="Acepto los términos" helpText="Debes aceptar los términos para continuar" formControlName="acceptTerms"> </openiis-switch>
    </form>
  `,
})
export class FormComponent {
  form = new FormGroup({
    acceptTerms: new FormControl(false),
  });
}
```

## Personalización CSS

El componente utiliza variables CSS del sistema de diseño:

```css
.switch-container {
  --switch-track-bg: var(--neutral-300);
  --switch-track-checked-bg: var(--primary-500);
  --switch-thumb-bg: var(--color-bg-primary);
  --switch-thumb-shadow: var(--shadow-sm);
  --switch-focus-ring: var(--primary-200);
}
```

## Accesibilidad

- Compatible con lectores de pantalla
- Navegación por teclado (Tab, Espacio, Enter)
- ARIA labels y descripciones
- Indicadores visuales de foco
- Soporte para prefers-reduced-motion

## Responsive

El componente se adapta automáticamente a dispositivos móviles:

- Tamaños optimizados para touch
- Espaciado ajustado
- Textos legibles en pantallas pequeñas
