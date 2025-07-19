# Switch

Componente de interruptor para alternar estados con soporte completo para formularios reactivos, accesibilidad y múltiples variantes visuales.

## 📦 Instalación

```typescript
import { OpeniisSwitchComponent } from 'openiis-ui';

@Component({
  imports: [OpeniisSwitchComponent],
})
```

## ⚙️ Properties

| Property          | Tipo            | Default     | Descripción                 |
| ----------------- | --------------- | ----------- | --------------------------- |
| `size`            | `SwitchSize`    | `'md'`      | Tamaño del switch           |
| `variant`         | `SwitchVariant` | `'default'` | Variante visual del switch  |
| `label`           | `string`        | `''`        | Texto de la etiqueta        |
| `helpText`        | `string`        | `''`        | Texto de ayuda              |
| `errorText`       | `string`        | `''`        | Texto de error              |
| `checked`         | `boolean`       | `false`     | Estado del switch           |
| `disabled`        | `boolean`       | `false`     | Deshabilitar switch         |
| `readonly`        | `boolean`       | `false`     | Modo solo lectura           |
| `switchId`        | `string`        | `auto`      | ID único del switch         |
| `ariaLabel`       | `string`        | `''`        | Etiqueta ARIA               |
| `ariaDescribedBy` | `string`        | `''`        | Referencia ARIA describedby |
| `title`           | `string`        | `''`        | Título del tooltip          |
| `showIcons`       | `boolean`       | `false`     | Mostrar iconos en el switch |
| `checkedIcon`     | `string`        | `'check'`   | Icono cuando está activo    |
| `uncheckedIcon`   | `string`        | `'close'`   | Icono cuando está inactivo  |
| `extraClasses`    | `string`        | `''`        | Clases CSS adicionales      |

## 📡 Events

| Event           | Tipo         | Descripción                     |
| --------------- | ------------ | ------------------------------- |
| `checkedChange` | `boolean`    | Emitido cuando cambia el estado |
| `focusEvent`    | `FocusEvent` | Emitido al obtener focus        |
| `blurEvent`     | `FocusEvent` | Emitido al perder focus         |

## 🎨 Variantes de Color

| Variante  | Color   | Uso                   |
| --------- | ------- | --------------------- |
| `default` | Gris    | Switch estándar       |
| `primary` | Azul    | Switch principal      |
| `success` | Verde   | Switch de éxito       |
| `warning` | Naranja | Switch de advertencia |
| `danger`  | Rojo    | Switch de peligro     |
| `subtle`  | Sutil   | Switch sutil          |

## 📏 Tamaños

| Tamaño | Dimensiones | Uso               |
| ------ | ----------- | ----------------- |
| `xs`   | 32px × 18px | Muy pequeño       |
| `sm`   | 38px × 22px | Pequeño           |
| `md`   | 44px × 24px | Mediano (default) |
| `lg`   | 54px × 30px | Grande            |
| `xl`   | 64px × 36px | Muy grande        |

## 💡 Ejemplos Prácticos

### 1. Switch Básico

```html
<openiis-switch label="Notificaciones" [checked]="notificationsEnabled" (checkedChange)="onNotificationsChange($event)"> </openiis-switch>
```

```typescript
export class MyComponent {
  notificationsEnabled = false;

  onNotificationsChange(enabled: boolean) {
    this.notificationsEnabled = enabled;
    console.log("Notifications:", enabled);
  }
}
```

### 2. Switch con Formulario Reactivo

```html
<form [formGroup]="settingsForm">
  <openiis-switch label="Modo oscuro" formControlName="darkMode" variant="primary"> </openiis-switch>

  <openiis-switch label="Sonidos" formControlName="sounds" variant="success"> </openiis-switch>

  <openiis-switch label="Vibración" formControlName="vibration" variant="warning"> </openiis-switch>
</form>
```

```typescript
import { FormBuilder, FormGroup } from "@angular/forms";

export class MyComponent {
  settingsForm: FormGroup;

  constructor(private fb: FormBuilder) {
    this.settingsForm = this.fb.group({
      darkMode: [false],
      sounds: [true],
      vibration: [false],
    });
  }
}
```

### 3. Switch con Iconos

