import { FederalEntity } from "../models/entity.model";

export const SECTORES_DATA: FederalEntity[] = [
  { id: 200, nombre: "Agricultura" },
  { id: 201, nombre: "Ganadería" },
  { id: 202, nombre: "Pesca y Acuacultura" },
  { id: 203, nombre: "Minería" },
  { id: 204, nombre: "Construcción e Infraestructura" },
  { id: 205, nombre: "Industria Manufacturera" },
  { id: 206, nombre: "Comercio" },
  { id: 207, nombre: "Transporte y Logística" },
  { id: 208, nombre: "Servicios Educativos" },
  { id: 209, nombre: "Servicios Financieros y de Seguros" },
  { id: 210, nombre: "Servicios de Salud" },
  { id: 211, nombre: "Servicios Gubernamentales" },
  
  { id: 213, nombre: "Silvicultura" },
  { id: 214, nombre: "Generación de Energía" },
  { id: 215, nombre: "Turismo y Hospitalidad" },
  { id: 216, nombre: "Servicios Inmobiliarios" },
  { id: 217, nombre: "Telecomunicaciones e Información" },
  { id: 218, nombre: "Servicios Profesionales y Empresariales" },
  { id: 219, nombre: "Investigación y Desarrollo (I+D)" },
  { id: 220, nombre: "Tecnologías de Información y Comunicación (TIC)" },
  { id: 221, nombre: "Servicios de Consultoría Especializada" },
  { id: 222, nombre: "Servicios Financieros Avanzados" },
  { id: 223, nombre: "Medios y Contenido Digital" },
  { id: 224, nombre: "Servicios de Gobierno de Alto Nivel" },
  { id: 225, nombre: "Servicios Culturales y Artísticos" },
  { id: 226, nombre: "Servicios de Bienestar Social" },
  { id: 227, nombre: "Educación Superior e Investigación" },
  { id: 228, nombre: "Servicios de Salud Especializados" },
  { id: 229, nombre: "Servicios Ambientales y Sostenibilidad" },
];

export const ESTATUS_DATA: FederalEntity[] = [
  { id: 26, nombre: "Confirmada" },
  { id: 27, nombre: "Pendiente" },
  { id: 28, nombre: "Con Observaciones" },
  { id: 29, nombre: "Rechazada" },
  { id: 30, nombre: "Finalizada" },
  { id: 31, nombre: "Cancelada" },
  { id: 32, nombre: "En pausa" },
  { id: 33, nombre: "En espera de validación" },
  { id: 34, nombre: "Notificada al Tecnológico" }
];

export const CUERPOS_ACADEMICOS_DATA: FederalEntity[] = [

  { id: 77, nombre: "CA de Semiconductores" },
  { id: 78, nombre: "CA de Informática y Computación" },
  { id: 79, nombre: "CA de Sistemas Computacionales" },
  { id: 80, nombre: "CA de Ciencia de Datos" },
  { id: 81, nombre: "CA de Energía y Electrónica" },
  { id: 82, nombre: "CA de Mecánica" },
  { id: 83, nombre: "CA de Gestión Empresarial" },
  { id: 84, nombre: "CA de Electrónica" },
  { id: 85, nombre: "CA de Ingeniería Química" },
  { id: 86, nombre: "CA de Ingeniería Industrial" },
  { id: 87, nombre: "CA Multidisciplinarios" },
  { id: 88, nombre: "CA de Economía Social" },
  { id: 89, nombre: "CA de Ingeniería Administrativa" },

  { id: 900, nombre: "Tecnologías de la Información" },
  { id: 901, nombre: "Matemáticas Aplicadas" },
  { id: 902, nombre: "Química Analítica" },
  { id: 903, nombre: "Energías Renovables" },
  { id: 904, nombre: "Inteligencia Artificial" },
  { id: 905, nombre: "Ciencias Ambientales" },
  { id: 906, nombre: "Desarrollo Agroindustrial" },
  { id: 907, nombre: "Gestión Empresarial" },
  { id: 908, nombre: "Bioingeniería Aplicada" },
  { id: 909, nombre: "Administración Moderna" },
  { id: 910, nombre: "Optimización de Sistemas de Producción de Bienes y Servicios" },
  { id: 911, nombre: "Desarrollo de Aplicaciones Interdisciplinarias bajo Metodologías de Ingeniería de Software" },
  { id: 912, nombre: "Sistemas Mecatrónicos Aplicados al Sector Salud e Industrial" },
  { id: 913, nombre: "Ingeniería de Procesos Ambientales" },
  { id: 914, nombre: "Ingeniería de Procesos para la Generación de Tecnología para la Innovación" },
  { id: 915, nombre: "Ingeniería de Sistemas" },
  { id: 916, nombre: "Calidad y Gestión Inteligente" },
  { id: 917, nombre: "Ingeniería Administrativa" },
  { id: 918, nombre: "Investigación en los Sistemas de Tecnología y la Administración del Conocimiento" },
  { id: 919, nombre: "Tecnologías Emergentes de la Web" },
  { id: 920, nombre: "Ingeniería para la Sustentabilidad Energética de la Química" },
  { id: 921, nombre: "Ingeniería de Software y Aplicaciones de la Computación" }
];

