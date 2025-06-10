import { Injectable } from '@angular/core';
import {Observable} from 'rxjs';
import {IIntelectualPropertyModel} from '../shared-services';

@Injectable({
  providedIn: 'root'
})
export class CopyrightsService {
  
  // Arrays emparejados por índice - 150 Fintechs y Startups Mexicanas
  private mockTitles: string[] = [
    // FINTECHS CONSOLIDADAS (50)
    'Clip - Terminal de Pagos Móvil',
    'Bitso - Exchange de Criptomonedas',
    'Kavak - Marketplace de Autos Seminuevos',
    'Kueski - App de Préstamos Express',
    'Conekta - Gateway de Pagos',
    'AlphaCredit - Microcréditos Digitales',
    'Credijusto - Financiamiento Empresarial',
    'Konfio - Capital de Trabajo Digital',
    'Stori - Tarjeta de Crédito Digital',
    'Fondeadora - Crowdfunding Mexicano',
    'Prestadero - Préstamos P2P',
    'YoTePresto - Microfinanzas Digitales',
    'Kapital - Factoraje Financiero',
    'Dapp - Pagos Empresariales',
    'PayClip - Sistema POS Móvil',
    'Doopla - Créditos Hipotecarios',
    'Beek - Audiolibros y Educación',
    'Cornershop - Delivery de Supermercado',
    'Liftit - Logística y Fulfillment',
    '99minutos - Delivery Ultrarrápido',
    'Urbvan - Transporte Corporativo',
    'Blackbird - Delivery de Comida',
    'Jokr - Grocery Delivery Express',
    'Rappi México - Super App Delivery',
    'Mensajeros Urbanos - Paquetería Exprés',
    'Logis - Gestión de Flotas',
    'Skydropx - Envíos Inteligentes',
    'Bego - Movilidad Empresarial',
    'Jetty - Depósitos de Renta Digital',
    'Casai - Hospitalidad Digital',
    'Houm - PropTech Inmobiliario',
    'La Haus México - Real Estate Digital',
    'Flat.mx - Búsqueda de Inmuebles',
    'Briq - Inversiones Inmobiliarias',
    'M2Crowd - Crowdfunding Inmobiliario',
    'Spotcap México - Créditos PYME',
    'Aflore - Inversiones Digitales',
    'GBM+ - Trading y Inversiones',
    'Kuspit - Pagos Digitales',
    'Ampere - Financiamiento Automotriz',
    'Vexi - Tarjeta de Crédito Inteligente',
    'Minu - Adelanto de Nómina',
    'Pago24 - Corresponsalía Bancaria',
    'Bankaool - Cuenta Digital',
    'Mifel Direct - Banca Digital',
    'Spin by OXXO - Cuenta Sin Banco',
    'HeyTax - Facturación Electrónica',
    'Facturama - Sistema de Facturación',
    'ContPAQi - Software Contable',
    'Bind ERP - Sistema Empresarial',
    
    // NEOBANCOS Y FINTECH EMERGENTES (25)
    'Klar - Cuenta Digital Sin Comisiones',
    'Flink - Neobank Digital',
    'Albo - Tarjeta y Cuenta Digital',
    'Ualá México - Tarjeta Prepagada Digital',
    'Mercado Pago México - Billetera Digital',
    'PayPal México - Pagos Digitales',
    'Mastercard Send México - Transferencias',
    'Visa Direct México - Pagos Instantáneos',
    'Prosa - Procesamiento de Pagos',
    'Evertec México - Soluciones de Pago',
    'Openpay - Gateway de Pagos',
    'SR Pago - Terminal de Pagos',
    'iZettle México - POS Móvil',
    'Square México - Pagos Empresariales',
    'Stripe México - Infraestructura de Pagos',
    'Adyen México - Plataforma de Pagos',
    'MercadoPago QR - Pagos por Código',
    'SPEI - Sistema de Pagos Electrónicos',
    'CoDi - Cobro Digital Banxico',
    'Transfermovil México - Remesas Digitales',
    'Remitly México - Envío de Dinero',
    'Wise México - Transferencias Internacionales',
    'Western Union Digital - Remesas Online',
    'MoneyGram México - Transferencias Globales',
    'Xoom México - Envíos de Dinero',
    
    // PROPTECH Y REAL ESTATE (20)
    'Propiedades.com - Portal Inmobiliario',
    'Vivanuncios - Clasificados Inmobiliarios',
    'Metros Cúbicos - Marketplace Inmobiliario',
    'Inmuebles24 México - Portal de Propiedades',
    'Icasas - Búsqueda de Inmuebles',
    'Lamudi México - Real Estate Platform',
    'Trovit Inmuebles - Buscador de Propiedades',
    'Nuroa - Proptech de Rentas',
    'Renta Fácil - Plataforma de Alquiler',
    'Homie - Rentas Sin Depósito',
    'Rentu - Gestión de Propiedades',
    'Creditea Casa - Créditos Hipotecarios',
    'Hipotecas.mx - Comparador de Créditos',
    'Soluciona Mi Deuda - Reparadora de Crédito',
    'Resuelve tu Deuda - Negociación de Adeudos',
    'Coru - Análisis de Crédito Hipotecario',
    'Hipoteca Verde - Créditos Sustentables',
    'Casa Propia - Financiamiento Habitacional',
    'Mi Casa es Tuya - Proptech Social',
    'Desarrollos Inmobiliarios DF - PropTech',
    
    // E-COMMERCE Y MARKETPLACES (20)
    'MercadoLibre - E-commerce Platform',
    'Amazon México - Marketplace Global',
    'Walmart eCommerce - Retail Digital',
    'Liverpool.com.mx - E-commerce Fashion',
    'Coppel.com - Retail Digital',
    'Elektra Online - E-commerce Electronics',
    'Palacio de Hierro - Luxury E-commerce',
    'El Corte Inglés México - Retail Online',
    'Sears México - Departamental Digital',
    'Sanborns.com.mx - E-commerce Diverso',
    'Claroshop - Marketplace Telcel',
    'Linio México - E-commerce Fashion',
    'Dafiti México - Fashion E-commerce',
    'Privalia México - Outlet Online',
    'Zalando México - Moda Online',
    'Shein México - Fast Fashion',
    'Wish México - Marketplace Global',
    'AliExpress México - E-commerce Asiático',
    'eBay México - Subastas Online',
    'Etsy México - Marketplace Artesanal',
    
    // HEALTHTECH Y TELEMEDICINA (15)
    'Doctoralia México - Plataforma Médica',
    'Top Doctors - Consultas Médicas Online',
    'Sana - Telemedicina Digital',
    'Medicci - Consultas Virtuales',
    'Doc Morris - Farmacia Digital',
    'Farmacia San Pablo App - E-pharmacy',
    'Farmacias del Ahorro - Delivery Farmacéutico',
    'Salud Digital IMSS - Telemedicina Pública',
    'Hospital Digital - Gestión Hospitalaria',
    'MedLab - Laboratorios Digitales',
    'Diagnóstico Digital - Imagenología Online',
    'Psicología Online México - Salud Mental',
    'Terapify - Psicología Digital',
    'BetterHelp México - Terapia Online',
    'NutriSalud - Nutrición Digital',
    
    // EDTECH Y EDUCACIÓN (10)
    'Platzi México - Educación Tecnológica',
    'Crehana México - Cursos Creativos',
    'Domestika México - Educación Creativa',
    'Udemy México - Cursos Online',
    'Coursera México - Educación Superior',
    'Khan Academy México - Educación Gratuita',
    'Duolingo México - Aprendizaje de Idiomas',
    'Babbel México - Idiomas Online',
    'Preply México - Tutorías Personalizadas',
    'italki México - Clases de Idiomas',
     'Didi Food México - Delivery de Comida',
    'Uber México - Plataforma de Movilidad', 
    'Cabify México - Transporte Ejecutivo',
    'Beat México - App de Transporte',
    'inDriver México - Transporte Negociable',
    'Ando México - Scooters Compartidos',
    'Grin Scooters - Movilidad Eléctrica',
    'Movo - Bicicletas y Scooters',
    'Econduce - Car Sharing México',
    'Carrot - Movilidad Sustentable',
  ];

