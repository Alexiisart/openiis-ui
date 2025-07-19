# Card

Componente de tarjeta elegante y reutilizable con múltiples variantes, tamaños, tipos de color, botones de acción y soporte completo para contenido multimedia.

## 📦 Instalación

```typescript
import { OpeniisCardComponent } from 'openiis-ui';

@Component({
  imports: [OpeniisCardComponent],
})
```

## ⚙️ Properties

| Property           | Tipo                                   | Default     | Descripción                 |
| ------------------ | -------------------------------------- | ----------- | --------------------------- |
| `title`            | `string`                               | `''`        | Título principal de la card |
| `subtitle`         | `string`                               | `''`        | Subtítulo de la card        |
| `description`      | `string`                               | `''`        | Descripción del contenido   |
| `size`             | `CardSize`                             | `'md'`      | Tamaño de la card           |
| `variant`          | `CardVariant`                          | `'default'` | Variante visual de la card  |
| `type`             | `CardType`                             | `'default'` | Tipo de color de la card    |
| `clickable`        | `boolean`                              | `false`     | Hacer la card clickeable    |
| `loading`          | `boolean`                              | `false`     | Estado de carga             |
| `disabled`         | `boolean`                              | `false`     | Deshabilitar la card        |
| `selectable`       | `boolean`                              | `false`     | Hacer la card seleccionable |
| `selected`         | `boolean`                              | `false`     | Estado seleccionado         |
| `hideOverflow`     | `boolean`                              | `true`      | Ocultar el overflow         |
| `responsive`       | `boolean`                              | `true`      | Hacer la card responsive    |
| `backgroundImage`  | `string`                               | `''`        | Imagen de fondo             |
| `role`             | `string`                               | `'article'` | Rol ARIA                    |
| `ariaLabel`        | `string`                               | `''`        | ARIA label                  |
| `ariaDescribedBy`  | `string`                               | `''`        | ARIA describedby            |
| `extraClasses`     | `string`                               | `''`        | Clases CSS adicionales      |
| `actionButtons`    | `CardButton[]`                         | `[]`        | Botones de acción           |
| `actionButtonSize` | `'xs' \| 'sm' \| 'md' \| 'lg' \| 'xl'` | `'sm'`      | Tamaño de botones de acción |

## 📡 Events

| Event               | Tipo  | Descripción                              |
| ------------------- | ----- | ---------------------------------------- |
| `cardClick`         | `any` | Emitido al hacer clic en la card         |
| `selectedChange`    | `any` | Emitido al cambiar selección             |
| `keyDown`           | `any` | Emitido al presionar tecla               |
| `actionButtonClick` | `any` | Emitido al hacer clic en botón de acción |

## 📏 Tamaños

| Tamaño | Border-radius | Padding | Font-size | Uso               |
| ------ | ------------- | ------- | --------- | ----------------- |
| `xs`   | 4px           | 12px    | 12px      | Compacto          |
| `sm`   | 6px           | 16px    | 14px      | Pequeño           |
| `md`   | 8px           | 16px    | 16px      | Mediano (default) |
| `lg`   | 12px          | 20px    | 18px      | Grande            |
| `xl`   | 16px          | 24px    | 20px      | Extra grande      |

## 🎨 Variantes

| Variante   | Descripción               | Uso                   |
| ---------- | ------------------------- | --------------------- |
| `default`  | Estilo estándar (default) | Contenido general     |
| `bordered` | Borde más grueso          | Énfasis visual        |
| `elevated` | Sombra elevada            | Destacar contenido    |
| `outlined` | Solo contorno             | Contenido minimalista |
| `filled`   | Fondo coloreado           | Categorías            |

## 🎯 Tipos de Color

| Tipo      | Descripción            | Uso                  |
| --------- | ---------------------- | -------------------- |
| `default` | Color neutro (default) | Contenido general    |
| `primary` | Color primario         | Acciones principales |
| `success` | Color de éxito         | Confirmaciones       |
| `warning` | Color de advertencia   | Alertas              |
| `danger`  | Color de peligro       | Errores              |
| `info`    | Color informativo      | Información          |

## 💡 Ejemplos Prácticos

### 1. Card Básica

```html
<openiis-card title="Título de la Card" subtitle="Subtítulo descriptivo" description="Esta es una descripción del contenido de la card que puede ser bastante larga." size="md" variant="default" type="default">
  <p>Contenido adicional de la card que puede incluir cualquier elemento HTML.</p>
</openiis-card>
```

```typescript
export class MyComponent {
  // No se requiere configuración adicional para card básica
}
```

### 2. Card con Media

