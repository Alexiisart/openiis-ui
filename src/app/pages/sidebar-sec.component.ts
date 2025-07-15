import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SidebarComponent } from '../components/sidebar/sidebar.component';
import { MenuItem } from '../components/sidebar/sidebar.component';
import { TranslateModule, TranslateService } from '@ngx-translate/core';

@Component({
  selector: 'app-sidebar-sec',
  standalone: true,
  imports: [CommonModule, SidebarComponent, TranslateModule],
  template: `
    <!-- Sección de Sidebar -->
    <section id="basic-sidebar" class="demo-section">
      <h2>{{ 'sidebar.sidebar_de_navegación' | translate }}</h2>

      <div class="demo-subsection">
        <h3>{{ 'sidebar.configuración_básica' | translate }}</h3>
        <div class="demo-grid">
          <div class="demo-item">
            <h4>{{ 'sidebar.sidebar_estándar' | translate }}</h4>
            <div class="sidebar-demo-container">
              <openiis-sidebar
                [menuItems]="basicMenuItems"
                [accordionMode]="true"
                [searchVisible]="true"
                searchPlaceholder="{{ 'menu.buscar' | translate }}"
              >
              </openiis-sidebar>
            </div>
          </div>

          <div class="demo-item">
            <h4>{{ 'sidebar.sidebar_sin_búsqueda' | translate }}</h4>
            <div class="sidebar-demo-container">
              <openiis-sidebar
                [menuItems]="basicMenuItems"
                [accordionMode]="true"
                [searchVisible]="false"
              >
              </openiis-sidebar>
            </div>
          </div>
        </div>
      </div>

      <div class="demo-subsection">
        <h3>{{ 'sidebar.modos_de_funcionamiento' | translate }}</h3>
        <div class="demo-grid">
          <div class="demo-item">
            <h4>{{ 'sidebar.modo_acordeón' | translate }}</h4>
            <p>
              {{
                'sidebar.solo_un_submenú_puede_estar_abierto_a_la' | translate
              }}
            </p>
            <div class="sidebar-demo-container">
              <openiis-sidebar
                [menuItems]="complexMenuItems"
                [accordionMode]="true"
                [searchVisible]="true"
                searchPlaceholder="{{ 'menu.buscar' | translate }}"
              >
              </openiis-sidebar>
            </div>
          </div>

          <div class="demo-item">
            <h4>{{ 'sidebar.modo_múltiple' | translate }}</h4>
            <p>
              {{
                'sidebar.múltiples_submenús_pueden_estar_abiertos' | translate
              }}
            </p>
            <div class="sidebar-demo-container">
              <openiis-sidebar
                [menuItems]="complexMenuItems"
                [accordionMode]="false"
                [searchVisible]="true"
                searchPlaceholder="{{ 'menu.buscar' | translate }}"
              >
              </openiis-sidebar>
            </div>
          </div>
        </div>
      </div>
    </section>

    <!-- Sección de Configuración de Búsqueda -->
    <section id="search-sidebar" class="demo-section">
      <h2>{{ 'sidebar.configuración_de_búsqueda' | translate }}</h2>

      <div class="demo-subsection">
        <h3>{{ 'sidebar.tamaños_de_búsqueda' | translate }}</h3>
        <div class="demo-grid">
          <div class="demo-item">
            <h4>{{ 'sidebar.búsqueda_pequeña' | translate }}</h4>
            <div class="sidebar-demo-container">
              <openiis-sidebar
                [menuItems]="searchMenuItems"
                [searchVisible]="true"
                [searchSize]="'sm'"
                searchPlaceholder="{{ 'menu.buscar' | translate }}"
              >
              </openiis-sidebar>
            </div>
          </div>

          <div class="demo-item">
            <h4>{{ 'sidebar.búsqueda_mediana' | translate }}</h4>
            <div class="sidebar-demo-container">
              <openiis-sidebar
                [menuItems]="searchMenuItems"
                [searchVisible]="true"
                [searchSize]="'md'"
                searchPlaceholder="{{ 'menu.buscar' | translate }}"
              >
              </openiis-sidebar>
            </div>
          </div>

          <div class="demo-item">
            <h4>{{ 'sidebar.búsqueda_grande' | translate }}</h4>
            <div class="sidebar-demo-container">
              <openiis-sidebar
                [menuItems]="searchMenuItems"
                [searchVisible]="true"
                [searchSize]="'lg'"
                searchPlaceholder="{{ 'menu.buscar' | translate }}"
              >
              </openiis-sidebar>
            </div>
          </div>
        </div>
      </div>
    </section>

    <!-- Sección de Estructuras de Menú -->
    <section id="menu-structures" class="demo-section">
      <h2>{{ 'sidebar.estructuras_de_menú' | translate }}</h2>

      <div class="demo-subsection">
        <h3>{{ 'sidebar.diferentes_configuraciones' | translate }}</h3>
        <div class="demo-grid">
          <div class="demo-item">
            <h4>{{ 'sidebar.menú_simple' | translate }}</h4>
            <p>
              {{ 'sidebar.solo_items_principales_sin_submenús' | translate }}
            </p>
            <div class="sidebar-demo-container">
              <openiis-sidebar
                [menuItems]="simpleMenuItems"
                [searchVisible]="false"
              >
              </openiis-sidebar>
            </div>
          </div>

          <div class="demo-item">
            <h4>{{ 'sidebar.menú_con_grupos' | translate }}</h4>
            <p>{{ 'sidebar.submenús_con_títulos_de_sección' | translate }}</p>
            <div class="sidebar-demo-container">
              <openiis-sidebar
                [menuItems]="groupedMenuItems"
                [accordionMode]="true"
                [searchVisible]="true"
                searchPlaceholder="{{ 'menu.buscar' | translate }}"
              >
              </openiis-sidebar>
            </div>
          </div>
        </div>
      </div>
    </section>
  `,
  styles: [
    `
      .sidebar-demo-container {
        width: 280px;
        height: 400px;
        border: 1px solid var(--color-border);
        border-radius: var(--radius-md);
        background: var(--color-surface);
        overflow: hidden;
        box-shadow: var(--shadow-sm);
      }

      .demo-grid {
        display: grid;
        grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
        gap: var(--space-6);
      }

      .demo-item {
        display: flex;
        flex-direction: column;
        gap: var(--space-3);
      }

      .demo-item h4 {
        margin: 0;
        color: var(--color-text-primary);
        font-size: 1rem;
        font-weight: 600;
      }

      .demo-item p {
        margin: 0;
        color: var(--color-text-secondary);
        font-size: 0.875rem;
      }

      .demo-section {
        margin-bottom: var(--space-8);
      }

      .demo-subsection {
        margin-bottom: var(--space-6);
      }

      .demo-subsection h3 {
        margin-bottom: var(--space-4);
        color: var(--color-text-primary);
        font-size: 1.125rem;
        font-weight: 600;
      }

      .demo-section h2 {
        margin-bottom: var(--space-4);
        color: var(--color-text-primary);
        font-size: 1.5rem;
        font-weight: 700;
      }
    `,
  ],
})
export class SidebarSecComponent {
  constructor(private translate: TranslateService) {
    this.translate.onLangChange.subscribe(() => {
      this.basicMenuItems = this.getBasicMenuItems();
      this.complexMenuItems = this.getComplexMenuItems();
      this.searchMenuItems = this.getSearchMenuItems();
      this.simpleMenuItems = this.getSimpleMenuItems();
      this.groupedMenuItems = this.getGroupedMenuItems();
    });

    this.basicMenuItems = this.getBasicMenuItems();
    this.complexMenuItems = this.getComplexMenuItems();
    this.searchMenuItems = this.getSearchMenuItems();
    this.simpleMenuItems = this.getSimpleMenuItems();
    this.groupedMenuItems = this.getGroupedMenuItems();
  }

