import React, { useState, useEffect } from 'react';
import { 
  Menu, 
  X, 
  ChevronRight, 
  Linkedin, 
  Instagram, 
  Facebook,
  Mail,
  Phone,
  MapPin,
  CheckCircle2,
  Calendar,
  Lightbulb,
  Headphones as SupportIcon,
  Sparkles,
  ArrowRight,
  Workflow,
  Cpu,
  Layers,
  ShieldCheck,
  MessageSquare,
  MessageCircle,
  Stethoscope,
  Dumbbell,
  Home,
  Utensils,
  Search,
  Volume2
} from 'lucide-react';
import { SERVICES, UPCOMING_SERVICES, PROCESS, TEAM } from './constants';
import ChatbotDemo from './components/ChatbotDemo';
import FloatingChatWidget from './components/FloatingChatWidget';
import RealChatDemo from './components/RealChatDemo';

const App: React.FC = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 50);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const getInitials = (name: string) => {
    return name.split(' ').map(n => n[0]).join('').toUpperCase();
  };

  const techStack = [
    { name: 'OpenAI', icon: <Cpu className="w-5 h-5" /> },
    { name: 'n8n', icon: <Workflow className="w-5 h-5" /> },
    { name: 'Anthropic', icon: <Layers className="w-5 h-5" /> },
    { name: 'Perplexity', icon: <Search className="w-5 h-5" /> },
    { name: 'Google Gemini', icon: <ShieldCheck className="w-5 h-5" /> },
    { name: 'ElevenLabs', icon: <Volume2 className="w-5 h-5" /> }
  ];

  return (
    <div className="min-h-screen bg-[#030712] text-white selection:bg-cyan-500/30 selection:text-cyan-200">
      {/* Navigation */}
      <nav className={`fixed top-0 left-0 right-0 z-[100] transition-all duration-500 ${scrolled ? 'glass py-3' : 'bg-transparent py-6'}`}>
        <div className="container mx-auto px-6 flex items-center justify-between">
          <div className="flex items-center space-x-2 group cursor-pointer">
            <div className="w-10 h-10 bg-cyan-400 rounded-xl flex items-center justify-center text-black font-black text-xl group-hover:rotate-12 transition-transform shadow-[0_0_20px_rgba(34,211,238,0.3)]">E</div>
            <span className="text-2xl font-extrabold tracking-tighter">
              <span className="text-cyan-400">Edrai</span>Solutions
            </span>
          </div>

          <div className="hidden md:flex items-center space-x-10 text-[13px] font-bold uppercase tracking-widest text-gray-400">
            <a href="#servicios" className="hover:text-white transition-colors">Servicios</a>
            <a href="#proceso" className="hover:text-white transition-colors">Proceso</a>
            <a href="#sectores" className="hover:text-white transition-colors">Sectores</a>
            <a href="#demos" className="hover:text-white transition-colors">Demos</a>
            <a href="#equipo" className="hover:text-white transition-colors">Equipo</a>
            <a href="#faq" className="hover:text-white transition-colors">FAQ</a>
            <a href="#contacto" className="bg-cyan-400 hover:bg-cyan-300 text-black px-6 py-2.5 rounded-lg font-bold transition-all transform hover:scale-105 active:scale-95 text-center text-sm">
              Hablar con un experto
            </a>
          </div>

          <button className="md:hidden text-white p-2 glass rounded-lg" onClick={() => setIsMenuOpen(!isMenuOpen)}>
            {isMenuOpen ? <X /> : <Menu />}
          </button>
        </div>

        {/* Mobile Menu */}
        {isMenuOpen && (
          <div className="md:hidden glass fixed inset-0 z-50 flex flex-col items-center justify-center space-y-8 animate-in fade-in duration-300 px-10">
            <button className="absolute top-6 right-6 text-white" onClick={() => setIsMenuOpen(false)}><X className="w-8 h-8" /></button>
            <a href="#servicios" className="block text-lg" onClick={() => setIsMenuOpen(false)}>Servicios</a>
            <a href="#proceso" className="block text-lg" onClick={() => setIsMenuOpen(false)}>Proceso</a>
            <a href="#sectores" className="block text-lg" onClick={() => setIsMenuOpen(false)}>Sectores</a>
            <a href="#demos" className="block text-lg" onClick={() => setIsMenuOpen(false)}>Demos</a>
            <a href="#equipo" className="block text-lg" onClick={() => setIsMenuOpen(false)}>Equipo</a>
            <a href="#faq" className="block text-lg" onClick={() => setIsMenuOpen(false)}>FAQ</a>
            <a href="#contacto" className="block w-full bg-cyan-400 text-black py-3 rounded-lg font-bold text-center" onClick={() => setIsMenuOpen(false)}>
              Hablar con un experto
            </a>
          </div>
        )}
      </nav>

      {/* Hero Section */}
      <section className="relative min-h-screen flex items-center pt-20 overflow-hidden">
        <div className="absolute top-[-10%] left-[-10%] w-[50%] h-[50%] bg-cyan-500/10 rounded-full blur-[160px] -z-10 animate-pulse"></div>
        <div className="absolute bottom-[-10%] right-[-10%] w-[40%] h-[40%] bg-blue-500/10 rounded-full blur-[140px] -z-10"></div>
        
        <div className="container mx-auto px-6 text-center z-10">
          <div className="inline-flex items-center space-x-3 bg-white/5 border border-white/10 px-6 py-2.5 rounded-full text-[13px] font-black uppercase tracking-[0.3em] text-cyan-400 mb-10 animate-in slide-in-from-bottom-4 duration-700">
            <span className="w-2.5 h-2.5 bg-cyan-400 rounded-full animate-ping"></span>
            <span>Automatización con IA</span>
          </div>
          
          <h1 className="text-5xl md:text-7xl lg:text-8xl font-black mb-10 leading-[1.1] tracking-tighter animate-in slide-in-from-bottom-8 duration-1000">
            Escala tu negocio con <br />
            <span className="text-gradient">Agentes Inteligentes</span>
          </h1>
          
          <p className="text-gray-400 text-xl md:text-2xl max-w-4xl mx-auto mb-16 leading-relaxed font-medium animate-in slide-in-from-bottom-12 duration-1200">
            Creamos chatbots, asistentes de reservas y sistemas de reseñas automáticas para que su equipo deje de perder tiempo en tareas repetitivas y se centre en vender y atender.
          </p>

          <div className="flex flex-col sm:flex-row items-center justify-center gap-6 animate-in slide-in-from-bottom-16 duration-1500">
            <a href="#contacto" className="w-full sm:w-auto bg-cyan-400 hover:bg-cyan-300 text-black px-12 py-6 rounded-2xl font-black text-xl flex items-center justify-center space-x-3 transition-all group shadow-[0_0_50px_rgba(34,211,238,0.25)] hover:-translate-y-1">
              <span>Pedir diagnóstico gratuito</span>
              <ChevronRight className="w-6 h-6 group-hover:translate-x-1 transition-transform" />
            </a>
            <a href="#servicios" className="w-full sm:w-auto glass border border-white/20 hover:bg-white/10 text-white px-12 py-6 rounded-2xl font-bold text-xl transition-all text-center hover:-translate-y-1">
              Ver qué hacemos
            </a>
          </div>

          <div className="mt-32 pt-16 border-t border-white/5 max-w-5xl mx-auto opacity-40">
            <p className="text-[12px] font-black uppercase tracking-[0.5em] text-gray-400 mb-8">Tecnología que usamos</p>
            <div className="flex flex-wrap justify-center items-center gap-8 md:gap-16 grayscale">
              {techStack.map((tech) => (
                <div key={tech.name} className="flex items-center space-x-2 text-white">
                  {tech.icon}
                  <span className="font-black text-sm">{tech.name}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Services Section */}
      <section id="servicios" className="py-32 bg-[#020617] relative">
        <div className="container mx-auto px-6">
          <div className="flex flex-col md:flex-row md:items-end justify-between mb-20 gap-8 text-center md:text-left">
            <div className="max-w-2xl">
              <div className="text-cyan-400 font-black text-sm uppercase tracking-[0.4em] mb-4">Servicios</div>
              <h2 className="text-4xl md:text-6xl font-black leading-[1] tracking-tighter">QUÉ HACEMOS POR SU NEGOCIO</h2>
            </div>
            <p className="text-gray-400 max-w-md text-xl font-medium leading-relaxed">
              Automatizaciones listas para funcionar en su negocio desde la primera semana.
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-10 mb-32">
            {SERVICES.map((service) => (
              <div key={service.id} className="glass p-12 rounded-[40px] border border-white/5 hover:border-cyan-400/30 transition-all group relative overflow-hidden flex flex-col h-full">
                <div className="absolute top-0 right-0 w-48 h-48 bg-cyan-400/5 blur-[80px] -z-10 group-hover:bg-cyan-400/15 transition-all"></div>
                <div className="w-16 h-16 bg-gradient-to-br from-cyan-400 to-blue-600 rounded-2xl flex items-center justify-center mb-10 group-hover:scale-110 group-hover:rotate-3 transition-all shadow-2xl shadow-cyan-400/10">
                  <div className="text-black">{service.icon}</div>
                </div>
                <h3 className="text-2xl font-black mb-6 leading-tight tracking-tight">{service.title}</h3>
                <p className="text-gray-400 text-[15px] leading-relaxed mb-10 flex-grow">
                  {service.description}
                </p>
                <ul className="space-y-4 pt-8 border-t border-white/5">
                  {service.features.map((feature, idx) => (
                    <li key={idx} className="flex items-start space-x-3 text-[13px] font-bold text-gray-300">
                      <div className="w-5 h-5 bg-cyan-400/20 rounded-full flex items-center justify-center shrink-0 mt-0.5">
                        <CheckCircle2 className="w-3 h-3 text-cyan-400" />
                      </div>
                      <span>{feature}</span>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>

          {/* Upcoming Section */}
          <div className="glass p-16 rounded-[50px] border border-white/5 relative overflow-hidden">
             <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-full h-full bg-cyan-400/[0.02] blur-3xl -z-10"></div>
             <div className="text-center mb-16">
                <div className="inline-flex items-center space-x-2 bg-purple-500/10 border border-purple-500/20 text-purple-400 px-5 py-2 rounded-full text-[11px] font-black uppercase tracking-[0.4em] mb-6">
                  <Sparkles className="w-4 h-4" />
                  <span>Próximamente</span>
                </div>
                <h3 className="text-3xl md:text-5xl font-black tracking-tighter italic opacity-80 uppercase">Próximos Lanzamientos</h3>
             </div>
             <div className="grid md:grid-cols-3 gap-12">
               {UPCOMING_SERVICES.map((service, idx) => (
                 <div key={idx} className="group grayscale hover:grayscale-0 transition-all">
                   <div className="w-12 h-12 bg-white/5 rounded-2xl flex items-center justify-center mb-6 group-hover:bg-cyan-400/10 group-hover:text-cyan-400 transition-all">
                     {service.icon}
                   </div>
                   <h4 className="text-lg font-black mb-3 text-gray-400 group-hover:text-white transition-colors uppercase tracking-tight">{service.title}</h4>
                   <p className="text-gray-400 text-sm group-hover:text-gray-300 transition-colors">{service.description}</p>
                 </div>
               ))}
             </div>
          </div>
        </div>
      </section>

      {/* Process Section */}
      <section id="proceso" className="py-32 bg-[#030712] relative overflow-hidden">
        <div className="container mx-auto px-6">
          <div className="text-center mb-24">
            <div className="text-cyan-400 font-black text-sm uppercase tracking-[0.4em] mb-4">Nuestro proceso</div>
            <h2 className="text-4xl md:text-6xl font-black leading-none tracking-tighter">CÓMO <br />TRABAJAMOS</h2>
          </div>

          <div className="flex flex-col lg:flex-row items-stretch justify-between gap-0 relative">
            {PROCESS.map((step, idx) => (
              <React.Fragment key={idx}>
                <div className="flex-1 relative group z-10">
                  <div className="text-[140px] font-black text-white/[0.02] absolute -top-20 left-0 transition-colors group-hover:text-cyan-400/5 pointer-events-none select-none">
                    {step.number}
                  </div>
                  <div className="glass p-12 rounded-[40px] border border-white/5 hover:border-cyan-400/40 transition-all h-full flex flex-col pt-16 group-hover:-translate-y-3 duration-700 shadow-2xl">
                    <div className="w-14 h-14 bg-cyan-400 text-black rounded-2xl flex items-center justify-center mb-10 shadow-2xl shadow-cyan-400/30 group-hover:rotate-6 transition-transform">
                      {step.icon}
                    </div>
                    <h3 className="text-xl font-black mb-6 uppercase tracking-tight">{step.title}</h3>
                    <p className="text-gray-400 text-[15px] leading-relaxed font-medium">
                      {step.description}
                    </p>
                  </div>
                </div>

                {idx < PROCESS.length - 1 && (
                  <div className="flex items-center justify-center py-8 lg:py-0 lg:w-16">
                    <div className="hidden lg:block w-full h-[1px] bg-white/10 relative overflow-hidden">
                       <div className="absolute top-0 left-[-100%] w-full h-full bg-cyan-400 animate-[flow_3s_infinite_linear]"></div>
                    </div>
                    <div className="lg:hidden h-20 w-[1px] bg-white/10 relative overflow-hidden">
                       <div className="absolute top-[-100%] left-0 h-full w-full bg-cyan-400 animate-[flowVertical_3s_infinite_linear]"></div>
                    </div>
                  </div>
                )}
              </React.Fragment>
            ))}
          </div>
        </div>
      </section>

      {/* Sectors Section */}
      <section id="sectores" className="py-24 bg-[#030712]">
        <div className="container mx-auto px-6">
          <div className="flex flex-col md:flex-row md:items-center justify-between mb-20 gap-8 text-center md:text-left max-w-7xl mx-auto">
            <div className="max-w-2xl">
              <div className="text-cyan-400 font-black text-sm uppercase tracking-[0.4em] mb-4">Sectores</div>
              <h2 className="text-4xl md:text-6xl font-black leading-tight tracking-tighter">EN QUÉ SECTORES NOS <span className="text-gradient">ESPECIALIZAMOS</span></h2>
            </div>
            {/* Divider Line on Desktop */}
            <div className="hidden md:block w-px h-28 bg-white/10 mx-8 shrink-0"></div>
            <p className="text-gray-400 text-xl max-w-md font-medium leading-relaxed">
              Entendemos los problemas reales de cada sector. Por eso nuestras soluciones funcionan desde el primer día.
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8 max-w-7xl mx-auto">
            {[
              { icon: <Stethoscope className="w-8 h-8" />, title: 'Clínicas y centros de salud', desc: 'Gestión de citas, recordatorios de consultas, recogida automática de reseñas post-visita.', gradient: 'from-cyan-500 to-blue-600' },
              { icon: <Dumbbell className="w-8 h-8" />, title: 'Gimnasios y centros deportivos', desc: 'Reservas de clases, atención automática a nuevos leads, campañas de reactivación.', gradient: 'from-emerald-500 to-teal-600' },
              { icon: <Home className="w-8 h-8" />, title: 'Inmobiliarias', desc: 'Cualificación automática de compradores, coordinación de visitas, seguimiento post-visita.', gradient: 'from-violet-500 to-purple-600' },
              { icon: <Utensils className="w-8 h-8" />, title: 'Hostelería y restauración', desc: 'Reservas de mesa, gestión de reseñas, respuestas automáticas a preguntas frecuentes.', gradient: 'from-amber-500 to-orange-600' }
            ].map((sector, idx) => (
              <div key={idx} className="glass p-10 rounded-[32px] border border-white/5 hover:border-white/20 transition-all group text-center flex flex-col items-center hover:-translate-y-2 duration-500">
                <div className={`mb-8 w-20 h-20 bg-gradient-to-br ${sector.gradient} rounded-2xl flex items-center justify-center text-white shadow-2xl group-hover:scale-110 group-hover:rotate-3 transition-all`}>
                  {sector.icon}
                </div>
                <h3 className="text-base font-black mb-4 group-hover:text-white transition-colors leading-tight uppercase tracking-tight">
                  {sector.title}
                </h3>
                <p className="text-gray-500 text-sm leading-relaxed font-medium">
                  {sector.desc}
                </p>
              </div>
            ))}
          </div>

          <div className="text-center mt-16">
            <p className="text-gray-400 text-sm font-medium">¿No ve su sector? <a href="#contacto" className="text-cyan-400 font-bold hover:text-cyan-300 transition-colors underline underline-offset-4 decoration-cyan-400/30">Háblenos</a> — probablemente ya tengamos una solución para usted.</p>
          </div>
        </div>
      </section>

      {/* Demos Sections Container */}
      <div id="demos" className="bg-[#020617] py-32 space-y-48">
        <section className="container mx-auto px-6">
          <div className="text-center mb-24">
             <div className="text-cyan-400 font-black text-sm uppercase tracking-[0.4em] mb-4">Demo en vivo</div>
             <h2 className="text-4xl md:text-6xl font-black tracking-tighter">PRUEBE NUESTROS ASISTENTES</h2>
          </div>
          <ChatbotDemo />
        </section>

        <section id="demos-reales" className="container mx-auto px-6">
          <div className="text-center mb-24">
             <div className="text-cyan-400 font-black text-sm uppercase tracking-[0.4em] mb-4">Cliente real</div>
             <h2 className="text-4xl md:text-6xl font-black tracking-tighter">FUNCIONANDO EN <br /><span className="text-gradient">PRODUCCIÓN</span></h2>
          </div>
          <RealChatDemo />
        </section>
      </div>

      {/* Team Section */}
      <section id="equipo" className="py-32 bg-[#030712] relative">
        <div className="container mx-auto px-6">
          <div className="text-center mb-20">
             <div className="text-cyan-400 font-black text-sm uppercase tracking-[0.4em] mb-4">Nuestro equipo</div>
             <h2 className="text-4xl md:text-6xl font-black tracking-tighter">QUIÉNES <br />SOMOS</h2>
          </div>

          <div className="grid md:grid-cols-2 gap-8 max-w-4xl mx-auto">
            {TEAM.map((member, idx) => (
              <div key={idx} className="glass rounded-[32px] overflow-hidden group hover:border-cyan-400/30 transition-all duration-500 shadow-xl border border-white/5">
                <div className="h-64 md:h-72 flex items-center justify-center bg-gradient-to-br from-[#0a1120] to-[#030712] relative overflow-hidden border-b border-white/5">
                  <div className="absolute inset-0 bg-cyan-400/[0.03] blur-[60px] rounded-full scale-150 group-hover:scale-110 transition-transform duration-700"></div>
                  {member.image ? (
                    <img
                      src={member.image}
                      alt={member.name}
                      className="w-full h-full object-cover object-[center_35%]"
                    />
                  ) : (
                    <div className="text-7xl font-black text-white/[0.02] tracking-tighter transition-all group-hover:text-cyan-400/[0.05] group-hover:scale-105 duration-500 select-none">
                      {getInitials(member.name)}
                    </div>
                  )}
                </div>
                <div className="p-8">
                  <div className="flex flex-col gap-1 mb-6">
                    <h3 className="text-xl font-black tracking-tight">{member.name}</h3>
                    <div className="text-cyan-400 font-black text-[10px] uppercase tracking-[0.3em] bg-cyan-400/10 px-3 py-1 rounded-full w-fit">
                      {member.role}
                    </div>
                  </div>
                  <p className="text-gray-500 text-sm leading-relaxed mb-8 italic font-medium opacity-80 group-hover:opacity-100 transition-opacity">
                    "{member.bio}"
                  </p>
                  <a href={member.linkedin} target="_blank" rel="noopener noreferrer" className="inline-flex items-center space-x-3 bg-white/5 px-5 py-2.5 rounded-xl hover:bg-cyan-400 hover:text-black transition-all group/link w-full justify-center">
                    <Linkedin className="w-4 h-4" />
                    <span className="font-black text-[11px] uppercase tracking-widest">LinkedIn</span>
                  </a>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* FAQ Section */}
      <section id="faq" className="py-24 bg-[#020617]">
        <div className="container mx-auto px-6 max-w-4xl">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-5xl font-black mb-6 leading-tight">Preguntas <span className="text-gradient">frecuentes</span></h2>
            <p className="text-gray-400 text-xl font-medium">Las dudas más habituales de nuestros clientes antes de empezar.</p>
          </div>
          
          <div className="space-y-4">
            {[
              {
                q: '¿Necesito conocimientos técnicos?',
                a: 'No. Nosotros nos encargamos de toda la parte técnica. Usted recibe un sistema funcionando y una formación para su equipo. Si algo falla, nos ocupamos nosotros.'
              },
              {
                q: '¿Cuánto tiempo tarda en estar funcionando?',
                a: 'Entre 2 y 4 semanas desde que aprobamos el plan juntos. Proyectos más simples, como un chatbot básico, pueden estar listos en 1 semana.'
              },
              {
                q: '¿Cuánto cuesta?',
                a: 'Depende del servicio y la complejidad. Nuestro diagnóstico inicial es gratuito y en él le damos un presupuesto cerrado sin sorpresas.'
              },
              {
                q: '¿Qué pasa si no me convence el resultado?',
                a: 'Trabajamos con validaciones en cada fase. Usted aprueba antes de que lancemos nada. Además, ofrecemos un período de ajuste post-lanzamiento incluido.'
              },
              {
                q: '¿Y si ya tengo una web o un CRM?',
                a: 'Nos integramos con lo que ya tiene. No necesita cambiar de herramientas ni migrar nada.'
              },
              {
                q: '¿Mis datos y los de mis clientes están seguros?',
                a: 'Cumplimos con el RGPD. Los datos se procesan en servidores europeos y con las medidas de seguridad que exige la normativa.'
              }
            ].map((item, idx) => (
              <details key={idx} className="glass rounded-2xl border border-white/5 group">
                <summary className="px-8 py-6 cursor-pointer text-lg font-bold flex items-center justify-between hover:text-cyan-400 transition-colors list-none">
                  {item.q}
                  <ChevronRight className="w-5 h-5 text-gray-500 group-open:rotate-90 transition-transform shrink-0 ml-4" />
                </summary>
                <div className="px-8 pb-6 text-gray-400 text-[15px] leading-relaxed">
                  {item.a}
                </div>
              </details>
            ))}
          </div>
        </div>
      </section>

      {/* Contact Section */}
      <section id="contacto" className="py-48 bg-[#030712] relative overflow-hidden">
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-full h-full bg-cyan-400/[0.03] blur-[150px] -z-10"></div>
        <div className="container mx-auto px-6">
          <div className="grid lg:grid-cols-2 gap-32 items-center">
            <div>
              <h2 className="text-5xl md:text-7xl font-black mb-10 leading-[0.9] tracking-tighter">
                HABLEMOS DE SU <br /><span className="text-gradient">NEGOCIO</span>
              </h2>
              <p className="text-gray-400 text-2xl mb-16 leading-relaxed font-medium max-w-lg">
                Cuéntenos qué quiere mejorar y le proponemos una solución en menos de 24 horas. Sin compromiso.
              </p>

              <div className="space-y-12">
                <div className="flex items-start space-x-8 group">
                  <div className="w-14 h-14 bg-cyan-400/10 rounded-2xl flex items-center justify-center shrink-0 group-hover:bg-cyan-400 group-hover:text-black transition-all shadow-xl">
                    <Calendar className="w-7 h-7" />
                  </div>
                  <div>
                    <h4 className="font-black text-xl mb-3 tracking-tight">DIAGNÓSTICO GRATUITO</h4>
                    <p className="text-gray-400 font-medium leading-relaxed">Analizamos su negocio y le mostramos dónde puede ahorrar tiempo y dinero con automatización.</p>
                  </div>
                </div>
                <div className="flex items-start space-x-8 group">
                  <div className="w-14 h-14 bg-cyan-400/10 rounded-2xl flex items-center justify-center shrink-0 group-hover:bg-cyan-400 group-hover:text-black transition-all shadow-xl">
                    <Lightbulb className="w-7 h-7" />
                  </div>
                  <div>
                    <h4 className="font-black text-xl mb-3 tracking-tight">TODO INCLUIDO</h4>
                    <p className="text-gray-400 font-medium leading-relaxed">Nos encargamos del diseño, la implementación y el mantenimiento. Usted solo ve resultados.</p>
                  </div>
                </div>
              </div>
            </div>

            <div className="glass p-12 md:p-20 rounded-[60px] border border-white/10 shadow-3xl relative overflow-hidden">
              <div className="absolute top-0 right-0 w-80 h-80 bg-cyan-400/10 blur-[120px] -z-10"></div>
              <form className="space-y-8">
                <div className="space-y-4">
                  <label className="text-[12px] font-black uppercase tracking-[0.4em] text-gray-400 ml-1">Nombre *</label>
                  <input type="text" required placeholder="Su nombre o el de su empresa" className="w-full bg-white/5 border border-white/10 rounded-2xl px-8 py-6 text-sm text-white focus:outline-none focus:border-cyan-400 focus:bg-white/10 transition-all placeholder:text-gray-600 font-bold" />
                </div>
                <div className="space-y-4">
                  <label className="text-[12px] font-black uppercase tracking-[0.4em] text-gray-400 ml-1">Email *</label>
                  <input type="email" required placeholder="ejemplo@correo.com" className="w-full bg-white/5 border border-white/10 rounded-2xl px-8 py-6 text-sm text-white focus:outline-none focus:border-cyan-400 focus:bg-white/10 transition-all placeholder:text-gray-600 font-bold" />
                </div>
                <div className="space-y-4">
                  <label className="text-[12px] font-black uppercase tracking-[0.4em] text-gray-400 ml-1">Teléfono *</label>
                  <input type="tel" required placeholder="+34 600 000 000" className="w-full bg-white/5 border border-white/10 rounded-2xl px-8 py-6 text-sm text-white focus:outline-none focus:border-cyan-400 focus:bg-white/10 transition-all placeholder:text-gray-600 font-bold" />
                </div>
                <div className="space-y-4">
                  <label className="text-[12px] font-black uppercase tracking-[0.4em] text-gray-400 ml-1">¿Qué quiere automatizar?</label>
                  <textarea rows={3} placeholder="Ej: responder mensajes de clientes, gestionar citas, pedir reseñas..." className="w-full bg-white/5 border border-white/10 rounded-2xl px-8 py-6 text-sm text-white focus:outline-none focus:border-cyan-400 focus:bg-white/10 transition-all placeholder:text-gray-600 font-bold resize-none"></textarea>
                </div>
                <div className="flex items-start space-x-4 p-4 bg-white/5 rounded-2xl">
                  <input type="checkbox" required id="rgpd" className="mt-1 w-5 h-5 accent-cyan-400 rounded-lg" />
                  <label htmlFor="rgpd" className="text-[12px] text-gray-400 leading-relaxed font-bold">
                    He leído y acepto la <a href="#" className="text-cyan-400 hover:underline">política de privacidad</a>.
                  </label>
                </div>
                <button type="submit" className="w-full bg-cyan-400 text-black py-8 rounded-3xl font-black text-2xl transition-all transform hover:scale-[1.02] active:scale-95 shadow-[0_20px_40px_rgba(34,211,238,0.4)]">
                  SOLICITAR DIAGNÓSTICO GRATUITO
                </button>
                <p className="text-center text-gray-500 text-[10px] font-black uppercase tracking-[0.3em]">
                  Respuesta Garantizada en <span className="text-cyan-400">&lt; 24 Horas</span>
                </p>
                <p className="text-center text-gray-500 text-sm mt-4">
                  O escríbanos por <a href="https://wa.me/34654954602?text=Hola%2C%20me%20interesa%20saber%20m%C3%A1s%20sobre%20sus%20servicios%20de%20automatizaci%C3%B3n" target="_blank" rel="noopener noreferrer" className="text-green-400 font-bold hover:text-green-300">WhatsApp</a>
                </p>
              </form>
            </div>
          </div>
        </div>
      </section>

      {/* Floating Chat Widget */}
      <FloatingChatWidget />

      {/* Footer */}
      <footer className="bg-[#010409] pt-48 pb-16 border-t border-white/5">
        <div className="container mx-auto px-6">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-24 mb-32 items-start">
            <div className="space-y-10">
              <div className="text-4xl font-black tracking-tighter">
                <span className="text-cyan-400">Edrai</span>Solutions
              </div>
              <p className="text-gray-400 text-sm leading-relaxed font-medium max-w-xs">
                Automatización con inteligencia artificial para negocios en España. Chatbots, reservas y reseñas que funcionan solos.
              </p>
              <div className="flex space-x-6">
                <a href="#" className="w-12 h-12 bg-white/5 flex items-center justify-center rounded-2xl hover:bg-cyan-400 hover:text-black transition-all shadow-xl"><Linkedin className="w-6 h-6" /></a>
                <a href="#" className="w-12 h-12 bg-white/5 flex items-center justify-center rounded-2xl hover:bg-cyan-400 hover:text-black transition-all shadow-xl"><Instagram className="w-6 h-6" /></a>
              </div>
            </div>

            <div className="lg:pt-4">
              <h4 className="font-black text-[12px] mb-10 uppercase tracking-[0.5em] text-cyan-400">Servicios</h4>
              <ul className="space-y-6 text-gray-400 text-[13px] font-bold uppercase tracking-widest">
                <li><a href="#servicios" className="hover:text-white transition-colors">Chatbots para empresas</a></li>
                <li><a href="#servicios" className="hover:text-white transition-colors">Reservas automáticas</a></li>
                <li><a href="#servicios" className="hover:text-white transition-colors">Reseñas en Google</a></li>
                <li><a href="#servicios" className="hover:text-white transition-colors">Diagnóstico gratuito</a></li>
              </ul>
            </div>

            <div className="lg:pt-4">
              <h4 className="font-black text-[12px] mb-10 uppercase tracking-[0.5em] text-cyan-400">Compañía</h4>
              <ul className="space-y-6 text-gray-400 text-[13px] font-bold uppercase tracking-widest">
                <li><a href="#equipo" className="hover:text-white transition-colors">Nuestro Equipo</a></li>
                <li><a href="#proceso" className="hover:text-white transition-colors">Metodología</a></li>
                <li><a href="#" className="hover:text-white transition-colors">Privacidad</a></li>
                <li><a href="#" className="hover:text-white transition-colors">Contacto</a></li>
              </ul>
            </div>

            <div className="lg:pt-4">
              <h4 className="font-black text-[12px] mb-10 uppercase tracking-[0.5em] text-cyan-400">Contacto</h4>
              <ul className="space-y-8 text-gray-400 text-[13px] font-bold tracking-widest uppercase">
                <li className="flex items-center space-x-4 group">
                  <Mail className="w-5 h-5 text-cyan-400" />
                  <a href="mailto:info@edraisolutions.es" className="group-hover:text-white transition-colors">info@edraisolutions.es</a>
                </li>
                <li className="flex items-center space-x-4 group">
                  <Phone className="w-5 h-5 text-cyan-400" />
                  <a href="tel:+34654954602" className="group-hover:text-white transition-colors">+34 654 954 602</a>
                </li>
                <li className="flex items-center space-x-4 group">
                  <MessageCircle className="w-5 h-5 text-cyan-400" />
                  <a href="https://wa.me/34654954602?text=Hola%2C%20me%20interesa%20saber%20m%C3%A1s%20sobre%20sus%20servicios" target="_blank" rel="noopener noreferrer" className="group-hover:text-white transition-colors">WhatsApp</a>
                </li>
                <li className="flex items-center space-x-4 group">
                  <MapPin className="w-5 h-5 text-cyan-400" />
                  <span className="group-hover:text-white transition-colors">Madrid, España</span>
                </li>
              </ul>
            </div>
          </div>

          <div className="pt-16 border-t border-white/5 flex flex-col md:flex-row items-center justify-between gap-8 text-[11px] text-gray-400 font-black uppercase tracking-[0.5em]">
            <div className="flex items-center space-x-4">
               <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse"></div>
               <span>Disponibles para nuevos proyectos</span>
            </div>
            <div className="text-center">© 2026 Edrai Solutions. Automatización con IA.</div>
            <div className="flex space-x-12">
              <a href="#" className="hover:text-white transition-colors">Términos</a>
              <a href="#" className="hover:text-white transition-colors">Cookies</a>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default App;




