import { Routes } from '@angular/router';
import { LayoutComponent } from './layout/layout.component';

export const routes: Routes = [
  {
    path: '',
    redirectTo: 'home',
    pathMatch: 'full',
  },

  {
    path: '',
    component: LayoutComponent,
    children: [
      {
        path: 'home',
        loadComponent: () =>
          import('./pages/home-sec.component').then((m) => m.HomeSecComponent),
      },
      {
        path: 'components',
        children: [
          {
            path: 'buttons',
            loadComponent: () =>
              import('./pages/button-sec.component').then(
                (m) => m.ButtonSecComponent
              ),
          },
          {
            path: 'inputs',
            loadComponent: () =>
              import('./pages/input-sec.component').then(
                (m) => m.InputSecComponent
              ),
          },
          {
            path: 'selects',
            loadComponent: () =>
              import('./pages/select-sec.component').then(
                (m) => m.SelectSecComponent
              ),
          },
          {
            path: 'date',
            loadComponent: () =>
              import('./pages/date-sec.component').then(
                (m) => m.DateSecComponent
              ),
          },
          {
            path: 'checkboxes',
            loadComponent: () =>
              import('./pages/checkbox-sec.component').then(
                (m) => m.CheckboxSecComponent
              ),
          },
          {
            path: 'radios',
            loadComponent: () =>
              import('./pages/radio-sec.component').then(
                (m) => m.RadioSecComponent
              ),
          },
          {
            path: 'switches',
            loadComponent: () =>
              import('./pages/switches-sec.component').then(
                (m) => m.SwitchesSecComponent
              ),
          },
          {
            path: 'modals',
            loadComponent: () =>
              import('./pages/modal-sec.component').then(
                (m) => m.ModalSecComponent
              ),
          },
          {
            path: 'notifications',
            loadComponent: () =>
              import('./pages/notification-sec.component').then(
                (m) => m.NotificationSecComponent
              ),
          },
          {
            path: 'cards',
            loadComponent: () =>
              import('./pages/card-sec.component').then(
                (m) => m.CardSecComponent
              ),
          },
          {
            path: 'avatars',
            loadComponent: () =>
              import('./pages/avatar-sec.component').then(
                (m) => m.AvatarSecComponent
              ),
          },
          {
            path: 'badges',
            loadComponent: () =>
              import('./pages/badge-sec.component').then(
                (m) => m.BadgeSecComponent
              ),
          },
          {
            path: 'breadcrumbs',
            loadComponent: () =>
              import('./pages/breadcrumb-sec.component').then(
                (m) => m.BreadcrumbSecComponent
              ),
          },
          {
            path: 'tooltips',
            loadComponent: () =>
              import('./pages/tooltip-sec.component').then(
                (m) => m.TooltipSecComponent
              ),
          },
          {
            path: 'spinners',
            loadComponent: () =>
              import('./pages/spinner-sec.component').then(
                (m) => m.SpinnerSecComponent
              ),
          },
          {
            path: 'states',
            loadComponent: () =>
              import('./pages/states-sec.component').then(
                (m) => m.StatesSecComponent
              ),
          },
          {
            path: 'tabs',
            loadComponent: () =>
              import('./pages/tab-sec.component').then(
                (m) => m.TabSecComponent
              ),
          },
          {
            path: 'uploader',
            loadComponent: () =>
              import('./pages/uploader-sec.component').then(
                (m) => m.UploaderSecComponent
              ),
          },
          {
            path: '',
            redirectTo: 'buttons',
            pathMatch: 'full',
          },
        ],
      },
      {
        path: '',
        redirectTo: 'components',
        pathMatch: 'full',
      },
    ],
  },
];
