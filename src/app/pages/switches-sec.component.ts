import { Component } from '@angular/core';
import { OpeniisSwitchComponent } from 'openiis-ui';
import { TranslateModule } from '@ngx-translate/core';

@Component({
  selector: 'app-switches-sec',
  template: `
    <!-- Sección de Switches -->
    <section class="demo-section">
      <h2>{{ 'switches.switches' | translate }}</h2>

      <div class="demo-subsection">
        <h3>{{ 'switches.controles_interruptores' | translate }}</h3>
        <div class="demo-grid">
          <div class="demo-item">
            <h4>{{ 'switches.interruptores_básicos' | translate }}</h4>
            <div class="input-sizes">
              <openiis-switch
                variant="default"
                [label]="'switches.activar_notificaciones' | translate"
                size="md"
              >
              </openiis-switch>
              <openiis-switch
                variant="default"
                [label]="'switches.modo_oscuro' | translate"
                [checked]="true"
                size="md"
              >
              </openiis-switch>
              <openiis-switch
                variant="default"
                [label]="'switches.switch_deshabilitado' | translate"
                [disabled]="true"
                size="md"
              >
              </openiis-switch>
            </div>
          </div>

          <div class="demo-item">
            <h4>{{ 'switches.tamaños' | translate }}</h4>
            <div class="input-sizes">
              <openiis-switch
                variant="primary"
                [label]="'switches.pequeño' | translate"
                size="sm"
              ></openiis-switch>
              <openiis-switch
                variant="primary"
                [label]="'switches.mediano' | translate"
                size="md"
              ></openiis-switch>
              <openiis-switch
                variant="primary"
                [label]="'switches.grande' | translate"
                size="lg"
              ></openiis-switch>
            </div>
          </div>

          <div class="demo-item">
            <h4>{{ 'switches.variantes' | translate }}</h4>
            <div class="input-sizes">
              <openiis-switch
                [label]="'switches.primary' | translate"
                variant="primary"
                [checked]="true"
              ></openiis-switch>
              <openiis-switch
                [label]="'switches.success' | translate"
                variant="success"
                [checked]="true"
              ></openiis-switch>
              <openiis-switch
                [label]="'switches.warning' | translate"
                variant="warning"
                [checked]="true"
              ></openiis-switch>
              <openiis-switch
                [label]="'switches.danger' | translate"
                variant="danger"
                [checked]="true"
              ></openiis-switch>
            </div>
          </div>
        </div>
      </div>
    </section>
  `,
  standalone: true,
  imports: [OpeniisSwitchComponent, TranslateModule],
})
export class SwitchesSecComponent {}
