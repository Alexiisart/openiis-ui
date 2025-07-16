# Openiis Tabs Component

El `OpeniisTabsComponent` permite organizar y mostrar contenido en pestañas interactivas, proporcionando una interfaz de usuario clara y fácil de navegar para alternar entre diferentes secciones de contenido.

## Características

- ✅ **4 variantes visuales**: line, pills, cards, buttons
- ✅ **3 tamaños**: sm, md, lg
- ✅ **Navegación scrolleable**: Para cuando hay muchas pestañas
- ✅ **Badges**: Para mostrar notificaciones en pestañas
- ✅ **Iconos**: Soporte para Material Icons
- ✅ **Estados**: Active, disabled
- ✅ **Accesibilidad**: ARIA completo, navegación por teclado
- ✅ **Content Projection**: Contenido flexible con ng-content
- ✅ **Responsive**: Adaptable a diferentes dispositivos

## Importación

```typescript
import { OpeniisTabsComponent } from "./components/tabs/tabs.component";
```

## Uso Básico

```html
<openiis-tabs [tabs]="tabItems" (tabChange)="onTabChange($event)">
  <div slot="tab1">
    <h3>Contenido de la Pestaña 1</h3>
    <p>Este es el contenido de la primera pestaña.</p>
  </div>

  <div slot="tab2">
    <h3>Contenido de la Pestaña 2</h3>
    <p>Este es el contenido de la segunda pestaña.</p>
  </div>

  <div slot="tab3">
    <h3>Contenido de la Pestaña 3</h3>
    <p>Este es el contenido de la tercera pestaña.</p>
  </div>
</openiis-tabs>
```

```typescript
export class MyComponent {
  tabItems: TabItem[] = [
    { id: "tab1", label: "Pestaña 1", active: true },
    { id: "tab2", label: "Pestaña 2" },
    { id: "tab3", label: "Pestaña 3" },
  ];

  onTabChange(tabId: string) {
    console.log("Tab changed:", tabId);
  }
}
```

## Propiedades

| Propiedad | Tipo          | Valor por defecto | Descripción                     |
| --------- | ------------- | ----------------- | ------------------------------- |
| `variant` | `TabsVariant` | `'line'`          | Variante visual de las pestañas |
| `size`    | `TabsSize`    | `'md'`            | Tamaño de las pestañas          |
| `tabs`    | `TabItem[]`   | `[]`              | Lista de pestañas               |

## Eventos

| Evento      | Tipo                   | Descripción                              |
| ----------- | ---------------------- | ---------------------------------------- |
| `tabChange` | `EventEmitter<string>` | Se emite cuando cambia la pestaña activa |

## Interfaces

### TabItem

```typescript
interface TabItem {
  id: string; // Identificador único
  label: string; // Texto a mostrar
  active?: boolean; // Si está activa
  disabled?: boolean; // Si está deshabilitada
  icon?: string; // Material Icon name
  badge?: string | number; // Badge de notificación
  tooltip?: string; // Tooltip de la pestaña
}
```

## Tipos

```typescript
type TabsVariant = "line" | "pills" | "cards" | "buttons";
type TabsSize = "sm" | "md" | "lg";
```

## Ejemplos de Uso

### Variantes Visuales

```html
<!-- Line (por defecto) -->
<openiis-tabs [tabs]="tabs" variant="line"></openiis-tabs>

<!-- Pills -->
<openiis-tabs [tabs]="tabs" variant="pills"></openiis-tabs>

<!-- Cards -->
<openiis-tabs [tabs]="tabs" variant="cards"></openiis-tabs>

<!-- Buttons -->
<openiis-tabs [tabs]="tabs" variant="buttons"></openiis-tabs>
```

### Tamaños

```html
<!-- Pequeño -->
<openiis-tabs [tabs]="tabs" size="sm"></openiis-tabs>

<!-- Mediano (por defecto) -->
<openiis-tabs [tabs]="tabs" size="md"></openiis-tabs>

<!-- Grande -->
<openiis-tabs [tabs]="tabs" size="lg"></openiis-tabs>
```

