import {
  Directive,
  Input,
  ElementRef,
  OnInit,
  OnDestroy,
  OnChanges,
  SimpleChanges,
  Renderer2,
} from '@angular/core';
import { SvgIconService, SvgIconOptions } from './svg-icon.service';
import { Subscription } from 'rxjs';

@Directive({
  selector: '[svgIcon]',
  standalone: true,
})
export class SvgIconDirective implements OnInit, OnDestroy, OnChanges {
  // Propiedades principales
  @Input('svgIcon') iconPath: string = '';
  @Input() svgColor: string = '';
  @Input() svgBackground: string = '';
  @Input() svgWidth: string | number = '';
  @Input() svgHeight: string | number = '';
  @Input() svgStroke: string = '';
  @Input() svgStrokeWidth: string | number = '';
  @Input() svgOpacity: number = 1;
  @Input() svgRotate: number = 0;
  @Input() svgFlipH: boolean = false;
  @Input() svgFlipV: boolean = false;
  @Input() svgClass: string = '';

  private subscription?: Subscription;
  private destroyFn?: () => void;

  constructor(
    private elementRef: ElementRef<HTMLElement>,
    private svgService: SvgIconService,
    private renderer: Renderer2
  ) {}

  ngOnInit(): void {
    this.loadIcon();
  }

  ngOnChanges(changes: SimpleChanges): void {
    // Si cambia el icono o alguna propiedad, recargar
    if (this.iconPath) {
      this.loadIcon();
    }
  }

  ngOnDestroy(): void {
    this.cleanup();
  }

  private loadIcon(): void {
    if (!this.iconPath) return;

    this.cleanup();

    const options: SvgIconOptions = {
      color: this.svgColor,
      backgroundColor: this.svgBackground,
      width: this.svgWidth,
      height: this.svgHeight,
      strokeColor: this.svgStroke,
      strokeWidth: this.svgStrokeWidth,
      opacity: this.svgOpacity,
      rotate: this.svgRotate,
      flipHorizontal: this.svgFlipH,
      flipVertical: this.svgFlipV,
      className: this.svgClass,
    };

    this.subscription = this.svgService
      .icon(this.iconPath, options)
      .subscribe((result) => {
        // Limpiar contenido anterior
        this.elementRef.nativeElement.innerHTML = '';

        // Insertar el nuevo SVG
        this.elementRef.nativeElement.appendChild(result.element);

        // Guardar función de destrucción
        this.destroyFn = result.destroy;
      });
  }

  private cleanup(): void {
    if (this.subscription) {
      this.subscription.unsubscribe();
      this.subscription = undefined;
    }

    if (this.destroyFn) {
      this.destroyFn();
      this.destroyFn = undefined;
    }
  }
}

// Directiva aún más simple para casos básicos
@Directive({
  selector: '[easyIcon]',
  standalone: true,
})
export class EasyIconDirective implements OnInit, OnDestroy {
  @Input('easyIcon') iconConfig: string = ''; // Formato: "path,color,width,height"

  private svgDirective?: SvgIconDirective;

  constructor(
    private elementRef: ElementRef,
    private svgService: SvgIconService,
    private renderer: Renderer2
  ) {}

  ngOnInit(): void {
    this.parseAndApply();
  }

  ngOnDestroy(): void {
    if (this.svgDirective) {
      this.svgDirective.ngOnDestroy();
    }
  }

  private parseAndApply(): void {
    if (!this.iconConfig) return;

    const parts = this.iconConfig.split(',').map((p) => p.trim());
    const [path, color, width, height] = parts;

    // Crear instancia de la directiva principal
    this.svgDirective = new SvgIconDirective(
      this.elementRef,
      this.svgService,
      this.renderer
    );

    // Configurar propiedades
    this.svgDirective.iconPath = path || '';
    this.svgDirective.svgColor = color || '';
    this.svgDirective.svgWidth = width || '';
    this.svgDirective.svgHeight = height || '';

    // Inicializar
    this.svgDirective.ngOnInit();
  }
}
