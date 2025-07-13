import { Component, EventEmitter, Input, Output } from '@angular/core';
import { CommonModule } from '@angular/common';
import { OpeniisButtonComponent } from '../components/buttons/button.component';
import { OpeniisButtonGroupComponent } from '../components';

@Component({
  selector: 'app-button-sec',
  standalone: true,
  imports: [CommonModule, OpeniisButtonComponent, OpeniisButtonGroupComponent],
  template: `
    <!-- Sección de Botones -->
    <section class="demo-section">
      <h2>Botones - Todas las Variantes</h2>

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
    <section class="demo-section">
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
  `,
})
export class ButtonSecComponent {
  @Input() loadingButton = false;
  @Input() loadingButton2 = false;
  @Output() buttonClick = new EventEmitter<string>();

  onButtonClick(type: string): void {
    this.buttonClick.emit(type);
  }
}