```html
<openiis-card title="Producto Destacado" subtitle="Categoría: Electrónicos" description="Descripción del producto con características principales." size="lg" variant="elevated" type="primary">
  <div slot="media">
    <img src="/assets/product-image.jpg" alt="Producto" />
  </div>

  <div slot="header-actions">
    <button class="btn-favorite">❤️</button>
  </div>

  <p>Precio: $299.99</p>
  <p>Disponible en stock</p>

  <div slot="footer">
    <button class="btn-primary">Comprar Ahora</button>
    <button class="btn-secondary">Ver Detalles</button>
  </div>
</openiis-card>
```

```typescript
export class MyComponent {
  // Configuración para card con media
}
```

### 3. Card Clickeable

```html
<openiis-card title="Artículo del Blog" subtitle="Publicado hace 2 horas" description="Resumen del artículo que aparece en la página principal del blog." [clickable]="true" [loading]="false" variant="bordered" type="info" (cardClick)="onCardClick($event)">
  <div slot="media">
    <img src="/assets/blog-thumbnail.jpg" alt="Blog thumbnail" />
  </div>

  <p>Leer más sobre este interesante tema...</p>

  <div slot="footer">
    <span class="author">Por: Juan Pérez</span>
    <span class="read-time">5 min de lectura</span>
  </div>
</openiis-card>
```

```typescript
export class MyComponent {
  onCardClick(event: any) {
    console.log("Card clicked:", event);
    // Navegar al artículo completo
    this.router.navigate(["/blog/article-1"]);
  }
}
```

### 4. Card Seleccionable

```html
<openiis-card title="Plan Básico" subtitle="Ideal para pequeños proyectos" description="Incluye todas las funcionalidades básicas necesarias para comenzar." [selectable]="true" [selected]="selectedPlan === 'basic'" variant="outlined" type="primary" (selectedChange)="onPlanSelect($event)">
  <div slot="header-actions">
    <span class="price">$9.99/mes</span>
  </div>

  <ul>
    <li>✅ 5 proyectos</li>
    <li>✅ 10GB de almacenamiento</li>
    <li>✅ Soporte por email</li>
    <li>❌ Soporte prioritario</li>
  </ul>
</openiis-card>
```

```typescript
export class MyComponent {
  selectedPlan = "basic";

  onPlanSelect(selected: any) {
    this.selectedPlan = selected ? "basic" : null;
    console.log("Plan seleccionado:", this.selectedPlan);
  }
}
```

### 5. Card con Botones de Acción

```html
<openiis-card title="Documento de Proyecto" subtitle="Última modificación: hace 1 hora" description="Documento técnico del proyecto actual con especificaciones detalladas." [actionButtons]="actionButtons" actionButtonSize="md" variant="filled" type="success" (actionButtonClick)="onActionClick($event)">
  <div slot="header-actions">
    <span class="status">En revisión</span>
  </div>

  <p>Este documento contiene toda la información técnica necesaria para el desarrollo del proyecto.</p>

  <div slot="footer">
    <span class="version">v2.1.0</span>
    <span class="size">1.2 MB</span>
  </div>
</openiis-card>
```

```typescript
export class MyComponent {
  actionButtons: any[] = [
    {
      id: "download",
      icon: "download",
      tooltip: "Descargar documento",
      variant: "primary",
    },
    {
      id: "edit",
      icon: "edit",
      tooltip: "Editar documento",
      variant: "secondary",
    },
    {
      id: "share",
      icon: "share",
      tooltip: "Compartir documento",
      variant: "info",
    },
    {
      id: "delete",
      icon: "delete",
      tooltip: "Eliminar documento",
      variant: "danger",
    },
  ];

  onActionClick(event: any) {
    console.log("Action clicked:", event.buttonId);

    switch (event.buttonId) {
      case "download":
        this.downloadDocument();
        break;
      case "edit":
        this.editDocument();
        break;
      case "share":
        this.shareDocument();
        break;
      case "delete":
        this.deleteDocument();
        break;
    }
  }
}
```

### 6. Card con Estados Especiales

```html
<openiis-card title="Procesando Datos" subtitle="Tarea en progreso" description="El sistema está procesando los datos del último reporte." [loading]="true" [disabled]="false" variant="elevated" type="warning">
  <div slot="media">
    <div class="progress-indicator">
      <div class="progress-bar" style="width: 65%"></div>
    </div>
  </div>

  <p>Progreso: 65% completado</p>
  <p>Tiempo estimado: 2 minutos</p>
</openiis-card>
```

```typescript
export class MyComponent {
  // Card con estado de carga
}
```

### 7. Card con Imagen de Fondo

```html
<openiis-card title="Destino Turístico" subtitle="París, Francia" description="Explora la ciudad de la luz con nuestras guías turísticas especializadas." backgroundImage="/assets/paris-background.jpg" variant="elevated" type="info" [clickable]="true" (cardClick)="onDestinationClick($event)">
  <div slot="header-actions">
    <span class="rating">⭐ 4.8/5</span>
  </div>

  <p>Descubre los mejores lugares para visitar en París.</p>

  <div slot="footer">
    <span class="price">Desde $999</span>
    <span class="duration">7 días</span>
  </div>
</openiis-card>
```

