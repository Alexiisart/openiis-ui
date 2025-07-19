# Tabs

Componente de pestañas elegante y reutilizable con múltiples variantes, tamaños y soporte para iconos, badges y tooltips.

## 📦 Instalación

```typescript
import { OpeniisTabsComponent } from 'openiis-ui';

@Component({
  imports: [OpeniisTabsComponent],
})
```

## ⚙️ Properties

| Property    | Tipo          | Default  | Descripción                 |
| ----------- | ------------- | -------- | --------------------------- |
| `variant`   | `TabsVariant` | `'line'` | Variante visual de las tabs |
| `size`      | `TabsSize`    | `'md'`   | Tamaño de las tabs          |
| `tabs`      | `TabItem[]`   | `[]`     | Array de tabs a mostrar     |
| `activeTab` | `string`      | `''`     | ID de la tab activa         |

## 📡 Events

| Event       | Tipo     | Descripción                  |
| ----------- | -------- | ---------------------------- |
| `tabChange` | `string` | Emitido cuando cambia la tab |

## 📏 Tamaños

| Tamaño | Padding | Font-size | Uso               |
| ------ | ------- | --------- | ----------------- |
| `sm`   | 8px     | 12px      | Compacto          |
| `md`   | 12px    | 14px      | Mediano (default) |
| `lg`   | 16px    | 16px      | Grande            |

## 🎨 Variantes

| Variante  | Descripción              | Uso                   |
| --------- | ------------------------ | --------------------- |
| `line`    | Línea inferior (default) | Navegación general    |
| `pills`   | Píldoras redondeadas     | Categorías            |
| `cards`   | Tarjetas con bordes      | Secciones principales |
| `buttons` | Botones conectados       | Acciones relacionadas |

## 💡 Ejemplos Prácticos

### 1. Tabs Básicas

```html
<openiis-tabs variant="line" size="md" [tabs]="basicTabs">
  <div slot="tab-content-general">
    <h3>Configuración General</h3>
    <p>Aquí puedes configurar las opciones generales del sistema.</p>
    <ul>
      <li>Idioma predeterminado</li>
      <li>Zona horaria</li>
      <li>Configuración de red</li>
    </ul>
  </div>
  <div slot="tab-content-perfil">
    <h3>Información del Perfil</h3>
    <p>Gestiona tu información personal y preferencias.</p>
    <ul>
      <li>Datos personales</li>
      <li>Foto de perfil</li>
      <li>Información de contacto</li>
    </ul>
  </div>
  <div slot="tab-content-notificaciones">
    <h3>Configuración de Notificaciones</h3>
    <p>Controla cómo y cuándo recibes notificaciones.</p>
    <ul>
      <li>Notificaciones por email</li>
      <li>Notificaciones push</li>
      <li>Frecuencia de notificaciones</li>
    </ul>
  </div>
  <div slot="tab-content-seguridad">
    <h3>Configuración de Seguridad</h3>
    <p>Mantén tu cuenta segura con estas opciones.</p>
    <ul>
      <li>Cambiar contraseña</li>
      <li>Autenticación de dos factores</li>
      <li>Historial de sesiones</li>
    </ul>
  </div>
</openiis-tabs>
```

```typescript
export class MyComponent {
  basicTabs: any[] = [
    {
      id: "general",
      label: "General",
      active: true,
      icon: "settings",
    },
    {
      id: "perfil",
      label: "Perfil",
      icon: "person",
    },
    {
      id: "notificaciones",
      label: "Notificaciones",
      icon: "notifications",
      badge: "3",
    },
    {
      id: "seguridad",
      label: "Seguridad",
      icon: "security",
    },
  ];
}
```

### 2. Tabs Pills

```html
<openiis-tabs variant="pills" size="md" [tabs]="pillsTabs">
  <div slot="tab-content-dashboard">
    <h3>Panel de Control</h3>
    <p>Vista general de todas las métricas importantes del sistema.</p>
  </div>
  <div slot="tab-content-analytics">
    <h3>Análisis de Datos</h3>
    <p>Análisis detallado del rendimiento y tendencias.</p>
  </div>
  <div slot="tab-content-reports">
    <h3>Reportes Generados</h3>
    <p>Lista de todos los reportes disponibles en el sistema.</p>
  </div>
  <div slot="tab-content-settings2">
    <h3>Configuración del Sistema</h3>
    <p>Opciones avanzadas de configuración del sistema.</p>
  </div>
</openiis-tabs>
```

```typescript
export class MyComponent {
  pillsTabs: any[] = [
    {
      id: "dashboard",
      label: "Panel de Control",
      active: true,
      icon: "dashboard",
    },
    {
      id: "analytics",
      label: "Análisis de Datos",
      icon: "analytics",
    },
    {
      id: "reports",
      label: "Reportes Generados",
      icon: "assessment",
      badge: "5",
    },
    {
      id: "settings2",
      label: "Configuración del Sistema",
      icon: "settings",
    },
  ];
}
```

### 3. Tabs Cards

