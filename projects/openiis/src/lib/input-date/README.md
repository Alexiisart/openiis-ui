# Date Input

Componente de input de fecha elegante y reutilizable con selector de fecha nativo, validación de fechas vencidas y múltiples tamaños.

## 📦 Instalación

```typescript
import { OpeniisDateInputComponent } from 'openiis-ui';

@Component({
  imports: [OpeniisDateInputComponent],
})
```

## ⚙️ Properties

| Property      | Tipo                   | Default        | Descripción                  |
| ------------- | ---------------------- | -------------- | ---------------------------- |
| `inputId`     | `string`               | `'date-input'` | ID único del input           |
| `placeholder` | `string`               | `''`           | Texto del placeholder        |
| `value`       | `string \| null`       | `null`         | Valor del input (ISO string) |
| `size`        | `'sm' \| 'md' \| 'lg'` | `'md'`         | Tamaño del input             |
| `disabled`    | `boolean`              | `false`        | Deshabilitar input           |
| `minDate`     | `string \| null`       | `null`         | Fecha mínima permitida       |
| `title`       | `string`               | `''`           | Texto del tooltip            |
| `markOverdue` | `boolean`              | `false`        | Marcar fechas vencidas       |

## 📡 Events

| Event         | Tipo             | Descripción                    |
| ------------- | ---------------- | ------------------------------ |
| `valueChange` | `string \| null` | Emitido cuando cambia la fecha |

## 📏 Tamaños

| Tamaño | Max-width | Padding | Font-size | Uso               |
| ------ | --------- | ------- | --------- | ----------------- |
| `sm`   | 200px     | 4px     | 12px      | Compacto          |
| `md`   | 250px     | 8px     | 14px      | Mediano (default) |
| `lg`   | 300px     | 12px    | 16px      | Grande            |

## 💡 Ejemplos Prácticos

### 1. Date Input Básico

```html
<openiis-date-input label="Fecha de nacimiento" placeholder="Selecciona una fecha" [value]="birthDate" (valueChange)="onBirthDateChange($event)"> </openiis-date-input>
```

```typescript
export class MyComponent {
  birthDate: string | null = null;

  onBirthDateChange(date: string | null) {
    this.birthDate = date;
    console.log("Birth date changed:", date);
  }
}
```

### 2. Date Input con Fecha Mínima

```html
<openiis-date-input label="Fecha de inicio" placeholder="Selecciona fecha de inicio" [value]="startDate" [minDate]="today" (valueChange)="onStartDateChange($event)"> </openiis-date-input>
```

```typescript
export class MyComponent {
  startDate: string | null = null;
  today = new Date().toISOString().split("T")[0]; // YYYY-MM-DD

  onStartDateChange(date: string | null) {
    this.startDate = date;
    console.log("Start date:", date);
  }
}
```

### 3. Date Input con Diferentes Tamaños

```html
<openiis-date-input label="Fecha pequeña" size="sm" [value]="smallDate" (valueChange)="onSmallDateChange($event)"> </openiis-date-input>

<openiis-date-input label="Fecha mediana" size="md" [value]="mediumDate" (valueChange)="onMediumDateChange($event)"> </openiis-date-input>

<openiis-date-input label="Fecha grande" size="lg" [value]="largeDate" (valueChange)="onLargeDateChange($event)"> </openiis-date-input>
```

```typescript
export class MyComponent {
  smallDate: string | null = null;
  mediumDate: string | null = null;
  largeDate: string | null = null;

  onSmallDateChange(date: string | null) {
    this.smallDate = date;
  }

  onMediumDateChange(date: string | null) {
    this.mediumDate = date;
  }

  onLargeDateChange(date: string | null) {
    this.largeDate = date;
  }
}
```

### 4. Date Input con Estados Avanzados

