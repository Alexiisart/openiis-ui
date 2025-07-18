# ConfirmModal Component

## Descripción

El componente `ConfirmModalComponent` es un modal de confirmación que permite solicitar confirmación del usuario antes de realizar una acción. Soporta configuración de 2 o 3 botones y es perfecto para operaciones que requieren confirmación explícita.

## Características

- ✅ Modal de confirmación con 2 o 3 botones
- ✅ Títulos y mensajes personalizables
- ✅ Textos de botones configurables
- ✅ Cierre por overlay y botón X
- ✅ Eventos separados para cada acción
- ✅ Completamente responsive
- ✅ Fácil integración

## Uso Básico

```html
<app-confirm-modal [isVisible]="showConfirmModal" [data]="confirmData" (confirmed)="onConfirmed()" (cancelled)="onCancelled()" (thirdAction)="onThirdAction()" buttonLeft="secondary" buttonRight="primary"> </app-confirm-modal>
```

## Props

| Prop        | Tipo                  | Defecto | Descripción                       |
| ----------- | --------------------- | ------- | --------------------------------- |
| `isVisible` | `boolean`             | `false` | Controla la visibilidad del modal |
| `data`      | `ConfirmData \| null` | `null`  | Datos de configuración del modal  |

## Eventos

| Evento        | Tipo   | Descripción                                |
| ------------- | ------ | ------------------------------------------ |
| `confirmed`   | `void` | Emitido cuando se confirma la acción       |
| `cancelled`   | `void` | Emitido cuando se cancela la acción        |
| `thirdAction` | `void` | Emitido cuando se presiona el tercer botón |

## Interfaz ConfirmData

```typescript
interface ConfirmData {
  message: string; // Mensaje de confirmación
  title: string; // Título del modal
  confirmText: string; // Texto del botón de confirmación
  cancelText: string; // Texto del botón de cancelación
  thirdButtonText?: string; // Texto del tercer botón (opcional)
}
```

## Ejemplos

### Confirmación básica (2 botones)

```typescript
// En el componente
deleteConfirmData: ConfirmData = {
  title: 'Eliminar elemento',
  message: '¿Estás seguro de que quieres eliminar este elemento? Esta acción no se puede deshacer.',
  confirmText: 'Eliminar',
  cancelText: 'Cancelar'
};

showDeleteConfirm = false;

deleteItem(id: string) {
  this.itemToDelete = id;
  this.showDeleteConfirm = true;
}

onDeleteConfirmed() {
  // Lógica para eliminar el elemento
  this.itemService.delete(this.itemToDelete).subscribe({
    next: () => {
      console.log('Elemento eliminado');
      this.showDeleteConfirm = false;
    },
    error: (error) => {
      console.error('Error al eliminar:', error);
    }
  });
}

onDeleteCancelled() {
  this.showDeleteConfirm = false;
  this.itemToDelete = null;
}
```

```html
<app-confirm-modal [isVisible]="showDeleteConfirm" [data]="deleteConfirmData" (confirmed)="onDeleteConfirmed()" (cancelled)="onDeleteCancelled()"> </app-confirm-modal>
```

### Confirmación con 3 opciones

```typescript
// En el componente
saveConfirmData: ConfirmData = {
  title: 'Guardar cambios',
  message: 'Tienes cambios sin guardar. ¿Qué deseas hacer?',
  confirmText: 'Guardar',
  cancelText: 'Descartar cambios',
  thirdButtonText: 'Cancelar'
};

showSaveConfirm = false;

beforeLeave() {
  if (this.hasUnsavedChanges()) {
    this.showSaveConfirm = true;
  } else {
    this.navigateAway();
  }
}

onSaveConfirmed() {
  this.saveChanges().then(() => {
    this.navigateAway();
  });
}

onSaveCancelled() {
  // Descartar cambios
  this.discardChanges();
  this.navigateAway();
}

onSaveThirdAction() {
  // Cancelar - no hacer nada
  this.showSaveConfirm = false;
}
```

```html
<app-confirm-modal [isVisible]="showSaveConfirm" [data]="saveConfirmData" (confirmed)="onSaveConfirmed()" (cancelled)="onSaveCancelled()" (thirdAction)="onSaveThirdAction()"> </app-confirm-modal>
```

## Ejemplos de Uso Común

### Confirmación de eliminación

```typescript
deleteTaskConfirm: ConfirmData = {
  title: 'Eliminar tarea',
  message: '¿Estás seguro de que quieres eliminar esta tarea?',
  confirmText: 'Sí, eliminar',
  cancelText: 'Cancelar'
};

confirmDeleteTask(taskId: string) {
  this.taskToDelete = taskId;
  this.showDeleteTaskConfirm = true;
}

onTaskDeleteConfirmed() {
  this.taskService.delete(this.taskToDelete).subscribe({
    next: () => {
      this.loadTasks(); // Recargar lista
      this.showDeleteTaskConfirm = false;
    }
  });
}
```