  private mockDescriptions: string[] = [
    // FINTECHS CONSOLIDADAS (50)
    'Terminal de pagos móvil con tecnología POS para comercios',
    'Exchange mexicano líder en trading de criptomonedas',
    'Marketplace digital para compra-venta de autos seminuevos',
    'Plataforma de microcréditos personales con IA',
    'Gateway de pagos y procesamiento de transacciones',
    'Sistema de microcréditos con análisis de riesgo digital',
    'Plataforma fintech para financiamiento de PYMES',
    'Software de capital de trabajo para empresas',
    'Tarjeta de crédito 100% digital sin anualidad',
    'Plataforma de crowdfunding para proyectos creativos',
    'Marketplace de préstamos persona a persona',
    'Aplicación de microfinanzas para trabajadores',
    'Plataforma digital de factoraje financiero',
    'Sistema de pagos masivos para empresas',
    'Tecnología POS móvil para pequeños comercios',
    'Plataforma digital de créditos hipotecarios',
    'Aplicación de audiolibros y contenido educativo',
    'App de delivery y compras de supermercado',
    'Software de logística y fulfillment e-commerce',
    'Plataforma de delivery express en 99 minutos',
    'Sistema de transporte corporativo compartido',
    'Aplicación de delivery de comida gourmet',
    'Plataforma de grocery delivery en 15 minutos',
    'Super app de delivery y servicios múltiples',
    'Sistema de paquetería y mensajería urbana',
    'Software de gestión de flotas vehiculares',
    'Plataforma de envíos inteligentes automatizada',
    'Sistema de movilidad empresarial sustentable',
    'Plataforma digital para depósitos de renta',
    'Software de gestión hotelera y hospitalidad',
    'PropTech para compra-venta de inmuebles',
    'Marketplace inmobiliario con tours virtuales',
    'Buscador inteligente de propiedades inmobiliarias',
    'Plataforma de inversiones inmobiliarias fraccionadas',
    'Crowdfunding especializado en bienes raíces',
    'Sistema de créditos para pequeñas empresas',
    'Aplicación de inversiones automatizadas',
    'Plataforma de trading e inversiones bursátiles',
    'Sistema de pagos digitales empresariales',
    'Financiamiento digital para compra de autos',
    'Tarjeta de crédito inteligente con cashback',
    'App de adelanto de sueldo para empleados',
    'Red de corresponsalía bancaria digital',
    'Cuenta digital sin comisiones bancarias',
    'Plataforma de banca digital de Mifel',
    'Cuenta digital de OXXO sin banco tradicional',
    'Software de facturación electrónica y fiscal',
    'Sistema integral de facturación empresarial',
    'Software contable y administrativo empresarial',
    'Sistema ERP integral para empresas mexicanas',
    
    // NEOBANCOS Y FINTECH EMERGENTES (25)
    'Cuenta digital sin comisiones con tarjeta de débito',
    'Neobank 100% digital con servicios financieros integrales',
    'Tarjeta de débito y cuenta digital para jóvenes',
    'Tarjeta prepagada recargable con app móvil',
    'Billetera digital para pagos y transferencias',
    'Plataforma global de pagos digitales',
    'Sistema de transferencias de dinero instantáneas',
    'Red global de pagos directos digitales',
    'Procesador líder de transacciones electrónicas',
    'Soluciones integrales de procesamiento de pagos',
    'Gateway de pagos para e-commerce mexicano',
    'Terminal de pagos con chip y NFC',
    'Lector de tarjetas móvil para pequeños negocios',
    'Sistema de pagos punto de venta empresarial',
    'Infraestructura de pagos para desarrolladores',
    'Plataforma unificada de pagos globales',
    'Sistema de pagos por código QR de MercadoPago',
    'Sistema de Pagos Electrónicos Interbancarios',
    'Cobro Digital del Banco de México',
    'Plataforma de transferencias móviles internacionales',
    'Aplicación de envío de remesas familiares',
    'Transferencias internacionales sin comisiones ocultas',
    'Envío de dinero digital a nivel mundial',
    'Red global de transferencias de dinero',
    'Servicio de envío de dinero de PayPal',
    
    // PROPTECH Y REAL ESTATE (20)
    'Portal líder de búsqueda de propiedades inmobiliarias',
    'Plataforma de clasificados inmobiliarios en México',
    'Marketplace inmobiliario con herramientas digitales',
    'Portal de propiedades con alcance latinoamericano',
    'Buscador especializado en inmuebles residenciales',
    'Plataforma internacional de bienes raíces',
    'Metabuscador de propiedades inmobiliarias',
    'Proptech enfocada en gestión de rentas',
    'Plataforma digital de alquiler de propiedades',
    'Sistema de rentas sin depósito ni aval',
    'Software de gestión integral de propiedades',
    'Plataforma de créditos hipotecarios especializados',
    'Comparador digital de opciones hipotecarias',
    'Reparadora de crédito con tecnología digital',
    'Negociación digital de adeudos financieros',
    'Análisis automatizado de crédito hipotecario',
    'Financiamiento para vivienda sustentable',
    'Plataforma de financiamiento habitacional accesible',
    'Proptech enfocada en vivienda social',
    'Software para desarrolladores inmobiliarios',
    
    // E-COMMERCE Y MARKETPLACES (20)
    'Marketplace líder de e-commerce en Latinoamérica',
    'Plataforma global de comercio electrónico',
    'Sistema de retail digital de Walmart México',
    'E-commerce de moda y estilo de vida',
    'Plataforma de retail digital con crédito',
    'E-commerce de electrónicos y electrodomésticos',
    'Plataforma de lujo y productos premium',
    'Retail digital de moda y lifestyle español',
    'E-commerce departamental tradicional',
    'Plataforma diversa de productos y servicios',
    'Marketplace de productos tecnológicos Telcel',
    'E-commerce de moda y productos lifestyle',
    'Plataforma de moda rápida internacional',
    'Outlet online de marcas de lujo',
    'E-commerce de moda europea premium',
    'Plataforma de moda rápida asiática',
    'Marketplace global de productos diversos',
    'E-commerce asiático de productos económicos',
    'Plataforma de subastas y segunda mano',
    'Marketplace de productos artesanales',
    
    // HEALTHTECH Y TELEMEDICINA (15)
    'Plataforma de búsqueda y reserva de citas médicas',
    'Red de especialistas médicos de élite',
    'Aplicación de telemedicina y consultas virtuales',
    'Plataforma de consultas médicas en línea',
    'Farmacia digital con entrega a domicilio',
    'App de farmacia con servicios digitales',
    'Delivery farmacéutico y productos de salud',
    'Plataforma de telemedicina del sector público',
    'Sistema integral de gestión hospitalaria',
    'Plataforma de análisis clínicos digitales',
    'Servicios de imagenología médica online',
    'Plataforma de atención psicológica virtual',
    'App de terapia psicológica especializada',
    'Servicio de terapia en línea internacional',
    'Plataforma de consultas nutricionales digitales',
    
    // EDTECH Y EDUCACIÓN (10)
    'Plataforma de educación en tecnología y habilidades digitales',
    'Cursos online de habilidades creativas y profesionales',
    'Comunidad creativa con cursos especializados',
    'Marketplace de cursos en línea masivos',
    'Plataforma de cursos universitarios online',
    'Educación gratuita accesible para todos',
    'Aplicación gamificada de aprendizaje de idiomas',
    'Plataforma de aprendizaje de idiomas interactiva',
    'Marketplace de tutorías personalizadas online',
    'Plataforma de intercambio de idiomas global',
    'Plataforma de delivery de comida de DiDi Global',
    'Sistema de transporte privado líder en México',
    'Aplicación de transporte ejecutivo premium',
    'Plataforma de movilidad urbana compartida',
    'App de transporte con tarifa negociable',
    'Sistema de scooters eléctricos compartidos',
    'Red de patinetes eléctricos para ciudades',
    'Plataforma de micromovilidad urbana sustentable',
    'Sistema de auto compartido por horas',
    'Soluciones de movilidad eléctrica urbana'
  ];

