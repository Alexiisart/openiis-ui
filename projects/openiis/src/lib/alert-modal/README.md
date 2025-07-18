# AlertModal Component

## Descripción

El componente `AlertModalComponent` es un modal de alerta que muestra mensajes informativos al usuario. Soporta diferentes tipos de alerta (success, warning, danger, info) y puede cerrarse automáticamente después de un tiempo determinado.

## Características

- ✅ 4 tipos de alerta: success, warning, danger, info
- ✅ Cierre automático con duración configurable
- ✅ Cierre manual con botón y overlay
- ✅ Títulos automáticos según el tipo
- ✅ Estilos diferenciados por tipo
- ✅ Completamente responsive
- ✅ Fácil de usar con una sola línea

## Uso Básico

```html
<app-alert-modal [isVisible]="showAlert" [data]="alertData" (closed)="onAlertClosed()"> </app-alert-modal>
```

## Props

| Prop        | Tipo                | Defecto | Descripción                         |
| ----------- | ------------------- | ------- | ----------------------------------- |
| `isVisible` | `boolean`           | `false` | Controla la visibilidad del modal   |
| `data`      | `AlertData \| null` | `null`  | Datos de configuración de la alerta |

## Eventos

| Evento   | Tipo   | Descripción                       |
| -------- | ------ | --------------------------------- |
| `closed` | `void` | Emitido cuando se cierra el modal |

## Interfaz AlertData

```typescript
interface AlertData {
  message: string; // Mensaje de la alerta
  type: "success" | "warning" | "danger" | "info"; // Tipo de alerta
  duration?: number; // Duración en milisegundos (opcional)
}
```

## Tipos de Alerta

| Tipo      | Título      | Color   | Uso                  |
| --------- | ----------- | ------- | -------------------- |
| `success` | Éxito       | Verde   | Operaciones exitosas |
| `warning` | Advertencia | Naranja | Avisos importantes   |
| `danger`  | Error       | Rojo    | Errores y fallos     |
| `info`    | Información | Azul    | Información general  |

## Ejemplos

### Alerta de éxito

```typescript
// En el componente
successAlert: AlertData = {
  message: 'La tarea se ha guardado correctamente',
  type: 'success',
  duration: 3000 // Se cierra automáticamente en 3 segundos
};

showSuccessAlert = false;

saveTask() {
  // Lógica para guardar tarea
  this.showSuccessAlert = true;
}

onAlertClosed() {
  this.showSuccessAlert = false;
}
```

```html
<app-alert-modal [isVisible]="showSuccessAlert" [data]="successAlert" (closed)="onAlertClosed()"> </app-alert-modal>
```

### Alerta de advertencia

```typescript
warningAlert: AlertData = {
  message: 'Tienes tareas pendientes que vencen hoy',
  type: 'warning'
  // Sin duration - se cierra manualmente
};

showWarningAlert = false;

checkPendingTasks() {
  if (this.hasPendingTasks()) {
    this.showWarningAlert = true;
  }
}
```

### Alerta de error

```typescript
errorAlert: AlertData = {
  message: 'Error al conectar con el servidor. Inténtalo de nuevo.',
  type: 'danger',
  duration: 5000 // 5 segundos para errores
};

showErrorAlert = false;

handleError(error: any) {
  console.error('Error:', error);
  this.showErrorAlert = true;
}
```

### Alerta de información

```typescript
infoAlert: AlertData = {
  message: 'Recuerda que puedes usar atajos de teclado para navegar más rápido',
  type: 'info',
  duration: 4000
};

showInfoAlert = false;

showTips() {
  this.showInfoAlert = true;
}
```

## Ejemplos de Uso Común

### Confirmación de operaciones

```typescript
// Después de eliminar un elemento
deleteConfirmation: AlertData = {
  message: 'El elemento se ha eliminado correctamente',
  type: 'success',
  duration: 2000
};

deleteItem(id: string) {
  this.itemService.delete(id).subscribe({
    next: () => {
      this.showDeleteConfirmation = true;
    },
    error: (error) => {
      this.handleError(error);
    }
  });
}
```

### Validación de formularios

```typescript
// Validación de campos requeridos
validationAlert: AlertData = {
  message: 'Por favor, completa todos los campos requeridos',
  type: 'warning'
};

validateForm() {
  if (!this.form.valid) {
    this.showValidationAlert = true;
    return false;
  }
  return true;
}
```

### Notificaciones del sistema

```typescript
// Notificación de auto-guardado
autoSaveAlert: AlertData = {
  message: 'Cambios guardados automáticamente',
  type: 'info',
  duration: 1500
};

autoSave() {
  this.saveChanges().then(() => {
    this.showAutoSaveAlert = true;
  });
}
```

## Comportamiento de Cierre

### Cierre automático

- Si se especifica `duration`, el modal se cierra automáticamente después de ese tiempo
- La duración se especifica en milisegundos
- Si no se especifica `duration`, el modal permanece abierto hasta cerrarse manualmente

### Cierre manual

- **Clic en overlay**: Cierra el modal
- **Botón X**: Cierra el modal
- **Botón Aceptar**: Cierra el modal
- **Tecla Escape**: Cierra el modal

## Servicio de Alertas (Recomendado)

Para un uso más eficiente, recomendamos crear un servicio:

```typescript
// alert.service.ts
@Injectable({
  providedIn: "root",
})
export class AlertService {
  private alertSubject = new BehaviorSubject<AlertData | null>(null);
  public alert$ = this.alertSubject.asObservable();

  showSuccess(message: string, duration = 3000) {
    this.alertSubject.next({ message, type: "success", duration });
  }

  showWarning(message: string, duration?: number) {
    this.alertSubject.next({ message, type: "warning", duration });
  }

  showError(message: string, duration = 5000) {
    this.alertSubject.next({ message, type: "danger", duration });
  }

  showInfo(message: string, duration = 4000) {
    this.alertSubject.next({ message, type: "info", duration });
  }

  close() {
    this.alertSubject.next(null);
  }
}
```

```typescript
// En el componente
constructor(private alertService: AlertService) {}

ngOnInit() {
  this.alertService.alert$.subscribe(alert => {
    this.alertData = alert;
    this.showAlert = !!alert;
  });
}

// Uso
this.alertService.showSuccess('Operación completada');
this.alertService.showError('Error al procesar');
```

## Duraciones Recomendadas

| Tipo      | Duración     | Razón                |
| --------- | ------------ | -------------------- |
| `success` | 2000-3000ms  | Confirmación rápida  |
| `info`    | 3000-4000ms  | Información moderada |
| `warning` | Sin duración | Requiere atención    |
| `danger`  | 5000ms+      | Errores importantes  |

## Dependencias

- `@angular/common`

## Estilos CSS

El componente incluye estilos CSS que soportan:

- Colores diferenciados por tipo de alerta
- Overlay semitransparente
- Centrado responsivo
- Animaciones de entrada
- Diseño responsivo

## Notas

- Los títulos se generan automáticamente según el tipo de alerta
- El componente es completamente independiente y no requiere configuración adicional
- Es compatible con todos los navegadores modernos
- Se puede usar múltiples veces en la misma página
- La duración es opcional y permite control granular del tiempo de visualización
