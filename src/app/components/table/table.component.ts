import {
  Component,
  Input,
  Output,
  EventEmitter,
  OnInit,
  OnChanges,
  SimpleChanges,
  ViewChild,
  ElementRef,
} from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { OpeniisCheckboxComponent } from '../checkboxes/checkbox.component';
import { OpeniisInputComponent } from '../input/input.component';
import { OpeniisButtonComponent } from '../buttons/button.component';
import { OpeniisSpinnerComponent } from '../spinner/spinner.component';
import { OpeniisEmptyStateComponent } from '../empty-state/empty-state.component';

export type TableVariant =
  | 'default'
  | 'striped'
  | 'bordered'
  | 'hoverable'
  | 'compact'
  | 'spacious';
export type TableSize = 'sm' | 'md' | 'lg';
export type SortDirection = 'asc' | 'desc' | 'none';
export type FilterType = 'text' | 'select' | 'date' | 'number' | 'boolean';

export interface TableColumn {
  key: string;
  label: string;
  sortable?: boolean;
  filterable?: boolean;
  filterType?: FilterType;
  filterOptions?: { value: any; label: string }[];
  width?: string;
  minWidth?: string;
  maxWidth?: string;
  align?: 'left' | 'center' | 'right';
  sticky?: boolean;
  render?: (value: any, row: any, index: number) => string;
  className?: string;
  headerClassName?: string;
  cellClassName?: string;
}

export interface TableFilter {
  column: string;
  value: any;
  operator?:
    | 'equals'
    | 'contains'
    | 'startsWith'
    | 'endsWith'
    | 'gt'
    | 'lt'
    | 'gte'
    | 'lte';
}

export interface TableSort {
  column: string;
  direction: SortDirection;
}

export interface TableSelection {
  selectedRows: any[];
  selectAll: boolean;
  indeterminate: boolean;
}

export interface TablePagination {
  page: number;
  pageSize: number;
  totalItems: number;
  totalPages: number;
  showSizeOptions: boolean;
  sizeOptions: number[];
}

@Component({
  selector: 'openiis-table',
  standalone: true,
  imports: [
    CommonModule,
    FormsModule,
    OpeniisCheckboxComponent,
    OpeniisInputComponent,
    OpeniisButtonComponent,
    OpeniisSpinnerComponent,
    OpeniisEmptyStateComponent,
  ],
  templateUrl: './table.component.html',
  styleUrls: ['./table.component.css'],
  host: {
    '[class.table-host]': 'true',
  },
})
export class OpeniisTableComponent implements OnInit, OnChanges {
  @Input() variant: TableVariant = 'default';
  @Input() size: TableSize = 'md';
  @Input() columns: TableColumn[] = [];
  @Input() data: any[] = [];
  @Input() loading = false;
  @Input() selectable = false;
  @Input() sortable = true;
  @Input() filterable = false;
  @Input() searchable = false;
  @Input() paginated = false;
  @Input() showHeader = true;
  @Input() showFilters = true;
  @Input() title?: string;
  @Input() subtitle?: string;
  @Input() emptyIcon = 'inbox';
  @Input() emptyTitle = 'No hay datos';
  @Input() emptyMessage = 'No se encontraron datos para mostrar';
  @Input() emptyButtonText?: string;
  @Input() pageSize = 10;
  @Input() pageSizeOptions = [10, 25, 50, 100];
  @Input() rowKey = 'id';
  @Input() stickyHeader = false;
  @Input() maxHeight?: string;
  @Input() responsive = true;
  @Input() customRowClass?: (row: any, index: number) => string;
  @Input() customCellClass?: (
    column: TableColumn,
    row: any,
    value: any
  ) => string;

  @Output() rowClick = new EventEmitter<{
    row: any;
    index: number;
    event: MouseEvent;
  }>();
  @Output() rowDoubleClick = new EventEmitter<{
    row: any;
    index: number;
    event: MouseEvent;
  }>();
  @Output() selectionChange = new EventEmitter<TableSelection>();
  @Output() sortChange = new EventEmitter<TableSort>();
  @Output() filterChange = new EventEmitter<TableFilter[]>();
  @Output() searchChange = new EventEmitter<string>();
  @Output() pageChange = new EventEmitter<number>();
  @Output() pageSizeChange = new EventEmitter<number>();
  @Output() emptyAction = new EventEmitter<void>();

  @ViewChild('tableWrapper', { static: false }) tableWrapper!: ElementRef;

