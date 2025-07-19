# Breadcrumb

Componente de navegación breadcrumb elegante y reutilizable con múltiples variantes, separadores, iconos y soporte para overflow.

## 📦 Instalación

```typescript
import { OpeniisBreadcrumbComponent } from 'openiis-ui';

@Component({
  imports: [OpeniisBreadcrumbComponent],
})
```

## ⚙️ Properties

| Property          | Tipo                  | Default        | Descripción                    |
| ----------------- | --------------------- | -------------- | ------------------------------ |
| `variant`         | `BreadcrumbVariant`   | `'default'`    | Variante visual del breadcrumb |
| `size`            | `BreadcrumbSize`      | `'md'`         | Tamaño del breadcrumb          |
| `separator`       | `BreadcrumbSeparator` | `'chevron'`    | Tipo de separador              |
| `customSeparator` | `string`              | `'>'`          | Separador personalizado        |
| `items`           | `BreadcrumbItem[]`    | `[]`           | Array de items del breadcrumb  |
| `showHome`        | `boolean`             | `true`         | Mostrar icono de home          |
| `maxItems`        | `number`              | `0`            | Máximo de items visibles       |
| `showOverflow`    | `boolean`             | `true`         | Mostrar menú overflow          |
| `ariaLabel`       | `string`              | `'Breadcrumb'` | Label de accesibilidad         |
| `responsive`      | `boolean`             | `true`         | Comportamiento responsive      |
| `truncateLength`  | `number`              | `0`            | Longitud máxima de texto       |
| `customClass`     | `string`              | `''`           | Clase CSS personalizada        |

## 📡 Events

| Event               | Tipo  | Descripción                       |
| ------------------- | ----- | --------------------------------- |
| `itemClick`         | `any` | Emitido al hacer clic en item     |
| `overflowItemClick` | `any` | Emitido al hacer clic en overflow |

## 📏 Tamaños

| Tamaño | Font-size | Padding | Gap | Uso               |
| ------ | --------- | ------- | --- | ----------------- |
| `sm`   | 12px      | 4px     | 4px | Compacto          |
| `md`   | 14px      | 4px     | 8px | Mediano (default) |
| `lg`   | 16px      | 8px     | 8px | Grande            |

## 🎨 Variantes

| Variante  | Descripción               | Uso                |
| --------- | ------------------------- | ------------------ |
| `default` | Estilo estándar (default) | Navegación general |
| `pills`   | Píldoras redondeadas      | Categorías         |
| `arrows`  | Flechas conectadas        | Procesos           |
| `slash`   | Separadores con slash     | Rutas de archivos  |
| `dots`    | Separadores con puntos    | Jerarquías         |

## 🔗 Separadores

| Separador | Símbolo       | Descripción               |
| --------- | ------------- | ------------------------- | -------------- |
| `chevron` | `>`           | Chevron derecho (default) |
| `slash`   | `/`           | Barra diagonal            |
| `arrow`   | `→`           | Flecha hacia la derecha   |
| `dot`     | `•`           | Punto centrado            |
| `pipe`    | `             | `                         | Barra vertical |
| `custom`  | Personalizado | Cualquier símbolo         |

## 💡 Ejemplos Prácticos

### 1. Breadcrumb Básico

```html
<openiis-breadcrumb variant="default" size="md" separator="chevron" [items]="basicItems" (itemClick)="onItemClick($event)"> </openiis-breadcrumb>
```

```typescript
export class MyComponent {
  basicItems: any[] = [
    { label: "Inicio", url: "/", icon: "home" },
    { label: "Productos", url: "/productos" },
    { label: "Electrónicos", url: "/productos/electronicos" },
    { label: "Smartphones", url: "/productos/electronicos/smartphones", active: true },
  ];

  onItemClick(event: any) {
    console.log("Item clicked:", event.item);
  }
}
```

### 2. Breadcrumb con Pills

```html
<openiis-breadcrumb variant="pills" size="md" separator="chevron" [items]="pillsItems" (itemClick)="onPillsItemClick($event)"> </openiis-breadcrumb>
```

```typescript
export class MyComponent {
  pillsItems: any[] = [
    { label: "Dashboard", url: "/dashboard", icon: "dashboard" },
    { label: "Usuarios", url: "/dashboard/usuarios" },
    { label: "Perfil", url: "/dashboard/usuarios/perfil" },
    { label: "Configuración", url: "/dashboard/usuarios/perfil/config", active: true },
  ];

  onPillsItemClick(event: any) {
    console.log("Pills item clicked:", event.item);
  }
}
```

