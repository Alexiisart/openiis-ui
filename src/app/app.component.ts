import { Component, OnInit, OnDestroy } from '@angular/core';
import { Subject, takeUntil } from 'rxjs';
import { CommonModule } from '@angular/common';

/* Components openiis*/
import { OpeniisButtonComponent } from './components/buttons/button.component';
import { OpeniisTooltipComponent } from './components/tooltip/tooltip.component';
import { OpeniisEmptyStateComponent } from './components/empty-state/empty-state.component';
import { OpeniisAvatarComponent } from './components/avatar/avatar.component';
import { OpeniisBadgeComponent } from './components/badge/badge.component';
import { OpeniisBreadcrumbComponent } from './components/breadcrumb/breadcrumb.component';
import {
  OpeniisCardComponent,
  CardButton,
} from './components/card/card.component';
import { OpeniisFabComponent } from './components/fab/fab.component';
import { OpeniisProgressBarComponent } from './components/progress-bar/progress-bar.component';
import { OpeniisSpinnerComponent } from './components/spinner/spinner.component';
import { OpeniisSwitchComponent } from './components/switch/switch.component';
import {
  OpeniisTableComponent,
  TableColumn,
} from './components/table/table.component';
import { OpeniisTabsComponent } from './components/tabs/tabs.component';
import { OpeniisUploaderComponent } from './components/uploader/uploader.component';
import { FileUploadItem, UploadConfig } from './services/upload.service';
import { ButtonSecComponent } from './pages/button-sec.component';
import { InputSecComponent } from './pages/input-sec.component';
import { SelectSecComponent } from './pages/select-sec.component';
import { CheckboxSecComponent } from './pages/checkbox-sec.component';
import { RadioSecComponent } from './pages/radio-sec.component';
import { DateSecComponent } from './pages/date-sec.component';
import { ModalSecComponent } from './pages/modal-sec.component';
import { NotificationSecComponent } from './pages/notification-sec.component';

/* Services */
import {
  OpeniisThemeService,
  ThemeMode,
  OpeniisTheme,
} from './services/theme.service';
import { OpeniisButtonGroupComponent } from './components';

@Component({
  selector: 'app-root',
  imports: [
    CommonModule,
    OpeniisButtonComponent,
    OpeniisTooltipComponent,
    OpeniisEmptyStateComponent,
    OpeniisAvatarComponent,
    OpeniisBadgeComponent,
    OpeniisBreadcrumbComponent,
    OpeniisCardComponent,
    OpeniisFabComponent,
    OpeniisProgressBarComponent,
    OpeniisSpinnerComponent,
    OpeniisSwitchComponent,
    OpeniisTableComponent,
    OpeniisTabsComponent,
    OpeniisUploaderComponent,
    ButtonSecComponent,
    InputSecComponent,
    SelectSecComponent,
    CheckboxSecComponent,
    RadioSecComponent,
    DateSecComponent,
    ModalSecComponent,
    NotificationSecComponent,
    OpeniisButtonGroupComponent,
  ],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css',
})
export class AppComponent implements OnInit, OnDestroy {
  title = 'openiis-ui-test';

  /** Rutas de los logos según el tema */
  get logoSrc(): string {
    return this.isDarkMode ? 'assets/logo-dark.svg' : 'assets/logo.svg';
  }

  get sublogoSrc(): string {
    return this.isDarkMode ? 'assets/sublogo-dark.svg' : 'assets/sublogo.svg';
  }

  // Para el tema
  private destroy$ = new Subject<void>();
  currentThemeMode: ThemeMode = 'light';
  isDarkMode = false;
  currentTheme: OpeniisTheme = 'classic';

  // Estados para los modales
  showAlertModal = false;
  showConfirmModal = false;
  showModal = false;
  showToast = false;
  showSuccessToast = false;
  showWarningToast = false;
  showDangerToast = false;
  showInfoToast = false;

