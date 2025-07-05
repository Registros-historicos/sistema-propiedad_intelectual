// France
export const locale = {
  lang: 'fr',
  data: {
    BUTTON: {
      NEW: {
        COORDINATOR: 'Inscrire coordinateur',
        APPLICANT: 'Inscrire demandeur',
        PATENT: 'Inscrire brevet',
        TRADEMARK: 'Inscrire marque',
        UTILITY_MODEL: 'Inscrire modèle d\'utilité',
        COPYRIGHT: 'Inscrire droit d\'auteur',
        INDUSTRIAL_DESIGN: 'Inscrire design industriel',
        VEGETAL_VARIETY: 'Inscrire variété végétale',
        INDUSTRIAL_SECRET: 'Inscrire secret industriel',
      },
      CONFIRM: "Confirmer",
      CANCEL: "Annuler",
      RETURN: "Retourner",
      CLOSE: 'Fermer',
      DOWNLOAD: 'Télécharger',
      SEE: 'Voir',
      PATENT: 'Soumettre demande de brevet',
      UTILITY_MODEL: 'Soumettre demande de modèle d\'utilité',
      INDUSTRIAL_DESIGN: 'Soumettre demande de design industriel',
      COPYRIGHT: 'Soumettre demande de droit d\'auteur',
      PROCESSING: 'Traitement en cours...',
      CONFIRM_LOGOUT: 'Se déconnecter',
    },
    TABLE: {
      ACTIONS: {
        LABEL: 'Actions',
        EDIT: 'Modifier',
        DELETE: 'Supprimer',
        VIEW: 'Voir'
      },
      APPLICANT_NAME: "Demandeur",
      WORK_TITLE: "Titre",
      INSTITUTION: "Institution",
      DATE: "Date de demande",
      PAG_INFO: "Affichage de _START_ à _END_ sur _TOTAL_ enregistrements",
      PAG_INFO_FILTERED: "(filtré sur _MAX_ enregistrements au total)",
      PAG_INFO_EMPTY: "Affichage de 0 à 0 sur 0 enregistrements",
      PROCESSING: "Chargement des données",
      EMPTY_TABLE: "Aucun enregistrement trouvé",
      PLACEHOLDER_SEARCH: "Rechercher...",
      ZERO_RECORDS: 'Aucune correspondance trouvée',
      TYPE_REQUEST: "Type de demande",
      STATUS_REQUEST: "Statut",
      FULL_NAME: "Nom complet",
      FEDERAL_ENTITY: "Entité Fédérale",
      PHONE: "Téléphone",
      REGISTERED_DATE: "Date d'inscription",
      TITLE_REQUEST: "Titre",
      DESCRIPTION_REQUEST: "Description",
      PAGE_LENGTH: {
        LABEL: "Afficher:",
        RECORDS: "enregistrements"
      },
      MARK: {
        NAME: 'Dénomination',
        IMAGE: 'Logo',
        APPLICATION_TYPE: 'Type de demande',
        APPLICANT: 'Titulaire',
        DATE: 'Date de dépôt'
      }
    },
    MODAL: {
      TITLE: 'Détails',
      INFO: {
        TITLE: 'Information en Lecture Seule',
        BODY: 'Les détails sont affichés à titre de référence seulement.'
      },
      FORM: {
        PATENT: {
          NAME: 'Nom du brevet'
        },
        MARK: {
          NAME: 'Dénomination',
          RECORD: 'Dossier',
          IMAGE: 'Logo',
          APPLICATION_TYPE: 'Type de demande',
          APPLICANT: 'Titulaire',
          DATE: 'Date de dépôt',
          DATE_GRANT: 'Date d\'octroi',
          DATE_COMPLETION: 'Date d\'achèvement',
          DATE_START: 'Début d\'utilisation',
          IMAGE_INFO: 'Image de la marque',
          FORMALITIES: {
            LABEL: 'Procédures',
            ENTRY_FOLIO: 'Folio d\'entrée:',
            YEAR_RECEPTION: 'Année de réception:',
            START_DATE: 'Date de début:',
            COMPLETION_DATE: 'Date d\'achèvement:'
          },
          FORMALITIES_EMPTY: 'Aucune procédure enregistrée'
        },
        COPYRIGHT: {
          NAME: 'Nom de l\'œuvre',
        },
        APPLICANT: 'Demandeur',
        EMAIL: 'Email',
        DATE: 'Date de demande',
        STATUS: 'Statut',
        FEDERAL_ENTITY: {
          LABEL: 'Entité Fédérale',
          OPTIONS_LABEL: 'Sélectionner une entité fédérale'
        },
        INSTITUTION: {
          LABEL: 'Institution',
          OPTIONS_LABEL: 'Sélectionner une institution',
        },
        DESCRIPTION: 'Description',
        DOCUMENTATION: 'Documentation',
        DOCUMENTATION_EMPTY: 'Aucun document joint'
      },
      FOLLOW_UP: {
        TITLE: 'Suivi',
        APPLICATION_ID: 'ID de Demande',
        APPLICANT: 'Demandeur',
        PROGRESS: 'Progrès',
        HISTORY_TITLE: 'Historique du Processus',
        STATUS: {
          REGISTERED: 'Enregistrée',
          IN_PROCESS: 'En Cours',
          WITH_OBSERVATIONS: 'Processus avec Observations',
          APPROVED: 'Approuvée',
          COMPLETED: 'Terminée'
        },
        STATUS_LABELS: {
          CURRENT: 'Actuel',
          COMPLETED: 'Terminé',
          REQUIRES_ATTENTION: 'Nécessite Attention',
          FINISHED: 'Fini',
          PENDING: 'En Attente'
        },
        DESCRIPTIONS: {
          REGISTERED: 'La demande a été enregistrée avec succès dans le système.',
          IN_PROCESS: 'La demande est en cours d\'examen.',
          WITH_OBSERVATIONS: 'Des corrections ou des informations supplémentaires sont requises pour continuer.',
          APPROVED: 'La demande a été approuvée.',
          COMPLETED: 'Le processus a été terminé.'
        },
        DETAILS: {
          REGISTERED: {
            DESCRIPTION: 'La demande a été enregistrée avec succès dans le système.',
            DATE_LABEL: 'Date:'
          },
          IN_PROCESS: {
            DESCRIPTION: 'La demande est évaluée par l\'équipe technique spécialisée.',
            EVALUATOR: 'Évaluateur: Coordinateur'
          },
          WITH_OBSERVATIONS: {
            DESCRIPTION: 'Des aspects ont été trouvés qui nécessitent correction ou information supplémentaire.',
            DEADLINE: 'Délai de réponse: 30 jours ouvrables'
          },
          APPROVED: {
            DESCRIPTION: 'La demande a été approuvée et la protection légale a été accordée.',
            PROTECTION: 'Protection accordée pour 20 ans'
          },
          COMPLETED: {
            DESCRIPTION: 'Le processus a été terminé.',
            TITLE_ISSUED: 'Titre de demande émis'
          }
        },
        BUTTONS: {
          CLOSE: 'Fermer',
          NOTIFICATIONS: 'Notifications',
          GENERATE_REPORT: 'Générer Rapport'
        }
      }
    },
    FORMS: {
      PATENT: {
        TITLE: 'Demande de Brevet d\'Invention - INPI',
        INFO_1: 'Complétez toutes les informations requises pour l\'enregistrement du brevet auprès de l\'INPI.',
        INFO_2: 'Tous les champs marqués d\'un (*) sont obligatoires.',
        GENERAL_SECTION: {
          TITLE: 'Données Générales du Demandeur',
          APPLICATION_DATE: 'Date de demande',
          APPLICATION_MODE: {
            LABEL: 'Mode de demande',
            SELECT_MODE: 'Sélectionner le mode',
            ONLINE: 'En ligne (e-INPI)',
            IN_PERSON: 'En personne (Bureaux)',
          },
          NAME_COMPANY: {
            LABEL: 'Nom complet / Raison sociale',
            PLACEHOLDER: 'Nom complet du demandeur ou raison sociale',
          },
          NATIONALITY: {
            LABEL: 'Nationalité',
            PLACEHOLDER: 'Nationalité du demandeur',
          },
          EMAIL: {
            LABEL: 'Email',
            PLACEHOLDER: 'exemple@domaine.com',
          },
          PHONE: 'Numéro de téléphone',
          ADDRESS: {
            LABEL: 'Adresse',
            PLACEHOLDER: 'Rue, numéro, quartier, ville, région, code postal',
          },
          CURP_RFC: {
            PLACEHOLDER: 'NIR (13 chiffres) ou SIRET (14 chiffres)',
          },
          INVENTOR_APPLICANT: {
            LABEL: 'L\'inventeur et le demandeur sont-ils différents?',
            YES: 'Oui, ils sont différents',
            NO: 'Non, ils sont la même personne',
          },
          ENTITY: {
            LABEL: 'Région',
            SELECT_ENTITY: 'Sélectionner une région',
          },
          INSTITUTION: {
            LABEL: 'Institution',
            SELECT_INSTITUTION: 'Sélectionner une institution',
          }
        },
        INVENTION_SECTION: {
          TITLE: 'Information sur l\'Invention',
          INVENTION_TITLE: {
            LABEL: 'Titre de l\'invention',
            PLACEHOLDER: 'Titre descriptif de l\'invention',
          },
          TECHNICAL_FIELD: {
            LABEL: 'Domaine technique',
            PLACEHOLDER: 'Domaine technique auquel appartient l\'invention',
          },
          STATE_TECHNIQUE: {
            LABEL: 'État de la technique (Antécédents)',
            PLACEHOLDER: 'Décrire les solutions existantes, brevets antérieurs, publications scientifiques pertinentes et leurs limitations',
          },
          TECHNICAL_PROBLEM: {
            LABEL: 'Problème technique à résoudre',
            PLACEHOLDER: 'Décrire le problème technique que l\'invention cherche à résoudre',
          },
          INDUSTRIAL_APPLICATION: {
            LABEL: 'Application industrielle',
            PLACEHOLDER: 'Décrire comment l\'invention peut être utilisée dans l\'industrie ou la vie quotidienne',
          }
        },
        DETAILED_DESCRIPTION_SECTION: {
          TITLE: 'Description détaillée de l\'invention',
          DETAILED_DESCRIPTION: {
            LABEL: 'Description détaillée',
            PLACEHOLDER: 'Description complète de l\'invention, incluant son fonctionnement, caractéristiques et avantages',
          },
          EXAMPLES_REALIZATION: {
            LABEL: 'Exemples de réalisation',
            PLACEHOLDER: 'Exemples pratiques de comment l\'invention peut être mise en œuvre',
          },
          CLAIMS: {
            LABEL: 'Revendications',
            PLACEHOLDER: 'Revendications spécifiques qui définissent la portée de protection demandée',
          },
          SUMMARY: {
            LABEL: 'Résumé (150-250 mots)',
            PLACEHOLDER: 'Résumé bref de l\'invention et de ses principales caractéristiques',
          }
        },
        DOCUMENTATION_SECTION: {
          TITLE: 'Documentation',
          IMPI: {
            LABEL: 'Formulaire officiel INPI',
            SUB_TEXT: 'Joindre le formulaire officiel INPI dûment rempli'
          },
          TECHNICAL_DRAWINGS: {
            LABEL: 'Dessins techniques ou figures',
            SUB_TEXT: 'Dessins techniques nécessaires à la compréhension de l\'invention'
          },
          PAYMENT_FEES: {
            LABEL: 'Justificatif de paiement des droits',
            SUB_TEXT: 'Justificatif de paiement des droits de demande auprès de l\'INPI'
          },
          ADDITIONAL_DOCUMENTS: {
            LABEL: 'Documents additionnels',
            SUB_TEXT: 'Procuration, cession de droits, traductions, etc. (si applicable)'
          },
          SELECTED_FILES: 'Fichiers sélectionnés:',
        },
        STATEMENTS_SECTION: {
          TITLE: 'Déclarations',
          STATEMENT_1: 'Je déclare que l\'invention est le résultat de mon propre travail et n\'est pas une copie d\'une autre déjà existante dans le commerce.',
          STATEMENT_2: 'Je déclare sous serment que les informations fournies sont correctes et complètes.',
          INVENTION_PREVIOUSLY: {
            LABEL: 'L\'invention a-t-elle été divulguée auparavant?',
            YES: 'Oui, elle a été divulguée auparavant',
            NO: 'Non, elle n\'a pas été divulguée',
          },
          DISCLOSURE_DETAILS: {
            LABEL: 'Détails de la divulgation antérieure',
            PLACEHOLDER: 'Décrire comment et quand l\'invention a été divulguée auparavant',
          },
        },
        ERRORS: {
          APPLICATION_MODE: 'Le mode de demande est obligatoire',
          EMAIL_REQUIRED: 'L\'email est obligatoire',
          EMAIL_INVALID: 'Doit saisir un email valide',
          EMAIL_SIZE_MAX: 'Ne peut pas dépasser 100 caractères',
          EMAIL_FORMAT: 'Ne peut pas contenir de points consécutifs',
          EMAIL_BLANK: 'Ne peut pas contenir d\'espaces',
          EMAIL_DOMAIN_FORMAT: 'Format de domaine invalide',
          PHONE: 'Le numéro de téléphone est obligatoire',
          PHONE_REQUIRED: 'Le numéro de portable est requis',
          PHONE_FORMAT: 'Doit contenir exactement 10 chiffres',
          PHONE_FORMAT_NUMBERS: 'Seuls les chiffres sont autorisés',
          PHONE_FORMAT_DIGIT: 'Ne peut pas contenir le même chiffre répété',
          PHONE_FORMAT_DIGIT_VALID: 'Doit commencer par un chiffre valide (2-9)',
          ADDRESS_REQUIRED: 'L\'adresse est obligatoire',
          ADDRESS_MIN_LENGTH: 'L\'adresse doit avoir au moins 10 caractères',
          ADDRESS_MAX_LENGTH: 'L\'adresse ne peut pas dépasser 300 caractères',
          ADDRESS_SIZE_MIN: 'Doit avoir au moins 10 caractères',
          ADDRESS_SIZE_MAX: 'Ne peut pas dépasser 300 caractères',
          ADDRESS_FORMAT: 'Contient des caractères non valides',
          ADDRESS_BLANK: 'Ne peut pas contenir seulement des espaces',
          ADDRESS_SPACES: 'Ne doit pas commencer ou finir par des espaces',
          ENTITY: 'La région est obligatoire',
          ENTITY_INSTITUTION: 'Doit sélectionner une région et une institution',
          INSTITUTION: 'L\'institution est obligatoire',
          NAME_REQUIRED: 'Le nom complet / raison sociale est requis',
          NAME_SIZE_MIN: 'Doit avoir au moins 3 caractères',
          NAME_SIZE_MAX: 'Ne peut pas dépasser 200 caractères',
          NAME_BLANK: 'Ne peut pas contenir seulement des espaces',
          NAME_FORMAT: 'Seules les lettres, chiffres, espaces et caractères spéciaux de base sont autorisés',
          NAME_SPACES: 'Ne doit pas commencer ou finir par des espaces',
          NAME_MULTIPLE_SPACES: 'Ne doit pas contenir d\'espaces multiples consécutifs',
          NAME_ONLY_NUMBERS: 'Ne peut pas contenir seulement des chiffres',
          NAME_ONLY_SPECIAL: 'Doit contenir au moins des lettres ou des chiffres',
          NATIONALITY_REQUIRED: 'La nationalité est requise',
          NATIONALITY_SIZE_MIN: 'Doit avoir au moins 4 caractères',
          NATIONALITY_SIZE_MAX: 'Ne peut pas dépasser 50 caractères',
          NATIONALITY_FORMAT: 'Seules les lettres sont autorisées',
          NATIONALITY_BLANK: 'Ne peut pas contenir seulement des espaces',
          CURP_SIZE_MAX: 'Format NIR invalide (13 chiffres)',
          RFC_SIZE_MAX: 'Format SIRET invalide (14 chiffres)',
          RFC_CURP_SIZE_MAX: 'Doit avoir le format d\'identification valide',
          INVENTION_REQUIRED: 'Le titre de l\'invention est obligatoire',
          INVENTION_MIN_LENGTH: 'Le titre de l\'invention doit avoir au moins 5 caractères',
          INVENTION_MAX_LENGTH: 'Le titre de l\'invention ne peut pas dépasser 500 caractères',
          INVENTION_TITLE: 'Le titre de l\'invention',
          TECHNICAL_FIELD_REQUIRED: 'Le domaine technique est obligatoire',
          TECHNICAL_FIELD_MIN_LENGTH: 'Le domaine technique doit avoir au moins 20 caractères',
          TECHNICAL_FIELD_MAX_LENGTH: 'Le domaine technique ne peut pas dépasser 800 caractères',
          TECHNICAL_FIELD: 'Le domaine technique',
          STATE_TECHNIQUE_REQUIRED: 'L\'état de la technique est obligatoire',
          STATE_TECHNIQUE_MIN_LENGTH: 'L\'état de la technique doit avoir au moins 50 caractères',
          STATE_TECHNIQUE_MAX_LENGTH: 'L\'état de la technique ne peut pas dépasser 1500 caractères',
          STATE_TECHNIQUE: 'L\'état de la technique',
          TECHNICAL_PROBLEM_REQUIRED: 'Le problème technique est obligatoire',
          TECHNICAL_PROBLEM_MIN_LENGTH: 'Le problème technique doit avoir au moins 30 caractères',
          TECHNICAL_PROBLEM_MAX_LENGTH: 'Le problème technique ne peut pas dépasser 1000 caractères',
          TECHNICAL_PROBLEM: 'Le problème technique',
          INDUSTRIAL_APPLICATION_REQUIRED: 'L\'application industrielle est obligatoire',
          INDUSTRIAL_APPLICATION_MIN_LENGTH: 'L\'application industrielle doit avoir au moins 20 caractères',
          INDUSTRIAL_APPLICATION_MAX_LENGTH: 'L\'application industrielle ne peut pas dépasser 800 caractères',
          INDUSTRIAL_APPLICATION: 'L\'application industrielle',
          DETAILED_DESCRIPTION_REQUIRED: 'La description détaillée est obligatoire',
          DETAILED_DESCRIPTION_MIN_LENGTH: 'La description détaillée doit avoir au moins 100 caractères',
          DETAILED_DESCRIPTION_MAX_LENGTH: 'La description détaillée ne peut pas dépasser 3000 caractères',
          DETAILED_DESCRIPTION: 'La description détaillée',
          EXAMPLES_REALIZATION_REQUIRED: 'Les exemples de réalisation sont obligatoires',
          EXAMPLES_REALIZATION_MIN_LENGTH: 'Les exemples de réalisation doivent avoir au moins 50 caractères',
          EXAMPLES_REALIZATION_MAX_LENGTH: 'Les exemples de réalisation ne peuvent pas dépasser 2000 caractères',
          EXAMPLES_REALIZATION: 'Les exemples de réalisation',
          CLAIMS_REQUIRED: 'Les revendications sont obligatoires',
          CLAIMS_MIN_LENGTH: 'Les revendications doivent avoir au moins 30 caractères',
          CLAIMS_MAX_LENGTH: 'Les revendications ne peuvent pas dépasser 2000 caractères',
          CLAIMS: 'Les revendications',
          SUMMARY_REQUIRED: 'Le résumé est obligatoire',
          SUMMARY_MIN_LENGTH: 'Le résumé doit avoir au moins 150 caractères',
          SUMMARY_MAX_LENGTH: 'Le résumé ne peut pas dépasser 250 caractères',
          SUMMARY_SIZE_MIN: 'Doit avoir au moins 150 caractères',
          SUMMARY_SIZE_MAX: 'Ne peut pas dépasser 250 caractères',
          SUMMARY_SIZE_MIN_WORDS: 'Doit avoir au moins 25 mots',
          SUMMARY_SIZE_MAX_WORDS: 'Ne peut pas dépasser 50 mots',
          DECLARATION_ORIGINALITY: 'Doit accepter la déclaration d\'originalité',
          DECLARATION_VERACITY: 'Doit accepter la déclaration de véracité',
          DISCLOSURE_DETAILS: 'Les détails de divulgation',
          FILE_MAX_SIZE_PART_1: 'Le fichier ',
          FILE_MAX_SIZE_PART_2: ' dépasse la taille maximale autorisée de 10MB.',
          FILE_FORMAT_PART_2: ' n\'a pas un format valide pour ',
          REQUIRED: ' est requis',
          SIZE_MIN: 'Doit avoir au moins ',
          SIZE_MAX: 'Ne peut pas dépasser ',
          CHAR: ' caractères',
          SPACES: 'Ne doit pas commencer ou finir par des espaces',
          BLANK: 'Ne peut pas contenir seulement des espaces',
          LETTERS: 'Doit contenir au moins quelques lettres',
          SUBMIT: 'Une erreur s\'est produite lors du traitement de la demande. Veuillez réessayer',
          DOCUMENT_TITLE: 'Documents Manquants!',
          IMPI: 'Doit joindre le formulaire officiel INPI',
          PAYMENT: 'Doit joindre le justificatif de paiement des droits',
        },
        INFO: {
          SUCCESS: 'Demande de brevet soumise avec succès à l\'INPI',
          CONFIRM: 'OK, compris!',
        }
      },
      UTILITY_MODEL: {
        TITLE: 'Enregistrer Modèle d\'Utilité',
        INFO_1: 'Complétez les informations requises pour enregistrer le modèle d\'utilité auprès de l\'INPI.',
        INFO_2: 'Les modèles d\'utilité protègent les améliorations ou modifications fonctionnelles d\'outils, ustensiles ou dispositifs existants.',
        GENERAL_SECTION: {
          TITLE: 'Données Générales du Demandeur',
          APPLICATION_DATE: 'Date de Demande',
          APPLICATION_MODE: {
            LABEL: 'Mode de Demande',
            SELECT_MODE: 'Sélectionner le mode',
            ONLINE: 'En ligne (e-INPI)',
            IN_PERSON: 'En personne (Bureaux)',
          },
          NAME_COMPANY: {
            LABEL: 'Nom Complet / Raison Sociale',
            PLACEHOLDER: 'Saisir nom complet ou raison sociale',
          },
          NATIONALITY: {
            LABEL: 'Nationalité',
            PLACEHOLDER: 'Ex: Française',
          },
          EMAIL: {
            LABEL: 'Email',
            PLACEHOLDER: 'exemple@email.com',
          },
          PHONE: 'Numéro de Portable',
          ADDRESS: {
            LABEL: 'Adresse pour Notifications',
            PLACEHOLDER: 'Rue, numéro, quartier, ville, région, code postal',
          },
          CURP_RFC: {
            PLACEHOLDER: 'Pour les personnes physiques ou morales françaises',
          },
          INVENTOR_APPLICANT: {
            LABEL: 'L\'inventeur et le demandeur sont-ils différents?',
            YES: 'Oui, ils sont des personnes différentes',
            NO: 'Non, ils sont la même personne',
          },
          ENTITY: {
            LABEL: 'Région',
            SELECT_ENTITY: 'Sélectionner une région',
          },
          INSTITUTION: {
            LABEL: 'Institution',
            SELECT_INSTITUTION: 'Sélectionner une institution',
          }
        },
        MODEL_SECTION: {
          TITLE: 'Information du Modèle d\'Utilité',
          MODEL_NAME: {
            LABEL: 'Nom du Modèle d\'Utilité',
            PLACEHOLDER: 'Nom descriptif du modèle d\'utilité',
          },
          TECHNICAL_FIELD: {
            LABEL: 'Domaine Technique',
            PLACEHOLDER: 'Domaine technique auquel appartient le modèle d\'utilité',
          },
          STATE_TECHNIQUE: {
            LABEL: 'État de la Technique (Antécédents)',
            PLACEHOLDER: 'Description d\'outils, ustensiles ou dispositifs similaires existants',
          },
          TECHNICAL_PROBLEM: {
            LABEL: 'Problème Technique à Résoudre',
            PLACEHOLDER: 'Inconvénients ou limitations que résout le modèle d\'utilité',
          },
          INDUSTRIAL_APPLICATION: {
            LABEL: 'Application Industrielle',
            PLACEHOLDER: 'Usages pratiques et applications industrielles du modèle d\'utilité',
          }
        },
        DETAILED_DESCRIPTION_SECTION: {
          TITLE: 'Description Technique Détaillée',
          DETAILED_DESCRIPTION: {
            LABEL: 'Description Détaillée de l\'Amélioration',
            PLACEHOLDER: 'Explication claire et détaillée des modifications ou améliorations fonctionnelles',
          },
          EXAMPLES_REALIZATION: {
            LABEL: 'Exemples de Réalisation',
            PLACEHOLDER: 'Façons spécifiques de mettre en œuvre les améliorations fonctionnelles',
          },
          CLAIMS: {
            LABEL: 'Revendications',
            PLACEHOLDER: 'Caractéristiques nouvelles et fonctionnelles que l\'on souhaite protéger',
          },
          SUMMARY: {
            LABEL: 'Résumé (150-250 mots)',
            PLACEHOLDER: 'Résumé bref du modèle d\'utilité pour publication dans la Gazette de l\'INPI',
          }
        },
        DOCUMENTATION_SECTION: {
          TITLE: 'Documentation',
          IMPI: {
            LABEL: 'Formulaire officiel INPI',
            SUB_TEXT: 'Formulaire officiel pour demande d\'enregistrement de modèle d\'utilité'
          },
          TECHNICAL_DRAWINGS: {
            LABEL: 'Dessins techniques ou figures',
            SUB_TEXT: 'Diagrammes, plans ou illustrations montrant les améliorations fonctionnelles'
          },
          PAYMENT_FEES: {
            LABEL: 'Justificatif de paiement des droits',
            SUB_TEXT: 'Justificatif du paiement des droits pour dépôt de la demande'
          },
          ADDITIONAL_DOCUMENTS: {
            LABEL: 'Documents additionnels',
            SUB_TEXT: 'Procuration, cession de droits, priorité étrangère (si applicable)'
          },
          SELECTED_FILES: 'Fichiers Sélectionnés',
        },
        STATEMENTS_SECTION: {
          TITLE: 'Déclarations',
          STATEMENT_1: 'Je déclare que le modèle d\'utilité est le résultat de mon propre travail et n\'est pas une copie d\'un autre déjà existant dans le commerce',
          STATEMENT_2: 'Je déclare sous serment que les informations fournies sont véridiques et complètes',
          INVENTION_PREVIOUSLY: {
            LABEL: 'L\'invention a-t-elle été divulguée auparavant?',
            YES: 'Oui, elle a été divulguée auparavant',
            NO: 'Non, elle n\'a pas été divulguée auparavant',
          },
          DISCLOSURE_DETAILS: {
            LABEL: 'Détails de la Divulgation Antérieure',
            PLACEHOLDER: 'Spécifier où, quand et comment elle a été divulguée auparavant',
          },
        },
        ERRORS: {
          APPLICATION_MODE: 'Le mode de demande est requis',
          NAME_REQUIRED: 'Le nom complet / raison sociale est requis',
          NAME_SIZE_MIN: 'Doit avoir au moins 3 caractères',
          NAME_SIZE_MAX: 'Ne peut pas dépasser 200 caractères',
          NAME_FORMAT: 'Seules les lettres, chiffres, espaces et caractères spéciaux de base sont autorisés',
          NAME_BLANK: 'Ne doit pas commencer ou finir par des espaces',
          NAME_MULTIPLE_BLANKS: 'Ne doit pas contenir d\'espaces multiples consécutifs',
          NATIONALITY_REQUIRED: 'La nationalité est requise',
          NATIONALITY_SIZE_MIN: 'Doit avoir au moins 4 caractères',
          NATIONALITY_SIZE_MAX: 'Ne peut pas dépasser 50 caractères',
          NATIONALITY_FORMAT: 'Seules les lettres sont autorisées',
          EMAIL_REQUIRED: 'L\'email est requis',
          EMAIL_SIZE_MAX: 'Ne peut pas dépasser 100 caractères',
          EMAIL_INVALID: 'Doit saisir un email valide',
          EMAIL_FORMAT: 'Ne peut pas contenir de points consécutifs',
          EMAIL_BLANK: 'Ne peut pas contenir d\'espaces',
          PHONE_REQUIRED: 'Le numéro de portable est requis',
          PHONE_FORMAT: 'Doit contenir exactement 10 chiffres',
          PHONE_FORMAT_NUMBERS: 'Seuls les chiffres sont autorisés',
          PHONE_FORMAT_DIGIT: 'Ne peut pas contenir le même chiffre répété',
          PHONE_FORMAT_DIGIT_VALID: 'Doit commencer par un chiffre valide (2-9)',
          ADDRESS_REQUIRED: 'L\'adresse est obligatoire',
          ADDRESS_SIZE_MIN: 'Doit avoir au moins 10 caractères',
          ADDRESS_SIZE_MAX: 'Ne peut pas dépasser 300 caractères',
          ADDRESS_FORMAT: 'Contient des caractères non valides',
          ADDRESS_BLANK: 'Ne peut pas contenir seulement des espaces',
          ADDRESS_MULTIPLE_BLANKS: 'Ne doit pas commencer ou finir par des espaces',
          CURP_SIZE_MAX: 'Format NIR invalide (13 chiffres)',
          RFC_SIZE_MAX: 'Format SIRET invalide (14 chiffres)',
          RFC_CURP_SIZE_MAX: 'Doit avoir le format d\'identification valide',
          ENTITY: 'La région est requise',
          INSTITUTION: 'L\'institution est requise',
          MODEL_NAME_REQUIRED: 'Le nom du modèle d\'utilité est requis',
          TECHNICAL_FIELD_REQUIRED: 'Le domaine technique est requis',
          STATE_TECHNIQUE_REQUIRED: 'L\'état de la technique est requis',
          TECHNICAL_PROBLEM_REQUIRED: 'Le problème technique est requis',
          INDUSTRIAL_APPLICATION_REQUIRED: 'L\'application industrielle est requise',
          DETAILED_DESCRIPTION_REQUIRED: 'La description détaillée est requise',
          EXAMPLES_REALIZATION_REQUIRED: 'Les exemples de réalisation sont requis',
          CLAIMS_REQUIRED: 'Les revendications sont requises',
          SUMMARY_REQUIRED: 'Le résumé est requis',
          SUMMARY_SIZE_MIN: 'Doit avoir au moins 150 caractères',
          SUMMARY_SIZE_MIN_WORDS: 'Doit avoir au moins 25 mots',
          SUMMARY_SIZE_MAX: 'Ne peut pas dépasser 250 caractères',
          SUMMARY_SIZE_MAX_WORDS: 'Ne peut pas dépasser 50 mots',
          DECLARATION_ORIGINALITY: 'Doit accepter la déclaration d\'originalité',
          DECLARATION_VERACITY: 'Doit accepter la déclaration de véracité',
          ENTITY_INSTITUTION: 'Doit sélectionner une région et une institution',
          FILE_MAX_SIZE_PART_1: 'Le fichier ',
          FILE_MAX_SIZE_PART_2: ' dépasse la taille maximale autorisée de 10MB.',
          FILE_FORMAT_PART_2: ' n\'a pas un format valide pour ',
          REQUIRED: ' est requis',
          SIZE_MIN: 'Doit avoir au moins ',
          SIZE_MAX: 'Ne peut pas dépasser ',
          CHAR: ' caractères',
          BLANKS: 'Ne doit pas commencer ou finir par des espaces',
          BLANK: 'Ne peut pas contenir seulement des espaces',
          LETTERS: 'Doit contenir au moins quelques lettres',
          UTILITY_MODEL: 'Le nom du modèle d\'utilité',
          TECHNICAL_FIELD: 'Le domaine technique',
          STATE_TECHNIQUE: 'L\'état de la technique',
          TECHNICAL_PROBLEM: 'Le problème technique',
          INDUSTRIAL_APPLICATION: 'L\'application industrielle',
          DETAILED_DESCRIPTION: 'La description détaillée',
          EXAMPLES_REALIZATION: 'Les exemples de réalisation',
          CLAIMS: 'Les revendications',
          SUBMIT: 'Une erreur s\'est produite lors du traitement de la demande. Veuillez réessayer',
          DOCUMENT_TITLE: 'Documents Manquants!',
          IMPI: 'Doit joindre le formulaire officiel INPI',
          PAYMENT: 'Doit joindre le justificatif de paiement des droits',
        },
        INFO: {
          SUCCESS: 'Demande de modèle d\'utilité soumise avec succès',
          CONFIRM: 'Compris!',
        }
      },
      INDUSTRIAL_DESIGN: {
        TITLE: 'Demande d\'Enregistrement de Design Industriel - INPI',
        INFO_1: 'Complétez toutes les informations requises pour l\'enregistrement du design industriel auprès de l\'INPI.',
        INFO_2: 'Tous les champs marqués d\'un (*) sont obligatoires.',
        GENERAL_SECTION: {
          TITLE: 'Données Générales du Demandeur',
          APPLICATION_DATE: 'Date de demande',
          APPLICATION_MODE: {
            LABEL: 'Mode de demande',
            SELECT_MODE: 'Sélectionner le mode',
            ONLINE: 'En ligne (e-INPI)',
            IN_PERSON: 'En personne (Bureaux)',
          },
          NAME_COMPANY: {
            LABEL: 'Nom complet / Raison sociale',
            PLACEHOLDER: 'Nom complet du demandeur ou raison sociale',
          },
          NATIONALITY: {
            LABEL: 'Nationalité',
            PLACEHOLDER: 'Nationalité du demandeur',
          },
          EMAIL: {
            LABEL: 'Email',
            PLACEHOLDER: 'exemple@domaine.com',
          },
          PHONE: 'Numéro de téléphone',
          ADDRESS: {
            LABEL: 'Adresse',
            PLACEHOLDER: 'Rue, numéro, quartier, ville, région, code postal',
          },
          CURP_RFC: {
            PLACEHOLDER: 'NIR (13 chiffres) ou SIRET (14 chiffres)',
          },
          DESIGNER_APPLICANT: {
            LABEL: 'Le concepteur et le demandeur sont-ils différents?',
            YES: 'Oui, ils sont différents',
            NO: 'Non, ils sont la même personne',
          },
          ENTITY: {
            LABEL: 'Région',
            SELECT_ENTITY: 'Sélectionner une région',
          },
          INSTITUTION: {
            LABEL: 'Institution',
            SELECT_INSTITUTION: 'Sélectionner une institution',
          }
        },
        DESIGN_SECTION: {
          TITLE: 'Information du Design Industriel',
          DESIGN_NAME: {
            LABEL: 'Dénomination du design industriel',
            PLACEHOLDER: 'Dénomination descriptive du design industriel',
          },
          DESIGN_TYPE: {
            LABEL: 'Type de design industriel',
            SELECT_TYPE: 'Sélectionner le type de design',
            INDUSTRIAL_MODEL: 'Modèle Industriel',
            INDUSTRIAL_DRAWING: 'Dessin Industriel',
          },
          PRODUCT_CLASS: {
            LABEL: 'Classe de produits',
            PLACEHOLDER: 'Spécifier la classe de produits auxquels s\'appliquera le design',
          }
        },
        TECHNICAL_DESCRIPTION_SECTION: {
          TITLE: 'Description Technique du Design',
          NEW_ELEMENTS: {
            LABEL: 'Description d\'éléments nouveaux ou originaux',
            PLACEHOLDER: 'Décrire en détail les éléments nouveaux ou originaux du design',
          },
          VISUAL_CHARACTERISTICS: {
            LABEL: 'Caractéristiques visuelles distinctives',
            PLACEHOLDER: 'Décrire les caractéristiques visuelles qui rendent le design distinctif (forme, couleur, texture, etc.)',
          },
          GENERAL_DESCRIPTION: {
            LABEL: 'Description générale du design',
            PLACEHOLDER: 'Fournir une description complète et détaillée du design industriel',
          },
          SUMMARY: {
            LABEL: 'Résumé (150-250 mots)',
            PLACEHOLDER: 'Résumé bref du design industriel pour publication dans la Gazette de l\'INPI',
          }
        },
        DOCUMENTATION_SECTION: {
          TITLE: 'Documentation',
          VIEWS_INFO: {
            TITLE: 'Vues requises pour les designs industriels',
            DESCRIPTION: 'Les dessins techniques doivent inclure des vues en perspective, frontale, latérale, arrière, supérieure et inférieure de l\'objet.',
          },
          IMPI: {
            LABEL: 'Formulaire officiel INPI',
            SUB_TEXT: 'Formulaire officiel pour demande d\'enregistrement de design industriel'
          },
          TECHNICAL_DRAWINGS: {
            LABEL: 'Dessins techniques et vues du design',
            SUB_TEXT: 'Inclure des vues en perspective, frontale, latérale, arrière, supérieure et inférieure'
          },
          PAYMENT_FEES: {
            LABEL: 'Justificatif de paiement des droits',
            SUB_TEXT: 'Justificatif du paiement des droits pour dépôt de la demande'
          },
          ADDITIONAL_DOCUMENTS: {
            LABEL: 'Documents additionnels',
            SUB_TEXT: 'Procuration, cession de droits, priorité étrangère (si applicable)'
          },
          SELECTED_FILES: 'Fichiers Sélectionnés',
        },
        STATEMENTS_SECTION: {
          TITLE: 'Déclarations',
          STATEMENT_1: 'Je déclare que le design industriel est le résultat de mon propre travail et n\'est pas une copie d\'un autre déjà existant dans le commerce',
          STATEMENT_2: 'Je déclare sous serment que les informations fournies sont correctes et complètes',
          DESIGN_PREVIOUSLY: {
            LABEL: 'Le design a-t-il été divulgué auparavant?',
            YES: 'Oui, il a été divulgué auparavant',
            NO: 'Non, il n\'a pas été divulgué',
          },
          DISCLOSURE_DETAILS: {
            LABEL: 'Détails de la divulgation antérieure',
            PLACEHOLDER: 'Décrire comment et quand le design a été divulgué auparavant',
          },
        },
        ERRORS: {
          APPLICATION_MODE: 'Le mode de demande est obligatoire',
          NAME_REQUIRED: 'Le nom complet / raison sociale est requis',
          NAME_SIZE_MIN: 'Doit avoir au moins 3 caractères',
          NAME_SIZE_MAX: 'Ne peut pas dépasser 200 caractères',
          NAME_FORMAT: 'Seules les lettres, chiffres, espaces et caractères spéciaux de base sont autorisés',
          NAME_SPACES: 'Ne doit pas commencer ou finir par des espaces',
          NAME_MULTIPLE_SPACES: 'Ne doit pas contenir d\'espaces multiples consécutifs',
          NATIONALITY_REQUIRED: 'La nationalité est requise',
          NATIONALITY_SIZE_MIN: 'Doit avoir au moins 4 caractères',
          NATIONALITY_SIZE_MAX: 'Ne peut pas dépasser 50 caractères',
          NATIONALITY_FORMAT: 'Seules les lettres sont autorisées',
          EMAIL_REQUIRED: 'L\'email est requis',
          EMAIL_SIZE_MAX: 'Ne peut pas dépasser 100 caractères',
          EMAIL_INVALID: 'Doit saisir un email valide',
          EMAIL_FORMAT: 'Ne peut pas contenir de points consécutifs',
          EMAIL_BLANK: 'Ne peut pas contenir d\'espaces',
          PHONE_REQUIRED: 'Le numéro de portable est requis',
          PHONE_FORMAT: 'Doit contenir exactement 10 chiffres',
          PHONE_FORMAT_NUMBERS: 'Seuls les chiffres sont autorisés',
          PHONE_FORMAT_DIGIT: 'Ne peut pas contenir le même chiffre répété',
          PHONE_FORMAT_DIGIT_VALID: 'Doit commencer par un chiffre valide (2-9)',
          ADDRESS_REQUIRED: 'L\'adresse est requise',
          ADDRESS_SIZE_MIN: 'Doit avoir au moins 10 caractères',
          ADDRESS_SIZE_MAX: 'Ne peut pas dépasser 300 caractères',
          ADDRESS_FORMAT: 'Contient des caractères non valides',
          ADDRESS_BLANK: 'Ne peut pas contenir seulement des espaces',
          ADDRESS_SPACES: 'Ne doit pas commencer ou finir par des espaces',
          CURP_SIZE_MAX: 'Format NIR invalide (13 chiffres)',
          RFC_SIZE_MAX: 'Format SIRET invalide (14 chiffres)',
          RFC_CURP_SIZE_MAX: 'Doit avoir le format d\'identification valide',
          ENTITY: 'La région est obligatoire',
          INSTITUTION: 'L\'institution est obligatoire',
          DESIGN_NAME_REQUIRED: 'La dénomination du design est requise',
          DESIGN_TYPE_REQUIRED: 'Le type de design est obligatoire',
          PRODUCT_CLASS_REQUIRED: 'La classe de produits est requise',
          NEW_ELEMENTS_REQUIRED: 'Les éléments nouveaux ou originaux sont requis',
          VISUAL_CHARACTERISTICS_REQUIRED: 'Les caractéristiques visuelles distinctives sont requises',
          GENERAL_DESCRIPTION_REQUIRED: 'La description générale est requise',
          SUMMARY_REQUIRED: 'Le résumé est requis',
          SUMMARY_SIZE_MIN: 'Doit avoir au moins 150 caractères',
          SUMMARY_SIZE_MIN_WORDS: 'Doit avoir au moins 25 mots',
          SUMMARY_SIZE_MAX: 'Ne peut pas dépasser 250 caractères',
          SUMMARY_SIZE_MAX_WORDS: 'Ne peut pas dépasser 50 mots',
          DECLARATION_ORIGINALITY: 'Doit accepter la déclaration d\'originalité',
          DECLARATION_VERACITY: 'Doit accepter la déclaration de véracité',
          ENTITY_INSTITUTION: 'Doit sélectionner une région et une institution',
          FILE_MAX_SIZE_PART_1: 'Le fichier ',
          FILE_MAX_SIZE_PART_2: ' dépasse la taille maximale autorisée de 10MB.',
          FILE_FORMAT_PART_2: ' n\'a pas un format valide pour ',
          REQUIRED: ' est requis',
          SIZE_MIN: 'Doit avoir au moins ',
          SIZE_MAX: 'Ne peut pas dépasser ',
          CHAR: ' caractères',
          SPACES: 'Ne doit pas commencer ou finir par des espaces',
          BLANK: 'Ne peut pas contenir seulement des espaces',
          LETTERS: 'Doit contenir au moins quelques lettres',
          DESIGN_NAME: 'La dénomination du design',
          PRODUCT_CLASS: 'La classe de produits',
          NEW_ELEMENTS: 'Les éléments nouveaux ou originaux',
          VISUAL_CHARACTERISTICS: 'Les caractéristiques visuelles distinctives',
          GENERAL_DESCRIPTION: 'La description générale',
          SUBMIT: 'Une erreur s\'est produite lors du traitement de la demande. Veuillez réessayer',
          DOCUMENT_TITLE: 'Documents Manquants!',
          IMPI: 'Doit joindre le formulaire officiel INPI',
          PAYMENT: 'Doit joindre le justificatif de paiement des droits',
          TECHNICAL_DRAWINGS: 'Doit joindre les dessins techniques et vues du design industriel',
        },
        INFO: {
          SUCCESS: 'Demande de design industriel soumise avec succès à l\'INPI',
          CONFIRM: 'OK, compris!',
        }
      },
      COPYRIGHT: {
        TITLE: 'Demande d\'Enregistrement de Droit d\'Auteur - SACD',
        INFO_1: 'Complétez toutes les informations requises pour l\'enregistrement du droit d\'auteur auprès de la SACD.',
        INFO_2: 'Tous les champs marqués d\'un (*) sont obligatoires.',
        GENERAL_SECTION: {
          TITLE: 'Données Générales du Demandeur',
          APPLICATION_DATE: 'Date de demande',
          APPLICATION_MODE: {
            LABEL: 'Mode de demande',
            SELECT_MODE: 'Sélectionner le mode',
            ONLINE: 'En ligne (e-SACD)',
            IN_PERSON: 'En personne (Bureaux)',
          },
          WORK_TITLE: {
            LABEL: 'Titre de l\'œuvre à enregistrer',
            PLACEHOLDER: 'Saisir le titre complet de l\'œuvre',
          },
          NAME_COMPANY: {
            LABEL: 'Nom complet / Raison sociale',
            PLACEHOLDER: 'Nom complet du demandeur ou raison sociale',
          },
          NATIONALITY: {
            LABEL: 'Nationalité',
            PLACEHOLDER: 'Nationalité du demandeur',
          },
          EMAIL: {
            LABEL: 'Email',
            PLACEHOLDER: 'exemple@domaine.com',
          },
          PHONE: 'Numéro de portable',
          ADDRESS: {
            LABEL: 'Adresse pour notifications',
            PLACEHOLDER: 'Rue, numéro, quartier, ville, région, code postal',
          },
          CURP_RFC: {
            PLACEHOLDER: 'NIR (13 chiffres) ou SIRET (14 chiffres)',
          },
          AUTHOR_NAME: {
            LABEL: 'Nom de l\'auteur (si différent)',
            PLACEHOLDER: 'Laisser vide si l\'auteur est le même demandeur',
          },
          ENTITY: {
            LABEL: 'Région',
            SELECT_ENTITY: 'Sélectionner une région',
          },
          INSTITUTION: {
            LABEL: 'Institution',
            SELECT_INSTITUTION: 'Sélectionner une institution',
          }
        },
        WORK_SECTION: {
          TITLE: 'Information de l\'Œuvre',
          BRANCH: {
            LABEL: 'Branche de l\'œuvre',
            SELECT_BRANCH: 'Sélectionner la branche de l\'œuvre',
            OPTIONS: {
              LITERARY: 'Littéraire',
              MUSICAL_WITH_LYRICS: 'Musicale avec paroles',
              MUSICAL_WITHOUT_LYRICS: 'Musicale sans paroles',
              DRAMATIC: 'Dramatique',
              DANCE: 'Danse',
              PICTORIAL: 'Picturale',
              DRAWING: 'Dessin',
              SCULPTURAL: 'Sculpturale',
              PLASTIC_CHARACTER: 'De caractère plastique',
              CARICATURE: 'Caricature',
              COMIC: 'Bande dessinée',
              ARCHITECTURAL: 'Architecturale',
              CINEMATOGRAPHIC: 'Cinématographique',
              AUDIOVISUAL: 'Audiovisuelle',
              RADIO_PROGRAM: 'Programme radio',
              TV_PROGRAM: 'Programme télévision',
              COMPUTER_PROGRAM: 'Programme informatique',
              PHOTOGRAPHIC: 'Photographique',
              APPLIED_ART: 'Art appliqué',
              DATABASE: 'Base de données',
            }
          },
          IS_DERIVED: {
            LABEL: 'L\'œuvre est-elle dérivée?',
            NO: 'Non',
            YES: 'Oui',
          },
          DERIVED_TYPE: {
            LABEL: 'Type d\'œuvre dérivée',
            SELECT_TYPE: 'Sélectionner le type d\'œuvre dérivée',
            OPTIONS: {
              AMPLIFICATION: 'Amplification',
              TRANSLATION: 'Traduction',
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
            LABEL: 'Données de l\'œuvre primigénie',
            PLACEHOLDER: 'Fournir les données de l\'œuvre originale dont dérive cette œuvre',
          },
          DESCRIPTION: {
            LABEL: 'Description de l\'œuvre',
            PLACEHOLDER: 'Description détaillée de l\'œuvre, son objectif, caractéristiques principales et contenu',
          }
        },
        EXEMPLAR_SECTION: {
          TITLE: 'Exemplaire de l\'Œuvre',
          TYPE_LABEL: 'Type d\'exemplaire',
          SOURCE_CODE: 'Code source (10 premières et dernières pages)',
          URL_WORK: 'URL de l\'œuvre complète du dépôt/base de données/programme informatique',
          SYNTHESIS: 'Synthèse de l\'œuvre',
          URL_FIELD: {
            LABEL: 'URL de l\'œuvre',
            PLACEHOLDER: 'https://exemple.com/mon-oeuvre',
          },
          SYNTHESIS_FIELD: {
            LABEL: 'Synthèse de l\'œuvre',
            PLACEHOLDER: 'Fournir une synthèse brève de l\'œuvre',
          }
        },
        DOCUMENTATION_SECTION: {
          TITLE: 'Documentation',
          INDAUTOR_FORMAT: {
            LABEL: 'Formulaire officiel SACD',
            SUB_TEXT: 'Joindre formulaire selon le type d\'œuvre approprié',
          },
          OFFICIAL_ID: {
            LABEL: 'Identification officielle',
            SUB_TEXT: 'Carte d\'identité, passeport, carte professionnelle ou autre identification officielle',
          },
          OWNERSHIP_DOCUMENT: {
            LABEL: 'Document de titularité',
            SUB_TEXT: 'Contrat, cession de droits, actes constitutifs (si applicable)',
          },
          PAYMENT_RECEIPT: {
            LABEL: 'Justificatif de paiement',
            SUB_TEXT: 'Justificatif du paiement des droits d\'enregistrement auprès de la SACD',
          },
          WORK_EXEMPLAR: {
            LABEL: 'Exemplaire de l\'œuvre',
            SUB_TEXT: 'Fichier numérique de l\'œuvre (code source, document, etc.)',
          },
          ADDITIONAL_DOCUMENTS: {
            LABEL: 'Documents additionnels',
            SUB_TEXT: 'Traductions, procurations, autres documents (si applicable)',
          },
          SELECTED_FILES: 'Fichiers Sélectionnés',
        },
        STATEMENTS_SECTION: {
          TITLE: 'Déclarations',
          STATEMENT_1: 'Je déclare que l\'œuvre est le résultat de mon propre travail original et ne porte pas atteinte aux droits de tiers',
          STATEMENT_2: 'Je déclare sous serment que les informations fournies sont correctes et complètes',
          STATEMENT_3: 'Je déclare que je suis titulaire des droits d\'auteur de l\'œuvre ou que je dispose de l\'autorisation correspondante',
        },
        ERRORS: {
          APPLICATION_MODE: 'Le mode de demande est obligatoire',
          WORK_TITLE_REQUIRED: 'Le titre de l\'œuvre est obligatoire',
          WORK_TITLE_MIN_LENGTH: 'Le titre doit avoir au moins 5 caractères',
          WORK_TITLE_MAX_LENGTH: 'Le titre ne peut pas dépasser 500 caractères',
          WORK_TITLE_SPACES: 'Ne doit pas commencer ou finir par des espaces',
          WORK_TITLE_BLANK: 'Ne peut pas contenir seulement des espaces',
          NAME_REQUIRED: 'Le nom complet / raison sociale est requis',
          NAME_SIZE_MIN: 'Doit avoir au moins 3 caractères',
          NAME_SIZE_MAX: 'Ne peut pas dépasser 200 caractères',
          NAME_FORMAT: 'Seules les lettres, chiffres, espaces et caractères spéciaux de base sont autorisés',
          NAME_SPACES: 'Ne doit pas commencer ou finir par des espaces',
          NAME_MULTIPLE_SPACES: 'Ne doit pas contenir d\'espaces multiples consécutifs',
          NATIONALITY_REQUIRED: 'La nationalité est requise',
          NATIONALITY_SIZE_MIN: 'Doit avoir au moins 4 caractères',
          NATIONALITY_SIZE_MAX: 'Ne peut pas dépasser 50 caractères',
          NATIONALITY_FORMAT: 'Seules les lettres sont autorisées',
          EMAIL_REQUIRED: 'L\'email est obligatoire',
          EMAIL_SIZE_MAX: 'Ne peut pas dépasser 100 caractères',
          EMAIL_INVALID: 'Doit saisir un email valide',
          EMAIL_FORMAT: 'Ne peut pas contenir de points consécutifs',
          EMAIL_BLANK: 'Ne peut pas contenir d\'espaces',
          PHONE_REQUIRED: 'Le numéro de portable est requis',
          PHONE_FORMAT: 'Doit contenir exactement 10 chiffres',
          PHONE_FORMAT_NUMBERS: 'Seuls les chiffres sont autorisés',
          PHONE_FORMAT_DIGIT: 'Ne peut pas contenir le même chiffre répété',
          PHONE_FORMAT_DIGIT_VALID: 'Doit commencer par un chiffre valide (2-9)',
          ADDRESS_REQUIRED: 'L\'adresse est requise',
          ADDRESS_SIZE_MIN: 'Doit avoir au moins 10 caractères',
          ADDRESS_SIZE_MAX: 'Ne peut pas dépasser 300 caractères',
          ADDRESS_FORMAT: 'Contient des caractères non valides',
          ADDRESS_BLANK: 'Ne peut pas contenir seulement des espaces',
          ADDRESS_SPACES: 'Ne doit pas commencer ou finir par des espaces',
          CURP_SIZE_MAX: 'Format NIR invalide (13 chiffres)',
          RFC_SIZE_MAX: 'Format SIRET invalide (14 chiffres)',
          RFC_CURP_SIZE_MAX: 'Doit avoir le format d\'identification valide',
          ENTITY: 'La région est obligatoire',
          INSTITUTION: 'L\'institution est obligatoire',
          BRANCH_REQUIRED: 'La branche de l\'œuvre est obligatoire',
          DERIVED_TYPE_REQUIRED: 'Le type d\'œuvre dérivée est obligatoire',
          DESCRIPTION_REQUIRED: 'La description est obligatoire',
          DESCRIPTION_SIZE_MIN: 'Doit avoir au moins 20 caractères',
          DESCRIPTION_SIZE_MAX: 'Ne peut pas dépasser 2000 caractères',
          DESCRIPTION_SPACES: 'Ne doit pas commencer ou finir par des espaces',
          DESCRIPTION_BLANK: 'Ne peut pas contenir seulement des espaces',
          DECLARATION_ORIGINALITY: 'Doit accepter la déclaration d\'originalité',
          DECLARATION_VERACITY: 'Doit accepter la déclaration de véracité',
          DECLARATION_OWNERSHIP: 'Doit accepter la déclaration de titularité',
          ENTITY_INSTITUTION: 'Doit sélectionner une région et une institution',
          FILE_MAX_SIZE_PART_1: 'Le fichier ',
          FILE_MAX_SIZE_PART_2: ' dépasse la taille maximale autorisée de 10MB.',
          FILE_FORMAT_PART_2: ' n\'a pas un format valide pour ',
          DOCUMENT_TITLE: 'Documents Manquants!',
          INDAUTOR_FORMAT: 'Doit joindre le formulaire officiel SACD approprié',
          SUBMIT: 'Une erreur s\'est produite lors du traitement de la demande. Veuillez réessayer',
        },
        INFO: {
          SUCCESS: 'Demande de droit d\'auteur soumise avec succès à la SACD',
          CONFIRM: 'OK, compris!',
        }
      },
    },
    ALERT: {
      DELETE: {
        TITLE: "Êtes-vous sûr de vouloir supprimer cet enregistrement?",
        BODY: "Cette action ne peut pas être annulée",
        SUCCESS: "Enregistrement supprimé"
      },
      LOGOUT: {
        TITLE: "Êtes-vous sûr de vouloir vous déconnecter?",
        SUCCESS: "Déconnecté avec succès"
      }
    },
    GRAPHICS: {
      TITLES: {
        REQUEST_TYPES: "Types de demande",
        REQUEST: "Demandes",
        DEPARTMENTS: "Départements",
        EDUCATIONAL_PROGRAM: "Programme éducatif",
        RESEARCHERS: "Chercheurs",
        RESEARCHER: "Chercheur",
        DEPARTMENT: "Département",
        FEDERAL_INSTITUTIONS: "Institutions Fédérales",
        CENTRALIZED_INSTITUTIONS: "Institutions Décentralisées",
        APPLICATION_TYPE: "Type de demande",
        FEDERAL_ENTITIES: "Entités Fédérales",
      },
      SUBTITLES: {
        REGISTER: "Enregistrements",
        MONTHS: "Mois (2025)",
        YEARS: "Années (2019-2024)",
        TOP_3: "Top 3",
        TOP_5: "Top 5",
      },
      LEGENDS: {
        NO_FEDERAL_ENTITIES: "Aucune entité fédérale avec des enregistrements.",
        NO_FEDERAL_INSTITUTIONS: "Aucune institution fédérale avec des enregistrements.",
        NO_CENTRALIZED_INSTITUTIONS: "Aucune institution décentralisée avec des enregistrements.",
        TOTAL_APPLICATIONS: 'Total des demandes',
        HOVER_APPLICATIONS: 'demandes',
        ACRONYM: {
          MONTHS: {
            APRIL: 'Avr'
          }
        }
      },
      OPTIONS_FILTER: {
        TITLE: 'Options de filtre',
        LABEL: 'Temps:',
        OPTIONS: {
          MONTHS: 'Mois',
          YEARS: 'Années',
        }
      },
    },
    DEPARTMENTS: {
      IT: "Systèmes informatiques",
      MECHANIC: "Métallurgie-mécanique",
      CHEMISTRY: "Chimie",
    },
    ACRONYM: {
      PATENTS: "BR",
      TRADEMARKS: "MQ",
      UTILITY_MODELS: 'MU',
      COPYRIGHTS: 'DA',
      INDUSTRIAL_DESIGNS: 'DI',
      VEGETAL_VARIETIES: 'VV',
      INDUSTRIAL_SECRETS: 'SI'
    },
    ACADEMIC_LEVEL: {
      DOCTOR_CS: "Docteur en Informatique",
      MASTER_CS: "Master en Systèmes Informatiques",
      MASTER_CSIENCE: "Master en Informatique"
    },
    EDUCATIONAL_PROGRAM: {
      SYSTEMS: "Systèmes informatiques",
      INFORMATICS: "Informatique",
      DATA_SCIENCE: "Science des données"
    },
    TRANSLATOR: {
      SELECT: 'Choisissez votre langue',
      LANGUAGES: {
        ENGLISH: 'Anglais',
        MANDARIN: 'Mandarin',
        SPANISH: 'Espagnol',
        JAPANESE: 'Japonais',
        GERMAN: 'Allemand',
        FRENCH: 'Français'
      }
    },
    MENU: {
      NEW: 'Nouveau',
      ACTIONS: 'Actions',
      CREATE_POST: 'Créer une nouvelle publication',
      PAGES: 'Pages',
      FEATURES: 'Fonctionnalités',
      APPS: 'Applications',
      DASHBOARD: 'Tableau de Bord',
      REGISTERS: 'Enregistrements',
      USERS: 'Utilisateurs',
      INTELECTUAL_PROPERTIES: 'Propriétés Intellectuelles',
      REPORTS: 'Rapports',
      HELP: 'Aide',
      ADMIN: {
        MANAGEMENT: 'Gestion',
        COORDINATORS: 'Coordinateurs',
        APPLICANTS: 'Demandeurs',
        INTELECTUAL_PROPERTY: 'Propriété Intellectuelle',
        PATENTS: 'Brevets',
        TRADEMARKS: 'Marques',
        UTILITY_MODELS: 'Modèles d\'Utilité',
        COPYRIGHTS: 'Droits d\'Auteur',
        INDUSTRIAL_DESIGNS: 'Designs Industriels',
        VEGETAL_VARIETIES: 'Variétés Végétales',
        INDUSTRIAL_SECRETS: 'Secrets Industriels',
        HELP: 'Centre d\'Aide'
      },
      COORD: {
        APPLICANTS: 'Demandeurs',
        COPYRIGHTS: 'Droits d\'Auteur',
        INDUSTRIAL_DESIGNS: 'Designs Industriels',
        INTELECTUAL_PROPERTY: 'Propriété Intellectuelle',
        MANAGEMENT: 'Gestion',
        PATENTS: 'Brevets',
        TRADEMARKS: 'Marques',
        UTILITY_MODELS: 'Modèles d\'Utilité',
        VEGETAL_VARIETIES: 'Variétés Végétales',
        INDUSTRIAL_SECRETS: 'Secrets Industriels',
        HELP: 'Centre d\'Aide'
      },
      APPLICANT: {
        MYREQUESTS: 'Mes Demandes',
        REQUESTS: 'Demandes',
        REPORTS: 'Rapports',
        REGISTER: "S'inscrire",
        HELP: 'Centre d\'Aide'
      },
    },
    AUTH: {
      GENERAL: {
        OR: 'Ou',
        SUBMIT_BUTTON: 'Soumettre',
        NO_ACCOUNT: 'Vous n\'avez pas de compte?',
        SIGNUP_BUTTON: 'S\'inscrire',
        FORGOT_BUTTON: 'Mot de passe oublié?',
        BACK_BUTTON: 'Retour',
        CANCEL_BUTTON: 'Annuler',
        PRIVACY: 'Confidentialité',
        LEGAL: 'Légal',
        TERMS: 'Conditions',
        CONTACT: 'Nous Contacter',
        PLANS: 'Plans',
        ACCEPT_PRIVACY: 'En entrant vous acceptez le {{value}}',
      },
      LOGIN: {
        TITLE: 'Se connecter',
        CEPPI: 'Centre de Brevets de Propriété Intellectuelle',
        BUTTON: 'Se Connecter',
        ERROR: 'Identifiants incorrects',
        EPASSWORD: 'Minimum 6 caractères',
        ERROR_DETAIL: 'Vérifiez votre nom d\'utilisateur et mot de passe',
        USERNAME: 'Nom d\'utilisateur',
        PASSWORD: 'Mot de passe',
        LOADING: 'Veuillez patienter',
      },
      FORGOT: {
        TITLE: 'Mot de passe oublié?',
        DESC: 'Veuillez saisir votre email pour réinitialiser votre mot de passe',
        SUCCESS: 'La réinitialisation du mot de passe a été envoyée',
        ERROR: 'Désolé, veuillez réessayer',
        SENDING: 'Envoi en cours',
        EMAIL: {
          LABEL: 'Email',
          PLACEHOLDER: 'exemple@domaine.fr',
          REQUIRED: 'Champ obligatoire',
          INVALID: 'Saisir un email valide'
        },
      },
      PRIVACY: {
        TITLE: 'Avis de Confidentialité',
        CONTENT: 'Texte complet de l\'avis de confidentialité',
        ACCEPT: 'Accepter'
      },
      REGISTER: {
        TITLE: 'S\'inscrire',
        DESC: 'Saisissez vos détails pour créer votre compte',
        SUCCESS: 'Votre compte a été enregistré avec succès.'
      },
      INPUT: {
        EMAIL: 'Email',
        FULLNAME: 'Nom Complet',
        PASSWORD: 'Mot de passe',
        CONFIRM_PASSWORD: 'Confirmer le Mot de passe',
        USERNAME: 'Nom d\'utilisateur'
      },
      VALIDATION: {
        INVALID: '{{name}} n\'est pas valide',
        REQUIRED: '{{name}} est requis',
        MIN_LENGTH: 'La longueur minimale de {{name}} est {{min}}',
        AGREEMENT_REQUIRED: 'L\'acceptation des termes et conditions est requise',
        NOT_FOUND: 'Le {{name}} demandé n\'est pas trouvé',
        INVALID_LOGIN: 'Les détails de connexion sont incorrects',
        REQUIRED_FIELD: 'Champ obligatoire',
        MIN_LENGTH_FIELD: 'Longueur minimale du champ:',
        MAX_LENGTH_FIELD: 'Longueur maximale du champ:',
        INVALID_FIELD: 'Le champ n\'est pas valide',
      }
    },
    REPORTS: {
      TITLE: 'Rapports disponibles',
      DESC: 'Générer des rapports des demandes enregistrées',
      BUTTON: 'Générer Rapport',
      LOADING: 'Génération du Rapport',
      ADMIN: {
        INSTITUTION: {
          TITLE: 'Institutions',
          DESCRIPTION: 'Rapport des institutions enregistrées.'
        },
        STATE: {
          TITLE: 'Entité Fédérale',
          DESCRIPTION: 'Rapport par entité fédérale.'
        },
        TYPE: {
          TITLE: 'Fédéral ou Décentralisé',
          DESCRIPTION: 'Rapport classé par type d\'institution.'
        }
      },
      COORDINATOR: {
        DEPARTMENT: {
          TITLE: 'Département',
          DESCRIPTION: 'Rapport par département.'
        },
        RESEARCHER: {
          TITLE: 'Chercheurs',
          DESCRIPTION: 'Rapport des chercheurs.'
        },
        ACADEMIC: {
          TITLE: 'Corps Académique',
          DESCRIPTION: 'Rapport du corps académique.'
        },
        PROGRAM: {
          TITLE: 'Programme Éducatif',
          DESCRIPTION: 'Rapport du programme éducatif.'
        },
        DATE: {
          TITLE: 'Date de Demande',
          DESCRIPTION: 'Rapport par date de demande.'
        }
      },
      GUEST: {
        DATE: {
          TITLE: 'Date de Demande',
          DESCRIPTION: 'Rapport par date de demande.'
        },
        TYPE: {
          TITLE: 'Type de Demande',
          DESCRIPTION: 'Rapport par type de demande.'
        },
      },
    },
    ECOMMERCE: {
      COMMON: {
        SELECTED_RECORDS_COUNT: 'Nombre d\'enregistrements sélectionnés: ',
        ALL: 'Tous',
        SUSPENDED: 'Suspendu',
        ACTIVE: 'Actif',
        FILTER: 'Filtre',
        BY_STATUS: 'par Statut',
        BY_TYPE: 'par Type',
        BUSINESS: 'Entreprise',
        INDIVIDUAL: 'Individuel',
        SEARCH: 'Rechercher',
        IN_ALL_FIELDS: 'dans tous les champs'
      },
      ECOMMERCE: 'eCommerce',
      CUSTOMERS: {
        CUSTOMERS: 'Clients',
        CUSTOMERS_LIST: 'Liste des clients',
        NEW_CUSTOMER: 'Nouveau Client',
        DELETE_CUSTOMER_SIMPLE: {
          TITLE: 'Suppression du Client',
          DESCRIPTION: 'Êtes-vous sûr de supprimer définitivement ce client?',
          WAIT_DESCRIPTION: 'Le client est en cours de suppression...',
          MESSAGE: 'Le client a été supprimé'
        },
        DELETE_CUSTOMER_MULTY: {
          TITLE: 'Suppression des Clients',
          DESCRIPTION: 'Êtes-vous sûr de supprimer définitivement les clients sélectionnés?',
          WAIT_DESCRIPTION: 'Les clients sont en cours de suppression...',
          MESSAGE: 'Les clients sélectionnés ont été supprimés'
        },
        UPDATE_STATUS: {
          TITLE: 'Le statut a été mis à jour pour les clients sélectionnés',
          MESSAGE: 'Le statut des clients sélectionnés a été mis à jour avec succès'
        },
        EDIT: {
          UPDATE_MESSAGE: 'Le client a été mis à jour',
          ADD_MESSAGE: 'Le client a été créé'
        }
      }
    },
    KEYWORDS: {
      ABOUT: 'À propos',
      SUPPORT: 'Support',
      THEME: {
        LIGHT: 'Clair',
        DARK: 'Sombre',
        SYSTEM: 'Système'
      },
      MY_PROFILE: 'Mon Profil',
      LANGUAGE: 'Langue',
      SETTINGS: 'Paramètres',
      SIGN_OUT: 'Se Déconnecter',
      LOADING: 'Chargement...',
    },
    ERROR: {
      NOTAVAILABLE: {
        TITLE: "Fonctionnalité non disponible",
        DESCRIPTION: "Désolé, cette fonctionnalité n'est pas disponible en ce moment. Veuillez réessayer plus tard ou contacter le support technique si le problème persiste.",
        BACK_TO_HOME: "Retour à l'accueil"
      },
      NOT_FOUND: {
        TITLE: 'Page non trouvée',
        BODY: 'Nous ne pouvons pas trouver cette page.',
        BACK_TO_HOME: "Retour à l'accueil"
      }
    },
    GUEST: {
      REGISTER: {
        COPYRIGHT: {
          TITLE: 'Droit d\'Auteur',
          DESCRIPTION: 'Protection d\'œuvres littéraires, artistiques, musicales, audiovisuelles et programmes logiciels'
        },
        PATENT: {
          TITLE: 'Brevet',
          DESCRIPTION: 'Protection d\'inventions avec application industrielle'
        },
        UTILITY_MODEL: {
          TITLE: 'Modèle d\'Utilité',
          DESCRIPTION: 'Protection d\'objets, ustensiles ou outils améliorés'
        },
        INDUSTRIAL_DESIGN: {
          TITLE: 'Design Industriel',
          DESCRIPTION: 'Protection de l\'apparence ornementale de produits industriels'
        },
        TRADEMARK: {
          TITLE: 'Marque',
          DESCRIPTION: 'Protection de signes distinctifs commerciaux'
        },
        PLANT_VARIETY: {
          TITLE: 'Variété Végétale',
          DESCRIPTION: 'Protection de nouvelles variétés de plantes'
        },
        INDUSTRIAL_SECRET: {
          TITLE: 'Secrets Industriels',
          DESCRIPTION: 'Protection de secrets commerciaux et d\'informations confidentielles'
        },
        CIRCUIT_MAPPING: {
          TITLE: 'Topographie de Circuits Intégrés',
          DESCRIPTION: 'Protection de designs de circuits électriques'
        }
      }
    },
    USER_REGISTER: {
      TITLE: 'Inscription de Nouveaux Utilisateurs',
      DESCRIPTION: 'Inscrire de nouveaux utilisateurs dans le système. Sélectionnez le type d\'utilisateur que vous souhaitez inscrire et complétez les champs requis.',
      REGISTER: 'S\'inscrire',
      COORDINATOR: {
        TITLE: 'Inscription de Coordinateur',
        DESCRIPTION: 'Inscrire un nouveau coordinateur dans le système.',
      },
      GUEST: {
        TITLE: 'Inscription de Demandeur',
        DESCRIPTION: 'Inscrire un nouveau demandeur dans le système.',
      },
    }
  },
};
