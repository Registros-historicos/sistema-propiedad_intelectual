export const ADMINISTRATOR_MENUS = [
  {
    name: 'MENU.DASHBOARD',
    icon: 'element-11',
    link: '/administrador/dashboard',
    type: 'link',
  },
  {
    name: 'MENU.ADMIN.MANAGEMENT',
    type: 'separator',
  },
  {
    name: 'Users',
    icon: 'profile-user',
    type: 'dropdown',
    children: [
      {
        name: 'MENU.ADMIN.COORDINATORS',
        icon: 'profile-user',
        link: '/administrador/coordinadores',
      },
      {
        name: 'MENU.ADMIN.APPLICANTS',
        icon: 'profile-user',
        link: '/administrador/solicitantes',
      },
    ],
  },
  {
    name: 'MENU.ADMIN.INTELECTUAL_PROPERTY',
    icon: 'element-11',
    type: 'dropdown',
    children: [
      {
        name: 'MENU.ADMIN.PATENTS',
        icon: 'element-11',
        link: '/administrador/patente',
      },
      {
        name: 'MENU.ADMIN.TRADEMARKS',
        icon: 'element-11',
        link: '/administrador/marca',
      },
      {
        name: 'MENU.ADMIN.UTILITY_MODELS',
        icon: 'element-11',
        link: '/administrador/modelo-utilidad',
      },
      {
        name: 'MENU.ADMIN.COPYRIGHTS',
        icon: 'element-11',
        link: '/administrador/derecho-autor',
      },
      {
        name: 'MENU.ADMIN.INDUSTRIAL_DESIGNS',
        icon: 'element-11',
        link: '/administrador/diseno-industrial',
      }
    ],
  }
];
