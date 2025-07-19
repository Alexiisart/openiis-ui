import { Rule, SchematicContext, Tree } from '@angular-devkit/schematics';

// Generar el archivo index.js: npx tsc -p projects/openiis/schematics/tsconfig.json

// Interfaz para las opciones del schema
interface NgAddSchema {
  theme?: string;
  primaryColor?: string;
  backgroundColor?: string;
  textColor?: string;
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

    // Configurar estilos
    const styles = buildTarget.options?.styles || [];

    // Estilos base que siempre se necesitan
    const baseStyles = [
      'node_modules/openiis-ui/src/styles/root.css',
      'node_modules/openiis-ui/src/styles/animations.css',
    ];

    // Estilo del tema específico
    const themeStylePath =
      theme === 'custom'
        ? 'src/styles/openiis-custom-theme.css'
        : `node_modules/openiis-ui/src/styles/themes/${theme}.css`;

    // Remover estilos anteriores de OpenIIS
    const filteredStyles = styles.filter(
      (style: string) =>
        !style.includes('node_modules/openiis-ui/src/styles/') &&
        !style.includes('src/styles/openiis-custom-theme.css'),
    );

    // Agregar estilos base
    baseStyles.forEach((styleBase) => {
      if (!filteredStyles.includes(styleBase)) {
        filteredStyles.push(styleBase);
        context.logger.info(`✅ Estilo base agregado: ${styleBase}`);
      }
    });

    // Agregar estilo del tema
    if (!filteredStyles.includes(themeStylePath)) {
      filteredStyles.push(themeStylePath);
      context.logger.info(`✅ Tema agregado: ${themeStylePath}`);
    }

    buildTarget.options = buildTarget.options || {};
    buildTarget.options.styles = filteredStyles;

    tree.overwrite(angularJsonPath, JSON.stringify(angularJson, null, 2));
    context.logger.info('✅ Configuración de estilos completada');
  } catch (error) {
    context.logger.error('❌ Error al parsear angular.json');
  }
}

export function ngAdd(options: NgAddSchema): Rule {
  return async (tree: Tree, context: SchematicContext) => {
    context.logger.info(
      '🚀 Configurando OpenIIS UI (componentes standalone)...',
    );

    const theme = options.theme || 'classic';
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

    return tree;
  };
}
