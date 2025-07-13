# InputComponent

Componente Input elegante y reutilizable que proporciona una experiencia de entrada de datos unificada y accesible.

## Características

- ✅ **Múltiples tipos**: text, email, password, search, url, tel, number
- ✅ **Soporte para textarea** con redimensionamiento vertical
- ✅ **4 variantes de estilo**: default, filled, outlined, minimal
- ✅ **5 tamaños**: xs, sm, md, lg, xl
- ✅ **Iconos integrados** a izquierda y derecha
- ✅ **Botón de limpiar** opcional
- ✅ **Contador de caracteres** con límite máximo
- ✅ **Estados de validación** con mensajes de error y ayuda
- ✅ **Autocomplete desactivado** por seguridad (siempre "off")
- ✅ **Reactive Forms** compatible con ControlValueAccessor
- ✅ **Accesibilidad completa** con ARIA labels
- ✅ **Responsive** optimizado para móviles
- ✅ **Animaciones fluidas** con transiciones suaves
- ✅ **Formato personalizado** para teléfonos y números

## Uso Básico

```html
<!-- Input simple -->
<openiis-input label="Nombre completo" placeholder="Ingresa tu nombre" [(value)]="userName"></openiis-input>

<!-- Input con icono -->
<openiis-input type="email" label="Correo electrónico" placeholder="usuario@ejemplo.com" iconLeft="mail" [(value)]="userEmail"></openiis-input>

<!-- Textarea -->
<openiis-input [isTextarea]="true" label="Descripción" placeholder="Describe tu experiencia..." [rows]="4" [(value)]="description"></openiis-input>
```

## Variantes

### Default (Borde estándar)

```html
<openiis-input variant="default" label="Input estándar"></openiis-input>
```

### Filled (Fondo relleno)

```html
<openiis-input variant="filled" label="Input relleno"></openiis-input>
```

### Outlined (Borde doble)

```html
<openiis-input variant="outlined" label="Input con contorno"></openiis-input>
```

### Minimal (Solo línea inferior)

```html
<openiis-input variant="minimal" label="Input minimalista"></openiis-input>
```

## Tamaños

```html
<!-- Extra pequeño -->
<openiis-input size="xs" label="Muy pequeño"></openiis-input>

<!-- Pequeño -->
<openiis-input size="sm" label="Pequeño"></openiis-input>

<!-- Mediano (por defecto) -->
<openiis-input size="md" label="Mediano"></openiis-input>

<!-- Grande -->
<openiis-input size="lg" label="Grande"></openiis-input>

<!-- Extra grande -->
<openiis-input size="xl" label="Muy grande"></openiis-input>
```

## Tipos de Input

### Text Input

```html
<openiis-input type="text" label="Nombre" placeholder="Ingresa tu nombre" [(value)]="name"></openiis-input>
```

### Email Input

```html
<openiis-input type="email" label="Correo electrónico" placeholder="ejemplo@correo.com" iconLeft="mail" [enableValidation]="true" [(value)]="email"> </openiis-input>
```

### Password Input

```html
<openiis-input type="password" label="Contraseña" placeholder="Ingresa tu contraseña" iconLeft="lock" [minLength]="8" [enableValidation]="true" [(value)]="password"> </openiis-input>
```

### Teléfono con Formato Personalizado

```html
<!-- Teléfono México -->
<openiis-input type="tel" label="Teléfono México" customFormat="(XXX) XXX-XXXX" iconLeft="phone" [(value)]="phoneNumber"> </openiis-input>

<!-- Teléfono España -->
<openiis-input type="tel" label="Teléfono España" customFormat="XXX XXX XXX" iconLeft="phone" [(value)]="phoneSpain"> </openiis-input>

<!-- Teléfono Internacional -->
<openiis-input type="tel" label="Teléfono Internacional" customFormat="+XX (XXX) XXX-XXXX" iconLeft="phone" [(value)]="phoneInternational"> </openiis-input>
```

### Number Input

```html
<openiis-input type="number" label="Cantidad" placeholder="0" [maxLength]="10" [(value)]="quantity"> </openiis-input>
```

### URL Input

```html
<openiis-input type="url" label="Sitio web" placeholder="ejemplo.com" iconLeft="link" [(value)]="website"> </openiis-input>
```

### Search Input

```html
<openiis-input type="search" label="Buscar" placeholder="Buscar productos..." iconLeft="search" [clearable]="true" [(value)]="searchTerm"> </openiis-input>
```

## Formato Personalizado

El componente soporta formatos personalizados para teléfonos usando la propiedad `customFormat`:

### Símbolos de Formato

- **X o x**: Representa un dígito
- **Otros caracteres**: Se mantienen como separadores (espacios, guiones, paréntesis, etc.)

### Ejemplos de Formatos

