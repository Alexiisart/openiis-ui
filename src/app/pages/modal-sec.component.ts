import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import {
  OpeniisButtonComponent,
  OpeniisConfirmModalComponent,
  OpeniisModalComponent,
  OpeniisAlertModalComponent,
} from 'openiis-ui';
import { TranslateModule, TranslateService } from '@ngx-translate/core';

@Component({
  selector: 'app-modal-sec',
  standalone: true,
  imports: [
    CommonModule,
    OpeniisButtonComponent,
    OpeniisConfirmModalComponent,
    OpeniisModalComponent,
    OpeniisAlertModalComponent,
    TranslateModule,
  ],
  template: `
    <!-- Sección de Modales -->
    <!-- Modales Implementados -->
    <openiis-alert-modal
      [isVisible]="showAlertModal"
      [data]="currentAlertData"
      (closed)="onAlertClosed()"
    >
    </openiis-alert-modal>

    <openiis-confirm-modal
      [isVisible]="showConfirmModal"
      [data]="currentConfirmData"
      buttonLeft="outline-secondary"
      buttonRight="primary"
      (confirmed)="onConfirmConfirmed()"
      (cancelled)="onConfirmCancelled()"
      (thirdAction)="onConfirmThirdAction()"
    >
    </openiis-confirm-modal>

    <openiis-modal
      [isVisible]="showModal"
      [data]="currentModalData"
      (confirmed)="onModalConfirmed($event)"
      (closed)="onModalClosed()"
    >
    </openiis-modal>
    <section class="demo-section">
      <h2>{{ 'modal.modales' | translate }}</h2>

      <div class="demo-subsection">
        <h3>{{ 'modal.modales_de_alerta' | translate }}</h3>
        <div class="demo-grid">
          <div class="demo-item">
            <h4>{{ 'modal.alerta_de_éxito' | translate }}</h4>
            <openiis-button
              type="success"
              [text]="'modal.mostrar_éxito' | translate"
              iconLeft="check_circle"
              (clickEvent)="showAlert('success')"
            >
            </openiis-button>
          </div>

          <div class="demo-item">
            <h4>{{ 'modal.alerta_de_advertencia' | translate }}</h4>
            <openiis-button
              type="warning"
              [text]="'modal.mostrar_advertencia' | translate"
              iconLeft="warning"
              (clickEvent)="showAlert('warning')"
            >
            </openiis-button>
          </div>

          <div class="demo-item">
            <h4>{{ 'modal.alerta_de_error' | translate }}</h4>
            <openiis-button
              type="danger"
              [text]="'modal.mostrar_error' | translate"
              iconLeft="error"
              (clickEvent)="showAlert('danger')"
            >
            </openiis-button>
          </div>

          <div class="demo-item">
            <h4>{{ 'modal.alerta_de_información' | translate }}</h4>
            <openiis-button
              type="primary"
              [text]="'modal.mostrar_info' | translate"
              iconLeft="info"
              (clickEvent)="showAlert('info')"
            >
            </openiis-button>
          </div>
        </div>
      </div>

      <div class="demo-subsection">
        <h3>{{ 'modal.modales_de_confirmación' | translate }}</h3>
        <div class="demo-grid">
          <div class="demo-item">
            <h4>{{ 'modal.confirmación_de_eliminación' | translate }}</h4>
            <openiis-button
              type="danger"
              [text]="'modal.eliminar_elemento' | translate"
              iconLeft="delete"
              (clickEvent)="showConfirm('delete')"
            >
            </openiis-button>
          </div>

          <div class="demo-item">
            <h4>{{ 'modal.confirmación_de_guardado' | translate }}</h4>
            <openiis-button
              type="primary"
              [text]="'modal.guardar_cambios' | translate"
              iconLeft="save"
              (clickEvent)="showConfirm('save')"
            >
            </openiis-button>
          </div>
        </div>
      </div>

      <div class="demo-subsection">
        <h3>{{ 'modal.modales_de_texto' | translate }}</h3>
        <div class="demo-grid">
          <div class="demo-item">
            <h4>{{ 'modal.agregar_elemento' | translate }}</h4>
            <openiis-button
              type="primary"
              [text]="'modal.agregar_nuevo' | translate"
              iconLeft="add"
              (clickEvent)="showTextModal('add')"
            >
            </openiis-button>
          </div>

          <div class="demo-item">
            <h4>{{ 'modal.editar_elemento' | translate }}</h4>
            <openiis-button
              type="secondary"
              [text]="'modal.editar_existente' | translate"
              iconLeft="edit"
              (clickEvent)="showTextModal('edit')"
            >
            </openiis-button>
          </div>
        </div>
      </div>
    </section>
  `,
})
export class ModalSecComponent {
  /* ===== MODAL SECTION ===== */
  showAlertModal = false;
  showConfirmModal = false;
  showModal = false;
  showToast = false;
  showSuccessToast = false;
  showWarningToast = false;
  showDangerToast = false;
  showInfoToast = false;
  currentModalType = '';

