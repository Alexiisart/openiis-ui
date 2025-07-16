import {
  Component,
  Input,
  Output,
  EventEmitter,
  OnInit,
  ElementRef,
  ViewChild,
  AfterViewInit,
} from '@angular/core';
import { CommonModule } from '@angular/common';

export type TabsVariant = 'line' | 'pills' | 'cards' | 'buttons';
export type TabsSize = 'sm' | 'md' | 'lg';

export interface TabItem {
  id: string;
  label: string;
  active?: boolean;
  disabled?: boolean;
  icon?: string;
  badge?: string | number;
  tooltip?: string;
}

@Component({
  selector: 'openiis-tabs',
  standalone: true,
  imports: [CommonModule],
  template: `
    <div class="tabs" [class]="getTabsClasses()">
      <!-- Tab Navigation -->
      <div class="tabs-nav" role="tablist">
        <div class="tabs-nav-scroll">
          @for (tab of tabs; track tab.id; let i = $index) {
          <button
            class="tab-item"
            [class.active]="tab.active"
            [class.disabled]="tab.disabled"
            [attr.id]="'tab-' + tab.id"
            [attr.aria-controls]="'panel-' + tab.id"
            [attr.aria-selected]="tab.active"
            [attr.tabindex]="tab.active ? 0 : -1"
            [attr.title]="tab.tooltip"
            [disabled]="tab.disabled"
            type="button"
            role="tab"
            (click)="selectTab(tab.id)"
          >
            @if (tab.icon) {
            <span class="material-icons-outlined tab-icon">{{ tab.icon }}</span>
            }
            <span class="tab-label">{{ tab.label }}</span>
            @if (tab.badge) {
            <span class="tab-badge">{{ tab.badge }}</span>
            }
          </button>
          }
        </div>
      </div>

      <!-- Tab Content -->
      <div class="tabs-content" #tabsContent>
        <ng-content></ng-content>
      </div>
    </div>
  `,
  styles: `
    .tabs {
      display: flex;
      flex-direction: column;
      width: 100%;
      border-radius: var(--radius-lg);
      overflow: hidden;
    }

    .tabs-nav {
      display: flex;
      overflow: hidden;
    }

    .tabs-nav-scroll {
      display: flex;
      overflow-x: auto;
      scrollbar-width: thin;
      -webkit-overflow-scrolling: touch;
      padding-bottom: var(--space-2); /* Espacio para scrollbar */
    }

    /* Estilizar scrollbar para Webkit */
    .tabs-nav-scroll::-webkit-scrollbar {
      height: 4px;
    }

    .tabs-nav-scroll::-webkit-scrollbar-track {
      background: var(--color-surface);
    }

    .tabs-nav-scroll::-webkit-scrollbar-thumb {
      background: var(--color-border);
      border-radius: 2px;
    }

    .tab-item {
      display: flex;
      align-items: center;
      justify-content: center;
      padding: var(--space-3) var(--space-4);
      border: none;
      background: transparent;
      color: var(--color-text-secondary);
      cursor: pointer;
      transition: all 0.2s cubic-bezier(0.4, 0, 0.2, 1);
      font-size: 14px;
      font-weight: 500;
      position: relative;
      gap: var(--space-2);
      border-bottom: 2px solid transparent;
      white-space: nowrap;
    }

    .tab-item:hover:not(.disabled) {
      color: var(--color-text-primary);
    }

    .tab-item.active {
      color: var(--primary-600);
      border-bottom-color: var(--primary-600);
    }

    .tab-item.disabled {
      color: var(--color-text-muted);
      cursor: not-allowed;
      opacity: 0.5;
    }

    .tab-icon {
      font-size: 16px;
    }

    .tab-label {
      line-height: 1.5;
    }

    .tab-badge {
      display: inline-flex;
      align-items: center;
      justify-content: center;
      min-width: 18px;
      height: 18px;
      padding: 0 var(--space-1);
      background: var(--color-error);
      color: var(--color-text-inverse);
      font-size: 12px;
      font-weight: 600;
      border-radius: 9px;
      line-height: 1;
    }

    .tabs-content {
      flex: 1;
      padding: var(--space-4);
      background: var(--color-background);
    }

    /* Variant: Pills */
    .tabs.tabs-pills .tab-item {
      border-radius: 20px;
      margin: 2px;
      border-bottom: none;
    }

    .tabs.tabs-pills .tab-item.active {
      background: var(--primary-600);
      color: var(--color-text-inverse);
    }

    /* Variant: Cards */
    .tabs.tabs-cards .tabs-nav {
      background: transparent;
      border-bottom: none;
      padding: 0 0 var(--space-4) 0;
    }

    .tabs.tabs-cards .tab-item {
      background: var(--color-surface);
      border: 1px solid var(--color-border);
      border-radius: var(--radius-lg);
      margin: 0 var(--space-1) 0 0;
      border-bottom: 1px solid var(--color-border);
    }

    .tabs.tabs-cards .tab-item.active {
      background: var(--color-background);
      border-color: var(--primary-600);
      color: var(--primary-600);
    }

    /* Variant: Buttons */
    .tabs.tabs-buttons .tab-item {
      background: var(--color-surface);
      border: 1px solid var(--color-border);
      border-radius: 0;
      margin: 0;
      border-bottom: 1px solid var(--color-border);
    }

    .tabs.tabs-buttons .tab-item:first-child {
      border-radius: var(--radius-md) 0 0 var(--radius-md);
    }

    .tabs.tabs-buttons .tab-item:last-child {
      border-radius: 0 var(--radius-md) var(--radius-md) 0;
    }

    .tabs.tabs-buttons .tab-item:not(:first-child) {
      border-left: none;
    }

    .tabs.tabs-buttons .tab-item.active {
      background: var(--primary-600);
      color: var(--color-text-inverse);
      border-color: var(--primary-600);
    }

    /* Sizes */
    .tabs.tabs-sm .tab-item {
      padding: var(--space-2) var(--space-3);
      font-size: 12px;
    }

    .tabs.tabs-lg .tab-item {
      padding: var(--space-4) var(--space-5);
      font-size: 16px;
    }

    /* Hide all tab content by default */
    .tabs-content ::ng-deep [slot^="tab-content-"] {
      display: none;
    }

    /* Show only active tab content */
    .tabs-content.show-general ::ng-deep [slot="tab-content-general"] {
      display: block;
    }
    .tabs-content.show-perfil ::ng-deep [slot="tab-content-perfil"] {
      display: block;
    }
    .tabs-content.show-notificaciones ::ng-deep [slot="tab-content-notificaciones"] {
      display: block;
    }
    .tabs-content.show-seguridad ::ng-deep [slot="tab-content-seguridad"] {
      display: block;
    }
    .tabs-content.show-dashboard ::ng-deep [slot="tab-content-dashboard"] {
      display: block;
    }
    .tabs-content.show-analytics ::ng-deep [slot="tab-content-analytics"] {
      display: block;
    }
    .tabs-content.show-reports ::ng-deep [slot="tab-content-reports"] {
      display: block;
    }
    .tabs-content.show-settings2 ::ng-deep [slot="tab-content-settings2"] {
      display: block;
    }
    .tabs-content.show-overview ::ng-deep [slot="tab-content-overview"] {
      display: block;
    }
    .tabs-content.show-details ::ng-deep [slot="tab-content-details"] {
      display: block;
    }
    .tabs-content.show-history ::ng-deep [slot="tab-content-history"] {
      display: block;
    }
    .tabs-content.show-edit ::ng-deep [slot="tab-content-edit"] {
      display: block;
    }
    .tabs-content.show-preview ::ng-deep [slot="tab-content-preview"] {
      display: block;
    }
    .tabs-content.show-publish ::ng-deep [slot="tab-content-publish"] {
      display: block;
    }

    @media (max-width: 820px) {
      .tabs-nav-scroll {
        scrollbar-width: initial;
      }
    }
  `,
})
export class OpeniisTabsComponent implements OnInit, AfterViewInit {
  @Input() variant: TabsVariant = 'line';
  @Input() size: TabsSize = 'md';
  @Input() tabs: TabItem[] = [];
  @Input() activeTab?: string;

