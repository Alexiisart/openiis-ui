# Button Group

Contenedor avanzado para agrupar botones relacionados con estilos CSS automáticos, separadores visuales, estados de selección y navegación por teclado.

## 📦 Instalación

```typescript
import { OpeniisButtonGroupComponent, OpeniisButtonComponent } from 'openiis-ui';

@Component({
  imports: [OpeniisButtonGroupComponent, OpeniisButtonComponent],
})
```

## ⚙️ Properties

| Property          | Tipo                     | Default        | Descripción                      |
| ----------------- | ------------------------ | -------------- | -------------------------------- |
| `size`            | `ButtonGroupSize`        | `'md'`         | Tamaño de los botones            |
| `orientation`     | `ButtonGroupOrientation` | `'horizontal'` | Orientación del grupo            |
| `type`            | `ButtonGroupType`        | `'default'`    | Tipo visual del grupo            |
| `multiple`        | `boolean`                | `false`        | Permitir selección múltiple      |
| `fullWidth`       | `boolean`                | `false`        | Ancho completo                   |
| `separated`       | `boolean`                | `false`        | Separar botones con espacio      |
| `disabled`        | `boolean`                | `false`        | Deshabilitar todo el grupo       |
| `selectedIndex`   | `number`                 | `-1`           | Índice del botón seleccionado    |
| `selectedIndices` | `number[]`               | `[]`           | Índices de botones seleccionados |
| `role`            | `string`                 | `'group'`      | Rol ARIA para accesibilidad      |
| `ariaLabel`       | `string`                 | `''`           | Etiqueta ARIA                    |
| `ariaDescribedBy` | `string`                 | `''`           | Referencia ARIA describedby      |
| `extraClasses`    | `string`                 | `''`           | Clases CSS adicionales           |

## 📡 Events

| Event             | Tipo                                                            | Descripción                        |
| ----------------- | --------------------------------------------------------------- | ---------------------------------- |
| `buttonClick`     | `{index: number, button: HTMLButtonElement, selected: boolean}` | Emitido al hacer clic en un botón  |
| `selectionChange` | `number \| number[]`                                            | Emitido cuando cambia la selección |

## 🎨 Tipos de Grupo

| Tipo      | Color   | Uso                  |
| --------- | ------- | -------------------- |
| `default` | Gris    | Grupo estándar       |
| `primary` | Azul    | Grupo principal      |
| `success` | Verde   | Grupo de éxito       |
| `warning` | Naranja | Grupo de advertencia |
| `danger`  | Rojo    | Grupo de peligro     |
| `subtle`  | Sutil   | Grupo sutil          |

## 📏 Tamaños

| Tamaño | Altura | Uso               |
| ------ | ------ | ----------------- |
| `xs`   | 28px   | Muy pequeño       |
| `sm`   | 32px   | Pequeño           |
| `md`   | 40px   | Mediano (default) |
| `lg`   | 48px   | Grande            |
| `xl`   | 56px   | Muy grande        |

## 💡 Ejemplos Prácticos

### 1. Grupo Básico con Selección

```html
<openiis-button-group [selectedIndex]="selectedButton" (selectionChange)="onSelectionChange($event)">
  <openiis-button text="Left" type="primary" (clickEvent)="onButtonClick(0)"> </openiis-button>
  <openiis-button text="Center" type="primary" (clickEvent)="onButtonClick(1)"> </openiis-button>
  <openiis-button text="Right" type="primary" (clickEvent)="onButtonClick(2)"> </openiis-button>
</openiis-button-group>
```

```typescript
export class MyComponent {
  selectedButton = 0;

  onSelectionChange(selection: number | number[]) {
    if (typeof selection === "number") {
      console.log("Selected button:", selection);
      this.selectedButton = selection;
    }
  }

  onButtonClick(index: number) {
    console.log("Button clicked:", index);
  }
}
```

### 2. Grupo con Selección Múltiple

```html
<openiis-button-group [multiple]="true" [selectedIndices]="selectedButtons" (selectionChange)="onMultipleSelectionChange($event)">
  <openiis-button text="Option 1" type="secondary" (clickEvent)="onOptionClick(0)"> </openiis-button>
  <openiis-button text="Option 2" type="secondary" (clickEvent)="onOptionClick(1)"> </openiis-button>
  <openiis-button text="Option 3" type="secondary" (clickEvent)="onOptionClick(2)"> </openiis-button>
</openiis-button-group>
```

