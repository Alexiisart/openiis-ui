import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { OpeniisBadgeComponent } from '../components/badge/badge.component';

@Component({
  selector: 'app-badge-sec',
  standalone: true,
  imports: [CommonModule, OpeniisBadgeComponent],
  template: `
    <!-- Sección de Badges -->
    <section class="demo-section">
      <h2>Badges</h2>

      <div class="demo-subsection">
        <h3>Tipos de Badges</h3>
        <div class="demo-grid">
          <div class="demo-item">
            <h4>Badges Básicos</h4>
            <div class="button-group">
              <openiis-badge variant="default" text="Default"></openiis-badge>
              <openiis-badge variant="primary" text="Primary"></openiis-badge>
              <openiis-badge variant="success" text="Success"></openiis-badge>
              <openiis-badge variant="warning" text="Warning"></openiis-badge>
              <openiis-badge variant="danger" text="Danger"></openiis-badge>
              <openiis-badge variant="info" text="Info"></openiis-badge>
            </div>
          </div>

          <div class="demo-item">
            <h4>Tamaños</h4>
            <div class="button-group">
              <openiis-badge
                size="xs"
                text="XS"
                variant="primary"
              ></openiis-badge>
              <openiis-badge
                size="sm"
                text="Small"
                variant="primary"
              ></openiis-badge>
              <openiis-badge
                size="md"
                text="Medium"
                variant="primary"
              ></openiis-badge>
              <openiis-badge
                size="lg"
                text="Large"
                variant="primary"
              ></openiis-badge>
            </div>
          </div>

          <div class="demo-item">
            <h4>Con Iconos</h4>
            <div class="button-group">
              <openiis-badge
                variant="success"
                text="Completado"
                icon="check_circle"
              ></openiis-badge>
              <openiis-badge
                variant="warning"
                text="Pendiente"
                icon="schedule"
              ></openiis-badge>
              <openiis-badge
                variant="danger"
                text="Error"
                icon="cancel"
              ></openiis-badge>
              <openiis-badge
                variant="info"
                text="Información"
                icon="info"
              ></openiis-badge>
            </div>
          </div>
        </div>
      </div>
    </section>
  `,
})
export class BadgeSecComponent {}
