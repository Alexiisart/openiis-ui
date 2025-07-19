# Checkbox

Componente de checkbox elegante y reutilizable con soporte completo para formularios reactivos, accesibilidad y múltiples variantes visuales.

## 📦 Instalación

```typescript
import { OpeniisCheckboxComponent } from 'openiis-ui';

@Component({
  imports: [OpeniisCheckboxComponent],
})
```

## ⚙️ Properties

| Property          | Tipo           | Default     | Descripción                 |
| ----------------- | -------------- | ----------- | --------------------------- |
| `type`            | `CheckboxType` | `'default'` | Tipo visual del checkbox    |
| `size`            | `CheckboxSize` | `'md'`      | Tamaño del checkbox         |
| `label`           | `string`       | `''`        | Texto de la etiqueta        |
| `helpText`        | `string`       | `''`        | Texto de ayuda              |
| `errorText`       | `string`       | `''`        | Texto de error              |
| `checked`         | `boolean`      | `false`     | Estado del checkbox         |
| `disabled`        | `boolean`      | `false`     | Deshabilitar checkbox       |
| `indeterminate`   | `boolean`      | `false`     | Estado indeterminado        |
| `inputId`         | `string`       | `auto`      | ID único del checkbox       |
| `ariaLabel`       | `string`       | `''`        | Etiqueta ARIA               |
| `ariaDescribedBy` | `string`       | `''`        | Referencia ARIA describedby |
| `title`           | `string`       | `''`        | Título del tooltip          |
| `extraClasses`    | `string`       | `''`        | Clases CSS adicionales      |

## 📡 Events

| Event           | Tipo      | Descripción                     |
| --------------- | --------- | ------------------------------- |
| `checkedChange` | `boolean` | Emitido cuando cambia el estado |
| `focusEvent`    | `void`    | Emitido al obtener focus        |
| `blurEvent`     | `void`    | Emitido al perder focus         |

## 🎨 Tipos de Checkbox

| Tipo      | Color   | Uso                     |
| --------- | ------- | ----------------------- |
| `default` | Azul    | Checkbox estándar       |
| `primary` | Azul    | Checkbox principal      |
| `success` | Verde   | Checkbox de éxito       |
| `warning` | Naranja | Checkbox de advertencia |
| `danger`  | Rojo    | Checkbox de peligro     |
| `subtle`  | Gris    | Checkbox sutil          |
| `outline` | Borde   | Checkbox solo borde     |

## 📏 Tamaños

| Tamaño | Dimensiones | Uso               |
| ------ | ----------- | ----------------- |
| `xs`   | 14px × 14px | Muy pequeño       |
| `sm`   | 16px × 16px | Pequeño           |
| `md`   | 18px × 18px | Mediano (default) |
| `lg`   | 20px × 20px | Grande            |
| `xl`   | 24px × 24px | Muy grande        |

## 💡 Ejemplos Prácticos

### 1. Checkbox Básico

```html
<openiis-checkbox label="Acepto los términos y condiciones" [checked]="acceptedTerms" (checkedChange)="onTermsChange($event)"> </openiis-checkbox>
```

```typescript
export class MyComponent {
  acceptedTerms = false;

  onTermsChange(checked: boolean) {
    this.acceptedTerms = checked;
    console.log("Terms accepted:", checked);
  }
}
```

### 2. Checkbox con Formulario Reactivo

```html
<form [formGroup]="userForm">
  <openiis-checkbox label="Recibir notificaciones por email" formControlName="emailNotifications" type="success"> </openiis-checkbox>

  <openiis-checkbox label="Recibir notificaciones por SMS" formControlName="smsNotifications" type="warning"> </openiis-checkbox>

  <openiis-checkbox label="Compartir datos con terceros" formControlName="shareData" type="danger"> </openiis-checkbox>
</form>
```

```typescript
import { FormBuilder, FormGroup } from "@angular/forms";

export class MyComponent {
  userForm: FormGroup;

  constructor(private fb: FormBuilder) {
    this.userForm = this.fb.group({
      emailNotifications: [true],
      smsNotifications: [false],
      shareData: [false],
    });
  }
}
```

### 3. Checkbox con Diferentes Tipos

```html
<openiis-checkbox label="Tarea completada" type="success" [checked]="taskCompleted" (checkedChange)="onTaskComplete($event)"> </openiis-checkbox>

<openiis-checkbox label="Revisar antes de enviar" type="warning" [checked]="needsReview" (checkedChange)="onReviewChange($event)"> </openiis-checkbox>

<openiis-checkbox label="Eliminar permanentemente" type="danger" [checked]="deletePermanently" (checkedChange)="onDeleteChange($event)"> </openiis-checkbox>

<openiis-checkbox label="Configuración sutil" type="subtle" [checked]="subtleSetting" (checkedChange)="onSubtleChange($event)"> </openiis-checkbox>

<openiis-checkbox label="Solo borde" type="outline" [checked]="outlineSetting" (checkedChange)="onOutlineChange($event)"> </openiis-checkbox>
```

