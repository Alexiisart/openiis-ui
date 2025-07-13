import {
  Component,
  Input,
  OnInit,
  OnChanges,
  SimpleChanges,
} from '@angular/core';
import { CommonModule } from '@angular/common';

export type ProgressVariant =
  | 'linear'
  | 'circular'
  | 'semi-circular'
  | 'stepped';
export type ProgressSize = 'xs' | 'sm' | 'md' | 'lg' | 'xl';
export type ProgressColor =
  | 'primary'
  | 'secondary'
  | 'success'
  | 'warning'
  | 'danger'
  | 'info';
export type ProgressType = 'determinate' | 'indeterminate';

@Component({
  selector: 'openiis-progress-bar',
  standalone: true,
  imports: [CommonModule],
  template: `
    <div
      [class]="getClasses()"
      [attr.data-variant]="variant"
      [attr.data-size]="size"
      [attr.data-color]="color"
      [attr.data-type]="type"
      [attr.data-striped]="striped"
      [attr.data-animated]="animated"
      [attr.role]="role"
      [attr.aria-label]="ariaLabel"
      [attr.aria-valuenow]="currentValue"
      [attr.aria-valuemin]="min"
      [attr.aria-valuemax]="max"
      [attr.aria-valuetext]="ariaValueText"
      [style.--progress-percentage]="progressPercentage + '%'"
      [style.--progress-color]="customColor"
      [style.--progress-background]="customBackground"
    >
      <!-- Linear Progress -->
      @if (variant === 'linear') {
      <div class="progress-linear">
        <div class="progress-track">
          <div class="progress-fill" [style.width.%]="progressPercentage"></div>
        </div>
        @if (showText) {
        <div class="progress-text">{{ displayText }}</div>
        }
      </div>
      }

      <!-- Circular Progress -->
      @if (variant === 'circular') {
      <div class="progress-circular">
        <svg class="progress-circle" viewBox="0 0 100 100">
          <circle
            class="progress-circle-track"
            cx="50"
            cy="50"
            [attr.r]="circleRadius"
            fill="none"
            [attr.stroke-width]="strokeWidth"
          ></circle>
          <circle
            class="progress-circle-fill"
            cx="50"
            cy="50"
            [attr.r]="circleRadius"
            fill="none"
            [attr.stroke-width]="strokeWidth"
            [attr.stroke-dasharray]="circumference"
            [attr.stroke-dashoffset]="dashOffset"
          ></circle>
        </svg>
        @if (showText) {
        <div class="progress-text progress-text-center">
          {{ displayText }}
        </div>
        }
      </div>
      }

      <!-- Semi-Circular Progress -->
      @if (variant === 'semi-circular') {
      <div class="progress-semi-circular">
        <svg class="progress-semi-circle" viewBox="0 0 100 50">
          <path
            class="progress-semi-circle-track"
            [attr.d]="semiCirclePath"
            fill="none"
            [attr.stroke-width]="strokeWidth"
          ></path>
          <path
            class="progress-semi-circle-fill"
            [attr.d]="semiCirclePath"
            fill="none"
            [attr.stroke-width]="strokeWidth"
            [attr.stroke-dasharray]="semiCircumference"
            [attr.stroke-dashoffset]="semiDashOffset"
          ></path>
        </svg>
        @if (showText) {
        <div class="progress-text progress-text-center">
          {{ displayText }}
        </div>
        }
      </div>
      }

      <!-- Stepped Progress -->
      @if (variant === 'stepped') {
      <div class="progress-stepped">
        <div class="progress-steps">
          @for (step of steps; track $index; let i = $index) {
          <div
            class="progress-step"
            [class.progress-step-completed]="i < currentStep"
            [class.progress-step-active]="i === currentStep"
            [attr.data-step]="i + 1"
          >
            <div class="progress-step-marker">
              @if (i < currentStep) {
              <span class="material-icons">check</span>
              } @else {
              <span>{{ i + 1 }}</span>
              }
            </div>
            @if (showStepLabels) {
            <div class="progress-step-label">
              {{ step.label }}
            </div>
            }
          </div>
          }
        </div>
        @if (showText) {
        <div class="progress-text">{{ displayText }}</div>
        }
      </div>
      }
    </div>
  `,
  styleUrls: ['./progress-bar.component.css'],
})
export class OpeniisProgressBarComponent implements OnInit, OnChanges {
  @Input() variant: ProgressVariant = 'linear';
  @Input() size: ProgressSize = 'md';
  @Input() color: ProgressColor = 'primary';
  @Input() type: ProgressType = 'determinate';
  @Input() value = 0;
  @Input() min = 0;
  @Input() max = 100;
  @Input() striped = false;
  @Input() animated = false;
  @Input() showText = false;
  @Input() textFormat = 'percentage'; // 'percentage' | 'fraction' | 'custom'
  @Input() customText?: string;
  @Input() customColor?: string;
  @Input() customBackground?: string;
  @Input() ariaLabel = 'Progreso';
  @Input() role = 'progressbar';
  @Input() steps: { label: string; value?: number }[] = [];
  @Input() currentStep = 0;
  @Input() showStepLabels = true;
  @Input() smooth = true;
  @Input() hideOnComplete = false;
  @Input() pulseOnComplete = false;

