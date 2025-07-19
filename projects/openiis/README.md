# OpenIIS UI 🎨

Una librería moderna de componentes UI para Angular con temas personalizables y componentes standalone.

[![npm version](https://badge.fury.io/js/openiis-ui.svg)](https://www.npmjs.com/package/openiis-ui)
[![Angular](https://img.shields.io/badge/Angular-19.2+-red.svg)](https://angular.io/)
[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](https://opensource.org/licenses/MIT)

## 🚀 Características

- ✅ **Componentes Standalone** - Importa solo lo que necesitas
- ✅ **Temas Personalizables** - 4 temas incluidos + tema custom
- ✅ **Modo Oscuro** - Soporte automático para dark mode
- ✅ **ng-add Schematic** - Configuración automática
- ✅ **TypeScript** - Completamente tipado
- ✅ **Responsive** - Diseño adaptable
- ✅ **Moderno** - Última versión de Angular (19.2+)

## 📦 Instalación

### Opción 1: Con ng-add (Recomendado)

```bash
ng add openiis-ui
```

El schematic te guiará para seleccionar un tema y configurará automáticamente tu proyecto.

### Opción 2: Instalación manual

```bash
npm install openiis-ui
```

## 🎨 Temas Disponibles

### 1. **Classic** (Por defecto)

Tema clásico y elegante con colores equilibrados.

### 2. **Neutral**

Tema minimalista con colores neutros y sobrios.

### 3. **Vivid**

Tema vibrante y colorido para interfaces más llamativas.

### 4. **Custom**

¡Tema completamente personalizable! Puedes definir tus propios colores en la carpeta `styles` utilizando las siguientes variables:

- `--custom-primary-500`: Color principal
- `--custom-background`: Color de fondo
- `--custom-text-primary`: Color de texto principal

Estas variables permitirán que el sistema genere automáticamente una paleta completa de variaciones.

## 🛠️ Uso

### Componentes Standalone

Todos los componentes son standalone. Importa directamente donde los necesites:

```typescript
import { Component } from "@angular/core";
import { OpeniisButtonComponent, OpeniisCardComponent, OpeniisInputComponent } from "openiis-ui";

@Component({
  selector: "app-example",
  standalone: true,
  imports: [OpeniisButtonComponent, OpeniisCardComponent, OpeniisInputComponent],
  template: `
    <openiis-card>
      <h1>¡Hola OpenIIS UI!</h1>
      <openiis-input placeholder="Escribe algo..." [(ngModel)]="texto"> </openiis-input>
      <openiis-button variant="primary" (click)="onClick()"> ¡Click me! </openiis-button>
    </openiis-card>
  `,
})
export class ExampleComponent {
  texto = "";

  onClick() {
    console.log("¡Funciona!", this.texto);
  }
}
```

### Configurar Tema

```typescript
// En tu app.component.ts (ya se configura automáticamente con ng-add)
export class AppComponent implements OnInit {
  ngOnInit() {
    // Para temas predefinidos
    document.documentElement.setAttribute("data-openiis-theme", "classic");

    // Para tema custom (si lo tienes configurado)
    document.documentElement.setAttribute("data-openiis-theme", "custom");
  }
}
```

## 🧩 Componentes Disponibles

### Buttons

- `OpeniisButtonComponent` - Botones con múltiples variantes
- `OpeniisButtonGroupComponent` - Grupo de botones
- `OpeniiFabComponent` - Floating Action Button

### Inputs

- `OpeniisInputComponent` - Input con validaciones
- `OpeniisDateInputComponent` - Selector de fechas
- `OpeniisSearchInputComponent` - Input de búsqueda

### Form Controls

- `OpeniisCheckboxComponent` - Checkbox personalizable
- `OpeniisRadioButtonComponent` - Radio buttons
- `OpenisSwitchComponent` - Switch/toggle

### Layout

- `OpeniisCardComponent` - Tarjetas contenedoras
- `OpeniisModalComponent` - Modales
- `OpenisSidebarComponent` - Sidebar/menú lateral

### Navigation

- `OpenisBreadcrumbComponent` - Navegación breadcrumb
- `OpeniisTabsComponent` - Pestañas

### Display

- `OpeniisAvatarComponent` - Avatares de usuario
- `OpeniiBadgeComponent` - Badges/etiquetas
- `OpeniisSpinnerComponent` - Indicadores de carga
- `OpeniisTooltipComponent` - Tooltips

### Feedback

- `OpeniisAlertModalComponent` - Alertas
- `OpeniisConfirmModalComponent` - Confirmaciones
- `OpeniisToastComponent` - Notificaciones toast
- `OpeniisEmptyStateComponent` - Estados vacíos

### Advanced

- `OpeniisDropdownComponent` - Dropdowns
- `OpeniisSearchableDropdownComponent` - Dropdown con búsqueda
- `OpeniisUploaderComponent` - Subida de archivos

## 🎨 Tema Custom - Configuración Avanzada

Cuando usas `ng add openiis-ui` y seleccionas "Custom":

```bash
? Selecciona un tema para OpenIIS UI: Custom - Personaliza tus propios colores
? Ingresa el color principal (hex, ej: #14b8a6): #6366f1
? Ingresa el color de fondo (hex, ej: #ffffff): #ffffff
? Ingresa el color de texto principal (hex, ej: #171717): #1f2937
```

### ¿Qué hace automáticamente?

1. **Genera paleta completa**: 50, 100, 200... hasta 900
2. **Crea archivo CSS**: `src/styles/openiis-custom-theme.css`
3. **Configura angular.json**: Añade estilos automáticamente
4. **Soporte dark mode**: Variables para modo oscuro incluidas

### Resultado generado:

```css
[data-openiis-theme="custom"] {
  --primary-50: #eef2ff;
  --primary-100: #e0e7ff;
  --primary-200: #c7d2fe;
  --primary-300: #a5b4fc;
  --primary-400: #818cf8;
  --primary-500: #6366f1; /* Tu color principal */
  --primary-600: #4f46e5;
  --primary-700: #4338ca;
  --primary-800: #3730a3;
  --primary-900: #312e81;

  --color-background: #ffffff;
  --color-text-primary: #1f2937;
  /* + muchas más variables */
}
```

## 🔧 Configuración Manual

Si prefieres configurar sin el schematic:

```bash
# Instalar
npm install openiis-ui

# Agregar estilos en angular.json
"styles": [
  "src/styles.css",
  "node_modules/openiis-ui/styles/themes/classic.css"
]
```

## 📖 Documentación y Ejemplos

- [📖**Documentación completa**](https://github.com/Alexiisart/openiis-ui/wiki)
- [💻 **Demo en vivo**](https://ui.openiis.org)

## 🤝 Contribuir

¡Las contribuciones son bienvenidas!

1. Fork el proyecto
2. Crea tu feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit tus cambios (`git commit -m 'Add some AmazingFeature'`)
4. Push al branch (`git push origin feature/AmazingFeature`)
5. Abre un Pull Request

## 📄 Licencia

Este proyecto está bajo la Licencia MIT - ver el archivo [LICENSE](https://github.com/Alexiisart/openiis-ui/wiki/license) para detalles.

## 👨‍💻 Autor

**OpenIIS Team**

- GitHub: [@alexiisart](https://github.com/alexiisart)

## ⭐ ¿Te gusta el proyecto?

¡Dale una estrella en GitHub y compártelo!

---

**Hecho con ❤️ para la comunidad Angular**
