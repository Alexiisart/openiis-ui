# OpenIIS UI - ng-add Schematic

Este schematic permite agregar **OpenIIS UI** a tu proyecto Angular de manera automática, incluyendo la configuración de temas.

## Instalación

```bash
ng add openiis-ui
```

## Temas Disponibles

### 1. Classic (Por defecto)

Tema clásico y elegante con colores equilibrados.

### 2. Neutral

Tema minimalista con colores neutros y sobrios.

### 3. Vivid

Tema vibrante y colorido para interfaces más llamativas.

### 4. Custom ✨ (Nuevo)

Tema completamente personalizable donde puedes definir tus propios colores.

## Tema Custom

Cuando seleccionas el tema **Custom**, el schematic te permitirá personalizar:

- **Color Principal**: El color base de tu interfaz (ej: `#14b8a6`)
- **Color de Fondo**: Color de fondo principal (ej: `#ffffff`)
- **Color de Texto**: Color del texto principal (ej: `#171717`)

### ¿Qué hace el tema custom?

1. **Genera automáticamente** una paleta completa de colores basada en tu color principal
2. **Crea un archivo CSS** personalizado en `src/styles/openiis-custom-theme.css`
3. **Configura angular.json** para usar tu tema personalizado
4. **Incluye soporte** para modo oscuro automáticamente

### Ejemplo de uso interactivo

```bash
ng add openiis-ui
```

El schematic te preguntará:

```
? Selecciona un tema para OpenIIS UI: Custom - Personaliza tus propios colores
```

**Nota**: El tema custom se configura automáticamente con valores por defecto. Para personalizar los colores, edita el archivo `src/styles/openiis-custom-theme.css` después de la instalación.

### Resultado

Se creará automáticamente un archivo `src/styles/openiis-custom-theme.css` con tu paleta personalizada:

```css
[data-openiis-theme="custom"] {
  --primary-50: #eef2ff;
  --primary-100: #e0e7ff;
  --primary-200: #c7d2fe;
  --primary-300: #a5b4fc;
  --primary-400: #818cf8;
  --primary-500: #6366f1; /* Tu color principal */
  --primary-600: #4f46e5;
  --primary-700: #4338ca;
  --primary-800: #3730a3;
  --primary-900: #312e81;

  --color-background: #ffffff;
  --color-text-primary: #1f2937;
  /* ... más variables */
}
```

## Configuración Manual

Si prefieres configurar manualmente, puedes usar las opciones directamente:

```bash
ng add openiis-ui --theme=custom --primaryColor=#6366f1 --backgroundColor=#ffffff --textColor=#1f2937
```

## Personalizar Tema Custom Después de la Instalación

Si seleccionaste el tema "Custom", puedes personalizar los colores editando el archivo generado:

1. **Abre el archivo**: `src/styles/openiis-custom-theme.css`
2. **Modifica las variables CSS**:
   ```css
   [data-openiis-theme="custom"] {
     --primary-500: #tu-color-principal;
     --color-background: #tu-color-fondo;
     --color-text-primary: #tu-color-texto;
   }
   ```
3. **Recompila**: `ng build` o `ng serve`

## Cambiar Tema Después de la Instalación

Para cambiar de tema, simplemente ejecuta nuevamente:

```bash
ng add openiis-ui
```

El schematic detectará automáticamente temas anteriores y los reemplazará.

## Aplicar el Tema en tu Aplicación

Para usar cualquier tema en tu aplicación Angular:

```typescript
// En tu componente principal o donde configures el tema
export class AppComponent {
  constructor() {
    // Para temas predefinidos
    document.documentElement.setAttribute("data-openiis-theme", "classic");

    // Para tema custom
    document.documentElement.setAttribute("data-openiis-theme", "custom");
  }
}
```

## Soporte

- ✅ Temas predefinidos (classic, neutral, vivid)
- ✅ Tema personalizable (custom)
- ✅ Generación automática de paletas de colores
- ✅ Soporte para modo oscuro
- ✅ Configuración automática de angular.json
- ✅ Detección y reemplazo de temas anteriores
