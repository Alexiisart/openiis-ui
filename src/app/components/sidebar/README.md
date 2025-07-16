# Openiis Sidebar Component

## Descripción

El `OpeniisSidebarComponent` es un componente de navegación vertical altamente configurable, diseñado para mostrar menús jerárquicos con funcionalidades avanzadas. Incluye búsqueda en tiempo real, modo acordeón para submenús, navegación a referencias específicas dentro de las páginas, seguimiento automático de la ruta activa y gestión automática del scroll en dispositivos móviles.

## Características

- ✅ **Menú Jerárquico:** Soporte para múltiples niveles de anidación (menús y submenús)
- ✅ **Búsqueda Integrada:** Filtra los elementos del menú y submenú en tiempo real
- ✅ **Modo Acordeón:** Opción para permitir que solo un submenú esté abierto a la vez
- ✅ **Estado Activo Automático:** Resalta el ítem activo y expande su submenú padre automáticamente según la ruta actual
- ✅ **Navegación con Router:** Integración completa con el Router de Angular
- ✅ **Navegación a Referencias:** Permite navegar a secciones específicas dentro de una página usando IDs
- ✅ **Personalizable:** Permite configurar la visibilidad y el placeholder de la búsqueda
- ✅ **Iconos:** Soporte completo para Material Icons en cada elemento del menú
- ✅ **Responsive con Body Scroll Lock:** En dispositivos móviles, bloquea automáticamente el scroll del contenido de fondo cuando el sidebar está abierto
- ✅ **Accesibilidad:** ARIA completo, navegación por teclado, roles semánticos
- ✅ **Animaciones:** Transiciones suaves para apertura/cierre de submenús

## Importación

```typescript
import { OpeniisSidebarComponent } from "./components/sidebar/sidebar.component";
```

## Estructura de Datos (MenuItem)

El componente funciona con un array de objetos que implementan la interfaz `MenuItem`:

```typescript
export interface MenuItem {
  route: string; // Ruta para la navegación
  name: string; // Texto a mostrar
  icon?: string; // (Opcional) Nombre del Material Icon
  submenu?: {
    title?: string; // (Opcional) Título para una sección del submenú
    items: SubmenuItem[]; // Array de sub-items
  }[];
}

export interface SubmenuItem {
  route?: string; // Ruta específica para este subitem (opcional, usa la ruta del padre si no se especifica)
  name: string; // Texto a mostrar
  icon?: string; // (Opcional) Nombre del Material Icon
  reference?: string; // (Opcional) ID del elemento al que navegar dentro de la página
  title?: string; // (Opcional) Título para una sección del submenú
}
```

## Uso Básico

Para usar el componente, pásale un array de `MenuItem` a través de su Input.

```html
<!-- en-tu-componente.html -->
<openiis-sidebar [menuItems]="menu"></openiis-sidebar>
```

```typescript
// en-tu-componente.ts
import { Component } from "@angular/core";
import { MenuItem } from "./sidebar/sidebar.component";

@Component({
  selector: "app-tu-componente",
  templateUrl: "./tu-componente.html",
})
export class TuComponente {
  menu: MenuItem[] = [
    {
      name: "Dashboard",
      route: "/dashboard",
      icon: "dashboard",
    },
    {
      name: "Documentación",
      route: "/docs",
      icon: "description",
      submenu: [
        {
          items: [
            { name: "Introducción", route: "/docs/intro" },
            { name: "Instalación", route: "/docs/setup", reference: "installation" },
            { name: "Configuración", route: "/docs/setup", reference: "configuration" },
          ],
        },
      ],
    },
    {
      name: "Configuración",
      route: "/configuracion",
      icon: "settings",
    },
  ];
}
```

## Propiedades (Inputs)

| Propiedad           | Tipo         | Por Defecto   | Descripción                                                          |
| ------------------- | ------------ | ------------- | -------------------------------------------------------------------- |
| `menuItems`         | `MenuItem[]` | `[]`          | **Requerido.** El array de objetos que define la estructura del menú |
| `accordionMode`     | `boolean`    | `true`        | Si es `true`, solo un submenú puede estar expandido a la vez         |
| `searchPlaceholder` | `string`     | `'Buscar...'` | Texto que se muestra en el campo de búsqueda                         |
| `searchVisible`     | `boolean`    | `true`        | Controla si el campo de búsqueda está visible                        |
| `collapsible`       | `boolean`    | `true`        | Si el sidebar puede colapsarse en desktop                            |
| `initialCollapsed`  | `boolean`    | `false`       | Estado inicial del sidebar (colapsado o expandido)                   |

