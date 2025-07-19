# Modal

Modal reutilizable para entrada de texto con campo de texto y botones de confirmación/cancelación.

## 📦 Instalación

```typescript
import { OpeniisModalComponent, OpeniisButtonComponent } from 'openiis-ui';

@Component({
  imports: [OpeniisModalComponent, OpeniisButtonComponent],
})
```

## ⚙️ Properties

| Property    | Tipo                | Default | Descripción                 |
| ----------- | ------------------- | ------- | --------------------------- |
| `isVisible` | `boolean`           | `false` | Controla la visibilidad     |
| `data`      | `ModalData \| null` | `null`  | Configuración del modal     |
| `minLength` | `boolean`           | `false` | Si requiere longitud mínima |

## 📡 Events

| Event       | Tipo     | Descripción                       |
| ----------- | -------- | --------------------------------- |
| `confirmed` | `string` | Emitido al confirmar con el valor |
| `closed`    | `void`   | Emitido al cerrar el modal        |

## 💡 Ejemplos Prácticos

### 1. Modal Básico

```html
<openiis-modal [isVisible]="showModal" [data]="modalData" (confirmed)="onConfirmed($event)" (closed)="onClosed()"> </openiis-modal>

<openiis-button text="Open Modal" type="primary" (clickEvent)="openModal()"> </openiis-button>
```

```typescript
export class MyComponent {
  showModal = false;

  modalData: any = {
    title: "Agregar tarea",
    label: "Descripción:",
    placeholder: "Escribe la descripción de la tarea...",
    confirmButtonText: "Agregar",
    cancelButtonText: "Cancelar",
  };

  openModal() {
    this.showModal = true;
  }

  onConfirmed(value: string) {
    console.log("Valor confirmado:", value);
    this.addTask(value);
  }

  onClosed() {
    this.showModal = false;
  }

  addTask(description: string) {
    // Lógica para agregar tarea
  }
}
```

### 2. Modal con Valor Inicial

```html
<openiis-modal [isVisible]="showEditModal" [data]="editModalData" (confirmed)="onEditConfirmed($event)" (closed)="onEditClosed()"> </openiis-modal>

<openiis-button text="Edit Item" type="warning" (clickEvent)="editItem()"> </openiis-button>
```

```typescript
export class MyComponent {
  showEditModal = false;

  editModalData: any = {
    title: "Editar elemento",
    label: "Nuevo nombre:",
    placeholder: "Escribe el nuevo nombre...",
    currentValue: "Elemento actual",
    confirmButtonText: "Guardar",
    cancelButtonText: "Cancelar",
  };

  editItem() {
    this.showEditModal = true;
  }

  onEditConfirmed(value: string) {
    console.log("Valor editado:", value);
    this.updateItem(value);
  }

  onEditClosed() {
    this.showEditModal = false;
  }

  updateItem(newName: string) {
    // Lógica para actualizar elemento
  }
}
```

### 3. Modal con Longitud Mínima

```html
<openiis-modal [isVisible]="showMinLengthModal" [data]="minLengthModalData" [minLength]="true" (confirmed)="onMinLengthConfirmed($event)" (closed)="onMinLengthClosed()"> </openiis-modal>

<openiis-button text="Add Comment" type="success" (clickEvent)="addComment()"> </openiis-button>
```

```typescript
export class MyComponent {
  showMinLengthModal = false;

  minLengthModalData: any = {
    title: "Agregar comentario",
    label: "Comentario:",
    placeholder: "Escribe tu comentario (mínimo 10 caracteres)...",
    confirmButtonText: "Publicar",
    cancelButtonText: "Cancelar",
  };

  addComment() {
    this.showMinLengthModal = true;
  }

  onMinLengthConfirmed(value: string) {
    console.log("Comentario:", value);
    this.publishComment(value);
  }

  onMinLengthClosed() {
    this.showMinLengthModal = false;
  }

  publishComment(comment: string) {
    // Lógica para publicar comentario
  }
}
```

### 4. Servicio de Modal

