import { Component, EventEmitter, Input, Output } from '@angular/core';
import { CommonModule } from '@angular/common';
import { OpeniisButtonComponent } from '../components/buttons/button.component';
import { OpeniisToastComponent } from '../components';

@Component({
  selector: 'app-notification-sec',
  standalone: true,
  imports: [CommonModule, OpeniisButtonComponent, OpeniisToastComponent],
  template: `
    <!-- Sección de Notificaciones -->
    <section class="demo-section">
      <h2>Notificaciones - Todas las Variantes</h2>

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
  `,
})
export class NotificationSecComponent {
  @Input() showSuccessToast = false;
  @Input() showWarningToast = false;
  @Input() showDangerToast = false;
  @Input() showInfoToast = false;
  @Input() successToastData: any;
  @Input() warningToastData: any;
  @Input() dangerToastData: any;
  @Input() infoToastData: any;

  @Output() toastClosed = new EventEmitter<string>();
  @Output() showToastEvent = new EventEmitter<string>();

  onToastClosed(type: string) {
    this.toastClosed.emit(type);
  }

  showToastMessage(type: string) {
    this.showToastEvent.emit(type);
  }
}