## Eventos (Outputs)

| Evento           | Tipo                     | Descripción                                   |
| ---------------- | ------------------------ | --------------------------------------------- |
| `itemClick`      | `EventEmitter<MenuItem>` | Se emite cuando se hace clic en un ítem       |
| `submenuToggle`  | `EventEmitter<MenuItem>` | Se emite cuando se abre/cierra un submenú     |
| `searchChange`   | `EventEmitter<string>`   | Se emite cuando cambia el término de búsqueda |
| `toggleCollapse` | `EventEmitter<boolean>`  | Se emite cuando se colapsa/expande el sidebar |

## Comportamiento

### Búsqueda

- La búsqueda filtra los elementos principales y los sub-elementos que coincidan con el término introducido
- Los menús que contienen resultados de búsqueda se expanden automáticamente para mostrar las coincidencias
- Al limpiar la búsqueda, el menú vuelve a su estado original, respetando la ruta activa
- La búsqueda es insensible a mayúsculas y minúsculas
- Busca tanto en nombres como en títulos de secciones

### Navegación

- Hacer clic en un elemento sin submenú navega directamente a su `route`
- Hacer clic en un elemento con submenú expande o colapsa el submenú
- Si un subitem tiene una `reference`, al hacer clic se navegará primero a la ruta y luego se desplazará suavemente hasta el elemento con ese ID
- El componente detecta la ruta activa y las referencias visibles para mantener actualizado el estado de selección
- Soporte para navegación por teclado (Enter, Space, Arrow keys)

### Comportamiento Responsive y Body Scroll Lock

En dispositivos móviles (≤ 820px), el sidebar se convierte en un overlay que se desliza desde la izquierda. Para proporcionar una experiencia de usuario óptima:

**Funcionalidades automáticas:**

- **Body Scroll Lock:** Cuando el sidebar está abierto, el scroll del contenido de fondo se bloquea automáticamente
- **Preservación de posición:** La posición actual del scroll se preserva y restaura cuando se cierra el sidebar
- **Gestión de eventos:** Maneja automáticamente cambios de tamaño de pantalla y destrucción del componente
- **Scroll interno:** Solo el contenido del sidebar puede hacer scroll cuando está abierto
- **Overlay:** Fondo semi-transparente para enfocar la atención en el sidebar

**Ventajas:**

- ❌ **Sin scroll propagation:** Evita que el scroll dentro del sidebar se propague al contenido de fondo
- ❌ **Sin bounce effects:** Previene efectos de rebote no deseados en iOS
- ✅ **UX fluida:** Mantiene el foco del usuario en el sidebar sin distracciones
- ✅ **Sin dependencias externas:** Implementación pura en CSS y TypeScript
- ✅ **Universal:** Funciona en cualquier aplicación sin requerir configuración en componentes padre

Esta funcionalidad se activa automáticamente sin requerir configuración adicional, proporcionando una experiencia móvil profesional sin esfuerzo del desarrollador.

## Ejemplos Detallados

### Menú Básico

```typescript
basicMenu: MenuItem[] = [
  {
    name: 'Inicio',
    route: '/inicio',
    icon: 'home'
  },
  {
    name: 'Productos',
    route: '/productos',
    icon: 'inventory'
  },
  {
    name: 'Contacto',
    route: '/contacto',
    icon: 'contact_mail'
  },
];
```

### Menú con Referencias

Este ejemplo muestra un menú que incluye navegación a secciones específicas dentro de una página:

```typescript
menuConReferencias: MenuItem[] = [
  { name: 'Inicio', route: '/inicio', icon: 'home' },
  {
    name: 'Guía de Usuario',
    route: '/guia',
    icon: 'book',
    submenu: [
      {
        title: 'Primeros Pasos',
        items: [
          { name: 'Introducción', route: '/guia', reference: 'intro' },
          { name: 'Requisitos', route: '/guia', reference: 'requisitos' },
          { name: 'Instalación', route: '/guia', reference: 'instalacion' },
        ],
      },
      {
        title: 'Configuración',
        items: [
          { name: 'Variables de Entorno', route: '/guia/config', reference: 'env-vars' },
          { name: 'Base de Datos', route: '/guia/config', reference: 'database' },
        ],
      },
    ],
  },
];
```

Para que la navegación a referencias funcione correctamente, asegúrate de que los elementos en tu página tengan los IDs correspondientes:

```html
<div id="intro">
  <h2>Introducción</h2>
  <!-- contenido -->
</div>

<div id="requisitos">
  <h2>Requisitos del Sistema</h2>
  <!-- contenido -->
</div>

<div id="instalacion">
  <h2>Guía de Instalación</h2>
  <!-- contenido -->
</div>
```

### Menú de Administración

```typescript
adminMenu: MenuItem[] = [
  {
    name: 'Dashboard',
    route: '/admin/dashboard',
    icon: 'dashboard'
  },
  {
    name: 'Gestión de Usuarios',
    route: '/admin/users',
    icon: 'people',
    submenu: [
      {
        title: 'Usuarios',
        items: [
          { name: 'Lista de Usuarios', route: '/admin/users/list' },
          { name: 'Crear Usuario', route: '/admin/users/create' },
          { name: 'Roles y Permisos', route: '/admin/users/roles' },
        ]
      },
      {
        title: 'Seguridad',
        items: [
          { name: 'Sesiones Activas', route: '/admin/users/sessions' },
          { name: 'Logs de Acceso', route: '/admin/users/logs' },
        ]
      }
    ]
  },
  {
    name: 'Contenido',
    route: '/admin/content',
    icon: 'article',
    submenu: [
      {
        items: [
          { name: 'Páginas', route: '/admin/content/pages' },
          { name: 'Blog', route: '/admin/content/blog' },
          { name: 'Multimedia', route: '/admin/content/media' },
        ]
      }
    ]
  },
  {
    name: 'Configuración',
    route: '/admin/settings',
    icon: 'settings',
    submenu: [
      {
        title: 'General',
        items: [
          { name: 'Información Básica', route: '/admin/settings', reference: 'basic-info' },
          { name: 'Preferencias', route: '/admin/settings', reference: 'preferences' },
        ]
      },
      {
        title: 'Avanzado',
        items: [
          { name: 'Base de Datos', route: '/admin/settings/database' },
          { name: 'API Keys', route: '/admin/settings/api' },
          { name: 'Logs del Sistema', route: '/admin/settings/logs' },
        ]
      }
    ]
  }
];
```

### Sidebar con Eventos

```typescript
@Component({
  template: `
    <openiis-sidebar
      [menuItems]="menuItems"
      [accordionMode]="accordionMode"
      [searchVisible]="showSearch"
      (itemClick)="onItemClick($event)"
      (submenuToggle)="onSubmenuToggle($event)"
      (searchChange)="onSearchChange($event)"
      (toggleCollapse)="onToggleCollapse($event)">
    </openiis-sidebar>
  `
})
export class MySidebarComponent {
  menuItems: MenuItem[] = [...];
  accordionMode = true;
  showSearch = true;

  onItemClick(item: MenuItem) {
    console.log('Item clicked:', item.name);
    // Lógica personalizada para clicks en items
    this.analytics.track('sidebar_item_click', {
      item: item.name,
      route: item.route
    });
  }

  onSubmenuToggle(item: MenuItem) {
    console.log('Submenu toggled:', item.name);
    // Lógica para apertura/cierre de submenús
  }

  onSearchChange(searchTerm: string) {
    console.log('Search term:', searchTerm);
    // Lógica para tracking de búsquedas
    if (searchTerm.length > 2) {
      this.analytics.track('sidebar_search', { term: searchTerm });
    }
  }

  onToggleCollapse(isCollapsed: boolean) {
    console.log('Sidebar collapsed:', isCollapsed);
    // Guardar preferencia del usuario
    localStorage.setItem('sidebar-collapsed', isCollapsed.toString());
  }
}
```

## Personalización CSS

```css
/* Variables CSS personalizables */
.sidebar {
  --sidebar-width: 280px;
  --sidebar-collapsed-width: 60px;
  --sidebar-bg: var(--color-surface);
  --sidebar-border: var(--color-border);
  --sidebar-text: var(--color-text-primary);
  --sidebar-text-secondary: var(--color-text-secondary);
  --sidebar-hover-bg: var(--color-surface-hover);
  --sidebar-active-bg: var(--color-primary-50);
  --sidebar-active-text: var(--color-primary-600);
  --sidebar-transition: all 0.3s ease;
  --sidebar-z-index: 1000;
}

/* Personalización para modo oscuro */
[data-theme="dark"] .sidebar {
  --sidebar-bg: var(--color-surface-dark);
  --sidebar-border: var(--color-border-dark);
  --sidebar-text: var(--color-text-primary-dark);
  --sidebar-hover-bg: var(--color-surface-hover-dark);
  --sidebar-active-bg: var(--color-primary-900);
}

/* Responsive breakpoints */
@media (max-width: 820px) {
  .sidebar {
    --sidebar-mobile-overlay-bg: rgba(0, 0, 0, 0.5);
    --sidebar-mobile-transform: translateX(-100%);
  }
}
```

