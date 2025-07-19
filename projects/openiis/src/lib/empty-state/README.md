# Empty State

Componente de estado vacío elegante y reutilizable para mostrar mensajes informativos cuando no hay contenido disponible.

## 📦 Instalación

```typescript
import { OpeniisEmptyStateComponent } from 'openiis-ui';

@Component({
  imports: [OpeniisEmptyStateComponent],
})
```

## ⚙️ Properties

| Property           | Tipo            | Default                                       | Descripción                           |
| ------------------ | --------------- | --------------------------------------------- | ------------------------------------- |
| `icon`             | `string`        | `'inbox'`                                     | Icono de Material Icons a mostrar     |
| `title`            | `string`        | `'No hay elementos'`                          | Título del estado vacío               |
| `message`          | `string`        | `'No se encontraron elementos para mostrar.'` | Mensaje descriptivo                   |
| `buttonText`       | `string`        | `undefined`                                   | Texto del botón (opcional)            |
| `buttonType`       | `ButtonVariant` | `'primary'`                                   | Tipo de botón                         |
| `buttonIcon`       | `string`        | `undefined`                                   | Icono del botón (opcional)            |
| `buttonFullWidth`  | `boolean`       | `false`                                       | Si el botón debe ocupar todo el ancho |
| `buttonResponsive` | `boolean`       | `true`                                        | Si el botón debe ser responsivo       |

## 📡 Events

| Event         | Tipo                 | Descripción                              |
| ------------- | -------------------- | ---------------------------------------- |
| `buttonClick` | `EventEmitter<void>` | Se emite cuando se hace clic en el botón |

## 🎨 Tipos de Botón

| Tipo                | Descripción                  | Uso                          |
| ------------------- | ---------------------------- | ---------------------------- |
| `primary`           | Botón principal (default)    | Acciones principales         |
| `secondary`         | Botón secundario             | Acciones secundarias         |
| `success`           | Botón de éxito               | Confirmaciones               |
| `warning`           | Botón de advertencia         | Advertencias                 |
| `danger`            | Botón de peligro             | Acciones destructivas        |
| `outline-primary`   | Botón outline principal      | Acciones alternativas        |
| `outline-secondary` | Botón outline secundario     | Acciones secundarias         |
| `outline-success`   | Botón outline de éxito       | Confirmaciones suaves        |
| `outline-warning`   | Botón outline de advertencia | Advertencias suaves          |
| `outline-danger`    | Botón outline de peligro     | Acciones destructivas suaves |

## 🏗️ Interfaces

```typescript
type ButtonVariant = "primary" | "secondary" | "success" | "warning" | "danger" | "outline-primary" | "outline-secondary" | "outline-success" | "outline-warning" | "outline-danger";
```

## 💡 Ejemplos Prácticos

### 1. Estado Vacío Básico

```html
<openiis-empty-state icon="inbox" title="No hay elementos" message="No se encontraron elementos para mostrar."> </openiis-empty-state>
```

### 2. Estado Vacío con Botón

```html
<openiis-empty-state icon="inbox" title="No hay elementos" message="No se encontraron elementos para mostrar." buttonText="Agregar elemento" buttonType="primary" buttonIcon="add" (buttonClick)="onAddElement()"> </openiis-empty-state>
```

```typescript
export class MyComponent {
  onAddElement() {
    console.log("Agregar elemento");
  }
}
```

### 3. Estado de Búsqueda Vacía

```html
<openiis-empty-state icon="search" title="Sin resultados" message="No se encontraron resultados para tu búsqueda. Intenta con otros términos." buttonText="Limpiar búsqueda" buttonType="secondary" buttonIcon="refresh" (buttonClick)="onClearSearch()"> </openiis-empty-state>
```

```typescript
export class MyComponent {
  onClearSearch() {
    console.log("Limpiar búsqueda");
  }
}
```

### 4. Estado de Error

```html
<openiis-empty-state icon="error" title="Error de conexión" message="No se pudo conectar con el servidor. Verifica tu conexión a internet." buttonText="Reintentar" buttonType="danger" buttonIcon="refresh" (buttonClick)="onRetry()"> </openiis-empty-state>
```

```typescript
export class MyComponent {
  onRetry() {
    console.log("Reintentar conexión");
  }
}
```

### 5. Estado de Carga

```html
<openiis-empty-state icon="hourglass_empty" title="Cargando" message="Estamos procesando tu solicitud. Por favor espera un momento." buttonText="Cancelar" buttonType="outline-secondary" buttonIcon="close" (buttonClick)="onCancel()"> </openiis-empty-state>
```

```typescript
export class MyComponent {
  onCancel() {
    console.log("Cancelar operación");
  }
}
```

### 6. Carrito de Compras Vacío

```html
<openiis-empty-state icon="shopping_cart" title="Carrito vacío" message="Tu carrito de compras está vacío. Explora nuestros productos." buttonText="Ir a la tienda" buttonType="primary" buttonIcon="storefront" [buttonFullWidth]="true" (buttonClick)="onGoToStore()"> </openiis-empty-state>
```

