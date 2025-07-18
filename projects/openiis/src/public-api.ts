/*
 * Public API Surface of openiis-ui
 *
 * COMPONENTES STANDALONE
 * Todos los componentes son standalone, importa directamente donde los necesites:
 *
 * @example
 * import { OpeniisButtonComponent, OpeniisCardComponent } from 'openiis-ui';
 *
 * @Component({
 *   imports: [OpeniisButtonComponent, OpeniisCardComponent],
 *   template: `
 *     <openiis-card>
 *       <openiis-button>Click me</openiis-button>
 *     </openiis-card>
 *   `
 * })
 */

/*
 * Components
 */

// Buttons
export * from './lib/buttons';
export * from './lib/button-group';
export * from './lib/radio-button';
export * from './lib/switch';
export * from './lib/fab';

// Dropdowns
export * from './lib/dropdowns/dropdown.component';
export * from './lib/dropdowns/searchable-dropdown.component';

// Inputs
export * from './lib/input';
export * from './lib/input-date';
export * from './lib/search-input';

// Checkboxes
export * from './lib/checkboxes';

// Modals
export * from './lib/modal';
export * from './lib/alert-modal';
export * from './lib/confirm-modal';

// Notifications
export * from './lib/toast';
export * from './lib/tooltip';

// States
export * from './lib/empty-state';

// Others
export * from './lib/avatar';
export * from './lib/badge';
export * from './lib/breadcrumb';
export * from './lib/card';
export * from './lib/spinner';
export * from './lib/tabs';
export * from './lib/uploader';
export * from './lib/sidebar';

/*
 * Services
 */

// Mode
export * from './lib/services/mode/mode.service';
export * from './lib/services/theme/theme.service';

// Scroll
export * from './lib/services/scroll/scroll.service';

// svg
export * from './lib/services/svg/svg-icon.service';
export * from './lib/services/svg/svg-icon.directive';

// Upload
export * from './lib/services/upload/upload.service';
