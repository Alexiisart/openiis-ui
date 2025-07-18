# Card Component

Un componente Card versátil y flexible para Angular que permite mostrar contenido organizado de manera atractiva y funcional, con soporte para múltiples variantes, tamaños y estados.

## Características

- ✅ **5 variantes visuales**: default, bordered, elevated, outlined, filled
- ✅ **6 tipos de color**: default, primary, success, warning, danger, info
- ✅ **5 tamaños**: xs, sm, md, lg, xl
- ✅ **Estructura flexible**: header, media, body, footer con slots
- ✅ **Estados avanzados**: clickable, selectable, loading, disabled
- ✅ **Accesibilidad**: ARIA roles, navegación por teclado
- ✅ **Responsive**: Adaptado para dispositivos móviles
- ✅ **Efectos especiales**: background images, shimmer, hover effects

## Uso Básico

```typescript
import { OpeniisCardComponent } from "./components/card";

@Component({
  selector: "app-example",
  standalone: true,
  imports: [OpeniisCardComponent],
  template: `
    <openiis-card title="Mi Card" subtitle="Subtítulo descriptivo" description="Esta es una descripción del contenido de la card." (cardClick)="onCardClick($event)">
      <div slot="header-actions">
        <button class="btn btn-sm">Acción</button>
      </div>

      <img slot="media" src="imagen.jpg" alt="Imagen" />

      <p>Contenido principal de la card</p>

      <div slot="footer">
        <button class="btn btn-primary">Acción Principal</button>
        <button class="btn btn-secondary">Cancelar</button>
      </div>
    </openiis-card>
  `,
})
export class ExampleComponent {
  onCardClick(event: MouseEvent) {
    console.log("Card clicked!", event);
  }
}
```

## Propiedades

### Contenido

| Propiedad         | Tipo     | Valor por defecto | Descripción                 |
| ----------------- | -------- | ----------------- | --------------------------- |
| `title`           | `string` | `''`              | Título principal de la card |
| `subtitle`        | `string` | `''`              | Subtítulo descriptivo       |
| `description`     | `string` | `''`              | Descripción del contenido   |
| `backgroundImage` | `string` | `''`              | URL de imagen de fondo      |

### Configuración Visual

| Propiedad | Tipo          | Valor por defecto | Descripción                                                     |
| --------- | ------------- | ----------------- | --------------------------------------------------------------- |
| `size`    | `CardSize`    | `'md'`            | Tamaño: xs, sm, md, lg, xl                                      |
| `variant` | `CardVariant` | `'default'`       | Variante: default, bordered, elevated, outlined, filled         |
| `type`    | `CardType`    | `'default'`       | Tipo de color: default, primary, success, warning, danger, info |

### Comportamiento

| Propiedad    | Tipo      | Valor por defecto | Descripción              |
| ------------ | --------- | ----------------- | ------------------------ |
| `clickable`  | `boolean` | `false`           | Hacer la card clickeable |
| `selectable` | `boolean` | `false`           | Permitir selección       |
| `selected`   | `boolean` | `false`           | Estado seleccionado      |
| `loading`    | `boolean` | `false`           | Mostrar spinner de carga |
| `disabled`   | `boolean` | `false`           | Deshabilitar la card     |

### Diseño

| Propiedad      | Tipo      | Valor por defecto | Descripción                    |
| -------------- | --------- | ----------------- | ------------------------------ |
| `hideOverflow` | `boolean` | `true`            | Ocultar overflow del contenido |
| `responsive`   | `boolean` | `true`            | Hacer la card responsive       |

### Accesibilidad

| Propiedad         | Tipo     | Valor por defecto | Descripción      |
| ----------------- | -------- | ----------------- | ---------------- |
| `role`            | `string` | `'article'`       | Rol ARIA         |
| `ariaLabel`       | `string` | `''`              | ARIA label       |
| `ariaDescribedBy` | `string` | `''`              | ARIA describedby |

### Personalización

| Propiedad      | Tipo     | Valor por defecto | Descripción            |
| -------------- | -------- | ----------------- | ---------------------- |
| `extraClasses` | `string` | `''`              | Clases CSS adicionales |

## Eventos

| Evento           | Tipo                          | Descripción                            |
| ---------------- | ----------------------------- | -------------------------------------- |
| `cardClick`      | `EventEmitter<MouseEvent>`    | Emitido cuando se hace clic en la card |
| `selectedChange` | `EventEmitter<boolean>`       | Emitido cuando cambia la selección     |
| `keyDown`        | `EventEmitter<KeyboardEvent>` | Emitido cuando se presiona una tecla   |

## Slots de Contenido