```typescript
export class MyComponent {
  onGoToStore() {
    console.log("Ir a la tienda");
  }
}
```

### 7. Mensajes Vacíos

```html
<openiis-empty-state icon="mail" title="Sin mensajes" message="No tienes mensajes nuevos. Los mensajes aparecerán aquí." buttonText="Nuevo mensaje" buttonType="success" buttonIcon="edit" [buttonResponsive]="true" (buttonClick)="onNewMessage()"> </openiis-empty-state>
```

```typescript
export class MyComponent {
  onNewMessage() {
    console.log("Crear nuevo mensaje");
  }
}
```

### 8. Configuración Pendiente

```html
<openiis-empty-state icon="settings" title="Configuración requerida" message="Necesitas completar la configuración inicial para continuar." buttonText="Configurar" buttonType="warning" buttonIcon="tune" buttonSize="lg" (buttonClick)="onConfigure()"> </openiis-empty-state>
```

```typescript
export class MyComponent {
  onConfigure() {
    console.log("Abrir configuración");
  }
}
```

### 9. Estado Vacío sin Botón

```html
<openiis-empty-state icon="folder" title="Carpeta vacía" message="Esta carpeta no contiene archivos. Sube archivos para comenzar."> </openiis-empty-state>
```

### 10. Estado con Botón Outline

```html
<openiis-empty-state icon="person" title="Sin usuarios" message="No hay usuarios registrados en el sistema." buttonText="Invitar usuario" buttonType="outline-primary" buttonIcon="person_add" (buttonClick)="onInviteUser()"> </openiis-empty-state>
```

```typescript
export class MyComponent {
  onInviteUser() {
    console.log("Invitar usuario");
  }
}
```

### 11. Estado con Botón de Ancho Completo

```html
<openiis-empty-state icon="cloud_upload" title="Sin archivos" message="No hay archivos subidos. Comienza subiendo tu primer archivo." buttonText="Subir archivo" buttonType="primary" buttonIcon="upload" [buttonFullWidth]="true" (buttonClick)="onUploadFile()"> </openiis-empty-state>
```

```typescript
export class MyComponent {
  onUploadFile() {
    console.log("Subir archivo");
  }
}
```

### 12. Estado Condicional

```html
<openiis-empty-state [icon]="getEmptyStateIcon()" [title]="getEmptyStateTitle()" [message]="getEmptyStateMessage()" [buttonText]="getEmptyStateButtonText()" [buttonType]="getEmptyStateButtonType()" [buttonIcon]="getEmptyStateButtonIcon()" (buttonClick)="onEmptyStateAction()"> </openiis-empty-state>
```

```typescript
export class MyComponent {
  emptyStateType = "general";

  getEmptyStateIcon(): string {
    switch (this.emptyStateType) {
      case "search":
        return "search";
      case "error":
        return "error";
      case "loading":
        return "hourglass_empty";
      default:
        return "inbox";
    }
  }

  getEmptyStateTitle(): string {
    switch (this.emptyStateType) {
      case "search":
        return "Sin resultados";
      case "error":
        return "Error de conexión";
      case "loading":
        return "Cargando";
      default:
        return "No hay elementos";
    }
  }

  getEmptyStateMessage(): string {
    switch (this.emptyStateType) {
      case "search":
        return "No se encontraron resultados para tu búsqueda.";
      case "error":
        return "No se pudo conectar con el servidor.";
      case "loading":
        return "Estamos procesando tu solicitud.";
      default:
        return "No se encontraron elementos para mostrar.";
    }
  }

  getEmptyStateButtonText(): string {
    switch (this.emptyStateType) {
      case "search":
        return "Limpiar búsqueda";
      case "error":
        return "Reintentar";
      case "loading":
        return "Cancelar";
      default:
        return "Agregar elemento";
    }
  }

  getEmptyStateButtonType(): any {
    switch (this.emptyStateType) {
      case "search":
        return "secondary";
      case "error":
        return "danger";
      case "loading":
        return "outline-secondary";
      default:
        return "primary";
    }
  }

  getEmptyStateButtonIcon(): string {
    switch (this.emptyStateType) {
      case "search":
        return "refresh";
      case "error":
        return "refresh";
      case "loading":
        return "close";
      default:
        return "add";
    }
  }

  onEmptyStateAction() {
    console.log("Acción del estado vacío");
  }
}
```

### 13. Estado en Listas

```html
<div class="list-container">
  <div *ngIf="items.length === 0; else itemsList">
    <openiis-empty-state icon="list" title="Lista vacía" message="No hay elementos en esta lista." buttonText="Agregar elemento" buttonType="primary" buttonIcon="add" (buttonClick)="addItem()"> </openiis-empty-state>
  </div>

  <ng-template #itemsList>
    <div *ngFor="let item of items">{{ item.name }}</div>
  </ng-template>
</div>
```

