import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { OpeniisButtonComponent } from '../components/buttons/button.component';
import { OpeniisToastComponent } from '../components';

@Component({
  selector: 'app-notification-sec',
  standalone: true,
  imports: [CommonModule, OpeniisButtonComponent, OpeniisToastComponent],
  template: `
    <!-- Toasts Implementados -->
    <openiis-toast
      [isVisible]="showSuccessToast"
      [data]="successToastData"
      (closed)="onToastClosed('success')"
    >
    </openiis-toast>

    <openiis-toast
      [isVisible]="showWarningToast"
      [data]="warningToastData"
      (closed)="onToastClosed('warning')"
    >
    </openiis-toast>

    <openiis-toast
      [isVisible]="showDangerToast"
      [data]="dangerToastData"
      (closed)="onToastClosed('danger')"
    >
    </openiis-toast>

    <openiis-toast
      [isVisible]="showInfoToast"
      [data]="infoToastData"
      (closed)="onToastClosed('info')"
    >
    </openiis-toast>
    <section class="demo-section">
      <h2>Notificaciones</h2>

      <div class="demo-subsection">
        <h3>Toasts</h3>
        <div class="demo-grid">
          <div class="demo-item">
            <h4>Toast de Éxito</h4>
            <openiis-button
              type="success"
              text="Mostrar Éxito"
              iconLeft="check_circle"
              (clickEvent)="showToastMessage('success')"
            >
            </openiis-button>
          </div>

          <div class="demo-item">
            <h4>Toast de Advertencia</h4>
            <openiis-button
              type="warning"
              text="Mostrar Advertencia"
              iconLeft="warning"
              (clickEvent)="showToastMessage('warning')"
            >
            </openiis-button>
          </div>

          <div class="demo-item">
            <h4>Toast de Error</h4>
            <openiis-button
              type="danger"
              text="Mostrar Error"
              iconLeft="error"
              (clickEvent)="showToastMessage('danger')"
            >
            </openiis-button>
          </div>

          <div class="demo-item">
            <h4>Toast de Información</h4>
            <openiis-button
              type="primary"
              text="Mostrar Info"
              iconLeft="info"
              (clickEvent)="showToastMessage('info')"
            >
            </openiis-button>
          </div>
        </div>
      </div>
    </section>
  `,
})
export class NotificationSecComponent {
  showSuccessToast = false;
  showWarningToast = false;
  showDangerToast = false;
  showInfoToast = false;

  showToastMessage(type: string): void {
    switch (type) {
      case 'success':
        this.showSuccessToast = true;
        break;
      case 'warning':
        this.showWarningToast = true;
        break;
      case 'danger':
        this.showDangerToast = true;
        break;
      case 'info':
        this.showInfoToast = true;
        break;
    }
  }

  onToastClosed(type: string): void {
    switch (type) {
      case 'success':
        this.showSuccessToast = false;
        break;
      case 'warning':
        this.showWarningToast = false;
        break;
      case 'danger':
        this.showDangerToast = false;
        break;
      case 'info':
        this.showInfoToast = false;
        break;
    }
    console.log(`Toast ${type} cerrado`);
  }

  /* ===== TOAST SECTION ===== */
  successToastData = {
    message: '¡Éxito! La operación se completó correctamente.',
    type: 'success' as const,
    duration: 3000,
  };

  warningToastData = {
    message: 'Advertencia: Verifica los datos antes de continuar.',
    type: 'warning' as const,
    duration: 3000,
  };

  dangerToastData = {
    message: 'Error: No se pudo completar la operación.',
    type: 'danger' as const,
    duration: 3000,
  };

  infoToastData = {
    message: 'Información: Funcionalidad actualizada disponible.',
    type: 'info' as const,
    duration: 3000,
  };
}
