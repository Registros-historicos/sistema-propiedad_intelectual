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
    name: 'MENU.ADMIN.USERS',
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
        link: '/administrador/propiedades/patente',
      },
      {
        name: 'MENU.ADMIN.TRADEMARKS',
        icon: 'element-11',
        link: '/administrador/propiedades/marca',
      },
      {
        name: 'MENU.ADMIN.UTILITY_MODELS',
        icon: 'element-11',
        link: '/administrador/propiedades/modelo-utilidad',
      },
      {
        name: 'MENU.ADMIN.COPYRIGHTS',
        icon: 'element-11',
        link: '/administrador/propiedades/derecho-autor',
      },
      {
        name: 'MENU.ADMIN.INDUSTRIAL_DESIGNS',
        icon: 'element-11',
        link: '/administrador/propiedades/diseno-industrial',
      }
    ],
  }
];

export const COORDINATOR_MENUS = [
  {
    name: 'MENU.DASHBOARD',
    icon: 'element-11',
    link: '/coordinador/dashboard',
    type: 'link',
  },
  {
    name: 'MENU.COORD.MANAGEMENT',
    type: 'separator',
  },
  {
    name: 'MENU.ADMIN.USERS',
    icon: 'profile-user',
    type: 'dropdown',
    children: [
      {
        name: 'MENU.COORD.APPLICANTS',
        icon: 'profile-user',
        type: 'dropdown-link',
        link: '/coordinador/solicitantes',
        children: [
          {
            name: 'BUTTON.NEW.APPLICANTS',
            icon: 'user-edit',
            link: '/coordinador/solicitante/registro',
          },
        ],
      },
    ],
  },
  {
    name: 'MENU.COORD.INTELECTUAL_PROPERTY',
    icon: 'element-11',
    type: 'dropdown',
    children: [
      {
        name: 'MENU.COORD.PATENTS',
        icon: 'element-11',
        link: '/coordinador/patentes',
        type: 'dropdown-link',
        children: [
          {
            name: 'BUTTON.NEW.PATENT',
            icon: 'user-edit',
            link: '/coordinador/patente/registro',
          },
        ],
      },
      {
        name: 'MENU.COORD.TRADEMARKS',
        icon: 'element-11',
        link: '/coordinador/marcas',
        type: 'dropdown-link',
        children: [
          {
            name: 'BUTTON.NEW.TRADEMARK',
            icon: 'element-11',
            link: '/coordinador/marca/registro',
          },
        ],
      },
      {
        name: 'MENU.COORD.UTILITY_MODELS',
        icon: 'element-11',
        link: '/coordinador/modelos-utilidad',
        type: 'dropdown-link',
        children: [
          {
            name: 'BUTTON.NEW.UTILITY_MODEL',
            icon: 'element-11',
            link: '/coordinador/modelo-utilidad/registro',
          },
        ],
      },
      {
        name: 'MENU.COORD.COPYRIGHTS',
        icon: 'element-11',
        link: '/coordinador/derechos-autores',
        type: 'dropdown-link',
        children: [
          {
            name: 'BUTTON.NEW.COPYRIGHT',
            icon: 'element-11',
            link: '/coordinador/derecho-autor/registro',
          },
        ],
      },
      {
        name: 'MENU.COORD.INDUSTRIAL_DESIGNS',
        icon: 'element-11',
        link: '/coordinador/disenos-industriales',
        type: 'dropdown-link',
        children: [
          {
            name: 'BUTTON.NEW.INDUSTRIAL_DESIGN',
            icon: 'element-11',
            link: '/coordinador/diseno-industrial/registro',
          },
        ],
      }
    ],
  }
]
