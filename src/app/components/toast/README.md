# Toast Component

## Descripción

El componente `ToastComponent` es una notificación temporal que aparece en la parte superior derecha de la pantalla. Ideal para mostrar mensajes de éxito, error, advertencia o información que desaparecen automáticamente después de un tiempo determinado.

## Características

- ✅ 4 tipos de toast: success, warning, danger, info
- ✅ Duración configurable o personalizada
- ✅ Animaciones suaves de entrada y salida
- ✅ Posicionamiento fijo en la esquina superior derecha
- ✅ Cierre automático con temporizador
- ✅ Múltiples instancias simultáneas
- ✅ Completamente responsive

## Uso Básico

```html
<app-toast [isVisible]="showToast" [data]="toastData" (closed)="onToastClosed()"> </app-toast>
```

## Props

| Prop        | Tipo                | Defecto | Descripción                       |
| ----------- | ------------------- | ------- | --------------------------------- |
| `isVisible` | `boolean`           | `false` | Controla la visibilidad del toast |
| `data`      | `ToastData \| null` | `null`  | Datos de configuración del toast  |

## Eventos

| Evento   | Tipo   | Descripción                       |
| -------- | ------ | --------------------------------- |
| `closed` | `void` | Emitido cuando se cierra el toast |

## Interfaz ToastData

```typescript
export interface ToastData {
  message: string; // Mensaje del toast
  type?: "success" | "warning" | "danger" | "info"; // Tipo de toast (opcional, por defecto 'info')
  duration?: number; // Duración en milisegundos (opcional, por defecto 3000ms)
}
```

## Tipos de Toast

| Tipo      | Color   | Uso                   |
| --------- | ------- | --------------------- |
| `success` | Verde   | Operaciones exitosas  |
| `warning` | Naranja | Advertencias y avisos |
| `danger`  | Rojo    | Errores y fallos      |
| `info`    | Azul    | Información general   |

## Ejemplos

### Toast de éxito

```typescript
// En el componente
successToast: ToastData = {
  message: 'Elemento guardado correctamente',
  type: 'success',
  duration: 3000
};

showSuccessToast = false;

saveItem() {
  this.itemService.save(this.item).subscribe({
    next: () => {
      this.showSuccessToast = true;
    },
    error: (error) => {
      this.handleError(error);
    }
  });
}

onToastClosed() {
  this.showSuccessToast = false;
}
```

```html
<app-toast [isVisible]="showSuccessToast" [data]="successToast" (closed)="onToastClosed()"> </app-toast>
```

### Toast de error

```typescript
errorToast: ToastData = {
  message: 'Error al procesar la solicitud. Inténtalo de nuevo.',
  type: 'danger',
  duration: 5000 // Más tiempo para errores
};

showErrorToast = false;

handleError(error: any) {
  console.error('Error:', error);
  this.showErrorToast = true;
}
```

### Toast de advertencia

```typescript
warningToast: ToastData = {
  message: 'Algunos cambios no se guardaron automáticamente',
  type: 'warning',
  duration: 4000
};

showWarningToast = false;

checkAutoSave() {
  if (this.hasUnsavedChanges()) {
    this.showWarningToast = true;
  }
}
```

### Toast de información

```typescript
infoToast: ToastData = {
  message: 'Nueva versión disponible. Actualiza para obtener las mejoras.',
  type: 'info',
  duration: 6000
};

showInfoToast = false;

checkVersion() {
  this.versionService.checkUpdates().subscribe(hasUpdate => {
    if (hasUpdate) {
      this.showInfoToast = true;
    }
  });
}
```

## Ejemplos de Uso Común

### Sistema de notificaciones

```typescript
// En el componente
currentToast: ToastData | null = null;
showToast = false;

showNotification(message: string, type: 'success' | 'warning' | 'danger' | 'info' = 'info', duration = 3000) {
  this.currentToast = { message, type, duration };
  this.showToast = true;
}

onToastClosed() {
  this.showToast = false;
  this.currentToast = null;
}

// Métodos de conveniencia
showSuccess(message: string) {
  this.showNotification(message, 'success');
}

showError(message: string) {
  this.showNotification(message, 'danger', 5000);
}

showWarning(message: string) {
  this.showNotification(message, 'warning', 4000);
}

showInfo(message: string) {
  this.showNotification(message, 'info');
}
```

### Operaciones CRUD

```typescript
// En el componente
createItem(item: any) {
  this.itemService.create(item).subscribe({
    next: () => {
      this.showSuccess('Elemento creado exitosamente');
      this.loadItems();
    },
    error: () => {
      this.showError('Error al crear el elemento');
    }
  });
}

updateItem(item: any) {
  this.itemService.update(item).subscribe({
    next: () => {
      this.showSuccess('Elemento actualizado correctamente');
      this.loadItems();
    },
    error: () => {
      this.showError('Error al actualizar el elemento');
    }
  });
}

deleteItem(id: string) {
  this.itemService.delete(id).subscribe({
    next: () => {
      this.showSuccess('Elemento eliminado correctamente');
      this.loadItems();
    },
    error: () => {
      this.showError('Error al eliminar el elemento');
    }
  });
}
```

