# Servicios de OpenIIS UI

Esta sección documenta todos los servicios disponibles en el sistema de componentes OpenIIS UI, diseñados para proporcionar funcionalidades transversales y reutilizables.

## Servicios Disponibles

Cada servicio tiene su propia documentación detallada:

- **[ScrollService](./scroll/README.md)** - Gestión del bloqueo de scroll del body para modales y overlays
- **[ModeService](./mode/README.md)** - Gestión del modo claro/oscuro con persistencia automática
- **[ThemeService](./theme/README.md)** - Gestión de temas personalizados con paletas de colores
- **[UploadService](./upload/README.md)** - Manejo de carga de archivos con validación y compresión
- **[SvgIconService](./svg-icon/README.md)** - Carga y procesamiento dinámico de iconos SVG con transformaciones

## Resumen de Funcionalidades

### ScrollService

Proporciona control completo del scroll del body, ideal para:

- Modales y diálogos
- Sidebars y menús overlay
- Cualquier componente que requiera bloqueo de scroll

**Características principales:**

- Preservación de posición de scroll
- Compatible con SSR
- Detección de estado
- Cleanup automático

### ModeService

Gestión reactiva del modo claro/oscuro con:

- Detección automática de preferencias del sistema
- Persistencia en localStorage
- Observable para cambios en tiempo real
- Toggle sencillo entre modos

**Características principales:**

- Integración CSS automática
- Persistencia de preferencias
- Detección de sistema
- API reactiva

### ThemeService

Sistema completo de temas con soporte para:

- 4 temas predefinidos (classic, neutral, vivid, custom)
- Configuración de colores personalizada
- Generación automática de paletas
- Persistencia de configuraciones

**Características principales:**

- Temas predefinidos profesionales
- Editor de temas custom
- Generación automática de variaciones
- Variables CSS dinámicas

### UploadService

Gestión local de archivos con funcionalidades avanzadas:

- Validación completa de archivos
- Compresión automática de imágenes
- Generación de previews
- Cola de archivos reactiva

**Características principales:**

- Múltiples tipos de archivo
- Compresión y redimensionado
- Drag & Drop integration
- Validación robusta

### SvgIconService

Carga y procesa iconos SVG con transformaciones dinámicas avanzadas:

- Carga HTTP con caché automático
- Procesamiento de colores (fill, stroke, currentColor)
- Transformaciones: tamaño, fondo, opacidad, rotación, volteo
- Directivas para uso sencillo o control detallado

**Características principales:**

- API ultra-simple con directiva easyIcon
- Transformaciones dinámicas en tiempo real
- Sistema de caché inteligente
- Manejo robusto de errores con SVG de respaldo

## Integración entre Servicios

Los servicios están diseñados para trabajar en conjunto:

### Ejemplo: Modal con Tema Dinámico

```typescript
@Component({
  template: `
    <div class="modal-overlay" *ngIf="isOpen" (click)="closeModal()">
      <div class="modal-content" (click)="$event.stopPropagation()">
        <h2>Configuración</h2>
        <app-theme-selector></app-theme-selector>
        <app-mode-toggle></app-mode-toggle>
      </div>
    </div>
  `,
})
export class ConfigModalComponent implements OnDestroy {
  isOpen = false;

  constructor(private scrollService: ScrollService, private themeService: OpeniisThemeService, private modeService: OpeniisModeService) {}

  openModal(): void {
    this.isOpen = true;
    this.scrollService.lockBodyScroll();
  }

  closeModal(): void {
    this.isOpen = false;
    this.scrollService.unlockBodyScroll();
  }

  ngOnDestroy(): void {
    if (this.scrollService.isScrollLocked()) {
      this.scrollService.unlockBodyScroll();
    }
  }
}
```

### Ejemplo: Uploader con Temas

```typescript
@Component({
  template: `
    <div class="themed-uploader" [attr.data-theme]="currentTheme">
      <app-file-uploader [config]="uploadConfig"></app-file-uploader>
    </div>
  `,
})
export class ThemedUploaderComponent {
  currentTheme: OpeniisTheme = "classic";
  uploadConfig: UploadConfig = {
    maxFileSize: 10,
    allowedTypes: ["image/*"],
    maxFiles: 5,
  };

  constructor(private themeService: OpeniisThemeService, private uploadService: OpeniisUploadService) {
    this.themeService.currentTheme$.subscribe((theme) => {
      this.currentTheme = theme;
    });
  }
}
```

## Arquitectura General

### Patrón de Diseño

Todos los servicios siguen el mismo patrón:

- **Injectable Singleton:** Una instancia por aplicación
- **Observable Pattern:** Cambios reactivos con RxJS
- **Persistencia:** LocalStorage para configuraciones del usuario
- **TypeScript:** Tipado completo para mejor DX

### Gestión de Estado

- **BehaviorSubject:** Para estados que requieren valor inicial
- **LocalStorage:** Para persistencia entre sesiones
- **Memory Management:** Cleanup automático en ngOnDestroy

### Integración CSS

- **CSS Custom Properties:** Para cambios dinámicos de tema
- **Data Attributes:** Para aplicar modos y temas
- **Transiciones:** Para cambios suaves y naturales

## Mejores Prácticas Generales

### ✅ DO - Recomendaciones

1. **Inyección de dependencias:** Usar constructor injection
2. **Cleanup automático:** Implementar ngOnDestroy correctamente
3. **Error handling:** Manejar errores apropiadamente
4. **Tipado fuerte:** Usar interfaces TypeScript
5. **Observable patterns:** Suscribirse y desuscribirse correctamente

### ❌ DON'T - Evitar

1. **Memory leaks:** No olvidar desuscribirse de observables
2. **Múltiples instancias:** No crear servicios fuera del DI
3. **Estados inconsistentes:** No asumir estados sin verificar
4. **Uso incorrecto:** No usar servicios para propósitos diferentes

## Dependencias Comunes

Todos los servicios utilizan:

- **@angular/core** - Para funcionalidad básica de Angular
- **rxjs** - Para programación reactiva y observables
- **Browser APIs** - localStorage, CSS Custom Properties, File API

## Compatibilidad

- **Angular 15+** - Versión mínima requerida
- **TypeScript 4.7+** - Para mejor tipado
- **Navegadores modernos** - Chrome 80+, Firefox 75+, Safari 13+
- **SSR compatible** - Funciona con Angular Universal

## Contribución

Para contribuir a los servicios:

1. Seguir los patrones establecidos
2. Mantener compatibilidad con versiones existentes
3. Incluir tests unitarios
4. Actualizar documentación correspondiente

## Soporte

Para problemas o preguntas:

- Revisar la documentación individual de cada servicio
- Verificar ejemplos de integración
- Consultar mejores prácticas
