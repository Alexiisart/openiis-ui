import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { OpeniisAvatarComponent } from 'openiis-ui';
import { TranslateModule } from '@ngx-translate/core';

@Component({
  selector: 'app-avatar-sec',
  standalone: true,
  imports: [CommonModule, OpeniisAvatarComponent, TranslateModule],
  template: `
    <!-- Sección de Avatares -->
    <section class="demo-section">
      <h2>{{ 'avatar.avatares' | translate }}</h2>

      <div class="demo-subsection">
        <h3>{{ 'avatar.tamaños_de_avatares' | translate }}</h3>
        <div class="demo-grid">
          <div class="demo-item">
            <h4>{{ 'avatar.todos_los_tamaños' | translate }}</h4>
            <div class="button-group">
              <openiis-avatar
                size="xs"
                name="{{ 'avatar.ana_garcía' | translate }}"
              ></openiis-avatar>
              <openiis-avatar
                size="sm"
                name="{{ 'avatar.luis_martín' | translate }}"
              ></openiis-avatar>
              <openiis-avatar
                size="md"
                name="{{ 'avatar.maría_lópez' | translate }}"
              ></openiis-avatar>
              <openiis-avatar
                size="lg"
                name="{{ 'avatar.carlos_ruiz' | translate }}"
              ></openiis-avatar>
              <openiis-avatar
                size="xl"
                name="{{ 'avatar.elena_jiménez' | translate }}"
              ></openiis-avatar>
            </div>
          </div>

          <div class="demo-item">
            <h4>{{ 'avatar.con_imágenes' | translate }}</h4>
            <div class="button-group">
              <openiis-avatar
                size="md"
                src="https://images.unsplash.com/photo-1494790108755-2616b612b5bb?w=100"
                alt="{{ 'avatar.usuario_1' | translate }}"
                name="{{ 'avatar.ana_garcía' | translate }}"
              >
              </openiis-avatar>
              <openiis-avatar
                size="md"
                src="https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=100"
                alt="{{ 'avatar.usuario_2' | translate }}"
                name="{{ 'avatar.luis_martín' | translate }}"
              >
              </openiis-avatar>
              <openiis-avatar
                size="md"
                src="https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=100"
                alt="{{ 'avatar.usuario_3' | translate }}"
                name="{{ 'avatar.maría_lópez' | translate }}"
              >
              </openiis-avatar>
            </div>
          </div>

          <div class="demo-item">
            <h4>{{ 'avatar.con_estados' | translate }}</h4>
            <div class="button-group">
              <openiis-avatar
                name="{{ 'avatar.online' | translate }}"
                status="online"
                [showStatus]="true"
              ></openiis-avatar>
              <openiis-avatar
                name="{{ 'avatar.ocupado' | translate }}"
                status="busy"
                [showStatus]="true"
              ></openiis-avatar>
              <openiis-avatar
                name="{{ 'avatar.ausente' | translate }}"
                status="away"
                [showStatus]="true"
              ></openiis-avatar>
              <openiis-avatar
                name="{{ 'avatar.offline' | translate }}"
                status="offline"
                [showStatus]="true"
              ></openiis-avatar>
            </div>
          </div>
        </div>
      </div>
    </section>
  `,
})
export class AvatarSecComponent {}
