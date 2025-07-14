import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import {
  CardButton,
  OpeniisCardComponent,
} from '../components/card/card.component';
import { OpeniisButtonComponent } from '../components/buttons/button.component';

@Component({
  selector: 'app-card-sec',
  standalone: true,
  imports: [CommonModule, OpeniisCardComponent, OpeniisButtonComponent],
  template: `
    <!-- Sección de Tarjetas -->
    <section id="basic-cards" class="demo-section">
      <h2>Tarjetas</h2>

      <div class="demo-subsection">
        <h3>Tipos de Tarjetas</h3>
        <div class="demo-grid">
          <div class="demo-item">
            <h4>Tarjeta Básica</h4>
            <openiis-card
              title="Título de la Tarjeta"
              subtitle="Subtítulo descriptivo"
              description="Esta es una descripción del contenido de la tarjeta. Aquí se puede incluir información relevante."
            >
              <div slot="footer">
                <openiis-button
                  type="primary"
                  text="Acción"
                  size="sm"
                ></openiis-button>
              </div>
            </openiis-card>
          </div>

          <div class="demo-item">
            <h4>Tarjeta con Imagen</h4>
            <openiis-card
              title="Tarjeta con Media"
              description="Tarjeta que incluye contenido multimedia en el header."
            >
              <img
                slot="media"
                src="https://images.unsplash.com/photo-1506744038136-46273834b3fb?w=300&h=200&fit=crop"
                alt="Imagen demo"
                style="width: 100%; height: 200px; object-fit: cover"
              />
            </openiis-card>
          </div>

          <div class="demo-item">
            <h4>Tamaños de Tarjetas</h4>
            <openiis-card
              size="sm"
              title="Tarjetas Pequeña"
              description="Tarjeta con tamaño reducido."
            >
            </openiis-card>
          </div>
        </div>
      </div>

      <div class="demo-subsection">
        <h3>Tarjetas con Botones de Acción</h3>
        <div class="demo-grid">
          <div class="demo-item">
            <h4>Tarjetas con Botones Básicos</h4>
            <openiis-card
              title="Producto Digital"
              description="Un producto digital con opciones de gestión básicas."
              [actionButtons]="cardActionButtons"
              (actionButtonClick)="onCardActionButtonClick($event)"
            >
            </openiis-card>
          </div>

          <div class="demo-item">
            <h4>Tarjetas de Producto</h4>
            <openiis-card
              title="Smartphone Pro"
              subtitle="Modelo 2024"
              description="El último smartphone con características premium y diseño elegante."
              [actionButtons]="productCardButtons"
              (actionButtonClick)="onCardActionButtonClick($event)"
            >
              <img
                slot="media"
                src="https://images.unsplash.com/photo-1598327105666-5b89351aff97?w=300&h=200&fit=crop"
                alt="Imagen demo"
                style="width: 100%; height: 200px; object-fit: cover"
              />
            </openiis-card>
          </div>

          <div class="demo-item">
            <h4>Tarjetas de Usuario</h4>
            <openiis-card
              title="Ana García"
              subtitle="Desarrolladora Frontend"
              description="Especialista en Angular y React con 5 años de experiencia."
              [actionButtons]="userCardButtons"
              (actionButtonClick)="onCardActionButtonClick($event)"
            >
              <img
                slot="media"
                src="https://images.unsplash.com/photo-1498050108023-c5249f4df085?w=300&h=200&fit=crop"
                alt="Imagen demo"
                style="width: 100%; height: 200px; object-fit: cover"
              />
            </openiis-card>
          </div>

          <div class="demo-item">
            <h4>Tarjetas con Imagen y Botones</h4>
            <openiis-card
              title="Dashboard Analytics"
              description="Visualiza métricas importantes de tu negocio en tiempo real."
              [actionButtons]="[
                {
                  id: 'refresh',
                  icon: 'refresh',
                  tooltip: 'Actualizar datos',
                  variant: 'outline-primary',
                  ariaLabel: 'Actualizar datos'
                },
                {
                  id: 'settings',
                  icon: 'settings',
                  tooltip: 'Configurar',
                  variant: 'outline-secondary',
                  ariaLabel: 'Configurar dashboard'
                },
                {
                  id: 'download',
                  icon: 'download',
                  tooltip: 'Descargar reporte',
                  variant: 'outline-success',
                  ariaLabel: 'Descargar reporte'
                }
              ]"
              (actionButtonClick)="onCardActionButtonClick($event)"
            >
              <img
                slot="media"
                src="https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=300&h=200&fit=crop"
                alt="Imagen demo"
                style="width: 100%; height: 200px; object-fit: cover"
              />
            </openiis-card>
          </div>
        </div>
      </div>

      <div id="card-sizes" class="demo-subsection">
        <h3>Tamaños de Tarjetas con Botones</h3>
        <div class="demo-grid">
          <div class="demo-item">
            <h4>Tarjeta Extra Small</h4>
            <openiis-card
              size="xs"
              title="XS Tarjeta"
              description="Tarjeta pequeña con botones."
              [actionButtons]="[
                {
                  id: 'edit-xs',
                  icon: 'edit',
                  tooltip: 'Editar',
                  variant: 'outline-primary',
                  ariaLabel: 'Editar elemento'
                },
                {
                  id: 'delete-xs',
                  icon: 'delete',
                  tooltip: 'Eliminar',
                  variant: 'outline-danger',
                  ariaLabel: 'Eliminar elemento'
                }
              ]"
              actionButtonSize="xs"
              (actionButtonClick)="onCardActionButtonClick($event)"
            >
            </openiis-card>
          </div>

          <div class="demo-item">
            <h4>Tarjetas Small</h4>
            <openiis-card
              size="sm"
              title="Small Tarjeta"
              description="Tarjeta pequeña con botones de tamaño pequeño."
              [actionButtons]="[
                {
                  id: 'like-sm',
                  icon: 'thumb_up',
                  tooltip: 'Me gusta',
                  variant: 'outline-success',
                  ariaLabel: 'Me gusta'
                },
                {
                  id: 'share-sm',
                  icon: 'share',
                  tooltip: 'Compartir',
                  variant: 'outline-secondary',
                  ariaLabel: 'Compartir'
                }
              ]"
              actionButtonSize="sm"
              (actionButtonClick)="onCardActionButtonClick($event)"
            >
            </openiis-card>
          </div>

          <div class="demo-item">
            <h4>Tarjetas Large</h4>
            <openiis-card
              size="lg"
              title="Large Tarjeta"
              description="Tarjeta grande con botones de tamaño mediano."
              [actionButtons]="[
                {
                  id: 'bookmark-lg',
                  icon: 'bookmark',
                  tooltip: 'Marcar',
                  variant: 'outline-warning',
                  ariaLabel: 'Marcar'
                },
                {
                  id: 'print-lg',
                  icon: 'print',
                  tooltip: 'Imprimir',
                  variant: 'outline-info',
                  ariaLabel: 'Imprimir'
                },
                {
                  id: 'more-lg',
                  icon: 'more_horiz',
                  tooltip: 'Más opciones',
                  variant: 'outline-secondary',
                  ariaLabel: 'Más opciones'
                }
              ]"
              actionButtonSize="md"
              (actionButtonClick)="onCardActionButtonClick($event)"
            >
            </openiis-card>
          </div>
        </div>
      </div>

      <div class="demo-subsection">
        <h3>Tarjetas con Footer y Botones</h3>
        <div class="demo-grid">
          <div class="demo-item">
            <h4>Tarjetas Completa</h4>
            <openiis-card
              title="Artículo de Blog"
              subtitle="Publicado el 15 de Marzo 2024"
              description="Un artículo completo sobre las mejores prácticas en desarrollo web moderno."
              [actionButtons]="[
                {
                  id: 'read-more',
                  icon: 'arrow_forward',
                  tooltip: 'Leer más',
                  variant: 'outline-primary',
                  ariaLabel: 'Leer más'
                },
                {
                  id: 'bookmark-article',
                  icon: 'bookmark_border',
                  tooltip: 'Guardar artículo',
                  variant: 'outline-warning',
                  ariaLabel: 'Guardar artículo'
                },
                {
                  id: 'share-article',
                  icon: 'share',
                  tooltip: 'Compartir artículo',
                  variant: 'outline-secondary',
                  ariaLabel: 'Compartir artículo'
                }
              ]"
              (actionButtonClick)="onCardActionButtonClick($event)"
            >
              <img
                slot="media"
                src="https://images.unsplash.com/photo-1511707171634-5f897ff02aa9?w=300&h=200&fit=crop"
                alt="Imagen demo"
                style="width: 100%; height: 200px; object-fit: cover"
              />
              <div slot="footer">
                <openiis-button
                  type="primary"
                  text="Leer Completo"
                  size="sm"
                  iconLeft="visibility"
                  (clickEvent)="onButtonClick('read-full')"
                >
                </openiis-button>
              </div>
            </openiis-card>
          </div>

          <div class="demo-item">
            <h4>Tarjetas de Evento</h4>
            <openiis-card
              title="Conferencia Tech 2024"
              subtitle="Centro de Convenciones"
              description="Únete a la conferencia más importante de tecnología del año."
              [actionButtons]="[
                {
                  id: 'calendar',
                  icon: 'event',
                  tooltip: 'Añadir al calendario',
                  variant: 'outline-success',
                  ariaLabel: 'Añadir al calendario'
                },
                {
                  id: 'location',
                  icon: 'location_on',
                  tooltip: 'Ver ubicación',
                  variant: 'outline-info',
                  ariaLabel: 'Ver ubicación'
                },
                {
                  id: 'remind',
                  icon: 'notifications',
                  tooltip: 'Recordatorio',
                  variant: 'outline-warning',
                  ariaLabel: 'Activar recordatorio'
                }
              ]"
              (actionButtonClick)="onCardActionButtonClick($event)"
            >
              <img
                slot="media"
                src="https://images.unsplash.com/photo-1475721027785-f74eccf877e2?w=300&h=200&fit=crop"
                alt="Imagen demo"
                style="width: 100%; height: 200px; object-fit: cover"
              />
              <div slot="footer">
                <openiis-button
                  type="success"
                  text="Registrarse"
                  size="sm"
                  iconLeft="person_add"
                  (clickEvent)="onButtonClick('register')"
                >
                </openiis-button>
              </div>
            </openiis-card>
          </div>
        </div>
      </div>
    </section>
  `,
})
export class CardSecComponent {
  /* ===== CARD SECTION ===== */
  cardActionButtons: CardButton[] = [
    {
      id: 'edit',
      icon: 'edit',
      tooltip: 'Editar',
      variant: 'outline-primary',
      ariaLabel: 'Editar elemento',
    },
    {
      id: 'share',
      icon: 'share',
      tooltip: 'Compartir',
      variant: 'outline-secondary',
      ariaLabel: 'Compartir elemento',
    },
    {
      id: 'delete',
      icon: 'delete',
      tooltip: 'Eliminar',
      variant: 'outline-danger',
      ariaLabel: 'Eliminar elemento',
    },
  ];

