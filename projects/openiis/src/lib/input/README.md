# Input

Componente de input elegante y reutilizable con soporte completo para formularios reactivos, validación automática, formateo inteligente y múltiples variantes visuales.

## 📦 Instalación

```typescript
import { OpeniisInputComponent } from 'openiis-ui';

@Component({
  imports: [OpeniisInputComponent],
})
```

## ⚙️ Properties

| Property              | Tipo             | Default     | Descripción                       |
| --------------------- | ---------------- | ----------- | --------------------------------- |
| `type`                | `InputType`      | `'text'`    | Tipo de input                     |
| `variant`             | `InputVariant`   | `'default'` | Variante visual del input         |
| `size`                | `InputSize`      | `'md'`      | Tamaño del input                  |
| `label`               | `string`         | `''`        | Texto de la etiqueta              |
| `placeholder`         | `string`         | `''`        | Texto del placeholder             |
| `helpText`            | `string`         | `''`        | Texto de ayuda                    |
| `errorText`           | `string`         | `''`        | Texto de error                    |
| `value`               | `string`         | `''`        | Valor del input                   |
| `disabled`            | `boolean`        | `false`     | Deshabilitar input                |
| `readonly`            | `boolean`        | `false`     | Modo solo lectura                 |
| `inputId`             | `string`         | `auto`      | ID único del input                |
| `iconLeft`            | `string`         | `''`        | Icono izquierdo (Material)        |
| `iconRight`           | `string`         | `''`        | Icono derecho (Material)          |
| `clearable`           | `boolean`        | `false`     | Botón para limpiar                |
| `maxLength`           | `number \| null` | `null`      | Longitud máxima                   |
| `minLength`           | `number \| null` | `null`      | Longitud mínima                   |
| `autocomplete`        | `string`         | `'off'`     | Valor de autocomplete             |
| `showCharacterCount`  | `boolean`        | `false`     | Mostrar contador de caracteres    |
| `isTextarea`          | `boolean`        | `false`     | Usar textarea en lugar de input   |
| `rows`                | `number`         | `3`         | Filas del textarea                |
| `ariaLabel`           | `string`         | `''`        | Etiqueta ARIA                     |
| `ariaDescribedBy`     | `string`         | `''`        | Referencia ARIA describedby       |
| `title`               | `string`         | `''`        | Título del tooltip                |
| `extraClasses`        | `string`         | `''`        | Clases CSS adicionales            |
| `customFormat`        | `string`         | `''`        | Formato personalizado (teléfonos) |
| `enableValidation`    | `boolean`        | `true`      | Habilitar validación              |
| `showValidationIcons` | `boolean`        | `true`      | Mostrar iconos de validación      |

## 📡 Events

| Event              | Tipo               | Descripción                         |
| ------------------ | ------------------ | ----------------------------------- |
| `valueChange`      | `string`           | Emitido cuando cambia el valor      |
| `validationChange` | `ValidationResult` | Emitido cuando cambia la validación |
| `focusEvent`       | `FocusEvent`       | Emitido al obtener focus            |
| `blurEvent`        | `FocusEvent`       | Emitido al perder focus             |
| `keydownEvent`     | `KeyboardEvent`    | Emitido en keydown                  |
| `keyupEvent`       | `KeyboardEvent`    | Emitido en keyup                    |

## 🎨 Tipos de Input

| Tipo       | Uso                  | Validación          | Formateo                  |
| ---------- | -------------------- | ------------------- | ------------------------- |
| `text`     | Texto general        | Longitud mín/máx    | Capitalización de nombres |
| `email`    | Direcciones de email | Formato de email    | Conversión a minúsculas   |
| `password` | Contraseñas          | Longitud mínima (8) | Toggle de visibilidad     |
| `search`   | Búsquedas            | Longitud mín/máx    | Sin formateo              |
| `url`      | URLs                 | Formato básico      | Auto-agregar https://     |
| `tel`      | Teléfonos            | Solo números        | Formato personalizado     |
| `number`   | Números              | Solo números        | Sin formateo              |

## 🎨 Variantes Visuales

| Variante   | Descripción                 |
| ---------- | --------------------------- |
| `default`  | Input estándar con borde    |
| `filled`   | Input con fondo sólido      |
| `outlined` | Input solo con borde        |
| `minimal`  | Input minimalista sin borde |
| `error`    | Input con estado de error   |

