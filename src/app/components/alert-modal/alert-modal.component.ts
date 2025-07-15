import {
  Component,
  EventEmitter,
  Input,
  OnChanges,
  Output,
} from '@angular/core';
import { CommonModule } from '@angular/common';
import { OpeniisButtonComponent } from '../buttons/button.component';

interface AlertData {
  message: string; // Mensaje de la alerta
  buttonText: string; // Texto del botón de aceptar
  type: 'success' | 'warning' | 'danger' | 'info'; // Tipo de alerta
  duration?: number; // Duración en milisegundos (opcional)
}
/**
 * Componente modal de alerta.
 * Muestra un diálogo modal con un mensaje y un botón de aceptar.
 * Soporta diferentes tipos de alerta: success, warning, danger e info.
 */
@Component({
  selector: 'openiis-alert-modal',
  standalone: true,
  imports: [CommonModule, OpeniisButtonComponent],
  template: `
    <div
      class="modal"
      [style.display]="isVisible ? 'flex' : 'none'"
      (click)="onOverlayClick($event)"
    >
      <div class="modal-overlay"></div>
      <div class="modal-content" [class]="data?.type">
        <div class="modal-header">
          <h3>{{ getTitle() }}</h3>
          <openiis-button
            (clickEvent)="close()"
            type="icon"
            iconLeft="close"
            size="sm"
          >
          </openiis-button>
        </div>
        <div class="modal-body">
          <p>{{ data?.message || 'Mensaje de información' }}</p>
        </div>
        <div class="modal-footer">
          <openiis-button
            (clickEvent)="close()"
            [type]="data?.type"
            [text]="data?.buttonText || 'Aceptar'"
            size="sm"
          >
          </openiis-button>
        </div>
      </div>
    </div>
  `,
  styleUrls: ['./alert-modal.component.css'],
})
export class OpeniisAlertModalComponent implements OnChanges {
  /** Controla la visibilidad del modal */
  @Input() isVisible = false;

  /** Datos de configuración del modal */
  @Input() data: AlertData | null = null;

  /** Evento emitido cuando se cierra el modal */
  @Output() closed = new EventEmitter<void>();

  /**
   * Maneja los clics en el overlay del modal.
   * Cierra el modal si se hace clic fuera del contenido.
   * @param event Evento del clic
   */
  onOverlayClick(event: Event): void {
    if (event.target === event.currentTarget) {
      this.close();
    }
  }

  /**
   * Obtiene el título del modal según el tipo de alerta.
   * @returns Título correspondiente al tipo de alerta
   */
  getTitle(): string {
    switch (this.data?.type) {
      case 'success':
        return 'Éxito';
      case 'warning':
        return 'Advertencia';
      case 'danger':
        return 'Error';
      case 'info':
      default:
        return 'Información';
    }
  }

  /**
   * Cierra el modal y emite el evento de cierre.
   */
  close(): void {
    this.isVisible = false;
    this.closed.emit();
  }

  /**
   * Método del ciclo de vida que se ejecuta cuando cambian las propiedades de entrada.
   * Si se especifica una duración, cierra automáticamente el modal después de ese tiempo.
   */
  ngOnChanges(): void {
    if (this.isVisible && this.data?.duration) {
      setTimeout(() => {
        this.close();
      }, this.data.duration);
    }
  }
}
