import { Component, EventEmitter, Input, Output } from '@angular/core';
import { CommonModule } from '@angular/common';
import { OpeniisButtonComponent } from '../components/buttons/button.component';
import {
  OpeniisConfirmModalComponent,
  OpeniisModalComponent,
  OpeniisAlertModalComponent,
} from '../components';

@Component({
  selector: 'app-modal-sec',
  standalone: true,
  imports: [
    CommonModule,
    OpeniisButtonComponent,
    OpeniisConfirmModalComponent,
    OpeniisModalComponent,
    OpeniisAlertModalComponent,
  ],
  template: `
    <!-- Sección de Modales -->
    <section class="demo-section">
      <h2>Modales</h2>

      <div class="demo-subsection">
        <h3>Modales de Alerta</h3>
        <div class="demo-grid">
          <div class="demo-item">
            <h4>Alerta de Éxito</h4>
            <openiis-button
              type="success"
              text="Mostrar Éxito"
              iconLeft="check_circle"
              (clickEvent)="showAlert('success')"
            >
            </openiis-button>
          </div>

          <div class="demo-item">
            <h4>Alerta de Advertencia</h4>
            <openiis-button
              type="warning"
              text="Mostrar Advertencia"
              iconLeft="warning"
              (clickEvent)="showAlert('warning')"
            >
            </openiis-button>
          </div>

          <div class="demo-item">
            <h4>Alerta de Error</h4>
            <openiis-button
              type="danger"
              text="Mostrar Error"
              iconLeft="error"
              (clickEvent)="showAlert('danger')"
            >
            </openiis-button>
          </div>

          <div class="demo-item">
            <h4>Alerta de Información</h4>
            <openiis-button
              type="primary"
              text="Mostrar Info"
              iconLeft="info"
              (clickEvent)="showAlert('info')"
            >
            </openiis-button>
          </div>
        </div>
      </div>

      <div class="demo-subsection">
        <h3>Modales de Confirmación</h3>
        <div class="demo-grid">
          <div class="demo-item">
            <h4>Confirmación de Eliminación</h4>
            <openiis-button
              type="danger"
              text="Eliminar Elemento"
              iconLeft="delete"
              (clickEvent)="showConfirm('delete')"
            >
            </openiis-button>
          </div>

          <div class="demo-item">
            <h4>Confirmación de Guardado</h4>
            <openiis-button
              type="primary"
              text="Guardar Cambios"
              iconLeft="save"
              (clickEvent)="showConfirm('save')"
            >
            </openiis-button>
          </div>
        </div>
      </div>

      <div class="demo-subsection">
        <h3>Modales de Texto</h3>
        <div class="demo-grid">
          <div class="demo-item">
            <h4>Agregar Elemento</h4>
            <openiis-button
              type="primary"
              text="Agregar Nuevo"
              iconLeft="add"
              (clickEvent)="showTextModal('add')"
            >
            </openiis-button>
          </div>

          <div class="demo-item">
            <h4>Editar Elemento</h4>
            <openiis-button
              type="secondary"
              text="Editar Existente"
              iconLeft="edit"
              (clickEvent)="showTextModal('edit')"
            >
            </openiis-button>
          </div>
        </div>
      </div>
    </section>

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

  successAlertData = {
    message:
      'Operación completada exitosamente. Los datos han sido guardados correctamente.',
    type: 'success' as const,
  };

  warningAlertData = {
    message:
      'Atención: Esta acción requerirá confirmación adicional antes de proceder.',
    type: 'warning' as const,
  };

  dangerAlertData = {
    message:
      'Error crítico: No se pudo completar la operación. Por favor, intente nuevamente.',
    type: 'danger' as const,
  };

  infoAlertData = {
    message: 'Información: Esta funcionalidad estará disponible próximamente.',
    type: 'info' as const,
  };

  deleteConfirmData = {
    message:
      '¿Estás seguro de que quieres eliminar este elemento? Esta acción no se puede deshacer.',
    title: 'Confirmar eliminación',
    confirmText: 'Eliminar',
    cancelText: 'Cancelar',
  };

  saveConfirmData = {
    message: '¿Deseas guardar los cambios realizados?',
    title: 'Guardar cambios',
    confirmText: 'Guardar',
    cancelText: 'Descartar',
    thirdButtonText: 'Guardar como borrador',
  };

  addItemModalData = {
    title: 'Agregar nuevo elemento',
    label: 'Descripción del elemento:',
    placeholder: 'Escribe la descripción aquí...',
    confirmButtonText: 'Agregar',
  };

  editItemModalData = {
    title: 'Editar elemento existente',
    label: 'Modificar descripción:',
    placeholder: 'Actualiza la descripción...',
    currentValue: 'Descripción actual del elemento',
    confirmButtonText: 'Actualizar',
  };

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

  /* ===== MODAL GETTERS ===== */
  get currentAlertData() {
    switch (this.currentModalType) {
      case 'success':
        return this.successAlertData;
      case 'warning':
        return this.warningAlertData;
      case 'danger':
        return this.dangerAlertData;
      case 'info':
        return this.infoAlertData;
      default:
        return this.successAlertData;
    }
  }

  get currentConfirmData() {
    switch (this.currentModalType) {
      case 'delete':
        return this.deleteConfirmData;
      case 'save':
        return this.saveConfirmData;
      default:
        return this.deleteConfirmData;
    }
  }

  get currentModalData() {
    switch (this.currentModalType) {
      case 'add':
        return this.addItemModalData;
      case 'edit':
        return this.editItemModalData;
      default:
        return this.addItemModalData;
    }
  }
}