```html
<openiis-switch label="WiFi" [showIcons]="true" checkedIcon="wifi" uncheckedIcon="wifi_off" variant="success" [checked]="wifiEnabled" (checkedChange)="onWifiChange($event)"> </openiis-switch>

<openiis-switch label="Bluetooth" [showIcons]="true" checkedIcon="bluetooth" uncheckedIcon="bluetooth_disabled" variant="primary" [checked]="bluetoothEnabled" (checkedChange)="onBluetoothChange($event)"> </openiis-switch>
```

```typescript
export class MyComponent {
  wifiEnabled = true;
  bluetoothEnabled = false;

  onWifiChange(enabled: boolean) {
    this.wifiEnabled = enabled;
    console.log("WiFi:", enabled);
  }

  onBluetoothChange(enabled: boolean) {
    this.bluetoothEnabled = enabled;
    console.log("Bluetooth:", enabled);
  }
}
```

### 4. Switch con Estados Avanzados

```html
<openiis-switch label="Modo automático" [checked]="autoMode" [disabled]="isLoading" [readonly]="isReadOnly" helpText="Activa el modo automático para configuraciones predeterminadas" errorText="No se pudo cambiar el modo automático" variant="primary" size="lg" (checkedChange)="onAutoModeChange($event)"> </openiis-switch>
```

```typescript
export class MyComponent {
  autoMode = false;
  isLoading = false;
  isReadOnly = false;

  onAutoModeChange(enabled: boolean) {
    this.isLoading = true;

    // Simular operación asíncrona
    setTimeout(() => {
      this.autoMode = enabled;
      this.isLoading = false;
    }, 1000);
  }
}
```

### 5. Switch con Diferentes Tamaños

```html
<openiis-switch label="Pequeño" size="sm" [checked]="smallSwitch" (checkedChange)="onSmallChange($event)"> </openiis-switch>

<openiis-switch label="Mediano" size="md" [checked]="mediumSwitch" (checkedChange)="onMediumChange($event)"> </openiis-switch>

<openiis-switch label="Grande" size="lg" [checked]="largeSwitch" (checkedChange)="onLargeChange($event)"> </openiis-switch>

<openiis-switch label="Extra grande" size="xl" [checked]="xlSwitch" (checkedChange)="onXlChange($event)"> </openiis-switch>
```

```typescript
export class MyComponent {
  smallSwitch = false;
  mediumSwitch = true;
  largeSwitch = false;
  xlSwitch = true;

  onSmallChange(enabled: boolean) {
    this.smallSwitch = enabled;
  }

  onMediumChange(enabled: boolean) {
    this.mediumSwitch = enabled;
  }

  onLargeChange(enabled: boolean) {
    this.largeSwitch = enabled;
  }

  onXlChange(enabled: boolean) {
    this.xlSwitch = enabled;
  }
}
```

### 6. Switch con Diferentes Variantes

```html
<openiis-switch label="Default" variant="default" [checked]="defaultSwitch" (checkedChange)="onDefaultChange($event)"> </openiis-switch>

<openiis-switch label="Primary" variant="primary" [checked]="primarySwitch" (checkedChange)="onPrimaryChange($event)"> </openiis-switch>

<openiis-switch label="Success" variant="success" [checked]="successSwitch" (checkedChange)="onSuccessChange($event)"> </openiis-switch>

<openiis-switch label="Warning" variant="warning" [checked]="warningSwitch" (checkedChange)="onWarningChange($event)"> </openiis-switch>

<openiis-switch label="Danger" variant="danger" [checked]="dangerSwitch" (checkedChange)="onDangerChange($event)"> </openiis-switch>

<openiis-switch label="Subtle" variant="subtle" [checked]="subtleSwitch" (checkedChange)="onSubtleChange($event)"> </openiis-switch>
```

```typescript
export class MyComponent {
  defaultSwitch = false;
  primarySwitch = true;
  successSwitch = false;
  warningSwitch = true;
  dangerSwitch = false;
  subtleSwitch = true;

  onDefaultChange(enabled: boolean) {
    this.defaultSwitch = enabled;
  }

  onPrimaryChange(enabled: boolean) {
    this.primarySwitch = enabled;
  }

  onSuccessChange(enabled: boolean) {
    this.successSwitch = enabled;
  }

  onWarningChange(enabled: boolean) {
    this.warningSwitch = enabled;
  }

  onDangerChange(enabled: boolean) {
    this.dangerSwitch = enabled;
  }

  onSubtleChange(enabled: boolean) {
    this.subtleSwitch = enabled;
  }
}
```

