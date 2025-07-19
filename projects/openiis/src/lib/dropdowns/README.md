# Dropdowns

Componentes de dropdown elegantes y reutilizables con soporte para búsqueda, navegación por teclado y múltiples tamaños.

## 📦 Instalación

```typescript
import { OpeniisDropdownComponent } from 'openiis-ui';
import { OpeniisSearchableDropdownComponent } from 'openiis-ui';

@Component({
  imports: [OpeniisDropdownComponent, OpeniisSearchableDropdownComponent],
})
```

## 🎯 Tipos de Dropdown

### 1. Dropdown Básico (`openiis-dropdown`)

Dropdown estándar con select nativo, ideal para listas pequeñas y simples.

### 2. Dropdown con Búsqueda (`openiis-searchable-dropdown`)

Dropdown avanzado con búsqueda en tiempo real, navegación por teclado y descripciones.

## ⚙️ Properties - Dropdown Básico

| Property          | Tipo                                     | Default     | Descripción           |
| ----------------- | ---------------------------------------- | ----------- | --------------------- |
| `size`            | `DropdownSize`                           | `'md'`      | Tamaño del dropdown   |
| `options`         | `DropdownOption[]`                       | `[]`        | Opciones del dropdown |
| `selectedValue`   | `string`                                 | `''`        | Valor seleccionado    |
| `tooltip`         | `string`                                 | `''`        | Texto del tooltip     |
| `tooltipPosition` | `'top' \| 'bottom' \| 'left' \| 'right'` | `'top'`     | Posición del tooltip  |
| `variant`         | `'default' \| 'danger'`                  | `'default'` | Variante visual       |
| `disabled`        | `boolean`                                | `false`     | Deshabilitar dropdown |

## ⚙️ Properties - Dropdown con Búsqueda

| Property              | Tipo                                     | Default       | Descripción                     |
| --------------------- | ---------------------------------------- | ------------- | ------------------------------- |
| `size`                | `SearchableDropdownSize`                 | `'md'`        | Tamaño del dropdown             |
| `options`             | `SearchableDropdownOption[]`             | `[]`          | Opciones del dropdown           |
| `selectedValue`       | `string`                                 | `''`          | Valor seleccionado              |
| `placeholder`         | `string`                                 | `'Buscar...'` | Placeholder del input           |
| `tooltip`             | `string`                                 | `''`          | Texto del tooltip               |
| `disabled`            | `boolean`                                | `false`       | Deshabilitar dropdown           |
| `searchInDescription` | `boolean`                                | `true`        | Buscar también en descripciones |
| `variant`             | `'default' \| 'danger'`                  | `'default'`   | Variante visual                 |
| `tooltipPosition`     | `'top' \| 'bottom' \| 'left' \| 'right'` | `'top'`       | Posición del tooltip            |

## 📡 Events

### Dropdown Básico

| Event              | Tipo     | Descripción                        |
| ------------------ | -------- | ---------------------------------- |
| `selectionChanged` | `string` | Emitido cuando cambia la selección |

### Dropdown con Búsqueda

| Event              | Tipo     | Descripción                        |
| ------------------ | -------- | ---------------------------------- |
| `selectionChanged` | `string` | Emitido cuando cambia la selección |
| `searchChanged`    | `string` | Emitido cuando cambia la búsqueda  |

## 📏 Tamaños

| Tamaño | Max-width | Padding | Font-size | Uso               |
| ------ | --------- | ------- | --------- | ----------------- |
| `sm`   | 200px     | 6px     | 13px      | Compacto          |
| `md`   | 300px     | 8px     | 14px      | Mediano (default) |
| `lg`   | 400px     | 12px    | 16px      | Grande            |

## 💡 Ejemplos Prácticos

### 1. Dropdown Básico

```html
<openiis-dropdown [options]="countryOptions" [selectedValue]="selectedCountry" placeholder="Selecciona un país" (selectionChanged)="onCountryChange($event)"> </openiis-dropdown>
```

```typescript
export class MyComponent {
  selectedCountry = "";
  countryOptions: any[] = [
    { value: "mx", label: "México" },
    { value: "es", label: "España" },
    { value: "ar", label: "Argentina" },
    { value: "co", label: "Colombia" },
  ];

  onCountryChange(value: string) {
    this.selectedCountry = value;
    console.log("Country selected:", value);
  }
}
```

### 2. Dropdown con Búsqueda

```html
<openiis-searchable-dropdown [options]="userOptions" [selectedValue]="selectedUser" placeholder="Buscar usuario..." (selectionChanged)="onUserChange($event)" (searchChanged)="onSearchChange($event)"> </openiis-searchable-dropdown>
```