  // Datos para la tabla
  tableColumns: TableColumn[] = [
    {
      key: 'id',
      label: 'ID',
      sortable: true,
      width: '80px',
      align: 'center',
    },
    {
      key: 'name',
      label: 'Nombre',
      sortable: true,
      filterable: true,
      filterType: 'text',
      width: '200px',
    },
    {
      key: 'email',
      label: 'Correo Electrónico',
      sortable: true,
      filterable: true,
      filterType: 'text',
      width: '250px',
    },
    {
      key: 'role',
      label: 'Rol',
      sortable: true,
      filterable: true,
      filterType: 'select',
      filterOptions: [
        { value: 'admin', label: 'Administrador' },
        { value: 'user', label: 'Usuario' },
        { value: 'moderator', label: 'Moderador' },
        { value: 'guest', label: 'Invitado' },
      ],
      width: '150px',
    },
    {
      key: 'status',
      label: 'Estado',
      sortable: true,
      filterable: true,
      filterType: 'select',
      filterOptions: [
        { value: 'active', label: 'Activo' },
        { value: 'inactive', label: 'Inactivo' },
        { value: 'pending', label: 'Pendiente' },
        { value: 'suspended', label: 'Suspendido' },
      ],
      width: '120px',
      align: 'center',
      render: (value: string) => {
        const statusMap: { [key: string]: string } = {
          active: '<span class="badge badge-success">Activo</span>',
          inactive: '<span class="badge badge-danger">Inactivo</span>',
          pending: '<span class="badge badge-warning">Pendiente</span>',
          suspended: '<span class="badge badge-secondary">Suspendido</span>',
        };
        return statusMap[value] || value;
      },
    },
    {
      key: 'department',
      label: 'Departamento',
      sortable: true,
      filterable: true,
      filterType: 'select',
      filterOptions: [
        { value: 'engineering', label: 'Ingeniería' },
        { value: 'design', label: 'Diseño' },
        { value: 'marketing', label: 'Marketing' },
        { value: 'sales', label: 'Ventas' },
        { value: 'support', label: 'Soporte' },
        { value: 'hr', label: 'Recursos Humanos' },
      ],
      width: '150px',
    },
    {
      key: 'joinDate',
      label: 'Fecha de Ingreso',
      sortable: true,
      filterable: true,
      filterType: 'date',
      width: '180px',
      align: 'center',
    },
    {
      key: 'salary',
      label: 'Salario',
      sortable: true,
      filterable: true,
      filterType: 'number',
      width: '120px',
      align: 'right',
      render: (value: number) => {
        return `€${value.toLocaleString('es-ES')}`;
      },
    },
    {
      key: 'actions',
      label: 'Acciones',
      width: '120px',
      align: 'center',
      render: (value: any, row: any) => {
        return `
          <div class="table-actions">
            <button class="btn btn-sm btn-outline-primary" onclick="editUser(${row.id})">
              <i class="fas fa-edit"></i>
            </button>
            <button class="btn btn-sm btn-outline-danger" onclick="deleteUser(${row.id})">
              <i class="fas fa-trash"></i>
            </button>
          </div>
        `;
      },
    },
  ];