## 📏 Tamaños

| Tamaño | Padding | Font-size | Uso               |
| ------ | ------- | --------- | ----------------- |
| `xs`   | 4px     | 12px      | Muy compacto      |
| `sm`   | 8px     | 13px      | Compacto          |
| `md`   | 12px    | 14px      | Mediano (default) |
| `lg`   | 16px    | 16px      | Grande            |
| `xl`   | 20px    | 18px      | Muy grande        |

## 💡 Ejemplos Prácticos

### 1. Input Básico

```html
<openiis-input label="Nombre completo" placeholder="Ingresa tu nombre" [value]="fullName" (valueChange)="onNameChange($event)"> </openiis-input>
```

```typescript
export class MyComponent {
  fullName = "";

  onNameChange(value: string) {
    this.fullName = value;
    console.log("Name changed:", value);
  }
}
```

### 2. Input con Formulario Reactivo

```html
<form [formGroup]="userForm">
  <openiis-input label="Email" type="email" placeholder="tu@email.com" formControlName="email" helpText="Usaremos este email para contactarte" [showValidationIcons]="true" (validationChange)="onEmailValidation($event)"> </openiis-input>

  <openiis-input label="Contraseña" type="password" placeholder="Mínimo 8 caracteres" formControlName="password" [minLength]="8" [clearable]="true" (validationChange)="onPasswordValidation($event)"> </openiis-input>

  <openiis-input label="Teléfono" type="tel" placeholder="(123) 456-7890" formControlName="phone" customFormat="(XXX) XXX-XXXX" iconLeft="phone"> </openiis-input>
</form>
```

```typescript
import { FormBuilder, FormGroup } from "@angular/forms";

export class MyComponent {
  userForm: FormGroup;

  constructor(private fb: FormBuilder) {
    this.userForm = this.fb.group({
      email: [""],
      password: [""],
      phone: [""],
    });
  }

  onEmailValidation(result: ValidationResult) {
    if (!result.isValid) {
      console.log("Email error:", result.message);
    }
  }

  onPasswordValidation(result: ValidationResult) {
    if (!result.isValid) {
      console.log("Password error:", result.message);
    }
  }
}
```

### 3. Input con Diferentes Tipos

```html
<openiis-input label="URL del sitio web" type="url" placeholder="https://ejemplo.com" [value]="websiteUrl" (valueChange)="onWebsiteChange($event)" iconLeft="link"> </openiis-input>

<openiis-input label="Buscar productos" type="search" placeholder="Buscar..." [value]="searchTerm" (valueChange)="onSearchChange($event)" iconLeft="search" [clearable]="true"> </openiis-input>

<openiis-input label="Edad" type="number" placeholder="Ingresa tu edad" [value]="age" (valueChange)="onAgeChange($event)" [maxLength]="3"> </openiis-input>
```

```typescript
export class MyComponent {
  websiteUrl = "";
  searchTerm = "";
  age = "";

  onWebsiteChange(value: string) {
    this.websiteUrl = value;
    console.log("Website:", value);
  }

  onSearchChange(value: string) {
    this.searchTerm = value;
    console.log("Search:", value);
  }

  onAgeChange(value: string) {
    this.age = value;
    console.log("Age:", value);
  }
}
```

### 4. Input con Diferentes Variantes

```html
<openiis-input label="Input estándar" variant="default" placeholder="Variante default" [value]="defaultValue" (valueChange)="onDefaultChange($event)"> </openiis-input>

<openiis-input label="Input con fondo" variant="filled" placeholder="Variante filled" [value]="filledValue" (valueChange)="onFilledChange($event)"> </openiis-input>

<openiis-input label="Input con borde" variant="outlined" placeholder="Variante outlined" [value]="outlinedValue" (valueChange)="onOutlinedChange($event)"> </openiis-input>

<openiis-input label="Input minimalista" variant="minimal" placeholder="Variante minimal" [value]="minimalValue" (valueChange)="onMinimalChange($event)"> </openiis-input>
```

