# Alert Modal

Modal de alerta para mostrar mensajes importantes con diferentes tipos de alerta.

## 📦 Instalación

```typescript
import { OpeniisAlertModalComponent, OpeniisButtonComponent } from 'openiis-ui';

@Component({
  imports: [OpeniisAlertModalComponent, OpeniisButtonComponent],
})
```

## ⚙️ Properties

| Property    | Tipo                | Default | Descripción             |
| ----------- | ------------------- | ------- | ----------------------- |
| `isVisible` | `boolean`           | `false` | Controla la visibilidad |
| `data`      | `AlertData \| null` | `null`  | Configuración del modal |

## 📡 Events

| Event    | Tipo   | Descripción                |
| -------- | ------ | -------------------------- |
| `closed` | `void` | Emitido al cerrar el modal |

## 🎨 Tipos de Alerta

| Tipo      | Color   | Icono | Uso               |
| --------- | ------- | ----- | ----------------- |
| `success` | Verde   | ✓     | Operación exitosa |
| `error`   | Rojo    | ✗     | Error o problema  |
| `warning` | Naranja | ⚠    | Advertencia       |
| `info`    | Azul    | ℹ    | Información       |

## 💡 Ejemplos Prácticos

### 1. Alerta de Éxito

```html
<openiis-alert-modal [isVisible]="showSuccess" [data]="successData" (closed)="onAlertClosed()"> </openiis-alert-modal>

<openiis-button text="Show Success" type="success" (clickEvent)="showSuccessAlert()"> </openiis-button>
```

```typescript
export class MyComponent {
  showSuccess = false;

  successData: any = {
    type: "success",
    title: "Operación exitosa",
    message: "Los datos se han guardado correctamente.",
  };

  showSuccessAlert() {
    this.showSuccess = true;
  }

  onAlertClosed() {
    this.showSuccess = false;
  }
}
```

### 2. Alerta de Error

```html
<openiis-alert-modal [isVisible]="showError" [data]="errorData" (closed)="onErrorClosed()"> </openiis-alert-modal>

<openiis-button text="Show Error" type="danger" (clickEvent)="showErrorAlert()"> </openiis-button>
```

```typescript
export class MyComponent {
  showError = false;

  errorData: any = {
    type: "error",
    title: "Error de conexión",
    message: "No se pudo conectar con el servidor.",
  };

  showErrorAlert() {
    this.showError = true;
  }

  onErrorClosed() {
    this.showError = false;
  }
}
```

### 3. Alerta de Advertencia

```html
<openiis-alert-modal [isVisible]="showWarning" [data]="warningData" (closed)="onWarningClosed()"> </openiis-alert-modal>

<openiis-button text="Show Warning" type="warning" (clickEvent)="showWarningAlert()"> </openiis-button>
```

```typescript
export class MyComponent {
  showWarning = false;

  warningData: any = {
    type: "warning",
    title: "Atención",
    message: "Esta acción no se puede deshacer.",
  };

  showWarningAlert() {
    this.showWarning = true;
  }

  onWarningClosed() {
    this.showWarning = false;
  }
}
```

### 4. Alerta de Información

```html
<openiis-alert-modal [isVisible]="showInfo" [data]="infoData" (closed)="onInfoClosed()"> </openiis-alert-modal>

<openiis-button text="Show Info" type="primary" (clickEvent)="showInfoAlert()"> </openiis-button>
```

```typescript
export class MyComponent {
  showInfo = false;

  infoData: any = {
    type: "info",
    title: "Información",
    message: "Nueva actualización disponible.",
  };

  showInfoAlert() {
    this.showInfo = true;
  }

  onInfoClosed() {
    this.showInfo = false;
  }
}
```

### 5. Servicio de Alertas

```typescript
// alert.service.ts
@Injectable({ providedIn: "root" })
export class AlertService {
  private alertSubject = new BehaviorSubject(null);
  public alert$ = this.alertSubject.asObservable();

  showSuccess(message, title = "Éxito") {
    this.alertSubject.next({
      type: "success",
      title,
      message,
    });
  }

  showError(message, title = "Error") {
    this.alertSubject.next({
      type: "error",
      title,
      message,
    });
  }

  showWarning(message, title = "Advertencia") {
    this.alertSubject.next({
      type: "warning",
      title,
      message,
    });
  }

  showInfo(message, title = "Información") {
    this.alertSubject.next({
      type: "info",
      title,
      message,
    });
  }

  close() {
    this.alertSubject.next(null);
  }
}
```

```html
<openiis-alert-modal [isVisible]="showAlert" [data]="alertData" (closed)="onAlertClosed()"> </openiis-alert-modal>

<openiis-button text="Success Alert" type="success" (clickEvent)="showSuccess()"> </openiis-button>

<openiis-button text="Error Alert" type="danger" (clickEvent)="showError()"> </openiis-button>

<openiis-button text="Warning Alert" type="warning" (clickEvent)="showWarning()"> </openiis-button>

<openiis-button text="Info Alert" type="primary" (clickEvent)="showInfo()"> </openiis-button>
```

```typescript
export class MyComponent {
  alertData: any = null;
  showAlert = false;

  constructor(private alertService: AlertService) {}

  ngOnInit() {
    this.alertService.alert$.subscribe((alert) => {
      this.alertData = alert;
      this.showAlert = !!alert;
    });
  }

  showSuccess() {
    this.alertService.showSuccess("Operación completada con éxito");
  }

  showError() {
    this.alertService.showError("Ha ocurrido un error");
  }

  showWarning() {
    this.alertService.showWarning("Esta acción es irreversible");
  }

  showInfo() {
    this.alertService.showInfo("Nueva funcionalidad disponible");
  }

  onAlertClosed() {
    this.showAlert = false;
    this.alertService.close();
  }
}
```

## 🏗️ Interfaces

```typescript
interface AlertData {
  type: "success" | "error" | "warning" | "info"; // Tipo de alerta
  title: string; // Título del modal
  message: string; // Mensaje de la alerta
}
```

## ⚡ Comportamiento

- **Cierre automático**: Clic en botón X o overlay
- **Tipos visuales**: Diferentes colores e iconos según tipo
- **Responsive**: Se adapta a diferentes tamaños de pantalla
- **Accesible**: Navegación por teclado incluida

## ✅ Características

- ✅ 4 tipos de alerta (success, error, warning, info)
- ✅ Iconos y colores automáticos
- ✅ Cierre por overlay y botón X
- ✅ Completamente responsive
- ✅ Integración con temas Openiis UI
- ✅ Accesibilidad incluida
- ✅ Servicio opcional para gestión centralizada

## 🚨 Solución de Problemas

| Problema              | Solución                                                            |
| --------------------- | ------------------------------------------------------------------- |
| Modal no se muestra   | Verifica `isVisible = true` y `data` no null                        |
| Tipo no se aplica     | Verifica que `type` esté en ['success', 'error', 'warning', 'info'] |
| Estilos no se aplican | Asegúrate de que el tema Openiis UI esté configurado                |
| Iconos no aparecen    | Verifica que el tipo esté correctamente definido                    |

## 🐞 Reportar Problemas

Si encuentras algún problema en la lógica del componente, por favor
[🐞Reportalo](https://github.com/Alexiisart/openiis-ui/issues/new)
