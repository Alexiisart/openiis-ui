import { Component, OnInit, OnDestroy } from '@angular/core';
import { RouterOutlet, Router, NavigationEnd } from '@angular/router';
import { SidebarComponent } from '../components/sidebar/sidebar.component';
import { menuItems } from './sidebar';
import { filter, takeUntil } from 'rxjs/operators';
import { Subject, Subscription } from 'rxjs';
import {
  OpeniisTheme,
  OpeniisThemeService,
  ThemeMode,
} from '../services/theme.service';
import { OpeniisDropdownComponent } from '../components/dropdowns/dropdown.component';

@Component({
  selector: 'app-layout',
  standalone: true,
  imports: [RouterOutlet, SidebarComponent, OpeniisDropdownComponent],
  templateUrl: './layout.component.html',
  styleUrls: ['./layout.component.css'],
})
export class LayoutComponent implements OnInit, OnDestroy {
  menuItems = menuItems;
  private subscription: Subscription = new Subscription();

  dropdownOptions = [
    { value: 'classic', label: 'Clásico' },
    { value: 'neutral', label: 'Neutro' },
    { value: 'vivid', label: 'Vivido' },
  ];

  selectedDropdownValue: string = '';

  /* ===== DROPDOWN METHODS ===== */
  onDropdownChange(value: string): void {
    this.selectedDropdownValue = value;
    this.setTheme(value as OpeniisTheme);
    console.log('Dropdown cambiado:', value);
  }

  /* ===== THEME SECTION ===== */
  private destroy$ = new Subject<void>();
  currentThemeMode: ThemeMode = 'light';
  isDarkMode = false;
  currentTheme: OpeniisTheme = 'classic';

  setTheme(theme: OpeniisTheme): void {
    this.themeService.setTheme(theme);
  }

  toggleDarkMode(): void {
    this.themeService.toggleMode();
  }

  /* ===== LOGO SECTION ===== */
  get logoSrc(): string {
    return this.isDarkMode ? 'assets/logo-dark.svg' : 'assets/logo.svg';
  }

  get sublogoSrc(): string {
    return this.isDarkMode ? 'assets/sublogo-dark.svg' : 'assets/sublogo.svg';
  }

  ngOnDestroy() {
    this.subscription.unsubscribe();
  }

  constructor(
    private router: Router,
    private themeService: OpeniisThemeService
  ) {
    this.themeService.currentTheme$.subscribe((theme) => {
      this.currentTheme = theme;
    });
  }

  ngOnInit() {
    this.selectedDropdownValue = this.currentTheme;
    this.themeService.currentMode$
      .pipe(takeUntil(this.destroy$))
      .subscribe((mode) => {
        this.currentThemeMode = mode;
        this.isDarkMode = mode === 'dark';
      });
    // Escuchar cambios de navegación para hacer scroll a los fragmentos
    this.subscription.add(
      this.router.events
        .pipe(filter((event) => event instanceof NavigationEnd))
        .subscribe((event: NavigationEnd) => {
          // Obtener el fragmento de la URL
          const fragment = this.router.parseUrl(this.router.url).fragment;
          if (fragment) {
            // Pequeño delay para asegurar que el contenido se haya renderizado
            setTimeout(() => {
              const element = document.getElementById(fragment);
              if (element) {
                element.scrollIntoView({
                  behavior: 'smooth',
                  block: 'start',
                  inline: 'nearest',
                });
              }
            }, 100);
          }
        })
    );
  }
}
