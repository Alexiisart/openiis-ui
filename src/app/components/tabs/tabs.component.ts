import {
  Component,
  Input,
  Output,
  EventEmitter,
  OnInit,
  OnDestroy,
  ViewChild,
  ElementRef,
  AfterViewInit,
  ContentChildren,
  QueryList,
} from '@angular/core';
import { CommonModule } from '@angular/common';
import { Subject } from 'rxjs';

export type TabsVariant = 'line' | 'pills' | 'cards' | 'buttons';
export type TabsPosition = 'top' | 'bottom' | 'left' | 'right';
export type TabsSize = 'sm' | 'md' | 'lg';
export type TabsJustify =
  | 'start'
  | 'center'
  | 'end'
  | 'space-between'
  | 'space-around';

export interface TabItem {
  id: string;
  label: string;
  active?: boolean;
  disabled?: boolean;
  removable?: boolean;
  icon?: string;
  badge?: string | number;
  tooltip?: string;
  lazy?: boolean;
  [key: string]: any;
}

// Individual Tab Component
@Component({
  selector: 'openiis-tab',
  standalone: true,
  imports: [CommonModule],
  template: `
    <div class="tab-content" [class.active]="active">
      <ng-content></ng-content>
    </div>
  `,
  styles: [
    `
      .tab-content {
        display: none;
      }
      .tab-content.active {
        display: block;
      }
    `,
  ],
})
export class OpeniisTabComponent {
  @Input() tabId: string = '';
  @Input() active: boolean = false;
}

@Component({
  selector: 'openiis-tabs',
  standalone: true,
  imports: [CommonModule],
  template: `
    <div class="tabs" [class]="getClasses()">
      <!-- Tab Navigation -->
      <div
        class="tabs-nav"
        [class]="getNavClasses()"
        role="tablist"
        [attr.aria-label]="ariaLabel"
      >
        <div class="tabs-nav-wrapper" #tabsNavWrapper>
          @for (tab of tabs; track tab.id; let i = $index) {
          <button
            class="tab-item"
            [class.active]="tab.active"
            [class.disabled]="tab.disabled"
            [class.removable]="tab.removable"
            [attr.id]="'tab-' + tab.id"
            [attr.aria-controls]="'panel-' + tab.id"
            [attr.aria-selected]="tab.active"
            [attr.tabindex]="tab.active ? 0 : -1"
            [attr.title]="tab.tooltip"
            [disabled]="tab.disabled"
            type="button"
            role="tab"
            (click)="selectTab(tab.id)"
            (keydown)="onTabKeyDown($event, i)"
          >
            @if (tab.icon) {
            <span
              class="material-icons-outlined tab-icon"
              [attr.aria-hidden]="true"
              >{{ tab.icon }}</span
            >
            }
            <span class="tab-label">{{ tab.label }}</span>
            @if (tab.badge) {
            <span class="tab-badge">{{ tab.badge }}</span>
            } @if (tab.removable && !tab.disabled) {
            <button
              class="tab-remove"
              type="button"
              [attr.aria-label]="'Cerrar ' + tab.label"
              (click)="removeTab(tab.id, $event)"
              (keydown)="onRemoveKeyDown($event, tab.id)"
            >
              <span class="material-icons-outlined" [attr.aria-hidden]="true"
                >close</span
              >
            </button>
            }
          </button>
          }
        </div>

        <!-- Scroll Buttons -->
        @if (showScrollButtons && canScrollLeft) {
        <button
          class="tab-scroll-left"
          type="button"
          [attr.aria-label]="'Desplazar pestañas hacia la izquierda'"
          (click)="scrollTabs('left')"
        >
          <span class="material-icons-outlined" [attr.aria-hidden]="true"
            >chevron_left</span
          >
        </button>
        } @if (showScrollButtons && canScrollRight) {
        <button
          class="tab-scroll-right"
          type="button"
          [attr.aria-label]="'Desplazar pestañas hacia la derecha'"
          (click)="scrollTabs('right')"
        >
          <span class="material-icons-outlined" [attr.aria-hidden]="true"
            >chevron_right</span
          >
        </button>
        }

        <!-- Add Tab Button -->
        @if (allowAddTab) {
        <button
          class="tab-add"
          type="button"
          [attr.aria-label]="'Agregar nueva pestaña'"
          (click)="addTab()"
        >
          <span class="material-icons-outlined" [attr.aria-hidden]="true"
            >add</span
          >
        </button>
        }
      </div>

      <!-- Tab Content -->
      <div class="tabs-content" [class]="getContentClasses()">
        @for (tab of tabs; track tab.id) {
        <div
          class="tab-panel"
          [class.active]="tab.active"
          [attr.id]="'panel-' + tab.id"
          [attr.aria-labelledby]="'tab-' + tab.id"
          [attr.aria-hidden]="!tab.active"
          [attr.tabindex]="tab.active ? 0 : -1"
          role="tabpanel"
        >
          @if (!tab.lazy || tab.active || hasBeenActive(tab.id)) {
          <ng-content select="[slot=tab-content-{{ tab.id }}]"></ng-content>
          }
        </div>
        }
      </div>
    </div>
  `,
  styleUrls: ['./tabs.component.css'],
  host: {
    '[class.tabs-host]': 'true',
  },
})
export class OpeniisTabsComponent implements OnInit, OnDestroy, AfterViewInit {
  @Input() variant: TabsVariant = 'line';
  @Input() position: TabsPosition = 'top';
  @Input() size: TabsSize = 'md';
  @Input() justify: TabsJustify = 'start';
  @Input() tabs: TabItem[] = [];
  @Input() activeTab?: string;
  @Input() scrollable = false;
  @Input() allowAddTab = false;
  @Input() ariaLabel = 'Pestañas';
  @Input() destroyInactiveTabContent = false;
  @Input() animation = true;
  @Input() customClass?: string;

