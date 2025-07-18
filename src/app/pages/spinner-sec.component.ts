import { Component } from '@angular/core';
import { OpeniisSpinnerComponent } from 'openiis-ui';
import { TranslateModule } from '@ngx-translate/core';

@Component({
  selector: 'app-spinner-sec',
  imports: [OpeniisSpinnerComponent, TranslateModule],
  template: `
    <!-- Sección de Spinners -->
    <section class="demo-section">
      <h2>{{ 'spinner.indicadores_de_carga' | translate }}</h2>

      <div class="demo-subsection">
        <h3>{{ 'spinner.tipos_de_indicadores_de_carga' | translate }}</h3>
        <div class="demo-grid">
          <div class="demo-item">
            <h4>
              {{ 'spinner.variantes_de_indicadores_de_carga' | translate }}
            </h4>
            <div class="button-group">
              <openiis-spinner
                variant="circle"
                size="md"
                color="primary"
              ></openiis-spinner>
              <openiis-spinner
                variant="dots"
                size="md"
                color="success"
              ></openiis-spinner>
              <openiis-spinner
                variant="bars"
                size="md"
                color="warning"
              ></openiis-spinner>
              <openiis-spinner
                variant="pulse"
                size="md"
                color="danger"
              ></openiis-spinner>
            </div>
          </div>

          <div class="demo-item">
            <h4>{{ 'spinner.tamaños' | translate }}</h4>
            <div class="button-group">
              <openiis-spinner
                variant="circle"
                size="xs"
                color="primary"
              ></openiis-spinner>
              <openiis-spinner
                variant="circle"
                size="sm"
                color="primary"
              ></openiis-spinner>
              <openiis-spinner
                variant="circle"
                size="md"
                color="primary"
              ></openiis-spinner>
              <openiis-spinner
                variant="circle"
                size="lg"
                color="primary"
              ></openiis-spinner>
              <openiis-spinner
                variant="circle"
                size="xl"
                color="primary"
              ></openiis-spinner>
            </div>
          </div>

          <div class="demo-item">
            <h4>{{ 'spinner.con_texto' | translate }}</h4>
            <openiis-spinner
              variant="circle"
              size="md"
              color="primary"
              [text]="'spinner.cargando' | translate"
            >
            </openiis-spinner>
          </div>
        </div>
      </div>
    </section>
  `,
})
export class SpinnerSecComponent {}
