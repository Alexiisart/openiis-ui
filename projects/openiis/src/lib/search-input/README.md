# SearchInput Component

## Descripción

El componente `SearchInputComponent` es una barra de búsqueda reutilizable que proporciona una interfaz de búsqueda intuitiva. Incluye un icono de búsqueda, funcionalidad de limpiar y manejo de eventos de teclado.

## Características

- ✅ Icono de búsqueda integrado
- ✅ Botón de limpiar búsqueda
- ✅ Eventos de cambio y limpieza
- ✅ Atajos de teclado (Escape para limpiar)
- ✅ Completamente responsive
- ✅ Placeholder personalizable
- ✅ Integración con InputComponent

## Uso Básico

```html
<app-search-input placeholder="Buscar..." [searchTerm]="searchTerm" (searchChange)="onSearchChange($event)" (clearSearch)="onClearSearch()"> </app-search-input>
```

## Props

| Prop          | Tipo     | Defecto       | Descripción                       |
| ------------- | -------- | ------------- | --------------------------------- |
| `searchTerm`  | `string` | `''`          | Término de búsqueda actual        |
| `placeholder` | `string` | `'Buscar...'` | Placeholder del input de búsqueda |

## Eventos

| Evento         | Tipo     | Descripción                                  |
| -------------- | -------- | -------------------------------------------- |
| `searchChange` | `string` | Emitido cuando cambia el término de búsqueda |
| `clearSearch`  | `void`   | Emitido cuando se limpia la búsqueda         |

## Ejemplos

### Búsqueda básica

```typescript
// En el componente
searchTerm = '';
filteredItems: any[] = [];
allItems: any[] = [];

ngOnInit() {
  this.loadItems();
}

loadItems() {
  this.itemService.getItems().subscribe(items => {
    this.allItems = items;
    this.filteredItems = items;
  });
}

onSearchChange(term: string) {
  this.searchTerm = term;
  this.performSearch();
}

onClearSearch() {
  this.searchTerm = '';
  this.filteredItems = this.allItems;
}

performSearch() {
  if (!this.searchTerm.trim()) {
    this.filteredItems = this.allItems;
    return;
  }

  this.filteredItems = this.allItems.filter(item =>
    item.name.toLowerCase().includes(this.searchTerm.toLowerCase())
  );
}
```

```html
<!-- En el template -->
<app-search-input placeholder="Buscar elementos..." [searchTerm]="searchTerm" (searchChange)="onSearchChange($event)" (clearSearch)="onClearSearch()"> </app-search-input>

<div class="results">
  <div *ngFor="let item of filteredItems">{{ item.name }}</div>
</div>
```

### Búsqueda con filtros múltiples

```typescript
// En el componente
searchTerm = '';
selectedCategory = 'all';
products: Product[] = [];
filteredProducts: Product[] = [];

onSearchChange(term: string) {
  this.searchTerm = term;
  this.applyFilters();
}

onCategoryChange(category: string) {
  this.selectedCategory = category;
  this.applyFilters();
}

onClearSearch() {
  this.searchTerm = '';
  this.applyFilters();
}

applyFilters() {
  let filtered = this.products;

  // Filtrar por categoría
  if (this.selectedCategory !== 'all') {
    filtered = filtered.filter(p => p.category === this.selectedCategory);
  }

  // Filtrar por término de búsqueda
  if (this.searchTerm.trim()) {
    filtered = filtered.filter(p =>
      p.name.toLowerCase().includes(this.searchTerm.toLowerCase()) ||
      p.description.toLowerCase().includes(this.searchTerm.toLowerCase())
    );
  }

  this.filteredProducts = filtered;
}
```

```html
<div class="filters">
  <app-search-input placeholder="Buscar productos..." [searchTerm]="searchTerm" (searchChange)="onSearchChange($event)" (clearSearch)="onClearSearch()"> </app-search-input>

  <select [(ngModel)]="selectedCategory" (change)="onCategoryChange($event.target.value)">
    <option value="all">Todas las categorías</option>
    <option value="electronics">Electrónicos</option>
    <option value="clothing">Ropa</option>
    <option value="books">Libros</option>
  </select>
</div>
```

### Búsqueda con debounce

```typescript
// En el componente
searchTerm = '';
searchSubject = new Subject<string>();
items: any[] = [];

ngOnInit() {
  // Configurar debounce para la búsqueda
  this.searchSubject.pipe(
    debounceTime(300), // Esperar 300ms después del último cambio
    distinctUntilChanged(), // Solo emitir si el valor cambió
    switchMap(term => this.performSearch(term))
  ).subscribe(results => {
    this.items = results;
  });
}

onSearchChange(term: string) {
  this.searchTerm = term;
  this.searchSubject.next(term);
}

onClearSearch() {
  this.searchTerm = '';
  this.searchSubject.next('');
}

performSearch(term: string): Observable<any[]> {
  if (!term.trim()) {
    return of([]);
  }

  return this.searchService.search(term);
}
```

### Búsqueda con historial

