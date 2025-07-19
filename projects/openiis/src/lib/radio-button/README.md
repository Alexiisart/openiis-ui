# Radio Button

Componente de botón de radio para selección única con soporte completo para formularios reactivos, accesibilidad y múltiples variantes visuales.

## 📦 Instalación

```typescript
import { OpeniisRadioButtonComponent } from 'openiis-ui';

@Component({
  imports: [OpeniisRadioButtonComponent],
})
```

## ⚙️ Properties

| Property          | Tipo              | Default     | Descripción                  |
| ----------------- | ----------------- | ----------- | ---------------------------- |
| `size`            | `RadioButtonSize` | `'md'`      | Tamaño del radio button      |
| `type`            | `RadioButtonType` | `'success'` | Tipo visual del radio button |
| `label`           | `string`          | `''`        | Texto de la etiqueta         |
| `helpText`        | `string`          | `''`        | Texto de ayuda               |
| `errorText`       | `string`          | `''`        | Texto de error               |
| `value`           | `any`             | `''`        | Valor del radio button       |
| `name`            | `string`          | `''`        | Nombre del grupo             |
| `disabled`        | `boolean`         | `false`     | Deshabilitar radio button    |
| `readonly`        | `boolean`         | `false`     | Modo solo lectura            |
| `radioId`         | `string`          | `auto`      | ID único del radio button    |
| `ariaLabel`       | `string`          | `''`        | Etiqueta ARIA                |
| `ariaDescribedBy` | `string`          | `''`        | Referencia ARIA describedby  |
| `title`           | `string`          | `''`        | Título del tooltip           |
| `extraClasses`    | `string`          | `''`        | Clases CSS adicionales       |

## 📡 Events

| Event           | Tipo         | Descripción                  |
| --------------- | ------------ | ---------------------------- |
| `checkedChange` | `any`        | Emitido cuando se selecciona |
| `focusEvent`    | `FocusEvent` | Emitido al obtener focus     |
| `blurEvent`     | `FocusEvent` | Emitido al perder focus      |

## 🎨 Tipos de Radio Button

| Tipo      | Color   | Uso                         |
| --------- | ------- | --------------------------- |
| `success` | Verde   | Radio button de éxito       |
| `warning` | Naranja | Radio button de advertencia |
| `danger`  | Rojo    | Radio button de peligro     |
| `subtle`  | Gris    | Radio button sutil          |

## 📏 Tamaños

| Tamaño | Dimensiones | Uso               |
| ------ | ----------- | ----------------- |
| `xs`   | 14px × 14px | Muy pequeño       |
| `sm`   | 16px × 16px | Pequeño           |
| `md`   | 20px × 20px | Mediano (default) |
| `lg`   | 24px × 24px | Grande            |
| `xl`   | 28px × 28px | Muy grande        |

## 💡 Ejemplos Prácticos

### 1. Radio Button Básico

```html
<openiis-radio-button label="Opción 1" value="option1" name="options" (checkedChange)="onOptionChange($event)"> </openiis-radio-button>

<openiis-radio-button label="Opción 2" value="option2" name="options" (checkedChange)="onOptionChange($event)"> </openiis-radio-button>
```

```typescript
export class MyComponent {
  selectedOption = "option1";

  onOptionChange(value: any) {
    this.selectedOption = value;
    console.log("Selected option:", value);
  }
}
```

### 2. Radio Button con Formulario Reactivo

```html
<form [formGroup]="preferencesForm">
  <openiis-radio-button label="Español" value="es" name="language" formControlName="language" type="success"> </openiis-radio-button>

  <openiis-radio-button label="English" value="en" name="language" formControlName="language" type="success"> </openiis-radio-button>

  <openiis-radio-button label="Français" value="fr" name="language" formControlName="language" type="success"> </openiis-radio-button>
</form>
```

```typescript
import { FormBuilder, FormGroup } from "@angular/forms";

export class MyComponent {
  preferencesForm: FormGroup;

  constructor(private fb: FormBuilder) {
    this.preferencesForm = this.fb.group({
      language: ["es"],
    });
  }
}
```

### 3. Radio Button con Diferentes Tipos

```html
<openiis-radio-button label="Aprobado" value="approved" name="status" type="success" (checkedChange)="onStatusChange($event)"> </openiis-radio-button>

<openiis-radio-button label="Pendiente" value="pending" name="status" type="warning" (checkedChange)="onStatusChange($event)"> </openiis-radio-button>

<openiis-radio-button label="Rechazado" value="rejected" name="status" type="danger" (checkedChange)="onStatusChange($event)"> </openiis-radio-button>
```

```typescript
export class MyComponent {
  status = "pending";

  onStatusChange(value: any) {
    this.status = value;
    console.log("Status changed to:", value);
  }
}
```

### 4. Radio Button con Estados Avanzados

```html
<openiis-radio-button label="Configuración avanzada" value="advanced" name="config" [disabled]="isLoading" [readonly]="isReadOnly" helpText="Esta configuración requiere permisos especiales" errorText="No tienes permisos para cambiar esta configuración" type="warning" size="lg" (checkedChange)="onConfigChange($event)"> </openiis-radio-button>
```

```typescript
export class MyComponent {
  isLoading = false;
  isReadOnly = false;

  onConfigChange(value: any) {
    this.isLoading = true;

    // Simular operación asíncrona
    setTimeout(() => {
      console.log("Config changed to:", value);
      this.isLoading = false;
    }, 1000);
  }
}
```

