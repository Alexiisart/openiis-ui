# Table Component

El componente Table es una solución completa para mostrar y manipular datos tabulares con funcionalidades avanzadas como ordenamiento, filtrado, paginación y selección de filas.

## Características

- **6 variantes**: default, striped, bordered, hoverable, compact, spacious
- **3 tamaños**: sm, md, lg
- **Ordenamiento**: Por columnas con indicadores visuales
- **Filtrado**: Por columnas con múltiples tipos de filtros
- **Búsqueda global**: En todas las columnas
- **Paginación**: Completa con opciones de tamaño de página
- **Selección**: Individual y múltiple con checkbox
- **Estados de carga**: Spinner integrado
- **Estado vacío**: Mensaje personalizable
- **Accesibilidad**: ARIA completo, navegación por teclado
- **Responsive**: Adaptable a dispositivos móviles
- **Sticky header**: Encabezado fijo opcional
- **Columnas sticky**: Columnas fijas
- **Renderizado personalizado**: Para contenido de celdas
- **Clases personalizadas**: Para filas y celdas
- **Eventos completos**: Para todas las interacciones

## Uso Básico

```typescript
import { TableComponent, TableColumn } from "./components/table";

@Component({
  selector: "app-example",
  template: ` <app-table [columns]="columns" [data]="data" [loading]="loading" sortable filterable searchable paginated selectable (rowClick)="onRowClick($event)" (selectionChange)="onSelectionChange($event)"> </app-table> `,
})
export class ExampleComponent {
  columns: TableColumn[] = [
    { key: "id", label: "ID", sortable: true },
    { key: "name", label: "Nombre", sortable: true, filterable: true },
    { key: "email", label: "Email", sortable: true, filterable: true },
    {
      key: "status",
      label: "Estado",
      filterable: true,
      filterType: "select",
      filterOptions: [
        { value: "active", label: "Activo" },
        { value: "inactive", label: "Inactivo" },
      ],
    },
    {
      key: "actions",
      label: "Acciones",
      render: (value, row) => `
      <button onclick="editUser(${row.id})">Editar</button>
      <button onclick="deleteUser(${row.id})">Eliminar</button>
    `,
    },
  ];

  data = [
    { id: 1, name: "Juan Pérez", email: "juan@example.com", status: "active" },
    { id: 2, name: "María García", email: "maria@example.com", status: "inactive" },
    // ... más datos
  ];

  onRowClick(event: any) {
    console.log("Fila clickeada:", event.row);
  }

  onSelectionChange(selection: any) {
    console.log("Selección cambiada:", selection.selectedRows);
  }
}
```

## Propiedades

### Propiedades Básicas

| Propiedad  | Tipo            | Valor por defecto | Descripción                 |
| ---------- | --------------- | ----------------- | --------------------------- |
| `variant`  | `TableVariant`  | `'default'`       | Variante visual de la tabla |
| `size`     | `TableSize`     | `'md'`            | Tamaño de la tabla          |
| `columns`  | `TableColumn[]` | `[]`              | Configuración de columnas   |
| `data`     | `any[]`         | `[]`              | Datos a mostrar             |
| `loading`  | `boolean`       | `false`           | Estado de carga             |
| `title`    | `string`        | `undefined`       | Título de la tabla          |
| `subtitle` | `string`        | `undefined`       | Subtítulo de la tabla       |

### Propiedades de Funcionalidad

| Propiedad      | Tipo      | Valor por defecto | Descripción                    |
| -------------- | --------- | ----------------- | ------------------------------ |
| `selectable`   | `boolean` | `false`           | Habilitar selección de filas   |
| `sortable`     | `boolean` | `true`            | Habilitar ordenamiento         |
| `filterable`   | `boolean` | `false`           | Habilitar filtros por columna  |
| `searchable`   | `boolean` | `false`           | Habilitar búsqueda global      |
| `paginated`    | `boolean` | `false`           | Habilitar paginación           |
| `showHeader`   | `boolean` | `true`            | Mostrar encabezado de la tabla |
| `showFilters`  | `boolean` | `true`            | Mostrar filtros                |
| `stickyHeader` | `boolean` | `false`           | Encabezado fijo                |
| `responsive`   | `boolean` | `true`            | Tabla responsive               |