```typescript
export class MyComponent {
  taskCompleted = false;
  needsReview = true;
  deletePermanently = false;
  subtleSetting = true;
  outlineSetting = false;

  onTaskComplete(checked: boolean) {
    this.taskCompleted = checked;
    console.log("Task completed:", checked);
  }

  onReviewChange(checked: boolean) {
    this.needsReview = checked;
    console.log("Needs review:", checked);
  }

  onDeleteChange(checked: boolean) {
    this.deletePermanently = checked;
    console.log("Delete permanently:", checked);
  }

  onSubtleChange(checked: boolean) {
    this.subtleSetting = checked;
    console.log("Subtle setting:", checked);
  }

  onOutlineChange(checked: boolean) {
    this.outlineSetting = checked;
    console.log("Outline setting:", checked);
  }
}
```

### 4. Checkbox con Estados Avanzados

```html
<openiis-checkbox label="Configuración avanzada" [checked]="advancedConfig" [disabled]="isLoading" [indeterminate]="isIndeterminate" helpText="Esta configuración requiere permisos especiales" errorText="No tienes permisos para cambiar esta configuración" type="primary" size="lg" (checkedChange)="onAdvancedConfigChange($event)"> </openiis-checkbox>
```

```typescript
export class MyComponent {
  advancedConfig = false;
  isLoading = false;
  isIndeterminate = false;

  onAdvancedConfigChange(checked: boolean) {
    this.isLoading = true;

    // Simular operación asíncrona
    setTimeout(() => {
      this.advancedConfig = checked;
      this.isIndeterminate = false;
      this.isLoading = false;
      console.log("Advanced config:", checked);
    }, 1000);
  }
}
```

### 5. Checkbox con Diferentes Tamaños

```html
<openiis-checkbox label="Pequeño" size="sm" [checked]="smallCheckbox" (checkedChange)="onSmallChange($event)"> </openiis-checkbox>

<openiis-checkbox label="Mediano" size="md" [checked]="mediumCheckbox" (checkedChange)="onMediumChange($event)"> </openiis-checkbox>

<openiis-checkbox label="Grande" size="lg" [checked]="largeCheckbox" (checkedChange)="onLargeChange($event)"> </openiis-checkbox>

<openiis-checkbox label="Extra grande" size="xl" [checked]="xlCheckbox" (checkedChange)="onXlChange($event)"> </openiis-checkbox>
```

```typescript
export class MyComponent {
  smallCheckbox = false;
  mediumCheckbox = true;
  largeCheckbox = false;
  xlCheckbox = true;

  onSmallChange(checked: boolean) {
    this.smallCheckbox = checked;
  }

  onMediumChange(checked: boolean) {
    this.mediumCheckbox = checked;
  }

  onLargeChange(checked: boolean) {
    this.largeCheckbox = checked;
  }

  onXlChange(checked: boolean) {
    this.xlCheckbox = checked;
  }
}
```

### 6. Checkbox con Accesibilidad

```html
<openiis-checkbox label="Modo accesible" [checked]="accessibilityMode" ariaLabel="Activar modo de accesibilidad" ariaDescribedBy="accessibility-help" title="Haz clic para activar el modo de accesibilidad" (checkedChange)="onAccessibilityChange($event)" (focusEvent)="onFocus()" (blurEvent)="onBlur()"> </openiis-checkbox>

<div id="accessibility-help" class="sr-only">El modo de accesibilidad mejora la experiencia para usuarios con discapacidades</div>
```

```typescript
export class MyComponent {
  accessibilityMode = false;

  onAccessibilityChange(checked: boolean) {
    this.accessibilityMode = checked;
    console.log("Accessibility mode:", checked);
  }

  onFocus() {
    console.log("Checkbox focused");
  }

  onBlur() {
    console.log("Checkbox blurred");
  }
}
```

### 7. Checkbox con Estados de Error

```html
<openiis-checkbox label="Configuración crítica" [checked]="criticalSetting" errorText="Esta configuración no se puede cambiar en este momento" type="danger" [disabled]="true" (checkedChange)="onCriticalChange($event)"> </openiis-checkbox>
```

```typescript
export class MyComponent {
  criticalSetting = true;

  onCriticalChange(checked: boolean) {
    // Esta función no se ejecutará porque está disabled
    console.log("Critical setting:", checked);
  }
}
```

### 8. Checkbox con Textos de Ayuda

```html
<openiis-checkbox label="Modo automático" [checked]="autoMode" helpText="El sistema ajustará automáticamente la configuración según tus preferencias" type="success" (checkedChange)="onAutoModeChange($event)"> </openiis-checkbox>

<openiis-checkbox label="Modo manual" [checked]="manualMode" helpText="Tendrás control total sobre todas las configuraciones" type="warning" (checkedChange)="onManualModeChange($event)"> </openiis-checkbox>
```

