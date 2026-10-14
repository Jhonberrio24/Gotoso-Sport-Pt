import type { Producto, Cupon } from '../types';

export const listaProductos: Producto[] = [
  {
    id: 1,
    nombre: 'Camiseta Junior de Barranquilla 2004',
    precio: '$280.000',
    precioNumerico: 280000,
    categoria: 'Retro / Edición Especial',
    imagen: 'https://images.unsplash.com/photo-1517466787929-bc90951d0974?q=80&w=600&auto=format&fit=crop',
    destacado: true,
    descripcion: 'Edición conmemorativa del histórico título 2004 en Medellín. Confeccionada en tela transpirable con detalles oficiales de época.',
    tallas: ['S', 'M', 'L', 'XL'],
    detalles: [
      'Tela poliéster transpirable con tecnología de ventilación',
      'Escudo del Junior bordado en alta definición',
      'Dorsal histórico y publicidad de época estampada',
      'Corte clásico réplica exacta del campeonato'
    ]
  },
  {
    id: 2,
    nombre: 'Balón Oficial FIFA Brazuca 2014',
    precio: '$350.000',
    precioNumerico: 350000,
    categoria: 'Coleccionables',
    imagen: 'https://images.unsplash.com/photo-1614632537190-23e4146777db?q=80&w=600&auto=format&fit=crop',
    destacado: true,
    descripcion: 'Balón oficial de colección con sello FIFA Quality Pro. Estructura de 6 paneles térmicamente sellados para vuelo perfecto.',
    tallas: ['Nº 5 (Oficial)'],
    detalles: [
      'Certificación FIFA Quality Pro para alta competición',
      'Paneles termo-sellados sin costuras visibles',
      'Superficie texturizada para agarre óptimo en cualquier clima',
      'Pieza codiciada por coleccionistas de mundiales'
    ]
  },
  {
    id: 3,
    nombre: 'Camiseta Enmarcada Firmada por Joel Canchimbo',
    precio: '$450.000',
    precioNumerico: 450000,
    categoria: 'Autógrafos',
    imagen: 'https://images.unsplash.com/photo-1577223625816-7546f13df25d?q=80&w=600&auto=format&fit=crop',
    destacado: false,
    descripcion: 'Camiseta oficial con autógrafo auténtico de Joel Canchimbo. Incluye cuadro de madera con vidrio antirreflejo y certificado.',
    tallas: ['Talla M (Enmarcada)'],
    detalles: [
      'Firma original a mano con tinta indeleble resistente al sol',
      'Marco de madera negra pulida con cristal de protección UV',
      'Certificado holográfico de autenticidad incluido',
      'Listo para colgar en tu sala o museo personal'
    ]
  },
  {
    id: 4,
    nombre: 'Guayos Profesionales Firmados por Édison Toloza',
    precio: '$390.000',
    precioNumerico: 390000,
    categoria: 'Autógrafos',
    imagen: 'https://images.unsplash.com/photo-1542291026-7eec264c27ff?q=80&w=600&auto=format&fit=crop',
    destacado: true,
    descripcion: 'Par de botines profesionales firmados por el veloz delantero Édison Toloza. Modelo de alta gama para velocidad extrema.',
    tallas: ['41 COL (8.5 US)'],
    detalles: [
      'Autógrafo original en el lateral exterior de ambos guayos',
      'Placa de suela ultraligera con tacos cónicos y laminados',
      'Material sintético de microfibra premium',
      'Ideal para vitrina deportiva o exhibición'
    ]
  },
  {
    id: 5,
    nombre: 'Uniforme Completo Boyacá Chicó 2020',
    precio: '$190.000',
    precioNumerico: 190000,
    categoria: 'Equipaciones',
    imagen: 'https://images.unsplash.com/photo-1508098682722-e99c43a406b2?q=80&w=600&auto=format&fit=crop',
    destacado: false,
    descripcion: 'Kit completo que incluye camiseta y pantaloneta oficial de Boyacá Chicó. Confort total para partidos o entrenamiento.',
    tallas: ['S', 'M', 'L'],
    detalles: [
      'Incluye camiseta oficial y pantaloneta a juego',
      'Tejido Dri-Fit de secado ultrarrápido',
      'Pretina elástica reforzada con cordón ajustable',
      'Colores tradicionales ajedrezados de alta durabilidad'
    ]
  },
  {
    id: 6,
    nombre: 'Equipación Local FC Barcelona 2024/25',
    precio: '$320.000',
    precioNumerico: 320000,
    categoria: 'Internacional',
    imagen: 'https://images.unsplash.com/photo-1522778119026-d647f0596c20?q=80&w=600&auto=format&fit=crop',
    destacado: true,
    descripcion: 'Versión aficionado conmemorativa por los 125 años del club culé con los icónicos colores azul y grana divididos.',
    tallas: ['S', 'M', 'L', 'XL', 'XXL'],
    detalles: [
      'Escudo del club y logo conmemorativo termosellado',
      'Patrón bicolor clásico de homenaje fundacional',
      'Cuello ergonómico anti-rozaduras',
      'Tejido ecológico reciclado de máxima ligereza'
    ]
  },
  {
    id: 7,
    nombre: 'Guantes de Arquero Nitro Neón Pro',
    precio: '$185.000',
    precioNumerico: 185000,
    categoria: 'Accesorios Profesionales',
    imagen: 'https://images.unsplash.com/photo-1606107557195-0e29a4b5b4aa?q=80&w=600&auto=format&fit=crop',
    destacado: false,
    descripcion: 'Guantes con látex alemán Contact Plus de 4mm. Agarre insuperable en seco y mojado con varillas de protección extraíbles.',
    tallas: ['Talla 8', 'Talla 9', 'Talla 10'],
    detalles: [
      'Látex alemán de 4mm con absorción de impactos en tiros potentes',
      'Corte negativo híbrido para contacto total con el balón',
      'Cierre de muñeca elástico de doble vuelta',
      'Sistema de varillas finger-save desmontables'
    ]
  },
  {
    id: 8,
    nombre: 'Chaqueta Rompevientos Gotoso Sport PT Negra',
    precio: '$210.000',
    precioNumerico: 210000,
    categoria: 'Ropa Deportiva',
    imagen: 'https://images.unsplash.com/photo-1544441893-675973e31985?q=80&w=600&auto=format&fit=crop',
    destacado: false,
    descripcion: 'Rompevientos ultraliviano resistente a la lluvia y el viento. Ideal para calentar antes del partido o para uso urbano.',
    tallas: ['S', 'M', 'L', 'XL'],
    detalles: [
      'Tejido ripstop impermeable con forro interno transpirable',
      'Bolsillos laterales con cremallera termosellada',
      'Detalles reflectivos en espalda y mangas para visibilidad nocturna',
      'Capucha plegable con ajuste de cordón elástico'
    ]
  },
  {
    id: 9,
    nombre: 'Cinta de Capitán Neón Personalizada PT',
    precio: '$35.000',
    precioNumerico: 35000,
    categoria: 'Accesorios',
    imagen: 'https://images.unsplash.com/photo-1511886929837-354d827aae26?q=80&w=600&auto=format&fit=crop',
    destacado: false,
    descripcion: 'Brazalete elástico de alta visibilidad con ajuste en velcro ancho para evitar que se resbale durante el juego.',
    tallas: ['Adulto (Estándar)', 'Juvenil'],
    detalles: [
      'Elástico reforzado de 8 cm de ancho',
      'Velcro de fijación rápida ultra resistente',
      'Color neón brillante visible desde cualquier ángulo de la cancha',
      'Lavable a máquina sin perder elasticidad'
    ]
  },
  {
    id: 10,
    nombre: 'Tachones Profesionales Césped Sintético Edición Gotoso',
    precio: '$299.000',
    precioNumerico: 299000,
    categoria: 'Calzado',
    imagen: 'https://images.unsplash.com/photo-1511556532299-8f662fc26c06?q=80&w=600&auto=format&fit=crop',
    destacado: true,
    descripcion: 'Botines para canchas sintéticas (Turf / TF). Suela con tacos de goma multidireccionales para giros veloces sin dolor articular.',
    tallas: ['38', '39', '40', '41', '42', '43'],
    detalles: [
      'Suela Turf con amortiguación EVA para cuidar rodillas y tobillos',
      'Capellada sintética texturizada para control de balón milimétrico',
      'Cordones asimétricos que liberan la zona de golpeo',
      'Plantilla anatómica antibacterial y removible'
    ]
  }
];

export const CUPONES_VALIDOS: Cupon[] = [
  {
    codigo: 'GOTOSO10',
    porcentajeDescuento: 10,
    descripcion: '10% de descuento en el total de tu compra'
  },
  {
    codigo: 'FUTBOL20',
    montoFijo: 20000,
    descripcion: '$20.000 COP de descuento especial'
  },
  {
    codigo: 'BIENVENIDA',
    porcentajeDescuento: 15,
    descripcion: '15% de descuento por primera compra'
  }
];

export const formatearMoneda = (valor: number): string => {
  return new Intl.NumberFormat('es-CO', {
    style: 'currency',
    currency: 'COP',
    maximumFractionDigits: 0
  }).format(valor);
};
