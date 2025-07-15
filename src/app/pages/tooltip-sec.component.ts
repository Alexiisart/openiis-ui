import { Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';
import { OpeniisTooltipComponent } from '../components/tooltip/tooltip.component';
import { TranslateModule } from '@ngx-translate/core';

@Component({
  selector: 'app-tooltip-sec',
  standalone: true,
  imports: [CommonModule, OpeniisTooltipComponent, TranslateModule],
  template: `
    <!-- Sección de Tooltips -->
    <section class="demo-section">
      <h2>{{ 'tooltip.tooltips' | translate }}</h2>

      <div class="demo-subsection">
        <h3>{{ 'tooltip.posiciones_de_tooltip' | translate }}</h3>
        <div class="demo-grid">
          <div class="demo-item">
            <h4>{{ 'tooltip.tooltip_superior' | translate }}</h4>
            <div class="tooltip-demo-container">
              <div
                class="tooltip-trigger"
                (mouseenter)="showTooltipTop = true"
                (mouseleave)="showTooltipTop = false"
              >
                <span>{{ 'tooltip.hover_aquí_arriba' | translate }}</span>
                <openiis-tooltip
                  text="{{
                    'tooltip.este_es_un_tooltip_en_la_parte_superior'
                      | translate
                  }}"
                  position="top"
                  variant="default"
                  [visible]="showTooltipTop"
                >
                </openiis-tooltip>
              </div>
            </div>
          </div>

          <div class="demo-item">
            <h4>{{ 'tooltip.tooltip_inferior' | translate }}</h4>
            <div class="tooltip-demo-container">
              <div
                class="tooltip-trigger"
                (mouseenter)="showTooltipBottom = true"
                (mouseleave)="showTooltipBottom = false"
              >
                <span>{{ 'tooltip.hover_aquí_abajo' | translate }}</span>
                <openiis-tooltip
                  text="{{
                    'tooltip.tooltip_en_la_parte_inferior' | translate
                  }}"
                  position="bottom"
                  variant="default"
                  [visible]="showTooltipBottom"
                >
                </openiis-tooltip>
              </div>
            </div>
          </div>

          <div class="demo-item">
            <h4>{{ 'tooltip.tooltip_izquierda' | translate }}</h4>
            <div class="tooltip-demo-container">
              <div
                class="tooltip-trigger"
                (mouseenter)="showTooltipLeft = true"
                (mouseleave)="showTooltipLeft = false"
              >
                <span>{{ 'tooltip.hover_aquí_izquierda' | translate }}</span>
                <openiis-tooltip
                  text="{{ 'tooltip.tooltip_a_la_izquierda' | translate }}"
                  position="left"
                  variant="default"
                  [visible]="showTooltipLeft"
                >
                </openiis-tooltip>
              </div>
            </div>
          </div>

          <div class="demo-item">
            <h4>{{ 'tooltip.tooltip_derecha' | translate }}</h4>
            <div class="tooltip-demo-container">
              <div
                class="tooltip-trigger"
                (mouseenter)="showTooltipRight = true"
                (mouseleave)="showTooltipRight = false"
              >
                <span>{{ 'tooltip.hover_aquí_derecha' | translate }}</span>
                <openiis-tooltip
                  text="{{ 'tooltip.tooltip_a_la_derecha' | translate }}"
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
        <h3>{{ 'tooltip.variantes_de_tooltip' | translate }}</h3>
        <div class="demo-grid">
          <div class="demo-item">
            <h4>{{ 'tooltip.tooltip_default' | translate }}</h4>
            <div class="tooltip-demo-container">
              <div
                class="tooltip-trigger"
                (mouseenter)="showTooltipDefault = true"
                (mouseleave)="showTooltipDefault = false"
              >
                <span>{{ 'tooltip.tooltip_normal' | translate }}</span>
                <openiis-tooltip
                  text="{{
                    'tooltip.tooltip_con_variante_por_defecto' | translate
                  }}"
                  position="top"
                  variant="default"
                  [visible]="showTooltipDefault"
                >
                </openiis-tooltip>
              </div>
            </div>
          </div>

          <div class="demo-item">
            <h4>{{ 'tooltip.tooltip_peligro' | translate }}</h4>
            <div class="tooltip-demo-container">
              <div
                class="tooltip-trigger danger"
                (mouseenter)="showTooltipDanger = true"
                (mouseleave)="showTooltipDanger = false"
              >
                <span>{{ 'tooltip.tooltip_peligro' | translate }}</span>
                <openiis-tooltip
                  text="{{
                    'tooltip.tooltip_con_variante_de_peligro' | translate
                  }}"
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
