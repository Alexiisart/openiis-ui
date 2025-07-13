import {
  Component,
  Input,
  Output,
  EventEmitter,
  forwardRef,
} from '@angular/core';
import { CommonModule } from '@angular/common';
import { ControlValueAccessor, NG_VALUE_ACCESSOR } from '@angular/forms';

export type RadioButtonSize = 'xs' | 'sm' | 'md' | 'lg' | 'xl';
export type RadioButtonType = 'success' | 'warning' | 'danger' | 'subtle';

@Component({
  selector: 'openiis-radio-button',
  standalone: true,
  imports: [CommonModule],
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: forwardRef(() => OpeniisRadioButtonComponent),
      multi: true,
    },
  ],
  template: `
    <div
      class="radio-container"
      [class]="containerClasses"
      [attr.data-size]="size"
      [attr.data-type]="type"
    >
      <label [for]="radioId" class="radio-label">
        <input
          [id]="radioId"
          type="radio"
          class="radio-input"
          [name]="name"
          [value]="value"
          [checked]="isChecked"
          [disabled]="disabled"
          [readonly]="readonly"
          [attr.aria-label]="ariaLabel"
          [attr.aria-describedby]="ariaDescribedBy"
          [attr.title]="title || null"
          (change)="onRadioChange($event)"
          (focus)="onFocus($event)"
          (blur)="onBlur($event)"
        />
        <div class="radio-indicator">
          <div class="radio-dot"></div>
        </div>
        @if (label) {
        <span class="radio-text">{{ label }}</span>
        }
      </label>

      @if (helpText && !errorText) {
      <div class="radio-help">{{ helpText }}</div>
      } @if (errorText) {
      <div class="radio-error">{{ errorText }}</div>
      }
    </div>
  `,
  styleUrls: ['./radio-button.component.css'],
})
export class OpeniisRadioButtonComponent implements ControlValueAccessor {
  /**
   * Tamaño del radio button
   */
  @Input() size: RadioButtonSize = 'md';

  /**
   * Tipo visual del radio button
   */
  @Input() type: RadioButtonType = 'success';

  /**
   * Texto de la etiqueta
   */
  @Input() label: string = '';

  /**
   * Texto de ayuda
   */
  @Input() helpText: string = '';

  /**
   * Texto de error
   */
  @Input() errorText: string = '';

  /**
   * Valor del radio button
   */
  @Input() value: any = '';

  /**
   * Nombre del grupo de radio buttons
   */
  @Input() name: string = '';

  /**
   * Estado deshabilitado
   */
  @Input() disabled: boolean = false;

  /**
   * Estado solo lectura
   */
  @Input() readonly: boolean = false;

  /**
   * ID único del radio button
   */
  @Input() radioId: string = `radio-${Math.random().toString(36).substr(2, 9)}`;

  /**
   * ARIA label para accesibilidad
   */
  @Input() ariaLabel: string = '';

  /**
   * ARIA describedby para accesibilidad
   */
  @Input() ariaDescribedBy: string = '';

  /**
   * Título para tooltip
   */
  @Input() title: string = '';

  /**
   * Clases CSS adicionales
   */
  @Input() extraClasses: string = '';

  /**
   * Evento emitido cuando el valor cambia
   */
  @Output() checkedChange = new EventEmitter<any>();

  /**
   * Evento emitido al recibir foco
   */
  @Output() focusEvent = new EventEmitter<FocusEvent>();

  /**
   * Evento emitido al perder foco
   */
  @Output() blurEvent = new EventEmitter<FocusEvent>();

  /**
   * Valor seleccionado actual
   */
  selectedValue: any = null;

  /**
   * Función llamada cuando el valor cambia (ControlValueAccessor)
   */
  private onChange = (value: any) => {};

  /**
   * Función llamada cuando el componente es tocado (ControlValueAccessor)
   */
  private onTouched = () => {};

  /**
   * Obtiene si este radio button está seleccionado
   */
  get isChecked(): boolean {
    return this.selectedValue === this.value;
  }

  /**
   * Genera las clases CSS del contenedor
   */
  get containerClasses(): string {
    const classes = ['radio-container'];

    if (this.disabled) classes.push('disabled');
    if (this.readonly) classes.push('readonly');
    if (this.errorText) classes.push('error');
    if (this.isChecked) classes.push('checked');
    if (this.extraClasses) classes.push(this.extraClasses);

    return classes.join(' ');
  }

  /**
   * Maneja el cambio del radio button
   */
  onRadioChange(event: Event): void {
    if (this.disabled || this.readonly) return;

    const target = event.target as HTMLInputElement;
    if (target.checked) {
      this.selectedValue = this.value;
      this.onChange(this.value);
      this.checkedChange.emit(this.value);
    }
  }

  /**
   * Maneja el evento de foco
   */
  onFocus(event: FocusEvent): void {
    this.focusEvent.emit(event);
  }

  /**
   * Maneja el evento de pérdida de foco
   */
  onBlur(event: FocusEvent): void {
    this.onTouched();
    this.blurEvent.emit(event);
  }

  // Implementación de ControlValueAccessor

  /**
   * Escribe un valor desde el formulario hacia el componente
   */
  writeValue(value: any): void {
    this.selectedValue = value;
  }

  /**
   * Registra la función a llamar cuando el valor cambia
   */
  registerOnChange(fn: (value: any) => void): void {
    this.onChange = fn;
  }

  /**
   * Registra la función a llamar cuando el componente es tocado
   */
  registerOnTouched(fn: () => void): void {
    this.onTouched = fn;
  }

  /**
   * Establece el estado deshabilitado
   */
  setDisabledState(isDisabled: boolean): void {
    this.disabled = isDisabled;
  }
}
