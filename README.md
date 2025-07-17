# 🎨 OpenIIS UI

OpenIIS UI es una biblioteca de componentes Angular moderna y altamente personalizable, diseñada para crear interfaces de usuario elegantes y accesibles. Esta biblioteca ofrece un conjunto completo de componentes que siguen las mejores prácticas de diseño y desarrollo.

## ✨ Características

- 🎯 **Diseño Moderno**: Componentes con estética contemporánea y profesional
- 🌗 **Modo Oscuro**: Soporte completo para temas claro y oscuro
- 🎨 **Temas Personalizables**: Sistema de temas flexible (Classic, Neutral, Vivid)
- 🌐 **Multiidioma**: Soporte para español, inglés y chino
- ♿ **Accesibilidad**: Componentes diseñados siguiendo WCAG 2.1
- 📱 **Responsive**: Diseño adaptable para todas las pantallas
- 🚀 **Alto Rendimiento**: Optimizado para máxima eficiencia
- 🧩 **Modular**: Componentes independientes y reutilizables

## 🛠️ Componentes

### Formularios

- **Buttons**: Variantes primary, secondary, outline, ghost, etc.
- **Inputs**: Text, email, password, URL, tel, number
- **Select/Dropdowns**: Básico y searchable
- **Checkboxes**: Multiple estados y variantes
- **Radio Buttons**: Grupos personalizables
- **Switch**: Interruptores con múltiples tamaños
- **Date Input**: Selector de fechas con validaciones
- **File Upload**: Soporte para drag & drop y preview

### Navegación

- **Tabs**:Sistema de pestañas simplificado y eficiente
  - Variantes: Line, Pills, Cards, Buttons
  - Tamaños: SM, MD, LG
  - Soporte para iconos y badges
  - Implementación simplificada y de alto rendimiento
- **Breadcrumbs**: Navegación jerárquica
- **FAB**: Botones de acción flotante
- **Button Groups**: Agrupación de acciones

### Feedback

- **Tooltips**: Múltiples posiciones y variantes
- **Modals**: Alert, confirm y custom
- **Toast**: Notificaciones emergentes
- **Badges**: Estados y tamaños variados
- **Progress Bar**: Lineal con estados
- **Spinner**: Indicadores de carga

### Contenido

- **Cards**: Múltiples layouts y acciones
- **Tables**: Ordenamiento y paginación
- **Empty States**: Estados vacíos personalizables
- **Avatar**: Imágenes de perfil con fallback

## 🚀 Instalación

```bash
npm install openiis-ui
```

## 📖 Uso

### Configuración Básica

1. **Importa el módulo**:

   ```typescript
   import { OpeniisButtonComponent } from 'openiis-ui';

   @NgModule({
     imports: [
       OpeniisButtonComponent
     ]
   })
   ```

2. **Usa los componentes**:
   ```html
   <openiis-button type="primary" text="Mi Botón" iconLeft="add" size="md" (clickEvent)="onButtonClick()"> </openiis-button>
   ```

### Componente Tabs (Nuevo)

```typescript
// En tu componente
export class MyComponent {
  tabs = [
    { id: "general", label: "General", active: true, icon: "settings" },
    { id: "profile", label: "Perfil", icon: "person" },
    { id: "notifications", label: "Notificaciones", icon: "notifications", badge: "3" },
  ];

  onTabChange(tabId: string) {
    console.log("Tab seleccionado:", tabId);
  }
}
```

```html
<!-- Pestañas básicas -->
<openiis-tabs variant="line" size="md" [tabs]="tabs" (tabChange)="onTabChange($event)">
  <div slot="tab-content-general">
    <h3>Configuración General</h3>
    <p>Contenido de configuración...</p>
  </div>

  <div slot="tab-content-profile">
    <h3>Información del Perfil</h3>
    <p>Datos del usuario...</p>
  </div>

  <div slot="tab-content-notifications">
    <h3>Notificaciones</h3>
    <p>Configuración de alertas...</p>
  </div>
</openiis-tabs>
```

#### Variantes de Tabs

```html
<!-- Pestañas tipo Pills -->
<openiis-tabs variant="pills" [tabs]="tabs">
  <!-- contenido -->
</openiis-tabs>

<!-- Pestañas tipo Cards -->
<openiis-tabs variant="cards" [tabs]="tabs">
  <!-- contenido -->
</openiis-tabs>

<!-- Pestañas tipo Buttons -->
<openiis-tabs variant="buttons" [tabs]="tabs">
  <!-- contenido -->
</openiis-tabs>
```

## 🎨 Temas

OpenIIS UI incluye tres temas predefinidos:

- **Classic**: Diseño tradicional y profesional
- **Neutral**: Paleta de colores suave y minimalista
- **Vivid**: Colores vibrantes y modernos

Para cambiar el tema:

```typescript
this.themeService.setTheme("vivid");
```

## 🌙 Modo Oscuro

Activar/desactivar el modo oscuro:

```typescript
this.themeService.setMode("dark");
this.themeService.setMode("light");
```

## 🌐 Multiidioma

Cambiar idioma de la interfaz:

```typescript
this.languageService.setLanguage("es"); // Español
this.languageService.setLanguage("en"); // Inglés
this.languageService.setLanguage("cn"); // Chino
```

## ⚡ Mejoras Recientes

### v2024.1 - Componente Tabs Refactorizado

- ✅ **Simplificación completa**: Reducción de +600 líneas de código complejo
- ✅ **Mayor rendimiento**: Implementación directa sin abstracciones innecesarias
- ✅ **Mejor mantenibilidad**: Código más limpio y fácil de entender
- ✅ **CSS optimizado**: Estilos inline para mejor encapsulación
- ✅ **TypeScript mejorado**: Tipos más estrictos y mejor inferencia
- ✅ **Compatibilidad total**: API compatible con versiones anteriores

### Arquitectura del Componente Tabs

El nuevo componente de tabs utiliza:

- **Proyección de contenido simple**: `ng-content` directo sin complejidad
- **Gestión de estado eficiente**: Manejo directo de clases CSS
- **Renderizado condicional**: Solo el contenido activo es visible
- **Accesibilidad nativa**: Atributos ARIA y navegación por teclado

## 🧪 Proyecto de Testing

Este repositorio (`openiis-ui-test`) es un entorno de desarrollo y testing para los componentes de OpenIIS UI. Incluye:

- 📋 **Demos interactivos** de todos los componentes
- 🎛️ **Panel de control** para temas e idiomas
- 🧪 **Casos de uso** reales y ejemplos
- 📊 **Testing visual** de todos los estados y variantes

Para ejecutar el proyecto:

```bash
npm install
npm start
```

## 🤝 Contribuir

¡Las contribuciones son bienvenidas! Por favor, lee nuestra [guía de contribución](CONTRIBUTING.md).

## 📄 Licencia

Este proyecto está bajo la Licencia MIT - ver el archivo [LICENSE](LICENSE.md) para más detalles.

## 🙋‍♂️ Soporte

- 📧 Email: openiis.org@gmail.com
- 🐛 Issues: [GitHub Issues](https://github.com/Alexiisart/openiis-ui/issues)

## 🌟 Showcase

¿Usando OpenIIS UI? ¡Nos encantaría ver tu proyecto! Agrégalo a nuestra [galería de proyectos](https://github.com/Alexiisart/openiis-ui/wiki/Showcase).

---

Hecho con ❤️ por el equipo de OpenIIS
