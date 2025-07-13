# Avatar Component

El componente Avatar es un elemento visual que representa a usuarios, entidades o conceptos de manera compacta y reconocible. Admite imágenes, iniciales, iconos y múltiples estados de personalización.

## Características

- **3 variantes**: circular, rounded, square
- **7 tamaños**: xs, sm, md, lg, xl, 2xl, 3xl
- **7 colores**: primary, secondary, success, warning, danger, info, neutral
- **Estados de presencia**: online, offline, away, busy, none
- **Soporte para imágenes**: Con fallback automático a iniciales o iconos
- **Generación automática de iniciales**: Desde el nombre del usuario
- **Badges de notificación**: Números, texto o indicadores de punto
- **Estados interactivos**: clickable, hover, focus
- **Bordes opcionales**: Para mayor contraste visual
- **Estado de carga**: Loading spinner integrado
- **Accesibilidad**: ARIA completo, navegación por teclado
- **Métodos públicos**: Control programático completo
- **Responsive**: Adaptable a diferentes dispositivos
- **Soporte para grupos**: Avatares superpuestos

## Uso Básico

```html
<!-- Avatar con imagen -->
<app-avatar src="assets/user.jpg" name="Juan Pérez" alt="Avatar de Juan Pérez"> </app-avatar>

<!-- Avatar con iniciales -->
<app-avatar name="María García" color="primary"> </app-avatar>

<!-- Avatar con icono -->
<app-avatar icon="fas fa-user" variant="square" size="lg"> </app-avatar>

<!-- Avatar con estado -->
<app-avatar src="assets/user.jpg" name="Ana López" status="online" showStatus="true"> </app-avatar>
```

## Propiedades

| Propiedad        | Tipo            | Valor por defecto | Descripción                                 |
| ---------------- | --------------- | ----------------- | ------------------------------------------- |
| `variant`        | `AvatarVariant` | `'circular'`      | Forma del avatar                            |
| `size`           | `AvatarSize`    | `'md'`            | Tamaño del avatar                           |
| `color`          | `AvatarColor`   | `'primary'`       | Color de fondo (para iniciales/iconos)      |
| `status`         | `AvatarStatus`  | `'none'`          | Estado de presencia del usuario             |
| `src`            | `string`        | `undefined`       | URL de la imagen del avatar                 |
| `alt`            | `string`        | `undefined`       | Texto alternativo para la imagen            |
| `name`           | `string`        | `undefined`       | Nombre del usuario (para generar iniciales) |
| `initials`       | `string`        | `undefined`       | Iniciales personalizadas                    |
| `icon`           | `string`        | `undefined`       | Clase CSS del icono (fallback)              |
| `badge`          | `string/number` | `undefined`       | Badge de notificación                       |
| `badgeAriaLabel` | `string`        | `'Notification'`  | Etiqueta ARIA para el badge                 |
| `showStatus`     | `boolean`       | `false`           | Mostrar indicador de estado                 |
| `bordered`       | `boolean`       | `false`           | Agregar borde al avatar                     |
| `loading`        | `boolean`       | `false`           | Mostrar estado de carga                     |
| `clickable`      | `boolean`       | `false`           | Hacer el avatar clickeable                  |
| `interactive`    | `boolean`       | `false`           | Agregar efectos interactivos                |
| `customSize`     | `string`        | `undefined`       | Tamaño personalizado (CSS)                  |
| `ariaLabel`      | `string`        | `undefined`       | Etiqueta ARIA personalizada                 |
| `title`          | `string`        | `undefined`       | Título del avatar (tooltip)                 |
| `role`           | `string`        | `undefined`       | Rol ARIA personalizado                      |
| `customClass`    | `string`        | `undefined`       | Clases CSS adicionales                      |

## Eventos

