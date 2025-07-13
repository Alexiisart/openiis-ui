import {
  Component,
  EventEmitter,
  Input,
  Output,
  OnInit,
  OnChanges,
  ViewChild,
  ElementRef,
} from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { OpeniisTooltipComponent } from '../tooltip/tooltip.component';

@Component({
  selector: 'openiis-date-input',
  standalone: true,
  imports: [CommonModule, FormsModule, OpeniisTooltipComponent],
  template: `
    <div class="date-input-container" [class]="'size-' + size">
      <div
        class="date-input-wrapper"
        (mouseenter)="showTooltip = true"
        (mouseleave)="showTooltip = false"
      >
        <input
          #dateInput
          [id]="inputId"
          type="date"
          class="date-input"
          [class.overdue]="isOverdue"
          [(ngModel)]="dateValue"
          (ngModelChange)="onDateChange($event)"
          [placeholder]="placeholder"
          [min]="minDate"
          [disabled]="disabled"
        />

        <!-- Icono personalizado de calendario -->
        <button
          type="button"
          class="calendar-icon-btn"
          (click)="openDatePicker()"
          [disabled]="disabled"
          title="Seleccionar fecha"
        >
          <span class="material-icons-outlined">calendar_today</span>
        </button>

        @if (title) {
        <openiis-tooltip
          [text]="title"
          [visible]="showTooltip"
          position="top"
          variant="default"
        >
        </openiis-tooltip>
        } @if (dateValue && !disabled) {
        <button
          type="button"
          class="clear-date-btn"
          (click)="clearDate()"
          title="Eliminar fecha"
        >
          <span class="material-icons-outlined">close</span>
        </button>
        }
      </div>
    </div>
  `,
  styleUrls: ['./date-input.component.css'],
})
export class OpeniisDateInputComponent implements OnInit, OnChanges {
  /** Referencia al input de fecha */
  @ViewChild('dateInput') dateInput!: ElementRef<HTMLInputElement>;

  /** ID del input de fecha */
  @Input() inputId = 'date-input';

  /** Texto placeholder del input */
  @Input() placeholder = '';

  /** Valor del input en formato ISO string o null */
  @Input() value: string | null = null;

  /** Tamaño del input: 'sm' | 'md' | 'lg' */
  @Input() size: 'sm' | 'md' | 'lg' = 'md';

  /** Si el input está deshabilitado */
  @Input() disabled = false;

  /** Fecha mínima permitida en formato ISO string */
  @Input() minDate: string | null = null;

  /** Texto del tooltip */
  @Input() title = '';

  /** Si debe marcar las fechas vencidas (opcional) */
  @Input() markOverdue = false;

  /** Evento emitido cuando cambia el valor */
  @Output() valueChange = new EventEmitter<string | null>();

  /** Valor actual del input */
  dateValue = '';

  /** Controla la visibilidad del tooltip */
  showTooltip = false;

  /**
   * Inicializa el componente estableciendo el valor inicial
   */
  ngOnInit(): void {
    this.dateValue = this.value ? this.formatDateForInput(this.value) : '';
  }

  /**
   * Actualiza el valor del input cuando cambian las propiedades
   */
  ngOnChanges(): void {
    this.dateValue = this.value ? this.formatDateForInput(this.value) : '';
  }

  /**
   * Maneja el cambio de fecha y emite el nuevo valor
   * @param value Nueva fecha seleccionada
   */
  onDateChange(value: string): void {
    const isoDate = this.convertInputToISO(value);
    this.valueChange.emit(isoDate);
  }

  /**
   * Limpia el valor del input
   */
  clearDate(): void {
    this.dateValue = '';
    this.valueChange.emit(null);
  }

  /**
   * Abre el selector de fecha nativo haciendo clic en el input
   */
  openDatePicker(): void {
    if (!this.disabled && this.dateInput?.nativeElement) {
      this.dateInput.nativeElement.showPicker();
    }
  }

  /**
   * Determina si la fecha está vencida
   * @returns true si la fecha es anterior a hoy y markOverdue está habilitado
   */
  get isOverdue(): boolean {
    if (!this.dateValue || !this.markOverdue) return false;
    const isoDate = this.convertInputToISO(this.dateValue);
    return this.isDateOverdue(isoDate);
  }

  /**
   * Convierte una fecha ISO a formato de input HTML (YYYY-MM-DD)
   * @param isoDate Fecha en formato ISO
   * @returns Fecha en formato YYYY-MM-DD
   */
  private formatDateForInput(isoDate: string): string {
    if (!isoDate) return '';
    try {
      const date = new Date(isoDate);
      if (isNaN(date.getTime())) return '';

      const year = date.getFullYear();
      const month = String(date.getMonth() + 1).padStart(2, '0');
      const day = String(date.getDate()).padStart(2, '0');

      return `${year}-${month}-${day}`;
    } catch (error) {
      console.error('Error formatting date for input:', error);
      return '';
    }
  }

  /**
   * Convierte el valor del input a formato ISO string
   * @param inputValue Valor del input HTML
   * @returns Fecha en formato ISO o null si es inválida
   */
  private convertInputToISO(inputValue: string): string | null {
    if (!inputValue) return null;
    try {
      const date = new Date(inputValue + 'T00:00:00');
      if (isNaN(date.getTime())) return null;
      return date.toISOString();
    } catch (error) {
      console.error('Error converting input to ISO:', error);
      return null;
    }
  }

  /**
   * Verifica si una fecha está vencida (anterior a hoy)
   * @param isoDate Fecha en formato ISO
   * @returns true si la fecha es anterior a hoy
   */
  private isDateOverdue(isoDate: string | null): boolean {
    if (!isoDate) return false;
    try {
      const date = new Date(isoDate);
      const today = new Date();
      today.setHours(0, 0, 0, 0); // Resetear horas para comparar solo fechas
      date.setHours(0, 0, 0, 0);
      return date < today;
    } catch (error) {
      console.error('Error checking if date is overdue:', error);
      return false;
    }
  }
}
