import {
  Component,
  EventEmitter,
  Input,
  Output,
  OnInit,
  OnChanges,
  ChangeDetectorRef,
  ViewChild,
  ElementRef,
  HostListener,
} from '@angular/core';
import { CommonModule } from '@angular/common';
import { OpeniisTooltipComponent } from '../tooltip';

/**
 * Interface para las opciones del dropdown con búsqueda
 */
export interface SearchableDropdownOption {
  value: string;
  label: string;
  description?: string;
}

/**
 * Tamaños disponibles para el dropdown con búsqueda
 */
export type SearchableDropdownSize = 'sm' | 'md' | 'lg';

@Component({
  selector: 'openiis-searchable-dropdown',
  standalone: true,
  imports: [CommonModule, OpeniisTooltipComponent],
  template: `
    <div
      class="searchable-dropdown"
      [class]="getSizeClass()"
      (mouseenter)="onMouseEnter()"
      (mouseleave)="onMouseLeave()"
    >
      <div class="dropdown-wrapper">
        <!-- Input de búsqueda -->
        <div class="dropdown-input-wrapper" (click)="toggleDropdown($event)">
          <input
            #searchInput
            type="text"
            class="dropdown-input"
            [value]="displayValue"
            [placeholder]="placeholder"
            [disabled]="disabled"
            (input)="onSearchChange($event)"
            (focus)="onFocus()"
            (blur)="onBlur()"
            (keydown)="onKeyDown($event)"
            (click)="$event.stopPropagation()"
          />

          <div class="dropdown-icon" [class.rotated]="isOpen">
            <svg
              width="16"
              height="16"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              stroke-width="2"
            >
              <polyline points="6,9 12,15 18,9"></polyline>
            </svg>
          </div>
        </div>

        <!-- Lista de opciones -->
        @if (isOpen) {
        <div class="dropdown-options">
          @if (filteredOptions.length === 0) {
          <div class="dropdown-option no-results">
            <span>No se encontraron resultados</span>
          </div>
          } @else { @for (option of filteredOptions; track option.value; let i =
          $index) {
          <div
            class="dropdown-option"
            [class.selected]="option.value === selectedValue"
            [class.highlighted]="i === highlightedIndex"
            (click)="selectOption(option, $event)"
            (mouseenter)="highlightedIndex = i"
          >
            <div class="option-content">
              <span class="option-label">{{ option.label }}</span>
              @if (option.description) {
              <span class="option-description">{{ option.description }}</span>
              }
            </div>
          </div>
          } }
        </div>
        } @if (showTooltip && tooltip && !isOpen) {
        <openiis-tooltip
          [text]="tooltip"
          [position]="tooltipPosition"
          [variant]="variant"
          [visible]="showTooltip"
        >
        </openiis-tooltip>
        }
      </div>
    </div>
  `,
  styleUrls: ['./searchable-dropdown.component.css'],
})
export class OpeniisSearchableDropdownComponent implements OnInit, OnChanges {
  /** Referencia al input de búsqueda */
  @ViewChild('searchInput') searchInput?: ElementRef<HTMLInputElement>;

  /** Tamaño del dropdown */
  @Input() size: SearchableDropdownSize = 'md';

  /** Opciones del dropdown */
  @Input() options: SearchableDropdownOption[] = [];

  /** Valor actualmente seleccionado */
  @Input() selectedValue: string = '';

  /** Placeholder del input */
  @Input() placeholder: string = 'Buscar...';

  /** Texto del tooltip */
  @Input() tooltip?: string;

  /** Estado deshabilitado */
  @Input() disabled: boolean = false;

  /** Permite búsqueda por descripción también */
  @Input() searchInDescription: boolean = true;

  /** Variante del dropdown */
  @Input() variant: 'default' | 'danger' = 'default';

  /** Posición del tooltip */
  @Input() tooltipPosition: 'top' | 'bottom' | 'left' | 'right' = 'top';

  /** Emite cuando cambia la selección */
  @Output() selectionChanged = new EventEmitter<string>();

  /** Emite cuando cambia el término de búsqueda */
  @Output() searchChanged = new EventEmitter<string>();

  /** Estado del dropdown */
  isOpen: boolean = false;

  /** Término de búsqueda actual */
  searchTerm: string = '';

  /** Opciones filtradas */
  filteredOptions: SearchableDropdownOption[] = [];

  /** Índice de la opción resaltada */
  highlightedIndex: number = -1;

  /** Estado del tooltip */
  showTooltip: boolean = false;

  /** Valor para mostrar en el input */
  displayValue: string = '';

  constructor(private cdr: ChangeDetectorRef) {}

  ngOnInit(): void {
    this.filteredOptions = [...this.options];
    this.updateDisplayValue();
  }

  ngOnChanges(): void {
    this.filteredOptions = [...this.options];
    this.updateDisplayValue();
    this.filterOptions();
    this.showTooltip = false;
  }