```typescript
export class MyComponent {
  defaultValue = "";
  filledValue = "";
  outlinedValue = "";
  minimalValue = "";

  onDefaultChange(value: string) {
    this.defaultValue = value;
  }

  onFilledChange(value: string) {
    this.filledValue = value;
  }

  onOutlinedChange(value: string) {
    this.outlinedValue = value;
  }

  onMinimalChange(value: string) {
    this.minimalValue = value;
  }
}
```

### 5. Input con Diferentes Tamaños

```html
<openiis-input label="Muy pequeño" size="xs" placeholder="Tamaño xs" [value]="xsValue" (valueChange)="onXsChange($event)"> </openiis-input>

<openiis-input label="Pequeño" size="sm" placeholder="Tamaño sm" [value]="smValue" (valueChange)="onSmChange($event)"> </openiis-input>

<openiis-input label="Mediano" size="md" placeholder="Tamaño md (default)" [value]="mdValue" (valueChange)="onMdChange($event)"> </openiis-input>

<openiis-input label="Grande" size="lg" placeholder="Tamaño lg" [value]="lgValue" (valueChange)="onLgChange($event)"> </openiis-input>

<openiis-input label="Muy grande" size="xl" placeholder="Tamaño xl" [value]="xlValue" (valueChange)="onXlChange($event)"> </openiis-input>
```

```typescript
export class MyComponent {
  xsValue = "";
  smValue = "";
  mdValue = "";
  lgValue = "";
  xlValue = "";

  onXsChange(value: string) {
    this.xsValue = value;
  }

  onSmChange(value: string) {
    this.smValue = value;
  }

  onMdChange(value: string) {
    this.mdValue = value;
  }

  onLgChange(value: string) {
    this.lgValue = value;
  }

  onXlChange(value: string) {
    this.xlValue = value;
  }
}
```

### 6. Input con Iconos y Estados

```html
<openiis-input label="Email" type="email" placeholder="tu@email.com" iconLeft="email" iconRight="verified" [value]="email" (valueChange)="onEmailChange($event)" (validationChange)="onEmailValidation($event)" [showValidationIcons]="true"> </openiis-input>

<openiis-input label="Contraseña" type="password" placeholder="Ingresa tu contraseña" iconLeft="lock" [value]="password" (valueChange)="onPasswordChange($event)" [clearable]="true" [minLength]="8"> </openiis-input>

<openiis-input label="Comentario" [isTextarea]="true" [rows]="4" placeholder="Escribe tu comentario..." [value]="comment" (valueChange)="onCommentChange($event)" [showCharacterCount]="true" [maxLength]="500"> </openiis-input>
```

```typescript
export class MyComponent {
  email = "";
  password = "";
  comment = "";

  onEmailChange(value: string) {
    this.email = value;
  }

  onEmailValidation(result: ValidationResult) {
    console.log("Email validation:", result);
  }

  onPasswordChange(value: string) {
    this.password = value;
  }

  onCommentChange(value: string) {
    this.comment = value;
  }
}
```

### 7. Input con Estados Avanzados

```html
<openiis-input label="Campo requerido" placeholder="Este campo es obligatorio" [value]="requiredField" (valueChange)="onRequiredChange($event)" errorText="Este campo es obligatorio" variant="error" [enableValidation]="true"> </openiis-input>

<openiis-input label="Campo deshabilitado" placeholder="No puedes editar esto" [value]="disabledField" [disabled]="true" helpText="Este campo está deshabilitado"> </openiis-input>

<openiis-input label="Campo solo lectura" placeholder="Solo para mostrar" [value]="readonlyField" [readonly]="true" helpText="Este campo es solo de lectura"> </openiis-input>
```

```typescript
export class MyComponent {
  requiredField = "";
  disabledField = "Valor fijo";
  readonlyField = "Información importante";

  onRequiredChange(value: string) {
    this.requiredField = value;
  }
}
```

### 8. Input con Formateo Personalizado

```html
<openiis-input label="Teléfono con formato" type="tel" placeholder="(123) 456-7890" customFormat="(XXX) XXX-XXXX" [value]="phoneNumber" (valueChange)="onPhoneChange($event)" iconLeft="phone"> </openiis-input>

<openiis-input label="Tarjeta de crédito" type="text" placeholder="1234 5678 9012 3456" customFormat="XXXX XXXX XXXX XXXX" [value]="creditCard" (valueChange)="onCardChange($event)" iconLeft="credit_card" [maxLength]="19"> </openiis-input>

<openiis-input label="Código postal" type="text" placeholder="12345" customFormat="XXXXX" [value]="zipCode" (valueChange)="onZipChange($event)" [maxLength]="5"> </openiis-input>
```

