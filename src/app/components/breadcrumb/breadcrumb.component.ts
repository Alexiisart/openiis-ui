import { Component, Input, Output, EventEmitter, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';

export type BreadcrumbVariant =
  | 'default'
  | 'pills'
  | 'arrows'
  | 'slash'
  | 'dots';
export type BreadcrumbSize = 'sm' | 'md' | 'lg';
export type BreadcrumbSeparator =
  | 'chevron'
  | 'slash'
  | 'arrow'
  | 'dot'
  | 'pipe'
  | 'custom';

export interface BreadcrumbItem {
  label: string;
  url?: string;
  icon?: string;
  active?: boolean;
  disabled?: boolean;
  clickable?: boolean;
  tooltip?: string;
  data?: any;
}

@Component({
  selector: 'openiis-breadcrumb',
  standalone: true,
  imports: [CommonModule, RouterModule],
  template: `
    <nav
      class="breadcrumb"
      [class]="getClasses()"
      [attr.aria-label]="ariaLabel"
    >
      <ol class="breadcrumb-list" role="list">
        @for (item of items; track item.label; let i = $index; let isFirst =
        $first; let isLast = $last) {
        <li
          class="breadcrumb-item"
          [class.active]="item.active || isLast"
          [class.disabled]="item.disabled"
          [class.clickable]="isClickable(item)"
          [attr.aria-current]="item.active || isLast ? 'page' : null"
          role="listitem"
        >
          <!-- Home Icon for first item -->
          @if (showHome && isFirst && !item.icon) {
          <i
            class="breadcrumb-home-icon fas fa-home"
            [attr.aria-hidden]="true"
          ></i>
          }

          <!-- Item Content -->
          @if (isClickable(item)) {
          <a
            [routerLink]="item.url"
            [attr.href]="item.url"
            [attr.title]="item.tooltip"
            [attr.aria-label]="item.tooltip || item.label"
            class="breadcrumb-link"
            [class.disabled]="item.disabled"
            (click)="onItemClick(item, i, $event)"
            (keydown)="onKeyDown(item, i, $event)"
          >
            @if (item.icon) {
            <i
              [class]="'breadcrumb-icon ' + item.icon"
              [attr.aria-hidden]="true"
            ></i>
            }
            <span class="breadcrumb-text">{{ item.label }}</span>
          </a>
          } @else {
          <span
            class="breadcrumb-text"
            [attr.title]="item.tooltip"
            [attr.aria-label]="item.tooltip || item.label"
          >
            @if (item.icon) {
            <i
              [class]="'breadcrumb-icon ' + item.icon"
              [attr.aria-hidden]="true"
            ></i>
            }
            {{ item.label }}
          </span>
          }

          <!-- Separator -->
          @if (!isLast) {
          <span
            class="breadcrumb-separator"
            [class]="'separator-' + separator"
            [attr.aria-hidden]="true"
          >
            @if (separator === 'chevron') {
            <i class="fas fa-chevron-right"></i>
            } @else if (separator === 'slash') {
            <span>/</span>
            } @else if (separator === 'arrow') {
            <i class="fas fa-arrow-right"></i>
            } @else if (separator === 'dot') {
            <span>•</span>
            } @else if (separator === 'pipe') {
            <span>|</span>
            } @else if (separator === 'custom') {
            <span>{{ customSeparator }}</span>
            }
          </span>
          }
        </li>
        }
      </ol>

      <!-- Overflow Menu -->
      @if (showOverflow && overflowItems.length > 0) {
      <div class="breadcrumb-overflow">
        <button
          class="breadcrumb-overflow-trigger"
          type="button"
          [attr.aria-label]="
            'Mostrar ' + overflowItems.length + ' elementos más'
          "
          [attr.aria-expanded]="showOverflowMenu"
          (click)="toggleOverflowMenu()"
          (keydown)="onOverflowKeyDown($event)"
        >
          <i class="fas fa-ellipsis-h"></i>
        </button>

        @if (showOverflowMenu) {
        <div
          class="breadcrumb-overflow-menu"
          role="menu"
          [attr.aria-label]="'Elementos adicionales del breadcrumb'"
        >
          @for (item of overflowItems; track item.label; let i = $index) {
          <button
            type="button"
            class="breadcrumb-overflow-item"
            role="menuitem"
            [attr.aria-label]="item.label"
            [attr.title]="item.tooltip"
            [disabled]="item.disabled"
            (click)="onOverflowItemClick(item, i, $event)"
            (keydown)="onOverflowItemKeyDown(item, i, $event)"
          >
            @if (item.icon) {
            <i
              [class]="'breadcrumb-icon ' + item.icon"
              [attr.aria-hidden]="true"
            ></i>
            }
            <span>{{ item.label }}</span>
          </button>
          }
        </div>
        }
      </div>
      }
    </nav>
  `,
  styleUrls: ['./breadcrumb.component.css'],
  host: {
    '[class.breadcrumb-host]': 'true',
  },
})
export class OpeniisBreadcrumbComponent implements OnInit {
  @Input() variant: BreadcrumbVariant = 'default';
  @Input() size: BreadcrumbSize = 'md';
  @Input() separator: BreadcrumbSeparator = 'chevron';
  @Input() customSeparator = '>';
  @Input() items: BreadcrumbItem[] = [];
  @Input() showHome = true;
  @Input() maxItems = 0; // 0 = no limit
  @Input() showOverflow = true;
  @Input() ariaLabel = 'Breadcrumb';
  @Input() responsive = true;
  @Input() truncateLength = 0; // 0 = no truncation
  @Input() customClass?: string;

  @Output() itemClick = new EventEmitter<{
    item: BreadcrumbItem;
    index: number;
    event: MouseEvent;
  }>();
  @Output() overflowItemClick = new EventEmitter<{
    item: BreadcrumbItem;
    index: number;
    event: MouseEvent;
  }>();

  visibleItems: BreadcrumbItem[] = [];
  overflowItems: BreadcrumbItem[] = [];
  showOverflowMenu = false;

  ngOnInit() {
    this.processItems();
  }

  ngOnChanges() {
    this.processItems();
  }

  getClasses(): string {
    const classes = ['breadcrumb'];

    classes.push(`breadcrumb-${this.variant}`);
    classes.push(`breadcrumb-${this.size}`);
    classes.push(`breadcrumb-separator-${this.separator}`);

    if (this.responsive) classes.push('breadcrumb-responsive');
    if (this.customClass) classes.push(this.customClass);

    return classes.join(' ');
  }

  processItems(): void {
    let processedItems = [...this.items];

    // Truncate labels if needed
    if (this.truncateLength > 0) {
      processedItems = processedItems.map((item) => ({
        ...item,
        label:
          item.label.length > this.truncateLength
            ? item.label.substring(0, this.truncateLength) + '...'
            : item.label,
      }));
    }

    // Handle overflow
    if (this.maxItems > 0 && processedItems.length > this.maxItems) {
      this.visibleItems = [
        ...processedItems.slice(0, 1), // First item
        ...processedItems.slice(-(this.maxItems - 1)), // Last n-1 items
      ];
      this.overflowItems = processedItems.slice(1, -(this.maxItems - 1));
    } else {
      this.visibleItems = processedItems;
      this.overflowItems = [];
    }
  }

  isClickable(item: BreadcrumbItem): boolean {
    return !item.disabled && item.clickable !== false && !!item.url;
  }

  onItemClick(item: BreadcrumbItem, index: number, event: MouseEvent): void {
    if (item.disabled) {
      event.preventDefault();
      return;
    }

    this.itemClick.emit({ item, index, event });
  }

  onKeyDown(item: BreadcrumbItem, index: number, event: KeyboardEvent): void {
    if (event.key === 'Enter' || event.key === ' ') {
      event.preventDefault();
      this.onItemClick(item, index, event as any);
    }
  }

  toggleOverflowMenu(): void {
    this.showOverflowMenu = !this.showOverflowMenu;
  }

  onOverflowKeyDown(event: KeyboardEvent): void {
    if (event.key === 'Enter' || event.key === ' ') {
      event.preventDefault();
      this.toggleOverflowMenu();
    } else if (event.key === 'Escape') {
      this.showOverflowMenu = false;
    }
  }

  onOverflowItemClick(
    item: BreadcrumbItem,
    index: number,
    event: MouseEvent
  ): void {
    if (item.disabled) {
      event.preventDefault();
      return;
    }

    this.showOverflowMenu = false;
    this.overflowItemClick.emit({ item, index, event });
  }

  onOverflowItemKeyDown(
    item: BreadcrumbItem,
    index: number,
    event: KeyboardEvent
  ): void {
    if (event.key === 'Enter' || event.key === ' ') {
      event.preventDefault();
      this.onOverflowItemClick(item, index, event as any);
    } else if (event.key === 'Escape') {
      this.showOverflowMenu = false;
    }
  }

  // Public methods
  addItem(item: BreadcrumbItem): void {
    this.items.push(item);
    this.processItems();
  }

  removeItem(index: number): void {
    this.items.splice(index, 1);
    this.processItems();
  }

  updateItem(index: number, item: Partial<BreadcrumbItem>): void {
    this.items[index] = { ...this.items[index], ...item };
    this.processItems();
  }

  clearItems(): void {
    this.items = [];
    this.processItems();
  }

  getActiveItem(): BreadcrumbItem | null {
    return this.items.find((item) => item.active) || null;
  }

  setActiveItem(index: number): void {
    this.items.forEach((item, i) => {
      item.active = i === index;
    });
    this.processItems();
  }
}
