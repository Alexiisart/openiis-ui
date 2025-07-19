# Confirm Modal

Modal de confirmación para acciones importantes con botones de confirmar y cancelar.

## 📦 Instalación

```typescript
import { OpeniisConfirmModalComponent, OpeniisButtonComponent } from 'openiis-ui';

@Component({
  imports: [OpeniisConfirmModalComponent, OpeniisButtonComponent],
})
```

## ⚙️ Properties

| Property      | Tipo                  | Default       | Descripción              |
| ------------- | --------------------- | ------------- | ------------------------ |
| `isVisible`   | `boolean`             | `false`       | Controla la visibilidad  |
| `data`        | `ConfirmData \| null` | `null`        | Configuración del modal  |
| `buttonLeft`  | `ButtonVariant`       | `'secondary'` | Tipo del botón izquierdo |
| `buttonRight` | `ButtonVariant`       | `'primary'`   | Tipo del botón derecho   |

## 📡 Events

| Event         | Tipo   | Descripción                       |
| ------------- | ------ | --------------------------------- |
| `confirmed`   | `void` | Emitido al confirmar              |
| `cancelled`   | `void` | Emitido al cancelar               |
| `thirdAction` | `void` | Emitido al presionar tercer botón |

## 🎨 Tipos de Botones

| Tipo        | Color   | Uso               |
| ----------- | ------- | ----------------- |
| `primary`   | Azul    | Acción principal  |
| `secondary` | Gris    | Acción secundaria |
| `success`   | Verde   | Confirmación      |
| `danger`    | Rojo    | Eliminación       |
| `warning`   | Naranja | Advertencia       |

## 💡 Ejemplos Prácticos

### 1. Confirmación Básica

```html
<openiis-confirm-modal [isVisible]="showConfirm" [data]="confirmData" (confirmed)="onConfirmed()" (cancelled)="onCancelled()"> </openiis-confirm-modal>

<openiis-button text="Delete Item" type="danger" (clickEvent)="action()"> </openiis-button>
```

```typescript
export class MyComponent {
  showConfirm = false;

  confirmData: any = {
    title: "Eliminar elemento",
    message: "¿Estás seguro de que quieres eliminar este elemento?",
    confirmText: "Eliminar",
    cancelText: "Cancelar",
  };

  action() {
    this.showConfirm = true;
    console.log(this.confirmData);
  }

  onConfirmed() {
    console.log("Confirmed!");
    this.deleteItem();
    this.showConfirm = false;
  }

  onCancelled() {
    console.log("Cancelled!");
    this.showConfirm = false;
  }

  deleteItem() {
    // Lógica para eliminar
  }
}
```

### 2. Confirmación con Botones Personalizados

```html
<openiis-confirm-modal [isVisible]="showCustomConfirm" [data]="customConfirmData" [buttonLeft]="'danger'" [buttonRight]="'success'" (confirmed)="onCustomConfirmed()" (cancelled)="onCustomCancelled()"> </openiis-confirm-modal>

<openiis-button text="Save Changes" type="primary" (clickEvent)="customAction()"> </openiis-button>
```

```typescript
export class MyComponent {
  showCustomConfirm = false;

  customConfirmData: any = {
    title: "Guardar cambios",
    message: "¿Quieres guardar los cambios realizados?",
    confirmText: "Guardar",
    cancelText: "Descartar",
  };

  customAction() {
    this.showCustomConfirm = true;
  }

  onCustomConfirmed() {
    this.saveChanges();
    this.showCustomConfirm = false;
  }

  onCustomCancelled() {
    this.discardChanges();
    this.showCustomConfirm = false;
  }
}
```

### 3. Modal con Tercer Botón

```html
<openiis-confirm-modal [isVisible]="showThreeOptions" [data]="threeOptionsData" [buttonLeft]="'secondary'" [buttonRight]="'primary'" (confirmed)="onSave()" (cancelled)="onCancel()" (thirdAction)="onPreview()"> </openiis-confirm-modal>

<openiis-button text="Edit Document" type="primary" (clickEvent)="threeOptionsAction()"> </openiis-button>
```

