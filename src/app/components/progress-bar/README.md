# Progress Bar Component

El componente Progress Bar es un indicador visual versátil que muestra el progreso de tareas, operaciones o procesos con múltiples variantes y opciones de personalización.

## Características

- **4 variantes**: linear, circular, semi-circular, stepped
- **5 tamaños**: xs, sm, md, lg, xl
- **6 colores**: primary, secondary, success, warning, danger, info
- **2 tipos**: determinate (con valor específico) e indeterminate (carga continua)
- **Efectos visuales**: striped, animated, smooth transitions
- **Texto personalizable**: porcentaje, fracción o texto custom
- **Progreso por pasos**: Para procesos multi-etapa
- **Métodos públicos**: Control programático del progreso
- **Accesibilidad**: ARIA completo, soporte para lectores de pantalla
- **Responsive**: Adaptable a diferentes dispositivos

## Uso Básico

```html
<!-- Progress bar linear básico -->
<app-progress-bar [value]="50"></app-progress-bar>

<!-- Progress bar con texto -->
<app-progress-bar [value]="75" color="success" showText="true"> </app-progress-bar>

<!-- Progress bar circular -->
<app-progress-bar variant="circular" [value]="60" size="lg" showText="true"> </app-progress-bar>

<!-- Progress bar por pasos -->
<app-progress-bar variant="stepped" [steps]="steps" [currentStep]="2"> </app-progress-bar>
```

## Propiedades

| Propiedad          | Tipo                                     | Valor por defecto | Descripción                                            |
| ------------------ | ---------------------------------------- | ----------------- | ------------------------------------------------------ |
| `variant`          | `ProgressVariant`                        | `'linear'`        | Variante visual del progress bar                       |
| `size`             | `ProgressSize`                           | `'md'`            | Tamaño del progress bar                                |
| `color`            | `ProgressColor`                          | `'primary'`       | Color del progress bar                                 |
| `type`             | `ProgressType`                           | `'determinate'`   | Tipo de progreso (determinado/indeterminado)           |
| `value`            | `number`                                 | `0`               | Valor actual del progreso                              |
| `min`              | `number`                                 | `0`               | Valor mínimo                                           |
| `max`              | `number`                                 | `100`             | Valor máximo                                           |
| `striped`          | `boolean`                                | `false`           | Si muestra patrón rayado                               |
| `animated`         | `boolean`                                | `false`           | Si las rayas están animadas                            |
| `showText`         | `boolean`                                | `false`           | Si muestra texto de progreso                           |
| `textFormat`       | `string`                                 | `'percentage'`    | Formato del texto ('percentage', 'fraction', 'custom') |
| `customText`       | `string`                                 | `undefined`       | Texto personalizado                                    |
| `customColor`      | `string`                                 | `undefined`       | Color personalizado                                    |
| `customBackground` | `string`                                 | `undefined`       | Color de fondo personalizado                           |
| `ariaLabel`        | `string`                                 | `'Progreso'`      | Etiqueta ARIA                                          |
| `role`             | `string`                                 | `'progressbar'`   | Rol ARIA                                               |
| `steps`            | `Array<{label: string, value?: number}>` | `[]`              | Pasos para variant stepped                             |
| `currentStep`      | `number`                                 | `0`               | Paso actual (variant stepped)                          |
| `showStepLabels`   | `boolean`                                | `true`            | Si muestra etiquetas de pasos                          |
| `smooth`           | `boolean`                                | `true`            | Si usa transiciones suaves                             |
| `hideOnComplete`   | `boolean`                                | `false`           | Si se oculta al completar                              |
| `pulseOnComplete`  | `boolean`                                | `false`           | Si pulsa al completar                                  |

## Tipos

```typescript
type ProgressVariant = "linear" | "circular" | "semi-circular" | "stepped";
type ProgressSize = "xs" | "sm" | "md" | "lg" | "xl";
type ProgressColor = "primary" | "secondary" | "success" | "warning" | "danger" | "info";
type ProgressType = "determinate" | "indeterminate";
```

## Métodos Públicos

