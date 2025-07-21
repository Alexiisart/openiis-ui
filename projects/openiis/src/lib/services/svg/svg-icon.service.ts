import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { DomSanitizer, SafeHtml } from '@angular/platform-browser';
import { Observable, of, BehaviorSubject } from 'rxjs';
import { map, catchError, tap } from 'rxjs/operators';

export interface SvgIconOptions {
  color?: string;
  backgroundColor?: string;
  width?: string | number;
  height?: string | number;
  className?: string;
  strokeColor?: string;
  strokeWidth?: string | number;
  opacity?: number;
  fontSize?: string | number;
  rotate?: number;
  flipHorizontal?: boolean;
  flipVertical?: boolean;
}

export interface SvgIconResult {
  html: SafeHtml;
  element: HTMLElement;
  destroy: () => void;
}

@Injectable({
  providedIn: 'root',
})
export class SvgIconService {
  private cache = new Map<string, string>();
  private instances = new Map<string, HTMLElement[]>();
  private globalStyles = new BehaviorSubject<string>('');

  constructor(
    private http: HttpClient,
    private sanitizer: DomSanitizer,
  ) {
    this.injectGlobalStyles();
  }

  /**
   * Método principal: súper fácil de usar
   * Ejemplo: svgService.icon('assets/heart.svg', { color: 'red' })
   */
  icon(
    iconPath: string,
    options: SvgIconOptions = {},
  ): Observable<SvgIconResult> {
    return this.loadSvg(iconPath).pipe(
      map((svgContent) => {
        const processedSvg = this.processSvg(svgContent, options);
        const element = this.createSvgElement(processedSvg, options);
        const safeHtml = this.sanitizer.bypassSecurityTrustHtml(processedSvg);

        // Registrar instancia para cleanup global
        this.registerInstance(iconPath, element);

        return {
          html: safeHtml,
          element: element,
          destroy: () => this.destroyInstance(iconPath, element),
        };
      }),
      catchError((error) => {
        console.error(`Error loading SVG: ${iconPath}`, error);
        return of({
          html: this.sanitizer.bypassSecurityTrustHtml(this.getErrorSvg()),
          element: this.createErrorElement(),
          destroy: () => {},
        });
      }),
    );
  }

  /**
   * Método para iconos inline - inyecta directamente en el DOM
   * Ejemplo: svgService.inlineIcon(elementRef, 'assets/star.svg', { color: 'gold' })
   */
  inlineIcon(
    targetElement: HTMLElement,
    iconPath: string,
    options: SvgIconOptions = {},
  ): Observable<() => void> {
    return this.icon(iconPath, options).pipe(
      tap((result) => {
        targetElement.innerHTML = '';
        targetElement.appendChild(result.element);
      }),
      map((result) => result.destroy),
    );
  }

  /**
   * Método para cambiar colores de iconos existentes
   */
  updateIconColor(iconPath: string, newOptions: SvgIconOptions): void {
    const instances = this.instances.get(iconPath) || [];

    instances.forEach((element) => {
      this.applyStylesToElement(element, newOptions);
    });
  }

  /**
   * Método para iconos de uso frecuente - pre-carga y cachea
   */
  preloadIcons(iconPaths: string[]): Observable<boolean> {
    const loadPromises = iconPaths.map((path) =>
      this.loadSvg(path).toPromise(),
    );

    return new Observable((observer) => {
      Promise.all(loadPromises)
        .then(() => {
          observer.next(true);
          observer.complete();
        })
        .catch((error) => {
          observer.error(error);
        });
    });
  }

  /**
   * Configuración global de estilos
   */
  setGlobalIconStyles(styles: Partial<SvgIconOptions>): void {
    const cssRules = this.generateGlobalCss(styles);
    this.globalStyles.next(cssRules);
    this.updateGlobalStyles();
  }

  /**
   * Limpiar cache y instancias
   */
  clearCache(): void {
    this.cache.clear();
    this.instances.clear();
  }

  // ========================
  // MÉTODOS PRIVADOS
  // ========================

