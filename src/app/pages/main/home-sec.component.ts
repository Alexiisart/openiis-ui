import { Component } from '@angular/core';

@Component({
  selector: 'app-home-sec',
  standalone: true,
  imports: [],
  template: `
    <div class="home-container">
      <div class="hero-section">
        <h1>Diseño Elegante, <br />Código Excepcional</h1>
        <p class="subtitle">Openiis UI -> El siguiente nivel</p>
      </div>

      <div class="features">
        <div class="feature-grid">
          <div class="feature-card">
            <span class="icon">
              < <span class="material-icons-outlined">arrow_outward</span> />
            </span>
            <h3>Moderno</h3>
            <p>Componentes actualizados con las últimas tendencias de diseño</p>
          </div>

          <div class="feature-card">
            <span class="icon">
              < <span class="material-icons-outlined">colorize</span> />
            </span>
            <h3>Personalizable</h3>
            <p>Sistema de temas flexible que se adapta a tu marca</p>
          </div>

          <div class="feature-card">
            <span class="icon">
              < <span class="material-icons-outlined">bolt</span> />
            </span>
            <h3>Optimizado</h3>
            <p>Máximo rendimiento con mínimo overhead</p>
          </div>

          <div class="feature-card">
            <span class="icon">
              < <span class="material-icons-outlined">shield</span> />
            </span>
            <h3>Robusto</h3>
            <p>Código robusto y claro, gracias a la potencia de TypeScript.</p>
          </div>
        </div>
      </div>
    </div>
  `,
  styles: `
    .hero-section {
      text-align: left;
    }

    h1 {
      color: var(--color-text-primary);
      font-size: 3rem;
      line-height: 1.1;
      font-weight: 800;
      margin-bottom: var(--space-3);
      letter-spacing: -0.02em;
    }

    .subtitle {
      color: var(--color-text-secondary);
      font-size: 1.5rem;
      font-weight: 400;
    }

    .features {
      margin-top: var(--space-8);
    }

    .feature-grid {
      display: grid;
      grid-template-columns: repeat(auto-fit, minmax(500px, 1fr));
      gap: var(--space-6);
    }

    .feature-card {
      background: var(--color-surface);
      padding: var(--space-8);
      border-radius: var(--radius-lg);
      border: 1px solid var(--color-border);
      transition: all 0.3s ease;
    }

    .feature-card:hover {
      transform: translateY(-4px);
      box-shadow: var(--shadow-lg);
    }

    .icon {
      font-size: 2rem;
      display: block;
      color: var(--primary-600);
      margin-bottom: var(--space-4);
    }

    .feature-card h3 {
      color: var(--color-text-primary);
      font-size: 1.25rem;
      font-weight: 600;
      margin-bottom: var(--space-2);
    }

    .feature-card p {
      color: var(--color-text-secondary);
      font-size: 1rem;
      line-height: 1.5;
    }

    .tagline {
      color: var(--color-text-secondary);
      font-size: 1.25rem;
      line-height: 1.6;
      font-weight: 400;
    }

    @media (max-width: 768px) {
      h1 {
        font-size: 3rem;
      }

      .feature-grid {
        grid-template-columns: 1fr;
      }
    }
  `,
})
export class HomeSecComponent {}