### Propiedades de Paginación

| Propiedad         | Tipo       | Valor por defecto   | Descripción                  |
| ----------------- | ---------- | ------------------- | ---------------------------- |
| `pageSize`        | `number`   | `10`                | Elementos por página         |
| `pageSizeOptions` | `number[]` | `[10, 25, 50, 100]` | Opciones de tamaño de página |

### Propiedades de Estado Vacío

| Propiedad         | Tipo     | Valor por defecto        | Descripción                      |
| ----------------- | -------- | ------------------------ | -------------------------------- |
| `emptyIcon`       | `string` | `'inbox'`                | Icono del estado vacío           |
| `emptyTitle`      | `string` | `'No hay datos'`         | Título del estado vacío          |
| `emptyMessage`    | `string` | `'No se encontraron...'` | Mensaje del estado vacío         |
| `emptyButtonText` | `string` | `undefined`              | Texto del botón del estado vacío |

### Propiedades Avanzadas

| Propiedad         | Tipo       | Valor por defecto | Descripción                                 |
| ----------------- | ---------- | ----------------- | ------------------------------------------- |
| `rowKey`          | `string`   | `'id'`            | Clave única para identificar filas          |
| `maxHeight`       | `string`   | `undefined`       | Altura máxima de la tabla                   |
| `customRowClass`  | `function` | `undefined`       | Función para clases personalizadas de fila  |
| `customCellClass` | `function` | `undefined`       | Función para clases personalizadas de celda |

## Eventos

| Evento            | Tipo                           | Descripción                                |
| ----------------- | ------------------------------ | ------------------------------------------ |
| `rowClick`        | `EventEmitter<RowClickEvent>`  | Se emite cuando se hace clic en una fila   |
| `rowDoubleClick`  | `EventEmitter<RowClickEvent>`  | Se emite al hacer doble clic en una fila   |
| `selectionChange` | `EventEmitter<TableSelection>` | Se emite cuando cambia la selección        |
| `sortChange`      | `EventEmitter<TableSort>`      | Se emite cuando cambia el ordenamiento     |
| `filterChange`    | `EventEmitter<TableFilter[]>`  | Se emite cuando cambian los filtros        |
| `searchChange`    | `EventEmitter<string>`         | Se emite cuando cambia la búsqueda         |
| `pageChange`      | `EventEmitter<number>`         | Se emite cuando cambia la página           |
| `pageSizeChange`  | `EventEmitter<number>`         | Se emite cuando cambia el tamaño de página |
| `emptyAction`     | `EventEmitter<void>`           | Se emite al hacer clic en el botón vacío   |

## Interfaces

### TableColumn

```typescript
interface TableColumn {
  key: string; // Clave de la propiedad en los datos
  label: string; // Etiqueta a mostrar
  sortable?: boolean; // Si es ordenable
  filterable?: boolean; // Si es filtrable
  filterType?: FilterType; // Tipo de filtro
  filterOptions?: FilterOption[]; // Opciones para filtros select
  width?: string; // Ancho de la columna
  minWidth?: string; // Ancho mínimo
  maxWidth?: string; // Ancho máximo
  align?: "left" | "center" | "right"; // Alineación
  sticky?: boolean; // Si es sticky
  render?: (value: any, row: any, index: number) => string; // Función de renderizado
  className?: string; // Clase CSS para la columna
  headerClassName?: string; // Clase CSS para el encabezado
  cellClassName?: string; // Clase CSS para las celdas
}
```

### TableFilter

```typescript
interface TableFilter {
  column: string; // Columna a filtrar
  value: any; // Valor del filtro
  operator?: "equals" | "contains" | "startsWith" | "endsWith" | "gt" | "lt" | "gte" | "lte";
}
```

### TableSort

```typescript
interface TableSort {
  column: string; // Columna a ordenar
  direction: "asc" | "desc" | "none"; // Dirección del ordenamiento
}
```

