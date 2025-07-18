import {
  Component,
  Input,
  Output,
  EventEmitter,
  forwardRef,
  ViewChild,
  ElementRef,
} from '@angular/core';
import { CommonModule } from '@angular/common';
import { ControlValueAccessor, NG_VALUE_ACCESSOR } from '@angular/forms';

export type InputType =
  | 'text'
  | 'email'
  | 'password'
  | 'search'
  | 'url'
  | 'tel'
  | 'number';
export type InputVariant =
  | 'default'
  | 'filled'
  | 'outlined'
  | 'minimal'
  | 'error';
export type InputSize = 'xs' | 'sm' | 'md' | 'lg' | 'xl';

export interface ValidationResult {
  isValid: boolean;
  message?: string;
}

@Component({
  selector: 'openiis-input',
  standalone: true,
  imports: [CommonModule],
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: forwardRef(() => OpeniisInputComponent),
      multi: true,
    },
  ],
  templateUrl: './input.component.html',
  styleUrls: ['./input.component.css'],
})
export class OpeniisInputComponent implements ControlValueAccessor {
  @Input() type: InputType = 'text';
  @Input() variant: InputVariant = 'default';
  @Input() size: InputSize = 'md';
  @Input() label: string = '';
  @Input() placeholder: string = '';
  @Input() helpText: string = '';
  @Input() errorText: string = '';
  @Input() value: string = '';
  @Input() disabled: boolean = false;
  @Input() readonly: boolean = false;
  @Input() inputId: string = `input-${Math.random().toString(36).substr(2, 9)}`;
  @Input() iconLeft: string = '';
  @Input() iconRight: string = '';
  @Input() clearable: boolean = false;
  @Input() maxLength: number | null = null;
  @Input() autocomplete: string = 'off';
  @Input() showCharacterCount: boolean = false;
  @Input() isTextarea: boolean = false;
  @Input() rows: number = 3;
  @Input() ariaLabel: string = '';
  @Input() ariaDescribedBy: string = '';
  @Input() title: string = '';
  @Input() extraClasses: string = '';
  @Input() minLength: number | null = null;
  @Input() customFormat: string = '';
  @Input() enableValidation: boolean = true;
  @Input() showValidationIcons: boolean = true;

  @Output() valueChange = new EventEmitter<string>();
  @Output() validationChange = new EventEmitter<ValidationResult>();
  @Output() focusEvent = new EventEmitter<FocusEvent>();
  @Output() blurEvent = new EventEmitter<FocusEvent>();
  @Output() keydownEvent = new EventEmitter<KeyboardEvent>();
  @Output() keyupEvent = new EventEmitter<KeyboardEvent>();

  @ViewChild('inputElement', { static: false })
  inputElement!: ElementRef<HTMLInputElement | HTMLTextAreaElement>;

  passwordVisible = false;
  currentValidation: ValidationResult = { isValid: true };

  private onChange = (value: string) => {};
  private onTouched = () => {};

  constructor() {}

  /**
   * Genera las clases CSS del contenedor basadas en el estado
   */
  get containerClasses(): string {
    const classes = ['input-container'];

    if (this.disabled) classes.push('disabled');
    if (this.readonly) classes.push('readonly');
    if (this.errorText) classes.push('error');
    if (this.currentValidation.isValid === false) classes.push('invalid');
    if (this.iconLeft) classes.push('input-has-icon-left');
    if (this.iconRight) classes.push('input-has-icon-right');
    if (this.clearable && this.value) classes.push('input-has-clear');
    if (this.type === 'password') classes.push('input-has-password-toggle');
    if (this.enableValidation && this.showValidationIcons)
      classes.push('input-has-validation');
    if (this.extraClasses) classes.push(this.extraClasses);

    return classes.join(' ');
  }

  /**
   * Obtiene el tipo de input apropiado
   */
  getInputType(): string {
    if (this.type === 'password' && !this.passwordVisible) {
      return 'password';
    }
    if (this.type === 'password' && this.passwordVisible) {
      return 'text';
    }
    return this.type;
  }

  /**
   * Obtiene el valor a mostrar en el input
   */
  getDisplayValue(): string {
    return this.value;
  }

  /**
   * Obtiene el placeholder apropiado
   */
  getPlaceholder(): string {
    if (this.type === 'tel' && this.customFormat) {
      return this.customFormat;
    }
    return this.placeholder;
  }

  /**
   * Obtiene la longitud máxima apropiada
   */
  getMaxLength(): number | null {
    return this.maxLength;
  }