### Con Iconos

```typescript
tabsWithIcons: TabItem[] = [
  {
    id: 'dashboard',
    label: 'Dashboard',
    icon: 'dashboard',
    active: true
  },
  {
    id: 'users',
    label: 'Usuarios',
    icon: 'people'
  },
  {
    id: 'settings',
    label: 'Configuración',
    icon: 'settings'
  }
];
```

```html
<openiis-tabs [tabs]="tabsWithIcons" (tabChange)="onTabChange($event)">
  <!-- Contenido de las pestañas -->
</openiis-tabs>
```

### Con Badges

```typescript
tabsWithBadges: TabItem[] = [
  {
    id: 'inbox',
    label: 'Bandeja',
    badge: 5,
    active: true
  },
  {
    id: 'sent',
    label: 'Enviados',
    badge: 'New'
  },
  {
    id: 'draft',
    label: 'Borradores',
    badge: 3
  }
];
```

### Pestañas con Estados

```typescript
tabsWithStates: TabItem[] = [
  {
    id: 'active',
    label: 'Activa',
    active: true
  },
  {
    id: 'normal',
    label: 'Normal'
  },
  {
    id: 'disabled',
    label: 'Deshabilitada',
    disabled: true
  }
];
```

### Con Tooltips

```typescript
tabsWithTooltips: TabItem[] = [
  {
    id: 'tab1',
    label: 'Inicio',
    tooltip: 'Página principal',
    active: true
  },
  {
    id: 'tab2',
    label: 'Config',
    tooltip: 'Configuración del sistema'
  }
];
```

## Casos de Uso Comunes

### Panel de Administración

```typescript
@Component({
  template: `
    <openiis-tabs [tabs]="adminTabs" variant="line" size="md" (tabChange)="onAdminTabChange($event)">
      <div slot="dashboard">
        <app-dashboard></app-dashboard>
      </div>

      <div slot="users">
        <app-user-management></app-user-management>
      </div>

      <div slot="settings">
        <app-settings></app-settings>
      </div>
    </openiis-tabs>
  `,
})
export class AdminPanelComponent {
  adminTabs: TabItem[] = [
    {
      id: "dashboard",
      label: "Dashboard",
      icon: "dashboard",
      active: true,
    },
    {
      id: "users",
      label: "Usuarios",
      icon: "people",
      badge: 12,
    },
    {
      id: "settings",
      label: "Configuración",
      icon: "settings",
    },
  ];

  onAdminTabChange(tabId: string) {
    switch (tabId) {
      case "dashboard":
        this.loadDashboardData();
        break;
      case "users":
        this.loadUserData();
        break;
      case "settings":
        this.loadSettings();
        break;
    }
  }
}
```

### Perfil de Usuario

```typescript
@Component({
  template: `
    <openiis-tabs [tabs]="profileTabs" variant="pills" size="lg" (tabChange)="onProfileTabChange($event)">
      <div slot="profile">
        <app-profile-info [user]="currentUser"></app-profile-info>
      </div>

      <div slot="security">
        <app-security-settings [user]="currentUser"></app-security-settings>
      </div>

      <div slot="notifications">
        <app-notification-settings [user]="currentUser"></app-notification-settings>
      </div>
    </openiis-tabs>
  `,
})
export class UserProfileComponent {
  profileTabs: TabItem[] = [
    {
      id: "profile",
      label: "Perfil",
      icon: "person",
      active: true,
    },
    {
      id: "security",
      label: "Seguridad",
      icon: "security",
    },
    {
      id: "notifications",
      label: "Notificaciones",
      icon: "notifications",
      badge: 3,
    },
  ];

  onProfileTabChange(tabId: string) {
    this.analytics.track("profile_tab_viewed", { tab: tabId });
  }
}
```

### Detalles de Producto

