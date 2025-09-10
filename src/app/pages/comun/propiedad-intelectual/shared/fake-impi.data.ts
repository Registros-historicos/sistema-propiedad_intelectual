// Datos mock compartidos para IMPI/INDAUTOR en tablas locales
// Se reutiliza en múltiples componentes para mostrar la misma información y columnas

export interface ImpiMockRecord {
  id: number;
  rama: string;
  titulo: string;
  institucion: string;
  fechaSolicitud: string; // ISO (YYYY-MM-DD)
  numeroExpediente: string;
  numeroCertificado: string;
}

export const FAKE_IMPI_DATA: ImpiMockRecord[] = [
  { id: 1, rama: 'Invención', titulo: 'Sistema Cuántico de Encriptación de Datos', institucion: 'TecNM - I.T. Orizaba', fechaSolicitud: '2025-09-08', numeroExpediente: 'EXP-0001', numeroCertificado: 'CERT-0001' },
  { id: 2, rama: 'Modelo de Utilidad', titulo: 'Dispositivo Portátil para Purificación de Agua', institucion: 'Universidad Nacional Autónoma de México', fechaSolicitud: '2025-09-05', numeroExpediente: 'EXP-0002', numeroCertificado: 'CERT-0002' },
  { id: 3, rama: 'Diseño Industrial', titulo: 'Silla Ergonómica con Materiales Reciclados', institucion: 'Tecnológico de Monterrey', fechaSolicitud: '2025-09-01', numeroExpediente: 'EXP-0003', numeroCertificado: 'CERT-0003' },
  { id: 4, rama: 'Invención', titulo: 'Algoritmo de IA para Detección Temprana de Cáncer', institucion: 'Instituto Politécnico Nacional', fechaSolicitud: '2025-08-28', numeroExpediente: 'EXP-0004', numeroCertificado: 'CERT-0004' },
  { id: 5, rama: 'Modelo de Utilidad', titulo: 'Mecanismo de Cierre Automático para Contenedores', institucion: 'Universidad de Guadalajara', fechaSolicitud: '2025-08-25', numeroExpediente: 'EXP-0005', numeroCertificado: 'CERT-0005' },
  { id: 6, rama: 'Invención', titulo: 'Dron Autónomo para Monitoreo Agrícola', institucion: 'TecNM - I.T. Orizaba', fechaSolicitud: '2025-08-22', numeroExpediente: 'EXP-0006', numeroCertificado: 'CERT-0006' },
  { id: 7, rama: 'Diseño Industrial', titulo: 'Lámpara LED de Bajo Consumo con Forma Orgánica', institucion: 'Universidad Iberoamericana', fechaSolicitud: '2025-08-19', numeroExpediente: 'EXP-0007', numeroCertificado: 'CERT-0007' },
  { id: 8, rama: 'Modelo de Utilidad', titulo: 'Filtro de Aire Mejorado para Automóviles', institucion: 'Universidad Autónoma de Nuevo León', fechaSolicitud: '2025-08-15', numeroExpediente: 'EXP-0008', numeroCertificado: 'CERT-0008' },
  { id: 9, rama: 'Invención', titulo: 'Batería de Grafeno de Carga Ultra Rápida', institucion: 'TecNM - I.T. Orizaba', fechaSolicitud: '2025-08-11', numeroExpediente: 'EXP-0009', numeroCertificado: 'CERT-0009' },
  { id: 10, rama: 'Diseño Industrial', titulo: 'Mobiliario Urbano Inteligente con Paneles Solares', institucion: 'Tecnológico de Monterrey', fechaSolicitud: '2025-08-07', numeroExpediente: 'EXP-0010', numeroCertificado: 'CERT-0010' },
  { id: 11, rama: 'Invención', titulo: 'Software de Simulación de Reacciones Químicas', institucion: 'Instituto Politécnico Nacional', fechaSolicitud: '2025-08-04', numeroExpediente: 'EXP-0011', numeroCertificado: 'CERT-0011' },
  { id: 12, rama: 'Modelo de Utilidad', titulo: 'Sistema de Riego por Goteo de Alta Eficiencia', institucion: 'Universidad de Guadalajara', fechaSolicitud: '2025-08-01', numeroExpediente: 'EXP-0012', numeroCertificado: 'CERT-0012' },
  { id: 13, rama: 'Invención', titulo: 'Prótesis Robótica Controlada por Señales Neuronales', institucion: 'Universidad Nacional Autónoma de México', fechaSolicitud: '2025-07-29', numeroExpediente: 'EXP-0013', numeroCertificado: 'CERT-0013' },
  { id: 14, rama: 'Diseño Industrial', titulo: 'Empaque Ecológico para Alimentos a Base de Algas', institucion: 'Universidad Iberoamericana', fechaSolicitud: '2025-07-25', numeroExpediente: 'EXP-0014', numeroCertificado: 'CERT-0014' },
  { id: 15, rama: 'Modelo de Utilidad', titulo: 'Herramienta Multifuncional para Ciclismo Urbano', institucion: 'TecNM - I.T. Orizaba', fechaSolicitud: '2025-07-21', numeroExpediente: 'EXP-0015', numeroCertificado: 'CERT-0015' }
];