  private mockInstitutions: string[] = [
    // FINTECHS CONSOLIDADAS (50)
    'Clip Financial Services S.A.P.I. de C.V.',
    'Bitso S.A. de C.V.',
    'Kavak Holdings S.A.P.I. de C.V.',
    'Kueski S.A.P.I. de C.V.',
    'Conekta S.A. de C.V.',
    'AlphaCredit S.A.P.I. de C.V.',
    'Credijusto S.A.P.I. de C.V.',
    'Konfío S.A.P.I. de C.V.',
    'Stori Card S.A.P.I. de C.V.',
    'Fondeadora S.A.P.I. de C.V.',
    'Prestadero S.A.P.I. de C.V.',
    'YoTePresto S.A.P.I. de C.V.',
    'Kapital S.A.P.I. de C.V.',
    'Dapp Payments S.A. de C.V.',
    'PayClip S.A. de C.V.',
    'Doopla S.A.P.I. de C.V.',
    'Beek S.A. de C.V.',
    'Cornershop by Uber México',
    'Liftit S.A. de C.V.',
    '99minutos S.A. de C.V.',
    'Urbvan S.A. de C.V.',
    'Blackbird Delivery S.A. de C.V.',
    'Jokr México S.A. de C.V.',
    'Rappi México S.A. de C.V.',
    'Mensajeros Urbanos S.A. de C.V.',
    'Logis S.A. de C.V.',
    'Skydropx S.A. de C.V.',
    'Bego Mobility S.A. de C.V.',
    'Jetty México S.A. de C.V.',
    'Casai Hospitality S.A. de C.V.',
    'Houm México S.A. de C.V.',
    'La Haus México S.A. de C.V.',
    'Flat.mx S.A. de C.V.',
    'Briq México S.A.P.I. de C.V.',
    'M2Crowd S.A. de C.V.',
    'Spotcap México S.A.P.I. de C.V.',
    'Aflore S.A.P.I. de C.V.',
    'GBM Digital S.A. de C.V.',
    'Kuspit S.A. de C.V.',
    'Ampere S.A.P.I. de C.V.',
    'Vexi S.A.P.I. de C.V.',
    'Minu México S.A. de C.V.',
    'Pago24 S.A. de C.V.',
    'Bankaool S.A. de C.V.',
    'Mifel Digital S.A. de C.V.',
    'Spin by OXXO S.A. de C.V.',
    'HeyTax S.A. de C.V.',
    'Facturama S.A. de C.V.',
    'Computación en Acción S.A. de C.V.',
    'Bind ERP S.A. de C.V.',
    
    // NEOBANCOS Y FINTECH EMERGENTES (25)
    'Klar Technologies S.A.P.I. de C.V.',
    'Flink S.A.P.I. de C.V.',
    'Albo S.A.P.I. de C.V.',
    'Ualá México S.A.P.I. de C.V.',
    'MercadoPago México S.A. de C.V.',
    'PayPal México S. de R.L. de C.V.',
    'Mastercard México S. de R.L. de C.V.',
    'Visa México S. de R.L. de C.V.',
    'Prosa S.A. de C.V.',
    'Evertec México S.A. de C.V.',
    'Openpay S.A.P.I. de C.V.',
    'SR Pago S.A. de C.V.',
    'iZettle México S.A. de C.V.',
    'Square México S.A. de C.V.',
    'Stripe Payments México S. de R.L. de C.V.',
    'Adyen México S. de R.L. de C.V.',
    'MercadoPago QR S.A. de C.V.',
    'Banco de México - SPEI',
    'Banco de México - CoDi',
    'Transfermovil México S.A. de C.V.',
    'Remitly México S.A. de C.V.',
    'Wise México S. de R.L. de C.V.',
    'Western Union México S.A. de C.V.',
    'MoneyGram México S.A. de C.V.',
    'Xoom México S.A. de C.V.',
    
    // PROPTECH Y REAL ESTATE (20)
    'Propiedades.com S.A. de C.V.',
    'Vivanuncios S.A. de C.V.',
    'Metros Cúbicos S.A. de C.V.',
    'Inmuebles24 México S.A. de C.V.',
    'Icasas S.A. de C.V.',
    'Lamudi México S.A. de C.V.',
    'Trovit México S.A. de C.V.',
    'Nuroa S.A. de C.V.',
    'Renta Fácil S.A. de C.V.',
    'Homie S.A. de C.V.',
    'Rentu S.A. de C.V.',
    'Creditea México S.A.P.I. de C.V.',
    'Hipotecas.mx S.A. de C.V.',
    'Soluciona Mi Deuda S.A. de C.V.',
    'Resuelve tu Deuda S.A. de C.V.',
    'Coru S.A.P.I. de C.V.',
    'Hipoteca Verde S.A.P.I. de C.V.',
    'Casa Propia S.A.P.I. de C.V.',
    'Mi Casa es Tuya S.A. de C.V.',
    'Desarrollos Inmobiliarios DF S.A. de C.V.',
    
    // E-COMMERCE Y MARKETPLACES (20)
    'MercadoLibre México S. de R.L. de C.V.',
    'Amazon México S. de R.L. de C.V.',
    'Walmart de México S.A.B. de C.V.',
    'El Puerto de Liverpool S.A.B. de C.V.',
    'Grupo Coppel S.A. de C.V.',
    'Grupo Elektra S.A.B. de C.V.',
    'El Palacio de Hierro S.A. de C.V.',
    'El Corte Inglés México S.A. de C.V.',
    'Sears México S.A. de C.V.',
    'Sanborns Hermanos S.A.',
    'América Móvil S.A.B. de C.V.',
    'Linio México S.A. de C.V.',
    'Dafiti México S.A. de C.V.',
    'Privalia México S.A. de C.V.',
    'Zalando México S. de R.L. de C.V.',
    'Shein México S. de R.L. de C.V.',
    'Wish México S. de R.L. de C.V.',
    'AliExpress México S. de R.L. de C.V.',
    'eBay México S. de R.L. de C.V.',
    'Etsy México S. de R.L. de C.V.',
    
    // HEALTHTECH Y TELEMEDICINA (15)
    'Doctoralia México S.A. de C.V.',
    'Top Doctors México S.A. de C.V.',
    'Sana Health S.A. de C.V.',
    'Medicci S.A. de C.V.',
    'Doc Morris México S.A. de C.V.',
    'Farmacia San Pablo S.A. de C.V.',
    'Farmacias del Ahorro S.A. de C.V.',
    'Instituto Mexicano del Seguro Social',
    'Hospital Digital S.A. de C.V.',
    'MedLab S.A. de C.V.',
    'Diagnóstico Digital S.A. de C.V.',
    'Psicología Online México S.A. de C.V.',
    'Terapify S.A. de C.V.',
    'BetterHelp México S.A. de C.V.',
    'NutriSalud Digital S.A. de C.V.',
    
    // EDTECH Y EDUCACIÓN (10)
    'Platzi México S.A. de C.V.',
    'Crehana México S.A. de C.V.',
    'Domestika México S.A. de C.V.',
    'Udemy México S. de R.L. de C.V.',
    'Coursera México S. de R.L. de C.V.',
    'Khan Academy México A.C.',
    'Duolingo México S. de R.L. de C.V.',
    'Babbel México S. de R.L. de C.V.',
    'Preply México S.A. de C.V.',
    'italki México S.A. de C.V.',
     'DiDi Food México S.A. de C.V.',
    'Uber Technologies México S.A. de C.V.',
    'Cabify México S.A. de C.V.',
    'Beat México S.A. de C.V.',
    'inDriver México S.A. de C.V.',
    'Ando Mobility S.A. de C.V.',
    'Grin Scooters México S.A. de C.V.',
    'Movo Mobility S.A. de C.V.',
    'Econduce S.A. de C.V.',
    'Carrot Mobility S.A. de C.V.',
  ];

