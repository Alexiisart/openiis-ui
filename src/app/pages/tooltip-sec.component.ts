import { Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';
import { OpeniisTooltipComponent } from '../components/tooltip/tooltip.component';

@Component({
  selector: 'app-tooltip-sec',
  standalone: true,
  imports: [CommonModule, OpeniisTooltipComponent],
  template: `
    <!-- Sección de Tooltips -->
    <section class="demo-section">
      <h2>Tooltips</h2>

      <div class="demo-subsection">
        <h3>Posiciones de Tooltip</h3>
        <div class="demo-grid">
          <div class="demo-item">
            <h4>Tooltip Superior</h4>
            <div class="tooltip-demo-container">
              <div
                class="tooltip-trigger"
                (mouseenter)="showTooltipTop = true"
                (mouseleave)="showTooltipTop = false"
              >
                <span>Hover aquí (Arriba)</span>
                <openiis-tooltip
                  text="Este es un tooltip en la parte superior"
                  position="top"
                  variant="default"
                  [visible]="showTooltipTop"
                >
                </openiis-tooltip>
              </div>
            </div>
          </div>

          <div class="demo-item">
            <h4>Tooltip Inferior</h4>
            <div class="tooltip-demo-container">
              <div
                class="tooltip-trigger"
                (mouseenter)="showTooltipBottom = true"
                (mouseleave)="showTooltipBottom = false"
              >
                <span>Hover aquí (Abajo)</span>
                <openiis-tooltip
                  text="Tooltip en la parte inferior"
                  position="bottom"
                  variant="default"
                  [visible]="showTooltipBottom"
                >
                </openiis-tooltip>
              </div>
            </div>
          </div>

          <div class="demo-item">
            <h4>Tooltip Izquierda</h4>
            <div class="tooltip-demo-container">
              <div
                class="tooltip-trigger"
                (mouseenter)="showTooltipLeft = true"
                (mouseleave)="showTooltipLeft = false"
              >
                <span>Hover aquí (Izquierda)</span>
                <openiis-tooltip
                  text="Tooltip a la izquierda"
                  position="left"
                  variant="default"
                  [visible]="showTooltipLeft"
                >
                </openiis-tooltip>
              </div>
            </div>
          </div>

          <div class="demo-item">
            <h4>Tooltip Derecha</h4>
            <div class="tooltip-demo-container">
              <div
                class="tooltip-trigger"
                (mouseenter)="showTooltipRight = true"
                (mouseleave)="showTooltipRight = false"
              >
                <span>Hover aquí (Derecha)</span>
                <openiis-tooltip
                  text="Tooltip a la derecha"
                  position="right"
                  variant="default"
                  [visible]="showTooltipRight"
                >
                </openiis-tooltip>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div class="demo-subsection">
        <h3>Variantes de Tooltip</h3>
        <div class="demo-grid">
          <div class="demo-item">
            <h4>Tooltip Default</h4>
            <div class="tooltip-demo-container">
              <div
                class="tooltip-trigger"
                (mouseenter)="showTooltipDefault = true"
                (mouseleave)="showTooltipDefault = false"
              >
                <span>Tooltip Normal</span>
                <openiis-tooltip
                  text="Tooltip con variante por defecto"
                  position="top"
                  variant="default"
                  [visible]="showTooltipDefault"
                >
                </openiis-tooltip>
              </div>
            </div>
          </div>

          <div class="demo-item">
            <h4>Tooltip Peligro</h4>
            <div class="tooltip-demo-container">
              <div
                class="tooltip-trigger danger"
                (mouseenter)="showTooltipDanger = true"
                (mouseleave)="showTooltipDanger = false"
              >
                <span>Tooltip Peligro</span>
                <openiis-tooltip
                  text="Tooltip con variante de peligro"
                  position="top"
                  variant="danger"
                  [visible]="showTooltipDanger"
                >
                </openiis-tooltip>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  `,
})
export class TooltipSecComponent {
  /* ===== TOOLTIP SECTION ===== */
  showTooltipTop = false;
  showTooltipBottom = false;
  showTooltipLeft = false;
  showTooltipRight = false;
  showTooltipDefault = false;
  showTooltipDanger = false;
}
