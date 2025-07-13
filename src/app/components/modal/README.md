# Modal Component

## Descripción

El componente `ModalComponent` es un modal reutilizable para entrada de texto que permite mostrar un diálogo modal con un campo de texto y botones de confirmación/cancelación. Ideal para formularios simples, edición de elementos y captura de información del usuario.

## Características

- ✅ Modal con overlay y cierre por clic fuera
- ✅ Campo de texto/textarea configurable
- ✅ Botones de confirmación y cancelación personalizables
- ✅ Soporte para atajos de teclado
- ✅ Validación de longitud mínima opcional
- ✅ Título y placeholder configurables
- ✅ Valor inicial editable
- ✅ Completamente responsive
- ✅ Cierre automático al confirmar

## Uso Básico

```html
<app-modal [isVisible]="showModal" [data]="modalData" (confirmed)="onModalConfirm($event)" (closed)="onModalClose()"> </app-modal>
```

## Props

| Prop        | Tipo                | Defecto | Descripción                               |
| ----------- | ------------------- | ------- | ----------------------------------------- |
| `isVisible` | `boolean`           | `false` | Controla la visibilidad del modal         |
| `data`      | `ModalData \| null` | `null`  | Datos de configuración del modal          |
| `minLength` | `boolean`           | `false` | Si requiere validación de longitud mínima |

## Eventos

| Evento      | Tipo     | Descripción                                         |
| ----------- | -------- | --------------------------------------------------- |
| `confirmed` | `string` | Emitido cuando se confirma con el texto introducido |
| `closed`    | `void`   | Emitido cuando se cierra el modal                   |

## Interfaz ModalData

```typescript
interface ModalData {
  title: string; // Título del modal
  label: string; // Etiqueta del campo de entrada
  placeholder: string; // Texto placeholder del campo
  currentValue?: string; // Valor actual del campo (opcional)
  isTextarea?: boolean; // Si debe mostrarse como textarea (opcional, por defecto true)
  confirmButtonText?: string; // Texto del botón de confirmación (opcional, por defecto "Agregar")
}
```

## Ejemplos

### Modal básico para agregar elemento

```typescript
// En el componente
modalData: ModalData = {
  title: 'Agregar nueva tarea',
  label: 'Descripción:',
  placeholder: 'Escribe la descripción de la tarea...',
  confirmButtonText: 'Agregar'
};

showModal = false;

openModal() {
  this.showModal = true;
}

onModalConfirm(text: string) {
  console.log('Texto confirmado:', text);
  this.showModal = false;
  // Lógica para agregar el elemento
}

onModalClose() {
  this.showModal = false;
}
```

```html
<!-- En el template -->
<app-button text="Agregar Tarea" (clickEvent)="openModal()"> </app-button>

<app-modal [isVisible]="showModal" [data]="modalData" (confirmed)="onModalConfirm($event)" (closed)="onModalClose()"> </app-modal>
```

### Modal para editar elemento existente

```typescript
// En el componente
editModalData: ModalData = {
  title: 'Editar tarea',
  label: 'Descripción:',
  placeholder: 'Modifica la descripción...',
  currentValue: 'Texto actual de la tarea',
  confirmButtonText: 'Guardar cambios'
};

showEditModal = false;

openEditModal(currentText: string) {
  this.editModalData.currentValue = currentText;
  this.showEditModal = true;
}

onEditConfirm(text: string) {
  console.log('Texto editado:', text);
  this.showEditModal = false;
  // Lógica para actualizar el elemento
}
```

```html
<app-modal [isVisible]="showEditModal" [data]="editModalData" (confirmed)="onEditConfirm($event)" (closed)="showEditModal = false"> </app-modal>
```

### Modal con validación de longitud

```typescript
// En el componente
modalWithValidation: ModalData = {
  title: 'Añadir comentario',
  label: 'Comentario:',
  placeholder: 'Escribe tu comentario...',
  confirmButtonText: 'Publicar'
};

showValidationModal = false;

onValidationConfirm(text: string) {
  if (text.length < 10) {
    // Mostrar error - el texto es muy corto
    return;
  }
  // Procesar comentario
  this.showValidationModal = false;
}
```

```html
<app-modal [isVisible]="showValidationModal" [data]="modalWithValidation" [minLength]="true" (confirmed)="onValidationConfirm($event)" (closed)="showValidationModal = false"> </app-modal>
```

### Modal para diferentes tipos de contenido

```typescript
// Modal para notas
notesModalData: ModalData = {
  title: "Agregar nota",
  label: "Nota:",
  placeholder: "Escribe tu nota aquí...",
  confirmButtonText: "Guardar nota",
};

// Modal para feedback
feedbackModalData: ModalData = {
  title: "Enviar feedback",
  label: "Tu opinión:",
  placeholder: "Cuéntanos qué opinas...",
  confirmButtonText: "Enviar feedback",
};

// Modal para descripción de proyecto
projectModalData: ModalData = {
  title: "Descripción del proyecto",
  label: "Descripción:",
  placeholder: "Describe el proyecto...",
  confirmButtonText: "Crear proyecto",
};
```

## Atajos de Teclado

| Tecla             | Acción                        |
| ----------------- | ----------------------------- |
| **Enter**         | Confirma el modal (sin Shift) |
| **Shift + Enter** | Nueva línea en el textarea    |
| **Escape**        | Cierra el modal               |

## Comportamiento

### Cierre del modal

- **Clic en overlay**: Cierra el modal
- **Botón X**: Cierra el modal
- **Botón Cancelar**: Cierra el modal
- **Tecla Escape**: Cierra el modal
- **Confirmación exitosa**: Cierra el modal automáticamente

### Validación

- Si `minLength` es `false`: Solo confirma si el texto no está vacío
- Si `minLength` es `true`: Permite confirmación incluso con texto vacío

### Inicialización

- Si se proporciona `currentValue`, el campo se inicializa con ese valor
- Si no hay `currentValue`, el campo se inicializa vacío

## Dependencias

- `@angular/common`
- `ButtonComponent`
- `InputComponent`

## Estilos CSS

El componente incluye estilos CSS completos que soportan:

- Overlay semitransparente
- Centrado responsivo del modal
- Animaciones de entrada y salida
- Diseño responsivo para móviles
- Botones de acción y cierre

## Notas

- El modal siempre usa un textarea para permitir texto multilínea
- El componente limpia automáticamente el input al cerrarse
- Es completamente responsive y funciona en dispositivos móviles
- Los botones utilizan el sistema de componentes de la librería
- El modal se puede cerrar de múltiples maneras para mejor UX
