import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { OpeniisDateInputComponent } from 'openiis-ui';
import { TranslateModule } from '@ngx-translate/core';

@Component({
  selector: 'app-date-sec',
  standalone: true,
  imports: [CommonModule, OpeniisDateInputComponent, TranslateModule],
  template: `
    <div class="demo-section">
      <h2>{{ 'date.selectores_de_fecha' | translate }}</h2>

      <div class="demo-subsection">
        <div class="demo-grid">
          <div class="demo-item">
            <h4>{{ 'date.fecha_básica' | translate }}</h4>
            <openiis-date-input
              [placeholder]="'date.selecciona_una_fecha' | translate"
              [value]="basicDateValue"
              size="md"
              [title]="'date.fecha_de_nacimiento' | translate"
              (valueChange)="onDateChange($event, 'basic')"
            >
            </openiis-date-input>
          </div>

          <div class="demo-item">
            <h4>{{ 'date.fecha_futura' | translate }}</h4>
            <openiis-date-input
              [placeholder]="'date.fecha_límite' | translate"
              [value]="futureDate"
              size="md"
              [minDate]="futureDateMinimum"
              [title]="'date.selecciona_fecha_futura' | translate"
              (valueChange)="onDateChange($event, 'future')"
            >
            </openiis-date-input>
          </div>

          <div class="demo-item">
            <h4>{{ 'date.fecha_vencida' | translate }}</h4>
            <openiis-date-input
              [placeholder]="'date.fecha_vencida_1' | translate"
              [value]="overdueDate"
              size="md"
              [markOverdue]="true"
              [title]="'date.esta_fecha_está_vencida' | translate"
              (valueChange)="onDateChange($event, 'overdue')"
            >
            </openiis-date-input>
          </div>

          <div class="demo-item">
            <h4>{{ 'date.fecha_deshabilitada' | translate }}</h4>
            <openiis-date-input
              [placeholder]="'date.fecha_no_editable' | translate"
              [value]="disabledDate"
              size="md"
              [disabled]="true"
              [title]="'date.campo_deshabilitado' | translate"
            >
            </openiis-date-input>
          </div>
        </div>
      </div>

      <div class="demo-grid">
        <div class="demo-item">
          <h4>{{ 'date.fecha_small' | translate }}</h4>
          <openiis-date-input
            [placeholder]="'date.fecha_pequeña' | translate"
            size="sm"
          >
          </openiis-date-input>
        </div>

        <div class="demo-item">
          <h4>{{ 'date.fecha_medium' | translate }}</h4>
          <openiis-date-input
            [placeholder]="'date.fecha_mediana' | translate"
            size="md"
          >
          </openiis-date-input>
        </div>

        <div class="demo-item">
          <h4>{{ 'date.fecha_large' | translate }}</h4>
          <openiis-date-input
            [placeholder]="'date.fecha_grande' | translate"
            size="lg"
          >
          </openiis-date-input>
        </div>
      </div>
    </div>
  `,
})
export class DateSecComponent {
  /* ===== DATE SECTION ===== */
  basicDateValue: string | null = null;
  overdueDate: string | null = '2024-01-01T00:00:00.000Z';
  futureDate: string | null = null;
  disabledDate: string | null = null;

  get futureDateMinimum(): string {
    const today = new Date();
    return today.toISOString().split('T')[0];
  }

  /* ===== DATE METHODS ===== */
  onDateChange(date: string | null, type: string): void {
    switch (type) {
      case 'basic':
        this.basicDateValue = date;
        break;
      case 'future':
        this.futureDate = date;
        break;
    }
    console.log(`Fecha ${type} cambiada:`, date);
  }
}
