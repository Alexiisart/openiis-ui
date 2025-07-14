import { Component } from '@angular/core';
import { OpeniisSpinnerComponent } from '../components/spinner/spinner.component';

@Component({
  selector: 'app-spinner-sec',
  template: `
    <!-- Sección de Spinners -->
    <section class="demo-section">
      <h2>Spinners</h2>

      <div class="demo-subsection">
        <h3>Tipos de Spinners</h3>
        <div class="demo-grid">
          <div class="demo-item">
            <h4>Variantes de Spinners</h4>
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
            <h4>Tamaños</h4>
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
            <h4>Con Texto</h4>
            <openiis-spinner
              variant="circle"
              size="md"
              color="primary"
              text="Cargando..."
            >
            </openiis-spinner>
          </div>
        </div>
      </div>
    </section>
  `,
  imports: [OpeniisSpinnerComponent],
})
export class SpinnerSecComponent {}
