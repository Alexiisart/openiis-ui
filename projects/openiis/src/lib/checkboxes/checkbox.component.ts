import {
  Component,
  Input,
  Output,
  EventEmitter,
  forwardRef,
  ElementRef,
  ViewChild,
} from '@angular/core';
import { CommonModule } from '@angular/common';
import { ControlValueAccessor, NG_VALUE_ACCESSOR } from '@angular/forms';

// Tipos de checkbox disponibles
export type CheckboxType =
  | 'default' // Checkbox estándar
  | 'primary' // Con colores primarios
  | 'success' // Color verde para tareas completadas
  | 'warning' // Color amarillo para advertencias
  | 'danger' // Color rojo para elementos críticos
  | 'subtle' // Estilo sutil y minimalista
  | 'outline'; // Solo borde, sin relleno

// Tamaños de checkbox disponibles
export type CheckboxSize = 'xs' | 'sm' | 'md' | 'lg' | 'xl';

// Componente Checkbox elegante y reutilizable
// Características:
// - 7 tipos de estilo diferentes
// - 5 tamaños predefinidos
// - Animaciones fluidas
// - Accesibilidad completa
// - Estados disabled e indeterminate
// - Compatible con reactive forms
// - Completamente responsivo
@Component({
  selector: 'openiis-checkbox',
  standalone: true,
  imports: [CommonModule],
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: forwardRef(() => OpeniisCheckboxComponent),
      multi: true,
    },
  ],
  template: `
    <div
      class="checkbox-container"
      [class]="containerClasses"
      [attr.data-size]="size"
      [attr.data-type]="type"
    >
      <input
        #checkboxInput
        type="checkbox"
        class="checkbox-input"
        [id]="inputId"
        [checked]="checked"
        [disabled]="disabled"
        [indeterminate]="indeterminate"
        [attr.aria-label]="ariaLabel"
        [attr.aria-describedby]="ariaDescribedBy"
        [attr.title]="title || null"
        (change)="onCheckboxChange($event)"
        (focus)="onFocus()"
        (blur)="onBlur()"
      />
      <label [for]="inputId" class="checkbox-label" [class.disabled]="disabled">
        <div class="checkbox-box">
          <div class="checkbox-checkmark">
            @if (indeterminate) {
            <span class="material-icons-outlined checkbox-icon">remove</span>
            } @else if (checked) {
            <span class="material-icons-outlined checkbox-icon">check</span>
            }
          </div>
        </div>
        @if (label) {
        <span class="checkbox-text">{{ label }}</span>
        }
      </label>
      @if (helpText && !disabled) {
      <div class="checkbox-help">{{ helpText }}</div>
      } @if (errorText && !disabled) {
      <div class="checkbox-error">{{ errorText }}</div>
      }
    </div>
  `,
  styleUrls: ['./checkbox.component.css'],
})
export class OpeniisCheckboxComponent implements ControlValueAccessor {
  // Tipo visual del checkbox
  @Input() type: CheckboxType = 'default';

  // Tamaño del checkbox
  @Input() size: CheckboxSize = 'md';

  // Texto de la etiqueta
  @Input() label: string = '';

  // Texto de ayuda opcional
  @Input() helpText: string = '';

  // Texto de error opcional
  @Input() errorText: string = '';

  // Estado checked del checkbox
  @Input() checked: boolean = false;

  // Estado disabled del checkbox
  @Input() disabled: boolean = false;

  // Estado indeterminate del checkbox
  @Input() indeterminate: boolean = false;

  // ID único para el input
  @Input() inputId: string = `checkbox-${Math.random()
    .toString(36)
    .substr(2, 9)}`;

  // Etiqueta ARIA para accesibilidad
  @Input() ariaLabel: string = '';

  // ID del elemento que describe el checkbox
  @Input() ariaDescribedBy: string = '';

  // Tooltip del checkbox
  @Input() title: string = '';

  // Clases CSS adicionales
  @Input() extraClasses: string = '';

  // Evento emitido cuando cambia el estado
  @Output() checkedChange = new EventEmitter<boolean>();

  // Evento emitido en focus
  @Output() focusEvent = new EventEmitter<void>();

  // Evento emitido en blur
  @Output() blurEvent = new EventEmitter<void>();

  @ViewChild('checkboxInput', { static: false })
  checkboxInput!: ElementRef<HTMLInputElement>;

  // Variables para ControlValueAccessor
  private onChange = (value: boolean) => {};
  private onTouched = () => {};

  // Clases CSS computadas para el contenedor
  get containerClasses(): string {
    const classes = ['checkbox-wrapper'];

    if (this.disabled) classes.push('checkbox-disabled');
    if (this.checked) classes.push('checkbox-checked');
    if (this.indeterminate) classes.push('checkbox-indeterminate');
    if (this.errorText) classes.push('checkbox-error-state');
    if (this.extraClasses) classes.push(this.extraClasses);

    return classes.join(' ');
  }

  // Maneja el cambio del checkbox
  onCheckboxChange(event: Event): void {
    if (this.disabled) return;

    const target = event.target as HTMLInputElement;
    const newValue = target.checked;

    // Actualizar inmediatamente el estado local para feedback visual inmediato
    this.checked = newValue;
    this.indeterminate = false; // Al hacer clic, sale del estado indeterminate

    // Asegurar que el input DOM esté sincronizado
    if (this.checkboxInput?.nativeElement) {
      this.checkboxInput.nativeElement.checked = newValue;
    }

    this.onChange(newValue);
    this.checkedChange.emit(newValue);
  }

  // Maneja el evento focus
  onFocus(): void {
    this.focusEvent.emit();
  }

  // Maneja el evento blur
  onBlur(): void {
    this.onTouched();
    this.blurEvent.emit();
  }

  // Implementación de ControlValueAccessor
  writeValue(value: boolean): void {
    this.checked = value;

    // Forzar actualización del input nativo si está disponible
    if (this.checkboxInput?.nativeElement) {
      this.checkboxInput.nativeElement.checked = value;
    }
  }

  registerOnChange(fn: (value: boolean) => void): void {
    this.onChange = fn;
  }

  registerOnTouched(fn: () => void): void {
    this.onTouched = fn;
  }

  setDisabledState(isDisabled: boolean): void {
    this.disabled = isDisabled;
  }
}
