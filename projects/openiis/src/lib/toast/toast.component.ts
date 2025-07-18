import {
  Component,
  Input,
  Output,
  EventEmitter,
  OnInit,
  OnChanges,
  SimpleChanges,
  OnDestroy,
} from '@angular/core';
import { CommonModule } from '@angular/common';

export interface ToastData {
  message: string;
  type?: 'success' | 'warning' | 'danger' | 'info';
  duration?: number;
}

@Component({
  selector: 'openiis-toast',
  standalone: true,
  imports: [CommonModule],
  template: `
    @if (isVisible) {
    <div class="alert alert-{{ data?.type || 'info' }}">
      {{ data?.message }}
    </div>
    }
  `,
  styles: [
    `
      .alert {
        position: fixed;
        top: 20px;
        right: 20px;
        padding: 15px 20px;
        border-radius: 16px;
        color: white;
        font-weight: 500;
        z-index: 3000;
        max-width: 300px;
        animation: slideInRight 0.3s ease;

        /* Efecto translúcido/glass morphism */
        backdrop-filter: blur(10px);
        -webkit-backdrop-filter: blur(20px);
        border: 1px solid rgba(255, 255, 255, 0.2);
      }

      .alert-success {
        background: rgba(1, 37, 25, 0.7);
        border-color: rgba(34, 197, 94, 1);
        color: white;
      }

      .alert-warning {
        background: rgba(54, 35, 2, 0.7);
        border-color: rgba(251, 191, 36, 1);
        color: white;
      }

      .alert-danger {
        background: rgba(46, 2, 2, 0.7);
        border-color: rgba(248, 113, 113, 1);
        color: white;
      }

      .alert-info {
        background: rgba(1, 16, 41, 0.7);
        border-color: rgba(96, 165, 250, 1);
        color: white;
      }

      /* Mejora para dispositivos que no soportan backdrop-filter */
      @supports not (backdrop-filter: blur(20px)) {
        .alert {
          background: rgba(0, 0, 0, 0.9);
        }

        .alert-success {
          background: rgba(16, 185, 129, 0.95);
        }

        .alert-warning {
          background: rgba(245, 158, 11, 0.95);
        }

        .alert-danger {
          background: rgba(239, 68, 68, 0.95);
        }

        .alert-info {
          background: rgba(59, 130, 246, 0.95);
        }
      }

      /* Mejoras para móviles */
      @media (max-width: 768px) {
        .alert {
          top: 10px;
          right: 10px;
          left: 10px;
          max-width: none;
          margin: 0 auto;
        }
      }

      /* Reducir efectos para usuarios que prefieren menos movimiento */
      @media (prefers-reduced-motion: reduce) {
        .alert {
          animation: slideInReduced 0.2s ease;
          backdrop-filter: blur(10px);
          -webkit-backdrop-filter: blur(10px);
        }

        @keyframes slideInReduced {
          from {
            opacity: 0;
          }
          to {
            opacity: 1;
          }
        }
      }

      @keyframes slideInRight {
        from {
          transform: translateX(100%);
          opacity: 0;
        }
        to {
          transform: translateX(0);
          opacity: 1;
        }
      }

      @keyframes slideOutRight {
        from {
          transform: translateX(0);
          opacity: 1;
        }
        to {
          transform: translateX(100%);
          opacity: 0;
        }
      }
    `,
  ],
})
export class OpeniisToastComponent implements OnInit, OnChanges, OnDestroy {
  /**
   * Indica si el toast está visible
   */
  @Input() isVisible = false;

  /**
   * Datos del toast a mostrar
   */
  @Input() data: ToastData | null = null;

  /**
   * Evento emitido cuando se cierra el toast
   */
  @Output() closed = new EventEmitter<void>();

  /**
   * Referencia al temporizador para poder cancelarlo
   */
  private timeoutId: any;

  /**
   * Inicializa el componente
   */
  ngOnInit() {
    // Inicialización del componente
  }

  /**
   * Detecta cambios en las propiedades de entrada
   */
  ngOnChanges(changes: SimpleChanges) {
    if (changes['isVisible'] && this.isVisible && this.data) {
      this.startTimer();
    } else if (changes['isVisible'] && !this.isVisible) {
      this.clearTimer();
    }
  }

  /**
   * Limpia el temporizador al destruir el componente
   */
  ngOnDestroy() {
    this.clearTimer();
  }

  /**
   * Inicia el temporizador para ocultar el toast
   */
  private startTimer() {
    this.clearTimer(); // Limpia cualquier temporizador previo

    const duration = this.data?.duration || 3000;
    this.timeoutId = setTimeout(() => {
      this.hideToast();
    }, duration);
  }

  /**
   * Limpia el temporizador activo
   */
  private clearTimer() {
    if (this.timeoutId) {
      clearTimeout(this.timeoutId);
      this.timeoutId = null;
    }
  }

  /**
   * Oculta el toast y emite el evento closed
   */
  private hideToast() {
    this.clearTimer();
    this.closed.emit();
  }
}
