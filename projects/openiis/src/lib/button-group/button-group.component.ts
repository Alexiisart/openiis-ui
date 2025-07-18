import {
  Component,
  Input,
  Output,
  EventEmitter,
  ContentChildren,
  QueryList,
  AfterContentInit,
  OnDestroy,
  ElementRef,
} from '@angular/core';
import { CommonModule } from '@angular/common';
import { Subject, takeUntil } from 'rxjs';

export type ButtonGroupSize = 'xs' | 'sm' | 'md' | 'lg' | 'xl';
export type ButtonGroupOrientation = 'horizontal' | 'vertical';
export type ButtonGroupType =
  | 'default'
  | 'primary'
  | 'success'
  | 'warning'
  | 'danger'
  | 'subtle';

@Component({
  selector: 'openiis-button-group',
  standalone: true,
  imports: [CommonModule],
  template: `
    <div
      class="button-group"
      [class]="containerClasses"
      [attr.data-size]="size"
      [attr.data-orientation]="orientation"
      [attr.data-type]="type"
      [attr.role]="role"
      [attr.aria-label]="ariaLabel"
      [attr.aria-describedby]="ariaDescribedBy"
    >
      <ng-content></ng-content>
    </div>
  `,
  styleUrls: ['./button-group.component.css'],
})
export class OpeniisButtonGroupComponent
  implements AfterContentInit, OnDestroy
{
  constructor(private elementRef: ElementRef) {}
  /**
   * Tamaño de los botones en el grupo
   */
  @Input() size: ButtonGroupSize = 'md';

  /**
   * Orientación del grupo de botones
   */
  @Input() orientation: ButtonGroupOrientation = 'horizontal';

  /**
   * Tipo visual del grupo de botones
   */
  @Input() type: ButtonGroupType = 'default';

  /**
   * Permitir seleccionar múltiples botones
   */
  @Input() multiple: boolean = false;

  /**
   * Hacer que los botones ocupen el ancho completo
   */
  @Input() fullWidth: boolean = false;

  /**
   * Separar los botones con un espacio
   */
  @Input() separated: boolean = false;

  /**
   * Deshabilitar todos los botones del grupo
   */
  @Input() disabled: boolean = false;

  /**
   * Índice del botón seleccionado (para selección única)
   */
  @Input() selectedIndex: number = -1;

  /**
   * Índices de los botones seleccionados (para selección múltiple)
   */
  @Input() selectedIndices: number[] = [];

  /**
   * Rol ARIA para accesibilidad
   */
  @Input() role: string = 'group';

  /**
   * ARIA label para accesibilidad
   */
  @Input() ariaLabel: string = '';

  /**
   * ARIA describedby para accesibilidad
   */
  @Input() ariaDescribedBy: string = '';

  /**
   * Clases CSS adicionales
   */
  @Input() extraClasses: string = '';

  /**
   * Evento emitido cuando se selecciona un botón
   */
  @Output() buttonClick = new EventEmitter<{
    index: number;
    button: HTMLButtonElement;
    selected: boolean;
  }>();

  /**
   * Evento emitido cuando cambia la selección
   */
  @Output() selectionChange = new EventEmitter<number | number[]>();

  /**
   * Subject para manejar la destrucción del componente
   */
  private destroy$ = new Subject<void>();

  /**
   * Botones del grupo
   */
  private buttons: HTMLButtonElement[] = [];

  /**
   * Genera las clases CSS del contenedor
   */
  get containerClasses(): string {
    const classes = ['button-group'];

    if (this.fullWidth) classes.push('full-width');
    if (this.separated) classes.push('separated');
    if (this.disabled) classes.push('disabled');
    if (this.extraClasses) classes.push(this.extraClasses);

    return classes.join(' ');
  }

  ngAfterContentInit(): void {
    // Componente simplificado: solo aplicamos clases CSS
    // La lógica de interacción se maneja directamente en el template
  }

  ngOnDestroy(): void {
    this.destroy$.next();
    this.destroy$.complete();
  }

  /**
   * Maneja el clic en un botón
   */
  private handleButtonClick(
    index: number,
    button: HTMLButtonElement,
    event: Event
  ): void {
    if (this.disabled || button.disabled) return;

    event.preventDefault();
    event.stopPropagation();

    if (this.multiple) {
      // Selección múltiple
      const isSelected = this.selectedIndices.includes(index);

      if (isSelected) {
        // Deseleccionar
        this.selectedIndices = this.selectedIndices.filter((i) => i !== index);
        button.classList.remove('selected');
        button.setAttribute('aria-pressed', 'false');
      } else {
        // Seleccionar
        this.selectedIndices = [...this.selectedIndices, index];
        button.classList.add('selected');
        button.setAttribute('aria-pressed', 'true');
      }

      this.selectionChange.emit(this.selectedIndices);
      this.buttonClick.emit({
        index,
        button,
        selected: !isSelected,
      });
    } else {
      // Selección única
      // Deseleccionar todos
      this.buttons.forEach((btn, i) => {
        btn.classList.remove('selected');
        btn.setAttribute('aria-pressed', 'false');
      });

      // Seleccionar el actual
      button.classList.add('selected');
      button.setAttribute('aria-pressed', 'true');
      this.selectedIndex = index;

      this.selectionChange.emit(index);
      this.buttonClick.emit({
        index,
        button,
        selected: true,
      });
    }
  }

  /**
   * Maneja la navegación por teclado
   */
  private handleKeyDown(currentIndex: number, event: KeyboardEvent): void {
    let targetIndex = currentIndex;

    if (this.orientation === 'horizontal') {
      if (event.key === 'ArrowLeft') {
        targetIndex =
          currentIndex > 0 ? currentIndex - 1 : this.buttons.length - 1;
      } else if (event.key === 'ArrowRight') {
        targetIndex =
          currentIndex < this.buttons.length - 1 ? currentIndex + 1 : 0;
      }
    } else {
      if (event.key === 'ArrowUp') {
        targetIndex =
          currentIndex > 0 ? currentIndex - 1 : this.buttons.length - 1;
      } else if (event.key === 'ArrowDown') {
        targetIndex =
          currentIndex < this.buttons.length - 1 ? currentIndex + 1 : 0;
      }
    }

    if (targetIndex !== currentIndex) {
      event.preventDefault();
      this.buttons[targetIndex]?.focus();
    }

    // Seleccionar con Enter o Space
    if (event.key === 'Enter' || event.key === ' ') {
      event.preventDefault();
      this.buttons[currentIndex]?.click();
    }
  }

  /**
   * Actualiza el estado de selección programáticamente
   */
  updateSelection(selection: number | number[]): void {
    if (this.multiple && Array.isArray(selection)) {
      this.selectedIndices = selection;
    } else if (!this.multiple && typeof selection === 'number') {
      this.selectedIndex = selection;
    }

    // Actualizar el DOM
    this.buttons.forEach((button, index) => {
      const isSelected = this.multiple
        ? this.selectedIndices.includes(index)
        : this.selectedIndex === index;

      if (isSelected) {
        button.classList.add('selected');
        button.setAttribute('aria-pressed', 'true');
      } else {
        button.classList.remove('selected');
        button.setAttribute('aria-pressed', 'false');
      }
    });
  }
}