### 3. Breadcrumb con Arrows

```html
<openiis-breadcrumb variant="arrows" size="md" [items]="arrowsItems" (itemClick)="onArrowsItemClick($event)"> </openiis-breadcrumb>
```

```typescript
export class MyComponent {
  arrowsItems: any[] = [
    { label: "Paso 1", url: "/wizard/step1", icon: "looks_one" },
    { label: "Paso 2", url: "/wizard/step2", icon: "looks_two" },
    { label: "Paso 3", url: "/wizard/step3", icon: "looks_3" },
    { label: "Completado", url: "/wizard/complete", active: true, icon: "check_circle" },
  ];

  onArrowsItemClick(event: any) {
    console.log("Arrows item clicked:", event.item);
  }
}
```

### 4. Breadcrumb con Overflow

```html
<openiis-breadcrumb variant="default" size="md" separator="chevron" [items]="overflowItems" [maxItems]="3" [showOverflow]="true" (itemClick)="onOverflowItemClick($event)" (overflowItemClick)="onOverflowMenuClick($event)"> </openiis-breadcrumb>
```

```typescript
export class MyComponent {
  overflowItems: any[] = [
    { label: "Inicio", url: "/", icon: "home" },
    { label: "Documentos", url: "/documentos" },
    { label: "Proyectos", url: "/documentos/proyectos" },
    { label: "2024", url: "/documentos/proyectos/2024" },
    { label: "Q1", url: "/documentos/proyectos/2024/q1" },
    { label: "Enero", url: "/documentos/proyectos/2024/q1/enero" },
    { label: "Reporte Final", url: "/documentos/proyectos/2024/q1/enero/reporte", active: true },
  ];

  onOverflowItemClick(event: any) {
    console.log("Overflow item clicked:", event.item);
  }

  onOverflowMenuClick(event: any) {
    console.log("Overflow menu item clicked:", event.item);
  }
}
```

### 5. Breadcrumb con Diferentes Separadores

```html
<!-- Separador Chevron -->
<openiis-breadcrumb separator="chevron" [items]="chevronItems"> </openiis-breadcrumb>

<!-- Separador Slash -->
<openiis-breadcrumb separator="slash" [items]="slashItems"> </openiis-breadcrumb>

<!-- Separador Arrow -->
<openiis-breadcrumb separator="arrow" [items]="arrowItems"> </openiis-breadcrumb>

<!-- Separador Dot -->
<openiis-breadcrumb separator="dot" [items]="dotItems"> </openiis-breadcrumb>

<!-- Separador Pipe -->
<openiis-breadcrumb separator="pipe" [items]="pipeItems"> </openiis-breadcrumb>

<!-- Separador Custom -->
<openiis-breadcrumb separator="custom" customSeparator="→" [items]="customItems"> </openiis-breadcrumb>
```

```typescript
export class MyComponent {
  chevronItems: any[] = [
    { label: "Inicio", url: "/" },
    { label: "Productos", url: "/productos" },
    { label: "Categoría", url: "/productos/categoria", active: true },
  ];

  slashItems: any[] = [
    { label: "Sistema", url: "/sistema" },
    { label: "Archivos", url: "/sistema/archivos" },
    { label: "Documentos", url: "/sistema/archivos/documentos", active: true },
  ];

  arrowItems: any[] = [
    { label: "Proceso", url: "/proceso" },
    { label: "Paso 1", url: "/proceso/paso1" },
    { label: "Paso 2", url: "/proceso/paso1/paso2", active: true },
  ];

  dotItems: any[] = [
    { label: "Categoría", url: "/categoria" },
    { label: "Subcategoría", url: "/categoria/subcategoria" },
    { label: "Item", url: "/categoria/subcategoria/item", active: true },
  ];

  pipeItems: any[] = [
    { label: "Sección", url: "/seccion" },
    { label: "Subsección", url: "/seccion/subseccion" },
    { label: "Elemento", url: "/seccion/subseccion/elemento", active: true },
  ];

  customItems: any[] = [
    { label: "Inicio", url: "/" },
    { label: "Navegación", url: "/navegacion" },
    { label: "Final", url: "/navegacion/final", active: true },
  ];
}
```

### 6. Breadcrumb con Estados Avanzados

```html
<openiis-breadcrumb variant="pills" size="lg" separator="chevron" [items]="advancedItems" [truncateLength]="15" [showHome]="true" [responsive]="true" (itemClick)="onAdvancedItemClick($event)"> </openiis-breadcrumb>
```

