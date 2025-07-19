# Sidebar

Componente de navegación lateral elegante y reutilizable con submenús, búsqueda, modo acordeón y soporte completo para dispositivos móviles.

## 📦 Instalación

```typescript
import { OpeniisSidebarComponent } from 'openiis-ui';

@Component({
  imports: [OpeniisSidebarComponent],
})
```

## ⚙️ Properties

| Property            | Tipo                   | Default       | Descripción               |
| ------------------- | ---------------------- | ------------- | ------------------------- |
| `menuItems`         | `MenuItem[]`           | `[]`          | Array de items del menú   |
| `accordionMode`     | `boolean`              | `true`        | Solo un submenu abierto   |
| `searchPlaceholder` | `string`               | `'Buscar...'` | Placeholder del buscador  |
| `searchVisible`     | `boolean`              | `true`        | Mostrar barra de búsqueda |
| `searchSize`        | `'sm' \| 'md' \| 'lg'` | `'md'`        | Tamaño del buscador       |
| `variant`           | `InputVariant`         | `'outlined'`  | Variante del buscador     |

## 📡 Events

| Event        | Tipo  | Descripción                     |
| ------------ | ----- | ------------------------------- |
| `openChange` | `any` | Emitido al abrir/cerrar sidebar |

## 🏗️ Interfaces

```typescript
interface MenuItem {
  route: string;
  name: string;
  icon?: string;
  submenu?: {
    title?: string;
    items: SubmenuItem[];
  }[];
}

interface SubmenuItem {
  route?: string;
  name: string;
  icon?: string;
  reference?: string;
  title?: string;
}
```

## 💡 Ejemplos Prácticos

### 1. Sidebar Básico

```html
<openiis-sidebar [menuItems]="basicMenuItems" [accordionMode]="true" [searchVisible]="true" (openChange)="onSidebarToggle($event)"> </openiis-sidebar>
```

```typescript
export class MyComponent {
  basicMenuItems: any[] = [
    {
      route: "/dashboard",
      name: "Dashboard",
      icon: "dashboard",
    },
    {
      route: "/usuarios",
      name: "Usuarios",
      icon: "people",
      submenu: [
        {
          title: "Gestión",
          items: [
            { name: "Lista de Usuarios", route: "/usuarios/lista" },
            { name: "Crear Usuario", route: "/usuarios/crear" },
            { name: "Roles", route: "/usuarios/roles" },
          ],
        },
      ],
    },
    {
      route: "/configuracion",
      name: "Configuración",
      icon: "settings",
      submenu: [
        {
          title: "Sistema",
          items: [
            { name: "General", route: "/configuracion/general" },
            { name: "Seguridad", route: "/configuracion/seguridad" },
            { name: "Backup", route: "/configuracion/backup" },
          ],
        },
      ],
    },
  ];

  onSidebarToggle(isOpen: any) {
    console.log("Sidebar is open:", isOpen);
  }
}
```

### 2. Sidebar con Submenús Complejos

```html
<openiis-sidebar [menuItems]="complexMenuItems" [accordionMode]="false" [searchVisible]="true" searchPlaceholder="Buscar en el menú..." (openChange)="onSidebarToggle($event)"> </openiis-sidebar>
```

```typescript
export class MyComponent {
  complexMenuItems: any[] = [
    {
      route: "/inicio",
      name: "Inicio",
      icon: "home",
    },
    {
      route: "/productos",
      name: "Productos",
      icon: "inventory",
      submenu: [
        {
          title: "Gestión",
          items: [
            { name: "Lista de Productos", route: "/productos/lista" },
            { name: "Crear Producto", route: "/productos/crear" },
            { name: "Categorías", route: "/productos/categorias" },
          ],
        },
        {
          title: "Análisis",
          items: [
            { name: "Ventas", route: "/productos/analisis/ventas" },
            { name: "Stock", route: "/productos/analisis/stock" },
            { name: "Rendimiento", route: "/productos/analisis/rendimiento" },
          ],
        },
      ],
    },
    {
      route: "/reportes",
      name: "Reportes",
      icon: "assessment",
      submenu: [
        {
          title: "Financieros",
          items: [
            { name: "Ingresos", route: "/reportes/financieros/ingresos" },
            { name: "Gastos", route: "/reportes/financieros/gastos" },
            { name: "Balance", route: "/reportes/financieros/balance" },
          ],
        },
        {
          title: "Operativos",
          items: [
            { name: "Productividad", route: "/reportes/operativos/productividad" },
            { name: "Eficiencia", route: "/reportes/operativos/eficiencia" },
          ],
        },
      ],
    },
  ];

  onSidebarToggle(isOpen: any) {
    console.log("Sidebar is open:", isOpen);
  }
}
```

