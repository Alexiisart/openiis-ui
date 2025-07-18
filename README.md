# 🎨 OpenIIS UI

OpenIIS UI es una biblioteca de componentes Angular moderna y altamente personalizable, diseñada para crear interfaces de usuario elegantes y accesibles. Esta biblioteca ofrece un conjunto completo de componentes que siguen las mejores prácticas de diseño y desarrollo.

## ✨ Características

- 🎯 **Diseño Moderno**: Componentes con estética contemporánea y profesional
- 🌗 **Modo Oscuro**: Soporte completo para temas claro y oscuro
- 🎨 **Temas Personalizables**: Sistema de temas flexible (Classic, Neutral, Vivid)
- 🌐 **Multiidioma**: i18n -> Cualquier idioma
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
- **Spinner**: Indicadores de carga

### Contenido

- **Cards**: Múltiples layouts y acciones
- **Empty States**: Estados vacíos personalizables
- **Avatar**: Imágenes de perfil con fallback

### ⚙️ Servicios

- [**Dark Mode Service**](https://github.com/Alexiisart/openiis-ui/wiki/Mode-Service) - Gestión de temas claro/oscuro
- [**SVG Icon Service**](https://github.com/Alexiisart/openiis-ui/wiki/SVG-Icon-Service) - Gestión de iconos SVG

## 🚀 Instalación

```bash
ng add openiis-ui
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

Para ejecutar el proyecto:

```bash
npm install
npm start

```

## 🌐 Sitio Oficial

[ui.openiis.org](https://ui.openiis.org)

## 📄 Documentación

[Documentacion Oficial](https://github.com/Alexiisart/openiis-ui/wiki)

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