  tableData = [
    {
      id: 1,
      name: 'Ana García López',
      email: 'ana.garcia@empresa.com',
      role: 'admin',
      status: 'active',
      department: 'engineering',
      joinDate: '2023-01-15',
      salary: 65000,
    },
    {
      id: 2,
      name: 'Carlos Ruiz Martín',
      email: 'carlos.ruiz@empresa.com',
      role: 'user',
      status: 'active',
      department: 'design',
      joinDate: '2023-02-20',
      salary: 45000,
    },
    {
      id: 3,
      name: 'María López Silva',
      email: 'maria.lopez@empresa.com',
      role: 'moderator',
      status: 'pending',
      department: 'marketing',
      joinDate: '2023-03-10',
      salary: 50000,
    },
    {
      id: 4,
      name: 'Luis Fernández Torres',
      email: 'luis.fernandez@empresa.com',
      role: 'user',
      status: 'inactive',
      department: 'sales',
      joinDate: '2023-04-05',
      salary: 42000,
    },
    {
      id: 5,
      name: 'Elena Jiménez Morales',
      email: 'elena.jimenez@empresa.com',
      role: 'admin',
      status: 'active',
      department: 'engineering',
      joinDate: '2023-05-12',
      salary: 70000,
    },
    {
      id: 6,
      name: 'David Sánchez Herrera',
      email: 'david.sanchez@empresa.com',
      role: 'user',
      status: 'suspended',
      department: 'support',
      joinDate: '2023-06-18',
      salary: 38000,
    },
    {
      id: 7,
      name: 'Carmen Rodríguez Vega',
      email: 'carmen.rodriguez@empresa.com',
      role: 'moderator',
      status: 'active',
      department: 'hr',
      joinDate: '2023-07-22',
      salary: 48000,
    },
    {
      id: 8,
      name: 'Javier Martínez Pérez',
      email: 'javier.martinez@empresa.com',
      role: 'user',
      status: 'active',
      department: 'design',
      joinDate: '2023-08-30',
      salary: 44000,
    },
    {
      id: 9,
      name: 'Isabel Gómez Ruiz',
      email: 'isabel.gomez@empresa.com',
      role: 'guest',
      status: 'pending',
      department: 'marketing',
      joinDate: '2023-09-15',
      salary: 35000,
    },
    {
      id: 10,
      name: 'Fernando Castro Díaz',
      email: 'fernando.castro@empresa.com',
      role: 'admin',
      status: 'active',
      department: 'engineering',
      joinDate: '2023-10-08',
      salary: 75000,
    },
    {
      id: 11,
      name: 'Sofía Moreno Jiménez',
      email: 'sofia.moreno@empresa.com',
      role: 'user',
      status: 'active',
      department: 'sales',
      joinDate: '2023-11-12',
      salary: 43000,
    },
    {
      id: 12,
      name: 'Antonio Vargas López',
      email: 'antonio.vargas@empresa.com',
      role: 'moderator',
      status: 'inactive',
      department: 'support',
      joinDate: '2023-12-01',
      salary: 40000,
    },
    {
      id: 13,
      name: 'Lucía Hernández Ruiz',
      email: 'lucia.hernandez@empresa.com',
      role: 'user',
      status: 'active',
      department: 'hr',
      joinDate: '2024-01-10',
      salary: 47000,
    },
    {
      id: 14,
      name: 'Miguel Álvarez Santos',
      email: 'miguel.alvarez@empresa.com',
      role: 'guest',
      status: 'suspended',
      department: 'design',
      joinDate: '2024-02-14',
      salary: 36000,
    },
    {
      id: 15,
      name: 'Raquel Iglesias Martín',
      email: 'raquel.iglesias@empresa.com',
      role: 'admin',
      status: 'active',
      department: 'marketing',
      joinDate: '2024-03-20',
      salary: 68000,
    },
  ];

  // Datos para múltiples dropdowns
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

  selectedDropdownValue = 'option1';
  selectedCity = 'madrid';
  selectedCountry = 'es';

  // Datos para dropdowns con búsqueda
  searchableProductsOptions = [
    {
      value: 'laptop',
      label: 'Laptop Dell XPS 13',
      description: 'Portátil ultra-delgado con procesador Intel i7',
    },
    {
      value: 'monitor',
      label: 'Monitor 4K Samsung',
      description: 'Monitor de 27 pulgadas con resolución 4K',
    },
    {
      value: 'keyboard',
      label: 'Teclado Mecánico Logitech',
      description: 'Teclado mecánico con switches azules',
    },
    {
      value: 'mouse',
      label: 'Mouse Inalámbrico',
      description: 'Mouse ergonómico con conexión Bluetooth',
    },
    {
      value: 'headphones',
      label: 'Auriculares Sony WH-1000XM4',
      description: 'Auriculares con cancelación de ruido',
    },
    {
      value: 'tablet',
      label: 'Tablet iPad Pro',
      description: 'Tablet profesional con pantalla de 12.9 pulgadas',
    },
    {
      value: 'smartphone',
      label: 'Smartphone iPhone 15',
      description: 'Teléfono inteligente con cámara avanzada',
    },
    {
      value: 'camera',
      label: 'Cámara Canon EOS R6',
      description: 'Cámara mirrorless profesional',
    },
  ];

