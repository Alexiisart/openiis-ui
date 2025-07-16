import { Component } from '@angular/core';
import { TranslateModule } from '@ngx-translate/core';
import { OpeniisBadgeComponent } from '../../components/badge/badge.component';
import { OpeniisButtonComponent } from '../../components/buttons/button.component';
import { OpeniisButtonGroupComponent } from '../../components';

@Component({
  selector: 'app-home-sec',
  standalone: true,
  imports: [
    TranslateModule,
    OpeniisBadgeComponent,
    OpeniisButtonComponent,
    OpeniisButtonGroupComponent,
  ],
  template: `
    <div class="home-container">
      <div class="hero-section">
        <h1>
          {{ 'home.diseño_elegante' | translate }}<br />{{
            'home.código_excepcional' | translate
          }}
        </h1>
        <p class="subtitle">
          Openiis UI -> {{ 'home.el_siguiente_nivel' | translate }}
        </p>

        <div class="info-badge">
          <openiis-badge
            leftIcon="info"
            variant="primary"
            text="Aún en beta. Síguenos en LinkedIn y GitHub mientras preparamos el lanzamiento en npm."
            size="lg"
            [style]="'outline'"
            [shape]="'pill'"
          />
        </div>
      </div>

      <!-- Social buttons -->
      <div class="social-buttons">
        <openiis-button-group [separated]="true" orientation="horizontal">
          <a
            href="https://www.linkedin.com/company/openiisorg/"
            target="_blank"
          >
            <openiis-button
              size="lg"
              type="icon"
              iconAsset="assets/linkedin.svg"
              [colorSvg]="'var(--color-text-primary)'"
            />
          </a>

          <a href="https://github.com/Alexiisart/openiis-ui" target="_blank">
            <openiis-button
              size="lg"
              type="icon"
              iconAsset="assets/github.svg"
              [colorSvg]="'var(--color-text-primary)'"
            />
          </a>
        </openiis-button-group>
      </div>

      <div class="features">
        <div class="feature-grid">
          <div class="feature-card">
            <span class="icon">
              < <span class="material-icons-outlined">arrow_outward</span> />
            </span>
            <h3>{{ 'home.moderno' | translate }}</h3>
            <p>
              {{ 'home.componentes_actualizados_con_las_últimas' | translate }}
            </p>
          </div>

          <div class="feature-card">
            <span class="icon">
              < <span class="material-icons-outlined">colorize</span> />
            </span>
            <h3>{{ 'home.personalizable' | translate }}</h3>
            <p>
              {{ 'home.sistema_de_temas_flexible_que_se_adapta_' | translate }}
            </p>
          </div>

          <div class="feature-card">
            <span class="icon">
              < <span class="material-icons-outlined">bolt</span> />
            </span>
            <h3>{{ 'home.optimizado' | translate }}</h3>
            <p>
              {{ 'home.máximo_rendimiento_con_mínimo_overhead' | translate }}
            </p>
          </div>

          <div class="feature-card">
            <span class="icon">
              < <span class="material-icons-outlined">shield</span> />
            </span>
            <h3>{{ 'home.robusto' | translate }}</h3>
            <p>
              {{ 'home.código_robusto_y_claro_gracias_a_la_pote' | translate }}
            </p>
          </div>
        </div>
      </div>
    </div>
  `,
  styles: `
    .hero-section {
      text-align: left;
    }

    .social-buttons {
      margin-top: var(--space-2);
    }

    .info-badge {
      margin-top: var(--space-4);
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
