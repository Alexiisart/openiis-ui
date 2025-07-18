import {
  Component,
  Input,
  Output,
  EventEmitter,
  forwardRef,
} from '@angular/core';
import { CommonModule } from '@angular/common';
import { ControlValueAccessor, NG_VALUE_ACCESSOR } from '@angular/forms';

export type SwitchSize = 'xs' | 'sm' | 'md' | 'lg' | 'xl';
export type SwitchVariant =
  | 'default'
  | 'primary'
  | 'success'
  | 'warning'
  | 'danger'
  | 'subtle';

@Component({
  selector: 'openiis-switch',
  standalone: true,
  imports: [CommonModule],
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: forwardRef(() => OpeniisSwitchComponent),
      multi: true,
    },
  ],
  template: `
    <div
      class="switch-container"
      [class]="containerClasses"
      [attr.data-size]="size"
      [attr.data-variant]="variant"
    >
      <label [for]="switchId" class="switch-label">
        @if (label) {
        <span class="switch-text">{{ label }}</span>
        }
        <div class="switch-wrapper">
          <input
            [id]="switchId"
            type="checkbox"
            class="switch-input"
            [checked]="checked"
            [disabled]="disabled"
            [readonly]="readonly"
            [attr.aria-label]="ariaLabel"
            [attr.aria-describedby]="ariaDescribedBy"
            [attr.title]="title || null"
            (change)="onSwitchChange($event)"
            (focus)="onFocus($event)"
            (blur)="onBlur($event)"
          />
          <div class="switch-track">
            <div class="switch-thumb">
              @if (showIcons) {
              <span
                class="switch-icon material-icons"
                [class.checked]="checked"
              >
                {{ checked ? checkedIcon : uncheckedIcon }}
              </span>
              }
            </div>
          </div>
        </div>
      </label>

      @if (helpText && !errorText) {
      <div class="switch-help">{{ helpText }}</div>
      } @if (errorText) {
      <div class="switch-error">{{ errorText }}</div>
      }
    </div>
  `,
  styleUrls: ['./switch.component.css'],
})
export class OpeniisSwitchComponent implements ControlValueAccessor {
  /**
   * Tamaño del switch
   */
  @Input() size: SwitchSize = 'md';

  /**
   * Variante visual del switch
   */
  @Input() variant: SwitchVariant = 'default';

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
   * Estado del switch (encendido/apagado)
   */
  @Input() checked: boolean = false;

  /**
   * Estado deshabilitado
   */
  @Input() disabled: boolean = false;

  /**
   * Estado solo lectura
   */
  @Input() readonly: boolean = false;

  /**
   * ID único del switch
   */
  @Input() switchId: string = `switch-${Math.random()
    .toString(36)
    .substr(2, 9)}`;

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
   * Mostrar iconos en el switch
   */
  @Input() showIcons: boolean = false;

  /**
   * Icono cuando está encendido
   */
  @Input() checkedIcon: string = 'check';

  /**
   * Icono cuando está apagado
   */
  @Input() uncheckedIcon: string = 'close';

  /**
   * Clases CSS adicionales
   */
  @Input() extraClasses: string = '';

  /**
   * Evento emitido cuando el estado cambia
   */
  @Output() checkedChange = new EventEmitter<boolean>();

  /**
   * Evento emitido al recibir foco
   */
  @Output() focusEvent = new EventEmitter<FocusEvent>();

  /**
   * Evento emitido al perder foco
   */
  @Output() blurEvent = new EventEmitter<FocusEvent>();

  /**
   * Función llamada cuando el valor cambia (ControlValueAccessor)
   */
  private onChange = (value: boolean) => {};

  /**
   * Función llamada cuando el componente es tocado (ControlValueAccessor)
   */
  private onTouched = () => {};

  /**
   * Genera las clases CSS del contenedor
   */
  get containerClasses(): string {
    const classes = ['switch-container'];

    if (this.disabled) classes.push('disabled');
    if (this.readonly) classes.push('readonly');
    if (this.errorText) classes.push('error');
    if (this.checked) classes.push('checked');
    if (this.extraClasses) classes.push(this.extraClasses);

    return classes.join(' ');
  }

  /**
   * Maneja el cambio del switch
   */
  onSwitchChange(event: Event): void {
    if (this.disabled || this.readonly) return;

    const target = event.target as HTMLInputElement;
    this.checked = target.checked;
    this.onChange(this.checked);
    this.checkedChange.emit(this.checked);
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
  writeValue(value: boolean): void {
    this.checked = value || false;
  }

  /**
   * Registra la función a llamar cuando el valor cambia
   */
  registerOnChange(fn: (value: boolean) => void): void {
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
