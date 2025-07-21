import { Rule, SchematicContext, Tree } from '@angular-devkit/schematics';

// Generar el archivo index.js: npx tsc -p projects/openiis/schematics/tsconfig.json

// Interfaz para las opciones del schema
interface NgAddSchema {
  theme?: string;
  primaryColor?: string;
  backgroundColor?: string;
  textColor?: string;
  includeTestPage?: boolean;
}

// Función para prompts condicionales usando el sistema nativo
async function getCustomThemeOptions(context: SchematicContext): Promise<{
  primaryColor: string;
  backgroundColor: string;
  textColor: string;
}> {
  // Usar valores por defecto y mostrar instrucciones
  context.logger.info('🎨 Configurando tema personalizado...');
  context.logger.info(
    '📝 Usando valores por defecto. Puedes personalizar después editando:',
  );
  context.logger.info('   src/styles/openiis-custom-theme.css');
  context.logger.info('');
  context.logger.info('💡 Valores por defecto:');
  context.logger.info('   Color principal: #14b8a6');
  context.logger.info('   Color de fondo: #ffffff');
  context.logger.info('   Color de texto: #171717');
  context.logger.info('');

  return {
    primaryColor: '#14b8a6',
    backgroundColor: '#ffffff',
    textColor: '#171717',
  };
}

// Función para convertir hex a RGB
function hexToRgb(hex: string): { r: number; g: number; b: number } {
  const result = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(hex);
  return result
    ? {
        r: parseInt(result[1], 16),
        g: parseInt(result[2], 16),
        b: parseInt(result[3], 16),
      }
    : { r: 0, g: 0, b: 0 };
}

// Función para generar variaciones de color
function generateColorVariations(baseColor: string): Record<string, string> {
  const { r, g, b } = hexToRgb(baseColor);
  const variations: Record<string, string> = {};

  const scales = [
    { name: '50', lightness: 0.95 },
    { name: '100', lightness: 0.9 },
    { name: '200', lightness: 0.8 },
    { name: '300', lightness: 0.7 },
    { name: '400', lightness: 0.6 },
    { name: '500', lightness: 1.0 },
    { name: '600', lightness: 0.8 },
    { name: '700', lightness: 0.7 },
    { name: '800', lightness: 0.6 },
    { name: '900', lightness: 0.5 },
  ];

  scales.forEach((scale) => {
    if (scale.name === '500') {
      variations[scale.name] = baseColor;
    } else {
      const factor = scale.lightness;
      const newR = Math.round(
        scale.lightness > 1
          ? Math.min(255, r + (255 - r) * (factor - 1))
          : r * factor,
      );
      const newG = Math.round(
        scale.lightness > 1
          ? Math.min(255, g + (255 - g) * (factor - 1))
          : g * factor,
      );
      const newB = Math.round(
        scale.lightness > 1
          ? Math.min(255, b + (255 - b) * (factor - 1))
          : b * factor,
      );
      variations[scale.name] =
        `#${newR.toString(16).padStart(2, '0')}${newG.toString(16).padStart(2, '0')}${newB.toString(16).padStart(2, '0')}`;
    }
  });

  return variations;
}