  // Internal state
  processedData: any[] = [];
  paginatedData: any[] = [];
  searchTerm = '';
  filters: TableFilter[] = [];
  visibleFilters: TableFilter[] = [];
  sorts: TableSort[] = [];
  selection: TableSelection = {
    selectedRows: [],
    selectAll: false,
    indeterminate: false,
  };
  pagination: TablePagination = {
    page: 1,
    pageSize: 10,
    totalItems: 0,
    totalPages: 0,
    showSizeOptions: true,
    sizeOptions: [10, 25, 50, 100],
  };

  /**
   * Inicializa la paginación y los filtros, y procesa los datos al iniciar el componente.
   */
  ngOnInit() {
    this.initializePagination();
    this.initializeFilters();
    this.processData();
  }

  /**
   * Detecta cambios en los inputs y actualiza los datos procesados y la paginación si es necesario.
   * @param changes Cambios detectados en los inputs del componente.
   */
  ngOnChanges(changes: SimpleChanges) {
    if (changes['data'] || changes['columns']) {
      this.processData();
    }
    if (changes['pageSize']) {
      this.pagination.pageSize = this.pageSize;
      this.pagination.sizeOptions = this.pageSizeOptions;
      this.processData();
    }
  }

  // Container and table classes

  /**
   * Devuelve las clases CSS para el contenedor de la tabla.
   */
  getContainerClasses(): string {
    const classes = ['table-container'];
    classes.push(`table-${this.variant}`);
    classes.push(`table-${this.size}`);
    if (this.responsive) classes.push('table-responsive');
    if (this.stickyHeader) classes.push('table-sticky-header');
    if (this.maxHeight) classes.push('table-max-height');
    return classes.join(' ');
  }

  /**
   * Devuelve las clases CSS para la tabla.
   */
  getTableClasses(): string {
    const classes = ['table'];
    classes.push(`table-${this.variant}`);
    classes.push(`table-${this.size}`);
    return classes.join(' ');
  }

  /**
   * Devuelve las clases CSS para la celda de encabezado de una columna.
   * @param column Columna de la tabla.
   */
  getHeaderCellClasses(column: TableColumn): string {
    const classes = ['table-cell-header'];
    if (column.headerClassName) classes.push(column.headerClassName);
    if (column.sortable) classes.push('sortable');
    if (column.sticky) classes.push('sticky');
    return classes.join(' ');
  }

  /**
   * Devuelve las clases CSS para una celda de la tabla.
   * @param column Columna de la tabla.
   * @param row Fila de datos.
   */
  getCellClasses(column: TableColumn, row: any): string {
    const classes = ['table-cell'];
    if (column.cellClassName) classes.push(column.cellClassName);
    if (column.className) classes.push(column.className);
    if (column.sticky) classes.push('sticky');
    if (this.customCellClass) {
      const customClass = this.customCellClass(column, row, row[column.key]);
      if (customClass) classes.push(customClass);
    }
    return classes.join(' ');
  }

  /**
   * Devuelve las clases CSS para una fila de la tabla.
   * @param row Fila de datos.
   * @param index Índice de la fila.
   */
  getRowClasses(row: any, index: number): string {
    const classes = ['table-row'];
    if (this.isRowSelected(row)) classes.push('selected');
    if (this.customRowClass) {
      const customClass = this.customRowClass(row, index);
      if (customClass) classes.push(customClass);
    }
    return classes.join(' ');
  }

  // Data processing

  /**
   * Procesa los datos aplicando búsqueda, filtros y ordenamiento.
   */
  processData(): void {
    let result = [...this.data];

    // Aplica búsqueda
    if (this.searchTerm) {
      result = this.applySearch(result);
    }

    // Aplica filtros
    if (this.filters.length > 0) {
      result = this.applyFilters(result);
    }

    // Aplica ordenamiento
    if (this.sorts.length > 0) {
      result = this.applySorting(result);
    }

    this.processedData = result;
    this.updatePagination();
    this.updatePaginatedData();
    this.updateSelection();
  }

  /**
   * Aplica la búsqueda sobre los datos.
   * @param data Datos a filtrar.
   */
  applySearch(data: any[]): any[] {
    const searchTerm = this.searchTerm.toLowerCase();
    return data.filter((row) => {
      return this.columns.some((column) => {
        const value = row[column.key];
        if (value == null) return false;
        return value.toString().toLowerCase().includes(searchTerm);
      });
    });
  }

