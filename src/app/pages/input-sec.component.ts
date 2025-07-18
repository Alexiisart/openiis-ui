import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { OpeniisInputComponent, OpeniisSearchInputComponent } from 'openiis-ui';
import { OpeniisButtonComponent } from 'openiis-ui';
import { InputVariant } from 'openiis-ui';
import { TranslateModule } from '@ngx-translate/core';

@Component({
  selector: 'app-input-sec',
  standalone: true,
  imports: [
    CommonModule,
    OpeniisInputComponent,
    OpeniisSearchInputComponent,
    OpeniisButtonComponent,
    TranslateModule,
  ],
  template: `
    <!-- Sección de Entradas -->
    <section id="basic-inputs" class="demo-section">
      <h2>{{ 'input.entradas' | translate }}</h2>

      <div class="demo-subsection">
        <h3>{{ 'input.tipos_de_entrada' | translate }}</h3>
        <div class="demo-grid">
          <div class="demo-item">
            <h4>{{ 'input.formulario_de_registro' | translate }}</h4>
            <form
              class="demo-form"
              (ngSubmit)="onFormSubmit('register')"
              novalidate
            >
              <openiis-input
                [label]="'input.nombre_completo' | translate"
                [placeholder]="'input.ingresa_tu_nombre' | translate"
                type="text"
                [(value)]="basicInputValue"
                size="md"
                variant="default"
                (valueChange)="onInputChange($event, 'basic')"
              >
              </openiis-input>

              <openiis-input
                [label]="'input.correo_electrónico' | translate"
                [placeholder]="'input.ejemplocorreocom' | translate"
                type="email"
                [(value)]="emailInputValue"
                iconLeft="mail"
                [clearable]="true"
                size="md"
                variant="outlined"
                [helpText]="'input.usa_un_correo_válido' | translate"
                [enableValidation]="true"
                [showValidationIcons]="true"
                (valueChange)="onInputChange($event, 'email')"
                (validationChange)="onValidationChange($event, 'email')"
              >
              </openiis-input>

              <openiis-input
                [label]="'input.contraseña' | translate"
                [placeholder]="'input.ingresa_tu_contraseña' | translate"
                type="password"
                [(value)]="passwordInputValue"
                iconLeft="lock"
                size="md"
                variant="filled"
                [helpText]="'input.mínimo_8_caracteres' | translate"
                [minLength]="8"
                [enableValidation]="true"
                [showValidationIcons]="true"
                (valueChange)="onInputChange($event, 'password')"
                (validationChange)="onValidationChange($event, 'password')"
              >
              </openiis-input>

              <openiis-button
                type="primary"
                [text]="'input.registrarse' | translate"
                size="md"
                iconLeft="person_add"
                (clickEvent)="onButtonClick('register')"
              >
              </openiis-button>
            </form>
          </div>

          <div class="demo-item">
            <h4>{{ 'input.formulario_de_perfil' | translate }}</h4>
            <form
              class="demo-form"
              (ngSubmit)="onFormSubmit('profile')"
              novalidate
            >
              <openiis-input
                [label]="'input.sitio_web' | translate"
                [placeholder]="'input.httpsejemplocom' | translate"
                type="url"
                [(value)]="urlInputValue"
                iconLeft="link"
                size="md"
                variant="minimal"
                [helpText]="'input.incluye_https' | translate"
                (valueChange)="onInputChange($event, 'url')"
              >
              </openiis-input>

              <openiis-input
                [label]="'input.nombre_de_usuario' | translate"
                [placeholder]="'input.entre_3_y_20_caracteres' | translate"
                [(value)]="usernameInputValue"
                size="md"
                variant="default"
                [helpText]="'input.entre_3_y_20_caracteres' | translate"
                [minLength]="3"
                [maxLength]="20"
                [showCharacterCount]="true"
                [enableValidation]="true"
                [showValidationIcons]="true"
                (valueChange)="onInputChange($event, 'username')"
                (validationChange)="onValidationChange($event, 'username')"
              >
              </openiis-input>

              <openiis-button
                type="secondary"
                [text]="'input.actualizar_perfil' | translate"
                size="md"
                iconLeft="person"
                (clickEvent)="onButtonClick('profile')"
              >
              </openiis-button>
            </form>
          </div>

          <div class="demo-item">
            <h4>{{ 'input.formulario_de_contacto' | translate }}</h4>
            <form
              class="demo-form"
              (ngSubmit)="onFormSubmit('contact')"
              novalidate
            >
              <openiis-input
                [label]="'input.número_de_teléfono_méxico' | translate"
                type="tel"
                [(value)]="telMexicoValue"
                customFormat="(XXX) XXX-XXXX"
                iconLeft="phone"
                size="md"
                [maxLength]="14"
                variant="default"
                [helpText]="'input.formato_teléfono_méxico' | translate"
                [enableValidation]="true"
                [showValidationIcons]="true"
                (valueChange)="onInputChange($event, 'tel-mx')"
                (validationChange)="onValidationChange($event, 'tel-mx')"
              >
              </openiis-input>

              <openiis-input
                [label]="'input.número_de_teléfono_españa' | translate"
                type="tel"
                [(value)]="telInputValue"
                customFormat="XXX XXX XXX"
                iconLeft="phone"
                [maxLength]="11"
                size="md"
                variant="outlined"
                [helpText]="'input.formato_teléfono_españa' | translate"
                [enableValidation]="true"
                [showValidationIcons]="true"
                (valueChange)="onInputChange($event, 'tel-es')"
                (validationChange)="onValidationChange($event, 'tel-es')"
              >
              </openiis-input>

              <openiis-input
                [label]="'input.número_telefónico_internacional' | translate"
                type="tel"
                [(value)]="telInternationalValue"
                customFormat="+XX XXX XXX XXXX"
                iconLeft="phone"
                [maxLength]="16"
                size="md"
                variant="filled"
                [helpText]="'input.formato_teléfono_internacional' | translate"
                [enableValidation]="true"
                [showValidationIcons]="true"
                (valueChange)="onInputChange($event, 'tel-international')"
                (validationChange)="
                  onValidationChange($event, 'tel-international')
                "
              >
              </openiis-input>

              <openiis-button
                type="success"
                [text]="'input.enviar_contacto' | translate"
                size="md"
                iconLeft="send"
                (clickEvent)="onButtonClick('contact')"
              >
              </openiis-button>
            </form>
          </div>

          <div class="demo-item">
            <h4>{{ 'input.entrada_de_números' | translate }}</h4>
            <form
              class="demo-form"
              (ngSubmit)="onFormSubmit('number')"
              novalidate
            >
              <openiis-input
                [label]="'input.solo_números' | translate"
                type="number"
                [(value)]="numberValue"
                iconLeft="tag"
                size="md"
                variant="minimal"
                [helpText]="'input.solo_dígitos' | translate"
                [maxLength]="10"
                (valueChange)="onInputChange($event, 'number')"
              >
              </openiis-input>

              <openiis-button
                type="outline-primary"
                [text]="'input.procesar_número' | translate"
                size="md"
                iconLeft="calculate"
                (clickEvent)="onButtonClick('number')"
              >
              </openiis-button>
            </form>
          </div>
        </div>
      </div>

      <div id="variants-inputs" class="demo-subsection">
        <h3>{{ 'input.variantes_de_entrada' | translate }}</h3>
        <div class="demo-grid">
          <div class="demo-item">
            <h4>{{ 'input.variante_default' | translate }}</h4>
            <openiis-input
              [label]="'input.entrada_default' | translate"
              [placeholder]="'input.variante_por_defecto' | translate"
              size="md"
              variant="default"
            >
            </openiis-input>
          </div>

          <div class="demo-item">
            <h4>{{ 'input.variante_filled' | translate }}</h4>
            <openiis-input
              [label]="'input.entrada_filled' | translate"
              [placeholder]="'input.variante_filled_1' | translate"
              size="md"
              variant="filled"
            >
            </openiis-input>
          </div>

          <div class="demo-item">
            <h4>{{ 'input.variante_outlined' | translate }}</h4>
            <openiis-input
              [label]="'input.entrada_outlined' | translate"
              [placeholder]="'input.variante_outlined_1' | translate"
              size="md"
              variant="outlined"
            >
            </openiis-input>
          </div>

          <div class="demo-item">
            <h4>{{ 'input.variante_minimal' | translate }}</h4>
            <openiis-input
              [label]="'input.entrada_minimal' | translate"
              [placeholder]="'input.variante_minimal_1' | translate"
              size="md"
              variant="minimal"
            >
            </openiis-input>
          </div>
        </div>
      </div>

      <div id="sizes-inputs" class="demo-subsection">
        <h3>{{ 'input.tamaños_de_entrada' | translate }}</h3>
        <div class="demo-grid">
          <div class="demo-item">
            <h4>{{ 'input.todos_los_tamaños' | translate }}</h4>
            <div class="input-sizes">
              <openiis-input
                [label]="'input.extra_small' | translate"
                [placeholder]="'input.tamaño_xs' | translate"
                size="xs"
                variant="default"
              >
              </openiis-input>
              <openiis-input
                [label]="'input.small' | translate"
                [placeholder]="'input.tamaño_sm' | translate"
                size="sm"
                variant="default"
              >
              </openiis-input>
              <openiis-input
                [label]="'input.medium' | translate"
                [placeholder]="'input.tamaño_md' | translate"
                size="md"
                variant="default"
              >
              </openiis-input>
              <openiis-input
                [label]="'input.large' | translate"
                [placeholder]="'input.tamaño_lg' | translate"
                size="lg"
                variant="default"
              >
              </openiis-input>
              <openiis-input
                [label]="'input.extra_large' | translate"
                [placeholder]="'input.tamaño_xl' | translate"
                size="xl"
                variant="default"
              >
              </openiis-input>
            </div>
          </div>
        </div>
      </div>

      <div class="demo-subsection">
        <h3>{{ 'input.estados_de_entrada' | translate }}</h3>
        <div class="demo-grid">
          <div class="demo-item">
            <h4>{{ 'input.entrada_deshabilitada' | translate }}</h4>
            <openiis-input
              [label]="'input.entrada_deshabilitada_1' | translate"
              [(value)]="disabledInputValue"
              [disabled]="true"
              size="md"
              variant="default"
              [helpText]="'input.entrada_deshabilitada' | translate"
            >
            </openiis-input>
          </div>

          <div class="demo-item">
            <h4>{{ 'input.entrada_solo_lectura' | translate }}</h4>
            <openiis-input
              [label]="'input.entrada_solo_lectura_1' | translate"
              [(value)]="readonlyInputValue"
              [readonly]="true"
              size="md"
              variant="default"
              [helpText]="'input.entrada_solo_lectura' | translate"
            >
            </openiis-input>
          </div>

          <div class="demo-item">
            <h4>{{ 'input.entrada_con_error' | translate }}</h4>
            <openiis-input
              [label]="'input.entrada_con_error_1' | translate"
              [placeholder]="'input.ingresa_algo' | translate"
              [(value)]="errorInputValue"
              size="md"
              [variant]="variantError"
              [errorText]="errorText"
              (valueChange)="onInputChange($event, 'error')"
            >
            </openiis-input>
          </div>

          <div class="demo-item">
            <h4>{{ 'input.entrada_exitosa' | translate }}</h4>
            <openiis-input
              [label]="'input.entrada_válida' | translate"
              [(value)]="successInputValue"
              size="md"
              variant="default"
              [helpText]="'input.valor_válido' | translate"
            >
            </openiis-input>
          </div>
        </div>
      </div>

      <div class="demo-subsection">
        <h3>{{ 'input.textarea' | translate }}</h3>
        <div class="demo-grid">
          <div class="demo-item">
            <h4>{{ 'input.textarea_básico' | translate }}</h4>
            <openiis-input
              [label]="'input.comentarios' | translate"
              [placeholder]="'input.escribe_tus_comentarios_aquí' | translate"
              [(value)]="textareaValue"
              [isTextarea]="true"
              [rows]="4"
              size="md"
              variant="default"
              [helpText]="'input.máximo_500_caracteres' | translate"
              (valueChange)="onInputChange($event, 'textarea')"
            >
            </openiis-input>
          </div>

          <div id="textarea-inputs" class="demo-item">
            <h4>{{ 'input.textarea_con_límite' | translate }}</h4>
            <openiis-input
              [label]="'input.descripción' | translate"
              [placeholder]="'input.describe_el_producto' | translate"
              [isTextarea]="true"
              [rows]="3"
              [maxLength]="200"
              [showCharacterCount]="true"
              size="md"
              variant="outlined"
              [helpText]="'input.describe_brevemente_el_producto' | translate"
            >
            </openiis-input>
          </div>
        </div>
      </div>

      <div id="search-inputs" class="demo-subsection">
        <h3>{{ 'input.componente_de_búsqueda' | translate }}</h3>
        <div class="demo-grid">
          <div class="demo-item">
            <h4>{{ 'input.barra_de_búsqueda' | translate }}</h4>
            <openiis-search-input
              [placeholder]="'input.buscar_elementos' | translate"
              [searchTerm]="searchTerm"
              (searchChange)="onSearchChange($event)"
              (clearSearch)="onClearSearch()"
            >
            </openiis-search-input>
          </div>
        </div>
      </div>
    </section>
  `,
})
export class InputSecComponent {
  basicInputValue = '';
  emailInputValue = '';
  passwordInputValue = '';
  searchInputValue = '';
  urlInputValue = '';
  telInputValue = '';
  telMexicoValue = '';
  telInternationalValue = '';
  numberValue = '';
  usernameInputValue = '';
  textareaValue = '';
  disabledInputValue = '';
  readonlyInputValue = '';
  errorInputValue = '';
  successInputValue = '';

