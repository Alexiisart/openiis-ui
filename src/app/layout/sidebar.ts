export const menuItems = [
  {
    route: '/home',
    name: 'Inicio',
    icon: 'home',
  },
  {
    route: '/components/buttons',
    name: 'Botones',
    icon: 'radio_button_checked',
    submenu: [
      {
        title: 'Botones',
        items: [
          {
            name: 'Básico',
            reference: 'basic-buttons',
          },
          {
            name: 'Agrupados',
            reference: 'grouped-buttons',
          },
          {
            name: 'Flotantes',
            reference: 'floating-buttons',
          },
        ],
      },
    ],
  },
  {
    route: '/components/inputs',
    name: 'Entradas',
    icon: 'text_fields',
    submenu: [
      {
        title: 'Entradas',
        items: [
          {
            name: 'Básicos',
            reference: 'basic-inputs',
          },
          {
            name: 'Variantes',
            reference: 'variants-inputs',
          },
          {
            name: 'Tamaños',
            reference: 'sizes-inputs',
          },
        ],
      },
      {
        title: 'Textarea',
        items: [
          {
            name: 'Textarea',
            reference: 'textarea-inputs',
          },
        ],
      },
      {
        title: 'Búsqueda',
        items: [
          {
            name: 'Búsqueda',
            reference: 'search-inputs',
          },
        ],
      },
    ],
  },
  {
    route: '/components/selects',
    name: 'Selectores',
    icon: 'arrow_drop_down_circle',
  },
  {
    route: '/components/date',
    name: 'Selector de Fecha',
    icon: 'event',
  },
  {
    route: '/components/checkboxes',
    name: 'Casillas de Verificación',
    icon: 'check_box',
  },
  {
    route: '/components/radios',
    name: 'Botones de Radio',
    icon: 'radio_button_unchecked',
  },
  {
    route: '/components/modals',
    name: 'Modales',
    icon: 'open_in_new',
  },
  {
    route: '/components/notifications',
    name: 'Notificaciones',
    icon: 'notifications_active',
  },
  {
    route: '/components/tooltips',
    name: 'Tooltips',
    icon: 'help_outline',
  },
  {
    route: '/components/states',
    name: 'Estados',
    icon: 'layers',
    submenu: [
      {
        title: 'Estados',
        items: [
          {
            name: 'Básicos',
            reference: 'basic-states',
          },
          {
            name: 'Específicos',
            reference: 'specific-states',
          },
        ],
      },
    ],
  },
  {
    route: '/components/avatars',
    name: 'Avatares',
    icon: 'person',
  },
  {
    route: '/components/badges',
    name: 'Insignias',
    icon: 'local_offer',
  },
  {
    route: '/components/breadcrumbs',
    name: 'Navegación',
    icon: 'chevron_right',
  },
  {
    route: '/components/cards',
    name: 'Tarjetas',
    icon: 'view_module',
    submenu: [
      {
        title: 'Tarjetas',
        items: [
          {
            name: 'Básicas',
            reference: 'basic-cards',
          },
          {
            name: 'Tamaños',
            reference: 'card-sizes',
          },
        ],
      },
    ],
  },
  {
    route: '/components/spinners',
    name: 'Indicadores de Carga',
    icon: 'sync',
  },
  {
    route: '/components/switches',
    name: 'Interruptores',
    icon: 'toggle_on',
  },
  {
    route: '/components/tabs',
    name: 'Pestañas',
    icon: 'tab',
  },
  {
    route: '/components/uploader',
    name: 'Cargador de Archivos',
    icon: 'cloud_upload',
    submenu: [
      {
        title: 'Cargador de Archivos',
        items: [
          {
            name: 'Básicas',
            reference: 'basic-uploader',
          },
          {
            name: 'Avanzadas',
            reference: 'advanced-uploader',
          },
          {
            name: 'Casos Reales',
            reference: 'real-cases',
          },
        ],
      },
    ],
  },
  {
    route: '/components/sidebar',
    name: 'Sidebar',
    icon: 'menu',
    submenu: [
      {
        title: 'Sidebar',
        items: [
          {
            name: 'Básico',
            reference: 'basic-sidebar',
          },
          {
            name: 'Búsqueda',
            reference: 'search-sidebar',
          },
          {
            name: 'Estructuras',
            reference: 'menu-structures',
          },
        ],
      },
    ],
  },
];
