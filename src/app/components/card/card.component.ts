import {
  Component,
  Input,
  Output,
  EventEmitter,
  ChangeDetectionStrategy,
  ContentChild,
  ElementRef,
  AfterContentInit,
  SimpleChanges,
} from '@angular/core';
import { CommonModule } from '@angular/common';
import { OpeniisButtonComponent } from '../buttons/button.component';

export type CardSize = 'xs' | 'sm' | 'md' | 'lg' | 'xl';
export type CardVariant =
  | 'default'
  | 'bordered'
  | 'elevated'
  | 'outlined'
  | 'filled';
export type CardType =
  | 'default'
  | 'primary'
  | 'success'
  | 'warning'
  | 'danger'
  | 'info';

export interface CardButton {
  id: string;
  icon: string;
  tooltip?: string;
  disabled?: boolean;
  loading?: boolean;
  variant?:
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
  ariaLabel?: string;
}

@Component({
  selector: 'openiis-card',
  standalone: true,
  imports: [CommonModule, OpeniisButtonComponent],
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: `
    <article
      class="card"
      [class]="containerClasses"
      [attr.data-size]="size"
      [attr.data-variant]="variant"
      [attr.data-type]="type"
      [attr.role]="role"
      [attr.aria-label]="ariaLabel"
      [attr.aria-describedby]="ariaDescribedBy"
      (click)="onCardClick($event)"
      (keydown)="onKeyDown($event)"
      [attr.tabindex]="clickable ? 0 : -1"
    >
      <!-- Header -->
      @if (title || subtitle || hasHeaderContent) {
      <header class="card-header">
        @if (title) {
        <h3 class="card-title">{{ title }}</h3>
        } @if (subtitle) {
        <p class="card-subtitle">{{ subtitle }}</p>
        }
        <div class="card-header-content">
          <ng-content select="[slot=header]"></ng-content>
        </div>
        <div class="card-header-actions">
          <ng-content select="[slot=header-actions]"></ng-content>
        </div>
      </header>
      }

      <!-- Media - Siempre renderizar el contenedor para el slot media -->
      <div class="card-media">
        <ng-content select="[slot=media]"></ng-content>
      </div>

      <!-- Body -->
      @if (description || hasDefaultContent) {
      <div class="card-body">
        @if (description) {
        <p class="card-description">{{ description }}</p>
        }
        <ng-content></ng-content>
      </div>
      }

      <!-- Footer -->
      <footer class="card-footer">
        <ng-content select="[slot=footer]"></ng-content>
      </footer>

      <!-- Action Buttons -->
      @if (actionButtons && actionButtons.length > 0) {
      <div class="card-actions">
        @for (button of actionButtons; track button.id; let i = $index) {
        <openiis-button
          [type]="button.variant || 'icon'"
          [iconLeft]="button.icon"
          [size]="actionButtonSize"
          [disabled]="button.disabled || false"
          [loading]="button.loading || false"
          [tooltipText]="button.tooltip || ''"
          [tooltipPosition]="i === actionButtons.length - 1 ? 'left' : 'top'"
          [ariaLabel]="button.ariaLabel || button.tooltip || ''"
          [iconOnly]="true"
          (clickEvent)="onActionButtonClick(button.id, $event)"
        >
        </openiis-button>
        }
      </div>
      }

      <!-- Loading overlay -->
      @if (loading) {
      <div class="card-loading">
        <div class="card-spinner"></div>
      </div>
      }
    </article>
  `,
  styleUrls: ['./card.component.css'],
})
export class OpeniisCardComponent implements AfterContentInit {
  /**
   * Título principal de la card
   */
  @Input() title: string = '';

  /**
   * Subtítulo de la card
   */
  @Input() subtitle: string = '';

  /**
   * Descripción del contenido
   */
  @Input() description: string = '';

  /**
   * Tamaño de la card
   */
  @Input() size: CardSize = 'md';

  /**
   * Variante visual de la card
   */
  @Input() variant: CardVariant = 'default';

  /**
   * Tipo de color de la card
   */
  @Input() type: CardType = 'default';

  /**
   * Hacer la card clickeable
   */
  @Input() clickable: boolean = false;

  /**
   * Estado de carga
   */
  @Input() loading: boolean = false;

  /**
   * Deshabilitar la card
   */
  @Input() disabled: boolean = false;

  /**
   * Hacer la card seleccionable
   */
  @Input() selectable: boolean = false;

  /**
   * Estado seleccionado
   */
  @Input() selected: boolean = false;

  /**
   * Ocultar el overflow del contenido
   */
  @Input() hideOverflow: boolean = true;

  /**
   * Hacer la card responsive
   */
  @Input() responsive: boolean = true;

  /**
   * Imagen de fondo
   */
  @Input() backgroundImage: string = '';

  /**
   * Rol ARIA
   */
  @Input() role: string = 'article';

  /**
   * ARIA label
   */
  @Input() ariaLabel: string = '';