  // Inputs de error
  variantError: InputVariant = 'error';
  errorText = '';

  searchTerm = '';
  searchResults = '';

  loadingButton = false;
  loadingButton2 = false;

  onFormSubmit(formType: string): void {
    console.log(`Formulario ${formType} enviado`);
  }

  onSearchChange(term: string): void {
    this.searchTerm = term;
    this.searchResults = term ? `Búsqueda: "${term}"` : '';
    console.log('Búsqueda cambiada:', term);
  }

  onClearSearch(): void {
    this.searchTerm = '';
    this.searchResults = '';
    console.log('Búsqueda limpiada');
  }

  onButtonClick(buttonType: string): void {
    console.log(`Botón ${buttonType} clickeado`);
    if (buttonType === 'loading1') {
      this.loadingButton = true;
      setTimeout(() => {
        this.loadingButton = false;
      }, 2000);
    } else if (buttonType === 'loading2') {
      this.loadingButton2 = true;
      setTimeout(() => {
        this.loadingButton2 = false;
      }, 2000);
    } else if (buttonType === 'fab-loading') {
      this.loadingButton = true;
      setTimeout(() => {
        this.loadingButton = false;
      }, 2000);
    } else if (buttonType === 'fab-loading-extended') {
      this.loadingButton2 = true;
      setTimeout(() => {
        this.loadingButton2 = false;
      }, 2000);
    }
  }

  onInputChange(value: string, type: string): void {
    console.log(`Input ${type} cambiado:`, value);
  }

  onValidationChange(validation: any, type: string): void {
    console.log(`Validación ${type}:`, validation);
  }
}
