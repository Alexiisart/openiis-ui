import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { OpeniisCheckboxComponent } from '../components/checkboxes/checkbox.component';
import { TranslateModule } from '@ngx-translate/core';

@Component({
  selector: 'app-checkbox-sec',
  standalone: true,
  imports: [CommonModule, OpeniisCheckboxComponent, TranslateModule],
  template: `
    <div class="demo-section">
      <h2>{{ 'checkbox.casillas_de_verificación' | translate }}</h2>
      <div class="demo-grid">
        <div class="demo-item">
          <h4>{{ 'checkbox.tipos_de_checkbox' | translate }}</h4>
          <div class="checkbox-group">
            <openiis-checkbox
              [label]="'checkbox.checkbox_default' | translate"
              type="default"
              size="md"
              [checked]="basicCheckbox"
              (checkedChange)="onCheckboxChange($event, 'basic')"
            >
            </openiis-checkbox>
            <openiis-checkbox
              [label]="'checkbox.checkbox_primary' | translate"
              type="primary"
              size="md"
              [checked]="primaryCheckbox"
              (checkedChange)="onCheckboxChange($event, 'primary')"
            >
            </openiis-checkbox>
            <openiis-checkbox
              [label]="'checkbox.checkbox_success' | translate"
              type="success"
              size="md"
              [checked]="successCheckbox"
              (checkedChange)="onCheckboxChange($event, 'success')"
            >
            </openiis-checkbox>
            <openiis-checkbox
              [label]="'checkbox.checkbox_warning' | translate"
              type="warning"
              size="md"
              [checked]="warningCheckbox"
              (checkedChange)="onCheckboxChange($event, 'warning')"
            >
            </openiis-checkbox>
            <openiis-checkbox
              [label]="'checkbox.checkbox_danger' | translate"
              type="danger"
              size="md"
              [checked]="dangerCheckbox"
              (checkedChange)="onCheckboxChange($event, 'danger')"
            >
            </openiis-checkbox>
          </div>
        </div>

        <div class="demo-item">
          <h4>{{ 'checkbox.variantes_especiales' | translate }}</h4>
          <div class="checkbox-group">
            <openiis-checkbox
              [label]="'checkbox.checkbox_subtle' | translate"
              type="subtle"
              size="md"
              [checked]="subtleCheckbox"
              (checkedChange)="onCheckboxChange($event, 'subtle')"
            >
            </openiis-checkbox>
            <openiis-checkbox
              [label]="'checkbox.checkbox_outline' | translate"
              type="outline"
              size="md"
              [checked]="outlineCheckbox"
              (checkedChange)="onCheckboxChange($event, 'outline')"
            >
            </openiis-checkbox>
            <openiis-checkbox
              [label]="'checkbox.checkbox_indeterminado' | translate"
              type="primary"
              size="md"
              [checked]="indeterminateCheckbox"
              [indeterminate]="true"
              (checkedChange)="onCheckboxChange($event, 'indeterminate')"
            >
            </openiis-checkbox>
            <openiis-checkbox
              [label]="'checkbox.checkbox_deshabilitado' | translate"
              type="default"
              size="md"
              [checked]="disabledCheckbox"
              [disabled]="true"
            >
            </openiis-checkbox>
          </div>
        </div>

        <div class="demo-item">
          <h4>{{ 'checkbox.tamaños_de_checkbox' | translate }}</h4>
          <div class="checkbox-group">
            <openiis-checkbox
              [label]="'checkbox.checkbox_xs' | translate"
              type="primary"
              size="xs"
              [checked]="true"
            >
            </openiis-checkbox>
            <openiis-checkbox
              [label]="'checkbox.checkbox_small' | translate"
              type="primary"
              size="sm"
              [checked]="true"
            >
            </openiis-checkbox>
            <openiis-checkbox
              [label]="'checkbox.checkbox_medium' | translate"
              type="primary"
              size="md"
              [checked]="true"
            >
            </openiis-checkbox>
            <openiis-checkbox
              [label]="'checkbox.checkbox_large' | translate"
              type="primary"
              size="lg"
              [checked]="true"
            >
            </openiis-checkbox>
            <openiis-checkbox
              [label]="'checkbox.checkbox_xl' | translate"
              type="primary"
              size="xl"
              [checked]="true"
            >
            </openiis-checkbox>
          </div>
        </div>

        <div class="demo-item">
          <h4>{{ 'checkbox.checkboxes_con_ayuda' | translate }}</h4>
          <div class="checkbox-group">
            <openiis-checkbox
              [label]="'checkbox.acepto_términos_y_condiciones' | translate"
              type="primary"
              size="md"
              [checked]="acceptTerms"
              (checkedChange)="onCheckboxChange($event, 'acceptTerms')"
            >
            </openiis-checkbox>
            <openiis-checkbox
              [label]="'checkbox.suscribirse_al_newsletter' | translate"
              type="success"
              size="md"
              [checked]="subscribeNewsletter"
              (checkedChange)="onCheckboxChange($event, 'subscribeNewsletter')"
            >
            </openiis-checkbox>
            <openiis-checkbox
              [label]="'checkbox.campo_obligatorio' | translate"
              type="danger"
              size="md"
              [checked]="requiredField"
              (checkedChange)="onCheckboxChange($event, 'requiredField')"
            >
            </openiis-checkbox>
          </div>
        </div>

        <div class="demo-item">
          <h4>{{ 'checkbox.grupos_de_checkboxes' | translate }}</h4>
          <div class="checkbox-group">
            <h5>{{ 'checkbox.preferencias_de_notificación' | translate }}</h5>
            <openiis-checkbox
              [label]="'checkbox.notificaciones_por_email' | translate"
              type="primary"
              size="md"
              [checked]="notificationEmail"
              (checkedChange)="onCheckboxChange($event, 'notificationEmail')"
            >
            </openiis-checkbox>
            <openiis-checkbox
              [label]="'checkbox.notificaciones_push' | translate"
              type="primary"
              size="md"
              [checked]="notificationPush"
              (checkedChange)="onCheckboxChange($event, 'notificationPush')"
            >
            </openiis-checkbox>
            <openiis-checkbox
              [label]="'checkbox.notificaciones_sms' | translate"
              type="primary"
              size="md"
              [checked]="notificationSMS"
              (checkedChange)="onCheckboxChange($event, 'notificationSMS')"
            >
            </openiis-checkbox>
            <openiis-checkbox
              [label]="'checkbox.seleccionar_todo' | translate"
              type="outline"
              size="md"
              [checked]="allNotifications"
              [indeterminate]="someNotifications"
              (checkedChange)="onSelectAllNotifications($event)"
            >
            </openiis-checkbox>
          </div>
        </div>
      </div>
    </div>
  `,
})
export class CheckboxSecComponent {
  /* ===== CHECKBOX SECTION ===== */
  basicCheckbox = false;
  primaryCheckbox = true;
  successCheckbox = false;
  warningCheckbox = true;
  dangerCheckbox = false;
  subtleCheckbox = false;
  outlineCheckbox = true;
  disabledCheckbox = true;
  indeterminateCheckbox = false;
  acceptTerms = false;
  subscribeNewsletter = false;
  requiredField = false;
  notificationEmail = false;
  notificationPush = true;
  notificationSMS = false;
  checkboxWithTooltip = false;
  loadingCheckbox = true;
  loadingCheckboxValue = false;
  validatedCheckbox = true;

