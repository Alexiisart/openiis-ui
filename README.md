# 🎨 OpenIIS UI

OpenIIS UI es una biblioteca de componentes Angular moderna y altamente personalizable, diseñada para crear interfaces de usuario elegantes y accesibles. Esta biblioteca ofrece un conjunto completo de componentes que siguen las mejores prácticas de diseño y desarrollo.

## ✨ Características

- 🎯 **Diseño Moderno**: Componentes con estética contemporánea y profesional
- 🌗 **Modo Oscuro**: Soporte completo para temas claro y oscuro
- 🎨 **Temas Personalizables**: Sistema de temas flexible (Classic, Neutral, Vivid)
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
- **Date Input**: Selector de fechas con validaciones
- **File Upload**: Soporte para drag & drop y preview

### Feedback

- **Tooltips**: Múltiples posiciones y variantes
- **Modals**: Alert, confirm y custom
- **Toast**: Notificaciones emergentes
- **Badges**: Estados y tamaños variados
- **Progress Bar**: Lineal con estados

### Navegación

- **Breadcrumbs**: Navegación jerárquica
- **FAB**: Botones de acción flotante
- **Button Groups**: Agrupación de acciones

### Contenido

- **Cards**: Múltiples layouts y acciones
- **Tables**: Ordenamiento y paginación
- **Empty States**: Estados vacíos personalizables
- **Avatar**: Imágenes de perfil con fallback

## 🚀 Instalación

\`\`\`bash
npm install openiis-ui
\`\`\`

## 📖 Uso

1. **Importa el módulo**:
   \`\`\`typescript
   import { OpeniisButtonComponent } from 'openiis-ui';

@NgModule({
imports: [
OpeniisButtonComponent
]
})
\`\`\`

2. **Usa los componentes**:
   \`\`\`html
   <openiis-button
   type="primary"
   text="Mi Botón"
   iconLeft="add"
   size="md"
   (clickEvent)="onButtonClick()"
   > </openiis-button>
   > \`\`\`

## 🎨 Temas

OpenIIS UI incluye tres temas predefinidos:

- **Classic**: Diseño tradicional y profesional
- **Neutral**: Paleta de colores suave y minimalista
- **Vivid**: Colores vibrantes y modernos

Para cambiar el tema:

\`\`\`typescript
this.themeService.setTheme('vivid');
\`\`\`

## 🌙 Modo Oscuro

Activar/desactivar el modo oscuro:

\`\`\`typescript
this.themeService.toggleDarkMode();
\`\`\`

## 📚 Documentación

Visita nuestra [documentación completa](https://github.com/tuusuario/openiis-ui/wiki) para ver:

- Guías detalladas
- API de componentes
- Ejemplos de uso
- Mejores prácticas
- Personalización avanzada

## 🤝 Contribuir

¡Las contribuciones son bienvenidas! Por favor, lee nuestra [guía de contribución](CONTRIBUTING.md).

## 📄 Licencia

Este proyecto está bajo la Licencia MIT - ver el archivo [LICENSE](LICENSE) para más detalles.

## 🙋‍♂️ Soporte

- 📧 Email: tu@email.com
- 🐛 Issues: [GitHub Issues](https://github.com/tuusuario/openiis-ui/issues)
- 💬 Discussions: [GitHub Discussions](https://github.com/tuusuario/openiis-ui/discussions)

## 🌟 Showcase

¿Usando OpenIIS UI? ¡Nos encantaría ver tu proyecto! Agrégalo a nuestra [galería de proyectos](https://github.com/tuusuario/openiis-ui/wiki/Showcase).

---

Hecho con ❤️ por el equipo de OpenIIS