  @Output() tabChange = new EventEmitter<string>();
  @Output() tabRemove = new EventEmitter<string>();
  @Output() tabAdd = new EventEmitter<void>();
  @Output() tabsReorder = new EventEmitter<TabItem[]>();

  @ViewChild('tabsNavWrapper', { static: false }) tabsNavWrapper!: ElementRef;
  @ContentChildren(OpeniisTabComponent)
  tabComponents!: QueryList<OpeniisTabComponent>;

  private destroy$ = new Subject<void>();
  private activatedTabs = new Set<string>();

  showScrollButtons = false;
  canScrollLeft = false;
  canScrollRight = false;

  ngOnInit() {
    // Si no hay tabs definidos, crear algunos por defecto para la demo
    if (this.tabs.length === 0) {
      this.tabs = [
        { id: 'tab1', label: 'General', active: true, icon: 'settings' },
        { id: 'tab2', label: 'Perfil', icon: 'person' },
        {
          id: 'tab3',
          label: 'Notificaciones',
          icon: 'notifications',
          badge: '3',
        },
        { id: 'tab4', label: 'Seguridad', icon: 'security' },
      ];
    }

    this.initializeTabs();
    this.updateScrollButtons();
  }

  ngAfterViewInit() {
    this.setupScrollListeners();
    this.updateScrollButtons();
  }

  ngOnDestroy() {
    this.destroy$.next();
    this.destroy$.complete();
  }

  getClasses(): string {
    const classes = ['tabs'];

    classes.push(`tabs-${this.variant}`);
    classes.push(`tabs-${this.position}`);
    classes.push(`tabs-${this.size}`);
    classes.push(`tabs-justify-${this.justify}`);

    if (this.scrollable) classes.push('tabs-scrollable');
    if (this.allowAddTab) classes.push('tabs-addable');
    if (!this.animation) classes.push('tabs-no-animation');
    if (this.customClass) classes.push(this.customClass);

    return classes.join(' ');
  }

  getNavClasses(): string {
    const classes = ['tabs-nav'];

    if (this.position === 'left' || this.position === 'right') {
      classes.push('tabs-nav-vertical');
    } else {
      classes.push('tabs-nav-horizontal');
    }

    return classes.join(' ');
  }

  getContentClasses(): string {
    const classes = ['tabs-content'];

    if (this.position === 'left' || this.position === 'right') {
      classes.push('tabs-content-vertical');
    } else {
      classes.push('tabs-content-horizontal');
    }

    return classes.join(' ');
  }