// Función para crear CSS personalizado
function createCustomThemeCSS(options: NgAddSchema): string {
  const primaryVariations = generateColorVariations(
    options.primaryColor || '#14b8a6',
  );

  return `/* ===== TEMA CUSTOM GENERADO ===== */
[data-openiis-theme="custom"] {
  /* Paleta de colores principales */
  --primary-50: ${primaryVariations['50']};
  --primary-100: ${primaryVariations['100']};
  --primary-200: ${primaryVariations['200']};
  --primary-300: ${primaryVariations['300']};
  --primary-400: ${primaryVariations['400']};
  --primary-500: ${primaryVariations['500']};
  --primary-600: ${primaryVariations['600']};
  --primary-700: ${primaryVariations['700']};
  --primary-800: ${primaryVariations['800']};
  --primary-900: ${primaryVariations['900']};

  /* Neutros adaptativos */
  --neutral-50: #fafafa;
  --neutral-100: #f5f5f5;
  --neutral-200: #e5e5e5;
  --neutral-300: #d4d4d4;
  --neutral-400: #a3a3a3;
  --neutral-500: #737373;
  --neutral-600: #525252;
  --neutral-700: #404040;
  --neutral-800: #262626;
  --neutral-900: #171717;

  /* Sistema de colores personalizados */
  --color-background: ${options.backgroundColor || '#ffffff'};
  --color-surface: #fafafa;
  --color-surface-elevated: ${options.backgroundColor || '#ffffff'};
  --color-border: #e5e5e5;
  --color-border-focus: var(--primary-600);
  --color-text-primary: ${options.textColor || '#171717'};
  --color-text-secondary: #525252;
  --color-text-muted: #a3a3a3;
  --color-text-inverse: #ffffff;

  /* Estados semánticos */
  --color-success: #10b981;
  --color-warning: #f59e0b;
  --color-error: #ef4444;
  --color-info: #3b82f6;
}

[data-openiis-theme="custom"][data-theme="dark"] {
  --color-background: #1a1a1a;
  --color-surface: #262626;
  --color-surface-elevated: #404040;
  --color-border: #525252;
  --color-border-focus: var(--primary-400);
  --color-text-primary: #ffffff;
  --color-text-secondary: #d4d4d4;
  --color-text-muted: #a3a3a3;
}
`;
}

