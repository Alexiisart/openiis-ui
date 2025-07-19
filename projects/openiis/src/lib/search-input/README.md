# Search Input

Componente de barra de búsqueda reutilizable con icono de búsqueda, botón de limpiar y eventos de teclado optimizados.

## 📦 Instalación

```typescript
import { OpeniisSearchInputComponent } from 'openiis-ui';

@Component({
  imports: [OpeniisSearchInputComponent],
})
```

## ⚙️ Properties

| Property      | Tipo                   | Default       | Descripción                |
| ------------- | ---------------------- | ------------- | -------------------------- |
| `searchTerm`  | `string`               | `''`          | Término de búsqueda actual |
| `size`        | `'sm' \| 'md' \| 'lg'` | `'md'`        | Tamaño del input           |
| `variant`     | `InputVariant`         | `'default'`   | Variante visual del input  |
| `placeholder` | `string`               | `'Buscar...'` | Texto del placeholder      |

## 📡 Events

| Event          | Tipo     | Descripción                          |
| -------------- | -------- | ------------------------------------ |
| `searchChange` | `string` | Emitido cuando cambia la búsqueda    |
| `clearSearch`  | `void`   | Emitido cuando se limpia la búsqueda |

## 📏 Tamaños

| Tamaño | Descripción | Uso                   |
| ------ | ----------- | --------------------- |
| `sm`   | Pequeño     | Búsquedas compactas   |
| `md`   | Mediano     | Búsquedas estándar    |
| `lg`   | Grande      | Búsquedas prominentes |

## 💡 Ejemplos Prácticos

### 1. Search Input Básico

```html
<openiis-search-input [searchTerm]="searchQuery" placeholder="Buscar productos..." (searchChange)="onSearchChange($event)" (clearSearch)="onClearSearch()"> </openiis-search-input>
```

```typescript
export class MyComponent {
  searchQuery = "";

  onSearchChange(term: string) {
    this.searchQuery = term;
    console.log("Search term:", term);
    // Aquí puedes implementar la lógica de búsqueda
  }

  onClearSearch() {
    this.searchQuery = "";
    console.log("Search cleared");
    // Aquí puedes limpiar los resultados
  }
}
```

### 2. Search Input con Diferentes Tamaños

```html
<openiis-search-input size="sm" placeholder="Búsqueda rápida..." [searchTerm]="quickSearch" (searchChange)="onQuickSearch($event)"> </openiis-search-input>

<openiis-search-input size="md" placeholder="Búsqueda estándar..." [searchTerm]="standardSearch" (searchChange)="onStandardSearch($event)"> </openiis-search-input>

<openiis-search-input size="lg" placeholder="Búsqueda prominente..." [searchTerm]="prominentSearch" (searchChange)="onProminentSearch($event)"> </openiis-search-input>
```

```typescript
export class MyComponent {
  quickSearch = "";
  standardSearch = "";
  prominentSearch = "";

  onQuickSearch(term: string) {
    this.quickSearch = term;
  }

  onStandardSearch(term: string) {
    this.standardSearch = term;
  }

  onProminentSearch(term: string) {
    this.prominentSearch = term;
  }
}
```

### 3. Search Input con Diferentes Variantes

```html
<openiis-search-input variant="default" placeholder="Búsqueda estándar..." [searchTerm]="defaultSearch" (searchChange)="onDefaultSearch($event)"> </openiis-search-input>

<openiis-search-input variant="filled" placeholder="Búsqueda con fondo..." [searchTerm]="filledSearch" (searchChange)="onFilledSearch($event)"> </openiis-search-input>

<openiis-search-input variant="outlined" placeholder="Búsqueda con borde..." [searchTerm]="outlinedSearch" (searchChange)="onOutlinedSearch($event)"> </openiis-search-input>

<openiis-search-input variant="minimal" placeholder="Búsqueda minimalista..." [searchTerm]="minimalSearch" (searchChange)="onMinimalSearch($event)"> </openiis-search-input>
```

```typescript
export class MyComponent {
  defaultSearch = "";
  filledSearch = "";
  outlinedSearch = "";
  minimalSearch = "";

  onDefaultSearch(term: string) {
    this.defaultSearch = term;
  }

  onFilledSearch(term: string) {
    this.filledSearch = term;
  }

  onOutlinedSearch(term: string) {
    this.outlinedSearch = term;
  }

  onMinimalSearch(term: string) {
    this.minimalSearch = term;
  }
}
```

