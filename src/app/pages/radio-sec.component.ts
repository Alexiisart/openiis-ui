import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { OpeniisRadioButtonComponent } from '../components/radio-button/radio-button.component';
import { TranslateModule } from '@ngx-translate/core';

@Component({
  selector: 'app-radio-sec',
  standalone: true,
  imports: [
    CommonModule,
    FormsModule,
    OpeniisRadioButtonComponent,
    TranslateModule,
  ],
  template: `
    <div class="demo-section">
      <h2>{{ 'radio.botones_de_radio' | translate }}</h2>
      <div class="demo-grid">
        <div class="demo-item">
          <h4>{{ 'radio.tipos_de_radio_button' | translate }}</h4>
          <div class="radio-group">
            <openiis-radio-button
              [label]="'radio.opción_success' | translate"
              type="success"
              name="tipo-demo"
              value="success"
              size="md"
              [(ngModel)]="selectedSize"
            >
            </openiis-radio-button>
            <openiis-radio-button
              [label]="'radio.opción_warning' | translate"
              type="warning"
              name="tipo-demo"
              value="warning"
              size="md"
              [(ngModel)]="selectedSize"
            >
            </openiis-radio-button>
            <openiis-radio-button
              [label]="'radio.opción_danger' | translate"
              type="danger"
              name="tipo-demo"
              value="danger"
              size="md"
              [(ngModel)]="selectedSize"
            >
            </openiis-radio-button>
            <openiis-radio-button
              [label]="'radio.opción_subtle' | translate"
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
          <h4>{{ 'radio.tamaños_de_radio_button' | translate }}</h4>
          <div class="radio-group">
            <openiis-radio-button
              [label]="'radio.extra_small' | translate"
              type="success"
              name="tamaño-demo"
              value="xs"
              size="xs"
              [(ngModel)]="selectedGender"
            >
            </openiis-radio-button>
            <openiis-radio-button
              [label]="'radio.small' | translate"
              type="success"
              name="tamaño-demo"
              value="sm"
              size="sm"
              [(ngModel)]="selectedGender"
            >
            </openiis-radio-button>
            <openiis-radio-button
              [label]="'radio.medium' | translate"
              type="success"
              name="tamaño-demo"
              value="md"
              size="md"
              [(ngModel)]="selectedGender"
            >
            </openiis-radio-button>
            <openiis-radio-button
              [label]="'radio.large' | translate"
              type="success"
              name="tamaño-demo"
              value="lg"
              size="lg"
              [(ngModel)]="selectedGender"
            >
            </openiis-radio-button>
            <openiis-radio-button
              [label]="'radio.extra_large' | translate"
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
          <h4>{{ 'radio.grupo_de_notificaciones' | translate }}</h4>
          <div class="radio-group">
            <openiis-radio-button
              [label]="'radio.todas_las_notificaciones' | translate"
              type="success"
              name="notificaciones"
              value="todas"
              size="md"
              [(ngModel)]="selectedNotificationLevel"
            >
            </openiis-radio-button>
            <openiis-radio-button
              [label]="'radio.solo_importantes' | translate"
              type="warning"
              name="notificaciones"
              value="importantes"
              size="md"
              [(ngModel)]="selectedNotificationLevel"
            >
            </openiis-radio-button>
            <openiis-radio-button
              [label]="'radio.ninguna' | translate"
              type="danger"
              name="notificaciones"
              value="ninguna"
              size="md"
              [(ngModel)]="selectedNotificationLevel"
            >
            </openiis-radio-button>
            <p class="selection-result">
              {{ 'radio.notificaciones' | translate }}:
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
