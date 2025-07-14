import { Component, EventEmitter, Input, Output } from '@angular/core';
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
  @Input() basicDateValue: string | null = null;
  @Input() futureDate: string | null = null;
  @Input() overdueDate: string | null = null;
  @Input() disabledDate: string | null = null;
  @Input() futureDateMinimum: string = new Date().toISOString();

  @Output() dateChange = new EventEmitter<{
    value: string | null;
    type: string;
  }>();

  onDateChange(value: string | null, type: string) {
    this.dateChange.emit({ value, type });
  }
}
