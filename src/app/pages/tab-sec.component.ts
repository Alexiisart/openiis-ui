import { Component } from '@angular/core';
import { OpeniisTabsComponent } from '../components/tabs/tabs.component';
import { TranslateModule } from '@ngx-translate/core';

@Component({
  selector: 'app-tab-sec',
  template: `
    <!-- Sección de Tabs -->
    <section id="basic-tabs" class="demo-section">
      <h2>{{ 'tab.pestañas' | translate }}</h2>

      <div class="demo-subsection">
        <h3>{{ 'tab.tipos_de_pestañas' | translate }}</h3>
        <div class="demo-grid">
          <div class="demo-item" style="grid-column: 1 / -1">
            <h4>{{ 'tab.pestañas_básicas_line' | translate }}</h4>
            <openiis-tabs variant="line" size="md">
              <div slot="tab-content-tab1">
                <h3>{{ 'tab.configuración_general' | translate }}</h3>
                <p>
                  {{
                    'tab.aquí_puedes_configurar_las_opciones_gene' | translate
                  }}
                </p>
                <ul>
                  <li>{{ 'tab.idioma_predeterminado' | translate }}</li>
                  <li>{{ 'tab.zona_horaria' | translate }}</li>
                  <li>{{ 'tab.configuración_de_red' | translate }}</li>
                </ul>
              </div>
              <div slot="tab-content-tab2">
                <h3>{{ 'tab.información_del_perfil' | translate }}</h3>
                <p>
                  {{
                    'tab.gestiona_tu_información_personal_y_prefe' | translate
                  }}
                </p>
                <ul>
                  <li>{{ 'tab.datos_personales' | translate }}</li>
                  <li>{{ 'tab.foto_de_perfil' | translate }}</li>
                  <li>{{ 'tab.información_de_contacto' | translate }}</li>
                </ul>
              </div>
              <div slot="tab-content-tab3">
                <h3>{{ 'tab.configuración_de_notificaciones' | translate }}</h3>
                <p>
                  {{
                    'tab.controla_cómo_y_cuándo_recibes_notificac' | translate
                  }}
                </p>
                <ul>
                  <li>{{ 'tab.notificaciones_por_email' | translate }}</li>
                  <li>{{ 'tab.notificaciones_push' | translate }}</li>
                  <li>{{ 'tab.frecuencia_de_notificaciones' | translate }}</li>
                </ul>
              </div>
              <div slot="tab-content-tab4">
                <h3>{{ 'tab.configuración_de_seguridad' | translate }}</h3>
                <p>
                  {{
                    'tab.mantén_tu_cuenta_segura_con_estas_opcion' | translate
                  }}
                </p>
                <ul>
                  <li>{{ 'tab.cambiar_contraseña' | translate }}</li>
                  <li>{{ 'tab.autenticación_de_dos_factores' | translate }}</li>
                  <li>{{ 'tab.historial_de_sesiones' | translate }}</li>
                </ul>
              </div>
            </openiis-tabs>
          </div>

          <div class="demo-item" style="grid-column: 1 / -1">
            <h4>{{ 'tab.pestañas_pills' | translate }}</h4>
            <openiis-tabs
              variant="pills"
              size="md"
              [tabs]="[
                {
                  id: 'dashboard',
                  label: 'tab.panel_de_control' | translate,
                  active: true,
                  icon: 'dashboard'
                },
                {
                  id: 'analytics',
                  label: 'tab.análisis_de_datos' | translate,
                  icon: 'analytics'
                },
                {
                  id: 'reports',
                  label: 'tab.reportes_generados' | translate,
                  icon: 'assessment',
                  badge: '5'
                },
                {
                  id: 'settings2',
                  label: 'tab.configuración_del_sistema' | translate,
                  icon: 'settings'
                }
              ]"
            >
              <div slot="tab-content-dashboard">
                <h3>{{ 'tab.panel_de_control' | translate }}</h3>
                <p>
                  {{
                    'tab.vista_general_de_todas_las_métricas_impo' | translate
                  }}
                </p>
              </div>
              <div slot="tab-content-analytics">
                <h3>{{ 'tab.análisis_de_datos' | translate }}</h3>
                <p>
                  {{
                    'tab.análisis_detallado_del_rendimiento_y_ten' | translate
                  }}
                </p>
              </div>
              <div slot="tab-content-reports">
                <h3>{{ 'tab.reportes_generados' | translate }}</h3>
                <p>
                  {{
                    'tab.lista_de_todos_los_reportes_disponibles_' | translate
                  }}
                </p>
              </div>
              <div slot="tab-content-settings2">
                <h3>{{ 'tab.configuración_del_sistema' | translate }}</h3>
                <p>
                  {{ 'tab.opciones_avanzadas_de_configuración' | translate }}
                </p>
              </div>
            </openiis-tabs>
          </div>

          <div class="demo-item" style="grid-column: 1 / -1">
            <h4>{{ 'tab.pestañas_cards' | translate }}</h4>
            <openiis-tabs
              variant="cards"
              size="md"
              [tabs]="[
                {
                  id: 'overview',
                  label: 'tab.resumen_del_proyecto' | translate,
                  active: true,
                  icon: 'fast_forward'
                },
                {
                  id: 'details',
                  label: 'tab.detalles_técnicos' | translate,
                  icon: 'info'
                },
                {
                  id: 'history',
                  label: 'tab.historial_de_cambios' | translate,
                  icon: 'history'
                }
              ]"
            >
              <div slot="tab-content-overview">
                <h3>{{ 'tab.resumen_del_proyecto' | translate }}</h3>
                <p>
                  {{
                    'tab.información_general_y_estadísticas_del_p' | translate
                  }}
                </p>
              </div>
              <div slot="tab-content-details">
                <h3>{{ 'tab.detalles_técnicos' | translate }}</h3>
                <p>
                  {{
                    'tab.especificaciones_técnicas_y_documentació' | translate
                  }}
                </p>
              </div>
              <div slot="tab-content-history">
                <h3>{{ 'tab.historial_de_cambios' | translate }}</h3>
                <p>
                  {{
                    'tab.log_completo_de_todas_las_modificaciones' | translate
                  }}
                </p>
              </div>
            </openiis-tabs>
          </div>

          <div class="demo-item" style="grid-column: 1 / -1">
            <h4>{{ 'tab.pestañas_buttons' | translate }}</h4>
            <openiis-tabs
              variant="buttons"
              size="md"
              [tabs]="[
                {
                  id: 'edit',
                  label: 'tab.modo_de_edición' | translate,
                  active: true,
                  icon: 'edit'
                },
                {
                  id: 'preview',
                  label: 'tab.vista_previa' | translate,
                  icon: 'preview'
                },
                {
                  id: 'publish',
                  label: 'tab.opciones_de_publicación' | translate,
                  icon: 'publish'
                }
              ]"
            >
              <div slot="tab-content-edit">
                <h3>{{ 'tab.modo_de_edición' | translate }}</h3>
                <p>
                  {{
                    'tab.editor_de_contenido_con_todas_las_herram' | translate
                  }}
                </p>
              </div>
              <div slot="tab-content-preview">
                <h3>{{ 'tab.vista_previa' | translate }}</h3>
                <p>
                  {{
                    'tab.previsualiza_cómo_se_verá_el_contenido_a' | translate
                  }}
                </p>
              </div>
              <div slot="tab-content-publish">
                <h3>{{ 'tab.opciones_de_publicación' | translate }}</h3>
                <p>
                  {{
                    'tab.configura_las_opciones_de_publicación_y_' | translate
                  }}
                </p>
              </div>
            </openiis-tabs>
          </div>
        </div>
      </div>
    </section>
  `,
  standalone: true,
  imports: [OpeniisTabsComponent, TranslateModule],
})
export class TabSecComponent {}