## Integración con Servicios

### Scroll Service Integration

```typescript
import { ScrollService } from "../services/scroll.service";

@Component({
  selector: "app-layout",
  template: `
    <openiis-sidebar [menuItems]="menuItems" (toggleCollapse)="onSidebarToggle($event)"> </openiis-sidebar>

    <main class="main-content">
      <router-outlet></router-outlet>
    </main>
  `,
})
export class LayoutComponent {
  constructor(private scrollService: ScrollService) {}

  onSidebarToggle(isCollapsed: boolean) {
    // En móvil, gestionar el scroll automáticamente
    if (window.innerWidth <= 820) {
      if (!isCollapsed) {
        this.scrollService.lockBodyScroll();
      } else {
        this.scrollService.unlockBodyScroll();
      }
    }
  }
}
```

### Router Integration

```typescript
import { Router, NavigationEnd } from '@angular/router';
import { filter } from 'rxjs/operators';

@Component({
  selector: 'app-sidebar-container',
  template: `
    <openiis-sidebar
      [menuItems]="menuItems"
      (itemClick)="onNavigate($event)">
    </openiis-sidebar>
  `
})
export class SidebarContainerComponent implements OnInit {
  menuItems: MenuItem[] = [...];

  constructor(private router: Router) {}

  ngOnInit() {
    // Escuchar cambios de ruta para actualizar estado activo
    this.router.events
      .pipe(filter(event => event instanceof NavigationEnd))
      .subscribe((event: NavigationEnd) => {
        this.updateActiveState(event.url);
      });
  }

  onNavigate(item: MenuItem) {
    // Navegación personalizada con animaciones
    this.router.navigate([item.route], {
      replaceUrl: false,
      state: {
        animation: 'slide-left',
        source: 'sidebar'
      }
    });
  }

  private updateActiveState(currentUrl: string) {
    // Lógica para actualizar el estado activo basado en la URL actual
    // El componente maneja esto automáticamente, pero puedes añadir lógica personalizada aquí
  }
}
```

## Casos de Uso Avanzados

### Sidebar Dinámico Basado en Permisos

```typescript
@Component({
  template: ` <openiis-sidebar [menuItems]="filteredMenuItems"></openiis-sidebar> `,
})
export class PermissionBasedSidebarComponent implements OnInit {
  private fullMenuItems: MenuItem[] = [
    { name: "Dashboard", route: "/dashboard", icon: "dashboard" },
    {
      name: "Admin Only",
      route: "/admin",
      icon: "admin_panel_settings",
      meta: { requiredPermission: "admin" },
    },
    // más items...
  ];

  filteredMenuItems: MenuItem[] = [];

  constructor(private authService: AuthService, private permissionService: PermissionService) {}

  ngOnInit() {
    this.authService.user$.subscribe((user) => {
      this.filteredMenuItems = this.filterMenuByPermissions(this.fullMenuItems, user?.permissions || []);
    });
  }

  private filterMenuByPermissions(items: MenuItem[], permissions: string[]): MenuItem[] {
    return items
      .filter((item) => {
        if (item.meta?.requiredPermission) {
          return permissions.includes(item.meta.requiredPermission);
        }
        return true;
      })
      .map((item) => ({
        ...item,
        submenu: item.submenu
          ?.map((section) => ({
            ...section,
            items: this.filterSubmenuByPermissions(section.items, permissions),
          }))
          .filter((section) => section.items.length > 0),
      }));
  }

  private filterSubmenuByPermissions(items: SubmenuItem[], permissions: string[]): SubmenuItem[] {
    return items.filter((item) => {
      if (item.meta?.requiredPermission) {
        return permissions.includes(item.meta.requiredPermission);
      }
      return true;
    });
  }
}
```

### Sidebar con Estado Persistente