  /* ===== SIDEBAR SECTION ===== */
  basicMenuItems: MenuItem[] = [];
  complexMenuItems: MenuItem[] = [];
  searchMenuItems: MenuItem[] = [];
  simpleMenuItems: MenuItem[] = [];
  groupedMenuItems: MenuItem[] = [];

  getBasicMenuItems(): MenuItem[] {
    return [
      {
        route: '/dashboard',
        name: this.translate.instant('sidebar.dashboard'),
        icon: 'dashboard',
      },
      {
        route: '/users',
        name: this.translate.instant('sidebar.usuarios'),
        icon: 'people',
      },
      {
        route: '/settings',
        name: this.translate.instant('sidebar.configuración'),
        icon: 'settings',
      },
    ];
  }

  getComplexMenuItems(): MenuItem[] {
    return [
      {
        route: '/dashboard',
        name: this.translate.instant('sidebar.dashboard'),
        icon: 'dashboard',
      },
      {
        route: '/components',
        name: this.translate.instant('sidebar.componentes'),
        icon: 'widgets',
        submenu: [
          {
            items: [
              {
                name: this.translate.instant('sidebar.botones'),
                reference: 'buttons',
              },
              {
                name: this.translate.instant('sidebar.inputs'),
                reference: 'inputs',
              },
              {
                name: this.translate.instant('sidebar.modales'),
                reference: 'modals',
              },
            ],
          },
        ],
      },
      {
        route: '/forms',
        name: this.translate.instant('sidebar.formularios'),
        icon: 'edit',
        submenu: [
          {
            items: [
              {
                name: this.translate.instant('sidebar.validación'),
                reference: 'validation',
              },
              {
                name: this.translate.instant('sidebar.campos'),
                reference: 'fields',
              },
            ],
          },
        ],
      },
      {
        route: '/users',
        name: this.translate.instant('sidebar.usuarios'),
        icon: 'people',
      },
      {
        route: '/settings',
        name: this.translate.instant('sidebar.configuración'),
        icon: 'settings',
        submenu: [
          {
            items: [
              {
                name: this.translate.instant('sidebar.perfil'),
                reference: 'profile',
              },
              {
                name: this.translate.instant('sidebar.seguridad'),
                reference: 'security',
              },
              {
                name: this.translate.instant('sidebar.notificaciones'),
                reference: 'notifications',
              },
            ],
          },
        ],
      },
    ];
  }

