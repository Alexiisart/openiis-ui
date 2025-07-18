import { Component, Input, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';

export type SpinnerVariant =
  | 'circle'
  | 'dots'
  | 'bars'
  | 'pulse'
  | 'wave'
  | 'ring'
  | 'bounce'
  | 'fade';
export type SpinnerSize = 'xs' | 'sm' | 'md' | 'lg' | 'xl';
export type SpinnerColor =
  | 'primary'
  | 'secondary'
  | 'success'
  | 'warning'
  | 'danger'
  | 'info'
  | 'light'
  | 'dark';
export type SpinnerSpeed = 'slow' | 'normal' | 'fast';

@Component({
  selector: 'openiis-spinner',
  standalone: true,
  imports: [CommonModule],
  template: `
    <div
      [class]="getClasses()"
      [attr.data-variant]="variant"
      [attr.data-size]="size"
      [attr.data-color]="color"
      [attr.data-speed]="speed"
      [attr.data-overlay]="overlay"
      [attr.role]="role"
      [attr.aria-label]="ariaLabel"
      [attr.aria-live]="ariaLive"
      [attr.aria-busy]="true"
      [style.--spinner-size]="customSize"
      [style.--spinner-color]="customColor"
      [style.--spinner-speed]="customSpeed"
    >
      <!-- Overlay background -->
      @if (overlay) {
      <div
        class="spinner-overlay-bg"
        [style.background-color]="overlayColor"
      ></div>
      }

      <!-- Spinner container -->
      <div class="spinner-container">
        <!-- Circle spinner -->
        @if (variant === 'circle') {
        <div class="spinner-circle">
          <div class="spinner-circle-inner"></div>
        </div>
        }

        <!-- Dots spinner -->
        @if (variant === 'dots') {
        <div class="spinner-dots">
          @for (dot of getDots(); track $index) {
          <div class="spinner-dot"></div>
          }
        </div>
        }

        <!-- Bars spinner -->
        @if (variant === 'bars') {
        <div class="spinner-bars">
          @for (bar of getBars(); track $index) {
          <div class="spinner-bar"></div>
          }
        </div>
        }

        <!-- Pulse spinner -->
        @if (variant === 'pulse') {
        <div class="spinner-pulse">
          <div class="spinner-pulse-inner"></div>
        </div>
        }

        <!-- Wave spinner -->
        @if (variant === 'wave') {
        <div class="spinner-wave">
          @for (wave of getWaves(); track $index) {
          <div class="spinner-wave-bar"></div>
          }
        </div>
        }

        <!-- Ring spinner -->
        @if (variant === 'ring') {
        <div class="spinner-ring">
          <div class="spinner-ring-inner"></div>
        </div>
        }

        <!-- Bounce spinner -->
        @if (variant === 'bounce') {
        <div class="spinner-bounce">
          @for (bounce of getBounces(); track $index) {
          <div class="spinner-bounce-ball"></div>
          }
        </div>
        }

        <!-- Fade spinner -->
        @if (variant === 'fade') {
        <div class="spinner-fade">
          @for (fade of getFades(); track $index) {
          <div class="spinner-fade-blade"></div>
          }
        </div>
        }

        <!-- Loading text -->
        @if (text) {
        <div class="spinner-text">{{ text }}</div>
        }
      </div>
    </div>
  `,
  styleUrls: ['./spinner.component.css'],
})
export class OpeniisSpinnerComponent implements OnInit {
  @Input() variant: SpinnerVariant = 'circle';
  @Input() size: SpinnerSize = 'md';
  @Input() color: SpinnerColor = 'primary';
  @Input() speed: SpinnerSpeed = 'normal';
  @Input() text?: string;
  @Input() overlay = false;
  @Input() overlayColor = 'rgba(255, 255, 255, 0.8)';
  @Input() customSize?: string;
  @Input() customColor?: string;
  @Input() customSpeed?: string;
  @Input() ariaLabel = 'Cargando...';
  @Input() ariaLive: 'polite' | 'assertive' | 'off' = 'polite';
  @Input() role = 'status';
  @Input() centered = false;
  @Input() inline = false;
  @Input() visible = true;

  ngOnInit() {
    // Initialize component
  }

  getClasses(): string {
    const classes = ['spinner'];

    classes.push(`spinner-${this.variant}`);
    classes.push(`spinner-${this.size}`);
    classes.push(`spinner-${this.color}`);
    classes.push(`spinner-${this.speed}`);

    if (this.overlay) classes.push('spinner-overlay');
    if (this.centered) classes.push('spinner-centered');
    if (this.inline) classes.push('spinner-inline');
    if (!this.visible) classes.push('spinner-hidden');
    if (this.text) classes.push('spinner-with-text');

    return classes.join(' ');
  }

  getDots(): number[] {
    return Array(3)
      .fill(0)
      .map((_, i) => i);
  }

  getBars(): number[] {
    return Array(5)
      .fill(0)
      .map((_, i) => i);
  }

  getWaves(): number[] {
    return Array(5)
      .fill(0)
      .map((_, i) => i);
  }

  getBounces(): number[] {
    return Array(3)
      .fill(0)
      .map((_, i) => i);
  }

  getFades(): number[] {
    return Array(8)
      .fill(0)
      .map((_, i) => i);
  }
}
