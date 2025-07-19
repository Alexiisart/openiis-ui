# Toast

Notificación temporal que aparece en la esquina superior derecha con diferentes tipos de alerta.

## 📦 Instalación

```typescript
import { OpeniisToastComponent, OpeniisButtonComponent } from 'openiis-ui';

@Component({
  imports: [OpeniisToastComponent, OpeniisButtonComponent],
})
```

## ⚙️ Properties

| Property    | Tipo                | Default | Descripción             |
| ----------- | ------------------- | ------- | ----------------------- |
| `isVisible` | `boolean`           | `false` | Controla la visibilidad |
| `data`      | `ToastData \| null` | `null`  | Configuración del toast |

## 📡 Events

| Event    | Tipo   | Descripción                |
| -------- | ------ | -------------------------- |
| `closed` | `void` | Emitido al cerrar el toast |

## 🎨 Tipos de Toast

| Tipo      | Color   | Icono | Uso               |
| --------- | ------- | ----- | ----------------- |
| `success` | Verde   | ✓     | Operación exitosa |
| `danger`  | Rojo    | ✗     | Error o problema  |
| `warning` | Naranja | ⚠    | Advertencia       |
| `info`    | Azul    | ℹ    | Información       |

## 💡 Ejemplos Prácticos

### 1. Toast de Éxito

```html
<openiis-toast [isVisible]="showSuccess" [data]="successData" (closed)="onToastClosed()"> </openiis-toast>

<openiis-button text="Show Success Toast" type="success" (clickEvent)="showSuccessToast()"> </openiis-button>
```

```typescript
export class MyComponent {
  showSuccess = false;

  successData: any = {
    type: "success",
    message: "Datos guardados correctamente",
    duration: 3000,
  };

  showSuccessToast() {
    this.showSuccess = true;
  }

  onToastClosed() {
    this.showSuccess = false;
  }
}
```

### 2. Toast de Error

```html
<openiis-toast [isVisible]="showError" [data]="errorData" (closed)="onErrorClosed()"> </openiis-toast>

<openiis-button text="Show Error Toast" type="danger" (clickEvent)="showErrorToast()"> </openiis-button>
```

```typescript
export class MyComponent {
  showError = false;

  errorData: any = {
    type: "danger",
    message: "Error de conexión",
    duration: 5000,
  };

  showErrorToast() {
    this.showError = true;
  }

  onErrorClosed() {
    this.showError = false;
  }
}
```

### 3. Toast de Advertencia

```html
<openiis-toast [isVisible]="showWarning" [data]="warningData" (closed)="onWarningClosed()"> </openiis-toast>

<openiis-button text="Show Warning Toast" type="warning" (clickEvent)="showWarningToast()"> </openiis-button>
```

```typescript
export class MyComponent {
  showWarning = false;

  warningData: any = {
    type: "warning",
    message: "Sesión expirando pronto",
    duration: 4000,
  };

  showWarningToast() {
    this.showWarning = true;
  }

  onWarningClosed() {
    this.showWarning = false;
  }
}
```

### 4. Toast de Información

```html
<openiis-toast [isVisible]="showInfo" [data]="infoData" (closed)="onInfoClosed()"> </openiis-toast>

<openiis-button text="Show Info Toast" type="primary" (clickEvent)="showInfoToast()"> </openiis-button>
```

```typescript
export class MyComponent {
  showInfo = false;

  infoData: any = {
    type: "info",
    message: "Nueva actualización disponible",
    duration: 3000,
  };

  showInfoToast() {
    this.showInfo = true;
  }

  onInfoClosed() {
    this.showInfo = false;
  }
}
```

### 5. Servicio de Toast

```typescript
// toast.service.ts
@Injectable({ providedIn: "root" })
export class ToastService {
  private toastSubject = new BehaviorSubject(null);
  public toast$ = this.toastSubject.asObservable();

  showSuccess(message, duration = 3000) {
    this.toastSubject.next({
      type: "success",
      message,
      duration,
    });
  }

  showError(message, duration = 5000) {
    this.toastSubject.next({
      type: "danger",
      message,
      duration,
    });
  }

  showWarning(message, duration = 4000) {
    this.toastSubject.next({
      type: "warning",
      message,
      duration,
    });
  }

  showInfo(message, duration = 3000) {
    this.toastSubject.next({
      type: "info",
      message,
      duration,
    });
  }

  close() {
    this.toastSubject.next(null);
  }
}
```

```html
<openiis-toast [isVisible]="showToast" [data]="toastData" (closed)="onToastClosed()"> </openiis-toast>

<openiis-button text="Success Toast" type="success" (clickEvent)="showSuccess()"> </openiis-button>

<openiis-button text="Error Toast" type="danger" (clickEvent)="showError()"> </openiis-button>

<openiis-button text="Warning Toast" type="warning" (clickEvent)="showWarning()"> </openiis-button>

<openiis-button text="Info Toast" type="primary" (clickEvent)="showInfo()"> </openiis-button>
```

```typescript
export class MyComponent {
  toastData: any = null;
  showToast = false;

  constructor(private toastService: ToastService) {}

  ngOnInit() {
    this.toastService.toast$.subscribe((toast) => {
      this.toastData = toast;
      this.showToast = !!toast;
    });
  }

  showSuccess() {
    this.toastService.showSuccess("Operación completada con éxito");
  }

  showError() {
    this.toastService.showError("Ha ocurrido un error");
  }

  showWarning() {
    this.toastService.showWarning("Sesión expirando pronto");
  }

  showInfo() {
    this.toastService.showInfo("Nueva funcionalidad disponible");
  }

  onToastClosed() {
    this.showToast = false;
    this.toastService.close();
  }
}
```

## 🏗️ Interfaces

```typescript
interface ToastData {
  message: string; // Mensaje a mostrar
  type?: "success" | "warning" | "danger" | "info"; // Tipo de toast (opcional)
  duration?: number; // Duración en ms (opcional)
}
```

## ⚡ Comportamiento

- **Auto-cierre**: Se cierra automáticamente según duración (default: 3000ms)
- **Posición fija**: Esquina superior derecha
- **Animación**: Slide in desde la derecha
- **Responsive**: Se adapta a móviles
- **Glass morphism**: Efecto translúcido con blur

## ✅ Características

- ✅ 4 tipos de toast (success, warning, danger, info)
- ✅ Duración configurable
- ✅ Auto-cierre automático
- ✅ Completamente responsive
- ✅ Integración con temas Openiis UI
- ✅ Accesibilidad incluida
- ✅ Servicio opcional para gestión centralizada

## 🚨 Solución de Problemas

| Problema              | Solución                                                             |
| --------------------- | -------------------------------------------------------------------- |
| Toast no se muestra   | Verifica `isVisible = true` y `data` no null                         |
| Tipo no se aplica     | Verifica que `type` esté en ['success', 'warning', 'danger', 'info'] |
| Estilos no se aplican | Asegúrate de que el tema Openiis UI esté configurado                 |
| No se auto-cierra     | Verifica que `duration` esté definido y sea mayor a 0                |

## 🐞 Reportar Problemas

Si encuentras algún problema en la lógica del componente, por favor
[🐞Reportalo](https://github.com/Alexiisart/openiis-ui/issues/new)
