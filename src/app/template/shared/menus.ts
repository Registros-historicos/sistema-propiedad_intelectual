export const ADMINISTRATOR_MENUS = [
  {
    name: 'MENU.DASHBOARD',
    icon: 'dashboard',
    link: '/administrador/dashboard',
    type: 'link',
  },
  {
    name: 'MENU.REGISTERS',
    icon: 'add',
    type: 'separator'
  },
  {
    name: 'MENU.USERS',
    icon: 'person_add',
    link: '/administrador/registro',
    type: 'link',
  },
  {
    name: 'MENU.HISTORICAL_REGISTERS',
    icon: 'description',
    link: '/administrador/registros/historicos',
    type: 'link'
  },
  {
    name: 'MENU.USERS',
    type: 'separator',
  },
  {
    name: 'MENU.ADMIN.CEPATS',
    icon: 'person',
    link: '/administrador/coordinadores',
    type: 'link'
  },
  {
    name: 'MENU.ADMIN.COORDINATORS',
    icon: 'person',
    link: '/administrador/solicitantes',
    type: 'link'
  },
  {
    name: 'MENU.INTELECTUAL_PROPERTIES',
    type: 'separator',
  },
  {
    name: 'MENU.ADMIN.IMPI_REGISTRIES',
    icon: 'emoji_objects',
    link: '/administrador/propiedades/patente',
    type: 'link'
  },
  {
    name: 'MENU.ADMIN.INDAUTOR_REGISTRIES',
    icon: 'emoji_objects',
    link: '/administrador/propiedades/modelo-utilidad',
    type: 'link'
  },
  // {
  //   name: 'MENU.ADMIN.PATENTS',
  //   icon: 'emoji_objects',
  //   link: '/administrador/propiedades/patente',
  //   type: 'link'
  // },
  // {
  //   name: 'MENU.ADMIN.TRADEMARKS',
  //   icon: 'branding_watermark',
  //   link: '/administrador/propiedades/marca',
  //   type: 'link'
  // },
  // {
  //   name: 'MENU.ADMIN.UTILITY_MODELS',
  //   icon: 'construction',
  //   link: '/administrador/propiedades/modelo-utilidad',
  //   type: 'link'
  // },
  // {
  //   name: 'MENU.ADMIN.COPYRIGHTS',
  //   icon: 'copyright',
  //   link: '/administrador/propiedades/derecho-autor',
  //   type: 'link'
  // },
  // {
  //   name: 'MENU.ADMIN.INDUSTRIAL_DESIGNS',
  //   icon: 'architecture',
  //   link: '/administrador/propiedades/diseno-industrial',
  //   type: 'link'
  // },
  // {
  //   name: 'MENU.ADMIN.VEGETAL_VARIETIES',
  //   icon: 'eco',
  //   link: '/administrador/propiedades/variedad-vegetal',
  //   type: 'link'
  // },
  // {
  //   name: 'MENU.ADMIN.INDUSTRIAL_SECRETS',
  //   icon: 'lock',
  //   link: '/administrador/propiedades/secreto-industrial',
  //   type: 'link'
  // },
  {
    name: 'MENU.REPORTS',
    type: 'separator',
  },
  {
    name: 'MENU.REPORTS',
    icon: 'bar_chart',
    link: '/administrador/reportes',
    type: 'link'
  },
  {
    name: 'MENU.HELP',
    type: 'separator',
  },
  {
    name: 'MENU.ADMIN.HELP',
    icon: 'help',
    link: '/administrador/ayuda',
    type: 'link'
  },
];