  /**
   * Obtiene el valor de autocomplete apropiado
   */
  getAutocompleteValue(): string | null {
    // Técnicas más agresivas para desactivar autocompletado
    switch (this.type) {
      case 'password':
        return 'new-password'; // Más efectivo para contraseñas
      case 'email':
        return 'chrome-off'; // Más efectivo para emails
      default:
        return 'chrome-off'; // Más efectivo que 'off' en Chrome
    }
  }

  /**
   * Genera un nombre aleatorio para el input para evitar autocompletado
   */
  getRandomName(): string {
    return `openiis-input-${Math.random().toString(36).substr(2, 9)}`;
  }

  /**
   * Método para deshabilitar temporalmente el autocompletado
   */
  disableAutocomplete(): void {
    if (this.inputElement) {
      const element = this.inputElement.nativeElement;
      // Técnica 1: Cambiar autocomplete dinámicamente
      element.setAttribute('autocomplete', 'chrome-off');

      // Técnica 2: Agregar atributos adicionales
      element.setAttribute('data-lpignore', 'true'); // Para LastPass
      element.setAttribute('data-form-type', 'other'); // Para evitar detección

      // Técnica 3: Readonly temporal para contraseñas
      if (this.type === 'password' && !this.readonly) {
        element.setAttribute('readonly', 'true');
        setTimeout(() => {
          element.removeAttribute('readonly');
        }, 100);
      }
    }
  }

  /**
   * Alterna la visibilidad de la contraseña
   */
  togglePasswordVisibility(): void {
    this.passwordVisible = !this.passwordVisible;
  }

  /**
   * Valida email
   */
  validateEmail(email: string): ValidationResult {
    if (!email) return { isValid: true };

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    const isValid = emailRegex.test(email);

    return {
      isValid,
      message: isValid ? undefined : 'Formato de email inválido',
    };
  }

  /**
   * Valida contraseña
   */
  validatePassword(password: string): ValidationResult {
    if (!password) return { isValid: true };

    const minLength = this.minLength || 8;
    const isValid = password.length >= minLength;

    return {
      isValid,
      message: isValid
        ? undefined
        : `La contraseña debe tener al menos ${minLength} caracteres`,
    };
  }

  /**
   * Valida teléfono básico
   */
  validatePhone(phone: string): ValidationResult {
    if (!phone) return { isValid: true };

    // Validación básica: solo números y algunos caracteres especiales
    const phoneRegex = /^[\d\s\-\(\)\+\.]+$/;
    const isValid = phoneRegex.test(phone);

    return {
      isValid,
      message: isValid ? undefined : 'Formato de teléfono inválido',
    };
  }

  /**
   * Valida longitud
   */
  validateLength(value: string): ValidationResult {
    if (this.minLength && value.length < this.minLength) {
      return {
        isValid: false,
        message: `Mínimo ${this.minLength} caracteres`,
      };
    }

    if (this.maxLength && value.length > this.maxLength) {
      return {
        isValid: false,
        message: `Máximo ${this.maxLength} caracteres`,
      };
    }

    return { isValid: true };
  }

  /**
   * Valida el valor según el tipo
   */
  validateValue(value: string): ValidationResult {
    if (!this.enableValidation) {
      return { isValid: true };
    }

    // Validación de longitud primero
    const lengthValidation = this.validateLength(value);
    if (!lengthValidation.isValid) {
      return lengthValidation;
    }

    // Validación específica por tipo
    switch (this.type) {
      case 'email':
        return this.validateEmail(value);
      case 'password':
        return this.validatePassword(value);
      case 'tel':
        return this.validatePhone(value);
      default:
        return { isValid: true };
    }
  }

  /**
   * Aplica formato personalizado para teléfonos
   */
  private applyCustomFormat(value: string, format: string): string {
    if (!format || !value) return value;

    const digits = value.replace(/\D/g, '');
    let formatted = '';
    let digitIndex = 0;

    for (let i = 0; i < format.length && digitIndex < digits.length; i++) {
      if (format[i] === 'X' || format[i] === 'x') {
        formatted += digits[digitIndex];
        digitIndex++;
      } else {
        // Solo agregar separadores si hay más dígitos
        if (digitIndex < digits.length) {
          formatted += format[i];
        }
      }
    }

    // Agregar dígitos restantes si los hay
    if (digitIndex < digits.length) {
      formatted += digits.substring(digitIndex);
    }

    return formatted;
  }