  initializeTabs(): void {
    if (this.tabs.length === 0) return;

    // Set active tab
    const activeTabExists = this.tabs.some((tab) => tab.active);

    if (this.activeTab) {
      this.selectTab(this.activeTab);
    } else if (!activeTabExists) {
      const firstEnabledTab = this.tabs.find((tab) => !tab.disabled);
      if (firstEnabledTab) {
        this.selectTab(firstEnabledTab.id);
      }
    }
  }

  selectTab(tabId: string): void {
    const tab = this.tabs.find((t) => t.id === tabId);
    if (!tab || tab.disabled) return;

    // Update active states
    this.tabs.forEach((t) => (t.active = t.id === tabId));

    // Track activated tabs for lazy loading
    this.activatedTabs.add(tabId);

    // Update tab components
    this.tabComponents.forEach((component) => {
      component.active = component.tabId === tabId;
    });

    this.tabChange.emit(tabId);
    this.scrollToActiveTab();
  }

  removeTab(tabId: string, event: Event): void {
    event.preventDefault();
    event.stopPropagation();

    const tabIndex = this.tabs.findIndex((tab) => tab.id === tabId);
    if (tabIndex === -1) return;

    const tab = this.tabs[tabIndex];
    const wasActive = tab.active;

    // Remove tab
    this.tabs.splice(tabIndex, 1);

    // If removed tab was active, select another tab
    if (wasActive && this.tabs.length > 0) {
      const newActiveIndex = Math.min(tabIndex, this.tabs.length - 1);
      const newActiveTab = this.tabs[newActiveIndex];
      if (newActiveTab) {
        this.selectTab(newActiveTab.id);
      }
    }

    this.tabRemove.emit(tabId);
    this.updateScrollButtons();
  }

  addTab(): void {
    this.tabAdd.emit();
  }

  hasBeenActive(tabId: string): boolean {
    return this.activatedTabs.has(tabId);
  }

  onTabKeyDown(event: KeyboardEvent, index: number): void {
    let newIndex = index;

    switch (event.key) {
      case 'ArrowRight':
      case 'ArrowDown':
        event.preventDefault();
        newIndex = this.findNextEnabledTab(index);
        break;
      case 'ArrowLeft':
      case 'ArrowUp':
        event.preventDefault();
        newIndex = this.findPreviousEnabledTab(index);
        break;
      case 'Home':
        event.preventDefault();
        newIndex = this.findFirstEnabledTab();
        break;
      case 'End':
        event.preventDefault();
        newIndex = this.findLastEnabledTab();
        break;
      case 'Enter':
      case ' ':
        event.preventDefault();
        this.selectTab(this.tabs[index].id);
        return;
      default:
        return;
    }

    if (newIndex !== index && newIndex >= 0 && newIndex < this.tabs.length) {
      this.focusTab(newIndex);
    }
  }

  findNextEnabledTab(currentIndex: number): number {
    for (let i = currentIndex + 1; i < this.tabs.length; i++) {
      if (!this.tabs[i].disabled) return i;
    }
    return this.findFirstEnabledTab();
  }

  findPreviousEnabledTab(currentIndex: number): number {
    for (let i = currentIndex - 1; i >= 0; i--) {
      if (!this.tabs[i].disabled) return i;
    }
    return this.findLastEnabledTab();
  }

  onRemoveKeyDown(event: KeyboardEvent, tabId: string): void {
    if (event.key === 'Enter' || event.key === ' ') {
      event.preventDefault();
      this.removeTab(tabId, event);
    }
  }

  findFirstEnabledTab(): number {
    for (let i = 0; i < this.tabs.length; i++) {
      if (!this.tabs[i].disabled) return i;
    }
    return 0;
  }

  findLastEnabledTab(): number {
    for (let i = this.tabs.length - 1; i >= 0; i--) {
      if (!this.tabs[i].disabled) return i;
    }
    return this.tabs.length - 1;
  }

  focusTab(index: number): void {
    const tabElement = document.getElementById(`tab-${this.tabs[index].id}`);
    if (tabElement) {
      tabElement.focus();
    }
  }

