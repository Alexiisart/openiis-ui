import { Injectable } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';
import { BehaviorSubject, Observable } from 'rxjs';

/* ===== SERVICIO DE IDIOMA ===== */
@Injectable({
  providedIn: 'root',
})
export class LanguageService {
  private availableLangs = ['cn', 'en', 'es'];
  private defaultLang = 'es';
  private readonly LANGUAGE_STORAGE_KEY = 'openiis-language';

  private _currentLang$ = new BehaviorSubject<string>(this.defaultLang);

  constructor(private translate: TranslateService) {
    this.initializeLanguage();
  }

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

  get currentLang$(): Observable<string> {
    return this._currentLang$.asObservable();
  }

  get currentLang(): string {
    return this._currentLang$.value;
  }

  setLanguage(lang: string): void {
    if (this.availableLangs.includes(lang)) {
      this.translate.use(lang);
      this._currentLang$.next(lang);
      localStorage.setItem(this.LANGUAGE_STORAGE_KEY, lang);
    }
  }

  getLanguages(): string[] {
    return this.availableLangs;
  }

  translateKey(key: string): string {
    return this.translate.instant(key) || '';
  }
}