  searchableCountriesOptions = [
    { value: 'es', label: 'España', description: 'Reino de España - Europa' },
    {
      value: 'fr',
      label: 'Francia',
      description: 'República Francesa - Europa',
    },
    {
      value: 'it',
      label: 'Italia',
      description: 'República Italiana - Europa',
    },
    {
      value: 'pt',
      label: 'Portugal',
      description: 'República Portuguesa - Europa',
    },
    {
      value: 'de',
      label: 'Alemania',
      description: 'República Federal de Alemania - Europa',
    },
    {
      value: 'uk',
      label: 'Reino Unido',
      description: 'Reino Unido de Gran Bretaña e Irlanda del Norte',
    },
    {
      value: 'us',
      label: 'Estados Unidos',
      description: 'Estados Unidos de América - América del Norte',
    },
    { value: 'ca', label: 'Canadá', description: 'Canadá - América del Norte' },
    {
      value: 'mx',
      label: 'México',
      description: 'Estados Unidos Mexicanos - América del Norte',
    },
    {
      value: 'br',
      label: 'Brasil',
      description: 'República Federativa del Brasil - América del Sur',
    },
    {
      value: 'ar',
      label: 'Argentina',
      description: 'República Argentina - América del Sur',
    },
    { value: 'jp', label: 'Japón', description: 'Japón - Asia' },
    {
      value: 'kr',
      label: 'Corea del Sur',
      description: 'República de Corea - Asia',
    },
    {
      value: 'cn',
      label: 'China',
      description: 'República Popular China - Asia',
    },
    {
      value: 'in',
      label: 'India',
      description: 'República de la India - Asia',
    },
    {
      value: 'au',
      label: 'Australia',
      description: 'Mancomunidad de Australia - Oceanía',
    },
  ];

  selectedSearchableProduct = '';
  selectedSearchableCountry = 'es';

  // Datos para diferentes tipos de modales
  successAlertData = {
    message:
      'Operación completada exitosamente. Los datos han sido guardados correctamente.',
    type: 'success' as const,
  };

  warningAlertData = {
    message:
      'Atención: Esta acción requerirá confirmación adicional antes de proceder.',
    type: 'warning' as const,
  };

  dangerAlertData = {
    message:
      'Error crítico: No se pudo completar la operación. Por favor, intente nuevamente.',
    type: 'danger' as const,
  };

  infoAlertData = {
    message: 'Información: Esta funcionalidad estará disponible próximamente.',
    type: 'info' as const,
  };

  // Datos para modales de confirmación
  deleteConfirmData = {
    message:
      '¿Estás seguro de que quieres eliminar este elemento? Esta acción no se puede deshacer.',
    title: 'Confirmar eliminación',
    confirmText: 'Eliminar',
    cancelText: 'Cancelar',
  };

  saveConfirmData = {
    message: '¿Deseas guardar los cambios realizados?',
    title: 'Guardar cambios',
    confirmText: 'Guardar',
    cancelText: 'Descartar',
    thirdButtonText: 'Guardar como borrador',
  };

  // Datos para modales de texto
  addItemModalData = {
    title: 'Agregar nuevo elemento',
    label: 'Descripción del elemento:',
    placeholder: 'Escribe la descripción aquí...',
    confirmButtonText: 'Agregar',
  };

  editItemModalData = {
    title: 'Editar elemento existente',
    label: 'Modificar descripción:',
    placeholder: 'Actualiza la descripción...',
    currentValue: 'Descripción actual del elemento',
    confirmButtonText: 'Actualizar',
  };

  // Datos para diferentes tipos de toast
  successToastData = {
    message: '¡Éxito! La operación se completó correctamente.',
    type: 'success' as const,
    duration: 3000,
  };