```html
<openiis-date-input label="Fecha de vencimiento" placeholder="Selecciona fecha de vencimiento" [value]="dueDate" [markOverdue]="true" title="Las fechas vencidas se marcarán en rojo" (valueChange)="onDueDateChange($event)"> </openiis-date-input>

<openiis-date-input label="Fecha deshabilitada" [value]="disabledDate" [disabled]="true" title="Esta fecha no se puede cambiar"> </openiis-date-input>
```

```typescript
export class MyComponent {
  dueDate: string | null = null;
  disabledDate = "2024-01-15T00:00:00.000Z";

  onDueDateChange(date: string | null) {
    this.dueDate = date;
    console.log("Due date:", date);
  }
}
```

### 5. Date Input con Formulario Reactivo

```html
<form [formGroup]="eventForm">
  <openiis-date-input label="Fecha del evento" placeholder="Selecciona la fecha del evento" formControlName="eventDate" [minDate]="today" title="La fecha debe ser futura"> </openiis-date-input>

  <openiis-date-input label="Fecha de registro" placeholder="Fecha de registro" formControlName="registrationDate" [disabled]="true"> </openiis-date-input>
</form>
```

```typescript
import { FormBuilder, FormGroup } from "@angular/forms";

export class MyComponent {
  eventForm: FormGroup;
  today = new Date().toISOString().split("T")[0];

  constructor(private fb: FormBuilder) {
    this.eventForm = this.fb.group({
      eventDate: [null],
      registrationDate: [new Date().toISOString()],
    });
  }
}
```

### 6. Date Input para Reservas

```html
<openiis-date-input label="Fecha de llegada" placeholder="Selecciona fecha de llegada" [value]="checkInDate" [minDate]="today" title="Fecha de llegada al hotel" (valueChange)="onCheckInChange($event)"> </openiis-date-input>

<openiis-date-input label="Fecha de salida" placeholder="Selecciona fecha de salida" [value]="checkOutDate" [minDate]="checkInDate || today" title="Fecha de salida del hotel" (valueChange)="onCheckOutChange($event)"> </openiis-date-input>
```

```typescript
export class MyComponent {
  checkInDate: string | null = null;
  checkOutDate: string | null = null;
  today = new Date().toISOString().split("T")[0];

  onCheckInChange(date: string | null) {
    this.checkInDate = date;
    // Si la fecha de salida es anterior a la de llegada, limpiarla
    if (this.checkOutDate && date && this.checkOutDate < date) {
      this.checkOutDate = null;
    }
  }

  onCheckOutChange(date: string | null) {
    this.checkOutDate = date;
  }
}
```

### 7. Date Input para Tareas

```html
<openiis-date-input label="Fecha límite" placeholder="Selecciona fecha límite" [value]="deadline" [markOverdue]="true" title="Las fechas vencidas se mostrarán en rojo" (valueChange)="onDeadlineChange($event)"> </openiis-date-input>
```

```typescript
export class MyComponent {
  deadline: string | null = null;

  onDeadlineChange(date: string | null) {
    this.deadline = date;

    if (date) {
      const deadlineDate = new Date(date);
      const today = new Date();

      if (deadlineDate < today) {
        console.log("⚠️ La fecha límite está vencida");
      } else {
        console.log("✅ La fecha límite está vigente");
      }
    }
  }
}
```

### 8. Date Input con Validación Personalizada

```html
<openiis-date-input label="Fecha de contratación" placeholder="Selecciona fecha de contratación" [value]="hireDate" [minDate]="minHireDate" title="La fecha debe ser posterior al 2020" (valueChange)="onHireDateChange($event)"> </openiis-date-input>
```

```typescript
export class MyComponent {
  hireDate: string | null = null;
  minHireDate = "2020-01-01"; // Fecha mínima de contratación

  onHireDateChange(date: string | null) {
    this.hireDate = date;

    if (date) {
      const hireDateObj = new Date(date);
      const minDate = new Date(this.minHireDate);

      if (hireDateObj < minDate) {
        console.log("❌ La fecha debe ser posterior al 2020");
        this.hireDate = null;
      } else {
        console.log("✅ Fecha de contratación válida");
      }
    }
  }
}
```