```html
<openiis-tabs variant="cards" size="md" [tabs]="cardsTabs">
  <div slot="tab-content-overview">
    <h3>Resumen del Proyecto</h3>
    <p>Información general y estadísticas del proyecto actual.</p>
  </div>
  <div slot="tab-content-details">
    <h3>Detalles Técnicos</h3>
    <p>Especificaciones técnicas y documentación del proyecto.</p>
  </div>
  <div slot="tab-content-history">
    <h3>Historial de Cambios</h3>
    <p>Log completo de todas las modificaciones realizadas.</p>
  </div>
</openiis-tabs>
```

```typescript
export class MyComponent {
  cardsTabs: any[] = [
    {
      id: "overview",
      label: "Resumen del Proyecto",
      active: true,
      icon: "fast_forward",
    },
    {
      id: "details",
      label: "Detalles Técnicos",
      icon: "info",
    },
    {
      id: "history",
      label: "Historial de Cambios",
      icon: "history",
    },
  ];
}
```

### 4. Tabs Buttons

```html
<openiis-tabs variant="buttons" size="md" [tabs]="buttonsTabs">
  <div slot="tab-content-edit">
    <h3>Modo de Edición</h3>
    <p>Editor de contenido con todas las herramientas de edición disponibles.</p>
  </div>
  <div slot="tab-content-preview">
    <h3>Vista Previa</h3>
    <p>Previsualiza cómo se verá el contenido antes de publicarlo.</p>
  </div>
  <div slot="tab-content-publish">
    <h3>Opciones de Publicación</h3>
    <p>Configura las opciones de publicación y distribución del contenido.</p>
  </div>
</openiis-tabs>
```

```typescript
export class MyComponent {
  buttonsTabs: any[] = [
    {
      id: "edit",
      label: "Modo de Edición",
      active: true,
      icon: "edit",
    },
    {
      id: "preview",
      label: "Vista Previa",
      icon: "preview",
    },
    {
      id: "publish",
      label: "Opciones de Publicación",
      icon: "publish",
    },
  ];
}
```

## 🏗️ Interfaces

```typescript
interface TabItem {
  id: string;
  label: string;
  active?: boolean;
  disabled?: boolean;
  icon?: string;
  badge?: string | number;
  tooltip?: string;
}

type TabsVariant = "line" | "pills" | "cards" | "buttons";
type TabsSize = "sm" | "md" | "lg";
```

## ⚡ Comportamiento

### Navegación

- **Clic**: Cambia a la tab seleccionada
- **Teclado**: Soporte para navegación por teclado
- **Accesibilidad**: ARIA roles y atributos completos

### Estados

- **Activo**: Tab seleccionada actualmente
- **Deshabilitado**: Tab no disponible
- **Hover**: Efectos visuales al pasar el mouse
- **Focus**: Indicador de foco para accesibilidad

### Contenido

- **Slots dinámicos**: Contenido se muestra/oculta automáticamente
- **Transiciones**: Animaciones suaves entre tabs
- **Responsive**: Se adapta a diferentes tamaños de pantalla

## ✅ Características

- ✅ 4 variantes visuales (line, pills, cards, buttons)
- ✅ 3 tamaños configurables (sm, md, lg)
- ✅ Iconos Material Icons
- ✅ Badges numéricos
- ✅ Tooltips informativos
- ✅ Estados disabled
- ✅ Navegación por teclado
- ✅ Accesibilidad completa
- ✅ Responsive design
- ✅ Scroll horizontal automático
- ✅ Contenido dinámico con slots

## 🎨 Estilos Automáticos

- **Variantes**: Cada variante tiene estilos únicos
- **Estados**: Hover, active, disabled, focus
- **Responsive**: Scroll horizontal en móviles
- **Animaciones**: Transiciones suaves
- **Accesibilidad**: Indicadores de foco y ARIA

## 🔧 Funcionalidades Especiales

### Slots de Contenido

```html
<!-- El contenido debe usar slots con el patrón: -->
<div slot="tab-content-{tabId}">
  <!-- Contenido de la tab -->
</div>
```

### Navegación por Teclado

```typescript
// Teclas soportadas:
// - Tab: Navegar entre tabs
// - Enter/Space: Seleccionar tab
// - Arrow keys: Navegar entre tabs
```

### Scroll Automático

```typescript
// En pantallas pequeñas, las tabs se pueden hacer scroll horizontal
// Implementado automáticamente
```

## 🚨 Solución de Problemas

| Problema                  | Solución                                          |
| ------------------------- | ------------------------------------------------- |
| Tabs no responden         | Verifica que no estén `disabled`                  |
| Contenido no se muestra   | Verifica que el slot tenga el formato correcto    |
| Estilos no se aplican     | Verifica que el tema Openiis UI esté configurado  |
| Scroll no funciona        | Verifica que el contenedor tenga ancho suficiente |
| Accesibilidad no funciona | Verifica que los roles ARIA estén presentes       |
| Iconos no aparecen        | Verifica que Material Icons esté importado        |
| Badges no se muestran     | Verifica que el valor de `badge` sea válido       |

## 🐞 Reportar Problemas

Si encuentras algún problema en la lógica del componente, por favor
[🐞Reportalo](https://github.com/Alexiisart/openiis-ui/issues/new)
