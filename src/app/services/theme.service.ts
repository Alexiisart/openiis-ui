import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';

export type OpeniisTheme = 'classic' | 'neutral' | 'vivid' | 'custom';
export type ThemeMode = 'light' | 'dark';

export interface CustomThemeConfig {
  primary: string;
  accent?: string;
  background?: string;
  surface?: string;
  text?: string;
}

export interface ThemeConfig {
  theme: OpeniisTheme;
  mode: ThemeMode;
  customConfig?: CustomThemeConfig;
}

/**
 * Servicio para gestionar los temas de Openiis UI
 * Soporta 4 tipos de temas: classic, neutral, vivid y custom
 * También maneja el modo claro/oscuro
 */
@Injectable({
  providedIn: 'root',
})
export class OpeniisThemeService {
  private readonly THEME_STORAGE_KEY = 'openiis-theme';
  private readonly MODE_STORAGE_KEY = 'openiis-theme-mode';
  private readonly CUSTOM_CONFIG_STORAGE_KEY = 'openiis-custom-theme';

  private _currentTheme$ = new BehaviorSubject<OpeniisTheme>('classic');
  private _currentMode$ = new BehaviorSubject<ThemeMode>('light');
  private _customConfig$ = new BehaviorSubject<CustomThemeConfig | null>(null);

  constructor() {
    this.initializeTheme();
  }

  /**
   * Observable del tema actual
   */
  get currentTheme$(): Observable<OpeniisTheme> {
    return this._currentTheme$.asObservable();
  }

  /**
   * Observable del modo actual (claro/oscuro)
   */
  get currentMode$(): Observable<ThemeMode> {
    return this._currentMode$.asObservable();
  }

  /**
   * Observable de la configuración custom
   */
  get customConfig$(): Observable<CustomThemeConfig | null> {
    return this._customConfig$.asObservable();
  }

  /**
   * Obtiene el tema actual
   */
  getCurrentTheme(): OpeniisTheme {
    return this._currentTheme$.value;
  }

  /**
   * Obtiene el modo actual
   */
  getCurrentMode(): ThemeMode {
    return this._currentMode$.value;
  }

  /**
   * Obtiene la configuración custom actual
   */
  getCustomConfig(): CustomThemeConfig | null {
    return this._customConfig$.value;
  }

  /**
   * Establece el tema
   */
  setTheme(theme: OpeniisTheme): void {
    this._currentTheme$.next(theme);
    localStorage.setItem(this.THEME_STORAGE_KEY, theme);
    this.applyTheme();
  }

  /**
   * Establece el modo (claro/oscuro)
   */
  setMode(mode: ThemeMode): void {
    this._currentMode$.next(mode);
    localStorage.setItem(this.MODE_STORAGE_KEY, mode);
    this.applyTheme();
  }

  /**
   * Alterna entre modo claro y oscuro
   */
  toggleMode(): void {
    const newMode = this._currentMode$.value === 'light' ? 'dark' : 'light';
    this.setMode(newMode);
  }

  /**
   * Establece un tema custom con una paleta generada automáticamente
   */
  setCustomTheme(config: CustomThemeConfig): void {
    const fullConfig = this.generateCustomPalette(config);
    this._customConfig$.next(fullConfig);
    localStorage.setItem(
      this.CUSTOM_CONFIG_STORAGE_KEY,
      JSON.stringify(fullConfig)
    );

    this.setTheme('custom');
    this.applyCustomTheme(fullConfig);
  }

  /**
   * Establece el tema completo (tema + modo + config custom)
   */
  setThemeConfig(config: ThemeConfig): void {
    if (config.customConfig) {
      this.setCustomTheme(config.customConfig);
    }
    this.setTheme(config.theme);
    this.setMode(config.mode);
  }

  /**
   * Restablece al tema por defecto
   */
  resetToDefault(): void {
    this.setTheme('classic');
    this.setMode('light');
    this._customConfig$.next(null);
    localStorage.removeItem(this.CUSTOM_CONFIG_STORAGE_KEY);
  }

  /**
   * Inicializa el tema desde localStorage o detecta preferencias del sistema
   */
  private initializeTheme(): void {
    // Cargar tema guardado
    const savedTheme = localStorage.getItem(
      this.THEME_STORAGE_KEY
    ) as OpeniisTheme;
    if (
      savedTheme &&
      ['classic', 'neutral', 'vivid', 'custom'].includes(savedTheme)
    ) {
      this._currentTheme$.next(savedTheme);
    }

    // Cargar modo guardado o detectar preferencia del sistema
    const savedMode = localStorage.getItem(this.MODE_STORAGE_KEY) as ThemeMode;
    if (savedMode && ['light', 'dark'].includes(savedMode)) {
      this._currentMode$.next(savedMode);
    } else {
      // Detectar preferencia del sistema
      const prefersDark = window.matchMedia(
        '(prefers-color-scheme: dark)'
      ).matches;
      this._currentMode$.next(prefersDark ? 'dark' : 'light');
    }

    // Cargar configuración custom
    const savedCustomConfig = localStorage.getItem(
      this.CUSTOM_CONFIG_STORAGE_KEY
    );
    if (savedCustomConfig) {
      try {
        const config = JSON.parse(savedCustomConfig);
        this._customConfig$.next(config);
      } catch (error) {
        console.warn('Error parsing custom theme config:', error);
      }
    }

    this.applyTheme();
  }