### 4. Search Input con Búsqueda en Tiempo Real

```html
<openiis-search-input placeholder="Buscar usuarios..." [searchTerm]="userSearch" (searchChange)="onUserSearch($event)" (clearSearch)="onClearUserSearch()"> </openiis-search-input>
```

```typescript
export class MyComponent {
  userSearch = "";
  users = [
    { name: "Juan Pérez", email: "juan@example.com" },
    { name: "María García", email: "maria@example.com" },
    { name: "Carlos López", email: "carlos@example.com" },
  ];
  filteredUsers = [...this.users];

  onUserSearch(term: string) {
    this.userSearch = term;

    if (term.trim()) {
      this.filteredUsers = this.users.filter((user) => user.name.toLowerCase().includes(term.toLowerCase()) || user.email.toLowerCase().includes(term.toLowerCase()));
    } else {
      this.filteredUsers = [...this.users];
    }
  }

  onClearUserSearch() {
    this.userSearch = "";
    this.filteredUsers = [...this.users];
  }
}
```

### 5. Search Input con Debounce

```html
<openiis-search-input placeholder="Buscar productos..." [searchTerm]="productSearch" (searchChange)="onProductSearch($event)"> </openiis-search-input>
```

```typescript
import { debounceTime, distinctUntilChanged, Subject } from "rxjs";

export class MyComponent {
  productSearch = "";
  private searchSubject = new Subject<string>();

  constructor() {
    // Configurar debounce para evitar demasiadas búsquedas
    this.searchSubject
      .pipe(
        debounceTime(300), // Esperar 300ms después de que el usuario deje de escribir
        distinctUntilChanged(), // Solo emitir si el valor cambió
      )
      .subscribe((term) => {
        this.performSearch(term);
      });
  }

  onProductSearch(term: string) {
    this.productSearch = term;
    this.searchSubject.next(term);
  }

  private performSearch(term: string) {
    console.log("Performing search for:", term);
    // Aquí implementarías la lógica de búsqueda real
  }
}
```

### 6. Search Input para Filtros Avanzados

```html
<openiis-search-input placeholder="Filtrar por nombre, categoría o tags..." [searchTerm]="filterSearch" (searchChange)="onFilterSearch($event)" (clearSearch)="onClearFilter()"> </openiis-search-input>
```

```typescript
export class MyComponent {
  filterSearch = "";
  items = [
    { name: "Producto A", category: "Electrónicos", tags: ["nuevo", "popular"] },
    { name: "Producto B", category: "Ropa", tags: ["oferta"] },
    { name: "Producto C", category: "Hogar", tags: ["destacado"] },
  ];
  filteredItems = [...this.items];

  onFilterSearch(term: string) {
    this.filterSearch = term;

    if (term.trim()) {
      const searchTerm = term.toLowerCase();
      this.filteredItems = this.items.filter((item) => item.name.toLowerCase().includes(searchTerm) || item.category.toLowerCase().includes(searchTerm) || item.tags.some((tag) => tag.toLowerCase().includes(searchTerm)));
    } else {
      this.filteredItems = [...this.items];
    }
  }

  onClearFilter() {
    this.filterSearch = "";
    this.filteredItems = [...this.items];
  }
}
```

### 7. Search Input con Historial

```html
<openiis-search-input placeholder="Buscar con historial..." [searchTerm]="historySearch" (searchChange)="onHistorySearch($event)" (clearSearch)="onClearHistory()"> </openiis-search-input>
```

```typescript
export class MyComponent {
  historySearch = "";
  searchHistory: string[] = [];

  onHistorySearch(term: string) {
    this.historySearch = term;

    if (term.trim() && !this.searchHistory.includes(term)) {
      this.searchHistory.unshift(term);
      // Mantener solo los últimos 10 términos
      this.searchHistory = this.searchHistory.slice(0, 10);
    }
  }

  onClearHistory() {
    this.historySearch = "";
  }

  getSearchHistory(): string[] {
    return this.searchHistory;
  }
}
```

### 8. Search Input con Validación

```html
<openiis-search-input placeholder="Buscar (mínimo 3 caracteres)..." [searchTerm]="validatedSearch" (searchChange)="onValidatedSearch($event)"> </openiis-search-input>
```