  /**
   * Aplica los filtros activos sobre los datos.
   * @param data Datos a filtrar.
   */
  applyFilters(data: any[]): any[] {
    return data.filter((row) => {
      return this.filters.every((filter) => {
        const value = row[filter.column];
        if (filter.value === '' || filter.value == null) return true;

        switch (filter.operator || 'contains') {
          case 'equals':
            return value === filter.value;
          case 'contains':
            return (
              value &&
              value
                .toString()
                .toLowerCase()
                .includes(filter.value.toLowerCase())
            );
          case 'startsWith':
            return (
              value &&
              value
                .toString()
                .toLowerCase()
                .startsWith(filter.value.toLowerCase())
            );
          case 'endsWith':
            return (
              value &&
              value
                .toString()
                .toLowerCase()
                .endsWith(filter.value.toLowerCase())
            );
          case 'gt':
            return value > filter.value;
          case 'lt':
            return value < filter.value;
          case 'gte':
            return value >= filter.value;
          case 'lte':
            return value <= filter.value;
          default:
            return true;
        }
      });
    });
  }

  /**
   * Aplica el ordenamiento sobre los datos.
   * @param data Datos a ordenar.
   */
  applySorting(data: any[]): any[] {
    if (this.sorts.length === 0) return data;

    return data.sort((a, b) => {
      for (const sort of this.sorts) {
        const aValue = a[sort.column];
        const bValue = b[sort.column];

        if (aValue == null && bValue == null) continue;
        if (aValue == null) return sort.direction === 'asc' ? -1 : 1;
        if (bValue == null) return sort.direction === 'asc' ? 1 : -1;

        let comparison = 0;
        if (typeof aValue === 'string' && typeof bValue === 'string') {
          comparison = aValue.localeCompare(bValue);
        } else if (typeof aValue === 'number' && typeof bValue === 'number') {
          comparison = aValue - bValue;
        } else if (aValue instanceof Date && bValue instanceof Date) {
          comparison = aValue.getTime() - bValue.getTime();
        } else {
          comparison = aValue.toString().localeCompare(bValue.toString());
        }

        if (comparison !== 0) {
          return sort.direction === 'asc' ? comparison : -comparison;
        }
      }
      return 0;
    });
  }

  // Pagination

  /**
   * Inicializa la estructura de paginación.
   */
  initializePagination(): void {
    this.pagination = {
      page: 1,
      pageSize: this.pageSize,
      totalItems: 0,
      totalPages: 0,
      showSizeOptions: true,
      sizeOptions: this.pageSizeOptions,
    };
  }

  /**
   * Actualiza los valores de paginación según los datos procesados.
   */
  updatePagination(): void {
    this.pagination.totalItems = this.processedData.length;
    this.pagination.totalPages = Math.ceil(
      this.pagination.totalItems / this.pagination.pageSize
    );
    if (this.pagination.page > this.pagination.totalPages) {
      this.pagination.page = Math.max(1, this.pagination.totalPages);
    }
  }

  /**
   * Actualiza los datos paginados según la página y el tamaño de página actual.
   */
  updatePaginatedData(): void {
    if (!this.paginated) {
      this.paginatedData = this.processedData;
      return;
    }

    const start = (this.pagination.page - 1) * this.pagination.pageSize;
    const end = start + this.pagination.pageSize;
    this.paginatedData = this.processedData.slice(start, end);
  }

  /**
   * Cambia a la página indicada si es válida.
   * @param page Número de página a mostrar.
   */
  goToPage(page: number): void {
    if (page >= 1 && page <= this.pagination.totalPages) {
      this.pagination.page = page;
      this.updatePaginatedData();
      this.pageChange.emit(page);
    }
  }

  /**
   * Cambia el tamaño de página y reinicia la paginación.
   * @param size Nuevo tamaño de página (string convertible a número).
   */
  onPageSizeChange(size: string): void {
    const newSize = parseInt(size, 10);
    this.pagination.pageSize = newSize;
    this.pagination.page = 1;
    this.updatePagination();
    this.updatePaginatedData();
    this.pageSizeChange.emit(newSize);
  }

  /**
   * Devuelve el índice inicial de la paginación actual.
   */
  getPaginationStart(): number {
    return (this.pagination.page - 1) * this.pagination.pageSize + 1;
  }

  /**
   * Devuelve el índice final de la paginación actual.
   */
  getPaginationEnd(): number {
    return Math.min(
      this.pagination.page * this.pagination.pageSize,
      this.pagination.totalItems
    );
  }