  warningToastData = {
    message: 'Advertencia: Verifica los datos antes de continuar.',
    type: 'warning' as const,
    duration: 3000,
  };

  dangerToastData = {
    message: 'Error: No se pudo completar la operación.',
    type: 'danger' as const,
    duration: 3000,
  };

  infoToastData = {
    message: 'Información: Funcionalidad actualizada disponible.',
    type: 'info' as const,
    duration: 3000,
  };

  // Variables para inputs
  basicInputValue = '';
  emailInputValue = '';
  passwordInputValue = '';
  searchInputValue = '';
  urlInputValue = '';
  telInputValue = '';
  telMexicoValue = '';
  telInternationalValue = '';
  numberValue = '';
  usernameInputValue = '';
  textareaValue = '';
  disabledInputValue = 'Texto no editable';
  readonlyInputValue = 'Solo lectura';
  errorInputValue = '';
  successInputValue = 'Valor válido';

  // Variables para búsqueda
  searchTerm = '';
  searchResults = '';

  // Variables para fechas
  basicDateValue: string | null = null;
  overdueDate: string | null = '2024-01-01T00:00:00.000Z';
  futureDate: string | null = null;
  disabledDate: string | null = null;

  // Fecha mínima para fechas futuras (hoy)
  get futureDateMinimum(): string {
    const today = new Date();
    return today.toISOString().split('T')[0];
  }

  // Propiedades computadas para grupo de notificaciones
  get allNotifications(): boolean {
    return (
      this.notificationEmail && this.notificationPush && this.notificationSMS
    );
  }

  get someNotifications(): boolean {
    const checkedCount = [
      this.notificationEmail,
      this.notificationPush,
      this.notificationSMS,
    ].filter(Boolean).length;
    return checkedCount > 0 && checkedCount < 3;
  }

  // Variables para checkboxes
  basicCheckbox = false;
  primaryCheckbox = true;
  successCheckbox = false;
  warningCheckbox = true;
  dangerCheckbox = false;
  subtleCheckbox = false;
  outlineCheckbox = true;
  disabledCheckbox = true;
  indeterminateCheckbox = false;

  // Checkboxes con ayuda
  acceptTerms = false;
  subscribeNewsletter = false;
  requiredField = false;

  // Grupo de notificaciones
  notificationEmail = false;
  notificationPush = true;
  notificationSMS = false;

  // Estados especiales
  checkboxWithTooltip = false;
  loadingCheckbox = true;
  loadingCheckboxValue = false;
  validatedCheckbox = true;

  // Estados de radio buttons
  selectedGender = '';
  selectedPlan = '';
  selectedNotificationLevel = '';
  selectedPaymentMethod = '';
  selectedShippingMethod = '';
  selectedSize = '';

  // Variables para tooltips
  showTooltipTop = false;
  showTooltipBottom = false;
  showTooltipLeft = false;
  showTooltipRight = false;
  showTooltipDefault = false;
  showTooltipDanger = false;

  /* Loading buttons */
  loadingButton = false;
  loadingButton2 = false;

  /* Modal type */
  currentModalType = '';

  /* Upload configurations */
  basicUploadConfig: UploadConfig = {
    maxFileSize: 10,
    allowedTypes: ['image/*', 'application/pdf', '.doc', '.docx'],
    maxFiles: 5,
  };

  imageUploadConfig: UploadConfig = {
    maxFileSize: 5,
    allowedTypes: ['image/*'],
    maxFiles: 10,
    enableResize: true,
    compressionQuality: 0.8,
  };

  documentUploadConfig: UploadConfig = {
    maxFileSize: 20,
    allowedTypes: [
      'application/pdf',
      '.doc',
      '.docx',
      '.xls',
      '.xlsx',
      '.ppt',
      '.pptx',
    ],
    maxFiles: 5,
  };

  avatarUploadConfig: UploadConfig = {
    maxFileSize: 2,
    allowedTypes: ['image/jpeg', 'image/png'],
    maxFiles: 1,
    enableResize: true,
    maxWidth: 400,
    maxHeight: 400,
  };

