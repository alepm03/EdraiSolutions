// Single source of content for every page. Ported from the production site
// (EdraiSolutions-web: constants.tsx and App.tsx) and reorganised into the three
// pillars plus consulting. Rules: no figure without a source, no client names in
// illustrative content (exceptions: Mercado del Barranco, I Jump, the law firm),
// never the em dash.

export const WA_NUMBER = '34654954602';
export const WA_URL = `https://wa.me/${WA_NUMBER}?text=${encodeURIComponent('Hola, me gustaría saber más sobre vuestros servicios')}`;
export const EMAIL = 'ricardopichardo@edraisolutions.es';
export const INSTAGRAM = 'https://www.instagram.com/edraisolutions/';

/** Last full month of the Mercado del Barranco agent (Supabase barranco-agent). Update monthly. */
export const MONTHLY = {
  month: 'septiembre 2026',
  monthShort: 'Septiembre 2026',
  conversations: 111,
  messages: 197,
  englishPct: '63',
  resolvedPct: '94,6',
};

export type PillarSlug = 'agentes-ia' | 'software-a-medida' | 'automatizacion' | 'consultoria-ia';

export interface Pillar {
  slug: PillarSlug;
  title: string;
  short: string;
  description: string;
  features: string[];
  /** Service page content */
  hero: string;
  problems: string[];
  how: { title: string; text: string }[];
  examples: string[];
  /** SEO: <title> (under 60 chars) and meta description (under 160) */
  seoTitle: string;
  meta: string;
}

