// USA
export const locale = {
  lang: 'en',
  data: {
    BUTTON: {
      NEW: {
        COORDINATOR: 'Register coordinator',
        APPLICANT: 'Register applicant',
        PATENT: 'Register patent',
        TRADEMARK: 'Register trademark',
        UTILITY_MODEL: 'Register utility model',
        COPYRIGHT: 'Register copyright',
        INDUSTRIAL_DESIGN: 'Register industrial design',
        VEGETAL_VARIETY: 'Register plant variety',
        INDUSTRIAL_SECRET: 'Register trade secret',
      },
      CONFIRM: "Confirm",
      CANCEL: "Cancel",
      RETURN: "Return",
      CLOSE: 'Close',
      DOWNLOAD: 'Download',
      SEE: 'View',
      PATENT: 'Submit patent application',
      UTILITY_MODEL: 'Submit utility model application',
      INDUSTRIAL_DESIGN: 'Submit industrial design application',
      COPYRIGHT: 'Submit copyright application',
      PROCESSING: 'Processing...',
      CONFIRM_LOGOUT: 'Sign out',
    },
    TABLE: {
      ACTIONS: {
        LABEL: 'Actions',
        EDIT: 'Edit',
        DELETE: 'Delete',
        VIEW: 'View'
      },
      APPLICANT_NAME: "Applicant",
      WORK_TITLE: "Title",
      INSTITUTION: "Institution",
      DATE: "Application date",
      PAG_INFO: "Showing _START_ to _END_ of _TOTAL_ records",
      PAG_INFO_FILTERED: "(filtered from _MAX_ total records)",
      PAG_INFO_EMPTY: "Showing 0 to 0 of 0 records",
      PROCESSING: "Loading data",
      EMPTY_TABLE: "No records found",
      PLACEHOLDER_SEARCH: "Search...",
      ZERO_RECORDS: 'No matches found',
      TYPE_REQUEST: "Request type",
      STATUS_REQUEST: "Status",
      FULL_NAME: "Full name",
      FEDERAL_ENTITY: "Federal Entity",
      PHONE: "Phone",
      REGISTERED_DATE: "Registration date",
      TITLE_REQUEST: "Title",
      DESCRIPTION_REQUEST: "Description",
      PAGE_LENGTH: {
        LABEL: "Show:",
        RECORDS: "records"
      },
      MARK: {
        NAME: 'Denomination',
        IMAGE: 'Logo',
        APPLICATION_TYPE: 'Application type',
        APPLICANT: 'Holder',
        DATE: 'Filing date'
      }
    },
    MODAL: {
      TITLE: 'Details',
      INFO: {
        TITLE: 'Read-Only Information',
        BODY: 'Details are shown for reference only.'
      },
      FORM: {
        PATENT: {
          NAME: 'Patent name'
        },
        MARK: {
          NAME: 'Denomination',
          RECORD: 'File',
          IMAGE: 'Logo',
          APPLICATION_TYPE: 'Application type',
          APPLICANT: 'Holder',
          DATE: 'Filing date',
          DATE_GRANT: 'Grant date',
          DATE_COMPLETION: 'Completion date',
          DATE_START: 'Start of use',
          IMAGE_INFO: 'Trademark image',
          FORMALITIES: {
            LABEL: 'Procedures',
            ENTRY_FOLIO: 'Entry folio:',
            YEAR_RECEPTION: 'Reception year:',
            START_DATE: 'Start date:',
            COMPLETION_DATE: 'Completion date:'
          },
          FORMALITIES_EMPTY: 'No procedures registered'
        },
        COPYRIGHT: {
          NAME: 'Work name',
        },
        APPLICANT: 'Applicant',
        EMAIL: 'Email',
        DATE: 'Application date',
        STATUS: 'Status',
        FEDERAL_ENTITY: {
          LABEL: 'Federal Entity',
          OPTIONS_LABEL: 'Select a federal entity'
        },
        INSTITUTION: {
          LABEL: 'Institution',
          OPTIONS_LABEL: 'Select an institution',
        },
        DESCRIPTION: 'Description',
        DOCUMENTATION: 'Documentation',
        DOCUMENTATION_EMPTY: 'No attached documents'
      },
      FOLLOW_UP: {
        TITLE: 'Follow-up',
        APPLICATION_ID: 'Application ID',
        APPLICANT: 'Applicant',
        PROGRESS: 'Progress',
        HISTORY_TITLE: 'Process History',
        STATUS: {
          REGISTERED: 'Registered',
          IN_PROCESS: 'In Process',
          WITH_OBSERVATIONS: 'Process with Observations',
          APPROVED: 'Approved',
          COMPLETED: 'Completed'
        },
        STATUS_LABELS: {
          CURRENT: 'Current',
          COMPLETED: 'Completed',
          REQUIRES_ATTENTION: 'Requires Attention',
          FINISHED: 'Finished',
          PENDING: 'Pending'
        },
        DESCRIPTIONS: {
          REGISTERED: 'The application has been successfully registered in the system.',
          IN_PROCESS: 'The application is being reviewed.',
          WITH_OBSERVATIONS: 'Corrections or additional information are required to continue.',
          APPROVED: 'The application has been approved.',
          COMPLETED: 'The process has been completed.'
        },
        DETAILS: {
          REGISTERED: {
            DESCRIPTION: 'The application has been successfully registered in the system.',
            DATE_LABEL: 'Date:'
          },
          IN_PROCESS: {
            DESCRIPTION: 'The application is being evaluated by the specialized technical team.',
            EVALUATOR: 'Evaluator: Coordinator'
          },
          WITH_OBSERVATIONS: {
            DESCRIPTION: 'Aspects have been found that require correction or additional information.',
            DEADLINE: 'Response deadline: 30 business days'
          },
          APPROVED: {
            DESCRIPTION: 'The application has been approved and legal protection has been granted.',
            PROTECTION: 'Protection granted for 20 years'
          },
          COMPLETED: {
            DESCRIPTION: 'The process has been completed.',
            TITLE_ISSUED: 'Application title issued'
          }
        },
        BUTTONS: {
          CLOSE: 'Close',
          NOTIFICATIONS: 'Notifications',
          GENERATE_REPORT: 'Generate Report'
        }
      }
    },
    FORMS: {
      PATENT: {
        TITLE: 'Patent Application - USPTO',
        INFO_1: 'Complete all required information for patent registration with the USPTO.',
        INFO_2: 'All fields marked with (*) are mandatory.',
        GENERAL_SECTION: {
          TITLE: 'General Applicant Information',
          APPLICATION_DATE: 'Application date',
          APPLICATION_MODE: {
            LABEL: 'Application mode',
            SELECT_MODE: 'Select mode',
            ONLINE: 'Online (e-USPTO)',
            IN_PERSON: 'In-person (Offices)',
          },
          NAME_COMPANY: {
            LABEL: 'Full name / Business name',
            PLACEHOLDER: 'Full name of applicant or business name',
          },
          NATIONALITY: {
            LABEL: 'Nationality',
            PLACEHOLDER: 'Applicant nationality',
          },
          EMAIL: {
            LABEL: 'Email',
            PLACEHOLDER: 'example@domain.com',
          },
          PHONE: 'Phone number',
          ADDRESS: {
            LABEL: 'Address',
            PLACEHOLDER: 'Street, number, neighborhood, city, state, zip code',
          },
          CURP_RFC: {
            PLACEHOLDER: 'SSN (9 digits) or Tax ID (varies by country)',
          },
          INVENTOR_APPLICANT: {
            LABEL: 'Are the inventor and applicant different?',
            YES: 'Yes, they are different',
            NO: 'No, they are the same person',
          },
          ENTITY: {
            LABEL: 'State/Province',
            SELECT_ENTITY: 'Select a state/province',
          },
          INSTITUTION: {
            LABEL: 'Institution',
            SELECT_INSTITUTION: 'Select an institution',
          }
        },
        INVENTION_SECTION: {
          TITLE: 'Invention Information',
          INVENTION_TITLE: {
            LABEL: 'Invention title',
            PLACEHOLDER: 'Descriptive title of the invention',
          },
          TECHNICAL_FIELD: {
            LABEL: 'Technical field',
            PLACEHOLDER: 'Technical field to which the invention belongs',
          },
          STATE_TECHNIQUE: {
            LABEL: 'State of the art (Background)',
            PLACEHOLDER: 'Describe existing solutions, prior patents, relevant scientific publications and their limitations',
          },
          TECHNICAL_PROBLEM: {
            LABEL: 'Technical problem to solve',
            PLACEHOLDER: 'Describe the technical problem the invention seeks to solve',
          },
          INDUSTRIAL_APPLICATION: {
            LABEL: 'Industrial application',
            PLACEHOLDER: 'Describe how the invention can be used in industry or daily life',
          }
        },
        DETAILED_DESCRIPTION_SECTION: {
          TITLE: 'Detailed description of the invention',
          DETAILED_DESCRIPTION: {
            LABEL: 'Detailed description',
            PLACEHOLDER: 'Complete description of the invention, including its operation, characteristics and advantages',
          },
          EXAMPLES_REALIZATION: {
            LABEL: 'Implementation examples',
            PLACEHOLDER: 'Practical examples of how the invention can be implemented',
          },
          CLAIMS: {
            LABEL: 'Claims',
            PLACEHOLDER: 'Specific claims that define the scope of protection requested',
          },
          SUMMARY: {
            LABEL: 'Summary (150-250 words)',
            PLACEHOLDER: 'Brief summary of the invention and its main characteristics',
          }
        },
        DOCUMENTATION_SECTION: {
          TITLE: 'Documentation',
          IMPI: {
            LABEL: 'Official USPTO form',
            SUB_TEXT: 'Attach official USPTO form properly filled out'
          },
          TECHNICAL_DRAWINGS: {
            LABEL: 'Technical drawings or figures',
            SUB_TEXT: 'Technical drawings necessary for understanding the invention'
          },
          PAYMENT_FEES: {
            LABEL: 'Fee payment receipt',
            SUB_TEXT: 'Receipt of payment of application fees to the USPTO'
          },
          ADDITIONAL_DOCUMENTS: {
            LABEL: 'Additional documents',
            SUB_TEXT: 'Power of attorney, assignment of rights, translations, etc. (if applicable)'
          },
          SELECTED_FILES: 'Selected files:',
        },
        STATEMENTS_SECTION: {
          TITLE: 'Declarations',
          STATEMENT_1: 'I declare that the invention is the result of my own work and is not a copy of another already existing in commerce.',
          STATEMENT_2: 'I declare under oath that the information provided is correct and complete.',
          INVENTION_PREVIOUSLY: {
            LABEL: 'Has the invention been previously disclosed?',
            YES: 'Yes, it has been previously disclosed',
            NO: 'No, it has not been disclosed',
          },
          DISCLOSURE_DETAILS: {
            LABEL: 'Prior disclosure details',
            PLACEHOLDER: 'Describe how and when the invention was previously disclosed',
          },
        },
        ERRORS: {
          APPLICATION_MODE: 'Application mode is required',
          EMAIL_REQUIRED: 'Email is required',
          EMAIL_INVALID: 'Must enter a valid email',
          EMAIL_SIZE_MAX: 'Cannot exceed 100 characters',
          EMAIL_FORMAT: 'Cannot contain consecutive dots',
          EMAIL_BLANK: 'Cannot contain spaces',
          EMAIL_DOMAIN_FORMAT: 'Invalid domain format',
          PHONE: 'Phone number is required',
          PHONE_REQUIRED: 'Cell phone number is required',
          PHONE_FORMAT: 'Must contain exactly 10 digits',
          PHONE_FORMAT_NUMBERS: 'Only numbers are allowed',
          PHONE_FORMAT_DIGIT: 'Cannot contain the same repeated digit',
          PHONE_FORMAT_DIGIT_VALID: 'Must start with a valid digit (2-9)',
          ADDRESS_REQUIRED: 'Address is required',
          ADDRESS_MIN_LENGTH: 'Address must have at least 10 characters',
          ADDRESS_MAX_LENGTH: 'Address cannot exceed 300 characters',
          ADDRESS_SIZE_MIN: 'Must have at least 10 characters',
          ADDRESS_SIZE_MAX: 'Cannot exceed 300 characters',
          ADDRESS_FORMAT: 'Contains invalid characters',
          ADDRESS_BLANK: 'Cannot contain only spaces',
          ADDRESS_SPACES: 'Must not start or end with spaces',
          ENTITY: 'State/province is required',
          ENTITY_INSTITUTION: 'Must select a state/province and institution',
          INSTITUTION: 'Institution is required',
          NAME_REQUIRED: 'Full name / business name is required',
          NAME_SIZE_MIN: 'Must have at least 3 characters',
          NAME_SIZE_MAX: 'Cannot exceed 200 characters',
          NAME_BLANK: 'Cannot contain only spaces',
          NAME_FORMAT: 'Only letters, numbers, spaces and basic special characters are allowed',
          NAME_SPACES: 'Must not start or end with spaces',
          NAME_MULTIPLE_SPACES: 'Must not contain multiple consecutive spaces',
          NAME_ONLY_NUMBERS: 'Cannot contain only numbers',
          NAME_ONLY_SPECIAL: 'Must contain at least letters or numbers',
          NATIONALITY_REQUIRED: 'Nationality is required',
          NATIONALITY_SIZE_MIN: 'Must have at least 4 characters',
          NATIONALITY_SIZE_MAX: 'Cannot exceed 50 characters',
          NATIONALITY_FORMAT: 'Only letters are allowed',
          NATIONALITY_BLANK: 'Cannot contain only spaces',
          CURP_SIZE_MAX: 'Invalid SSN format (9 digits)',
          RFC_SIZE_MAX: 'Invalid Tax ID format (varies by country)',
          RFC_CURP_SIZE_MAX: 'Must have valid ID format',
          INVENTION_REQUIRED: 'Invention title is required',
          INVENTION_MIN_LENGTH: 'Invention title must have at least 5 characters',
          INVENTION_MAX_LENGTH: 'Invention title cannot exceed 500 characters',
          INVENTION_TITLE: 'The invention title',
          TECHNICAL_FIELD_REQUIRED: 'Technical field is required',
          TECHNICAL_FIELD_MIN_LENGTH: 'Technical field must have at least 20 characters',
          TECHNICAL_FIELD_MAX_LENGTH: 'Technical field cannot exceed 800 characters',
          TECHNICAL_FIELD: 'The technical field',
          STATE_TECHNIQUE_REQUIRED: 'State of the art is required',
          STATE_TECHNIQUE_MIN_LENGTH: 'State of the art must have at least 50 characters',
          STATE_TECHNIQUE_MAX_LENGTH: 'State of the art cannot exceed 1500 characters',
          STATE_TECHNIQUE: 'The state of the art',
          TECHNICAL_PROBLEM_REQUIRED: 'Technical problem is required',
          TECHNICAL_PROBLEM_MIN_LENGTH: 'Technical problem must have at least 30 characters',
          TECHNICAL_PROBLEM_MAX_LENGTH: 'Technical problem cannot exceed 1000 characters',
          TECHNICAL_PROBLEM: 'The technical problem',
          INDUSTRIAL_APPLICATION_REQUIRED: 'Industrial application is required',
          INDUSTRIAL_APPLICATION_MIN_LENGTH: 'Industrial application must have at least 20 characters',
          INDUSTRIAL_APPLICATION_MAX_LENGTH: 'Industrial application cannot exceed 800 characters',
          INDUSTRIAL_APPLICATION: 'The industrial application',
          DETAILED_DESCRIPTION_REQUIRED: 'Detailed description is required',
          DETAILED_DESCRIPTION_MIN_LENGTH: 'Detailed description must have at least 100 characters',
          DETAILED_DESCRIPTION_MAX_LENGTH: 'Detailed description cannot exceed 3000 characters',
          DETAILED_DESCRIPTION: 'The detailed description',
          EXAMPLES_REALIZATION_REQUIRED: 'Implementation examples are required',
          EXAMPLES_REALIZATION_MIN_LENGTH: 'Implementation examples must have at least 50 characters',
          EXAMPLES_REALIZATION_MAX_LENGTH: 'Implementation examples cannot exceed 2000 characters',
          EXAMPLES_REALIZATION: 'The implementation examples',
          CLAIMS_REQUIRED: 'Claims are required',
          CLAIMS_MIN_LENGTH: 'Claims must have at least 30 characters',
          CLAIMS_MAX_LENGTH: 'Claims cannot exceed 2000 characters',
          CLAIMS: 'The claims',
          SUMMARY_REQUIRED: 'Summary is required',
          SUMMARY_MIN_LENGTH: 'Summary must have at least 150 characters',
          SUMMARY_MAX_LENGTH: 'Summary cannot exceed 250 characters',
          SUMMARY_SIZE_MIN: 'Must have at least 150 characters',
          SUMMARY_SIZE_MAX: 'Cannot exceed 250 characters',
          SUMMARY_SIZE_MIN_WORDS: 'Must have at least 25 words',
          SUMMARY_SIZE_MAX_WORDS: 'Cannot exceed 50 words',
          DECLARATION_ORIGINALITY: 'Must accept the originality declaration',
          DECLARATION_VERACITY: 'Must accept the veracity declaration',
          DISCLOSURE_DETAILS: 'The disclosure details',
          FILE_MAX_SIZE_PART_1: 'The file ',
          FILE_MAX_SIZE_PART_2: ' exceeds the maximum allowed size of 10MB.',
          FILE_FORMAT_PART_2: ' does not have a valid format for ',
          REQUIRED: ' is required',
          SIZE_MIN: 'Must have at least ',
          SIZE_MAX: 'Cannot exceed ',
          CHAR: ' characters',
          SPACES: 'Must not start or end with spaces',
          BLANK: 'Cannot contain only spaces',
          LETTERS: 'Must contain at least some letters',
          SUBMIT: 'An error occurred processing the request. Please try again',
          DOCUMENT_TITLE: 'Missing Documents!',
          IMPI: 'Must attach the official USPTO form',
          PAYMENT: 'Must attach the fee payment receipt',
        },
        INFO: {
          SUCCESS: 'Patent application successfully submitted to USPTO',
          CONFIRM: 'OK, understood!',
        }
      },
      UTILITY_MODEL: {
        TITLE: 'Register Utility Model',
        INFO_1: 'Complete the required information to register the utility model with the USPTO.',
        INFO_2: 'Utility models protect improvements or functional modifications to existing tools, utensils or devices.',
        GENERAL_SECTION: {
          TITLE: 'General Applicant Information',
          APPLICATION_DATE: 'Application Date',
          APPLICATION_MODE: {
            LABEL: 'Application Mode',
            SELECT_MODE: 'Select mode',
            ONLINE: 'Online (e-USPTO)',
            IN_PERSON: 'In-person (Offices)',
          },
          NAME_COMPANY: {
            LABEL: 'Full Name / Business Name',
            PLACEHOLDER: 'Enter full name or business name',
          },
          NATIONALITY: {
            LABEL: 'Nationality',
            PLACEHOLDER: 'Ex: American',
          },
          EMAIL: {
            LABEL: 'Email',
            PLACEHOLDER: 'example@email.com',
          },
          PHONE: 'Cell Phone Number',
          ADDRESS: {
            LABEL: 'Address for Notifications',
            PLACEHOLDER: 'Street, number, neighborhood, city, state, zip code',
          },
          CURP_RFC: {
            PLACEHOLDER: 'For US individuals or entities',
          },
          INVENTOR_APPLICANT: {
            LABEL: 'Are the inventor and applicant different?',
            YES: 'Yes, they are different people',
            NO: 'No, they are the same person',
          },
          ENTITY: {
            LABEL: 'State',
            SELECT_ENTITY: 'Select a state',
          },
          INSTITUTION: {
            LABEL: 'Institution',
            SELECT_INSTITUTION: 'Select an institution',
          }
        },
        MODEL_SECTION: {
          TITLE: 'Utility Model Information',
          MODEL_NAME: {
            LABEL: 'Utility Model Name',
            PLACEHOLDER: 'Descriptive name of the utility model',
          },
          TECHNICAL_FIELD: {
            LABEL: 'Technical Field',
            PLACEHOLDER: 'Technical area to which the utility model belongs',
          },
          STATE_TECHNIQUE: {
            LABEL: 'State of the Art (Background)',
            PLACEHOLDER: 'Description of similar existing tools, utensils or devices',
          },
          TECHNICAL_PROBLEM: {
            LABEL: 'Technical Problem to Solve',
            PLACEHOLDER: 'Inconveniences or limitations that the utility model solves',
          },
          INDUSTRIAL_APPLICATION: {
            LABEL: 'Industrial Application',
            PLACEHOLDER: 'Practical uses and industrial applications of the utility model',
          }
        },
        DETAILED_DESCRIPTION_SECTION: {
          TITLE: 'Detailed Technical Description',
          DETAILED_DESCRIPTION: {
            LABEL: 'Detailed Description of the Improvement',
            PLACEHOLDER: 'Clear and detailed explanation of the functional modifications or improvements',
          },
          EXAMPLES_REALIZATION: {
            LABEL: 'Implementation Examples',
            PLACEHOLDER: 'Specific ways to implement the functional improvements',
          },
          CLAIMS: {
            LABEL: 'Claims',
            PLACEHOLDER: 'New and functional characteristics to be protected',
          },
          SUMMARY: {
            LABEL: 'Summary (150-250 words)',
            PLACEHOLDER: 'Brief summary of the utility model for publication in the USPTO Gazette',
          }
        },
        DOCUMENTATION_SECTION: {
          TITLE: 'Documentation',
          IMPI: {
            LABEL: 'Official USPTO form',
            SUB_TEXT: 'Official form for utility model registration application'
          },
          TECHNICAL_DRAWINGS: {
            LABEL: 'Technical drawings or figures',
            SUB_TEXT: 'Diagrams, plans or illustrations showing the functional improvements'
          },
          PAYMENT_FEES: {
            LABEL: 'Fee payment receipt',
            SUB_TEXT: 'Receipt of payment of fees for filing the application'
          },
          ADDITIONAL_DOCUMENTS: {
            LABEL: 'Additional documents',
            SUB_TEXT: 'Power of attorney, assignment of rights, foreign priority (if applicable)'
          },
          SELECTED_FILES: 'Selected Files',
        },
        STATEMENTS_SECTION: {
          TITLE: 'Declarations',
          STATEMENT_1: 'I declare that the utility model is the result of my own work and is not a copy of another already existing in commerce',
          STATEMENT_2: 'I declare under oath that the information provided is true and complete',
          INVENTION_PREVIOUSLY: {
            LABEL: 'Has the invention been previously disclosed?',
            YES: 'Yes, it has been previously disclosed',
            NO: 'No, it has not been previously disclosed',
          },
          DISCLOSURE_DETAILS: {
            LABEL: 'Prior Disclosure Details',
            PLACEHOLDER: 'Specify where, when and how it was previously disclosed',
          },
        },
        ERRORS: {
          APPLICATION_MODE: 'Application mode is required',
          NAME_REQUIRED: 'Full name / business name is required',
          NAME_SIZE_MIN: 'Must have at least 3 characters',
          NAME_SIZE_MAX: 'Cannot exceed 200 characters',
          NAME_FORMAT: 'Only letters, numbers, spaces and basic special characters are allowed',
          NAME_BLANK: 'Must not start or end with spaces',
          NAME_MULTIPLE_BLANKS: 'Must not contain multiple consecutive spaces',
          NATIONALITY_REQUIRED: 'Nationality is required',
          NATIONALITY_SIZE_MIN: 'Must have at least 4 characters',
          NATIONALITY_SIZE_MAX: 'Cannot exceed 50 characters',
          NATIONALITY_FORMAT: 'Only letters are allowed',
          EMAIL_REQUIRED: 'Email is required',
          EMAIL_SIZE_MAX: 'Cannot exceed 100 characters',
          EMAIL_INVALID: 'Must enter a valid email',
          EMAIL_FORMAT: 'Cannot contain consecutive dots',
          EMAIL_BLANK: 'Cannot contain spaces',
          PHONE_REQUIRED: 'Cell phone number is required',
          PHONE_FORMAT: 'Must contain exactly 10 digits',
          PHONE_FORMAT_NUMBERS: 'Only numbers are allowed',
          PHONE_FORMAT_DIGIT: 'Cannot contain the same repeated digit',
          PHONE_FORMAT_DIGIT_VALID: 'Must start with a valid digit (2-9)',
          ADDRESS_REQUIRED: 'Address is required',
          ADDRESS_SIZE_MIN: 'Must have at least 10 characters',
          ADDRESS_SIZE_MAX: 'Cannot exceed 300 characters',
          ADDRESS_FORMAT: 'Contains invalid characters',
          ADDRESS_BLANK: 'Cannot contain only spaces',
          ADDRESS_MULTIPLE_BLANKS: 'Must not start or end with spaces',
          CURP_SIZE_MAX: 'Invalid SSN format (9 digits)',
          RFC_SIZE_MAX: 'Invalid Tax ID format (varies)',
          RFC_CURP_SIZE_MAX: 'Must have valid ID format',
          ENTITY: 'State is required',
          INSTITUTION: 'Institution is required',
          MODEL_NAME_REQUIRED: 'Utility model name is required',
          TECHNICAL_FIELD_REQUIRED: 'Technical field is required',
          STATE_TECHNIQUE_REQUIRED: 'State of the art is required',
          TECHNICAL_PROBLEM_REQUIRED: 'Technical problem is required',
          INDUSTRIAL_APPLICATION_REQUIRED: 'Industrial application is required',
          DETAILED_DESCRIPTION_REQUIRED: 'Detailed description is required',
          EXAMPLES_REALIZATION_REQUIRED: 'Implementation examples are required',
          CLAIMS_REQUIRED: 'Claims are required',
          SUMMARY_REQUIRED: 'Summary is required',
          SUMMARY_SIZE_MIN: 'Must have at least 150 characters',
          SUMMARY_SIZE_MIN_WORDS: 'Must have at least 25 words',
          SUMMARY_SIZE_MAX: 'Cannot exceed 250 characters',
          SUMMARY_SIZE_MAX_WORDS: 'Cannot exceed 50 words',
          DECLARATION_ORIGINALITY: 'Must accept the originality declaration',
          DECLARATION_VERACITY: 'Must accept the veracity declaration',
          ENTITY_INSTITUTION: 'Must select a state and institution',
          FILE_MAX_SIZE_PART_1: 'The file ',
          FILE_MAX_SIZE_PART_2: ' exceeds the maximum allowed size of 10MB.',
          FILE_FORMAT_PART_2: ' does not have a valid format for ',
          REQUIRED: ' is required',
          SIZE_MIN: 'Must have at least ',
          SIZE_MAX: 'Cannot exceed ',
          CHAR: ' characters',
          BLANKS: 'Must not start or end with spaces',
          BLANK: 'Cannot contain only spaces',
          LETTERS: 'Must contain at least some letters',
          UTILITY_MODEL: 'The utility model name',
          TECHNICAL_FIELD: 'The technical field',
          STATE_TECHNIQUE: 'The state of the art',
          TECHNICAL_PROBLEM: 'The technical problem',
          INDUSTRIAL_APPLICATION: 'The industrial application',
          DETAILED_DESCRIPTION: 'The detailed description',
          EXAMPLES_REALIZATION: 'The implementation examples',
          CLAIMS: 'The claims',
          SUBMIT: 'An error occurred processing the request. Please try again',
          DOCUMENT_TITLE: 'Missing Documents!',
          IMPI: 'Must attach the official USPTO form',
          PAYMENT: 'Must attach the fee payment receipt',
        },
        INFO: {
          SUCCESS: 'Utility model application successfully submitted',
          CONFIRM: 'Understood!',
        }
      },
      INDUSTRIAL_DESIGN: {
        TITLE: 'Industrial Design Registration Application - USPTO',
        INFO_1: 'Complete all required information for industrial design registration with the USPTO.',
        INFO_2: 'All fields marked with (*) are mandatory.',
        GENERAL_SECTION: {
          TITLE: 'General Applicant Information',
          APPLICATION_DATE: 'Application date',
          APPLICATION_MODE: {
            LABEL: 'Application mode',
            SELECT_MODE: 'Select mode',
            ONLINE: 'Online (e-USPTO)',
            IN_PERSON: 'In-person (Offices)',
          },
          NAME_COMPANY: {
            LABEL: 'Full name / Business name',
            PLACEHOLDER: 'Full name of applicant or business name',
          },
          NATIONALITY: {
            LABEL: 'Nationality',
            PLACEHOLDER: 'Applicant nationality',
          },
          EMAIL: {
            LABEL: 'Email',
            PLACEHOLDER: 'example@domain.com',
          },
          PHONE: 'Phone number',
          ADDRESS: {
            LABEL: 'Address',
            PLACEHOLDER: 'Street, number, neighborhood, city, state, zip code',
          },
          CURP_RFC: {
            PLACEHOLDER: 'SSN (9 digits) or Tax ID (varies)',
          },
          DESIGNER_APPLICANT: {
            LABEL: 'Are the designer and applicant different?',
            YES: 'Yes, they are different',
            NO: 'No, they are the same person',
          },
          ENTITY: {
            LABEL: 'State',
            SELECT_ENTITY: 'Select a state',
          },
          INSTITUTION: {
            LABEL: 'Institution',
            SELECT_INSTITUTION: 'Select an institution',
          }
        },
        DESIGN_SECTION: {
          TITLE: 'Industrial Design Information',
          DESIGN_NAME: {
            LABEL: 'Industrial design denomination',
            PLACEHOLDER: 'Descriptive denomination of the industrial design',
          },
          DESIGN_TYPE: {
            LABEL: 'Type of industrial design',
            SELECT_TYPE: 'Select the design type',
            INDUSTRIAL_MODEL: 'Industrial Model',
            INDUSTRIAL_DRAWING: 'Industrial Drawing',
          },
          PRODUCT_CLASS: {
            LABEL: 'Product class',
            PLACEHOLDER: 'Specify the product class to which the design will be applied',
          }
        },
        TECHNICAL_DESCRIPTION_SECTION: {
          TITLE: 'Technical Description of the Design',
          NEW_ELEMENTS: {
            LABEL: 'Description of new or original elements',
            PLACEHOLDER: 'Describe in detail the new or original elements of the design',
          },
          VISUAL_CHARACTERISTICS: {
            LABEL: 'Distinctive visual characteristics',
            PLACEHOLDER: 'Describe the visual characteristics that make the design distinctive (shape, color, texture, etc.)',
          },
          GENERAL_DESCRIPTION: {
            LABEL: 'General description of the design',
            PLACEHOLDER: 'Provide a complete and detailed description of the industrial design',
          },
          SUMMARY: {
            LABEL: 'Summary (150-250 words)',
            PLACEHOLDER: 'Brief summary of the industrial design for publication in the USPTO Gazette',
          }
        },
        DOCUMENTATION_SECTION: {
          TITLE: 'Documentation',
          VIEWS_INFO: {
            TITLE: 'Required views for industrial designs',
            DESCRIPTION: 'Technical drawings must include perspective, front, side, rear, top and bottom views of the object.',
          },
          IMPI: {
            LABEL: 'Official USPTO form',
            SUB_TEXT: 'Official form for industrial design registration application'
          },
          TECHNICAL_DRAWINGS: {
            LABEL: 'Technical drawings and design views',
            SUB_TEXT: 'Include perspective, front, side, rear, top and bottom views'
          },
          PAYMENT_FEES: {
            LABEL: 'Fee payment receipt',
            SUB_TEXT: 'Receipt of payment of fees for filing the application'
          },
          ADDITIONAL_DOCUMENTS: {
            LABEL: 'Additional documents',
            SUB_TEXT: 'Power of attorney, assignment of rights, foreign priority (if applicable)'
          },
          SELECTED_FILES: 'Selected Files',
        },
        STATEMENTS_SECTION: {
          TITLE: 'Declarations',
          STATEMENT_1: 'I declare that the industrial design is the result of my own work and is not a copy of another already existing in commerce',
          STATEMENT_2: 'I declare under oath that the information provided is correct and complete',
          DESIGN_PREVIOUSLY: {
            LABEL: 'Has the design been previously disclosed?',
            YES: 'Yes, it has been previously disclosed',
            NO: 'No, it has not been disclosed',
          },
          DISCLOSURE_DETAILS: {
            LABEL: 'Prior disclosure details',
            PLACEHOLDER: 'Describe how and when the design was previously disclosed',
          },
        },
        ERRORS: {
          APPLICATION_MODE: 'Application mode is required',
          NAME_REQUIRED: 'Full name / business name is required',
          NAME_SIZE_MIN: 'Must have at least 3 characters',
          NAME_SIZE_MAX: 'Cannot exceed 200 characters',
          NAME_FORMAT: 'Only letters, numbers, spaces and basic special characters are allowed',
          NAME_SPACES: 'Must not start or end with spaces',
          NAME_MULTIPLE_SPACES: 'Must not contain multiple consecutive spaces',
          NATIONALITY_REQUIRED: 'Nationality is required',
          NATIONALITY_SIZE_MIN: 'Must have at least 4 characters',
          NATIONALITY_SIZE_MAX: 'Cannot exceed 50 characters',
          NATIONALITY_FORMAT: 'Only letters are allowed',
          EMAIL_REQUIRED: 'Email is required',
          EMAIL_SIZE_MAX: 'Cannot exceed 100 characters',
          EMAIL_INVALID: 'Must enter a valid email',
          EMAIL_FORMAT: 'Cannot contain consecutive dots',
          EMAIL_BLANK: 'Cannot contain spaces',
          PHONE_REQUIRED: 'Cell phone number is required',
          PHONE_FORMAT: 'Must contain exactly 10 digits',
          PHONE_FORMAT_NUMBERS: 'Only numbers are allowed',
          PHONE_FORMAT_DIGIT: 'Cannot contain the same repeated digit',
          PHONE_FORMAT_DIGIT_VALID: 'Must start with a valid digit (2-9)',
          ADDRESS_REQUIRED: 'Address is required',
          ADDRESS_SIZE_MIN: 'Must have at least 10 characters',
          ADDRESS_SIZE_MAX: 'Cannot exceed 300 characters',
          ADDRESS_FORMAT: 'Contains invalid characters',
          ADDRESS_BLANK: 'Cannot contain only spaces',
          ADDRESS_SPACES: 'Must not start or end with spaces',
          CURP_SIZE_MAX: 'Invalid SSN format (9 digits)',
          RFC_SIZE_MAX: 'Invalid Tax ID format (varies)',
          RFC_CURP_SIZE_MAX: 'Must have valid ID format',
          ENTITY: 'State is required',
          INSTITUTION: 'Institution is required',
          DESIGN_NAME_REQUIRED: 'Design denomination is required',
          DESIGN_TYPE_REQUIRED: 'Design type is required',
          PRODUCT_CLASS_REQUIRED: 'Product class is required',
          NEW_ELEMENTS_REQUIRED: 'New or original elements are required',
          VISUAL_CHARACTERISTICS_REQUIRED: 'Distinctive visual characteristics are required',
          GENERAL_DESCRIPTION_REQUIRED: 'General description is required',
          SUMMARY_REQUIRED: 'Summary is required',
          SUMMARY_SIZE_MIN: 'Must have at least 150 characters',
          SUMMARY_SIZE_MIN_WORDS: 'Must have at least 25 words',
          SUMMARY_SIZE_MAX: 'Cannot exceed 250 characters',
          SUMMARY_SIZE_MAX_WORDS: 'Cannot exceed 50 words',
          DECLARATION_ORIGINALITY: 'Must accept the originality declaration',
          DECLARATION_VERACITY: 'Must accept the veracity declaration',
          ENTITY_INSTITUTION: 'Must select a state and institution',
          FILE_MAX_SIZE_PART_1: 'The file ',
          FILE_MAX_SIZE_PART_2: ' exceeds the maximum allowed size of 10MB.',
          FILE_FORMAT_PART_2: ' does not have a valid format for ',
          REQUIRED: ' is required',
          SIZE_MIN: 'Must have at least ',
          SIZE_MAX: 'Cannot exceed ',
          CHAR: ' characters',
          SPACES: 'Must not start or end with spaces',
          BLANK: 'Cannot contain only spaces',
          LETTERS: 'Must contain at least some letters',
          DESIGN_NAME: 'The design denomination',
          PRODUCT_CLASS: 'The product class',
          NEW_ELEMENTS: 'The new or original elements',
          VISUAL_CHARACTERISTICS: 'The distinctive visual characteristics',
          GENERAL_DESCRIPTION: 'The general description',
          SUBMIT: 'An error occurred processing the request. Please try again',
          DOCUMENT_TITLE: 'Missing Documents!',
          IMPI: 'Must attach the official USPTO form',
          PAYMENT: 'Must attach the fee payment receipt',
          TECHNICAL_DRAWINGS: 'Must attach the technical drawings and views of the industrial design',
        },
        INFO: {
          SUCCESS: 'Industrial design application successfully submitted to USPTO',
          CONFIRM: 'OK, understood!',
        }
      },
      COPYRIGHT: {
        TITLE: 'Copyright Registration Application - Copyright Office',
        INFO_1: 'Complete all required information for copyright registration with the Copyright Office.',
        INFO_2: 'All fields marked with (*) are mandatory.',
        GENERAL_SECTION: {
          TITLE: 'General Applicant Information',
          APPLICATION_DATE: 'Application date',
          APPLICATION_MODE: {
            LABEL: 'Application mode',
            SELECT_MODE: 'Select mode',
            ONLINE: 'Online (eCO)',
            IN_PERSON: 'In-person (Offices)',
          },
          WORK_TITLE: {
            LABEL: 'Title of work to register',
            PLACEHOLDER: 'Enter the complete title of the work',
          },
          NAME_COMPANY: {
            LABEL: 'Full name / Business name',
            PLACEHOLDER: 'Full name of applicant or business name',
          },
          NATIONALITY: {
            LABEL: 'Nationality',
            PLACEHOLDER: 'Applicant nationality',
          },
          EMAIL: {
            LABEL: 'Email',
            PLACEHOLDER: 'example@domain.com',
          },
          PHONE: 'Cell phone number',
          ADDRESS: {
            LABEL: 'Address for notifications',
            PLACEHOLDER: 'Street, number, neighborhood, city, state, zip code',
          },
          CURP_RFC: {
            PLACEHOLDER: 'SSN (9 digits) or Tax ID (varies)',
          },
          AUTHOR_NAME: {
            LABEL: 'Author name (if different)',
            PLACEHOLDER: 'Leave blank if author is the same applicant',
          },
          ENTITY: {
            LABEL: 'State',
            SELECT_ENTITY: 'Select a state',
          },
          INSTITUTION: {
            LABEL: 'Institution',
            SELECT_INSTITUTION: 'Select an institution',
          }
        },
        WORK_SECTION: {
          TITLE: 'Work Information',
          BRANCH: {
            LABEL: 'Work category',
            SELECT_BRANCH: 'Select the work category',
            OPTIONS: {
              LITERARY: 'Literary',
              MUSICAL_WITH_LYRICS: 'Musical with lyrics',
              MUSICAL_WITHOUT_LYRICS: 'Musical without lyrics',
              DRAMATIC: 'Dramatic',
              DANCE: 'Dance',
              PICTORIAL: 'Pictorial',
              DRAWING: 'Drawing',
              SCULPTURAL: 'Sculptural',
              PLASTIC_CHARACTER: 'Plastic character',
              CARICATURE: 'Caricature',
              COMIC: 'Comic',
              ARCHITECTURAL: 'Architectural',
              CINEMATOGRAPHIC: 'Cinematographic',
              AUDIOVISUAL: 'Audiovisual',
              RADIO_PROGRAM: 'Radio program',
              TV_PROGRAM: 'TV program',
              COMPUTER_PROGRAM: 'Computer program',
              PHOTOGRAPHIC: 'Photographic',
              APPLIED_ART: 'Applied art',
              DATABASE: 'Database',
            }
          },
          IS_DERIVED: {
            LABEL: 'Is the work derived?',
            NO: 'No',
            YES: 'Yes',
          },
          DERIVED_TYPE: {
            LABEL: 'Type of derived work',
            SELECT_TYPE: 'Select the type of derived work',
            OPTIONS: {
              AMPLIFICATION: 'Amplification',
              TRANSLATION: 'Translation',
              ARRANGEMENT: 'Arrangement',
              COMPENDIUM: 'Compendium',
              ADAPTATION: 'Adaptation',
              PARAPHRASE: 'Paraphrase',
              COMPILATION: 'Compilation',
              TRANSFORMATION: 'Transformation',
              COLLECTION: 'Collection',
            }
          },
          ORIGINAL_WORK_DATA: {
            LABEL: 'Original work data',
            PLACEHOLDER: 'Provide the data of the original work from which this work derives',
          },
          DESCRIPTION: {
            LABEL: 'Work description',
            PLACEHOLDER: 'Detailed description of the work, its purpose, main characteristics and content',
          }
        },
        EXEMPLAR_SECTION: {
          TITLE: 'Work Copy',
          TYPE_LABEL: 'Copy type',
          SOURCE_CODE: 'Source code (first and last 10 pages)',
          URL_WORK: 'Complete work URL of the repository/database/computer program',
          SYNTHESIS: 'Work synthesis',
          URL_FIELD: {
            LABEL: 'Work URL',
            PLACEHOLDER: 'https://example.com/my-work',
          },
          SYNTHESIS_FIELD: {
            LABEL: 'Work synthesis',
            PLACEHOLDER: 'Provide a brief synthesis of the work',
          }
        },
        DOCUMENTATION_SECTION: {
          TITLE: 'Documentation',
          INDAUTOR_FORMAT: {
            LABEL: 'Official Copyright Office form',
            SUB_TEXT: 'Attach form TX, VA, PA, SR, etc. as appropriate',
          },
          OFFICIAL_ID: {
            LABEL: 'Official identification',
            SUB_TEXT: 'Driver\'s license, passport, professional license or other official identification',
          },
          OWNERSHIP_DOCUMENT: {
            LABEL: 'Ownership document',
            SUB_TEXT: 'Contract, assignment of rights, articles of incorporation (if applicable)',
          },
          PAYMENT_RECEIPT: {
            LABEL: 'Payment receipt',
            SUB_TEXT: 'Receipt of payment of registration fees to the Copyright Office',
          },
          WORK_EXEMPLAR: {
            LABEL: 'Work copy',
            SUB_TEXT: 'Digital file of the work (source code, document, etc.)',
          },
          ADDITIONAL_DOCUMENTS: {
            LABEL: 'Additional documents',
            SUB_TEXT: 'Translations, powers of attorney, other documents (if applicable)',
          },
          SELECTED_FILES: 'Selected Files',
        },
        STATEMENTS_SECTION: {
          TITLE: 'Declarations',
          STATEMENT_1: 'I declare that the work is the result of my own original work and does not infringe third party rights',
          STATEMENT_2: 'I declare under oath that the information provided is correct and complete',
          STATEMENT_3: 'I declare that I am the copyright owner of the work or have the corresponding authorization',
        },
        ERRORS: {
          APPLICATION_MODE: 'Application mode is required',
          WORK_TITLE_REQUIRED: 'Work title is required',
          WORK_TITLE_MIN_LENGTH: 'Title must have at least 5 characters',
          WORK_TITLE_MAX_LENGTH: 'Title cannot exceed 500 characters',
          WORK_TITLE_SPACES: 'Must not start or end with spaces',
          WORK_TITLE_BLANK: 'Cannot contain only spaces',
          NAME_REQUIRED: 'Full name / business name is required',
          NAME_SIZE_MIN: 'Must have at least 3 characters',
          NAME_SIZE_MAX: 'Cannot exceed 200 characters',
          NAME_FORMAT: 'Only letters, numbers, spaces and basic special characters are allowed',
          NAME_SPACES: 'Must not start or end with spaces',
          NAME_MULTIPLE_SPACES: 'Must not contain multiple consecutive spaces',
          NATIONALITY_REQUIRED: 'Nationality is required',
          NATIONALITY_SIZE_MIN: 'Must have at least 4 characters',
          NATIONALITY_SIZE_MAX: 'Cannot exceed 50 characters',
          NATIONALITY_FORMAT: 'Only letters are allowed',
          EMAIL_REQUIRED: 'Email is required',
          EMAIL_SIZE_MAX: 'Cannot exceed 100 characters',
          EMAIL_INVALID: 'Must enter a valid email',
          EMAIL_FORMAT: 'Cannot contain consecutive dots',
          EMAIL_BLANK: 'Cannot contain spaces',
          PHONE_REQUIRED: 'Cell phone number is required',
          PHONE_FORMAT: 'Must contain exactly 10 digits',
          PHONE_FORMAT_NUMBERS: 'Only numbers are allowed',
          PHONE_FORMAT_DIGIT: 'Cannot contain the same repeated digit',
          PHONE_FORMAT_DIGIT_VALID: 'Must start with a valid digit (2-9)',
          ADDRESS_REQUIRED: 'Address is required',
          ADDRESS_SIZE_MIN: 'Must have at least 10 characters',
          ADDRESS_SIZE_MAX: 'Cannot exceed 300 characters',
          ADDRESS_FORMAT: 'Contains invalid characters',
          ADDRESS_BLANK: 'Cannot contain only spaces',
          ADDRESS_SPACES: 'Must not start or end with spaces',
          CURP_SIZE_MAX: 'Invalid SSN format (9 digits)',
          RFC_SIZE_MAX: 'Invalid Tax ID format (varies)',
          RFC_CURP_SIZE_MAX: 'Must have valid ID format',
          ENTITY: 'State is required',
          INSTITUTION: 'Institution is required',
          BRANCH_REQUIRED: 'Work category is required',
          DERIVED_TYPE_REQUIRED: 'Derived work type is required',
          DESCRIPTION_REQUIRED: 'Description is required',
          DESCRIPTION_SIZE_MIN: 'Must have at least 20 characters',
          DESCRIPTION_SIZE_MAX: 'Cannot exceed 2000 characters',
          DESCRIPTION_SPACES: 'Must not start or end with spaces',
          DESCRIPTION_BLANK: 'Cannot contain only spaces',
          DECLARATION_ORIGINALITY: 'Must accept the originality declaration',
          DECLARATION_VERACITY: 'Must accept the veracity declaration',
          DECLARATION_OWNERSHIP: 'Must accept the ownership declaration',
          ENTITY_INSTITUTION: 'Must select a state and institution',
          FILE_MAX_SIZE_PART_1: 'The file ',
          FILE_MAX_SIZE_PART_2: ' exceeds the maximum allowed size of 10MB.',
          FILE_FORMAT_PART_2: ' does not have a valid format for ',
          DOCUMENT_TITLE: 'Missing Documents!',
          INDAUTOR_FORMAT: 'Must attach the official Copyright Office form (TX, VA, PA, SR, etc.)',
          SUBMIT: 'An error occurred processing the request. Please try again',
        },
        INFO: {
          SUCCESS: 'Copyright application successfully submitted to Copyright Office',
          CONFIRM: 'OK, understood!',
        }
      },
    },
    ALERT: {
      DELETE: {
        TITLE: "Are you sure you want to delete this record?",
        BODY: "This action cannot be undone",
        SUCCESS: "Record deleted"
      },
      LOGOUT: {
        TITLE: "Are you sure you want to sign out?",
        SUCCESS: "Successfully signed out"
      }
    },
    GRAPHICS: {
      TITLES: {
        REQUEST_TYPES: "Request types",
        REQUEST: "Requests",
        DEPARTMENTS: "Departments",
        EDUCATIONAL_PROGRAM: "Educational program",
        RESEARCHERS: "Researchers",
        RESEARCHER: "Researcher",
        DEPARTMENT: "Department",
        FEDERAL_INSTITUTIONS: "Federal Institutions",
        CENTRALIZED_INSTITUTIONS: "Decentralized Institutions",
        APPLICATION_TYPE: "Application type",
        FEDERAL_ENTITIES: "Federal Entities",
      },
      SUBTITLES: {
        REGISTER: "Records",
        MONTHS: "Months (2025)",
        YEARS: "Years (2019-2024)",
        TOP_3: "Top 3",
        TOP_5: "Top 5",
      },
      LEGENDS: {
        NO_FEDERAL_ENTITIES: "No federal entities with records.",
        NO_FEDERAL_INSTITUTIONS: "No federal institutions with records.",
        NO_CENTRALIZED_INSTITUTIONS: "No decentralized institutions with records.",
        TOTAL_APPLICATIONS: 'Total applications',
        HOVER_APPLICATIONS: 'applications',
        ACRONYM: {
          MONTHS: {
            APRIL: 'Apr'
          }
        }
      },
      OPTIONS_FILTER: {
        TITLE: 'Filter options',
        LABEL: 'Time:',
        OPTIONS: {
          MONTHS: 'Months',
          YEARS: 'Years',
        }
      },
    },
    DEPARTMENTS: {
      IT: "Computer systems",
      MECHANIC: "Mechanical-metalworking",
      CHEMISTRY: "Chemistry",
    },
    ACRONYM: {
      PATENTS: "PT",
      TRADEMARKS: "TM",
      UTILITY_MODELS: 'UM',
      COPYRIGHTS: 'CR',
      INDUSTRIAL_DESIGNS: 'ID',
      VEGETAL_VARIETIES: 'PV',
      INDUSTRIAL_SECRETS: 'TS'
    },
    ACADEMIC_LEVEL: {
      DOCTOR_CS: "Doctor in Computer Science",
      MASTER_CS: "Master in Computer Systems",
      MASTER_CSIENCE: "Master in Computer Science"
    },
    EDUCATIONAL_PROGRAM: {
      SYSTEMS: "Computer systems",
      INFORMATICS: "Informatics",
      DATA_SCIENCE: "Data science"
    },
    TRANSLATOR: {
      SELECT: 'Select your language',
      LANGUAGES: {
        ENGLISH: 'English',
        MANDARIN: 'Mandarin',
        SPANISH: 'Spanish',
        JAPANESE: 'Japanese',
        GERMAN: 'German',
        FRENCH: 'French'
      }
    },
    MENU: {
      NEW: 'New',
      ACTIONS: 'Actions',
      CREATE_POST: 'Create New Post',
      PAGES: 'Pages',
      FEATURES: 'Features',
      APPS: 'Apps',
      DASHBOARD: 'Dashboard',
      REGISTERS: 'Records',
      USERS: 'Users',
      INTELECTUAL_PROPERTIES: 'Intellectual Properties',
      REPORTS: 'Reports',
      HELP: 'Help',
      ADMIN: {
        MANAGEMENT: 'Management',
        COORDINATORS: 'Coordinators',
        APPLICANTS: 'Applicants',
        INTELECTUAL_PROPERTY: 'Intellectual Property',
        PATENTS: 'Patents',
        TRADEMARKS: 'Trademarks',
        UTILITY_MODELS: 'Utility Models',
        COPYRIGHTS: 'Copyrights',
        INDUSTRIAL_DESIGNS: 'Industrial Designs',
        VEGETAL_VARIETIES: 'Plant Varieties',
        INDUSTRIAL_SECRETS: 'Trade Secrets',
        HELP: 'Help Center'
      },
      COORD: {
        APPLICANTS: 'Applicants',
        COPYRIGHTS: 'Copyrights',
        INDUSTRIAL_DESIGNS: 'Industrial Designs',
        INTELECTUAL_PROPERTY: 'Intellectual Property',
        MANAGEMENT: 'Management',
        PATENTS: 'Patents',
        TRADEMARKS: 'Trademarks',
        UTILITY_MODELS: 'Utility Models',
        VEGETAL_VARIETIES: 'Plant Varieties',
        INDUSTRIAL_SECRETS: 'Trade Secrets',
        HELP: 'Help Center'
      },
      INDAUTOR_CATEGORIES: {
        COMPUTER_PROGRAM: 'Computer Program',
        LITERARY: 'Literary',
        RIGHTS_RESERVE: 'Rights Reserved',
        ARTISTIC: 'Artistic',
        DATABASE_COMPILATION: 'Database Compilation',
      },
      APPLICANT: {
        MYREQUESTS: 'My Requests',
        REQUESTS: 'Requests',
        REPORTS: 'Reports',
        REGISTER: "Register",
        HELP: 'Help Center'
      },
    },
    AUTH: {
      GENERAL: {
        OR: 'Or',
        SUBMIT_BUTTON: 'Submit',
        NO_ACCOUNT: 'Don\'t have an account?',
        SIGNUP_BUTTON: 'Sign Up',
        FORGOT_BUTTON: 'Forgot Password',
        BACK_BUTTON: 'Back',
        CANCEL_BUTTON: 'Cancel',
        PRIVACY: 'Privacy',
        LEGAL: 'Legal',
        TERMS: 'Terms',
        CONTACT: 'Contact Us',
        PLANS: 'Plans',
        ACCEPT_PRIVACY: 'By entering you accept the {{value}}',
      },
      LOGIN: {
        TITLE: 'Sign In',
        CEPPI: 'Intellectual Property Patent Center',
        BUTTON: 'Sign In',
        ERROR: 'Incorrect credentials',
        EPASSWORD: 'Minimum 6 characters',
        ERROR_DETAIL: 'Check your username and password',
        USERNAME: 'Username',
        PASSWORD: 'Password',
        LOADING: 'Please wait',
      },
      FORGOT: {
        TITLE: 'Forgot Password?',
        DESC: 'Please enter your email to reset your password',
        SUCCESS: 'Password reset has been sent',
        ERROR: 'Sorry, please try again',
        SENDING: 'Sending',
        EMAIL: {
          LABEL: 'Email',
          PLACEHOLDER: 'example@domain.com',
          REQUIRED: 'Required field',
          INVALID: 'Enter a valid email'
        },
      },
      PRIVACY: {
        TITLE: 'Privacy Notice',
        CONTENT: 'Complete privacy notice text',
        ACCEPT: 'Accept'
      },
      REGISTER: {
        TITLE: 'Sign Up',
        DESC: 'Enter your details to create your account',
        SUCCESS: 'Your account has been successfully registered.'
      },
      INPUT: {
        EMAIL: 'Email',
        FULLNAME: 'Full Name',
        PASSWORD: 'Password',
        CONFIRM_PASSWORD: 'Confirm Password',
        USERNAME: 'Username'
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
      TITLE: 'Available reports',
      DESC: 'Generate reports of registered applications',
      BUTTON: 'Generate Report',
      LOADING: 'Generating Report',
      ADMIN: {
        INSTITUTION: {
          TITLE: 'Institutions',
          DESCRIPTION: 'Report of registered institutions.'
        },
        STATE: {
          TITLE: 'Federal Entity',
          DESCRIPTION: 'Report by federal entity.'
        },
        TYPE: {
          TITLE: 'Federal or Decentralized',
          DESCRIPTION: 'Report classified by type of institution.'
        }
      },
      COORDINATOR: {
        DEPARTMENT: {
          TITLE: 'Department',
          DESCRIPTION: 'Report by department.'
        },
        RESEARCHER: {
          TITLE: 'Researchers',
          DESCRIPTION: 'Report of researchers.'
        },
        ACADEMIC: {
          TITLE: 'Academic Body',
          DESCRIPTION: 'Report of academic body.'
        },
        PROGRAM: {
          TITLE: 'Educational Program',
          DESCRIPTION: 'Report of educational program.'
        },
        DATE: {
          TITLE: 'Application Date',
          DESCRIPTION: 'Report by application date.'
        }
      },
      GUEST: {
        DATE: {
          TITLE: 'Application Date',
          DESCRIPTION: 'Report by application date.'
        },
        TYPE: {
          TITLE: 'Application Type',
          DESCRIPTION: 'Report by application type.'
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
      ABOUT: 'About',
      SUPPORT: 'Support',
      THEME: {
        LIGHT: 'Light',
        DARK: 'Dark',
        SYSTEM: 'System'
      },
      MY_PROFILE: 'My Profile',
      LANGUAGE: 'Language',
      SETTINGS: 'Settings',
      SIGN_OUT: 'Sign Out',
      LOADING: 'Loading ...',
    },
    ERROR: {
      NOTAVAILABLE: {
        TITLE: "Functionality not available",
        DESCRIPTION: "Sorry, this functionality is not available at this time. Please try again later or contact technical support if the problem persists.",
        BACK_TO_HOME: "Back to home"
      },
      NOT_FOUND: {
        TITLE: 'Page not found',
        BODY: 'We cannot find that page.',
        BACK_TO_HOME: "Back to home"
      }
    },
    GUEST: {
      REGISTER: {
        COPYRIGHT: {
          TITLE: 'Copyright',
          DESCRIPTION: 'Protection of literary, artistic, musical, audiovisual works and software programs'
        },
        PATENT: {
          TITLE: 'Patent',
          DESCRIPTION: 'Protection of inventions with industrial application'
        },
        UTILITY_MODEL: {
          TITLE: 'Utility Model',
          DESCRIPTION: 'Protection of improved objects, utensils or tools'
        },
        INDUSTRIAL_DESIGN: {
          TITLE: 'Industrial Design',
          DESCRIPTION: 'Protection of the ornamental appearance of industrial products'
        },
        TRADEMARK: {
          TITLE: 'Trademark',
          DESCRIPTION: 'Protection of distinctive commercial signs'
        },
        PLANT_VARIETY: {
          TITLE: 'Plant Variety',
          DESCRIPTION: 'Protection of new plant varieties'
        },
        INDUSTRIAL_SECRET: {
          TITLE: 'Trade Secrets',
          DESCRIPTION: 'Protection of trade secrets and confidential information'
        },
        CIRCUIT_MAPPING: {
          TITLE: 'Integrated Circuit Layout',
          DESCRIPTION: 'Protection of electrical circuit designs'
        }
      }
    },
    USER_REGISTER: {
      TITLE: 'New User Registration',
      DESCRIPTION: 'Register new users in the system. Select the type of user you want to register and complete the required fields.',
      REGISTER: 'Register',
      COORDINATOR: {
        TITLE: 'Coordinator Registration',
        DESCRIPTION: 'Register a new coordinator in the system.',
      },
      GUEST: {
        TITLE: 'Applicant Registration',
        DESCRIPTION: 'Register a new applicant in the system.',
      },
    }
  },
};
