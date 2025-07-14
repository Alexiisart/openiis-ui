# Sidebar Component

## Descripción

El `SidebarComponent` es un componente de navegación vertical altamente configurable, diseñado para mostrar menús jerárquicos. Incluye funcionalidades de búsqueda en tiempo real, modo acordeón para submenús, navegación a referencias específicas dentro de las páginas y seguimiento automático de la ruta activa para una experiencia de usuario fluida e intuitiva.

## Características

- ✅ **Menú Jerárquico:** Soporte para múltiples niveles de anidación (menús y submenús).
- ✅ **Búsqueda Integrada:** Filtra los elementos del menú y submenú en tiempo real.
- ✅ **Modo Acordeón:** Opción para permitir que solo un submenú esté abierto a la vez.
- ✅ **Estado Activo Automático:** Resalta el ítem activo y expande su submenú padre automáticamente según la ruta actual.
- ✅ **Navegación con Router:** Integración completa con el Router de Angular.
- ✅ **Navegación a Referencias:** Permite navegar a secciones específicas dentro de una página usando IDs.
- ✅ **Personalizable:** Permite configurar la visibilidad y el placeholder de la búsqueda.
- ✅ **Iconos:** Soporte para [Material Icons](https://fonts.google.com/icons) en cada elemento del menú.

## Estructura de Datos (MenuItem)

El componente funciona con un array de objetos que implementan la interfaz `MenuItem`:

```typescript
export interface MenuItem {
  route: string; // Ruta para la navegación
  name: string; // Texto a mostrar
  icon?: string; // (Opcional) Nombre del Material Icon
  submenu?: {
    title?: string; // (Opcional) Título para una sección del submenú
    items: SubmenuItem[]; // Array de sub-items
  }[];
}

export interface SubmenuItem {
  route?: string; // Ruta específica para este subitem (opcional, usa la ruta del padre si no se especifica)
  name: string; // Texto a mostrar
  icon?: string; // (Opcional) Nombre del Material Icon
  reference?: string; // (Opcional) ID del elemento al que navegar dentro de la página
  title?: string; // (Opcional) Título para una sección del submenú
}
```

## Uso Básico

Para usar el componente, pásale un array de `MenuItem` a través de su Input.

```html
<!-- en-tu-componente.html -->
<openiis-sidebar [menuItems]="menu"></openiis-sidebar>
```

```typescript
// en-tu-componente.ts
import { Component } from "@angular/core";
import { MenuItem } from "ruta/a/sidebar.component";

@Component({
  selector: "app-tu-componente",
  templateUrl: "./tu-componente.html",
})
export class TuComponente {
  menu: MenuItem[] = [
    { name: "Dashboard", route: "/dashboard", icon: "dashboard" },
    {
      name: "Documentación",
      route: "/docs",
      icon: "description",
      submenu: [
        {
          items: [
            { name: "Introducción", route: "/docs/intro" },
            { name: "Instalación", route: "/docs/setup", reference: "installation" },
            { name: "Configuración", route: "/docs/setup", reference: "configuration" },
          ],
        },
      ],
    },
    { name: "Configuración", route: "/configuracion", icon: "settings" },
  ];
}
```

## Props (Inputs)

| Prop                | Tipo         | Por Defecto   | Descripción                                                           |
| ------------------- | ------------ | ------------- | --------------------------------------------------------------------- |
| `menuItems`         | `MenuItem[]` | `[]`          | **Requerido.** El array de objetos que define la estructura del menú. |
| `accordionMode`     | `boolean`    | `true`        | Si es `true`, solo un submenú puede estar expandido a la vez.         |
| `searchPlaceholder` | `string`     | `'Buscar...'` | Texto que se muestra en el campo de búsqueda.                         |
| `searchVisible`     | `boolean`    | `true`        | Controla si el campo de búsqueda está visible.                        |

## Comportamiento

### Búsqueda

- La búsqueda filtra los elementos principales y los sub-elementos que coincidan con el término introducido.
- Los menús que contienen resultados de búsqueda se expanden automáticamente para mostrar las coincidencias.
- Al limpiar la búsqueda, el menú vuelve a su estado original, respetando la ruta activa.

### Navegación

- Hacer clic en un elemento sin submenú navega directamente a su `route`.
- Hacer clic en un elemento con submenú expande o colapsa el submenú.
- Si un subitem tiene una `reference`, al hacer clic se navegará primero a la ruta y luego se desplazará suavemente hasta el elemento con ese ID.
- El componente detecta la ruta activa y las referencias visibles para mantener actualizado el estado de selección.

## Ejemplo con Referencias

Este ejemplo muestra un menú que incluye navegación a secciones específicas dentro de una página:

```typescript
menuConReferencias: MenuItem[] = [
  { name: 'Inicio', route: '/inicio', icon: 'home' },
  {
    name: 'Guía de Usuario',
    route: '/guia',
    icon: 'book',
    submenu: [
      {
        title: 'Primeros Pasos',
        items: [
          { name: 'Introducción', route: '/guia', reference: 'intro' },
          { name: 'Requisitos', route: '/guia', reference: 'requisitos' },
          { name: 'Instalación', route: '/guia', reference: 'instalacion' },
        ],
      },
      {
        title: 'Configuración',
        items: [
          { name: 'Variables de Entorno', route: '/guia/config', reference: 'env-vars' },
          { name: 'Base de Datos', route: '/guia/config', reference: 'database' },
        ],
      },
    ],
  },
];
```

Para que la navegación a referencias funcione correctamente, asegúrate de que los elementos en tu página tengan los IDs correspondientes:

```html
<div id="intro">
  <h2>Introducción</h2>
  <!-- contenido -->
</div>

<div id="requisitos">
  <h2>Requisitos del Sistema</h2>
  <!-- contenido -->
</div>

<div id="instalacion">
  <h2>Guía de Instalación</h2>
  <!-- contenido -->
</div>
```

## Dependencias

- `@angular/common`
- `@angular/router`
- `OpeniisSearchInputComponent` (Componente de búsqueda de esta misma librería)