### TableSelection

```typescript
interface TableSelection {
  selectedRows: any[]; // Filas seleccionadas
  selectAll: boolean; // Si están todas seleccionadas
  indeterminate: boolean; // Estado indeterminado
}
```

## Tipos

```typescript
type TableVariant = "default" | "striped" | "bordered" | "hoverable" | "compact" | "spacious";
type TableSize = "sm" | "md" | "lg";
type SortDirection = "asc" | "desc" | "none";
type FilterType = "text" | "select" | "date" | "number" | "boolean";
```

## Ejemplos de Uso

### Tabla Básica

```html
<app-table [columns]="basicColumns" [data]="basicData" variant="default" size="md"> </app-table>
```

### Tabla con Todas las Funcionalidades

```html
<app-table [columns]="fullColumns" [data]="fullData" variant="striped" size="md" title="Lista de Usuarios" subtitle="Gestión de usuarios del sistema" sortable filterable searchable paginated selectable [pageSize]="25" [pageSizeOptions]="[10, 25, 50, 100]" (rowClick)="onRowClick($event)" (selectionChange)="onSelectionChange($event)" (sortChange)="onSortChange($event)" (filterChange)="onFilterChange($event)">
  <!-- Acciones personalizadas -->
  <div slot="actions">
    <button class="btn btn-primary">Agregar Usuario</button>
    <button class="btn btn-secondary">Exportar</button>
  </div>
</app-table>
```

### Tabla con Renderizado Personalizado

```typescript
columns: TableColumn[] = [
  { key: 'id', label: 'ID', sortable: true },
  { key: 'name', label: 'Nombre', sortable: true, filterable: true },
  {
    key: 'avatar',
    label: 'Avatar',
    render: (value, row) => `
      <img src="${value}" alt="${row.name}" class="avatar-img" />
    `
  },
  {
    key: 'status',
    label: 'Estado',
    filterable: true,
    filterType: 'select',
    filterOptions: [
      { value: 'active', label: 'Activo' },
      { value: 'inactive', label: 'Inactivo' }
    ],
    render: (value) => `
      <span class="badge badge-${value === 'active' ? 'success' : 'danger'}">
        ${value === 'active' ? 'Activo' : 'Inactivo'}
      </span>
    `
  },
  {
    key: 'actions',
    label: 'Acciones',
    render: (value, row) => `
      <button class="btn btn-sm btn-primary" onclick="editUser(${row.id})">
        <i class="fas fa-edit"></i>
      </button>
      <button class="btn btn-sm btn-danger" onclick="deleteUser(${row.id})">
        <i class="fas fa-trash"></i>
      </button>
    `
  }
];
```

### Tabla con Clases Personalizadas

```typescript
// Clase personalizada para filas
customRowClass = (row: any, index: number): string => {
  if (row.status === "inactive") return "row-inactive";
  if (row.priority === "high") return "row-high-priority";
  return "";
};

// Clase personalizada para celdas
customCellClass = (column: TableColumn, row: any, value: any): string => {
  if (column.key === "amount" && value < 0) return "cell-negative";
  if (column.key === "status" && value === "error") return "cell-error";
  return "";
};
```

### Tabla con Columnas Sticky

```typescript
columns: TableColumn[] = [
  { key: 'id', label: 'ID', sortable: true, sticky: true, width: '80px' },
  { key: 'name', label: 'Nombre', sortable: true, filterable: true, sticky: true },
  { key: 'email', label: 'Email', sortable: true, filterable: true, width: '200px' },
  { key: 'phone', label: 'Teléfono', width: '150px' },
  { key: 'address', label: 'Dirección', width: '250px' },
  { key: 'city', label: 'Ciudad', width: '120px' },
  { key: 'country', label: 'País', width: '120px' },
  { key: 'actions', label: 'Acciones', width: '120px' }
];
```

### Tabla con Filtros Avanzados