  getSearchMenuItems(): MenuItem[] {
    return [
      {
        route: '/analytics',
        name: this.translate.instant('sidebar.analytics'),
        icon: 'analytics',
      },
      {
        route: '/reports',
        name: this.translate.instant('sidebar.reportes'),
        icon: 'assessment',
        submenu: [
          {
            items: [
              {
                name: this.translate.instant('sidebar.ventas'),
                reference: 'sales',
              },
              {
                name: this.translate.instant('sidebar.usuarios'),
                reference: 'users',
              },
              {
                name: this.translate.instant('sidebar.productos'),
                reference: 'products',
              },
            ],
          },
        ],
      },
      {
        route: '/inventory',
        name: this.translate.instant('sidebar.inventario'),
        icon: 'inventory',
      },
      {
        route: '/orders',
        name: this.translate.instant('sidebar.órdenes'),
        icon: 'shopping_cart',
      },
    ];
  }

  getSimpleMenuItems(): MenuItem[] {
    return [
      {
        route: '/home',
        name: this.translate.instant('sidebar.inicio'),
        icon: 'home',
      },
      {
        route: '/about',
        name: this.translate.instant('sidebar.acerca_de'),
        icon: 'info',
      },
      {
        route: '/contact',
        name: this.translate.instant('sidebar.contacto'),
        icon: 'mail',
      },
      {
        route: '/help',
        name: this.translate.instant('sidebar.ayuda'),
        icon: 'help',
      },
    ];
  }

  getGroupedMenuItems(): MenuItem[] {
    return [
      {
        route: '/dashboard',
        name: this.translate.instant('sidebar.dashboard'),
        icon: 'dashboard',
      },
      {
        route: '/content',
        name: this.translate.instant('sidebar.contenido'),
        icon: 'folder',
        submenu: [
          {
            title: this.translate.instant('sidebar.gestión'),
            items: [
              {
                name: this.translate.instant('sidebar.artículos'),
                reference: 'articles',
              },
              {
                name: this.translate.instant('sidebar.categorías'),
                reference: 'categories',
              },
            ],
          },
          {
            title: this.translate.instant('sidebar.publicación'),
            items: [
              {
                name: this.translate.instant('sidebar.borrador'),
                reference: 'draft',
              },
              {
                name: this.translate.instant('sidebar.publicado'),
                reference: 'published',
              },
            ],
          },
        ],
      },
      {
        route: '/admin',
        name: this.translate.instant('sidebar.administración'),
        icon: 'admin_panel_settings',
        submenu: [
          {
            title: this.translate.instant('sidebar.usuarios'),
            items: [
              {
                name: this.translate.instant('sidebar.gestión'),
                reference: 'user-management',
              },
              {
                name: this.translate.instant('sidebar.roles'),
                reference: 'roles',
              },
            ],
          },
          {
            title: this.translate.instant('sidebar.sistema'),
            items: [
              {
                name: this.translate.instant('sidebar.configuración'),
                reference: 'system-config',
              },
              {
                name: this.translate.instant('sidebar.logs'),
                reference: 'logs',
              },
            ],
          },
        ],
      },
    ];
  }
}