  /**
   * ARIA describedby
   */
  @Input() ariaDescribedBy: string = '';

  /**
   * Clases CSS adicionales
   */
  @Input() extraClasses: string = '';

  /**
   * Botones de acción para mostrar en la parte inferior
   */
  @Input() actionButtons: CardButton[] = [];

  /**
   * Tamaño de los botones de acción
   */
  @Input() actionButtonSize: 'xs' | 'sm' | 'md' | 'lg' | 'xl' = 'sm';

  /**
   * Evento emitido cuando se hace clic en la card
   */
  @Output() cardClick = new EventEmitter<MouseEvent>();

  /**
   * Evento emitido cuando se selecciona la card
   */
  @Output() selectedChange = new EventEmitter<boolean>();

  /**
   * Evento emitido cuando se presiona una tecla
   */
  @Output() keyDown = new EventEmitter<KeyboardEvent>();

  /**
   * Evento emitido cuando se hace clic en un botón de acción
   */
  @Output() actionButtonClick = new EventEmitter<{
    buttonId: string;
    event: MouseEvent;
  }>();

  // Content children para detectar los slots
  @ContentChild('[slot="header"]') headerContent: ElementRef | undefined;
  @ContentChild('[slot="header-actions"]') headerActions:
    | ElementRef
    | undefined;
  @ContentChild('[slot="media"]') mediaContent: ElementRef | undefined;
  @ContentChild('[slot="footer"]') footerContent: ElementRef | undefined;

  /**
   * Maneja los cambios en el input de menús
   * @param changes Cambios en el input de menús
   */
  ngOnChanges(changes: SimpleChanges): void {
    if (changes['actionButtons']) {
      this.actionButtons = [...this.actionButtons];
    }
  }

  /**
   * Verificar si hay contenido en el header
   */
  get hasHeaderContent(): boolean {
    return !!this.headerContent;
  }

  /**
   * Verificar si hay acciones en el header
   */
  get hasHeaderActions(): boolean {
    return !!this.headerActions;
  }

  /**
   * Verificar si hay contenido multimedia
   */
  get hasMedia(): boolean {
    return !!this.mediaContent;
  }

  /**
   * Verificar si hay contenido por defecto (no slots)
   */
  get hasDefaultContent(): boolean {
    return true; // Siempre renderizar el contenedor para contenido por defecto
  }

  /**
   * Verificar si hay contenido en el footer
   */
  get hasFooter(): boolean {
    return !!this.footerContent;
  }

  ngAfterContentInit(): void {
    // Aquí podemos realizar verificaciones adicionales si es necesario
  }

  /**
   * Genera las clases CSS del contenedor
   */
  get containerClasses(): string {
    const classes = ['card'];

    if (this.clickable) classes.push('clickable');
    if (this.disabled) classes.push('disabled');
    if (this.selected) classes.push('selected');
    if (this.selectable) classes.push('selectable');
    if (this.loading) classes.push('loading');
    if (this.hideOverflow) classes.push('hide-overflow');
    if (this.responsive) classes.push('responsive');
    if (this.backgroundImage) classes.push('has-background');
    if (this.actionButtons && this.actionButtons.length > 0)
      classes.push('has-actions');
    if (this.extraClasses) classes.push(this.extraClasses);

    return classes.join(' ');
  }

  /**
   * Maneja el clic en la card
   */
  onCardClick(event: MouseEvent): void {
    if (this.disabled || this.loading) return;

    // No ejecutar si el clic proviene de un botón de acción
    if ((event.target as HTMLElement).closest('.card-actions')) return;

    this.cardClick.emit(event);

    if (this.selectable) {
      this.selected = !this.selected;
      this.selectedChange.emit(this.selected);
    }
  }

  /**
   * Maneja el clic en botones de acción
   */
  onActionButtonClick(buttonId: string, event: MouseEvent): void {
    if (this.disabled || this.loading) return;

    event.stopPropagation(); // Evitar que el evento llegue a la card
    this.actionButtonClick.emit({ buttonId, event });
  }

  /**
   * Maneja las teclas presionadas
   */
  onKeyDown(event: KeyboardEvent): void {
    if (this.disabled || this.loading) return;

    this.keyDown.emit(event);

    // Activar con Enter o Space
    if (event.key === 'Enter' || event.key === ' ') {
      if (this.clickable) {
        event.preventDefault();
        this.onCardClick(event as any);
      }
    }
  }

  /**
   * Selecciona o deselecciona la card programáticamente
   */
  setSelected(selected: boolean): void {
    if (!this.selectable) return;

    this.selected = selected;
    this.selectedChange.emit(this.selected);
  }

  /**
   * Obtiene el estilo de fondo si hay imagen
   */
  get backgroundStyle(): { [key: string]: string } {
    if (!this.backgroundImage) return {};

    return {
      'background-image': `url(${this.backgroundImage})`,
      'background-size': 'cover',
      'background-position': 'center',
      'background-repeat': 'no-repeat',
    };
  }
}
