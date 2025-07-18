import {
  Component,
  Input,
  OnInit,
  OnDestroy,
  SimpleChanges,
  HostListener,
  EventEmitter,
  Output,
} from '@angular/core';
import { RouterLink, RouterLinkActive, Router } from '@angular/router';
import { CommonModule } from '@angular/common';
import { OpeniisSearchInputComponent } from '../search-input';
import { OpeniisButtonComponent } from '../buttons/button.component';
import { filter } from 'rxjs/operators';
import { NavigationEnd } from '@angular/router';
import { InputVariant } from '../input';
import { ScrollService } from '../services/scroll/scroll.service';

export interface MenuItem {
  route: string;
  name: string;
  icon?: string;
  submenu?: {
    title?: string;
    items: SubmenuItem[];
  }[];
}

export interface SubmenuItem {
  route?: string;
  name: string;
  icon?: string;
  reference?: string;
  title?: string;
}

@Component({
  selector: 'openiis-sidebar',
  standalone: true,
  imports: [
    RouterLink,
    RouterLinkActive,
    CommonModule,
    OpeniisSearchInputComponent,
    OpeniisButtonComponent,
  ],
  template: `
    <!-- Botón hamburguesa para móviles -->
    @if (isMobile) {
    <openiis-button
      [type]="'icon'"
      [iconLeft]="'menu'"
      [size]="'xl'"
      [extraClasses]="'hamburger-button'"
      (clickEvent)="toggleSidebar()"
    ></openiis-button>
    }

    <!-- Overlay para móviles -->
    @if (isMobile && isOpen) {
    <div class="sidebar-overlay" (click)="closeSidebar()"></div>
    }

    <aside [class]="sidebarClasses">
      <!-- Contenido extra -->
      <ng-content></ng-content>

      @if (searchVisible) {
      <div class="search-container">
        <openiis-search-input
          [variant]="variant"
          [size]="searchSize"
          [placeholder]="searchPlaceholder"
          [searchTerm]="searchTerm"
          (searchChange)="onSearchChange($event)"
          (clearSearch)="onClearSearch()"
        />
      </div>
      }
      <!-- Main menu -->
      <nav class="nav-menu">
        @for (item of filteredMenuItems; track item.route; let i = $index) {
        <div class="menu-item-container">
          <!-- Elemento principal del menú -->
          <a
            [routerLink]="!hasSubmenu(item) ? item.route : null"
            [class.nav-item]="true"
            [class.main-item]="true"
            [class.active]="isMenuItemActive(item)"
            [class.has-submenu]="hasSubmenu(item)"
            (click)="handleItemClick(item, i)"
          >
            @if (item.icon) {
            <span
              class="material-icons-outlined nav-icon"
              [class.active]="isMenuItemActive(item)"
              >{{ item.icon }}</span
            >
            }

            <div class="nav-text-container">
              <span class="nav-text">{{ item.name }}</span>
              @if (hasSubmenu(item)) {
              <span
                class="material-icons-outlined arrow-icon"
                [class.expanded]="isExpanded(i)"
              >
                keyboard_arrow_down
              </span>
              }
            </div>
          </a>

          <!-- Submenús -->
          @if (hasSubmenu(item)) {
          <div class="submenu-container" [class.expanded]="isExpanded(i)">
            @for (submenu of item.submenu; track $index) {
            <div class="submenu-section">
              @if (submenu.title) {
              <div class="submenu-title">{{ submenu.title }}</div>
              } @for (subItem of submenu.items; track subItem.name) {
              <a
                [routerLink]="subItem.route ?? item.route"
                [fragment]="subItem.reference"
                routerLinkActive="active"
                [routerLinkActiveOptions]="{
                  exact: false,
                  matrixParams: 'ignored',
                  queryParams: 'ignored',
                  paths: 'exact',
                  fragment: 'exact'
                }"
                class="nav-item submenu-item"
                (click)="
                  navigateToRoute(
                    subItem.route ?? item.route,
                    subItem.reference
                  )
                "
              >
                @if (subItem.icon) {
                <span class="material-icons-outlined nav-icon">{{
                  subItem.icon
                }}</span>
                }
                <span class="nav-text">{{ subItem.name }}</span>
              </a>
              }
            </div>
            }
          </div>
          }
        </div>
        }
      </nav>
    </aside>
  `,
  styleUrls: ['./sidebar.component.css'],
})
export class SidebarComponent implements OnInit, OnDestroy {
  searchTerm: string = '';
  filteredMenuItems: MenuItem[] = [];

  @Input() menuItems: MenuItem[] = [];
  @Input() accordionMode: boolean = true; // Controla si solo un submenu puede estar abierto
  @Input() searchPlaceholder: string = 'Buscar...';
  @Input() searchVisible: boolean = true;
  @Input() searchSize: 'sm' | 'md' | 'lg' = 'md';
  @Input() variant: InputVariant = 'outlined';