### 7. Switch con Accesibilidad

```html
<openiis-switch label="Accesibilidad" ariaLabel="Activar modo de accesibilidad" ariaDescribedBy="accessibility-help" title="Haz clic para activar el modo de accesibilidad" [checked]="accessibilityEnabled" (checkedChange)="onAccessibilityChange($event)" (focusEvent)="onFocus($event)" (blurEvent)="onBlur($event)"> </openiis-switch>

<div id="accessibility-help" class="sr-only">El modo de accesibilidad mejora la experiencia para usuarios con discapacidades</div>
```

```typescript
export class MyComponent {
  accessibilityEnabled = false;

  onAccessibilityChange(enabled: boolean) {
    this.accessibilityEnabled = enabled;
    console.log("Accessibility:", enabled);
  }

  onFocus(event: FocusEvent) {
    console.log("Switch focused");
  }

  onBlur(event: FocusEvent) {
    console.log("Switch blurred");
  }
}
```

### 8. Switch con Estados de Error

```html
<openiis-switch label="Configuración crítica" [checked]="criticalSetting" errorText="Esta configuración no se puede cambiar en este momento" variant="danger" [disabled]="true" (checkedChange)="onCriticalChange($event)"> </openiis-switch>
```

```typescript
export class MyComponent {
  criticalSetting = true;

  onCriticalChange(enabled: boolean) {
    // Esta función no se ejecutará porque está disabled
    console.log("Critical setting:", enabled);
  }
}
```

## 🏗️ Interfaces

```typescript
type SwitchSize = "xs" | "sm" | "md" | "lg" | "xl";
type SwitchVariant = "default" | "primary" | "success" | "warning" | "danger" | "subtle";
```

## ⚡ Comportamiento

- **ControlValueAccessor**: Integración completa con formularios reactivos
- **Estados visuales**: Hover, focus, disabled, readonly, error
- **Animaciones suaves**: Transiciones en thumb y track
- **Accesibilidad**: Soporte completo para ARIA y navegación por teclado
- **Responsive**: Se adapta automáticamente en móviles
- **Iconos opcionales**: Soporte para iconos Material Icons

## ✅ Características

- ✅ 6 variantes de color diferentes
- ✅ 5 tamaños configurables
- ✅ Integración con formularios reactivos
- ✅ Estados disabled y readonly
- ✅ Textos de ayuda y error
- ✅ Iconos personalizables
- ✅ Accesibilidad completa
- ✅ Navegación por teclado
- ✅ Animaciones suaves
- ✅ Completamente responsive
- ✅ Tooltips configurables
- ✅ IDs únicos automáticos

## 🎨 Estilos Automáticos

- **Track dinámico**: Cambia de color según el estado
- **Thumb animado**: Se desliza suavemente
- **Estados hover**: Efectos de elevación
- **Estados focus**: Outline visible
- **Estados error**: Bordes rojos
- **Responsive**: Tamaños adaptativos en móviles
- **Animaciones**: Transiciones suaves

## 🚨 Solución de Problemas

| Problema                  | Solución                                          |
| ------------------------- | ------------------------------------------------- |
| Switch no responde        | Verifica que no esté `disabled` o `readonly`      |
| Formulario no funciona    | Asegúrate de usar `formControlName` correctamente |
| Estilos no se aplican     | Verifica que el tema Openiis UI esté configurado  |
| Accesibilidad no funciona | Verifica `ariaLabel` y navegación por teclado     |
| Iconos no aparecen        | Verifica que `showIcons` esté en `true`           |
| Animaciones no funcionan  | Verifica que no haya `prefers-reduced-motion`     |

## 🐞 Reportar Problemas

Si encuentras algún problema en la lógica del componente, por favor
[🐞Reportalo](https://github.com/Alexiisart/openiis-ui/issues/new)
