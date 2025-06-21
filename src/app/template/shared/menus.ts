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
    type: 'dropdown',
    children: [

      {
        name: 'BUTTON.NEW.COORDINATOR',
        icon: 'person',
        type: 'link',
        link: '/administrador/coordinador/registro',
      },
      {
        name: 'BUTTON.NEW.APPLICANT',
        icon: 'person_add',
        type: 'link',
        link: '/administrador/solicitante/registro',
      }
    ]
  },
  {
    name: 'MENU.USERS',
    type: 'separator',
  },
  {
    name: 'MENU.ADMIN.COORDINATORS',
    icon: 'person',
    link: '/administrador/coordinadores',
    type: 'link'
  },
  {
    name: 'MENU.ADMIN.APPLICANTS',
    icon: 'person_add',
    link: '/administrador/solicitantes',
    type: 'link'
  },
  {
    name: 'MENU.INTELECTUAL_PROPERTIES',
    type: 'separator',
  },
  {
    name: 'MENU.ADMIN.PATENTS',
    icon: 'emoji_objects',
    link: '/administrador/propiedades/patente',
    type: 'link'
  },
  {
    name: 'MENU.ADMIN.TRADEMARKS',
    icon: 'branding_watermark',
    link: '/administrador/propiedades/marca',
    type: 'link'
  },
  {
    name: 'MENU.ADMIN.UTILITY_MODELS',
    icon: 'construction',
    link: '/administrador/propiedades/modelo-utilidad',
    type: 'link'
  },
  {
    name: 'MENU.ADMIN.COPYRIGHTS',
    icon: 'copyright',
    link: '/administrador/propiedades/derecho-autor',
    type: 'link'
  },
  {
    name: 'MENU.ADMIN.INDUSTRIAL_DESIGNS',
    icon: 'architecture',
    link: '/administrador/propiedades/diseno-industrial',
    type: 'link'
  },
  {
    name: 'MENU.REPORTS',
    type: 'separator',
  },
  {
    name: 'MENU.REPORTS',
    icon: 'bar_chart',
    link: '/administrador/reportes',
    type: 'link'
  }
];

export const COORDINATOR_MENUS = [
  {
    name: 'MENU.DASHBOARD',
    icon: 'dashboard',
    link: '/coordinador/dashboard',
    type: 'link',
  },
  {
    name: 'MENU.REGISTERS',
    icon: 'add',
    type: 'separator'
  },
  {
    name: 'MENU.INTELECTUAL_PROPERTIES',
    icon: 'note_add',
    type: 'dropdown',
    children: [
      {
        name: 'BUTTON.NEW.PATENT',
        icon: 'emoji_objects',
        type: 'link',
        link: '/coordinador/propiedades/registro/patente',
      },
      {
        name: 'BUTTON.NEW.TRADEMARK',
        icon: 'branding_watermark',
        type: 'link',
        link: '/coordinador/propiedades/registro/marca',
      },
      {
        name: 'BUTTON.NEW.UTILITY_MODEL',
        icon: 'construction',
        type: 'link',
        link: '/coordinador/propiedades/registro/modelo-utilidad',
      },
      {
        name: 'BUTTON.NEW.COPYRIGHT',
        icon: 'description',
        type: 'link',
        link: '/coordinador/propiedades/registro/derecho-autor',
      },
      {
        name: 'BUTTON.NEW.INDUSTRIAL_DESIGN',
        icon: 'description',
        type: 'link',
        link: '/coordinador/propiedades/registro/diseno-industrial',
      }
    ]
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
  },
  {
    name: 'MENU.INTELECTUAL_PROPERTIES',
    type: 'separator',
  },
  {
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
    name: 'MENU.REPORTS',
    type: 'separator',
  },
  {
    name: 'MENU.REPORTS',
    icon: 'bar_chart',
    link: '/coordinador/reportes',
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
    name: 'MENU.APPLICANT.MYPROFILE',
    type: 'separator',
  },
  {
    name: 'MENU.APPLICANT.MYPROFILE',
    icon: 'person',
    type: 'link',
    link: '/solicitante/perfil',
  },
  {
    name: 'MENU.APPLICANT.REGISTER',
    icon: 'add',
    type: 'separator'
  },
  {
    name: 'MENU.APPLICANT.REQUEST',
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
  }
];