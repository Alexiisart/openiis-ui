import { Component } from '@angular/core';
import { OpeniisTabsComponent } from '../components/tabs/tabs.component';

@Component({
  selector: 'app-tab-sec',
  template: `
    <!-- Sección de Tabs -->
    <section class="demo-section">
      <h2>Tabs - Navegación por Pestañas</h2>

      <div class="demo-subsection">
        <h3>Pestañas de Navegación</h3>
        <div class="demo-grid">
          <div class="demo-item" style="grid-column: 1 / -1">
            <h4>Tabs Básicos (Line)</h4>
            <openiis-tabs variant="line" size="md">
              <div slot="tab-content-tab1">
                <h3>Configuración General</h3>
                <p>
                  Aquí puedes configurar las opciones generales del sistema.
                </p>
                <ul>
                  <li>Idioma predeterminado</li>
                  <li>Zona horaria</li>
                  <li>Configuración de red</li>
                </ul>
              </div>
              <div slot="tab-content-tab2">
                <h3>Información del Perfil</h3>
                <p>Gestiona tu información personal y preferencias.</p>
                <ul>
                  <li>Datos personales</li>
                  <li>Foto de perfil</li>
                  <li>Información de contacto</li>
                </ul>
              </div>
              <div slot="tab-content-tab3">
                <h3>Configuración de Notificaciones</h3>
                <p>Controla cómo y cuándo recibes notificaciones.</p>
                <ul>
                  <li>Notificaciones por email</li>
                  <li>Notificaciones push</li>
                  <li>Frecuencia de notificaciones</li>
                </ul>
              </div>
              <div slot="tab-content-tab4">
                <h3>Configuración de Seguridad</h3>
                <p>Mantén tu cuenta segura con estas opciones.</p>
                <ul>
                  <li>Cambiar contraseña</li>
                  <li>Autenticación de dos factores</li>
                  <li>Historial de sesiones</li>
                </ul>
              </div>
            </openiis-tabs>
          </div>

          <div class="demo-item" style="grid-column: 1 / -1">
            <h4>Tabs Pills</h4>
            <openiis-tabs
              variant="pills"
              size="md"
              [tabs]="[
                {
                  id: 'dashboard',
                  label: 'Dashboard',
                  active: true,
                  icon: 'dashboard'
                },
                { id: 'analytics', label: 'Analytics', icon: 'analytics' },
                {
                  id: 'reports',
                  label: 'Reportes',
                  icon: 'assessment',
                  badge: '5'
                },
                { id: 'settings2', label: 'Configuración', icon: 'settings' }
              ]"
            >
              <div slot="tab-content-dashboard">
                <h3>Panel de Control</h3>
                <p>Vista general de todas las métricas importantes.</p>
              </div>
              <div slot="tab-content-analytics">
                <h3>Análisis de Datos</h3>
                <p>Análisis detallado del rendimiento y tendencias.</p>
              </div>
              <div slot="tab-content-reports">
                <h3>Reportes Generados</h3>
                <p>Lista de todos los reportes disponibles y generados.</p>
              </div>
              <div slot="tab-content-settings2">
                <h3>Configuración del Sistema</h3>
                <p>Opciones avanzadas de configuración.</p>
              </div>
            </openiis-tabs>
          </div>

          <div class="demo-item" style="grid-column: 1 / -1">
            <h4>Tabs Cards</h4>
            <openiis-tabs
              variant="cards"
              size="md"
              [tabs]="[
                {
                  id: 'overview',
                  label: 'Resumen',
                  active: true,
                  icon: 'fast_forward'
                },
                { id: 'details', label: 'Detalles', icon: 'info' },
                { id: 'history', label: 'Historial', icon: 'history' }
              ]"
            >
              <div slot="tab-content-overview">
                <h3>Resumen del Proyecto</h3>
                <p>Información general y estadísticas del proyecto actual.</p>
              </div>
              <div slot="tab-content-details">
                <h3>Detalles Técnicos</h3>
                <p>Especificaciones técnicas y documentación detallada.</p>
              </div>
              <div slot="tab-content-history">
                <h3>Historial de Cambios</h3>
                <p>Log completo de todas las modificaciones realizadas.</p>
              </div>
            </openiis-tabs>
          </div>

          <div class="demo-item" style="grid-column: 1 / -1">
            <h4>Tabs Buttons</h4>
            <openiis-tabs
              variant="buttons"
              size="md"
              [tabs]="[
                { id: 'edit', label: 'Editar', active: true, icon: 'edit' },
                { id: 'preview', label: 'Vista Previa', icon: 'preview' },
                { id: 'publish', label: 'Publicar', icon: 'publish' }
              ]"
            >
              <div slot="tab-content-edit">
                <h3>Modo de Edición</h3>
                <p>
                  Editor de contenido con todas las herramientas de formateo.
                </p>
              </div>
              <div slot="tab-content-preview">
                <h3>Vista Previa</h3>
                <p>Previsualiza cómo se verá el contenido antes de publicar.</p>
              </div>
              <div slot="tab-content-publish">
                <h3>Opciones de Publicación</h3>
                <p>Configura las opciones de publicación y visibilidad.</p>
              </div>
            </openiis-tabs>
          </div>
        </div>
      </div>
    </section>
  `,
  standalone: true,
  imports: [OpeniisTabsComponent],
})
export class TabSecComponent {}
