# RadioButtonComponent

Componente Radio Button elegante y accesible que permite a los usuarios seleccionar una opción de un grupo mutuamente excluyente.

## Características

- ✅ **6 variantes visuales**: default, primary, success, warning, danger, subtle
- ✅ **5 tamaños**: xs, sm, md, lg, xl
- ✅ **Estados completos**: normal, hover, focus, disabled, readonly, error
- ✅ **Reactive Forms** compatible con ControlValueAccessor
- ✅ **Accesibilidad completa** con ARIA labels y navegación por teclado
- ✅ **Responsive** optimizado para móviles
- ✅ **Animaciones suaves** con transiciones CSS
- ✅ **Textos de ayuda y error** con alineación perfecta
- ✅ **Eventos personalizados** para integración avanzada

## Uso Básico

```html
<!-- Radio button simple -->
<openiis-radio-button label="Opción 1" name="grupo1" value="opcion1" [(ngModel)]="selectedOption"> </openiis-radio-button>

<!-- Grupo de radio buttons -->
<openiis-radio-button label="Masculino" name="genero" value="masculino" [(ngModel)]="genero"> </openiis-radio-button>

<openiis-radio-button label="Femenino" name="genero" value="femenino" [(ngModel)]="genero"> </openiis-radio-button>

<openiis-radio-button label="Prefiero no decir" name="genero" value="otro" [(ngModel)]="genero"> </openiis-radio-button>
```

## Variantes

### Default

```html
<openiis-radio-button type="default" label="Opción default" name="grupo1" value="default"> </openiis-radio-button>
```

### Primary

```html
<openiis-radio-button type="primary" label="Opción primary" name="grupo2" value="primary"> </openiis-radio-button>
```

### Success

```html
<openiis-radio-button type="success" label="Opción success" name="grupo3" value="success"> </openiis-radio-button>
```

### Warning

```html
<openiis-radio-button type="warning" label="Opción warning" name="grupo4" value="warning"> </openiis-radio-button>
```

### Danger

```html
<openiis-radio-button type="danger" label="Opción danger" name="grupo5" value="danger"> </openiis-radio-button>
```

### Subtle

```html
<openiis-radio-button type="subtle" label="Opción subtle" name="grupo6" value="subtle"> </openiis-radio-button>
```

## Tamaños

```html
<!-- Extra pequeño -->
<openiis-radio-button size="xs" label="Extra pequeño" name="size" value="xs"></openiis-radio-button>

<!-- Pequeño -->
<openiis-radio-button size="sm" label="Pequeño" name="size" value="sm"></openiis-radio-button>

<!-- Mediano (por defecto) -->
<openiis-radio-button size="md" label="Mediano" name="size" value="md"></openiis-radio-button>

<!-- Grande -->
<openiis-radio-button size="lg" label="Grande" name="size" value="lg"></openiis-radio-button>

<!-- Extra grande -->
<openiis-radio-button size="xl" label="Extra grande" name="size" value="xl"></openiis-radio-button>
```

## Estados

### Con texto de ayuda

```html
<openiis-radio-button label="Acepto términos y condiciones" helpText="Lee los términos antes de continuar" name="terminos" value="acepto"> </openiis-radio-button>
```

### Con texto de error

```html
<openiis-radio-button label="Campo obligatorio" errorText="Debes seleccionar una opción" name="obligatorio" value="si"> </openiis-radio-button>
```

### Deshabilitado

```html
<openiis-radio-button label="Opción deshabilitada" [disabled]="true" name="disabled" value="no-disponible"> </openiis-radio-button>
```

### Solo lectura

```html
<openiis-radio-button label="Solo lectura" [readonly]="true" name="readonly" value="readonly-value"> </openiis-radio-button>
```

## Reactive Forms

```typescript
// En el componente
form = this.fb.group({
  genero: ['', Validators.required],
  preferencias: ['email', Validators.required],
  plan: ['basico']
});

get generoError() {
  const control = this.form.get('genero');
  if (control?.errors?.['required']) return 'Debes seleccionar un género';
  return '';
}
```

```html
<form [formGroup]="form">
  <!-- Género -->
  <div class="radio-group">
    <h3>Género</h3>
    <openiis-radio-button formControlName="genero" label="Masculino" name="genero" value="masculino" [errorText]="generoError"> </openiis-radio-button>

    <openiis-radio-button formControlName="genero" label="Femenino" name="genero" value="femenino"> </openiis-radio-button>

    <openiis-radio-button formControlName="genero" label="Prefiero no decir" name="genero" value="otro"> </openiis-radio-button>
  </div>

  <!-- Preferencias de contacto -->
  <div class="radio-group">
    <h3>¿Cómo prefieres que te contactemos?</h3>
    <openiis-radio-button formControlName="preferencias" type="primary" label="Por email" name="contacto" value="email" helpText="Te enviaremos notificaciones por correo electrónico"> </openiis-radio-button>

    <openiis-radio-button formControlName="preferencias" type="primary" label="Por teléfono" name="contacto" value="telefono" helpText="Llamadas o SMS a tu número registrado"> </openiis-radio-button>

    <openiis-radio-button formControlName="preferencias" type="primary" label="No contactar" name="contacto" value="ninguno" helpText="Solo recibirás notificaciones importantes"> </openiis-radio-button>
  </div>
</form>
```

## Eventos

```html
<openiis-radio-button label="Opción con eventos" name="eventos" value="opcion" (checkedChange)="onRadioChange($event)" (focusEvent)="onRadioFocus($event)" (blurEvent)="onRadioBlur($event)"> </openiis-radio-button>
```

