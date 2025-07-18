# EmptyState Component

## Descripción

El componente `EmptyStateComponent` es un componente reutilizable que muestra un estado vacío personalizable. Ideal para mostrar cuando no hay datos disponibles, listas vacías, o resultados de búsqueda sin coincidencias.

## Características

- ✅ Icono personalizable de Material Icons
- ✅ Título y mensaje configurables
- ✅ Botón de acción opcional
- ✅ Múltiples tipos de botón
- ✅ Botón responsivo y full-width
- ✅ Completamente responsive
- ✅ Estilos predefinidos elegantes

## Uso Básico

```html
<app-empty-state icon="inbox" title="No hay elementos" message="No se encontraron elementos para mostrar."> </app-empty-state>
```

## Props

| Prop               | Tipo                                   | Defecto                                       | Descripción                       |
| ------------------ | -------------------------------------- | --------------------------------------------- | --------------------------------- |
| `icon`             | `string`                               | `'inbox'`                                     | Icono de Material Icons a mostrar |
| `title`            | `string`                               | `'No hay elementos'`                          | Título del estado vacío           |
| `message`          | `string`                               | `'No se encontraron elementos para mostrar.'` | Mensaje descriptivo               |
| `buttonText`       | `string`                               | `undefined`                                   | Texto del botón (opcional)        |
| `buttonType`       | `ButtonType`                           | `'primary'`                                   | Tipo del botón                    |
| `buttonSize`       | `'xs' \| 'sm' \| 'md' \| 'lg' \| 'xl'` | `'md'`                                        | Tamaño del botón                  |
| `buttonIcon`       | `string`                               | `undefined`                                   | Icono del botón (opcional)        |
| `buttonFullWidth`  | `boolean`                              | `false`                                       | Si el botón ocupa todo el ancho   |
| `buttonResponsive` | `boolean`                              | `true`                                        | Si el botón es responsivo         |

## Eventos

| Evento        | Tipo   | Descripción                             |
| ------------- | ------ | --------------------------------------- |
| `buttonClick` | `void` | Emitido cuando se hace clic en el botón |

## Ejemplos

### Estado vacío básico

```html
<app-empty-state icon="folder_open" title="Carpeta vacía" message="Esta carpeta no contiene archivos."> </app-empty-state>
```

### Con botón de acción

```html
<app-empty-state icon="add_circle_outline" title="No hay tareas" message="Aún no has creado ninguna tarea. ¡Comienza agregando tu primera tarea!" buttonText="Crear primera tarea" buttonType="primary" buttonIcon="add" (buttonClick)="createFirstTask()"> </app-empty-state>
```

### Lista de contactos vacía

```html
<app-empty-state icon="contacts" title="No hay contactos" message="Tu lista de contactos está vacía. Agrega tu primer contacto para comenzar." buttonText="Agregar contacto" buttonType="primary" buttonIcon="person_add" (buttonClick)="addContact()"> </app-empty-state>
```

### Resultados de búsqueda vacíos

```html
<app-empty-state icon="search_off" title="Sin resultados" message="No se encontraron resultados para tu búsqueda. Intenta con otros términos." buttonText="Limpiar búsqueda" buttonType="secondary" buttonIcon="clear" (buttonClick)="clearSearch()"> </app-empty-state>
```

### Carrito de compras vacío

```html
<app-empty-state icon="shopping_cart" title="Carrito vacío" message="Tu carrito de compras está vacío. Explora nuestros productos y encuentra algo que te guste." buttonText="Continuar comprando" buttonType="primary" buttonIcon="store" (buttonClick)="goToStore()"> </app-empty-state>
```

### Favoritos vacíos

```html
<app-empty-state icon="favorite_border" title="Sin favoritos" message="No has marcado ningún elemento como favorito aún." buttonText="Explorar contenido" buttonType="secondary" buttonIcon="explore" (buttonClick)="exploreContent()"> </app-empty-state>
```

## Ejemplos de Uso Común

### Lista de elementos vacía

```typescript
// En el componente
showEmptyState = true;
items: any[] = [];

ngOnInit() {
  this.loadItems();
}

loadItems() {
  this.itemService.getItems().subscribe(items => {
    this.items = items;
    this.showEmptyState = items.length === 0;
  });
}

createFirstItem() {
  this.router.navigate(['/create-item']);
}
```