```typescript
export class MyComponent {
  selectedUser = "";
  userOptions: any[] = [
    { value: "1", label: "Juan Pérez", description: "Desarrollador Frontend" },
    { value: "2", label: "María García", description: "Diseñadora UX" },
    { value: "3", label: "Carlos López", description: "Product Manager" },
  ];

  onUserChange(value: string) {
    this.selectedUser = value;
    console.log("User selected:", value);
  }

  onSearchChange(term: string) {
    console.log("Search term:", term);
  }
}
```

### 3. Dropdown con Diferentes Tamaños

```html
<openiis-dropdown size="sm" [options]="smallOptions" [selectedValue]="smallValue" (selectionChanged)="onSmallChange($event)"> </openiis-dropdown>

<openiis-dropdown size="md" [options]="mediumOptions" [selectedValue]="mediumValue" (selectionChanged)="onMediumChange($event)"> </openiis-dropdown>

<openiis-dropdown size="lg" [options]="largeOptions" [selectedValue]="largeValue" (selectionChanged)="onLargeChange($event)"> </openiis-dropdown>
```

```typescript
export class MyComponent {
  smallValue = "";
  mediumValue = "";
  largeValue = "";

  smallOptions: any[] = [
    { value: "1", label: "Opción 1" },
    { value: "2", label: "Opción 2" },
  ];

  mediumOptions: any[] = [
    { value: "a", label: "Opción A" },
    { value: "b", label: "Opción B" },
  ];

  largeOptions: any[] = [
    { value: "x", label: "Opción X" },
    { value: "y", label: "Opción Y" },
  ];

  onSmallChange(value: string) {
    this.smallValue = value;
  }

  onMediumChange(value: string) {
    this.mediumValue = value;
  }

  onLargeChange(value: string) {
    this.largeValue = value;
  }
}
```

### 4. Dropdown con Tooltip

```html
<openiis-dropdown [options]="tooltipOptions" [selectedValue]="tooltipValue" tooltip="Selecciona el idioma de la aplicación" tooltipPosition="top" (selectionChanged)="onTooltipChange($event)"> </openiis-dropdown>
```

```typescript
export class MyComponent {
  tooltipValue = "";
  tooltipOptions: any[] = [
    { value: "es", label: "Español" },
    { value: "en", label: "English" },
    { value: "fr", label: "Français" },
  ];

  onTooltipChange(value: string) {
    this.tooltipValue = value;
  }
}
```

### 5. Dropdown con Estados Avanzados

```html
<openiis-dropdown [options]="statusOptions" [selectedValue]="statusValue" [disabled]="isLoading" variant="danger" (selectionChanged)="onStatusChange($event)"> </openiis-dropdown>
```

```typescript
export class MyComponent {
  statusValue = "";
  isLoading = false;
  statusOptions: any[] = [
    { value: "active", label: "Activo" },
    { value: "inactive", label: "Inactivo" },
    { value: "pending", label: "Pendiente" },
  ];

  onStatusChange(value: string) {
    this.statusValue = value;
  }
}
```

### 6. Dropdown con Búsqueda Avanzada

```html
<openiis-searchable-dropdown [options]="productOptions" [selectedValue]="selectedProduct" placeholder="Buscar productos..." [searchInDescription]="true" (selectionChanged)="onProductChange($event)" (searchChanged)="onProductSearch($event)"> </openiis-searchable-dropdown>
```

```typescript
export class MyComponent {
  selectedProduct = "";
  productOptions: any[] = [
    { value: "1", label: "iPhone 15", description: "Apple - $999" },
    { value: "2", label: "Samsung Galaxy", description: "Samsung - $899" },
    { value: "3", label: "Google Pixel", description: "Google - $699" },
  ];

  onProductChange(value: string) {
    this.selectedProduct = value;
  }

  onProductSearch(term: string) {
    console.log("Searching products for:", term);
  }
}
```

### 7. Dropdown con Navegación por Teclado

```html
<openiis-searchable-dropdown [options]="keyboardOptions" [selectedValue]="keyboardValue" placeholder="Usa las flechas para navegar..." (selectionChanged)="onKeyboardChange($event)"> </openiis-searchable-dropdown>
```

```typescript
export class MyComponent {
  keyboardValue = "";
  keyboardOptions: any[] = [
    { value: "1", label: "Primera opción" },
    { value: "2", label: "Segunda opción" },
    { value: "3", label: "Tercera opción" },
  ];

  onKeyboardChange(value: string) {
    this.keyboardValue = value;
  }
}
```

### 8. Dropdown para Filtros

```html
<openiis-searchable-dropdown [options]="filterOptions" [selectedValue]="filterValue" placeholder="Filtrar por categoría..." (selectionChanged)="onFilterChange($event)"> </openiis-searchable-dropdown>
```

