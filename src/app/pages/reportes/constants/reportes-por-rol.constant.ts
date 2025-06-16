export interface ReporteCard {
  titulo: string;
  descripcion: string;
  archivo: string;
  color: string;
  icono: string; 
}

export type Rol = 'admin' | 'coordinador' | 'solicitante';

export const REPORTES_POR_ROL: Record<Rol, ReporteCard[]> = {
    admin: [
    {
      titulo: 'Institución',
      descripcion: 'Reporte de instituciones registradas.',
      archivo: 'reporte-instituciones.pdf',
      color: 'blue',
      icono: 'school' 
    },
    {
      titulo: 'Entidad Federativa',
      descripcion: 'Reporte por estados.',
      archivo: 'reporte-entidad.pdf',
      color: 'green',
      icono: 'map' 
    },
    {
      titulo: 'Federal o Descentralizado',
      descripcion: 'Reporte clasificado.',
      archivo: 'reporte-clasificacion.pdf',
      color: 'orange',
      icono: 'apartment' 
    },
  ],
  coordinador: [
    {
      titulo: 'Departamento',
      descripcion: 'Reporte de departamentos.',
      archivo: 'reporte-departamentos.pdf',
      color: 'purple',
      icono: 'domain' 
    },
    {
      titulo: 'Investigador',
      descripcion: 'Reporte de investigadores.',
      archivo: 'reporte-investigadores.pdf',
      color: 'red',
      icono: 'science' 
    },
    {
      titulo: 'Cuerpo Académico',
      descripcion: 'Reporte de cuerpos académicos.',
      archivo: 'reporte-cuerpo-academico.pdf',
      color: 'pink',
      icono: 'group' 
    },
    {
      titulo: 'Programa Educativo',
      descripcion: 'Reporte de programas educativos.',
      archivo: 'reporte-programa-educativo.pdf',
      color: 'blue',
      icono: 'menu_book' 
    },
    {
      titulo: 'Fecha',
      descripcion: 'Reporte filtrado por fechas.',
      archivo: 'reporte-fecha-coordinador.pdf',
      color: 'teal',
      icono: 'event' 
    },
  ],
  solicitante: [
    {
      titulo: 'Fecha',
      descripcion: 'Reporte de mis solicitudes por fecha.',
      archivo: 'reporte-fecha-solicitante.pdf',
      color: 'green',
      icono: 'calendar_today' 
    },
    {
      titulo: 'Tipo de Solicitud',
      descripcion: 'Reporte por tipo de solicitud.',
      archivo: 'reporte-tipo-solicitud.pdf',
      color: 'orange',
      icono: 'assignment'
    },
  ]

};

