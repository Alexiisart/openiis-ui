import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { OpeniisDateInputComponent } from '../components/input-date/date-input.component';

@Component({
  selector: 'app-date-sec',
  standalone: true,
  imports: [CommonModule, OpeniisDateInputComponent],
  template: `
    <div class="demo-section">
      <h2>Selectores de fecha</h2>

      <div class="demo-subsection">
        <div class="demo-grid">
          <div class="demo-item">
            <h4>Fecha Básica</h4>
            <openiis-date-input
              placeholder="Selecciona una fecha"
              [value]="basicDateValue"
              size="md"
              title="Fecha de nacimiento"
              (valueChange)="onDateChange($event, 'basic')"
            >
            </openiis-date-input>
          </div>

          <div class="demo-item">
            <h4>Fecha Futura</h4>
            <openiis-date-input
              placeholder="Fecha límite"
              [value]="futureDate"
              size="md"
              [minDate]="futureDateMinimum"
              title="Selecciona fecha futura"
              (valueChange)="onDateChange($event, 'future')"
            >
            </openiis-date-input>
          </div>

          <div class="demo-item">
            <h4>Fecha Vencida</h4>
            <openiis-date-input
              placeholder="Fecha vencida"
              [value]="overdueDate"
              size="md"
              [markOverdue]="true"
              title="Esta fecha está vencida"
              (valueChange)="onDateChange($event, 'overdue')"
            >
            </openiis-date-input>
          </div>

          <div class="demo-item">
            <h4>Fecha Deshabilitada</h4>
            <openiis-date-input
              placeholder="Fecha no editable"
              [value]="disabledDate"
              size="md"
              [disabled]="true"
              title="Campo deshabilitado"
            >
            </openiis-date-input>
          </div>
        </div>
      </div>

      <div class="demo-grid">
        <div class="demo-item">
          <h4>Fecha Small</h4>
          <openiis-date-input placeholder="Fecha pequeña" size="sm">
          </openiis-date-input>
        </div>

        <div class="demo-item">
          <h4>Fecha Medium</h4>
          <openiis-date-input placeholder="Fecha mediana" size="md">
          </openiis-date-input>
        </div>

        <div class="demo-item">
          <h4>Fecha Large</h4>
          <openiis-date-input placeholder="Fecha grande" size="lg">
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