```typescript
export class MyComponent {
  selectedButtons: number[] = [];

  onMultipleSelectionChange(selection: number | number[]) {
    if (Array.isArray(selection)) {
      console.log("Selected buttons:", selection);
      this.selectedButtons = selection;
    }
  }

  onOptionClick(index: number) {
    console.log("Option clicked:", index);
  }
}
```

### 3. Grupo Vertical con Diferentes Tipos

```html
<openiis-button-group orientation="vertical" type="success" [selectedIndex]="selectedVertical" (selectionChange)="onVerticalSelectionChange($event)">
  <openiis-button text="Top" type="success" (clickEvent)="onVerticalClick(0)"> </openiis-button>
  <openiis-button text="Middle" type="success" (clickEvent)="onVerticalClick(1)"> </openiis-button>
  <openiis-button text="Bottom" type="success" (clickEvent)="onVerticalClick(2)"> </openiis-button>
</openiis-button-group>
```

```typescript
export class MyComponent {
  selectedVertical = 0;

  onVerticalSelectionChange(selection: number | number[]) {
    if (typeof selection === "number") {
      console.log("Vertical selection:", selection);
      this.selectedVertical = selection;
    }
  }

  onVerticalClick(index: number) {
    console.log("Vertical button clicked:", index);
  }
}
```

### 4. Grupo Separado con Diferentes Tamaños

```html
<openiis-button-group [separated]="true" type="warning" [selectedIndex]="selectedSeparated" (selectionChange)="onSeparatedSelectionChange($event)">
  <openiis-button text="Small" type="warning" size="sm" (clickEvent)="onSeparatedClick(0)"> </openiis-button>
  <openiis-button text="Medium" type="warning" size="md" (clickEvent)="onSeparatedClick(1)"> </openiis-button>
  <openiis-button text="Large" type="warning" size="lg" (clickEvent)="onSeparatedClick(2)"> </openiis-button>
</openiis-button-group>
```

```typescript
export class MyComponent {
  selectedSeparated = 1;

  onSeparatedSelectionChange(selection: number | number[]) {
    if (typeof selection === "number") {
      console.log("Separated selection:", selection);
      this.selectedSeparated = selection;
    }
  }

  onSeparatedClick(index: number) {
    console.log("Separated button clicked:", index);
  }
}
```

### 5. Grupo de Ancho Completo con Iconos

```html
<openiis-button-group [fullWidth]="true" type="info" [selectedIndex]="selectedFullWidth" (selectionChange)="onFullWidthSelectionChange($event)">
  <openiis-button text="List" type="info" iconLeft="list" [fullWidth]="true" (clickEvent)="onFullWidthClick(0)"> </openiis-button>
  <openiis-button text="Grid" type="info" iconLeft="grid_view" [fullWidth]="true" (clickEvent)="onFullWidthClick(1)"> </openiis-button>
  <openiis-button text="Cards" type="info" iconLeft="view_module" [fullWidth]="true" (clickEvent)="onFullWidthClick(2)"> </openiis-button>
</openiis-button-group>
```

```typescript
export class MyComponent {
  selectedFullWidth = 0;

  onFullWidthSelectionChange(selection: number | number[]) {
    if (typeof selection === "number") {
      console.log("Full width selection:", selection);
      this.selectedFullWidth = selection;
    }
  }

  onFullWidthClick(index: number) {
    console.log("Full width button clicked:", index);
  }
}
```

### 6. Grupo Deshabilitado

```html
<openiis-button-group [disabled]="true" type="danger" [selectedIndex]="selectedDisabled" (selectionChange)="onDisabledSelectionChange($event)">
  <openiis-button text="Disabled 1" type="danger" [disabled]="true" (clickEvent)="onDisabledClick(0)"> </openiis-button>
  <openiis-button text="Disabled 2" type="danger" [disabled]="true" (clickEvent)="onDisabledClick(1)"> </openiis-button>
  <openiis-button text="Disabled 3" type="danger" [disabled]="true" (clickEvent)="onDisabledClick(2)"> </openiis-button>
</openiis-button-group>
```

