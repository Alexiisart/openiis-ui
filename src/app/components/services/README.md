# Servicios de OpenIIS UI

## ScrollService

### Descripción

El `ScrollService` es un servicio Angular reutilizable que proporciona funcionalidades para bloquear y desbloquear el scroll del body de manera segura. Es especialmente útil para componentes como modales, sidebars, y overlays que necesitan prevenir el scroll del contenido de fondo mientras están activos.

### Características

- ✅ **Body Scroll Lock:** Bloquea completamente el scroll del contenido de fondo
- ✅ **Preservación de posición:** Mantiene y restaura la posición exacta del scroll
- ✅ **Detección de estado:** Verifica si el scroll está bloqueado actualmente
- ✅ **Cleanup automático:** Manejo seguro de recursos y estados
- ✅ **SSR compatible:** Funciona correctamente en entornos de Server-Side Rendering
- ✅ **Sin dependencias:** Implementación pura en TypeScript

### Uso Básico

#### 1. Inyectar el servicio

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

#### 2. Bloquear scroll cuando se abre el modal

```typescript
openModal(): void {
  this.isOpen = true;
  this.scrollService.lockBodyScroll();
}
```

#### 3. Desbloquear scroll cuando se cierra el modal

```typescript
closeModal(): void {
  this.isOpen = false;
  this.scrollService.unlockBodyScroll();
}
```

#### 4. Cleanup en ngOnDestroy

```typescript
ngOnDestroy(): void {
  // Asegurar que el scroll se desbloquee si el componente se destruye
  if (this.scrollService.isScrollLocked()) {
    this.scrollService.unlockBodyScroll();
  }
}
```

### Métodos Disponibles

| Método               | Descripción                                              | Parámetros | Retorno   |
| -------------------- | -------------------------------------------------------- | ---------- | --------- |
| `lockBodyScroll()`   | Bloquea el scroll del body y preserva la posición actual | Ninguno    | `void`    |
| `unlockBodyScroll()` | Desbloquea el scroll del body y restaura la posición     | Ninguno    | `void`    |
| `isScrollLocked()`   | Verifica si el scroll está bloqueado actualmente         | Ninguno    | `boolean` |
| `forceUnlock()`      | Fuerza el desbloqueo del scroll (útil para cleanup)      | Ninguno    | `void`    |

### Ejemplo Completo: Modal Component

```typescript
import { Component, OnDestroy } from "@angular/core";
import { ScrollService } from "../services/scroll.service";

@Component({
  selector: "mi-modal",
  template: `
    <div class="modal-overlay" *ngIf="isOpen" (click)="closeModal()">
      <div class="modal-content" (click)="$event.stopPropagation()">
        <h2>Mi Modal</h2>
        <p>Contenido del modal...</p>
        <button (click)="closeModal()">Cerrar</button>
      </div>
    </div>
  `,
  styleUrls: ["./mi-modal.component.css"],
})
export class MiModalComponent implements OnDestroy {
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
    // Cleanup: Asegurar que el scroll se desbloquee
    if (this.scrollService.isScrollLocked()) {
      this.scrollService.unlockBodyScroll();
    }
  }
}
```

### Ejemplo Completo: Sidebar Responsive

```typescript
import { Component, HostListener, OnDestroy } from "@angular/core";
import { ScrollService } from "../services/scroll.service";

@Component({
  selector: "mi-sidebar",
  template: `
    <!-- Botón toggle para móviles -->
    <button (click)="toggleSidebar()" class="mobile-toggle">☰</button>

    <!-- Overlay para móviles -->
    <div class="overlay" *ngIf="isMobile && isOpen" (click)="closeSidebar()"></div>

    <!-- Sidebar -->
    <aside [class.open]="isOpen" [class.mobile]="isMobile">
      <nav>
        <!-- Contenido del menú -->
      </nav>
    </aside>
  `,
})
export class MiSidebarComponent implements OnDestroy {
  isOpen = false;
  isMobile = false;

  constructor(private scrollService: ScrollService) {
    this.checkScreenSize();
  }

  @HostListener("window:resize")
  onResize(): void {
    const wasMobile = this.isMobile;
    this.checkScreenSize();

    // Si cambiamos de móvil a desktop, cerrar sidebar y desbloquear scroll
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

  closeSidebar(): void {
    this.isOpen = false;
    if (this.isMobile) {
      this.scrollService.unlockBodyScroll();
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

### Mejores Prácticas

#### ✅ DO - Buenas Prácticas

- **Usar en ngOnDestroy:** Siempre desbloquear el scroll en el cleanup del componente
- **Verificar estado:** Usar `isScrollLocked()` antes de desbloquear si no estás seguro del estado
- **Responsive handling:** Desbloquear automáticamente cuando cambie el tamaño de pantalla
- **Event listeners:** Manejar tecla Escape y otros eventos para cerrar overlays

#### ❌ DON'T - Evitar

- **Múltiples locks:** No llamar `lockBodyScroll()` múltiples veces sin desbloquear
- **Olvidar cleanup:** No omitir el desbloqueo en ngOnDestroy
- **Lock innecesario:** No usar en desktop si no es necesario
- **Ignorar errores:** No asumir que el DOM está disponible (SSR)

### Consideraciones Técnicas

#### Compatibilidad

- ✅ **iOS Safari:** Previene bounce scroll
- ✅ **Android Chrome:** Funciona con touch events
- ✅ **Desktop:** Compatible con todos los navegadores modernos
- ✅ **SSR:** Safe checks para entornos sin DOM

#### Rendimiento

- **Mínimo impacto:** Solo manipula estilos CSS cuando es necesario
- **Sin polling:** No hay listeners constantes o timeouts
- **Eficiente:** Reutiliza la misma instancia del servicio

### Troubleshooting

#### El scroll no se bloquea completamente

- Verificar que no hay `overflow: auto` en contenedores padre
- Revisar que no hay `position: fixed` conflictivo en CSS

#### La posición no se restaura correctamente

- Asegurar que `unlockBodyScroll()` se llama correctamente
- Verificar que no hay navegación entre llamadas

#### Problemas en móvil

- Revisar `touch-action` y `overscroll-behavior` en CSS
- Confirmar que el viewport meta tag está configurado correctamente