  /**
   * Devuelve un arreglo con los números de página visibles para la paginación.
   */
  getVisiblePages(): number[] {
    const pages: number[] = [];
    const totalPages = this.pagination.totalPages;
    const currentPage = this.pagination.page;

    if (totalPages <= 7) {
      for (let i = 1; i <= totalPages; i++) {
        pages.push(i);
      }
    } else {
      if (currentPage <= 4) {
        for (let i = 1; i <= 5; i++) {
          pages.push(i);
        }
        pages.push(-1); // Ellipsis
        pages.push(totalPages);
      } else if (currentPage >= totalPages - 3) {
        pages.push(1);
        pages.push(-1); // Ellipsis
        for (let i = totalPages - 4; i <= totalPages; i++) {
          pages.push(i);
        }
      } else {
        pages.push(1);
        pages.push(-1); // Ellipsis
        for (let i = currentPage - 1; i <= currentPage + 1; i++) {
          pages.push(i);
        }
        pages.push(-1); // Ellipsis
        pages.push(totalPages);
      }
    }

    return pages;
  }

  // Sorting

  /**
   * Cambia el estado de ordenamiento de una columna.
   * @param column Columna a ordenar.
   */
  onSort(column: TableColumn): void {
    if (!column.sortable) return;

    const existingSort = this.sorts.find((s) => s.column === column.key);

    if (existingSort) {
      if (existingSort.direction === 'asc') {
        existingSort.direction = 'desc';
      } else if (existingSort.direction === 'desc') {
        existingSort.direction = 'none';
        this.sorts = this.sorts.filter((s) => s.column !== column.key);
      }
    } else {
      this.sorts = [{ column: column.key, direction: 'asc' }];
    }

    this.processData();
    this.sortChange.emit(
      this.sorts.find((s) => s.column === column.key) || {
        column: column.key,
        direction: 'none',
      }
    );
  }

  /**
   * Devuelve la dirección de ordenamiento de una columna.
   * @param columnKey Clave de la columna.
   */
  getSortDirection(columnKey: string): SortDirection {
    const sort = this.sorts.find((s) => s.column === columnKey);
    return sort ? sort.direction : 'none';
  }

  /**
   * Devuelve el valor aria-sort para accesibilidad según la dirección de ordenamiento.
   * @param column Columna de la tabla.
   */
  getAriaSortValue(column: TableColumn): string {
    if (!column.sortable) return 'none';

    const direction = this.getSortDirection(column.key);
    switch (direction) {
      case 'asc':
        return 'ascending';
      case 'desc':
        return 'descending';
      default:
        return 'none';
    }
  }

  // Filtering

  /**
   * Inicializa los filtros visibles según las columnas configuradas.
   */
  initializeFilters(): void {
    this.visibleFilters = this.columns
      .filter((column) => column.filterable)
      .map((column) => ({
        column: column.key,
        value: '',
        operator: 'contains',
        filterType: column.filterType || 'text',
        filterOptions: column.filterOptions || [],
      }));
  }

  /**
   * Actualiza el valor de un filtro y procesa los datos.
   * @param columnKey Clave de la columna a filtrar.
   * @param value Valor del filtro.
   */
  onFilterChange(columnKey: string, value: any): void {
    const filter = this.filters.find((f) => f.column === columnKey);

    if (filter) {
      filter.value = value;
    } else {
      this.filters.push({
        column: columnKey,
        value,
        operator: 'contains',
      });
    }

    this.processData();
    this.filterChange.emit([...this.filters]);
  }

  /**
   * Limpia el filtro de una columna y procesa los datos.
   * @param columnKey Clave de la columna a limpiar el filtro.
   */
  clearFilter(columnKey: string): void {
    this.filters = this.filters.filter((f) => f.column !== columnKey);
    const visibleFilter = this.visibleFilters.find(
      (f) => f.column === columnKey
    );
    if (visibleFilter) {
      visibleFilter.value = '';
    }
    this.processData();
    this.filterChange.emit([...this.filters]);
  }

  // Search

  /**
   * Actualiza el término de búsqueda y procesa los datos.
   * @param searchTerm Término de búsqueda.
   */
  onSearch(searchTerm: string): void {
    this.searchTerm = searchTerm;
    this.pagination.page = 1;
    this.processData();
    this.searchChange.emit(searchTerm);
  }

  // Selection

  /**
   * Indica si una fila está seleccionada.
   * @param row Fila de datos.
   */
  isRowSelected(row: any): boolean {
    return this.selection.selectedRows.some(
      (selected) => selected[this.rowKey] === row[this.rowKey]
    );
  }

