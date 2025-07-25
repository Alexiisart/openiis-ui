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
} from '@angular/core';
import { CommonModule } from '@angular/common';
import { OpeniisTooltipComponent } from '../tooltip';

/**
 * Interface para las opciones del dropdown
 */
export interface DropdownOption {
  value: string;
  label: string;
}

/**
 * Tamaños disponibles para el dropdown
 */
export type DropdownSize = 'sm' | 'md' | 'lg';

@Component({
  selector: 'openiis-dropdown',
  standalone: true,
  imports: [CommonModule, OpeniisTooltipComponent],
  template: `
    <div
      class="dropdown"
      [class]="getSizeClass()"
      (mouseenter)="onMouseEnter()"
      (mouseleave)="onMouseLeave()"
    >
      <div class="dropdown-wrapper">
        <select
          #dropdownSelect
          class="dropdown-select"
          [value]="selectedValue"
          (change)="onSelectionChange($event)"
          (focus)="onFocus()"
          (blur)="onBlur()"
          [disabled]="disabled"
        >
          @for (option of options; track option.value) {
          <option [value]="option.value">{{ option.label }}</option>
          }
        </select>

        <div class="dropdown-icon">
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

      <!-- Tooltip fuera del dropdown-wrapper para evitar conflictos con select nativo -->
      @if (showTooltip && tooltip && !isOpen) {
      <openiis-tooltip
        [text]="tooltip"
        [position]="tooltipPosition"
        [variant]="variant"
        [visible]="showTooltip"
      >
      </openiis-tooltip>
      }
    </div>
  `,
  styleUrls: ['./dropdown.component.css'],
})
export class OpeniisDropdownComponent implements OnInit, OnChanges {
  /** Referencia al select element */
  @ViewChild('dropdownSelect') dropdownSelect?: ElementRef<HTMLSelectElement>;

  /** Tamaño del dropdown */
  @Input() size: DropdownSize = 'md';

  /** Opciones del dropdown */
  @Input() options: DropdownOption[] = [];

  /** Valor actualmente seleccionado */
  @Input() selectedValue: string = '';

  /** Texto del tooltip */
  @Input() tooltip?: string;

  /** Posición del tooltip */
  @Input() tooltipPosition: 'top' | 'bottom' | 'left' | 'right' = 'top';

  /** Permite búsqueda por descripción también */
  @Input() variant: 'default' | 'danger' = 'default';

  /** Estado deshabilitado */
  @Input() disabled: boolean = false;

  /** Emite cuando cambia la selección */
  @Output() selectionChanged = new EventEmitter<string>();

  /** Estado del tooltip */
  showTooltip: boolean = false;

  /** Estado del dropdown */
  isOpen: boolean = false;

  constructor(private cdr: ChangeDetectorRef) {}

  ngOnInit(): void {
    // Forzar detección de cambios después de la inicialización
    setTimeout(() => {
      this.cdr.detectChanges();
    }, 0);
  }

  ngOnChanges(): void {
    // Sincronizar el valor del select cuando cambien los inputs
    setTimeout(() => {
      this.updateSelectValue();
    }, 0);
    this.showTooltip = false;
  }

  /**
   * Maneja el cambio de selección
   */
  onSelectionChange(event: Event): void {
    const target = event.target as HTMLSelectElement;
    const value = target.value;
    this.selectedValue = value;
    this.selectionChanged.emit(value);
    this.isOpen = false;
  }

  /**
   * Actualiza manualmente el valor del select
   */
  private updateSelectValue(): void {
    if (this.dropdownSelect) {
      const selectElement = this.dropdownSelect.nativeElement;
      selectElement.value = this.selectedValue;
    }
  }

  /**
   * Obtiene la clase CSS según el tamaño configurado
   */
  getSizeClass(): string {
    return `dropdown--${this.size}`;
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

  /** Maneja el foco del select */
  onFocus(): void {
    this.isOpen = true;
  }

  /** Maneja la pérdida de foco del select */
  onBlur(): void {
    this.isOpen = false;
  }
}
