export interface HistoricalRegisterCard {
    titulo: string;
    descripcion: string;
    ruta: string;
    color: string;
    icono: string;
  }

export const HISTORICAL_REGISTERS: { [key: string]: HistoricalRegisterCard } = {
  'impi': {
    titulo: 'HISTORICAL_REGISTER.IMPI.TITLE',
    descripcion: 'HISTORICAL_REGISTER.IMPI.DESCRIPTION',
    color: 'sky',
    icono: 'description',
    ruta: 'impi',
  },
  'indautor': {
    titulo: 'HISTORICAL_REGISTER.INDAUTOR.TITLE',
    descripcion: 'HISTORICAL_REGISTER.INDAUTOR.DESCRIPTION',
    color: 'peach',
    icono: 'person_add_alt',
    ruta: 'indautor',
  },

};
