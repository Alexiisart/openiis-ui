import { Injectable } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';
import { BehaviorSubject, Observable } from 'rxjs';

/* ===== SERVICIO DE IDIOMA ===== */
/**
 * Servicio para gestionar el idioma de la aplicación.
 * Proporciona métodos para inicializar, obtener y establecer el idioma actual.
 */
@Injectable({
  providedIn: 'root',
})
export class LanguageService {
  /**
   * Idiomas disponibles en la aplicación.
   */
  private availableLangs = ['cn', 'en', 'es'];

  /**
   * Idioma por defecto de la aplicación.
   */
  private defaultLang = 'es';

  /**
   * Clave de almacenamiento para el idioma en localStorage.
   */
  private readonly LANGUAGE_STORAGE_KEY = 'openiis-language';

  /**
   * BehaviorSubject que mantiene el idioma actual.
   */
  private _currentLang$ = new BehaviorSubject<string>(this.defaultLang);

  /**
   * Constructor del servicio de idioma.
   * @param translate Servicio de traducción inyectado.
   */
  constructor(private translate: TranslateService) {
    this.initializeLanguage();
  }

  /**
   * Inicializa el idioma de la aplicación.
   * Establece los idiomas disponibles y el idioma por defecto.
   * Intenta recuperar el idioma almacenado o el idioma del navegador.
   */
  private initializeLanguage(): void {
    this.translate.addLangs(this.availableLangs);
    this.translate.setDefaultLang(this.defaultLang);

    const storedLang = localStorage.getItem(this.LANGUAGE_STORAGE_KEY);
    const browserLang = this.translate.getBrowserLang();
    const langToUse =
      storedLang ||
      (this.availableLangs.includes(browserLang || '')
        ? browserLang
        : this.defaultLang);

    this.setLanguage(langToUse || this.defaultLang);
  }

  /**
   * Obtiene un observable del idioma actual.
   * @returns Observable del idioma actual.
   */
  get currentLang$(): Observable<string> {
    return this._currentLang$.asObservable();
  }

  /**
   * Obtiene el idioma actual.
   * @returns Idioma actual.
   */
  get currentLang(): string {
    return this._currentLang$.value;
  }

  /**
   * Establece el idioma de la aplicación.
   * @param lang Idioma a establecer.
   */
  setLanguage(lang: string): void {
    if (this.availableLangs.includes(lang)) {
      this.translate.use(lang);
      this._currentLang$.next(lang);
      localStorage.setItem(this.LANGUAGE_STORAGE_KEY, lang);
    }
  }

  /**
   * Obtiene la lista de idiomas disponibles.
   * @returns Array de idiomas disponibles.
   */
  getLanguages(): string[] {
    return this.availableLangs;
  }

  /**
   * Traduce una clave de texto.
   * @param key Clave de texto a traducir.
   * @returns Texto traducido o cadena vacía si no se encuentra.
   */
  translateKey(key: string): string {
    return this.translate.instant(key) || '';
  }
}