  // Propiedades para responsive
  @Output() openChange = new EventEmitter<boolean>();
  isOpen: boolean = false;
  isMobile: boolean = false;

  constructor(private router: Router, private scrollService: ScrollService) {
    this.checkScreenSize();
  }

  @HostListener('window:resize', ['$event'])
  onResize() {
    const wasMobile = this.isMobile;
    this.checkScreenSize();

    // Si cambiamos de móvil a desktop y el sidebar estaba abierto
    if (wasMobile && !this.isMobile && this.isOpen) {
      this.scrollService.unlockBodyScroll(); // Desbloquear scroll antes de cerrar
      this.isOpen = false;
      this.openChange.emit(false);
    }
  }

  @HostListener('document:keydown.escape', ['$event'])
  onEscapeKey() {
    if (this.isMobile && this.isOpen) {
      this.closeSidebar();
    }
  }

  private checkScreenSize() {
    this.isMobile = window.innerWidth <= 820;
  }

  get sidebarClasses(): string {
    return [
      'sidebar',
      this.isMobile && this.isOpen ? 'sidebar-mobile-open' : '',
      this.isMobile && !this.isOpen ? 'sidebar-mobile-closed' : '',
    ]
      .filter(Boolean)
      .join(' ');
  }

  toggleSidebar(): void {
    this.isOpen = !this.isOpen;
    this.openChange.emit(this.isOpen);

    // Manejar body scroll lock en móviles
    if (this.isMobile) {
      if (this.isOpen) {
        this.scrollService.lockBodyScroll();
      } else {
        this.scrollService.unlockBodyScroll();
      }
    }
  }

  closeSidebar(): void {
    this.isOpen = false;
    this.openChange.emit(false);

    // Desbloquear scroll cuando se cierra en móviles
    if (this.isMobile) {
      this.scrollService.unlockBodyScroll();
    }
  }

  /**
   * Maneja los cambios en el input de menús
   * @param changes Cambios en el input de menús
   */
  ngOnChanges(changes: SimpleChanges): void {
    if (changes['menuItems']) {
      this.filteredMenuItems = [...this.menuItems];
      this.expandActiveMenus();
    }
  }

  /**
   * Maneja el cambio en el término de búsqueda
   * @param value Nuevo término de búsqueda
   */
  onSearchChange(value: string) {
    this.searchTerm = value.toLowerCase();
    this.performSearch();
    // Mantener los submenús expandidos durante la búsqueda
    if (this.searchTerm) {
      this.expandAllMatchingMenus();
    }
  }

  /**
   * Maneja la limpieza de la búsqueda
   */
  onClearSearch() {
    this.searchTerm = '';
    this.filteredMenuItems = [...this.menuItems];
    // Al limpiar, solo mantener expandido el menú activo
    this.expandedItems.clear();
    this.expandActiveMenus();
  }

  /**
   * Expande todos los menús que coinciden con el término de búsqueda
   * @private
   */
  private expandAllMatchingMenus() {
    this.filteredMenuItems.forEach((item, index) => {
      if (this.hasSubmenu(item)) {
        const hasMatch =
          item.name.toLowerCase().includes(this.searchTerm) ||
          item.submenu!.some((submenu) =>
            submenu.items.some((subItem) =>
              subItem.name.toLowerCase().includes(this.searchTerm)
            )
          );

        if (hasMatch) {
          this.expandedItems.add(index);
        }
      }
    });
  }

  /**
   * Filtra los items del menú según el término de búsqueda
   * @private
   */
  performSearch() {
    if (!this.searchTerm.trim()) {
      this.filteredMenuItems = [...this.menuItems];
      return;
    }

    this.filteredMenuItems = this.menuItems.filter((item) => {
      const matchInName = item.name.toLowerCase().includes(this.searchTerm);

      // Buscar también en submenús si existen
      const matchInSubmenu = item.submenu?.some((submenu) =>
        submenu.items.some((subItem) =>
          subItem.name.toLowerCase().includes(this.searchTerm)
        )
      );

      return matchInName || matchInSubmenu;
    });
  }

  /** Set para trackear qué items están expandidos (por índice) */
  private expandedItems = new Set<number>();

  /**
   * Inicializa el componente
   */
  ngOnInit() {
    // Inicializar los items filtrados
    this.filteredMenuItems = [...this.menuItems];

    // Expandir automáticamente los menús que contienen la ruta activa
    this.expandActiveMenus();

    // Escuchar cambios de ruta para mantener el estado expandido
    this.router.events
      .pipe(filter((event) => event instanceof NavigationEnd))
      .subscribe(() => {
        this.expandActiveMenus();
      });
  }

