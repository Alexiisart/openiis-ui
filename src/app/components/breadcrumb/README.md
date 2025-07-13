# Breadcrumb Component

El componente Breadcrumb proporciona navegación jerárquica que muestra la ubicación actual del usuario dentro de la estructura del sitio web, permitiendo una navegación fácil hacia niveles superiores.

## Características

- **5 variantes**: default, pills, arrows, slash, dots
- **3 tamaños**: sm, md, lg
- **6 tipos de separadores**: chevron, slash, arrow, dot, pipe, custom
- **Elementos interactivos**: Enlaces clickeables y elementos estáticos
- **Iconos**: Soporte para iconos personalizados y icono de inicio
- **Overflow**: Menú de desbordamiento para breadcrumbs largos
- **Responsive**: Comportamiento adaptativo en dispositivos móviles
- **Truncación**: Acortamiento automático de etiquetas largas
- **Accesibilidad**: ARIA completo, navegación por teclado
- **Métodos públicos**: Control programático de elementos
- **Tooltips**: Información adicional en elementos

## Uso Básico

```html
<app-breadcrumb [items]="breadcrumbItems" variant="default" size="md" separator="chevron" (itemClick)="onBreadcrumbClick($event)"> </app-breadcrumb>
```

```typescript
export class MyComponent {
  breadcrumbItems: BreadcrumbItem[] = [
    { label: "Inicio", url: "/", icon: "fas fa-home" },
    { label: "Productos", url: "/products" },
    { label: "Electrónicos", url: "/products/electronics" },
    { label: "Smartphones", active: true },
  ];

  onBreadcrumbClick(event: any) {
    console.log("Breadcrumb clicked:", event.item);
  }
}
```

## Propiedades

| Propiedad         | Tipo                  | Valor por defecto | Descripción                                   |
| ----------------- | --------------------- | ----------------- | --------------------------------------------- |
| `variant`         | `BreadcrumbVariant`   | `'default'`       | Variante visual del breadcrumb                |
| `size`            | `BreadcrumbSize`      | `'md'`            | Tamaño del breadcrumb                         |
| `separator`       | `BreadcrumbSeparator` | `'chevron'`       | Tipo de separador                             |
| `customSeparator` | `string`              | `'>'`             | Separador personalizado                       |
| `items`           | `BreadcrumbItem[]`    | `[]`              | Lista de elementos del breadcrumb             |
| `showHome`        | `boolean`             | `true`            | Mostrar icono de inicio en el primer elemento |
| `maxItems`        | `number`              | `0`               | Número máximo de elementos (0 = sin límite)   |
| `showOverflow`    | `boolean`             | `true`            | Mostrar menú de desbordamiento                |
| `ariaLabel`       | `string`              | `'Breadcrumb'`    | Etiqueta ARIA para navegación                 |
| `responsive`      | `boolean`             | `true`            | Comportamiento responsive                     |
| `truncateLength`  | `number`              | `0`               | Longitud máxima de etiquetas (0 = sin límite) |
| `customClass`     | `string`              | `undefined`       | Clases CSS adicionales                        |

## Eventos

| Evento              | Tipo                                 | Descripción                                          |
| ------------------- | ------------------------------------ | ---------------------------------------------------- |
| `itemClick`         | `EventEmitter<BreadcrumbClickEvent>` | Se emite cuando se hace clic en un elemento          |
| `overflowItemClick` | `EventEmitter<BreadcrumbClickEvent>` | Se emite cuando se hace clic en elemento de overflow |

## Interfaces

### BreadcrumbItem

```typescript
interface BreadcrumbItem {
  label: string; // Texto a mostrar
  url?: string; // URL del enlace
  icon?: string; // Clase CSS del icono
  active?: boolean; // Si es el elemento activo
  disabled?: boolean; // Si está deshabilitado
  clickable?: boolean; // Si es clickeable (por defecto true si tiene url)
  tooltip?: string; // Tooltip del elemento
  data?: any; // Datos adicionales
}
```

### BreadcrumbClickEvent

```typescript
interface BreadcrumbClickEvent {
  item: BreadcrumbItem; // Elemento clickeado
  index: number; // Índice del elemento
  event: MouseEvent; // Evento del mouse
}
```