  /**
   * Formatea URLs automáticamente
   */
  private formatUrlInput(value: string): string {
    if (!value.trim()) return value;

    const trimmed = value.trim();

    // Si no tiene protocolo, agregar https://
    if (trimmed && !trimmed.match(/^https?:\/\//)) {
      // Si parece una URL (contiene punto), agregar https://
      if (trimmed.includes('.')) {
        return `https://${trimmed}`;
      }
    }

    return trimmed;
  }

  /**
   * Capitaliza palabras (nombres y apellidos)
   */
  private capitalizeWords(value: string): string {
    if (!value.trim()) return value;

    return value.replace(/\b\w/g, (char) => char.toUpperCase());
  }

  /**
   * Maneja el evento de input
   */
  onInput(event: Event): void {
    const target = event.target as HTMLInputElement | HTMLTextAreaElement;
    let value = target.value;

    // Aplicar formateo suave según el tipo
    switch (this.type) {
      case 'tel':
        // Para teléfonos, solo permitir números y aplicar formato si existe
        const numbersOnly = value.replace(/\D/g, '');
        if (this.customFormat && numbersOnly.length > 0) {
          value = this.applyCustomFormat(numbersOnly, this.customFormat);
          target.value = value;
        } else {
          // Si no hay formato personalizado, solo mantener números
          value = numbersOnly;
          target.value = value;
        }
        break;

      case 'number':
        // Solo permitir números
        value = value.replace(/\D/g, '');
        target.value = value;
        break;

      case 'email':
        // Solo convertir a minúsculas, sin otros cambios
        if (value !== value.toLowerCase()) {
          value = value.toLowerCase();
          target.value = value;
        }
        break;

      case 'url':
      case 'text':
        // No formatear mientras escribe
        break;
    }

    // Actualizar el valor
    this.value = value;
    this.onChange(this.value);
    this.valueChange.emit(this.value);

    // Validación
    this.currentValidation = this.validateValue(this.value);
    this.validationChange.emit(this.currentValidation);
  }

  /**
   * Maneja el evento de foco
   */
  onFocus(event: FocusEvent): void {
    // Aplicar técnicas anti-autocompletado cuando se enfoca
    this.disableAutocomplete();
    this.focusEvent.emit(event);
  }

  /**
   * Maneja el evento de blur (cuando el input pierde foco)
   */
  onBlur(event: FocusEvent): void {
    const target = event.target as HTMLInputElement | HTMLTextAreaElement;
    let finalValue = this.value;

    // Aplicar formateo final según el tipo
    switch (this.type) {
      case 'tel':
        // Formateo final de teléfonos con formato personalizado
        if (this.customFormat && this.value) {
          const numbersOnly = this.value.replace(/\D/g, '');
          if (numbersOnly.length > 0) {
            const formatted = this.applyCustomFormat(
              numbersOnly,
              this.customFormat
            );
            if (formatted !== this.value) {
              finalValue = formatted;
              target.value = formatted;
            }
          }
        }
        break;

      case 'url':
        // Formateo final de URLs
        if (this.value.trim()) {
          const formatted = this.formatUrlInput(this.value);
          if (formatted !== this.value) {
            finalValue = formatted;
            target.value = formatted;
          }
        }
        break;

      case 'text':
        // Capitalización final para nombres
        if (
          (this.label.toLowerCase().includes('nombre') ||
            this.label.toLowerCase().includes('apellido')) &&
          this.value.trim()
        ) {
          const formatted = this.capitalizeWords(this.value);
          if (formatted !== this.value) {
            finalValue = formatted;
            target.value = formatted;
          }
        }
        break;
    }

    // Actualizar valor si cambió
    if (finalValue !== this.value) {
      this.value = finalValue;
      this.onChange(finalValue);
      this.valueChange.emit(finalValue);
    }

    this.onTouched();
    this.blurEvent.emit(event);
  }

  /**
   * Maneja el evento de keydown
   */
  onKeyDown(event: KeyboardEvent): void {
    this.keydownEvent.emit(event);
  }

  /**
   * Maneja el evento de keyup
   */
  onKeyUp(event: KeyboardEvent): void {
    this.keyupEvent.emit(event);
  }

  /**
   * Limpia el valor del input
   */
  clearValue(): void {
    this.value = '';
    this.onChange('');
    this.valueChange.emit('');
    this.currentValidation = { isValid: true };
    this.validationChange.emit(this.currentValidation);
  }

  /**
   * Enfoca el input
   */
  focus(): void {
    if (this.inputElement) {
      this.inputElement.nativeElement.focus();
    }
  }

  /**
   * Selecciona todo el texto
   */
  selectAll(): void {
    if (this.inputElement) {
      this.inputElement.nativeElement.select();
    }
  }

  // Implementación de ControlValueAccessor
  writeValue(value: string): void {
    this.value = value || '';
    if (this.enableValidation) {
      this.currentValidation = this.validateValue(this.value);
    }
  }

  registerOnChange(fn: (value: string) => void): void {
    this.onChange = fn;
  }

  registerOnTouched(fn: () => void): void {
    this.onTouched = fn;
  }

  setDisabledState(isDisabled: boolean): void {
    this.disabled = isDisabled;
  }
}
