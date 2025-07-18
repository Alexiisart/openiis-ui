import { Component, Input, Output, EventEmitter } from '@angular/core';
import { CommonModule } from '@angular/common';
import { InputVariant, OpeniisInputComponent } from '../input';

/**
 * Componente de barra de búsqueda reutilizable
 * Recibe el término de búsqueda como input y emite eventos de cambio y limpieza
 */
@Component({
  selector: 'openiis-search-input',
  standalone: true,
  imports: [CommonModule, OpeniisInputComponent],
  template: `
    <div class="search-container">
      <openiis-input
        type="search"
        [placeholder]="placeholder"
        [value]="searchTerm"
        iconLeft="search"
        [clearable]="true"
        [size]="size"
        [variant]="variant"
        class="search-input-custom"
        (valueChange)="onSearchChange($event)"
        (keydownEvent)="onKeyDown($event)"
      ></openiis-input>
    </div>
  `,
  styles: [
    `
      .search-container {
        display: flex;
        justify-content: flex-start;
        width: 100%;
      }

      /* Estilos personalizados para el input de búsqueda */
      .search-input-custom {
        width: 100%;
      }

      /* Responsive para barra de búsqueda */
      @media (max-width: 768px) {
        .search-container {
          max-width: 100%;
        }
      }
    `,
  ],
})
export class OpeniisSearchInputComponent {
  /**
   * Término de búsqueda actual
   */
  @Input() searchTerm: string = '';

  @Input() size: 'sm' | 'md' | 'lg' = 'md';
  @Input() variant: InputVariant = 'default';

  /**
   * Placeholder del input de búsqueda
   */
  @Input() placeholder: string = 'Buscar...';

  /**
   * Evento emitido cuando cambia el término de búsqueda
   */
  @Output() searchChange = new EventEmitter<string>();

  /**
   * Evento emitido cuando se limpia la búsqueda
   */
  @Output() clearSearch = new EventEmitter<void>();

  /**
   * Maneja el cambio en el input de búsqueda
   */
  onSearchChange(value: string): void {
    this.searchChange.emit(value);

    // Si el valor está vacío, emitir evento de limpiar
    if (!value.trim()) {
      this.clearSearch.emit();
    }
  }

  /**
   * Maneja eventos de teclado
   */
  onKeyDown(event: KeyboardEvent): void {
    if (event.key === 'Escape') {
      this.clearSearch.emit();
    }
  }
}
