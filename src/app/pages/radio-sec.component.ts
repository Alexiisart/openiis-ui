import { Component, EventEmitter, Input, Output } from '@angular/core';
import { CommonModule } from '@angular/common';
import { OpeniisRadioButtonComponent } from '../components/radio-button/radio-button.component';

@Component({
  selector: 'app-radio-sec',
  standalone: true,
  imports: [CommonModule, OpeniisRadioButtonComponent],
  template: `
    <div class="demo-section">
      <h2>Radio Buttons</h2>
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
              [value]="selectedSize"
              (checkedChange)="onRadioButtonChange($event, 'size')"
            >
            </openiis-radio-button>
            <openiis-radio-button
              label="Opción Warning"
              type="warning"
              name="tipo-demo"
              value="warning"
              size="md"
              [value]="selectedSize"
              (checkedChange)="onRadioButtonChange($event, 'size')"
            >
            </openiis-radio-button>
            <openiis-radio-button
              label="Opción Danger"
              type="danger"
              name="tipo-demo"
              value="danger"
              size="md"
              [value]="selectedSize"
              (checkedChange)="onRadioButtonChange($event, 'size')"
            >
            </openiis-radio-button>
            <openiis-radio-button
              label="Opción Subtle"
              type="subtle"
              name="tipo-demo"
              value="subtle"
              size="md"
              [value]="selectedSize"
              (checkedChange)="onRadioButtonChange($event, 'size')"
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
              [value]="selectedGender"
              (checkedChange)="onRadioButtonChange($event, 'gender')"
            >
            </openiis-radio-button>
            <openiis-radio-button
              label="Small"
              type="success"
              name="tamaño-demo"
              value="sm"
              size="sm"
              [value]="selectedGender"
              (checkedChange)="onRadioButtonChange($event, 'gender')"
            >
            </openiis-radio-button>
            <openiis-radio-button
              label="Medium"
              type="success"
              name="tamaño-demo"
              value="md"
              size="md"
              [value]="selectedGender"
              (checkedChange)="onRadioButtonChange($event, 'gender')"
            >
            </openiis-radio-button>
            <openiis-radio-button
              label="Large"
              type="success"
              name="tamaño-demo"
              value="lg"
              size="lg"
              [value]="selectedGender"
              (checkedChange)="onRadioButtonChange($event, 'gender')"
            >
            </openiis-radio-button>
            <openiis-radio-button
              label="Extra Large"
              type="success"
              name="tamaño-demo"
              value="xl"
              size="xl"
              [value]="selectedGender"
              (checkedChange)="onRadioButtonChange($event, 'gender')"
            >
            </openiis-radio-button>
          </div>
        </div>

        <div class="demo-item">
          <h4>Grupo de Notificaciones</h4>
          <div class="radio-group">
            <h5>Nivel de notificaciones</h5>
            <openiis-radio-button
              label="Todas las notificaciones"
              type="success"
              name="notificaciones"
              value="todas"
              size="md"
              helpText="Recibirás todas las actualizaciones"
              [value]="selectedNotificationLevel"
              (checkedChange)="onRadioButtonChange($event, 'notification')"
            >
            </openiis-radio-button>
            <openiis-radio-button
              label="Solo importantes"
              type="warning"
              name="notificaciones"
              value="importantes"
              size="md"
              helpText="Solo notificaciones críticas"
              [value]="selectedNotificationLevel"
              (checkedChange)="onRadioButtonChange($event, 'notification')"
            >
            </openiis-radio-button>
            <openiis-radio-button
              label="Ninguna"
              type="danger"
              name="notificaciones"
              value="ninguna"
              size="md"
              helpText="No recibirás notificaciones"
              [value]="selectedNotificationLevel"
              (checkedChange)="onRadioButtonChange($event, 'notification')"
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

  /* ===== RADIO BUTTON METHODS ===== */
  onRadioButtonChange(value: any, type: string): void {
    console.log(`Radio button ${type} cambiado a:`, value);
    switch (type) {
      case 'gender':
        this.selectedGender = value;
        break;
      case 'plan':
        this.selectedPlan = value;
        break;
      case 'notification':
        this.selectedNotificationLevel = value;
        break;
      case 'payment':
        this.selectedPaymentMethod = value;
        break;
      case 'shipping':
        this.selectedShippingMethod = value;
        break;
      case 'size':
        this.selectedSize = value;
        break;
    }
  }
}
