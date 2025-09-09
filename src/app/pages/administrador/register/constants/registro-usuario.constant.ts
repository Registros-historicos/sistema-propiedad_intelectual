export interface RegistroCard {
  titulo: string;
  descripcion: string;
  ruta: string;
  color: string;
  icono: string;
}

export const REGISTROS_POR_ROL: { [key: string]: RegistroCard } = {
  'cepat': {
    titulo: 'USER_REGISTER.GUEST.TITLE',
    descripcion: 'USER_REGISTER.GUEST.DESCRIPTION',
    color: 'peach',
    icono: 'person_add_alt',
    ruta: '/administrador/solicitante/registro',
  },
};

