import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { OpeniisRadioButtonComponent } from '../components/radio-button/radio-button.component';

@Component({
  selector: 'app-radio-sec',
  standalone: true,
  imports: [CommonModule, FormsModule, OpeniisRadioButtonComponent],
  template: `
    <div class="demo-section">
      <h2>Botones de Radio</h2>
      <div class="demo-grid">
        <div class="demo-item">
          <h4>Tipos de Radio Button</h4>
          <div class="radio-group">
            <openiis-radio-button
              label="Opción Success"
              type="success"
              name="tipo-demo"
              value="success"
              size="md"
              [(ngModel)]="selectedSize"
            >
            </openiis-radio-button>
            <openiis-radio-button
              label="Opción Warning"
              type="warning"
              name="tipo-demo"
              value="warning"
              size="md"
              [(ngModel)]="selectedSize"
            >
            </openiis-radio-button>
            <openiis-radio-button
              label="Opción Danger"
              type="danger"
              name="tipo-demo"
              value="danger"
              size="md"
              [(ngModel)]="selectedSize"
            >
            </openiis-radio-button>
            <openiis-radio-button
              label="Opción Subtle"
              type="subtle"
              name="tipo-demo"
              value="subtle"
              size="md"
              [(ngModel)]="selectedSize"
            >
            </openiis-radio-button>
          </div>
        </div>

        <div class="demo-item">
          <h4>Tamaños de Radio Button</h4>
          <div class="radio-group">
            <openiis-radio-button
              label="Extra Small"
              type="success"
              name="tamaño-demo"
              value="xs"
              size="xs"
              [(ngModel)]="selectedGender"
            >
            </openiis-radio-button>
            <openiis-radio-button
              label="Small"
              type="success"
              name="tamaño-demo"
              value="sm"
              size="sm"
              [(ngModel)]="selectedGender"
            >
            </openiis-radio-button>
            <openiis-radio-button
              label="Medium"
              type="success"
              name="tamaño-demo"
              value="md"
              size="md"
              [(ngModel)]="selectedGender"
            >
            </openiis-radio-button>
            <openiis-radio-button
              label="Large"
              type="success"
              name="tamaño-demo"
              value="lg"
              size="lg"
              [(ngModel)]="selectedGender"
            >
            </openiis-radio-button>
            <openiis-radio-button
              label="Extra Large"
              type="success"
              name="tamaño-demo"
              value="xl"
              size="xl"
              [(ngModel)]="selectedGender"
            >
            </openiis-radio-button>
          </div>
        </div>

        <div class="demo-item">
          <h4>Grupo de Notificaciones</h4>
          <div class="radio-group">
            <openiis-radio-button
              label="Todas las notificaciones"
              type="success"
              name="notificaciones"
              value="todas"
              size="md"
              helpText="Recibirás todas las actualizaciones"
              [(ngModel)]="selectedNotificationLevel"
            >
            </openiis-radio-button>
            <openiis-radio-button
              label="Solo importantes"
              type="warning"
              name="notificaciones"
              value="importantes"
              size="md"
              helpText="Solo notificaciones críticas"
              [(ngModel)]="selectedNotificationLevel"
            >
            </openiis-radio-button>
            <openiis-radio-button
              label="Ninguna"
              type="danger"
              name="notificaciones"
              value="ninguna"
              size="md"
              helpText="No recibirás notificaciones"
              [(ngModel)]="selectedNotificationLevel"
            >
            </openiis-radio-button>
            <p class="selection-result">
              Notificaciones:
              {{ selectedNotificationLevel || 'No seleccionado' }}
            </p>
          </div>
        </div>
      </div>
    </div>
  `,
})
export class RadioSecComponent {
  /* ===== RADIO BUTTON SECTION ===== */
  selectedGender = '';
  selectedPlan = '';
  selectedNotificationLevel = '';
  selectedPaymentMethod = '';
  selectedShippingMethod = '';
  selectedSize = '';
}