  // Arrays que se mantienen aleatorios (datos de contacto ficticios)
  private mockNames: string[] = [
    'Jorge', 'Ana', 'Carlos', 'María', 'Luis', 'Sofía', 'Pedro', 'Laura', 'Diego', 'Elena',
    'Fernando', 'Carmen', 'Ricardo', 'Patricia', 'Miguel', 'Gabriela', 'Alejandro', 'Sandra',
    'Roberto', 'Mónica', 'Daniel', 'Claudia', 'Andrés', 'Valeria', 'Sergio', 'Mariana',
    'Francisco', 'Leticia', 'Rafael', 'Isabel', 'Eduardo', 'Beatriz', 'Arturo', 'Carolina',
    'Raúl', 'Esperanza', 'Javier', 'Gloria', 'Emilio', 'Rosa', 'Antonio', 'Silvia',
    'José', 'Guadalupe', 'Ramón', 'Teresa', 'Manuel', 'Martha', 'Jesús', 'Verónica'
  ];

  private mockLastNames: string[] = [
    'García', 'Martínez', 'López', 'Hernández', 'González', 'Rodríguez', 'Pérez', 'Sánchez',
    'Ramírez', 'Torres', 'Flores', 'Rivera', 'Gómez', 'Díaz', 'Cruz', 'Morales', 'Ortiz',
    'Gutiérrez', 'Vargas', 'Castillo', 'Jiménez', 'Herrera', 'Medina', 'Castro', 'Ramos',
    'Mendoza', 'Aguilar', 'Ruiz', 'Vásquez', 'Delgado', 'Romero', 'Navarro', 'Guerrero',
    'Muñoz', 'Salazar', 'Contreras', 'Pacheco', 'Cabrera', 'Espinoza', 'Domínguez', 'Ríos'
  ];