  @Output() tabChange = new EventEmitter<string>();

  @ViewChild('tabsContent', { static: false }) tabsContent!: ElementRef;

  ngOnInit() {
    this.initializeTabs();
  }

  ngAfterViewInit() {
    // Ensure content visibility is updated after view initialization
    const activeTab = this.tabs.find((tab) => tab.active);
    if (activeTab) {
      this.updateContentVisibility(activeTab.id);
    }
  }

  getTabsClasses(): string {
    const classes = ['tabs'];
    classes.push(`tabs-${this.variant}`);
    classes.push(`tabs-${this.size}`);
    return classes.join(' ');
  }

  initializeTabs(): void {
    if (this.tabs.length === 0) return;

    // Find active tab or set first enabled tab as active
    let activeTab = this.tabs.find((tab) => tab.active);

    if (this.activeTab) {
      const specifiedTab = this.tabs.find((tab) => tab.id === this.activeTab);
      if (specifiedTab && !specifiedTab.disabled) {
        activeTab = specifiedTab;
      }
    }

    if (!activeTab) {
      activeTab = this.tabs.find((tab) => !tab.disabled);
    }

    if (activeTab) {
      this.selectTab(activeTab.id);
    }
  }

  selectTab(tabId: string): void {
    const tab = this.tabs.find((t) => t.id === tabId);
    if (!tab || tab.disabled) return;

    // Update active states
    this.tabs.forEach((t) => (t.active = t.id === tabId));

    // Update content visibility
    this.updateContentVisibility(tabId);

    // Emit change event
    this.tabChange.emit(tabId);
  }

  private updateContentVisibility(activeTabId: string): void {
    if (!this.tabsContent) return;

    const contentElement = this.tabsContent.nativeElement;

    // Remove all show-* classes
    const classesToRemove = Array.from(contentElement.classList).filter(
      (cls) => typeof cls === 'string' && cls.startsWith('show-')
    ) as string[];

    classesToRemove.forEach((cls) => contentElement.classList.remove(cls));

    // Add class for active tab
    contentElement.classList.add(`show-${activeTabId}`);
  }
}
