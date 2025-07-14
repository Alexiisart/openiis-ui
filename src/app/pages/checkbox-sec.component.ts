import { Component, EventEmitter, Input, Output } from '@angular/core';
import { CommonModule } from '@angular/common';
import { OpeniisCheckboxComponent } from '../components/checkboxes/checkbox.component';

@Component({
  selector: 'app-checkbox-sec',
  standalone: true,
  imports: [CommonModule, OpeniisCheckboxComponent],
  template: `
    <div class="demo-section">
      <h2>Checkboxes</h2>
      <div class="demo-grid">
        <div class="demo-item">
          <h4>Tipos de Checkbox</h4>
          <div class="checkbox-group">
            <openiis-checkbox
              label="Checkbox Default"
              type="default"
              size="md"
              [checked]="basicCheckbox"
              (checkedChange)="onCheckboxChange($event, 'basic')"
            >
            </openiis-checkbox>
            <openiis-checkbox
              label="Checkbox Primary"
              type="primary"
              size="md"
              [checked]="primaryCheckbox"
              (checkedChange)="onCheckboxChange($event, 'primary')"
            >
            </openiis-checkbox>
            <openiis-checkbox
              label="Checkbox Success"
              type="success"
              size="md"
              [checked]="successCheckbox"
              (checkedChange)="onCheckboxChange($event, 'success')"
            >
            </openiis-checkbox>
            <openiis-checkbox
              label="Checkbox Warning"
              type="warning"
              size="md"
              [checked]="warningCheckbox"
              (checkedChange)="onCheckboxChange($event, 'warning')"
            >
            </openiis-checkbox>
            <openiis-checkbox
              label="Checkbox Danger"
              type="danger"
              size="md"
              [checked]="dangerCheckbox"
              (checkedChange)="onCheckboxChange($event, 'danger')"
            >
            </openiis-checkbox>
          </div>
        </div>

        <div class="demo-item">
          <h4>Variantes Especiales</h4>
          <div class="checkbox-group">
            <openiis-checkbox
              label="Checkbox Subtle"
              type="subtle"
              size="md"
              [checked]="subtleCheckbox"
              (checkedChange)="onCheckboxChange($event, 'subtle')"
            >
            </openiis-checkbox>
            <openiis-checkbox
              label="Checkbox Outline"
              type="outline"
              size="md"
              [checked]="outlineCheckbox"
              (checkedChange)="onCheckboxChange($event, 'outline')"
            >
            </openiis-checkbox>
            <openiis-checkbox
              label="Checkbox Indeterminado"
              type="primary"
              size="md"
              [checked]="indeterminateCheckbox"
              [indeterminate]="true"
              (checkedChange)="onCheckboxChange($event, 'indeterminate')"
            >
            </openiis-checkbox>
            <openiis-checkbox
              label="Checkbox Deshabilitado"
              type="default"
              size="md"
              [checked]="disabledCheckbox"
              [disabled]="true"
            >
            </openiis-checkbox>
          </div>
        </div>

        <div class="demo-item">
          <h4>Tamaños de Checkbox</h4>
          <div class="checkbox-group">
            <openiis-checkbox
              label="Checkbox XS"
              type="primary"
              size="xs"
              [checked]="true"
            >
            </openiis-checkbox>
            <openiis-checkbox
              label="Checkbox Small"
              type="primary"
              size="sm"
              [checked]="true"
            >
            </openiis-checkbox>
            <openiis-checkbox
              label="Checkbox Medium"
              type="primary"
              size="md"
              [checked]="true"
            >
            </openiis-checkbox>
            <openiis-checkbox
              label="Checkbox Large"
              type="primary"
              size="lg"
              [checked]="true"
            >
            </openiis-checkbox>
            <openiis-checkbox
              label="Checkbox XL"
              type="primary"
              size="xl"
              [checked]="true"
            >
            </openiis-checkbox>
          </div>
        </div>

        <div class="demo-item">
          <h4>Checkboxes con Ayuda</h4>
          <div class="checkbox-group">
            <openiis-checkbox
              label="Acepto términos y condiciones"
              type="primary"
              size="md"
              helpText="Lee nuestros términos antes de continuar"
              [checked]="acceptTerms"
              (checkedChange)="onCheckboxChange($event, 'acceptTerms')"
            >
            </openiis-checkbox>
            <openiis-checkbox
              label="Suscribirse al newsletter"
              type="success"
              size="md"
              helpText="Recibirás actualizaciones semanales"
              [checked]="subscribeNewsletter"
              (checkedChange)="onCheckboxChange($event, 'subscribeNewsletter')"
            >
            </openiis-checkbox>
            <openiis-checkbox
              label="Campo obligatorio"
              type="danger"
              size="md"
              errorText="Este campo es obligatorio"
              [checked]="requiredField"
              (checkedChange)="onCheckboxChange($event, 'requiredField')"
            >
            </openiis-checkbox>
          </div>
        </div>

        <div class="demo-item">
          <h4>Grupos de Checkboxes</h4>
          <div class="checkbox-group">
            <h5>Preferencias de Notificación</h5>
            <openiis-checkbox
              label="Notificaciones por email"
              type="primary"
              size="md"
              [checked]="notificationEmail"
              (checkedChange)="onCheckboxChange($event, 'notificationEmail')"
            >
            </openiis-checkbox>
            <openiis-checkbox
              label="Notificaciones push"
              type="primary"
              size="md"
              [checked]="notificationPush"
              (checkedChange)="onCheckboxChange($event, 'notificationPush')"
            >
            </openiis-checkbox>
            <openiis-checkbox
              label="Notificaciones SMS"
              type="primary"
              size="md"
              [checked]="notificationSMS"
              (checkedChange)="onCheckboxChange($event, 'notificationSMS')"
            >
            </openiis-checkbox>
            <openiis-checkbox
              label="Seleccionar todo"
              type="outline"
              size="md"
              [checked]="allNotifications"
              [indeterminate]="someNotifications"
              (checkedChange)="onSelectAllNotifications($event)"
            >
            </openiis-checkbox>
          </div>
        </div>

        <div class="demo-item">
          <h4>Estados Especiales</h4>
          <div class="checkbox-group">
            <openiis-checkbox
              label="Checkbox con tooltip"
              type="primary"
              size="md"
              title="Este checkbox tiene un tooltip informativo"
              [checked]="checkboxWithTooltip"
              (checkedChange)="onCheckboxChange($event, 'checkboxWithTooltip')"
            >
            </openiis-checkbox>
            <openiis-checkbox
              label="Checkbox con estado de carga"
              type="subtle"
              size="md"
              [disabled]="loadingCheckbox"
              helpText="Simulando estado de carga..."
              [checked]="loadingCheckboxValue"
            >
            </openiis-checkbox>
            <openiis-checkbox
              label="Checkbox con validación"
              type="success"
              size="md"
              helpText="✓ Validado correctamente"
              [checked]="validatedCheckbox"
              (checkedChange)="onCheckboxChange($event, 'validatedCheckbox')"
            >
            </openiis-checkbox>
          </div>
        </div>
      </div>
    </div>
  `,
})
export class CheckboxSecComponent {
  @Input() basicCheckbox = false;
  @Input() primaryCheckbox = false;
  @Input() successCheckbox = false;
  @Input() warningCheckbox = false;
  @Input() dangerCheckbox = false;
  @Input() subtleCheckbox = false;
  @Input() outlineCheckbox = false;
  @Input() indeterminateCheckbox = false;
  @Input() disabledCheckbox = true;
  @Input() acceptTerms = false;
  @Input() subscribeNewsletter = false;
  @Input() requiredField = false;
  @Input() notificationEmail = false;
  @Input() notificationPush = false;
  @Input() notificationSMS = false;
  @Input() allNotifications = false;
  @Input() someNotifications = false;
  @Input() checkboxWithTooltip = false;
  @Input() loadingCheckbox = false;
  @Input() loadingCheckboxValue = false;
  @Input() validatedCheckbox = false;

  @Output() checkboxChange = new EventEmitter<{
    checked: boolean;
    type: string;
  }>();

  onCheckboxChange(checked: boolean, type: string) {
    this.checkboxChange.emit({ checked, type });
  }

  onSelectAllNotifications(checked: boolean) {
    this.allNotifications = checked;
    this.someNotifications = checked;
  }

  onCheckboxWithTooltipChange(checked: boolean) {
    this.checkboxWithTooltip = checked;
  }

  onLoadingCheckboxChange(checked: boolean) {
    this.loadingCheckbox = checked;
  }

  onValidatedCheckboxChange(checked: boolean) {
    this.validatedCheckbox = checked;
  }
}