```typescript
// modal.service.ts
@Injectable({ providedIn: "root" })
export class ModalService {
  private modalSubject = new BehaviorSubject(null);
  public modal$ = this.modalSubject.asObservable();

  showAdd(title = "Agregar elemento", label = "Descripción:", placeholder = "Escribe aquí...") {
    this.modalSubject.next({
      title,
      label,
      placeholder,
      confirmButtonText: "Agregar",
      cancelButtonText: "Cancelar",
    });
  }

  showEdit(title = "Editar elemento", label = "Nuevo valor:", placeholder = "Escribe aquí...", currentValue = "") {
    this.modalSubject.next({
      title,
      label,
      placeholder,
      currentValue,
      confirmButtonText: "Guardar",
      cancelButtonText: "Cancelar",
    });
  }

  showCustom(data) {
    this.modalSubject.next(data);
  }

  close() {
    this.modalSubject.next(null);
  }
}
```

```html
<openiis-modal [isVisible]="showModal" [data]="modalData" (confirmed)="onModalConfirmed($event)" (closed)="onModalClosed()"> </openiis-modal>

<openiis-button text="Add Task" type="primary" (clickEvent)="addTask()"> </openiis-button>

<openiis-button text="Edit Task" type="warning" (clickEvent)="editTask()"> </openiis-button>

<openiis-button text="Custom Modal" type="success" (clickEvent)="customModal()"> </openiis-button>
```

```typescript
export class MyComponent {
  modalData: any = null;
  showModal = false;

  constructor(private modalService: ModalService) {}

  ngOnInit() {
    this.modalService.modal$.subscribe((modal) => {
      this.modalData = modal;
      this.showModal = !!modal;
    });
  }

  addTask() {
    this.modalService.showAdd("Nueva tarea", "Descripción:", "Describe la tarea...");
  }

  editTask() {
    this.modalService.showEdit("Editar tarea", "Nueva descripción:", "Describe la tarea...", "Tarea actual");
  }

  customModal() {
    this.modalService.showCustom({
      title: "Modal personalizado",
      label: "Campo personalizado:",
      placeholder: "Escribe algo...",
      confirmButtonText: "Aceptar",
      cancelButtonText: "Rechazar",
    });
  }

  onModalConfirmed(value: string) {
    console.log("Valor del modal:", value);
    this.showModal = false;
    this.modalService.close();
  }

  onModalClosed() {
    this.showModal = false;
    this.modalService.close();
  }
}
```

## 🏗️ Interfaces

```typescript
interface ModalData {
  title: string; // Título del modal
  label: string; // Etiqueta del campo de entrada
  placeholder: string; // Texto placeholder del campo
  currentValue?: string; // Valor actual del campo (opcional)
  isTextarea?: boolean; // Si debe mostrarse como textarea (opcional, default true)
  confirmButtonText?: string; // Texto del botón de confirmación (opcional, default "Agregar")
  cancelButtonText?: string; // Texto del botón de cancelación (opcional, default "Cancelar")
}
```

## ⚡ Comportamiento

- **Cierre manual**: Clic overlay, botón X, botón Cancelar, Escape
- **Confirmación**: Enter sin Shift, botón Confirmar
- **Validación**: Campo no puede estar vacío (a menos que minLength=true)
- **Valor inicial**: Se puede pre-cargar con currentValue
- **Textarea**: Campo de texto multilínea por defecto

## ✅ Características

- ✅ Campo de texto multilínea
- ✅ Validación de longitud mínima
- ✅ Valor inicial configurable
- ✅ Botones personalizables
- ✅ Cierre por overlay y teclado
- ✅ Completamente responsive
- ✅ Integración con temas Openiis UI
- ✅ Accesibilidad incluida
- ✅ Servicio opcional para gestión centralizada

## 🚨 Solución de Problemas

| Problema                | Solución                                                     |
| ----------------------- | ------------------------------------------------------------ |
| Modal no se muestra     | Verifica `isVisible = true` y `data` no null                 |
| Campo vacío no confirma | Verifica que el campo no esté vacío o usa `minLength = true` |
| Estilos no se aplican   | Asegúrate de que el tema Openiis UI esté configurado         |
| Valor no se carga       | Verifica que `currentValue` esté definido en `data`          |

## 🐞 Reportar Problemas

Si encuentras algún problema en la lógica del componente, por favor
[🐞Reportalo](https://github.com/Alexiisart/openiis-ui/issues/new)
