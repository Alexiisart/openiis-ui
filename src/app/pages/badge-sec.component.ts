import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { OpeniisBadgeComponent } from 'openiis-ui';
import { TranslateModule } from '@ngx-translate/core';

@Component({
  selector: 'app-badge-sec',
  standalone: true,
  imports: [CommonModule, OpeniisBadgeComponent, TranslateModule],
  template: `
    <!-- Sección de Badges -->
    <section class="demo-section">
      <h2>{{ 'badge.insignias' | translate }}</h2>

      <div class="demo-subsection">
        <h3>{{ 'badge.tipos_de_insignias' | translate }}</h3>
        <div class="demo-grid">
          <div class="demo-item">
            <h4>{{ 'badge.insignias_básicos' | translate }}</h4>
            <div class="button-group">
              <openiis-badge
                variant="default"
                [text]="'badge.default' | translate"
              ></openiis-badge>
              <openiis-badge
                variant="primary"
                [text]="'badge.primary' | translate"
              ></openiis-badge>
              <openiis-badge
                variant="success"
                [text]="'badge.success' | translate"
              ></openiis-badge>
              <openiis-badge
                variant="warning"
                [text]="'badge.warning' | translate"
              ></openiis-badge>
              <openiis-badge
                variant="danger"
                [text]="'badge.danger' | translate"
              ></openiis-badge>
              <openiis-badge
                variant="info"
                [text]="'badge.info' | translate"
              ></openiis-badge>
            </div>
          </div>

          <div class="demo-item">
            <h4>{{ 'badge.tamaños' | translate }}</h4>
            <div class="button-group">
              <openiis-badge
                size="xs"
                [text]="'badge.xs' | translate"
                variant="primary"
              ></openiis-badge>
              <openiis-badge
                size="sm"
                [text]="'badge.small' | translate"
                variant="primary"
              ></openiis-badge>
              <openiis-badge
                size="md"
                [text]="'badge.medium' | translate"
                variant="primary"
              ></openiis-badge>
              <openiis-badge
                size="lg"
                [text]="'badge.large' | translate"
                variant="primary"
              ></openiis-badge>
            </div>
          </div>

          <div class="demo-item">
            <h4>{{ 'badge.con_iconos' | translate }}</h4>
            <div class="button-group">
              <openiis-badge
                variant="success"
                [text]="'badge.completado' | translate"
                icon="check_circle"
              ></openiis-badge>
              <openiis-badge
                variant="warning"
                [text]="'badge.pendiente' | translate"
                icon="schedule"
              ></openiis-badge>
              <openiis-badge
                variant="danger"
                [text]="'badge.error' | translate"
                icon="cancel"
              ></openiis-badge>
              <openiis-badge
                variant="info"
                [text]="'badge.información' | translate"
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
