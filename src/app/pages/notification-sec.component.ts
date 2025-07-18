import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { OpeniisButtonComponent } from 'openiis-ui';
import { OpeniisToastComponent } from 'openiis-ui';
import { TranslateModule, TranslateService } from '@ngx-translate/core';

@Component({
  selector: 'app-notification-sec',
  standalone: true,
  imports: [
    CommonModule,
    OpeniisButtonComponent,
    OpeniisToastComponent,
    TranslateModule,
  ],
  template: `
    <!-- Toasts Implementados -->
    <openiis-toast
      [isVisible]="showSuccessToast"
      [data]="successToastData()"
      (closed)="onToastClosed('success')"
    >
    </openiis-toast>

    <openiis-toast
      [isVisible]="showWarningToast"
      [data]="warningToastData()"
      (closed)="onToastClosed('warning')"
    >
    </openiis-toast>

    <openiis-toast
      [isVisible]="showDangerToast"
      [data]="dangerToastData()"
      (closed)="onToastClosed('danger')"
    >
    </openiis-toast>

    <openiis-toast
      [isVisible]="showInfoToast"
      [data]="infoToastData()"
      (closed)="onToastClosed('info')"
    >
    </openiis-toast>
    <section class="demo-section">
      <h2>{{ 'notification.notificaciones' | translate }}</h2>

      <div class="demo-subsection">
        <h3>{{ 'notification.toasts' | translate }}</h3>
        <div class="demo-grid">
          <div class="demo-item">
            <h4>{{ 'notification.toast_de_éxito' | translate }}</h4>
            <openiis-button
              type="success"
              [text]="'notification.mostrar_éxito' | translate"
              iconLeft="check_circle"
              (clickEvent)="showToastMessage('success')"
            >
            </openiis-button>
          </div>

          <div class="demo-item">
            <h4>{{ 'notification.toast_de_advertencia' | translate }}</h4>
            <openiis-button
              type="warning"
              [text]="'notification.mostrar_advertencia' | translate"
              iconLeft="warning"
              (clickEvent)="showToastMessage('warning')"
            >
            </openiis-button>
          </div>

          <div class="demo-item">
            <h4>{{ 'notification.toast_de_error' | translate }}</h4>
            <openiis-button
              type="danger"
              [text]="'notification.mostrar_error' | translate"
              iconLeft="error"
              (clickEvent)="showToastMessage('danger')"
            >
            </openiis-button>
          </div>

          <div class="demo-item">
            <h4>{{ 'notification.toast_de_información' | translate }}</h4>
            <openiis-button
              type="primary"
              [text]="'notification.mostrar_info' | translate"
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

  constructor(private translate: TranslateService) {}

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

  successToastData(): any {
    return {
      message: this.translate.instant('notification.toast_de_éxito'),
      type: 'success' as const,
      duration: 3000,
    };
  }

  warningToastData(): any {
    return {
      message: this.translate.instant('notification.toast_de_advertencia'),
      type: 'warning' as const,
      duration: 3000,
    };
  }
  dangerToastData(): any {
    return {
      message: this.translate.instant('notification.toast_de_error'),
      type: 'danger' as const,
      duration: 3000,
    };
  }

  infoToastData(): any {
    return {
      message: this.translate.instant('notification.toast_de_información'),
      type: 'info' as const,
      duration: 3000,
    };
  }
}