```typescript
export class MyComponent {
  onDestinationClick(event: any) {
    console.log("Destino seleccionado: París");
    this.router.navigate(["/destinations/paris"]);
  }
}
```

### 8. Card Grid Responsive

```html
<div class="card-grid">
  <openiis-card title="Card 1" description="Descripción de la primera card." size="md" variant="default">
    <p>Contenido de la card 1</p>
  </openiis-card>

  <openiis-card title="Card 2" description="Descripción de la segunda card." size="md" variant="bordered">
    <p>Contenido de la card 2</p>
  </openiis-card>

  <openiis-card title="Card 3" description="Descripción de la tercera card." size="md" variant="elevated">
    <p>Contenido de la card 3</p>
  </openiis-card>
</div>
```

```typescript
export class MyComponent {
  // Grid de cards responsive
}
```

## 🏗️ Interfaces

```typescript
interface CardButton {
  id: string;
  icon: string;
  tooltip?: string;
  disabled?: boolean;
  loading?: boolean;
  variant?: "primary" | "secondary" | "success" | "warning" | "danger" | "info" | "outline-primary" | "outline-secondary" | "outline-success" | "outline-warning" | "outline-danger" | "outline-info" | "ghost" | "text" | "link" | "subtle" | "icon";
  ariaLabel?: string;
}

type CardSize = "xs" | "sm" | "md" | "lg" | "xl";
type CardVariant = "default" | "bordered" | "elevated" | "outlined" | "filled";
type CardType = "default" | "primary" | "success" | "warning" | "danger" | "info";
```

## ⚡ Comportamiento

### Estados

- **Normal**: Estado por defecto
- **Clickeable**: Con efectos hover y focus
- **Seleccionable**: Con estado selected/not selected
- **Loading**: Con overlay de carga
- **Disabled**: Sin interacciones

### Interacciones

- **Clic**: Navega o ejecuta acción
- **Teclado**: Enter/Space para activar
- **Botones de acción**: Acciones específicas
- **Selección**: Toggle de estado selected

### Responsive

- **Desktop**: Tamaño completo
- **Móvil**: Padding y tamaños reducidos
- **Grid**: Layout adaptativo automático

## ✅ Características

- ✅ 5 tamaños configurables (xs, sm, md, lg, xl)
- ✅ 5 variantes visuales (default, bordered, elevated, outlined, filled)
- ✅ 6 tipos de color (default, primary, success, warning, danger, info)
- ✅ Estados clickeable y seleccionable
- ✅ Botones de acción configurables
- ✅ Soporte para contenido multimedia
- ✅ Slots para header, media, footer
- ✅ Imagen de fondo
- ✅ Estados loading y disabled
- ✅ Responsive design
- ✅ Accesibilidad completa
- ✅ Navegación por teclado
- ✅ Animaciones suaves

## 🎨 Estilos Automáticos

- **Variantes**: Cada variante tiene estilos únicos
- **Estados**: Hover, active, disabled, focus
- **Responsive**: Se adapta automáticamente en móviles
- **Animaciones**: Transiciones suaves
- **Accesibilidad**: Indicadores de foco y ARIA

## 🔧 Funcionalidades Especiales

### Slots de Contenido

```html
<!-- Header con acciones -->
<div slot="header-actions">
  <button>Acción</button>
</div>

<!-- Contenido multimedia -->
<div slot="media">
  <img src="image.jpg" alt="Descripción" />
</div>

<!-- Footer personalizado -->
<div slot="footer">
  <span>Información adicional</span>
</div>
```

### Botones de Acción

```typescript
actionButtons: any[] = [
  {
    id: 'action1',
    icon: 'edit',
    tooltip: 'Editar',
    variant: 'primary'
  }
];
```

### Estados Programáticos

```typescript
// Seleccionar card
card.setSelected(true);

// Verificar estado
if (card.selected) {
  // Lógica
}
```

## 🚨 Solución de Problemas

| Problema                   | Solución                                        |
| -------------------------- | ----------------------------------------------- |
| Card no responde           | Verifica que `clickable` esté en `true`         |
| Botones no aparecen        | Verifica que `actionButtons` esté definido      |
| Loading no funciona        | Verifica que `loading` esté en `true`           |
| Selección no funciona      | Verifica que `selectable` esté en `true`        |
| Imagen de fondo no aparece | Verifica que `backgroundImage` tenga URL válida |
| Responsive no funciona     | Verifica que `responsive` esté en `true`        |
| Accesibilidad no funciona  | Verifica que `ariaLabel` esté configurado       |

## 🐞 Reportar Problemas

Si encuentras algún problema en la lógica del componente, por favor
[🐞Reportalo](https://github.com/Alexiisart/openiis-ui/issues/new)