export const DEPARTAMENTOS_DATA: FederalEntity[] = [

  { id: 49, nombre: "Eléctrica/Electrónica" },
  { id: 50, nombre: "Sistemas Computacionales" },
  { id: 51, nombre: "Mecánica" },
  { id: 52, nombre: "Gestión Empresarial" },
  { id: 53, nombre: "Química" },
  { id: 54, nombre: "Industrial" },
  { id: 55, nombre: "Económico-Administrativo" },
  { id: 56, nombre: "Varias" },

  { id: 1000, nombre: "Sistemas" },
  { id: 1001, nombre: "Industrial" },
  { id: 1002, nombre: "Química" },
  { id: 1003, nombre: "Mecánica" },
  { id: 1004, nombre: "Electrónica" },
  { id: 1005, nombre: "Civil" },
  { id: 1006, nombre: "Bioquímica" },
  { id: 1007, nombre: "Ambiental" },
  { id: 1008, nombre: "Administración" },
  { id: 1009, nombre: "Gestión Empresarial" },
  { id: 1010, nombre: "Materiales" },
  { id: 1011, nombre: "Alimentos" },
  { id: 1012, nombre: "Ciencias Básicas" },
  { id: 1013, nombre: "División de Estudios Profesionales" },
  { id: 1014, nombre: "División de Estudios de Posgrado" },
  { id: 1015, nombre: "Ingeniería Eléctrica" },
  { id: 1016, nombre: "Ingeniería Metalmecánica" },
  { id: 1017, nombre: "Ciencias Económico Administrativas" }
];

export const PROGRAMAS_EDUCATIVOS_DATA: FederalEntity[] = [
  // ==========================================
  //      LISTA PRINCIPAL (IDs 57 - 76)
  // ==========================================
  { id: 57, nombre: "Ingeniería en Semiconductores" },
  { id: 58, nombre: "Ingeniería Informática" },
  { id: 59, nombre: "Ingeniería en Sistemas Computacionales" },
  { id: 60, nombre: "Ingeniería en Ciencia de Datos" },
  { id: 61, nombre: "Ingeniería Eléctrica" },
  { id: 62, nombre: "Ingeniería Mecánica" },
  { id: 63, nombre: "Ingeniería en Gestión Empresarial" },
  { id: 64, nombre: "Ingeniería Electrónica" },
  { id: 65, nombre: "Ingeniería Química" },
  { id: 66, nombre: "Ingeniería Industrial" },
  { id: 67, nombre: "Ingeniería Industrial en línea" },
  { id: 68, nombre: "Especialidad en Semiconductores" },
  { id: 69, nombre: "Doctorado en Ciencias de la Ingeniería Química" },
  { id: 70, nombre: "Doctorado en Ciencias de la Ingeniería" },
  { id: 71, nombre: "Maestría en Economía Social y Solidaria" },
  { id: 72, nombre: "Maestría en Ingeniería Electrónica" },
  { id: 73, nombre: "Maestría en Ingeniería Industrial" },
  { id: 74, nombre: "Maestría en Ciencias de la Ingeniería Química" },
  { id: 75, nombre: "Maestría en Ingeniería Administrativa" },
  { id: 76, nombre: "Maestría en Sistemas Computacionales" },

  // ==========================================
  //   PROGRAMAS ADICIONALES (IDs 2000+)
  //   *Solo si NO existen en la lista principal*
  // ==========================================
  { id: 2000, nombre: "Ingeniería Electromecánica" },
  { id: 2001, nombre: "Ingeniería en Tecnologías de la Información y Comunicaciones" },
  { id: 2002, nombre: "Ingeniería en Energías Renovables" },
  { id: 2003, nombre: "Ingeniería Bioquímica" },
  { id: 2004, nombre: "Ingeniería en Materiales" },
  { id: 2005, nombre: "Ingeniería Ambiental" },
  { id: 2006, nombre: "Ingeniería Mecatrónica" },
  { id: 2007, nombre: "Ingeniería en Logística" },
  { id: 2008, nombre: "Ingeniería Petrolera" },
  { id: 2009, nombre: "Ingeniería en Desarrollo Comunitario" },
  { id: 2010, nombre: "Ingeniería Forestal" },
  { id: 2011, nombre: "Ingeniería en Industrias Alimentarias" },
  { id: 2012, nombre: "Ingeniería Agroindustrial" },
  { id: 2013, nombre: "Ingeniería en Nanotecnología" },
  { id: 2014, nombre: "Contador Público" },
  { id: 2015, nombre: "Licenciatura en Administración" },
  { id: 2016, nombre: "Arquitectura" },
  { id: 2017, nombre: "Ingeniería en Animación Digital y Efectos Visuales" }
];
