import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SidebarComponent } from '../components/sidebar/sidebar.component';
import { MenuItem } from '../components/sidebar/sidebar.component';

@Component({
  selector: 'app-sidebar-sec',
  standalone: true,
  imports: [CommonModule, SidebarComponent],
  template: `
    <!-- Sección de Sidebar -->
    <section id="basic-sidebar" class="demo-section">
      <h2>Sidebar de Navegación</h2>

      <div class="demo-subsection">
        <h3>Configuración Básica</h3>
        <div class="demo-grid">
          <div class="demo-item">
            <h4>Sidebar Estándar</h4>
            <div class="sidebar-demo-container">
              <openiis-sidebar
                [menuItems]="basicMenuItems"
                [accordionMode]="true"
                [searchVisible]="true"
                searchPlaceholder="Buscar componentes..."
              >
              </openiis-sidebar>
            </div>
          </div>

          <div class="demo-item">
            <h4>Sidebar Sin Búsqueda</h4>
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
        <h3>Modos de Funcionamiento</h3>
        <div class="demo-grid">
          <div class="demo-item">
            <h4>Modo Acordeón</h4>
            <p>Solo un submenú puede estar abierto a la vez</p>
            <div class="sidebar-demo-container">
              <openiis-sidebar
                [menuItems]="complexMenuItems"
                [accordionMode]="true"
                [searchVisible]="true"
                searchPlaceholder="Buscar en modo acordeón..."
              >
              </openiis-sidebar>
            </div>
          </div>

          <div class="demo-item">
            <h4>Modo Múltiple</h4>
            <p>Múltiples submenús pueden estar abiertos simultáneamente</p>
            <div class="sidebar-demo-container">
              <openiis-sidebar
                [menuItems]="complexMenuItems"
                [accordionMode]="false"
                [searchVisible]="true"
                searchPlaceholder="Buscar en modo múltiple..."
              >
              </openiis-sidebar>
            </div>
          </div>
        </div>
      </div>
    </section>

    <!-- Sección de Configuración de Búsqueda -->
    <section id="search-sidebar" class="demo-section">
      <h2>Configuración de Búsqueda</h2>

      <div class="demo-subsection">
        <h3>Tamaños de Búsqueda</h3>
        <div class="demo-grid">
          <div class="demo-item">
            <h4>Búsqueda Pequeña</h4>
            <div class="sidebar-demo-container">
              <openiis-sidebar
                [menuItems]="searchMenuItems"
                [searchVisible]="true"
                [searchSize]="'sm'"
                searchPlaceholder="Búsqueda pequeña..."
              >
              </openiis-sidebar>
            </div>
          </div>

          <div class="demo-item">
            <h4>Búsqueda Mediana</h4>
            <div class="sidebar-demo-container">
              <openiis-sidebar
                [menuItems]="searchMenuItems"
                [searchVisible]="true"
                [searchSize]="'md'"
                searchPlaceholder="Búsqueda mediana..."
              >
              </openiis-sidebar>
            </div>
          </div>

          <div class="demo-item">
            <h4>Búsqueda Grande</h4>
            <div class="sidebar-demo-container">
              <openiis-sidebar
                [menuItems]="searchMenuItems"
                [searchVisible]="true"
                [searchSize]="'lg'"
                searchPlaceholder="Búsqueda grande..."
              >
              </openiis-sidebar>
            </div>
          </div>
        </div>
      </div>
    </section>

    <!-- Sección de Estructuras de Menú -->
    <section id="menu-structures" class="demo-section">
      <h2>Estructuras de Menú</h2>

      <div class="demo-subsection">
        <h3>Diferentes Configuraciones</h3>
        <div class="demo-grid">
          <div class="demo-item">
            <h4>Menú Simple</h4>
            <p>Solo items principales sin submenús</p>
            <div class="sidebar-demo-container">
              <openiis-sidebar
                [menuItems]="simpleMenuItems"
                [searchVisible]="false"
              >
              </openiis-sidebar>
            </div>
          </div>

          <div class="demo-item">
            <h4>Menú con Grupos</h4>
            <p>Submenús con títulos de sección</p>
            <div class="sidebar-demo-container">
              <openiis-sidebar
                [menuItems]="groupedMenuItems"
                [accordionMode]="true"
                [searchVisible]="true"
                searchPlaceholder="Buscar en grupos..."
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
  basicMenuItems: MenuItem[] = [
    {
      route: '/dashboard',
      name: 'Dashboard',
      icon: 'dashboard',
    },
    {
      route: '/users',
      name: 'Usuarios',
      icon: 'people',
    },
    {
      route: '/settings',
      name: 'Configuración',
      icon: 'settings',
    },
  ];

  complexMenuItems: MenuItem[] = [
    {
      route: '/dashboard',
      name: 'Dashboard',
      icon: 'dashboard',
    },
    {
      route: '/components',
      name: 'Componentes',
      icon: 'widgets',
      submenu: [
        {
          items: [
            {
              name: 'Botones',
              reference: 'buttons',
            },
            {
              name: 'Inputs',
              reference: 'inputs',
            },
            {
              name: 'Modales',
              reference: 'modals',
            },
          ],
        },
      ],
    },
    {
      route: '/forms',
      name: 'Formularios',
      icon: 'edit',
      submenu: [
        {
          items: [
            {
              name: 'Validación',
              reference: 'validation',
            },
            {
              name: 'Campos',
              reference: 'fields',
            },
          ],
        },
      ],
    },
    {
      route: '/users',
      name: 'Usuarios',
      icon: 'people',
    },
    {
      route: '/settings',
      name: 'Configuración',
      icon: 'settings',
      submenu: [
        {
          items: [
            {
              name: 'Perfil',
              reference: 'profile',
            },
            {
              name: 'Seguridad',
              reference: 'security',
            },
            {
              name: 'Notificaciones',
              reference: 'notifications',
            },
          ],
        },
      ],
    },
  ];

  searchMenuItems: MenuItem[] = [
    {
      route: '/analytics',
      name: 'Analytics',
      icon: 'analytics',
    },
    {
      route: '/reports',
      name: 'Reportes',
      icon: 'assessment',
      submenu: [
        {
          items: [
            {
              name: 'Ventas',
              reference: 'sales',
            },
            {
              name: 'Usuarios',
              reference: 'users',
            },
            {
              name: 'Productos',
              reference: 'products',
            },
          ],
        },
      ],
    },
    {
      route: '/inventory',
      name: 'Inventario',
      icon: 'inventory',
    },
    {
      route: '/orders',
      name: 'Órdenes',
      icon: 'shopping_cart',
    },
  ];

  simpleMenuItems: MenuItem[] = [
    {
      route: '/home',
      name: 'Inicio',
      icon: 'home',
    },
    {
      route: '/about',
      name: 'Acerca de',
      icon: 'info',
    },
    {
      route: '/contact',
      name: 'Contacto',
      icon: 'mail',
    },
    {
      route: '/help',
      name: 'Ayuda',
      icon: 'help',
    },
  ];

  groupedMenuItems: MenuItem[] = [
    {
      route: '/dashboard',
      name: 'Dashboard',
      icon: 'dashboard',
    },
    {
      route: '/content',
      name: 'Contenido',
      icon: 'folder',
      submenu: [
        {
          title: 'Gestión',
          items: [
            {
              name: 'Artículos',
              reference: 'articles',
            },
            {
              name: 'Categorías',
              reference: 'categories',
            },
          ],
        },
        {
          title: 'Publicación',
          items: [
            {
              name: 'Borrador',
              reference: 'draft',
            },
            {
              name: 'Publicado',
              reference: 'published',
            },
          ],
        },
      ],
    },
    {
      route: '/admin',
      name: 'Administración',
      icon: 'admin_panel_settings',
      submenu: [
        {
          title: 'Usuarios',
          items: [
            {
              name: 'Gestión',
              reference: 'user-management',
            },
            {
              name: 'Roles',
              reference: 'roles',
            },
          ],
        },
        {
          title: 'Sistema',
          items: [
            {
              name: 'Configuración',
              reference: 'system-config',
            },
            {
              name: 'Logs',
              reference: 'logs',
            },
          ],
        },
      ],
    },
  ];
}