  progressPercentage = 0;
  currentValue = 0;
  circleRadius = 45;
  strokeWidth = 6;
  circumference = 0;
  dashOffset = 0;
  semiCircumference = 0;
  semiDashOffset = 0;
  semiCirclePath = '';

  ngOnInit() {
    this.calculateCircleProperties();
    this.updateProgress();
  }

  ngOnChanges(changes: SimpleChanges) {
    if (
      changes['value'] ||
      changes['min'] ||
      changes['max'] ||
      changes['currentStep']
    ) {
      this.updateProgress();
    }
    if (changes['size']) {
      this.calculateCircleProperties();
    }
  }

  getClasses(): string {
    const classes = ['progress-bar'];

    classes.push(`progress-${this.variant}`);
    classes.push(`progress-${this.size}`);
    classes.push(`progress-${this.color}`);
    classes.push(`progress-${this.type}`);

    if (this.striped) classes.push('progress-striped');
    if (this.animated) classes.push('progress-animated');
    if (this.smooth) classes.push('progress-smooth');
    if (this.hideOnComplete && this.progressPercentage >= 100)
      classes.push('progress-hidden');
    if (this.pulseOnComplete && this.progressPercentage >= 100)
      classes.push('progress-pulse');
    if (this.showText) classes.push('progress-with-text');

    return classes.join(' ');
  }

  get displayText(): string {
    if (this.customText) return this.customText;

    if (this.variant === 'stepped') {
      return `Paso ${this.currentStep + 1} de ${this.steps.length}`;
    }

    switch (this.textFormat) {
      case 'percentage':
        return `${Math.round(this.progressPercentage)}%`;
      case 'fraction':
        return `${this.currentValue} / ${this.max}`;
      default:
        return `${Math.round(this.progressPercentage)}%`;
    }
  }

  get ariaValueText(): string {
    if (this.variant === 'stepped') {
      return `Paso ${this.currentStep + 1} de ${this.steps.length}`;
    }
    return `${Math.round(this.progressPercentage)} por ciento`;
  }

  private updateProgress(): void {
    if (this.variant === 'stepped') {
      this.progressPercentage =
        (this.currentStep / Math.max(this.steps.length - 1, 1)) * 100;
      this.currentValue = this.currentStep;
    } else {
      this.currentValue = Math.max(this.min, Math.min(this.max, this.value));
      this.progressPercentage =
        ((this.currentValue - this.min) / (this.max - this.min)) * 100;
    }

    this.updateCircularProgress();
  }

  private calculateCircleProperties(): void {
    switch (this.size) {
      case 'xs':
        this.circleRadius = 40;
        this.strokeWidth = 4;
        break;
      case 'sm':
        this.circleRadius = 42;
        this.strokeWidth = 5;
        break;
      case 'md':
        this.circleRadius = 45;
        this.strokeWidth = 6;
        break;
      case 'lg':
        this.circleRadius = 47;
        this.strokeWidth = 7;
        break;
      case 'xl':
        this.circleRadius = 48;
        this.strokeWidth = 8;
        break;
    }

    this.circumference = 2 * Math.PI * this.circleRadius;
    this.semiCircumference = Math.PI * this.circleRadius;
    this.semiCirclePath = `M 10 45 A 35 35 0 0 1 90 45`;

    this.updateCircularProgress();
  }

  private updateCircularProgress(): void {
    const progress = this.progressPercentage / 100;
    this.dashOffset = this.circumference * (1 - progress);
    this.semiDashOffset = this.semiCircumference * (1 - progress);
  }

  // Public methods
  setValue(value: number): void {
    this.value = value;
    this.updateProgress();
  }

  increment(amount = 1): void {
    this.setValue(this.value + amount);
  }

  decrement(amount = 1): void {
    this.setValue(this.value - amount);
  }

  reset(): void {
    this.setValue(this.min);
  }

  complete(): void {
    this.setValue(this.max);
  }

  nextStep(): void {
    if (this.currentStep < this.steps.length - 1) {
      this.currentStep++;
      this.updateProgress();
    }
  }

  previousStep(): void {
    if (this.currentStep > 0) {
      this.currentStep--;
      this.updateProgress();
    }
  }

  goToStep(step: number): void {
    if (step >= 0 && step < this.steps.length) {
      this.currentStep = step;
      this.updateProgress();
    }
  }
}
