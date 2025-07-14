import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { OpeniisDropdownComponent } from '../components';
import { OpeniisSearchableDropdownComponent } from '../components/dropdowns/searchable-dropdown.component';

@Component({
  selector: 'app-select-sec',
  standalone: true,
  imports: [
    CommonModule,
    OpeniisDropdownComponent,
    OpeniisSearchableDropdownComponent,
  ],
  template: `
    <section class="demo-section">
      <h2>Selectores</h2>

      <div class="demo-subsection">
        <h3>Dropdowns</h3>
        <div class="demo-grid">
          <div class="demo-item">
            <h4>Dropdown Básico</h4>
            <openiis-dropdown
              [options]="dropdownOptions"
              [selectedValue]="selectedDropdownValue"
              size="md"
              tooltip="Selecciona una opción"
              (selectionChanged)="onDropdownChange($event)"
            >
            </openiis-dropdown>
            <p class="selection-result">
              Seleccionado: {{ selectedDropdownValue }}
            </p>
          </div>
        </div>
      </div>

      <div class="demo-subsection">
        <h3>Tamaños de Dropdown</h3>
        <div class="demo-grid">
          <div class="demo-item">
            <h4>Dropdown Small</h4>
            <openiis-dropdown
              [options]="dropdownOptions"
              [selectedValue]="selectedDropdownValue"
              size="sm"
            >
            </openiis-dropdown>
          </div>

          <div class="demo-item">
            <h4>Dropdown Medium</h4>
            <openiis-dropdown
              [options]="dropdownOptions"
              [selectedValue]="selectedDropdownValue"
              size="md"
            >
            </openiis-dropdown>
          </div>

          <div class="demo-item">
            <h4>Dropdown Large</h4>
            <openiis-dropdown
              [options]="dropdownOptions"
              [selectedValue]="selectedDropdownValue"
              size="lg"
            >
            </openiis-dropdown>
          </div>

          <div class="demo-item">
            <h4>Dropdown Deshabilitado</h4>
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
        <h3>Dropdowns con Búsqueda</h3>
        <div class="demo-grid">
          <div class="demo-item">
            <h4>Dropdown de Productos</h4>
            <openiis-searchable-dropdown
              [options]="searchableProductsOptions"
              [selectedValue]="selectedSearchableProduct"
              placeholder="Buscar productos..."
              size="md"
              tooltip="Busca y selecciona un producto"
              (selectionChanged)="onSearchableProductChange($event)"
            >
            </openiis-searchable-dropdown>
            <p class="selection-result">
              Producto seleccionado: {{ selectedSearchableProduct }}
            </p>
          </div>

          <div class="demo-item">
            <h4>Dropdown de Países</h4>
            <openiis-searchable-dropdown
              [options]="searchableCountriesOptions"
              [selectedValue]="selectedSearchableCountry"
              placeholder="Buscar países..."
              size="md"
              tooltip="Busca y selecciona un país"
              (selectionChanged)="onSearchableCountryChange($event)"
            >
            </openiis-searchable-dropdown>
            <p class="selection-result">
              País seleccionado: {{ selectedSearchableCountry }}
            </p>
          </div>

          <div class="demo-item">
            <h4>Dropdown Solo Etiquetas</h4>
            <openiis-searchable-dropdown
              [options]="citiesOptions"
              [selectedValue]="selectedCity"
              placeholder="Buscar ciudades..."
              size="md"
              [searchInDescription]="false"
              tooltip="Busca solo en las etiquetas"
              (selectionChanged)="onCityChange($event)"
            >
            </openiis-searchable-dropdown>
            <p class="selection-result">Ciudad: {{ selectedCity }}</p>
          </div>
        </div>
      </div>

      <div class="demo-subsection">
        <h3>Tamaños de Dropdown con Búsqueda</h3>
        <div class="demo-grid">
          <div class="demo-item">
            <h4>Dropdown Small</h4>
            <openiis-searchable-dropdown
              [options]="searchableProductsOptions"
              [selectedValue]="selectedSearchableProduct"
              placeholder="Buscar..."
              size="sm"
              tooltip="Tamaño pequeño"
            >
            </openiis-searchable-dropdown>
          </div>

          <div class="demo-item">
            <h4>Dropdown Medium</h4>
            <openiis-searchable-dropdown
              [options]="searchableProductsOptions"
              [selectedValue]="selectedSearchableProduct"
              placeholder="Buscar productos..."
              size="md"
              tooltip="Tamaño mediano"
            >
            </openiis-searchable-dropdown>
          </div>

          <div class="demo-item">
            <h4>Dropdown Large</h4>
            <openiis-searchable-dropdown
              [options]="searchableProductsOptions"
              [selectedValue]="selectedSearchableProduct"
              placeholder="Buscar productos..."
              size="lg"
              tooltip="Tamaño grande"
            >
            </openiis-searchable-dropdown>
          </div>

          <div class="demo-item">
            <h4>Dropdown Deshabilitado</h4>
            <openiis-searchable-dropdown
              [options]="searchableProductsOptions"
              [selectedValue]="selectedSearchableProduct"
              placeholder="Campo deshabilitado"
              size="md"
              [disabled]="true"
              tooltip="Dropdown deshabilitado"
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
    { value: 'option1', label: 'Opción 1' },
    { value: 'option2', label: 'Opción 2' },
    { value: 'option3', label: 'Opción 3' },
    { value: 'option4', label: 'Opción 4' },
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
    { value: 'product1', label: 'Producto 1' },
    { value: 'product2', label: 'Producto 2' },
    { value: 'product3', label: 'Producto 3' },
    { value: 'product4', label: 'Producto 4' },
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
    console.log('Dropdown cambiado:', value);
  }

  onCityChange(value: string): void {
    this.selectedCity = value;
    console.log('Ciudad cambiada:', value);
  }

  onSearchableProductChange(value: string): void {
    this.selectedSearchableProduct = value;
    console.log('Producto seleccionado:', value);
  }

  onSearchableCountryChange(value: string): void {
    this.selectedSearchableCountry = value;
    console.log('País con búsqueda seleccionado:', value);
  }
}
