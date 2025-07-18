import {
  Component,
  Input,
  Output,
  EventEmitter,
  ViewChild,
  ElementRef,
  ChangeDetectionStrategy,
} from '@angular/core';
import { CommonModule } from '@angular/common';
import { OpeniisSpinnerComponent } from '../spinner/spinner.component';
import { OpeniisTooltipComponent } from '../tooltip/tooltip.component';
import { SvgIconDirective } from '../services/svg/svg-icon.directive';

export type ButtonVariant =
  | undefined
  | 'primary'
  | 'secondary'
  | 'success'
  | 'warning'
  | 'danger'
  | 'info'
  | 'outline-primary'
  | 'outline-secondary'
  | 'outline-success'
  | 'outline-warning'
  | 'outline-danger'
  | 'outline-info'
  | 'ghost'
  | 'text'
  | 'link'
  | 'subtle'
  | 'icon';

export type ButtonType = 'button' | 'submit' | 'reset';
export type ButtonSize = 'xs' | 'sm' | 'md' | 'lg' | 'xl';

@Component({
  selector: 'openiis-button',
  standalone: true,
  imports: [
    CommonModule,
    OpeniisSpinnerComponent,
    OpeniisTooltipComponent,
    SvgIconDirective,
  ],
  changeDetection: ChangeDetectionStrategy.OnPush,
  templateUrl: './button.component.html',
  styleUrls: ['./button.component.css'],
})
export class OpeniisButtonComponent {
  @ViewChild('buttonElement', { static: true })
  buttonElement!: ElementRef<HTMLButtonElement>;

  /** Texto del botón */
  @Input() text: string = '';

  /** Tipo de botón para compatibilidad (primary, secondary, etc.) */
  @Input() type: ButtonVariant = 'primary';

  /** Tamaño del botón */
  @Input() size: ButtonSize = 'md';

  /** Tipo HTML del botón */
  @Input() htmlType: ButtonType = 'button';

  /** Estado deshabilitado */
  @Input() disabled: boolean = false;

  /** Estado de carga */
  @Input() loading: boolean = false;

  /** Icono izquierdo (material icon name) */
  @Input() iconLeft: string = '';

  /** Icono derecho (material icon name) */
  @Input() iconRight: string = '';

  /** Solo mostrar icono (ocultar texto) */
  @Input() iconOnly: boolean = false;

  /** Botón de ancho completo */
  @Input() fullWidth: boolean = false;

  /** Texto del tooltip */
  @Input() tooltipText: string = '';

  /** Posición del tooltip */
  @Input() tooltipPosition: 'top' | 'bottom' | 'left' | 'right' = 'top';

  /** Variante del tooltip */
  @Input() tooltipVariant: 'default' | 'danger' = 'default';

  /** Título del botón */
  @Input() title: string = '';

  /** Botón con dropdown */
  @Input() hasDropdown: boolean = false;

  /** Estado del dropdown */
  @Input() dropdownOpen: boolean = false;

  /** Etiqueta aria */
  @Input() ariaLabel: string = '';

  /** Referencia aria describedby */
  @Input() ariaDescribedBy: string = '';

  /** Clases CSS adicionales */
  @Input() extraClasses: string = '';

  /** Botón responsivo */
  @Input() responsive: boolean = false;

  /** Evento de clic */
  @Output() clickEvent = new EventEmitter<MouseEvent>();

  /** Evento de toggle del dropdown */
  @Output() dropdownToggle = new EventEmitter<boolean>();

  // Estado interno del tooltip
  showTooltip: boolean = false;

  // Icono SVG
  @Input() iconAsset: string = '';
  @Input() colorSvg: string = 'inherit';
  @Input() backgroundSvg: string = 'transparent';
  @Input() widthSvg: string = '24px';
  @Input() heightSvg: string = '24px';
  @Input() sizeSvg: string = '24px';

  /**
   * Clases CSS del botón
   */
  get buttonClasses(): string {
    const variantToUse = this.type;
    const isIconOnly =
      this.iconOnly ||
      this.type === 'icon' ||
      (!this.text && !!(this.iconLeft || this.iconRight));

    return [
      'btn',
      `btn-${variantToUse}`,
      `btn-${this.size}`,
      this.fullWidth ? 'btn-full-width' : '',
      isIconOnly ? 'btn-icon-only' : '',
      this.loading ? 'btn-loading' : '',
      this.disabled ? 'btn-disabled' : '',
      this.responsive ? 'btn-responsive' : '',
      this.extraClasses,
    ]
      .filter(Boolean)
      .join(' ');
  }

  /**
   * Determina si se debe mostrar el tooltip
   */
  get shouldShowTooltip(): boolean {
    return !!this.tooltipText;
  }

  /**
   * Texto efectivo del tooltip
   */
  get effectiveTooltipText(): string {
    return this.tooltipText;
  }

  /**
   * Verifica si el botón es de solo icono
   */
  get isIconOnlyButton(): boolean {
    return (
      this.iconOnly ||
      this.type === 'icon' ||
      (!this.text && !!(this.iconLeft || this.iconRight))
    );
  }

  /**
   * Maneja el clic del botón
   */
  onClick(event: MouseEvent): void {
    if (this.disabled || this.loading) {
      event.preventDefault();
      event.stopPropagation();
      return;
    }

    if (this.hasDropdown) {
      this.dropdownOpen = !this.dropdownOpen;
      this.dropdownToggle.emit(this.dropdownOpen);
    }

    this.clickEvent.emit(event);
  }

  /**
   * Muestra el tooltip en hover
   */
  showTooltipOnHover(): void {
    if (this.shouldShowTooltip) {
      this.showTooltip = true;
    }
  }

  /**
   * Oculta el tooltip al salir del hover
   */
  hideTooltipOnLeave(): void {
    this.showTooltip = false;
  }

  /**
   * Enfoca el botón
   */
  focus(): void {
    this.buttonElement.nativeElement.focus();
  }

  /**
   * Desenfoca el botón
   */
  blur(): void {
    this.buttonElement.nativeElement.blur();
  }
}
