import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { Observable } from 'rxjs';

export type ThemeMode = 'light' | 'dark';

/**
 * Servicio para gestionar el modo claro/oscuro
 */
@Injectable({
  providedIn: 'root',
})
export class OpeniisModeService {
  private readonly MODE_STORAGE_KEY = 'openiis-theme-mode';
  private _currentMode$ = new BehaviorSubject<ThemeMode>('light');

  constructor() {
    this.initializeMode();
  }

  /**
   * Observable del modo actual (claro/oscuro)
   */
  get currentMode$(): Observable<ThemeMode> {
    return this._currentMode$.asObservable();
  }

  /**
   * Obtiene el modo actual
   */
  getCurrentMode(): ThemeMode {
    return this._currentMode$.value;
  }

  /**
   * Establece el modo (claro/oscuro)
   */
  setMode(mode: ThemeMode): void {
    this._currentMode$.next(mode);
    localStorage.setItem(this.MODE_STORAGE_KEY, mode);
    this.applyMode();
  }

  /**
   * Alterna entre modo claro y oscuro
   */
  toggleMode(): void {
    const newMode = this._currentMode$.value === 'light' ? 'dark' : 'light';
    this.setMode(newMode);
  }

  /**
   * Inicializa el modo desde localStorage o detecta preferencias del sistema
   */
  private initializeMode(): void {
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

    this.applyMode();
  }

  /**
   * Aplica el modo al DOM
   */
  private applyMode(): void {
    const mode = this._currentMode$.value;
    document.body.setAttribute('data-theme', mode);
  }
}