```html
<!-- Formato México -->
<openiis-input type="tel" customFormat="(XXX) XXX-XXXX" label="Teléfono MX"></openiis-input>
<!-- Resultado: (555) 123-4567 -->

<!-- Formato España -->
<openiis-input type="tel" customFormat="XXX XXX XXX" label="Teléfono ES"></openiis-input>
<!-- Resultado: 612 345 678 -->

<!-- Formato Internacional -->
<openiis-input type="tel" customFormat="+XX XXX XXX XXXX" label="Internacional"></openiis-input>
<!-- Resultado: +52 555 123 4567 -->

<!-- Formato USA -->
<openiis-input type="tel" customFormat="XXX-XXX-XXXX" label="Teléfono USA"></openiis-input>
<!-- Resultado: 555-123-4567 -->

<!-- Formato con extensión -->
<openiis-input type="tel" customFormat="(XXX) XXX-XXXX ext. XXXX" label="Con extensión"></openiis-input>
<!-- Resultado: (555) 123-4567 ext. 1234 -->
```

## Autocomplete

### Comportamiento de seguridad

Por razones de seguridad, el componente **siempre** tiene el autocompletado desactivado:

```html
<!-- Todos los inputs tienen autocomplete="off" automáticamente -->
<openiis-input type="text" label="Nombre"></openiis-input>
<openiis-input type="email" label="Email"></openiis-input>
<openiis-input type="password" label="Contraseña"></openiis-input>
<openiis-input type="tel" label="Teléfono"></openiis-input>
```

### Características de seguridad

- **Siempre "off"**: El autocompletado está desactivado por defecto y no se puede cambiar
- **Protección de datos**: Previene el almacenamiento automático de información sensible
- **Compatibilidad**: Funciona en todos los navegadores modernos
- **Consistencia**: Comportamiento uniforme en todos los tipos de input
- **Privacidad**: Ideal para formularios que manejan información sensible

## Estados y Validación

### Con texto de ayuda

```html
<openiis-input label="Contraseña" type="password" helpText="Mínimo 8 caracteres con letras y números"></openiis-input>
```

### Con texto de error

```html
<openiis-input label="Email" type="email" errorText="Por favor ingresa un email válido"></openiis-input>
```

### Disabled

```html
<openiis-input label="Campo deshabilitado" [disabled]="true"></openiis-input>
```

### Readonly

```html
<openiis-input label="Solo lectura" [readonly]="true" value="Valor fijo"></openiis-input>
```

## Características Avanzadas

### Con iconos y botón de limpiar

```html
<openiis-input type="search" label="Búsqueda avanzada" placeholder="Buscar productos..." iconLeft="search" iconRight="tune" [clearable]="true" [(value)]="searchQuery"> </openiis-input>
```

### Contador de caracteres

```html
<openiis-input [isTextarea]="true" label="Comentario" [maxLength]="280" [showCharacterCount]="true" [(value)]="comment"> </openiis-input>
```

### Textarea con múltiples filas

```html
<openiis-input [isTextarea]="true" label="Mensaje" [rows]="6" placeholder="Escribe tu mensaje aquí..." [(value)]="message"> </openiis-input>
```

### Formulario completo con validaciones

```html
<!-- Información personal -->
<openiis-input type="text" label="Nombre" iconLeft="person" [enableValidation]="true" [minLength]="2" [(value)]="profile.firstName"> </openiis-input>

<openiis-input type="email" label="Email" iconLeft="mail" [enableValidation]="true" [(value)]="profile.email"> </openiis-input>

<openiis-input type="tel" label="Teléfono" customFormat="(XXX) XXX-XXXX" iconLeft="phone" [enableValidation]="true" [(value)]="profile.phone"> </openiis-input>

<!-- Campos de contraseña - autocompletado siempre desactivado -->
<openiis-input type="password" label="Contraseña" iconLeft="lock" [enableValidation]="true" [minLength]="8" [(value)]="userData.password"> </openiis-input>
```

## Reactive Forms

```typescript
// En el componente
form = this.fb.group({
  name: ['', [Validators.required, Validators.minLength(2)]],
  email: ['', [Validators.required, Validators.email]],
  phone: ['', [Validators.required]],
  description: ['', Validators.maxLength(500)]
});

get nameError() {
  const control = this.form.get('name');
  if (control?.errors?.['required']) return 'El nombre es requerido';
  if (control?.errors?.['minlength']) return 'Mínimo 2 caracteres';
  return '';
}
```

```html
<form [formGroup]="form">
  <openiis-input formControlName="name" label="Nombre" [errorText]="nameError"> </openiis-input>

  <openiis-input formControlName="email" type="email" label="Email" iconLeft="mail"> </openiis-input>

  <openiis-input formControlName="phone" type="tel" customFormat="(XXX) XXX-XXXX" label="Teléfono" iconLeft="phone"> </openiis-input>

  <openiis-input formControlName="description" [isTextarea]="true" label="Descripción" [maxLength]="500" [showCharacterCount]="true"> </openiis-input>
</form>
```

## Eventos

```html
<openiis-input label="Input con eventos" (valueChange)="onValueChange($event)" (focusEvent)="onFocus($event)" (blurEvent)="onBlur($event)" (keydownEvent)="onKeyDown($event)"> </openiis-input>
```