```typescript
export class MyComponent {
  autoMode = true;
  manualMode = false;

  onAutoModeChange(checked: boolean) {
    this.autoMode = checked;
    if (checked) {
      this.manualMode = false;
    }
    console.log("Auto mode:", checked);
  }

  onManualModeChange(checked: boolean) {
    this.manualMode = checked;
    if (checked) {
      this.autoMode = false;
    }
    console.log("Manual mode:", checked);
  }
}
```

### 9. Checkbox con Estado Indeterminado

```html
<openiis-checkbox label="Seleccionar todos" [indeterminate]="isIndeterminate" [checked]="allSelected" (checkedChange)="onSelectAllChange($event)"> </openiis-checkbox>

<openiis-checkbox label="Item 1" [checked]="item1" (checkedChange)="onItem1Change($event)"> </openiis-checkbox>

<openiis-checkbox label="Item 2" [checked]="item2" (checkedChange)="onItem2Change($event)"> </openiis-checkbox>

<openiis-checkbox label="Item 3" [checked]="item3" (checkedChange)="onItem3Change($event)"> </openiis-checkbox>
```

```typescript
export class MyComponent {
  item1 = false;
  item2 = false;
  item3 = false;
  allSelected = false;
  isIndeterminate = false;

  onSelectAllChange(checked: boolean) {
    this.allSelected = checked;
    this.isIndeterminate = false;
    this.item1 = checked;
    this.item2 = checked;
    this.item3 = checked;
  }

  onItem1Change(checked: boolean) {
    this.item1 = checked;
    this.updateSelectAllState();
  }

  onItem2Change(checked: boolean) {
    this.item2 = checked;
    this.updateSelectAllState();
  }

  onItem3Change(checked: boolean) {
    this.item3 = checked;
    this.updateSelectAllState();
  }

  private updateSelectAllState() {
    const totalItems = 3;
    const selectedItems = [this.item1, this.item2, this.item3].filter(Boolean).length;

    if (selectedItems === 0) {
      this.allSelected = false;
      this.isIndeterminate = false;
    } else if (selectedItems === totalItems) {
      this.allSelected = true;
      this.isIndeterminate = false;
    } else {
      this.allSelected = false;
      this.isIndeterminate = true;
    }
  }
}
```

## 🏗️ Interfaces

```typescript
type CheckboxType = "default" | "primary" | "success" | "warning" | "danger" | "subtle" | "outline";
type CheckboxSize = "xs" | "sm" | "md" | "lg" | "xl";
```

## ⚡ Comportamiento

- **ControlValueAccessor**: Integración completa con formularios reactivos
- **Estados visuales**: Hover, focus, disabled, checked, indeterminate
- **Animaciones suaves**: Transiciones en el checkmark
- **Accesibilidad**: Soporte completo para ARIA y navegación por teclado
- **Responsive**: Se adapta automáticamente en móviles
- **Estado indeterminado**: Para selección parcial de grupos

## ✅ Características

- ✅ 7 tipos de color diferentes
- ✅ 5 tamaños configurables
- ✅ Integración con formularios reactivos
- ✅ Estados disabled e indeterminate
- ✅ Textos de ayuda y error
- ✅ Accesibilidad completa
- ✅ Navegación por teclado
- ✅ Animaciones suaves
- ✅ Completamente responsive
- ✅ Tooltips configurables
- ✅ IDs únicos automáticos
- ✅ Estado indeterminado para grupos

## 🎨 Estilos Automáticos

- **Checkmark dinámico**: Aparece/desaparece con animación
- **Estados hover**: Efectos de elevación
- **Estados focus**: Outline visible
- **Estados error**: Bordes rojos
- **Responsive**: Tamaños adaptativos en móviles
- **Animaciones**: Transiciones suaves

## 🚨 Solución de Problemas

| Problema                         | Solución                                                    |
| -------------------------------- | ----------------------------------------------------------- |
| Checkbox no responde             | Verifica que no esté `disabled`                             |
| Formulario no funciona           | Asegúrate de usar `formControlName` correctamente           |
| Estilos no se aplican            | Verifica que el tema Openiis UI esté configurado            |
| Accesibilidad no funciona        | Verifica `ariaLabel` y navegación por teclado               |
| Estado indeterminado no funciona | Verifica que `indeterminate` esté configurado correctamente |
| Animaciones no funcionan         | Verifica que no haya `prefers-reduced-motion`               |

## 🐞 Reportar Problemas

Si encuentras algún problema en la lógica del componente, por favor
[🐞Reportalo](https://github.com/Alexiisart/openiis-ui/issues/new)
