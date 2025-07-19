# Avatar

Componente de avatar elegante y reutilizable con múltiples variantes, tamaños, colores, estados y soporte para imágenes, iniciales, iconos y badges.

## 📦 Instalación

```typescript
import { OpeniisAvatarComponent } from 'openiis-ui';

@Component({
  imports: [OpeniisAvatarComponent],
})
```

## ⚙️ Properties

| Property         | Tipo                        | Default          | Descripción                 |
| ---------------- | --------------------------- | ---------------- | --------------------------- |
| `variant`        | `AvatarVariant`             | `'circular'`     | Forma del avatar            |
| `size`           | `AvatarSize`                | `'md'`           | Tamaño del avatar           |
| `color`          | `AvatarColor`               | `'primary'`      | Color del avatar            |
| `status`         | `AvatarStatus`              | `'none'`         | Estado del usuario          |
| `src`            | `string`                    | `undefined`      | URL de la imagen            |
| `alt`            | `string`                    | `undefined`      | Texto alternativo           |
| `name`           | `string`                    | `undefined`      | Nombre del usuario          |
| `initials`       | `string`                    | `undefined`      | Iniciales personalizadas    |
| `icon`           | `string`                    | `undefined`      | Icono Material Icons        |
| `badge`          | `string \| number \| 'dot'` | `undefined`      | Badge del avatar            |
| `badgeAriaLabel` | `string`                    | `'Notification'` | ARIA label del badge        |
| `showStatus`     | `boolean`                   | `false`          | Mostrar indicador de estado |
| `bordered`       | `boolean`                   | `false`          | Mostrar borde               |
| `loading`        | `boolean`                   | `false`          | Estado de carga             |
| `clickable`      | `boolean`                   | `false`          | Hacer avatar clickeable     |
| `interactive`    | `boolean`                   | `false`          | Hacer avatar interactivo    |
| `customSize`     | `string`                    | `undefined`      | Tamaño personalizado        |
| `ariaLabel`      | `string`                    | `undefined`      | ARIA label                  |
| `title`          | `string`                    | `undefined`      | Tooltip                     |
| `role`           | `string`                    | `undefined`      | Rol ARIA                    |
| `customClass`    | `string`                    | `undefined`      | Clases CSS adicionales      |

## 📡 Events

| Event              | Tipo  | Descripción                     |
| ------------------ | ----- | ------------------------------- |
| `avatarClick`      | `any` | Emitido al hacer clic en avatar |
| `avatarMouseEnter` | `any` | Emitido al entrar con el mouse  |
| `avatarMouseLeave` | `any` | Emitido al salir con el mouse   |
| `avatarFocus`      | `any` | Emitido al recibir foco         |
| `avatarBlur`       | `any` | Emitido al perder foco          |
| `imageLoad`        | `any` | Emitido al cargar imagen        |
| `imageError`       | `any` | Emitido al fallar imagen        |

## 📏 Tamaños

| Tamaño | Width | Height | Font-size | Uso               |
| ------ | ----- | ------ | --------- | ----------------- |
| `xs`   | 20px  | 20px   | 8px       | Muy compacto      |
| `sm`   | 24px  | 24px   | 12px      | Compacto          |
| `md`   | 32px  | 32px   | 16px      | Mediano (default) |
| `lg`   | 40px  | 40px   | 16px      | Grande            |
| `xl`   | 48px  | 48px   | 20px      | Extra grande      |
| `2xl`  | 56px  | 56px   | 20px      | Muy grande        |
| `3xl`  | 64px  | 64px   | 24px      | Extra grande      |

## 🎨 Variantes

| Variante   | Descripción              | Uso                 |
| ---------- | ------------------------ | ------------------- |
| `circular` | Forma circular (default) | Avatares de usuario |
| `rounded`  | Bordes redondeados       | Avatares modernos   |
| `square`   | Forma cuadrada           | Avatares técnicos   |

## 🎯 Colores

| Color       | Descripción              | Uso                   |
| ----------- | ------------------------ | --------------------- |
| `primary`   | Color primario (default) | Usuarios principales  |
| `secondary` | Color secundario         | Usuarios secundarios  |
| `success`   | Color de éxito           | Usuarios activos      |
| `warning`   | Color de advertencia     | Usuarios con alertas  |
| `danger`    | Color de peligro         | Usuarios bloqueados   |
| `info`      | Color informativo        | Usuarios informativos |
| `neutral`   | Color neutro             | Usuarios genéricos    |

## 📊 Estados

