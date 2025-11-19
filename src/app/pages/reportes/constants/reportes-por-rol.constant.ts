export interface ReporteCard {
  titulo: string;
  descripcion: string;
  archivo: string;
  color: string;
  icono: string; 
}

export type Rol = 'admin' | 'coordinador' | 'solicitante' | 'cepat';

export const REPORTES_POR_ROL: Record<Rol, ReporteCard[]> = {
    // Se agregaron reportes para el rol de administrador
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
      archivo: 'reporte_entidad_federativa',
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
      archivo: 'reporte_entidad_federativa',
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
  cepat: [
    {
      titulo: 'REPORTS.CEPAT.FEDERAL.TITLE',
      descripcion: 'REPORTS.CEPAT.FEDERAL.DESCRIPTION',
      archivo: 'reporte_entidad_federativa',
      color: 'blue',
      icono: 'location_city'
    },
    {
      titulo: 'REPORTS.CEPAT.DECENTRALIZED.TITLE',
      descripcion: 'REPORTS.CEPAT.DECENTRALIZED.DESCRIPTION',
      archivo: 'reporte_entidad_federativa',
      color: 'cyan',
      icono: 'apartment'
    },
    {
      titulo: 'REPORTS.CEPAT.TOP_INSTITUTIONS.TITLE',
      descripcion: 'REPORTS.CEPAT.TOP_INSTITUTIONS.DESCRIPTION',
      archivo: 'reporte_entidad_federativa',
      color: 'purple',
      icono: 'emoji_events'
    },
    {
      titulo: 'REPORTS.CEPAT.TOP_STATES.TITLE',
      descripcion: 'REPORTS.CEPAT.TOP_STATES.DESCRIPTION',
      archivo: 'reporte_entidad_federativa',
      color: 'indigo',
      icono: 'workspace_premium'
    },
    {
      titulo: 'REPORTS.CEPAT.YEAR.TITLE',
      descripcion: 'REPORTS.CEPAT.YEAR.DESCRIPTION',
      archivo: 'reporte_entidad_federativa',
      color: 'teal',
      icono: 'date_range'
    },
    {
      titulo: 'REPORTS.CEPAT.SECTOR.TITLE',
      descripcion: 'REPORTS.CEPAT.SECTOR.DESCRIPTION',
      archivo: 'reporte_entidad_federativa',
      color: 'orange',
      icono: 'warehouse'
    },
    {
      titulo: 'REPORTS.CEPAT.STATUS.TITLE',
      descripcion: 'REPORTS.CEPAT.STATUS.DESCRIPTION',
      archivo: 'reporte_entidad_federativa',
      color: 'red',
      icono: 'assignment_turned_in'
    },
    {
      titulo: 'REPORTS.CEPAT.GENERAL.TITLE',
      descripcion: 'REPORTS.CEPAT.GENERAL.DESCRIPTION',
      archivo: 'reporte_entidad_federativa',
      color: 'pink',
      icono: 'pie_chart'
    },
    {
      titulo: 'REPORTS.CEPAT.INSTITUTION.TITLE',
      descripcion: 'REPORTS.CEPAT.INSTITUTION.DESCRIPTION',
      archivo: 'reporte_entidad_federativa',
      color: 'green',
      icono: 'business'
    },
    {
      titulo: 'REPORTS.CEPAT.SEX.TITLE',
      descripcion: 'REPORTS.CEPAT.SEX.DESCRIPTION',
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
      titulo: 'REPORTS.COORDINATOR.YEAR.TITLE',
      descripcion: 'REPORTS.COORDINATOR.YEAR.DESCRIPTION',
      archivo: 'reporte_entidad_federativa',
      color: 'teal',
      icono: 'date_range'
    },
    {
      titulo: 'REPORTS.COORDINATOR.DEPARTMENT.TITLE',
      descripcion: 'REPORTS.COORDINATOR.DEPARTMENT.DESCRIPTION',
      archivo: 'reporte_entidad_federativa',
      color: 'pink',
      icono: 'groups'
    },
    {
      titulo: 'REPORTS.COORDINATOR.ACADEMICOS.TITLE',
      descripcion: 'REPORTS.COORDINATOR.ACADEMICOS.DESCRIPTION',
      archivo: 'reporte_entidad_federativa',
      color: 'blue',
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
      titulo: 'REPORTS.COORDINATOR.SEX.TITLE',
      descripcion: 'REPORTS.COORDINATOR.SEX.DESCRIPTION',
      archivo: 'reporte_entidad_federativa',
      color: 'brown',
      icono: 'wc'
    },
    {
      titulo: 'REPORTS.COORDINATOR.CATEGORY.TITLE',
      descripcion: 'REPORTS.COORDINATOR.CATEGORY.DESCRIPTION',
      archivo: 'reporte_entidad_federativa',
      color: 'yellow',
      icono: 'groups'
    },
    {
      titulo: 'REPORTS.COORDINATOR.STATUS.TITLE',
      descripcion: 'REPORTS.COORDINATOR.STATUS.DESCRIPTION',
      archivo: 'reporte_entidad_federativa',
      color: 'red',
      icono: 'assignment_turned_in'
    }
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