```typescript
columns: TableColumn[] = [
  { key: 'id', label: 'ID', sortable: true },
  { key: 'name', label: 'Nombre', sortable: true, filterable: true, filterType: 'text' },
  {
    key: 'department',
    label: 'Departamento',
    filterable: true,
    filterType: 'select',
    filterOptions: [
      { value: 'engineering', label: 'Ingeniería' },
      { value: 'marketing', label: 'Marketing' },
      { value: 'sales', label: 'Ventas' },
      { value: 'hr', label: 'Recursos Humanos' }
    ]
  },
  { key: 'salary', label: 'Salario', sortable: true, filterable: true, filterType: 'number' },
  { key: 'joinDate', label: 'Fecha de Ingreso', sortable: true, filterable: true, filterType: 'date' }
];
```

### Manejo de Eventos

```typescript
onRowClick(event: { row: any; index: number; event: MouseEvent }) {
  console.log('Fila clickeada:', event.row);
  // Navegar a detalle del usuario
  this.router.navigate(['/users', event.row.id]);
}

onSelectionChange(selection: TableSelection) {
  console.log('Filas seleccionadas:', selection.selectedRows);
  this.selectedUsers = selection.selectedRows;

  // Habilitar/deshabilitar acciones masivas
  this.enableBulkActions = selection.selectedRows.length > 0;
}

onSortChange(sort: TableSort) {
  console.log('Ordenamiento cambiado:', sort);
  // Actualizar URL con parámetros de ordenamiento
  this.router.navigate([], {
    queryParams: {
      sort: sort.column,
      direction: sort.direction
    }
  });
}

onFilterChange(filters: TableFilter[]) {
  console.log('Filtros cambiados:', filters);
  // Actualizar URL con parámetros de filtros
  const filterParams = filters.reduce((acc, filter) => {
    acc[`filter_${filter.column}`] = filter.value;
    return acc;
  }, {} as any);

  this.router.navigate([], { queryParams: filterParams });
}
```

## Casos de Uso Comunes

### Lista de Usuarios

```typescript
@Component({
  template: `
    <app-table [columns]="userColumns" [data]="users" [loading]="loading" title="Usuarios" subtitle="Gestión de usuarios del sistema" sortable filterable searchable paginated selectable (rowClick)="viewUser($event)" (selectionChange)="onSelectionChange($event)">
      <div slot="actions">
        <button class="btn btn-primary" (click)="addUser()"><i class="fas fa-plus"></i> Agregar Usuario</button>
      </div>
    </app-table>
  `,
})
export class UsersComponent {
  userColumns: TableColumn[] = [
    { key: "id", label: "ID", sortable: true, width: "80px" },
    { key: "name", label: "Nombre", sortable: true, filterable: true },
    { key: "email", label: "Email", sortable: true, filterable: true },
    {
      key: "role",
      label: "Rol",
      filterable: true,
      filterType: "select",
      filterOptions: [
        { value: "admin", label: "Administrador" },
        { value: "user", label: "Usuario" },
        { value: "moderator", label: "Moderador" },
      ],
    },
    { key: "lastLogin", label: "Último Acceso", sortable: true },
    {
      key: "actions",
      label: "Acciones",
      render: (value, row) => `
        <button class="btn btn-sm btn-primary" onclick="editUser(${row.id})">
          Editar
        </button>
      `,
    },
  ];
}
```

### Tabla de Productos

```typescript
@Component({
  template: ` <app-table [columns]="productColumns" [data]="products" [loading]="loading" variant="striped" title="Inventario" subtitle="Gestión de productos" sortable filterable searchable paginated [pageSize]="20" [customRowClass]="getRowClass" [customCellClass]="getCellClass"> </app-table> `,
})
export class ProductsComponent {
  productColumns: TableColumn[] = [
    { key: "sku", label: "SKU", sortable: true, width: "100px" },
    { key: "name", label: "Producto", sortable: true, filterable: true },
    { key: "category", label: "Categoría", filterable: true, filterType: "select" },
    { key: "price", label: "Precio", sortable: true, align: "right" },
    { key: "stock", label: "Stock", sortable: true, align: "right" },
    {
      key: "status",
      label: "Estado",
      filterable: true,
      filterType: "select",
      render: (value) => `
        <span class="badge badge-${value === "active" ? "success" : "warning"}">
          ${value === "active" ? "Activo" : "Inactivo"}
        </span>
      `,
    },
  ];

  getRowClass = (row: any): string => {
    if (row.stock <= 0) return "row-out-of-stock";
    if (row.stock < 10) return "row-low-stock";
    return "";
  };

  getCellClass = (column: TableColumn, row: any, value: any): string => {
    if (column.key === "stock" && value <= 0) return "cell-danger";
    if (column.key === "stock" && value < 10) return "cell-warning";
    return "";
  };
}
```