  productCardButtons: CardButton[] = [
    {
      id: 'favorite',
      icon: 'favorite',
      tooltip: 'Agregar a favoritos',
      variant: 'outline-danger',
      ariaLabel: 'Agregar a favoritos',
    },
    {
      id: 'cart',
      icon: 'shopping_cart',
      tooltip: 'Agregar al carrito',
      variant: 'outline-success',
      ariaLabel: 'Agregar al carrito',
    },
    {
      id: 'view',
      icon: 'visibility',
      tooltip: 'Ver detalles',
      variant: 'outline-primary',
      ariaLabel: 'Ver detalles',
    },
  ];

  userCardButtons: CardButton[] = [
    {
      id: 'message',
      icon: 'message',
      tooltip: 'Enviar mensaje',
      variant: 'outline-primary',
      ariaLabel: 'Enviar mensaje',
    },
    {
      id: 'call',
      icon: 'phone',
      tooltip: 'Llamar',
      variant: 'outline-success',
      ariaLabel: 'Llamar',
    },
    {
      id: 'more',
      icon: 'more_vert',
      tooltip: 'Más opciones',
      variant: 'outline-secondary',
      ariaLabel: 'Más opciones',
    },
  ];

  /* ===== CARD METHODS ===== */
  showConfirmModal = false;
  currentModalType = '';