```typescript
export class MyComponent {
  validatedSearch = "";
  isValidSearch = false;

  onValidatedSearch(term: string) {
    this.validatedSearch = term;

    // Validar que tenga al menos 3 caracteres
    this.isValidSearch = term.trim().length >= 3;

    if (this.isValidSearch) {
      console.log("Búsqueda válida:", term);
      // Realizar búsqueda
    } else {
      console.log("Búsqueda inválida - mínimo 3 caracteres");
    }
  }
}
```

### 9. Search Input con Sugerencias

```html
<openiis-search-input placeholder="Buscar con sugerencias..." [searchTerm]="suggestedSearch" (searchChange)="onSuggestedSearch($event)"> </openiis-search-input>

<div *ngIf="suggestions.length > 0" class="suggestions">
  <div *ngFor="let suggestion of suggestions" class="suggestion-item" (click)="selectSuggestion(suggestion)">{{ suggestion }}</div>
</div>
```

```typescript
export class MyComponent {
  suggestedSearch = "";
  suggestions: string[] = [];
  allSuggestions = ["JavaScript", "TypeScript", "Angular", "React", "Vue", "Node.js", "Python", "Java", "C#", "PHP"];

  onSuggestedSearch(term: string) {
    this.suggestedSearch = term;

    if (term.trim().length >= 2) {
      this.suggestions = this.allSuggestions.filter((item) => item.toLowerCase().includes(term.toLowerCase())).slice(0, 5); // Mostrar máximo 5 sugerencias
    } else {
      this.suggestions = [];
    }
  }

  selectSuggestion(suggestion: string) {
    this.suggestedSearch = suggestion;
    this.suggestions = [];
  }
}
```

## 🏗️ Interfaces

```typescript
type SearchInputSize = "sm" | "md" | "lg";
type InputVariant = "default" | "filled" | "outlined" | "minimal" | "error";

interface SearchInputValue {
  searchTerm: string;
}
```

## ⚡ Comportamiento

- **Icono de búsqueda**: Material Icons `search`
- **Botón de limpiar**: Aparece automáticamente cuando hay texto
- **Evento de limpiar**: Se emite cuando el input se vacía
- **Tecla Escape**: Limpia la búsqueda automáticamente
- **Responsive**: Se adapta automáticamente en móviles
- **Integración**: Usa el componente `OpeniisInputComponent` internamente

## ✅ Características

- ✅ 3 tamaños configurables
- ✅ 5 variantes visuales
- ✅ Icono de búsqueda automático
- ✅ Botón de limpiar automático
- ✅ Evento de limpiar con Escape
- ✅ Placeholder personalizable
- ✅ Completamente responsive
- ✅ Integración con Input component
- ✅ Eventos optimizados
- ✅ Accesibilidad completa

## 🎨 Estilos Automáticos

- **Estados visuales**: Hover, focus, disabled
- **Icono de búsqueda**: Material Icons
- **Botón de limpiar**: Aparece dinámicamente
- **Responsive**: Tamaños adaptativos en móviles
- **Animaciones**: Transiciones suaves

## 🔧 Funcionalidades Especiales

### Evento de Limpiar Automático

```typescript
// Se emite automáticamente cuando el input se vacía
clearSearch = "onClearSearch()";
```

### Tecla Escape

```typescript
// Limpia la búsqueda al presionar Escape
// Implementado automáticamente en el componente
```

### Integración con Input Component

```typescript
// Usa internamente OpeniisInputComponent con:
// - type="search"
// - iconLeft="search"
// - clearable="true"
```

## 🚨 Solución de Problemas

| Problema                     | Solución                                              |
| ---------------------------- | ----------------------------------------------------- |
| Search input no responde     | Verifica que no esté `disabled`                       |
| Eventos no se emiten         | Verifica los listeners `searchChange` y `clearSearch` |
| Icono no aparece             | Verifica que Material Icons esté configurado          |
| Botón de limpiar no funciona | Verifica que `clearable="true"` esté configurado      |
| Estilos no se aplican        | Verifica que el tema Openiis UI esté configurado      |
| Responsive no funciona       | Verifica que el contenedor tenga `width: 100%`        |

## 🐞 Reportar Problemas

Si encuentras algún problema en la lógica del componente, por favor
[🐞Reportalo](https://github.com/Alexiisart/openiis-ui/issues/new)
