import { Component, EventEmitter, Input, Output } from '@angular/core';
import { CommonModule } from '@angular/common';
import { OpeniisButtonComponent } from '../buttons';
import { OpeniisInputComponent } from '../input';

interface ModalData {
  title: string; // Título del modal
  label: string; // Etiqueta del campo de entrada
  placeholder: string; // Texto placeholder del campo
  currentValue?: string; // Valor actual del campo (opcional)
  isTextarea?: boolean; // Si debe mostrarse como textarea o input normal (opcional, por defecto true)
  confirmButtonText?: string; // Texto del botón de confirmación (opcional, por defecto "Agregar")
  cancelButtonText?: string; // Texto del botón de cancelación (opcional, por defecto "Cancelar")
}

/**
 * Componente modal reutilizable para entrada de texto.
 * Permite mostrar un diálogo modal con un campo de texto y botones de confirmación/cancelación.
 */
@Component({
  selector: 'openiis-modal',
  standalone: true,
  imports: [CommonModule, OpeniisButtonComponent, OpeniisInputComponent],
  template: `
    <div
      class="modal"
      [style.display]="isVisible ? 'flex' : 'none'"
      (click)="onOverlayClick($event)"
    >
      <div class="modal-overlay"></div>
      <div class="modal-content">
        <div class="modal-header">
          <h3>{{ data?.title || 'Agregar elemento' }}</h3>
          <openiis-button
            type="icon"
            iconLeft="close"
            size="sm"
            (clickEvent)="close()"
          >
          </openiis-button>
        </div>
        <div class="modal-body">
          <openiis-input
            inputId="modalTextarea"
            [label]="data?.label || 'Descripción:'"
            [placeholder]="data?.placeholder || 'Escribe aquí...'"
            [isTextarea]="true"
            [rows]="4"
            [(value)]="inputValue"
            (keydownEvent)="onKeyDown($event)"
            size="md"
            variant="default"
          ></openiis-input>
        </div>
        <div class="modal-footer">
          <openiis-button
            type="secondary"
            [text]="data?.cancelButtonText || 'Cancelar'"
            size="md"
            (clickEvent)="close()"
          >
          </openiis-button>
          <openiis-button
            type="primary"
            [text]="data?.confirmButtonText || 'Agregar'"
            [disabled]="inputValue.length < 1"
            size="md"
            (clickEvent)="confirm()"
          >
          </openiis-button>
        </div>
      </div>
    </div>
  `,
  styleUrls: ['./modal.component.css'],
})
export class OpeniisModalComponent {
  @Input() isVisible = false;
  @Input() data: ModalData | null = null;
  @Input() minLength = false;
  @Output() confirmed = new EventEmitter<string>();
  @Output() closed = new EventEmitter<void>();

  inputValue = '';

  /**
   * Maneja los cambios en las propiedades de entrada del componente.
   * Inicializa el valor del input cuando el modal se hace visible.
   */
  ngOnChanges(): void {
    if (this.isVisible && this.data?.currentValue) {
      this.inputValue = this.data.currentValue;
    } else if (this.isVisible) {
      this.inputValue = '';
    }
  }

  /**
   * Maneja los clics en el overlay del modal.
   * Cierra el modal si se hace clic fuera del contenido.
   * @param event - Evento del clic
   */
  onOverlayClick(event: Event): void {
    if (event.target === event.currentTarget) {
      this.close();
    }
  }

  /**
   * Maneja los eventos de teclado en el textarea.
   * Enter sin Shift confirma el modal.
   * Escape cierra el modal.
   * @param event - Evento de teclado
   */
  onKeyDown(event: KeyboardEvent): void {
    if (event.key === 'Enter' && !event.shiftKey) {
      event.preventDefault();
      this.confirm();
    } else if (event.key === 'Escape') {
      this.close();
    }
  }

  /**
   * Confirma el contenido del modal.
   * Emite el valor del input si no está vacío y cierra el modal.
   */
  confirm(): void {
    // Si el modal no tiene un mínimo de caracteres,
    // se confirma si el input no está vacío
    if (!this.minLength) {
      if (this.inputValue.trim()) {
        this.confirmed.emit(this.inputValue.trim());
        this.close();
      }
    } else {
      this.confirmed.emit(this.inputValue.trim());
      this.close();
    }
  }

  /**
   * Cierra el modal.
   * Limpia el input y emite el evento de cierre.
   */
  close(): void {
    this.isVisible = false;
    this.inputValue = '';
    this.closed.emit();
  }
}
