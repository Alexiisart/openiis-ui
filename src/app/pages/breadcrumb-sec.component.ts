import { Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { OpeniisBreadcrumbComponent } from '../components/breadcrumb/breadcrumb.component';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-breadcrumb-sec',
  standalone: true,
  imports: [CommonModule, OpeniisBreadcrumbComponent],
  template: `
    <!-- Sección de Breadcrumbs -->
    <section class="demo-section">
      <h2>Breadcrumbs - Navegación</h2>

      <div class="demo-subsection">
        <h3>Variantes de Breadcrumb</h3>
        <div class="demo-grid">
          <div class="demo-item">
            <h4>Default</h4>
            <div class="button-group">
              <openiis-breadcrumb
                [items]="[
                  {
                    label: 'Inicio',
                    url: '/',
                    icon: 'home',
                    active: isActive('/')
                  },
                  {
                    label: 'Productos',
                    url: '/products',
                    active: isActive('/products')
                  },
                  {
                    label: 'Categoría',
                    url: '/products/category',
                    active: isActive('/products/category')
                  },
                  {
                    label: 'Producto Actual',
                    url: '/products/product',
                    active: isActive('/products/product')
                  }
                ]"
              ></openiis-breadcrumb>
            </div>
          </div>

          <div class="demo-item">
            <h4>Pills</h4>
            <div class="button-group">
              <openiis-breadcrumb
                variant="pills"
                [showHome]="false"
                [items]="[
                  {
                    label: 'Inicio',
                    url: '/',
                    icon: 'home',
                    active: isActive('/')
                  },
                  {
                    label: 'Usuarios',
                    url: '/users',
                    active: isActive('/users')
                  },
                  {
                    label: 'Perfil',
                    url: '/users/profile',
                    active: isActive('/users/profile')
                  },
                  { label: 'Configuración', active: isActive('/users/profile') }
                ]"
              ></openiis-breadcrumb>
            </div>
          </div>

          <div class="demo-item">
            <h4>Arrows</h4>
            <div class="button-group">
              <openiis-breadcrumb
                variant="arrows"
                [showHome]="false"
                [items]="[
                  {
                    label: 'Dashboard',
                    url: '/admin',
                    icon: 'dashboard',
                    active: isActive('/admin')
                  },
                  {
                    label: 'Usuarios',
                    url: '/admin/users',
                    active: isActive('/admin/users')
                  },
                  {
                    label: 'Gestión',
                    url: '/admin/users/management',
                    active: isActive('/admin/users/management')
                  },
                  {
                    label: 'Editar Usuario',
                    active: isActive('/admin/users/management')
                  }
                ]"
              ></openiis-breadcrumb>
            </div>
          </div>
        </div>

        <h3>Tamaños</h3>
        <div class="demo-grid">
          <div class="demo-item">
            <h4>Pequeño (sm)</h4>
            <div class="button-group">
              <openiis-breadcrumb
                size="sm"
                [showHome]="false"
                [items]="[
                  { label: 'Inicio', url: '/', active: isActive('/') },
                  {
                    label: 'Categorías',
                    url: '/categories',
                    active: isActive('/categories')
                  },
                  {
                    label: 'Actual',
                    url: '/actual',
                    active: isActive('/actual')
                  }
                ]"
              ></openiis-breadcrumb>
            </div>
          </div>

          <div class="demo-item">
            <h4>Mediano (md)</h4>
            <div class="button-group">
              <openiis-breadcrumb
                size="md"
                [showHome]="false"
                [items]="[
                  { label: 'Inicio', url: '/', active: isActive('/') },
                  {
                    label: 'Categorías',
                    url: '/categories',
                    active: isActive('/categories')
                  },
                  {
                    label: 'Actual',
                    url: '/actual',
                    active: isActive('/actual')
                  }
                ]"
              ></openiis-breadcrumb>
            </div>
          </div>

          <div class="demo-item">
            <h4>Grande (lg)</h4>
            <div class="button-group">
              <openiis-breadcrumb
                size="lg"
                [showHome]="false"
                [items]="[
                  { label: 'Inicio', url: '/', active: isActive('/') },
                  {
                    label: 'Categorías',
                    url: '/categories',
                    active: isActive('/categories')
                  },
                  {
                    label: 'Actual',
                    url: '/actual',
                    active: isActive('/actual')
                  }
                ]"
              ></openiis-breadcrumb>
            </div>
          </div>
        </div>

        <h3>Separadores</h3>
        <div class="demo-grid">
          <div class="demo-item">
            <h4>Slash</h4>
            <div class="button-group">
              <openiis-breadcrumb
                separator="slash"
                [showHome]="false"
                [items]="[
                  { label: 'Inicio', url: '/', active: isActive('/') },
                  {
                    label: 'Sección',
                    url: '/section',
                    active: isActive('/section')
                  },
                  {
                    label: 'Actual',
                    url: '/actual',
                    active: isActive('/actual')
                  }
                ]"
              ></openiis-breadcrumb>
            </div>
          </div>

          <div class="demo-item">
            <h4>Dot</h4>
            <div class="button-group">
              <openiis-breadcrumb
                separator="dot"
                [showHome]="false"
                [items]="[
                  { label: 'Inicio', url: '/', active: isActive('/') },
                  {
                    label: 'Sección',
                    url: '/section',
                    active: isActive('/section')
                  },
                  {
                    label: 'Actual',
                    url: '/actual',
                    active: isActive('/actual')
                  }
                ]"
              ></openiis-breadcrumb>
            </div>
          </div>

          <div class="demo-item">
            <h4>Pipe</h4>
            <div class="button-group">
              <openiis-breadcrumb
                separator="pipe"
                [showHome]="false"
                [items]="[
                  { label: 'Inicio', url: '/', active: isActive('/') },
                  {
                    label: 'Sección',
                    url: '/section',
                    active: isActive('/section')
                  },
                  {
                    label: 'Actual',
                    url: '/actual',
                    active: isActive('/actual')
                  }
                ]"
              ></openiis-breadcrumb>
            </div>
          </div>

          <div class="demo-item">
            <h4>Custom</h4>
            <div class="button-group">
              <openiis-breadcrumb
                separator="custom"
                customSeparator="→"
                [showHome]="false"
                [items]="[
                  { label: 'Inicio', url: '/', active: isActive('/') },
                  {
                    label: 'Sección',
                    url: '/section',
                    active: isActive('/section')
                  },
                  {
                    label: 'Actual',
                    url: '/actual',
                    active: isActive('/actual')
                  }
                ]"
              ></openiis-breadcrumb>
            </div>
          </div>
        </div>
      </div>
    </section>
  `,
})
export class BreadcrumbSecComponent {
  route = inject(ActivatedRoute);
  router = inject(Router);

  isActive(url: string): boolean {
    return this.router.url === url;
  }
}