```typescript
export class MyComponent {
  phoneNumber = "";
  creditCard = "";
  zipCode = "";

  onPhoneChange(value: string) {
    this.phoneNumber = value;
    console.log("Phone:", value);
  }

  onCardChange(value: string) {
    this.creditCard = value;
    console.log("Card:", value);
  }

  onZipChange(value: string) {
    this.zipCode = value;
    console.log("ZIP:", value);
  }
}
```

### 9. Input con Accesibilidad

```html
<openiis-input label="Campo accesible" placeholder="Ingresa información" [value]="accessibleField" (valueChange)="onAccessibleChange($event)" ariaLabel="Campo de información accesible" ariaDescribedBy="field-help" title="Campo con soporte completo de accesibilidad" (focusEvent)="onFocus($event)" (blurEvent)="onBlur($event)"> </openiis-input>

<div id="field-help" class="sr-only">Este campo tiene soporte completo para lectores de pantalla</div>
```

```typescript
export class MyComponent {
  accessibleField = "";

  onAccessibleChange(value: string) {
    this.accessibleField = value;
  }

  onFocus(event: FocusEvent) {
    console.log("Input focused");
  }

  onBlur(event: FocusEvent) {
    console.log("Input blurred");
  }
}
```

## 🏗️ Interfaces

```typescript
type InputType = "text" | "email" | "password" | "search" | "url" | "tel" | "number";
type InputVariant = "default" | "filled" | "outlined" | "minimal" | "error";
type InputSize = "xs" | "sm" | "md" | "lg" | "xl";

interface ValidationResult {
  isValid: boolean;
  message?: string;
}
```

## ⚡ Comportamiento

- **ControlValueAccessor**: Integración completa con formularios reactivos
- **Validación automática**: Por tipo de input y longitud
- **Formateo inteligente**: URLs, teléfonos, nombres, emails
- **Estados visuales**: Hover, focus, disabled, readonly, error
- **Accesibilidad**: Soporte completo para ARIA y navegación por teclado
- **Responsive**: Se adapta automáticamente en móviles
- **Anti-autocomplete**: Técnicas para deshabilitar autocompletado

## ✅ Características

- ✅ 7 tipos de input diferentes
- ✅ 5 variantes visuales
- ✅ 5 tamaños configurables
- ✅ Integración con formularios reactivos
- ✅ Validación automática por tipo
- ✅ Formateo inteligente
- ✅ Estados disabled y readonly
- ✅ Textos de ayuda y error
- ✅ Iconos izquierdos y derechos
- ✅ Botón de limpiar
- ✅ Toggle de contraseña
- ✅ Contador de caracteres
- ✅ Soporte para textarea
- ✅ Accesibilidad completa
- ✅ Navegación por teclado
- ✅ Anti-autocomplete
- ✅ Completamente responsive
- ✅ Tooltips configurables
- ✅ IDs únicos automáticos

## 🎨 Estilos Automáticos

- **Estados dinámicos**: Hover, focus, error, success
- **Iconos de validación**: Check/error según estado
- **Formateo visual**: Bordes, sombras, colores
- **Responsive**: Tamaños adaptativos en móviles
- **Animaciones**: Transiciones suaves

## 🚨 Solución de Problemas

| Problema                  | Solución                                          |
| ------------------------- | ------------------------------------------------- |
| Input no responde         | Verifica que no esté `disabled` o `readonly`      |
| Formulario no funciona    | Asegúrate de usar `formControlName` correctamente |
| Validación no funciona    | Verifica que `enableValidation` esté en `true`    |
| Autocomplete aparece      | El componente tiene técnicas anti-autocomplete    |
| Formateo no funciona      | Verifica `customFormat` para teléfonos            |
| Estilos no se aplican     | Verifica que el tema Openiis UI esté configurado  |
| Accesibilidad no funciona | Verifica `ariaLabel` y navegación por teclado     |

## 🐞 Reportar Problemas

Si encuentras algún problema en la lógica del componente, por favor
[🐞Reportalo](https://github.com/Alexiisart/openiis-ui/issues/new)