| Evento             | Tipo                       | Descripción                               |
| ------------------ | -------------------------- | ----------------------------------------- |
| `avatarClick`      | `EventEmitter<MouseEvent>` | Se emite cuando se hace clic en el avatar |
| `avatarMouseEnter` | `EventEmitter<void>`       | Se emite cuando el mouse entra            |
| `avatarMouseLeave` | `EventEmitter<void>`       | Se emite cuando el mouse sale             |
| `avatarFocus`      | `EventEmitter<void>`       | Se emite cuando el avatar recibe focus    |
| `avatarBlur`       | `EventEmitter<void>`       | Se emite cuando el avatar pierde focus    |
| `imageLoad`        | `EventEmitter<void>`       | Se emite cuando la imagen se carga        |
| `imageError`       | `EventEmitter<void>`       | Se emite cuando la imagen falla           |

## Tipos

```typescript
type AvatarVariant = "circular" | "rounded" | "square";
type AvatarSize = "xs" | "sm" | "md" | "lg" | "xl" | "2xl" | "3xl";
type AvatarColor = "primary" | "secondary" | "success" | "warning" | "danger" | "info" | "neutral";
type AvatarStatus = "online" | "offline" | "away" | "busy" | "none";
```

## Métodos Públicos

| Método      | Descripción                          |
| ----------- | ------------------------------------ |
| `focus()`   | Enfoca el avatar (si es interactivo) |
| `blur()`    | Desenfoca el avatar                  |
| `refresh()` | Recarga la imagen del avatar         |

## Ejemplos de Uso

### Variantes

```html
<!-- Circular (por defecto) -->
<app-avatar name="Juan Pérez" variant="circular"> </app-avatar>

<!-- Redondeado -->
<app-avatar name="María García" variant="rounded"> </app-avatar>

<!-- Cuadrado -->
<app-avatar name="Carlos López" variant="square"> </app-avatar>
```

### Tamaños

```html
<app-avatar name="A" size="xs"> </app-avatar>
<app-avatar name="B" size="sm"> </app-avatar>
<app-avatar name="C" size="md"> </app-avatar>
<app-avatar name="D" size="lg"> </app-avatar>
<app-avatar name="E" size="xl"> </app-avatar>
<app-avatar name="F" size="2xl"> </app-avatar>
<app-avatar name="G" size="3xl"> </app-avatar>
```

### Colores

```html
<app-avatar name="P" color="primary"> </app-avatar>
<app-avatar name="S" color="secondary"> </app-avatar>
<app-avatar name="O" color="success"> </app-avatar>
<app-avatar name="W" color="warning"> </app-avatar>
<app-avatar name="D" color="danger"> </app-avatar>
<app-avatar name="I" color="info"> </app-avatar>
<app-avatar name="N" color="neutral"> </app-avatar>
```

### Con Imagen

```html
<app-avatar src="assets/avatars/user1.jpg" name="Juan Pérez" alt="Juan Pérez"> </app-avatar>

<app-avatar src="assets/avatars/user2.jpg" name="María García" size="lg" bordered="true"> </app-avatar>
```

### Con Estados de Presencia

```html
<app-avatar name="Juan" status="online" showStatus="true"> </app-avatar>
<app-avatar name="María" status="away" showStatus="true"> </app-avatar>
<app-avatar name="Carlos" status="busy" showStatus="true"> </app-avatar>
<app-avatar name="Ana" status="offline" showStatus="true"> </app-avatar>
```

### Con Badges

```html
<!-- Badge con número -->
<app-avatar name="Juan" badge="5"> </app-avatar>

<!-- Badge con texto -->
<app-avatar name="María" badge="VIP"> </app-avatar>

<!-- Badge de punto -->
<app-avatar name="Carlos" badge="dot"> </app-avatar>
```

### Interactivos

```html
<!-- Clickeable -->
<app-avatar name="Juan" clickable="true" (avatarClick)="onAvatarClick($event)"> </app-avatar>

<!-- Interactivo con efectos -->
<app-avatar name="María" interactive="true" (avatarMouseEnter)="onMouseEnter()"> </app-avatar>
```

