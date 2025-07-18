# ScrollService

## Descripción

El `ScrollService` es un servicio Angular reutilizable que proporciona funcionalidades para bloquear y desbloquear el scroll del body de manera segura. Es especialmente útil para componentes como modales, sidebars, y overlays que necesitan prevenir el scroll del contenido de fondo mientras están activos.

## Características

- ✅ **Body Scroll Lock:** Bloquea completamente el scroll del contenido de fondo
- ✅ **Preservación de posición:** Mantiene y restaura la posición exacta del scroll
- ✅ **Detección de estado:** Verifica si el scroll está bloqueado actualmente
- ✅ **Cleanup automático:** Manejo seguro de recursos y estados
- ✅ **SSR compatible:** Funciona correctamente en entornos de Server-Side Rendering
- ✅ **Sin dependencias:** Implementación pura en TypeScript

## Importación

```typescript
import { ScrollService } from "../services/scroll.service";
```

## Uso Básico

### 1. Inyectar el servicio

```typescript
import { Component } from "@angular/core";
import { ScrollService } from "../services/scroll.service";

@Component({
  selector: "mi-modal",
  templateUrl: "./mi-modal.component.html",
})
export class MiModalComponent {
  constructor(private scrollService: ScrollService) {}
}
```

### 2. Bloquear scroll cuando se abre el modal

```typescript
openModal(): void {
  this.isOpen = true;
  this.scrollService.lockBodyScroll();
}
```

### 3. Desbloquear scroll cuando se cierra el modal

```typescript
closeModal(): void {
  this.isOpen = false;
  this.scrollService.unlockBodyScroll();
}
```

### 4. Cleanup en ngOnDestroy

```typescript
ngOnDestroy(): void {
  // Asegurar que el scroll se desbloquee si el componente se destruye
  if (this.scrollService.isScrollLocked()) {
    this.scrollService.unlockBodyScroll();
  }
}
```

## Métodos Disponibles

| Método               | Descripción                                              | Parámetros | Retorno   |
| -------------------- | -------------------------------------------------------- | ---------- | --------- |
| `lockBodyScroll()`   | Bloquea el scroll del body y preserva la posición actual | Ninguno    | `void`    |
| `unlockBodyScroll()` | Desbloquea el scroll del body y restaura la posición     | Ninguno    | `void`    |
| `isScrollLocked()`   | Verifica si el scroll está bloqueado actualmente         | Ninguno    | `boolean` |
| `forceUnlock()`      | Fuerza el desbloqueo del scroll (útil para cleanup)      | Ninguno    | `void`    |

## Casos de Uso

### Modal Básico

```typescript
@Component({
  template: `
    <div class="modal-overlay" *ngIf="isOpen" (click)="closeModal()">
      <div class="modal-content" (click)="$event.stopPropagation()">
        <h2>Mi Modal</h2>
        <p>Contenido del modal</p>
        <button (click)="closeModal()">Cerrar</button>
      </div>
    </div>
  `,
})
export class ModalComponent implements OnDestroy {
  isOpen = false;

  constructor(private scrollService: ScrollService) {}

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

### Sidebar Responsive

```typescript
@Component({
  template: `
    <aside [class.open]="isOpen" [class.mobile]="isMobile">
      <nav>
        <!-- Contenido del menú -->
      </nav>
    </aside>
  `,
})
export class ResponsiveSidebarComponent implements OnDestroy {
  isOpen = false;
  isMobile = false;

  constructor(private scrollService: ScrollService) {
    this.checkScreenSize();
  }

  @HostListener("window:resize")
  onResize(): void {
    const wasMobile = this.isMobile;
    this.checkScreenSize();

    if (wasMobile && !this.isMobile && this.isOpen) {
      this.scrollService.unlockBodyScroll();
      this.isOpen = false;
    }
  }

  toggleSidebar(): void {
    this.isOpen = !this.isOpen;

    if (this.isMobile) {
      if (this.isOpen) {
        this.scrollService.lockBodyScroll();
      } else {
        this.scrollService.unlockBodyScroll();
      }
    }
  }

  private checkScreenSize(): void {
    this.isMobile = window.innerWidth <= 768;
  }

  ngOnDestroy(): void {
    if (this.isMobile && this.isOpen) {
      this.scrollService.unlockBodyScroll();
    }
  }
}
```

## Mejores Prácticas

### ✅ DO - Buenas Prácticas

- **Cleanup en ngOnDestroy:** Siempre desbloquear el scroll cuando el componente se destruye
- **Verificar estado:** Usar `isScrollLocked()` antes de desbloquear para evitar problemas
- **Mobile-first:** Considerar comportamiento diferente en dispositivos móviles
- **Manejo de errores:** Usar `forceUnlock()` en casos de emergencia

### ❌ DON'T - Evitar

- **No verificar estado:** No asumir que el scroll está bloqueado sin verificar
- **Múltiples bloqueos:** No llamar `lockBodyScroll()` múltiples veces sin desbloquear
- **Olvidar cleanup:** No olvidar desbloquear en ngOnDestroy
- **Uso innecesario:** No usar para elementos que no requieren bloqueo de scroll

## Consideraciones Técnicas

- **Compatibilidad:** Funciona en todos los navegadores modernos
- **Performance:** Impacto mínimo en el rendimiento
- **SSR:** Compatible con Server-Side Rendering
- **Accesibilidad:** No interfiere con tecnologías asistivas

## Implementación Interna

El servicio funciona mediante:

1. **Preservación de posición:** Guarda la posición actual del scroll
2. **Estilos CSS:** Aplica `position: fixed` y `overflow: hidden`
3. **Restauración:** Retorna a la posición original al desbloquear
4. **Estado interno:** Mantiene un flag para evitar múltiples operaciones

## Dependencias

- `@angular/core` - Para la funcionalidad de servicio
- Ninguna dependencia externa
