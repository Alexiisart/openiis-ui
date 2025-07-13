import { Component, Input, HostBinding } from '@angular/core';
import { CommonModule } from '@angular/common';

export type TooltipPosition = 'top' | 'bottom' | 'left' | 'right';
export type TooltipVariant = 'default' | 'danger';

/**
 * Componente Tooltip reutilizable que puede posicionarse en diferentes ubicaciones
 * y soporta diferentes variantes de color
 */
@Component({
  selector: 'openiis-tooltip',
  standalone: true,
  imports: [CommonModule],
  template: `
    <div
      class="tooltip-content"
      [class]="tooltipClasses"
      role="tooltip"
      [attr.aria-hidden]="!visible"
    >
      {{ text }}
    </div>
  `,
  styleUrls: ['./tooltip.component.css'],
})
export class OpeniisTooltipComponent {
  /** Texto a mostrar en el tooltip */
  @Input() text: string = '';

  /** Posición del tooltip relativa al elemento padre */
  @Input() position: TooltipPosition = 'top';

  /** Variante de color del tooltip */
  @Input() variant: TooltipVariant = 'default';

  /** Si el tooltip está visible */
  @Input() visible: boolean = false;

  /** Genera las clases CSS del tooltip */
  get tooltipClasses(): string {
    const classes = [
      'tooltip',
      `tooltip-${this.position}`,
      `tooltip-${this.variant}`,
    ];

    if (this.visible) {
      classes.push('tooltip-visible');
    }

    return classes.join(' ');
  }

  @HostBinding('class') hostClasses = 'tooltip-wrapper';
}
