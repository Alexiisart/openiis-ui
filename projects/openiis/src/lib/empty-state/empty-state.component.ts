import { Component, Input, Output, EventEmitter } from '@angular/core';
import { CommonModule } from '@angular/common';
import { OpeniisButtonComponent, ButtonVariant } from '../buttons';

@Component({
  selector: 'openiis-empty-state',
  standalone: true,
  imports: [CommonModule, OpeniisButtonComponent],
  template: `
    <div class="empty-state">
      <span class="material-icons-outlined empty-icon">{{ icon }}</span>
      <h3>{{ title }}</h3>
      <p>{{ message }}</p>
      @if (buttonText) {
      <openiis-button
        [type]="buttonType"
        [text]="buttonText"
        [iconLeft]="buttonIcon || ''"
        [fullWidth]="buttonFullWidth"
        [responsive]="buttonResponsive"
        (buttonClick)="onButtonClick()"
      >
      </openiis-button>
      }
    </div>
  `,
  styles: [
    `
      .empty-state {
        text-align: center;
        padding: var(--space-12) var(--space-4);
        color: var(--color-text-muted);
      }

      .empty-icon {
        font-size: 4rem;
        color: var(--color-text-muted);
        margin-bottom: var(--space-4);
        display: block;
      }

      .empty-state h3 {
        font-size: 1.5rem;
        font-weight: 600;
        margin-bottom: var(--space-2);
        color: var(--color-text);
      }

      .empty-state p {
        font-size: 1rem;
        margin-bottom: var(--space-6);
        max-width: 400px;
        margin-left: auto;
        margin-right: auto;
      }
    `,
  ],
})
export class OpeniisEmptyStateComponent {
  /**
   * Icono a mostrar
   */
  @Input() icon: string = 'inbox';

  /**
   * Título del estado vacío
   */
  @Input() title: string = 'No hay elementos';

  /**
   * Mensaje del estado vacío
   */
  @Input() message: string = 'No se encontraron elementos para mostrar.';

  /**
   * Texto del botón
   */
  @Input() buttonText?: string;

  /**
   * Tipo del botón
   */
  @Input() buttonType: ButtonVariant = 'primary';

  /**
   * Icono del botón
   */
  @Input() buttonIcon?: string;

  /**
   * Botón de ancho completo
   */
  @Input() buttonFullWidth: boolean = false;

  /**
   * Botón responsivo
   */
  @Input() buttonResponsive: boolean = true;

  /**
   * Evento cuando se hace clic en el botón
   */
  @Output() buttonClick = new EventEmitter<void>();

  /**
   * Maneja el clic del botón
   */
  onButtonClick(): void {
    this.buttonClick.emit();
  }
}
