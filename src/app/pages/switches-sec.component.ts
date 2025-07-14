import { Component } from '@angular/core';
import { OpeniisSwitchComponent } from '../components/switch/switch.component';

@Component({
  selector: 'app-switches-sec',
  template: `
    <!-- Sección de Switches -->
    <section class="demo-section">
      <h2>Switches</h2>

      <div class="demo-subsection">
        <h3>Controles Interruptores</h3>
        <div class="demo-grid">
          <div class="demo-item">
            <h4>Interruptores Básicos</h4>
            <div class="input-sizes">
              <openiis-switch
                variant="default"
                label="Activar notificaciones"
                size="md"
              >
              </openiis-switch>
              <openiis-switch
                variant="default"
                label="Modo oscuro"
                [checked]="true"
                size="md"
              >
              </openiis-switch>
              <openiis-switch
                variant="default"
                label="Switch deshabilitado"
                [disabled]="true"
                size="md"
              >
              </openiis-switch>
            </div>
          </div>

          <div class="demo-item">
            <h4>Tamaños</h4>
            <div class="input-sizes">
              <openiis-switch
                variant="primary"
                label="Pequeño"
                size="sm"
              ></openiis-switch>
              <openiis-switch
                variant="primary"
                label="Mediano"
                size="md"
              ></openiis-switch>
              <openiis-switch
                variant="primary"
                label="Grande"
                size="lg"
              ></openiis-switch>
            </div>
          </div>

          <div class="demo-item">
            <h4>Variantes</h4>
            <div class="input-sizes">
              <openiis-switch
                label="Primary"
                variant="primary"
                [checked]="true"
              ></openiis-switch>
              <openiis-switch
                label="Success"
                variant="success"
                [checked]="true"
              ></openiis-switch>
              <openiis-switch
                label="Warning"
                variant="warning"
                [checked]="true"
              ></openiis-switch>
              <openiis-switch
                label="Danger"
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
  imports: [OpeniisSwitchComponent],
})
export class SwitchesSecComponent {}