### 3. Sidebar con Referencias (Anchors)

```html
<openiis-sidebar [menuItems]="anchorMenuItems" [accordionMode]="true" [searchVisible]="false" (openChange)="onSidebarToggle($event)"> </openiis-sidebar>
```

```typescript
export class MyComponent {
  anchorMenuItems: any[] = [
    {
      route: "/documentacion",
      name: "Documentación",
      icon: "book",
      submenu: [
        {
          title: "Guías",
          items: [
            { name: "Introducción", route: "/documentacion", reference: "introduccion" },
            { name: "Instalación", route: "/documentacion", reference: "instalacion" },
            { name: "Configuración", route: "/documentacion", reference: "configuracion" },
          ],
        },
        {
          title: "API",
          items: [
            { name: "Componentes", route: "/documentacion", reference: "componentes" },
            { name: "Servicios", route: "/documentacion", reference: "servicios" },
            { name: "Directivas", route: "/documentacion", reference: "directivas" },
          ],
        },
      ],
    },
  ];

  onSidebarToggle(isOpen: any) {
    console.log("Sidebar is open:", isOpen);
  }
}
```

### 4. Sidebar con Búsqueda Personalizada

```html
<openiis-sidebar [menuItems]="searchMenuItems" [accordionMode]="true" [searchVisible]="true" searchPlaceholder="Buscar funcionalidades..." searchSize="lg" variant="filled" (openChange)="onSidebarToggle($event)"> </openiis-sidebar>
```

```typescript
export class MyComponent {
  searchMenuItems: any[] = [
    {
      route: "/dashboard",
      name: "Panel Principal",
      icon: "dashboard",
    },
    {
      route: "/usuarios",
      name: "Gestión de Usuarios",
      icon: "people",
      submenu: [
        {
          title: "Administración",
          items: [
            { name: "Lista de Usuarios", route: "/usuarios/lista" },
            { name: "Crear Nuevo Usuario", route: "/usuarios/crear" },
            { name: "Editar Usuario", route: "/usuarios/editar" },
            { name: "Eliminar Usuario", route: "/usuarios/eliminar" },
          ],
        },
        {
          title: "Permisos",
          items: [
            { name: "Roles de Usuario", route: "/usuarios/roles" },
            { name: "Permisos Específicos", route: "/usuarios/permisos" },
            { name: "Grupos de Usuarios", route: "/usuarios/grupos" },
          ],
        },
      ],
    },
    {
      route: "/configuracion",
      name: "Configuración del Sistema",
      icon: "settings",
      submenu: [
        {
          title: "General",
          items: [
            { name: "Configuración General", route: "/configuracion/general" },
            { name: "Configuración de Red", route: "/configuracion/red" },
            { name: "Configuración de Base de Datos", route: "/configuracion/database" },
          ],
        },
        {
          title: "Seguridad",
          items: [
            { name: "Configuración de Seguridad", route: "/configuracion/seguridad" },
            { name: "Configuración de Firewall", route: "/configuracion/firewall" },
            { name: "Configuración de SSL", route: "/configuracion/ssl" },
          ],
        },
      ],
    },
  ];

  onSidebarToggle(isOpen: any) {
    console.log("Sidebar is open:", isOpen);
  }
}
```

### 5. Sidebar sin Modo Acordeón

```html
<openiis-sidebar [menuItems]="multiMenuItems" [accordionMode]="false" [searchVisible]="true" (openChange)="onSidebarToggle($event)"> </openiis-sidebar>
```