  /**
   * Aplica el tema al DOM
   */
  private applyTheme(): void {
    const theme = this._currentTheme$.value;
    const mode = this._currentMode$.value;
    const customConfig = this._customConfig$.value;

    // Aplicar atributos al body
    document.body.setAttribute('data-openiis-theme', theme);
    document.body.setAttribute('data-theme', mode);

    // Si es tema custom, aplicar variables
    if (theme === 'custom' && customConfig) {
      this.applyCustomTheme(customConfig);
    }
  }

  /**
   * Aplica las variables CSS del tema custom
   */
  private applyCustomTheme(config: CustomThemeConfig): void {
    const root = document.documentElement;

    // Generar paleta completa a partir del color primario
    const palette = this.generateColorPalette(config.primary);

    // Aplicar paleta primaria
    Object.entries(palette.primary).forEach(([shade, color]) => {
      root.style.setProperty(`--custom-primary-${shade}`, color);
    });

    // Aplicar paleta neutral si no se especifica
    if (!config.background) {
      Object.entries(palette.neutral).forEach(([shade, color]) => {
        root.style.setProperty(`--custom-neutral-${shade}`, color);
      });
    }

    // Aplicar colores específicos si se proporcionan
    if (config.background) {
      root.style.setProperty('--custom-background', config.background);
    }
    if (config.surface) {
      root.style.setProperty('--custom-surface', config.surface);
    }
    if (config.text) {
      root.style.setProperty('--custom-text-primary', config.text);
    }
  }

  /**
   * Genera una configuración custom completa a partir de una configuración básica
   */
  private generateCustomPalette(config: CustomThemeConfig): CustomThemeConfig {
    return {
      primary: config.primary,
      accent: config.accent || config.primary,
      background: config.background || '#ffffff',
      surface: config.surface || '#fafafa',
      text: config.text || '#171717',
    };
  }

  /**
   * Genera una paleta de colores completa a partir de un color base
   */
  private generateColorPalette(baseColor: string): {
    primary: Record<string, string>;
    neutral: Record<string, string>;
  } {
    const hsl = this.hexToHsl(baseColor);

    const primary: Record<string, string> = {};
    const neutral: Record<string, string> = {};

    // Generar tonos primarios (del 50 al 900)
    const shades = [50, 100, 200, 300, 400, 500, 600, 700, 800, 900];

    shades.forEach((shade) => {
      // Para primarios: variar luminosidad manteniendo saturación
      let lightness: number;
      if (shade === 50) lightness = 96;
      else if (shade === 100) lightness = 90;
      else if (shade === 200) lightness = 80;
      else if (shade === 300) lightness = 70;
      else if (shade === 400) lightness = 60;
      else if (shade === 500) lightness = hsl.l; // Color base
      else if (shade === 600) lightness = Math.max(hsl.l - 15, 20);
      else if (shade === 700) lightness = Math.max(hsl.l - 25, 15);
      else if (shade === 800) lightness = Math.max(hsl.l - 35, 10);
      else lightness = Math.max(hsl.l - 45, 5);

      primary[shade.toString()] = this.hslToHex(hsl.h, hsl.s, lightness);

      // Para neutrales: usar saturación muy baja
      const neutralSaturation = Math.min(hsl.s * 0.1, 5);
      neutral[shade.toString()] = this.hslToHex(
        hsl.h,
        neutralSaturation,
        lightness
      );
    });

    return { primary, neutral };
  }

  /**
   * Convierte HEX a HSL
   */
  private hexToHsl(hex: string): { h: number; s: number; l: number } {
    const r = parseInt(hex.slice(1, 3), 16) / 255;
    const g = parseInt(hex.slice(3, 5), 16) / 255;
    const b = parseInt(hex.slice(5, 7), 16) / 255;

    const max = Math.max(r, g, b);
    const min = Math.min(r, g, b);
    const diff = max - min;
    const sum = max + min;
    const l = sum / 2;

    let h: number;
    let s: number;

    if (diff === 0) {
      h = s = 0;
    } else {
      s = l > 0.5 ? diff / (2 - sum) : diff / sum;

      switch (max) {
        case r:
          h = ((g - b) / diff + (g < b ? 6 : 0)) / 6;
          break;
        case g:
          h = ((b - r) / diff + 2) / 6;
          break;
        case b:
          h = ((r - g) / diff + 4) / 6;
          break;
        default:
          h = 0;
      }
    }

    return {
      h: Math.round(h * 360),
      s: Math.round(s * 100),
      l: Math.round(l * 100),
    };
  }

  /**
   * Convierte HSL a HEX
   */
  private hslToHex(h: number, s: number, l: number): string {
    const hue = h / 360;
    const saturation = s / 100;
    const lightness = l / 100;

    const hue2rgb = (p: number, q: number, t: number): number => {
      if (t < 0) t += 1;
      if (t > 1) t -= 1;
      if (t < 1 / 6) return p + (q - p) * 6 * t;
      if (t < 1 / 2) return q;
      if (t < 2 / 3) return p + (q - p) * (2 / 3 - t) * 6;
      return p;
    };

    let r: number, g: number, b: number;

    if (saturation === 0) {
      r = g = b = lightness;
    } else {
      const q =
        lightness < 0.5
          ? lightness * (1 + saturation)
          : lightness + saturation - lightness * saturation;
      const p = 2 * lightness - q;

      r = hue2rgb(p, q, hue + 1 / 3);
      g = hue2rgb(p, q, hue);
      b = hue2rgb(p, q, hue - 1 / 3);
    }

    const toHex = (n: number): string => {
      const hex = Math.round(n * 255).toString(16);
      return hex.length === 1 ? '0' + hex : hex;
    };

    return `#${toHex(r)}${toHex(g)}${toHex(b)}`;
  }
}