```typescript
onRadioChange(value: any) {
  console.log('Radio seleccionado:', value);
}

onRadioFocus(event: FocusEvent) {
  console.log('Radio enfocado');
}

onRadioBlur(event: FocusEvent) {
  console.log('Radio desenfocar');
}
```

## Ejemplos Avanzados

### Grupo de planes con variantes

```html
<div class="plans-group">
  <h3>Selecciona tu plan</h3>

  <openiis-radio-button type="subtle" size="lg" label="Plan Básico" helpText="Funcionalidades esenciales - Gratis" name="plan" value="basico" [(ngModel)]="selectedPlan"> </openiis-radio-button>

  <openiis-radio-button type="primary" size="lg" label="Plan Pro" helpText="Todas las funcionalidades - $19/mes" name="plan" value="pro" [(ngModel)]="selectedPlan"> </openiis-radio-button>

  <openiis-radio-button type="warning" size="lg" label="Plan Enterprise" helpText="Para empresas - Contactar para precio" name="plan" value="enterprise" [(ngModel)]="selectedPlan"> </openiis-radio-button>
</div>
```

### Configuraciones de notificaciones

```html
<div class="notifications-group">
  <h3>Notificaciones</h3>

  <openiis-radio-button type="success" label="Todas las notificaciones" helpText="Recibirás todas las actualizaciones" name="notificaciones" value="todas" [(ngModel)]="notificationLevel"> </openiis-radio-button>

  <openiis-radio-button type="warning" label="Solo importantes" helpText="Solo notificaciones críticas" name="notificaciones" value="importantes" [(ngModel)]="notificationLevel"> </openiis-radio-button>

  <openiis-radio-button type="danger" label="Ninguna" helpText="No recibirás notificaciones" name="notificaciones" value="ninguna" [(ngModel)]="notificationLevel"> </openiis-radio-button>
</div>
```

## Propiedades

| Propiedad         | Tipo              | Default     | Descripción               |
| ----------------- | ----------------- | ----------- | ------------------------- |
| `size`            | `RadioButtonSize` | `'md'`      | Tamaño del radio button   |
| `type`            | `RadioButtonType` | `'default'` | Variante visual           |
| `label`           | `string`          | `''`        | Texto de la etiqueta      |
| `helpText`        | `string`          | `''`        | Texto de ayuda            |
| `errorText`       | `string`          | `''`        | Texto de error            |
| `value`           | `any`             | `''`        | Valor del radio button    |
| `name`            | `string`          | `''`        | Nombre del grupo          |
| `disabled`        | `boolean`         | `false`     | Estado deshabilitado      |
| `readonly`        | `boolean`         | `false`     | Estado solo lectura       |
| `radioId`         | `string`          | `auto`      | ID único del radio button |
| `ariaLabel`       | `string`          | `''`        | ARIA label                |
| `ariaDescribedBy` | `string`          | `''`        | ARIA describedby          |
| `title`           | `string`          | `''`        | Título para tooltip       |
| `extraClasses`    | `string`          | `''`        | Clases CSS adicionales    |

## Eventos

| Evento          | Tipo         | Descripción                  |
| --------------- | ------------ | ---------------------------- |
| `checkedChange` | `any`        | Se emite cuando cambia valor |
| `focusEvent`    | `FocusEvent` | Se emite al recibir foco     |
| `blurEvent`     | `FocusEvent` | Se emite al perder foco      |

## Estilos CSS

El componente utiliza las variables CSS del sistema de diseño:

```css
/* Variables principales utilizadas */
--color-border: #e2e8f0;
--color-border-focus: #14b8a6;
--color-surface-elevated: #ffffff;
--color-text-primary: #1e293b;
--color-text-secondary: #64748b;
--color-text-muted: #94a3b8;
--primary-600: #6366f1;
--success-600: #22c55e;
--warning-600: #f59e0b;
--danger-600: #ef4444;
```

## Accesibilidad

- ✅ **Navegación por teclado**: Flecha arriba/abajo, Tab, Space
- ✅ **Lectores de pantalla**: Etiquetas ARIA apropiadas
- ✅ **Alto contraste**: Colores accesibles
- ✅ **Áreas de click**: Tamaños mínimos para touch
- ✅ **Estados visuales**: Indicadores claros de estado

## Mejores Prácticas

### Agrupación

```html
<!-- ✅ Correcto: Mismo name para opciones mutuamente excluyentes -->
<openiis-radio-button name="genero" value="m" label="Masculino"></openiis-radio-button>
<openiis-radio-button name="genero" value="f" label="Femenino"></openiis-radio-button>

<!-- ❌ Incorrecto: Diferentes names -->
<openiis-radio-button name="genero1" value="m" label="Masculino"></openiis-radio-button>
<openiis-radio-button name="genero2" value="f" label="Femenino"></openiis-radio-button>
```

### Valores únicos

```html
<!-- ✅ Correcto: Valores únicos -->
<openiis-radio-button name="plan" value="basico" label="Básico"></openiis-radio-button>
<openiis-radio-button name="plan" value="pro" label="Pro"></openiis-radio-button>

<!-- ❌ Incorrecto: Valores duplicados -->
<openiis-radio-button name="plan" value="plan" label="Básico"></openiis-radio-button>
<openiis-radio-button name="plan" value="plan" label="Pro"></openiis-radio-button>
```

### Textos descriptivos

```html
<!-- ✅ Correcto: Etiquetas claras -->
<openiis-radio-button label="Envío estándar (5-7 días)" helpText="Envío gratuito" name="envio" value="estandar"> </openiis-radio-button>

<!-- ❌ Incorrecto: Etiquetas ambiguas -->
<openiis-radio-button label="Opción 1" name="envio" value="1"></openiis-radio-button>
```