| Slot             | Descripción                             |
| ---------------- | --------------------------------------- |
| `header`         | Contenido adicional en el header        |
| `header-actions` | Acciones en el header (botones, iconos) |
| `media`          | Contenido multimedia (imágenes, videos) |
| `footer`         | Contenido del footer (botones, enlaces) |
| _default_        | Contenido principal del body            |

## Ejemplos de Uso

### Tamaños Disponibles

```html
<openiis-card size="xs" title="Extra Pequeña">
  <p>Contenido XS</p>
</openiis-card>

<openiis-card size="sm" title="Pequeña">
  <p>Contenido SM</p>
</openiis-card>

<openiis-card size="md" title="Mediana">
  <p>Contenido MD</p>
</openiis-card>

<openiis-card size="lg" title="Grande">
  <p>Contenido LG</p>
</openiis-card>

<openiis-card size="xl" title="Extra Grande">
  <p>Contenido XL</p>
</openiis-card>
```

### Variantes Visuales

```html
<openiis-card variant="default" title="Default">
  <p>Estilo por defecto con sombra sutil</p>
</openiis-card>

<openiis-card variant="bordered" title="Bordered">
  <p>Con borde prominente</p>
</openiis-card>

<openiis-card variant="elevated" title="Elevated">
  <p>Con sombra elevada</p>
</openiis-card>

<openiis-card variant="outlined" title="Outlined">
  <p>Solo contorno, fondo transparente</p>
</openiis-card>

<openiis-card variant="filled" title="Filled">
  <p>Con fondo coloreado</p>
</openiis-card>
```

### Tipos de Color

```html
<openiis-card type="primary" variant="filled" title="Primary">
  <p>Card con tema primary</p>
</openiis-card>

<openiis-card type="success" variant="bordered" title="Success">
  <p>Card con tema success</p>
</openiis-card>

<openiis-card type="warning" variant="outlined" title="Warning">
  <p>Card con tema warning</p>
</openiis-card>

<openiis-card type="danger" variant="elevated" title="Danger">
  <p>Card con tema danger</p>
</openiis-card>

<openiis-card type="info" variant="filled" title="Info">
  <p>Card con tema info</p>
</openiis-card>
```

### Card Completa con Todos los Slots

```html
<openiis-card title="Producto Premium" subtitle="Categoría: Electrónicos" description="Un producto increíble con características excepcionales." variant="elevated" size="lg" [clickable]="true" (cardClick)="onProductClick($event)">
  <!-- Header Actions -->
  <div slot="header-actions">
    <button class="btn btn-sm">❤️</button>
    <button class="btn btn-sm">📤</button>
  </div>

  <!-- Media -->
  <img slot="media" src="product.jpg" alt="Producto" style="height: 200px;" />

  <!-- Body Content -->
  <div class="product-details">
    <div class="price">$299.99</div>
    <div class="rating">⭐⭐⭐⭐⭐</div>
    <ul>
      <li>Característica 1</li>
      <li>Característica 2</li>
      <li>Característica 3</li>
    </ul>
  </div>

  <!-- Footer -->
  <div slot="footer">
    <button class="btn btn-primary">Comprar Ahora</button>
    <button class="btn btn-secondary">Agregar al Carrito</button>
  </div>
</openiis-card>
```

### Card Clickeable y Seleccionable

```html
<openiis-card title="Opción Seleccionable" [clickable]="true" [selectable]="true" [selected]="selectedCard === 'option1'" (selectedChange)="onCardSelection('option1', $event)">
  <p>Haz clic para seleccionar esta opción</p>
</openiis-card>
```

### Card con Estado de Carga

```html
<openiis-card title="Cargando Datos" [loading]="isLoading" [disabled]="isLoading">
  <p>El contenido se está cargando...</p>
</openiis-card>
```

### Card con Imagen de Fondo

```html
<openiis-card title="Card con Fondo" subtitle="Texto sobre imagen" backgroundImage="background.jpg" size="lg">
  <p>Contenido con imagen de fondo</p>
</openiis-card>
```

### Grid de Cards

```html
<div class="card-grid">
  <openiis-card *ngFor="let item of items" [title]="item.title" [description]="item.description" variant="elevated" [clickable]="true" (cardClick)="onItemClick(item)">
    <img slot="media" [src]="item.image" [alt]="item.title" />

    <div slot="footer">
      <button class="btn btn-primary">Ver Más</button>
    </div>
  </openiis-card>
</div>
```

## Métodos Públicos

### setSelected(selected: boolean)

Selecciona o deselecciona la card programáticamente.

```typescript
// Seleccionar
card.setSelected(true);

// Deseleccionar
card.setSelected(false);
```

## Personalización CSS

El componente utiliza variables CSS del sistema de diseño:

