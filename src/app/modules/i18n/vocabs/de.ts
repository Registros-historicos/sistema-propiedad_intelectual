// Germany
export const locale = {
  lang: 'de',
  data: {
    BUTTON: {
      NEW: {
        COORDINATOR: 'Koordinator registrieren',
        APPLICANT: 'Antragsteller registrieren',
        PATENT: 'Patent registrieren',
        TRADEMARK: 'Marke registrieren',
        UTILITY_MODEL: 'Gebrauchsmuster registrieren',
        COPYRIGHT: 'Urheberrecht registrieren',
        INDUSTRIAL_DESIGN: 'Industriedesign registrieren',
        VEGETAL_VARIETY: 'Pflanzensorte registrieren',
        INDUSTRIAL_SECRET: 'Betriebsgeheimnis registrieren',
      },
      CONFIRM: "Bestätigen",
      CANCEL: "Abbrechen",
      RETURN: "Zurück",
      CLOSE: 'Schließen',
      DOWNLOAD: 'Herunterladen',
      SEE: 'Anzeigen',
      PATENT: 'Patentantrag einreichen',
      UTILITY_MODEL: 'Gebrauchsmusterantrag einreichen',
      INDUSTRIAL_DESIGN: 'Industriedesignantrag einreichen',
      COPYRIGHT: 'Urheberrechtsantrag einreichen',
      PROCESSING: 'Verarbeitung...',
      CONFIRM_LOGOUT: 'Abmelden',
    },
    TABLE: {
      ACTIONS: {
        LABEL: 'Aktionen',
        EDIT: 'Bearbeiten',
        DELETE: 'Löschen',
        VIEW: 'Anzeigen'
      },
      APPLICANT_NAME: "Antragsteller",
      WORK_TITLE: "Titel",
      INSTITUTION: "Institution",
      DATE: "Antragsdatum",
      PAG_INFO: "Zeige _START_ bis _END_ von _TOTAL_ Einträgen",
      PAG_INFO_FILTERED: "(gefiltert von _MAX_ Gesamteinträgen)",
      PAG_INFO_EMPTY: "Zeige 0 bis 0 von 0 Einträgen",
      PROCESSING: "Lade Daten",
      EMPTY_TABLE: "Keine Datensätze gefunden",
      PLACEHOLDER_SEARCH: "Suchen...",
      ZERO_RECORDS: 'Keine Übereinstimmungen gefunden',
      TYPE_REQUEST: "Antragstyp",
      STATUS_REQUEST: "Status",
      FULL_NAME: "Vollständiger Name",
      FEDERAL_ENTITY: "Bundesland",
      PHONE: "Telefon",
      REGISTERED_DATE: "Registrierungsdatum",
      TITLE_REQUEST: "Titel",
      DESCRIPTION_REQUEST: "Beschreibung",
      PAGE_LENGTH: {
        LABEL: "Anzeigen:",
        RECORDS: "Einträge"
      },
      MARK: {
        NAME: 'Bezeichnung',
        IMAGE: 'Logo',
        APPLICATION_TYPE: 'Antragstyp',
        APPLICANT: 'Inhaber',
        DATE: 'Anmeldedatum'
      }
    },
    MODAL: {
      TITLE: 'Details',
      INFO: {
        TITLE: 'Nur-Lese-Information',
        BODY: 'Details werden nur zur Referenz angezeigt.'
      },
      FORM: {
        PATENT: {
          NAME: 'Patentname'
        },
        MARK: {
          NAME: 'Bezeichnung',
          RECORD: 'Akte',
          IMAGE: 'Logo',
          APPLICATION_TYPE: 'Antragstyp',
          APPLICANT: 'Inhaber',
          DATE: 'Anmeldedatum',
          DATE_GRANT: 'Erteilungsdatum',
          DATE_COMPLETION: 'Abschlussdatum',
          DATE_START: 'Nutzungsbeginn',
          IMAGE_INFO: 'Markenbild',
          FORMALITIES: {
            LABEL: 'Verfahren',
            ENTRY_FOLIO: 'Eingangsnummer:',
            YEAR_RECEPTION: 'Eingangsjahr:',
            START_DATE: 'Startdatum:',
            COMPLETION_DATE: 'Abschlussdatum:'
          },
          FORMALITIES_EMPTY: 'Keine Verfahren registriert'
        },
        COPYRIGHT: {
          NAME: 'Werkname',
        },
        APPLICANT: 'Antragsteller',
        EMAIL: 'E-Mail',
        DATE: 'Antragsdatum',
        STATUS: 'Status',
        FEDERAL_ENTITY: {
          LABEL: 'Bundesland',
          OPTIONS_LABEL: 'Bundesland auswählen'
        },
        INSTITUTION: {
          LABEL: 'Institution',
          OPTIONS_LABEL: 'Institution auswählen',
        },
        DESCRIPTION: 'Beschreibung',
        DOCUMENTATION: 'Dokumentation',
        DOCUMENTATION_EMPTY: 'Keine angehängten Dokumente'
      },
      FOLLOW_UP: {
        TITLE: 'Nachverfolgung',
        APPLICATION_ID: 'Antrags-ID',
        APPLICANT: 'Antragsteller',
        PROGRESS: 'Fortschritt',
        HISTORY_TITLE: 'Verfahrensverlauf',
        STATUS: {
          REGISTERED: 'Registriert',
          IN_PROCESS: 'In Bearbeitung',
          WITH_OBSERVATIONS: 'Verfahren mit Beanstandungen',
          APPROVED: 'Genehmigt',
          COMPLETED: 'Abgeschlossen'
        },
        STATUS_LABELS: {
          CURRENT: 'Aktuell',
          COMPLETED: 'Abgeschlossen',
          REQUIRES_ATTENTION: 'Benötigt Aufmerksamkeit',
          FINISHED: 'Beendet',
          PENDING: 'Ausstehend'
        },
        DESCRIPTIONS: {
          REGISTERED: 'Der Antrag wurde erfolgreich im System registriert.',
          IN_PROCESS: 'Der Antrag wird geprüft.',
          WITH_OBSERVATIONS: 'Korrekturen oder zusätzliche Informationen sind erforderlich, um fortzufahren.',
          APPROVED: 'Der Antrag wurde genehmigt.',
          COMPLETED: 'Das Verfahren wurde abgeschlossen.'
        },
        DETAILS: {
          REGISTERED: {
            DESCRIPTION: 'Der Antrag wurde erfolgreich im System registriert.',
            DATE_LABEL: 'Datum:'
          },
          IN_PROCESS: {
            DESCRIPTION: 'Der Antrag wird vom spezialisierten Fachteam bewertet.',
            EVALUATOR: 'Bewerter: Koordinator'
          },
          WITH_OBSERVATIONS: {
            DESCRIPTION: 'Es wurden Aspekte gefunden, die Korrekturen oder zusätzliche Informationen erfordern.',
            DEADLINE: 'Antwortfrist: 30 Werktage'
          },
          APPROVED: {
            DESCRIPTION: 'Der Antrag wurde genehmigt und Rechtsschutz wurde gewährt.',
            PROTECTION: 'Schutz für 20 Jahre gewährt'
          },
          COMPLETED: {
            DESCRIPTION: 'Das Verfahren wurde abgeschlossen.',
            TITLE_ISSUED: 'Antragszertifikat ausgestellt'
          }
        },
        BUTTONS: {
          CLOSE: 'Schließen',
          NOTIFICATIONS: 'Benachrichtigungen',
          GENERATE_REPORT: 'Bericht erstellen'
        }
      }
    },
    FORMS: {
      PATENT: {
        TITLE: 'Erfindungspatentantrag - DPMA',
        INFO_1: 'Vervollständigen Sie alle erforderlichen Informationen für die Patentregistrierung beim DPMA.',
        INFO_2: 'Alle mit (*) markierten Felder sind Pflichtfelder.',
        GENERAL_SECTION: {
          TITLE: 'Allgemeine Antragstellerinformationen',
          APPLICATION_DATE: 'Antragsdatum',
          APPLICATION_MODE: {
            LABEL: 'Antragsart',
            SELECT_MODE: 'Art auswählen',
            ONLINE: 'Online (e-DPMA)',
            IN_PERSON: 'Persönlich (Büros)',
          },
          NAME_COMPANY: {
            LABEL: 'Vollständiger Name / Firmenname',
            PLACEHOLDER: 'Vollständiger Name des Antragstellers oder Firmenname',
          },
          NATIONALITY: {
            LABEL: 'Staatsangehörigkeit',
            PLACEHOLDER: 'Staatsangehörigkeit des Antragstellers',
          },
          EMAIL: {
            LABEL: 'E-Mail',
            PLACEHOLDER: 'beispiel@domain.de',
          },
          PHONE: 'Telefonnummer',
          ADDRESS: {
            LABEL: 'Adresse',
            PLACEHOLDER: 'Straße, Hausnummer, Stadtteil, Stadt, Bundesland, Postleitzahl',
          },
          CURP_RFC: {
            PLACEHOLDER: 'Personalausweisnummer oder Steuernummer',
          },
          INVENTOR_APPLICANT: {
            LABEL: 'Sind Erfinder und Antragsteller unterschiedlich?',
            YES: 'Ja, sie sind unterschiedlich',
            NO: 'Nein, sie sind dieselbe Person',
          },
          ENTITY: {
            LABEL: 'Bundesland',
            SELECT_ENTITY: 'Bundesland auswählen',
          },
          INSTITUTION: {
            LABEL: 'Institution',
            SELECT_INSTITUTION: 'Institution auswählen',
          }
        },
        INVENTION_SECTION: {
          TITLE: 'Erfindungsinformationen',
          INVENTION_TITLE: {
            LABEL: 'Erfindungstitel',
            PLACEHOLDER: 'Beschreibender Titel der Erfindung',
          },
          TECHNICAL_FIELD: {
            LABEL: 'Technisches Gebiet',
            PLACEHOLDER: 'Technisches Gebiet, dem die Erfindung angehört',
          },
          STATE_TECHNIQUE: {
            LABEL: 'Stand der Technik (Hintergrund)',
            PLACEHOLDER: 'Bestehende Lösungen, Vorpatente, relevante wissenschaftliche Veröffentlichungen und ihre Grenzen beschreiben',
          },
          TECHNICAL_PROBLEM: {
            LABEL: 'Zu lösendes technisches Problem',
            PLACEHOLDER: 'Das technische Problem beschreiben, das die Erfindung lösen soll',
          },
          INDUSTRIAL_APPLICATION: {
            LABEL: 'Industrielle Anwendung',
            PLACEHOLDER: 'Beschreiben, wie die Erfindung in der Industrie oder im täglichen Leben verwendet werden kann',
          }
        },
        DETAILED_DESCRIPTION_SECTION: {
          TITLE: 'Detaillierte Beschreibung der Erfindung',
          DETAILED_DESCRIPTION: {
            LABEL: 'Detaillierte Beschreibung',
            PLACEHOLDER: 'Vollständige Beschreibung der Erfindung, einschließlich ihrer Funktionsweise, Eigenschaften und Vorteile',
          },
          EXAMPLES_REALIZATION: {
            LABEL: 'Ausführungsbeispiele',
            PLACEHOLDER: 'Praktische Beispiele, wie die Erfindung umgesetzt werden kann',
          },
          CLAIMS: {
            LABEL: 'Patentansprüche',
            PLACEHOLDER: 'Spezifische Ansprüche, die den Umfang des beantragten Schutzes definieren',
          },
          SUMMARY: {
            LABEL: 'Zusammenfassung (150-250 Wörter)',
            PLACEHOLDER: 'Kurze Zusammenfassung der Erfindung und ihrer Hauptmerkmale',
          }
        },
        DOCUMENTATION_SECTION: {
          TITLE: 'Dokumentation',
          IMPI: {
            LABEL: 'Offizielles DPMA-Formular',
            SUB_TEXT: 'Ordnungsgemäß ausgefülltes offizielles DPMA-Formular beifügen'
          },
          TECHNICAL_DRAWINGS: {
            LABEL: 'Technische Zeichnungen oder Abbildungen',
            SUB_TEXT: 'Technische Zeichnungen, die zum Verständnis der Erfindung notwendig sind'
          },
          PAYMENT_FEES: {
            LABEL: 'Gebührenzahlungsbeleg',
            SUB_TEXT: 'Beleg über die Zahlung der Antragsgebühren an das DPMA'
          },
          ADDITIONAL_DOCUMENTS: {
            LABEL: 'Zusätzliche Dokumente',
            SUB_TEXT: 'Vollmacht, Rechtsübertragung, Übersetzungen usw. (falls zutreffend)'
          },
          SELECTED_FILES: 'Ausgewählte Dateien:',
        },
        STATEMENTS_SECTION: {
          TITLE: 'Erklärungen',
          STATEMENT_1: 'Ich erkläre, dass die Erfindung das Ergebnis meiner eigenen Arbeit ist und keine Kopie einer anderen bereits im Handel existierenden Erfindung.',
          STATEMENT_2: 'Ich erkläre unter Eid, dass die bereitgestellten Informationen korrekt und vollständig sind.',
          INVENTION_PREVIOUSLY: {
            LABEL: 'Wurde die Erfindung zuvor offengelegt?',
            YES: 'Ja, sie wurde zuvor offengelegt',
            NO: 'Nein, sie wurde nicht offengelegt',
          },
          DISCLOSURE_DETAILS: {
            LABEL: 'Einzelheiten der vorherigen Offenlegung',
            PLACEHOLDER: 'Beschreiben Sie, wie und wann die Erfindung zuvor offengelegt wurde',
          },
        },
        ERRORS: {
          APPLICATION_MODE: 'Antragsart ist erforderlich',
          EMAIL_REQUIRED: 'E-Mail ist erforderlich',
          EMAIL_INVALID: 'Gültige E-Mail eingeben',
          EMAIL_SIZE_MAX: 'Darf 100 Zeichen nicht überschreiten',
          EMAIL_FORMAT: 'Darf keine aufeinanderfolgenden Punkte enthalten',
          EMAIL_BLANK: 'Darf keine Leerzeichen enthalten',
          EMAIL_DOMAIN_FORMAT: 'Ungültiges Domain-Format',
          PHONE: 'Telefonnummer ist erforderlich',
          PHONE_REQUIRED: 'Handynummer ist erforderlich',
          PHONE_FORMAT: 'Muss genau 10 Ziffern enthalten',
          PHONE_FORMAT_NUMBERS: 'Nur Zahlen sind erlaubt',
          PHONE_FORMAT_DIGIT: 'Darf nicht dieselbe wiederholte Ziffer enthalten',
          PHONE_FORMAT_DIGIT_VALID: 'Muss mit einer gültigen Ziffer (2-9) beginnen',
          ADDRESS_REQUIRED: 'Adresse ist erforderlich',
          ADDRESS_MIN_LENGTH: 'Adresse muss mindestens 10 Zeichen haben',
          ADDRESS_MAX_LENGTH: 'Adresse darf 300 Zeichen nicht überschreiten',
          ADDRESS_SIZE_MIN: 'Muss mindestens 10 Zeichen haben',
          ADDRESS_SIZE_MAX: 'Darf 300 Zeichen nicht überschreiten',
          ADDRESS_FORMAT: 'Enthält ungültige Zeichen',
          ADDRESS_BLANK: 'Darf nicht nur Leerzeichen enthalten',
          ADDRESS_SPACES: 'Darf nicht mit Leerzeichen beginnen oder enden',
          ENTITY: 'Bundesland ist erforderlich',
          ENTITY_INSTITUTION: 'Bundesland und Institution müssen ausgewählt werden',
          INSTITUTION: 'Institution ist erforderlich',
          NAME_REQUIRED: 'Vollständiger Name / Firmenname ist erforderlich',
          NAME_SIZE_MIN: 'Muss mindestens 3 Zeichen haben',
          NAME_SIZE_MAX: 'Darf 200 Zeichen nicht überschreiten',
          NAME_BLANK: 'Darf nicht nur Leerzeichen enthalten',
          NAME_FORMAT: 'Nur Buchstaben, Zahlen, Leerzeichen und grundlegende Sonderzeichen sind erlaubt',
          NAME_SPACES: 'Darf nicht mit Leerzeichen beginnen oder enden',
          NAME_MULTIPLE_SPACES: 'Darf keine mehrfachen aufeinanderfolgenden Leerzeichen enthalten',
          NAME_ONLY_NUMBERS: 'Darf nicht nur Zahlen enthalten',
          NAME_ONLY_SPECIAL: 'Muss mindestens Buchstaben oder Zahlen enthalten',
          NATIONALITY_REQUIRED: 'Staatsangehörigkeit ist erforderlich',
          NATIONALITY_SIZE_MIN: 'Muss mindestens 4 Zeichen haben',
          NATIONALITY_SIZE_MAX: 'Darf 50 Zeichen nicht überschreiten',
          NATIONALITY_FORMAT: 'Nur Buchstaben sind erlaubt',
          NATIONALITY_BLANK: 'Darf nicht nur Leerzeichen enthalten',
          CURP_SIZE_MAX: 'Ungültiges Personalausweis-Format',
          RFC_SIZE_MAX: 'Ungültiges Steuernummer-Format',
          RFC_CURP_SIZE_MAX: 'Muss gültiges Identifikationsformat haben',
          INVENTION_REQUIRED: 'Erfindungstitel ist erforderlich',
          INVENTION_MIN_LENGTH: 'Erfindungstitel muss mindestens 5 Zeichen haben',
          INVENTION_MAX_LENGTH: 'Erfindungstitel darf 500 Zeichen nicht überschreiten',
          INVENTION_TITLE: 'Der Erfindungstitel',
          TECHNICAL_FIELD_REQUIRED: 'Technisches Gebiet ist erforderlich',
          TECHNICAL_FIELD_MIN_LENGTH: 'Technisches Gebiet muss mindestens 20 Zeichen haben',
          TECHNICAL_FIELD_MAX_LENGTH: 'Technisches Gebiet darf 800 Zeichen nicht überschreiten',
          TECHNICAL_FIELD: 'Das technische Gebiet',
          STATE_TECHNIQUE_REQUIRED: 'Stand der Technik ist erforderlich',
          STATE_TECHNIQUE_MIN_LENGTH: 'Stand der Technik muss mindestens 50 Zeichen haben',
          STATE_TECHNIQUE_MAX_LENGTH: 'Stand der Technik darf 1500 Zeichen nicht überschreiten',
          STATE_TECHNIQUE: 'Der Stand der Technik',
          TECHNICAL_PROBLEM_REQUIRED: 'Technisches Problem ist erforderlich',
          TECHNICAL_PROBLEM_MIN_LENGTH: 'Technisches Problem muss mindestens 30 Zeichen haben',
          TECHNICAL_PROBLEM_MAX_LENGTH: 'Technisches Problem darf 1000 Zeichen nicht überschreiten',
          TECHNICAL_PROBLEM: 'Das technische Problem',
          INDUSTRIAL_APPLICATION_REQUIRED: 'Industrielle Anwendung ist erforderlich',
          INDUSTRIAL_APPLICATION_MIN_LENGTH: 'Industrielle Anwendung muss mindestens 20 Zeichen haben',
          INDUSTRIAL_APPLICATION_MAX_LENGTH: 'Industrielle Anwendung darf 800 Zeichen nicht überschreiten',
          INDUSTRIAL_APPLICATION: 'Die industrielle Anwendung',
          DETAILED_DESCRIPTION_REQUIRED: 'Detaillierte Beschreibung ist erforderlich',
          DETAILED_DESCRIPTION_MIN_LENGTH: 'Detaillierte Beschreibung muss mindestens 100 Zeichen haben',
          DETAILED_DESCRIPTION_MAX_LENGTH: 'Detaillierte Beschreibung darf 3000 Zeichen nicht überschreiten',
          DETAILED_DESCRIPTION: 'Die detaillierte Beschreibung',
          EXAMPLES_REALIZATION_REQUIRED: 'Ausführungsbeispiele sind erforderlich',
          EXAMPLES_REALIZATION_MIN_LENGTH: 'Ausführungsbeispiele müssen mindestens 50 Zeichen haben',
          EXAMPLES_REALIZATION_MAX_LENGTH: 'Ausführungsbeispiele dürfen 2000 Zeichen nicht überschreiten',
          EXAMPLES_REALIZATION: 'Die Ausführungsbeispiele',
          CLAIMS_REQUIRED: 'Patentansprüche sind erforderlich',
          CLAIMS_MIN_LENGTH: 'Patentansprüche müssen mindestens 30 Zeichen haben',
          CLAIMS_MAX_LENGTH: 'Patentansprüche dürfen 2000 Zeichen nicht überschreiten',
          CLAIMS: 'Die Patentansprüche',
          SUMMARY_REQUIRED: 'Zusammenfassung ist erforderlich',
          SUMMARY_MIN_LENGTH: 'Zusammenfassung muss mindestens 150 Zeichen haben',
          SUMMARY_MAX_LENGTH: 'Zusammenfassung darf 250 Zeichen nicht überschreiten',
          SUMMARY_SIZE_MIN: 'Muss mindestens 150 Zeichen haben',
          SUMMARY_SIZE_MAX: 'Darf 250 Zeichen nicht überschreiten',
          SUMMARY_SIZE_MIN_WORDS: 'Muss mindestens 25 Wörter haben',
          SUMMARY_SIZE_MAX_WORDS: 'Darf 50 Wörter nicht überschreiten',
          DECLARATION_ORIGINALITY: 'Originalitätserklärung muss akzeptiert werden',
          DECLARATION_VERACITY: 'Wahrheitserklärung muss akzeptiert werden',
          DISCLOSURE_DETAILS: 'Die Offenlegungsdetails',
          FILE_MAX_SIZE_PART_1: 'Die Datei ',
          FILE_MAX_SIZE_PART_2: ' überschreitet die maximal erlaubte Größe von 10MB.',
          FILE_FORMAT_PART_2: ' hat kein gültiges Format für ',
          REQUIRED: ' ist erforderlich',
          SIZE_MIN: 'Muss mindestens ',
          SIZE_MAX: 'Darf nicht überschreiten ',
          CHAR: ' Zeichen',
          SPACES: 'Darf nicht mit Leerzeichen beginnen oder enden',
          BLANK: 'Darf nicht nur Leerzeichen enthalten',
          LETTERS: 'Muss mindestens einige Buchstaben enthalten',
          SUBMIT: 'Bei der Verarbeitung der Anfrage ist ein Fehler aufgetreten. Bitte versuchen Sie es erneut',
          DOCUMENT_TITLE: 'Fehlende Dokumente!',
          IMPI: 'Offizielles DPMA-Formular muss beigefügt werden',
          PAYMENT: 'Gebührenzahlungsbeleg muss beigefügt werden',
        },
        INFO: {
          SUCCESS: 'Patentantrag erfolgreich an das DPMA übermittelt',
          CONFIRM: 'OK, verstanden!',
        }
      },
      UTILITY_MODEL: {
        TITLE: 'Gebrauchsmuster registrieren',
        INFO_1: 'Vervollständigen Sie die erforderlichen Informationen zur Registrierung des Gebrauchsmusters beim DPMA.',
        INFO_2: 'Gebrauchsmuster schützen Verbesserungen oder funktionale Änderungen an bestehenden Werkzeugen, Utensilien oder Geräten.',
        GENERAL_SECTION: {
          TITLE: 'Allgemeine Antragstellerinformationen',
          APPLICATION_DATE: 'Antragsdatum',
          APPLICATION_MODE: {
            LABEL: 'Antragsart',
            SELECT_MODE: 'Art auswählen',
            ONLINE: 'Online (e-DPMA)',
            IN_PERSON: 'Persönlich (Büros)',
          },
          NAME_COMPANY: {
            LABEL: 'Vollständiger Name / Firmenname',
            PLACEHOLDER: 'Vollständigen Namen oder Firmennamen eingeben',
          },
          NATIONALITY: {
            LABEL: 'Staatsangehörigkeit',
            PLACEHOLDER: 'z.B.: Deutsch',
          },
          EMAIL: {
            LABEL: 'E-Mail',
            PLACEHOLDER: 'beispiel@email.de',
          },
          PHONE: 'Handynummer',
          ADDRESS: {
            LABEL: 'Benachrichtigungsadresse',
            PLACEHOLDER: 'Straße, Hausnummer, Stadtteil, Stadt, Bundesland, Postleitzahl',
          },
          CURP_RFC: {
            PLACEHOLDER: 'Für deutsche natürliche oder juristische Personen',
          },
          INVENTOR_APPLICANT: {
            LABEL: 'Sind Erfinder und Antragsteller unterschiedlich?',
            YES: 'Ja, sie sind unterschiedliche Personen',
            NO: 'Nein, sie sind dieselbe Person',
          },
          ENTITY: {
            LABEL: 'Bundesland',
            SELECT_ENTITY: 'Bundesland auswählen',
          },
          INSTITUTION: {
            LABEL: 'Institution',
            SELECT_INSTITUTION: 'Institution auswählen',
          }
        },
        MODEL_SECTION: {
          TITLE: 'Gebrauchsmusterinformationen',
          MODEL_NAME: {
            LABEL: 'Gebrauchsmustername',
            PLACEHOLDER: 'Beschreibender Name des Gebrauchsmusters',
          },
          TECHNICAL_FIELD: {
            LABEL: 'Technisches Gebiet',
            PLACEHOLDER: 'Technisches Gebiet, dem das Gebrauchsmuster angehört',
          },
          STATE_TECHNIQUE: {
            LABEL: 'Stand der Technik (Hintergrund)',
            PLACEHOLDER: 'Beschreibung ähnlicher bestehender Werkzeuge, Utensilien oder Geräte',
          },
          TECHNICAL_PROBLEM: {
            LABEL: 'Zu lösendes technisches Problem',
            PLACEHOLDER: 'Unannehmlichkeiten oder Einschränkungen, die das Gebrauchsmuster löst',
          },
          INDUSTRIAL_APPLICATION: {
            LABEL: 'Industrielle Anwendung',
            PLACEHOLDER: 'Praktische Verwendungen und industrielle Anwendungen des Gebrauchsmusters',
          }
        },
        DETAILED_DESCRIPTION_SECTION: {
          TITLE: 'Detaillierte technische Beschreibung',
          DETAILED_DESCRIPTION: {
            LABEL: 'Detaillierte Beschreibung der Verbesserung',
            PLACEHOLDER: 'Klare und detaillierte Erklärung der funktionalen Änderungen oder Verbesserungen',
          },
          EXAMPLES_REALIZATION: {
            LABEL: 'Ausführungsbeispiele',
            PLACEHOLDER: 'Spezifische Wege zur Umsetzung der funktionalen Verbesserungen',
          },
          CLAIMS: {
            LABEL: 'Schutzansprüche',
            PLACEHOLDER: 'Neue und funktionale Eigenschaften, die geschützt werden sollen',
          },
          SUMMARY: {
            LABEL: 'Zusammenfassung (150-250 Wörter)',
            PLACEHOLDER: 'Kurze Zusammenfassung des Gebrauchsmusters für die Veröffentlichung im DPMA-Blatt',
          }
        },
        DOCUMENTATION_SECTION: {
          TITLE: 'Dokumentation',
          IMPI: {
            LABEL: 'Offizielles DPMA-Formular',
            SUB_TEXT: 'Offizielles Formular für Gebrauchsmusterregistrierungsantrag'
          },
          TECHNICAL_DRAWINGS: {
            LABEL: 'Technische Zeichnungen oder Abbildungen',
            SUB_TEXT: 'Diagramme, Pläne oder Illustrationen, die die funktionalen Verbesserungen zeigen'
          },
          PAYMENT_FEES: {
            LABEL: 'Gebührenzahlungsbeleg',
            SUB_TEXT: 'Beleg über die Zahlung der Gebühren für die Antragseinreichung'
          },
          ADDITIONAL_DOCUMENTS: {
            LABEL: 'Zusätzliche Dokumente',
            SUB_TEXT: 'Vollmacht, Rechtsübertragung, ausländische Priorität (falls zutreffend)'
          },
          SELECTED_FILES: 'Ausgewählte Dateien',
        },
        STATEMENTS_SECTION: {
          TITLE: 'Erklärungen',
          STATEMENT_1: 'Ich erkläre, dass das Gebrauchsmuster das Ergebnis meiner eigenen Arbeit ist und keine Kopie eines anderen bereits im Handel existierenden',
          STATEMENT_2: 'Ich erkläre unter Eid, dass die bereitgestellten Informationen wahr und vollständig sind',
          INVENTION_PREVIOUSLY: {
            LABEL: 'Wurde die Erfindung zuvor offengelegt?',
            YES: 'Ja, sie wurde zuvor offengelegt',
            NO: 'Nein, sie wurde nicht zuvor offengelegt',
          },
          DISCLOSURE_DETAILS: {
            LABEL: 'Einzelheiten der vorherigen Offenlegung',
            PLACEHOLDER: 'Angeben, wo, wann und wie sie zuvor offengelegt wurde',
          },
        },
        ERRORS: {
          APPLICATION_MODE: 'Antragsart ist erforderlich',
          NAME_REQUIRED: 'Vollständiger Name / Firmenname ist erforderlich',
          NAME_SIZE_MIN: 'Muss mindestens 3 Zeichen haben',
          NAME_SIZE_MAX: 'Darf 200 Zeichen nicht überschreiten',
          NAME_FORMAT: 'Nur Buchstaben, Zahlen, Leerzeichen und grundlegende Sonderzeichen sind erlaubt',
          NAME_BLANK: 'Darf nicht mit Leerzeichen beginnen oder enden',
          NAME_MULTIPLE_BLANKS: 'Darf keine mehrfachen aufeinanderfolgenden Leerzeichen enthalten',
          NATIONALITY_REQUIRED: 'Staatsangehörigkeit ist erforderlich',
          NATIONALITY_SIZE_MIN: 'Muss mindestens 4 Zeichen haben',
          NATIONALITY_SIZE_MAX: 'Darf 50 Zeichen nicht überschreiten',
          NATIONALITY_FORMAT: 'Nur Buchstaben sind erlaubt',
          EMAIL_REQUIRED: 'E-Mail ist erforderlich',
          EMAIL_SIZE_MAX: 'Darf 100 Zeichen nicht überschreiten',
          EMAIL_INVALID: 'Gültige E-Mail eingeben',
          EMAIL_FORMAT: 'Darf keine aufeinanderfolgenden Punkte enthalten',
          EMAIL_BLANK: 'Darf keine Leerzeichen enthalten',
          PHONE_REQUIRED: 'Handynummer ist erforderlich',
          PHONE_FORMAT: 'Muss genau 10 Ziffern enthalten',
          PHONE_FORMAT_NUMBERS: 'Nur Zahlen sind erlaubt',
          PHONE_FORMAT_DIGIT: 'Darf nicht dieselbe wiederholte Ziffer enthalten',
          PHONE_FORMAT_DIGIT_VALID: 'Muss mit einer gültigen Ziffer (2-9) beginnen',
          ADDRESS_REQUIRED: 'Adresse ist erforderlich',
          ADDRESS_SIZE_MIN: 'Muss mindestens 10 Zeichen haben',
          ADDRESS_SIZE_MAX: 'Darf 300 Zeichen nicht überschreiten',
          ADDRESS_FORMAT: 'Enthält ungültige Zeichen',
          ADDRESS_BLANK: 'Darf nicht nur Leerzeichen enthalten',
          ADDRESS_MULTIPLE_BLANKS: 'Darf nicht mit Leerzeichen beginnen oder enden',
          CURP_SIZE_MAX: 'Ungültiges Personalausweis-Format',
          RFC_SIZE_MAX: 'Ungültiges Steuernummer-Format',
          RFC_CURP_SIZE_MAX: 'Muss gültiges Identifikationsformat haben',
          ENTITY: 'Bundesland ist erforderlich',
          INSTITUTION: 'Institution ist erforderlich',
          MODEL_NAME_REQUIRED: 'Gebrauchsmustername ist erforderlich',
          TECHNICAL_FIELD_REQUIRED: 'Technisches Gebiet ist erforderlich',
          STATE_TECHNIQUE_REQUIRED: 'Stand der Technik ist erforderlich',
          TECHNICAL_PROBLEM_REQUIRED: 'Technisches Problem ist erforderlich',
          INDUSTRIAL_APPLICATION_REQUIRED: 'Industrielle Anwendung ist erforderlich',
          DETAILED_DESCRIPTION_REQUIRED: 'Detaillierte Beschreibung ist erforderlich',
          EXAMPLES_REALIZATION_REQUIRED: 'Ausführungsbeispiele sind erforderlich',
          CLAIMS_REQUIRED: 'Schutzansprüche sind erforderlich',
          SUMMARY_REQUIRED: 'Zusammenfassung ist erforderlich',
          SUMMARY_SIZE_MIN: 'Muss mindestens 150 Zeichen haben',
          SUMMARY_SIZE_MIN_WORDS: 'Muss mindestens 25 Wörter haben',
          SUMMARY_SIZE_MAX: 'Darf 250 Zeichen nicht überschreiten',
          SUMMARY_SIZE_MAX_WORDS: 'Darf 50 Wörter nicht überschreiten',
          DECLARATION_ORIGINALITY: 'Originalitätserklärung muss akzeptiert werden',
          DECLARATION_VERACITY: 'Wahrheitserklärung muss akzeptiert werden',
          ENTITY_INSTITUTION: 'Bundesland und Institution müssen ausgewählt werden',
          FILE_MAX_SIZE_PART_1: 'Die Datei ',
          FILE_MAX_SIZE_PART_2: ' überschreitet die maximal erlaubte Größe von 10MB.',
          FILE_FORMAT_PART_2: ' hat kein gültiges Format für ',
          REQUIRED: ' ist erforderlich',
          SIZE_MIN: 'Muss mindestens ',
          SIZE_MAX: 'Darf nicht überschreiten ',
          CHAR: ' Zeichen',
          BLANKS: 'Darf nicht mit Leerzeichen beginnen oder enden',
          BLANK: 'Darf nicht nur Leerzeichen enthalten',
          LETTERS: 'Muss mindestens einige Buchstaben enthalten',
          UTILITY_MODEL: 'Der Gebrauchsmustername',
          TECHNICAL_FIELD: 'Das technische Gebiet',
          STATE_TECHNIQUE: 'Der Stand der Technik',
          TECHNICAL_PROBLEM: 'Das technische Problem',
          INDUSTRIAL_APPLICATION: 'Die industrielle Anwendung',
          DETAILED_DESCRIPTION: 'Die detaillierte Beschreibung',
          EXAMPLES_REALIZATION: 'Die Ausführungsbeispiele',
          CLAIMS: 'Die Schutzansprüche',
          SUBMIT: 'Bei der Verarbeitung der Anfrage ist ein Fehler aufgetreten. Bitte versuchen Sie es erneut',
          DOCUMENT_TITLE: 'Fehlende Dokumente!',
          IMPI: 'Offizielles DPMA-Formular muss beigefügt werden',
          PAYMENT: 'Gebührenzahlungsbeleg muss beigefügt werden',
        },
        INFO: {
          SUCCESS: 'Gebrauchsmusterantrag erfolgreich eingereicht',
          CONFIRM: 'Verstanden!',
        }
      },
      INDUSTRIAL_DESIGN: {
        TITLE: 'Industriedesign-Registrierungsantrag - DPMA',
        INFO_1: 'Vervollständigen Sie alle erforderlichen Informationen für die Industriedesign-Registrierung beim DPMA.',
        INFO_2: 'Alle mit (*) markierten Felder sind Pflichtfelder.',
        GENERAL_SECTION: {
          TITLE: 'Allgemeine Antragstellerinformationen',
          APPLICATION_DATE: 'Antragsdatum',
          APPLICATION_MODE: {
            LABEL: 'Antragsart',
            SELECT_MODE: 'Art auswählen',
            ONLINE: 'Online (e-DPMA)',
            IN_PERSON: 'Persönlich (Büros)',
          },
          NAME_COMPANY: {
            LABEL: 'Vollständiger Name / Firmenname',
            PLACEHOLDER: 'Vollständiger Name des Antragstellers oder Firmenname',
          },
          NATIONALITY: {
            LABEL: 'Staatsangehörigkeit',
            PLACEHOLDER: 'Staatsangehörigkeit des Antragstellers',
          },
          EMAIL: {
            LABEL: 'E-Mail',
            PLACEHOLDER: 'beispiel@domain.de',
          },
          PHONE: 'Telefonnummer',
          ADDRESS: {
            LABEL: 'Adresse',
            PLACEHOLDER: 'Straße, Hausnummer, Stadtteil, Stadt, Bundesland, Postleitzahl',
          },
          CURP_RFC: {
            PLACEHOLDER: 'Personalausweisnummer oder Steuernummer',
          },
          DESIGNER_APPLICANT: {
            LABEL: 'Sind Designer und Antragsteller unterschiedlich?',
            YES: 'Ja, sie sind unterschiedlich',
            NO: 'Nein, sie sind dieselbe Person',
          },
          ENTITY: {
            LABEL: 'Bundesland',
            SELECT_ENTITY: 'Bundesland auswählen',
          },
          INSTITUTION: {
            LABEL: 'Institution',
            SELECT_INSTITUTION: 'Institution auswählen',
          }
        },
        DESIGN_SECTION: {
          TITLE: 'Industriedesign-Informationen',
          DESIGN_NAME: {
            LABEL: 'Industriedesign-Bezeichnung',
            PLACEHOLDER: 'Beschreibende Bezeichnung des Industriedesigns',
          },
          DESIGN_TYPE: {
            LABEL: 'Industriedesign-Typ',
            SELECT_TYPE: 'Design-Typ auswählen',
            INDUSTRIAL_MODEL: 'Industriemodell',
            INDUSTRIAL_DRAWING: 'Industriezeichnung',
          },
          PRODUCT_CLASS: {
            LABEL: 'Produktklasse',
            PLACEHOLDER: 'Produktklasse angeben, auf die das Design angewendet wird',
          }
        },
        TECHNICAL_DESCRIPTION_SECTION: {
          TITLE: 'Technische Beschreibung des Designs',
          NEW_ELEMENTS: {
            LABEL: 'Beschreibung neuer oder origineller Elemente',
            PLACEHOLDER: 'Detaillierte Beschreibung der neuen oder originellen Elemente des Designs',
          },
          VISUAL_CHARACTERISTICS: {
            LABEL: 'Charakteristische visuelle Eigenschaften',
            PLACEHOLDER: 'Beschreibung der visuellen Eigenschaften, die das Design charakteristisch machen (Form, Farbe, Textur usw.)',
          },
          GENERAL_DESCRIPTION: {
            LABEL: 'Allgemeine Beschreibung des Designs',
            PLACEHOLDER: 'Vollständige und detaillierte Beschreibung des Industriedesigns bereitstellen',
          },
          SUMMARY: {
            LABEL: 'Zusammenfassung (150-250 Wörter)',
            PLACEHOLDER: 'Kurze Zusammenfassung des Industriedesigns für die Veröffentlichung im DPMA-Blatt',
          }
        },
        DOCUMENTATION_SECTION: {
          TITLE: 'Dokumentation',
          VIEWS_INFO: {
            TITLE: 'Erforderliche Ansichten für Industriedesigns',
            DESCRIPTION: 'Technische Zeichnungen müssen Perspektiv-, Front-, Seiten-, Rück-, Ober- und Unteransichten des Objekts enthalten.',
          },
          IMPI: {
            LABEL: 'Offizielles DPMA-Formular',
            SUB_TEXT: 'Offizielles Formular für Industriedesign-Registrierungsantrag'
          },
          TECHNICAL_DRAWINGS: {
            LABEL: 'Technische Zeichnungen und Design-Ansichten',
            SUB_TEXT: 'Perspektiv-, Front-, Seiten-, Rück-, Ober- und Unteransichten einschließen'
          },
          PAYMENT_FEES: {
            LABEL: 'Gebührenzahlungsbeleg',
            SUB_TEXT: 'Beleg über die Zahlung der Gebühren für die Antragseinreichung'
          },
          ADDITIONAL_DOCUMENTS: {
            LABEL: 'Zusätzliche Dokumente',
            SUB_TEXT: 'Vollmacht, Rechtsübertragung, ausländische Priorität (falls zutreffend)'
          },
          SELECTED_FILES: 'Ausgewählte Dateien',
        },
        STATEMENTS_SECTION: {
          TITLE: 'Erklärungen',
          STATEMENT_1: 'Ich erkläre, dass das Industriedesign das Ergebnis meiner eigenen Arbeit ist und keine Kopie eines anderen bereits im Handel existierenden',
          STATEMENT_2: 'Ich erkläre unter Eid, dass die bereitgestellten Informationen korrekt und vollständig sind',
          DESIGN_PREVIOUSLY: {
            LABEL: 'Wurde das Design zuvor offengelegt?',
            YES: 'Ja, es wurde zuvor offengelegt',
            NO: 'Nein, es wurde nicht offengelegt',
          },
          DISCLOSURE_DETAILS: {
            LABEL: 'Einzelheiten der vorherigen Offenlegung',
            PLACEHOLDER: 'Beschreiben Sie, wie und wann das Design zuvor offengelegt wurde',
          },
        },
        ERRORS: {
          APPLICATION_MODE: 'Antragsart ist erforderlich',
          NAME_REQUIRED: 'Vollständiger Name / Firmenname ist erforderlich',
          NAME_SIZE_MIN: 'Muss mindestens 3 Zeichen haben',
          NAME_SIZE_MAX: 'Darf 200 Zeichen nicht überschreiten',
          NAME_FORMAT: 'Nur Buchstaben, Zahlen, Leerzeichen und grundlegende Sonderzeichen sind erlaubt',
          NAME_SPACES: 'Darf nicht mit Leerzeichen beginnen oder enden',
          NAME_MULTIPLE_SPACES: 'Darf keine mehrfachen aufeinanderfolgenden Leerzeichen enthalten',
          NATIONALITY_REQUIRED: 'Staatsangehörigkeit ist erforderlich',
          NATIONALITY_SIZE_MIN: 'Muss mindestens 4 Zeichen haben',
          NATIONALITY_SIZE_MAX: 'Darf 50 Zeichen nicht überschreiten',
          NATIONALITY_FORMAT: 'Nur Buchstaben sind erlaubt',
          EMAIL_REQUIRED: 'E-Mail ist erforderlich',
          EMAIL_SIZE_MAX: 'Darf 100 Zeichen nicht überschreiten',
          EMAIL_INVALID: 'Gültige E-Mail eingeben',
          EMAIL_FORMAT: 'Darf keine aufeinanderfolgenden Punkte enthalten',
          EMAIL_BLANK: 'Darf keine Leerzeichen enthalten',
          PHONE_REQUIRED: 'Handynummer ist erforderlich',
          PHONE_FORMAT: 'Muss genau 10 Ziffern enthalten',
          PHONE_FORMAT_NUMBERS: 'Nur Zahlen sind erlaubt',
          PHONE_FORMAT_DIGIT: 'Darf nicht dieselbe wiederholte Ziffer enthalten',
          PHONE_FORMAT_DIGIT_VALID: 'Muss mit einer gültigen Ziffer (2-9) beginnen',
          ADDRESS_REQUIRED: 'Adresse ist erforderlich',
          ADDRESS_SIZE_MIN: 'Muss mindestens 10 Zeichen haben',
          ADDRESS_SIZE_MAX: 'Darf 300 Zeichen nicht überschreiten',
          ADDRESS_FORMAT: 'Enthält ungültige Zeichen',
          ADDRESS_BLANK: 'Darf nicht nur Leerzeichen enthalten',
          ADDRESS_SPACES: 'Darf nicht mit Leerzeichen beginnen oder enden',
          CURP_SIZE_MAX: 'Ungültiges Personalausweis-Format',
          RFC_SIZE_MAX: 'Ungültiges Steuernummer-Format',
          RFC_CURP_SIZE_MAX: 'Muss gültiges Identifikationsformat haben',
          ENTITY: 'Bundesland ist erforderlich',
          INSTITUTION: 'Institution ist erforderlich',
          DESIGN_NAME_REQUIRED: 'Design-Bezeichnung ist erforderlich',
          DESIGN_TYPE_REQUIRED: 'Design-Typ ist erforderlich',
          PRODUCT_CLASS_REQUIRED: 'Produktklasse ist erforderlich',
          NEW_ELEMENTS_REQUIRED: 'Neue oder originelle Elemente sind erforderlich',
          VISUAL_CHARACTERISTICS_REQUIRED: 'Charakteristische visuelle Eigenschaften sind erforderlich',
          GENERAL_DESCRIPTION_REQUIRED: 'Allgemeine Beschreibung ist erforderlich',
          SUMMARY_REQUIRED: 'Zusammenfassung ist erforderlich',
          SUMMARY_SIZE_MIN: 'Muss mindestens 150 Zeichen haben',
          SUMMARY_SIZE_MIN_WORDS: 'Muss mindestens 25 Wörter haben',
          SUMMARY_SIZE_MAX: 'Darf 250 Zeichen nicht überschreiten',
          SUMMARY_SIZE_MAX_WORDS: 'Darf 50 Wörter nicht überschreiten',
          DECLARATION_ORIGINALITY: 'Originalitätserklärung muss akzeptiert werden',
          DECLARATION_VERACITY: 'Wahrheitserklärung muss akzeptiert werden',
          ENTITY_INSTITUTION: 'Bundesland und Institution müssen ausgewählt werden',
          FILE_MAX_SIZE_PART_1: 'Die Datei ',
          FILE_MAX_SIZE_PART_2: ' überschreitet die maximal erlaubte Größe von 10MB.',
          FILE_FORMAT_PART_2: ' hat kein gültiges Format für ',
          REQUIRED: ' ist erforderlich',
          SIZE_MIN: 'Muss mindestens ',
          SIZE_MAX: 'Darf nicht überschreiten ',
          CHAR: ' Zeichen',
          SPACES: 'Darf nicht mit Leerzeichen beginnen oder enden',
          BLANK: 'Darf nicht nur Leerzeichen enthalten',
          LETTERS: 'Muss mindestens einige Buchstaben enthalten',
          DESIGN_NAME: 'Die Design-Bezeichnung',
          PRODUCT_CLASS: 'Die Produktklasse',
          NEW_ELEMENTS: 'Die neuen oder originellen Elemente',
          VISUAL_CHARACTERISTICS: 'Die charakteristischen visuellen Eigenschaften',
          GENERAL_DESCRIPTION: 'Die allgemeine Beschreibung',
          SUBMIT: 'Bei der Verarbeitung der Anfrage ist ein Fehler aufgetreten. Bitte versuchen Sie es erneut',
          DOCUMENT_TITLE: 'Fehlende Dokumente!',
          IMPI: 'Offizielles DPMA-Formular muss beigefügt werden',
          PAYMENT: 'Gebührenzahlungsbeleg muss beigefügt werden',
          TECHNICAL_DRAWINGS: 'Technische Zeichnungen und Ansichten des Industriedesigns müssen beigefügt werden',
        },
        INFO: {
          SUCCESS: 'Industriedesign-Antrag erfolgreich an das DPMA übermittelt',
          CONFIRM: 'OK, verstanden!',
        }
      },
      COPYRIGHT: {
        TITLE: 'Urheberrechtsregistrierungsantrag - GEMA',
        INFO_1: 'Vervollständigen Sie alle erforderlichen Informationen für die Urheberrechtsregistrierung bei der GEMA.',
        INFO_2: 'Alle mit (*) markierten Felder sind Pflichtfelder.',
        GENERAL_SECTION: {
          TITLE: 'Allgemeine Antragstellerinformationen',
          APPLICATION_DATE: 'Antragsdatum',
          APPLICATION_MODE: {
            LABEL: 'Antragsart',
            SELECT_MODE: 'Art auswählen',
            ONLINE: 'Online (e-GEMA)',
            IN_PERSON: 'Persönlich (Büros)',
          },
          WORK_TITLE: {
            LABEL: 'Titel des zu registrierenden Werks',
            PLACEHOLDER: 'Vollständigen Titel des Werks eingeben',
          },
          NAME_COMPANY: {
            LABEL: 'Vollständiger Name / Firmenname',
            PLACEHOLDER: 'Vollständiger Name des Antragstellers oder Firmenname',
          },
          NATIONALITY: {
            LABEL: 'Staatsangehörigkeit',
            PLACEHOLDER: 'Staatsangehörigkeit des Antragstellers',
          },
          EMAIL: {
            LABEL: 'E-Mail',
            PLACEHOLDER: 'beispiel@domain.de',
          },
          PHONE: 'Handynummer',
          ADDRESS: {
            LABEL: 'Benachrichtigungsadresse',
            PLACEHOLDER: 'Straße, Hausnummer, Stadtteil, Stadt, Bundesland, Postleitzahl',
          },
          CURP_RFC: {
            PLACEHOLDER: 'Personalausweisnummer oder Steuernummer',
          },
          AUTHOR_NAME: {
            LABEL: 'Autorenname (falls abweichend)',
            PLACEHOLDER: 'Leer lassen, wenn Autor derselbe Antragsteller ist',
          },
          ENTITY: {
            LABEL: 'Bundesland',
            SELECT_ENTITY: 'Bundesland auswählen',
          },
          INSTITUTION: {
            LABEL: 'Institution',
            SELECT_INSTITUTION: 'Institution auswählen',
          }
        },
        WORK_SECTION: {
          TITLE: 'Werkinformationen',
          BRANCH: {
            LABEL: 'Werkzweig',
            SELECT_BRANCH: 'Werkzweig auswählen',
            OPTIONS: {
              LITERARY: 'Literarisch',
              MUSICAL_WITH_LYRICS: 'Musikalisch mit Text',
              MUSICAL_WITHOUT_LYRICS: 'Musikalisch ohne Text',
              DRAMATIC: 'Dramatisch',
              DANCE: 'Tanz',
              PICTORIAL: 'Bildnerisch',
              DRAWING: 'Zeichnung',
              SCULPTURAL: 'Bildhauerisch',
              PLASTIC_CHARACTER: 'Plastischen Charakters',
              CARICATURE: 'Karikatur',
              COMIC: 'Comic',
              ARCHITECTURAL: 'Architektonisch',
              CINEMATOGRAPHIC: 'Kinematographisch',
              AUDIOVISUAL: 'Audiovisuell',
              RADIO_PROGRAM: 'Radioprogramm',
              TV_PROGRAM: 'Fernsehprogramm',
              COMPUTER_PROGRAM: 'Computerprogramm',
              PHOTOGRAPHIC: 'Photographisch',
              APPLIED_ART: 'Angewandte Kunst',
              DATABASE: 'Datenbank',
            }
          },
          IS_DERIVED: {
            LABEL: 'Ist das Werk abgeleitet?',
            NO: 'Nein',
            YES: 'Ja',
          },
          DERIVED_TYPE: {
            LABEL: 'Typ des abgeleiteten Werks',
            SELECT_TYPE: 'Typ des abgeleiteten Werks auswählen',
            OPTIONS: {
              AMPLIFICATION: 'Vergrößerung',
              TRANSLATION: 'Übersetzung',
              ARRANGEMENT: 'Arrangement',
              COMPENDIUM: 'Kompendium',
              ADAPTATION: 'Adaptation',
              PARAPHRASE: 'Paraphrase',
              COMPILATION: 'Zusammenstellung',
              TRANSFORMATION: 'Transformation',
              COLLECTION: 'Sammlung',
            }
          },
          ORIGINAL_WORK_DATA: {
            LABEL: 'Daten des ursprünglichen Werks',
            PLACEHOLDER: 'Daten des ursprünglichen Werks angeben, von dem dieses Werk abgeleitet ist',
          },
          DESCRIPTION: {
            LABEL: 'Werkbeschreibung',
            PLACEHOLDER: 'Detaillierte Beschreibung des Werks, seines Zwecks, Hauptmerkmale und Inhalts',
          }
        },
        EXEMPLAR_SECTION: {
          TITLE: 'Werkexemplar',
          TYPE_LABEL: 'Exemplartyp',
          SOURCE_CODE: 'Quellcode (erste und letzte 10 Seiten)',
          URL_WORK: 'Vollständige Werk-URL des Repositoriums/Datenbank/Computerprogramms',
          SYNTHESIS: 'Werksynthese',
          URL_FIELD: {
            LABEL: 'Werk-URL',
            PLACEHOLDER: 'https://beispiel.de/mein-werk',
          },
          SYNTHESIS_FIELD: {
            LABEL: 'Werksynthese',
            PLACEHOLDER: 'Kurze Synthese des Werks bereitstellen',
          }
        },
        DOCUMENTATION_SECTION: {
          TITLE: 'Dokumentation',
          INDAUTOR_FORMAT: {
            LABEL: 'Offizielles GEMA-Formular',
            SUB_TEXT: 'Entsprechendes Formular je nach Werktyp beifügen',
          },
          OFFICIAL_ID: {
            LABEL: 'Offizielle Identifikation',
            SUB_TEXT: 'Personalausweis, Reisepass, Berufsausweis oder andere offizielle Identifikation',
          },
          OWNERSHIP_DOCUMENT: {
            LABEL: 'Eigentumsdokument',
            SUB_TEXT: 'Vertrag, Rechtsübertragung, Gründungsurkunden (falls zutreffend)',
          },
          PAYMENT_RECEIPT: {
            LABEL: 'Zahlungsbeleg',
            SUB_TEXT: 'Beleg über die Zahlung der Registrierungsgebühren an die GEMA',
          },
          WORK_EXEMPLAR: {
            LABEL: 'Werkexemplar',
            SUB_TEXT: 'Digitale Datei des Werks (Quellcode, Dokument usw.)',
          },
          ADDITIONAL_DOCUMENTS: {
            LABEL: 'Zusätzliche Dokumente',
            SUB_TEXT: 'Übersetzungen, Vollmachten, andere Dokumente (falls zutreffend)',
          },
          SELECTED_FILES: 'Ausgewählte Dateien',
        },
        STATEMENTS_SECTION: {
          TITLE: 'Erklärungen',
          STATEMENT_1: 'Ich erkläre, dass das Werk das Ergebnis meiner eigenen originalen Arbeit ist und keine Rechte Dritter verletzt',
          STATEMENT_2: 'Ich erkläre unter Eid, dass die bereitgestellten Informationen korrekt und vollständig sind',
          STATEMENT_3: 'Ich erkläre, dass ich Inhaber der Urheberrechte des Werks bin oder über die entsprechende Genehmigung verfüge',
        },
        ERRORS: {
          APPLICATION_MODE: 'Antragsart ist erforderlich',
          WORK_TITLE_REQUIRED: 'Werktitel ist erforderlich',
          WORK_TITLE_MIN_LENGTH: 'Titel muss mindestens 5 Zeichen haben',
          WORK_TITLE_MAX_LENGTH: 'Titel darf 500 Zeichen nicht überschreiten',
          WORK_TITLE_SPACES: 'Darf nicht mit Leerzeichen beginnen oder enden',
          WORK_TITLE_BLANK: 'Darf nicht nur Leerzeichen enthalten',
          NAME_REQUIRED: 'Vollständiger Name / Firmenname ist erforderlich',
          NAME_SIZE_MIN: 'Muss mindestens 3 Zeichen haben',
          NAME_SIZE_MAX: 'Darf 200 Zeichen nicht überschreiten',
          NAME_FORMAT: 'Nur Buchstaben, Zahlen, Leerzeichen und grundlegende Sonderzeichen sind erlaubt',
          NAME_SPACES: 'Darf nicht mit Leerzeichen beginnen oder enden',
          NAME_MULTIPLE_SPACES: 'Darf keine mehrfachen aufeinanderfolgenden Leerzeichen enthalten',
          NATIONALITY_REQUIRED: 'Staatsangehörigkeit ist erforderlich',
          NATIONALITY_SIZE_MIN: 'Muss mindestens 4 Zeichen haben',
          NATIONALITY_SIZE_MAX: 'Darf 50 Zeichen nicht überschreiten',
          NATIONALITY_FORMAT: 'Nur Buchstaben sind erlaubt',
          EMAIL_REQUIRED: 'E-Mail ist erforderlich',
          EMAIL_SIZE_MAX: 'Darf 100 Zeichen nicht überschreiten',
          EMAIL_INVALID: 'Gültige E-Mail eingeben',
          EMAIL_FORMAT: 'Darf keine aufeinanderfolgenden Punkte enthalten',
          EMAIL_BLANK: 'Darf keine Leerzeichen enthalten',
          PHONE_REQUIRED: 'Handynummer ist erforderlich',
          PHONE_FORMAT: 'Muss genau 10 Ziffern enthalten',
          PHONE_FORMAT_NUMBERS: 'Nur Zahlen sind erlaubt',
          PHONE_FORMAT_DIGIT: 'Darf nicht dieselbe wiederholte Ziffer enthalten',
          PHONE_FORMAT_DIGIT_VALID: 'Muss mit einer gültigen Ziffer (2-9) beginnen',
          ADDRESS_REQUIRED: 'Adresse ist erforderlich',
          ADDRESS_SIZE_MIN: 'Muss mindestens 10 Zeichen haben',
          ADDRESS_SIZE_MAX: 'Darf 300 Zeichen nicht überschreiten',
          ADDRESS_FORMAT: 'Enthält ungültige Zeichen',
          ADDRESS_BLANK: 'Darf nicht nur Leerzeichen enthalten',
          ADDRESS_SPACES: 'Darf nicht mit Leerzeichen beginnen oder enden',
          CURP_SIZE_MAX: 'Ungültiges Personalausweis-Format',
          RFC_SIZE_MAX: 'Ungültiges Steuernummer-Format',
          RFC_CURP_SIZE_MAX: 'Muss gültiges Identifikationsformat haben',
          ENTITY: 'Bundesland ist erforderlich',
          INSTITUTION: 'Institution ist erforderlich',
          BRANCH_REQUIRED: 'Werkzweig ist erforderlich',
          DERIVED_TYPE_REQUIRED: 'Typ des abgeleiteten Werks ist erforderlich',
          DESCRIPTION_REQUIRED: 'Beschreibung ist erforderlich',
          DESCRIPTION_SIZE_MIN: 'Muss mindestens 20 Zeichen haben',
          DESCRIPTION_SIZE_MAX: 'Darf 2000 Zeichen nicht überschreiten',
          DESCRIPTION_SPACES: 'Darf nicht mit Leerzeichen beginnen oder enden',
          DESCRIPTION_BLANK: 'Darf nicht nur Leerzeichen enthalten',
          DECLARATION_ORIGINALITY: 'Originalitätserklärung muss akzeptiert werden',
          DECLARATION_VERACITY: 'Wahrheitserklärung muss akzeptiert werden',
          DECLARATION_OWNERSHIP: 'Eigentumserklärung muss akzeptiert werden',
          ENTITY_INSTITUTION: 'Bundesland und Institution müssen ausgewählt werden',
          FILE_MAX_SIZE_PART_1: 'Die Datei ',
          FILE_MAX_SIZE_PART_2: ' überschreitet die maximal erlaubte Größe von 10MB.',
          FILE_FORMAT_PART_2: ' hat kein gültiges Format für ',
          DOCUMENT_TITLE: 'Fehlende Dokumente!',
          INDAUTOR_FORMAT: 'Entsprechendes offizielles GEMA-Formular muss beigefügt werden',
          SUBMIT: 'Bei der Verarbeitung der Anfrage ist ein Fehler aufgetreten. Bitte versuchen Sie es erneut',
        },
        INFO: {
          SUCCESS: 'Urheberrechtsantrag erfolgreich an die GEMA übermittelt',
          CONFIRM: 'OK, verstanden!',
        }
      },
    },
    ALERT: {
      DELETE: {
        TITLE: "Sind Sie sicher, dass Sie diesen Datensatz löschen möchten?",
        BODY: "Diese Aktion kann nicht rückgängig gemacht werden",
        SUCCESS: "Datensatz gelöscht"
      },
      LOGOUT: {
        TITLE: "Sind Sie sicher, dass Sie sich abmelden möchten?",
        SUCCESS: "Erfolgreich abgemeldet"
      }
    },
    GRAPHICS: {
      TITLES: {
        REQUEST_TYPES: "Antragstypen",
        REQUEST: "Anträge",
        DEPARTMENTS: "Abteilungen",
        EDUCATIONAL_PROGRAM: "Bildungsprogramm",
        RESEARCHERS: "Forscher",
        RESEARCHER: "Forscher",
        DEPARTMENT: "Abteilung",
        FEDERAL_INSTITUTIONS: "Bundesinstitutionen",
        CENTRALIZED_INSTITUTIONS: "Dezentrale Institutionen",
        APPLICATION_TYPE: "Antragstyp",
        FEDERAL_ENTITIES: "Bundesländer",
      },
      SUBTITLES: {
        REGISTER: "Datensätze",
        MONTHS: "Monate (2025)",
        YEARS: "Jahre (2019-2024)",
        TOP_3: "Top 3",
        TOP_5: "Top 5",
      },
      LEGENDS: {
        NO_FEDERAL_ENTITIES: "Keine Bundesländer mit Datensätzen.",
        NO_FEDERAL_INSTITUTIONS: "Keine Bundesinstitutionen mit Datensätzen.",
        NO_CENTRALIZED_INSTITUTIONS: "Keine dezentralen Institutionen mit Datensätzen.",
        TOTAL_APPLICATIONS: 'Anträge insgesamt',
        HOVER_APPLICATIONS: 'Anträge',
        ACRONYM: {
          MONTHS: {
            APRIL: 'Apr'
          }
        }
      },
      OPTIONS_FILTER: {
        TITLE: 'Filteroptionen',
        LABEL: 'Zeit:',
        OPTIONS: {
          MONTHS: 'Monate',
          YEARS: 'Jahre',
        }
      },
    },
    DEPARTMENTS: {
      IT: "Computersysteme",
      MECHANIC: "Metall-Mechanik",
      CHEMISTRY: "Chemie",
    },
    ACRONYM: {
      PATENTS: "PA",
      TRADEMARKS: "MA",
      UTILITY_MODELS: 'GM',
      COPYRIGHTS: 'UR',
      INDUSTRIAL_DESIGNS: 'GS',
      VEGETAL_VARIETIES: 'PS',
      INDUSTRIAL_SECRETS: 'BG'
    },
    ACADEMIC_LEVEL: {
      DOCTOR_CS: "Doktor der Informatik",
      MASTER_CS: "Master in Computersystemen",
      MASTER_CSIENCE: "Master in Informatik"
    },
    EDUCATIONAL_PROGRAM: {
      SYSTEMS: "Computersysteme",
      INFORMATICS: "Informatik",
      DATA_SCIENCE: "Datenwissenschaft"
    },
    TRANSLATOR: {
      SELECT: 'Wähle deine Sprache',
      LANGUAGES: {
        ENGLISH: 'Englisch',
        MANDARIN: 'Mandarin',
        SPANISH: 'Spanisch',
        JAPANESE: 'Japanisch',
        GERMAN: 'Deutsch',
        FRENCH: 'Französisch'
      }
    },
    MENU: {
      NEW: 'Neu',
      ACTIONS: 'Aktionen',
      CREATE_POST: 'Erstellen Sie einen neuen Beitrag',
      PAGES: 'Pages',
      FEATURES: 'Eigenschaften',
      APPS: 'Apps',
      DASHBOARD: 'Instrumententafel',
      REGISTERS: 'Datensätze',
      USERS: 'Benutzer',
      INTELECTUAL_PROPERTIES: 'Geistiges Eigentum',
      REPORTS: 'Berichte',
      HELP: 'Hilfe',
      ADMIN: {
        MANAGEMENT: 'Verwaltung',
        COORDINATORS: 'Koordinatoren',
        APPLICANTS: 'Antragsteller',
        INTELECTUAL_PROPERTY: 'Geistiges Eigentum',
        PATENTS: 'Patente',
        TRADEMARKS: 'Marken',
        UTILITY_MODELS: 'Gebrauchsmuster',
        COPYRIGHTS: 'Urheberrechte',
        INDUSTRIAL_DESIGNS: 'Industriedesigns',
        VEGETAL_VARIETIES: 'Pflanzensorten',
        INDUSTRIAL_SECRETS: 'Betriebsgeheimnisse',
        HELP: 'Hilfezentrum'
      },
      COORD: {
        APPLICANTS: 'Antragsteller',
        COPYRIGHTS: 'Urheberrechte',
        INDUSTRIAL_DESIGNS: 'Industriedesigns',
        INTELECTUAL_PROPERTY: 'Geistiges Eigentum',
        MANAGEMENT: 'Verwaltung',
        PATENTS: 'Patente',
        TRADEMARKS: 'Marken',
        UTILITY_MODELS: 'Gebrauchsmuster',
        VEGETAL_VARIETIES: 'Pflanzensorten',
        INDUSTRIAL_SECRETS: 'Betriebsgeheimnisse',
        HELP: 'Hilfezentrum'
      },
      APPLICANT: {
        MYREQUESTS: 'Meine Anträge',
        REQUESTS: 'Anträge',
        REPORTS: 'Berichte',
        REGISTER: "Registrieren",
        HELP: 'Hilfezentrum'
      },
    },
    AUTH: {
      GENERAL: {
        OR: 'Oder',
        SUBMIT_BUTTON: 'einreichen',
        NO_ACCOUNT: 'Hast du kein Konto?',
        SIGNUP_BUTTON: 'Anmelden',
        FORGOT_BUTTON: 'Passwort vergessen',
        BACK_BUTTON: 'Zurück',
        CANCEL_BUTTON: 'Abbrechen',
        PRIVACY: 'Privatsphäre',
        LEGAL: 'Legal',
        TERMS: 'Bedingungen',
        CONTACT: 'Kontakt',
        PLANS: 'Pläne',
        ACCEPT_PRIVACY: 'Durch Eingabe akzeptieren Sie die {{value}}',
      },
      LOGIN: {
        TITLE: 'Anmelden',
        CEPPI: 'Zentrum für geistiges Eigentumspatente',
        BUTTON: 'Anmelden',
        ERROR: 'Falsche Anmeldedaten',
        EPASSWORD: 'Mindestens 6 Zeichen',
        ERROR_DETAIL: 'Überprüfen Sie Ihren Benutzernamen und Ihr Passwort',
        USERNAME: 'Nutzername',
        PASSWORD: 'Passwort',
        LOADING: 'Bitte warten',
      },
      FORGOT: {
        TITLE: 'Passwort vergessen?',
        DESC: 'Bitte geben Sie Ihre E-Mail ein, um Ihr Passwort zurückzusetzen',
        SUCCESS: 'Passwort-Reset wurde gesendet',
        ERROR: 'Entschuldigung, bitte versuchen Sie es erneut',
        SENDING: 'Senden',
        EMAIL: {
          LABEL: 'E-Mail',
          PLACEHOLDER: 'beispiel@domain.de',
          REQUIRED: 'Pflichtfeld',
          INVALID: 'Gültige E-Mail eingeben'
        },
      },
      PRIVACY: {
        TITLE: 'Datenschutzhinweis',
        CONTENT: 'Vollständiger Text des Datenschutzhinweises',
        ACCEPT: 'Akzeptieren'
      },
      REGISTER: {
        TITLE: 'Registrieren',
        DESC: 'Geben Sie Ihre Daten ein, um Ihr Konto zu erstellen',
        SUCCESS: 'Ihr Konto wurde erfolgreich registriert.'
      },
      INPUT: {
        EMAIL: 'E-Mail',
        FULLNAME: 'Vollständiger Name',
        PASSWORD: 'Passwort',
        CONFIRM_PASSWORD: 'Passwort bestätigen',
        USERNAME: 'Nutzername'
      },
      VALIDATION: {
        INVALID: '{{name}} ist nicht gültig',
        REQUIRED: '{{name}} ist erforderlich',
        MIN_LENGTH: '{{name}} Mindestlänge ist {{min}}',
        AGREEMENT_REQUIRED: 'Die Annahme der Geschäftsbedingungen ist erforderlich',
        NOT_FOUND: 'Das angeforderte {{name}} wurde nicht gefunden',
        INVALID_LOGIN: 'Die Anmeldedaten sind falsch',
        REQUIRED_FIELD: 'Pflichtfeld',
        MIN_LENGTH_FIELD: 'Mindestfeldlänge:',
        MAX_LENGTH_FIELD: 'Maximale Feldlänge:',
        INVALID_FIELD: 'Feld ist nicht gültig',
      }
    },
    REPORTS: {
      TITLE: 'Verfügbare Berichte',
      DESC: 'Berichte über registrierte Anträge erstellen',
      BUTTON: 'Bericht erstellen',
      LOADING: 'Bericht wird erstellt',
      ADMIN: {
        INSTITUTION: {
          TITLE: 'Institutionen',
          DESCRIPTION: 'Bericht über registrierte Institutionen.'
        },
        STATE: {
          TITLE: 'Bundesland',
          DESCRIPTION: 'Bericht nach Bundesland.'
        },
        TYPE: {
          TITLE: 'Bundes- oder Dezentral',
          DESCRIPTION: 'Bericht nach Institutionstyp klassifiziert.'
        }
      },
      COORDINATOR: {
        DEPARTMENT: {
          TITLE: 'Abteilung',
          DESCRIPTION: 'Bericht nach Abteilung.'
        },
        RESEARCHER: {
          TITLE: 'Forscher',
          DESCRIPTION: 'Bericht über Forscher.'
        },
        ACADEMIC: {
          TITLE: 'Akademisches Gremium',
          DESCRIPTION: 'Bericht über akademisches Gremium.'
        },
        PROGRAM: {
          TITLE: 'Bildungsprogramm',
          DESCRIPTION: 'Bericht über Bildungsprogramm.'
        },
        DATE: {
          TITLE: 'Antragsdatum',
          DESCRIPTION: 'Bericht nach Antragsdatum.'
        }
      },
      GUEST: {
        DATE: {
          TITLE: 'Antragsdatum',
          DESCRIPTION: 'Bericht nach Antragsdatum.'
        },
        TYPE: {
          TITLE: 'Antragstyp',
          DESCRIPTION: 'Bericht nach Antragstyp.'
        },
      },
    },
    ECOMMERCE: {
      COMMON: {
        SELECTED_RECORDS_COUNT: 'Anzahl ausgewählter Datensätze: ',
        ALL: 'Alle',
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
      ABOUT: 'Über',
      SUPPORT: 'Support',
      THEME: {
        LIGHT: 'Hell',
        DARK: 'Dunkel',
        SYSTEM: 'System'
      },
      MY_PROFILE: 'Mein Profil',
      LANGUAGE: 'Sprache',
      SETTINGS: 'Einstellungen',
      SIGN_OUT: 'Abmelden',
      LOADING: 'Laden...',
    },
    ERROR: {
      NOTAVAILABLE: {
        TITLE: "Funktionalität nicht verfügbar",
        DESCRIPTION: "Entschuldigung, diese Funktionalität ist derzeit nicht verfügbar. Bitte versuchen Sie es später erneut oder wenden Sie sich an den technischen Support, wenn das Problem weiterhin besteht.",
        BACK_TO_HOME: "Zurück zur Startseite"
      },
      NOT_FOUND: {
        TITLE: 'Seite nicht gefunden',
        BODY: 'Wir können diese Seite nicht finden.',
        BACK_TO_HOME: "Zurück zur Startseite"
      }
    },
    GUEST: {
      REGISTER: {
        COPYRIGHT: {
          TITLE: 'Urheberrecht',
          DESCRIPTION: 'Schutz von literarischen, künstlerischen, musikalischen, audiovisuellen Werken und Softwareprogrammen'
        },
        PATENT: {
          TITLE: 'Patent',
          DESCRIPTION: 'Schutz von Erfindungen mit industrieller Anwendung'
        },
        UTILITY_MODEL: {
          TITLE: 'Gebrauchsmuster',
          DESCRIPTION: 'Schutz verbesserter Gegenstände, Utensilien oder Werkzeuge'
        },
        INDUSTRIAL_DESIGN: {
          TITLE: 'Industriedesign',
          DESCRIPTION: 'Schutz des dekorativen Erscheinungsbilds von Industrieprodukten'
        },
        TRADEMARK: {
          TITLE: 'Marke',
          DESCRIPTION: 'Schutz charakteristischer kommerzieller Zeichen'
        },
        PLANT_VARIETY: {
          TITLE: 'Pflanzensorte',
          DESCRIPTION: 'Schutz neuer Pflanzensorten'
        },
        INDUSTRIAL_SECRET: {
          TITLE: 'Betriebsgeheimnisse',
          DESCRIPTION: 'Schutz von Geschäftsgeheimnissen und vertraulichen Informationen'
        },
        CIRCUIT_MAPPING: {
          TITLE: 'Integrierte Schaltkreis-Topographie',
          DESCRIPTION: 'Schutz von elektrischen Schaltkreisdesigns'
        }
      }
    },
    USER_REGISTER: {
      TITLE: 'Neue Benutzerregistrierung',
      DESCRIPTION: 'Registrieren Sie neue Benutzer im System. Wählen Sie den Benutzertyp aus, den Sie registrieren möchten, und füllen Sie die erforderlichen Felder aus.',
      REGISTER: 'Registrieren',
      COORDINATOR: {
        TITLE: 'Koordinatorregistrierung',
        DESCRIPTION: 'Einen neuen Koordinator im System registrieren.',
      },
      GUEST: {
        TITLE: 'Antragstellerregistrierung',
        DESCRIPTION: 'Einen neuen Antragsteller im System registrieren.',
      },
    }
  }
};