export const PILLARS: Pillar[] = [
  {
    slug: 'agentes-ia',
    title: 'Agentes de IA',
    short: 'Atienden a tus clientes por WhatsApp, chat web y teléfono, a cualquier hora.',
    description:
      'Responden con la información real de tu negocio, reservan, recuerdan citas y pasan a tu equipo lo que necesita a una persona, con todos los datos.',
    features: ['WhatsApp, chat web y llamadas de voz', 'Reservas y recordatorios conectados a tu agenda', 'Pasa a tu equipo lo que necesita a una persona'],
    hero: 'Un agente que contesta como tu mejor recepcionista, en cualquier idioma y a cualquier hora.',
    problems: [
      'Mensajes de WhatsApp sin responder fuera de horario.',
      'Llamadas perdidas en los picos del día.',
      'Las mismas diez preguntas, contestadas a mano cada día.',
    ],
    how: [
      { title: 'Aprende tu negocio', text: 'Lo entrenamos con tus horarios, precios, servicios y normas. Solo contesta con tu información.' },
      { title: 'Atiende y actúa', text: 'Responde, reserva en tu agenda, envía recordatorios y registra cada conversación.' },
      { title: 'Sabe cuándo parar', text: 'Lo que necesita a una persona llega a tu equipo con el resumen y los datos de contacto.' },
    ],
    examples: ['Citas de clínica por WhatsApp', 'Reservas de restaurante por teléfono', 'Consultas de inmobiliaria desde la web'],
    seoTitle: 'Agentes de IA para WhatsApp, web y teléfono · Edrai',
    meta: 'Agentes de IA que atienden a tus clientes por WhatsApp, chat web y teléfono a cualquier hora: responden con tus datos, reservan y avisan a tu equipo.',
  },
  {
    slug: 'software-a-medida',
    title: 'Software a medida',
    short: 'Herramientas propias para lo que ningún programa genérico resuelve.',
    description:
      'Desde una app que digitaliza gastos con IA hasta la plataforma que reúne reservas, cobros, finanzas y clientes, con tu cuenta de resultados y tu tesorería al día.',
    features: ['Cuenta de resultados y tesorería al día', 'Reservas, cobros y clientes en un solo panel', 'Conectado a lo que ya usas'],
    hero: 'Tus cuentas, al día. Sin esperar al cierre de mes.',
    problems: [
      'Facturas, tickets y extractos repartidos entre carpetas y correos.',
      'Saber cómo va el mes depende de que alguien cuadre un Excel.',
      'Cada herramienta guarda una parte y ninguna da la foto completa.',
    ],
    how: [
      { title: 'Recoge los datos solos', text: 'Facturas, cobros y movimientos del banco entran sin teclearlos, con IA donde hace falta leer documentos.' },
      { title: 'Te da la foto del negocio', text: 'Cuenta de resultados, tesorería y previsión a 90 días, actualizadas cada día.' },
      { title: 'Crece contigo', text: 'Empezamos por el proceso que más duele y lo ampliamos con el uso real. Soporte y evolución incluidos.' },
    ],
    examples: ['Cuenta de resultados automática', 'Previsión de tesorería a 90 días', 'Plataforma de reservas, caja y CRM'],
    seoTitle: 'Software a medida para pymes · Edrai Solutions',
    meta: 'Software a medida para pymes: facturas, cobros y banco conectados, con cuenta de resultados, tesorería y previsión a 90 días siempre al día.',
  },
  {
    slug: 'automatizacion',
    title: 'Automatización',
    short: 'Tus herramientas, conectadas. Los datos pasan solos de un sitio a otro.',
    description:
      'Conectamos agenda, CRM, facturación, email y hojas de cálculo. Sin copiar y pegar, sin tareas que dependen de que alguien se acuerde.',
    features: ['Leads cualificados directos al CRM', 'Reseñas de Google pedidas tras cada visita', 'Informes semanales que se envían solos'],
    hero: 'Lo repetitivo, hecho. Cada día, sin que nadie se acuerde.',
    problems: [
      'Copiar datos de un formulario al CRM, y del CRM a la factura.',
      'Pedir reseñas o enviar recordatorios solo cuando alguien se acuerda.',
      'Preparar el mismo informe cada lunes.',
    ],
    how: [
      { title: 'Mapeamos el proceso', text: 'Vemos qué pasos se repiten y qué herramientas intervienen.' },
      { title: 'Lo conectamos', text: 'Integramos lo que ya usas. No hace falta cambiar de programas ni migrar nada.' },
      { title: 'Lo vigilamos', text: 'Monitorizamos cada flujo y te avisamos si algo falla antes de que se note.' },
    ],
    examples: ['Formulario web a CRM con propuesta de llamada', 'Reseñas de Google tras cada servicio', 'Informe semanal automático'],
    seoTitle: 'Automatización de procesos para pymes · Edrai',
    meta: 'Conectamos agenda, CRM, facturación y email para que los datos pasen solos. Reseñas, recordatorios e informes sin depender de que alguien se acuerde.',
  },
  {
    slug: 'consultoria-ia',
    title: 'Consultoría de IA',
    short: '¿No sabes por dónde empezar? Empezamos por un diagnóstico.',
    description:
      'Revisamos tus procesos y herramientas, detectamos dónde la IA te ahorra tiempo y dinero, y te entregamos un plan priorizado con coste estimado. Puede quedarse en plan o ser el primer paso.',
    features: ['Revisión de procesos y herramientas', 'Plan priorizado con coste estimado', 'Formación para tu equipo'],
    hero: 'Un plan claro antes de gastar un euro en IA.',
    problems: [
      'Todo el mundo habla de IA y no sabes qué aplica a tu negocio.',
      'Has probado herramientas sueltas que no encajan entre sí.',
      'No sabes cuánto costaría ni qué retorno esperar.',
    ],
    how: [
      { title: 'Diagnóstico gratuito', text: 'En 15 minutos conocemos tu negocio y vemos dónde está el tiempo perdido.' },
      { title: 'Plan priorizado', text: 'Procesos ordenados por impacto y esfuerzo, con coste estimado de cada uno.' },
      { title: 'Formación', text: 'Tu equipo aprende a usar la IA en su día a día, con sus propias tareas.' },
    ],
    examples: ['Auditoría de procesos', 'Plan de implantación por fases', 'Formación del equipo'],
    seoTitle: 'Consultoría de IA para pymes · Edrai Solutions',
    meta: 'Diagnóstico gratuito de 15 minutos y plan priorizado con coste estimado para aplicar la IA en tu pyme, con formación para tu equipo.',
  },
];

export const pillar = (slug: PillarSlug) => PILLARS.find((p) => p.slug === slug)!;

export const SECTORS = [
  { icon: 'stethoscope', title: 'Clínicas y centros de salud', text: 'Citas sin llamadas, recordatorios que reducen ausencias y reseñas tras la visita.' },
  { icon: 'utensils', title: 'Hostelería y restauración', text: 'Reservas por WhatsApp y respuestas al momento a lo que preguntan cada día.' },
  { icon: 'dumbbell', title: 'Ocio y centros deportivos', text: 'Reservas de clases, atención a leads de Instagram y gestión de caja y finanzas.' },
  { icon: 'building', title: 'Inmobiliarias y despachos', text: 'Cualificación de contactos, visitas en tu agenda y documentos preparados con IA.' },
] as const;

