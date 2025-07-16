import { Component, HostListener, Input } from '@angular/core';
import { OpeniisDropdownComponent } from '../../components/dropdowns/dropdown.component';
import {
  OpeniisTheme,
  OpeniisThemeService,
  ThemeMode,
} from '../../components/services/theme.service';
import { Subscription } from 'rxjs';
import { OpeniisSwitchComponent } from '../../components';
import { TranslateModule, TranslateService } from '@ngx-translate/core';
import { LanguageService } from '../service/language.service';
import { SidebarComponent } from '../../components/sidebar/sidebar.component';

@Component({
  selector: 'app-header-sec',
  standalone: true,
  imports: [
    OpeniisDropdownComponent,
    OpeniisSwitchComponent,
    TranslateModule,
    SidebarComponent,
  ],
  template: `
    <div class="header-container">
      @if (isMobile) {
      <openiis-sidebar
        searchPlaceholder="{{ 'menu.buscar' | translate }}"
        searchSize="sm"
        [menuItems]="SidebarData"
        class="sidebar"
      >
        <!-- Dropdown de tema -->
        <div class="language-container">
          <openiis-dropdown
            [options]="themeOptions"
            [selectedValue]="selectedTheme"
            size="sm"
            tooltipPosition="left"
            (selectionChanged)="onThemeChange($event)"
          >
          </openiis-dropdown>

          <!-- Dropdown de idioma -->
          <openiis-dropdown
            [options]="languageOptions"
            [selectedValue]="selectedLanguage"
            size="sm"
            tooltipPosition="left"
            (selectionChanged)="onLanguageChange($event)"
          >
          </openiis-dropdown>
        </div>
      </openiis-sidebar>
      }
      <div class="logo-container">
        <img [src]="sublogoSrc" alt="" class="sub-logo" />
      </div>

      <!-- Botón de modo oscuro y temas -->
      <div class="theme-container">
        @if (!isMobile) {
        <openiis-dropdown
          [options]="themeOptions"
          [selectedValue]="selectedTheme"
          size="sm"
          [tooltip]="'header.cambiar_tema' | translate"
          tooltipPosition="left"
          (selectionChanged)="onThemeChange($event)"
        >
        </openiis-dropdown>
        }

        <openiis-switch
          [checked]="isDarkMode"
          size="sm"
          variant="primary"
          [label]="(isDarkMode ? 'header.oscuro' : 'header.claro') | translate"
          (checkedChange)="onModeChange($event)"
        >
        </openiis-switch>

        @if (!isMobile) {
        <div class="language-container">
          <openiis-dropdown
            [options]="languageOptions"
            [selectedValue]="selectedLanguage"
            size="sm"
            [tooltip]="'header.cambiar_idioma' | translate"
            tooltipPosition="left"
            (selectionChanged)="onLanguageChange($event)"
          >
          </openiis-dropdown>
        </div>
        }
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

.sub-logo {
  width: 100px;
  height: auto;
  transition: all 0.15s cubic-bezier(0.4, 0, 0.2, 1);
}

.theme-container {
  display: flex;
  gap: var(--space-4);
  align-items: center;
}

.language-container {
  padding-left: var(--space-4);
  border-left: 1px solid var(--color-border);
}

@media (max-width: 820px) {
  .sub-logo {
    width: 80px;
  }

  .header-container {
    padding: 0 var(--space-4);
  }

  .language-container {
    padding-left: var(--space-2);
    padding-bottom: var(--space-2);
    border-left: none;
    display: flex;
    gap: var(--space-2);
  }
}
  `,
})
export class HeaderSecComponent {
  private subscription: Subscription = new Subscription();
  themeOptions: Array<{ value: string; label: string }> = [];
  languageOptions: Array<{ value: string; label: string }> = [];

  @Input() SidebarData: any;

  /* ===== SECCIÓN DE TEMA ===== */
  currentMode: ThemeMode = 'light';
  currentTheme: OpeniisTheme = 'classic';
  currentLanguage: string = 'es';
  isDarkMode = false;

  setTheme(theme: OpeniisTheme): void {
    this.themeService.setTheme(theme);
  }

  setMode(mode: ThemeMode): void {
    this.themeService.setMode(mode);
  }

  setLanguage(language: string): void {
    this.languageService.setLanguage(language);
  }

  private setTranslatedOptions() {
    this.themeOptions = [
      {
        value: 'classic',
        label: this.translate.instant('header.clasico'),
      },
      {
        value: 'neutral',
        label: this.translate.instant('header.neutro'),
      },
      {
        value: 'vivid',
        label: this.translate.instant('header.vivido'),
      },
    ];

    this.languageOptions = [
      {
        value: 'es',
        label: this.translate.instant('header.es'),
      },
      {
        value: 'en',
        label: this.translate.instant('header.en'),
      },
      {
        value: 'cn',
        label: this.translate.instant('header.cn'),
      },
    ];
  }

  selectedTheme: string = '';
  selectedMode: string = '';
  selectedLanguage: string = '';
  isMobile: boolean = false;

  /* ===== DROPDOWN METHODS ===== */
  onThemeChange(value: string): void {
    this.selectedTheme = value;
    this.setTheme(value as OpeniisTheme);
  }

  onModeChange(value: boolean): void {
    this.selectedMode = value ? 'dark' : 'light';
    this.setMode(this.selectedMode as ThemeMode);
  }

  onLanguageChange(value: string): void {
    this.selectedLanguage = value;
    this.languageService.setLanguage(value);
  }

  get sublogoSrc(): string {
    return this.isDarkMode ? 'assets/sublogo-dark.svg' : 'assets/sublogo.svg';
  }

  ngOnDestroy() {
    this.subscription.unsubscribe();
  }

  constructor(
    private themeService: OpeniisThemeService,
    private languageService: LanguageService,
    private translate: TranslateService
  ) {
    this.themeService.currentTheme$.subscribe((theme) => {
      this.currentTheme = theme;
    });
    this.themeService.currentMode$.subscribe((mode) => {
      this.currentMode = mode;
      this.isDarkMode = mode === 'dark';
    });
    this.languageService.currentLang$.subscribe((lang) => {
      this.currentLanguage = lang;
    });

    this.translate.onLangChange.subscribe(() => {
      this.setTranslatedOptions();
    });

    this.setTranslatedOptions();
  }

  ngOnInit() {
    this.selectedTheme = this.currentTheme;
    this.selectedMode = this.currentMode;
    this.selectedLanguage = this.currentLanguage;
    this.onResize();
  }

  @HostListener('window:resize', ['$event'])
  onResize() {
    this.isMobile = window.innerWidth <= 820;
  }
}