```typescript
export class MyComponent {
  showThreeOptions = false;

  threeOptionsData: any = {
    title: "Editar documento",
    message: "¿Qué quieres hacer con el documento?",
    confirmText: "Guardar",
    cancelText: "Cancelar",
    thirdButtonText: "Vista previa",
  };

  threeOptionsAction() {
    this.showThreeOptions = true;
  }

  onSave() {
    this.saveDocument();
    this.showThreeOptions = false;
  }

  onCancel() {
    this.showThreeOptions = false;
  }

  onPreview() {
    this.previewDocument();
    this.showThreeOptions = false;
  }
}
```

### 4. Servicio de Confirmación

```typescript
// confirm.service.ts
@Injectable({ providedIn: "root" })
export class ConfirmService {
  private confirmSubject = new BehaviorSubject(null);
  public confirm$ = this.confirmSubject.asObservable();

  showDelete(message, title = "Eliminar elemento") {
    this.confirmSubject.next({
      title,
      message,
      confirmText: "Eliminar",
      cancelText: "Cancelar",
    });
  }

  showSave(message, title = "Guardar cambios") {
    this.confirmSubject.next({
      title,
      message,
      confirmText: "Guardar",
      cancelText: "Cancelar",
    });
  }

  showCustom(data) {
    this.confirmSubject.next(data);
  }

  close() {
    this.confirmSubject.next(null);
  }
}
```

```html
<openiis-confirm-modal [isVisible]="showConfirm" [data]="confirmData" (confirmed)="onConfirmed()" (cancelled)="onCancelled()"> </openiis-confirm-modal>

<openiis-button text="Delete Item" type="danger" (clickEvent)="deleteItem()"> </openiis-button>

<openiis-button text="Save Changes" type="success" (clickEvent)="saveChanges()"> </openiis-button>
```

```typescript
export class MyComponent {
  confirmData: any = null;
  showConfirm = false;

  constructor(private confirmService: ConfirmService) {}

  ngOnInit() {
    this.confirmService.confirm$.subscribe((confirm) => {
      this.confirmData = confirm;
      this.showConfirm = !!confirm;
    });
  }

  deleteItem() {
    this.confirmService.showDelete("¿Eliminar este elemento?");
  }

  saveChanges() {
    this.confirmService.showSave("¿Guardar los cambios?");
  }

  onConfirmed() {
    console.log("Action confirmed!");
    this.showConfirm = false;
    this.confirmService.close();
  }

  onCancelled() {
    console.log("Action cancelled!");
    this.showConfirm = false;
    this.confirmService.close();
  }
}
```

## 🏗️ Interfaces

```typescript
interface ConfirmData {
  message: string; // Mensaje de confirmación
  title: string; // Título del modal
  confirmText: string; // Texto del botón de confirmación
  cancelText: string; // Texto del botón de cancelación
  thirdButtonText?: string; // Texto del tercer botón (opcional)
}
```

## ⚡ Comportamiento

- **Cierre manual**: Clic overlay, botón X, botones de acción
- **Botones configurables**: Tipos y textos personalizables
- **Tercer botón opcional**: Para modales con 3 opciones
- **Eventos separados**: confirmed, cancelled, thirdAction

## ✅ Características

- ✅ Confirmación y cancelación
- ✅ Botones personalizables
- ✅ Tercer botón opcional
- ✅ Tipos de botón configurables
- ✅ Cierre por overlay
- ✅ Completamente responsive
- ✅ Integración con temas Openiis UI
- ✅ Accesibilidad incluida

## 🚨 Solución de Problemas

| Problema                 | Solución                                                  |
| ------------------------ | --------------------------------------------------------- |
| Modal no se muestra      | Verifica `isVisible = true` y `data` no null              |
| Botones no aparecen      | Verifica que `confirmText` y `cancelText` estén definidos |
| Estilos no se aplican    | Asegúrate de que el tema Openiis UI esté configurado      |
| Tercer botón no funciona | Verifica que `thirdButtonText` esté definido en `data`    |

## 🐞 Reportar Problemas

Si encuentras algún problema en la lógica del componente, por favor
[🐞Reportalo](https://github.com/Alexiisart/openiis-ui/issues/new)
