import { Component } from '@angular/core';
import { RouterOutlet, Router, NavigationEnd } from '@angular/router';
import { SidebarComponent } from '../components/sidebar/sidebar.component';
import { filter } from 'rxjs/operators';
import { Subscription } from 'rxjs';

import { HeaderSecComponent } from '../pages/main/header-sec.component';
import { TranslateModule, TranslateService } from '@ngx-translate/core';

@Component({
  selector: 'app-layout',
  standalone: true,
  imports: [
    RouterOutlet,
    SidebarComponent,
    HeaderSecComponent,
    TranslateModule,
  ],
  templateUrl: './layout.component.html',
  styleUrls: ['./layout.component.css'],
})
export class LayoutComponent {
  /* ===== MENU ITEMS ===== */
  menuItems: Array<{
    route: string;
    name: string;
    icon?: string;
    submenu?: Array<{
      title?: string;
      items: Array<{
        route?: string;
        name: string;
        icon?: string;
        reference?: string;
        title?: string;
      }>;
    }>;
  }> = [];

  private subscription = new Subscription();

  constructor(private router: Router, private translate: TranslateService) {
    // Suscribirse a cambios de idioma
    this.translate.onLangChange.subscribe(() => {
      this.menuItems = this.buildMenuItems();
    });

    this.menuItems = this.buildMenuItems();
  }

  ngOnInit() {
    // Escuchar cambios de navegación para hacer scroll a los fragmentos
    this.subscription.add(
      this.router.events
        .pipe(filter((event) => event instanceof NavigationEnd))
        .subscribe((event: NavigationEnd) => {
          // Obtener el fragmento de la URL
          const fragment = this.router.parseUrl(this.router.url).fragment;
          if (fragment) {
            // Pequeño delay para asegurar que el contenido se haya renderizado
            setTimeout(() => {
              const element = document.getElementById(fragment);
              if (element) {
                const elementPosition = element.getBoundingClientRect().top;
                const offsetPosition = elementPosition - 200;

                window.scrollBy({
                  top: offsetPosition,
                  behavior: 'smooth',
                });
              }
            }, 100);
          }
        })
    );
  }

  private buildMenuItems(): any[] {
    return [
      {
        route: '/home',
        name: this.translate.instant('menu.instalación'),
        icon: 'code',
      },
      {
        route: '/components/buttons',
        name: this.translate.instant('menu.botones'),
        icon: 'radio_button_checked',
        submenu: [
          {
            title: this.translate.instant('menu.botones'),
            items: [
              {
                name: this.translate.instant('menu.básico'),
                reference: 'basic-buttons',
              },
              {
                name: this.translate.instant('menu.agrupados'),
                reference: 'grouped-buttons',
              },
              {
                name: this.translate.instant('menu.flotantes'),
                reference: 'floating-buttons',
              },
            ],
          },
        ],
      },
      {
        route: '/components/inputs',
        name: this.translate.instant('menu.entradas'),
        icon: 'text_fields',
        submenu: [
          {
            title: this.translate.instant('menu.entradas'),
            items: [
              {
                name: this.translate.instant('menu.básicos'),
                reference: 'basic-inputs',
              },
              {
                name: this.translate.instant('menu.variantes'),
                reference: 'variants-inputs',
              },
              {
                name: this.translate.instant('menu.tamaños'),
                reference: 'sizes-inputs',
              },
            ],
          },
          {
            title: this.translate.instant('menu.textarea'),
            items: [
              {
                name: this.translate.instant('menu.textarea'),
                reference: 'textarea-inputs',
              },
            ],
          },
          {
            title: this.translate.instant('menu.búsqueda'),
            items: [
              {
                name: this.translate.instant('menu.búsqueda'),
                reference: 'search-inputs',
              },
            ],
          },
        ],
      },
      {
        route: '/components/selects',
        name: this.translate.instant('menu.selectores'),
        icon: 'arrow_drop_down_circle',
      },
      {
        route: '/components/date',
        name: this.translate.instant('menu.selector_de_fecha'),
        icon: 'event',
      },
      {
        route: '/components/checkboxes',
        name: this.translate.instant('menu.casillas_de_verificación'),
        icon: 'check_box',
      },
      {
        route: '/components/radios',
        name: this.translate.instant('menu.botones_de_radio'),
        icon: 'radio_button_unchecked',
      },
      {
        route: '/components/modals',
        name: this.translate.instant('menu.modales'),
        icon: 'open_in_new',
      },
      {
        route: '/components/notifications',
        name: this.translate.instant('menu.notificaciones'),
        icon: 'notifications_active',
      },
      {
        route: '/components/tooltips',
        name: this.translate.instant('menu.tooltips'),
        icon: 'help_outline',
      },
      {
        route: '/components/states',
        name: this.translate.instant('menu.estados'),
        icon: 'layers',
        submenu: [
          {
            title: this.translate.instant('menu.estados'),
            items: [
              {
                name: this.translate.instant('menu.básicos'),
                reference: 'basic-states',
              },
              {
                name: this.translate.instant('menu.específicos'),
                reference: 'specific-states',
              },
            ],
          },
        ],
      },
      {
        route: '/components/avatars',
        name: this.translate.instant('menu.avatares'),
        icon: 'person',
      },
      {
        route: '/components/badges',
        name: this.translate.instant('menu.insignias'),
        icon: 'local_offer',
      },
      {
        route: '/components/breadcrumbs',
        name: this.translate.instant('menu.navegación'),
        icon: 'chevron_right',
      },
      {
        route: '/components/cards',
        name: this.translate.instant('menu.tarjetas'),
        icon: 'view_module',
        submenu: [
          {
            title: this.translate.instant('menu.tarjetas'),
            items: [
              {
                name: this.translate.instant('menu.básicas'),
                reference: 'basic-cards',
              },
              {
                name: this.translate.instant('menu.tamaños'),
                reference: 'card-sizes',
              },
            ],
          },
        ],
      },
      {
        route: '/components/spinners',
        name: this.translate.instant('menu.indicadores_de_carga'),
        icon: 'sync',
      },
      {
        route: '/components/switches',
        name: this.translate.instant('menu.interruptores'),
        icon: 'toggle_on',
      },
      {
        route: '/components/tabs',
        name: this.translate.instant('menu.pestañas'),
        icon: 'tab',
      },
      {
        route: '/components/uploader',
        name: this.translate.instant('menu.cargador_de_archivos'),
        icon: 'cloud_upload',
        submenu: [
          {
            title: this.translate.instant('menu.cargador_de_archivos'),
            items: [
              {
                name: this.translate.instant('menu.básicas'),
                reference: 'basic-uploader',
              },
              {
                name: this.translate.instant('menu.avanzadas'),
                reference: 'advanced-uploader',
              },
              {
                name: this.translate.instant('menu.casos_reales'),
                reference: 'real-cases',
              },
            ],
          },
        ],
      },
      {
        route: '/components/sidebar',
        name: this.translate.instant('menu.sidebar'),
        icon: 'menu',
        submenu: [
          {
            title: this.translate.instant('menu.sidebar'),
            items: [
              {
                name: this.translate.instant('menu.básico'),
                reference: 'basic-sidebar',
              },
              {
                name: this.translate.instant('menu.búsqueda'),
                reference: 'search-sidebar',
              },
              {
                name: this.translate.instant('menu.estructuras'),
                reference: 'menu-structures',
              },
            ],
          },
        ],
      },
    ];
  }
}
