import React from 'react';
import { 
  MessageSquare, 
  Calendar, 
  Star,
  Mic,
  Users,
  LineChart,
  Search, 
  PenTool, 
  Code2, 
  GraduationCap
} from 'lucide-react';
import { Service, ProcessStep, TeamMember } from './types';

export const SERVICES: Service[] = [
  {
    id: 'chatbots',
    title: 'Chatbots para atención al cliente',
    description: 'Un asistente que responde a sus clientes por WhatsApp, web o redes sociales, las 24 horas. Entiende el contexto de cada conversación y escala a su equipo cuando es necesario.',
    icon: <MessageSquare className="w-6 h-6" />,
    features: ['Funciona en WhatsApp, web y redes sociales', 'Recuerda conversaciones anteriores', 'Avisa a su equipo si no puede resolver algo']
  },
  {
    id: 'booking',
    title: 'Reservas y recordatorios automáticos',
    description: 'Sus clientes reservan cita solos, reciben confirmación al momento y recordatorios automáticos. Menos llamadas, menos ausencias, más tiempo para su equipo.',
    icon: <Calendar className="w-6 h-6" />,
    features: ['Reservas sin intervención humana', 'Recordatorios por WhatsApp, SMS o email', 'Se conecta con su agenda actual']
  },
  {
    id: 'reviews',
    title: 'Más reseñas en Google, automáticamente',
    description: 'Después de cada servicio, su cliente recibe una invitación para dejar una reseña. Las reseñas negativas se detectan a tiempo para que pueda actuar antes de que se publiquen.',
    icon: <Star className="w-6 h-6" />,
    features: ['Invitación automática tras cada servicio', 'Alertas inmediatas de reseñas negativas', 'Respuestas sugeridas por IA']
  }
];

export const UPCOMING_SERVICES = [
  {
    title: 'Agentes de voz',
    description: 'Atienda llamadas automáticamente con un agente de voz que entiende, responde y redirige al equipo adecuado.',
    icon: <Mic className="w-6 h-6" />
  },
  {
    title: 'Cualificación automática de leads',
    description: 'Identifique qué contactos tienen más interés en comprar, sin que su equipo comercial pierda tiempo con los que no.',
    icon: <Users className="w-6 h-6" />
  },
  {
    title: 'Informes automáticos con datos',
    description: 'Vea de un vistazo qué funciona en su negocio y qué no, con informes que se generan solos y alertas cuando algo cambia.',
    icon: <LineChart className="w-6 h-6" />
  }
];

export const PROCESS: ProcessStep[] = [
  {
    number: '01',
    title: 'Diagnóstico gratuito',
    description: 'En una llamada de 30 minutos analizamos su negocio y le mostramos exactamente dónde puede ahorrar tiempo y dinero con automatización.',
    icon: <Search className="w-5 h-5" />
  },
  {
    number: '02',
    title: 'Propuesta a medida',
    description: 'Le presentamos un plan con coste cerrado, plazos claros y resultados esperados. Sin letra pequeña.',
    icon: <PenTool className="w-5 h-5" />
  },
  {
    number: '03',
    title: 'Implementación (2-4 semanas)',
    description: 'Configuramos, integramos y probamos todo. Usted valida en cada paso antes de que lancemos nada.',
    icon: <Code2 className="w-5 h-5" />
  },
  {
    number: '04',
    title: 'Soporte continuo',
    description: 'Monitorizamos el sistema, resolvemos incidencias y optimizamos. Su automatización mejora con el tiempo.',
    icon: <GraduationCap className="w-5 h-5" />
  }
];

export const TEAM: TeamMember[] = [
  {
    name: 'Ricardo Pichardo',
    role: 'Co-Founder & CEO',
    bio: 'Especialista en automatización y estrategia de negocio. Ayuda a negocios a identificar dónde la IA les ahorra tiempo y dinero, y lo convierte en soluciones que funcionan desde el primer día.',
    image: 'static/FotoRicardo.jpeg',
    linkedin: 'https://www.linkedin.com/in/ricardopichardo'
  },
  {
    name: 'Alejandro Pichardo',
    role: 'Co-Founder & CTO',
    bio: 'Responsable técnico de todas las implementaciones. Se asegura de que cada chatbot, cada integración y cada automatización sea robusta, segura y fácil de mantener.',
    image: 'static/FotoAle.png',
    linkedin: 'https://www.linkedin.com/in/alejandro-pichardo-036478392/' // Placeholder
  }
];