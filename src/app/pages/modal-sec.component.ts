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
      <h2>Modales - Todas las Variantes</h2>

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
  @Input() showAlertModal = false;
  @Input() showConfirmModal = false;
  @Input() showModal = false;
  @Input() currentAlertData: any;
  @Input() currentConfirmData: any;
  @Input() currentModalData: any;

  @Output() alertClosed = new EventEmitter<void>();
  @Output() confirmConfirmed = new EventEmitter<void>();
  @Output() confirmCancelled = new EventEmitter<void>();
  @Output() confirmThirdAction = new EventEmitter<void>();
  @Output() modalConfirmed = new EventEmitter<string>();
  @Output() modalClosed = new EventEmitter<void>();
  @Output() showAlertEvent = new EventEmitter<string>();
  @Output() showConfirmEvent = new EventEmitter<string>();
  @Output() showTextModalEvent = new EventEmitter<string>();

  onAlertClosed() {
    this.alertClosed.emit();
  }

  onConfirmConfirmed() {
    this.confirmConfirmed.emit();
  }

  onConfirmCancelled() {
    this.confirmCancelled.emit();
  }

  onConfirmThirdAction() {
    this.confirmThirdAction.emit();
  }

  onModalConfirmed(text: string) {
    this.modalConfirmed.emit(text);
  }

  onModalClosed() {
    this.modalClosed.emit();
  }

  showAlert(type: string) {
    this.showAlertEvent.emit(type);
  }

  showConfirm(type: string) {
    this.showConfirmEvent.emit(type);
  }

  showTextModal(type: string) {
    this.showTextModalEvent.emit(type);
  }
}
