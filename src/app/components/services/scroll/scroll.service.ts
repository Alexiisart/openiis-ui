import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class ScrollService {
  private scrollPosition = 0;
  private originalBodyOverflow = '';
  private isLocked = false;

  constructor() {}

  /**
   * Bloquea el scroll del body y preserva la posición actual
   */
  lockBodyScroll(): void {
    if (typeof document === 'undefined' || this.isLocked) return;

    // Guardar la posición actual del scroll
    this.scrollPosition =
      window.pageYOffset || document.documentElement.scrollTop;
    this.originalBodyOverflow = document.body.style.overflow;

    // Aplicar estilos para bloquear el scroll
    document.body.style.position = 'fixed';
    document.body.style.top = `-${this.scrollPosition}px`;
    document.body.style.width = '100%';
    document.body.style.overflow = 'hidden';

    // Prevenir scroll en el html también
    document.documentElement.style.overflow = 'hidden';

    this.isLocked = true;
  }

  /**
   * Desbloquea el scroll del body y restaura la posición
   */
  unlockBodyScroll(): void {
    if (typeof document === 'undefined' || !this.isLocked) return;

    // Restaurar estilos del body
    document.body.style.position = '';
    document.body.style.top = '';
    document.body.style.width = '';
    document.body.style.overflow = this.originalBodyOverflow;

    // Restaurar scroll del html
    document.documentElement.style.overflow = '';

    // Restaurar la posición del scroll
    window.scrollTo(0, this.scrollPosition);

    this.isLocked = false;
  }

  /**
   * Verifica si el scroll está bloqueado
   */
  isScrollLocked(): boolean {
    return this.isLocked;
  }

  /**
   * Fuerza el desbloqueo del scroll (útil para cleanup)
   */
  forceUnlock(): void {
    this.isLocked = false;
    this.unlockBodyScroll();
  }
}
