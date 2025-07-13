# OpeniisDateInput Component

## Descripción

El componente `OpeniisDateInputComponent` es un selector de fechas reutilizable y genérico que proporciona una interfaz intuitiva para seleccionar fechas. Incluye un icono de calendario, botón de limpiar y soporte para tooltips. Es completamente independiente sin dependencias externas.

## Características

- ✅ Selector de fecha nativo con icono personalizado
- ✅ Botón de limpiar fecha
- ✅ Validación de fecha mínima
- ✅ Detección automática de fechas vencidas
- ✅ Soporte para tooltips
- ✅ Múltiples tamaños (sm, md, lg)
- ✅ Estados deshabilitado
- ✅ Formato automático de fechas
- ✅ Responsive

## Uso Básico

```html
<openiis-date-input placeholder="Selecciona una fecha" [value]="fechaSeleccionada" (valueChange)="onFechaChange($event)"> </openiis-date-input>
```

## Props

| Prop          | Tipo                   | Defecto        | Descripción                           |
| ------------- | ---------------------- | -------------- | ------------------------------------- |
| `inputId`     | `string`               | `'date-input'` | ID del input de fecha                 |
| `placeholder` | `string`               | `''`           | Texto placeholder del input           |
| `value`       | `string \| null`       | `null`         | Valor del input en formato ISO string |
| `size`        | `'sm' \| 'md' \| 'lg'` | `'md'`         | Tamaño del input                      |
| `disabled`    | `boolean`              | `false`        | Si el input está deshabilitado        |
| `minDate`     | `string \| null`       | `null`         | Fecha mínima permitida en formato ISO |
| `title`       | `string`               | `''`           | Texto del tooltip                     |
| `markOverdue` | `boolean`              | `false`        | Si debe marcar las fechas vencidas    |

## Eventos

| Evento        | Tipo             | Descripción                              |
| ------------- | ---------------- | ---------------------------------------- |
| `valueChange` | `string \| null` | Emitido cuando cambia el valor del input |

## Ejemplos

### Básico

```html
<openiis-date-input placeholder="Fecha de vencimiento" [value]="task.dueDate" (valueChange)="updateTaskDate($event)"> </openiis-date-input>
```

### Con fecha mínima

```html
<openiis-date-input placeholder="Fecha de inicio" [value]="startDate" [minDate]="today" (valueChange)="setStartDate($event)"> </openiis-date-input>
```

### Con tooltip

```html
<openiis-date-input placeholder="Fecha de entrega" [value]="deliveryDate" title="La fecha de entrega no puede ser anterior a mañana" [minDate]="tomorrow" (valueChange)="setDeliveryDate($event)"> </openiis-date-input>
```

### Con detección de fechas vencidas

```html
<openiis-date-input placeholder="Fecha límite" [value]="deadline" [markOverdue]="true" (valueChange)="setDeadline($event)"> </openiis-date-input>
```

### Tamaños diferentes

```html
<!-- Pequeño -->
<openiis-date-input size="sm" placeholder="Fecha pequeña" [value]="smallDate" (valueChange)="setSmallDate($event)"> </openiis-date-input>

<!-- Mediano (defecto) -->
<openiis-date-input size="md" placeholder="Fecha mediana" [value]="mediumDate" (valueChange)="setMediumDate($event)"> </openiis-date-input>

<!-- Grande -->
<openiis-date-input size="lg" placeholder="Fecha grande" [value]="largeDate" (valueChange)="setLargeDate($event)"> </openiis-date-input>
```

### Deshabilitado

```html
<openiis-date-input placeholder="Fecha deshabilitada" [value]="disabledDate" [disabled]="true" (valueChange)="setDisabledDate($event)"> </openiis-date-input>
```

## Funcionalidades Especiales

### Detección de fechas vencidas (opcional)

Cuando `markOverdue` está habilitado, el componente detecta automáticamente si la fecha seleccionada es anterior a la fecha actual y aplica la clase CSS `overdue` para estilos visuales.

### Formato automático

El componente maneja automáticamente la conversión entre:

- Formato ISO (YYYY-MM-DD) para el valor del componente
- Formato de input HTML5 para la visualización

### Funciones internas

El componente incluye funciones internas para:

- Convertir fechas ISO a formato de input HTML
- Convertir valores de input a formato ISO
- Verificar si una fecha está vencida

### Atajos de teclado

- **Enter**: Abre el selector de fecha
- **Escape**: Cierra el selector de fecha

## Dependencias

- `@angular/common`
- `@angular/forms`
- `TooltipComponent`

## Estilos CSS

El componente incluye estilos CSS completos que soportan:

- Diferentes tamaños (sm, md, lg)
- Estados (normal, hover, focus, disabled, overdue)
- Responsive design
- Iconos de Material Icons

## Notas

- El componente requiere Material Icons para los iconos de calendario y limpiar
- La fecha se almacena internamente en formato ISO string
- El componente es totalmente responsive y se adapta a diferentes tamaños de pantalla
- La validación de fecha mínima es opcional y solo se aplica si se proporciona
- Es completamente genérico y no depende de servicios externos
- La detección de fechas vencidas es opcional y se activa con `markOverdue`