### Con Iconos

```html
<app-avatar icon="fas fa-user"> </app-avatar>
<app-avatar icon="fas fa-crown" color="warning"> </app-avatar>
<app-avatar icon="fas fa-robot" color="info" variant="square"> </app-avatar>
```

### Estado de Carga

```html
<app-avatar name="Juan" loading="true"> </app-avatar> <app-avatar src="assets/loading-image.jpg" loading="true"> </app-avatar>
```

### Tamaño Personalizado

```html
<app-avatar name="Juan" customSize="80px"> </app-avatar> <app-avatar name="María" customSize="120px"> </app-avatar>
```

## Casos de Uso Comunes

### Lista de Usuarios

```html
<div class="users-list">
  <div *ngFor="let user of users" class="user-item">
    <app-avatar [src]="user.avatar" [name]="user.name" [status]="user.status" showStatus="true" size="md"> </app-avatar>
    <div class="user-info">
      <h3>{{ user.name }}</h3>
      <p>{{ user.email }}</p>
    </div>
  </div>
</div>
```

### Grupo de Avatares

```html
<div class="avatar-group">
  <app-avatar *ngFor="let member of teamMembers" [src]="member.avatar" [name]="member.name" size="sm"> </app-avatar>
</div>
```

### Avatar con Notificaciones

```html
<app-avatar [src]="currentUser.avatar" [name]="currentUser.name" [badge]="unreadCount" clickable="true" (avatarClick)="openProfile()"> </app-avatar>
```

### Comentarios

```html
<div class="comment">
  <app-avatar [src]="comment.author.avatar" [name]="comment.author.name" size="sm"> </app-avatar>
  <div class="comment-content">
    <h4>{{ comment.author.name }}</h4>
    <p>{{ comment.text }}</p>
  </div>
</div>
```

### Perfil de Usuario

```html
<div class="user-profile">
  <app-avatar [src]="user.avatar" [name]="user.name" [status]="user.status" showStatus="true" size="3xl" bordered="true"> </app-avatar>
  <h1>{{ user.name }}</h1>
  <p>{{ user.title }}</p>
</div>
```

## Estilos CSS Personalizables

```css
.avatar {
  --avatar-border-radius: 50%;
  --avatar-border-width: 2px;
  --avatar-border-color: transparent;
  --avatar-background: var(--color-primary-100);
  --avatar-color: var(--color-primary-700);
  --avatar-font-weight: 600;
  --avatar-transition: all 0.2s ease;
}
```

## Accesibilidad

- **Roles ARIA**: `img` por defecto, `button` si es interactivo
- **Etiquetas descriptivas**: Auto-generadas desde el nombre
- **Navegación por teclado**: Enter y Space para activar
- **Soporte para lectores de pantalla**: Descripciones contextuales
- **Alto contraste**: Estilos específicos para modo alto contraste
- **Movimiento reducido**: Respeta `prefers-reduced-motion`

## Mejores Prácticas

1. **Usar imágenes optimizadas**: Cargar imágenes en tamaños apropiados
2. **Proporcionar texto alternativo**: Siempre incluir `alt` o `name`
3. **Manejar errores de imagen**: El componente fallback automáticamente
4. **Usar colores semánticos**: Elegir colores apropiados para el contexto
5. **Considerar la accesibilidad**: Incluir etiquetas ARIA apropiadas
6. **Optimizar para performance**: Usar lazy loading cuando sea posible

## Notas de Implementación

- El componente genera automáticamente iniciales desde el nombre
- Maneja errores de imagen con fallback automático
- Incluye soporte para grupos de avatares con CSS
- Utiliza variables CSS para personalización fácil
- Es completamente responsive y adaptable
- Soporta tanto temas claros como oscuros

## Dependencias

- `@angular/common` - Para directivas estructurales
- `@angular/core` - Para componente base
- FontAwesome - Para iconos de fallback y estados
