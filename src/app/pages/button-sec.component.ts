import { Component, EventEmitter, Input, Output } from '@angular/core';
import { CommonModule } from '@angular/common';
import { OpeniisButtonComponent } from '../components/buttons/button.component';
import { OpeniisButtonGroupComponent } from '../components';
import { OpeniisFabComponent } from '../components/fab/fab.component';

@Component({
  selector: 'app-button-sec',
  standalone: true,
  imports: [
    CommonModule,
    OpeniisButtonComponent,
    OpeniisButtonGroupComponent,
    OpeniisFabComponent,
  ],
  template: `
    <!-- Sección de Botones -->
    <section id="basic-buttons" class="demo-section">
      <h2>Botones</h2>

      <div class="demo-subsection">
        <h3>Tipos de Botones</h3>
        <div class="demo-grid">
          <div class="demo-item">
            <h4>Botones Principales</h4>
            <div class="button-group">
              <openiis-button
                type="primary"
                text="Primary"
                size="md"
                (clickEvent)="onButtonClick('primary')"
              >
              </openiis-button>
              <openiis-button
                type="secondary"
                text="Secondary"
                size="md"
                (clickEvent)="onButtonClick('secondary')"
              >
              </openiis-button>
              <openiis-button
                type="danger"
                text="Danger"
                size="md"
                (clickEvent)="onButtonClick('danger')"
              >
              </openiis-button>
              <openiis-button
                type="success"
                text="Success"
                size="md"
                (clickEvent)="onButtonClick('success')"
              >
              </openiis-button>
              <openiis-button
                type="warning"
                text="Warning"
                size="md"
                (clickEvent)="onButtonClick('warning')"
              >
              </openiis-button>
            </div>
          </div>

          <div class="demo-item">
            <h4>Botones Outline</h4>
            <div class="button-group">
              <openiis-button
                type="outline-primary"
                text="Outline Primary"
                size="md"
                (clickEvent)="onButtonClick('outline-primary')"
              >
              </openiis-button>
              <openiis-button
                type="outline-secondary"
                text="Outline Secondary"
                size="md"
                (clickEvent)="onButtonClick('outline-secondary')"
              >
              </openiis-button>
              <openiis-button
                type="outline-danger"
                text="Outline Danger"
                size="md"
                (clickEvent)="onButtonClick('outline-danger')"
              >
              </openiis-button>
            </div>
          </div>

          <div class="demo-item">
            <h4>Botones Especiales</h4>
            <div class="button-group">
              <openiis-button
                type="ghost"
                text="Ghost"
                size="md"
                (clickEvent)="onButtonClick('ghost')"
              >
              </openiis-button>
              <openiis-button
                type="text"
                text="Text Button"
                size="md"
                (clickEvent)="onButtonClick('text')"
              >
              </openiis-button>
              <openiis-button
                type="subtle"
                text="Subtle"
                size="md"
                (clickEvent)="onButtonClick('subtle')"
              >
              </openiis-button>
              <openiis-button
                type="link"
                text="Link Button"
                size="md"
                (clickEvent)="onButtonClick('link')"
              >
              </openiis-button>
            </div>
          </div>
        </div>
      </div>

      <div class="demo-subsection">
        <h3>Tamaños de Botones</h3>
        <div class="demo-grid">
          <div class="demo-item">
            <h4>Todos los Tamaños</h4>
            <div class="button-group">
              <openiis-button
                type="primary"
                text="XS"
                size="xs"
                (clickEvent)="onButtonClick('xs')"
              >
              </openiis-button>
              <openiis-button
                type="primary"
                text="Small"
                size="sm"
                (clickEvent)="onButtonClick('sm')"
              >
              </openiis-button>
              <openiis-button
                type="primary"
                text="Medium"
                size="md"
                (clickEvent)="onButtonClick('md')"
              >
              </openiis-button>
              <openiis-button
                type="primary"
                text="Large"
                size="lg"
                (clickEvent)="onButtonClick('lg')"
              >
              </openiis-button>
              <openiis-button
                type="primary"
                text="Extra Large"
                size="xl"
                (clickEvent)="onButtonClick('xl')"
              >
              </openiis-button>
            </div>
          </div>
        </div>
      </div>

      <div class="demo-subsection">
        <h3>Botones con Iconos</h3>
        <div class="demo-grid">
          <div class="demo-item">
            <h4>Iconos Izquierda</h4>
            <div class="button-group">
              <openiis-button
                type="primary"
                text="Agregar"
                iconLeft="add"
                size="md"
                (clickEvent)="onButtonClick('add')"
              >
              </openiis-button>
              <openiis-button
                type="secondary"
                text="Editar"
                iconLeft="edit"
                size="md"
                (clickEvent)="onButtonClick('edit')"
              >
              </openiis-button>
              <openiis-button
                type="danger"
                text="Eliminar"
                iconLeft="delete"
                size="md"
                (clickEvent)="onButtonClick('delete')"
              >
              </openiis-button>
              <openiis-button
                type="success"
                text="Guardar"
                iconLeft="save"
                size="md"
                (clickEvent)="onButtonClick('save')"
              >
              </openiis-button>
            </div>
          </div>

          <div class="demo-item">
            <h4>Iconos Derecha</h4>
            <div class="button-group">
              <openiis-button
                type="primary"
                text="Siguiente"
                iconRight="arrow_forward"
                size="md"
                (clickEvent)="onButtonClick('next')"
              >
              </openiis-button>
              <openiis-button
                type="secondary"
                text="Descargar"
                iconRight="download"
                size="md"
                (clickEvent)="onButtonClick('download')"
              >
              </openiis-button>
              <openiis-button
                type="outline-primary"
                text="Enviar"
                iconRight="send"
                size="md"
                (clickEvent)="onButtonClick('send')"
              >
              </openiis-button>
            </div>
          </div>

          <div class="demo-item">
            <h4>Botones Solo Icono</h4>
            <div class="button-group">
              <openiis-button
                type="icon"
                iconLeft="edit"
                size="xs"
                tooltipText="Editar elemento"
                (clickEvent)="onButtonClick('icon-edit')"
              >
              </openiis-button>
              <openiis-button
                type="icon"
                iconLeft="delete"
                size="sm"
                tooltipText="Eliminar elemento"
                (clickEvent)="onButtonClick('icon-delete')"
              >
              </openiis-button>
              <openiis-button
                type="icon"
                iconLeft="settings"
                size="md"
                tooltipText="Configuración"
                (clickEvent)="onButtonClick('icon-settings')"
              >
              </openiis-button>
              <openiis-button
                type="icon"
                iconLeft="info"
                size="lg"
                tooltipText="Información"
                (clickEvent)="onButtonClick('icon-info')"
              >
              </openiis-button>

              <openiis-button
                type="icon"
                iconLeft="info"
                size="xl"
                tooltipText="Información"
                (clickEvent)="onButtonClick('icon-info')"
              >
              </openiis-button>
            </div>
          </div>
        </div>
      </div>

      <div class="demo-subsection">
        <h3>Estados de Botones</h3>
        <div class="demo-grid">
          <div class="demo-item">
            <h4>Estados Especiales</h4>
            <div class="button-group">
              <openiis-button
                type="primary"
                text="Deshabilitado"
                size="md"
                [disabled]="true"
                (clickEvent)="onButtonClick('disabled')"
              >
              </openiis-button>
              <openiis-button
                type="primary"
                text="Cargando..."
                size="md"
                [loading]="loadingButton"
                (clickEvent)="onButtonClick('loading1')"
              >
              </openiis-button>
              <openiis-button
                type="success"
                text="Cargar Datos"
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
      <h2>Grupos de Botones</h2>

      <div class="demo-subsection">
        <h3>Agrupaciones de Botones</h3>
        <div class="demo-grid">
          <div class="demo-item">
            <h4>Grupo Básico</h4>
            <openiis-button-group>
              <openiis-button
                type="secondary"
                text="Izquierda"
                size="md"
                (clickEvent)="onButtonClick('left')"
              >
              </openiis-button>
              <openiis-button
                type="secondary"
                text="Centro"
                size="md"
                (clickEvent)="onButtonClick('center')"
              >
              </openiis-button>
              <openiis-button
                type="secondary"
                text="Derecha"
                size="md"
                (clickEvent)="onButtonClick('right')"
              >
              </openiis-button>
            </openiis-button-group>
          </div>

          <div class="demo-item">
            <h4>Grupo con Iconos</h4>
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
            <h4>Grupo Vertical</h4>
            <openiis-button-group orientation="vertical">
              <openiis-button
                type="primary"
                text="Arriba"
                size="md"
                (clickEvent)="onButtonClick('up')"
              >
              </openiis-button>
              <openiis-button
                type="primary"
                text="Medio"
                size="md"
                (clickEvent)="onButtonClick('middle')"
              >
              </openiis-button>
              <openiis-button
                type="primary"
                text="Abajo"
                size="md"
                (clickEvent)="onButtonClick('down')"
              >
              </openiis-button>
            </openiis-button-group>
          </div>

          <div class="demo-item">
            <h4>Grupo Separado</h4>
            <openiis-button-group [separated]="true">
              <openiis-button
                type="success"
                text="Guardar"
                iconLeft="save"
                size="md"
                (clickEvent)="onButtonClick('save')"
              >
              </openiis-button>
              <openiis-button
                type="warning"
                text="Editar"
                iconLeft="edit"
                size="md"
                (clickEvent)="onButtonClick('edit')"
              >
              </openiis-button>
              <openiis-button
                type="danger"
                text="Eliminar"
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
      <h2>FAB - Botones Flotantes</h2>

      <div class="demo-subsection">
        <h3>Floating Action Buttons</h3>
        <div class="demo-grid">
          <div class="demo-item">
            <h4>FAB Básico</h4>
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
              <p style="color: #6b7280; margin: 0">Área de demostración</p>
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
            <h4>FAB con Texto</h4>
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
              <p style="color: #6b7280; margin: 0">Área de demostración</p>
              <openiis-fab
                icon="edit"
                text="Editar"
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
            <h4>Tamaños de FAB</h4>
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
            <h4>FAB con Carga</h4>
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
                text="Enviar"
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
