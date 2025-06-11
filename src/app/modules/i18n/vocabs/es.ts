// Spain
export const locale = {
  lang: 'es',
  data: {
    BUTTON: {
      NEW: {
        COORDINATOR: 'Registrar coordinador',
        APPLICANT: 'Registrar solicitante',
        PATENT: 'Registrar patente',
        TRADEMARK: 'Registrar marca',
        UTILITY_MODEL: 'Registrar modelo de utilidad',
        COPYRIGHT: 'Registrar derecho de autor',
        INDUSTRIAL_DESIGN: 'Registrar diseño industrial',
      }
    },
    TABLE: {
      ACTIONS: {
        LABEL: 'Acciones',
        EDIT: 'Editar',
        DELETE: 'Eliminar',
        VIEW: 'Ver'
      },
      APPLICANT_NAME: "Nombre del solicitante",
      WORK_TITLE: "Título del trabajo",
      INSTITUTION: "Institución",
      DATE: "Fecha de solicitud"
    },
    GRAPHICS: {
      TITLES: {
        REQUEST_TYPES: "Tipos de solicitud",
        REQUEST: "Solicitudes",
        DEPARTMENTS: "Departamentos",
        EDUCATIONAL_PROGRAM: "Programa educativo",
        RESEARCHERS: "Investigadores",
        RESEARCHER: "Investigador",
        DEPARTMENT: "Departamento",
        FEDERAL_INSTITUTIONS: "Instituciones Federales",
        CENTRALIZED_INSTITUTIONS: "Instituciones Centralizadas",
        APPLICATION_TYPE: "Tipo de solicitud",
        FEDERAL_ENTITIES: "Entidades Federales",
      },
      SUBTITLES: {
        REGISTER: "Registros",
        MONTHS: "Meses",
        TOP_3: "Top 3",
        TOP_5: "Top 5",
      },
      LEGENDS: {
        NO_FEDERAL_ENTITIES: "No hay entidades federales con registros.",
        NO_FEDERAL_INSTITUTIONS: "No hay instituciones federales con registros.",
        NO_CENTRALIZED_INSTITUTIONS: "No hay instituciones centralizadas con registros.",
      }
    },
    DEPARTMENTS: {
      IT: "Sistemas y computación",
      MECHANIC: "Metal-mecánica",
      CHEMISTRY: "Química",
      ACRONYM: {
        PATENTS: "PA",
        TRADEMARKS: "MA",
        UTILITY_MODELS: 'MU',
        COPYRIGHTS: 'DA',
        INDUSTRIAL_DESIGNS: 'DI'
      }
    },
    ACADEMIC_LEVEL: {
      DOCTOR_CS: "Doctor en Ciencias de la Computación",
      MASTER_CS: "Maestro en Sistemas Computacionales",
      MASTER_CSIENCE: "Maestro en Ciencias de la Computación"
    },
    EDUCATIONAL_PROGRAM: {
      SYSTEMS: "Sistemas computacionales",
      INFORMATICS: "Informática",
      DATA_SCIENCE: "Ciencia de datos"
    },
    TRANSLATOR: {
      SELECT: 'Elige tu idioma',
    },
    MENU: {
      ADMIN: {
        MANAGEMENT: 'Gestión',
        USERS: 'Usuarios',
        COORDINATORS: 'Coordinadores',
        APPLICANTS: 'Solicitantes',
        INTELECTUAL_PROPERTY: 'Propiedad Intelectual',
        PATENTS: 'Patentes',
        TRADEMARKS: 'Marcas',
        UTILITY_MODELS: 'Modelos de Utilidad',
        COPYRIGHTS: 'Derechos de Autor',
        INDUSTRIAL_DESIGNS: 'Diseños Industriales'
      },
      COORD: {
        APPLICANTS: 'Solicitantes',
        COPYRIGHTS: 'Derechos de Autor',
        INDUSTRIAL_DESIGNS: 'Diseños Industriales',
        INTELECTUAL_PROPERTY: 'Propiedad Intelectual',
        MANAGEMENT: 'Gestión',
        PATENTS: 'Patentes',
        TRADEMARKS: 'Marcas',
        UTILITY_MODELS: 'Modelos de Utilidad'
      },
      APPLICANT: {
        MYPROFILE: 'Mi perfil',
        REQUEST: 'Registrar',
        REPORTS: 'Reportes',
      },
      NEW: 'nuevo',
      ACTIONS: 'Comportamiento',
      CREATE_POST: 'Crear nueva publicación',
      PAGES: 'Pages',
      FEATURES: 'Caracteristicas',
      APPS: 'Aplicaciones',
      DASHBOARD: 'Tablero'
    },
    AUTH: {
      GENERAL: {
        OR: 'O',
        SUBMIT_BUTTON: 'Enviar',
        NO_ACCOUNT: 'No tienes una cuenta?',
        SIGNUP_BUTTON: 'Regístrate',
        FORGOT_BUTTON: 'Se te olvidó tu contraseña',
        BACK_BUTTON: 'Espalda',
        PRIVACY: 'Intimidad',
        LEGAL: 'Legal',
        CONTACT: 'Contacto',
      },
      LOGIN: {
        TITLE: 'Crear una cuenta',
        BUTTON: 'Registrarse',
      },
      FORGOT: {
        TITLE: 'Contraseña olvidada?',
        DESC: 'Ingrese su correo electrónico para restablecer su contraseña',
        SUCCESS: 'Your account has been successfully reset.'
      },
      REGISTER: {
        TITLE: 'Sign Up',
        DESC: 'Enter your details to create your account',
        SUCCESS: 'Your account has been successfuly registered.'
      },
      INPUT: {
        EMAIL: 'Email',
        FULLNAME: 'Fullname',
        PASSWORD: 'Password',
        CONFIRM_PASSWORD: 'Confirm Password',
        USERNAME: 'Usuario'
      },
      VALIDATION: {
        INVALID: '{{name}} is not valid',
        REQUIRED: '{{name}} is required',
        MIN_LENGTH: '{{name}} minimum length is {{min}}',
        AGREEMENT_REQUIRED: 'Accepting terms & conditions are required',
        NOT_FOUND: 'The requested {{name}} is not found',
        INVALID_LOGIN: 'The login detail is incorrect',
        REQUIRED_FIELD: 'Required field',
        MIN_LENGTH_FIELD: 'Minimum field length:',
        MAX_LENGTH_FIELD: 'Maximum field length:',
        INVALID_FIELD: 'Field is not valid',
      }
    },
    ECOMMERCE: {
      COMMON: {
        SELECTED_RECORDS_COUNT: 'Selected records count: ',
        ALL: 'All',
        SUSPENDED: 'Suspended',
        ACTIVE: 'Active',
        FILTER: 'Filter',
        BY_STATUS: 'by Status',
        BY_TYPE: 'by Type',
        BUSINESS: 'Business',
        INDIVIDUAL: 'Individual',
        SEARCH: 'Search',
        IN_ALL_FIELDS: 'in all fields'
      },
      ECOMMERCE: 'eCommerce',
      CUSTOMERS: {
        CUSTOMERS: 'Customers',
        CUSTOMERS_LIST: 'Customers list',
        NEW_CUSTOMER: 'New Customer',
        DELETE_CUSTOMER_SIMPLE: {
          TITLE: 'Customer Delete',
          DESCRIPTION: 'Are you sure to permanently delete this customer?',
          WAIT_DESCRIPTION: 'Customer is deleting...',
          MESSAGE: 'Customer has been deleted'
        },
        DELETE_CUSTOMER_MULTY: {
          TITLE: 'Customers Delete',
          DESCRIPTION: 'Are you sure to permanently delete selected customers?',
          WAIT_DESCRIPTION: 'Customers are deleting...',
          MESSAGE: 'Selected customers have been deleted'
        },
        UPDATE_STATUS: {
          TITLE: 'Status has been updated for selected customers',
          MESSAGE: 'Selected customers status have successfully been updated'
        },
        EDIT: {
          UPDATE_MESSAGE: 'Customer has been updated',
          ADD_MESSAGE: 'Customer has been created'
        }
      }
    }
  }
};