  compactUploadConfig: UploadConfig = {
    maxFileSize: 5,
    allowedTypes: ['*'],
    maxFiles: 3,
  };

  /* Card Action Buttons */
  cardActionButtons: CardButton[] = [
    {
      id: 'edit',
      icon: 'edit',
      tooltip: 'Editar',
      variant: 'outline-primary',
      ariaLabel: 'Editar elemento',
    },
    {
      id: 'share',
      icon: 'share',
      tooltip: 'Compartir',
      variant: 'outline-secondary',
      ariaLabel: 'Compartir elemento',
    },
    {
      id: 'delete',
      icon: 'delete',
      tooltip: 'Eliminar',
      variant: 'outline-danger',
      ariaLabel: 'Eliminar elemento',
    },
  ];

  productCardButtons: CardButton[] = [
    {
      id: 'favorite',
      icon: 'favorite',
      tooltip: 'Agregar a favoritos',
      variant: 'outline-danger',
      ariaLabel: 'Agregar a favoritos',
    },
    {
      id: 'cart',
      icon: 'shopping_cart',
      tooltip: 'Agregar al carrito',
      variant: 'outline-success',
      ariaLabel: 'Agregar al carrito',
    },
    {
      id: 'view',
      icon: 'visibility',
      tooltip: 'Ver detalles',
      variant: 'outline-primary',
      ariaLabel: 'Ver detalles',
    },
  ];

  userCardButtons: CardButton[] = [
    {
      id: 'message',
      icon: 'message',
      tooltip: 'Enviar mensaje',
      variant: 'outline-primary',
      ariaLabel: 'Enviar mensaje',
    },
    {
      id: 'call',
      icon: 'phone',
      tooltip: 'Llamar',
      variant: 'outline-success',
      ariaLabel: 'Llamar',
    },
    {
      id: 'more',
      icon: 'more_vert',
      tooltip: 'Más opciones',
      variant: 'outline-secondary',
      ariaLabel: 'Más opciones',
    },
  ];

  constructor(private themeService: OpeniisThemeService) {
    this.themeService.currentTheme$.subscribe((theme) => {
      this.currentTheme = theme;
    });
  }

  /* Setters */
  setTheme(theme: OpeniisTheme): void {
    this.themeService.setTheme(theme);
  }

  ngOnInit(): void {
    this.themeService.currentMode$
      .pipe(takeUntil(this.destroy$))
      .subscribe((mode) => {
        this.currentThemeMode = mode;
        this.isDarkMode = mode === 'dark';
      });
  }

  ngOnDestroy(): void {
    this.destroy$.next();
    this.destroy$.complete();
  }

  toggleDarkMode(): void {
    this.themeService.toggleMode();
  }

  onButtonClick(buttonType: string): void {
    console.log(`Botón ${buttonType} clickeado`);
    if (buttonType === 'loading1') {
      this.loadingButton = true;
      setTimeout(() => {
        this.loadingButton = false;
      }, 2000);
    } else if (buttonType === 'loading2') {
      this.loadingButton2 = true;
      setTimeout(() => {
        this.loadingButton2 = false;
      }, 2000);
    } else if (buttonType === 'fab-loading') {
      this.loadingButton = true;
      setTimeout(() => {
        this.loadingButton = false;
      }, 2000);
    } else if (buttonType === 'fab-loading-extended') {
      this.loadingButton2 = true;
      setTimeout(() => {
        this.loadingButton2 = false;
      }, 2000);
    }
  }

  onCardActionButtonClick(event: {
    buttonId: string;
    event: MouseEvent;
  }): void {
    console.log(`Botón de card ${event.buttonId} clickeado`);

    // Mostrar mensaje toast según el botón clickeado
    switch (event.buttonId) {
      case 'edit':
        this.showToastMessage('info');
        break;
      case 'share':
        this.showToastMessage('success');
        break;
      case 'delete':
        this.showConfirm('delete');
        break;
      case 'favorite':
        this.showToastMessage('warning');
        break;
      case 'cart':
        this.showToastMessage('success');
        break;
      case 'view':
        this.showToastMessage('info');
        break;
      case 'message':
        this.showToastMessage('info');
        break;
      case 'call':
        this.showToastMessage('success');
        break;
      case 'more':
        this.showToastMessage('info');
        break;
      default:
        console.log('Acción no reconocida');
    }
  }