  /**
   * Cambia el estado de selección de una fila.
   * @param row Fila de datos.
   * @param selected Si la fila debe estar seleccionada.
   */
  toggleRowSelection(row: any, selected: boolean): void {
    if (selected) {
      if (!this.isRowSelected(row)) {
        this.selection.selectedRows.push(row);
      }
    } else {
      this.selection.selectedRows = this.selection.selectedRows.filter(
        (selected) => selected[this.rowKey] !== row[this.rowKey]
      );
    }
    this.updateSelection();
  }

  /**
   * Selecciona o deselecciona todas las filas procesadas.
   * @param selectAll Si se deben seleccionar todas las filas.
   */
  toggleSelectAll(selectAll: boolean): void {
    if (selectAll) {
      this.selection.selectedRows = [...this.processedData];
    } else {
      this.selection.selectedRows = [];
    }
    this.updateSelection();
  }

  /**
   * Actualiza el estado de selección (todos, indeterminado) y emite el evento.
   */
  updateSelection(): void {
    const totalRows = this.processedData.length;
    const selectedCount = this.selection.selectedRows.length;

    this.selection.selectAll = selectedCount === totalRows && totalRows > 0;
    this.selection.indeterminate =
      selectedCount > 0 && selectedCount < totalRows;

    this.selectionChange.emit({ ...this.selection });
  }

  /**
   * Limpia la selección de filas.
   */
  clearSelection(): void {
    this.selection.selectedRows = [];
    this.updateSelection();
  }

  // Row interactions

  /**
   * Emite el evento de click en una fila.
   * @param row Fila de datos.
   * @param index Índice de la fila.
   * @param event Evento de mouse.
   */
  onRowClick(row: any, index: number, event: MouseEvent): void {
    this.rowClick.emit({ row, index, event });
  }

  /**
   * Emite el evento de click en una fila al presionar Enter o Espacio.
   * @param row Fila de datos.
   * @param index Índice de la fila.
   * @param event Evento de teclado.
   */
  onRowKeyDown(row: any, index: number, event: KeyboardEvent): void {
    if (event.key === 'Enter' || event.key === ' ') {
      event.preventDefault();
      this.rowClick.emit({ row, index, event: event as any });
    }
  }

  // Utility methods

  /**
   * Devuelve el contenido a mostrar en una celda.
   * @param column Columna de la tabla.
   * @param row Fila de datos.
   * @param index Índice de la fila.
   */
  getCellContent(column: TableColumn, row: any, index: number): string {
    const value = row[column.key];

    if (column.render) {
      return column.render(value, row, index);
    }

    if (value == null) return '';
    return value.toString();
  }

  /**
   * Devuelve la etiqueta de una columna a partir de su clave.
   * @param columnKey Clave de la columna.
   */
  getColumnLabel(columnKey: string): string {
    const column = this.columns.find((c) => c.key === columnKey);
    return column ? column.label : columnKey;
  }

  /**
   * Función trackBy para ngFor en filas.
   * @param index Índice de la fila.
   * @param item Fila de datos.
   */
  trackByFn(index: number, item: any): any {
    return item[this.rowKey] || index;
  }

  /**
   * Emite el evento de acción en estado vacío.
   */
  onEmptyAction(): void {
    this.emptyAction.emit();
  }

  /**
   * Maneja el cambio de tamaño de página desde un select.
   * @param event Evento del select.
   */
  onSelectChange(event: Event): void {
    const target = event.target as HTMLSelectElement;
    this.onPageSizeChange(target.value);
  }

  /**
   * Maneja el cambio de filtro tipo select.
   * @param event Evento del select.
   * @param columnKey Clave de la columna.
   */
  onFilterSelectChange(event: Event, columnKey: string): void {
    const target = event.target as HTMLSelectElement;
    this.onFilterChange(columnKey, target.value);
  }

  /**
   * Devuelve el tipo de filtro de una columna.
   * @param columnKey Clave de la columna.
   */
  getColumnFilterType(columnKey: string): FilterType | undefined {
    const column = this.columns.find((col) => col.key === columnKey);
    return column?.filterType;
  }

  /**
   * Devuelve las opciones de filtro tipo select de una columna.
   * @param columnKey Clave de la columna.
   */
  getColumnFilterOptions(columnKey: string): { value: any; label: string }[] {
    const column = this.columns.find((col) => col.key === columnKey);
    return column?.filterOptions || [];
  }
}
