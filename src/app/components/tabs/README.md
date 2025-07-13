# Tabs Component

El componente Tabs permite organizar y mostrar contenido en pestañas interactivas, proporcionando una interfaz de usuario clara y fácil de navegar para alternar entre diferentes secciones de contenido.

## Características

- **4 variantes**: line, pills, cards, buttons
- **4 posiciones**: top, bottom, left, right
- **3 tamaños**: sm, md, lg
- **5 opciones de justificación**: start, center, end, space-between, space-around
- **Pestañas scrolleables**: Para cuando hay muchas pestañas
- **Pestañas removibles**: Con botón de cerrar
- **Pestañas con badges**: Para mostrar notificaciones
- **Iconos**: Soporte para iconos en las pestañas
- **Lazy loading**: Carga perezosa del contenido
- **Accesibilidad**: ARIA completo, navegación por teclado
- **Animaciones**: Transiciones suaves entre pestañas
- **Responsive**: Adaptable a diferentes dispositivos
- **Métodos públicos**: Control programático completo

## Uso Básico

```html
<app-tabs [tabs]="tabItems" (tabChange)="onTabChange($event)">
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
</app-tabs>
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

| Propiedad                   | Tipo           | Valor por defecto | Descripción                              |
| --------------------------- | -------------- | ----------------- | ---------------------------------------- |
| `variant`                   | `TabsVariant`  | `'line'`          | Variante visual de las pestañas          |
| `position`                  | `TabsPosition` | `'top'`           | Posición de las pestañas                 |
| `size`                      | `TabsSize`     | `'md'`            | Tamaño de las pestañas                   |
| `justify`                   | `TabsJustify`  | `'start'`         | Justificación de las pestañas            |
| `tabs`                      | `TabItem[]`    | `[]`              | Lista de pestañas                        |
| `activeTab`                 | `string`       | `undefined`       | ID de la pestaña activa                  |
| `scrollable`                | `boolean`      | `false`           | Permitir scroll horizontal               |
| `allowAddTab`               | `boolean`      | `false`           | Mostrar botón para agregar pestañas      |
| `ariaLabel`                 | `string`       | `'Pestañas'`      | Etiqueta ARIA para navegación            |
| `destroyInactiveTabContent` | `boolean`      | `false`           | Destruir contenido de pestañas inactivas |
| `animation`                 | `boolean`      | `true`            | Habilitar animaciones                    |
| `customClass`               | `string`       | `undefined`       | Clases CSS adicionales                   |

## Eventos

| Evento        | Tipo                      | Descripción                                     |
| ------------- | ------------------------- | ----------------------------------------------- |
| `tabChange`   | `EventEmitter<string>`    | Se emite cuando cambia la pestaña activa        |
| `tabRemove`   | `EventEmitter<string>`    | Se emite cuando se elimina una pestaña          |
| `tabAdd`      | `EventEmitter<void>`      | Se emite cuando se hace clic en agregar pestaña |
| `tabsReorder` | `EventEmitter<TabItem[]>` | Se emite cuando se reordenan las pestañas       |

## Interfaces

### TabItem

```typescript
interface TabItem {
  id: string; // Identificador único
  label: string; // Texto a mostrar
  icon?: string; // Clase CSS del icono
  disabled?: boolean; // Si está deshabilitada
  removable?: boolean; // Si se puede eliminar
  badge?: string | number; // Badge de notificación
  tooltip?: string; // Tooltip de la pestaña
  active?: boolean; // Si está activa
  lazy?: boolean; // Si usa lazy loading
  data?: any; // Datos adicionales
}
```

## Tipos

```typescript
type TabsVariant = "line" | "pills" | "cards" | "buttons";
type TabsPosition = "top" | "bottom" | "left" | "right";
type TabsSize = "sm" | "md" | "lg";
type TabsJustify = "start" | "center" | "end" | "space-between" | "space-around";
```

## Métodos Públicos

| Método                                                      | Descripción                |
| ----------------------------------------------------------- | -------------------------- |
| `getActiveTab(): TabItem \| null`                           | Obtener la pestaña activa  |
| `getTab(tabId: string): TabItem \| null`                    | Obtener una pestaña por ID |
| `addTabItem(tab: TabItem): void`                            | Agregar una nueva pestaña  |
| `removeTabItem(tabId: string): void`                        | Eliminar una pestaña       |
| `updateTab(tabId: string, updates: Partial<TabItem>): void` | Actualizar una pestaña     |
| `moveTab(fromIndex: number, toIndex: number): void`         | Mover una pestaña          |
| `enableTab(tabId: string): void`                            | Habilitar una pestaña      |
| `disableTab(tabId: string): void`                           | Deshabilitar una pestaña   |

## Ejemplos de Uso

### Variantes

```html
<!-- Line (por defecto) -->
<app-tabs [tabs]="tabs" variant="line"></app-tabs>