  constructor(private translate: TranslateService) {
    // Suscribirse a cambios de idioma
    this.translate.onLangChange.subscribe(() => {
      this.getSuccessAlertData();
      this.getWarningAlertData();
      this.getDangerAlertData();
      this.getInfoAlertData();
      this.getDeleteConfirmData();
      this.getSaveConfirmData();
      this.getAddItemModalData();
      this.getEditItemModalData();
    });

    this.getSuccessAlertData();
    this.getWarningAlertData();
    this.getDangerAlertData();
    this.getInfoAlertData();
    this.getDeleteConfirmData();
    this.getSaveConfirmData();
    this.getAddItemModalData();
    this.getEditItemModalData();
  }

  /* ===== MODAL METHODS ===== */
  showAlert(type: string): void {
    this.currentModalType = type;
    this.showAlertModal = true;
  }

  showConfirm(type: string): void {
    this.currentModalType = type;
    this.showConfirmModal = true;
  }

  showTextModal(type: string): void {
    this.currentModalType = type;
    this.showModal = true;
  }

  onAlertClosed(): void {
    this.showAlertModal = false;
    console.log('Modal de alerta cerrado');
  }

  onConfirmConfirmed(): void {
    console.log('Acción confirmada');
    this.showConfirmModal = false;
  }

  onConfirmCancelled(): void {
    console.log('Acción cancelada');
    this.showConfirmModal = false;
  }

  onConfirmThirdAction(): void {
    console.log('Tercera acción ejecutada');
    this.showConfirmModal = false;
  }

  onModalConfirmed(text: string): void {
    console.log('Texto del modal:', text);
    this.showModal = false;
  }

  onModalClosed(): void {
    console.log('Modal cerrado');
    this.showModal = false;
  }

  /* ===== ALERT DATA GETTERS ===== */
  getSuccessAlertData() {
    return {
      message: this.translate.instant('modal.alerta_de_éxito'),
      type: 'success' as const,
      buttonText: this.translate.instant('modal.aceptar'),
    };
  }

  getWarningAlertData() {
    return {
      message: this.translate.instant('modal.alerta_de_advertencia'),
      type: 'warning' as const,
      buttonText: this.translate.instant('modal.aceptar'),
    };
  }

  getDangerAlertData() {
    return {
      message: this.translate.instant('modal.alerta_de_error'),
      type: 'danger' as const,
      buttonText: this.translate.instant('modal.aceptar'),
    };
  }

  getInfoAlertData() {
    return {
      message: this.translate.instant('modal.alerta_de_información'),
      type: 'info' as const,
      buttonText: this.translate.instant('modal.aceptar'),
    };
  }

  /* ===== CONFIRM DATA GETTERS ===== */
  getDeleteConfirmData() {
    return {
      message: this.translate.instant('modal.confirmación_de_eliminación'),
      title: this.translate.instant('modal.eliminar_elemento'),
      confirmText: this.translate.instant('modal.eliminar_elemento'),
      cancelText: this.translate.instant('modal.cancelar'),
    };
  }

  getSaveConfirmData() {
    return {
      message: this.translate.instant('modal.confirmación_de_guardado'),
      title: this.translate.instant('modal.guardar_cambios'),
      confirmText: this.translate.instant('modal.guardar_cambios'),
      cancelText: this.translate.instant('modal.cancelar'),
      thirdButtonText: this.translate.instant('modal.guardar_como_borrador'),
    };
  }

  /* ===== MODAL DATA GETTERS ===== */
  getAddItemModalData() {
    return {
      title: this.translate.instant('modal.agregar_nuevo'),
      label: this.translate.instant('modal.descripción_del_elemento'),
      placeholder: this.translate.instant('modal.escribe_la_descripción_aquí'),
      confirmButtonText: this.translate.instant('modal.agregar_elemento'),
      cancelButtonText: this.translate.instant('modal.cancelar'),
    };
  }

  getEditItemModalData() {
    return {
      title: this.translate.instant('modal.editar_existente'),
      label: this.translate.instant('modal.modificar_descripción'),
      placeholder: this.translate.instant('modal.actualiza_la_descripción'),
      currentValue: this.translate.instant(
        'modal.descripción_actual_del_elemento',
      ),
      confirmButtonText: this.translate.instant('modal.editar_elemento'),
      cancelButtonText: this.translate.instant('modal.cancelar'),
    };
  }

  /* ===== MODAL GETTERS ===== */
  get currentAlertData() {
    switch (this.currentModalType) {
      case 'success':
        return this.getSuccessAlertData();
      case 'warning':
        return this.getWarningAlertData();
      case 'danger':
        return this.getDangerAlertData();
      case 'info':
        return this.getInfoAlertData();
      default:
        return this.getSuccessAlertData();
    }
  }

  get currentConfirmData() {
    switch (this.currentModalType) {
      case 'delete':
        return this.getDeleteConfirmData();
      case 'save':
        return this.getSaveConfirmData();
      default:
        return this.getDeleteConfirmData();
    }
  }

  get currentModalData() {
    switch (this.currentModalType) {
      case 'add':
        return this.getAddItemModalData();
      case 'edit':
        return this.getEditItemModalData();
      default:
        return this.getAddItemModalData();
    }
  }
}