  private mockNumbers: string[] = [
    'DA-2023-001001', 'DA-2023-001002', 'DA-2023-001003', 'DA-2023-001004', 'DA-2023-001005',
    'DA-2023-001006', 'DA-2023-001007', 'DA-2023-001008', 'DA-2023-001009', 'DA-2023-001010',
    'DA-2023-001011', 'DA-2023-001012', 'DA-2023-001013', 'DA-2023-001014', 'DA-2023-001015',
    'DA-2023-001016', 'DA-2023-001017', 'DA-2023-001018', 'DA-2023-001019', 'DA-2023-001020',
    'DA-2023-001021', 'DA-2023-001022', 'DA-2023-001023', 'DA-2023-001024', 'DA-2023-001025',
    'DA-2024-001026', 'DA-2024-001027', 'DA-2024-001028', 'DA-2024-001029', 'DA-2024-001030',
    'DA-2024-001031', 'DA-2024-001032', 'DA-2024-001033', 'DA-2024-001034', 'DA-2024-001035',
    'DA-2024-001036', 'DA-2024-001037', 'DA-2024-001038', 'DA-2024-001039', 'DA-2024-001040',
    'DA-2024-001041', 'DA-2024-001042', 'DA-2024-001043', 'DA-2024-001044', 'DA-2024-001045',
    'DA-2024-001046', 'DA-2024-001047', 'DA-2024-001048', 'DA-2024-001049', 'DA-2024-001050',
    'DA-2025-001051', 'DA-2025-001052', 'DA-2025-001053', 'DA-2025-001054', 'DA-2025-001055',
    'DA-2025-001056', 'DA-2025-001057', 'DA-2025-001058', 'DA-2025-001059', 'DA-2025-001060'
  ];