## Tipos

```typescript
type BreadcrumbVariant = "default" | "pills" | "arrows" | "slash" | "dots";
type BreadcrumbSize = "sm" | "md" | "lg";
type BreadcrumbSeparator = "chevron" | "slash" | "arrow" | "dot" | "pipe" | "custom";
```

## Métodos Públicos

| Método                                                           | Descripción                        |
| ---------------------------------------------------------------- | ---------------------------------- |
| `addItem(item: BreadcrumbItem): void`                            | Agregar un elemento al final       |
| `removeItem(index: number): void`                                | Eliminar un elemento por índice    |
| `updateItem(index: number, item: Partial<BreadcrumbItem>): void` | Actualizar un elemento             |
| `clearItems(): void`                                             | Limpiar todos los elementos        |
| `getActiveItem(): BreadcrumbItem \| null`                        | Obtener el elemento activo         |
| `setActiveItem(index: number): void`                             | Establecer un elemento como activo |

## Ejemplos de Uso

### Variantes

```html
<!-- Default -->
<app-breadcrumb [items]="items" variant="default"></app-breadcrumb>

<!-- Pills -->
<app-breadcrumb [items]="items" variant="pills"></app-breadcrumb>

<!-- Arrows -->
<app-breadcrumb [items]="items" variant="arrows"></app-breadcrumb>

<!-- Slash -->
<app-breadcrumb [items]="items" variant="slash"></app-breadcrumb>

<!-- Dots -->
<app-breadcrumb [items]="items" variant="dots"></app-breadcrumb>
```

### Tamaños

```html
<!-- Pequeño -->
<app-breadcrumb [items]="items" size="sm"></app-breadcrumb>

<!-- Mediano -->
<app-breadcrumb [items]="items" size="md"></app-breadcrumb>

<!-- Grande -->
<app-breadcrumb [items]="items" size="lg"></app-breadcrumb>
```

### Separadores

```html
<!-- Chevron -->
<app-breadcrumb [items]="items" separator="chevron"></app-breadcrumb>

<!-- Slash -->
<app-breadcrumb [items]="items" separator="slash"></app-breadcrumb>

<!-- Arrow -->
<app-breadcrumb [items]="items" separator="arrow"></app-breadcrumb>

<!-- Dot -->
<app-breadcrumb [items]="items" separator="dot"></app-breadcrumb>

<!-- Pipe -->
<app-breadcrumb [items]="items" separator="pipe"></app-breadcrumb>

<!-- Custom -->
<app-breadcrumb [items]="items" separator="custom" customSeparator="→"></app-breadcrumb>
```

### Con Iconos

```typescript
breadcrumbItems: BreadcrumbItem[] = [
  { label: 'Inicio', url: '/', icon: 'fas fa-home' },
  { label: 'Usuarios', url: '/users', icon: 'fas fa-users' },
  { label: 'Perfil', url: '/users/profile', icon: 'fas fa-user' },
  { label: 'Configuración', active: true, icon: 'fas fa-cog' }
];
```

### Con Límite de Elementos

```html
<app-breadcrumb [items]="longBreadcrumbItems" [maxItems]="4" showOverflow="true" (itemClick)="onItemClick($event)" (overflowItemClick)="onOverflowItemClick($event)"> </app-breadcrumb>
```

### Con Truncación

```html
<app-breadcrumb [items]="itemsWithLongLabels" [truncateLength]="20"> </app-breadcrumb>
```

### Elementos Deshabilitados

```typescript
breadcrumbItems: BreadcrumbItem[] = [
  { label: 'Inicio', url: '/' },
  { label: 'Sección Privada', disabled: true, tooltip: 'No tienes permisos' },
  { label: 'Página Actual', active: true }
];
```

### Sin Icono de Inicio

```html
<app-breadcrumb [items]="items" [showHome]="false"> </app-breadcrumb>
```

### Con Navegación Programática