```html
<!-- En el template -->
<div *ngIf="items.length > 0">
  <div *ngFor="let item of items">{{ item.name }}</div>
</div>

<app-empty-state *ngIf="showEmptyState" icon="inventory_2" title="No hay elementos" message="Aún no has creado ningún elemento. ¡Comienza agregando tu primer elemento!" buttonText="Crear elemento" buttonType="primary" buttonIcon="add" (buttonClick)="createFirstItem()"> </app-empty-state>
```

### Filtros sin resultados

```typescript
// En el componente
filteredItems: any[] = [];
searchTerm = '';

onSearch(term: string) {
  this.searchTerm = term;
  this.filteredItems = this.items.filter(item =>
    item.name.toLowerCase().includes(term.toLowerCase())
  );
}

clearSearch() {
  this.searchTerm = '';
  this.filteredItems = this.items;
}
```

```html
<app-empty-state *ngIf="filteredItems.length === 0 && searchTerm" icon="search_off" title="Sin resultados" message="No se encontraron elementos que coincidan con '{{ searchTerm }}'" buttonText="Limpiar búsqueda" buttonType="secondary" buttonIcon="clear" (buttonClick)="clearSearch()"> </app-empty-state>
```

### Error de conexión

```typescript
// En el componente
hasError = false;
isLoading = false;

loadData() {
  this.isLoading = true;
  this.hasError = false;

  this.dataService.getData().subscribe({
    next: (data) => {
      this.items = data;
      this.isLoading = false;
    },
    error: (error) => {
      this.hasError = true;
      this.isLoading = false;
    }
  });
}

retryLoad() {
  this.loadData();
}
```

```html
<app-empty-state *ngIf="hasError" icon="wifi_off" title="Error de conexión" message="No se pudo cargar la información. Verifica tu conexión a internet." buttonText="Reintentar" buttonType="primary" buttonIcon="refresh" (buttonClick)="retryLoad()"> </app-empty-state>
```

## Iconos Sugeridos

| Contexto                | Icono Sugerido    | Descripción              |
| ----------------------- | ----------------- | ------------------------ |
| Lista vacía             | `inbox`           | Bandeja de entrada vacía |
| Carpeta vacía           | `folder_open`     | Carpeta abierta          |
| Búsqueda sin resultados | `search_off`      | Búsqueda desactivada     |
| Carrito vacío           | `shopping_cart`   | Carrito de compras       |
| Favoritos vacíos        | `favorite_border` | Corazón vacío            |
| Contactos vacíos        | `contacts`        | Libro de contactos       |
| Tareas vacías           | `task_alt`        | Lista de tareas          |
| Archivos vacíos         | `description`     | Documento                |
| Fotos vacías            | `photo_library`   | Galería de fotos         |
| Error de conexión       | `wifi_off`        | WiFi desconectado        |
| Datos no encontrados    | `database`        | Base de datos            |
| Configuración vacía     | `settings`        | Configuración            |

## Tamaños de Botón

| Tamaño | Uso Recomendado                  |
| ------ | -------------------------------- |
| `xs`   | Espacios muy reducidos           |
| `sm`   | Botones secundarios              |
| `md`   | Uso general (defecto)            |
| `lg`   | Botones principales              |
| `xl`   | Llamadas a la acción importantes |

## Tipos de Botón

| Tipo        | Uso Recomendado        |
| ----------- | ---------------------- |
| `primary`   | Acción principal       |
| `secondary` | Acción secundaria      |
| `success`   | Acciones positivas     |
| `warning`   | Acciones de precaución |
| `danger`    | Acciones destructivas  |
| `info`      | Información adicional  |

## Responsive Design

El componente es completamente responsive:

- **Desktop**: Espaciado completo, iconos grandes
- **Tablet**: Espaciado moderado, iconos medianos
- **Mobile**: Espaciado compacto, iconos pequeños

## Dependencias

- `@angular/common`
- `ButtonComponent`
- Material Icons

## Estilos CSS

El componente incluye estilos CSS inline que soportan:

- Centrado automático del contenido
- Iconos escalables
- Tipografía responsive
- Colores consistentes con el sistema de diseño
- Espaciado responsivo

## Notas

- El botón solo aparece si se proporciona `buttonText`
- El componente usa Material Icons para los iconos
- Es completamente responsive y funciona en todos los dispositivos
- Los colores se adaptan automáticamente al tema activo
- El componente es accesible y soporta lectores de pantalla