### Confirmación de cierre de sesión

```typescript
logoutConfirm: ConfirmData = {
  title: 'Cerrar sesión',
  message: '¿Estás seguro de que quieres cerrar sesión?',
  confirmText: 'Cerrar sesión',
  cancelText: 'Cancelar'
};

confirmLogout() {
  this.showLogoutConfirm = true;
}

onLogoutConfirmed() {
  this.authService.logout().subscribe({
    next: () => {
      this.router.navigate(['/login']);
    }
  });
}
```

### Confirmación de cambios importantes

```typescript
resetConfirm: ConfirmData = {
  title: 'Restablecer configuración',
  message: 'Se restablecerán todas las configuraciones a sus valores por defecto. ¿Continuar?',
  confirmText: 'Restablecer',
  cancelText: 'Cancelar'
};

confirmReset() {
  this.showResetConfirm = true;
}

onResetConfirmed() {
  this.settingsService.resetToDefaults().subscribe({
    next: () => {
      this.loadSettings();
      this.showResetConfirm = false;
    }
  });
}
```

### Confirmación con múltiples opciones

```typescript
// Ejemplo: Guardar, no guardar, o cancelar
unsavedChangesConfirm: ConfirmData = {
  title: 'Cambios sin guardar',
  message: 'Tienes cambios sin guardar. ¿Qué deseas hacer?',
  confirmText: 'Guardar y continuar',
  cancelText: 'No guardar',
  thirdButtonText: 'Cancelar'
};

checkUnsavedChanges() {
  if (this.form.dirty) {
    this.showUnsavedChangesConfirm = true;
  } else {
    this.continue();
  }
}

onUnsavedChangesConfirmed() {
  // Guardar y continuar
  this.save().then(() => {
    this.continue();
  });
}

onUnsavedChangesCancelled() {
  // No guardar y continuar
  this.continue();
}

onUnsavedChangesThirdAction() {
  // Cancelar - no hacer nada
  this.showUnsavedChangesConfirm = false;
}
```

## Comportamiento de Cierre

### Cierre automático

- El modal se cierra automáticamente después de cualquier acción (confirmed, cancelled, thirdAction)

### Cierre manual

- **Clic en overlay**: Ejecuta la acción de cancelar
- **Botón X**: Ejecuta la acción de cancelar
- **Botón de confirmación**: Ejecuta la acción de confirmar
- **Botón de cancelación**: Ejecuta la acción de cancelar
- **Tercer botón**: Ejecuta la tercera acción

## Mejores Prácticas

### Textos claros

```typescript
// ✅ Bueno - Textos específicos
confirmData: ConfirmData = {
  title: "Eliminar proyecto",
  message: '¿Estás seguro de que quieres eliminar el proyecto "Mi Proyecto"? Esta acción no se puede deshacer.',
  confirmText: "Sí, eliminar proyecto",
  cancelText: "Cancelar",
};

// ❌ Malo - Textos genéricos
confirmData: ConfirmData = {
  title: "Confirmar",
  message: "¿Estás seguro?",
  confirmText: "Sí",
  cancelText: "No",
};
```

### Uso de colores para acciones peligrosas

```typescript
// Para acciones destructivas, usar texto que indique peligro
deleteConfirm: ConfirmData = {
  title: "Eliminación permanente",
  message: "Esta acción eliminará permanentemente todos los datos. ¿Continuar?",
  confirmText: "Sí, eliminar permanentemente",
  cancelText: "Cancelar",
};
```

### Confirmación con información adicional

```typescript
// Incluir información relevante en el mensaje
bulkDeleteConfirm: ConfirmData = {
  title: "Eliminar elementos seleccionados",
  message: `¿Estás seguro de que quieres eliminar ${this.selectedItems.length} elementos? Esta acción no se puede deshacer.`,
  confirmText: `Eliminar ${this.selectedItems.length} elementos`,
  cancelText: "Cancelar",
};
```

## Dependencias

- `@angular/common`
- `ButtonComponent`

## Estilos CSS

El componente utiliza los estilos del componente Modal base que incluyen:

- Overlay semitransparente
- Centrado responsivo
- Bordes y espaciado consistentes
- Diseño responsivo para móviles

## Notas

- El componente cierra automáticamente después de cualquier acción
- Los tres eventos son opcionales - solo maneja los que necesites
- El tercer botón solo aparece si se proporciona `thirdButtonText`
- Es recomendable usar textos específicos para mejor UX
- El componente es completamente independiente y reutilizable
