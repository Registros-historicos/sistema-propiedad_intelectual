import { HISTORICAL_REGISTERS } from "src/app/pages/administrador/historical-register/constants/historical-register.constant";

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
        VEGETAL_VARIETY: 'Registrar variedad vegetal',
        INDUSTRIAL_SECRET: 'Registrar secreto industrial',
      },
      CONFIRM: "Confirmar",
      CANCEL: "Cancelar",
      RETURN: "Regresar",
      CLOSE: 'Cerrar',
      DOWNLOAD: 'Descargar',
      SEE: 'Ver',
      PATENT: 'Enviar solicitud de patente',
      UTILITY_MODEL: 'Enviar solicitud de modelo de utilidad',
      INDUSTRIAL_DESIGN: 'Enviar solicitud de diseño industrial',
      COPYRIGHT: 'Enviar solicitud de derecho de autor',
      PROCESSING: 'Procesando...',
      CONFIRM_LOGOUT: 'Cerrar sesión',
    },
    TABLE: {
      ACTIONS: {
        LABEL: 'Acciones',
        EDIT: 'Editar',
        DELETE: 'Eliminar',
        VIEW: 'Ver'
      },
      APPLICANT_NAME: "Solicitante",
      BRANCH: "Rama",
      WORK_TITLE: "Título",
      INSTITUTION: "Institución",
      DATE: "Fecha de solicitud",
      PAG_INFO: "Mostrando _START_ a _END_ de _TOTAL_ registros",
      PAG_INFO_FILTERED: "(filtrados de _MAX_ registros totales)",
      PAG_INFO_EMPTY: "Mostrando 0 a 0 de 0 registros",
      PROCESSING: "Cargando datos",
      EMPTY_TABLE: "No se encontraron registros",
      PLACEHOLDER_SEARCH: "Buscar...",
      ZERO_RECORDS: 'No se encontraron coincidencias',
      TYPE_REQUEST: "Tipo de solicitud",
      STATUS_REQUEST: "Estatus",
      FULL_NAME: "Nombre completo",
      FEDERAL_ENTITY: "Entidad Federativa",
      PHONE: "Teléfono",
      REGISTERED_DATE: "Fecha de registro",
      TITLE_REQUEST: "Título",
      DESCRIPTION_REQUEST: "Descripción",
      PAGE_LENGTH: {
        LABEL: "Mostrar:",
        RECORDS: "registros"
      },
      MARK: {
        NAME: 'Denominación',
        IMAGE: 'Logo',
        APPLICATION_TYPE: 'Tipo de solicitud',
        APPLICANT: 'Titular',
        DATE: 'Fecha de presentación'
      }
    },
    MODAL: {
      TITLE: 'Detalles',
      INFO: {
        TITLE: 'Información de Solo Lectura',
        BODY: 'Los detalles se muestran únicamente para consulta.'
      },
      FORM: {
        PATENT: {
          NAME: 'Nombre de la patente'
        },
        MARK: {
          NAME: 'Denominación',
          RECORD: 'Expediente',
          IMAGE: 'Logo',
          APPLICATION_TYPE: 'Tipo de solicitud',
          APPLICANT: 'Titular',
          DATE: 'Fecha de presentación',
          DATE_GRANT: 'Fecha de concesión',
          DATE_COMPLETION: 'Fecha de terminación',
          DATE_START: 'Inicio de uso',
          IMAGE_INFO: 'Imagen de la marca',
          FORMALITIES: {
            LABEL: 'Trámites',
            ENTRY_FOLIO: 'Folio de entrada:',
            YEAR_RECEPTION: 'Año de recepción:',
            START_DATE: 'Fecha de inicio:',
            COMPLETION_DATE: 'Fecha de conclusión:'
          },
          FORMALITIES_EMPTY: 'No hay trámites registrados'
        },
        COPYRIGHT: {
          NAME: 'Nombre de la obra',
        },
        APPLICANT: 'Solicitante',
        EMAIL: 'Correo electrónico',
        DATE: 'Fecha de solicitud',
        STATUS: 'Estatus',
        FEDERAL_ENTITY: {
          LABEL: 'Entidad Federativa',
          OPTIONS_LABEL: 'Seleccione una entidad federativa'
        },
        INSTITUTION: {
          LABEL: 'Institución',
          OPTIONS_LABEL: 'Seleccione una institución',
        },
        DESCRIPTION: 'Descripción',
        DOCUMENTATION: 'Documentación',
        DOCUMENTATION_EMPTY: 'No hay documentos adjuntos'
      },
      FOLLOW_UP: {
        TITLE: 'Seguimiento',
        APPLICATION_ID: 'ID Solicitud',
        APPLICANT: 'Solicitante',
        PROGRESS: 'Progreso',
        HISTORY_TITLE: 'Historial del Trámite',
        STATUS: {
          REGISTERED: 'Registrada',
          IN_PROCESS: 'En Trámite',
          WITH_OBSERVATIONS: 'Trámite con Observaciones',
          APPROVED: 'Aprobada',
          COMPLETED: 'Concluida'
        },
        STATUS_LABELS: {
          CURRENT: 'Actual',
          COMPLETED: 'Completado',
          REQUIRES_ATTENTION: 'Requiere Atención',
          FINISHED: 'Finalizado',
          PENDING: 'Pendiente'
        },
        DESCRIPTIONS: {
          REGISTERED: 'La solicitud ha sido registrada exitosamente en el sistema.',
          IN_PROCESS: 'La solicitud está siendo revisada.',
          WITH_OBSERVATIONS: 'Se requieren correcciones o información adicional para continuar.',
          APPROVED: 'La solicitud ha sido aprobada.',
          COMPLETED: 'El proceso ha finalizado completamente.'
        },
        DETAILS: {
          REGISTERED: {
            DESCRIPTION: 'La solicitud ha sido registrada exitosamente en el sistema.',
            DATE_LABEL: 'Fecha:'
          },
          IN_PROCESS: {
            DESCRIPTION: 'La solicitud está siendo evaluada por el equipo técnico especializado.',
            EVALUATOR: 'Evaluador: Coordinador'
          },
          WITH_OBSERVATIONS: {
            DESCRIPTION: 'Se han encontrado aspectos que requieren corrección o información adicional.',
            DEADLINE: 'Plazo para respuesta: 30 días hábiles'
          },
          APPROVED: {
            DESCRIPTION: 'La solicitud ha sido aprobada y se ha otorgado la protección legal.',
            PROTECTION: 'Protección otorgada por 20 años'
          },
          COMPLETED: {
            DESCRIPTION: 'El proceso ha finalizado completamente.',
            TITLE_ISSUED: 'Título de solicitud emitido'
          }
        },
        BUTTONS: {
          CLOSE: 'Cerrar',
          NOTIFICATIONS: 'Notificaciones',
          GENERATE_REPORT: 'Generar Reporte'
        }
      }
    },
    FORMS: {
      PATENT: {
        TITLE: 'Solicitud de Patente de Invención - IMPI',
        INFO_1: 'Complete toda la información requerida para el registro de patente ante el IMPI.',
        INFO_2: 'Todos los campos marcados con (*) son obligatorios.',
        GENERAL_SECTION: {
          TITLE: 'Datos Generales del Solicitante',
          APPLICATION_DATE: 'Fecha de solicitud',
          APPLICATION_MODE: {
            LABEL: 'Modalidad de solicitud',
            SELECT_MODE: 'Seleccionar modalidad',
            ONLINE: 'En línea (e-IMPI)',
            IN_PERSON: 'Presencial (Oficinas)',
          },
          NAME_COMPANY: {
            LABEL: 'Nombre completo / Razón social',
            PLACEHOLDER: 'Nombre completo del solicitante o razón social',
          },
          NATIONALITY: {
            LABEL: 'Nacionalidad',
            PLACEHOLDER: 'Nacionalidad del solicitante',
          },
          EMAIL: {
            LABEL: 'Correo electrónico',
            PLACEHOLDER: 'ejemplo@dominio.com',
          },
          PHONE: 'Número de teléfono',
          ADDRESS: {
            LABEL: 'Dirección',
            PLACEHOLDER: 'Calle, número, colonia, ciudad, estado, código postal',
          },
          CURP_RFC: {
            PLACEHOLDER: 'CURP (18 caracteres) o RFC (13 caracteres)',
          },
          INVENTOR_APPLICANT: {
            LABEL: '¿El inventor y solicitante son diferentes?',
            YES: 'Sí, son diferentes',
            NO: 'No, son la misma persona',
          },
          ENTITY: {
            LABEL: 'Entidad Federativa',
            SELECT_ENTITY: 'Seleccione una entidad federativa',
          },
          INSTITUTION: {
            LABEL: 'Institución',
            SELECT_INSTITUTION: 'Seleccione una institución',
          }
        },
        INVENTION_SECTION: {
          TITLE: 'Información de la Invención',
          INVENTION_TITLE: {
            LABEL: 'Título de la invención',
            PLACEHOLDER: 'Título descriptivo de la invención',
          },
          TECHNICAL_FIELD: {
            LABEL: 'Campo técnico',
            PLACEHOLDER: 'Campo técnico al que pertenece la invención',
          },
          STATE_TECHNIQUE: {
            LABEL: 'Estado de la técnica (Antecedentes)',
            PLACEHOLDER: 'Describir las soluciones existentes, patentes previas, publicaciones científicas relevantes y sus limitaciones',
          },
          TECHNICAL_PROBLEM: {
            LABEL: 'Problema técnico a resolver',
            PLACEHOLDER: 'Describir el problema técnico que la invención busca resolver',
          },
          INDUSTRIAL_APPLICATION: {
            LABEL: 'Aplicación industrial',
            PLACEHOLDER: 'Describir cómo la invención puede ser utilizada en la industria o en la vida diaria',
          }
        },
        DETAILED_DESCRIPTION_SECTION: {
          TITLE: 'Descripción detallada de la invención',
          DETAILED_DESCRIPTION: {
            LABEL: 'Descripción detallada',
            PLACEHOLDER: 'Descripción completa de la invención, incluyendo su funcionamiento, características y ventajas',
          },
          EXAMPLES_REALIZATION: {
            LABEL: 'Ejemplos de realización',
            PLACEHOLDER: 'Ejemplos prácticos de cómo se puede implementar la invención',
          },
          CLAIMS: {
            LABEL: 'Reivindicaciones',
            PLACEHOLDER: 'Reivindicaciones específicas que definen el alcance de la protección solicitada',
          },
          SUMMARY: {
            LABEL: 'Resumen (150-250 palabras)',
            PLACEHOLDER: 'Resumen breve de la invención y sus principales características',
          }
        },
        DOCUMENTATION_SECTION: {
          TITLE: 'Documentación',
          IMPI: {
            LABEL: 'Formato oficial IMPI-00-009',
            SUB_TEXT: 'Adjuntar formato oficial IMPI-00-009 debidamente lleno'
          },
          TECHNICAL_DRAWINGS: {
            LABEL: 'Dibujos técnicos o figuras',
            SUB_TEXT: 'Dibujos técnicos necesarios para la comprensión de la invención'
          },
          PAYMENT_FEES: {
            LABEL: 'Comprobante de pago de derechos',
            SUB_TEXT: 'Comprobante de pago de derechos de solicitud ante el IMPI'
          },
          ADDITIONAL_DOCUMENTS: {
            LABEL: 'Documentos adicionales',
            SUB_TEXT: 'Poder notarial, cesión de derechos, traducciones, etc. (si aplica)'
          },
          SELECTED_FILES: 'Archivos seleccionados:',
        },
        STATEMENTS_SECTION: {
          TITLE: 'Declaraciones',
          STATEMENT_1: 'Declaro que la invención es resultado de mi trabajo propio y no es una copia de otra ya existente en el comercio.',
          STATEMENT_2: 'Declaro bajo protesta de decir verdad que la información proporcionada es correcta y completa.',
          INVENTION_PREVIOUSLY: {
            LABEL: '¿Se ha divulgado previamente la invención?',
            YES: 'Sí, se ha divulgado previamente',
            NO: 'No, no se ha divulgado',
          },
          DISCLOSURE_DETAILS: {
            LABEL: 'Detalles de la divulgación previa',
            PLACEHOLDER: 'Describir cómo y cuándo se divulgó la invención previamente',
          },
        },
        ERRORS: {
          APPLICATION_MODE: 'La modalidad de solicitud es obligatoria',
          EMAIL_REQUIRED: 'El correo electrónico es obligatorio',
          EMAIL_INVALID: 'Debe ingresar un correo electrónico válido',
          EMAIL_SIZE_MAX: 'No puede exceder 100 caracteres',
          EMAIL_FORMAT: 'No puede contener puntos consecutivos',
          EMAIL_BLANK: 'No puede contener espacios',
          EMAIL_DOMAIN_FORMAT: 'Formato de dominio inválido',
          PHONE: 'El número de teléfono es obligatorio',
          PHONE_REQUIRED: 'El número de celular es requerido',
          PHONE_FORMAT: 'Debe contener exactamente 10 dígitos',
          PHONE_FORMAT_NUMBERS: 'Solo se permiten números',
          PHONE_FORMAT_DIGIT: 'No puede contener el mismo dígito repetido',
          PHONE_FORMAT_DIGIT_VALID: 'Debe iniciar con un dígito válido (2-9)',
          ADDRESS_REQUIRED: 'La dirección es obligatoria',
          ADDRESS_MIN_LENGTH: 'La dirección debe tener al menos 10 caracteres',
          ADDRESS_MAX_LENGTH: 'La dirección no puede exceder los 300 caracteres',
          ADDRESS_SIZE_MIN: 'Debe tener al menos 10 caracteres',
          ADDRESS_SIZE_MAX: 'No puede exceder 300 caracteres',
          ADDRESS_FORMAT: 'Contiene caracteres no válidos',
          ADDRESS_BLANK: 'No puede contener solo espacios',
          ADDRESS_SPACES: 'No debe iniciar o terminar con espacios',
          ENTITY: 'La entidad federativa es obligatoria',
          ENTITY_INSTITUTION: 'Debe seleccionar una entidad federativa e institución',
          INSTITUTION: 'La institución es obligatoria',
          NAME_REQUIRED: 'El nombre completo / razón social es requerido',
          NAME_SIZE_MIN: 'Debe tener al menos 3 caracteres',
          NAME_SIZE_MAX: 'No puede exceder 200 caracteres',
          NAME_BLANK: 'No puede contener solo espacios',
          NAME_FORMAT: 'Solo se permiten letras, números, espacios y caracteres especiales básicos',
          NAME_SPACES: 'No debe iniciar o terminar con espacios',
          NAME_MULTIPLE_SPACES: 'No debe contener espacios múltiples consecutivos',
          NAME_ONLY_NUMBERS: 'No puede contener solo números',
          NAME_ONLY_SPECIAL: 'Debe contener al menos letras o números',
          NATIONALITY_REQUIRED: 'La nacionalidad es requerida',
          NATIONALITY_SIZE_MIN: 'Debe tener al menos 4 caracteres',
          NATIONALITY_SIZE_MAX: 'No puede exceder 50 caracteres',
          NATIONALITY_FORMAT: 'Solo se permiten letras',
          NATIONALITY_BLANK: 'No puede contener solo espacios',
          CURP_SIZE_MAX: 'Formato de CURP inválido (18 caracteres)',
          RFC_SIZE_MAX: 'Formato de RFC inválido (13 caracteres)',
          RFC_CURP_SIZE_MAX: 'Debe tener 13 caracteres (RFC) o 18 caracteres (CURP)',
          INVENTION_REQUIRED: 'El título de la invención es obligatorio',
          INVENTION_MIN_LENGTH: 'El título de la invención debe tener al menos 5 caracteres',
          INVENTION_MAX_LENGTH: 'El título de la invención no puede exceder los 500 caracteres',
          INVENTION_TITLE: 'El título de la invención',
          TECHNICAL_FIELD_REQUIRED: 'El campo técnico es obligatorio',
          TECHNICAL_FIELD_MIN_LENGTH: 'El campo técnico debe tener al menos 20 caracteres',
          TECHNICAL_FIELD_MAX_LENGTH: 'El campo técnico no puede exceder los 800 caracteres',
          TECHNICAL_FIELD: 'El campo técnico',
          STATE_TECHNIQUE_REQUIRED: 'El estado de la técnica es obligatorio',
          STATE_TECHNIQUE_MIN_LENGTH: 'El estado de la técnica debe tener al menos 50 caracteres',
          STATE_TECHNIQUE_MAX_LENGTH: 'El estado de la técnica no puede exceder los 1500 caracteres',
          STATE_TECHNIQUE: 'El estado de la técnica',
          TECHNICAL_PROBLEM_REQUIRED: 'El problema técnico es obligatorio',
          TECHNICAL_PROBLEM_MIN_LENGTH: 'El problema técnico debe tener al menos 30 caracteres',
          TECHNICAL_PROBLEM_MAX_LENGTH: 'El problema técnico no puede exceder los 1000 caracteres',
          TECHNICAL_PROBLEM: 'El problema técnico',
          INDUSTRIAL_APPLICATION_REQUIRED: 'La aplicación industrial es obligatoria',
          INDUSTRIAL_APPLICATION_MIN_LENGTH: 'La aplicación industrial debe tener al menos 20 caracteres',
          INDUSTRIAL_APPLICATION_MAX_LENGTH: 'La aplicación industrial no puede exceder los 800 caracteres',
          INDUSTRIAL_APPLICATION: 'La aplicación industrial',
          DETAILED_DESCRIPTION_REQUIRED: 'La descripción detallada es obligatoria',
          DETAILED_DESCRIPTION_MIN_LENGTH: 'La descripción detallada debe tener al menos 100 caracteres',
          DETAILED_DESCRIPTION_MAX_LENGTH: 'La descripción detallada no puede exceder los 3000 caracteres',
          DETAILED_DESCRIPTION: 'La descripción detallada',
          EXAMPLES_REALIZATION_REQUIRED: 'Los ejemplos de realización son obligatorios',
          EXAMPLES_REALIZATION_MIN_LENGTH: 'Los ejemplos de realización deben tener al menos 50 caracteres',
          EXAMPLES_REALIZATION_MAX_LENGTH: 'Los ejemplos de realización no pueden exceder los 2000 caracteres',
          EXAMPLES_REALIZATION: 'Los ejemplos de realización',
          CLAIMS_REQUIRED: 'Las reivindicaciones son obligatorias',
          CLAIMS_MIN_LENGTH: 'Las reivindicaciones deben tener al menos 30 caracteres',
          CLAIMS_MAX_LENGTH: 'Las reivindicaciones no pueden exceder los 2000 caracteres',
          CLAIMS: 'Las reivindicaciones',
          SUMMARY_REQUIRED: 'El resumen es obligatorio',
          SUMMARY_MIN_LENGTH: 'El resumen debe tener al menos 150 caracteres',
          SUMMARY_MAX_LENGTH: 'El resumen no puede exceder los 250 caracteres',
          SUMMARY_SIZE_MIN: 'Debe tener al menos 150 caracteres',
          SUMMARY_SIZE_MAX: 'No puede exceder 250 caracteres',
          SUMMARY_SIZE_MIN_WORDS: 'Debe tener al menos 25 palabras',
          SUMMARY_SIZE_MAX_WORDS: 'No puede exceder 50 palabras',
          DECLARATION_ORIGINALITY: 'Debe aceptar la declaración de originalidad',
          DECLARATION_VERACITY: 'Debe aceptar la declaración de veracidad',
          DISCLOSURE_DETAILS: 'Los detalles de divulgación',
          FILE_MAX_SIZE_PART_1: 'El archivo ',
          FILE_MAX_SIZE_PART_2: ' supera el tamaño máximo permitido de 10MB.',
          FILE_FORMAT_PART_2: ' no tiene un formato válido para ',
          REQUIRED: ' es requerido',
          SIZE_MIN: 'Debe tener al menos ',
          SIZE_MAX: 'No puede exceder ',
          CHAR: ' caracteres',
          SPACES: 'No debe iniciar o terminar con espacios',
          BLANK: 'No puede contener solo espacios',
          LETTERS: 'Debe contener al menos algunas letras',
          SUBMIT: 'Ocurrió un error al procesar la solicitud. Intente nuevamente',
          DOCUMENT_TITLE: '¡Documentos Faltantes!',
          IMPI: 'Debe adjuntar el formato oficial IMPI-00-009',
          PAYMENT: 'Debe adjuntar el comprobante de pago de derechos',
        },
        INFO: {
          SUCCESS: 'Solicitud de patente enviada exitosamente al IMPI',
          CONFIRM: '¡Ok, entendido!',
        }
      },
      UTILITY_MODEL: {
        TITLE: 'Registrar Modelo de Utilidad',
        INFO_1: 'Complete la información requerida para registrar el modelo de utilidad ante el IMPI.',
        INFO_2: 'Los modelos de utilidad protegen mejoras o modificaciones funcionales a herramientas, utensilios o dispositivos existentes.',
        GENERAL_SECTION: {
          TITLE: 'Datos Generales del Solicitante',
          APPLICATION_DATE: 'Fecha de Solicitud',
          APPLICATION_MODE: {
            LABEL: 'Modalidad de Solicitud',
            SELECT_MODE: 'Seleccione modalidad',
            ONLINE: 'En línea (e-IMPI)',
            IN_PERSON: 'Presencial (Oficinas)',
          },
          NAME_COMPANY: {
            LABEL: 'Nombre Completo / Razón Social',
            PLACEHOLDER: 'Ingrese nombre completo o razón social',
          },
          NATIONALITY: {
            LABEL: 'Nacionalidad',
            PLACEHOLDER: 'Ej: Mexicana',
          },
          EMAIL: {
            LABEL: 'Correo Electrónico',
            PLACEHOLDER: 'ejemplo@correo.com',
          },
          PHONE: 'Número de Celular',
          ADDRESS: {
            LABEL: 'Domicilio para Notificaciones',
            PLACEHOLDER: 'Calle, número, colonia, ciudad, estado, código postal',
          },
          CURP_RFC: {
            PLACEHOLDER: 'Para personas físicas o morales mexicanas',
          },
          INVENTOR_APPLICANT: {
            LABEL: '¿El inventor y solicitante son diferentes?',
            YES: 'Sí, son diferentes personas',
            NO: 'No, son la misma persona',
          },
          ENTITY: {
            LABEL: 'Entidad Federativa',
            SELECT_ENTITY: 'Seleccione una entidad federativa',
          },
          INSTITUTION: {
            LABEL: 'Institución',
            SELECT_INSTITUTION: 'Seleccione una institución',
          }
        },
        MODEL_SECTION: {
          TITLE: 'Información del Modelo de Utilidad',
          MODEL_NAME: {
            LABEL: 'Nombre del Modelo de Utilidad',
            PLACEHOLDER: 'Nombre descriptivo del modelo de utilidad',
          },
          TECHNICAL_FIELD: {
            LABEL: 'Campo Técnico',
            PLACEHOLDER: 'Área técnica a la que pertenece el modelo de utilidad',
          },
          STATE_TECHNIQUE: {
            LABEL: 'Estado de la Técnica (Antecedentes)',
            PLACEHOLDER: 'Descripción de herramientas, utensilios o dispositivos similares existentes',
          },
          TECHNICAL_PROBLEM: {
            LABEL: 'Problema Técnico a Resolver',
            PLACEHOLDER: 'Inconvenientes o limitaciones que resuelve el modelo de utilidad',
          },
          INDUSTRIAL_APPLICATION: {
            LABEL: 'Aplicación Industrial',
            PLACEHOLDER: 'Usos prácticos y aplicaciones industriales del modelo de utilidad',
          }
        },
        DETAILED_DESCRIPTION_SECTION: {
          TITLE: 'Descripción Técnica Detallada',
          DETAILED_DESCRIPTION: {
            LABEL: 'Descripción Detallada de la Mejora',
            PLACEHOLDER: 'Explicación clara y detallada de las modificaciones o mejoras funcionales',
          },
          EXAMPLES_REALIZATION: {
            LABEL: 'Ejemplos de Realización',
            PLACEHOLDER: 'Formas específicas de implementar las mejoras funcionales',
          },
          CLAIMS: {
            LABEL: 'Reivindicaciones',
            PLACEHOLDER: 'Características nuevas y funcionales que se desean proteger',
          },
          SUMMARY: {
            LABEL: 'Resumen (150-250 palabras)',
            PLACEHOLDER: 'Resumen breve del modelo de utilidad para publicación en la Gaceta del IMPI',
          }
        },
        DOCUMENTATION_SECTION: {
          TITLE: 'Documentación',
          IMPI: {
            LABEL: 'Formato oficial IMPI-00-009',
            SUB_TEXT: 'Formato oficial para solicitud de registro de modelo de utilidad'
          },
          TECHNICAL_DRAWINGS: {
            LABEL: 'Dibujos técnicos o figuras',
            SUB_TEXT: 'Diagramas, planos o ilustraciones que muestren las mejoras funcionales'
          },
          PAYMENT_FEES: {
            LABEL: 'Comprobante de pago de derechos',
            SUB_TEXT: 'Comprobante del pago de derechos por presentación de la solicitud'
          },
          ADDITIONAL_DOCUMENTS: {
            LABEL: 'Documentos adicionales',
            SUB_TEXT: 'Poder notarial, cesión de derechos, prioridad extranjera (si aplica)'
          },
          SELECTED_FILES: 'Archivos Seleccionados',
        },
        STATEMENTS_SECTION: {
          TITLE: 'Declaraciones',
          STATEMENT_1: 'Declaro que el modelo de utilidad es resultado de mi trabajo propio y no es una copia de otro ya existente en el comercio',
          STATEMENT_2: 'Declaro bajo protesta de decir verdad que la información proporcionada es veraz y completa',
          INVENTION_PREVIOUSLY: {
            LABEL: '¿Se ha divulgado previamente la invención?',
            YES: 'Sí, se ha divulgado previamente',
            NO: 'No, no se ha divulgado previamente',
          },
          DISCLOSURE_DETAILS: {
            LABEL: 'Detalles de la Divulgación Previa',
            PLACEHOLDER: 'Especifique dónde, cuándo y cómo se divulgó previamente',
          },
        },
        ERRORS: {
          APPLICATION_MODE: 'La modalidad de solicitud es requerida',
          NAME_REQUIRED: 'El nombre completo / razón social es requerido',
          NAME_SIZE_MIN: 'Debe tener al menos 3 caracteres',
          NAME_SIZE_MAX: 'No puede exceder 200 caracteres',
          NAME_FORMAT: 'Solo se permiten letras, números, espacios y caracteres especiales básicos',
          NAME_BLANK: 'No debe iniciar o terminar con espacios',
          NAME_MULTIPLE_BLANKS: 'No debe contener espacios múltiples consecutivos',
          NATIONALITY_REQUIRED: 'La nacionalidad es requerida',
          NATIONALITY_SIZE_MIN: 'Debe tener al menos 4 caracteres',
          NATIONALITY_SIZE_MAX: 'No puede exceder 50 caracteres',
          NATIONALITY_FORMAT: 'Solo se permiten letras',
          EMAIL_REQUIRED: 'El correo electrónico es requerido',
          EMAIL_SIZE_MAX: 'No puede exceder 100 caracteres',
          EMAIL_INVALID: 'Debe ingresar un correo electrónico válido',
          EMAIL_FORMAT: 'No puede contener puntos consecutivos',
          EMAIL_BLANK: 'No puede contener espacios',
          PHONE_REQUIRED: 'El número de celular es requerido',
          PHONE_FORMAT: 'Debe contener exactamente 10 dígitos',
          PHONE_FORMAT_NUMBERS: 'Solo se permiten números',
          PHONE_FORMAT_DIGIT: 'No puede contener el mismo dígito repetido',
          PHONE_FORMAT_DIGIT_VALID: 'Debe iniciar con un dígito válido (2-9)',
          ADDRESS_REQUIRED: 'La dirección es obligatoria',
          ADDRESS_SIZE_MIN: 'Debe tener al menos 10 caracteres',
          ADDRESS_SIZE_MAX: 'No puede exceder 300 caracteres',
          ADDRESS_FORMAT: 'Contiene caracteres no válidos',
          ADDRESS_BLANK: 'No puede contener solo espacios',
          ADDRESS_MULTIPLE_BLANKS: 'No debe iniciar o terminar con espacios',
          CURP_SIZE_MAX: 'Formato de CURP inválido (18 caracteres)',
          RFC_SIZE_MAX: 'Formato de RFC inválido (13 caracteres)',
          RFC_CURP_SIZE_MAX: 'Debe tener 13 caracteres (RFC) o 18 caracteres (CURP)',
          ENTITY: 'La entidad federativa es requerida',
          INSTITUTION: 'La institución es requerida',
          MODEL_NAME_REQUIRED: 'El nombre del modelo de utilidad es requerido',
          TECHNICAL_FIELD_REQUIRED: 'El campo técnico es requerido',
          STATE_TECHNIQUE_REQUIRED: 'El estado de la técnica es requerido',
          TECHNICAL_PROBLEM_REQUIRED: 'El problema técnico es requerido',
          INDUSTRIAL_APPLICATION_REQUIRED: 'La aplicación industrial es requerida',
          DETAILED_DESCRIPTION_REQUIRED: 'La descripción detallada es requerida',
          EXAMPLES_REALIZATION_REQUIRED: 'Los ejemplos de realización son requeridos',
          CLAIMS_REQUIRED: 'Las reivindicaciones son requeridas',
          SUMMARY_REQUIRED: 'El resumen es requerido',
          SUMMARY_SIZE_MIN: 'Debe tener al menos 150 caracteres',
          SUMMARY_SIZE_MIN_WORDS: 'Debe tener al menos 25 palabras',
          SUMMARY_SIZE_MAX: 'No puede exceder 250 caracteres',
          SUMMARY_SIZE_MAX_WORDS: 'No puede exceder 50 palabras',
          DECLARATION_ORIGINALITY: 'Debe aceptar la declaración de originalidad',
          DECLARATION_VERACITY: 'Debe aceptar la declaración de veracidad',
          ENTITY_INSTITUTION: 'Debe seleccionar una entidad federativa e institución',
          FILE_MAX_SIZE_PART_1: 'El archivo ',
          FILE_MAX_SIZE_PART_2: ' supera el tamaño máximo permitido de 10MB.',
          FILE_FORMAT_PART_2: ' no tiene un formato válido para ',
          REQUIRED: ' es requerido',
          SIZE_MIN: 'Debe tener al menos ',
          SIZE_MAX: 'No puede exceder ',
          CHAR: ' caracteres',
          BLANKS: 'No debe iniciar o terminar con espacios',
          BLANK: 'No puede contener solo espacios',
          LETTERS: 'Debe contener al menos algunas letras',
          UTILITY_MODEL: 'El nombre del modelo de utilidad',
          TECHNICAL_FIELD: 'El campo técnico',
          STATE_TECHNIQUE: 'El estado de la técnica',
          TECHNICAL_PROBLEM: 'El problema técnico',
          INDUSTRIAL_APPLICATION: 'La aplicación industrial',
          DETAILED_DESCRIPTION: 'La descripción detallada',
          EXAMPLES_REALIZATION: 'Los ejemplos de realización',
          CLAIMS: 'Las reivindicaciones',
          SUBMIT: 'Ocurrió un error al procesar la solicitud. Intente nuevamente',
          DOCUMENT_TITLE: '¡Documentos Faltantes!',
          IMPI: 'Debe adjuntar el formato oficial IMPI-00-009',
          PAYMENT: 'Debe adjuntar el comprobante de pago de derechos',
        },
        INFO: {
          SUCCESS: 'Solicitud de modelo de utilidad enviada exitosamente',
          CONFIRM: '¡Entendido!',
        }
      },
      INDUSTRIAL_DESIGN: {
        TITLE: 'Solicitud de Registro de Diseño Industrial - IMPI',
        INFO_1: 'Complete toda la información requerida para el registro de diseño industrial ante el IMPI.',
        INFO_2: 'Todos los campos marcados con (*) son obligatorios.',
        GENERAL_SECTION: {
          TITLE: 'Datos Generales del Solicitante',
          APPLICATION_DATE: 'Fecha de solicitud',
          APPLICATION_MODE: {
            LABEL: 'Modalidad de solicitud',
            SELECT_MODE: 'Seleccionar modalidad',
            ONLINE: 'En línea (e-IMPI)',
            IN_PERSON: 'Presencial (Oficinas)',
          },
          NAME_COMPANY: {
            LABEL: 'Nombre completo / Razón social',
            PLACEHOLDER: 'Nombre completo del solicitante o razón social',
          },
          NATIONALITY: {
            LABEL: 'Nacionalidad',
            PLACEHOLDER: 'Nacionalidad del solicitante',
          },
          EMAIL: {
            LABEL: 'Correo electrónico',
            PLACEHOLDER: 'ejemplo@dominio.com',
          },
          PHONE: 'Número de teléfono',
          ADDRESS: {
            LABEL: 'Dirección',
            PLACEHOLDER: 'Calle, número, colonia, ciudad, estado, código postal',
          },
          CURP_RFC: {
            PLACEHOLDER: 'CURP (18 caracteres) o RFC (13 caracteres)',
          },
          DESIGNER_APPLICANT: {
            LABEL: '¿El diseñador y solicitante son diferentes?',
            YES: 'Sí, son diferentes',
            NO: 'No, son la misma persona',
          },
          ENTITY: {
            LABEL: 'Entidad Federativa',
            SELECT_ENTITY: 'Seleccione una entidad federativa',
          },
          INSTITUTION: {
            LABEL: 'Institución',
            SELECT_INSTITUTION: 'Seleccione una institución',
          }
        },
        DESIGN_SECTION: {
          TITLE: 'Información del Diseño Industrial',
          DESIGN_NAME: {
            LABEL: 'Denominación del diseño industrial',
            PLACEHOLDER: 'Denominación descriptiva del diseño industrial',
          },
          DESIGN_TYPE: {
            LABEL: 'Tipo de diseño industrial',
            SELECT_TYPE: 'Seleccione el tipo de diseño',
            INDUSTRIAL_MODEL: 'Modelo Industrial',
            INDUSTRIAL_DRAWING: 'Dibujo Industrial',
          },
          PRODUCT_CLASS: {
            LABEL: 'Clase de productos',
            PLACEHOLDER: 'Especifique la clase de productos a los que se aplicará el diseño',
          }
        },
        TECHNICAL_DESCRIPTION_SECTION: {
          TITLE: 'Descripción Técnica del Diseño',
          NEW_ELEMENTS: {
            LABEL: 'Descripción de elementos nuevos u originales',
            PLACEHOLDER: 'Describa detalladamente los elementos nuevos u originales del diseño',
          },
          VISUAL_CHARACTERISTICS: {
            LABEL: 'Características visuales distintivas',
            PLACEHOLDER: 'Describa las características visuales que hacen distintivo al diseño (forma, color, textura, etc.)',
          },
          GENERAL_DESCRIPTION: {
            LABEL: 'Descripción general del diseño',
            PLACEHOLDER: 'Proporcione una descripción completa y detallada del diseño industrial',
          },
          SUMMARY: {
            LABEL: 'Resumen (150-250 palabras)',
            PLACEHOLDER: 'Resumen breve del diseño industrial para publicación en la Gaceta del IMPI',
          }
        },
        DOCUMENTATION_SECTION: {
          TITLE: 'Documentación',
          VIEWS_INFO: {
            TITLE: 'Vistas requeridas para diseños industriales',
            DESCRIPTION: 'Los dibujos técnicos deben incluir vistas en perspectiva, frontal, lateral, posterior, superior e inferior del objeto.',
          },
          IMPI: {
            LABEL: 'Formato oficial IMPI-00-009',
            SUB_TEXT: 'Formato oficial para solicitud de registro de diseño industrial'
          },
          TECHNICAL_DRAWINGS: {
            LABEL: 'Dibujos técnicos y vistas del diseño',
            SUB_TEXT: 'Incluir vistas en perspectiva, frontal, lateral, posterior, superior e inferior'
          },
          PAYMENT_FEES: {
            LABEL: 'Comprobante de pago de derechos',
            SUB_TEXT: 'Comprobante del pago de derechos por presentación de la solicitud'
          },
          ADDITIONAL_DOCUMENTS: {
            LABEL: 'Documentos adicionales',
            SUB_TEXT: 'Poder notarial, cesión de derechos, prioridad extranjera (si aplica)'
          },
          SELECTED_FILES: 'Archivos Seleccionados',
        },
        STATEMENTS_SECTION: {
          TITLE: 'Declaraciones',
          STATEMENT_1: 'Declaro que el diseño industrial es resultado de mi trabajo propio y no es una copia de otro ya existente en el comercio',
          STATEMENT_2: 'Declaro bajo protesta de decir verdad que la información proporcionada es correcta y completa',
          DESIGN_PREVIOUSLY: {
            LABEL: '¿Se ha divulgado previamente el diseño?',
            YES: 'Sí, se ha divulgado previamente',
            NO: 'No, no se ha divulgado',
          },
          DISCLOSURE_DETAILS: {
            LABEL: 'Detalles de la divulgación previa',
            PLACEHOLDER: 'Describir cómo y cuándo se divulgó el diseño previamente',
          },
        },
        ERRORS: {
          APPLICATION_MODE: 'La modalidad de solicitud es obligatoria',
          NAME_REQUIRED: 'El nombre completo / razón social es requerido',
          NAME_SIZE_MIN: 'Debe tener al menos 3 caracteres',
          NAME_SIZE_MAX: 'No puede exceder 200 caracteres',
          NAME_FORMAT: 'Solo se permiten letras, números, espacios y caracteres especiales básicos',
          NAME_SPACES: 'No debe iniciar o terminar con espacios',
          NAME_MULTIPLE_SPACES: 'No debe contener espacios múltiples consecutivos',
          NATIONALITY_REQUIRED: 'La nacionalidad es requerida',
          NATIONALITY_SIZE_MIN: 'Debe tener al menos 4 caracteres',
          NATIONALITY_SIZE_MAX: 'No puede exceder 50 caracteres',
          NATIONALITY_FORMAT: 'Solo se permiten letras',
          EMAIL_REQUIRED: 'El correo electrónico es requerido',
          EMAIL_SIZE_MAX: 'No puede exceder 100 caracteres',
          EMAIL_INVALID: 'Debe ingresar un correo electrónico válido',
          EMAIL_FORMAT: 'No puede contener puntos consecutivos',
          EMAIL_BLANK: 'No puede contener espacios',
          PHONE_REQUIRED: 'El número de celular es requerido',
          PHONE_FORMAT: 'Debe contener exactamente 10 dígitos',
          PHONE_FORMAT_NUMBERS: 'Solo se permiten números',
          PHONE_FORMAT_DIGIT: 'No puede contener el mismo dígito repetido',
          PHONE_FORMAT_DIGIT_VALID: 'Debe iniciar con un dígito válido (2-9)',
          ADDRESS_REQUIRED: 'La dirección es requerida',
          ADDRESS_SIZE_MIN: 'Debe tener al menos 10 caracteres',
          ADDRESS_SIZE_MAX: 'No puede exceder 300 caracteres',
          ADDRESS_FORMAT: 'Contiene caracteres no válidos',
          ADDRESS_BLANK: 'No puede contener solo espacios',
          ADDRESS_SPACES: 'No debe iniciar o terminar con espacios',
          CURP_SIZE_MAX: 'Formato de CURP inválido (18 caracteres)',
          RFC_SIZE_MAX: 'Formato de RFC inválido (13 caracteres)',
          RFC_CURP_SIZE_MAX: 'Debe tener 13 caracteres (RFC) o 18 caracteres (CURP)',
          ENTITY: 'La entidad federativa es obligatoria',
          INSTITUTION: 'La institución es obligatoria',
          DESIGN_NAME_REQUIRED: 'La denominación del diseño es requerida',
          DESIGN_TYPE_REQUIRED: 'El tipo de diseño es obligatorio',
          PRODUCT_CLASS_REQUIRED: 'La clase de productos es requerida',
          NEW_ELEMENTS_REQUIRED: 'Los elementos nuevos u originales son requeridos',
          VISUAL_CHARACTERISTICS_REQUIRED: 'Las características visuales distintivas son requeridas',
          GENERAL_DESCRIPTION_REQUIRED: 'La descripción general es requerida',
          SUMMARY_REQUIRED: 'El resumen es requerido',
          SUMMARY_SIZE_MIN: 'Debe tener al menos 150 caracteres',
          SUMMARY_SIZE_MIN_WORDS: 'Debe tener al menos 25 palabras',
          SUMMARY_SIZE_MAX: 'No puede exceder 250 caracteres',
          SUMMARY_SIZE_MAX_WORDS: 'No puede exceder 50 palabras',
          DECLARATION_ORIGINALITY: 'Debe aceptar la declaración de originalidad',
          DECLARATION_VERACITY: 'Debe aceptar la declaración de veracidad',
          ENTITY_INSTITUTION: 'Debe seleccionar una entidad federativa e institución',
          FILE_MAX_SIZE_PART_1: 'El archivo ',
          FILE_MAX_SIZE_PART_2: ' supera el tamaño máximo permitido de 10MB.',
          FILE_FORMAT_PART_2: ' no tiene un formato válido para ',
          REQUIRED: ' es requerido',
          SIZE_MIN: 'Debe tener al menos ',
          SIZE_MAX: 'No puede exceder ',
          CHAR: ' caracteres',
          SPACES: 'No debe iniciar o terminar con espacios',
          BLANK: 'No puede contener solo espacios',
          LETTERS: 'Debe contener al menos algunas letras',
          DESIGN_NAME: 'La denominación del diseño',
          PRODUCT_CLASS: 'La clase de productos',
          NEW_ELEMENTS: 'Los elementos nuevos u originales',
          VISUAL_CHARACTERISTICS: 'Las características visuales distintivas',
          GENERAL_DESCRIPTION: 'La descripción general',
          SUBMIT: 'Ocurrió un error al procesar la solicitud. Intente nuevamente',
          DOCUMENT_TITLE: '¡Documentos Faltantes!',
          IMPI: 'Debe adjuntar el formato oficial IMPI-00-009',
          PAYMENT: 'Debe adjuntar el comprobante de pago de derechos',
          TECHNICAL_DRAWINGS: 'Debe adjuntar los dibujos técnicos y vistas del diseño industrial',
        },
        INFO: {
          SUCCESS: 'Solicitud de diseño industrial enviada exitosamente al IMPI',
          CONFIRM: '¡Ok, entendido!',
        }
      },
      COPYRIGHT: {
        TITLE: 'Solicitud de Registro de Derecho de Autor - INDAUTOR',
        INFO_1: 'Complete toda la información requerida para el registro de derecho de autor ante INDAUTOR.',
        INFO_2: 'Todos los campos marcados con (*) son obligatorios.',
        GENERAL_SECTION: {
          TITLE: 'Datos Generales del Solicitante',
          APPLICATION_DATE: 'Fecha de solicitud',
          APPLICATION_MODE: {
            LABEL: 'Modalidad de solicitud',
            SELECT_MODE: 'Seleccionar modalidad',
            ONLINE: 'En línea (INDARELIN)',
            IN_PERSON: 'Presencial (Oficinas)',
          },
          WORK_TITLE: {
            LABEL: 'Título de la obra a registrar',
            PLACEHOLDER: 'Ingrese el título completo de la obra',
          },
          NAME_COMPANY: {
            LABEL: 'Nombre completo / Razón social',
            PLACEHOLDER: 'Nombre completo del solicitante o razón social',
          },
          NATIONALITY: {
            LABEL: 'Nacionalidad',
            PLACEHOLDER: 'Nacionalidad del solicitante',
          },
          EMAIL: {
            LABEL: 'Correo electrónico',
            PLACEHOLDER: 'ejemplo@dominio.com',
          },
          PHONE: 'Número de celular',
          ADDRESS: {
            LABEL: 'Domicilio para notificaciones',
            PLACEHOLDER: 'Calle, número, colonia, ciudad, estado, código postal',
          },
          CURP_RFC: {
            PLACEHOLDER: 'CURP (18 caracteres) o RFC (13 caracteres)',
          },
          AUTHOR_NAME: {
            LABEL: 'Nombre del autor (si es diferente)',
            PLACEHOLDER: 'Dejar vacío si el autor es el mismo solicitante',
          },
          ENTITY: {
            LABEL: 'Entidad Federativa',
            SELECT_ENTITY: 'Seleccione una entidad federativa',
          },
          INSTITUTION: {
            LABEL: 'Institución',
            SELECT_INSTITUTION: 'Seleccione una institución',
          }
        },
        WORK_SECTION: {
          TITLE: 'Información de la Obra',
          BRANCH: {
            LABEL: 'Rama de la obra',
            SELECT_BRANCH: 'Seleccione la rama de la obra',
            OPTIONS: {
              LITERARY: 'Literaria',
              MUSICAL_WITH_LYRICS: 'Musical con letra',
              MUSICAL_WITHOUT_LYRICS: 'Musical sin letra',
              DRAMATIC: 'Dramática',
              DANCE: 'Danza',
              PICTORIAL: 'Pictórica',
              DRAWING: 'Dibujo',
              SCULPTURAL: 'Escultórica',
              PLASTIC_CHARACTER: 'De carácter plástico',
              CARICATURE: 'Caricatura',
              COMIC: 'Historieta',
              ARCHITECTURAL: 'Arquitectónica',
              CINEMATOGRAPHIC: 'Cinematográfica',
              AUDIOVISUAL: 'Audiovisual',
              RADIO_PROGRAM: 'Programa de radio',
              TV_PROGRAM: 'Programa de televisión',
              COMPUTER_PROGRAM: 'Programa de cómputo',
              PHOTOGRAPHIC: 'Fotográfica',
              APPLIED_ART: 'Arte aplicado',
              DATABASE: 'Base de datos',
            }
          },
          IS_DERIVED: {
            LABEL: '¿La obra es derivada?',
            NO: 'No',
            YES: 'Sí',
          },
          DERIVED_TYPE: {
            LABEL: 'Tipo de obra derivada',
            SELECT_TYPE: 'Seleccione el tipo de obra derivada',
            OPTIONS: {
              AMPLIFICATION: 'Ampliación',
              TRANSLATION: 'Traducción',
              ARRANGEMENT: 'Arreglo',
              COMPENDIUM: 'Compendio',
              ADAPTATION: 'Adaptación',
              PARAPHRASE: 'Paráfrasis',
              COMPILATION: 'Compilación',
              TRANSFORMATION: 'Transformación',
              COLLECTION: 'Colección',
            }
          },
          ORIGINAL_WORK_DATA: {
            LABEL: 'Datos de la obra primigenia',
            PLACEHOLDER: 'Proporcione los datos de la obra original de la cual deriva esta obra',
          },
          DESCRIPTION: {
            LABEL: 'Descripción de la obra',
            PLACEHOLDER: 'Descripción detallada de la obra, su propósito, características principales y contenido',
          }
        },
        EXEMPLAR_SECTION: {
          TITLE: 'Ejemplar de la Obra',
          TYPE_LABEL: 'Tipo de ejemplar',
          SOURCE_CODE: 'Código fuente (10 primeras y últimas páginas)',
          URL_WORK: 'URL de la obra completa del repositorio/base de datos/programa de cómputo',
          SYNTHESIS: 'Síntesis de la obra',
          URL_FIELD: {
            LABEL: 'URL de la obra',
            PLACEHOLDER: 'https://ejemplo.com/mi-obra',
          },
          SYNTHESIS_FIELD: {
            LABEL: 'Síntesis de la obra',
            PLACEHOLDER: 'Proporcione una síntesis breve de la obra',
          }
        },
        DOCUMENTATION_SECTION: {
          TITLE: 'Documentación',
          INDAUTOR_FORMAT: {
            LABEL: 'Formato oficial INDAUTOR',
            SUB_TEXT: 'Adjuntar formato RPDA-01, RPDA-01-A1 o RPDA-01-A2 según corresponda',
          },
          OFFICIAL_ID: {
            LABEL: 'Identificación oficial',
            SUB_TEXT: 'INE, pasaporte, cédula profesional u otra identificación oficial',
          },
          OWNERSHIP_DOCUMENT: {
            LABEL: 'Documento de titularidad',
            SUB_TEXT: 'Contrato, cesión de derechos, acta constitutiva (si aplica)',
          },
          PAYMENT_RECEIPT: {
            LABEL: 'Comprobante de pago',
            SUB_TEXT: 'Comprobante del pago de derechos por registro ante INDAUTOR',
          },
          WORK_EXEMPLAR: {
            LABEL: 'Ejemplar de la obra',
            SUB_TEXT: 'Archivo digital de la obra (código fuente, documento, etc.)',
          },
          ADDITIONAL_DOCUMENTS: {
            LABEL: 'Documentos adicionales',
            SUB_TEXT: 'Traducciones, poderes, otros documentos (si aplica)',
          },
          SELECTED_FILES: 'Archivos Seleccionados',
        },
        STATEMENTS_SECTION: {
          TITLE: 'Declaraciones',
          STATEMENT_1: 'Declaro que la obra es resultado de mi trabajo propio y original, y no infringe derechos de terceros',
          STATEMENT_2: 'Declaro bajo protesta de decir verdad que la información proporcionada es correcta y completa',
          STATEMENT_3: 'Declaro que soy titular de los derechos de autor de la obra o cuento con la autorización correspondiente',
        },
        ERRORS: {
          APPLICATION_MODE: 'La modalidad de solicitud es obligatoria',
          WORK_TITLE_REQUIRED: 'El título de la obra es obligatorio',
          WORK_TITLE_MIN_LENGTH: 'El título debe tener al menos 5 caracteres',
          WORK_TITLE_MAX_LENGTH: 'El título no puede exceder 500 caracteres',
          WORK_TITLE_SPACES: 'No debe iniciar o terminar con espacios',
          WORK_TITLE_BLANK: 'No puede contener solo espacios',
          NAME_REQUIRED: 'El nombre completo / razón social es requerido',
          NAME_SIZE_MIN: 'Debe tener al menos 3 caracteres',
          NAME_SIZE_MAX: 'No puede exceder 200 caracteres',
          NAME_FORMAT: 'Solo se permiten letras, números, espacios y caracteres especiales básicos',
          NAME_SPACES: 'No debe iniciar o terminar con espacios',
          NAME_MULTIPLE_SPACES: 'No debe contener espacios múltiples consecutivos',
          NATIONALITY_REQUIRED: 'La nacionalidad es requerida',
          NATIONALITY_SIZE_MIN: 'Debe tener al menos 4 caracteres',
          NATIONALITY_SIZE_MAX: 'No puede exceder 50 caracteres',
          NATIONALITY_FORMAT: 'Solo se permiten letras',
          EMAIL_REQUIRED: 'El correo electrónico es obligatorio',
          EMAIL_SIZE_MAX: 'No puede exceder 100 caracteres',
          EMAIL_INVALID: 'Debe ingresar un correo electrónico válido',
          EMAIL_FORMAT: 'No puede contener puntos consecutivos',
          EMAIL_BLANK: 'No puede contener espacios',
          PHONE_REQUIRED: 'El número de celular es requerido',
          PHONE_FORMAT: 'Debe contener exactamente 10 dígitos',
          PHONE_FORMAT_NUMBERS: 'Solo se permiten números',
          PHONE_FORMAT_DIGIT: 'No puede contener el mismo dígito repetido',
          PHONE_FORMAT_DIGIT_VALID: 'Debe iniciar con un dígito válido (2-9)',
          ADDRESS_REQUIRED: 'El domicilio es requerido',
          ADDRESS_SIZE_MIN: 'Debe tener al menos 10 caracteres',
          ADDRESS_SIZE_MAX: 'No puede exceder 300 caracteres',
          ADDRESS_FORMAT: 'Contiene caracteres no válidos',
          ADDRESS_BLANK: 'No puede contener solo espacios',
          ADDRESS_SPACES: 'No debe iniciar o terminar con espacios',
          CURP_SIZE_MAX: 'Formato de CURP inválido (18 caracteres)',
          RFC_SIZE_MAX: 'Formato de RFC inválido (13 caracteres)',
          RFC_CURP_SIZE_MAX: 'Debe tener 13 caracteres (RFC) o 18 caracteres (CURP)',
          ENTITY: 'La entidad federativa es obligatoria',
          INSTITUTION: 'La institución es obligatoria',
          BRANCH_REQUIRED: 'La rama de la obra es obligatoria',
          DERIVED_TYPE_REQUIRED: 'El tipo de obra derivada es obligatorio',
          DESCRIPTION_REQUIRED: 'La descripción es obligatoria',
          DESCRIPTION_SIZE_MIN: 'Debe tener al menos 20 caracteres',
          DESCRIPTION_SIZE_MAX: 'No puede exceder 2000 caracteres',
          DESCRIPTION_SPACES: 'No debe iniciar o terminar con espacios',
          DESCRIPTION_BLANK: 'No puede contener solo espacios',
          DECLARATION_ORIGINALITY: 'Debe aceptar la declaración de originalidad',
          DECLARATION_VERACITY: 'Debe aceptar la declaración de veracidad',
          DECLARATION_OWNERSHIP: 'Debe aceptar la declaración de titularidad',
          ENTITY_INSTITUTION: 'Debe seleccionar una entidad federativa e institución',
          FILE_MAX_SIZE_PART_1: 'El archivo ',
          FILE_MAX_SIZE_PART_2: ' supera el tamaño máximo permitido de 10MB.',
          FILE_FORMAT_PART_2: ' no tiene un formato válido para ',
          DOCUMENT_TITLE: '¡Documentos Faltantes!',
          INDAUTOR_FORMAT: 'Debe adjuntar el formato oficial INDAUTOR (RPDA-01, RPDA-01-A1 o RPDA-01-A2)',
          SUBMIT: 'Ocurrió un error al procesar la solicitud. Intente nuevamente',
        },
        INFO: {
          SUCCESS: 'Solicitud de derecho de autor enviada exitosamente a INDAUTOR',
          CONFIRM: '¡Ok, entendido!',
        }
      },
    },
    ALERT: {
      DELETE: {
        TITLE: "¿Estás seguro de eliminar este registro?",
        BODY: "Esta acción no se puede deshacer",
        SUCCESS: "Registro eliminado"
      },
      LOGOUT: {
        TITLE: "¿Estás seguro de salir?",
        SUCCESS: "Sesión cerrada exitosamente"
      }
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
        CENTRALIZED_INSTITUTIONS: "Instituciones Descentralizadas",
        INSTITUTIONS: "Instituciones",
        APPLICATION_TYPE: "Tipo de solicitud",
        FEDERAL_ENTITIES: "Entidades Federativas",
      },
      SUBTITLES: {
        REGISTER: "Registros",
        MONTHS: "Meses (2025)",
        YEARS: "Años (2019-2024)",
        TOP_3: "Top 3",
        TOP_5: "Top 5",
      },
      LEGENDS: {
        NO_FEDERAL_ENTITIES: "No hay entidades federativas con registros.",
        NO_FEDERAL_INSTITUTIONS: "No hay instituciones federales con registros.",
        NO_CENTRALIZED_INSTITUTIONS: "No hay instituciones descentralizadas con registros.",
        TOTAL_APPLICATIONS: 'Total de solicitudes',
        HOVER_APPLICATIONS: 'solicitudes',
        ACRONYM: {
          MONTHS: {
            APRIL: 'Abr'
          }
        }

      },
      OPTIONS_FILTER: {
        TITLE: 'Opciones de filtro',
        LABEL: 'Tiempo:',
        OPTIONS: {
          MONTHS: 'Meses',
          YEARS: 'Años',
        }
      },
    },
    DEPARTMENTS: {
      IT: "Sistemas y computación",
      MECHANIC: "Metal-mecánica",
      CHEMISTRY: "Química",
    },
    ACRONYM: {
      PATENTS: "PA",
      TRADEMARKS: "MA",
      UTILITY_MODELS: 'MU',
      COPYRIGHTS: 'DA',
      INDUSTRIAL_DESIGNS: 'DI',
      VEGETAL_VARIETIES: 'VA',
      INDUSTRIAL_SECRETS: 'SE'
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
      LANGUAGES: {
        ENGLISH: 'Inglés',
        MANDARIN: 'Mandarín',
        SPANISH: 'Español',
        JAPANESE: 'Japonés',
        GERMAN: 'Alemán',
        FRENCH: 'Francés'
      }
    },
    MENU: {
      NEW: 'Nuevo',
      ACTIONS: 'Comportamiento',
      CREATE_POST: 'Crear nueva publicación',
      PAGES: 'Pages',
      FEATURES: 'Caracteristicas',
      APPS: 'Aplicaciones',
      DASHBOARD: 'Tablero',
      REGISTERS: 'Registros',
      USERS: 'Usuarios',
      HISTORICAL_REGISTERS: 'Registros Históricos',
      INTELECTUAL_PROPERTIES: 'Propiedades Intelectuales',
      REPORTS: 'Reportes',
      HELP: 'Ayuda',
      ADMIN: {
        MANAGEMENT: 'Gestión',
        COORDINATORS: 'Coordinadores',
        APPLICANTS: 'Solicitantes',
        INTELECTUAL_PROPERTY: 'Propiedad Intelectual',
        PATENTS: 'Patentes',
        TRADEMARKS: 'Marcas',
        UTILITY_MODELS: 'Modelos de Utilidad',
        COPYRIGHTS: 'Derechos de Autor',
        INDUSTRIAL_DESIGNS: 'Diseños Industriales',
        VEGETAL_VARIETIES: 'Variedades Vegetales',
        INDUSTRIAL_SECRETS: 'Secretos Industriales',
        HELP: 'Centro de Ayuda',
        IMPI_REGISTRIES: 'Registros IMPI',
        INDAUTOR_REGISTRIES: 'Registros INDAUTOR'
      },
      COORD: {
        APPLICANTS: 'Solicitantes',
        COPYRIGHTS: 'Derechos de Autor',
        INDUSTRIAL_DESIGNS: 'Diseños Industriales',
        INTELECTUAL_PROPERTY: 'Propiedad Intelectual',
        MANAGEMENT: 'Gestión',
        PATENTS: 'Patentes',
        TRADEMARKS: 'Marcas',
        UTILITY_MODELS: 'Modelos de Utilidad',
        VEGETAL_VARIETIES: 'Variedades Vegetales',
        INDUSTRIAL_SECRETS: 'Secretos Industriales',
        HELP: 'Centro de Ayuda'
      },
      APPLICANT: {
        MYREQUESTS: 'Mis Solicitudes',
        REQUESTS: 'Solicitudes',
        REPORTS: 'Reportes',
        REGISTER: "Registrar",
        HELP: 'Centro de Ayuda'
      },
    },
    AUTH: {
      GENERAL: {
        OR: 'O',
        SUBMIT_BUTTON: 'Enviar',
        NO_ACCOUNT: '¿No tienes una cuenta?',
        SIGNUP_BUTTON: 'Regístrate',
        FORGOT_BUTTON: '¿Olvidaste tu contraseña?',
        BACK_BUTTON: 'Regresar',
        CANCEL_BUTTON: 'Cancelar',
        PRIVACY: 'Privacidad',
        LEGAL: 'Legal',
        TERMS: 'Términos',
        CONTACT: 'Contáctanos',
        PLANS: 'Planes',
        ACCEPT_PRIVACY: 'Al ingresar aceptas el {{value}}',
      },
      LOGIN: {
        TITLE: 'Iniciar sesión',
        CEPPI: 'Centro de Patentamiento de Propiedad Intelectual',
        BUTTON: 'Iniciar Sesión',
        ERROR: 'Credenciales incorrectas',
        EPASSWORD: 'Mínimo 6 caracteres',
        ERROR_DETAIL: 'Verifica tu usuario y contraseña',
        USERNAME: 'Usuario',
        PASSWORD: 'Contraseña',
        LOADING: 'Por favor espere',
      },
      FORGOT: {
        TITLE: '¿Olvidaste tu contraseña?',
        DESC: 'Por favor ingresa tu correo para reestablecer tu contraseña',
        SUCCESS: 'Se ha enviado el restablecimiento de contraseña',
        ERROR: 'Lo sentimos, por favor inténtalo de nuevo',
        SENDING: 'Enviando',
        EMAIL: {
          LABEL: 'Correo electrónico',
          PLACEHOLDER: 'ejemplo@tecnm.mx',
          REQUIRED: 'Campo obligatorio',
          INVALID: 'Ingresa un correo válido'
        },
      },
      PRIVACY: {
        TITLE: 'Aviso de Privacidad',
        CONTENT: 'Texto completo del aviso de privacidad',
        ACCEPT: 'Aceptar'
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
    REPORTS: {
      TITLE: 'Reportes disponibles',
      DESC: 'Genera reportes de las solicitudes registradas',
      BUTTON: 'Generar Reporte',
      LOADING: 'Generando Reporte',
      ADMIN: {
        INSTITUTION: {
          TITLE: 'Instituciones',
          DESCRIPTION: 'Reporte de instituciones registradas.'
        },
        STATE: {
          TITLE: 'Entidad Federativa',
          DESCRIPTION: 'Reporte por entidad federativa.'
        },
        TYPE: {
          TITLE: 'Federal o Descentralizado',
          DESCRIPTION: 'Reporte clasificado por tipo de institución.'
        }
      },
      COORDINATOR: {
        DEPARTMENT: {
          TITLE: 'Departamento',
          DESCRIPTION: 'Reporte por departamento.'
        },
        RESEARCHER: {
          TITLE: 'Investigadores',
          DESCRIPTION: 'Reporte de investigadores.'
        },
        ACADEMIC: {
          TITLE: 'Cuerpo Académico',
          DESCRIPTION: 'Reporte de cuerpo académico.'
        },
        PROGRAM: {
          TITLE: 'Programa Educativo',
          DESCRIPTION: 'Reporte de programa educativo.'
        },
        DATE: {
          TITLE: 'Fecha de Solicitud',
          DESCRIPTION: 'Reporte por fecha de solicitud.'
        }
      },
      GUEST: {
        DATE: {
          TITLE: 'Fecha de Solicitud',
          DESCRIPTION: 'Reporte por fecha de solicitud.'
        },
        TYPE: {
          TITLE: 'Tipo de Solicitud',
          DESCRIPTION: 'Reporte por tipo de solicitud.'
        },

      },

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
    },
    KEYWORDS: {
      ABOUT: 'Acerca de',
      SUPPORT: 'Soporte',
      THEME: {
        LIGHT: 'Claro',
        DARK: 'Oscuro',
        SYSTEM: 'Sistema'
      },
      MY_PROFILE: 'Mi Perfil',
      LANGUAGE: 'Idioma',
      SETTINGS: 'Configuración',
      SIGN_OUT: 'Cerrar Sesión',
      LOADING: 'Cargando ...',
    },
    ERROR: {
      NOTAVAILABLE: {
        TITLE: "Funcionalidad no disponible",
        DESCRIPTION: "Lo sentimos, esta funcionalidad no está disponible en este momento. Por favor, inténtelo de nuevo más tarde o contacte con el soporte técnico si el problema persiste.",
        BACK_TO_HOME: "Volver al inicio"
      },
      NOT_FOUND: {
        TITLE: 'Página no encontrada',
        BODY: 'No podemos encontrar esa página.',
        BACK_TO_HOME: "Volver al inicio"
      }
    },
    GUEST: {
    REGISTER: {
      COPYRIGHT: {
        TITLE: 'Derechos de Autor',
        DESCRIPTION: 'Protección de obras literarias, artísticas, musicales, audiovisuales y programas de software'
      },
      PATENT: {
        TITLE: 'Patente',
        DESCRIPTION: 'Protección de invenciones con aplicación industrial'
      },
      UTILITY_MODEL: {
        TITLE: 'Modelo de Utilidad',
        DESCRIPTION: 'Protección de objetos, utensilios o herramientas mejoradas'
      },
      INDUSTRIAL_DESIGN: {
        TITLE: 'Diseño Industrial',
        DESCRIPTION: 'Protección del aspecto ornamental de productos industriales'
      },
      TRADEMARK: {
        TITLE: 'Marca',
        DESCRIPTION: 'Protección de signos distintivos comerciales'
      },
      PLANT_VARIETY: {
        TITLE: 'Variedad Vegetal',
        DESCRIPTION: 'Protección de nuevas variedades de plantas'
      },
      INDUSTRIAL_SECRET: {
        TITLE: 'Secretos Industriales',
        DESCRIPTION: 'Protección de secretos comerciales y de información confidencial'
      },
      CIRCUIT_MAPPING:{
        TITLE: 'Trazado de Circuitos Integrados',
        DESCRIPTION: 'Protección de diseños de circuitos electricos'
      }
    }
    },
    USER_REGISTER: {
      TITLE: 'Registro de Nuevos Usuarios',
      DESCRIPTION: 'Registra nuevos usuarios en el sistema. Selecciona el tipo de usuario que deseas registrar y completa los campos requeridos.',
      REGISTER: 'Registrar',
      COORDINATOR: {
        TITLE: 'Registro de Coordinador',
        DESCRIPTION: 'Registra un nuevo coordinador en el sistema.',
      },
      GUEST: {
        TITLE: 'Registro de Solicitante',
        DESCRIPTION: 'Registra un nuevo solicitante en el sistema.',
      },
    },
    HISTORICAL_REGISTER: {
      TITLE: 'Registro Histórico de Solicitudes',
      DESCRIPTION: 'Cargar registros históricos de solicitudes de propiedad intelectual.',
      IMPI: {
        TITLE: 'REGISTROS IMPI',
        DESCRIPTION: 'Cargar registros históricos de solicitudes mediante IMPI.',
      },
      INDAUTOR: {
        TITLE: 'REGISTROS INDAUTOR',
        DESCRIPTION: 'Cargar registros históricos de solicitudes mediante INDAUTOR.',
      },
      REGISTER_ACTION: 'Cargar Registro',
    }
  },
};
