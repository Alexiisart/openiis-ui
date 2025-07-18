import { Component, EventEmitter, Input, Output } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ButtonVariant, OpeniisButtonComponent } from '../buttons';

interface ConfirmData {
  message: string; // Mensaje de confirmación
  title: string; // Título del modal
  confirmText: string; // Texto del botón de confirmación
  cancelText: string; // Texto del botón de cancelación
  // Botón adicional opcional para modales de 3 opciones
  thirdButtonText?: string; // Texto del tercer botón (opcional)
}

/**
 * Componente modal de confirmación.
 * Muestra un diálogo modal con un mensaje y botones para confirmar o cancelar una acción.
 */
@Component({
  selector: 'openiis-confirm-modal',
  standalone: true,
  imports: [CommonModule, OpeniisButtonComponent],
  template: `
    <div
      class="modal"
      [style.display]="isVisible ? 'flex' : 'none'"
      (click)="onOverlayClick($event)"
    >
      <div class="modal-overlay"></div>
      <div class="modal-content" style="border-width: 1px">
        <div class="modal-header" style="border-bottom-width: 1px">
          <h3>{{ data?.title || 'Confirmar acción' }}</h3>
          <openiis-button
            (clickEvent)="cancel()"
            type="icon"
            iconLeft="close"
            size="sm"
          >
          </openiis-button>
        </div>
        <div class="modal-body">
          <p>
            {{ data?.message || '¿Estás seguro de que quieres continuar?' }}
          </p>
        </div>
        <div class="modal-footer" style="border-top-width: 1px">
          @if (!data?.thirdButtonText) {
          <openiis-button
            [type]="buttonLeft"
            text="{{ data?.cancelText || 'Cancelar' }}"
            (clickEvent)="cancel()"
          >
          </openiis-button>
          } @if (data?.thirdButtonText) {
          <openiis-button
            [type]="buttonRight"
            text="{{ data?.thirdButtonText }}"
            (clickEvent)="thirdButton()"
          >
          </openiis-button>
          }
          <openiis-button
            [type]="buttonRight"
            text="{{ data?.confirmText || 'Confirmar' }}"
            (clickEvent)="confirm()"
          >
          </openiis-button>
        </div>
      </div>
    </div>
  `,
  styleUrls: ['../modal/modal.component.css'],
})
export class OpeniisConfirmModalComponent {
  /** Controla la visibilidad del modal */
  @Input() isVisible = false;

  /** Datos de configuración del modal */
  @Input() data: ConfirmData | null = null;

  /** Tipo de botón izquierdo */
  @Input() buttonLeft: ButtonVariant = 'secondary';

  /** Tipo de botón derecho */
  @Input() buttonRight: ButtonVariant = 'primary';

  /** Evento emitido cuando se confirma la acción */
  @Output() confirmed = new EventEmitter<void>();

  /** Evento emitido cuando se cancela la acción */
  @Output() cancelled = new EventEmitter<void>();

  /** Evento emitido cuando se presiona el tercer botón */
  @Output() thirdAction = new EventEmitter<void>();

  /**
   * Maneja los clics en el overlay del modal.
   * Cierra el modal si se hace clic fuera del contenido.
   * @param event Evento del clic
   */
  onOverlayClick(event: Event): void {
    if (event.target === event.currentTarget) {
      this.cancel();
    }
  }

  /**
   * Confirma la acción.
   * Emite el evento de confirmación y cierra el modal.
   */
  confirm(): void {
    this.confirmed.emit();
    this.close();
  }

  /**
   * Cancela la acción.
   * Emite el evento de cancelación y cierra el modal.
   */
  cancel(): void {
    this.cancelled.emit();
    this.close();
  }

  /**
   * Ejecuta la tercera acción.
   * Emite el evento de tercera acción y cierra el modal.
   */
  thirdButton(): void {
    this.thirdAction.emit();
    this.close();
  }

  /**
   * Cierra el modal.
   * Establece la visibilidad en falso.
   */
  private close(): void {
    this.isVisible = false;
  }
}