```typescript
@Component({
  template: `
    <app-breadcrumb #breadcrumb [items]="breadcrumbItems" (itemClick)="onBreadcrumbClick($event)"> </app-breadcrumb>

    <div class="breadcrumb-controls">
      <button (click)="addBreadcrumbItem()">Agregar Elemento</button>
      <button (click)="removeBreadcrumbItem()">Eliminar Último</button>
      <button (click)="clearBreadcrumb()">Limpiar</button>
    </div>
  `,
})
export class BreadcrumbExample {
  @ViewChild("breadcrumb") breadcrumb!: BreadcrumbComponent;

  breadcrumbItems: BreadcrumbItem[] = [
    { label: "Inicio", url: "/" },
    { label: "Productos", url: "/products" },
  ];

  addBreadcrumbItem() {
    this.breadcrumb.addItem({
      label: "Nuevo Elemento",
      url: "/new-item",
      active: true,
    });
  }

  removeBreadcrumbItem() {
    if (this.breadcrumbItems.length > 0) {
      this.breadcrumb.removeItem(this.breadcrumbItems.length - 1);
    }
  }

  clearBreadcrumb() {
    this.breadcrumb.clearItems();
  }

  onBreadcrumbClick(event: any) {
    console.log("Navegando a:", event.item.url);
    // Implementar navegación
  }
}
```

## Casos de Uso Comunes

### E-commerce

```typescript
@Component({
  template: ` <app-breadcrumb [items]="productBreadcrumb" variant="default" size="md" (itemClick)="navigateToCategory($event)"> </app-breadcrumb> `,
})
export class ProductPageComponent {
  productBreadcrumb: BreadcrumbItem[] = [
    { label: "Inicio", url: "/", icon: "fas fa-home" },
    { label: "Tienda", url: "/shop", icon: "fas fa-store" },
    { label: "Electrónicos", url: "/shop/electronics" },
    { label: "Smartphones", url: "/shop/electronics/smartphones" },
    { label: "iPhone 15", active: true },
  ];

  navigateToCategory(event: any) {
    if (event.item.url) {
      this.router.navigate([event.item.url]);
    }
  }
}
```

### Panel de Administración

```typescript
@Component({
  template: ` <app-breadcrumb [items]="adminBreadcrumb" variant="pills" size="sm" separator="arrow" (itemClick)="onAdminNavigation($event)"> </app-breadcrumb> `,
})
export class AdminPanelComponent {
  adminBreadcrumb: BreadcrumbItem[] = [
    { label: "Dashboard", url: "/admin", icon: "fas fa-tachometer-alt" },
    { label: "Usuarios", url: "/admin/users", icon: "fas fa-users" },
    { label: "Gestión", url: "/admin/users/management" },
    { label: "Editar Usuario", active: true },
  ];

  onAdminNavigation(event: any) {
    // Implementar navegación con verificación de permisos
    this.permissionService.checkAccess(event.item.url).then((hasAccess) => {
      if (hasAccess) {
        this.router.navigate([event.item.url]);
      } else {
        this.showAccessDeniedMessage();
      }
    });
  }
}
```

### Documentación

```typescript
@Component({
  template: ` <app-breadcrumb [items]="docsBreadcrumb" variant="slash" separator="slash" [maxItems]="5" showOverflow="true"> </app-breadcrumb> `,
})
export class DocumentationComponent {
  docsBreadcrumb: BreadcrumbItem[] = [
    { label: "Documentación", url: "/docs", icon: "fas fa-book" },
    { label: "Guías", url: "/docs/guides" },
    { label: "Desarrollo", url: "/docs/guides/development" },
    { label: "Componentes", url: "/docs/guides/development/components" },
    { label: "Breadcrumb", active: true },
  ];
}
```

### Gestión de Archivos

```typescript
@Component({
  template: ` <app-breadcrumb [items]="folderBreadcrumb" variant="arrows" size="md" (itemClick)="navigateToFolder($event)"> </app-breadcrumb> `,
})
export class FileManagerComponent {
  folderBreadcrumb: BreadcrumbItem[] = [
    { label: "Archivos", url: "/files", icon: "fas fa-folder" },
    { label: "Documentos", url: "/files/documents" },
    { label: "Proyectos", url: "/files/documents/projects" },
    { label: "Mi Proyecto", active: true },
  ];

  navigateToFolder(event: any) {
    if (event.item.url) {
      this.fileService.navigateToFolder(event.item.url);
      this.loadFolderContents(event.item.url);
    }
  }
}
```

## Integración con Angular Router

