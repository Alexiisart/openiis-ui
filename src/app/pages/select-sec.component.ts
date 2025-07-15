import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { OpeniisDropdownComponent } from '../components';
import { OpeniisSearchableDropdownComponent } from '../components/dropdowns/searchable-dropdown.component';
import { TranslateModule } from '@ngx-translate/core';

@Component({
  selector: 'app-select-sec',
  standalone: true,
  imports: [
    CommonModule,
    OpeniisDropdownComponent,
    OpeniisSearchableDropdownComponent,
    TranslateModule,
  ],
  template: `
    <section class="demo-section">
      <h2>{{ 'select.selectores' | translate }}</h2>

      <div class="demo-subsection">
        <h3>{{ 'select.dropdowns' | translate }}</h3>
        <div class="demo-grid">
          <div class="demo-item">
            <h4>{{ 'select.dropdown_básico' | translate }}</h4>
            <openiis-dropdown
              [options]="dropdownOptions"
              [selectedValue]="selectedDropdownValue"
              size="md"
              tooltip="{{ 'select.buscar' | translate }}"
              (selectionChanged)="onDropdownChange($event)"
            >
            </openiis-dropdown>
            <p class="selection-result">
              {{ selectedDropdownValue }}
            </p>
          </div>
        </div>
      </div>

      <div class="demo-subsection">
        <h3>{{ 'select.tamaños_de_dropdown' | translate }}</h3>
        <div class="demo-grid">
          <div class="demo-item">
            <h4>{{ 'select.dropdown_small' | translate }}</h4>
            <openiis-dropdown
              [options]="dropdownOptions"
              [selectedValue]="selectedDropdownValue"
              size="sm"
            >
            </openiis-dropdown>
          </div>

          <div class="demo-item">
            <h4>{{ 'select.dropdown_medium' | translate }}</h4>
            <openiis-dropdown
              [options]="dropdownOptions"
              [selectedValue]="selectedDropdownValue"
              size="md"
            >
            </openiis-dropdown>
          </div>

          <div class="demo-item">
            <h4>{{ 'select.dropdown_large' | translate }}</h4>
            <openiis-dropdown
              [options]="dropdownOptions"
              [selectedValue]="selectedDropdownValue"
              size="lg"
            >
            </openiis-dropdown>
          </div>

          <div class="demo-item">
            <h4>{{ 'select.dropdown_deshabilitado' | translate }}</h4>
            <openiis-dropdown
              [options]="dropdownOptions"
              [selectedValue]="selectedDropdownValue"
              size="md"
              [disabled]="true"
            >
            </openiis-dropdown>
          </div>
        </div>
      </div>

      <div class="demo-subsection">
        <h3>{{ 'select.dropdowns_con_búsqueda' | translate }}</h3>
        <div class="demo-grid">
          <div class="demo-item">
            <h4>{{ 'select.dropdown_de_productos' | translate }}</h4>
            <openiis-searchable-dropdown
              [options]="searchableProductsOptions"
              [selectedValue]="selectedSearchableProduct"
              placeholder="{{ 'select.buscar_productos' | translate }}"
              size="md"
              tooltip="{{ 'select.tooltip_buscar_producto' | translate }}"
              (selectionChanged)="onSearchableProductChange($event)"
            >
            </openiis-searchable-dropdown>
            <p class="selection-result">
              {{ selectedSearchableProduct }}
            </p>
          </div>

          <div class="demo-item">
            <h4>{{ 'select.dropdown_de_países' | translate }}</h4>
            <openiis-searchable-dropdown
              [options]="searchableCountriesOptions"
              [selectedValue]="selectedSearchableCountry"
              placeholder="{{ 'select.buscar_países' | translate }}"
              size="md"
              tooltip="{{ 'select.tooltip_buscar_pais' | translate }}"
              (selectionChanged)="onSearchableCountryChange($event)"
            >
            </openiis-searchable-dropdown>
            <p class="selection-result">
              {{ selectedSearchableCountry }}
            </p>
          </div>

          <div class="demo-item">
            <h4>{{ 'select.dropdown_solo_etiquetas' | translate }}</h4>
            <openiis-searchable-dropdown
              [options]="citiesOptions"
              [selectedValue]="selectedCity"
              placeholder="{{ 'select.buscar_ciudades' | translate }}"
              size="md"
              [searchInDescription]="false"
              tooltip="{{ 'select.tooltip_buscar_etiquetas' | translate }}"
              (selectionChanged)="onCityChange($event)"
            >
            </openiis-searchable-dropdown>
            <p class="selection-result">
              {{ selectedCity }}
            </p>
          </div>
        </div>
      </div>

      <div class="demo-subsection">
        <h3>{{ 'select.tamaños_de_dropdown_con_búsqueda' | translate }}</h3>
        <div class="demo-grid">
          <div class="demo-item">
            <h4>{{ 'select.dropdown_small' | translate }}</h4>
            <openiis-searchable-dropdown
              [options]="searchableProductsOptions"
              [selectedValue]="selectedSearchableProduct"
              placeholder="{{ 'select.buscar' | translate }}"
              size="sm"
              tooltip="{{ 'select.tooltip_tamaño_pequeño' | translate }}"
            >
            </openiis-searchable-dropdown>
          </div>

          <div class="demo-item">
            <h4>{{ 'select.dropdown_medium' | translate }}</h4>
            <openiis-searchable-dropdown
              [options]="searchableProductsOptions"
              [selectedValue]="selectedSearchableProduct"
              placeholder="{{ 'select.buscar_productos' | translate }}"
              size="md"
              tooltip="{{ 'select.tooltip_tamaño_mediano' | translate }}"
            >
            </openiis-searchable-dropdown>
          </div>

          <div class="demo-item">
            <h4>{{ 'select.dropdown_large' | translate }}</h4>
            <openiis-searchable-dropdown
              [options]="searchableProductsOptions"
              [selectedValue]="selectedSearchableProduct"
              placeholder="{{ 'select.buscar_productos' | translate }}"
              size="lg"
              tooltip="{{ 'select.tooltip_tamaño_grande' | translate }}"
            >
            </openiis-searchable-dropdown>
          </div>

          <div class="demo-item">
            <h4>{{ 'select.dropdown_deshabilitado' | translate }}</h4>
            <openiis-searchable-dropdown
              [options]="searchableProductsOptions"
              [selectedValue]="selectedSearchableProduct"
              placeholder="{{ 'select.campo_deshabilitado' | translate }}"
              size="md"
              [disabled]="true"
              tooltip="{{ 'select.tooltip_deshabilitado' | translate }}"
            >
            </openiis-searchable-dropdown>
          </div>
        </div>
      </div>
    </section>
  `,
})
export class SelectSecComponent {
  dropdownOptions = [
    { value: 'option1', label: 'Option 1' },
    { value: 'option2', label: 'Option 2' },
    { value: 'option3', label: 'Option 3' },
    { value: 'option4', label: 'Option 4' },
  ];

