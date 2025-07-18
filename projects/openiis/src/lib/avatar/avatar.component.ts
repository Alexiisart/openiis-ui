import { Component, Input, Output, EventEmitter, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { OpeniisSpinnerComponent } from '../spinner/spinner.component';

export type AvatarVariant = 'circular' | 'rounded' | 'square';
export type AvatarSize = 'xs' | 'sm' | 'md' | 'lg' | 'xl' | '2xl' | '3xl';
export type AvatarColor =
  | 'primary'
  | 'secondary'
  | 'success'
  | 'warning'
  | 'danger'
  | 'info'
  | 'neutral';
export type AvatarStatus = 'online' | 'offline' | 'away' | 'busy' | 'none';

export interface AvatarGroup {
  src?: string;
  alt?: string;
  name?: string;
  initials?: string;
  color?: AvatarColor;
  status?: AvatarStatus;
}

@Component({
  selector: 'openiis-avatar',
  standalone: true,
  imports: [CommonModule, OpeniisSpinnerComponent],
  template: `
    <div
      class="avatar"
      [class]="getClasses()"
      [attr.aria-label]="ariaLabel"
      [attr.title]="title"
      [attr.role]="role"
      [attr.tabindex]="getTabIndex()"
      [style.width]="customSize"
      [style.height]="customSize"
      (click)="onClick($event)"
      (keydown)="onKeyDown($event)"
      (mouseenter)="onMouseEnter()"
      (mouseleave)="onMouseLeave()"
      (focus)="onFocus()"
      (blur)="onBlur()"
    >
      <!-- Image Avatar -->
      @if (src && !hasImageError) {
      <img
        [src]="src"
        [alt]="alt || name || 'Avatar'"
        class="avatar-image"
        (error)="onImageError()"
        (load)="onImageLoad()"
      />
      }

      <!-- Initials Avatar -->
      @if ((!src || hasImageError) && displayInitials && !showStatus) {
      <span class="avatar-initials" [attr.aria-hidden]="true">
        {{ displayInitials }}
      </span>
      }

      <!-- Icon Avatar -->
      @if ((!src || hasImageError) && !displayInitials && icon && !showStatus) {
      <span
        [class]="'avatar-icon material-icons-outlined'"
        [attr.aria-hidden]="true"
        >{{ icon }}</span
      >
      }

      <!-- Default Icon -->
      @if ((!src || hasImageError) && !displayInitials && !icon && !showStatus)
      {
      <span
        class="avatar-icon material-icons-outlined"
        [attr.aria-hidden]="true"
        >person</span
      >
      }

      <!-- Status Indicator -->
      @if (status !== 'none' && showStatus) {
      <span
        class="material-icons-outlined status-icon"
        [class.status-online]="status === 'online'"
        [class.status-offline]="status === 'offline'"
        [class.status-away]="status === 'away'"
        [class.status-busy]="status === 'busy'"
        >{{ getStatusIcon() }}</span
      >
      }

      <!-- Badge -->
      @if (badge) {
      <span
        class="avatar-badge"
        [class.badge-dot]="badge === 'dot'"
        [attr.aria-label]="badgeAriaLabel"
      >
        @if (badge !== 'dot') {
        <span class="badge-content">{{ badge }}</span>
        }
      </span>
      }

      <!-- Loading Overlay -->
      @if (loading) {
      <div class="avatar-loading">
        <openiis-spinner
          variant="circle"
          size="xs"
          color="primary"
          [inline]="true"
          ariaLabel="Cargando avatar"
        ></openiis-spinner>
      </div>
      }

      <!-- Border -->
      @if (bordered) {
      <div class="avatar-border"></div>
      }
    </div>
  `,
  styleUrls: ['./avatar.component.css'],
  host: {
    '[class.avatar-host]': 'true',
  },
})
export class OpeniisAvatarComponent implements OnInit {
  @Input() variant: AvatarVariant = 'circular';
  @Input() size: AvatarSize = 'md';
  @Input() color: AvatarColor = 'primary';
  @Input() status: AvatarStatus = 'none';
  @Input() src?: string;
  @Input() alt?: string;
  @Input() name?: string;
  @Input() initials?: string;
  @Input() icon?: string;
  @Input() badge?: string | number | 'dot';
  @Input() badgeAriaLabel = 'Notification';
  @Input() showStatus = false;
  @Input() bordered = false;
  @Input() loading = false;
  @Input() clickable = false;
  @Input() interactive = false;
  @Input() customSize?: string;
  @Input() ariaLabel?: string;
  @Input() title?: string;
  @Input() role?: string;
  @Input() customClass?: string;

  @Output() avatarClick = new EventEmitter<MouseEvent>();
  @Output() avatarMouseEnter = new EventEmitter<void>();
  @Output() avatarMouseLeave = new EventEmitter<void>();
  @Output() avatarFocus = new EventEmitter<void>();
  @Output() avatarBlur = new EventEmitter<void>();
  @Output() imageLoad = new EventEmitter<void>();
  @Output() imageError = new EventEmitter<void>();

  hasImageError = false;
  displayInitials = '';
  isHovered = false;
  isFocused = false;

  ngOnInit() {
    this.generateInitials();
    this.setDefaultRole();
    this.setDefaultAriaLabel();
  }

  getClasses(): string {
    const classes = ['avatar'];

    classes.push(`avatar-${this.variant}`);
    classes.push(`avatar-${this.size}`);
    classes.push(`avatar-${this.color}`);

    if (this.status !== 'none') classes.push(`avatar-status-${this.status}`);
    if (this.clickable) classes.push('avatar-clickable');
    if (this.interactive) classes.push('avatar-interactive');
    if (this.bordered) classes.push('avatar-bordered');
    if (this.loading) classes.push('avatar-loading');
    if (this.badge) classes.push('avatar-with-badge');
    if (this.isHovered) classes.push('avatar-hovered');
    if (this.isFocused) classes.push('avatar-focused');
    if (this.customClass) classes.push(this.customClass);

    return classes.join(' ');
  }

  getTabIndex(): number {
    if (this.clickable || this.interactive) return 0;
    return -1;
  }

  onClick(event: MouseEvent): void {
    if (this.clickable || this.interactive) {
      this.avatarClick.emit(event);
    }
  }

  onKeyDown(event: KeyboardEvent): void {
    if (this.clickable || this.interactive) {
      if (event.key === 'Enter' || event.key === ' ') {
        event.preventDefault();
        this.onClick(event as any);
      }
    }
  }

  onMouseEnter(): void {
    this.isHovered = true;
    this.avatarMouseEnter.emit();
  }

  onMouseLeave(): void {
    this.isHovered = false;
    this.avatarMouseLeave.emit();
  }

  onFocus(): void {
    this.isFocused = true;
    this.avatarFocus.emit();
  }

  onBlur(): void {
    this.isFocused = false;
    this.avatarBlur.emit();
  }

  onImageError(): void {
    this.hasImageError = true;
    this.imageError.emit();
  }

  onImageLoad(): void {
    this.hasImageError = false;
    this.imageLoad.emit();
  }

  getStatusLabel(): string {
    switch (this.status) {
      case 'online':
        return 'En línea';
      case 'offline':
        return 'Desconectado';
      case 'away':
        return 'Ausente';
      case 'busy':
        return 'Ocupado';
      default:
        return '';
    }
  }

  getStatusIcon(): string {
    switch (this.status) {
      case 'online':
        return 'check_circle';
      case 'offline':
        return 'cancel';
      case 'away':
        return 'access_time';
      case 'busy':
        return 'priority_high';
      default:
        return '';
    }
  }

  private generateInitials(): void {
    if (this.initials) {
      this.displayInitials = this.initials.toUpperCase();
    } else if (this.name) {
      const words = this.name.split(' ').filter((word) => word.length > 0);
      if (words.length >= 2) {
        this.displayInitials = (words[0][0] + words[1][0]).toUpperCase();
      } else if (words.length === 1) {
        this.displayInitials = words[0][0].toUpperCase();
      }
    }
  }

  private setDefaultRole(): void {
    if (!this.role) {
      if (this.clickable || this.interactive) {
        this.role = 'button';
      } else {
        this.role = 'img';
      }
    }
  }

  private setDefaultAriaLabel(): void {
    if (!this.ariaLabel) {
      if (this.name) {
        this.ariaLabel = `Avatar de ${this.name}`;
      } else if (this.alt) {
        this.ariaLabel = this.alt;
      } else {
        this.ariaLabel = 'Avatar del usuario';
      }
    }
  }

  // Public methods
  focus(): void {
    if (this.clickable || this.interactive) {
      const element = document.querySelector(
        `[aria-label="${this.ariaLabel}"]`
      ) as HTMLElement;
      if (element) {
        element.focus();
      }
    }
  }

  blur(): void {
    if (this.clickable || this.interactive) {
      const element = document.querySelector(
        `[aria-label="${this.ariaLabel}"]`
      ) as HTMLElement;
      if (element) {
        element.blur();
      }
    }
  }

  refresh(): void {
    this.hasImageError = false;
    this.generateInitials();
    this.setDefaultRole();
    this.setDefaultAriaLabel();
  }
}