### Validación de formularios

```typescript
// En el componente
validateForm() {
  if (!this.form.valid) {
    const errors = this.getFormErrors();
    this.showError(`Error en el formulario: ${errors.join(', ')}`);
    return false;
  }
  return true;
}

saveForm() {
  if (this.validateForm()) {
    this.formService.save(this.form.value).subscribe({
      next: () => {
        this.showSuccess('Formulario guardado correctamente');
        this.form.reset();
      },
      error: () => {
        this.showError('Error al guardar el formulario');
      }
    });
  }
}
```

## Servicio de Toast (Recomendado)

Para un uso más eficiente, recomendamos crear un servicio centralizado:

```typescript
// toast.service.ts
import { Injectable } from "@angular/core";
import { BehaviorSubject } from "rxjs";

@Injectable({
  providedIn: "root",
})
export class ToastService {
  private toastSubject = new BehaviorSubject<{ data: ToastData; show: boolean } | null>(null);
  public toast$ = this.toastSubject.asObservable();

  showSuccess(message: string, duration = 3000) {
    this.show({ message, type: "success", duration });
  }

  showError(message: string, duration = 5000) {
    this.show({ message, type: "danger", duration });
  }

  showWarning(message: string, duration = 4000) {
    this.show({ message, type: "warning", duration });
  }

  showInfo(message: string, duration = 3000) {
    this.show({ message, type: "info", duration });
  }

  private show(data: ToastData) {
    this.toastSubject.next({ data, show: true });
  }

  hide() {
    this.toastSubject.next(null);
  }
}
```

```typescript
// En el componente principal (app.component.ts)
export class AppComponent {
  toastData: ToastData | null = null;
  showToast = false;

  constructor(private toastService: ToastService) {}

  ngOnInit() {
    this.toastService.toast$.subscribe((toast) => {
      if (toast) {
        this.toastData = toast.data;
        this.showToast = toast.show;
      } else {
        this.showToast = false;
      }
    });
  }

  onToastClosed() {
    this.toastService.hide();
  }
}
```

```html
<!-- En app.component.html -->
<app-toast [isVisible]="showToast" [data]="toastData" (closed)="onToastClosed()"> </app-toast>
```

```typescript
// Uso en cualquier componente
constructor(private toastService: ToastService) {}

saveData() {
  this.dataService.save(this.data).subscribe({
    next: () => {
      this.toastService.showSuccess('Datos guardados correctamente');
    },
    error: () => {
      this.toastService.showError('Error al guardar los datos');
    }
  });
}
```

## Duraciones Recomendadas

| Tipo      | Duración    | Razón                 |
| --------- | ----------- | --------------------- |
| `success` | 2000-3000ms | Confirmación rápida   |
| `info`    | 3000-4000ms | Información moderada  |
| `warning` | 4000-5000ms | Requiere más atención |
| `danger`  | 5000-6000ms | Errores importantes   |

## Múltiples Toasts

Para mostrar múltiples toasts simultáneamente:

```typescript
// toast-manager.service.ts
@Injectable({
  providedIn: "root",
})
export class ToastManagerService {
  private toasts: Array<{ id: string; data: ToastData; show: boolean }> = [];
  private toastsSubject = new BehaviorSubject<Array<{ id: string; data: ToastData; show: boolean }>>(this.toasts);
  public toasts$ = this.toastsSubject.asObservable();

  show(data: ToastData) {
    const id = this.generateId();
    this.toasts.push({ id, data, show: true });
    this.toastsSubject.next([...this.toasts]);

    // Auto-remover después de la duración
    setTimeout(() => {
      this.remove(id);
    }, data.duration || 3000);
  }

  remove(id: string) {
    this.toasts = this.toasts.filter((toast) => toast.id !== id);
    this.toastsSubject.next([...this.toasts]);
  }

  private generateId(): string {
    return Math.random().toString(36).substr(2, 9);
  }
}
```

## Posicionamiento

El toast se posiciona automáticamente en:

- **Desktop**: Esquina superior derecha con margen de 20px
- **Mobile**: Centrado horizontalmente en la parte superior

## Animaciones

El componente incluye animaciones CSS:

- **Entrada**: slideIn desde la derecha
- **Salida**: slideOut hacia la derecha
- **Duración**: 300ms con ease

## Dependencias

- `@angular/common`

## Estilos CSS

El componente incluye estilos CSS inline que soportan:

- Posicionamiento fijo
- Colores diferenciados por tipo
- Animaciones suaves
- Sombras y bordes redondeados
- Responsive design

## Notas

- El toast se cierra automáticamente después de la duración especificada
- Se puede usar múltiples instancias simultáneamente
- Es compatible con todos los navegadores modernos
- Los colores se adaptan al sistema de diseño
- Es completamente accesible para lectores de pantalla
