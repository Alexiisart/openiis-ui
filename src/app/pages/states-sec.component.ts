import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { OpeniisEmptyStateComponent } from 'openiis-ui';
import { TranslateModule } from '@ngx-translate/core';

@Component({
  selector: 'app-states-sec',
  standalone: true,
  imports: [CommonModule, OpeniisEmptyStateComponent, TranslateModule],
  template: `
    <!-- Sección de Estados -->
    <section id="basic-states" class="demo-section">
      <h2>{{ 'states.estados' | translate }}</h2>

      <div class="demo-subsection">
        <h3>{{ 'states.estados_vacíos' | translate }}</h3>
        <div class="demo-grid">
          <div class="demo-item">
            <h4>{{ 'states.estado_vacío_general' | translate }}</h4>
            <openiis-empty-state
              icon="inbox"
              [title]="'states.no_hay_elementos' | translate"
              [message]="'states.no_hay_elementos_mensaje' | translate"
              [buttonText]="'states.no_hay_elementos_botón' | translate"
              buttonType="primary"
              buttonIcon="add"
              (buttonClick)="onEmptyStateButtonClick()"
            >
            </openiis-empty-state>
          </div>

          <div class="demo-item">
            <h4>{{ 'states.estado_de_búsqueda_vacía' | translate }}</h4>
            <openiis-empty-state
              icon="search"
              [title]="'states.sin_resultados' | translate"
              [message]="'states.sin_resultados_mensaje' | translate"
              [buttonText]="'states.sin_resultados_botón' | translate"
              buttonType="secondary"
              buttonIcon="refresh"
              (buttonClick)="onEmptyStateSearch()"
            >
            </openiis-empty-state>
          </div>

          <div class="demo-item">
            <h4>{{ 'states.estado_de_error' | translate }}</h4>
            <openiis-empty-state
              icon="error"
              [title]="'states.error_de_conexión' | translate"
              [message]="'states.error_de_conexión_mensaje' | translate"
              [buttonText]="'states.error_de_conexión_botón' | translate"
              buttonType="danger"
              buttonIcon="refresh"
              (buttonClick)="onEmptyStateError()"
            >
            </openiis-empty-state>
          </div>

          <div class="demo-item">
            <h4>{{ 'states.estado_de_carga' | translate }}</h4>
            <openiis-empty-state
              icon="hourglass_empty"
              [title]="'states.cargando' | translate"
              [message]="'states.estado_de_carga_mensaje' | translate"
              [buttonText]="'states.estado_de_carga_botón' | translate"
              buttonType="outline-secondary"
              buttonIcon="close"
            >
            </openiis-empty-state>
          </div>
        </div>
      </div>

      <div id="specific-states" class="demo-subsection">
        <h3>{{ 'states.estados_específicos' | translate }}</h3>
        <div class="demo-grid">
          <div class="demo-item">
            <h4>{{ 'states.lista_de_productos_vacía' | translate }}</h4>
            <openiis-empty-state
              icon="shopping_cart"
              [title]="'states.carrito_vacío' | translate"
              [message]="'states.carrito_vacío_mensaje' | translate"
              [buttonText]="'states.carrito_vacío_botón' | translate"
              buttonType="primary"
              buttonIcon="storefront"
              [buttonFullWidth]="true"
            >
            </openiis-empty-state>
          </div>

          <div class="demo-item">
            <h4>{{ 'states.mensajes_vacíos' | translate }}</h4>
            <openiis-empty-state
              icon="mail"
              [title]="'states.sin_mensajes' | translate"
              [message]="'states.sin_mensajes_mensaje' | translate"
              [buttonText]="'states.sin_mensajes_botón' | translate"
              buttonType="success"
              buttonIcon="edit"
              [buttonResponsive]="true"
            >
            </openiis-empty-state>
          </div>

          <div class="demo-item">
            <h4>{{ 'states.configuración_pendiente' | translate }}</h4>
            <openiis-empty-state
              icon="settings"
              [title]="'states.configuración_requerida' | translate"
              [message]="'states.configuración_requerida_mensaje' | translate"
              [buttonText]="'states.configuración_requerida_botón' | translate"
              buttonType="warning"
              buttonIcon="tune"
              buttonSize="lg"
            >
            </openiis-empty-state>
          </div>
        </div>
      </div>
    </section>
  `,
})
export class StatesSecComponent {
  /* ===== EMPTY STATE METHODS ===== */
  onEmptyStateButtonClick(): void {
    console.log('Botón de estado vacío clickeado');
  }

  onEmptyStateSearch(): void {
    console.log('Botón de búsqueda vacía clickeado');
  }

  onEmptyStateError(): void {
    console.log('Botón de error clickeado');
  }
}
