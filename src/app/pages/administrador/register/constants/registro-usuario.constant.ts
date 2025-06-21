export interface RegistroCard {
  titulo: string;
  descripcion: string;
  ruta: string;
  color: string;
  icono: string;
}

export const REGISTROS_POR_ROL: { [key: string]: RegistroCard } = {
  'coordinador': {
    titulo: 'Registro de Coordinadores',
    descripcion: 'Registra nuevos coordinadores en el sistema.',
    color: 'sky',
    icono: 'person_add',
    ruta: '/administrador/coordinador/registro',
  },
  'solicitante': {
    titulo: 'Registro de Solicitantes',
    descripcion: 'Registra nuevos solicitantes en el sistema.',
    color: 'peach',
    icono: 'person_add_alt',
    ruta: '/administrador/solicitante/registro',
  },
};

