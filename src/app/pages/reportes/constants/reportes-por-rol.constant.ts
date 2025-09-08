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
      titulo: 'REPORTS.ADMIN.INSTITUTION.TITLE',
      descripcion: 'REPORTS.ADMIN.INSTITUTION.DESCRIPTION',
      archivo: 'reporte-instituciones.pdf',
      color: 'blue',
      icono: 'school' 
    },
    {
      titulo: 'REPORTS.ADMIN.STATE.TITLE',
      descripcion: 'REPORTS.ADMIN.STATE.DESCRIPTION',
      archivo: 'reporte-entidad-federativa.pdf',
      color: 'green',
      icono: 'map' 
    },
    {
      titulo: 'REPORTS.ADMIN.TYPE.TITLE',
      descripcion: 'REPORTS.ADMIN.TYPE.DESCRIPTION',
      archivo: 'reporte-clasificación.pdf',
      color: 'orange',
      icono: 'apartment' 
    },
    {
      titulo: 'REPORTS.ADMIN.TYPE.TITLE',
      descripcion: 'REPORTS.ADMIN.TYPE.DESCRIPTION',
      archivo: 'reporte-clasificación.pdf',
      color: 'orange',
      icono: 'apartment' 
    },
    {
      titulo: 'REPORTS.ADMIN.INSTITUTION.TITLE',
      descripcion: 'REPORTS.ADMIN.INSTITUTION.DESCRIPTION',
      archivo: 'reporte-instituciones.pdf',
      color: 'blue',
      icono: 'school' 
    },
    {
      titulo: 'REPORTS.ADMIN.STATE.TITLE',
      descripcion: 'REPORTS.ADMIN.STATE.DESCRIPTION',
      archivo: 'reporte-entidad-federativa.pdf',
      color: 'green',
      icono: 'map' 
    },
    {
      titulo: 'REPORTS.ADMIN.TYPE.TITLE',
      descripcion: 'REPORTS.ADMIN.TYPE.DESCRIPTION',
      archivo: 'reporte-clasificación.pdf',
      color: 'orange',
      icono: 'apartment' 
    },
    {
      titulo: 'REPORTS.ADMIN.TYPE.TITLE',
      descripcion: 'REPORTS.ADMIN.TYPE.DESCRIPTION',
      archivo: 'reporte-clasificación.pdf',
      color: 'orange',
      icono: 'apartment' 
    },
    {
      titulo: 'REPORTS.ADMIN.STATE.TITLE',
      descripcion: 'REPORTS.ADMIN.STATE.DESCRIPTION',
      archivo: 'reporte-entidad-federativa.pdf',
      color: 'green',
      icono: 'map' 
    },
    {
      titulo: 'REPORTS.ADMIN.TYPE.TITLE',
      descripcion: 'REPORTS.ADMIN.TYPE.DESCRIPTION',
      archivo: 'reporte-clasificación.pdf',
      color: 'orange',
      icono: 'apartment' 
    },
    {
      titulo: 'REPORTS.ADMIN.TYPE.TITLE',
      descripcion: 'REPORTS.ADMIN.TYPE.DESCRIPTION',
      archivo: 'reporte-clasificación.pdf',
      color: 'orange',
      icono: 'apartment' 
    },
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
      icono: 'group' 
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

