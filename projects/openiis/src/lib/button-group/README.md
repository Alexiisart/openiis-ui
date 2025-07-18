# Button Group Component

Un componente Button Group versátil para Angular que permite agrupar botones relacionados de manera semántica y visualmente atractiva, con soporte para selección única o múltiple.

## Características

- ✅ **6 variantes visuales**: default, primary, success, warning, danger, subtle
- ✅ **5 tamaños**: xs, sm, md, lg, xl
- ✅ **2 orientaciones**: horizontal y vertical
- ✅ **Selección múltiple**: Soporte para selección única o múltiple
- ✅ **Estados completos**: normal, hover, focus, disabled, selected
- ✅ **Accesibilidad**: ARIA labels, navegación por teclado, roles semánticos
- ✅ **Diseño flexible**: Ancho completo, separado, agrupado
- ✅ **Responsive**: Adaptado para dispositivos móviles

## Uso Básico

```typescript
import { OpeniisButtonGroupComponent } from "./components/button-group";

@Component({
  selector: "app-example",
  standalone: true,
  imports: [OpeniisButtonGroupComponent],
  template: `
    <openiis-button-group [selectedIndex]="selectedIndex" (selectionChange)="onSelectionChange($event)">
      <button class="btn">Opción 1</button>
      <button class="btn">Opción 2</button>
      <button class="btn">Opción 3</button>
    </openiis-button-group>
  `,
})
export class ExampleComponent {
  selectedIndex = 0;

  onSelectionChange(index: number) {
    this.selectedIndex = index;
  }
}
```

## Propiedades

### Configuración Visual

| Propiedad     | Tipo                     | Valor por defecto | Descripción                                                         |
| ------------- | ------------------------ | ----------------- | ------------------------------------------------------------------- |
| `size`        | `ButtonGroupSize`        | `'md'`            | Tamaño de los botones: xs, sm, md, lg, xl                           |
| `orientation` | `ButtonGroupOrientation` | `'horizontal'`    | Orientación: horizontal, vertical                                   |
| `type`        | `ButtonGroupType`        | `'default'`       | Variante visual: default, primary, success, warning, danger, subtle |
| `fullWidth`   | `boolean`                | `false`           | Hacer que el grupo ocupe el ancho completo                          |
| `separated`   | `boolean`                | `false`           | Separar los botones con espacio                                     |

### Funcionalidad

| Propiedad         | Tipo       | Valor por defecto | Descripción                                           |
| ----------------- | ---------- | ----------------- | ----------------------------------------------------- |
| `multiple`        | `boolean`  | `false`           | Permitir selección múltiple                           |
| `disabled`        | `boolean`  | `false`           | Deshabilitar todos los botones                        |
| `selectedIndex`   | `number`   | `-1`              | Índice del botón seleccionado (selección única)       |
| `selectedIndices` | `number[]` | `[]`              | Índices de botones seleccionados (selección múltiple) |

### Accesibilidad

| Propiedad         | Tipo     | Valor por defecto | Descripción                          |
| ----------------- | -------- | ----------------- | ------------------------------------ |
| `role`            | `string` | `'group'`         | Rol ARIA para el grupo               |
| `ariaLabel`       | `string` | `''`              | ARIA label para lectores de pantalla |
| `ariaDescribedBy` | `string` | `''`              | ARIA describedby para referencias    |

### Personalización

| Propiedad      | Tipo     | Valor por defecto | Descripción            |
| -------------- | -------- | ----------------- | ---------------------- |
| `extraClasses` | `string` | `''`              | Clases CSS adicionales |

## Eventos

| Evento            | Tipo                                                                          | Descripción                             |
| ----------------- | ----------------------------------------------------------------------------- | --------------------------------------- |
| `buttonClick`     | `EventEmitter<{index: number, button: HTMLButtonElement, selected: boolean}>` | Emitido cuando se hace clic en un botón |
| `selectionChange` | `EventEmitter<number \| number[]>`                                            | Emitido cuando cambia la selección      |

## Ejemplos de Uso

### Tamaños Disponibles

```html
<openiis-button-group size="xs">
  <button class="btn">XS</button>
  <button class="btn">Botón</button>
</openiis-button-group>

<openiis-button-group size="sm">
  <button class="btn">SM</button>
  <button class="btn">Botón</button>
</openiis-button-group>

<openiis-button-group size="md">
  <button class="btn">MD</button>
  <button class="btn">Botón</button>
</openiis-button-group>

<openiis-button-group size="lg">
  <button class="btn">LG</button>
  <button class="btn">Botón</button>
</openiis-button-group>

<openiis-button-group size="xl">
  <button class="btn">XL</button>
  <button class="btn">Botón</button>
</openiis-button-group>
```

### Variantes de Color