  // Métodos para dropdowns
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

  // Métodos para búsqueda
  onSearchChange(term: string): void {
    this.searchTerm = term;
    this.searchResults = term ? `Búsqueda: "${term}"` : '';
    console.log('Búsqueda cambiada:', term);
  }

  onClearSearch(): void {
    this.searchTerm = '';
    this.searchResults = '';
    console.log('Búsqueda limpiada');
  }

  // Métodos para fechas
  onDateChange(date: string | null, type: string): void {
    switch (type) {
      case 'basic':
        this.basicDateValue = date;
        break;
      case 'future':
        this.futureDate = date;
        break;
    }
    console.log(`Fecha ${type} cambiada:`, date);
  }

  // Métodos para checkboxes
  onCheckboxChange(checked: boolean, type: string): void {
    switch (type) {
      case 'basic':
        this.basicCheckbox = checked;
        break;
      case 'primary':
        this.primaryCheckbox = checked;
        break;
      case 'success':
        this.successCheckbox = checked;
        break;
      case 'warning':
        this.warningCheckbox = checked;
        break;
      case 'danger':
        this.dangerCheckbox = checked;
        break;
      case 'subtle':
        this.subtleCheckbox = checked;
        break;
      case 'outline':
        this.outlineCheckbox = checked;
        break;
      case 'indeterminate':
        this.indeterminateCheckbox = checked;
        break;
      case 'acceptTerms':
        this.acceptTerms = checked;
        break;
      case 'subscribeNewsletter':
        this.subscribeNewsletter = checked;
        break;
      case 'requiredField':
        this.requiredField = checked;
        break;
      case 'notificationEmail':
        this.notificationEmail = checked;
        break;
      case 'notificationPush':
        this.notificationPush = checked;
        break;
      case 'notificationSMS':
        this.notificationSMS = checked;
        break;
      case 'checkboxWithTooltip':
        this.checkboxWithTooltip = checked;
        break;
      case 'validatedCheckbox':
        this.validatedCheckbox = checked;
        break;
    }
    console.log(`Checkbox ${type} cambiado:`, checked);
  }

  // Lógica para el toggle de selección de todas las notificaciones
  onSelectAllNotifications(checked: boolean) {
    this.notificationEmail = checked;
    this.notificationPush = checked;
    this.notificationSMS = checked;
  }

  // Método para manejar el envío de formularios
  onFormSubmit(formType: string) {
    console.log(`Formulario ${formType} enviado`);
    // Aquí se podría implementar la lógica de envío del formulario
  }

  // Método para manejar cambios en radio buttons
  onRadioButtonChange(value: any, type: string): void {
    console.log(`Radio button ${type} cambiado a:`, value);
    switch (type) {
      case 'gender':
        this.selectedGender = value;
        break;
      case 'plan':
        this.selectedPlan = value;
        break;
      case 'notification':
        this.selectedNotificationLevel = value;
        break;
      case 'payment':
        this.selectedPaymentMethod = value;
        break;
      case 'shipping':
        this.selectedShippingMethod = value;
        break;
      case 'size':
        this.selectedSize = value;
        break;
    }
  }

  // Métodos para controlar modales
  showAlert(type: string): void {
    this.currentModalType = type;
    this.showAlertModal = true;
  }

  showConfirm(type: string): void {
    this.currentModalType = type;
    this.showConfirmModal = true;
  }

  showTextModal(type: string): void {
    this.currentModalType = type;
    this.showModal = true;
  }

  showToastMessage(type: string): void {
    switch (type) {
      case 'success':
        this.showSuccessToast = true;
        break;
      case 'warning':
        this.showWarningToast = true;
        break;
      case 'danger':
        this.showDangerToast = true;
        break;
      case 'info':
        this.showInfoToast = true;
        break;
    }
  }

