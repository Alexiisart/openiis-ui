import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { OpeniisAvatarComponent } from '../components/avatar/avatar.component';

@Component({
  selector: 'app-avatar-sec',
  standalone: true,
  imports: [CommonModule, OpeniisAvatarComponent],
  template: `
    <!-- Sección de Avatares -->
    <section class="demo-section">
      <h2>Avatares</h2>

      <div class="demo-subsection">
        <h3>Tamaños de Avatares</h3>
        <div class="demo-grid">
          <div class="demo-item">
            <h4>Todos los Tamaños</h4>
            <div class="button-group">
              <openiis-avatar size="xs" name="Ana García"></openiis-avatar>
              <openiis-avatar size="sm" name="Luis Martín"></openiis-avatar>
              <openiis-avatar size="md" name="María López"></openiis-avatar>
              <openiis-avatar size="lg" name="Carlos Ruiz"></openiis-avatar>
              <openiis-avatar size="xl" name="Elena Jiménez"></openiis-avatar>
            </div>
          </div>

          <div class="demo-item">
            <h4>Con Imágenes</h4>
            <div class="button-group">
              <openiis-avatar
                size="md"
                src="https://images.unsplash.com/photo-1494790108755-2616b612b5bb?w=100"
                alt="Usuario 1"
                name="Ana García"
              >
              </openiis-avatar>
              <openiis-avatar
                size="md"
                src="https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=100"
                alt="Usuario 2"
                name="Luis Martín"
              >
              </openiis-avatar>
              <openiis-avatar
                size="md"
                src="https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=100"
                alt="Usuario 3"
                name="María López"
              >
              </openiis-avatar>
            </div>
          </div>

          <div class="demo-item">
            <h4>Con Estados</h4>
            <div class="button-group">
              <openiis-avatar
                name="Online"
                status="online"
                [showStatus]="true"
              ></openiis-avatar>
              <openiis-avatar
                name="Ocupado"
                status="busy"
                [showStatus]="true"
              ></openiis-avatar>
              <openiis-avatar
                name="Ausente"
                status="away"
                [showStatus]="true"
              ></openiis-avatar>
              <openiis-avatar
                name="Offline"
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