### 9. Date Input para Eventos

```html
<openiis-date-input label="Fecha del evento" placeholder="Selecciona fecha del evento" [value]="eventDate" [minDate]="today" title="La fecha debe ser futura" (valueChange)="onEventDateChange($event)"> </openiis-date-input>
```

```typescript
export class MyComponent {
  eventDate: string | null = null;
  today = new Date().toISOString().split("T")[0];

  onEventDateChange(date: string | null) {
    this.eventDate = date;

    if (date) {
      const eventDateObj = new Date(date);
      const todayObj = new Date();

      const daysUntilEvent = Math.ceil((eventDateObj.getTime() - todayObj.getTime()) / (1000 * 60 * 60 * 24));

      if (daysUntilEvent > 0) {
        console.log(`📅 El evento será en ${daysUntilEvent} días`);
      } else if (daysUntilEvent === 0) {
        console.log("🎉 ¡El evento es hoy!");
      } else {
        console.log("❌ La fecha debe ser futura");
      }
    }
  }
}
```

## 🏗️ Interfaces

```typescript
type DateInputSize = "sm" | "md" | "lg";

interface DateInputValue {
  value: string | null; // ISO string o null
}
```

## ⚡ Comportamiento

- **Selector nativo**: Usa el selector de fecha del navegador
- **Formato ISO**: Maneja fechas en formato ISO string
- **Validación de fechas vencidas**: Marca fechas anteriores a hoy
- **Fecha mínima**: Restringe fechas anteriores a una fecha específica
- **Tooltip**: Muestra información adicional al hacer hover
- **Botón de limpiar**: Permite eliminar la fecha seleccionada
- **Responsive**: Se adapta automáticamente en móviles

## ✅ Características

- ✅ 3 tamaños configurables
- ✅ Selector de fecha nativo
- ✅ Validación de fechas vencidas
- ✅ Fecha mínima configurable
- ✅ Botón de limpiar fecha
- ✅ Tooltip informativo
- ✅ Estados disabled
- ✅ Formato ISO string
- ✅ Completamente responsive
- ✅ Icono de calendario personalizado
- ✅ Estados visuales (vencido)
- ✅ Accesibilidad completa

## 🎨 Estilos Automáticos

- **Estados visuales**: Hover, focus, disabled, overdue
- **Icono personalizado**: Calendario Material Icons
- **Botón de limpiar**: Aparece cuando hay fecha seleccionada
- **Responsive**: Tamaños adaptativos en móviles
- **Animaciones**: Transiciones suaves

## 🔧 Funcionalidades Especiales

### Formato de Fechas

- **Entrada**: Formato ISO string (`2024-01-15T00:00:00.000Z`)
- **Salida**: Formato ISO string o `null`
- **Input HTML**: Formato `YYYY-MM-DD`

### Validación de Fechas Vencidas

```typescript
// El componente automáticamente marca fechas vencidas
[markOverdue] = "true"; // Habilita la validación
```

### Fecha Mínima

```typescript
// Restringe fechas anteriores a la fecha especificada
[minDate] = "'2024-01-01'"; // Formato YYYY-MM-DD
```

## 🚨 Solución de Problemas

| Problema                     | Solución                                         |
| ---------------------------- | ------------------------------------------------ |
| Date input no responde       | Verifica que no esté `disabled`                  |
| Fecha no se actualiza        | Verifica el formato ISO string                   |
| Fecha mínima no funciona     | Verifica formato YYYY-MM-DD                      |
| Fechas vencidas no se marcan | Verifica que `markOverdue` esté en `true`        |
| Selector no se abre          | Verifica que el navegador soporte `showPicker()` |
| Estilos no se aplican        | Verifica que el tema Openiis UI esté configurado |

## 🐞 Reportar Problemas

Si encuentras algún problema en la lógica del componente, por favor
[🐞Reportalo](https://github.com/Alexiisart/openiis-ui/issues/new)
