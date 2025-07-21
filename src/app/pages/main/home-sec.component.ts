import { Component } from '@angular/core';
import { TranslateModule } from '@ngx-translate/core';
import {
  OpeniisButtonGroupComponent,
  OpeniisButtonComponent,
  OpeniisToastComponent,
} from 'openiis-ui';

@Component({
  selector: 'app-home-sec',
  standalone: true,
  imports: [
    TranslateModule,
    OpeniisButtonComponent,
    OpeniisButtonGroupComponent,
    OpeniisToastComponent,
  ],
  template: `
    <openiis-toast
      [data]="data"
      [isVisible]="showToast"
      (closed)="onToastClosed()"
    />
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
          <strong
            ><p class="info-badge-text">
              {{ 'home.instalar' | translate }}:
            </p></strong
          >
          <openiis-button
            type="subtle"
            text="ng add openiis-ui"
            size="md"
            (clickEvent)="copyCommand()"
          ></openiis-button>
          <p id="comando" style="display: none;">ng add openiis-ui</p>
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

      <!-- Sección IMPORTANTE -->
      <div class="important-section">
        <h2>{{ 'home.importante' | translate }}</h2>
        <p>
          {{
            'home.para_aprovechar_al_máximo_los_componentes_de_esta' | translate
          }}
        </p>

        <openiis-button
          type="outline-primary"
          text="{{ 'home.documentación' | translate }}"
          iconLeft="book"
          size="md"
          (clickEvent)="openDocumentation()"
        ></openiis-button>
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
      margin: var(--space-2) 0;
    }

    .info-badge {
      margin-top: var(--space-4);
      display: flex;
      align-items: center;
      gap: var(--space-4);
    }

    .important-section {
      display: flex;
      gap: var(--space-2);
      flex-direction: column;
      padding: var(--space-4);
      background-color: var(--color-background-alt);
      border-radius: var(--radius-md);
      border: 1px solid var(--color-border);
    }

    .important-section h2 {
      color: var(--color-text-primary);
      font-size: 1.75rem;
      font-weight: 700;
      margin-bottom: var(--space-2);
    }

    .important-section p,
    .info-badge-text {
      color: var(--color-text-secondary);
      font-size: 1rem;
      line-height: 1.5;
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
      grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
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
export class HomeSecComponent {
  showToast = false;
  data = {
    message: 'Comando copiado al portapapeles',
    type: 'success' as 'success' | 'warning' | 'danger' | 'info',
    duration: 3000,
  };

  copyCommand() {
    const comando = document.getElementById('comando')?.innerText;
    if (comando) {
      navigator.clipboard.writeText(comando).then(
        () => {
          console.log('Comando copiado al portapapeles');
          this.data = {
            message: 'Comando copiado al portapapeles',
            type: 'success',
            duration: 3000,
          };
          this.showToast = true;
        },
        (err: any) => {
          console.error('Error al copiar el comando: ', err);
          this.data = {
            message: 'Error al copiar el comando',
            type: 'danger',
            duration: 3000,
          };
          this.showToast = true;
        },
      );
    }
  }

  onToastClosed() {
    this.showToast = false;
  }

  openDocumentation() {
    window.open('https://github.com/Alexiisart/openiis-ui/wiki', '_blank');
  }
}