```typescript
export class MyComponent {
  selectedDisabled = -1;

  onDisabledSelectionChange(selection: number | number[]) {
    if (typeof selection === "number") {
      console.log("Disabled selection:", selection);
      this.selectedDisabled = selection;
    }
  }

  onDisabledClick(index: number) {
    console.log("Disabled button clicked:", index);
  }
}
```

### 7. Grupo con Estados de Loading

```html
<openiis-button-group type="primary" [selectedIndex]="selectedLoading" (selectionChange)="onLoadingSelectionChange($event)">
  <openiis-button text="Loading 1" type="primary" [loading]="true" (clickEvent)="onLoadingClick(0)"> </openiis-button>
  <openiis-button text="Loading 2" type="primary" [loading]="false" (clickEvent)="onLoadingClick(1)"> </openiis-button>
  <openiis-button text="Loading 3" type="primary" [loading]="true" (clickEvent)="onLoadingClick(2)"> </openiis-button>
</openiis-button-group>
```

```typescript
export class MyComponent {
  selectedLoading = 1;

  onLoadingSelectionChange(selection: number | number[]) {
    if (typeof selection === "number") {
      console.log("Loading selection:", selection);
      this.selectedLoading = selection;
    }
  }

  onLoadingClick(index: number) {
    console.log("Loading button clicked:", index);
  }
}
```

## 🏗️ Interfaces

```typescript
type ButtonGroupSize = "xs" | "sm" | "md" | "lg" | "xl";
type ButtonGroupOrientation = "horizontal" | "vertical";
type ButtonGroupType = "default" | "primary" | "success" | "warning" | "danger" | "subtle";
```

## ⚡ Comportamiento

- **Selección automática**: Maneja estados selected automáticamente
- **Selección única y múltiple**: Soporte para ambos modos
- **Navegación por teclado**: Flechas para navegar, Enter/Space para seleccionar
- **Separadores visuales**: Líneas entre botones (excepto en modo separated)
- **Estados visuales**: Hover, focus, selected, disabled, loading
- **Responsive**: Se adapta automáticamente en móviles
- **Accesibilidad**: Soporte completo para ARIA

## ✅ Características

- ✅ Selección única y múltiple automática
- ✅ Orientación horizontal y vertical
- ✅ 6 tipos visuales diferentes
- ✅ 5 tamaños configurables
- ✅ Navegación por teclado completa
- ✅ Separadores visuales automáticos
- ✅ Ancho completo opcional
- ✅ Separación entre botones
- ✅ Estados disabled y loading
- ✅ Completamente responsive
- ✅ Integración con temas Openiis UI
- ✅ Accesibilidad completa
- ✅ Eventos detallados
- ✅ Estados visuales avanzados

## 🎨 Estilos Automáticos

- **Bordes redondeados**: Solo en esquinas externas
- **Separadores**: Líneas entre botones automáticas
- **Estados hover**: Efectos de elevación
- **Estados focus**: Outline visible
- **Estados selected**: Color de fondo destacado
- **Responsive**: Cambia a vertical en móviles
- **Animaciones**: Transiciones suaves

## 🚨 Solución de Problemas

| Problema                           | Solución                                                                      |
| ---------------------------------- | ----------------------------------------------------------------------------- |
| Selección no funciona              | Verifica `selectedIndex` o `selectedIndices`                                  |
| Navegación por teclado no funciona | Verifica que los botones tengan focus                                         |
| Estilos no se aplican              | Asegúrate de que el tema Openiis UI esté configurado                          |
| Orientación incorrecta             | Verifica que `orientation` esté en ['horizontal', 'vertical']                 |
| Error de tipo en selectionChange   | Usa type guards: `typeof selection === 'number'` o `Array.isArray(selection)` |
| Separadores no aparecen            | Verifica que `separated` esté en `false`                                      |

## 🐞 Reportar Problemas

Si encuentras algún problema en la lógica del componente, por favor
[🐞Reportalo](https://github.com/Alexiisart/openiis-ui/issues/new)
