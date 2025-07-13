import {
  Component,
  Input,
  Output,
  EventEmitter,
  ElementRef,
  OnInit,
  OnDestroy,
  ChangeDetectionStrategy,
  ChangeDetectorRef,
} from '@angular/core';
import { CommonModule } from '@angular/common';
import { OpeniisSpinnerComponent } from '../spinner/spinner.component';

export type FabVariant =
  | 'primary'
  | 'secondary'
  | 'success'
  | 'warning'
  | 'danger'
  | 'info';
export type FabSize = 'sm' | 'md' | 'lg' | 'xl';
export type FabPosition =
  | 'bottom-right'
  | 'bottom-left'
  | 'top-right'
  | 'top-left';
export type FabPositioning = 'fixed' | 'absolute' | 'static';

@Component({
  selector: 'openiis-fab',
  standalone: true,
  imports: [CommonModule, OpeniisSpinnerComponent],
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: `
    <button
      [class]="baseClasses"
      [class.fab-hovered]="isHovered"
      [class.fab-focused]="isFocused"
      [class.fab-hidden]="!isVisible"
      [type]="type"
      [disabled]="disabled || loading"
      [attr.data-variant]="variant"
      [attr.data-size]="size"
      [attr.data-position]="position"
      [attr.data-positioning]="positioning"
      [attr.data-loading]="loading"
      [attr.data-extended]="extended"
      [attr.data-animated]="animated"
      [attr.aria-label]="ariaLabel || text"
      [attr.title]="title || text"
      [style.--fab-bottom]="bottomOffset"
      [style.--fab-right]="rightOffset"
      [style.--fab-left]="leftOffset"
      [style.--fab-top]="topOffset"
      [style.z-index]="zIndex"
      (click)="onClick($event)"
      (mouseenter)="onMouseEnter()"
      (mouseleave)="onMouseLeave()"
      (focus)="onFocus()"
      (blur)="onBlur()"
      (keydown)="onKeyDown($event)"
    >
      <!-- Ripple effect -->
      @if (showRipple) {
      <span class="fab-ripple"></span>
      }

      <!-- Loading spinner -->
      @if (loading) {
      <span class="fab-loading">
        <openiis-spinner
          variant="circle"
          size="xs"
          color="primary"
          [inline]="true"
          ariaLabel="Cargando botón"
        ></openiis-spinner>
      </span>
      }

      <!-- Content container -->
      <span class="fab-content" [class.fab-content-hidden]="loading">
        <!-- Icon -->
        @if (icon) {
        <span class="fab-icon material-icons-outlined">{{ icon }}</span>
        }

        <!-- Text (for extended FAB) -->
        @if (extended && text) {
        <span class="fab-text">{{ text }}</span>
        }

        <!-- Projected content -->
        <ng-content></ng-content>
      </span>
    </button>
  `,
  styleUrls: ['./fab.component.css'],
  host: {
    '[class.fab-host]': 'true',
  },
})
export class OpeniisFabComponent implements OnInit, OnDestroy {
  @Input() variant: FabVariant = 'primary';
  @Input() size: FabSize = 'md';
  @Input() position: FabPosition = 'bottom-right';
  @Input() positioning: FabPositioning = 'fixed';
  @Input() icon?: string;
  @Input() text?: string;
  @Input() extended = false;
  @Input() type: 'button' | 'submit' | 'reset' = 'button';
  @Input() disabled = false;
  @Input() loading = false;
  @Input() animated = true;
  @Input() rippleEnabled = true;
  @Input() ariaLabel?: string;
  @Input() title?: string;
  @Input() bottomOffset = '24px';
  @Input() rightOffset = '24px';
  @Input() leftOffset = '24px';
  @Input() topOffset = '24px';
  @Input() zIndex = 1000;
  @Input() hideOnScroll = false;
  @Input() autoHide = false;
  @Input() autoHideDelay = 3000;

  @Output() fabClick = new EventEmitter<MouseEvent>();
  @Output() fabMouseEnter = new EventEmitter<void>();
  @Output() fabMouseLeave = new EventEmitter<void>();
  @Output() fabFocus = new EventEmitter<void>();
  @Output() fabBlur = new EventEmitter<void>();

  showRipple = false;
  isHovered = false;
  isFocused = false;
  isVisible = true;
  private autoHideTimer?: ReturnType<typeof setTimeout>;
  private scrollListener?: () => void;

  constructor(private elementRef: ElementRef, private cdr: ChangeDetectorRef) {}

  /**
   * Genera las clases base (que no cambian dinámicamente)
   */
  get baseClasses(): string {
    const classes = ['fab'];

    classes.push(`fab-${this.variant}`);
    classes.push(`fab-${this.size}`);
    classes.push(`fab-${this.position}`);
    classes.push(`fab-${this.positioning}`);

    if (this.extended) classes.push('fab-extended');
    if (this.animated) classes.push('fab-animated');
    if (this.disabled) classes.push('fab-disabled');
    if (this.loading) classes.push('fab-loading');
    if (this.icon) classes.push('fab-with-icon');
    if (this.text) classes.push('fab-with-text');

    return classes.join(' ');
  }