```typescript
export class MyComponent {
  multiMenuItems: any[] = [
    {
      route: "/dashboard",
      name: "Dashboard",
      icon: "dashboard",
    },
    {
      route: "/usuarios",
      name: "Usuarios",
      icon: "people",
      submenu: [
        {
          title: "Gestión",
          items: [
            { name: "Lista", route: "/usuarios/lista" },
            { name: "Crear", route: "/usuarios/crear" },
          ],
        },
      ],
    },
    {
      route: "/productos",
      name: "Productos",
      icon: "inventory",
      submenu: [
        {
          title: "Gestión",
          items: [
            { name: "Lista", route: "/productos/lista" },
            { name: "Crear", route: "/productos/crear" },
          ],
        },
      ],
    },
    {
      route: "/reportes",
      name: "Reportes",
      icon: "assessment",
      submenu: [
        {
          title: "Financieros",
          items: [
            { name: "Ventas", route: "/reportes/ventas" },
            { name: "Gastos", route: "/reportes/gastos" },
          ],
        },
      ],
    },
  ];

  onSidebarToggle(isOpen: any) {
    console.log("Sidebar is open:", isOpen);
  }
}
```

## ⚡ Comportamiento

### Navegación

- **Clic en item principal**: Navega a la ruta o expande submenu
- **Clic en subitem**: Navega a la ruta específica
- **Referencias**: Navega con fragmentos para anchors
- **Auto-cierre**: Se cierra automáticamente en móviles

### Búsqueda

- **Filtrado en tiempo real**: Busca en nombres de items y subitems
- **Expansión automática**: Expande submenús que contienen resultados
- **Limpieza**: Restaura estado original al limpiar búsqueda

### Modo Acordeón

- **Activado**: Solo un submenu abierto a la vez
- **Desactivado**: Múltiples submenús pueden estar abiertos
- **Auto-expansión**: Expande automáticamente menús activos

### Responsive

- **Desktop**: Sidebar fijo visible
- **Móvil**: Sidebar oculto con botón hamburguesa
- **Overlay**: Fondo oscuro en móviles
- **Scroll lock**: Bloquea scroll del body en móviles

## ✅ Características

- ✅ Navegación jerárquica con submenús
- ✅ Búsqueda en tiempo real
- ✅ Modo acordeón configurable
- ✅ Soporte para referencias (anchors)
- ✅ Responsive design completo
- ✅ Auto-expansión de menús activos
- ✅ Iconos Material Icons
- ✅ Animaciones suaves
- ✅ Navegación por teclado
- ✅ Accesibilidad completa
- ✅ Scroll lock en móviles
- ✅ Integración con Angular Router

## 🎨 Estilos Automáticos

- **Jerarquía visual**: Indentación y líneas para subitems
- **Estados activos**: Resaltado de rutas activas
- **Hover effects**: Efectos al pasar el mouse
- **Animaciones**: Transiciones suaves para expansión
- **Responsive**: Adaptación automática a móviles
- **Accesibilidad**: Indicadores de foco y ARIA

## 🔧 Funcionalidades Especiales

### Búsqueda Inteligente

```typescript
// Busca en nombres de items y subitems
[searchVisible] = "true";
searchPlaceholder = "Buscar funcionalidades...";
```

### Modo Acordeón

```typescript
// Solo un submenu abierto a la vez
[accordionMode] = // Múltiples submenús abiertos
"true"[accordionMode] = "false";
```

### Referencias (Anchors)

```typescript
// Navega a sección específica de la página
{
  name: 'Introducción',
  route: '/documentacion',
  reference: 'introduccion'
}
```

### Submenús con Títulos

```typescript
{
  route: '/usuarios',
  name: 'Usuarios',
  submenu: [
    {
      title: 'Gestión',
      items: [
        { name: 'Lista', route: '/usuarios/lista' }
      ]
    }
  ]
}
```

## 🚨 Solución de Problemas

| Problema                 | Solución                                           |
| ------------------------ | -------------------------------------------------- |
| Sidebar no responde      | Verifica que los items tengan `route` válida       |
| Búsqueda no funciona     | Verifica que `searchVisible` esté en `true`        |
| Submenús no se expanden  | Verifica que `submenu` esté definido correctamente |
| No se cierra en móviles  | Verifica que `isMobile` se detecte correctamente   |
| Referencias no funcionan | Verifica que el elemento tenga el `id` correcto    |
| Scroll no se bloquea     | Verifica que `ScrollService` esté inyectado        |
| Iconos no aparecen       | Verifica que Material Icons esté importado         |

## 🐞 Reportar Problemas

Si encuentras algún problema en la lógica del componente, por favor
[🐞Reportalo](https://github.com/Alexiisart/openiis-ui/issues/new)
