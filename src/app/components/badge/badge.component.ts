import { Component, Input, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';

export type BadgeVariant =
  | 'default'
  | 'primary'
  | 'secondary'
  | 'success'
  | 'warning'
  | 'danger'
  | 'info';
export type BadgeSize = 'xs' | 'sm' | 'md' | 'lg' | 'xl';
export type BadgeStyle = 'filled' | 'outline' | 'soft' | 'dot';
export type BadgeShape = 'rounded' | 'pill' | 'square';
export type BadgePosition =
  | 'top-right'
  | 'top-left'
  | 'bottom-right'
  | 'bottom-left';

@Component({
  selector: 'openiis-badge',
  standalone: true,
  imports: [CommonModule],
  template: `
    <span
      [class]="getClasses()"
      [attr.data-variant]="variant"
      [attr.data-size]="size"
      [attr.data-style]="style"
      [attr.data-shape]="shape"
      [attr.data-position]="position"
      [attr.data-animated]="animated"
      [attr.data-pulsing]="pulsing"
      [attr.data-hidden]="hidden"
      [attr.aria-label]="ariaLabel"
      [attr.role]="role"
      [title]="title"
      [style.max-width]="maxWidth"
      [style.z-index]="zIndex"
      (click)="onClick()"
      (keydown)="onKeyDown($event)"
    >
      <!-- Dot badge (sin contenido) -->
      @if (style === 'dot') {
      <span class="badge-dot"></span>
      }

      <!-- Badge con contenido -->
      @if (style !== 'dot') {
      <!-- Icono izquierdo (Material Icons Outlined) -->
      @if (leftIcon) {
      <span class="badge-icon-left material-icons-outlined">{{
        leftIcon
      }}</span>
      }

      <!-- Icono principal (Material Icons Outlined) -->
      @if (icon && !leftIcon) {
      <span class="badge-icon-left material-icons-outlined">{{ icon }}</span>
      } }

      <!-- Contenido -->
      <span class="badge-content">
        @if (text) {
        <span>{{ text }}</span>
        } @else {
        <ng-content></ng-content>
        @if (!hasContent && count !== undefined) {
        <span>{{ displayCount }}</span>
        } }
      </span>

      <!-- Icono derecho -->
      @if (rightIcon) {
      <span class="badge-icon-right material-icons-outlined">{{
        rightIcon
      }}</span>
      }

      <!-- Botón cerrar -->
      @if (closable) {
      <button
        class="badge-close"
        type="button"
        (click)="onClose($event)"
        [attr.aria-label]="closeAriaLabel"
        tabindex="0"
      >
        <span class="material-icons-outlined">close</span>
      </button>
      }
    </span>
  `,
  styleUrls: ['./badge.component.css'],
})
export class OpeniisBadgeComponent implements OnInit {
  @Input() variant: BadgeVariant = 'default';
  @Input() size: BadgeSize = 'md';
  @Input() style: BadgeStyle = 'filled';
  @Input() shape: BadgeShape = 'rounded';
  @Input() position?: BadgePosition;
  @Input() text?: string;
  @Input() icon?: string;
  @Input() count?: number;
  @Input() maxCount = 99;
  @Input() leftIcon?: string;
  @Input() rightIcon?: string;
  @Input() closable = false;
  @Input() animated = false;
  @Input() pulsing = false;
  @Input() hidden = false;
  @Input() clickable = false;
  @Input() disabled = false;
  @Input() ariaLabel?: string;
  @Input() title?: string;
  @Input() role = 'status';
  @Input() maxWidth?: string;
  @Input() zIndex?: number;
  @Input() closeAriaLabel = 'Cerrar';

  hasContent = false;

  ngOnInit() {
    this.hasContent = this.hasProjectedContent();
  }

  get displayCount(): string {
    if (this.count === undefined) return '';
    return this.count > this.maxCount
      ? `${this.maxCount}+`
      : this.count.toString();
  }

  getClasses(): string {
    const clases = ['badge'];

    clases.push(`badge-${this.variant}`);
    clases.push(`badge-${this.size}`);
    clases.push(`badge-${this.style}`);
    clases.push(`badge-${this.shape}`);

    if (this.position) {
      clases.push(`badge-${this.position}`);
      clases.push('badge-positioned');
    }

    if (this.animated) clases.push('badge-animated');
    if (this.pulsing) clases.push('badge-pulsing');
    if (this.hidden) clases.push('badge-hidden');
    if (this.clickable) clases.push('badge-clickable');
    if (this.disabled) clases.push('badge-disabled');
    if (this.closable) clases.push('badge-closable');
    if (this.leftIcon) clases.push('badge-with-left-icon');
    if (this.rightIcon) clases.push('badge-with-right-icon');

    return clases.join(' ');
  }

  private hasProjectedContent(): boolean {
    return true; // En un caso real, verificaríamos el contenido proyectado
  }

  onClick(): void {
    if (!this.clickable || this.disabled) return;
    // Emitir evento de click
  }

  onClose(event: Event): void {
    event.stopPropagation();
    if (this.disabled) return;
    // Emitir evento de cierre
  }

  onKeyDown(event: KeyboardEvent): void {
    if (!this.clickable || this.disabled) return;

    if (event.key === 'Enter' || event.key === ' ') {
      event.preventDefault();
      this.onClick();
    }
  }
}