  private mockProvinces: string[] = [
    'Ciudad de México', 'Nuevo León', 'Jalisco', 'Quintana Roo', 'Yucatán', 'Estado de México',
    'Puebla', 'Guanajuato', 'Veracruz', 'Coahuila', 'Sonora', 'Chihuahua', 'Baja California',
    'Querétaro', 'San Luis Potosí', 'Sinaloa', 'Tamaulipas', 'Michoacán', 'Oaxaca', 'Guerrero',
    'Hidalgo', 'Morelos', 'Tlaxcala', 'Tabasco', 'Campeche', 'Chiapas', 'Nayarit', 'Durango',
    'Zacatecas', 'Aguascalientes', 'Colima', 'Baja California Sur'
  ];

  private copyrights: any[] = [];

  constructor() {
    // Genera exactamente 150 registros con datos emparejados
    for (let i = 0; i < 150; i++) {
      this.generateFixedCopyright(i);
    }
  }

  private randomDate(start: Date, end: Date): Date {
    return new Date(start.getTime() + Math.random() * (end.getTime() - start.getTime()));
  }

  private randomElement<T>(array: T[]): T {
    return array[Math.floor(Math.random() * array.length)];
  }

  // MÉTODO MODIFICADO: Usa índice fijo para título/descripción/institución
  private generateFixedCopyright(index: number) {
    const id = this.copyrights.length + 1;
    
    // DATOS EMPAREJADOS - mismo índice para título, descripción e institución
    const title = this.mockTitles[index];
    const description = this.mockDescriptions[index];
    const institution = this.mockInstitutions[index];
    
    // DATOS ALEATORIOS - solo para información de contacto ficticia
    const randomDate = this.randomDate(new Date(2023, 0, 1), new Date());
    const randomNumber = this.randomElement(this.mockNumbers);
    const randomName = this.randomElement(this.mockNames);
    const randomLastName = this.randomElement(this.mockLastNames);
    const randomEmail = `${randomName.toLowerCase()}.${randomLastName.toLowerCase()}@example.com`;
    const randomPhone = `55${Math.floor(10000000 + Math.random() * 90000000)}`;
    const randomProvince = this.randomElement(this.mockProvinces);

    this.copyrights.push({
      id,
      titulo: title,
      descripcion: description,
      fecha_presentacion: randomDate.toISOString().split('T')[0],
      numero_solicitud: randomNumber,
      institucion_adscripcion: institution,
      solicitante_nombre: randomName,
      solicitante_apellidos: randomLastName,
      solicitante_email: randomEmail,
      solicitante_telefono: randomPhone,
      estado: randomProvince
    });
  }

