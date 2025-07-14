import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import {
  OpeniisInputComponent,
  OpeniisSearchInputComponent,
} from '../components';
import { OpeniisButtonComponent } from '../components/buttons/button.component';
import { InputVariant } from '../components/input/input.component';

@Component({
  selector: 'app-input-sec',
  standalone: true,
  imports: [
    CommonModule,
    OpeniisInputComponent,
    OpeniisSearchInputComponent,
    OpeniisButtonComponent,
  ],
  template: `
    <!-- Sección de Entradas -->
    <section id="basic-inputs" class="demo-section">
      <h2>Entradas</h2>

      <div class="demo-subsection">
        <h3>Tipos de Entrada</h3>
        <div class="demo-grid">
          <div class="demo-item">
            <h4>Formulario de Registro</h4>
            <form
              class="demo-form"
              (ngSubmit)="onFormSubmit('register')"
              novalidate
            >
              <openiis-input
                label="Nombre completo"
                placeholder="Ingresa tu nombre"
                type="text"
                [(value)]="basicInputValue"
                size="md"
                variant="default"
                helpText="Ingresa tu nombre y apellido"
                (valueChange)="onInputChange($event, 'basic')"
              >
              </openiis-input>

              <openiis-input
                label="Correo electrónico"
                placeholder="ejemplo@correo.com"
                type="email"
                [(value)]="emailInputValue"
                iconLeft="mail"
                [clearable]="true"
                size="md"
                variant="outlined"
                helpText="Usa un correo válido"
                [enableValidation]="true"
                [showValidationIcons]="true"
                (valueChange)="onInputChange($event, 'email')"
                (validationChange)="onValidationChange($event, 'email')"
              >
              </openiis-input>

              <openiis-input
                label="Contraseña"
                placeholder="Ingresa tu contraseña"
                type="password"
                [(value)]="passwordInputValue"
                iconLeft="lock"
                size="md"
                variant="filled"
                helpText="Mínimo 8 caracteres"
                [minLength]="8"
                [enableValidation]="true"
                [showValidationIcons]="true"
                (valueChange)="onInputChange($event, 'password')"
                (validationChange)="onValidationChange($event, 'password')"
              >
              </openiis-input>

              <openiis-button
                type="primary"
                text="Registrarse"
                size="md"
                iconLeft="person_add"
                (clickEvent)="onButtonClick('register')"
              >
              </openiis-button>
            </form>
          </div>

          <div class="demo-item">
            <h4>Formulario de Perfil</h4>
            <form
              class="demo-form"
              (ngSubmit)="onFormSubmit('profile')"
              novalidate
            >
              <openiis-input
                label="Sitio web"
                placeholder="https://ejemplo.com"
                type="url"
                [(value)]="urlInputValue"
                iconLeft="link"
                size="md"
                variant="minimal"
                helpText="Incluye https://"
                (valueChange)="onInputChange($event, 'url')"
              >
              </openiis-input>

              <openiis-input
                label="Nombre de usuario"
                placeholder="Entre 3 y 20 caracteres"
                [(value)]="usernameInputValue"
                size="md"
                variant="default"
                helpText="Mínimo 3 caracteres, máximo 20"
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
                text="Actualizar Perfil"
                size="md"
                iconLeft="person"
                (clickEvent)="onButtonClick('profile')"
              >
              </openiis-button>
            </form>
          </div>

          <div class="demo-item">
            <h4>Formulario de Contacto</h4>
            <form
              class="demo-form"
              (ngSubmit)="onFormSubmit('contact')"
              novalidate
            >
              <openiis-input
                label="Número de teléfono (México)"
                type="tel"
                [(value)]="telMexicoValue"
                customFormat="(XXX) XXX-XXXX"
                iconLeft="phone"
                size="md"
                [maxLength]="14"
                variant="default"
                helpText="Formato: (123) 456-7890"
                [enableValidation]="true"
                [showValidationIcons]="true"
                (valueChange)="onInputChange($event, 'tel-mx')"
                (validationChange)="onValidationChange($event, 'tel-mx')"
              >
              </openiis-input>

              <openiis-input
                label="Número de teléfono (España)"
                type="tel"
                [(value)]="telInputValue"
                customFormat="XXX XXX XXX"
                iconLeft="phone"
                [maxLength]="11"
                size="md"
                variant="outlined"
                helpText="Formato: 612 345 678"
                [enableValidation]="true"
                [showValidationIcons]="true"
                (valueChange)="onInputChange($event, 'tel-es')"
                (validationChange)="onValidationChange($event, 'tel-es')"
              >
              </openiis-input>

              <openiis-input
                label="Número telefónico internacional"
                type="tel"
                [(value)]="telInternationalValue"
                customFormat="+XX XXX XXX XXXX"
                iconLeft="phone"
                [maxLength]="16"
                size="md"
                variant="filled"
                helpText="Formato: +52 555 123 4567"
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
                text="Enviar Contacto"
                size="md"
                iconLeft="send"
                (clickEvent)="onButtonClick('contact')"
              >
              </openiis-button>
            </form>
          </div>

          <div class="demo-item">
            <h4>Entrada de Números</h4>
            <form
              class="demo-form"
              (ngSubmit)="onFormSubmit('number')"
              novalidate
            >
              <openiis-input
                label="Solo números"
                type="number"
                [(value)]="numberValue"
                iconLeft="tag"
                size="md"
                variant="minimal"
                helpText="Solo permite dígitos"
                [maxLength]="10"
                (valueChange)="onInputChange($event, 'number')"
              >
              </openiis-input>

              <openiis-button
                type="outline-primary"
                text="Procesar Número"
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
        <h3>Variantes de Entrada</h3>
        <div class="demo-grid">
          <div class="demo-item">
            <h4>Variante Default</h4>
            <openiis-input
              label="Entrada Default"
              placeholder="Variante por defecto"
              size="md"
              variant="default"
            >
            </openiis-input>
          </div>

          <div class="demo-item">
            <h4>Variante Filled</h4>
            <openiis-input
              label="Entrada Filled"
              placeholder="Variante filled"
              size="md"
              variant="filled"
            >
            </openiis-input>
          </div>

          <div class="demo-item">
            <h4>Variante Outlined</h4>
            <openiis-input
              label="Entrada Outlined"
              placeholder="Variante outlined"
              size="md"
              variant="outlined"
            >
            </openiis-input>
          </div>

          <div class="demo-item">
            <h4>Variante Minimal</h4>
            <openiis-input
              label="Entrada Minimal"
              placeholder="Variante minimal"
              size="md"
              variant="minimal"
            >
            </openiis-input>
          </div>
        </div>
      </div>

      <div id="sizes-inputs" class="demo-subsection">
        <h3>Tamaños de Entrada</h3>
        <div class="demo-grid">
          <div class="demo-item">
            <h4>Todos los Tamaños</h4>
            <div class="input-sizes">
              <openiis-input
                label="Extra Small"
                placeholder="Tamaño XS"
                size="xs"
                variant="default"
              >
              </openiis-input>
              <openiis-input
                label="Small"
                placeholder="Tamaño SM"
                size="sm"
                variant="default"
              >
              </openiis-input>
              <openiis-input
                label="Medium"
                placeholder="Tamaño MD"
                size="md"
                variant="default"
              >
              </openiis-input>
              <openiis-input
                label="Large"
                placeholder="Tamaño LG"
                size="lg"
                variant="default"
              >
              </openiis-input>
              <openiis-input
                label="Extra Large"
                placeholder="Tamaño XL"
                size="xl"
                variant="default"
              >
              </openiis-input>
            </div>
          </div>
        </div>
      </div>

      <div class="demo-subsection">
        <h3>Estados de Entrada</h3>
        <div class="demo-grid">
          <div class="demo-item">
            <h4>Entrada Deshabilitada</h4>
            <openiis-input
              label="Entrada deshabilitada"
              [(value)]="disabledInputValue"
              [disabled]="true"
              size="md"
              variant="default"
              helpText="Este campo está deshabilitado"
            >
            </openiis-input>
          </div>

          <div class="demo-item">
            <h4>Entrada Solo Lectura</h4>
            <openiis-input
              label="Entrada solo lectura"
              [(value)]="readonlyInputValue"
              [readonly]="true"
              size="md"
              variant="default"
              helpText="Este campo es solo lectura"
            >
            </openiis-input>
          </div>

          <div class="demo-item">
            <h4>Entrada con Error</h4>
            <openiis-input
              label="Entrada con error"
              placeholder="Ingresa algo..."
              [(value)]="errorInputValue"
              size="md"
              [variant]="variantError"
              [errorText]="errorText"
              (valueChange)="onInputChange($event, 'error')"
            >
            </openiis-input>
          </div>

          <div class="demo-item">
            <h4>Entrada Exitosa</h4>
            <openiis-input
              label="Entrada válida"
              [(value)]="successInputValue"
              size="md"
              variant="default"
              helpText="¡Valor válido!"
            >
            </openiis-input>
          </div>
        </div>
      </div>

      <div class="demo-subsection">
        <h3>Textarea</h3>
        <div class="demo-grid">
          <div class="demo-item">
            <h4>Textarea Básico</h4>
            <openiis-input
              label="Comentarios"
              placeholder="Escribe tus comentarios aquí..."
              [(value)]="textareaValue"
              [isTextarea]="true"
              [rows]="4"
              size="md"
              variant="default"
              helpText="Máximo 500 caracteres"
              (valueChange)="onInputChange($event, 'textarea')"
            >
            </openiis-input>
          </div>

          <div id="textarea-inputs" class="demo-item">
            <h4>Textarea con Límite</h4>
            <openiis-input
              label="Descripción"
              placeholder="Describe el producto..."
              [isTextarea]="true"
              [rows]="3"
              [maxLength]="200"
              [showCharacterCount]="true"
              size="md"
              variant="outlined"
              helpText="Describe brevemente el producto"
            >
            </openiis-input>
          </div>
        </div>
      </div>

      <div id="search-inputs" class="demo-subsection">
        <h3>Componente de Búsqueda</h3>
        <div class="demo-grid">
          <div class="demo-item">
            <h4>Barra de Búsqueda</h4>
            <openiis-search-input
              placeholder="Buscar elementos..."
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
  disabledInputValue = 'Texto no editable';
  readonlyInputValue = 'Solo lectura';
  errorInputValue = '';
  successInputValue = 'Valor válido';

  // Inputs de error
  variantError: InputVariant = 'error';
  errorText = 'Este campo es requerido';

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