  /**
   * Limpia recursos cuando el componente se destruye
   */
  ngOnDestroy() {
    // Asegurar que el scroll se desbloquee si el componente se destruye
    // mientras el sidebar está abierto en móvil
    if (this.isMobile && this.isOpen) {
      this.scrollService.unlockBodyScroll();
    }
  }

  /**
   * Expande los menús que contienen la ruta activa
   * @private
   */
  private expandActiveMenus() {
    const currentUrl = this.router.url.split('#')[0];
    const currentFragment = this.router.parseUrl(this.router.url).fragment;

    this.menuItems.forEach((item, index) => {
      if (this.hasSubmenu(item)) {
        // Verificar si la ruta base coincide
        const isRouteActive = currentUrl.startsWith(item.route);

        // Verificar si algún subitem tiene una referencia activa
        const hasActiveReference =
          currentFragment &&
          item.submenu!.some((submenu) =>
            submenu.items.some(
              (subItem) => subItem.reference === currentFragment
            )
          );

        if (isRouteActive || hasActiveReference) {
          this.expandedItems.add(index);
        }
      }
    });
  }

  /**
   * Verifica si un item tiene submenú
   * @param item Item del menú a verificar
   * @returns true si tiene submenú
   */
  hasSubmenu(item: MenuItem): boolean {
    return !!(item.submenu && item.submenu.length > 0);
  }

  /**
   * Verifica si un menú está expandido
   * @param index Índice del menú
   * @returns true si está expandido
   */
  isExpanded(index: number): boolean {
    return this.expandedItems.has(index);
  }

  /**
   * Verifica si un item del menú principal debe verse activo
   * @param item Item del menú a verificar
   * @returns true si debe verse activo
   */
  isMenuItemActive(item: MenuItem): boolean {
    const currentUrl = this.router.url.split('#')[0];

    // Si no tiene submenu, verificar si la ruta actual coincide exactamente
    if (!this.hasSubmenu(item)) {
      return currentUrl === item.route;
    }

    // Si tiene submenu, verificar si la ruta base está activa
    return currentUrl.startsWith(item.route);
  }

  /**
   * Maneja el click en un item del menú
   * @param item Item clickeado
   * @param index Índice del item
   */
  handleItemClick(item: MenuItem, index: number) {
    if (this.hasSubmenu(item)) {
      // Toggle submenu
      this.toggleSubmenu(index);
    } else {
      // Navegar a la ruta
      this.navigateToRoute(item.route);

      // Auto-cerrar en móviles después de hacer clic
      if (this.isMobile) {
        this.closeSidebar();
      }
    }
  }

  /**
   * Alterna el estado expandido/colapsado de un submenú
   * @param index Índice del submenú
   */
  toggleSubmenu(index: number) {
    if (this.isExpanded(index)) {
      this.expandedItems.delete(index);
    } else {
      // Si está en modo acordeón, cerrar otros submenús ANTES de abrir el nuevo
      if (this.accordionMode) {
        // Crear un nuevo Set con solo el item que queremos abrir
        // Esto cierra todos los demás y abre solo el nuevo de manera sincronizada
        this.expandedItems = new Set([index]);
      } else {
        this.expandedItems.add(index);
      }
    }
  }

  /**
   * Navega a una ruta o referencia específica
   * @param route Ruta a navegar
   * @param reference Referencia opcional (id del elemento)
   */
  navigateToRoute(route: string, reference?: string) {
    if (reference) {
      // Navegar con fragmento
      this.router.navigate([route], { fragment: reference });
    } else {
      // Navegar sin fragmento
      this.router.navigate([route]);
    }

    // Auto-cerrar en móviles después de navegar
    if (this.isMobile) {
      this.closeSidebar();
    }
  }

  /**
   * Verifica si una ruta está activa, considerando también las referencias
   * @param route Ruta a verificar
   * @param reference Referencia opcional
   * @returns true si la ruta está activa
   */
  isActiveRoute(route: string, reference?: string): boolean {
    const currentUrl = this.router.url;
    const isRouteActive =
      currentUrl === route ||
      (route !== '/' && currentUrl.startsWith(route + '/'));

    if (!reference || !isRouteActive) {
      return isRouteActive;
    }

    // Si hay una referencia y la ruta está activa, verificar si el elemento está visible
    const element = document.getElementById(reference);
    if (!element) return false;

    const rect = element.getBoundingClientRect();
    return rect.top >= 0 && rect.bottom <= window.innerHeight;
  }

  /**
   * Verifica si un item con submenú tiene algún subitem activo
   * @param item Item a verificar
   * @returns true si tiene algún subitem activo
   */
  isSubmenuActive(item: MenuItem): boolean {
    if (!this.hasSubmenu(item)) return false;

    return item.submenu!.some((submenu) =>
      submenu.items.some((subItem) =>
        this.isActiveRoute(subItem.route ?? item.route, subItem.reference)
      )
    );
  }
}