```typescript
export class MyComponent {
  items: any[] = [];

  addItem() {
    this.items.push({ name: "Nuevo elemento" });
  }
}
```

### 14. Estado en Formularios

```html
<form (ngSubmit)="submitForm()">
  <div class="form-content">
    <!-- Campos del formulario -->
    <input type="text" placeholder="Nombre" />
    <input type="email" placeholder="Email" />

    <!-- Estado vacío si no hay campos -->
    <div *ngIf="!hasFormFields">
      <openiis-empty-state icon="edit" title="Formulario vacío" message="Agrega campos al formulario para comenzar." buttonText="Agregar campo" buttonType="primary" buttonIcon="add" (buttonClick)="addFormField()"> </openiis-empty-state>
    </div>
  </div>

  <button type="submit">Enviar</button>
</form>
```

```typescript
export class MyComponent {
  hasFormFields = false;

  addFormField() {
    this.hasFormFields = true;
  }

  submitForm() {
    console.log("Enviar formulario");
  }
}
```

### 15. Estado en Tablas

```html
<table>
  <thead>
    <tr>
      <th>Nombre</th>
      <th>Email</th>
      <th>Acciones</th>
    </tr>
  </thead>
  <tbody>
    <tr *ngIf="users.length === 0">
      <td colspan="3">
        <openiis-empty-state icon="group" title="Sin usuarios" message="No hay usuarios registrados en el sistema." buttonText="Agregar usuario" buttonType="primary" buttonIcon="person_add" (buttonClick)="addUser()"> </openiis-empty-state>
      </td>
    </tr>
    <tr *ngFor="let user of users">
      <td>{{ user.name }}</td>
      <td>{{ user.email }}</td>
      <td>
        <button>Editar</button>
      </td>
    </tr>
  </tbody>
</table>
```

```typescript
export class MyComponent {
  users: any[] = [];

  addUser() {
    this.users.push({ name: "Nuevo usuario", email: "usuario@ejemplo.com" });
  }
}
```

## ⚡ Comportamiento

### Estados

- **Vacío**: Cuando no hay contenido para mostrar
- **Búsqueda**: Cuando no hay resultados de búsqueda
- **Error**: Cuando hay un error de conexión o sistema
- **Carga**: Cuando se está procesando una operación

### Iconos

- **Material Icons**: Uso de iconos de Material Design
- **Contextuales**: Iconos que representan el contexto del estado
- **Consistentes**: Iconos que mantienen coherencia visual

### Responsive

- **Móvil**: Adaptación automática en pantallas pequeñas
- **Desktop**: Diseño optimizado para pantallas grandes
- **Accesibilidad**: Soporte completo para lectores

## ✅ Características

- ✅ Iconos de Material Design
- ✅ Títulos y mensajes personalizables
- ✅ Botones opcionales con diferentes tipos
- ✅ Iconos en botones
- ✅ Botones de ancho completo
- ✅ Botones responsivos
- ✅ Eventos de clic
- ✅ Diseño centrado y limpio
- ✅ Colores temáticos
- ✅ Responsive design
- ✅ Accesibilidad completa
- ✅ Integración con Button component
- ✅ Estados condicionales
- ✅ Mensajes contextuales
- ✅ Iconos contextuales

## 🎨 Estilos Automáticos

- **Centrado**: Contenido centrado automáticamente
- **Espaciado**: Espaciado consistente con variables CSS
- **Tipografía**: Jerarquía tipográfica clara
- **Colores**: Integración con el sistema de colores
- **Responsive**: Adaptación automática en móviles

## 🔧 Funcionalidades Especiales

### Botón Opcional

```typescript
// Estado sin botón
<openiis-empty-state icon="inbox" title="Vacío" message="Sin contenido">
```

### Botón de Ancho Completo

```typescript
// Botón que ocupa todo el ancho
[buttonFullWidth] = "true";
```

### Botón Responsivo

```typescript
// Botón que se adapta al tamaño de pantalla
[buttonResponsive] = "true";
```

### Eventos de Clic

```typescript
// Manejo de eventos del botón
buttonClick = "onButtonClick()";
```

### Estados Condicionales

```typescript
// Estados que cambian según el contexto
[icon] = "getContextualIcon()"[title] = "getContextualTitle()";
```

## 🚨 Solución de Problemas

| Problema                   | Solución                                                 |
| -------------------------- | -------------------------------------------------------- |
| Icono no aparece           | Verifica que el icono esté en Material Icons             |
| Botón no funciona          | Verifica que `buttonText` esté configurado               |
| Evento no se emite         | Verifica que el método esté definido en el componente    |
| Responsive no funciona     | Verifica que `buttonResponsive` esté en `true`           |
| Ancho completo no funciona | Verifica que `buttonFullWidth` esté en `true`            |
| Colores incorrectos        | Verifica que `buttonType` esté configurado correctamente |

## 🐞 Reportar Problemas

Si encuentras algún problema en la lógica del componente, por favor
[🐞Reportalo](https://github.com/Alexiisart/openiis-ui/issues/new)