## Estilos CSS Personalizables

```css
.table-container {
  --table-border-color: #e2e8f0;
  --table-header-bg: #f8fafc;
  --table-row-hover-bg: #f1f5f9;
  --table-selected-bg: #dbeafe;
  --table-cell-padding: 12px 16px;
  --table-border-radius: 8px;
  --table-shadow: 0 1px 3px rgba(0, 0, 0, 0.1);
}

/* Clases personalizadas para filas */
.row-inactive {
  opacity: 0.6;
  background-color: #f3f4f6;
}

.row-high-priority {
  border-left: 4px solid #ef4444;
}

.row-out-of-stock {
  background-color: #fef2f2;
}

.row-low-stock {
  background-color: #fefce8;
}

/* Clases personalizadas para celdas */
.cell-negative {
  color: #ef4444;
  font-weight: 600;
}

.cell-error {
  background-color: #fef2f2;
  color: #dc2626;
}

.cell-danger {
  color: #dc2626;
  font-weight: 600;
}

.cell-warning {
  color: #d97706;
  font-weight: 600;
}

/* Avatar en tabla */
.avatar-img {
  width: 32px;
  height: 32px;
  border-radius: 50%;
  object-fit: cover;
}

/* Badges */
.badge {
  padding: 4px 8px;
  border-radius: 4px;
  font-size: 0.75rem;
  font-weight: 500;
}

.badge-success {
  background-color: #dcfce7;
  color: #166534;
}

.badge-danger {
  background-color: #fef2f2;
  color: #dc2626;
}

.badge-warning {
  background-color: #fefce8;
  color: #ca8a04;
}
```

## Accesibilidad

- **Roles ARIA**: `table`, `row`, `cell`, `columnheader`
- **Propiedades ARIA**: `aria-sort`, `aria-selected`, `aria-label`
- **Navegación por teclado**: Tab, Enter, Space, Arrow keys
- **Lectores de pantalla**: Anuncios de cambios de estado
- **Alto contraste**: Soporte para modo alto contraste
- **Etiquetas descriptivas**: Para todos los elementos interactivos

## Mejores Prácticas

1. **Optimización de rendimiento**: Use `trackBy` para listas grandes
2. **Paginación**: Siempre paginar datos grandes (>100 elementos)
3. **Filtros**: Proporcionar filtros relevantes para el contenido
4. **Accesibilidad**: Siempre incluir etiquetas ARIA apropiadas
5. **Responsive**: Considerar comportamiento en dispositivos móviles
6. **Estados de carga**: Mostrar estados de carga apropiados
7. **Mensajes de estado**: Proporcionar mensajes claros para estados vacíos

## Dependencias

- `@angular/common` - Para directivas comunes
- `@angular/core` - Para funcionalidad del componente
- `@angular/forms` - Para formularios
- `OpeniisCheckboxComponent` - Para selección
- `OpeniisInputComponent` - Para filtros y búsqueda
- `OpeniisButtonComponent` - Para acciones
- `OpeniisSpinnerComponent` - Para estados de carga
- `OpeniisEmptyStateComponent` - Para estados vacíos

## Notas de Implementación

- La tabla procesa datos localmente por defecto
- Soporta paginación del lado del servidor con eventos
- Incluye optimizaciones para rendimiento con listas grandes
- Maneja automáticamente la actualización de la selección
- Proporciona funciones de utilidad para casos comunes
- Es completamente tipada con TypeScript