| Estado    | Descripción          | Uso                    |
| --------- | -------------------- | ---------------------- |
| `online`  | Usuario en línea     | Usuarios conectados    |
| `offline` | Usuario desconectado | Usuarios desconectados |
| `away`    | Usuario ausente      | Usuarios ausentes      |
| `busy`    | Usuario ocupado      | Usuarios ocupados      |
| `none`    | Sin estado (default) | Sin indicador          |

## 🏗️ Interfaces

```typescript
interface AvatarGroup {
  src?: string;
  alt?: string;
  name?: string;
  initials?: string;
  color?: AvatarColor;
  status?: AvatarStatus;
}

type AvatarVariant = "circular" | "rounded" | "square";
type AvatarSize = "xs" | "sm" | "md" | "lg" | "xl" | "2xl" | "3xl";
type AvatarColor = "primary" | "secondary" | "success" | "warning" | "danger" | "info" | "neutral";
type AvatarStatus = "online" | "offline" | "away" | "busy" | "none";
```

## 💡 Ejemplos Prácticos

### 1. Avatar Básico con Imagen

```html
<openiis-avatar src="/assets/avatar.jpg" alt="Foto de Juan Pérez" name="Juan Pérez" size="md" variant="circular" color="primary"> </openiis-avatar>
```

```typescript
export class MyComponent {
  // Avatar básico con imagen
}
```

### 2. Avatar con Iniciales

```html
<openiis-avatar name="María García López" size="lg" variant="rounded" color="success" [showStatus]="true" status="online"> </openiis-avatar>
```

```typescript
export class MyComponent {
  // Avatar con iniciales generadas automáticamente
}
```

### 3. Avatar con Icono

```html
<openiis-avatar icon="person" size="xl" variant="circular" color="info" [clickable]="true" (avatarClick)="onAvatarClick($event)"> </openiis-avatar>
```

```typescript
export class MyComponent {
  onAvatarClick(event: any) {
    console.log("Avatar clicked:", event);
  }
}
```

### 4. Avatar con Badge

```html
<openiis-avatar src="/assets/user-avatar.jpg" name="Ana Martínez" size="md" variant="circular" color="primary" badge="3" [showStatus]="true" status="online"> </openiis-avatar>
```

```typescript
export class MyComponent {
  // Avatar con badge de notificaciones
}
```

### 5. Avatar con Estados

```html
<!-- Usuario en línea -->
<openiis-avatar name="Carlos Ruiz" size="md" status="online" [showStatus]="true"> </openiis-avatar>

<!-- Usuario ausente -->
<openiis-avatar name="Laura Silva" size="md" status="away" [showStatus]="true"> </openiis-avatar>

<!-- Usuario ocupado -->
<openiis-avatar name="Pedro Torres" size="md" status="busy" [showStatus]="true"> </openiis-avatar>

<!-- Usuario desconectado -->
<openiis-avatar name="Sofia Vega" size="md" status="offline" [showStatus]="true"> </openiis-avatar>
```

```typescript
export class MyComponent {
  // Avatares con diferentes estados
}
```

### 6. Avatar con Diferentes Tamaños

```html
<openiis-avatar name="Usuario" size="xs" variant="circular"> </openiis-avatar>

<openiis-avatar name="Usuario" size="sm" variant="circular"> </openiis-avatar>

<openiis-avatar name="Usuario" size="md" variant="circular"> </openiis-avatar>

<openiis-avatar name="Usuario" size="lg" variant="circular"> </openiis-avatar>

<openiis-avatar name="Usuario" size="xl" variant="circular"> </openiis-avatar>

<openiis-avatar name="Usuario" size="2xl" variant="circular"> </openiis-avatar>

<openiis-avatar name="Usuario" size="3xl" variant="circular"> </openiis-avatar>
```

```typescript
export class MyComponent {
  // Avatares con diferentes tamaños
}
```

### 7. Avatar con Diferentes Variantes

```html
<!-- Circular -->
<openiis-avatar name="Usuario" variant="circular" color="primary"> </openiis-avatar>

<!-- Rounded -->
<openiis-avatar name="Usuario" variant="rounded" color="secondary"> </openiis-avatar>

<!-- Square -->
<openiis-avatar name="Usuario" variant="square" color="info"> </openiis-avatar>
```

```typescript
export class MyComponent {
  // Avatares con diferentes variantes
}
```

### 8. Avatar Interactivo

```html
<openiis-avatar src="/assets/profile.jpg" name="Roberto Díaz" size="lg" variant="circular" color="primary" [interactive]="true" [bordered]="true" (avatarClick)="onProfileClick($event)" (avatarMouseEnter)="onMouseEnter()" (avatarMouseLeave)="onMouseLeave()"> </openiis-avatar>
```