### 5. Radio Button con Diferentes Tamaños

```html
<openiis-radio-button label="Pequeño" size="sm" value="small" name="size" (checkedChange)="onSizeChange($event)"> </openiis-radio-button>

<openiis-radio-button label="Mediano" size="md" value="medium" name="size" (checkedChange)="onSizeChange($event)"> </openiis-radio-button>

<openiis-radio-button label="Grande" size="lg" value="large" name="size" (checkedChange)="onSizeChange($event)"> </openiis-radio-button>

<openiis-radio-button label="Extra grande" size="xl" value="xl" name="size" (checkedChange)="onSizeChange($event)"> </openiis-radio-button>
```

```typescript
export class MyComponent {
  size = "medium";

  onSizeChange(value: any) {
    this.size = value;
    console.log("Size changed to:", value);
  }
}
```

### 6. Radio Button con Accesibilidad

```html
<openiis-radio-button label="Modo accesible" value="accessible" name="accessibility" ariaLabel="Activar modo de accesibilidad" ariaDescribedBy="accessibility-help" title="Haz clic para activar el modo de accesibilidad" (checkedChange)="onAccessibilityChange($event)" (focusEvent)="onFocus($event)" (blurEvent)="onBlur($event)"> </openiis-radio-button>

<div id="accessibility-help" class="sr-only">El modo de accesibilidad mejora la experiencia para usuarios con discapacidades</div>
```

```typescript
export class MyComponent {
  accessibilityMode = "normal";

  onAccessibilityChange(value: any) {
    this.accessibilityMode = value;
    console.log("Accessibility mode:", value);
  }

  onFocus(event: FocusEvent) {
    console.log("Radio button focused");
  }

  onBlur(event: FocusEvent) {
    console.log("Radio button blurred");
  }
}
```

### 7. Radio Button con Estados de Error

```html
<openiis-radio-button label="Configuración crítica" value="critical" name="critical" errorText="Esta configuración no se puede cambiar en este momento" type="danger" [disabled]="true" (checkedChange)="onCriticalChange($event)"> </openiis-radio-button>
```

```typescript
export class MyComponent {
  onCriticalChange(value: any) {
    // Esta función no se ejecutará porque está disabled
    console.log("Critical setting:", value);
  }
}
```

### 8. Radio Button con Textos de Ayuda

```html
<openiis-radio-button label="Modo automático" value="auto" name="mode" helpText="El sistema ajustará automáticamente la configuración según tus preferencias" type="success" (checkedChange)="onModeChange($event)"> </openiis-radio-button>

<openiis-radio-button label="Modo manual" value="manual" name="mode" helpText="Tendrás control total sobre todas las configuraciones" type="warning" (checkedChange)="onModeChange($event)"> </openiis-radio-button>
```

```typescript
export class MyComponent {
  mode = "auto";

  onModeChange(value: any) {
    this.mode = value;
    console.log("Mode changed to:", value);
  }
}
```

## 🏗️ Interfaces

```typescript
type RadioButtonSize = "xs" | "sm" | "md" | "lg" | "xl";
type RadioButtonType = "success" | "warning" | "danger" | "subtle";
```

## ⚡ Comportamiento

- **ControlValueAccessor**: Integración completa con formularios reactivos
- **Estados visuales**: Hover, focus, disabled, readonly, error
- **Animaciones suaves**: Transiciones en el dot interno
- **Accesibilidad**: Soporte completo para ARIA y navegación por teclado
- **Responsive**: Se adapta automáticamente en móviles
- **Selección única**: Solo un radio button seleccionado por grupo

## ✅ Características

- ✅ 4 tipos de color diferentes
- ✅ 5 tamaños configurables
- ✅ Integración con formularios reactivos
- ✅ Estados disabled y readonly
- ✅ Textos de ayuda y error
- ✅ Accesibilidad completa
- ✅ Navegación por teclado
- ✅ Animaciones suaves
- ✅ Completamente responsive
- ✅ Tooltips configurables
- ✅ IDs únicos automáticos
- ✅ Selección única por grupo

## 🎨 Estilos Automáticos

- **Dot dinámico**: Aparece/desaparece con animación
- **Estados hover**: Efectos de elevación
- **Estados focus**: Outline visible
- **Estados error**: Bordes rojos
- **Responsive**: Tamaños adaptativos en móviles
- **Animaciones**: Transiciones suaves

## 🚨 Solución de Problemas

| Problema                  | Solución                                          |
| ------------------------- | ------------------------------------------------- |
| Radio button no responde  | Verifica que no esté `disabled` o `readonly`      |
| Formulario no funciona    | Asegúrate de usar `formControlName` correctamente |
| Estilos no se aplican     | Verifica que el tema Openiis UI esté configurado  |
| Accesibilidad no funciona | Verifica `ariaLabel` y navegación por teclado     |
| Múltiples selecciones     | Verifica que todos tengan el mismo `name`         |
| Animaciones no funcionan  | Verifica que no haya `prefers-reduced-motion`     |

## 🐞 Reportar Problemas

Si encuentras algún problema en la lógica del componente, por favor
[🐞Reportalo](https://github.com/Alexiisart/openiis-ui/issues/new)