```typescript
export class MyComponent {
  advancedItems: any[] = [
    {
      label: "Inicio",
      url: "/",
      icon: "home",
      tooltip: "Página principal",
    },
    {
      label: "Administración",
      url: "/admin",
      icon: "admin_panel_settings",
      tooltip: "Panel de administración",
    },
    {
      label: "Usuarios del Sistema",
      url: "/admin/usuarios",
      icon: "people",
      tooltip: "Gestión de usuarios",
    },
    {
      label: "Configuración Avanzada",
      url: "/admin/usuarios/config",
      active: true,
      icon: "settings",
      tooltip: "Configuración detallada",
      disabled: false,
    },
  ];

  onAdvancedItemClick(event: any) {
    console.log("Advanced item clicked:", event.item);
  }
}
```

## 🏗️ Interfaces

```typescript
interface BreadcrumbItem {
  label: string;
  url?: string;
  icon?: string;
  active?: boolean;
  disabled?: boolean;
  clickable?: boolean;
  tooltip?: string;
  data?: any;
}

type BreadcrumbVariant = "default" | "pills" | "arrows" | "slash" | "dots";
type BreadcrumbSize = "sm" | "md" | "lg";
type BreadcrumbSeparator = "chevron" | "slash" | "arrow" | "dot" | "pipe" | "custom";
```

## ⚡ Comportamiento

### Navegación

- **Clic**: Navega al item seleccionado
- **Teclado**: Soporte para navegación por teclado
- **Router**: Integración automática con Angular Router
- **Accesibilidad**: ARIA roles y atributos completos

### Estados

- **Activo**: Item actual (último item)
- **Deshabilitado**: Item no disponible
- **Clickable**: Items navegables
- **Hover**: Efectos visuales al pasar el mouse
- **Focus**: Indicador de foco para accesibilidad

### Overflow

- **Máximo items**: Controla cuántos items mostrar
- **Menú overflow**: Items ocultos en menú desplegable
- **Responsive**: Se adapta automáticamente en móviles
- **Truncado**: Texto largo se corta automáticamente

## ✅ Características

- ✅ 5 variantes visuales (default, pills, arrows, slash, dots)
- ✅ 6 tipos de separadores (chevron, slash, arrow, dot, pipe, custom)
- ✅ 3 tamaños configurables (sm, md, lg)
- ✅ Iconos Material Icons
- ✅ Tooltips informativos
- ✅ Estados disabled y active
- ✅ Navegación por teclado
- ✅ Accesibilidad completa
- ✅ Responsive design
- ✅ Overflow automático
- ✅ Truncado de texto
- ✅ Integración con Angular Router

## 🎨 Estilos Automáticos

- **Variantes**: Cada variante tiene estilos únicos
- **Estados**: Hover, active, disabled, focus
- **Responsive**: Se adapta automáticamente en móviles
- **Animaciones**: Transiciones suaves
- **Accesibilidad**: Indicadores de foco y ARIA

## 🔧 Funcionalidades Especiales

### Overflow Automático

```typescript
// Cuando hay más items que maxItems, se ocultan en menú
[maxItems] = "3"[showOverflow] = "true";
```

### Truncado de Texto

```typescript
// Corta texto largo automáticamente
[truncateLength] = "15";
```

### Separadores Personalizados

```typescript
// Usar separador personalizado
separator = "custom";
customSeparator = "→";
```

### Estados de Items

```typescript
// Item deshabilitado
{ label: 'Deshabilitado', url: '/disabled', disabled: true }

// Item activo (último)
{ label: 'Actual', url: '/current', active: true }

// Item no clickeable
{ label: 'No clickeable', url: '/noclick', clickable: false }
```

## 🚨 Solución de Problemas

| Problema                  | Solución                                      |
| ------------------------- | --------------------------------------------- |
| Breadcrumb no responde    | Verifica que los items tengan `url` válida    |
| Overflow no funciona      | Verifica que `maxItems` sea mayor que 0       |
| Iconos no aparecen        | Verifica que Material Icons esté importado    |
| Separador no se muestra   | Verifica que `separator` sea válido           |
| Responsive no funciona    | Verifica que `responsive` esté en `true`      |
| Truncado no funciona      | Verifica que `truncateLength` sea mayor que 0 |
| Accesibilidad no funciona | Verifica que `ariaLabel` esté configurado     |

## 🐞 Reportar Problemas

Si encuentras algún problema en la lógica del componente, por favor
[🐞Reportalo](https://github.com/Alexiisart/openiis-ui/issues/new)
