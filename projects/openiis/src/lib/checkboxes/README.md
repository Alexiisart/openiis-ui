# CheckboxComponent

Componente de checkbox elegante y reutilizable para la aplicación de checklist.

## Características

- ✅ **7 tipos de estilo diferentes** (default, primary, success, warning, danger, subtle, outline)
- ✅ **5 tamaños predefinidos** (xs, sm, md, lg, xl)
- ✅ **Animaciones fluidas** con efectos de hover y focus
- ✅ **Accesibilidad completa** con ARIA labels y navegación por teclado
- ✅ **Estados avanzados** (disabled, indeterminate, error)
- ✅ **Compatible con reactive forms** (ControlValueAccessor)
- ✅ **Completamente responsivo** con adaptación móvil
- ✅ **Textos de ayuda y error** integrados

## Uso Básico

```typescript
import { CheckboxComponent } from '../shared/atomic/checkboxes';

@Component({
  imports: [CheckboxComponent]
})
```

```html
<!-- Checkbox simple -->
<app-checkbox label="Acepto los términos" [checked]="accepted" (checkedChange)="onAcceptedChange($event)"> </app-checkbox>
```

## Tipos Disponibles

### Default

```html
<app-checkbox type="default" label="Checkbox estándar"></app-checkbox>
```

### Primary

```html
<app-checkbox type="primary" label="Acción principal"></app-checkbox>
```

### Success

```html
<app-checkbox type="success" label="Tarea completada"></app-checkbox>
```

### Warning

```html
<app-checkbox type="warning" label="Requiere atención"></app-checkbox>
```

### Danger

```html
<app-checkbox type="danger" label="Acción crítica"></app-checkbox>
```

### Subtle

```html
<app-checkbox type="subtle" label="Opción sutil"></app-checkbox>
```

### Outline

```html
<app-checkbox type="outline" label="Solo borde"></app-checkbox>
```

## Tamaños

```html
<!-- Extra pequeño -->
<app-checkbox size="xs" label="Muy pequeño"></app-checkbox>

<!-- Pequeño -->
<app-checkbox size="sm" label="Pequeño"></app-checkbox>

<!-- Mediano (default) -->
<app-checkbox size="md" label="Mediano"></app-checkbox>

<!-- Grande -->
<app-checkbox size="lg" label="Grande"></app-checkbox>

<!-- Extra grande -->
<app-checkbox size="xl" label="Muy grande"></app-checkbox>
```

## Estados Especiales

### Disabled

```html
<app-checkbox label="Opción deshabilitada" [disabled]="true"> </app-checkbox>
```

### Indeterminate

```html
<app-checkbox label="Estado indeterminado" [indeterminate]="true"> </app-checkbox>
```

### Con texto de ayuda

```html
<app-checkbox label="Recibir notificaciones" helpText="Recibirás emails sobre actualizaciones importantes"> </app-checkbox>
```

### Con texto de error

```html
<app-checkbox label="Campo requerido" errorText="Debes aceptar para continuar"> </app-checkbox>
```

## Reactive Forms

```typescript
// En el componente
form = this.fb.group({
  acceptTerms: [false, Validators.requiredTrue],
});
```

```html
<form [formGroup]="form">
  <app-checkbox formControlName="acceptTerms" label="Acepto los términos y condiciones" [errorText]="form.get('acceptTerms')?.errors?.['required'] ? 'Debes aceptar para continuar' : ''"> </app-checkbox>
</form>
```

## Propiedades de Entrada

| Propiedad         | Tipo           | Default     | Descripción                |
| ----------------- | -------------- | ----------- | -------------------------- |
| `type`            | `CheckboxType` | `'default'` | Tipo visual del checkbox   |
| `size`            | `CheckboxSize` | `'md'`      | Tamaño del checkbox        |
| `label`           | `string`       | `''`        | Texto de la etiqueta       |
| `helpText`        | `string`       | `''`        | Texto de ayuda             |
| `errorText`       | `string`       | `''`        | Texto de error             |
| `checked`         | `boolean`      | `false`     | Estado checked             |
| `disabled`        | `boolean`      | `false`     | Estado disabled            |
| `indeterminate`   | `boolean`      | `false`     | Estado indeterminate       |
| `inputId`         | `string`       | auto        | ID único del input         |
| `ariaLabel`       | `string`       | `''`        | Etiqueta ARIA              |
| `ariaDescribedBy` | `string`       | `''`        | ID del elemento descriptor |
| `title`           | `string`       | `''`        | Tooltip del checkbox       |
| `extraClasses`    | `string`       | `''`        | Clases CSS adicionales     |

## Eventos de Salida

| Evento          | Tipo      | Descripción                     |
| --------------- | --------- | ------------------------------- |
| `checkedChange` | `boolean` | Emitido cuando cambia el estado |
| `focusEvent`    | `void`    | Emitido en focus                |
| `blurEvent`     | `void`    | Emitido en blur                 |

## Casos de Uso Específicos

### Para Tareas

```html
<app-checkbox type="success" size="lg" [checked]="task.completed" [label]="task.name" (checkedChange)="toggleTask($event)"> </app-checkbox>
```

### Para Subtareas

```html
<app-checkbox type="default" size="sm" [checked]="subtask.completed" [label]="subtask.name" (checkedChange)="toggleSubtask($event)"> </app-checkbox>
```

### Para Selección de Listas

```html
<app-checkbox type="primary" size="md" [checked]="list.selected" [label]="list.name" (checkedChange)="toggleListSelection($event)"> </app-checkbox>
```

### Para Formularios

```html
<app-checkbox type="outline" size="md" label="Suscribirse al newsletter" helpText="Recibirás máximo 1 email por semana" [checked]="subscribed" (checkedChange)="onSubscriptionChange($event)"> </app-checkbox>
```

## Accesibilidad

El componente incluye:

- **Navegación por teclado** (Space para toggle)
- **Etiquetas ARIA** apropiadas
- **Estados focus** visibles
- **Soporte para lectores de pantalla**
- **Área de toque ampliada** en móviles

## Personalización

### Clases CSS adicionales

```html
<app-checkbox extraClasses="my-custom-checkbox special-spacing" label="Checkbox personalizado"> </app-checkbox>
```

### Variables CSS personalizadas

```css
:root {
  --checkbox-border-radius: 6px;
  --checkbox-transition-duration: 0.2s;
}
```

## Responsive

- **Móviles**: Checkboxes más grandes automáticamente (mejor táctil)
- **Área de toque**: Mínimo 44px en móviles
- **Texto**: Se adapta según el tamaño de pantalla

## Migración desde checkboxes nativos

### Antes

```html
<input type="checkbox" [(ngModel)]="checked" /> <label>Mi checkbox</label>
```

### Después

```html
<app-checkbox label="Mi checkbox" [checked]="checked" (checkedChange)="checked = $event"> </app-checkbox>
```