<!-- Pills -->
<app-tabs [tabs]="tabs" variant="pills"></app-tabs>

<!-- Cards -->
<app-tabs [tabs]="tabs" variant="cards"></app-tabs>

<!-- Buttons -->
<app-tabs [tabs]="tabs" variant="buttons"></app-tabs>
```

### Posiciones

```html
<!-- Top (por defecto) -->
<app-tabs [tabs]="tabs" position="top"></app-tabs>

<!-- Bottom -->
<app-tabs [tabs]="tabs" position="bottom"></app-tabs>

<!-- Left -->
<app-tabs [tabs]="tabs" position="left"></app-tabs>

<!-- Right -->
<app-tabs [tabs]="tabs" position="right"></app-tabs>
```

### Tamaños

```html
<!-- Pequeño -->
<app-tabs [tabs]="tabs" size="sm"></app-tabs>

<!-- Mediano -->
<app-tabs [tabs]="tabs" size="md"></app-tabs>

<!-- Grande -->
<app-tabs [tabs]="tabs" size="lg"></app-tabs>
```

### Con Iconos

```typescript
tabsWithIcons: TabItem[] = [
  { id: 'dashboard', label: 'Dashboard', icon: 'fas fa-tachometer-alt', active: true },
  { id: 'users', label: 'Usuarios', icon: 'fas fa-users' },
  { id: 'settings', label: 'Configuración', icon: 'fas fa-cog' }
];
```

### Con Badges

```typescript
tabsWithBadges: TabItem[] = [
  { id: 'inbox', label: 'Bandeja', badge: 5 },
  { id: 'sent', label: 'Enviados', badge: 'New' },
  { id: 'draft', label: 'Borradores', badge: 3 }
];
```

### Pestañas Removibles

```typescript
removableTabs: TabItem[] = [
  { id: 'doc1', label: 'Documento 1', removable: true },
  { id: 'doc2', label: 'Documento 2', removable: true },
  { id: 'doc3', label: 'Documento 3', removable: true }
];
```

### Pestañas Scrolleables

```html
<app-tabs [tabs]="manyTabs" scrollable="true" (tabChange)="onTabChange($event)">
  <!-- Contenido de las pestañas -->
</app-tabs>
```

### Con Lazy Loading

```typescript
lazyTabs: TabItem[] = [
  { id: 'tab1', label: 'Pestaña 1', active: true },
  { id: 'tab2', label: 'Pestaña 2', lazy: true },
  { id: 'tab3', label: 'Pestaña 3', lazy: true }
];
```

### Pestañas Justificadas

```html
<!-- Centradas -->
<app-tabs [tabs]="tabs" justify="center"></app-tabs>

<!-- Espaciadas -->
<app-tabs [tabs]="tabs" justify="space-between"></app-tabs>

<!-- Al final -->
<app-tabs [tabs]="tabs" justify="end"></app-tabs>
```

### Con Agregación de Pestañas

```html
<app-tabs [tabs]="dynamicTabs" allowAddTab="true" (tabAdd)="onAddTab()" (tabRemove)="onRemoveTab($event)">
  <!-- Contenido -->
</app-tabs>
```

## Casos de Uso Comunes

### Panel de Administración

```typescript
@Component({
  template: `
    <app-tabs [tabs]="adminTabs" variant="line" size="md" (tabChange)="onAdminTabChange($event)">
      <div slot="dashboard">
        <app-dashboard></app-dashboard>
      </div>

      <div slot="users">
        <app-user-management></app-user-management>
      </div>

      <div slot="settings">
        <app-settings></app-settings>
      </div>
    </app-tabs>
  `,
})
export class AdminPanelComponent {
  adminTabs: TabItem[] = [
    { id: "dashboard", label: "Dashboard", icon: "fas fa-chart-line", active: true },
    { id: "users", label: "Usuarios", icon: "fas fa-users", badge: 12 },
    { id: "settings", label: "Configuración", icon: "fas fa-cog" },
  ];