```typescript
export class MyComponent {
  filterValue = "";
  filterOptions: any[] = [
    { value: "all", label: "Todas las categorías" },
    { value: "electronics", label: "Electrónicos", description: "Teléfonos, laptops, etc." },
    { value: "clothing", label: "Ropa", description: "Camisetas, pantalones, etc." },
    { value: "books", label: "Libros", description: "Ficción, no ficción, etc." },
  ];

  onFilterChange(value: string) {
    this.filterValue = value;
    this.applyFilter(value);
  }

  private applyFilter(category: string) {
    console.log("Applying filter:", category);
  }
}
```

### 9. Dropdown con Validación

```html
<openiis-searchable-dropdown [options]="validationOptions" [selectedValue]="validationValue" placeholder="Selecciona una opción válida..." [disabled]="!isValid" (selectionChanged)="onValidationChange($event)"> </openiis-searchable-dropdown>
```

```typescript
export class MyComponent {
  validationValue = "";
  isValid = true;
  validationOptions: any[] = [
    { value: "valid1", label: "Opción válida 1" },
    { value: "valid2", label: "Opción válida 2" },
    { value: "invalid", label: "Opción inválida" },
  ];

  onValidationChange(value: string) {
    this.validationValue = value;
    this.isValid = value !== "invalid";
  }
}
```

## 🏗️ Interfaces

```typescript
// Dropdown Básico
interface DropdownOption {
  value: string;
  label: string;
}

type DropdownSize = "sm" | "md" | "lg";

// Dropdown con Búsqueda
interface SearchableDropdownOption {
  value: string;
  label: string;
  description?: string;
}

type SearchableDropdownSize = "sm" | "md" | "lg";
```

## ⚡ Comportamiento

### Dropdown Básico

- **Select nativo**: Usa el elemento `<select>` del navegador
- **Icono personalizado**: Flecha SVG personalizada
- **Tooltip**: Soporte para tooltips informativos
- **Estados**: Hover, focus, disabled
- **Responsive**: Se adapta automáticamente en móviles

### Dropdown con Búsqueda

- **Búsqueda en tiempo real**: Filtra opciones mientras escribes
- **Navegación por teclado**: Flechas arriba/abajo, Enter, Escape
- **Búsqueda en descripciones**: Opcional con `searchInDescription`
- **Auto-focus**: Se enfoca automáticamente al abrir
- **Cierre automático**: Se cierra al hacer clic fuera
- **Estados visuales**: Hover, focus, selected, highlighted

## ✅ Características

### Dropdown Básico

- ✅ 3 tamaños configurables
- ✅ Tooltip informativo
- ✅ Estados disabled
- ✅ Variantes visuales
- ✅ Icono personalizado
- ✅ Completamente responsive
- ✅ Accesibilidad completa

### Dropdown con Búsqueda

- ✅ 3 tamaños configurables
- ✅ Búsqueda en tiempo real
- ✅ Navegación por teclado
- ✅ Búsqueda en descripciones
- ✅ Auto-focus al abrir
- ✅ Cierre automático
- ✅ Estados visuales avanzados
- ✅ Tooltip informativo
- ✅ Completamente responsive
- ✅ Accesibilidad completa

## 🎨 Estilos Automáticos

- **Estados visuales**: Hover, focus, disabled, selected
- **Icono dinámico**: Rotación al abrir/cerrar
- **Scrollbar personalizada**: Para listas largas
- **Responsive**: Tamaños adaptativos en móviles
- **Animaciones**: Transiciones suaves

## 🔧 Funcionalidades Especiales

### Navegación por Teclado (Searchable Dropdown)

```typescript
// Teclas soportadas:
// - ArrowDown: Navegar hacia abajo
// - ArrowUp: Navegar hacia arriba
// - Enter: Seleccionar opción resaltada
// - Escape: Cerrar dropdown
```

### Búsqueda Inteligente

```typescript
// Busca en label y descripción (opcional)
[searchInDescription] = "true";
```

### Auto-focus

```typescript
// Se enfoca automáticamente al abrir
// Implementado automáticamente
```

## 🚨 Solución de Problemas

| Problema                           | Solución                                            |
| ---------------------------------- | --------------------------------------------------- |
| Dropdown no responde               | Verifica que no esté `disabled`                     |
| Opciones no se muestran            | Verifica que `options` tenga datos                  |
| Búsqueda no funciona               | Verifica que `searchInDescription` esté configurado |
| Navegación por teclado no funciona | Verifica que el dropdown esté enfocado              |
| Estilos no se aplican              | Verifica que el tema Openiis UI esté configurado    |
| Tooltip no aparece                 | Verifica que `tooltip` tenga texto                  |
| Responsive no funciona             | Verifica que el contenedor tenga `width: 100%`      |

## 🐞 Reportar Problemas

Si encuentras algún problema en la lógica del componente, por favor
[🐞Reportalo](https://github.com/Alexiisart/openiis-ui/issues/new)