```typescript
@Component({
  template: `
    <openiis-tabs [tabs]="productTabs" variant="cards" (tabChange)="onProductTabChange($event)">
      <div slot="description">
        <app-product-description [product]="product"></app-product-description>
      </div>

      <div slot="specifications">
        <app-product-specs [product]="product"></app-product-specs>
      </div>

      <div slot="reviews">
        <app-product-reviews [product]="product"></app-product-reviews>
      </div>
    </openiis-tabs>
  `,
})
export class ProductDetailComponent {
  productTabs: TabItem[] = [
    {
      id: "description",
      label: "Descripción",
      active: true,
    },
    {
      id: "specifications",
      label: "Especificaciones",
    },
    {
      id: "reviews",
      label: "Reseñas",
      badge: this.product?.reviewCount || 0,
    },
  ];

  onProductTabChange(tabId: string) {
    if (tabId === "reviews") {
      this.loadReviews();
    }
  }
}
```

## Navegación Scrolleable

El componente incluye automáticamente scroll horizontal cuando hay muchas pestañas:

```css
.tabs-nav-scroll {
  overflow-x: auto;
  scrollbar-width: thin;
  -webkit-overflow-scrolling: touch;
}
```

Esto permite manejar cualquier cantidad de pestañas sin romper el diseño.

## Accesibilidad

- ✅ **Roles ARIA**: `tablist`, `tab`, `tabpanel`
- ✅ **Propiedades ARIA**: `aria-selected`, `aria-controls`, `aria-labelledby`
- ✅ **Navegación por teclado**: Arrow keys, Home, End
- ✅ **Estados**: Soporte para estados disabled y active
- ✅ **Lectores de pantalla**: Anuncios claros de cambios de estado
- ✅ **Focus management**: Gestión correcta del foco
- ✅ **Contraste**: Cumple con WCAG 2.1 AA

## Personalización CSS

```css
.tabs {
  /* Variables CSS personalizables */
  --tabs-nav-bg: var(--color-background);
  --tabs-nav-border: var(--color-border);
  --tabs-tab-color: var(--color-text-secondary);
  --tabs-tab-active-color: var(--color-primary-600);
  --tabs-tab-hover-bg: var(--color-surface-hover);
  --tabs-tab-active-bg: var(--color-primary-50);
  --tabs-tab-padding: 12px 16px;
  --tabs-border-radius: var(--radius-lg);
  --tabs-content-padding: var(--space-4);
  --tabs-transition: all 0.2s ease;
}

/* Personalización por variante */
.tabs-line {
  --tabs-active-border-color: var(--color-primary-500);
  --tabs-active-border-width: 2px;
}

.tabs-pills {
  --tabs-pill-border-radius: var(--radius-full);
  --tabs-pill-active-bg: var(--color-primary-500);
  --tabs-pill-active-color: white;
}

.tabs-cards {
  --tabs-card-bg: var(--color-surface);
  --tabs-card-border: var(--color-border);
  --tabs-card-active-bg: var(--color-background);
  --tabs-card-shadow: var(--shadow-sm);
}
```

## Mejores Prácticas

1. **Límite de pestañas**: No exceder 7 pestañas visibles para UX óptima
2. **Etiquetas claras**: Usar nombres descriptivos y concisos
3. **Contenido relevante**: Agrupar contenido relacionado lógicamente
4. **Estados apropiados**: Usar `disabled` para pestañas no disponibles
5. **Badges informativos**: Usar badges para indicar cantidad de elementos o estados
6. **Responsive**: Considerar comportamiento en dispositivos móviles
7. **Accesibilidad**: Siempre incluir tooltips para pestañas con iconos solamente

## Notas de Implementación

- ✅ **Standalone Component**: No requiere módulos adicionales
- ✅ **Content Projection**: Uso de ng-content para flexibilidad
- ✅ **Scroll automático**: Manejo inteligente de pestañas que exceden el ancho
- ✅ **Gestión de estados**: Control automático de pestañas activas
- ✅ **Optimizado**: Detección de cambios eficiente
- ✅ **Responsive**: Adaptación automática a diferentes tamaños
- ✅ **Marcado semántico**: HTML semánticamente correcto para SEO
- ✅ **Event handling**: Gestión segura de eventos y cambios de estado