```typescript
@Component({
  template: ` <app-breadcrumb [items]="routeBreadcrumb" (itemClick)="onRouteNavigation($event)"> </app-breadcrumb> `,
})
export class RouteAwareBreadcrumbComponent implements OnInit {
  routeBreadcrumb: BreadcrumbItem[] = [];

  constructor(private router: Router, private route: ActivatedRoute) {}

  ngOnInit() {
    this.router.events.pipe(filter((event) => event instanceof NavigationEnd)).subscribe(() => {
      this.generateBreadcrumbFromRoute();
    });
  }

  generateBreadcrumbFromRoute() {
    const breadcrumbs: BreadcrumbItem[] = [];
    let currentRoute = this.route.root;

    while (currentRoute.firstChild) {
      currentRoute = currentRoute.firstChild;

      if (currentRoute.snapshot.data["breadcrumb"]) {
        breadcrumbs.push({
          label: currentRoute.snapshot.data["breadcrumb"],
          url: this.getRouteUrl(currentRoute),
          active: !currentRoute.firstChild,
        });
      }
    }

    this.routeBreadcrumb = breadcrumbs;
  }

  getRouteUrl(route: ActivatedRoute): string {
    return route.pathFromRoot
      .map((r) => r.url.map((segment) => segment.path).join("/"))
      .join("/")
      .replace(/\/+/g, "/");
  }

  onRouteNavigation(event: any) {
    if (event.item.url) {
      this.router.navigate([event.item.url]);
    }
  }
}
```

## Estilos CSS Personalizables

```css
.breadcrumb {
  --breadcrumb-font-size: 0.875rem;
  --breadcrumb-color: var(--color-text-secondary);
  --breadcrumb-active-color: var(--color-text-primary);
  --breadcrumb-link-color: var(--color-primary-600);
  --breadcrumb-link-hover-bg: var(--color-primary-50);
  --breadcrumb-separator-color: var(--color-text-muted);
  --breadcrumb-padding: 4px 8px;
  --breadcrumb-border-radius: 4px;
  --breadcrumb-gap: 4px;
}

/* Personalización para variante pills */
.breadcrumb-pills {
  --breadcrumb-pill-bg: var(--color-neutral-100);
  --breadcrumb-pill-active-bg: var(--color-primary-500);
  --breadcrumb-pill-radius: 16px;
  --breadcrumb-pill-padding: 6px 12px;
}

/* Personalización para variante arrows */
.breadcrumb-arrows {
  --breadcrumb-arrow-bg: var(--color-neutral-100);
  --breadcrumb-arrow-active-bg: var(--color-primary-500);
  --breadcrumb-arrow-padding: 8px 16px;
}
```

## Accesibilidad

- **Navegación semántica**: Usa elementos `<nav>` y `<ol>` apropiados
- **Roles ARIA**: `navigation`, `list`, `listitem`
- **Propiedades ARIA**: `aria-label`, `aria-current`, `aria-expanded`
- **Navegación por teclado**: Tab, Enter, Space, Escape
- **Lectores de pantalla**: Anuncios claros de la ubicación actual
- **Contraste**: Cumple con WCAG 2.1 AA
- **Focus management**: Indicadores de foco visibles

## Mejores Prácticas

1. **Jerarquía clara**: Mantener una estructura lógica y consistente
2. **Etiquetas descriptivas**: Usar nombres claros y concisos
3. **Límite de elementos**: No exceder 7 elementos para mejor UX
4. **Responsive**: Considerar comportamiento en dispositivos móviles
5. **Performance**: Evitar re-renderizados innecesarios
6. **Accesibilidad**: Siempre incluir etiquetas ARIA apropiadas
7. **Navegación**: Proporcionar enlaces funcionales cuando sea apropiado

## Notas de Implementación

- Compatible con Angular Router
- Soporte para rutas dinámicas
- Manejo automático de estados activos
- Gestión de overflow inteligente
- Optimizado para SEO con marcado semántico
- Incluye animaciones suaves opcionales
- Soporta tanto navegación interna como externa

## Dependencias

- `@angular/common` - Para directivas comunes
- `@angular/core` - Para funcionalidad del componente
- `@angular/router` - Para navegación (opcional)
- FontAwesome - Para iconos (recomendado)
