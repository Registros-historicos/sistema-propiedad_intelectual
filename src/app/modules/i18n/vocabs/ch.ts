// China
export const locale = {
  lang: 'zh',
  data: {
    BUTTON: {
      NEW: {
        COORDINATOR: '注册协调员',
        APPLICANT: '注册申请人',
        PATENT: '注册专利',
        TRADEMARK: '注册商标',
        UTILITY_MODEL: '注册实用新型',
        COPYRIGHT: '注册版权',
        INDUSTRIAL_DESIGN: '注册工业设计',
        VEGETAL_VARIETY: '注册植物品种',
        INDUSTRIAL_SECRET: '注册工业秘密',
      },
      CONFIRM: "确认",
      CANCEL: "取消",
      RETURN: "返回",
      CLOSE: '关闭',
      DOWNLOAD: '下载',
      SEE: '查看',
      PATENT: '提交专利申请',
      UTILITY_MODEL: '提交实用新型申请',
      INDUSTRIAL_DESIGN: '提交工业设计申请',
      COPYRIGHT: '提交版权申请',
      PROCESSING: '处理中...',
      CONFIRM_LOGOUT: '登出',
    },
    TABLE: {
      ACTIONS: {
        LABEL: '操作',
        EDIT: '编辑',
        DELETE: '删除',
        VIEW: '查看'
      },
      APPLICANT_NAME: "申请人",
      WORK_TITLE: "标题",
      INSTITUTION: "机构",
      DATE: "申请日期",
      PAG_INFO: "显示第 _START_ 到 _END_ 项，共 _TOTAL_ 项记录",
      PAG_INFO_FILTERED: "（从 _MAX_ 项总记录中过滤）",
      PAG_INFO_EMPTY: "显示第 0 到 0 项，共 0 项记录",
      PROCESSING: "加载数据中",
      EMPTY_TABLE: "未找到记录",
      PLACEHOLDER_SEARCH: "搜索...",
      ZERO_RECORDS: '未找到匹配项',
      TYPE_REQUEST: "申请类型",
      STATUS_REQUEST: "状态",
      FULL_NAME: "全名",
      FEDERAL_ENTITY: "联邦实体",
      PHONE: "电话",
      REGISTERED_DATE: "注册日期",
      TITLE_REQUEST: "标题",
      DESCRIPTION_REQUEST: "描述",
      PAGE_LENGTH: {
        LABEL: "显示:",
        RECORDS: "项记录"
      },
      MARK: {
        NAME: '名称',
        IMAGE: '标志',
        APPLICATION_TYPE: '申请类型',
        APPLICANT: '持有人',
        DATE: '申请日期'
      }
    },
    MODAL: {
      TITLE: '详情',
      INFO: {
        TITLE: '只读信息',
        BODY: '详情仅供参考。'
      },
      FORM: {
        PATENT: {
          NAME: '专利名称'
        },
        MARK: {
          NAME: '名称',
          RECORD: '档案',
          IMAGE: '标志',
          APPLICATION_TYPE: '申请类型',
          APPLICANT: '持有人',
          DATE: '申请日期',
          DATE_GRANT: '授权日期',
          DATE_COMPLETION: '完成日期',
          DATE_START: '开始使用',
          IMAGE_INFO: '商标图像',
          FORMALITIES: {
            LABEL: '手续',
            ENTRY_FOLIO: '入档号:',
            YEAR_RECEPTION: '接收年份:',
            START_DATE: '开始日期:',
            COMPLETION_DATE: '完成日期:'
          },
          FORMALITIES_EMPTY: '无已注册手续'
        },
        COPYRIGHT: {
          NAME: '作品名称',
        },
        APPLICANT: '申请人',
        EMAIL: '电子邮件',
        DATE: '申请日期',
        STATUS: '状态',
        FEDERAL_ENTITY: {
          LABEL: '联邦实体',
          OPTIONS_LABEL: '选择联邦实体'
        },
        INSTITUTION: {
          LABEL: '机构',
          OPTIONS_LABEL: '选择机构',
        },
        DESCRIPTION: '描述',
        DOCUMENTATION: '文档',
        DOCUMENTATION_EMPTY: '无附件文档'
      },
      FOLLOW_UP: {
        TITLE: '跟踪',
        APPLICATION_ID: '申请ID',
        APPLICANT: '申请人',
        PROGRESS: '进度',
        HISTORY_TITLE: '流程历史',
        STATUS: {
          REGISTERED: '已注册',
          IN_PROCESS: '处理中',
          WITH_OBSERVATIONS: '有意见的流程',
          APPROVED: '已批准',
          COMPLETED: '已完成'
        },
        STATUS_LABELS: {
          CURRENT: '当前',
          COMPLETED: '已完成',
          REQUIRES_ATTENTION: '需要注意',
          FINISHED: '已结束',
          PENDING: '待处理'
        },
        DESCRIPTIONS: {
          REGISTERED: '申请已成功在系统中注册。',
          IN_PROCESS: '申请正在审核中。',
          WITH_OBSERVATIONS: '需要修正或补充信息才能继续。',
          APPROVED: '申请已获批准。',
          COMPLETED: '流程已完成。'
        },
        DETAILS: {
          REGISTERED: {
            DESCRIPTION: '申请已成功在系统中注册。',
            DATE_LABEL: '日期:'
          },
          IN_PROCESS: {
            DESCRIPTION: '申请正由专业技术团队评估。',
            EVALUATOR: '评估员: 协调员'
          },
          WITH_OBSERVATIONS: {
            DESCRIPTION: '发现需要修正或补充信息的方面。',
            DEADLINE: '回复期限: 30个工作日'
          },
          APPROVED: {
            DESCRIPTION: '申请已获批准并获得法律保护。',
            PROTECTION: '保护期限为20年'
          },
          COMPLETED: {
            DESCRIPTION: '流程已完成。',
            TITLE_ISSUED: '申请证书已发出'
          }
        },
        BUTTONS: {
          CLOSE: '关闭',
          NOTIFICATIONS: '通知',
          GENERATE_REPORT: '生成报告'
        }
      }
    },
    FORMS: {
      PATENT: {
        TITLE: '发明专利申请 - 国家知识产权局',
        INFO_1: '完成向国家知识产权局申请专利注册所需的所有信息。',
        INFO_2: '所有标有(*)的字段都是必填项。',
        GENERAL_SECTION: {
          TITLE: '申请人一般信息',
          APPLICATION_DATE: '申请日期',
          APPLICATION_MODE: {
            LABEL: '申请方式',
            SELECT_MODE: '选择方式',
            ONLINE: '在线（电子申请）',
            IN_PERSON: '现场（办公室）',
          },
          NAME_COMPANY: {
            LABEL: '全名 / 公司名称',
            PLACEHOLDER: '申请人全名或公司名称',
          },
          NATIONALITY: {
            LABEL: '国籍',
            PLACEHOLDER: '申请人国籍',
          },
          EMAIL: {
            LABEL: '电子邮件',
            PLACEHOLDER: 'example@domain.com',
          },
          PHONE: '电话号码',
          ADDRESS: {
            LABEL: '地址',
            PLACEHOLDER: '街道、门牌号、社区、城市、省份、邮编',
          },
          CURP_RFC: {
            PLACEHOLDER: '身份证号（18位）或统一社会信用代码（18位）',
          },
          INVENTOR_APPLICANT: {
            LABEL: '发明人和申请人是否不同？',
            YES: '是，他们不同',
            NO: '否，是同一人',
          },
          ENTITY: {
            LABEL: '省份',
            SELECT_ENTITY: '选择省份',
          },
          INSTITUTION: {
            LABEL: '机构',
            SELECT_INSTITUTION: '选择机构',
          }
        },
        INVENTION_SECTION: {
          TITLE: '发明信息',
          INVENTION_TITLE: {
            LABEL: '发明名称',
            PLACEHOLDER: '发明的描述性名称',
          },
          TECHNICAL_FIELD: {
            LABEL: '技术领域',
            PLACEHOLDER: '发明所属的技术领域',
          },
          STATE_TECHNIQUE: {
            LABEL: '现有技术（背景技术）',
            PLACEHOLDER: '描述现有解决方案、现有专利、相关科学出版物及其局限性',
          },
          TECHNICAL_PROBLEM: {
            LABEL: '要解决的技术问题',
            PLACEHOLDER: '描述发明要解决的技术问题',
          },
          INDUSTRIAL_APPLICATION: {
            LABEL: '工业应用',
            PLACEHOLDER: '描述发明如何在工业或日常生活中使用',
          }
        },
        DETAILED_DESCRIPTION_SECTION: {
          TITLE: '发明的详细说明',
          DETAILED_DESCRIPTION: {
            LABEL: '详细说明',
            PLACEHOLDER: '发明的完整说明，包括其运作、特征和优势',
          },
          EXAMPLES_REALIZATION: {
            LABEL: '实施例',
            PLACEHOLDER: '如何实施发明的实际例子',
          },
          CLAIMS: {
            LABEL: '权利要求',
            PLACEHOLDER: '定义所要求保护范围的具体权利要求',
          },
          SUMMARY: {
            LABEL: '摘要（150-250字）',
            PLACEHOLDER: '发明及其主要特征的简要摘要',
          }
        },
        DOCUMENTATION_SECTION: {
          TITLE: '文档',
          IMPI: {
            LABEL: '国家知识产权局官方表格',
            SUB_TEXT: '附上正确填写的国家知识产权局官方表格'
          },
          TECHNICAL_DRAWINGS: {
            LABEL: '技术图纸或图表',
            SUB_TEXT: '理解发明所需的技术图纸'
          },
          PAYMENT_FEES: {
            LABEL: '费用支付凭证',
            SUB_TEXT: '向国家知识产权局支付申请费的凭证'
          },
          ADDITIONAL_DOCUMENTS: {
            LABEL: '附加文件',
            SUB_TEXT: '委托书、权利转让书、翻译等（如适用）'
          },
          SELECTED_FILES: '已选择文件:',
        },
        STATEMENTS_SECTION: {
          TITLE: '声明',
          STATEMENT_1: '我声明这项发明是我自己工作的结果，不是商业中已存在的其他发明的复制品。',
          STATEMENT_2: '我在此发誓声明所提供的信息是正确和完整的。',
          INVENTION_PREVIOUSLY: {
            LABEL: '发明是否曾被公开？',
            YES: '是，曾被公开',
            NO: '否，未曾公开',
          },
          DISCLOSURE_DETAILS: {
            LABEL: '先前公开的详情',
            PLACEHOLDER: '描述发明如何和何时被先前公开',
          },
        },
        ERRORS: {
          APPLICATION_MODE: '申请方式是必需的',
          EMAIL_REQUIRED: '电子邮件是必需的',
          EMAIL_INVALID: '必须输入有效的电子邮件',
          EMAIL_SIZE_MAX: '不能超过100个字符',
          EMAIL_FORMAT: '不能包含连续的点',
          EMAIL_BLANK: '不能包含空格',
          EMAIL_DOMAIN_FORMAT: '域名格式无效',
          PHONE: '电话号码是必需的',
          PHONE_REQUIRED: '手机号码是必需的',
          PHONE_FORMAT: '必须恰好包含10位数字',
          PHONE_FORMAT_NUMBERS: '只允许数字',
          PHONE_FORMAT_DIGIT: '不能包含重复的相同数字',
          PHONE_FORMAT_DIGIT_VALID: '必须以有效数字（2-9）开始',
          ADDRESS_REQUIRED: '地址是必需的',
          ADDRESS_MIN_LENGTH: '地址必须至少10个字符',
          ADDRESS_MAX_LENGTH: '地址不能超过300个字符',
          ADDRESS_SIZE_MIN: '必须至少10个字符',
          ADDRESS_SIZE_MAX: '不能超过300个字符',
          ADDRESS_FORMAT: '包含无效字符',
          ADDRESS_BLANK: '不能只包含空格',
          ADDRESS_SPACES: '不得以空格开始或结束',
          ENTITY: '省份是必需的',
          ENTITY_INSTITUTION: '必须选择省份和机构',
          INSTITUTION: '机构是必需的',
          NAME_REQUIRED: '全名/公司名称是必需的',
          NAME_SIZE_MIN: '必须至少3个字符',
          NAME_SIZE_MAX: '不能超过200个字符',
          NAME_BLANK: '不能只包含空格',
          NAME_FORMAT: '只允许字母、数字、空格和基本特殊字符',
          NAME_SPACES: '不得以空格开始或结束',
          NAME_MULTIPLE_SPACES: '不得包含多个连续空格',
          NAME_ONLY_NUMBERS: '不能只包含数字',
          NAME_ONLY_SPECIAL: '必须至少包含字母或数字',
          NATIONALITY_REQUIRED: '国籍是必需的',
          NATIONALITY_SIZE_MIN: '必须至少4个字符',
          NATIONALITY_SIZE_MAX: '不能超过50个字符',
          NATIONALITY_FORMAT: '只允许字母',
          NATIONALITY_BLANK: '不能只包含空格',
          CURP_SIZE_MAX: '身份证格式无效（18位）',
          RFC_SIZE_MAX: '统一社会信用代码格式无效（18位）',
          RFC_CURP_SIZE_MAX: '必须有有效的身份识别格式',
          INVENTION_REQUIRED: '发明名称是必需的',
          INVENTION_MIN_LENGTH: '发明名称必须至少5个字符',
          INVENTION_MAX_LENGTH: '发明名称不能超过500个字符',
          INVENTION_TITLE: '发明名称',
          TECHNICAL_FIELD_REQUIRED: '技术领域是必需的',
          TECHNICAL_FIELD_MIN_LENGTH: '技术领域必须至少20个字符',
          TECHNICAL_FIELD_MAX_LENGTH: '技术领域不能超过800个字符',
          TECHNICAL_FIELD: '技术领域',
          STATE_TECHNIQUE_REQUIRED: '现有技术是必需的',
          STATE_TECHNIQUE_MIN_LENGTH: '现有技术必须至少50个字符',
          STATE_TECHNIQUE_MAX_LENGTH: '现有技术不能超过1500个字符',
          STATE_TECHNIQUE: '现有技术',
          TECHNICAL_PROBLEM_REQUIRED: '技术问题是必需的',
          TECHNICAL_PROBLEM_MIN_LENGTH: '技术问题必须至少30个字符',
          TECHNICAL_PROBLEM_MAX_LENGTH: '技术问题不能超过1000个字符',
          TECHNICAL_PROBLEM: '技术问题',
          INDUSTRIAL_APPLICATION_REQUIRED: '工业应用是必需的',
          INDUSTRIAL_APPLICATION_MIN_LENGTH: '工业应用必须至少20个字符',
          INDUSTRIAL_APPLICATION_MAX_LENGTH: '工业应用不能超过800个字符',
          INDUSTRIAL_APPLICATION: '工业应用',
          DETAILED_DESCRIPTION_REQUIRED: '详细说明是必需的',
          DETAILED_DESCRIPTION_MIN_LENGTH: '详细说明必须至少100个字符',
          DETAILED_DESCRIPTION_MAX_LENGTH: '详细说明不能超过3000个字符',
          DETAILED_DESCRIPTION: '详细说明',
          EXAMPLES_REALIZATION_REQUIRED: '实施例是必需的',
          EXAMPLES_REALIZATION_MIN_LENGTH: '实施例必须至少50个字符',
          EXAMPLES_REALIZATION_MAX_LENGTH: '实施例不能超过2000个字符',
          EXAMPLES_REALIZATION: '实施例',
          CLAIMS_REQUIRED: '权利要求是必需的',
          CLAIMS_MIN_LENGTH: '权利要求必须至少30个字符',
          CLAIMS_MAX_LENGTH: '权利要求不能超过2000个字符',
          CLAIMS: '权利要求',
          SUMMARY_REQUIRED: '摘要是必需的',
          SUMMARY_MIN_LENGTH: '摘要必须至少150个字符',
          SUMMARY_MAX_LENGTH: '摘要不能超过250个字符',
          SUMMARY_SIZE_MIN: '必须至少150个字符',
          SUMMARY_SIZE_MAX: '不能超过250个字符',
          SUMMARY_SIZE_MIN_WORDS: '必须至少25个词',
          SUMMARY_SIZE_MAX_WORDS: '不能超过50个词',
          DECLARATION_ORIGINALITY: '必须接受原创性声明',
          DECLARATION_VERACITY: '必须接受真实性声明',
          DISCLOSURE_DETAILS: '公开详情',
          FILE_MAX_SIZE_PART_1: '文件 ',
          FILE_MAX_SIZE_PART_2: ' 超过了10MB的最大允许大小。',
          FILE_FORMAT_PART_2: ' 对于 没有有效格式',
          REQUIRED: ' 是必需的',
          SIZE_MIN: '必须至少 ',
          SIZE_MAX: '不能超过 ',
          CHAR: ' 个字符',
          SPACES: '不得以空格开始或结束',
          BLANK: '不能只包含空格',
          LETTERS: '必须至少包含一些字母',
          SUBMIT: '处理请求时发生错误。请重试',
          DOCUMENT_TITLE: '缺少文件！',
          IMPI: '必须附上国家知识产权局官方表格',
          PAYMENT: '必须附上费用支付凭证',
        },
        INFO: {
          SUCCESS: '专利申请已成功提交给国家知识产权局',
          CONFIRM: '好的，明白了！',
        }
      },
      UTILITY_MODEL: {
        TITLE: '注册实用新型',
        INFO_1: '完成向国家知识产权局注册实用新型的必需信息。',
        INFO_2: '实用新型保护对现有工具、器具或设备的改进或功能性修改。',
        GENERAL_SECTION: {
          TITLE: '申请人一般信息',
          APPLICATION_DATE: '申请日期',
          APPLICATION_MODE: {
            LABEL: '申请方式',
            SELECT_MODE: '选择方式',
            ONLINE: '在线（电子申请）',
            IN_PERSON: '现场（办公室）',
          },
          NAME_COMPANY: {
            LABEL: '全名 / 公司名称',
            PLACEHOLDER: '输入全名或公司名称',
          },
          NATIONALITY: {
            LABEL: '国籍',
            PLACEHOLDER: '例：中国',
          },
          EMAIL: {
            LABEL: '电子邮件',
            PLACEHOLDER: 'example@email.com',
          },
          PHONE: '手机号码',
          ADDRESS: {
            LABEL: '通知地址',
            PLACEHOLDER: '街道、门牌号、社区、城市、省份、邮编',
          },
          CURP_RFC: {
            PLACEHOLDER: '中国个人或法人实体',
          },
          INVENTOR_APPLICANT: {
            LABEL: '发明人和申请人是否不同？',
            YES: '是，他们是不同的人',
            NO: '否，是同一人',
          },
          ENTITY: {
            LABEL: '省份',
            SELECT_ENTITY: '选择省份',
          },
          INSTITUTION: {
            LABEL: '机构',
            SELECT_INSTITUTION: '选择机构',
          }
        },
        MODEL_SECTION: {
          TITLE: '实用新型信息',
          MODEL_NAME: {
            LABEL: '实用新型名称',
            PLACEHOLDER: '实用新型的描述性名称',
          },
          TECHNICAL_FIELD: {
            LABEL: '技术领域',
            PLACEHOLDER: '实用新型所属的技术领域',
          },
          STATE_TECHNIQUE: {
            LABEL: '现有技术（背景技术）',
            PLACEHOLDER: '类似现有工具、器具或设备的描述',
          },
          TECHNICAL_PROBLEM: {
            LABEL: '要解决的技术问题',
            PLACEHOLDER: '实用新型解决的不便或限制',
          },
          INDUSTRIAL_APPLICATION: {
            LABEL: '工业应用',
            PLACEHOLDER: '实用新型的实际用途和工业应用',
          }
        },
        DETAILED_DESCRIPTION_SECTION: {
          TITLE: '详细技术说明',
          DETAILED_DESCRIPTION: {
            LABEL: '改进的详细说明',
            PLACEHOLDER: '功能性修改或改进的清晰详细说明',
          },
          EXAMPLES_REALIZATION: {
            LABEL: '实施例',
            PLACEHOLDER: '实施功能改进的具体方法',
          },
          CLAIMS: {
            LABEL: '权利要求',
            PLACEHOLDER: '要保护的新的功能特征',
          },
          SUMMARY: {
            LABEL: '摘要（150-250字）',
            PLACEHOLDER: '在国家知识产权局公报上发表的实用新型简要摘要',
          }
        },
        DOCUMENTATION_SECTION: {
          TITLE: '文档',
          IMPI: {
            LABEL: '国家知识产权局官方表格',
            SUB_TEXT: '实用新型注册申请官方表格'
          },
          TECHNICAL_DRAWINGS: {
            LABEL: '技术图纸或图表',
            SUB_TEXT: '显示功能改进的图表、设计图或插图'
          },
          PAYMENT_FEES: {
            LABEL: '费用支付凭证',
            SUB_TEXT: '提交申请的费用支付凭证'
          },
          ADDITIONAL_DOCUMENTS: {
            LABEL: '附加文件',
            SUB_TEXT: '委托书、权利转让书、外国优先权（如适用）'
          },
          SELECTED_FILES: '已选择文件',
        },
        STATEMENTS_SECTION: {
          TITLE: '声明',
          STATEMENT_1: '我声明这个实用新型是我自己工作的结果，不是商业中已存在的其他实用新型的复制品',
          STATEMENT_2: '我在此发誓声明所提供的信息是真实和完整的',
          INVENTION_PREVIOUSLY: {
            LABEL: '发明是否曾被公开？',
            YES: '是，曾被公开',
            NO: '否，未曾被公开',
          },
          DISCLOSURE_DETAILS: {
            LABEL: '先前公开详情',
            PLACEHOLDER: '说明在何处、何时以及如何被先前公开',
          },
        },
        ERRORS: {
          APPLICATION_MODE: '申请方式是必需的',
          NAME_REQUIRED: '全名/公司名称是必需的',
          NAME_SIZE_MIN: '必须至少3个字符',
          NAME_SIZE_MAX: '不能超过200个字符',
          NAME_FORMAT: '只允许字母、数字、空格和基本特殊字符',
          NAME_BLANK: '不得以空格开始或结束',
          NAME_MULTIPLE_BLANKS: '不得包含多个连续空格',
          NATIONALITY_REQUIRED: '国籍是必需的',
          NATIONALITY_SIZE_MIN: '必须至少4个字符',
          NATIONALITY_SIZE_MAX: '不能超过50个字符',
          NATIONALITY_FORMAT: '只允许字母',
          EMAIL_REQUIRED: '电子邮件是必需的',
          EMAIL_SIZE_MAX: '不能超过100个字符',
          EMAIL_INVALID: '必须输入有效的电子邮件',
          EMAIL_FORMAT: '不能包含连续的点',
          EMAIL_BLANK: '不能包含空格',
          PHONE_REQUIRED: '手机号码是必需的',
          PHONE_FORMAT: '必须恰好包含10位数字',
          PHONE_FORMAT_NUMBERS: '只允许数字',
          PHONE_FORMAT_DIGIT: '不能包含重复的相同数字',
          PHONE_FORMAT_DIGIT_VALID: '必须以有效数字（2-9）开始',
          ADDRESS_REQUIRED: '地址是必需的',
          ADDRESS_SIZE_MIN: '必须至少10个字符',
          ADDRESS_SIZE_MAX: '不能超过300个字符',
          ADDRESS_FORMAT: '包含无效字符',
          ADDRESS_BLANK: '不能只包含空格',
          ADDRESS_MULTIPLE_BLANKS: '不得以空格开始或结束',
          CURP_SIZE_MAX: '身份证格式无效（18位）',
          RFC_SIZE_MAX: '统一社会信用代码格式无效（18位）',
          RFC_CURP_SIZE_MAX: '必须有有效的身份识别格式',
          ENTITY: '省份是必需的',
          INSTITUTION: '机构是必需的',
          MODEL_NAME_REQUIRED: '实用新型名称是必需的',
          TECHNICAL_FIELD_REQUIRED: '技术领域是必需的',
          STATE_TECHNIQUE_REQUIRED: '现有技术是必需的',
          TECHNICAL_PROBLEM_REQUIRED: '技术问题是必需的',
          INDUSTRIAL_APPLICATION_REQUIRED: '工业应用是必需的',
          DETAILED_DESCRIPTION_REQUIRED: '详细说明是必需的',
          EXAMPLES_REALIZATION_REQUIRED: '实施例是必需的',
          CLAIMS_REQUIRED: '权利要求是必需的',
          SUMMARY_REQUIRED: '摘要是必需的',
          SUMMARY_SIZE_MIN: '必须至少150个字符',
          SUMMARY_SIZE_MIN_WORDS: '必须至少25个词',
          SUMMARY_SIZE_MAX: '不能超过250个字符',
          SUMMARY_SIZE_MAX_WORDS: '不能超过50个词',
          DECLARATION_ORIGINALITY: '必须接受原创性声明',
          DECLARATION_VERACITY: '必须接受真实性声明',
          ENTITY_INSTITUTION: '必须选择省份和机构',
          FILE_MAX_SIZE_PART_1: '文件 ',
          FILE_MAX_SIZE_PART_2: ' 超过了10MB的最大允许大小。',
          FILE_FORMAT_PART_2: ' 对于 没有有效格式',
          REQUIRED: ' 是必需的',
          SIZE_MIN: '必须至少 ',
          SIZE_MAX: '不能超过 ',
          CHAR: ' 个字符',
          BLANKS: '不得以空格开始或结束',
          BLANK: '不能只包含空格',
          LETTERS: '必须至少包含一些字母',
          UTILITY_MODEL: '实用新型名称',
          TECHNICAL_FIELD: '技术领域',
          STATE_TECHNIQUE: '现有技术',
          TECHNICAL_PROBLEM: '技术问题',
          INDUSTRIAL_APPLICATION: '工业应用',
          DETAILED_DESCRIPTION: '详细说明',
          EXAMPLES_REALIZATION: '实施例',
          CLAIMS: '权利要求',
          SUBMIT: '处理请求时发生错误。请重试',
          DOCUMENT_TITLE: '缺少文件！',
          IMPI: '必须附上国家知识产权局官方表格',
          PAYMENT: '必须附上费用支付凭证',
        },
        INFO: {
          SUCCESS: '实用新型申请提交成功',
          CONFIRM: '明白了！',
        }
      },
      INDUSTRIAL_DESIGN: {
        TITLE: '工业设计注册申请 - 国家知识产权局',
        INFO_1: '完成向国家知识产权局申请工业设计注册所需的所有信息。',
        INFO_2: '所有标有(*)的字段都是必填项。',
        GENERAL_SECTION: {
          TITLE: '申请人一般信息',
          APPLICATION_DATE: '申请日期',
          APPLICATION_MODE: {
            LABEL: '申请方式',
            SELECT_MODE: '选择方式',
            ONLINE: '在线（电子申请）',
            IN_PERSON: '现场（办公室）',
          },
          NAME_COMPANY: {
            LABEL: '全名 / 公司名称',
            PLACEHOLDER: '申请人全名或公司名称',
          },
          NATIONALITY: {
            LABEL: '国籍',
            PLACEHOLDER: '申请人国籍',
          },
          EMAIL: {
            LABEL: '电子邮件',
            PLACEHOLDER: 'example@domain.com',
          },
          PHONE: '电话号码',
          ADDRESS: {
            LABEL: '地址',
            PLACEHOLDER: '街道、门牌号、社区、城市、省份、邮编',
          },
          CURP_RFC: {
            PLACEHOLDER: '身份证号（18位）或统一社会信用代码（18位）',
          },
          DESIGNER_APPLICANT: {
            LABEL: '设计人和申请人是否不同？',
            YES: '是，他们不同',
            NO: '否，是同一人',
          },
          ENTITY: {
            LABEL: '省份',
            SELECT_ENTITY: '选择省份',
          },
          INSTITUTION: {
            LABEL: '机构',
            SELECT_INSTITUTION: '选择机构',
          }
        },
        DESIGN_SECTION: {
          TITLE: '工业设计信息',
          DESIGN_NAME: {
            LABEL: '工业设计名称',
            PLACEHOLDER: '工业设计的描述性名称',
          },
          DESIGN_TYPE: {
            LABEL: '工业设计类型',
            SELECT_TYPE: '选择设计类型',
            INDUSTRIAL_MODEL: '工业模型',
            INDUSTRIAL_DRAWING: '工业图案',
          },
          PRODUCT_CLASS: {
            LABEL: '产品类别',
            PLACEHOLDER: '指定设计将应用的产品类别',
          }
        },
        TECHNICAL_DESCRIPTION_SECTION: {
          TITLE: '设计技术说明',
          NEW_ELEMENTS: {
            LABEL: '新颖或原创元素的描述',
            PLACEHOLDER: '详细描述设计的新颖或原创元素',
          },
          VISUAL_CHARACTERISTICS: {
            LABEL: '独特的视觉特征',
            PLACEHOLDER: '描述使设计独特的视觉特征（形状、颜色、质地等）',
          },
          GENERAL_DESCRIPTION: {
            LABEL: '设计的一般描述',
            PLACEHOLDER: '提供工业设计的完整详细描述',
          },
          SUMMARY: {
            LABEL: '摘要（150-250字）',
            PLACEHOLDER: '在国家知识产权局公报上发表的工业设计简要摘要',
          }
        },
        DOCUMENTATION_SECTION: {
          TITLE: '文档',
          VIEWS_INFO: {
            TITLE: '工业设计所需视图',
            DESCRIPTION: '技术图纸必须包括物品的透视图、正视图、侧视图、后视图、俯视图和仰视图。',
          },
          IMPI: {
            LABEL: '国家知识产权局官方表格',
            SUB_TEXT: '工业设计注册申请官方表格'
          },
          TECHNICAL_DRAWINGS: {
            LABEL: '技术图纸和设计视图',
            SUB_TEXT: '包括透视图、正视图、侧视图、后视图、俯视图和仰视图'
          },
          PAYMENT_FEES: {
            LABEL: '费用支付凭证',
            SUB_TEXT: '提交申请的费用支付凭证'
          },
          ADDITIONAL_DOCUMENTS: {
            LABEL: '附加文件',
            SUB_TEXT: '委托书、权利转让书、外国优先权（如适用）'
          },
          SELECTED_FILES: '已选择文件',
        },
        STATEMENTS_SECTION: {
          TITLE: '声明',
          STATEMENT_1: '我声明这个工业设计是我自己工作的结果，不是商业中已存在的其他设计的复制品',
          STATEMENT_2: '我在此发誓声明所提供的信息是正确和完整的',
          DESIGN_PREVIOUSLY: {
            LABEL: '设计是否曾被公开？',
            YES: '是，曾被公开',
            NO: '否，未曾公开',
          },
          DISCLOSURE_DETAILS: {
            LABEL: '先前公开详情',
            PLACEHOLDER: '描述设计如何和何时被先前公开',
          },
        },
        ERRORS: {
          APPLICATION_MODE: '申请方式是必需的',
          NAME_REQUIRED: '全名/公司名称是必需的',
          NAME_SIZE_MIN: '必须至少3个字符',
          NAME_SIZE_MAX: '不能超过200个字符',
          NAME_FORMAT: '只允许字母、数字、空格和基本特殊字符',
          NAME_SPACES: '不得以空格开始或结束',
          NAME_MULTIPLE_SPACES: '不得包含多个连续空格',
          NATIONALITY_REQUIRED: '国籍是必需的',
          NATIONALITY_SIZE_MIN: '必须至少4个字符',
          NATIONALITY_SIZE_MAX: '不能超过50个字符',
          NATIONALITY_FORMAT: '只允许字母',
          EMAIL_REQUIRED: '电子邮件是必需的',
          EMAIL_SIZE_MAX: '不能超过100个字符',
          EMAIL_INVALID: '必须输入有效的电子邮件',
          EMAIL_FORMAT: '不能包含连续的点',
          EMAIL_BLANK: '不能包含空格',
          PHONE_REQUIRED: '手机号码是必需的',
          PHONE_FORMAT: '必须恰好包含10位数字',
          PHONE_FORMAT_NUMBERS: '只允许数字',
          PHONE_FORMAT_DIGIT: '不能包含重复的相同数字',
          PHONE_FORMAT_DIGIT_VALID: '必须以有效数字（2-9）开始',
          ADDRESS_REQUIRED: '地址是必需的',
          ADDRESS_SIZE_MIN: '必须至少10个字符',
          ADDRESS_SIZE_MAX: '不能超过300个字符',
          ADDRESS_FORMAT: '包含无效字符',
          ADDRESS_BLANK: '不能只包含空格',
          ADDRESS_SPACES: '不得以空格开始或结束',
          CURP_SIZE_MAX: '身份证格式无效（18位）',
          RFC_SIZE_MAX: '统一社会信用代码格式无效（18位）',
          RFC_CURP_SIZE_MAX: '必须有有效的身份识别格式',
          ENTITY: '省份是必需的',
          INSTITUTION: '机构是必需的',
          DESIGN_NAME_REQUIRED: '设计名称是必需的',
          DESIGN_TYPE_REQUIRED: '设计类型是必需的',
          PRODUCT_CLASS_REQUIRED: '产品类别是必需的',
          NEW_ELEMENTS_REQUIRED: '新颖或原创元素是必需的',
          VISUAL_CHARACTERISTICS_REQUIRED: '独特的视觉特征是必需的',
          GENERAL_DESCRIPTION_REQUIRED: '一般描述是必需的',
          SUMMARY_REQUIRED: '摘要是必需的',
          SUMMARY_SIZE_MIN: '必须至少150个字符',
          SUMMARY_SIZE_MIN_WORDS: '必须至少25个词',
          SUMMARY_SIZE_MAX: '不能超过250个字符',
          SUMMARY_SIZE_MAX_WORDS: '不能超过50个词',
          DECLARATION_ORIGINALITY: '必须接受原创性声明',
          DECLARATION_VERACITY: '必须接受真实性声明',
          ENTITY_INSTITUTION: '必须选择省份和机构',
          FILE_MAX_SIZE_PART_1: '文件 ',
          FILE_MAX_SIZE_PART_2: ' 超过了10MB的最大允许大小。',
          FILE_FORMAT_PART_2: ' 对于 没有有效格式',
          REQUIRED: ' 是必需的',
          SIZE_MIN: '必须至少 ',
          SIZE_MAX: '不能超过 ',
          CHAR: ' 个字符',
          SPACES: '不得以空格开始或结束',
          BLANK: '不能只包含空格',
          LETTERS: '必须至少包含一些字母',
          DESIGN_NAME: '设计名称',
          PRODUCT_CLASS: '产品类别',
          NEW_ELEMENTS: '新颖或原创元素',
          VISUAL_CHARACTERISTICS: '独特的视觉特征',
          GENERAL_DESCRIPTION: '一般描述',
          SUBMIT: '处理请求时发生错误。请重试',
          DOCUMENT_TITLE: '缺少文件！',
          IMPI: '必须附上国家知识产权局官方表格',
          PAYMENT: '必须附上费用支付凭证',
          TECHNICAL_DRAWINGS: '必须附上工业设计的技术图纸和视图',
        },
        INFO: {
          SUCCESS: '工业设计申请已成功提交给国家知识产权局',
          CONFIRM: '好的，明白了！',
        }
      },
      COPYRIGHT: {
        TITLE: '著作权登记申请 - 国家版权局',
        INFO_1: '完成向国家版权局申请著作权登记所需的所有信息。',
        INFO_2: '所有标有(*)的字段都是必填项。',
        GENERAL_SECTION: {
          TITLE: '申请人一般信息',
          APPLICATION_DATE: '申请日期',
          APPLICATION_MODE: {
            LABEL: '申请方式',
            SELECT_MODE: '选择方式',
            ONLINE: '在线（电子申请）',
            IN_PERSON: '现场（办公室）',
          },
          WORK_TITLE: {
            LABEL: '要登记的作品标题',
            PLACEHOLDER: '输入作品的完整标题',
          },
          NAME_COMPANY: {
            LABEL: '全名 / 公司名称',
            PLACEHOLDER: '申请人全名或公司名称',
          },
          NATIONALITY: {
            LABEL: '国籍',
            PLACEHOLDER: '申请人国籍',
          },
          EMAIL: {
            LABEL: '电子邮件',
            PLACEHOLDER: 'example@domain.com',
          },
          PHONE: '手机号码',
          ADDRESS: {
            LABEL: '通知地址',
            PLACEHOLDER: '街道、门牌号、社区、城市、省份、邮编',
          },
          CURP_RFC: {
            PLACEHOLDER: '身份证号（18位）或统一社会信用代码（18位）',
          },
          AUTHOR_NAME: {
            LABEL: '作者姓名（如不同）',
            PLACEHOLDER: '如作者是同一申请人则留空',
          },
          ENTITY: {
            LABEL: '省份',
            SELECT_ENTITY: '选择省份',
          },
          INSTITUTION: {
            LABEL: '机构',
            SELECT_INSTITUTION: '选择机构',
          }
        },
        WORK_SECTION: {
          TITLE: '作品信息',
          BRANCH: {
            LABEL: '作品分支',
            SELECT_BRANCH: '选择作品分支',
            OPTIONS: {
              LITERARY: '文学',
              MUSICAL_WITH_LYRICS: '带词音乐',
              MUSICAL_WITHOUT_LYRICS: '纯音乐',
              DRAMATIC: '戏剧',
              DANCE: '舞蹈',
              PICTORIAL: '绘画',
              DRAWING: '图画',
              SCULPTURAL: '雕塑',
              PLASTIC_CHARACTER: '造型性质',
              CARICATURE: '漫画',
              COMIC: '连环画',
              ARCHITECTURAL: '建筑',
              CINEMATOGRAPHIC: '电影',
              AUDIOVISUAL: '视听',
              RADIO_PROGRAM: '广播节目',
              TV_PROGRAM: '电视节目',
              COMPUTER_PROGRAM: '计算机程序',
              PHOTOGRAPHIC: '摄影',
              APPLIED_ART: '应用艺术',
              DATABASE: '数据库',
            }
          },
          IS_DERIVED: {
            LABEL: '作品是派生作品吗？',
            NO: '否',
            YES: '是',
          },
          DERIVED_TYPE: {
            LABEL: '派生作品类型',
            SELECT_TYPE: '选择派生作品类型',
            OPTIONS: {
              AMPLIFICATION: '扩充',
              TRANSLATION: '翻译',
              ARRANGEMENT: '编排',
              COMPENDIUM: '汇编',
              ADAPTATION: '改编',
              PARAPHRASE: '释义',
              COMPILATION: '编辑',
              TRANSFORMATION: '转换',
              COLLECTION: '收集',
            }
          },
          ORIGINAL_WORK_DATA: {
            LABEL: '原始作品数据',
            PLACEHOLDER: '提供此作品所派生的原始作品数据',
          },
          DESCRIPTION: {
            LABEL: '作品描述',
            PLACEHOLDER: '作品的详细描述，其目的、主要特征和内容',
          }
        },
        EXEMPLAR_SECTION: {
          TITLE: '作品样本',
          TYPE_LABEL: '样本类型',
          SOURCE_CODE: '源代码（前10页和后10页）',
          URL_WORK: '仓库/数据库/计算机程序的完整作品URL',
          SYNTHESIS: '作品概要',
          URL_FIELD: {
            LABEL: '作品URL',
            PLACEHOLDER: 'https://example.com/my-work',
          },
          SYNTHESIS_FIELD: {
            LABEL: '作品概要',
            PLACEHOLDER: '提供作品的简要概要',
          }
        },
        DOCUMENTATION_SECTION: {
          TITLE: '文档',
          INDAUTOR_FORMAT: {
            LABEL: '国家版权局官方表格',
            SUB_TEXT: '根据适当的类型附上表格',
          },
          OFFICIAL_ID: {
            LABEL: '官方身份证明',
            SUB_TEXT: '身份证、护照、专业证书或其他官方身份证明',
          },
          OWNERSHIP_DOCUMENT: {
            LABEL: '所有权文件',
            SUB_TEXT: '合同、权利转让书、公司章程（如适用）',
          },
          PAYMENT_RECEIPT: {
            LABEL: '支付凭证',
            SUB_TEXT: '向国家版权局支付登记费的凭证',
          },
          WORK_EXEMPLAR: {
            LABEL: '作品样本',
            SUB_TEXT: '作品的数字文件（源代码、文档等）',
          },
          ADDITIONAL_DOCUMENTS: {
            LABEL: '附加文件',
            SUB_TEXT: '翻译、委托书、其他文件（如适用）',
          },
          SELECTED_FILES: '已选择文件',
        },
        STATEMENTS_SECTION: {
          TITLE: '声明',
          STATEMENT_1: '我声明这个作品是我自己原创工作的结果，不侵犯第三方权利',
          STATEMENT_2: '我在此发誓声明所提供的信息是正确和完整的',
          STATEMENT_3: '我声明我是作品的著作权人或拥有相应的授权',
        },
        ERRORS: {
          APPLICATION_MODE: '申请方式是必需的',
          WORK_TITLE_REQUIRED: '作品标题是必需的',
          WORK_TITLE_MIN_LENGTH: '标题必须至少5个字符',
          WORK_TITLE_MAX_LENGTH: '标题不能超过500个字符',
          WORK_TITLE_SPACES: '不得以空格开始或结束',
          WORK_TITLE_BLANK: '不能只包含空格',
          NAME_REQUIRED: '全名/公司名称是必需的',
          NAME_SIZE_MIN: '必须至少3个字符',
          NAME_SIZE_MAX: '不能超过200个字符',
          NAME_FORMAT: '只允许字母、数字、空格和基本特殊字符',
          NAME_SPACES: '不得以空格开始或结束',
          NAME_MULTIPLE_SPACES: '不得包含多个连续空格',
          NATIONALITY_REQUIRED: '国籍是必需的',
          NATIONALITY_SIZE_MIN: '必须至少4个字符',
          NATIONALITY_SIZE_MAX: '不能超过50个字符',
          NATIONALITY_FORMAT: '只允许字母',
          EMAIL_REQUIRED: '电子邮件是必需的',
          EMAIL_SIZE_MAX: '不能超过100个字符',
          EMAIL_INVALID: '必须输入有效的电子邮件',
          EMAIL_FORMAT: '不能包含连续的点',
          EMAIL_BLANK: '不能包含空格',
          PHONE_REQUIRED: '手机号码是必需的',
          PHONE_FORMAT: '必须恰好包含10位数字',
          PHONE_FORMAT_NUMBERS: '只允许数字',
          PHONE_FORMAT_DIGIT: '不能包含重复的相同数字',
          PHONE_FORMAT_DIGIT_VALID: '必须以有效数字（2-9）开始',
          ADDRESS_REQUIRED: '地址是必需的',
          ADDRESS_SIZE_MIN: '必须至少10个字符',
          ADDRESS_SIZE_MAX: '不能超过300个字符',
          ADDRESS_FORMAT: '包含无效字符',
          ADDRESS_BLANK: '不能只包含空格',
          ADDRESS_SPACES: '不得以空格开始或结束',
          CURP_SIZE_MAX: '身份证格式无效（18位）',
          RFC_SIZE_MAX: '统一社会信用代码格式无效（18位）',
          RFC_CURP_SIZE_MAX: '必须有有效的身份识别格式',
          ENTITY: '省份是必需的',
          INSTITUTION: '机构是必需的',
          BRANCH_REQUIRED: '作品分支是必需的',
          DERIVED_TYPE_REQUIRED: '派生作品类型是必需的',
          DESCRIPTION_REQUIRED: '描述是必需的',
          DESCRIPTION_SIZE_MIN: '必须至少20个字符',
          DESCRIPTION_SIZE_MAX: '不能超过2000个字符',
          DESCRIPTION_SPACES: '不得以空格开始或结束',
          DESCRIPTION_BLANK: '不能只包含空格',
          DECLARATION_ORIGINALITY: '必须接受原创性声明',
          DECLARATION_VERACITY: '必须接受真实性声明',
          DECLARATION_OWNERSHIP: '必须接受所有权声明',
          ENTITY_INSTITUTION: '必须选择省份和机构',
          FILE_MAX_SIZE_PART_1: '文件 ',
          FILE_MAX_SIZE_PART_2: ' 超过了10MB的最大允许大小。',
          FILE_FORMAT_PART_2: ' 对于 没有有效格式',
          DOCUMENT_TITLE: '缺少文件！',
          INDAUTOR_FORMAT: '必须附上适当的国家版权局官方表格',
          SUBMIT: '处理请求时发生错误。请重试',
        },
        INFO: {
          SUCCESS: '著作权申请已成功提交给国家版权局',
          CONFIRM: '好的，明白了！',
        }
      },
    },
    ALERT: {
      DELETE: {
        TITLE: "您确定要删除此记录吗？",
        BODY: "此操作无法撤销",
        SUCCESS: "记录已删除"
      },
      LOGOUT: {
        TITLE: "您确定要登出吗？",
        SUCCESS: "成功登出"
      }
    },
    GRAPHICS: {
      TITLES: {
        REQUEST_TYPES: "申请类型",
        REQUEST: "申请",
        DEPARTMENTS: "部门",
        EDUCATIONAL_PROGRAM: "教育项目",
        RESEARCHERS: "研究人员",
        RESEARCHER: "研究员",
        DEPARTMENT: "部门",
        FEDERAL_INSTITUTIONS: "联邦机构",
        CENTRALIZED_INSTITUTIONS: "分散机构",
        APPLICATION_TYPE: "申请类型",
        FEDERAL_ENTITIES: "联邦实体",
      },
      SUBTITLES: {
        REGISTER: "记录",
        MONTHS: "月份（2025年）",
        YEARS: "年份（2019-2024年）",
        TOP_3: "前3名",
        TOP_5: "前5名",
      },
      LEGENDS: {
        NO_FEDERAL_ENTITIES: "没有有记录的联邦实体。",
        NO_FEDERAL_INSTITUTIONS: "没有有记录的联邦机构。",
        NO_CENTRALIZED_INSTITUTIONS: "没有有记录的分散机构。",
        TOTAL_APPLICATIONS: '申请总数',
        HOVER_APPLICATIONS: '申请',
        ACRONYM: {
          MONTHS: {
            APRIL: '4月'
          }
        }
      },
      OPTIONS_FILTER: {
        TITLE: '过滤选项',
        LABEL: '时间:',
        OPTIONS: {
          MONTHS: '月份',
          YEARS: '年份',
        }
      },
    },
    DEPARTMENTS: {
      IT: "计算机系统",
      MECHANIC: "金属机械",
      CHEMISTRY: "化学",
    },
    ACRONYM: {
      PATENTS: "专利",
      TRADEMARKS: "商标",
      UTILITY_MODELS: '实新',
      COPYRIGHTS: '版权',
      INDUSTRIAL_DESIGNS: '工设',
      VEGETAL_VARIETIES: '植品',
      INDUSTRIAL_SECRETS: '工秘'
    },
    ACADEMIC_LEVEL: {
      DOCTOR_CS: "计算机科学博士",
      MASTER_CS: "计算机系统硕士",
      MASTER_CSIENCE: "计算机科学硕士"
    },
    EDUCATIONAL_PROGRAM: {
      SYSTEMS: "计算机系统",
      INFORMATICS: "信息学",
      DATA_SCIENCE: "数据科学"
    },
    TRANSLATOR: {
      SELECT: '选择你的语言',
      LANGUAGES: {
        ENGLISH: '英语',
        MANDARIN: '中文',
        SPANISH: '西班牙语',
        JAPANESE: '日语',
        GERMAN: '德语',
        FRENCH: '法语'
      }
    },
    MENU: {
      NEW: '新',
      ACTIONS: '行动',
      CREATE_POST: '创建新帖子',
      PAGES: 'Pages',
      FEATURES: '特征',
      APPS: '应用',
      DASHBOARD: '仪表板',
      REGISTERS: '记录',
      USERS: '用户',
      INTELECTUAL_PROPERTIES: '知识产权',
      REPORTS: '报告',
      HELP: '帮助',
      ADMIN: {
        MANAGEMENT: '管理',
        COORDINATORS: '协调员',
        APPLICANTS: '申请人',
        INTELECTUAL_PROPERTY: '知识产权',
        PATENTS: '专利',
        TRADEMARKS: '商标',
        UTILITY_MODELS: '实用新型',
        COPYRIGHTS: '版权',
        INDUSTRIAL_DESIGNS: '工业设计',
        VEGETAL_VARIETIES: '植物品种',
        INDUSTRIAL_SECRETS: '工业秘密',
        HELP: '帮助中心'
      },
      COORD: {
        APPLICANTS: '申请人',
        COPYRIGHTS: '版权',
        INDUSTRIAL_DESIGNS: '工业设计',
        INTELECTUAL_PROPERTY: '知识产权',
        MANAGEMENT: '管理',
        PATENTS: '专利',
        TRADEMARKS: '商标',
        UTILITY_MODELS: '实用新型',
        VEGETAL_VARIETIES: '植物品种',
        INDUSTRIAL_SECRETS: '工业秘密',
        HELP: '帮助中心'
      },
      APPLICANT: {
        MYREQUESTS: '我的申请',
        REQUESTS: '申请',
        REPORTS: '报告',
        REGISTER: "注册",
        HELP: '帮助中心'
      },
    },
    AUTH: {
      GENERAL: {
        OR: '要么',
        SUBMIT_BUTTON: '提交',
        NO_ACCOUNT: '没有账号？',
        SIGNUP_BUTTON: '注册',
        FORGOT_BUTTON: '忘记密码',
        BACK_BUTTON: '背部',
        CANCEL_BUTTON: '取消',
        PRIVACY: '隐私',
        LEGAL: '法律',
        TERMS: '条款',
        CONTACT: '联系',
        PLANS: '计划',
        ACCEPT_PRIVACY: '输入即接受{{value}}',
      },
      LOGIN: {
        TITLE: '登录',
        CEPPI: '知识产权专利中心',
        BUTTON: '登录',
        ERROR: '凭据不正确',
        EPASSWORD: '最少6个字符',
        ERROR_DETAIL: '检查您的用户名和密码',
        USERNAME: '用戶名',
        PASSWORD: '密码',
        LOADING: '请等待',
      },
      FORGOT: {
        TITLE: '忘记密码？',
        DESC: '请输入您的电子邮件来重置密码',
        SUCCESS: '密码重置已发送',
        ERROR: '抱歉，请重试',
        SENDING: '发送中',
        EMAIL: {
          LABEL: '电子邮件',
          PLACEHOLDER: 'example@domain.com',
          REQUIRED: '必填字段',
          INVALID: '输入有效的电子邮件'
        },
      },
      PRIVACY: {
        TITLE: '隐私声明',
        CONTENT: '完整的隐私声明文本',
        ACCEPT: '接受'
      },
      REGISTER: {
        TITLE: '注册',
        DESC: '输入您的详细信息来创建账户',
        SUCCESS: '您的账户已成功注册。'
      },
      INPUT: {
        EMAIL: '电子邮件',
        FULLNAME: '全名',
        PASSWORD: '密码',
        CONFIRM_PASSWORD: '确认密码',
        USERNAME: '用戶名'
      },
      VALIDATION: {
        INVALID: '{{name}}无效',
        REQUIRED: '{{name}}是必需的',
        MIN_LENGTH: '{{name}}最小长度是{{min}}',
        AGREEMENT_REQUIRED: '需要接受条款和条件',
        NOT_FOUND: '未找到请求的{{name}}',
        INVALID_LOGIN: '登录详细信息不正确',
        REQUIRED_FIELD: '必填字段',
        MIN_LENGTH_FIELD: '字段最小长度:',
        MAX_LENGTH_FIELD: '字段最大长度:',
        INVALID_FIELD: '字段无效',
      }
    },
    REPORTS: {
      TITLE: '可用报告',
      DESC: '生成已注册申请的报告',
      BUTTON: '生成报告',
      LOADING: '生成报告中',
      ADMIN: {
        INSTITUTION: {
          TITLE: '机构',
          DESCRIPTION: '已注册机构的报告。'
        },
        STATE: {
          TITLE: '联邦实体',
          DESCRIPTION: '按联邦实体的报告。'
        },
        TYPE: {
          TITLE: '联邦或分散',
          DESCRIPTION: '按机构类型分类的报告。'
        }
      },
      COORDINATOR: {
        DEPARTMENT: {
          TITLE: '部门',
          DESCRIPTION: '按部门的报告。'
        },
        RESEARCHER: {
          TITLE: '研究人员',
          DESCRIPTION: '研究人员的报告。'
        },
        ACADEMIC: {
          TITLE: '学术团体',
          DESCRIPTION: '学术团体的报告。'
        },
        PROGRAM: {
          TITLE: '教育项目',
          DESCRIPTION: '教育项目的报告。'
        },
        DATE: {
          TITLE: '申请日期',
          DESCRIPTION: '按申请日期的报告。'
        }
      },
      GUEST: {
        DATE: {
          TITLE: '申请日期',
          DESCRIPTION: '按申请日期的报告。'
        },
        TYPE: {
          TITLE: '申请类型',
          DESCRIPTION: '按申请类型的报告。'
        },
      },
    },
    ECOMMERCE: {
      COMMON: {
        SELECTED_RECORDS_COUNT: '选中记录数: ',
        ALL: '全部',
        SUSPENDED: '暂停',
        ACTIVE: '活跃',
        FILTER: '过滤器',
        BY_STATUS: '按状态',
        BY_TYPE: '按类型',
        BUSINESS: '商业',
        INDIVIDUAL: '个人',
        SEARCH: '搜索',
        IN_ALL_FIELDS: '在所有字段中'
      },
      ECOMMERCE: '电子商务',
      CUSTOMERS: {
        CUSTOMERS: '顾客',
        CUSTOMERS_LIST: '客户名单',
        NEW_CUSTOMER: '新客户',
        DELETE_CUSTOMER_SIMPLE: {
          TITLE: '客户删除',
          DESCRIPTION: '您确定要永久删除此客户吗？',
          WAIT_DESCRIPTION: '客户正在删除中...',
          MESSAGE: '客户已被删除'
        },
        DELETE_CUSTOMER_MULTY: {
          TITLE: '客户删除',
          DESCRIPTION: '您确定要永久删除选中的客户吗？',
          WAIT_DESCRIPTION: '客户正在删除中...',
          MESSAGE: '选中的客户已被删除'
        },
        UPDATE_STATUS: {
          TITLE: '选中客户的状态已更新',
          MESSAGE: '选中客户的状态已成功更新'
        },
        EDIT: {
          UPDATE_MESSAGE: '客户已更新',
          ADD_MESSAGE: '客户已创建'
        }
      }
    },
    KEYWORDS: {
      ABOUT: '关于',
      SUPPORT: '支持',
      THEME: {
        LIGHT: '明亮',
        DARK: '深色',
        SYSTEM: '系统'
      },
      MY_PROFILE: '我的档案',
      LANGUAGE: '语言',
      SETTINGS: '设置',
      SIGN_OUT: '登出',
      LOADING: '加载中...',
    },
    ERROR: {
      NOTAVAILABLE: {
        TITLE: "功能不可用",
        DESCRIPTION: "抱歉，此功能目前不可用。请稍后重试，如果问题仍然存在，请联系技术支持。",
        BACK_TO_HOME: "返回主页"
      },
      NOT_FOUND: {
        TITLE: '页面未找到',
        BODY: '我们无法找到该页面。',
        BACK_TO_HOME: "返回主页"
      }
    },
    GUEST: {
      REGISTER: {
        COPYRIGHT: {
          TITLE: '版权',
          DESCRIPTION: '保护文学、艺术、音乐、视听作品和软件程序'
        },
        PATENT: {
          TITLE: '专利',
          DESCRIPTION: '保护具有工业应用的发明'
        },
        UTILITY_MODEL: {
          TITLE: '实用新型',
          DESCRIPTION: '保护改进的物品、器具或工具'
        },
        INDUSTRIAL_DESIGN: {
          TITLE: '工业设计',
          DESCRIPTION: '保护工业产品的装饰外观'
        },
        TRADEMARK: {
          TITLE: '商标',
          DESCRIPTION: '保护独特的商业标识'
        },
        PLANT_VARIETY: {
          TITLE: '植物品种',
          DESCRIPTION: '保护新的植物品种'
        },
        INDUSTRIAL_SECRET: {
          TITLE: '工业秘密',
          DESCRIPTION: '保护商业秘密和机密信息'
        },
        CIRCUIT_MAPPING: {
          TITLE: '集成电路布图',
          DESCRIPTION: '保护电路设计'
        }
      }
    },
    USER_REGISTER: {
      TITLE: '新用户注册',
      DESCRIPTION: '在系统中注册新用户。选择您要注册的用户类型并完成必填字段。',
      REGISTER: '注册',
      COORDINATOR: {
        TITLE: '协调员注册',
        DESCRIPTION: '在系统中注册新的协调员。',
      },
      GUEST: {
        TITLE: '申请人注册',
        DESCRIPTION: '在系统中注册新的申请人。',
      },
    }
  },
};
