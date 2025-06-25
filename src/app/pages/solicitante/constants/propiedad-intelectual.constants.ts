export interface RegistroPropiedadIntelectual {
  icono: string;
  tituloKey: string;
  descripcionKey: string;
  claseColor: string;
  ruta: string;
}

export const REGISTRO_PROPIEDAD_INTELECTUAL: RegistroPropiedadIntelectual[] = [
  {
    icono: 'description',
    tituloKey: 'GUEST.REGISTER.COPYRIGHT.TITLE',
    descripcionKey: 'GUEST.REGISTER.COPYRIGHT.DESCRIPTION',
    claseColor: 'blue',
    ruta: '/solicitante/registrar/derechos-autor'
  },
  {
    icono: 'lightbulb',
    tituloKey: 'GUEST.REGISTER.PATENT.TITLE',
    descripcionKey: 'GUEST.REGISTER.PATENT.DESCRIPTION',
    claseColor: 'green',
    ruta: '/solicitante/registrar/patente'
  },
  {
    icono: 'construction',
    tituloKey: 'GUEST.REGISTER.UTILITY_MODEL.TITLE',
    descripcionKey: 'GUEST.REGISTER.UTILITY_MODEL.DESCRIPTION',
    claseColor: 'orange',
    ruta: '/solicitante/registrar/modelo-utilidad'
  },
  {
    icono: 'design_services',
    tituloKey: 'GUEST.REGISTER.INDUSTRIAL_DESIGN.TITLE',
    descripcionKey: 'GUEST.REGISTER.INDUSTRIAL_DESIGN.DESCRIPTION',
    claseColor: 'purple',
    ruta: '/solicitante/registrar/derechos-autor'
  },
  {
    icono: 'branding_watermark',
    tituloKey: 'GUEST.REGISTER.TRADEMARK.TITLE',
    descripcionKey: 'GUEST.REGISTER.TRADEMARK.DESCRIPTION',
    claseColor: 'pink',
    ruta: '/solicitante/registrar/derechos-autor'
  },
  {
    icono: 'eco',
    tituloKey: 'GUEST.REGISTER.PLANT_VARIETY.TITLE',
    descripcionKey: 'GUEST.REGISTER.PLANT_VARIETY.DESCRIPTION',
    claseColor: 'teal',
    ruta: '/solicitante/registrar/variedad-vegetal'
  },
  {
    icono: 'lock',
    tituloKey: 'GUEST.REGISTER.INDUSTRIAL_SECRET.TITLE',
    descripcionKey: 'GUEST.REGISTER.INDUSTRIAL_SECRET.DESCRIPTION',
    claseColor: 'brown',
    ruta: '/solicitante/registrar/secreto-industrial'
  }
];