| Método                       | Descripción                          |
| ---------------------------- | ------------------------------------ |
| `setValue(value: number)`    | Establece el valor del progreso      |
| `increment(amount?: number)` | Incrementa el progreso               |
| `decrement(amount?: number)` | Decrementa el progreso               |
| `reset()`                    | Reinicia el progreso al mínimo       |
| `complete()`                 | Completa el progreso al máximo       |
| `nextStep()`                 | Avanza al siguiente paso (stepped)   |
| `previousStep()`             | Retrocede al paso anterior (stepped) |
| `goToStep(step: number)`     | Va a un paso específico (stepped)    |

## Ejemplos de Uso

### Variantes

```html
<!-- Linear (por defecto) -->
<app-progress-bar [value]="50"></app-progress-bar>

<!-- Circular -->
<app-progress-bar variant="circular" [value]="75" size="lg"> </app-progress-bar>

<!-- Semi-circular -->
<app-progress-bar variant="semi-circular" [value]="60" showText="true"> </app-progress-bar>

<!-- Por pasos -->
<app-progress-bar variant="stepped" [steps]="processSteps" [currentStep]="1"> </app-progress-bar>
```

### Tamaños

```html
<app-progress-bar [value]="50" size="xs"></app-progress-bar>
<app-progress-bar [value]="50" size="sm"></app-progress-bar>
<app-progress-bar [value]="50" size="md"></app-progress-bar>
<app-progress-bar [value]="50" size="lg"></app-progress-bar>
<app-progress-bar [value]="50" size="xl"></app-progress-bar>
```

### Colores

```html
<app-progress-bar [value]="50" color="primary"></app-progress-bar>
<app-progress-bar [value]="60" color="secondary"></app-progress-bar>
<app-progress-bar [value]="70" color="success"></app-progress-bar>
<app-progress-bar [value]="80" color="warning"></app-progress-bar>
<app-progress-bar [value]="90" color="danger"></app-progress-bar>
<app-progress-bar [value]="100" color="info"></app-progress-bar>
```

### Efectos Visuales

```html
<!-- Rayado -->
<app-progress-bar [value]="60" striped="true"> </app-progress-bar>

<!-- Rayado animado -->
<app-progress-bar [value]="40" striped="true" animated="true"> </app-progress-bar>

<!-- Indeterminado -->
<app-progress-bar type="indeterminate" color="primary"> </app-progress-bar>
```

### Con Texto

```html
<!-- Porcentaje -->
<app-progress-bar [value]="75" showText="true" textFormat="percentage"> </app-progress-bar>

<!-- Fracción -->
<app-progress-bar [value]="30" [max]="50" showText="true" textFormat="fraction"> </app-progress-bar>

<!-- Texto personalizado -->
<app-progress-bar [value]="80" showText="true" customText="Casi listo..."> </app-progress-bar>
```

### Progress Bar por Pasos

```html
<app-progress-bar
  variant="stepped"
  [steps]="[
    { label: 'Información personal' },
    { label: 'Verificación' },
    { label: 'Confirmación' },
    { label: 'Completado' }
  ]"
  [currentStep]="2"
  showStepLabels="true"
>
</app-progress-bar>
```

### Personalización

```html
<app-progress-bar [value]="65" customColor="#ff6b6b" customBackground="#ffe0e0" showText="true"> </app-progress-bar>
```

### Comportamiento Avanzado

```html
<!-- Se oculta al completar -->
<app-progress-bar [value]="100" hideOnComplete="true"> </app-progress-bar>

<!-- Pulsa al completar -->
<app-progress-bar [value]="100" pulseOnComplete="true"> </app-progress-bar>
```

## Casos de Uso Comunes

### Carga de Archivos

```html
<div class="upload-progress">
  <h4>Subiendo archivo...</h4>
  <app-progress-bar [value]="uploadProgress" color="primary" showText="true" textFormat="percentage" smooth="true"> </app-progress-bar>
</div>
```

### Formulario Multi-Paso

```html
<app-progress-bar variant="stepped" [steps]="formSteps" [currentStep]="currentFormStep" color="success"> </app-progress-bar>

<form>
  <!-- Contenido del formulario -->
</form>

<div class="form-navigation">
  <button (click)="previousStep()" [disabled]="currentFormStep === 0">Anterior</button>
  <button (click)="nextStep()" [disabled]="currentFormStep === formSteps.length - 1">Siguiente</button>
</div>
```