  public getCopyrights(tableParams: any): Observable<any> {
    const start = tableParams.start || 0;
    const length = tableParams.length || 10;
    const total = this.copyrights.length;

    // Simulate server-side pagination
    const paginatedCopyrights = this.copyrights.slice(start, start + length);

    return new Observable(observer => {
      setTimeout(() => {
        observer.next({
          draw: tableParams.draw,
          recordsTotal: total,
          recordsFiltered: total,
          data: paginatedCopyrights
        });
        observer.complete();
      }, 500); // Simulate network delay
    });
  }

  public getCopyright(id: number): Observable<IIntelectualPropertyModel> {
    return new Observable(observer => {
      const copyright = this.copyrights.find(p => p.id === id);
      setTimeout(() => {
        observer.next(copyright);
        observer.complete();
      }, 500); // Simulate network delay
    });
  }

  public createCopyright(copyright: IIntelectualPropertyModel): Observable<IIntelectualPropertyModel> {
    return new Observable(observer => {
      copyright.id = this.copyrights.length + 1;
      this.copyrights.push(copyright);
      setTimeout(() => {
        observer.next(copyright);
        observer.complete();
      }, 500); // Simulate network delay
    });
  }

  public updateCopyright(id: number, copyright: IIntelectualPropertyModel): Observable<IIntelectualPropertyModel> {
    return new Observable(observer => {
      const index = this.copyrights.findIndex(p => p.id === id);
      if (index !== -1) {
        this.copyrights[index] = copyright;
      }
      setTimeout(() => {
        observer.next(copyright);
        observer.complete();
      }, 500); // Simulate network delay
    });
  }

  public deleteCopyright(id: number): Observable<void> {
    return new Observable(observer => {
      const index = this.copyrights.findIndex(p => p.id === id);
      if (index !== -1) {
        this.copyrights.splice(index, 1);
      }
      setTimeout(() => {
        observer.next();
        observer.complete();
      }, 500); // Simulate network delay
    });
  }
}