# Dropdown Component

## Descripción

El componente `OpeniisDropdownComponent` es un selector desplegable personalizado que permite al usuario elegir una opción de una lista. Incluye soporte para diferentes tamaños, estados deshabilitados y tooltips informativos.

## Características

- ✅ **Tamaños Configurables:** Tres tamaños disponibles (sm, md, lg)
- ✅ **Tooltips Integrados:** Soporte para tooltips informativos al hacer hover
- ✅ **Estado Deshabilitado:** Opción para deshabilitar la interacción
- ✅ **Personalizable:** Estilos adaptables según el tema
- ✅ **Reactivo:** Emite eventos al cambiar la selección

## Uso Básico

```typescript
// En tu componente
import { OpeniisDropdownComponent } from "../components/dropdowns/dropdown.component";

@Component({
  selector: "app-tu-componente",
  template: ` <openiis-dropdown [options]="opciones" [selectedValue]="valorSeleccionado" (selectionChanged)="onSelectionChange($event)"> </openiis-dropdown> `,
})
export class TuComponente {
  opciones = [
    { value: "opcion1", label: "Opción 1" },
    { value: "opcion2", label: "Opción 2" },
    { value: "opcion3", label: "Opción 3" },
  ];

  valorSeleccionado = "opcion1";

  onSelectionChange(value: string) {
    console.log("Nueva selección:", value);
  }
}
```

## Props (Inputs)

| Prop          | Tipo             | Default | Descripción                                         |
| ------------- | ---------------- | ------- | --------------------------------------------------- |
| size          | DropdownSize     | 'md'    | Tamaño del dropdown ('sm' \| 'md' \| 'lg')          |
| options       | DropdownOption[] | []      | Array de opciones para mostrar                      |
| selectedValue | string           | ''      | Valor actualmente seleccionado                      |
| tooltip       | string           | -       | Texto informativo que aparece al hacer hover        |
| disabled      | boolean          | false   | Si true, deshabilita la interacción con el dropdown |

## Eventos (Outputs)

| Evento           | Tipo                 | Descripción                                   |
| ---------------- | -------------------- | --------------------------------------------- |
| selectionChanged | EventEmitter<string> | Emite cuando el usuario selecciona una opción |

## Interfaces

```typescript
interface DropdownOption {
  value: string; // Valor interno de la opción
  label: string; // Texto a mostrar
}

type DropdownSize = "sm" | "md" | "lg";
```

## Ejemplos

### Dropdown Básico

```typescript
<openiis-dropdown
  [options]="[
    { value: 'es', label: 'Español' },
    { value: 'en', label: 'English' }
  ]"
  selectedValue="es"
  (selectionChanged)="onLanguageChange($event)"
>
</openiis-dropdown>
```

### Con Tooltip y Tamaño Personalizado

```typescript
<openiis-dropdown
  [options]="temaOptions"
  size="lg"
  tooltip="Selecciona el tema de la aplicación"
  (selectionChanged)="onThemeChange($event)"
>
</openiis-dropdown>
```

### Dropdown Deshabilitado

```typescript
<openiis-dropdown
  [options]="options"
  [disabled]="true"
  tooltip="No disponible en este momento"
>
</openiis-dropdown>
```

## Notas de Uso

1. **Inicialización:**

   - Asegúrate de proporcionar un array de opciones válido
   - El `selectedValue` debe coincidir con el `value` de una de las opciones

2. **Manejo de Cambios:**

   - Suscríbete al evento `selectionChanged` para reaccionar a las selecciones del usuario
   - El evento emite el `value` de la opción seleccionada

3. **Tooltips:**

   - Los tooltips son opcionales y solo se muestran al hacer hover
   - Usa tooltips concisos y descriptivos

4. **Tamaños:**
   - `sm`: Para espacios reducidos o formularios compactos
   - `md`: Tamaño estándar para uso general
   - `lg`: Para mayor visibilidad o énfasis

## Dependencias

- `@angular/common`
- `OpeniisTooltipComponent` (componente interno de tooltip)
