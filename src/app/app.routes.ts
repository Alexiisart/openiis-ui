import { Routes } from '@angular/router';

export const routes: Routes = [
  {
    path: '',
    title: 'Inicio',
    loadComponent: () =>
      import('./pages/breadcrump-sec.component').then(
        (m) => m.BreadcrumbSecComponent
      ),
  },
  {
    path: 'products',
    title: 'Productos',
    loadComponent: () =>
      import('./pages/breadcrump-sec.component').then(
        (m) => m.BreadcrumbSecComponent
      ),
  },
  {
    path: 'products/category',
    title: 'Categoría',
    loadComponent: () =>
      import('./pages/breadcrump-sec.component').then(
        (m) => m.BreadcrumbSecComponent
      ),
  },
  {
    path: 'products/product',
    title: 'Producto Actual',
    loadComponent: () =>
      import('./pages/breadcrump-sec.component').then(
        (m) => m.BreadcrumbSecComponent
      ),
  },
  {
    path: 'users',
    title: 'Usuarios',
    loadComponent: () =>
      import('./pages/breadcrump-sec.component').then(
        (m) => m.BreadcrumbSecComponent
      ),
  },
  {
    path: 'users/profile',
    title: 'Perfil',
    loadComponent: () =>
      import('./pages/breadcrump-sec.component').then(
        (m) => m.BreadcrumbSecComponent
      ),
  },
  {
    path: 'admin',
    title: 'Dashboard',
    loadComponent: () =>
      import('./pages/breadcrump-sec.component').then(
        (m) => m.BreadcrumbSecComponent
      ),
  },
  {
    path: 'admin/users',
    title: 'Gestión de Usuarios',
    loadComponent: () =>
      import('./pages/breadcrump-sec.component').then(
        (m) => m.BreadcrumbSecComponent
      ),
  },
  {
    path: 'admin/users/management',
    title: 'Gestión',
    loadComponent: () =>
      import('./pages/breadcrump-sec.component').then(
        (m) => m.BreadcrumbSecComponent
      ),
  },
  {
    path: 'categories',
    title: 'Categorías',
    loadComponent: () =>
      import('./pages/breadcrump-sec.component').then(
        (m) => m.BreadcrumbSecComponent
      ),
  },
  {
    path: 'section',
    title: 'Sección',
    loadComponent: () =>
      import('./pages/breadcrump-sec.component').then(
        (m) => m.BreadcrumbSecComponent
      ),
  },
  {
    path: 'shop',
    title: 'Tienda',
    loadComponent: () =>
      import('./pages/breadcrump-sec.component').then(
        (m) => m.BreadcrumbSecComponent
      ),
  },
  {
    path: 'shop/electronics',
    title: 'Electrónicos',
    loadComponent: () =>
      import('./pages/breadcrump-sec.component').then(
        (m) => m.BreadcrumbSecComponent
      ),
  },
  {
    path: 'shop/electronics/smartphones',
    title: 'Smartphones',
    loadComponent: () =>
      import('./pages/breadcrump-sec.component').then(
        (m) => m.BreadcrumbSecComponent
      ),
  },
  {
    path: 'actual',
    title: 'Actual',
    loadComponent: () =>
      import('./pages/breadcrump-sec.component').then(
        (m) => m.BreadcrumbSecComponent
      ),
  },
  {
    path: 'new-item',
    title: 'Nuevo Elemento',
    loadComponent: () =>
      import('./pages/breadcrump-sec.component').then(
        (m) => m.BreadcrumbSecComponent
      ),
  },
  {
    path: '**',
    redirectTo: '',
  },
];
