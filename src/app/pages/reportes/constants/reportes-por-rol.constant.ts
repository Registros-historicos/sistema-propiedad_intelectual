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
      titulo: 'REPORTS.ADMIN.FEDERAL.TITLE',
      descripcion: 'REPORTS.ADMIN.FEDERAL.DESCRIPTION',
      archivo: 'reporte_entidad_federativa',
      color: 'blue',
      icono: 'location_city'
    },
    {
      titulo: 'REPORTS.ADMIN.DECENTRALIZED.TITLE',
      descripcion: 'REPORTS.ADMIN.DECENTRALIZED.DESCRIPTION',
      archivo: 'reporte_entidad_federativa',
      color: 'cyan',
      icono: 'apartment'
    },
    {
      titulo: 'REPORTS.ADMIN.TOP_INSTITUTIONS.TITLE',
      descripcion: 'REPORTS.ADMIN.TOP_INSTITUTIONS.DESCRIPTION',
      archivo: 'reporte_entidad_federativa',
      color: 'purple',
      icono: 'emoji_events'
    },
    {
      titulo: 'REPORTS.ADMIN.TOP_STATES.TITLE',
      descripcion: 'REPORTS.ADMIN.TOP_STATES.DESCRIPTION',
      archivo: 'reporte_entidad_federativa',
      color: 'indigo',
      icono: 'workspace_premium'
    },
    {
      titulo: 'REPORTS.ADMIN.YEAR.TITLE',
      descripcion: 'REPORTS.ADMIN.YEAR.DESCRIPTION',
      archivo: 'reporte_registros_anio',
      color: 'teal',
      icono: 'date_range'
    },
    {
      titulo: 'REPORTS.ADMIN.SECTOR.TITLE',
      descripcion: 'REPORTS.ADMIN.SECTOR.DESCRIPTION',
      archivo: 'reporte_entidad_federativa',
      color: 'orange',
      icono: 'warehouse'
    },
    {
      titulo: 'REPORTS.ADMIN.STATUS.TITLE',
      descripcion: 'REPORTS.ADMIN.STATUS.DESCRIPTION',
      archivo: 'reporte_registros_estatus',
      color: 'red',
      icono: 'assignment_turned_in'
    },
    {
      titulo: 'REPORTS.ADMIN.GENERAL.TITLE',
      descripcion: 'REPORTS.ADMIN.GENERAL.DESCRIPTION',
      archivo: 'reporte_entidad_federativa',
      color: 'pink',
      icono: 'pie_chart'
    },
    {
      titulo: 'REPORTS.ADMIN.INSTITUTION.TITLE',
      descripcion: 'REPORTS.ADMIN.INSTITUTION.DESCRIPTION',
      archivo: 'reporte_entidad_federativa',
      color: 'green',
      icono: 'business'
    },
    {
      titulo: 'REPORTS.ADMIN.SEX.TITLE',
      descripcion: 'REPORTS.ADMIN.SEX.DESCRIPTION',
      archivo: 'reporte_entidad_federativa',
      color: 'brown',
      icono: 'wc'
    },
    {
      titulo: 'REPORTS.ADMIN.CATEGORY.TITLE',
      descripcion: 'REPORTS.ADMIN.CATEGORY.DESCRIPTION',
      archivo: 'reporte_entidad_federativa',
      color: 'yellow',
      icono: 'groups'
    }
  ],
  coordinador: [
    {
      titulo: 'REPORTS.COORDINATOR.DEPARTMENT.TITLE',
      descripcion: 'REPORTS.COORDINATOR.DEPARTMENT.DESCRIPTION',
      archivo: 'reporte-departamentos.pdf',
      color: 'purple',
      icono: 'domain' 
    },
    {
      titulo: 'REPORTS.COORDINATOR.ACADEMIC.TITLE',
      descripcion: 'REPORTS.COORDINATOR.ACADEMIC.DESCRIPTION',
      archivo: 'reporte-cuerpo-académico.pdf',
      color: 'pink',
      icono: 'groups' 
    },
    {
      titulo: 'REPORTS.COORDINATOR.PROGRAM.TITLE',
      descripcion: 'REPORTS.COORDINATOR.PROGRAM.DESCRIPTION',
      archivo: 'reporte-programa-educativo.pdf',
      color: 'blue',
      icono: 'menu_book' 
    },
    
    {
      titulo: 'REPORTS.COORDINATOR.RESEARCHER.TITLE',
      descripcion: 'REPORTS.COORDINATOR.RESEARCHER.DESCRIPTION',
      archivo: 'reporte-investigadores.pdf',
      color: 'red',
      icono: 'science' 
    },
    {
      titulo: 'REPORTS.COORDINATOR.DATE.TITLE',
      descripcion: 'REPORTS.COORDINATOR.DATE.DESCRIPTION',
      archivo: 'reporte-fecha-de-solicitud.pdf',
      color: 'teal',
      icono: 'event' 
    },
  ],
  solicitante: [
    {
      titulo: 'REPORTS.GUEST.DATE.TITLE',
      descripcion: 'REPORTS.GUEST.DATE.DESCRIPTION',
      archivo: 'reporte-fecha-de-solicitud.pdf',
      color: 'green',
      icono: 'calendar_today' 
    },
    {
      titulo: 'REPORTS.GUEST.TYPE.TITLE',
      descripcion: 'REPORTS.GUEST.TYPE.DESCRIPTION',
      archivo: 'reporte-tipo-de-solicitud.pdf',
      color: 'orange',
      icono: 'assignment'
    },
  ]

};

