import { Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { OpeniisBreadcrumbComponent } from 'openiis-ui';
import { ActivatedRoute, Router } from '@angular/router';
import { TranslateModule } from '@ngx-translate/core';

@Component({
  selector: 'app-breadcrumb-sec',
  standalone: true,
  imports: [CommonModule, OpeniisBreadcrumbComponent, TranslateModule],
  template: `
    <!-- Sección de Breadcrumbs -->
    <section class="demo-section">
      <h2>{{ 'breadcrumb.navegacion' | translate }}</h2>

      <div class="demo-subsection">
        <h3>{{ 'breadcrumb.variantes_de_navegacion' | translate }}</h3>
        <div class="demo-grid">
          <div class="demo-item">
            <h4>{{ 'breadcrumb.default' | translate }}</h4>
            <div class="button-group">
              <openiis-breadcrumb
                [items]="[
                  {
                    label: 'breadcrumb.inicio' | translate,
                    url: '/',
                    icon: 'home',
                    active: isActive('/'),
                  },
                  {
                    label: 'breadcrumb.productos' | translate,
                    url: '/products',
                    active: isActive('/products'),
                  },
                  {
                    label: 'breadcrumb.categorias' | translate,
                    url: '/products/category',
                    active: isActive('/products/category'),
                  },
                  {
                    label: 'breadcrumb.producto_actual' | translate,
                    url: '/products/product',
                    active: isActive('/products/product'),
                  },
                ]"
              ></openiis-breadcrumb>
            </div>
          </div>

          <div class="demo-item">
            <h4>{{ 'breadcrumb.pills' | translate }}</h4>
            <div class="button-group">
              <openiis-breadcrumb
                variant="pills"
                [showHome]="false"
                [items]="[
                  {
                    label: 'breadcrumb.inicio' | translate,
                    url: '/',
                    icon: 'home',
                    active: isActive('/'),
                  },
                  {
                    label: 'breadcrumb.usuarios' | translate,
                    url: '/users',
                    active: isActive('/users'),
                  },
                  {
                    label: 'breadcrumb.perfil' | translate,
                    url: '/users/profile',
                    active: isActive('/users/profile'),
                  },
                  {
                    label: 'breadcrumb.configuracion' | translate,
                    active: isActive('/users/profile'),
                  },
                ]"
              ></openiis-breadcrumb>
            </div>
          </div>

          <div class="demo-item">
            <h4>{{ 'breadcrumb.arrows' | translate }}</h4>
            <div class="button-group">
              <openiis-breadcrumb
                variant="arrows"
                [showHome]="false"
                [items]="[
                  {
                    label: 'breadcrumb.dashboard' | translate,
                    url: '/admin',
                    icon: 'dashboard',
                    active: isActive('/admin'),
                  },
                  {
                    label: 'breadcrumb.usuarios' | translate,
                    url: '/admin/users',
                    active: isActive('/admin/users'),
                  },
                  {
                    label: 'breadcrumb.gestion' | translate,
                    url: '/admin/users/management',
                    active: isActive('/admin/users/management'),
                  },
                  {
                    label: 'breadcrumb.editar_usuario' | translate,
                    active: isActive('/admin/users/management'),
                  },
                ]"
              ></openiis-breadcrumb>
            </div>
          </div>
        </div>

        <h3>{{ 'breadcrumb.tamaños' | translate }}</h3>
        <div class="demo-grid">
          <div class="demo-item">
            <h4>{{ 'breadcrumb.pequeño_sm' | translate }}</h4>
            <div class="button-group">
              <openiis-breadcrumb
                size="sm"
                [showHome]="false"
                [items]="[
                  {
                    label: 'breadcrumb.inicio' | translate,
                    url: '/',
                    active: isActive('/'),
                  },
                  {
                    label: 'breadcrumb.categorias' | translate,
                    url: '/categories',
                    active: isActive('/categories'),
                  },
                  {
                    label: 'breadcrumb.actual' | translate,
                    url: '/actual',
                    active: isActive('/actual'),
                  },
                ]"
              ></openiis-breadcrumb>
            </div>
          </div>

          <div class="demo-item">
            <h4>{{ 'breadcrumb.mediano_md' | translate }}</h4>
            <div class="button-group">
              <openiis-breadcrumb
                size="md"
                [showHome]="false"
                [items]="[
                  {
                    label: 'breadcrumb.inicio' | translate,
                    url: '/',
                    active: isActive('/'),
                  },
                  {
                    label: 'breadcrumb.categorias' | translate,
                    url: '/categories',
                    active: isActive('/categories'),
                  },
                  {
                    label: 'breadcrumb.actual' | translate,
                    url: '/actual',
                    active: isActive('/actual'),
                  },
                ]"
              ></openiis-breadcrumb>
            </div>
          </div>

          <div class="demo-item">
            <h4>{{ 'breadcrumb.grande_lg' | translate }}</h4>
            <div class="button-group">
              <openiis-breadcrumb
                size="lg"
                [showHome]="false"
                [items]="[
                  {
                    label: 'breadcrumb.inicio' | translate,
                    url: '/',
                    active: isActive('/'),
                  },
                  {
                    label: 'breadcrumb.categorias' | translate,
                    url: '/categories',
                    active: isActive('/categories'),
                  },
                  {
                    label: 'breadcrumb.actual' | translate,
                    url: '/actual',
                    active: isActive('/actual'),
                  },
                ]"
              ></openiis-breadcrumb>
            </div>
          </div>
        </div>

        <h3>{{ 'breadcrumb.separadores' | translate }}</h3>
        <div class="demo-grid">
          <div class="demo-item">
            <h4>{{ 'breadcrumb.slash' | translate }}</h4>
            <div class="button-group">
              <openiis-breadcrumb
                separator="slash"
                [showHome]="false"
                [items]="[
                  {
                    label: 'breadcrumb.inicio' | translate,
                    url: '/',
                    active: isActive('/'),
                  },
                  {
                    label: 'breadcrumb.seccion' | translate,
                    url: '/section',
                    active: isActive('/section'),
                  },
                  {
                    label: 'breadcrumb.actual' | translate,
                    url: '/actual',
                    active: isActive('/actual'),
                  },
                ]"
              ></openiis-breadcrumb>
            </div>
          </div>

          <div class="demo-item">
            <h4>{{ 'breadcrumb.dot' | translate }}</h4>
            <div class="button-group">
              <openiis-breadcrumb
                separator="dot"
                [showHome]="false"
                [items]="[
                  {
                    label: 'breadcrumb.inicio' | translate,
                    url: '/',
                    active: isActive('/'),
                  },
                  {
                    label: 'breadcrumb.seccion' | translate,
                    url: '/section',
                    active: isActive('/section'),
                  },
                  {
                    label: 'breadcrumb.actual' | translate,
                    url: '/actual',
                    active: isActive('/actual'),
                  },
                ]"
              ></openiis-breadcrumb>
            </div>
          </div>

          <div class="demo-item">
            <h4>{{ 'breadcrumb.pipe' | translate }}</h4>
            <div class="button-group">
              <openiis-breadcrumb
                separator="pipe"
                [showHome]="false"
                [items]="[
                  {
                    label: 'breadcrumb.inicio' | translate,
                    url: '/',
                    active: isActive('/'),
                  },
                  {
                    label: 'breadcrumb.seccion' | translate,
                    url: '/section',
                    active: isActive('/section'),
                  },
                  {
                    label: 'breadcrumb.actual' | translate,
                    url: '/actual',
                    active: isActive('/actual'),
                  },
                ]"
              ></openiis-breadcrumb>
            </div>
          </div>

          <div class="demo-item">
            <h4>{{ 'breadcrumb.custom' | translate }}</h4>
            <div class="button-group">
              <openiis-breadcrumb
                separator="custom"
                customSeparator="→"
                [showHome]="false"
                [items]="[
                  {
                    label: 'breadcrumb.inicio' | translate,
                    url: '/',
                    active: isActive('/'),
                  },
                  {
                    label: 'breadcrumb.seccion' | translate,
                    url: '/section',
                    active: isActive('/section'),
                  },
                  {
                    label: 'breadcrumb.actual' | translate,
                    url: '/actual',
                    active: isActive('/actual'),
                  },
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