  onAdminTabChange(tabId: string) {
    // Lógica específica para cada pestaña
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

### Editor de Código

```typescript
@Component({
  template: `
    <app-tabs [tabs]="openFiles" variant="cards" scrollable="true" allowAddTab="true" (tabChange)="onFileChange($event)" (tabRemove)="onFileClose($event)" (tabAdd)="onNewFile()">
      <div *ngFor="let file of openFiles" [slot]="file.id">
        <app-code-editor [file]="file"></app-code-editor>
      </div>
    </app-tabs>
  `,
})
export class CodeEditorComponent {
  openFiles: TabItem[] = [
    {
      id: "file1",
      label: "index.html",
      icon: "fab fa-html5",
      removable: true,
      active: true,
    },
    {
      id: "file2",
      label: "styles.css",
      icon: "fab fa-css3",
      removable: true,
    },
  ];

  onFileChange(fileId: string) {
    this.currentFile = this.openFiles.find((f) => f.id === fileId);
  }

  onFileClose(fileId: string) {
    this.openFiles = this.openFiles.filter((f) => f.id !== fileId);
  }

  onNewFile() {
    const newFile: TabItem = {
      id: `file${Date.now()}`,
      label: "untitled.txt",
      removable: true,
      active: true,
    };
    this.openFiles.push(newFile);
  }
}
```

### Perfil de Usuario

```typescript
@Component({
  template: `
    <app-tabs [tabs]="profileTabs" variant="pills" position="left" size="lg" (tabChange)="onProfileTabChange($event)">
      <div slot="profile">
        <app-profile-info [user]="currentUser"></app-profile-info>
      </div>

      <div slot="security">
        <app-security-settings [user]="currentUser"></app-security-settings>
      </div>

      <div slot="notifications">
        <app-notification-settings [user]="currentUser"></app-notification-settings>
      </div>
    </app-tabs>
  `,
})
export class UserProfileComponent {
  profileTabs: TabItem[] = [
    { id: "profile", label: "Perfil", icon: "fas fa-user", active: true },
    { id: "security", label: "Seguridad", icon: "fas fa-shield-alt" },
    { id: "notifications", label: "Notificaciones", icon: "fas fa-bell", badge: 3 },
  ];

  onProfileTabChange(tabId: string) {
    this.analytics.track("profile_tab_viewed", { tab: tabId });
  }
}
```

### Tienda en Línea

```typescript
@Component({
  template: `
    <app-tabs [tabs]="productTabs" variant="line" justify="center" (tabChange)="onProductTabChange($event)">
      <div slot="description">
        <app-product-description [product]="product"></app-product-description>
      </div>

      <div slot="specifications">
        <app-product-specs [product]="product"></app-product-specs>
      </div>

      <div slot="reviews">
        <app-product-reviews [product]="product"></app-product-reviews>
      </div>
    </app-tabs>
  `,
})
export class ProductDetailComponent {
  productTabs: TabItem[] = [
    { id: "description", label: "Descripción", active: true },
    { id: "specifications", label: "Especificaciones" },
    { id: "reviews", label: "Reseñas", badge: this.product.reviewCount },
  ];

  onProductTabChange(tabId: string) {
    if (tabId === "reviews") {
      this.loadReviews();
    }
  }
}
```

## Control Programático

```typescript
@Component({
  template: `
    <app-tabs #tabsRef [tabs]="programmableTabs" (tabChange)="onTabChange($event)">
      <!-- Contenido -->
    </app-tabs>

    <div class="tab-controls">
      <button (click)="addNewTab()">Agregar Pestaña</button>
      <button (click)="removeCurrentTab()">Eliminar Actual</button>
      <button (click)="moveTabLeft()">Mover Izquierda</button>
      <button (click)="moveTabRight()">Mover Derecha</button>
    </div>
  `,
})
export class ProgrammableTabsComponent {
  @ViewChild("tabsRef") tabsRef!: TabsComponent;

  programmableTabs: TabItem[] = [
    { id: "tab1", label: "Tab 1", active: true },
    { id: "tab2", label: "Tab 2" },
    { id: "tab3", label: "Tab 3" },
  ];

  addNewTab() {
    const newTab: TabItem = {
      id: `tab${Date.now()}`,
      label: `Nueva Pestaña ${this.programmableTabs.length + 1}`,
      removable: true,
      active: true,
    };
    this.tabsRef.addTabItem(newTab);
  }

  removeCurrentTab() {
    const activeTab = this.tabsRef.getActiveTab();
    if (activeTab && activeTab.removable) {
      this.tabsRef.removeTabItem(activeTab.id);
    }
  }

  moveTabLeft() {
    const activeTab = this.tabsRef.getActiveTab();
    if (activeTab) {
      const currentIndex = this.programmableTabs.findIndex((t) => t.id === activeTab.id);
      if (currentIndex > 0) {
        this.tabsRef.moveTab(currentIndex, currentIndex - 1);
      }
    }
  }

  moveTabRight() {
    const activeTab = this.tabsRef.getActiveTab();
    if (activeTab) {
      const currentIndex = this.programmableTabs.findIndex((t) => t.id === activeTab.id);
      if (currentIndex < this.programmableTabs.length - 1) {
        this.tabsRef.moveTab(currentIndex, currentIndex + 1);
      }
    }
  }

  onTabChange(tabId: string) {
    console.log("Tab changed to:", tabId);
  }
}
```

## Estilos CSS Personalizables

```css
.tabs {
  --tabs-nav-bg: var(--color-background);
  --tabs-nav-border: var(--color-neutral-200);
  --tabs-tab-color: var(--color-text-secondary);
  --tabs-tab-active-color: var(--color-primary-600);
  --tabs-tab-hover-bg: var(--color-neutral-50);
  --tabs-tab-active-bg: var(--color-primary-50);
  --tabs-tab-padding: 12px 16px;
  --tabs-tab-border-radius: 4px;
  --tabs-content-padding: 20px;
  --tabs-animation-duration: 0.3s;
}

/* Personalización por variante */
.tabs-line {
  --tabs-active-border-color: var(--color-primary-500);
  --tabs-active-border-width: 2px;
}

.tabs-pills {
  --tabs-pill-border-radius: 20px;
  --tabs-pill-active-bg: var(--color-primary-500);
  --tabs-pill-active-color: white;
}

.tabs-cards {
  --tabs-card-bg: var(--color-neutral-100);
  --tabs-card-border: var(--color-neutral-200);
  --tabs-card-active-bg: var(--color-background);
  --tabs-card-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
}
```

## Accesibilidad

- **Roles ARIA**: `tablist`, `tab`, `tabpanel`
- **Propiedades ARIA**: `aria-selected`, `aria-controls`, `aria-labelledby`, `aria-hidden`
- **Navegación por teclado**: Arrow keys, Home, End, Delete
- **Estados**: Soporte para estados deshabilitados y activos
- **Lectores de pantalla**: Anuncios claros de cambios de estado
- **Focus management**: Gestión correcta del foco
- **Contraste**: Cumple con WCAG 2.1 AA

## Mejores Prácticas

1. **Etiquetas claras**: Usar nombres descriptivos y concisos
2. **Límite de pestañas**: No exceder 7 pestañas visibles
3. **Contenido relevante**: Agrupar contenido relacionado
4. **Estados apropiados**: Usar disabled para pestañas no disponibles
5. **Responsive**: Considerar comportamiento en móviles
6. **Lazy loading**: Usar para contenido pesado
7. **Accesibilidad**: Siempre incluir labels apropiados

## Notas de Implementación

- Soporta lazy loading para optimizar rendimiento
- Manejo automático de scroll para pestañas largas
- Animaciones suaves con respeto a preferencias de usuario
- Gestión inteligente de estados activos
- Optimizado para SEO con marcado semántico
- Incluye soporte para arrastrar y soltar (drag & drop)

## Dependencias

- `@angular/common` - Para directivas comunes
- `@angular/core` - Para funcionalidad del componente
- `rxjs` - Para manejo de eventos y observables
- FontAwesome - Para iconos (recomendado)