export const COORDINATOR_MENUS = [
  {
    name: 'MENU.DASHBOARD',
    icon: 'dashboard',
    link: '/coordinador/dashboard',
    type: 'link',
  },
  /*{
    name: 'MENU.REGISTERS',
    icon: 'add',
    type: 'separator'
  },
  {
    name: 'MENU.USERS',
    icon: 'person_add',
    link: '/coordinador/registro',
    type: 'link',
  },
  {
    name: 'MENU.USERS',
    type: 'separator',
  },
  {
    name: 'MENU.ADMIN.APPLICANTS',
    icon: 'person_add',
    link: '/coordinador/solicitantes',
    type: 'link'
  },*/
  {
    name: 'MENU.REGISTERS',
    icon: 'add',
    type: 'separator'
  },
  {
    name: 'MENU.HISTORICAL_REGISTERS',
    icon: 'description',
    link: '/coordinador/registros/historicos',
    type: 'link'
  },
  {
    name: 'MENU.INTELECTUAL_PROPERTIES',
    type: 'separator',
  },
  {
    name: 'MENU.COORD.IMPI_REGISTRIES',
    icon: 'emoji_objects',
    link: '/coordinador/propiedades/patente',
    type: 'link'
  },
  {
    name: 'MENU.COORD.INDAUTOR_REGISTRIES',
    icon: 'emoji_objects',
    link: '/coordinador/propiedades/modelo-utilidad',
    type: 'link'
  },
  /*{
    name: 'MENU.COORD.PATENTS',
    icon: 'emoji_objects',
    link: '/coordinador/propiedades/patente',
    type: 'link'
  },
  {
    name: 'MENU.COORD.TRADEMARKS',
    icon: 'branding_watermark',
    link: '/coordinador/propiedades/marca',
    type: 'link'
  },
  {
    name: 'MENU.COORD.UTILITY_MODELS',
    icon: 'construction',
    link: '/coordinador/propiedades/modelo-utilidad',
    type: 'link'
  },
  {
    name: 'MENU.COORD.COPYRIGHTS',
    icon: 'copyright',
    link: '/coordinador/propiedades/derecho-autor',
    type: 'link'
  },
  {
    name: 'MENU.COORD.INDUSTRIAL_DESIGNS',
    icon: 'architecture',
    link: '/coordinador/propiedades/diseno-industrial',
    type: 'link'
  },
  {
    name: 'MENU.COORD.VEGETAL_VARIETIES',
    icon: 'eco',
    link: '/coordinador/propiedades/variedad-vegetal',
    type: 'link'
  },
  {
    name: 'MENU.COORD.INDUSTRIAL_SECRETS',
    icon: 'lock',
    link: '/coordinador/propiedades/secreto-industrial',
    type: 'link'
  },*/
  {
    name: 'MENU.REPORTS',
    type: 'separator',
  },
  {
    name: 'MENU.REPORTS',
    icon: 'bar_chart',
    link: '/coordinador/reportes',
    type: 'link'
  },
  {
    name: 'MENU.HELP',
    type: 'separator',
  },
  {
    name: 'MENU.COORD.HELP',
    icon: 'help',
    link: '/coordinador/ayuda',
    type: 'link'
  }
];

export const CEPAT_MENUS = [
  {
    name: 'MENU.DASHBOARD',
    icon: 'dashboard',
    link: '/cepat/dashboard',
    type: 'link',
  },
  {
    name: 'MENU.REGISTERS',
    icon: 'add',
    type: 'separator'
  },
  {
    name: 'MENU.HISTORICAL_REGISTERS',
    icon: 'description',
    link: '/cepat/registros/historicos',
    type: 'link'
  },
  {
    name: 'MENU.INTELECTUAL_PROPERTIES',
    type: 'separator',
  },
  {
    name: 'MENU.ADMIN.IMPI_REGISTRIES',
    icon: 'emoji_objects',
    link: '/cepat/propiedades/patente',
    type: 'link'
  },
  {
    name: 'MENU.ADMIN.INDAUTOR_REGISTRIES',
    icon: 'emoji_objects',
    link: '/cepat/propiedades/modelo-utilidad',
    type: 'link'
  },
  {
    name: 'MENU.REPORTS',
    type: 'separator',
  },
  {
    name: 'MENU.REPORTS',
    icon: 'bar_chart',
    link: '/cepat/reportes',
    type: 'link'
  },
  {
    name: 'MENU.HELP',
    type: 'separator',
  },
  {
    name: 'MENU.COORD.HELP',
    icon: 'help',
    link: '/cepat/ayuda',
    type: 'link'
  }
];

export const APPLICANTS_MENU = [
  {
    name: 'MENU.DASHBOARD',
    icon: 'dashboard',
    link: '/solicitante/dashboard',
    type: 'link',
  },
  {
    name: 'MENU.APPLICANT.REQUESTS',
    type: 'separator',
  },
  {
    name: 'MENU.APPLICANT.MYREQUESTS',
    icon: 'person',
    type: 'link',
    link: '/solicitante/solicitudes',
  },
  {
    name: 'MENU.REGISTERS',
    icon: 'add',
    type: 'separator'
  },
  {
    name: 'MENU.APPLICANT.REGISTER',
    icon: 'description',
    type: 'link',
    link: '/solicitante/registrar',
  },
  {
    name: 'MENU.REPORTS',
    type: 'separator',
  },
  {
    name: 'MENU.REPORTS',
    icon: 'analytics',
    link: 'solicitante/reportes',
    type: 'link'
  },
  {
    name: 'MENU.HELP',
    type: 'separator',
  },
  {
    name: 'MENU.APPLICANT.HELP',
    icon: 'help',
    link: '/solicitante/ayuda',
    type: 'link'
  }
];