  citiesOptions = [
    { value: 'madrid', label: 'Madrid' },
    { value: 'barcelona', label: 'Barcelona' },
    { value: 'valencia', label: 'Valencia' },
    { value: 'sevilla', label: 'Sevilla' },
  ];

  countriesOptions = [
    { value: 'es', label: 'España' },
    { value: 'fr', label: 'Francia' },
    { value: 'it', label: 'Italia' },
    { value: 'pt', label: 'Portugal' },
  ];

  searchableProductsOptions = [
    { value: 'product1', label: 'Product 1' },
    { value: 'product2', label: 'Product 2' },
    { value: 'product3', label: 'Product 3' },
    { value: 'product4', label: 'Product 4' },
  ];

  searchableCountriesOptions = [
    { value: 'es', label: 'España' },
    { value: 'fr', label: 'Francia' },
    { value: 'it', label: 'Italia' },
    { value: 'pt', label: 'Portugal' },
  ];

  selectedDropdownValue = 'option1';
  selectedCity = 'madrid';
  selectedCountry = 'es';
  selectedSearchableProduct = '';
  selectedSearchableCountry = 'es';

  /* ===== DROPDOWN METHODS ===== */
  onDropdownChange(value: string): void {
    this.selectedDropdownValue = value;
  }

  onCityChange(value: string): void {
    this.selectedCity = value;
  }

  onSearchableProductChange(value: string): void {
    this.selectedSearchableProduct = value;
  }

  onSearchableCountryChange(value: string): void {
    this.selectedSearchableCountry = value;
  }
}