  /**
   * Método del ciclo de vida de Angular.
   * Inicializa listeners de scroll y temporizador de auto-ocultado si están habilitados.
   */
  ngOnInit() {
    if (this.hideOnScroll) {
      this.setupScrollListener();
    }

    if (this.autoHide) {
      this.startAutoHideTimer();
    }
  }

  /**
   * Método del ciclo de vida de Angular.
   * Limpia listeners y temporizadores al destruir el componente.
   */
  ngOnDestroy() {
    if (this.scrollListener) {
      window.removeEventListener('scroll', this.scrollListener);
    }
    if (this.autoHideTimer) {
      clearTimeout(this.autoHideTimer);
    }
  }

  /**
   * Maneja el evento click del botón.
   * Si no está deshabilitado ni en loading, muestra el ripple (si está habilitado) y emite el evento.
   * @param event Evento MouseEvent del click.
   */
  onClick(event: MouseEvent): void {
    if (this.disabled || this.loading) return;

    if (this.rippleEnabled) {
      this.showRippleEffect();
    }

    this.fabClick.emit(event);
  }

  /**
   * Maneja el evento mouseenter.
   * Marca el botón como hovered y emite el evento correspondiente.
   */
  onMouseEnter(): void {
    if (this.disabled || this.loading) return;

    this.isHovered = true;
    this.cdr.markForCheck();
    this.fabMouseEnter.emit();

    // Reiniciar el timer de auto-hide si está habilitado
    if (this.autoHide) {
      this.startAutoHideTimer();
    }
  }

  /**
   * Maneja el evento mouseleave.
   * Desmarca el botón como hovered y emite el evento correspondiente.
   */
  onMouseLeave(): void {
    if (this.disabled || this.loading) return;

    this.isHovered = false;
    this.cdr.markForCheck();
    this.fabMouseLeave.emit();
  }

  /**
   * Maneja el evento focus.
   * Marca el botón como focused y emite el evento correspondiente.
   */
  onFocus(): void {
    if (this.disabled || this.loading) return;

    this.isFocused = true;
    this.cdr.markForCheck();
    this.fabFocus.emit();
  }

  /**
   * Maneja el evento blur.
   * Desmarca el botón como focused y emite el evento correspondiente.
   */
  onBlur(): void {
    if (this.disabled || this.loading) return;

    this.isFocused = false;
    this.cdr.markForCheck();
    this.fabBlur.emit();
  }

  /**
   * Maneja el evento keydown.
   * Si se presiona Enter o Space, simula un click.
   * @param event Evento KeyboardEvent del keydown.
   */
  onKeyDown(event: KeyboardEvent): void {
    if (this.disabled || this.loading) return;

    if (event.key === 'Enter' || event.key === ' ') {
      event.preventDefault();
      this.onClick(event as any);
    }
  }

  /**
   * Muestra el efecto ripple temporalmente.
   * @private
   */
  private showRippleEffect(): void {
    this.showRipple = true;
    this.cdr.markForCheck();

    setTimeout(() => {
      this.showRipple = false;
      this.cdr.markForCheck();
    }, 300);
  }

  /**
   * Configura un listener de scroll para ocultar/mostrar automáticamente el FAB según el movimiento.
   * Se oculta al hacer scroll hacia abajo y se muestra al hacer scroll hacia arriba.
   * Es privado.
   */
  private setupScrollListener(): void {
    if (!this.hideOnScroll) return;

    let lastScrollY = window.scrollY;

    this.scrollListener = () => {
      const currentScrollY = window.scrollY;

      if (currentScrollY > lastScrollY && currentScrollY > 100) {
        // Desplazamiento hacia abajo
        if (this.isVisible) {
          this.isVisible = false;
          this.cdr.markForCheck();
        }
      } else {
        // Desplazamiento hacia arriba
        if (!this.isVisible) {
          this.isVisible = true;
          this.cdr.markForCheck();
        }
      }

      lastScrollY = currentScrollY;
    };

    window.addEventListener('scroll', this.scrollListener, { passive: true });
  }

  /**
   * Inicia un temporizador para ocultar automáticamente el FAB después de un tiempo definido.
   * Es privado.
   */
  private startAutoHideTimer(): void {
    if (this.autoHideTimer) {
      clearTimeout(this.autoHideTimer);
    }

    this.autoHideTimer = setTimeout(() => {
      this.isVisible = false;
      this.cdr.markForCheck();
    }, this.autoHideDelay);
  }

  /**
   * Muestra el FAB (lo hace visible).
   * Puede ser llamado desde fuera del componente.
   */
  show(): void {
    this.isVisible = true;
    this.cdr.markForCheck();
  }

  /**
   * Oculta el FAB (lo hace invisible).
   * Puede ser llamado desde fuera del componente.
   */
  hide(): void {
    this.isVisible = false;
    this.cdr.markForCheck();
  }

  /**
   * Alterna la visibilidad del FAB.
   * Puede ser llamado desde fuera del componente.
   */
  toggle(): void {
    this.isVisible = !this.isVisible;
    this.cdr.markForCheck();
  }
}