  showConfirm(type: string): void {
    this.currentModalType = type;
    this.showConfirmModal = true;
  }

  onCardActionButtonClick(event: {
    buttonId: string;
    event: MouseEvent;
  }): void {
    console.log(`Botón de tarjeta ${event.buttonId} clickeado`);

    switch (event.buttonId) {
      case 'edit':
        this.showToastMessage('info');
        break;
      case 'share':
        this.showToastMessage('success');
        break;
      case 'delete':
        this.showConfirm('delete');
        break;
      case 'favorite':
        this.showToastMessage('warning');
        break;
      case 'cart':
        this.showToastMessage('success');
        break;
      case 'view':
        this.showToastMessage('info');
        break;
      case 'message':
        this.showToastMessage('info');
        break;
      case 'call':
        this.showToastMessage('success');
        break;
      case 'more':
        this.showToastMessage('info');
        break;
      default:
        console.log('Acción no reconocida');
    }
  }

  /* ===== TOAST METHODS ===== */
  showSuccessToast = false;
  showWarningToast = false;
  showDangerToast = false;
  showInfoToast = false;

  showToastMessage(type: string): void {
    switch (type) {
      case 'success':
        this.showSuccessToast = true;
        break;
      case 'warning':
        this.showWarningToast = true;
        break;
      case 'danger':
        this.showDangerToast = true;
        break;
      case 'info':
        this.showInfoToast = true;
        break;
    }
  }

  onToastClosed(type: string): void {
    switch (type) {
      case 'success':
        this.showSuccessToast = false;
        break;
      case 'warning':
        this.showWarningToast = false;
        break;
      case 'danger':
        this.showDangerToast = false;
        break;
      case 'info':
        this.showInfoToast = false;
        break;
    }
    console.log(`Toast ${type} cerrado`);
  }

  /* ===== BUTTON METHODS ===== */
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