### Barra de Habilidades

```html
<div class="skills-section">
  <div class="skill-item">
    <span>JavaScript</span>
    <app-progress-bar [value]="85" color="primary" showText="true" size="sm"> </app-progress-bar>
  </div>

  <div class="skill-item">
    <span>TypeScript</span>
    <app-progress-bar [value]="75" color="info" showText="true" size="sm"> </app-progress-bar>
  </div>
</div>
```

### Indicador de Batería

```html
<app-progress-bar variant="linear" [value]="batteryLevel" [color]="getBatteryColor(batteryLevel)" size="sm" showText="true" customText="Batería: {{batteryLevel}}%"> </app-progress-bar>
```

### Progreso de Descarga

```html
<app-progress-bar [value]="downloadProgress" color="success" showText="true" textFormat="custom" [customText]="downloadedMB + ' MB / ' + totalMB + ' MB'" striped="true" animated="true"> </app-progress-bar>
```

### Control Programático

```typescript
export class MyComponent {
  @ViewChild(ProgressBarComponent) progressBar!: ProgressBarComponent;

  startProgress() {
    this.progressBar.reset();

    const interval = setInterval(() => {
      this.progressBar.increment(10);

      if (this.progressBar.value >= 100) {
        clearInterval(interval);
      }
    }, 500);
  }
}
```

## Accesibilidad

- Soporte completo para lectores de pantalla
- Roles ARIA apropiados (`progressbar`)
- Atributos `aria-valuenow`, `aria-valuemin`, `aria-valuemax`
- Texto descriptivo con `aria-valuetext`
- Etiquetas configurables con `aria-label`
- Contraste adecuado en todos los estados

## Personalización

El componente utiliza variables CSS personalizadas:

```css
.progress-bar {
  --progress-color: var(--color-primary-500);
  --progress-background: var(--color-primary-100);
  --progress-percentage: 50%;
}
```

### Estilos Personalizados

```css
/* Progress bar con gradiente */
.gradient-progress .progress-fill {
  background: linear-gradient(90deg, #ff6b6b, #4ecdc4);
}

/* Progress bar con sombra */
.shadow-progress .progress-track {
  box-shadow: inset 0 2px 4px rgba(0, 0, 0, 0.1);
}

/* Progress bar con bordes redondeados */
.rounded-progress .progress-track,
.rounded-progress .progress-fill {
  border-radius: 12px;
}
```

## Animaciones

El componente incluye múltiples animaciones:

- **Smooth transitions**: Cambios suaves de valor
- **Striped animation**: Rayas en movimiento
- **Indeterminate animation**: Carga continua
- **Pulse on complete**: Pulso al completar
- **Step transitions**: Transiciones entre pasos

## Mejores Prácticas

1. **Usar texto descriptivo**: Siempre incluir información sobre qué se está cargando
2. **Elegir variante apropiada**: Linear para procesos simples, stepped para multi-etapa
3. **Colores semánticos**: Success para completado, warning para advertencias
4. **Tamaño contextual**: Ajustar según el espacio disponible
5. **Feedback visual**: Usar animaciones para indicar progreso activo

## Responsive Design

El componente se adapta automáticamente:

- Tamaños reducidos en dispositivos móviles
- Texto ajustado para pantallas pequeñas
- Pasos optimizados para táctil
- Animaciones suaves en todos los dispositivos

## Notas de Implementación

- El componente es standalone y no requiere módulos adicionales
- Utiliza SVG para progreso circular y semi-circular
- Incluye cálculos matemáticos para arcos y círculos
- Optimizado para rendimiento con CSS transforms
- Soporte completo para cambios reactivos
- Compatible con Reactive Forms y template-driven forms

## Compatibilidad

- Angular 17+
- Navegadores modernos (Chrome, Firefox, Safari, Edge)
- Soporte para IE11 con polyfills
- Funciona con SSR (Server-Side Rendering)
- Compatible con diferentes sistemas de iconos
