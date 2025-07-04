// Japan
export const locale = {
  lang: 'ja',
  data: {
    BUTTON: {
      NEW: {
        COORDINATOR: 'コーディネーター登録',
        APPLICANT: '申請者登録',
        PATENT: '特許登録',
        TRADEMARK: '商標登録',
        UTILITY_MODEL: '実用新案登録',
        COPYRIGHT: '著作権登録',
        INDUSTRIAL_DESIGN: '意匠登録',
        VEGETAL_VARIETY: '植物品種登録',
        INDUSTRIAL_SECRET: '企業秘密登録',
      },
      CONFIRM: "確認",
      CANCEL: "キャンセル",
      RETURN: "戻る",
      CLOSE: '閉じる',
      DOWNLOAD: 'ダウンロード',
      SEE: '表示',
      PATENT: '特許出願書提出',
      UTILITY_MODEL: '実用新案出願書提出',
      INDUSTRIAL_DESIGN: '意匠出願書提出',
      COPYRIGHT: '著作権出願書提出',
      PROCESSING: '処理中...',
      CONFIRM_LOGOUT: 'ログアウト',
    },
    TABLE: {
      ACTIONS: {
        LABEL: 'アクション',
        EDIT: '編集',
        DELETE: '削除',
        VIEW: '表示'
      },
      APPLICANT_NAME: "申請者",
      WORK_TITLE: "タイトル",
      INSTITUTION: "機関",
      DATE: "申請日",
      PAG_INFO: "_TOTAL_件中 _START_～_END_件を表示",
      PAG_INFO_FILTERED: "（全_MAX_件からフィルタリング）",
      PAG_INFO_EMPTY: "0件中 0～0件を表示",
      PROCESSING: "データ読み込み中",
      EMPTY_TABLE: "レコードが見つかりません",
      PLACEHOLDER_SEARCH: "検索...",
      ZERO_RECORDS: '一致するものが見つかりません',
      TYPE_REQUEST: "申請タイプ",
      STATUS_REQUEST: "ステータス",
      FULL_NAME: "氏名",
      FEDERAL_ENTITY: "連邦実体",
      PHONE: "電話番号",
      REGISTERED_DATE: "登録日",
      TITLE_REQUEST: "タイトル",
      DESCRIPTION_REQUEST: "説明",
      PAGE_LENGTH: {
        LABEL: "表示件数:",
        RECORDS: "件"
      },
      MARK: {
        NAME: '名称',
        IMAGE: 'ロゴ',
        APPLICATION_TYPE: '申請タイプ',
        APPLICANT: '権利者',
        DATE: '出願日'
      }
    },
    MODAL: {
      TITLE: '詳細',
      INFO: {
        TITLE: '読み取り専用情報',
        BODY: '詳細は参考用としてのみ表示されます。'
      },
      FORM: {
        PATENT: {
          NAME: '特許名'
        },
        MARK: {
          NAME: '名称',
          RECORD: 'ファイル',
          IMAGE: 'ロゴ',
          APPLICATION_TYPE: '申請タイプ',
          APPLICANT: '権利者',
          DATE: '出願日',
          DATE_GRANT: '登録日',
          DATE_COMPLETION: '完了日',
          DATE_START: '使用開始日',
          IMAGE_INFO: '商標画像',
          FORMALITIES: {
            LABEL: '手続き',
            ENTRY_FOLIO: '入力番号:',
            YEAR_RECEPTION: '受理年:',
            START_DATE: '開始日:',
            COMPLETION_DATE: '完了日:'
          },
          FORMALITIES_EMPTY: '登録された手続きはありません'
        },
        COPYRIGHT: {
          NAME: '作品名',
        },
        APPLICANT: '申請者',
        EMAIL: 'メールアドレス',
        DATE: '申請日',
        STATUS: 'ステータス',
        FEDERAL_ENTITY: {
          LABEL: '連邦実体',
          OPTIONS_LABEL: '連邦実体を選択'
        },
        INSTITUTION: {
          LABEL: '機関',
          OPTIONS_LABEL: '機関を選択',
        },
        DESCRIPTION: '説明',
        DOCUMENTATION: '文書',
        DOCUMENTATION_EMPTY: '添付文書なし'
      },
      FOLLOW_UP: {
        TITLE: '追跡',
        APPLICATION_ID: '申請ID',
        APPLICANT: '申請者',
        PROGRESS: '進捗',
        HISTORY_TITLE: 'プロセス履歴',
        STATUS: {
          REGISTERED: '登録済み',
          IN_PROCESS: '処理中',
          WITH_OBSERVATIONS: '指摘事項あり',
          APPROVED: '承認済み',
          COMPLETED: '完了'
        },
        STATUS_LABELS: {
          CURRENT: '現在',
          COMPLETED: '完了',
          REQUIRES_ATTENTION: '注意が必要',
          FINISHED: '終了',
          PENDING: '保留中'
        },
        DESCRIPTIONS: {
          REGISTERED: '申請がシステムに正常に登録されました。',
          IN_PROCESS: '申請が審査中です。',
          WITH_OBSERVATIONS: '続行するために修正または追加情報が必要です。',
          APPROVED: '申請が承認されました。',
          COMPLETED: 'プロセスが完了しました。'
        },
        DETAILS: {
          REGISTERED: {
            DESCRIPTION: '申請がシステムに正常に登録されました。',
            DATE_LABEL: '日付:'
          },
          IN_PROCESS: {
            DESCRIPTION: '申請が専門技術チームによって評価されています。',
            EVALUATOR: '評価者: コーディネーター'
          },
          WITH_OBSERVATIONS: {
            DESCRIPTION: '修正または追加情報が必要な事項が見つかりました。',
            DEADLINE: '回答期限: 30営業日'
          },
          APPROVED: {
            DESCRIPTION: '申請が承認され、法的保護が付与されました。',
            PROTECTION: '20年間の保護が付与されました'
          },
          COMPLETED: {
            DESCRIPTION: 'プロセスが完了しました。',
            TITLE_ISSUED: '申請証明書が発行されました'
          }
        },
        BUTTONS: {
          CLOSE: '閉じる',
          NOTIFICATIONS: '通知',
          GENERATE_REPORT: 'レポート生成'
        }
      }
    },
    FORMS: {
      PATENT: {
        TITLE: '発明特許出願 - JPO',
        INFO_1: 'JPOへの特許登録に必要な情報をすべて入力してください。',
        INFO_2: '（*）マークの付いたフィールドはすべて必須です。',
        GENERAL_SECTION: {
          TITLE: '申請者の一般情報',
          APPLICATION_DATE: '申請日',
          APPLICATION_MODE: {
            LABEL: '申請方式',
            SELECT_MODE: '方式を選択',
            ONLINE: 'オンライン（e-JPO）',
            IN_PERSON: '対面（事務所）',
          },
          NAME_COMPANY: {
            LABEL: '氏名 / 会社名',
            PLACEHOLDER: '申請者の氏名または会社名',
          },
          NATIONALITY: {
            LABEL: '国籍',
            PLACEHOLDER: '申請者の国籍',
          },
          EMAIL: {
            LABEL: 'メールアドレス',
            PLACEHOLDER: 'example@domain.com',
          },
          PHONE: '電話番号',
          ADDRESS: {
            LABEL: '住所',
            PLACEHOLDER: '番地、町名、市区町村、都道府県、郵便番号',
          },
          CURP_RFC: {
            PLACEHOLDER: 'マイナンバー（12桁）または法人番号（13桁）',
          },
          INVENTOR_APPLICANT: {
            LABEL: '発明者と申請者は異なりますか？',
            YES: 'はい、異なります',
            NO: 'いいえ、同一人物です',
          },
          ENTITY: {
            LABEL: '都道府県',
            SELECT_ENTITY: '都道府県を選択',
          },
          INSTITUTION: {
            LABEL: '機関',
            SELECT_INSTITUTION: '機関を選択',
          }
        },
        INVENTION_SECTION: {
          TITLE: '発明情報',
          INVENTION_TITLE: {
            LABEL: '発明の名称',
            PLACEHOLDER: '発明の説明的な名称',
          },
          TECHNICAL_FIELD: {
            LABEL: '技術分野',
            PLACEHOLDER: '発明が属する技術分野',
          },
          STATE_TECHNIQUE: {
            LABEL: '従来技術（背景技術）',
            PLACEHOLDER: '既存の解決策、先行特許、関連する科学的出版物とその限界を記述',
          },
          TECHNICAL_PROBLEM: {
            LABEL: '解決すべき技術的課題',
            PLACEHOLDER: '発明が解決しようとする技術的課題を記述',
          },
          INDUSTRIAL_APPLICATION: {
            LABEL: '産業上の利用可能性',
            PLACEHOLDER: '発明が産業や日常生活でどのように利用できるかを記述',
          }
        },
        DETAILED_DESCRIPTION_SECTION: {
          TITLE: '発明の詳細な説明',
          DETAILED_DESCRIPTION: {
            LABEL: '詳細な説明',
            PLACEHOLDER: '発明の動作、特徴、利点を含む完全な説明',
          },
          EXAMPLES_REALIZATION: {
            LABEL: '実施例',
            PLACEHOLDER: '発明をどのように実施できるかの実用的な例',
          },
          CLAIMS: {
            LABEL: '特許請求の範囲',
            PLACEHOLDER: '請求する保護範囲を定義する特定の請求項',
          },
          SUMMARY: {
            LABEL: '要約（150-250語）',
            PLACEHOLDER: '発明とその主要な特徴の簡潔な要約',
          }
        },
        DOCUMENTATION_SECTION: {
          TITLE: '文書',
          IMPI: {
            LABEL: 'JPO公式様式',
            SUB_TEXT: 'JPO公式様式を適切に記入して添付'
          },
          TECHNICAL_DRAWINGS: {
            LABEL: '技術図面または図',
            SUB_TEXT: '発明の理解に必要な技術図面'
          },
          PAYMENT_FEES: {
            LABEL: '手数料支払い証明書',
            SUB_TEXT: 'JPOへの申請手数料の支払い証明書'
          },
          ADDITIONAL_DOCUMENTS: {
            LABEL: '追加文書',
            SUB_TEXT: '委任状、権利譲渡書、翻訳書等（該当する場合）'
          },
          SELECTED_FILES: '選択ファイル:',
        },
        STATEMENTS_SECTION: {
          TITLE: '宣言',
          STATEMENT_1: '私は、この発明が私自身の作業の結果であり、商業で既に存在する他の発明の複製ではないことを宣言します。',
          STATEMENT_2: '私は、提供した情報が正確かつ完全であることを誓って宣言します。',
          INVENTION_PREVIOUSLY: {
            LABEL: '発明は以前に開示されましたか？',
            YES: 'はい、以前に開示されました',
            NO: 'いいえ、開示されていません',
          },
          DISCLOSURE_DETAILS: {
            LABEL: '事前開示の詳細',
            PLACEHOLDER: '発明がどのように、いつ以前に開示されたかを記述',
          },
        },
        ERRORS: {
          APPLICATION_MODE: '申請方式は必須です',
          EMAIL_REQUIRED: 'メールアドレスは必須です',
          EMAIL_INVALID: '有効なメールアドレスを入力してください',
          EMAIL_SIZE_MAX: '100文字を超えることはできません',
          EMAIL_FORMAT: '連続するドットを含むことはできません',
          EMAIL_BLANK: 'スペースを含むことはできません',
          EMAIL_DOMAIN_FORMAT: '無効なドメイン形式',
          PHONE: '電話番号は必須です',
          PHONE_REQUIRED: '携帯電話番号は必須です',
          PHONE_FORMAT: '正確に10桁である必要があります',
          PHONE_FORMAT_NUMBERS: '数字のみ許可されています',
          PHONE_FORMAT_DIGIT: '同じ数字の繰り返しはできません',
          PHONE_FORMAT_DIGIT_VALID: '有効な数字（2-9）で始まる必要があります',
          ADDRESS_REQUIRED: '住所は必須です',
          ADDRESS_MIN_LENGTH: '住所は最低10文字必要です',
          ADDRESS_MAX_LENGTH: '住所は300文字を超えることはできません',
          ADDRESS_SIZE_MIN: '最低10文字必要です',
          ADDRESS_SIZE_MAX: '300文字を超えることはできません',
          ADDRESS_FORMAT: '無効な文字を含んでいます',
          ADDRESS_BLANK: 'スペースのみを含むことはできません',
          ADDRESS_SPACES: 'スペースで始まったり終わったりしてはいけません',
          ENTITY: '都道府県は必須です',
          ENTITY_INSTITUTION: '都道府県と機関を選択する必要があります',
          INSTITUTION: '機関は必須です',
          NAME_REQUIRED: '氏名 / 会社名は必須です',
          NAME_SIZE_MIN: '最低3文字必要です',
          NAME_SIZE_MAX: '200文字を超えることはできません',
          NAME_BLANK: 'スペースのみを含むことはできません',
          NAME_FORMAT: '文字、数字、スペース、基本的な特殊文字のみ許可されています',
          NAME_SPACES: 'スペースで始まったり終わったりしてはいけません',
          NAME_MULTIPLE_SPACES: '複数の連続するスペースを含んではいけません',
          NAME_ONLY_NUMBERS: '数字のみを含むことはできません',
          NAME_ONLY_SPECIAL: '最低でも文字または数字を含む必要があります',
          NATIONALITY_REQUIRED: '国籍は必須です',
          NATIONALITY_SIZE_MIN: '最低4文字必要です',
          NATIONALITY_SIZE_MAX: '50文字を超えることはできません',
          NATIONALITY_FORMAT: '文字のみ許可されています',
          NATIONALITY_BLANK: 'スペースのみを含むことはできません',
          CURP_SIZE_MAX: '無効なマイナンバー形式（12桁）',
          RFC_SIZE_MAX: '無効な法人番号形式（13桁）',
          RFC_CURP_SIZE_MAX: '有効な識別形式が必要です',
          INVENTION_REQUIRED: '発明の名称は必須です',
          INVENTION_MIN_LENGTH: '発明の名称は最低5文字必要です',
          INVENTION_MAX_LENGTH: '発明の名称は500文字を超えることはできません',
          INVENTION_TITLE: '発明の名称',
          TECHNICAL_FIELD_REQUIRED: '技術分野は必須です',
          TECHNICAL_FIELD_MIN_LENGTH: '技術分野は最低20文字必要です',
          TECHNICAL_FIELD_MAX_LENGTH: '技術分野は800文字を超えることはできません',
          TECHNICAL_FIELD: '技術分野',
          STATE_TECHNIQUE_REQUIRED: '従来技術は必須です',
          STATE_TECHNIQUE_MIN_LENGTH: '従来技術は最低50文字必要です',
          STATE_TECHNIQUE_MAX_LENGTH: '従来技術は1500文字を超えることはできません',
          STATE_TECHNIQUE: '従来技術',
          TECHNICAL_PROBLEM_REQUIRED: '技術的課題は必須です',
          TECHNICAL_PROBLEM_MIN_LENGTH: '技術的課題は最低30文字必要です',
          TECHNICAL_PROBLEM_MAX_LENGTH: '技術的課題は1000文字を超えることはできません',
          TECHNICAL_PROBLEM: '技術的課題',
          INDUSTRIAL_APPLICATION_REQUIRED: '産業上の利用可能性は必須です',
          INDUSTRIAL_APPLICATION_MIN_LENGTH: '産業上の利用可能性は最低20文字必要です',
          INDUSTRIAL_APPLICATION_MAX_LENGTH: '産業上の利用可能性は800文字を超えることはできません',
          INDUSTRIAL_APPLICATION: '産業上の利用可能性',
          DETAILED_DESCRIPTION_REQUIRED: '詳細な説明は必須です',
          DETAILED_DESCRIPTION_MIN_LENGTH: '詳細な説明は最低100文字必要です',
          DETAILED_DESCRIPTION_MAX_LENGTH: '詳細な説明は3000文字を超えることはできません',
          DETAILED_DESCRIPTION: '詳細な説明',
          EXAMPLES_REALIZATION_REQUIRED: '実施例は必須です',
          EXAMPLES_REALIZATION_MIN_LENGTH: '実施例は最低50文字必要です',
          EXAMPLES_REALIZATION_MAX_LENGTH: '実施例は2000文字を超えることはできません',
          EXAMPLES_REALIZATION: '実施例',
          CLAIMS_REQUIRED: '特許請求の範囲は必須です',
          CLAIMS_MIN_LENGTH: '特許請求の範囲は最低30文字必要です',
          CLAIMS_MAX_LENGTH: '特許請求の範囲は2000文字を超えることはできません',
          CLAIMS: '特許請求の範囲',
          SUMMARY_REQUIRED: '要約は必須です',
          SUMMARY_MIN_LENGTH: '要約は最低150文字必要です',
          SUMMARY_MAX_LENGTH: '要約は250文字を超えることはできません',
          SUMMARY_SIZE_MIN: '最低150文字必要です',
          SUMMARY_SIZE_MAX: '250文字を超えることはできません',
          SUMMARY_SIZE_MIN_WORDS: '最低25語必要です',
          SUMMARY_SIZE_MAX_WORDS: '50語を超えることはできません',
          DECLARATION_ORIGINALITY: '独創性の宣言を受け入れる必要があります',
          DECLARATION_VERACITY: '真実性の宣言を受け入れる必要があります',
          DISCLOSURE_DETAILS: '開示の詳細',
          FILE_MAX_SIZE_PART_1: 'ファイル ',
          FILE_MAX_SIZE_PART_2: ' は最大許可サイズの10MBを超えています。',
          FILE_FORMAT_PART_2: ' は有効な形式ではありません ',
          REQUIRED: ' は必須です',
          SIZE_MIN: '最低 ',
          SIZE_MAX: '最大 ',
          CHAR: ' 文字',
          SPACES: 'スペースで始まったり終わったりしてはいけません',
          BLANK: 'スペースのみを含むことはできません',
          LETTERS: '最低でもいくつかの文字を含む必要があります',
          SUBMIT: 'リクエストの処理中にエラーが発生しました。もう一度お試しください',
          DOCUMENT_TITLE: '文書不足！',
          IMPI: 'JPO公式様式を添付する必要があります',
          PAYMENT: '手数料支払い証明書を添付する必要があります',
        },
        INFO: {
          SUCCESS: '特許出願がJPOに正常に提出されました',
          CONFIRM: 'OK、理解しました！',
        }
      },
      UTILITY_MODEL: {
        TITLE: '実用新案登録',
        INFO_1: 'JPOへの実用新案登録に必要な情報を入力してください。',
        INFO_2: '実用新案は既存の道具、器具、装置の改良や機能的変更を保護します。',
        GENERAL_SECTION: {
          TITLE: '申請者の一般情報',
          APPLICATION_DATE: '申請日',
          APPLICATION_MODE: {
            LABEL: '申請方式',
            SELECT_MODE: '方式を選択',
            ONLINE: 'オンライン（e-JPO）',
            IN_PERSON: '対面（事務所）',
          },
          NAME_COMPANY: {
            LABEL: '氏名 / 会社名',
            PLACEHOLDER: '氏名または会社名を入力',
          },
          NATIONALITY: {
            LABEL: '国籍',
            PLACEHOLDER: '例：日本',
          },
          EMAIL: {
            LABEL: 'メールアドレス',
            PLACEHOLDER: 'example@email.com',
          },
          PHONE: '携帯電話番号',
          ADDRESS: {
            LABEL: '通知用住所',
            PLACEHOLDER: '番地、町名、市区町村、都道府県、郵便番号',
          },
          CURP_RFC: {
            PLACEHOLDER: '日本の個人または法人の場合',
          },
          INVENTOR_APPLICANT: {
            LABEL: '発明者と申請者は異なりますか？',
            YES: 'はい、異なる人物です',
            NO: 'いいえ、同一人物です',
          },
          ENTITY: {
            LABEL: '都道府県',
            SELECT_ENTITY: '都道府県を選択',
          },
          INSTITUTION: {
            LABEL: '機関',
            SELECT_INSTITUTION: '機関を選択',
          }
        },
        MODEL_SECTION: {
          TITLE: '実用新案情報',
          MODEL_NAME: {
            LABEL: '実用新案の名称',
            PLACEHOLDER: '実用新案の説明的な名称',
          },
          TECHNICAL_FIELD: {
            LABEL: '技術分野',
            PLACEHOLDER: '実用新案が属する技術分野',
          },
          STATE_TECHNIQUE: {
            LABEL: '従来技術（背景技術）',
            PLACEHOLDER: '類似する既存の道具、器具、装置の説明',
          },
          TECHNICAL_PROBLEM: {
            LABEL: '解決すべき技術的課題',
            PLACEHOLDER: '実用新案が解決する不便さや限界',
          },
          INDUSTRIAL_APPLICATION: {
            LABEL: '産業上の利用可能性',
            PLACEHOLDER: '実用新案の実用的な用途と産業応用',
          }
        },
        DETAILED_DESCRIPTION_SECTION: {
          TITLE: '詳細な技術説明',
          DETAILED_DESCRIPTION: {
            LABEL: '改良の詳細な説明',
            PLACEHOLDER: '機能的な修正や改良の明確で詳細な説明',
          },
          EXAMPLES_REALIZATION: {
            LABEL: '実施例',
            PLACEHOLDER: '機能的改良を実施する具体的な方法',
          },
          CLAIMS: {
            LABEL: '実用新案登録請求の範囲',
            PLACEHOLDER: '保護したい新しい機能的特徴',
          },
          SUMMARY: {
            LABEL: '要約（150-250語）',
            PLACEHOLDER: 'JPO公報掲載用の実用新案の簡潔な要約',
          }
        },
        DOCUMENTATION_SECTION: {
          TITLE: '文書',
          IMPI: {
            LABEL: 'JPO公式様式',
            SUB_TEXT: '実用新案登録申請用公式様式'
          },
          TECHNICAL_DRAWINGS: {
            LABEL: '技術図面または図',
            SUB_TEXT: '機能的改良を示す図表、設計図、イラスト'
          },
          PAYMENT_FEES: {
            LABEL: '手数料支払い証明書',
            SUB_TEXT: '申請提出のための手数料支払い証明書'
          },
          ADDITIONAL_DOCUMENTS: {
            LABEL: '追加文書',
            SUB_TEXT: '委任状、権利譲渡書、外国優先権（該当する場合）'
          },
          SELECTED_FILES: '選択ファイル',
        },
        STATEMENTS_SECTION: {
          TITLE: '宣言',
          STATEMENT_1: '私は、この実用新案が私自身の作業の結果であり、商業で既に存在する他の実用新案の複製ではないことを宣言します',
          STATEMENT_2: '私は、提供した情報が真実かつ完全であることを誓って宣言します',
          INVENTION_PREVIOUSLY: {
            LABEL: '発明は以前に開示されましたか？',
            YES: 'はい、以前に開示されました',
            NO: 'いいえ、以前に開示されていません',
          },
          DISCLOSURE_DETAILS: {
            LABEL: '事前開示の詳細',
            PLACEHOLDER: 'どこで、いつ、どのように以前に開示されたかを明記',
          },
        },
        ERRORS: {
          APPLICATION_MODE: '申請方式は必須です',
          NAME_REQUIRED: '氏名 / 会社名は必須です',
          NAME_SIZE_MIN: '最低3文字必要です',
          NAME_SIZE_MAX: '200文字を超えることはできません',
          NAME_FORMAT: '文字、数字、スペース、基本的な特殊文字のみ許可されています',
          NAME_BLANK: 'スペースで始まったり終わったりしてはいけません',
          NAME_MULTIPLE_BLANKS: '複数の連続するスペースを含んではいけません',
          NATIONALITY_REQUIRED: '国籍は必須です',
          NATIONALITY_SIZE_MIN: '最低4文字必要です',
          NATIONALITY_SIZE_MAX: '50文字を超えることはできません',
          NATIONALITY_FORMAT: '文字のみ許可されています',
          EMAIL_REQUIRED: 'メールアドレスは必須です',
          EMAIL_SIZE_MAX: '100文字を超えることはできません',
          EMAIL_INVALID: '有効なメールアドレスを入力してください',
          EMAIL_FORMAT: '連続するドットを含むことはできません',
          EMAIL_BLANK: 'スペースを含むことはできません',
          PHONE_REQUIRED: '携帯電話番号は必須です',
          PHONE_FORMAT: '正確に10桁である必要があります',
          PHONE_FORMAT_NUMBERS: '数字のみ許可されています',
          PHONE_FORMAT_DIGIT: '同じ数字の繰り返しはできません',
          PHONE_FORMAT_DIGIT_VALID: '有効な数字（2-9）で始まる必要があります',
          ADDRESS_REQUIRED: '住所は必須です',
          ADDRESS_SIZE_MIN: '最低10文字必要です',
          ADDRESS_SIZE_MAX: '300文字を超えることはできません',
          ADDRESS_FORMAT: '無効な文字を含んでいます',
          ADDRESS_BLANK: 'スペースのみを含むことはできません',
          ADDRESS_MULTIPLE_BLANKS: 'スペースで始まったり終わったりしてはいけません',
          CURP_SIZE_MAX: '無効なマイナンバー形式（12桁）',
          RFC_SIZE_MAX: '無効な法人番号形式（13桁）',
          RFC_CURP_SIZE_MAX: '有効な識別形式が必要です',
          ENTITY: '都道府県は必須です',
          INSTITUTION: '機関は必須です',
          MODEL_NAME_REQUIRED: '実用新案の名称は必須です',
          TECHNICAL_FIELD_REQUIRED: '技術分野は必須です',
          STATE_TECHNIQUE_REQUIRED: '従来技術は必須です',
          TECHNICAL_PROBLEM_REQUIRED: '技術的課題は必須です',
          INDUSTRIAL_APPLICATION_REQUIRED: '産業上の利用可能性は必須です',
          DETAILED_DESCRIPTION_REQUIRED: '詳細な説明は必須です',
          EXAMPLES_REALIZATION_REQUIRED: '実施例は必須です',
          CLAIMS_REQUIRED: '実用新案登録請求の範囲は必須です',
          SUMMARY_REQUIRED: '要約は必須です',
          SUMMARY_SIZE_MIN: '最低150文字必要です',
          SUMMARY_SIZE_MIN_WORDS: '最低25語必要です',
          SUMMARY_SIZE_MAX: '250文字を超えることはできません',
          SUMMARY_SIZE_MAX_WORDS: '50語を超えることはできません',
          DECLARATION_ORIGINALITY: '独創性の宣言を受け入れる必要があります',
          DECLARATION_VERACITY: '真実性の宣言を受け入れる必要があります',
          ENTITY_INSTITUTION: '都道府県と機関を選択する必要があります',
          FILE_MAX_SIZE_PART_1: 'ファイル ',
          FILE_MAX_SIZE_PART_2: ' は最大許可サイズの10MBを超えています。',
          FILE_FORMAT_PART_2: ' は有効な形式ではありません ',
          REQUIRED: ' は必須です',
          SIZE_MIN: '最低 ',
          SIZE_MAX: '最大 ',
          CHAR: ' 文字',
          BLANKS: 'スペースで始まったり終わったりしてはいけません',
          BLANK: 'スペースのみを含むことはできません',
          LETTERS: '最低でもいくつかの文字を含む必要があります',
          UTILITY_MODEL: '実用新案の名称',
          TECHNICAL_FIELD: '技術分野',
          STATE_TECHNIQUE: '従来技術',
          TECHNICAL_PROBLEM: '技術的課題',
          INDUSTRIAL_APPLICATION: '産業上の利用可能性',
          DETAILED_DESCRIPTION: '詳細な説明',
          EXAMPLES_REALIZATION: '実施例',
          CLAIMS: '実用新案登録請求の範囲',
          SUBMIT: 'リクエストの処理中にエラーが発生しました。もう一度お試しください',
          DOCUMENT_TITLE: '文書不足！',
          IMPI: 'JPO公式様式を添付する必要があります',
          PAYMENT: '手数料支払い証明書を添付する必要があります',
        },
        INFO: {
          SUCCESS: '実用新案申請が正常に提出されました',
          CONFIRM: '理解しました！',
        }
      },
      INDUSTRIAL_DESIGN: {
        TITLE: '意匠登録出願 - JPO',
        INFO_1: 'JPOへの意匠登録に必要な情報をすべて入力してください。',
        INFO_2: '（*）マークの付いたフィールドはすべて必須です。',
        GENERAL_SECTION: {
          TITLE: '申請者の一般情報',
          APPLICATION_DATE: '申請日',
          APPLICATION_MODE: {
            LABEL: '申請方式',
            SELECT_MODE: '方式を選択',
            ONLINE: 'オンライン（e-JPO）',
            IN_PERSON: '対面（事務所）',
          },
          NAME_COMPANY: {
            LABEL: '氏名 / 会社名',
            PLACEHOLDER: '申請者の氏名または会社名',
          },
          NATIONALITY: {
            LABEL: '国籍',
            PLACEHOLDER: '申請者の国籍',
          },
          EMAIL: {
            LABEL: 'メールアドレス',
            PLACEHOLDER: 'example@domain.com',
          },
          PHONE: '電話番号',
          ADDRESS: {
            LABEL: '住所',
            PLACEHOLDER: '番地、町名、市区町村、都道府県、郵便番号',
          },
          CURP_RFC: {
            PLACEHOLDER: 'マイナンバー（12桁）または法人番号（13桁）',
          },
          DESIGNER_APPLICANT: {
            LABEL: '創作者と申請者は異なりますか？',
            YES: 'はい、異なります',
            NO: 'いいえ、同一人物です',
          },
          ENTITY: {
            LABEL: '都道府県',
            SELECT_ENTITY: '都道府県を選択',
          },
          INSTITUTION: {
            LABEL: '機関',
            SELECT_INSTITUTION: '機関を選択',
          }
        },
        DESIGN_SECTION: {
          TITLE: '意匠情報',
          DESIGN_NAME: {
            LABEL: '意匠の名称',
            PLACEHOLDER: '意匠の説明的な名称',
          },
          DESIGN_TYPE: {
            LABEL: '意匠の種類',
            SELECT_TYPE: '意匠の種類を選択',
            INDUSTRIAL_MODEL: '工業模型',
            INDUSTRIAL_DRAWING: '工業図案',
          },
          PRODUCT_CLASS: {
            LABEL: '物品の分類',
            PLACEHOLDER: '意匠が適用される物品の分類を指定',
          }
        },
        TECHNICAL_DESCRIPTION_SECTION: {
          TITLE: '意匠の技術的説明',
          NEW_ELEMENTS: {
            LABEL: '新規または独創的要素の説明',
            PLACEHOLDER: '意匠の新規または独創的要素を詳細に記述',
          },
          VISUAL_CHARACTERISTICS: {
            LABEL: '特徴的な視覚的特性',
            PLACEHOLDER: '意匠を特徴づける視覚的特性（形状、色彩、質感等）を記述',
          },
          GENERAL_DESCRIPTION: {
            LABEL: '意匠の一般的説明',
            PLACEHOLDER: '意匠の完全で詳細な説明を提供',
          },
          SUMMARY: {
            LABEL: '要約（150-250語）',
            PLACEHOLDER: 'JPO公報掲載用の意匠の簡潔な要約',
          }
        },
        DOCUMENTATION_SECTION: {
          TITLE: '文書',
          VIEWS_INFO: {
            TITLE: '意匠に必要な図',
            DESCRIPTION: '技術図面には、物品の斜視図、正面図、側面図、背面図、上面図、底面図を含める必要があります。',
          },
          IMPI: {
            LABEL: 'JPO公式様式',
            SUB_TEXT: '意匠登録申請用公式様式'
          },
          TECHNICAL_DRAWINGS: {
            LABEL: '技術図面と意匠の図',
            SUB_TEXT: '斜視図、正面図、側面図、背面図、上面図、底面図を含む'
          },
          PAYMENT_FEES: {
            LABEL: '手数料支払い証明書',
            SUB_TEXT: '申請提出のための手数料支払い証明書'
          },
          ADDITIONAL_DOCUMENTS: {
            LABEL: '追加文書',
            SUB_TEXT: '委任状、権利譲渡書、外国優先権（該当する場合）'
          },
          SELECTED_FILES: '選択ファイル',
        },
        STATEMENTS_SECTION: {
          TITLE: '宣言',
          STATEMENT_1: '私は、この意匠が私自身の作業の結果であり、商業で既に存在する他の意匠の複製ではないことを宣言します',
          STATEMENT_2: '私は、提供した情報が正確かつ完全であることを誓って宣言します',
          DESIGN_PREVIOUSLY: {
            LABEL: '意匠は以前に開示されましたか？',
            YES: 'はい、以前に開示されました',
            NO: 'いいえ、開示されていません',
          },
          DISCLOSURE_DETAILS: {
            LABEL: '事前開示の詳細',
            PLACEHOLDER: '意匠がどのように、いつ以前に開示されたかを記述',
          },
        },
        ERRORS: {
          APPLICATION_MODE: '申請方式は必須です',
          NAME_REQUIRED: '氏名 / 会社名は必須です',
          NAME_SIZE_MIN: '最低3文字必要です',
          NAME_SIZE_MAX: '200文字を超えることはできません',
          NAME_FORMAT: '文字、数字、スペース、基本的な特殊文字のみ許可されています',
          NAME_SPACES: 'スペースで始まったり終わったりしてはいけません',
          NAME_MULTIPLE_SPACES: '複数の連続するスペースを含んではいけません',
          NATIONALITY_REQUIRED: '国籍は必須です',
          NATIONALITY_SIZE_MIN: '最低4文字必要です',
          NATIONALITY_SIZE_MAX: '50文字を超えることはできません',
          NATIONALITY_FORMAT: '文字のみ許可されています',
          EMAIL_REQUIRED: 'メールアドレスは必須です',
          EMAIL_SIZE_MAX: '100文字を超えることはできません',
          EMAIL_INVALID: '有効なメールアドレスを入力してください',
          EMAIL_FORMAT: '連続するドットを含むことはできません',
          EMAIL_BLANK: 'スペースを含むことはできません',
          PHONE_REQUIRED: '携帯電話番号は必須です',
          PHONE_FORMAT: '正確に10桁である必要があります',
          PHONE_FORMAT_NUMBERS: '数字のみ許可されています',
          PHONE_FORMAT_DIGIT: '同じ数字の繰り返しはできません',
          PHONE_FORMAT_DIGIT_VALID: '有効な数字（2-9）で始まる必要があります',
          ADDRESS_REQUIRED: '住所は必須です',
          ADDRESS_SIZE_MIN: '最低10文字必要です',
          ADDRESS_SIZE_MAX: '300文字を超えることはできません',
          ADDRESS_FORMAT: '無効な文字を含んでいます',
          ADDRESS_BLANK: 'スペースのみを含むことはできません',
          ADDRESS_SPACES: 'スペースで始まったり終わったりしてはいけません',
          CURP_SIZE_MAX: '無効なマイナンバー形式（12桁）',
          RFC_SIZE_MAX: '無効な法人番号形式（13桁）',
          RFC_CURP_SIZE_MAX: '有効な識別形式が必要です',
          ENTITY: '都道府県は必須です',
          INSTITUTION: '機関は必須です',
          DESIGN_NAME_REQUIRED: '意匠の名称は必須です',
          DESIGN_TYPE_REQUIRED: '意匠の種類は必須です',
          PRODUCT_CLASS_REQUIRED: '物品の分類は必須です',
          NEW_ELEMENTS_REQUIRED: '新規または独創的要素は必須です',
          VISUAL_CHARACTERISTICS_REQUIRED: '特徴的な視覚的特性は必須です',
          GENERAL_DESCRIPTION_REQUIRED: '一般的説明は必須です',
          SUMMARY_REQUIRED: '要約は必須です',
          SUMMARY_SIZE_MIN: '最低150文字必要です',
          SUMMARY_SIZE_MIN_WORDS: '最低25語必要です',
          SUMMARY_SIZE_MAX: '250文字を超えることはできません',
          SUMMARY_SIZE_MAX_WORDS: '50語を超えることはできません',
          DECLARATION_ORIGINALITY: '独創性の宣言を受け入れる必要があります',
          DECLARATION_VERACITY: '真実性の宣言を受け入れる必要があります',
          ENTITY_INSTITUTION: '都道府県と機関を選択する必要があります',
          FILE_MAX_SIZE_PART_1: 'ファイル ',
          FILE_MAX_SIZE_PART_2: ' は最大許可サイズの10MBを超えています。',
          FILE_FORMAT_PART_2: ' は有効な形式ではありません ',
          REQUIRED: ' は必須です',
          SIZE_MIN: '最低 ',
          SIZE_MAX: '最大 ',
          CHAR: ' 文字',
          SPACES: 'スペースで始まったり終わったりしてはいけません',
          BLANK: 'スペースのみを含むことはできません',
          LETTERS: '最低でもいくつかの文字を含む必要があります',
          DESIGN_NAME: '意匠の名称',
          PRODUCT_CLASS: '物品の分類',
          NEW_ELEMENTS: '新規または独創的要素',
          VISUAL_CHARACTERISTICS: '特徴的な視覚的特性',
          GENERAL_DESCRIPTION: '一般的説明',
          SUBMIT: 'リクエストの処理中にエラーが発生しました。もう一度お試しください',
          DOCUMENT_TITLE: '文書不足！',
          IMPI: 'JPO公式様式を添付する必要があります',
          PAYMENT: '手数料支払い証明書を添付する必要があります',
          TECHNICAL_DRAWINGS: '意匠の技術図面と図を添付する必要があります',
        },
        INFO: {
          SUCCESS: '意匠申請がJPOに正常に提出されました',
          CONFIRM: 'OK、理解しました！',
        }
      },
      COPYRIGHT: {
        TITLE: '著作権登録申請 - 文化庁',
        INFO_1: '文化庁への著作権登録に必要な情報をすべて入力してください。',
        INFO_2: '（*）マークの付いたフィールドはすべて必須です。',
        GENERAL_SECTION: {
          TITLE: '申請者の一般情報',
          APPLICATION_DATE: '申請日',
          APPLICATION_MODE: {
            LABEL: '申請方式',
            SELECT_MODE: '方式を選択',
            ONLINE: 'オンライン（e-文化庁）',
            IN_PERSON: '対面（事務所）',
          },
          WORK_TITLE: {
            LABEL: '登録する著作物の題名',
            PLACEHOLDER: '著作物の完全な題名を入力',
          },
          NAME_COMPANY: {
            LABEL: '氏名 / 会社名',
            PLACEHOLDER: '申請者の氏名または会社名',
          },
          NATIONALITY: {
            LABEL: '国籍',
            PLACEHOLDER: '申請者の国籍',
          },
          EMAIL: {
            LABEL: 'メールアドレス',
            PLACEHOLDER: 'example@domain.com',
          },
          PHONE: '携帯電話番号',
          ADDRESS: {
            LABEL: '通知用住所',
            PLACEHOLDER: '番地、町名、市区町村、都道府県、郵便番号',
          },
          CURP_RFC: {
            PLACEHOLDER: 'マイナンバー（12桁）または法人番号（13桁）',
          },
          AUTHOR_NAME: {
            LABEL: '著作者名（異なる場合）',
            PLACEHOLDER: '著作者が同一申請者の場合は空白のまま',
          },
          ENTITY: {
            LABEL: '都道府県',
            SELECT_ENTITY: '都道府県を選択',
          },
          INSTITUTION: {
            LABEL: '機関',
            SELECT_INSTITUTION: '機関を選択',
          }
        },
        WORK_SECTION: {
          TITLE: '著作物情報',
          BRANCH: {
            LABEL: '著作物の分野',
            SELECT_BRANCH: '著作物の分野を選択',
            OPTIONS: {
              LITERARY: '文芸',
              MUSICAL_WITH_LYRICS: '歌詞付き音楽',
              MUSICAL_WITHOUT_LYRICS: '歌詞なし音楽',
              DRAMATIC: '演劇',
              DANCE: '舞踊',
              PICTORIAL: '絵画',
              DRAWING: '図画',
              SCULPTURAL: '彫刻',
              PLASTIC_CHARACTER: '造形的性格',
              CARICATURE: '漫画',
              COMIC: 'コミック',
              ARCHITECTURAL: '建築',
              CINEMATOGRAPHIC: '映画',
              AUDIOVISUAL: '映像',
              RADIO_PROGRAM: 'ラジオ番組',
              TV_PROGRAM: 'テレビ番組',
              COMPUTER_PROGRAM: 'コンピュータプログラム',
              PHOTOGRAPHIC: '写真',
              APPLIED_ART: '応用美術',
              DATABASE: 'データベース',
            }
          },
          IS_DERIVED: {
            LABEL: '二次的著作物ですか？',
            NO: 'いいえ',
            YES: 'はい',
          },
          DERIVED_TYPE: {
            LABEL: '二次的著作物の種類',
            SELECT_TYPE: '二次的著作物の種類を選択',
            OPTIONS: {
              AMPLIFICATION: '拡大',
              TRANSLATION: '翻訳',
              ARRANGEMENT: '編曲',
              COMPENDIUM: '要約',
              ADAPTATION: '翻案',
              PARAPHRASE: '言い換え',
              COMPILATION: '編集',
              TRANSFORMATION: '変形',
              COLLECTION: '収集',
            }
          },
          ORIGINAL_WORK_DATA: {
            LABEL: '原著作物のデータ',
            PLACEHOLDER: 'この著作物の基となった原著作物のデータを提供',
          },
          DESCRIPTION: {
            LABEL: '著作物の説明',
            PLACEHOLDER: '著作物の詳細な説明、その目的、主要な特徴、内容',
          }
        },
        EXEMPLAR_SECTION: {
          TITLE: '著作物の見本',
          TYPE_LABEL: '見本の種類',
          SOURCE_CODE: 'ソースコード（最初と最後の10ページ）',
          URL_WORK: 'リポジトリ/データベース/コンピュータプログラムの完全な著作物URL',
          SYNTHESIS: '著作物の概要',
          URL_FIELD: {
            LABEL: '著作物のURL',
            PLACEHOLDER: 'https://example.com/my-work',
          },
          SYNTHESIS_FIELD: {
            LABEL: '著作物の概要',
            PLACEHOLDER: '著作物の簡潔な概要を提供',
          }
        },
        DOCUMENTATION_SECTION: {
          TITLE: '文書',
          INDAUTOR_FORMAT: {
            LABEL: '文化庁公式様式',
            SUB_TEXT: '適切な様式を添付',
          },
          OFFICIAL_ID: {
            LABEL: '公的身分証明書',
            PLACEHOLDER: '運転免許証、パスポート、専門資格証明書、その他の公的身分証明書',
          },
          OWNERSHIP_DOCUMENT: {
            LABEL: '権利証明書',
            SUB_TEXT: '契約書、権利譲渡書、定款（該当する場合）',
          },
          PAYMENT_RECEIPT: {
            LABEL: '支払い証明書',
            SUB_TEXT: '文化庁への登録手数料の支払い証明書',
          },
          WORK_EXEMPLAR: {
            LABEL: '著作物の見本',
            SUB_TEXT: '著作物のデジタルファイル（ソースコード、文書等）',
          },
          ADDITIONAL_DOCUMENTS: {
            LABEL: '追加文書',
            SUB_TEXT: '翻訳書、委任状、その他の文書（該当する場合）',
          },
          SELECTED_FILES: '選択ファイル',
        },
        STATEMENTS_SECTION: {
          TITLE: '宣言',
          STATEMENT_1: '私は、この著作物が私自身の独創的な作品の結果であり、第三者の権利を侵害しないことを宣言します',
          STATEMENT_2: '私は、提供した情報が正確かつ完全であることを誓って宣言します',
          STATEMENT_3: '私は、この著作物の著作権者であるか、相応の許可を得ていることを宣言します',
        },
        ERRORS: {
          APPLICATION_MODE: '申請方式は必須です',
          WORK_TITLE_REQUIRED: '著作物の題名は必須です',
          WORK_TITLE_MIN_LENGTH: '題名は最低5文字必要です',
          WORK_TITLE_MAX_LENGTH: '題名は500文字を超えることはできません',
          WORK_TITLE_SPACES: 'スペースで始まったり終わったりしてはいけません',
          WORK_TITLE_BLANK: 'スペースのみを含むことはできません',
          NAME_REQUIRED: '氏名 / 会社名は必須です',
          NAME_SIZE_MIN: '最低3文字必要です',
          NAME_SIZE_MAX: '200文字を超えることはできません',
          NAME_FORMAT: '文字、数字、スペース、基本的な特殊文字のみ許可されています',
          NAME_SPACES: 'スペースで始まったり終わったりしてはいけません',
          NAME_MULTIPLE_SPACES: '複数の連続するスペースを含んではいけません',
          NATIONALITY_REQUIRED: '国籍は必須です',
          NATIONALITY_SIZE_MIN: '最低4文字必要です',
          NATIONALITY_SIZE_MAX: '50文字を超えることはできません',
          NATIONALITY_FORMAT: '文字のみ許可されています',
          EMAIL_REQUIRED: 'メールアドレスは必須です',
          EMAIL_SIZE_MAX: '100文字を超えることはできません',
          EMAIL_INVALID: '有効なメールアドレスを入力してください',
          EMAIL_FORMAT: '連続するドットを含むことはできません',
          EMAIL_BLANK: 'スペースを含むことはできません',
          PHONE_REQUIRED: '携帯電話番号は必須です',
          PHONE_FORMAT: '正確に10桁である必要があります',
          PHONE_FORMAT_NUMBERS: '数字のみ許可されています',
          PHONE_FORMAT_DIGIT: '同じ数字の繰り返しはできません',
          PHONE_FORMAT_DIGIT_VALID: '有効な数字（2-9）で始まる必要があります',
          ADDRESS_REQUIRED: '住所は必須です',
          ADDRESS_SIZE_MIN: '最低10文字必要です',
          ADDRESS_SIZE_MAX: '300文字を超えることはできません',
          ADDRESS_FORMAT: '無効な文字を含んでいます',
          ADDRESS_BLANK: 'スペースのみを含むことはできません',
          ADDRESS_SPACES: 'スペースで始まったり終わったりしてはいけません',
          CURP_SIZE_MAX: '無効なマイナンバー形式（12桁）',
          RFC_SIZE_MAX: '無効な法人番号形式（13桁）',
          RFC_CURP_SIZE_MAX: '有効な識別形式が必要です',
          ENTITY: '都道府県は必須です',
          INSTITUTION: '機関は必須です',
          BRANCH_REQUIRED: '著作物の分野は必須です',
          DERIVED_TYPE_REQUIRED: '二次的著作物の種類は必須です',
          DESCRIPTION_REQUIRED: '説明は必須です',
          DESCRIPTION_SIZE_MIN: '最低20文字必要です',
          DESCRIPTION_SIZE_MAX: '2000文字を超えることはできません',
          DESCRIPTION_SPACES: 'スペースで始まったり終わったりしてはいけません',
          DESCRIPTION_BLANK: 'スペースのみを含むことはできません',
          DECLARATION_ORIGINALITY: '独創性の宣言を受け入れる必要があります',
          DECLARATION_VERACITY: '真実性の宣言を受け入れる必要があります',
          DECLARATION_OWNERSHIP: '権利の宣言を受け入れる必要があります',
          ENTITY_INSTITUTION: '都道府県と機関を選択する必要があります',
          FILE_MAX_SIZE_PART_1: 'ファイル ',
          FILE_MAX_SIZE_PART_2: ' は最大許可サイズの10MBを超えています。',
          FILE_FORMAT_PART_2: ' は有効な形式ではありません ',
          DOCUMENT_TITLE: '文書不足！',
          INDAUTOR_FORMAT: '適切な文化庁公式様式を添付する必要があります',
          SUBMIT: 'リクエストの処理中にエラーが発生しました。もう一度お試しください',
        },
        INFO: {
          SUCCESS: '著作権申請が文化庁に正常に提出されました',
          CONFIRM: 'OK、理解しました！',
        }
      },
    },
    ALERT: {
      DELETE: {
        TITLE: "このレコードを削除してもよろしいですか？",
        BODY: "この操作は取り消すことができません",
        SUCCESS: "レコードが削除されました"
      },
      LOGOUT: {
        TITLE: "ログアウトしてもよろしいですか？",
        SUCCESS: "正常にログアウトしました"
      }
    },
    GRAPHICS: {
      TITLES: {
        REQUEST_TYPES: "申請タイプ",
        REQUEST: "申請",
        DEPARTMENTS: "部門",
        EDUCATIONAL_PROGRAM: "教育プログラム",
        RESEARCHERS: "研究者",
        RESEARCHER: "研究者",
        DEPARTMENT: "部門",
        FEDERAL_INSTITUTIONS: "連邦機関",
        CENTRALIZED_INSTITUTIONS: "分散機関",
        APPLICATION_TYPE: "申請タイプ",
        FEDERAL_ENTITIES: "連邦実体",
      },
      SUBTITLES: {
        REGISTER: "記録",
        MONTHS: "月（2025年）",
        YEARS: "年（2019-2024年）",
        TOP_3: "トップ3",
        TOP_5: "トップ5",
      },
      LEGENDS: {
        NO_FEDERAL_ENTITIES: "記録のある連邦実体はありません。",
        NO_FEDERAL_INSTITUTIONS: "記録のある連邦機関はありません。",
        NO_CENTRALIZED_INSTITUTIONS: "記録のある分散機関はありません。",
        TOTAL_APPLICATIONS: '総申請数',
        HOVER_APPLICATIONS: '申請',
        ACRONYM: {
          MONTHS: {
            APRIL: '4月'
          }
        }
      },
      OPTIONS_FILTER: {
        TITLE: 'フィルターオプション',
        LABEL: '時間:',
        OPTIONS: {
          MONTHS: '月',
          YEARS: '年',
        }
      },
    },
    DEPARTMENTS: {
      IT: "コンピュータシステム",
      MECHANIC: "金属機械",
      CHEMISTRY: "化学",
    },
    ACRONYM: {
      PATENTS: "特許",
      TRADEMARKS: "商標",
      UTILITY_MODELS: '実新',
      COPYRIGHTS: '著権',
      INDUSTRIAL_DESIGNS: '意匠',
      VEGETAL_VARIETIES: '植品',
      INDUSTRIAL_SECRETS: '企秘'
    },
    ACADEMIC_LEVEL: {
      DOCTOR_CS: "コンピュータサイエンス博士",
      MASTER_CS: "コンピュータシステム修士",
      MASTER_CSIENCE: "コンピュータサイエンス修士"
    },
    EDUCATIONAL_PROGRAM: {
      SYSTEMS: "コンピュータシステム",
      INFORMATICS: "情報学",
      DATA_SCIENCE: "データサイエンス"
    },
    TRANSLATOR: {
      SELECT: '言語を選択してください',
      LANGUAGES: {
        ENGLISH: '英語',
        MANDARIN: '中国語',
        SPANISH: 'スペイン語',
        JAPANESE: '日本語',
        GERMAN: 'ドイツ語',
        FRENCH: 'フランス語'
      }
    },
    MENU: {
      NEW: '新しい',
      ACTIONS: '行動',
      CREATE_POST: '新しい投稿を作成',
      PAGES: 'ページ',
      FEATURES: '特徴',
      APPS: 'アプリ',
      DASHBOARD: 'ダッシュボード',
      REGISTERS: '記録',
      USERS: 'ユーザー',
      INTELECTUAL_PROPERTIES: '知的財産',
      REPORTS: 'レポート',
      HELP: 'ヘルプ',
      ADMIN: {
        MANAGEMENT: '管理',
        COORDINATORS: 'コーディネーター',
        APPLICANTS: '申請者',
        INTELECTUAL_PROPERTY: '知的財産',
        PATENTS: '特許',
        TRADEMARKS: '商標',
        UTILITY_MODELS: '実用新案',
        COPYRIGHTS: '著作権',
        INDUSTRIAL_DESIGNS: '意匠',
        VEGETAL_VARIETIES: '植物品種',
        INDUSTRIAL_SECRETS: '企業秘密',
        HELP: 'ヘルプセンター'
      },
      COORD: {
        APPLICANTS: '申請者',
        COPYRIGHTS: '著作権',
        INDUSTRIAL_DESIGNS: '意匠',
        INTELECTUAL_PROPERTY: '知的財産',
        MANAGEMENT: '管理',
        PATENTS: '特許',
        TRADEMARKS: '商標',
        UTILITY_MODELS: '実用新案',
        VEGETAL_VARIETIES: '植物品種',
        INDUSTRIAL_SECRETS: '企業秘密',
        HELP: 'ヘルプセンター'
      },
      APPLICANT: {
        MYREQUESTS: '私の申請',
        REQUESTS: '申請',
        REPORTS: 'レポート',
        REGISTER: "登録",
        HELP: 'ヘルプセンター'
      },
    },
    AUTH: {
      GENERAL: {
        OR: 'または',
        SUBMIT_BUTTON: '提出する',
        NO_ACCOUNT: 'アカウントをお持ちでないですか？',
        SIGNUP_BUTTON: 'サインアップ',
        FORGOT_BUTTON: 'パスワードをお忘れですか？',
        BACK_BUTTON: '戻る',
        CANCEL_BUTTON: 'キャンセル',
        PRIVACY: 'プライバシー',
        LEGAL: '法的',
        TERMS: '利用規約',
        CONTACT: 'お問い合わせ',
        PLANS: 'プラン',
        ACCEPT_PRIVACY: '入力することで{{value}}を受け入れます',
      },
      LOGIN: {
        TITLE: 'ログイン',
        CEPPI: '知的財産特許センター',
        BUTTON: 'ログイン',
        ERROR: '認証情報が正しくありません',
        EPASSWORD: '最低6文字',
        ERROR_DETAIL: 'ユーザー名とパスワードを確認してください',
        USERNAME: 'ユーザー名',
        PASSWORD: 'パスワード',
        LOADING: 'お待ちください',
      },
      FORGOT: {
        TITLE: 'パスワードをお忘れですか？',
        DESC: 'パスワードをリセットするためにメールアドレスを入力してください',
        SUCCESS: 'パスワードリセットが送信されました',
        ERROR: '申し訳ありませんが、もう一度お試しください',
        SENDING: '送信中',
        EMAIL: {
          LABEL: 'メールアドレス',
          PLACEHOLDER: 'example@domain.jp',
          REQUIRED: '必須フィールド',
          INVALID: '有効なメールアドレスを入力してください'
        },
      },
      PRIVACY: {
        TITLE: 'プライバシー通知',
        CONTENT: 'プライバシー通知の完全なテキスト',
        ACCEPT: '同意する'
      },
      REGISTER: {
        TITLE: 'サインアップ',
        DESC: 'アカウントを作成するために詳細を入力してください',
        SUCCESS: 'アカウントが正常に登録されました。'
      },
      INPUT: {
        EMAIL: 'メールアドレス',
        FULLNAME: '氏名',
        PASSWORD: 'パスワード',
        CONFIRM_PASSWORD: 'パスワード確認',
        USERNAME: 'ユーザー名'
      },
      VALIDATION: {
        INVALID: '{{name}}は有効ではありません',
        REQUIRED: '{{name}}は必須です',
        MIN_LENGTH: '{{name}}の最小長は{{min}}です',
        AGREEMENT_REQUIRED: '利用規約の同意が必要です',
        NOT_FOUND: '要求された{{name}}が見つかりません',
        INVALID_LOGIN: 'ログイン詳細が正しくありません',
        REQUIRED_FIELD: '必須フィールド',
        MIN_LENGTH_FIELD: 'フィールドの最小長:',
        MAX_LENGTH_FIELD: 'フィールドの最大長:',
        INVALID_FIELD: 'フィールドが有効ではありません',
      }
    },
    REPORTS: {
      TITLE: '利用可能なレポート',
      DESC: '登録された申請のレポートを生成',
      BUTTON: 'レポート生成',
      LOADING: 'レポート生成中',
      ADMIN: {
        INSTITUTION: {
          TITLE: '機関',
          DESCRIPTION: '登録された機関のレポート。'
        },
        STATE: {
          TITLE: '連邦実体',
          DESCRIPTION: '連邦実体別のレポート。'
        },
        TYPE: {
          TITLE: '連邦または分散',
          DESCRIPTION: '機関の種類別に分類されたレポート。'
        }
      },
      COORDINATOR: {
        DEPARTMENT: {
          TITLE: '部門',
          DESCRIPTION: '部門別のレポート。'
        },
        RESEARCHER: {
          TITLE: '研究者',
          DESCRIPTION: '研究者のレポート。'
        },
        ACADEMIC: {
          TITLE: '学術団体',
          DESCRIPTION: '学術団体のレポート。'
        },
        PROGRAM: {
          TITLE: '教育プログラム',
          DESCRIPTION: '教育プログラムのレポート。'
        },
        DATE: {
          TITLE: '申請日',
          DESCRIPTION: '申請日別のレポート。'
        }
      },
      GUEST: {
        DATE: {
          TITLE: '申請日',
          DESCRIPTION: '申請日別のレポート。'
        },
        TYPE: {
          TITLE: '申請タイプ',
          DESCRIPTION: '申請タイプ別のレポート。'
        },
      },
    },
    ECOMMERCE: {
      COMMON: {
        SELECTED_RECORDS_COUNT: '選択されたレコード数: ',
        ALL: 'すべて',
        SUSPENDED: '停止中',
        ACTIVE: 'アクティブ',
        FILTER: 'フィルター',
        BY_STATUS: 'ステータス別',
        BY_TYPE: 'タイプ別',
        BUSINESS: 'ビジネス',
        INDIVIDUAL: '個人',
        SEARCH: '検索',
        IN_ALL_FIELDS: 'すべてのフィールド'
      },
      ECOMMERCE: 'eコマース',
      CUSTOMERS: {
        CUSTOMERS: '顧客',
        CUSTOMERS_LIST: '顧客リスト',
        NEW_CUSTOMER: '新規顧客',
        DELETE_CUSTOMER_SIMPLE: {
          TITLE: '顧客削除',
          DESCRIPTION: 'この顧客を完全に削除してもよろしいですか？',
          WAIT_DESCRIPTION: '顧客を削除中...',
          MESSAGE: '顧客が削除されました'
        },
        DELETE_CUSTOMER_MULTY: {
          TITLE: '顧客削除',
          DESCRIPTION: '選択した顧客を完全に削除してもよろしいですか？',
          WAIT_DESCRIPTION: '顧客を削除中...',
          MESSAGE: '選択した顧客が削除されました'
        },
        UPDATE_STATUS: {
          TITLE: '選択した顧客のステータスが更新されました',
          MESSAGE: '選択した顧客のステータスが正常に更新されました'
        },
        EDIT: {
          UPDATE_MESSAGE: '顧客が更新されました',
          ADD_MESSAGE: '顧客が作成されました'
        }
      }
    },
    KEYWORDS: {
      ABOUT: 'について',
      SUPPORT: 'サポート',
      THEME: {
        LIGHT: 'ライト',
        DARK: 'ダーク',
        SYSTEM: 'システム'
      },
      MY_PROFILE: 'マイプロファイル',
      LANGUAGE: '言語',
      SETTINGS: '設定',
      SIGN_OUT: 'ログアウト',
      LOADING: '読み込み中...',
    },
    ERROR: {
      NOTAVAILABLE: {
        TITLE: "機能が利用できません",
        DESCRIPTION: "申し訳ありませんが、この機能は現在利用できません。後でもう一度お試しいただくか、問題が続く場合は技術サポートにお問い合わせください。",
        BACK_TO_HOME: "ホームに戻る"
      },
      NOT_FOUND: {
        TITLE: 'ページが見つかりません',
        BODY: 'そのページを見つけることができません。',
        BACK_TO_HOME: "ホームに戻る"
      }
    },
    GUEST: {
      REGISTER: {
        COPYRIGHT: {
          TITLE: '著作権',
          DESCRIPTION: '文学、芸術、音楽、映像作品、ソフトウェアプログラムの保護'
        },
        PATENT: {
          TITLE: '特許',
          DESCRIPTION: '産業応用のある発明の保護'
        },
        UTILITY_MODEL: {
          TITLE: '実用新案',
          DESCRIPTION: '改良された物品、器具、工具の保護'
        },
        INDUSTRIAL_DESIGN: {
          TITLE: '意匠',
          DESCRIPTION: '工業製品の装飾的外観の保護'
        },
        TRADEMARK: {
          TITLE: '商標',
          DESCRIPTION: '商業的識別標識の保護'
        },
        PLANT_VARIETY: {
          TITLE: '植物品種',
          DESCRIPTION: '新しい植物品種の保護'
        },
        INDUSTRIAL_SECRET: {
          TITLE: '企業秘密',
          DESCRIPTION: '営業秘密と機密情報の保護'
        },
        CIRCUIT_MAPPING: {
          TITLE: '集積回路配置',
          DESCRIPTION: '電気回路設計の保護'
        }
      }
    },
    USER_REGISTER: {
      TITLE: '新規ユーザー登録',
      DESCRIPTION: 'システムに新しいユーザーを登録します。登録したいユーザータイプを選択し、必要なフィールドを入力してください。',
      REGISTER: '登録',
      COORDINATOR: {
        TITLE: 'コーディネーター登録',
        DESCRIPTION: 'システムに新しいコーディネーターを登録します。',
      },
      GUEST: {
        TITLE: '申請者登録',
        DESCRIPTION: 'システムに新しい申請者を登録します。',
      },
    }
  },
};
