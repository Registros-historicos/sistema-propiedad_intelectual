export interface RegistroCard {
  titulo: string;
  descripcion: string;
  ruta: string;
  color: string;
  icono: string;
}

export const REGISTROS_POR_ROL: { [key: string]: RegistroCard } = {
  'coordinador': {
    titulo: 'USER_REGISTER.COORDINATOR.TITLE',
    descripcion: 'USER_REGISTER.COORDINATOR.DESCRIPTION',
    color: 'sky',
    icono: 'person_add',
    ruta: '/administrador/coordinador/registro',
  },
  'solicitante': {
    titulo: 'USER_REGISTER.GUEST.TITLE',
    descripcion: 'USER_REGISTER.GUEST.DESCRIPTION',
    color: 'peach',
    icono: 'person_add_alt',
    ruta: '/administrador/solicitante/registro',
  },
};