```css
.card {
  --card-bg: var(--color-bg-primary);
  --card-border: var(--neutral-200);
  --card-shadow: var(--shadow-sm);
  --card-radius: var(--radius-lg);
  --card-padding: var(--space-4);
}
```

## Clases CSS Adicionales

### Efectos Especiales

```html
<!-- Card con efecto shimmer -->
<openiis-card extraClasses="card-shimmer">
  <p>Efecto de carga shimmer</p>
</openiis-card>

<!-- Card destacada -->
<openiis-card extraClasses="card-featured">
  <p>Card con banda superior</p>
</openiis-card>
```

## Casos de Uso Comunes

### 1. Card de Producto

```html
<openiis-card title="iPhone 15 Pro" subtitle="Apple" variant="elevated" [clickable]="true">
  <img slot="media" src="iphone.jpg" alt="iPhone 15 Pro" />

  <div class="product-info">
    <div class="price">$999</div>
    <div class="rating">⭐⭐⭐⭐⭐ (4.8)</div>
  </div>

  <div slot="footer">
    <button class="btn btn-primary">Comprar</button>
    <button class="btn btn-secondary">Carrito</button>
  </div>
</openiis-card>
```

### 2. Card de Artículo/Blog

```html
<openiis-card title="Cómo Mejorar tu Productividad" subtitle="Por Juan Pérez • 5 min de lectura" description="Descubre técnicas efectivas para optimizar tu tiempo y ser más productivo en el trabajo." [clickable]="true" (cardClick)="readArticle()">
  <img slot="media" src="article.jpg" alt="Productividad" />

  <div class="article-tags">
    <span class="tag">Productividad</span>
    <span class="tag">Trabajo</span>
    <span class="tag">Tips</span>
  </div>

  <div slot="footer">
    <button class="btn btn-primary">Leer Más</button>
    <button class="btn btn-sm">💾</button>
    <button class="btn btn-sm">📤</button>
  </div>
</openiis-card>
```

### 3. Card de Perfil de Usuario

```html
<openiis-card title="Ana García" subtitle="Desarrolladora Frontend" variant="bordered" size="lg">
  <div slot="header-actions">
    <button class="btn btn-sm">✉️</button>
    <button class="btn btn-sm">🔗</button>
  </div>

  <img slot="media" src="avatar.jpg" alt="Ana García" class="avatar" />

  <div class="profile-info">
    <p>Especialista en React y Angular con 5 años de experiencia.</p>
    <div class="skills">
      <span class="skill">React</span>
      <span class="skill">Angular</span>
      <span class="skill">TypeScript</span>
    </div>
  </div>

  <div slot="footer">
    <button class="btn btn-primary">Contactar</button>
    <button class="btn btn-secondary">Ver Perfil</button>
  </div>
</openiis-card>
```

### 4. Card de Dashboard/Estadísticas

```html
<openiis-card title="Ventas Mensuales" subtitle="Marzo 2024" type="success" variant="filled" size="md">
  <div slot="header-actions">
    <button class="btn btn-sm">📊</button>
  </div>

  <div class="stats">
    <div class="stat-value">$45,680</div>
    <div class="stat-change positive">+12.5%</div>
  </div>

  <div slot="footer">
    <button class="btn btn-sm">Ver Detalles</button>
  </div>
</openiis-card>
```

### 5. Card de Configuración

```html
<openiis-card title="Configuración de Notificaciones" subtitle="Personaliza tus preferencias" variant="outlined">
  <div class="settings">
    <div class="setting-item">
      <label>Email</label>
      <input type="checkbox" checked />
    </div>
    <div class="setting-item">
      <label>Push</label>
      <input type="checkbox" />
    </div>
    <div class="setting-item">
      <label>SMS</label>
      <input type="checkbox" />
    </div>
  </div>

  <div slot="footer">
    <button class="btn btn-primary">Guardar</button>
    <button class="btn btn-secondary">Cancelar</button>
  </div>
</openiis-card>
```

## Accesibilidad

- **Roles semánticos**: `article` por defecto, personalizable
- **Navegación por teclado**: Enter/Space para cards clickeables
- **ARIA labels**: Soporte completo para lectores de pantalla
- **Focus management**: Indicadores visuales claros

## Responsive

El componente se adapta automáticamente:

- **Móvil**: Padding reducido, footer en columna
- **Tablet**: Tamaños optimizados
- **Desktop**: Diseño completo

## Buenas Prácticas

- ✅ Usar títulos descriptivos y concisos
- ✅ Incluir alt text en imágenes
- ✅ Agrupar acciones relacionadas en el footer
- ✅ Mantener consistencia en el grid de cards
- ✅ Usar loading states para operaciones async
- ❌ No sobrecargar con demasiado contenido
- ❌ No usar cards para contenido muy simple
- ❌ No mezclar diferentes variantes en el mismo contexto