```typescript
export class MyComponent {
  onProfileClick(event: any) {
    console.log("Perfil clickeado");
    this.router.navigate(["/profile"]);
  }

  onMouseEnter() {
    console.log("Mouse sobre avatar");
  }

  onMouseLeave() {
    console.log("Mouse salió del avatar");
  }
}
```

### 9. Avatar con Carga

```html
<openiis-avatar src="/assets/large-avatar.jpg" name="Usuario" size="xl" [loading]="isLoading" (imageLoad)="onImageLoad()" (imageError)="onImageError()"> </openiis-avatar>
```

```typescript
export class MyComponent {
  isLoading = true;

  onImageLoad() {
    this.isLoading = false;
    console.log("Imagen cargada correctamente");
  }

  onImageError() {
    this.isLoading = false;
    console.log("Error al cargar imagen");
  }
}
```

### 10. Avatar con Tamaño Personalizado

```html
<openiis-avatar name="Usuario Especial" customSize="80px" variant="circular" color="warning" [bordered]="true"> </openiis-avatar>
```

```typescript
export class MyComponent {
  // Avatar con tamaño personalizado
}
```

## ⚡ Comportamiento

### Estados

- **Normal**: Estado por defecto
- **Clickeable**: Con efectos hover y focus
- **Interactivo**: Con eventos de mouse y teclado
- **Loading**: Con spinner de carga
- **Con borde**: Con borde destacado

### Interacciones

- **Clic**: Ejecuta acción si es clickeable/interactivo
- **Teclado**: Enter/Space para activar
- **Mouse**: Hover effects y eventos
- **Imagen**: Manejo de carga y errores

### Responsive

- **Móvil**: Tamaños reducidos automáticamente
- **Desktop**: Tamaños completos
- **Accesibilidad**: Soporte completo para lectores

## ✅ Características

- ✅ 3 variantes de forma (circular, rounded, square)
- ✅ 7 tamaños configurables (xs, sm, md, lg, xl, 2xl, 3xl)
- ✅ 7 colores (primary, secondary, success, warning, danger, info, neutral)
- ✅ 5 estados de usuario (online, offline, away, busy, none)
- ✅ Soporte para imágenes con fallback
- ✅ Generación automática de iniciales
- ✅ Iconos Material Icons
- ✅ Badges configurables
- ✅ Estados clickeable e interactivo
- ✅ Bordes personalizables
- ✅ Estados loading y error
- ✅ Responsive design
- ✅ Accesibilidad completa
- ✅ Navegación por teclado
- ✅ Tooltips personalizables

## 🎨 Estilos Automáticos

- **Variantes**: Cada variante tiene forma única
- **Estados**: Hover, active, focus, loading
- **Responsive**: Se adapta automáticamente en móviles
- **Animaciones**: Transiciones suaves
- **Accesibilidad**: Indicadores de foco y ARIA

## 🔧 Funcionalidades Especiales

### Generación de Iniciales

```typescript
// Genera automáticamente iniciales del nombre
name = "Juan Carlos Pérez"; // Genera "JC"
initials = "ABC"; // Usa iniciales personalizadas
```

### Estados de Usuario

```typescript
// Estados con iconos y colores automáticos
status = "online"; // Verde con check
status = "away"; // Amarillo con reloj
status = "busy"; // Rojo con exclamación
```

### Manejo de Imágenes

```typescript
// Fallback automático si la imagen falla
src = "/avatar.jpg"; // Intenta cargar imagen
// Si falla, muestra iniciales o icono
```

### Badges Inteligentes

```typescript
// Diferentes tipos de badges
badge = "3"; // Número
badge = "Nuevo"; // Texto
badge = "dot"; // Solo punto
```

## 🚨 Solución de Problemas

| Problema                  | Solución                                                     |
| ------------------------- | ------------------------------------------------------------ |
| Avatar no responde        | Verifica que `clickable` o `interactive` esté en `true`      |
| Imagen no aparece         | Verifica que `src` tenga URL válida y `alt` esté configurado |
| Iniciales no aparecen     | Verifica que `name` esté definido o usa `initials`           |
| Estado no se muestra      | Verifica que `showStatus` esté en `true`                     |
| Badge no aparece          | Verifica que `badge` esté definido                           |
| Responsive no funciona    | Verifica que el CSS responsive esté cargado                  |
| Accesibilidad no funciona | Verifica que `ariaLabel` esté configurado                    |

## 🐞 Reportar Problemas

Si encuentras algún problema en la lógica del componente, por favor
[🐞Reportalo](https://github.com/Alexiisart/openiis-ui/issues/new)