```typescript
@Component({
  template: `
    <openiis-sidebar
      [menuItems]="menuItems"
      [accordionMode]="accordionMode"
      [initialCollapsed]="initialCollapsed"
      (toggleCollapse)="saveCollapseState($event)"
      (submenuToggle)="saveSubmenuState($event)">
    </openiis-sidebar>
  `
})
export class PersistentSidebarComponent implements OnInit {
  menuItems: MenuItem[] = [...];
  accordionMode = true;
  initialCollapsed = false;

  ngOnInit() {
    // Restaurar estado desde localStorage
    this.initialCollapsed = localStorage.getItem('sidebar-collapsed') === 'true';
    this.accordionMode = localStorage.getItem('sidebar-accordion') !== 'false';

    // Restaurar estado de submenús expandidos
    this.restoreSubmenuStates();
  }

  saveCollapseState(isCollapsed: boolean) {
    localStorage.setItem('sidebar-collapsed', isCollapsed.toString());
  }

  saveSubmenuState(item: MenuItem) {
    const expandedSubmenus = JSON.parse(
      localStorage.getItem('sidebar-expanded-submenus') || '[]'
    );

    const index = expandedSubmenus.indexOf(item.route);
    if (index > -1) {
      expandedSubmenus.splice(index, 1);
    } else {
      expandedSubmenus.push(item.route);
    }

    localStorage.setItem(
      'sidebar-expanded-submenus',
      JSON.stringify(expandedSubmenus)
    );
  }

  private restoreSubmenuStates() {
    const expandedSubmenus = JSON.parse(
      localStorage.getItem('sidebar-expanded-submenus') || '[]'
    );

    // Lógica para expandir submenús basado en el estado guardado
    // Esto se puede implementar pasando información adicional al componente
  }
}
```

## Accesibilidad

- ✅ **Roles ARIA**: `navigation`, `menu`, `menuitem`, `menubar`
- ✅ **Propiedades ARIA**: `aria-expanded`, `aria-current`, `aria-label`, `aria-describedby`
- ✅ **Navegación por teclado**: Tab, Enter, Space, Arrow keys, Escape
- ✅ **Estados**: Soporte para estados expanded, collapsed, active, disabled
- ✅ **Lectores de pantalla**: Anuncios claros de cambios de estado y navegación
- ✅ **Focus management**: Gestión correcta del foco y trap de foco en móvil
- ✅ **Contraste**: Cumple con WCAG 2.1 AA en todos los estados y variantes
- ✅ **Semántica**: Estructura HTML semánticamente correcta

## Mejores Prácticas

1. **Estructura lógica**: Organizar elementos de menú de forma jerárquica y lógica
2. **Límite de profundidad**: No exceder 3 niveles de anidación para mejor UX
3. **Iconos consistentes**: Usar iconos de la misma familia (Material Icons)
4. **Labels descriptivos**: Usar nombres claros y descriptivos para items de menú
5. **Referencias útiles**: Usar referencias solo para secciones importantes de las páginas
6. **Performance**: Evitar menus muy grandes (>50 items) que afecten rendimiento
7. **Responsive**: Considerar siempre el comportamiento en dispositivos móviles
8. **Persistencia**: Guardar preferencias del usuario para mejor experiencia

## Troubleshooting

### El sidebar no se muestra correctamente en móvil

- Verificar que el CSS del proyecto no tenga conflictos con `position: fixed`
- Asegurar que no hay `z-index` superiores que interfieran

### Las referencias no funcionan

- Verificar que los elementos de destino tienen los IDs correctos
- Confirmar que los elementos están presentes en el DOM cuando se navega

### El scroll lock no funciona

- Verificar que el `ScrollService` está correctamente inyectado
- Confirmar que no hay estilos CSS que anulen el comportamiento

### Problemas de rendimiento con menus grandes

- Considerar implementar virtualización para menús con >100 items
- Usar `trackBy` functions en `*ngFor` si hay actualizaciones frecuentes
- Implementar lazy loading para submenús pesados

## Dependencias

- `@angular/common` - Para directivas comunes
- `@angular/core` - Para funcionalidad del componente
- `@angular/router` - Para navegación y detección de rutas activas
- `rxjs` - Para manejo de eventos y observables
- `OpeniisSearchInputComponent` - Componente de búsqueda integrado
- `ScrollService` - Para gestión del scroll en móvil (integración automática)

## Notas de Implementación

- ✅ **Standalone Component**: No requiere módulos adicionales para funcionar
- ✅ **OnPush Change Detection**: Optimizado para rendimiento con detección de cambios eficiente
- ✅ **Responsive Design**: Comportamiento adaptativo automático según tamaño de pantalla
- ✅ **SSR Compatible**: Funciona correctamente en Server-Side Rendering
- ✅ **Memory Management**: Gestión automática de suscripciones y cleanup
- ✅ **Event Handling**: Manejo robusto de eventos de teclado y mouse
- ✅ **State Management**: Gestión inteligente de estados de menú y submenús
- ✅ **Performance Optimized**: Técnicas de optimización para menus grandes