```typescript
// En el componente
searchTerm = '';
searchHistory: string[] = [];
showHistory = false;

ngOnInit() {
  this.loadSearchHistory();
}

onSearchChange(term: string) {
  this.searchTerm = term;
  this.performSearch(term);

  // Agregar al historial si no está vacío
  if (term.trim() && !this.searchHistory.includes(term)) {
    this.searchHistory.unshift(term);
    this.searchHistory = this.searchHistory.slice(0, 10); // Mantener solo 10
    this.saveSearchHistory();
  }
}

onClearSearch() {
  this.searchTerm = '';
  this.showHistory = false;
  this.clearResults();
}

selectFromHistory(term: string) {
  this.searchTerm = term;
  this.showHistory = false;
  this.performSearch(term);
}

clearHistory() {
  this.searchHistory = [];
  this.saveSearchHistory();
}

private loadSearchHistory() {
  const history = localStorage.getItem('searchHistory');
  if (history) {
    this.searchHistory = JSON.parse(history);
  }
}

private saveSearchHistory() {
  localStorage.setItem('searchHistory', JSON.stringify(this.searchHistory));
}
```

```html
<div class="search-container">
  <app-search-input placeholder="Buscar... (historial disponible)" [searchTerm]="searchTerm" (searchChange)="onSearchChange($event)" (clearSearch)="onClearSearch()" (focus)="showHistory = true"> </app-search-input>

  <div class="search-history" *ngIf="showHistory && searchHistory.length > 0">
    <h4>Búsquedas recientes</h4>
    <div *ngFor="let term of searchHistory" class="history-item" (click)="selectFromHistory(term)">{{ term }}</div>
    <button (click)="clearHistory()">Limpiar historial</button>
  </div>
</div>
```

## Ejemplos de Uso Común

### Búsqueda en tabla

```typescript
// En el componente
searchTerm = '';
users: User[] = [];
filteredUsers: User[] = [];

onSearchChange(term: string) {
  this.searchTerm = term;
  this.filterUsers();
}

onClearSearch() {
  this.searchTerm = '';
  this.filteredUsers = this.users;
}

filterUsers() {
  if (!this.searchTerm.trim()) {
    this.filteredUsers = this.users;
    return;
  }

  const term = this.searchTerm.toLowerCase();
  this.filteredUsers = this.users.filter(user =>
    user.name.toLowerCase().includes(term) ||
    user.email.toLowerCase().includes(term) ||
    user.role.toLowerCase().includes(term)
  );
}
```

### Búsqueda con estado de carga

```typescript
// En el componente
searchTerm = '';
isSearching = false;
searchResults: any[] = [];

onSearchChange(term: string) {
  this.searchTerm = term;

  if (term.trim()) {
    this.searchWithLoading(term);
  } else {
    this.searchResults = [];
  }
}

onClearSearch() {
  this.searchTerm = '';
  this.searchResults = [];
  this.isSearching = false;
}

searchWithLoading(term: string) {
  this.isSearching = true;

  this.searchService.search(term).subscribe({
    next: (results) => {
      this.searchResults = results;
      this.isSearching = false;
    },
    error: (error) => {
      console.error('Error en búsqueda:', error);
      this.isSearching = false;
    }
  });
}
```

```html
<app-search-input placeholder="Buscar..." [searchTerm]="searchTerm" (searchChange)="onSearchChange($event)" (clearSearch)="onClearSearch()"> </app-search-input>

<div class="search-status">
  <div *ngIf="isSearching" class="loading">Buscando...</div>

  <div *ngIf="!isSearching && searchTerm && searchResults.length === 0">No se encontraron resultados para "{{ searchTerm }}"</div>

  <div *ngIf="searchResults.length > 0">{{ searchResults.length }} resultados encontrados</div>
</div>
```

## Atajos de Teclado

| Tecla      | Acción             |
| ---------- | ------------------ |
| **Escape** | Limpia la búsqueda |

## Comportamiento

### Eventos de cambio

- `searchChange` se emite en cada cambio del input
- `clearSearch` se emite cuando se limpia la búsqueda (por botón o por Escape)
- `clearSearch` también se emite automáticamente cuando el campo queda vacío

### Limpieza automática

- El evento `clearSearch` se emite cuando el valor del input se vuelve vacío
- Esto permite manejar la lógica de "mostrar todos" de manera consistente

## Responsive Design

El componente es completamente responsive:

- **Desktop**: Ancho máximo de 400px
- **Tablet y Mobile**: Ancho completo (100%)

## Dependencias

- `@angular/common`
- `InputComponent`

## Estilos CSS

El componente incluye estilos CSS inline que soportan:

- Contenedor flexible
- Ancho máximo en desktop
- Responsividad completa
- Integración con el sistema de diseño

## Notas

- El componente utiliza internamente el `InputComponent` con tipo "search"
- El icono de búsqueda se muestra automáticamente
- El botón de limpiar aparece cuando hay texto
- Es completamente compatible con formularios reactivos
- Se puede usar con debounce para búsquedas en tiempo real
- Soporta múltiples instancias en la misma página
