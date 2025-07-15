import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { OpeniisCardComponent } from '../components/card/card.component';
import { OpeniisButtonComponent } from '../components/buttons/button.component';
import { TranslateModule, TranslateService } from '@ngx-translate/core';
import { OpeniisToastComponent } from '../components';

@Component({
  selector: 'app-card-sec',
  standalone: true,
  imports: [
    CommonModule,
    OpeniisCardComponent,
    OpeniisButtonComponent,
    TranslateModule,
    OpeniisToastComponent,
  ],
  template: `
    <!-- Sección de Tarjetas -->
    <openiis-toast
      [isVisible]="showInfoToast"
      [data]="infoToastData()"
      (closed)="onToastClosed('info')"
    ></openiis-toast>
    <openiis-toast
      [isVisible]="showSuccessToast"
      [data]="successToastData()"
      (closed)="onToastClosed('success')"
    ></openiis-toast>
    <openiis-toast
      [isVisible]="showWarningToast"
      [data]="warningToastData()"
      (closed)="onToastClosed('warning')"
    ></openiis-toast>
    <openiis-toast
      [isVisible]="showDangerToast"
      [data]="dangerToastData()"
      (closed)="onToastClosed('danger')"
    ></openiis-toast>
    <section id="basic-cards" class="demo-section">
      <h2>{{ 'card.tarjetas' | translate }}</h2>

      <div class="demo-subsection">
        <h3>{{ 'card.tipos_de_tarjetas' | translate }}</h3>
        <div class="demo-grid">
          <div class="demo-item">
            <h4>{{ 'card.tarjeta_básica' | translate }}</h4>
            <openiis-card
              [title]="'card.título_de_la_tarjeta' | translate"
              [subtitle]="'card.subtítulo_tarjeta_básica' | translate"
              [description]="'card.descripción_tarjeta_básica' | translate"
            >
              <div slot="footer">
                <openiis-button
                  type="primary"
                  [text]="'card.acción' | translate"
                  size="sm"
                  (clickEvent)="showToastMessage('success')"
                ></openiis-button>
              </div>
            </openiis-card>
          </div>

          <div class="demo-item">
            <h4>{{ 'card.tarjeta_con_imagen' | translate }}</h4>
            <openiis-card
              [title]="'card.tarjeta_con_media' | translate"
              [description]="'card.descripción_tarjeta_media' | translate"
            >
              <img
                slot="media"
                src="https://images.unsplash.com/photo-1506744038136-46273834b3fb?w=300&h=200&fit=crop"
                [alt]="'card.imagen_demo' | translate"
                style="width: 100%; height: 200px; object-fit: cover"
              />
            </openiis-card>
          </div>

          <div class="demo-item">
            <h4>{{ 'card.tamaños_de_tarjetas' | translate }}</h4>
            <openiis-card
              size="sm"
              [title]="'card.tarjetas_pequeña' | translate"
              [description]="'card.descripción_tarjeta_pequeña' | translate"
            >
            </openiis-card>
          </div>
        </div>
      </div>

      <div class="demo-subsection">
        <h3>{{ 'card.tarjetas_con_botones_de_acción' | translate }}</h3>
        <div class="demo-grid">
          <div class="demo-item">
            <h4>{{ 'card.tarjetas_con_botones_básicos' | translate }}</h4>
            <openiis-card
              [title]="'card.producto_digital' | translate"
              [description]="'card.descripción_producto_digital' | translate"
              [actionButtons]="buildCardActionButtons()"
              (actionButtonClick)="onCardActionButtonClick($event)"
            >
            </openiis-card>
          </div>

          <div class="demo-item">
            <h4>{{ 'card.tarjetas_de_producto' | translate }}</h4>
            <openiis-card
              [title]="'card.smartphone_pro' | translate"
              [subtitle]="'card.subtítulo_smartphone' | translate"
              [description]="'card.descripción_smartphone' | translate"
              [actionButtons]="buildProductCardButtons()"
              (actionButtonClick)="onCardActionButtonClick($event)"
            >
              <img
                slot="media"
                src="https://images.unsplash.com/photo-1598327105666-5b89351aff97?w=300&h=200&fit=crop"
                [alt]="'card.imagen_demo' | translate"
                style="width: 100%; height: 200px; object-fit: cover"
              />
            </openiis-card>
          </div>

          <div class="demo-item">
            <h4>{{ 'card.tarjetas_de_usuario' | translate }}</h4>
            <openiis-card
              [title]="'card.ana_garcía' | translate"
              [subtitle]="'card.subtítulo_usuario' | translate"
              [description]="'card.descripción_usuario' | translate"
              [actionButtons]="buildUserCardButtons()"
              (actionButtonClick)="onCardActionButtonClick($event)"
            >
              <img
                slot="media"
                src="https://images.unsplash.com/photo-1498050108023-c5249f4df085?w=300&h=200&fit=crop"
                [alt]="'card.imagen_demo' | translate"
                style="width: 100%; height: 200px; object-fit: cover"
              />
            </openiis-card>
          </div>

          <div class="demo-item">
            <h4>{{ 'card.tarjetas_con_imagen_y_botones' | translate }}</h4>
            <openiis-card
              [title]="'card.dashboard_analytics' | translate"
              [description]="'card.descripción_dashboard' | translate"
              [actionButtons]="[
                {
                  id: 'refresh',
                  icon: 'refresh',
                  tooltip: 'card.actualizar_datos' | translate,
                  variant: 'outline-primary',
                  ariaLabel: 'card.actualizar_datos' | translate
                },
                {
                  id: 'settings',
                  icon: 'settings',
                  tooltip: 'card.configurar' | translate,
                  variant: 'outline-secondary',
                  ariaLabel: 'card.configurar_dashboard' | translate
                },
                {
                  id: 'download',
                  icon: 'download',
                  tooltip: 'card.descargar_reporte' | translate,
                  variant: 'outline-success',
                  ariaLabel: 'card.descargar_reporte' | translate
                }
              ]"
              (actionButtonClick)="onCardActionButtonClick($event)"
            >
              <img
                slot="media"
                src="https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=300&h=200&fit=crop"
                [alt]="'card.imagen_demo' | translate"
                style="width: 100%; height: 200px; object-fit: cover"
              />
            </openiis-card>
          </div>
        </div>
      </div>

      <div id="card-sizes" class="demo-subsection">
        <h3>{{ 'card.tamaños_de_tarjetas_con_botones' | translate }}</h3>
        <div class="demo-grid">
          <div class="demo-item">
            <h4>{{ 'card.tarjeta_extra_small' | translate }}</h4>
            <openiis-card
              size="xs"
              [title]="'card.xs_tarjeta' | translate"
              [description]="'card.descripción_xs' | translate"
              [actionButtons]="[
                {
                  id: 'edit-xs',
                  icon: 'edit',
                  tooltip: 'card.editar' | translate,
                  variant: 'outline-primary',
                  ariaLabel: 'card.editar_elemento' | translate
                },
                {
                  id: 'delete-xs',
                  icon: 'delete',
                  tooltip: 'card.eliminar' | translate,
                  variant: 'outline-danger',
                  ariaLabel: 'card.eliminar_elemento' | translate
                }
              ]"
              actionButtonSize="xs"
              (actionButtonClick)="onCardActionButtonClick($event)"
            >
            </openiis-card>
          </div>

          <div class="demo-item">
            <h4>{{ 'card.tarjetas_small' | translate }}</h4>
            <openiis-card
              size="sm"
              [title]="'card.small_tarjeta' | translate"
              [description]="'card.descripción_small' | translate"
              [actionButtons]="[
                {
                  id: 'like-sm',
                  icon: 'thumb_up',
                  tooltip: 'card.me_gusta' | translate,
                  variant: 'outline-success',
                  ariaLabel: 'card.me_gusta' | translate
                },
                {
                  id: 'share-sm',
                  icon: 'share',
                  tooltip: 'card.compartir' | translate,
                  variant: 'outline-secondary',
                  ariaLabel: 'card.compartir' | translate
                }
              ]"
              actionButtonSize="sm"
              (actionButtonClick)="onCardActionButtonClick($event)"
            >
            </openiis-card>
          </div>

          <div class="demo-item">
            <h4>{{ 'card.tarjetas_large' | translate }}</h4>
            <openiis-card
              size="lg"
              [title]="'card.large_tarjeta' | translate"
              [description]="'card.descripción_large' | translate"
              [actionButtons]="[
                {
                  id: 'bookmark-lg',
                  icon: 'bookmark',
                  tooltip: 'card.agregar_favoritos' | translate,
                  variant: 'outline-warning',
                  ariaLabel: 'card.agregar_favoritos' | translate
                },
                {
                  id: 'print-lg',
                  icon: 'print',
                  tooltip: 'card.imprimir' | translate,
                  variant: 'outline-info',
                  ariaLabel: 'card.imprimir' | translate
                },
                {
                  id: 'more-lg',
                  icon: 'more_horiz',
                  tooltip: 'card.más_opciones' | translate,
                  variant: 'outline-secondary',
                  ariaLabel: 'card.más_opciones' | translate
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
        <h3>{{ 'card.tarjetas_con_footer_y_botones' | translate }}</h3>
        <div class="demo-grid">
          <div class="demo-item">
            <h4>{{ 'card.tarjetas_completa' | translate }}</h4>
            <openiis-card
              [title]="'card.artículo_de_blog' | translate"
              [subtitle]="'card.subtítulo_blog' | translate"
              [description]="'card.descripción_blog' | translate"
              [actionButtons]="[
                {
                  id: 'read-more',
                  icon: 'arrow_forward',
                  tooltip: 'card.leer_más' | translate,
                  variant: 'outline-primary',
                  ariaLabel: 'card.leer_más' | translate
                },
                {
                  id: 'bookmark-article',
                  icon: 'bookmark_border',
                  tooltip: 'card.guardar_artículo' | translate,
                  variant: 'outline-warning',
                  ariaLabel: 'card.guardar_artículo' | translate
                },
                {
                  id: 'share-article',
                  icon: 'share',
                  tooltip: 'card.compartir_artículo' | translate,
                  variant: 'outline-secondary',
                  ariaLabel: 'card.compartir_artículo' | translate
                }
              ]"
              (actionButtonClick)="onCardActionButtonClick($event)"
            >
              <img
                slot="media"
                src="https://images.unsplash.com/photo-1511707171634-5f897ff02aa9?w=300&h=200&fit=crop"
                [alt]="'card.imagen_demo' | translate"
                style="width: 100%; height: 200px; object-fit: cover"
              />
              <div slot="footer">
                <openiis-button
                  type="primary"
                  [text]="'card.leer_completo' | translate"
                  size="sm"
                  iconLeft="visibility"
                  (clickEvent)="showToastMessage('info')"
                >
                </openiis-button>
              </div>
            </openiis-card>
          </div>

          <div class="demo-item">
            <h4>{{ 'card.tarjetas_de_evento' | translate }}</h4>
            <openiis-card
              [title]="'card.conferencia_tech_2024' | translate"
              [subtitle]="'card.subtítulo_conferencia' | translate"
              [description]="'card.descripción_conferencia' | translate"
              [actionButtons]="[
                {
                  id: 'calendar',
                  icon: 'event',
                  tooltip: 'card.añadir_calendario' | translate,
                  variant: 'outline-success',
                  ariaLabel: 'card.añadir_calendario' | translate
                },
                {
                  id: 'location',
                  icon: 'location_on',
                  tooltip: 'card.ver_ubicación' | translate,
                  variant: 'outline-info',
                  ariaLabel: 'card.ver_ubicación' | translate
                },
                {
                  id: 'remind',
                  icon: 'notifications',
                  tooltip: 'card.activar_recordatorio' | translate,
                  variant: 'outline-warning',
                  ariaLabel: 'card.activar_recordatorio' | translate
                }
              ]"
              (actionButtonClick)="onCardActionButtonClick($event)"
            >
              <img
                slot="media"
                src="https://images.unsplash.com/photo-1475721027785-f74eccf877e2?w=300&h=200&fit=crop"
                [alt]="'card.imagen_demo' | translate"
                style="width: 100%; height: 200px; object-fit: cover"
              />
              <div slot="footer">
                <openiis-button
                  type="success"
                  [text]="'card.registrarse' | translate"
                  size="sm"
                  iconLeft="person_add"
                  (clickEvent)="showToastMessage('success')"
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
  constructor(private translate: TranslateService) {
    // Suscribirse a cambios de idioma
    this.translate.onLangChange.subscribe(() => {
      this.buildCardActionButtons();
      this.buildProductCardButtons();
      this.buildUserCardButtons();
    });

    this.buildCardActionButtons();
    this.buildProductCardButtons();
    this.buildUserCardButtons();
  }

  /* ===== CARD SECTION ===== */
  buildCardActionButtons(): any[] {
    return [
      {
        id: 'edit',
        icon: 'edit',
        tooltip: this.translate.instant('card.editar'),
        variant: 'outline-primary',
        ariaLabel: this.translate.instant('card.editar_elemento'),
      },
      {
        id: 'delete',
        icon: 'delete',
        tooltip: this.translate.instant('card.eliminar'),
        variant: 'outline-danger',
        ariaLabel: this.translate.instant('card.eliminar_elemento'),
      },
    ];
  }

  buildProductCardButtons(): any[] {
    return [
      {
        id: 'cart',
        icon: 'shopping_cart',
        tooltip: this.translate.instant('card.agregar_carrito'),
        variant: 'outline-success',
        ariaLabel: this.translate.instant('card.agregar_carrito'),
      },
      {
        id: 'favorite',
        icon: 'favorite_border',
        tooltip: this.translate.instant('card.agregar_favoritos'),
        variant: 'outline-warning',
        ariaLabel: this.translate.instant('card.agregar_favoritos'),
      },
    ];
  }

  buildUserCardButtons(): any[] {
    return [
      {
        id: 'message',
        icon: 'message',
        tooltip: this.translate.instant('card.enviar_mensaje'),
        variant: 'outline-primary',
        ariaLabel: this.translate.instant('card.enviar_mensaje'),
      },
      {
        id: 'call',
        icon: 'call',
        tooltip: this.translate.instant('card.llamar'),
        variant: 'outline-success',
        ariaLabel: this.translate.instant('card.llamar'),
      },
    ];
  }

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
      case 'read-more':
      case 'message':
      case 'more-lg':
      case 'location':
        this.showToastMessage('info');
        break;
      case 'share':
      case 'share-article':
      case 'cart':
      case 'call':
      case 'calendar':
        this.showToastMessage('success');
        break;
      case 'delete':
      case 'delete-xs':
        this.showToastMessage('danger');
        break;
      case 'favorite':
      case 'bookmark-article':
      case 'bookmark-lg':
      case 'remind':
        this.showToastMessage('warning');
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

  /* ===== TOAST SECTION ===== */

  successToastData(): any {
    return {
      message: this.translate.instant('notification.toast_de_éxito'),
      type: 'success' as const,
      duration: 3000,
    };
  }

  warningToastData(): any {
    return {
      message: this.translate.instant('notification.toast_de_advertencia'),
      type: 'warning' as const,
      duration: 3000,
    };
  }
  dangerToastData(): any {
    return {
      message: this.translate.instant('notification.toast_de_error'),
      type: 'danger' as const,
      duration: 3000,
    };
  }

  infoToastData(): any {
    return {
      message: this.translate.instant('notification.toast_de_información'),
      type: 'info' as const,
      duration: 3000,
    };
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