```typescript
onValueChange(value: string) {
  console.log('Nuevo valor:', value);
}

onFocus(event: FocusEvent) {
  console.log('Input enfocado');
}

onKeyDown(event: KeyboardEvent) {
  if (event.key === 'Enter') {
    console.log('Enter presionado');
  }
}
```

## Propiedades

| Propiedad             | Tipo             | Default     | Descripción                  |
| --------------------- | ---------------- | ----------- | ---------------------------- |
| `type`                | `InputType`      | `'text'`    | Tipo de input                |
| `variant`             | `InputVariant`   | `'default'` | Variante visual              |
| `size`                | `InputSize`      | `'md'`      | Tamaño del input             |
| `label`               | `string`         | `''`        | Etiqueta del input           |
| `placeholder`         | `string`         | `''`        | Texto placeholder            |
| `helpText`            | `string`         | `''`        | Texto de ayuda               |
| `errorText`           | `string`         | `''`        | Texto de error               |
| `value`               | `string`         | `''`        | Valor del input              |
| `disabled`            | `boolean`        | `false`     | Estado disabled              |
| `readonly`            | `boolean`        | `false`     | Estado readonly              |
| `iconLeft`            | `string`         | `''`        | Icono izquierdo              |
| `iconRight`           | `string`         | `''`        | Icono derecho                |
| `clearable`           | `boolean`        | `false`     | Mostrar botón limpiar        |
| `maxLength`           | `number \| null` | `null`      | Máximo de caracteres         |
| `minLength`           | `number \| null` | `null`      | Mínimo de caracteres         |
| `autocomplete`        | `string`         | `'off'`     | Siempre "off" (solo lectura) |
| `showCharacterCount`  | `boolean`        | `false`     | Mostrar contador             |
| `isTextarea`          | `boolean`        | `false`     | Usar textarea                |
| `rows`                | `number`         | `3`         | Filas del textarea           |
| `customFormat`        | `string`         | `''`        | Formato personalizado (tel)  |
| `enableValidation`    | `boolean`        | `true`      | Habilitar validación         |
| `showValidationIcons` | `boolean`        | `true`      | Mostrar iconos de validación |
| `inputId`             | `string`         | `auto`      | ID del input                 |
| `ariaLabel`           | `string`         | `''`        | ARIA label                   |
| `extraClasses`        | `string`         | `''`        | Clases CSS adicionales       |

## Eventos

| Evento             | Tipo               | Descripción          |
| ------------------ | ------------------ | -------------------- |
| `valueChange`      | `string`           | Cambio de valor      |
| `validationChange` | `ValidationResult` | Cambio de validación |
| `focusEvent`       | `FocusEvent`       | Input enfocado       |
| `blurEvent`        | `FocusEvent`       | Input desenfocar     |
| `keydownEvent`     | `KeyboardEvent`    | Tecla presionada     |
| `keyupEvent`       | `KeyboardEvent`    | Tecla liberada       |

## Métodos Públicos

```typescript
// Obtener referencia del componente
@ViewChild(OpeniisInputComponent) inputComponent!: OpeniisInputComponent;

// Enfocar el input
this.inputComponent.focus();

// Seleccionar todo el texto
this.inputComponent.selectAll();

// Limpiar el valor
this.inputComponent.clearValue();
```

## Personalización

El componente usa las variables CSS del sistema de diseño para mantener consistencia visual:

```css
/* Variables disponibles para personalización */
--color-primary: #14b8a6;
--color-surface: #f8fafc;
--color-border: #e2e8f0;
--radius-md: 0.375rem;
--space-2: 0.5rem;
--shadow-sm: 0 1px 2px 0 rgb(0 0 0 / 0.05);
```

## Ejemplos de Uso Completos

### Formulario de Registro

```html
<form class="registration-form">
  <openiis-input type="text" label="Nombre" iconLeft="person" [enableValidation]="true" [minLength]="2" [(value)]="user.firstName"> </openiis-input>

  <openiis-input type="email" label="Correo electrónico" iconLeft="mail" [enableValidation]="true" [(value)]="user.email"> </openiis-input>

  <openiis-input type="tel" label="Teléfono" customFormat="(XXX) XXX-XXXX" iconLeft="phone" [enableValidation]="true" [(value)]="user.phone"> </openiis-input>

  <openiis-input type="password" label="Contraseña" iconLeft="lock" [enableValidation]="true" [minLength]="8" helpText="Mínimo 8 caracteres" [(value)]="user.password"> </openiis-input>
</form>
```

### Formulario de Contacto

```html
<form class="contact-form">
  <openiis-input type="text" label="Asunto" iconLeft="subject" [enableValidation]="true" [minLength]="5" [(value)]="contact.subject"> </openiis-input>

  <openiis-input [isTextarea]="true" label="Mensaje" placeholder="Describe tu consulta..." [rows]="5" [maxLength]="1000" [showCharacterCount]="true" [enableValidation]="true" [minLength]="20" [(value)]="contact.message"> </openiis-input>

  <openiis-input type="url" label="Sitio web (opcional)" placeholder="https://ejemplo.com" iconLeft="link" [(value)]="contact.website"> </openiis-input>
</form>
```