```html
<openiis-button-group type="primary">
  <button class="btn">Guardar</button>
  <button class="btn">Cancelar</button>
</openiis-button-group>

<openiis-button-group type="success">
  <button class="btn">Aceptar</button>
  <button class="btn">Completar</button>
</openiis-button-group>

<openiis-button-group type="warning">
  <button class="btn">Advertir</button>
  <button class="btn">Revisar</button>
</openiis-button-group>

<openiis-button-group type="danger">
  <button class="btn">Eliminar</button>
  <button class="btn">Descartar</button>
</openiis-button-group>
```

### Orientación Vertical

```html
<openiis-button-group orientation="vertical">
  <button class="btn">Arriba</button>
  <button class="btn">Centro</button>
  <button class="btn">Abajo</button>
</openiis-button-group>
```

### Selección Múltiple

```html
<openiis-button-group [multiple]="true" [selectedIndices]="[0, 2]" (selectionChange)="onMultipleSelection($event)">
  <button class="btn">Negrita</button>
  <button class="btn">Cursiva</button>
  <button class="btn">Subrayado</button>
</openiis-button-group>
```

### Ancho Completo

```html
<openiis-button-group [fullWidth]="true">
  <button class="btn">Uno</button>
  <button class="btn">Dos</button>
  <button class="btn">Tres</button>
</openiis-button-group>
```

### Botones Separados

```html
<openiis-button-group [separated]="true">
  <button class="btn">Nuevo</button>
  <button class="btn">Abrir</button>
  <button class="btn">Guardar</button>
</openiis-button-group>
```

### Estados Especiales

```html
<!-- Deshabilitado -->
<openiis-button-group [disabled]="true">
  <button class="btn">Deshabilitado</button>
  <button class="btn">Grupo</button>
</openiis-button-group>

<!-- Con carga -->
<openiis-button-group>
  <button class="btn">Normal</button>
  <button class="btn loading">Cargando</button>
</openiis-button-group>
```

### Casos de Uso Reales

#### Toolbar de Formato

```html
<openiis-button-group [multiple]="true" size="sm" ariaLabel="Opciones de formato">
  <button class="btn">B</button>
  <button class="btn">I</button>
  <button class="btn">U</button>
  <button class="btn">S</button>
</openiis-button-group>
```

#### Filtros de Vista

```html
<openiis-button-group [selectedIndex]="viewMode" (selectionChange)="changeView($event)">
  <button class="btn">📋 Lista</button>
  <button class="btn">🔲 Cuadrícula</button>
  <button class="btn">📊 Tabla</button>
</openiis-button-group>
```

#### Acciones de Formulario

```html
<openiis-button-group type="primary" orientation="vertical">
  <button class="btn">Guardar</button>
  <button class="btn">Guardar y Continuar</button>
  <button class="btn">Cancelar</button>
</openiis-button-group>
```

## Métodos Públicos

### updateSelection(selection: number | number[])

Actualiza la selección programáticamente.

```typescript
// Selección única
buttonGroup.updateSelection(2);

// Selección múltiple
buttonGroup.updateSelection([0, 1, 3]);
```

## Personalización CSS

El componente utiliza variables CSS del sistema de diseño:

```css
.button-group {
  --btn-group-border: var(--neutral-200);
  --btn-group-bg: var(--color-bg-primary);
  --btn-group-shadow: var(--shadow-sm);
  --btn-group-radius: var(--radius-md);
  --btn-group-gap: var(--space-2);
}
```

## Accesibilidad

- **Roles ARIA**: Grupo semántico con role="group"
- **Navegación por teclado**: Flechas para navegar, Enter/Space para seleccionar
- **Estados**: aria-pressed para botones seleccionados
- **Lectores de pantalla**: Soporte completo con labels descriptivos

### Navegación por Teclado

| Tecla             | Acción                             |
| ----------------- | ---------------------------------- |
| `Tab`             | Navegar hacia el grupo             |
| `→` / `←`         | Navegar entre botones (horizontal) |
| `↑` / `↓`         | Navegar entre botones (vertical)   |
| `Enter` / `Space` | Seleccionar/deseleccionar botón    |

## Responsive

El componente se adapta automáticamente:

- **Móvil**: Los grupos horizontales se vuelven verticales
- **Touch**: Tamaños optimizados para touch
- **Espaciado**: Ajustado para pantallas pequeñas

## Casos de Uso Comunes

1. **Toolbar de Edición**: Botones de formato (negrita, cursiva, subrayado)
2. **Filtros**: Selección de categorías o estados
3. **Vistas**: Cambio entre lista, cuadrícula, tabla
4. **Acciones**: Grupos de acciones relacionadas
5. **Configuración**: Opciones de configuración agrupadas
6. **Navegación**: Pestañas o secciones relacionadas

## Buenas Prácticas

- ✅ Usar máximo 5-7 botones por grupo
- ✅ Agrupar acciones relacionadas semánticamente
- ✅ Proporcionar labels descriptivos
- ✅ Considerar el contexto responsive
- ❌ No mezclar acciones destructivas con normales
- ❌ No usar demasiados grupos en una vista