// Configurar tema en app.component.ts
function setupThemeInAppComponent(
  tree: Tree,
  context: SchematicContext,
  theme: string,
): void {
  const appComponentPath = 'src/app/app.component.ts';

  if (!tree.exists(appComponentPath)) {
    context.logger.warn('No se pudo encontrar app.component.ts');
    return;
  }

  const content = tree.read(appComponentPath)?.toString('utf-8') || '';
  let updatedContent = content;

  if (!content.includes('OnInit')) {
    updatedContent = updatedContent.replace(
      /import\s*{\s*Component\s*}\s*from\s*'@angular\/core';/,
      "import { Component, OnInit } from '@angular/core';",
    );
  }

  if (!content.includes('implements OnInit')) {
    updatedContent = updatedContent.replace(
      /export\s+class\s+AppComponent\s*{/,
      'export class AppComponent implements OnInit {',
    );
  }

  if (!content.includes('ngOnInit')) {
    const themeCode = `
  ngOnInit(): void {
    // Configurar tema de OpenIIS UI
    document.documentElement.setAttribute('data-openiis-theme', '${theme}');
  }`;

    updatedContent = updatedContent.replace(
      /export\s+class\s+AppComponent[^{]*{\s*/,
      `export class AppComponent implements OnInit {${themeCode}\n\n  `,
    );
  }

  tree.overwrite(appComponentPath, updatedContent);
  context.logger.info(`✅ Tema '${theme}' configurado en app.component.ts`);
}

// Configurar HttpClient en app.config.ts
function setupHttpClient(tree: Tree, context: SchematicContext): void {
  const appConfigPath = 'src/app/app.config.ts';

  if (!tree.exists(appConfigPath)) {
    context.logger.warn('No se pudo encontrar app.config.ts');
    return;
  }

  const content = tree.read(appConfigPath)?.toString('utf-8') || '';
  let updatedContent = content;

  // Agregar import de provideHttpClient si no existe
  if (!content.includes('provideHttpClient')) {
    // Buscar la línea de import de ApplicationConfig
    const importMatch = content.match(
      /import\s*{\s*ApplicationConfig[^}]*}\s*from\s*'@angular\/core';/,
    );
    if (importMatch) {
      // Agregar la nueva importación después de la línea existente
      updatedContent = updatedContent.replace(
        importMatch[0],
        `${importMatch[0]}\nimport { provideHttpClient } from '@angular/common/http';`,
      );
    } else {
      // Si no encuentra el import de ApplicationConfig, agregar al inicio
      updatedContent = `import { provideHttpClient } from '@angular/common/http';\n${updatedContent}`;
    }
  }

  // Agregar provideHttpClient a los providers si no existe
  if (!content.includes('provideHttpClient()')) {
    // Buscar el array de providers
    const providersMatch = content.match(/providers:\s*\[([\s\S]*?)\]/);
    if (providersMatch) {
      const existingProviders = providersMatch[1];
      const newProviders = existingProviders.trim()
        ? `${existingProviders.trim()},\n    provideHttpClient()`
        : 'provideHttpClient()';

      updatedContent = updatedContent.replace(
        /providers:\s*\[([\s\S]*?)\]/,
        `providers: [\n    ${newProviders}\n  ]`,
      );
    } else {
      // Si no hay providers, crear el array
      updatedContent = updatedContent.replace(
        /export\s+const\s+appConfig:\s*ApplicationConfig\s*=\s*{/,
        `export const appConfig: ApplicationConfig = {
  providers: [
    provideHttpClient()
  ],`,
      );
    }
  }

  tree.overwrite(appConfigPath, updatedContent);
  context.logger.info('✅ HttpClient configurado en app.config.ts');
}

// Configurar estilos en angular.json
function setupStyles(
  tree: Tree,
  context: SchematicContext,
  theme: string,
): void {
  const angularJsonPath = 'angular.json';

  if (!tree.exists(angularJsonPath)) {
    context.logger.error('❌ No se encontró angular.json');
    return;
  }

  const angularJsonContent =
    tree.read(angularJsonPath)?.toString('utf-8') || '';

  try {
    const angularJson = JSON.parse(angularJsonContent);

    // Encontrar el proyecto por defecto
    const defaultProject = angularJson.defaultProject;
    const projectName = defaultProject || Object.keys(angularJson.projects)[0];

    if (!projectName || !angularJson.projects[projectName]) {
      context.logger.error('❌ No se encontró un proyecto válido');
      return;
    }

    const project = angularJson.projects[projectName];
    const buildTarget = project.architect?.build || project.targets?.build;

    if (!buildTarget) {
      context.logger.error('❌ No se encontró configuración de build');
      return;
    }

    // Crear carpeta styles si no existe
    const stylesDir = 'src/styles';
    if (!tree.exists(stylesDir)) {
      tree.create(stylesDir + '/.gitkeep', '');
      context.logger.info('✅ Carpeta src/styles creada');
    }

    // Copiar archivos CSS desde node_modules a src/styles
    const sourceRootPath = 'node_modules/openiis-ui/src/styles/root.css';
    const sourceThemePath = `node_modules/openiis-ui/src/styles/themes/${theme}.css`;

    const destRootPath = 'src/styles/root.css';
    const destThemePath = `src/styles/${theme}.css`;

    // Copiar root.css
    if (tree.exists(sourceRootPath)) {
      const rootContent = tree.read(sourceRootPath)?.toString('utf-8') || '';
      tree.create(destRootPath, rootContent);
      context.logger.info('✅ root.css copiado a src/styles/');
    }

    // Copiar archivo del tema
    if (tree.exists(sourceThemePath)) {
      const themeContent = tree.read(sourceThemePath)?.toString('utf-8') || '';
      tree.create(destThemePath, themeContent);
      context.logger.info(`✅ ${theme}.css copiado a src/styles/`);
    }

    // Configurar estilos en angular.json
    const styles = buildTarget.options?.styles || [];

    // Estilos que ahora están en src/styles
    const localStyles = [
      'src/styles/root.css',
      theme === 'custom'
        ? 'src/styles/openiis-custom-theme.css'
        : `src/styles/${theme}.css`,
    ];

    // Remover estilos anteriores de OpenIIS
    const filteredStyles = styles.filter(
      (style: string) =>
        !style.includes('node_modules/openiis-ui/src/styles/') &&
        !style.includes('src/styles/openiis-custom-theme.css') &&
        !style.includes('src/styles/root.css') &&
        !style.includes(`src/styles/${theme}.css`),
    );

    // Agregar estilos locales
    localStyles.forEach((stylePath) => {
      if (!filteredStyles.includes(stylePath)) {
        filteredStyles.push(stylePath);
        context.logger.info(`✅ Estilo agregado: ${stylePath}`);
      }
    });

    buildTarget.options = buildTarget.options || {};
    buildTarget.options.styles = filteredStyles;

    tree.overwrite(angularJsonPath, JSON.stringify(angularJson, null, 2));
    context.logger.info('✅ Configuración de estilos completada');
  } catch (error) {
    context.logger.error('❌ Error al parsear angular.json');
  }
}

// Crear la página de test
function createTestPage(tree: Tree, context: SchematicContext): void {
  const testComponentPath = 'src/app/pages/test/test.component.ts';
  const testComponentHtmlPath = 'src/app/pages/test/test.component.html';

  // Crear el directorio si no existe
  const testDir = 'src/app/pages/test';
  if (!tree.exists(testDir)) {
    tree.create(testDir + '/.gitkeep', '');
  }

  // Crear el componente TypeScript
  const testComponentContent = `import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import {
  OpeniisButtonComponent,
  OpeniisCardComponent,
  OpeniisSwitchComponent,
  OpeniisModeService,
  ThemeMode,
  EasyIconDirective,
} from 'openiis-ui';

@Component({
  selector: 'app-test',
  standalone: true,
  imports: [
    CommonModule,
    OpeniisButtonComponent,
    OpeniisCardComponent,
    OpeniisSwitchComponent,
    EasyIconDirective,
  ],
  templateUrl: './test.component.html',
  styles: [
    \`
      .test-page {
        min-height: 100vh;
        padding: 2rem;
        background: var(--color-background);
        color: var(--color-text-primary);
        transition: all 0.3s ease;
      }

      .container {
        max-width: 800px;
        margin: 0 auto;
      }

      h1 {
        text-align: center;
        font-size: 2.5rem;
        font-weight: 700;
        margin-bottom: 2rem;
        color: var(--color-text-primary);
      }

      .svg-demo {
        margin-top: 2rem;
      }

      .controls {
        display: flex;
        justify-content: center;
        margin-bottom: 2rem;
      }

      .control-group {
        display: flex;
        align-items: center;
        gap: 0.5rem;
      }

      .control-group span {
        font-weight: 600;
        color: var(--color-text-secondary);
      }

      .content {
        padding: 2rem;
        text-align: center;
      }

      .content h2 {
        font-size: 1.8rem;
        font-weight: 600;
        margin-bottom: 1rem;
        color: var(--color-text-primary);
      }

      .content p {
        font-size: 1.1rem;
        color: var(--color-text-secondary);
        line-height: 1.6;
        margin-bottom: 2rem;
      }

      .actions {
        display: flex;
        justify-content: center;
        gap: 1rem;
        flex-wrap: wrap;
      }

      .svg-container {
        display: flex;
        flex-direction: column;
        align-items: center;
        gap: 1rem;
        padding: 2rem;
        text-align: center;
      }

      .test-svg {
        display: flex;
        justify-content: center;
        align-items: center;
        width: 80px;
        height: 80px;
        background: var(--color-surface);
        border-radius: 50%;
        border: 2px solid var(--primary-200);
        transition: all 0.3s ease;
      }

      .test-svg:hover {
        transform: scale(1.1);
        border-color: var(--primary-500);
      }

      .svg-container p {
        color: var(--color-text-secondary);
        font-size: 0.9rem;
      }

      @media (max-width: 768px) {
        .test-page {
          padding: 1rem;
        }

        h1 {
          font-size: 2rem;
        }

        .actions {
          flex-direction: column;
          align-items: center;
        }
      }
    \`,
  ],
})
export class TestComponent implements OnInit {
  currentMode: ThemeMode = 'light';
  isDarkMode = false;

  constructor(private modeService: OpeniisModeService) {}

  ngOnInit(): void {
    this.modeService.currentMode$.subscribe((mode) => {
      this.currentMode = mode;
      this.isDarkMode = mode === 'dark';
    });
  }

  onModeChange(value: boolean): void {
    const selectedMode = value ? 'dark' : 'light';
    this.modeService.setMode(selectedMode as ThemeMode);
  }

  exploreComponents(): void {
    window.open('ui.openiis.org', '_blank');
  }

  openGitHub(): void {
    window.open('https://github.com/alexiisart/openiis-ui', '_blank');
  }
}`;

  // Crear el template HTML
  const testComponentHtmlContent = `<div class="test-page">
  <div class="container">
    <h1>Bienvenido a Openiis UI</h1>

    <div class="controls">
      <div class="control-group">
        <openiis-switch
          [checked]="isDarkMode"
          size="sm"
          variant="primary"
          [label]="isDarkMode ? 'Modo Oscuro' : 'Modo Claro'"
          (checkedChange)="onModeChange($event)"
        >
        </openiis-switch>
      </div>
    </div>

    <openiis-card>
      <div class="content">
        <h2>¡Importante!</h2>
        <p>
          Esta página de demostración muestra cómo funcionan los modos claro y
          oscuro utilizando los componentes de nuestra librería.
          <strong
            >Información importante: en la carpeta styles/ se encuentran los
            archivos theme.css y root.css, desde los cuales puedes personalizar
            las variables y otros estilos según tus necesidades.</strong
          >
        </p>

        <div class="actions">
          <openiis-button
            type="primary"
            text="Explorar Componentes"
            size="md"
            (clickEvent)="exploreComponents()"
          >
          </openiis-button>

          <openiis-button
            type="secondary"
            text="Ver GitHub"
            size="md"
            (clickEvent)="openGitHub()"
          >
          </openiis-button>
        </div>
      </div>
    </openiis-card>

    <div class="svg-demo">
      <openiis-card
        title="SVG con EasyDirective"
        size="md"
        variant="default"
        type="success"
      >
        <div class="svg-container">
          <div
            easyIcon="assets/github.svg, var(--color-text-primary), 50"
          ></div>
          <p>Este SVG cambia de color según el tema</p>
        </div>
      </openiis-card>
    </div>
  </div>
</div>`;

  tree.create(testComponentPath, testComponentContent);
  tree.create(testComponentHtmlPath, testComponentHtmlContent);
  context.logger.info('✅ Página de test creada');
}

// Start of Selection
// Configurar app.component.ts para incluir la página de test
function setupAppComponentWithTest(
  tree: Tree,
  context: SchematicContext,
): void {
  const appComponentPath = 'src/app/app.component.ts';

  if (!tree.exists(appComponentPath)) {
    context.logger.warn('No se pudo encontrar app.component.ts');
    return;
  }

  const content = tree.read(appComponentPath)?.toString('utf-8') || '';
  let updatedContent = content;

  // Agregar import de TestComponent si no existe
  if (!content.includes('TestComponent')) {
    // Buscar la última línea de importación
    const lastImportMatch = content.match(/import\s+.*?;\s*$/m);
    if (lastImportMatch) {
      // Agregar la nueva importación después de la última línea de importación
      updatedContent = updatedContent.replace(
        lastImportMatch[0],
        `${lastImportMatch[0]}\nimport { TestComponent } from './pages/test/test.component';`,
      );
    }
  }

  // Agregar TestComponent a los imports si no existe
  if (!content.includes('TestComponent')) {
    const importsMatch = content.match(/imports:\s*\[([\s\S]*?)\]/);
    if (importsMatch) {
      const existingImports = importsMatch[1];
      const newImports = existingImports.trim()
        ? `${existingImports.trim()}, TestComponent`
        : 'TestComponent';

      updatedContent = updatedContent.replace(
        /imports:\s*\[([\s\S]*?)\]/,
        `imports: [\n    ${newImports}\n  ]`,
      );
    }
  }

  tree.overwrite(appComponentPath, updatedContent);
  context.logger.info('✅ TestComponent agregado a app.component.ts');
}

// Copiar assets necesarios
function copyAssets(tree: Tree, context: SchematicContext): void {
  // Crear carpeta public si no existe
  const publicDir = 'public';
  if (!tree.exists(publicDir)) {
    tree.create(publicDir + '/.gitkeep', '');
    context.logger.info('✅ Carpeta public creada');
  }

  // Crear carpeta assets si no existe
  const assetsDir = 'public/assets';
  if (!tree.exists(assetsDir)) {
    tree.create(assetsDir + '/.gitkeep', '');
    context.logger.info('✅ Carpeta public/assets creada');
  }

  // Copiar github.svg desde node_modules
  const sourceGithubPath = 'node_modules/openiis-ui/public/assets/github.svg';
  const destGithubPath = 'public/assets/github.svg';

  if (tree.exists(sourceGithubPath)) {
    const githubContent = tree.read(sourceGithubPath)?.toString('utf-8') || '';
    tree.create(destGithubPath, githubContent);
    context.logger.info('✅ github.svg copiado a public/assets/');
  } else {
    // Si no existe en node_modules, crear un SVG básico
    const basicGithubSvg = `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width="24" height="24"><path d="M12 .297c-6.63 0-12 5.373-12 12 0 5.303 3.438 9.8 8.205 11.385.6.113.82-.258.82-.577 0-.285-.01-1.04-.015-2.04-3.338.724-4.042-1.61-4.042-1.61-.546-1.387-1.333-1.757-1.333-1.757-1.09-.744.083-.729.083-.729 1.205.084 1.84 1.236 1.84 1.236 1.07 1.835 2.809 1.305 3.495.998.108-.775.418-1.305.76-1.605-2.665-.3-5.466-1.335-5.466-5.93 0-1.31.47-2.38 1.235-3.22-.123-.303-.535-1.523.117-3.176 0 0 1.008-.322 3.3 1.23a11.51 11.51 0 013.003-.404c1.018.005 2.042.137 3.003.404 2.29-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.873.12 3.176.77.84 1.233 1.91 1.233 3.22 0 4.61-2.803 5.625-5.475 5.92.43.37.823 1.102.823 2.222 0 1.606-.014 2.896-.014 3.286 0 .322.216.694.825.576C20.565 22.092 24 17.592 24 12.297c0-6.627-5.373-12-12-12"/></svg>`;
    tree.create(destGithubPath, basicGithubSvg);
    context.logger.info('✅ github.svg creado en public/assets/');
  }
}

// Configurar app.component.html para mostrar la página de test
function setupAppComponentHtml(tree: Tree, context: SchematicContext): void {
  const appComponentHtmlPath = 'src/app/app.component.html';

  if (!tree.exists(appComponentHtmlPath)) {
    context.logger.warn('No se pudo encontrar app.component.html');
    return;
  }

  const content = tree.read(appComponentHtmlPath)?.toString('utf-8') || '';

  // Si el contenido no incluye la página de test, agregarla
  if (!content.includes('<app-test>')) {
    const updatedContent = `<!-- <router-outlet />  -->
<app-test></app-test>`;

    tree.overwrite(appComponentHtmlPath, updatedContent);
    context.logger.info('✅ Página de test agregada a app.component.html');
  }
}

export function ngAdd(options: NgAddSchema): Rule {
  return async (tree: Tree, context: SchematicContext) => {
    context.logger.info(
      '🚀 Configurando OpenIIS UI (componentes standalone)...',
    );

    const theme = options.theme || 'classic';
    const includeTestPage = options.includeTestPage !== false; // Por defecto true
    context.logger.info(`🎨 Tema seleccionado: ${theme}`);

    // Si es tema custom, pedir colores adicionales
    if (theme === 'custom') {
      const customOptions = await getCustomThemeOptions(context);
      options.primaryColor = options.primaryColor || customOptions.primaryColor;
      options.backgroundColor =
        options.backgroundColor || customOptions.backgroundColor;
      options.textColor = options.textColor || customOptions.textColor;

      const customCSS = createCustomThemeCSS(options);
      const customThemePath = 'src/styles/openiis-custom-theme.css';

      if (tree.exists(customThemePath)) {
        tree.overwrite(customThemePath, customCSS);
        context.logger.info('✅ Tema personalizado actualizado');
      } else {
        tree.create(customThemePath, customCSS);
        context.logger.info('✅ Tema personalizado creado');
      }
    }

    // Configurar HttpClient, tema y estilos
    setupHttpClient(tree, context);
    setupThemeInAppComponent(tree, context, theme);
    setupStyles(tree, context, theme);

    // Copiar assets necesarios
    copyAssets(tree, context);

    // Crear página de test si se solicita
    if (includeTestPage) {
      createTestPage(tree, context);
      setupAppComponentWithTest(tree, context);
      setupAppComponentHtml(tree, context);
      context.logger.info('✅ Página de demostración creada');
    }

    context.logger.info('');
    context.logger.info('🎉 ¡OpenIIS UI configurado exitosamente!');
    context.logger.info('');
    context.logger.info('📖 Cómo usar los componentes:');
    context.logger.info(
      "   import { OpeniisButtonComponent } from 'openiis-ui';",
    );
    context.logger.info('');
    context.logger.info('📖 En tu componente standalone:');
    context.logger.info('   @Component({');
    context.logger.info('     imports: [OpeniisButtonComponent],');
    context.logger.info(
      '     template: `<openiis-button>Click me</openiis-button>`',
    );
    context.logger.info('   })');
    context.logger.info('');

    if (includeTestPage) {
      context.logger.info('📖 Página de demostración disponible en:');
      context.logger.info('   http://localhost:4200');
      context.logger.info('');
    }

    return tree;
  };
}