  private loadSvg(iconPath: string): Observable<string> {
    // Verificar cache primero
    if (this.cache.has(iconPath)) {
      return of(this.cache.get(iconPath)!);
    }

    return this.http.get(iconPath, { responseType: 'text' }).pipe(
      tap((svg) => this.cache.set(iconPath, svg)),
      catchError(() => of(this.getErrorSvg())),
    );
  }

  private processSvg(svgContent: string, options: SvgIconOptions): string {
    let processedSvg = svgContent;

    // Remover atributos de tamaño fijos
    processedSvg = processedSvg.replace(/width="[^"]*"/g, '');
    processedSvg = processedSvg.replace(/height="[^"]*"/g, '');

    // Agregar viewBox si no existe
    if (!processedSvg.includes('viewBox')) {
      processedSvg = processedSvg.replace('<svg', '<svg viewBox="0 0 24 24"');
    }

    // Procesar colores
    if (options.color) {
      // Cambiar fill
      processedSvg = processedSvg.replace(
        /fill="[^"]*"/g,
        `fill="${options.color}"`,
      );
      processedSvg = processedSvg.replace(
        /fill:[^;"]*/g,
        `fill:${options.color}`,
      );

      // Si no tiene fill, agregarlo
      if (!processedSvg.includes('fill=') && !processedSvg.includes('fill:')) {
        processedSvg = processedSvg.replace(
          '<path',
          '<path fill="currentColor"',
        );
        processedSvg = processedSvg.replace(
          '<svg',
          `<svg style="color: ${options.color}"`,
        );
      }
    }

    // Procesar stroke
    if (options.strokeColor) {
      processedSvg = processedSvg.replace(
        /stroke="[^"]*"/g,
        `stroke="${options.strokeColor}"`,
      );
      processedSvg = processedSvg.replace(
        /stroke:[^;"]*/g,
        `stroke:${options.strokeColor}`,
      );
    }

    if (options.strokeWidth) {
      processedSvg = processedSvg.replace(
        /stroke-width="[^"]*"/g,
        `stroke-width="${options.strokeWidth}"`,
      );
    }

    // Agregar clase personalizada
    if (options.className) {
      processedSvg = processedSvg.replace(
        '<svg',
        `<svg class="svg-icon ${options.className}"`,
      );
    } else {
      processedSvg = processedSvg.replace('<svg', '<svg class="svg-icon"');
    }

    // Aplicar transformaciones
    const transforms = this.buildTransforms(options);
    if (transforms) {
      processedSvg = processedSvg.replace(
        '<svg',
        `<svg style="transform: ${transforms}"`,
      );
    }

