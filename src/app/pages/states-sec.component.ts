import { Component, EventEmitter, Output } from '@angular/core';
import { CommonModule } from '@angular/common';
import { OpeniisEmptyStateComponent } from '../components/empty-state/empty-state.component';

@Component({
  selector: 'app-states-sec',
  standalone: true,
  imports: [CommonModule, OpeniisEmptyStateComponent],
  template: `
    <!-- Sección de Estados -->
    <section class="demo-section">
      <h2>Estados</h2>

      <div class="demo-subsection">
        <h3>Estados Vacíos</h3>
        <div class="demo-grid">
          <div class="demo-item">
            <h4>Estado Vacío General</h4>
            <openiis-empty-state
              icon="inbox"
              title="No hay elementos"
              message="No se encontraron elementos para mostrar. Agrega algunos elementos para empezar."
              buttonText="Agregar Elemento"
              buttonType="primary"
              buttonIcon="add"
              (buttonClick)="onEmptyStateButtonClick()"
            >
            </openiis-empty-state>
          </div>

          <div class="demo-item">
            <h4>Estado de Búsqueda Vacía</h4>
            <openiis-empty-state
              icon="search"
              title="Sin resultados"
              message="No se encontraron resultados para tu búsqueda. Intenta con otros términos."
              buttonText="Nueva Búsqueda"
              buttonType="secondary"
              buttonIcon="refresh"
              (buttonClick)="onEmptyStateSearch()"
            >
            </openiis-empty-state>
          </div>

          <div class="demo-item">
            <h4>Estado de Error</h4>
            <openiis-empty-state
              icon="error"
              title="Error de conexión"
              message="No se pudo cargar el contenido. Verifica tu conexión a internet."
              buttonText="Reintentar"
              buttonType="danger"
              buttonIcon="refresh"
              (buttonClick)="onEmptyStateError()"
            >
            </openiis-empty-state>
          </div>

          <div class="demo-item">
            <h4>Estado de Carga</h4>
            <openiis-empty-state
              icon="hourglass_empty"
              title="Cargando..."
              message="Estamos preparando el contenido para ti. Esto solo tomará un momento."
              buttonText="Cancelar"
              buttonType="outline-secondary"
              buttonIcon="close"
            >
            </openiis-empty-state>
          </div>
        </div>
      </div>

      <div class="demo-subsection">
        <h3>Estados Específicos</h3>
        <div class="demo-grid">
          <div class="demo-item">
            <h4>Lista de Productos Vacía</h4>
            <openiis-empty-state
              icon="shopping_cart"
              title="Carrito vacío"
              message="Tu carrito de compras está vacío. Explora nuestros productos y agrega algunos."
              buttonText="Ver Productos"
              buttonType="primary"
              buttonIcon="storefront"
              [buttonFullWidth]="true"
            >
            </openiis-empty-state>
          </div>

          <div class="demo-item">
            <h4>Mensajes Vacíos</h4>
            <openiis-empty-state
              icon="mail"
              title="Sin mensajes"
              message="No tienes mensajes nuevos. Te notificaremos cuando recibas algo."
              buttonText="Escribir Mensaje"
              buttonType="success"
              buttonIcon="edit"
              [buttonResponsive]="true"
            >
            </openiis-empty-state>
          </div>

          <div class="demo-item">
            <h4>Configuración Pendiente</h4>
            <openiis-empty-state
              icon="settings"
              title="Configuración requerida"
              message="Necesitas completar la configuración inicial antes de continuar."
              buttonText="Configurar Ahora"
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