  // Métodos de callback para modales
  onAlertClosed(): void {
    this.showAlertModal = false;
    console.log('Modal de alerta cerrado');
  }

  onConfirmConfirmed(): void {
    console.log('Acción confirmada');
    this.showConfirmModal = false;
  }

  onConfirmCancelled(): void {
    console.log('Acción cancelada');
    this.showConfirmModal = false;
  }

  onConfirmThirdAction(): void {
    console.log('Tercera acción ejecutada');
    this.showConfirmModal = false;
  }

  onModalConfirmed(text: string): void {
    console.log('Texto del modal:', text);
    this.showModal = false;
  }

  onModalClosed(): void {
    console.log('Modal cerrado');
    this.showModal = false;
  }

  // Métodos para toasts
  onToastClosed(type: string): void {
    switch (type) {
      case 'success':
        this.showSuccessToast = false;
        break;
      case 'warning':
        this.showWarningToast = false;
        break;
      case 'danger':
        this.showDangerToast = false;
        break;
      case 'info':
        this.showInfoToast = false;
        break;
    }
    console.log(`Toast ${type} cerrado`);
  }

  // Métodos para estado vacío
  onEmptyStateButtonClick(): void {
    console.log('Botón de estado vacío clickeado');
  }

  onEmptyStateSearch(): void {
    console.log('Botón de búsqueda vacía clickeado');
  }

  onEmptyStateError(): void {
    console.log('Botón de error clickeado');
  }

  // Métodos para inputs
  onInputChange(value: string, type: string): void {
    console.log(`Input ${type} cambiado:`, value);
  }

  onValidationChange(validation: any, type: string): void {
    console.log(`Validación ${type}:`, validation);
  }

  // Getter para obtener datos del modal actual
  get currentAlertData() {
    switch (this.currentModalType) {
      case 'success':
        return this.successAlertData;
      case 'warning':
        return this.warningAlertData;
      case 'danger':
        return this.dangerAlertData;
      case 'info':
        return this.infoAlertData;
      default:
        return this.successAlertData;
    }
  }

  get currentConfirmData() {
    switch (this.currentModalType) {
      case 'delete':
        return this.deleteConfirmData;
      case 'save':
        return this.saveConfirmData;
      default:
        return this.deleteConfirmData;
    }
  }

  get currentModalData() {
    switch (this.currentModalType) {
      case 'add':
        return this.addItemModalData;
      case 'edit':
        return this.editItemModalData;
      default:
        return this.addItemModalData;
    }
  }

  /* Upload event handlers */
  onFilesAdded(files: FileUploadItem[]): void {
    console.log('Archivos agregados:', files);
    // Aquí puedes acceder a los archivos File originales:
    files.forEach((fileItem) => {
      console.log(`Archivo: ${fileItem.name}, Tamaño: ${fileItem.size} bytes`);
      // fileItem.file contiene el File original para tu uso
    });
  }

  onFileRemoved(fileId: string): void {
    console.log('Archivo eliminado:', fileId);
  }

  onFilesCleared(): void {
    console.log('Todos los archivos eliminados');
  }

  onUploadCompleted(files: FileUploadItem[]): void {
    console.log('Archivos listos:', files);
    this.showToastMessage('success');
  }

  onUploadError(error: { file: FileUploadItem; error: string }): void {
    console.log('Error con archivo:', error);
    this.showToastMessage('danger');
  }

  onAvatarUploaded(file: FileUploadItem): void {
    console.log('Avatar seleccionado:', file);
    // Aquí tienes acceso al archivo File original: file.file
    this.showToastMessage('success');
  }

  onDocumentsAdded(files: FileUploadItem[]): void {
    console.log('Documentos agregados:', files);
    // Ejemplo: obtener todos los archivos para subir a tu backend
    // const allFiles = this.uploadService.getAllFiles();
  }

  onGalleryUploaded(files: FileUploadItem[]): void {
    console.log('Imágenes agregadas a galería:', files);
  }
}