  setupScrollListeners(): void {
    if (!this.scrollable || !this.tabsNavWrapper) return;

    const wrapper = this.tabsNavWrapper.nativeElement;
    wrapper.addEventListener('scroll', () => {
      this.updateScrollButtons();
    });

    // Watch for resize
    const resizeObserver = new ResizeObserver(() => {
      this.updateScrollButtons();
    });
    resizeObserver.observe(wrapper);
  }

  updateScrollButtons(): void {
    if (!this.scrollable || !this.tabsNavWrapper) {
      this.showScrollButtons = false;
      return;
    }

    const wrapper = this.tabsNavWrapper.nativeElement;
    const isHorizontal = this.position === 'top' || this.position === 'bottom';

    if (isHorizontal) {
      this.showScrollButtons = wrapper.scrollWidth > wrapper.clientWidth;
      this.canScrollLeft = wrapper.scrollLeft > 0;
      this.canScrollRight =
        wrapper.scrollLeft < wrapper.scrollWidth - wrapper.clientWidth;
    } else {
      this.showScrollButtons = wrapper.scrollHeight > wrapper.clientHeight;
      this.canScrollLeft = wrapper.scrollTop > 0;
      this.canScrollRight =
        wrapper.scrollTop < wrapper.scrollHeight - wrapper.clientHeight;
    }
  }

  scrollTabs(direction: 'left' | 'right'): void {
    if (!this.tabsNavWrapper) return;

    const wrapper = this.tabsNavWrapper.nativeElement;
    const isHorizontal = this.position === 'top' || this.position === 'bottom';
    const scrollAmount = 200;

    if (isHorizontal) {
      const scrollLeft = direction === 'left' ? -scrollAmount : scrollAmount;
      wrapper.scrollBy({ left: scrollLeft, behavior: 'smooth' });
    } else {
      const scrollTop = direction === 'left' ? -scrollAmount : scrollAmount;
      wrapper.scrollBy({ top: scrollTop, behavior: 'smooth' });
    }
  }

  scrollToActiveTab(): void {
    if (!this.scrollable || !this.tabsNavWrapper) return;

    const activeTab = this.tabs.find((tab) => tab.active);
    if (!activeTab) return;

    const activeTabElement = document.getElementById(`tab-${activeTab.id}`);
    if (activeTabElement) {
      activeTabElement.scrollIntoView({ behavior: 'smooth', block: 'nearest' });
    }
  }

  // Public methods
  getActiveTab(): TabItem | null {
    return this.tabs.find((tab) => tab.active) || null;
  }

  addTabItem(tab: TabItem): void {
    this.tabs.push(tab);
    if (tab.active) {
      this.selectTab(tab.id);
    }
    this.updateScrollButtons();
  }

  removeTabItem(tabId: string): void {
    const event = new Event('remove');
    this.removeTab(tabId, event);
  }

  updateTab(tabId: string, updates: Partial<TabItem>): void {
    const tab = this.tabs.find((t) => t.id === tabId);
    if (tab) {
      Object.assign(tab, updates);
      if (updates.active) {
        this.selectTab(tabId);
      }
    }
  }

  moveTab(fromIndex: number, toIndex: number): void {
    if (
      fromIndex === toIndex ||
      fromIndex < 0 ||
      toIndex < 0 ||
      fromIndex >= this.tabs.length ||
      toIndex >= this.tabs.length
    ) {
      return;
    }

    const tab = this.tabs.splice(fromIndex, 1)[0];
    this.tabs.splice(toIndex, 0, tab);
    this.tabsReorder.emit([...this.tabs]);
    this.updateScrollButtons();
  }

  enableTab(tabId: string): void {
    const tab = this.tabs.find((t) => t.id === tabId);
    if (tab) {
      tab.disabled = false;
    }
  }

  disableTab(tabId: string): void {
    const tab = this.tabs.find((t) => t.id === tabId);
    if (tab) {
      tab.disabled = true;
      if (tab.active) {
        const firstEnabledTab = this.tabs.find(
          (t) => !t.disabled && t.id !== tabId
        );
        if (firstEnabledTab) {
          this.selectTab(firstEnabledTab.id);
        }
      }
    }
  }
}
