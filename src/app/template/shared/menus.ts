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
        icon: 'manage_accounts',
        type: 'link',
        link: '/administrador/coordinador/registro',
      },
      {
        name: 'BUTTON.NEW.APPLICANT',
        icon: 'person',
        type: 'link',
        link: '/administrador/solicitante/registro',
      }
    ]
  },
  {
    name: 'MENU.INTELECTUAL_PROPERTIES',
    icon: 'note_add',
    type: 'dropdown',
    children: [
      {
        name: 'BUTTON.NEW.PATENT',
        icon: 'description',
        type: 'link',
        link: '/administrador/propiedades/patente/registro',
      },
      {
        name: 'BUTTON.NEW.TRADEMARK',
        icon: 'description',
        type: 'link',
        link: '/administrador/propiedades/marca/registro',
      },
      {
        name: 'BUTTON.NEW.UTILITY_MODEL',
        icon: 'description',
        type: 'link',
        link: '/administrador/propiedades/modelo-utilidad/registro',
      },
      {
        name: 'BUTTON.NEW.COPYRIGHT',
        icon: 'description',
        type: 'link',
        link: '/administrador/propiedades/derecho-autor/registro',
      },
      {
        name: 'BUTTON.NEW.INDUSTRIAL_DESIGN',
        icon: 'description',
        type: 'link',
        link: '/administrador/propiedades/diseno-industrial/registro',
      }
    ]
  },
  {
    name: 'MENU.INTELECTUAL_PROPERTIES',
    type: 'separator',
  },
  {
    name: 'MENU.ADMIN.PATENTS',
    icon: 'description',
    link: '/administrador/propiedades/patente',
    type: 'link'
  },
  {
    name: 'MENU.ADMIN.TRADEMARKS',
    icon: 'description',
    link: '/administrador/propiedades/marca',
    type: 'link'
  },
  {
    name: 'MENU.ADMIN.UTILITY_MODELS',
    icon: 'description',
    link: '/administrador/propiedades/modelo-utilidad',
    type: 'link'
  },
  {
    name: 'MENU.ADMIN.COPYRIGHTS',
    icon: 'description',
    link: '/administrador/propiedades/derecho-autor',
    type: 'link'
  },
  {
    name: 'MENU.ADMIN.INDUSTRIAL_DESIGNS',
    icon: 'description',
    link: '/administrador/propiedades/diseno-industrial',
    type: 'link'
  }
];

export const APPLICANTS_MENU = [
  {
    name: 'MENU.ADMIN.MANAGEMENT',
    type: 'separator',
  },
  {
    name: 'MENU.APPLICANT.MYPROFILE',
    icon: 'profile-user',
    type: 'link',
    link: '/solicitante/dashboard',
  },
  {
    name: 'MENU.APPLICANT.REQUEST',
    icon: 'element-11',
    type: 'link',
    link: '/solicitante/registro',
  },
  {
    name: 'MENU.APPLICANT.REPORTS',
    icon: 'element-11',
    type: 'link',
    link: '/solicitante/reportes',
  },
];