    return processedSvg;
  }

  private createSvgElement(
    svgContent: string,
    options: SvgIconOptions,
  ): HTMLElement {
    const wrapper = document.createElement('div');
    wrapper.innerHTML = svgContent;
    const svgElement = wrapper.firstElementChild as HTMLElement;

    if (svgElement) {
      this.applyStylesToElement(svgElement, options);
    }

    return svgElement || wrapper;
  }

  private applyStylesToElement(
    element: HTMLElement,
    options: SvgIconOptions,
  ): void {
    // Aplicar dimensiones
    if (options.width) {
      const width =
        typeof options.width === 'number'
          ? `${options.width}px`
          : options.width;
      element.style.width = width;
    }

    if (options.height) {
      const height =
        typeof options.height === 'number'
          ? `${options.height}px`
          : options.height;
      element.style.height = height;
    } else {
      element.style.height = 'auto'; // Altura automática si no se especifica
    }

    // Aplicar color
    if (options.color) {
      element.style.color = options.color;
    }

    // Aplicar background
    if (options.backgroundColor) {
      element.style.backgroundColor = options.backgroundColor;
      element.style.borderRadius = '4px';
      element.style.padding = '4px';
    }

    // Aplicar opacidad
    if (options.opacity !== undefined) {
      element.style.opacity = options.opacity.toString();
    }

    // Aplicar fontSize
    if (options.fontSize) {
      const fontSize =
        typeof options.fontSize === 'number'
          ? `${options.fontSize}px`
          : options.fontSize;
      element.style.fontSize = fontSize;
    }

    // Aplicar stroke
    if (options.strokeColor) {
      const svgElements = element.querySelectorAll(
        'svg, path, rect, circle, ellipse, polygon, polyline, line',
      );
      svgElements.forEach((svgEl) => {
        (svgEl as HTMLElement).style.stroke = options.strokeColor!;
      });
    }

    if (options.strokeWidth) {
      const strokeWidth =
        typeof options.strokeWidth === 'number'
          ? `${options.strokeWidth}px`
          : options.strokeWidth;
      const svgElements = element.querySelectorAll(
        'svg, path, rect, circle, ellipse, polygon, polyline, line',
      );
      svgElements.forEach((svgEl) => {
        (svgEl as HTMLElement).style.strokeWidth = strokeWidth;
      });
    }

    // Aplicar transformaciones
    const transforms = this.buildTransforms(options);
    if (transforms) {
      element.style.transform = transforms;
    }

    // Hacer que sea responsive por defecto
    element.style.display = 'inline-block';
    element.style.verticalAlign = 'middle';
  }

  private buildTransforms(options: SvgIconOptions): string {
    const transforms: string[] = [];

    if (options.rotate) {
      transforms.push(`rotate(${options.rotate}deg)`);
    }

    if (options.flipHorizontal) {
      transforms.push('scaleX(-1)');
    }

    if (options.flipVertical) {
      transforms.push('scaleY(-1)');
    }

    return transforms.join(' ');
  }

  private registerInstance(iconPath: string, element: HTMLElement): void {
    if (!this.instances.has(iconPath)) {
      this.instances.set(iconPath, []);
    }
    this.instances.get(iconPath)!.push(element);
  }

  private destroyInstance(iconPath: string, element: HTMLElement): void {
    const instances = this.instances.get(iconPath);
    if (instances) {
      const index = instances.indexOf(element);
      if (index > -1) {
        instances.splice(index, 1);
      }
    }
  }

  private getErrorSvg(): string {
    return `
      <svg viewBox="0 0 24 24" class="svg-icon svg-icon--error">
        <path fill="currentColor" d="M12,2A10,10 0 0,0 2,12A10,10 0 0,0 12,22A10,10 0 0,0 22,12A10,10 0 0,0 12,2M12,17A1,1 0 0,1 11,16A1,1 0 0,1 12,15A1,1 0 0,1 13,16A1,1 0 0,1 12,17M12,14A1,1 0 0,1 11,13V7A1,1 0 0,1 12,6A1,1 0 0,1 13,7V13A1,1 0 0,1 12,14Z" />
      </svg>
    `;
  }

  private createErrorElement(): HTMLElement {
    const div = document.createElement('div');
    div.innerHTML = this.getErrorSvg();
    return div.firstElementChild as HTMLElement;
  }

  private generateGlobalCss(styles: Partial<SvgIconOptions>): string {
    const rules: string[] = [];

    if (styles.color) {
      rules.push(`color: ${styles.color}`);
    }

    if (styles.width) {
      const width =
        typeof styles.width === 'number' ? `${styles.width}px` : styles.width;
      rules.push(`width: ${width}`);
    }

    if (styles.height) {
      const height =
        typeof styles.height === 'number'
          ? `${styles.height}px`
          : styles.height;
      rules.push(`height: ${height}`);
    } else {
      rules.push('height: auto');
    }

    return `.svg-icon { ${rules.join('; ')} }`;
  }

  private injectGlobalStyles(): void {
    const style = document.createElement('style');
    style.id = 'svg-icon-global-styles';
    style.textContent = `
      .svg-icon {
        display: inline-block;
        vertical-align: middle;
        width: 1em;
        height: auto;
        fill: currentColor;
        transition: all 0.2s ease;
      }
      
      .svg-icon--error {
        color: #ef4444;
      }
    `;
    document.head.appendChild(style);
  }

  private updateGlobalStyles(): void {
    const existingStyle = document.getElementById('svg-icon-global-styles');
    if (existingStyle && this.globalStyles.value) {
      existingStyle.textContent += '\n' + this.globalStyles.value;
    }
  }
}

// Función helper para uso aún más fácil
export function createSvgIcon(
  iconPath: string,
  options?: SvgIconOptions,
): Observable<SvgIconResult> {
  const service = new SvgIconService(
    // Estos se inyectarán automáticamente en el contexto de Angular
    {} as any,
    {} as any,
  );
  return service.icon(iconPath, options);
}