  get allNotifications(): boolean {
    return (
      this.notificationEmail && this.notificationPush && this.notificationSMS
    );
  }

  get someNotifications(): boolean {
    const checkedCount = [
      this.notificationEmail,
      this.notificationPush,
      this.notificationSMS,
    ].filter(Boolean).length;
    return checkedCount > 0 && checkedCount < 3;
  }

  /* ===== CHECKBOX METHODS ===== */
  onCheckboxChange(checked: boolean, type: string): void {
    switch (type) {
      case 'basic':
        this.basicCheckbox = checked;
        break;
      case 'primary':
        this.primaryCheckbox = checked;
        break;
      case 'success':
        this.successCheckbox = checked;
        break;
      case 'warning':
        this.warningCheckbox = checked;
        break;
      case 'danger':
        this.dangerCheckbox = checked;
        break;
      case 'subtle':
        this.subtleCheckbox = checked;
        break;
      case 'outline':
        this.outlineCheckbox = checked;
        break;
      case 'indeterminate':
        this.indeterminateCheckbox = checked;
        break;
      case 'acceptTerms':
        this.acceptTerms = checked;
        break;
      case 'subscribeNewsletter':
        this.subscribeNewsletter = checked;
        break;
      case 'requiredField':
        this.requiredField = checked;
        break;
      case 'notificationEmail':
        this.notificationEmail = checked;
        break;
      case 'notificationPush':
        this.notificationPush = checked;
        break;
      case 'notificationSMS':
        this.notificationSMS = checked;
        break;
      case 'checkboxWithTooltip':
        this.checkboxWithTooltip = checked;
        break;
      case 'validatedCheckbox':
        this.validatedCheckbox = checked;
        break;
    }
    console.log(`Checkbox ${type} cambiado:`, checked);
  }

  onSelectAllNotifications(checked: boolean) {
    this.notificationEmail = checked;
    this.notificationPush = checked;
    this.notificationSMS = checked;
  }
}
