import { Component } from '@angular/core';
import { OpeniisDropdownComponent } from '../../components/dropdowns/dropdown.component';
import {
  OpeniisTheme,
  OpeniisThemeService,
  ThemeMode,
} from '../../services/theme.service';
import { Subscription } from 'rxjs';
import { OpeniisSwitchComponent } from '../../components';

@Component({
  selector: 'app-header-sec',
  standalone: true,
  imports: [OpeniisDropdownComponent, OpeniisSwitchComponent],
  template: `
    <div class="header-container">
      <div class="logo-container">
        <img [src]="logoSrc" alt="Checkliist" class="main-logo" />
        <img [src]="sublogoSrc" alt="" class="sub-logo" />
      </div>

      <!-- Botón de modo oscuro y temas -->
      <div class="theme-container">
        <openiis-dropdown
          [options]="themeOptions"
          [selectedValue]="selectedTheme"
          size="sm"
          tooltip="Cambiar tema"
          tooltipPosition="left"
          (selectionChanged)="onThemeChange($event)"
        >
        </openiis-dropdown>
        <openiis-switch
          [checked]="isDarkMode"
          size="sm"
          variant="primary"
          [label]="isDarkMode ? 'Oscuro' : 'Claro'"
          (checkedChange)="onModeChange($event)"
        >
        </openiis-switch>
      </div>
    </div>
  `,
  styles: `
    .header-container {
      background: var(--color-surface);
      border-bottom: 1px solid var(--color-border);
      border-left: 1px solid var(--color-border);
      padding: var(--space-6);
      border-bottom-left-radius:var(--radius-xl);
      display: flex;
      flex-direction: row;
      justify-content: space-between;
      align-items: center;
    }

    
.logo-container {
  display: flex;
  flex-direction: row;
  gap: var(--space-4);
}

.main-logo {
  width: 100px;
  height: auto;
  transition: all 0.15s cubic-bezier(0.4, 0, 0.2, 1);
}

.main-logo:hover {
  transform: scale(1.05);
}

.sub-logo {
  width: 100px;
  height: auto;
  transition: all 0.15s cubic-bezier(0.4, 0, 0.2, 1);
}

.sub-logo:hover {
  transform: scale(1.02);
}

.theme-container {
  display: flex;
  gap: var(--space-4);
  align-items: center;
}

  `,
})
export class HeaderSecComponent {
  private subscription: Subscription = new Subscription();

  /* ===== THEME SECTION ===== */
  currentMode: ThemeMode = 'light';
  currentTheme: OpeniisTheme = 'classic';
  isDarkMode = false;

  setTheme(theme: OpeniisTheme): void {
    this.themeService.setTheme(theme);
  }

  setMode(mode: ThemeMode): void {
    this.themeService.setMode(mode);
  }

  themeOptions = [
    { value: 'classic', label: 'Clásico' },
    { value: 'neutral', label: 'Neutro' },
    { value: 'vivid', label: 'Vivido' },
  ];

  modeOptions = [
    { value: 'light', label: 'Claro' },
    { value: 'dark', label: 'Oscuro' },
  ];

  selectedTheme: string = '';
  selectedMode: string = '';

  /* ===== DROPDOWN METHODS ===== */
  onThemeChange(value: string): void {
    this.selectedTheme = value;
    this.setTheme(value as OpeniisTheme);
  }

  onModeChange(value: boolean): void {
    this.selectedMode = value ? 'dark' : 'light';
    this.setMode(this.selectedMode as ThemeMode);
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

  constructor(private themeService: OpeniisThemeService) {
    this.themeService.currentTheme$.subscribe((theme) => {
      this.currentTheme = theme;
    });
    this.themeService.currentMode$.subscribe((mode) => {
      this.currentMode = mode;
      this.isDarkMode = mode === 'dark';
    });
  }

  ngOnInit() {
    this.selectedTheme = this.currentTheme;
    this.selectedMode = this.currentMode;
  }
}