  /**
   * Maneja el cambio en el input de búsqueda
   */
  onSearchChange(event: Event): void {
    const target = event.target as HTMLInputElement;
    this.searchTerm = target.value;
    this.displayValue = target.value;
    this.searchChanged.emit(this.searchTerm);
    this.filterOptions();
    this.highlightedIndex = -1;

    if (!this.isOpen) {
      this.isOpen = true;
    }
  }

  /**
   * Filtra las opciones según el término de búsqueda
   */
  private filterOptions(): void {
    if (!this.searchTerm.trim()) {
      this.filteredOptions = [...this.options];
      return;
    }

    const searchLower = this.searchTerm.toLowerCase();
    this.filteredOptions = this.options.filter((option) => {
      const labelMatch = option.label.toLowerCase().includes(searchLower);
      const descriptionMatch =
        this.searchInDescription &&
        option.description?.toLowerCase().includes(searchLower);
      return labelMatch || descriptionMatch;
    });
  }

  /**
   * Selecciona una opción
   */
  selectOption(option: SearchableDropdownOption, event?: Event): void {
    // Prevenir la propagación del evento para evitar que se ejecute onDocumentClick
    if (event) {
      event.stopPropagation();
    }

    this.selectedValue = option.value;
    this.displayValue = option.label;
    this.searchTerm = option.label;
    this.isOpen = false;
    this.highlightedIndex = -1;
    this.selectionChanged.emit(option.value);
    this.updateDisplayValue();
  }

  /**
   * Alterna el estado del dropdown
   */
  toggleDropdown(event?: Event): void {
    if (this.disabled) return;

    // Prevenir la propagación del evento para evitar que se ejecute onDocumentClick
    if (event) {
      event.stopPropagation();
    }

    this.isOpen = !this.isOpen;
    if (this.isOpen) {
      this.filteredOptions = [...this.options];
      this.highlightedIndex = -1;
      setTimeout(() => this.searchInput?.nativeElement.focus(), 0);
    }
  }

  /**
   * Maneja el foco del input
   */
  onFocus(): void {
    if (!this.disabled) {
      this.isOpen = true;
      this.filteredOptions = [...this.options];
    }
  }

  /**
   * Maneja cuando se pierde el foco
   */
  onBlur(): void {
    // Delay para permitir clicks en opciones
    setTimeout(() => {
      this.isOpen = false;
      this.updateDisplayValue();
      this.showTooltip = false;
    }, 150);
  }

  /**
   * Maneja las teclas de navegación
   */
  onKeyDown(event: KeyboardEvent): void {
    if (this.disabled) return;

    switch (event.key) {
      case 'ArrowDown':
        event.preventDefault();
        this.navigateDown();
        break;
      case 'ArrowUp':
        event.preventDefault();
        this.navigateUp();
        break;
      case 'Enter':
        event.preventDefault();
        this.selectHighlightedOption();
        break;
      case 'Escape':
        event.preventDefault();
        this.isOpen = false;
        this.updateDisplayValue();
        break;
    }
  }

  /**
   * Navega hacia abajo en la lista
   */
  private navigateDown(): void {
    if (this.highlightedIndex < this.filteredOptions.length - 1) {
      this.highlightedIndex++;
    } else {
      this.highlightedIndex = 0;
    }
  }

  /**
   * Navega hacia arriba en la lista
   */
  private navigateUp(): void {
    if (this.highlightedIndex > 0) {
      this.highlightedIndex--;
    } else {
      this.highlightedIndex = this.filteredOptions.length - 1;
    }
  }

  /**
   * Selecciona la opción resaltada
   */
  private selectHighlightedOption(): void {
    if (
      this.highlightedIndex >= 0 &&
      this.highlightedIndex < this.filteredOptions.length
    ) {
      this.selectOption(this.filteredOptions[this.highlightedIndex]);
    }
  }

  /**
   * Actualiza el valor mostrado en el input
   */
  private updateDisplayValue(): void {
    const selectedOption = this.options.find(
      (opt) => opt.value === this.selectedValue
    );
    if (selectedOption) {
      this.displayValue = selectedOption.label;
      this.searchTerm = selectedOption.label;
    } else if (!this.isOpen) {
      this.displayValue = '';
      this.searchTerm = '';
    }
  }

  /**
   * Obtiene la clase CSS según el tamaño configurado
   */
  getSizeClass(): string {
    return `searchable-dropdown--${this.size}`;
  }

  /** Muestra el tooltip */
  onMouseEnter(): void {
    if (this.tooltip) {
      this.showTooltip = true;
    }
  }

  /** Oculta el tooltip */
  onMouseLeave(): void {
    this.showTooltip = false;
  }

  /**
   * Escucha clics fuera del componente para cerrarlo
   */
  @HostListener('document:click', ['$event'])
  onDocumentClick(event: Event): void {
    const target = event.target as HTMLElement;
    const dropdownElement = target.closest('.searchable-dropdown');

    // Solo cerrar si el clic es realmente fuera del componente
    if (!dropdownElement && this.isOpen) {
      this.isOpen = false;
      this.updateDisplayValue();
    }
  }
}
