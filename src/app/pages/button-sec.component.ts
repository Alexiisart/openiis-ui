import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { OpeniisButtonComponent } from '../components/buttons/button.component';
import { OpeniisButtonGroupComponent } from '../components';
import { OpeniisFabComponent } from '../components/fab/fab.component';
import { TranslateModule } from '@ngx-translate/core';

@Component({
  selector: 'app-button-sec',
  standalone: true,
  imports: [
    CommonModule,
    OpeniisButtonComponent,
    OpeniisButtonGroupComponent,
    OpeniisFabComponent,
    TranslateModule,
  ],
  template: `
    <!-- Sección de Botones -->
    <section id="basic-buttons" class="demo-section">
      <h2>{{ 'button.botones' | translate }}</h2>

      <div class="demo-subsection">
        <h3>{{ 'button.tipos_de_botones' | translate }}</h3>
        <div class="demo-grid">
          <div class="demo-item">
            <h4>{{ 'button.botones_principales' | translate }}</h4>
            <div class="button-group">
              <openiis-button
                type="primary"
                [text]="'button.primary' | translate"
                size="md"
                (clickEvent)="onButtonClick('primary')"
              >
              </openiis-button>
              <openiis-button
                type="secondary"
                [text]="'button.secondary' | translate"
                size="md"
                (clickEvent)="onButtonClick('secondary')"
              >
              </openiis-button>
              <openiis-button
                type="danger"
                [text]="'button.danger' | translate"
                size="md"
                (clickEvent)="onButtonClick('danger')"
              >
              </openiis-button>
              <openiis-button
                type="success"
                [text]="'button.success' | translate"
                size="md"
                (clickEvent)="onButtonClick('success')"
              >
              </openiis-button>
              <openiis-button
                type="warning"
                [text]="'button.warning' | translate"
                size="md"
                (clickEvent)="onButtonClick('warning')"
              >
              </openiis-button>
            </div>
          </div>

          <div class="demo-item">
            <h4>{{ 'button.botones_outline' | translate }}</h4>
            <div class="button-group">
              <openiis-button
                type="outline-primary"
                [text]="'button.outline_primary' | translate"
                size="md"
                (clickEvent)="onButtonClick('outline-primary')"
              >
              </openiis-button>
              <openiis-button
                type="outline-secondary"
                [text]="'button.outline_secondary' | translate"
                size="md"
                (clickEvent)="onButtonClick('outline-secondary')"
              >
              </openiis-button>
              <openiis-button
                type="outline-danger"
                [text]="'button.outline_danger' | translate"
                size="md"
                (clickEvent)="onButtonClick('outline-danger')"
              >
              </openiis-button>
            </div>
          </div>

          <div class="demo-item">
            <h4>{{ 'button.botones_especiales' | translate }}</h4>
            <div class="button-group">
              <openiis-button
                type="ghost"
                [text]="'button.ghost' | translate"
                size="md"
                (clickEvent)="onButtonClick('ghost')"
              >
              </openiis-button>
              <openiis-button
                type="text"
                [text]="'button.text_button' | translate"
                size="md"
                (clickEvent)="onButtonClick('text')"
              >
              </openiis-button>
              <openiis-button
                type="subtle"
                [text]="'button.subtle' | translate"
                size="md"
                (clickEvent)="onButtonClick('subtle')"
              >
              </openiis-button>
              <openiis-button
                type="link"
                [text]="'button.link_button' | translate"
                size="md"
                (clickEvent)="onButtonClick('link')"
              >
              </openiis-button>
            </div>
          </div>
        </div>
      </div>

      <div class="demo-subsection">
        <h3>{{ 'button.tamaños_de_botones' | translate }}</h3>
        <div class="demo-grid">
          <div class="demo-item">
            <h4>{{ 'button.todos_los_tamaños' | translate }}</h4>
            <div class="button-group">
              <openiis-button
                type="primary"
                [text]="'button.xs' | translate"
                size="xs"
                (clickEvent)="onButtonClick('xs')"
              >
              </openiis-button>
              <openiis-button
                type="primary"
                [text]="'button.small' | translate"
                size="sm"
                (clickEvent)="onButtonClick('sm')"
              >
              </openiis-button>
              <openiis-button
                type="primary"
                [text]="'button.medium' | translate"
                size="md"
                (clickEvent)="onButtonClick('md')"
              >
              </openiis-button>
              <openiis-button
                type="primary"
                [text]="'button.large' | translate"
                size="lg"
                (clickEvent)="onButtonClick('lg')"
              >
              </openiis-button>
              <openiis-button
                type="primary"
                [text]="'button.extra_large' | translate"
                size="xl"
                (clickEvent)="onButtonClick('xl')"
              >
              </openiis-button>
            </div>
          </div>
        </div>
      </div>

      <div class="demo-subsection">
        <h3>{{ 'button.botones_con_iconos' | translate }}</h3>
        <div class="demo-grid">
          <div class="demo-item">
            <h4>{{ 'button.iconos_izquierda' | translate }}</h4>
            <div class="button-group">
              <openiis-button
                type="primary"
                [text]="'button.agregar' | translate"
                iconLeft="add"
                tooltipText="{{ 'button.agregar' | translate }}"
                size="md"
                (clickEvent)="onButtonClick('add')"
              >
              </openiis-button>
              <openiis-button
                type="secondary"
                [text]="'button.editar' | translate"
                iconLeft="edit"
                tooltipText="{{ 'button.editar' | translate }}"
                size="md"
                (clickEvent)="onButtonClick('edit')"
              >
              </openiis-button>
              <openiis-button
                type="danger"
                [text]="'button.eliminar' | translate"
                iconLeft="delete"
                tooltipText="{{ 'button.eliminar' | translate }}"
                size="md"
                (clickEvent)="onButtonClick('delete')"
              >
              </openiis-button>
              <openiis-button
                type="success"
                [text]="'button.guardar' | translate"
                iconLeft="save"
                tooltipText="{{ 'button.guardar' | translate }}"
                size="md"
                (clickEvent)="onButtonClick('save')"
              >
              </openiis-button>
            </div>
          </div>

          <div class="demo-item">
            <h4>{{ 'button.iconos_derecha' | translate }}</h4>
            <div class="button-group">
              <openiis-button
                type="primary"
                [text]="'button.siguiente' | translate"
                iconRight="arrow_forward"
                size="md"
                (clickEvent)="onButtonClick('next')"
              >
              </openiis-button>
              <openiis-button
                type="secondary"
                [text]="'button.descargar' | translate"
                iconRight="download"
                size="md"
                (clickEvent)="onButtonClick('download')"
              >
              </openiis-button>
              <openiis-button
                type="outline-primary"
                [text]="'button.enviar' | translate"
                iconRight="send"
                size="md"
                (clickEvent)="onButtonClick('send')"
              >
              </openiis-button>
            </div>
          </div>

          <div class="demo-item">
            <h4>{{ 'button.botones_solo_icono' | translate }}</h4>
            <div class="button-group">
              <openiis-button
                type="icon"
                iconLeft="edit"
                size="xs"
                (clickEvent)="onButtonClick('icon-edit')"
              >
              </openiis-button>
              <openiis-button
                type="icon"
                iconLeft="delete"
                size="sm"
                (clickEvent)="onButtonClick('icon-delete')"
              >
              </openiis-button>
              <openiis-button
                type="icon"
                iconLeft="settings"
                size="md"
                (clickEvent)="onButtonClick('icon-settings')"
              >
              </openiis-button>
              <openiis-button
                type="icon"
                iconLeft="info"
                size="lg"
                (clickEvent)="onButtonClick('icon-info')"
              >
              </openiis-button>
              <openiis-button
                type="icon"
                iconLeft="info"
                size="xl"
                (clickEvent)="onButtonClick('icon-info')"
              >
              </openiis-button>
            </div>
          </div>
        </div>
      </div>

      <div class="demo-subsection">
        <h3>{{ 'button.estados_de_botones' | translate }}</h3>
        <div class="demo-grid">
          <div class="demo-item">
            <h4>{{ 'button.estados_especiales' | translate }}</h4>
            <div class="button-group">
              <openiis-button
                type="primary"
                [text]="'button.deshabilitado' | translate"
                size="md"
                [disabled]="true"
                (clickEvent)="onButtonClick('disabled')"
              >
              </openiis-button>
              <openiis-button
                type="primary"
                [text]="'button.cargando' | translate"
                size="md"
                [loading]="loadingButton"
                (clickEvent)="onButtonClick('loading1')"
              >
              </openiis-button>
              <openiis-button
                type="success"
                [text]="'button.cargar_datos' | translate"
                size="md"
                [loading]="loadingButton2"
                iconLeft="refresh"
                (clickEvent)="onButtonClick('loading2')"
              >
              </openiis-button>
            </div>
          </div>
        </div>
      </div>
    </section>

    <!-- Sección de Button Groups -->
    <section id="grouped-buttons" class="demo-section">
      <h2>{{ 'button.grupos_de_botones' | translate }}</h2>

      <div class="demo-subsection">
        <h3>{{ 'button.agrupaciones_de_botones' | translate }}</h3>
        <div class="demo-grid">
          <div class="demo-item">
            <h4>{{ 'button.grupo_básico' | translate }}</h4>
            <openiis-button-group>
              <openiis-button
                type="secondary"
                [text]="'button.izquierda' | translate"
                size="md"
                (clickEvent)="onButtonClick('left')"
              >
              </openiis-button>
              <openiis-button
                type="secondary"
                [text]="'button.centro' | translate"
                size="md"
                (clickEvent)="onButtonClick('center')"
              >
              </openiis-button>
              <openiis-button
                type="secondary"
                [text]="'button.derecha' | translate"
                size="md"
                (clickEvent)="onButtonClick('right')"
              >
              </openiis-button>
            </openiis-button-group>
          </div>

          <div class="demo-item">
            <h4>{{ 'button.grupo_con_iconos' | translate }}</h4>
            <openiis-button-group>
              <openiis-button
                type="outline-primary"
                iconLeft="format_bold"
                size="md"
                (clickEvent)="onButtonClick('bold')"
              >
              </openiis-button>
              <openiis-button
                type="outline-primary"
                iconLeft="format_italic"
                size="md"
                (clickEvent)="onButtonClick('italic')"
              >
              </openiis-button>
              <openiis-button
                type="outline-primary"
                iconLeft="format_underlined"
                size="md"
                (clickEvent)="onButtonClick('underline')"
              >
              </openiis-button>
            </openiis-button-group>
          </div>

          <div class="demo-item">
            <h4>{{ 'button.grupo_vertical' | translate }}</h4>
            <openiis-button-group orientation="vertical">
              <openiis-button
                type="primary"
                [text]="'button.arriba' | translate"
                size="md"
                (clickEvent)="onButtonClick('up')"
              >
              </openiis-button>
              <openiis-button
                type="primary"
                [text]="'button.medio' | translate"
                size="md"
                (clickEvent)="onButtonClick('middle')"
              >
              </openiis-button>
              <openiis-button
                type="primary"
                [text]="'button.abajo' | translate"
                size="md"
                (clickEvent)="onButtonClick('down')"
              >
              </openiis-button>
            </openiis-button-group>
          </div>

          <div class="demo-item">
            <h4>{{ 'button.grupo_separado' | translate }}</h4>
            <openiis-button-group [separated]="true">
              <openiis-button
                type="success"
                [text]="'button.guardar' | translate"
                iconLeft="save"
                size="md"
                (clickEvent)="onButtonClick('save')"
              >
              </openiis-button>
              <openiis-button
                type="warning"
                [text]="'button.editar' | translate"
                iconLeft="edit"
                size="md"
                (clickEvent)="onButtonClick('edit')"
              >
              </openiis-button>
              <openiis-button
                type="danger"
                [text]="'button.eliminar' | translate"
                iconLeft="delete"
                size="md"
                (clickEvent)="onButtonClick('delete')"
              >
              </openiis-button>
            </openiis-button-group>
          </div>
        </div>
      </div>
    </section>

    <!-- Sección de FAB -->
    <section id="floating-buttons" class="demo-section">
      <h2>{{ 'button.fab_botones_flotantes' | translate }}</h2>

      <div class="demo-subsection">
        <h3>{{ 'button.floating_action_buttons' | translate }}</h3>
        <div class="demo-grid">
          <div class="demo-item">
            <h4>{{ 'button.fab_básico' | translate }}</h4>
            <div
              style="
              position: relative;
              height: 120px;
              background: #f3f4f6;
              border-radius: 8px;
              display: flex;
              align-items: center;
              justify-content: center;
            "
            >
              <p style="color: #6b7280; margin: 0">
                {{ 'button.área_de_demostración' | translate }}
              </p>
              <openiis-fab
                icon="add"
                positioning="absolute"
                position="bottom-right"
                (fabClick)="onButtonClick('fab-add')"
              >
              </openiis-fab>
            </div>
          </div>

          <div class="demo-item">
            <h4>{{ 'button.fab_con_texto' | translate }}</h4>
            <div
              style="
              position: relative;
              height: 120px;
              background: #f3f4f6;
              border-radius: 8px;
              display: flex;
              align-items: center;
              justify-content: center;
            "
            >
              <p style="color: #6b7280; margin: 0">
                {{ 'button.área_de_demostración' | translate }}
              </p>
              <openiis-fab
                icon="edit"
                [text]="'button.editar' | translate"
                [extended]="true"
                variant="secondary"
                positioning="absolute"
                position="bottom-right"
                (fabClick)="onButtonClick('fab-edit')"
              >
              </openiis-fab>
            </div>
          </div>

          <div class="demo-item">
            <h4>{{ 'button.tamaños_de_fab' | translate }}</h4>
            <div
              style="
              display: flex;
              gap: 1rem;
              align-items: center;
              justify-content: center;
              padding: 1rem;
            "
            >
              <openiis-fab
                icon="favorite"
                size="sm"
                variant="danger"
                positioning="static"
                (fabClick)="onButtonClick('fab-sm')"
              >
              </openiis-fab>
              <openiis-fab
                icon="star"
                size="md"
                variant="warning"
                positioning="static"
                (fabClick)="onButtonClick('fab-md')"
              >
              </openiis-fab>
              <openiis-fab
                icon="share"
                size="lg"
                variant="success"
                positioning="static"
                (fabClick)="onButtonClick('fab-lg')"
              >
              </openiis-fab>
              <openiis-fab
                icon="download"
                size="xl"
                variant="info"
                positioning="static"
                (fabClick)="onButtonClick('fab-xl')"
              >
              </openiis-fab>
            </div>
          </div>

          <div class="demo-item">
            <h4>{{ 'button.fab_con_carga' | translate }}</h4>
            <div
              style="
              display: flex;
              gap: 1rem;
              align-items: center;
              justify-content: center;
              padding: 1rem;
            "
            >
              <openiis-fab
                icon="cloud_upload"
                positioning="static"
                [loading]="loadingButton"
                [autoHide]="false"
                (fabClick)="onButtonClick('fab-loading')"
              >
              </openiis-fab>
              <openiis-fab
                icon="send"
                [text]="'button.enviar' | translate"
                [extended]="true"
                variant="success"
                positioning="static"
                [loading]="loadingButton2"
                [autoHide]="false"
                (fabClick)="onButtonClick('fab-loading-extended')"
              >
              </openiis-fab>
            </div>
          </div>
        </div>
      </div>
    </section>
  `,
})
export class ButtonSecComponent {
  loadingButton = false;
  loadingButton2 = false;

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
}