export const PROCESS = [
  { title: 'Diagnóstico gratuito', text: 'En una llamada de 15 minutos conocemos tu negocio y lo analizamos gratis.' },
  { title: 'Propuesta cerrada', text: 'Plan con coste cerrado, plazos claros y resultados esperados. Sin letra pequeña.' },
  { title: 'En producción en 2 a 4 semanas', text: 'Configuramos, integramos y probamos. Validas cada paso antes de lanzar nada.' },
  { title: 'Soporte continuo', text: 'Monitorizamos, resolvemos incidencias y mejoramos con el uso real.' },
];

export const FAQ = [
  { q: '¿Necesito conocimientos técnicos?', a: 'No. Nos encargamos de toda la parte técnica. Recibes un sistema funcionando y formación para tu equipo. Si algo falla, nos ocupamos nosotros.' },
  { q: '¿Cuánto tarda en estar funcionando?', a: 'Entre 2 y 4 semanas desde que aprobamos el plan juntos. Proyectos más simples, como un asistente básico, pueden estar listos antes.' },
  { q: '¿Cuánto cuesta?', a: 'Depende del servicio y de la complejidad. El diagnóstico inicial es gratuito y en él te damos un presupuesto cerrado, sin sorpresas.' },
  { q: '¿Qué pasa si no me convence el resultado?', a: 'Trabajamos con validaciones en cada fase: apruebas antes de que lancemos nada. Además, el periodo de ajuste tras el lanzamiento está incluido.' },
  { q: '¿Y si ya tengo una web o un CRM?', a: 'Nos integramos con lo que ya tienes. No necesitas cambiar de herramientas ni migrar nada.' },
  { q: '¿Mis datos y los de mis clientes están seguros?', a: 'Cumplimos el RGPD. Los datos se procesan en servidores europeos y con las medidas de seguridad que exige la normativa.' },
];

export const TEAM = [
  {
    name: 'Ricardo Pichardo',
    role: 'Co-founder · CEO',
    bio: 'Especialista en automatización y estrategia de negocio. Detecta dónde la IA ahorra tiempo y dinero y lo convierte en soluciones que funcionan desde el primer día.',
    image: '/static/FotoRicardo.webp',
    linkedin: 'https://www.linkedin.com/in/ricardopichardo',
  },
  {
    name: 'Alejandro Pichardo',
    role: 'Co-founder · CTO',
    bio: 'Responsable técnico de todas las implementaciones. Se asegura de que cada agente, integración y automatización sea robusta, segura y fácil de mantener.',
    image: '/static/FotoAle.webp',
    linkedin: 'https://www.linkedin.com/in/alejandro-pichardo-036478392/',
  },
];

export const TESTIMONIALS = {
  barranco: {
    quote:
      'Nos escriben turistas de todo el mundo, la mayoría en inglés. El chatbot resuelve horarios, carta y cómo llegar al momento, y las peticiones de grupos y eventos nos llegan ya con todos los datos.',
    who: 'Equipo Mercado del Barranco',
    role: 'Mercado gastronómico · Sevilla',
    logo: '/static/cliente-barranco.webp',
  },
  ijump: {
    quote: 'Todas las reservas y las cuentas las llevábamos en papel y en Excel. Ahora todo el equipo ve lo mismo, al momento, desde el aeródromo.',
    who: 'Raúl',
    role: 'Socio fundador · I Jump Skydive',
    logo: '/static/cliente-ijump.webp',
    what: 'Agente de atención y software de gestión a medida: reservas, agenda diaria, caja, finanzas y CRM.',
  },
  despacho: {
    quote: 'Ahora la IA prepara los borradores, localiza precedentes reales y detecta incoherencias entre documentos. Nosotros revisamos y decidimos.',
    who: 'Despacho de abogados',
    role: 'Nombre omitido por confidencialidad',
    what: 'Redacción y gestión documental con IA: contratos, precedentes y respuestas a clientes.',
  },
};

export const NAV = [
  { href: '/agentes-ia', label: 'Agentes' },
  { href: '/software-a-medida', label: 'Software' },
  { href: '/automatizacion', label: 'Automatización' },
  { href: '/consultoria-ia', label: 'Consultoría' },
  { href: '/casos', label: 'Casos' },
];
