export interface RegistroCard {
  titulo: string;
  descripcion: string;
  ruta: string;
  color: string;
  icono: string;
}

export const REGISTROS_POR_CEPAT: { [key: string]: RegistroCard } = {
  'coordinador': {
    titulo: 'USER_REGISTER.COORDINATOR.TITLE',
    descripcion: 'USER_REGISTER.COORDINATOR.DESCRIPTION',
    color: 'sky',
    icono: 'person_add',
    ruta: '/cepat/coordinador/registro',
  },
};

