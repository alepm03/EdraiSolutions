import React, { useState, useEffect, useRef } from 'react';
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
  MessageSquare,
  MessageCircle,
  Stethoscope,
  Dumbbell,
  Building2,
  Utensils,
  Code2
} from 'lucide-react';
import { SERVICES, UPCOMING_SERVICES, PROCESS, TEAM } from './constants';
import ChatbotDemo from './components/ChatbotDemo';
import FloatingChatWidget from './components/FloatingChatWidget';
import RealChatDemo from './components/RealChatDemo';
import LegalModal from './components/LegalModal';
import { useLandingAnimations } from './hooks/useLandingAnimations';
import HeroParticles from './components/HeroParticles';
import SplineRobot from './components/SplineRobot';
import SiteBackground from './components/SiteBackground';
import SectionDivider from './components/SectionDivider';
import AnimatedCounter from './components/AnimatedCounter';
import LogoMarquee from './components/LogoMarquee';
import { getSectionTheme } from './lib/sectionTheme';

// ── Tech Stack SVG Logos ─────────────────────────────────────────────────────
const OpenAILogo = () => (
  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 256 260" className="w-5 h-5 fill-current">
    <path d="M239.184 106.203a64.716 64.716 0 0 0-5.576-53.103C219.452 28.459 191 15.784 163.213 21.74A65.586 65.586 0 0 0 52.096 45.22a64.716 64.716 0 0 0-43.23 31.36c-14.31 24.602-11.061 55.634 8.033 76.74a64.665 64.665 0 0 0 5.525 53.102c14.174 24.65 42.644 37.324 70.446 31.36a64.72 64.72 0 0 0 48.754 21.744c28.481.025 53.714-18.361 62.414-45.481a64.767 64.767 0 0 0 43.229-31.36c14.137-24.558 10.875-55.423-8.083-76.483Zm-97.56 136.338a48.397 48.397 0 0 1-31.105-11.255l1.535-.87 51.67-29.825a8.595 8.595 0 0 0 4.247-7.367v-72.85l21.845 12.636c.218.111.37.32.409.563v60.367c-.056 26.818-21.783 48.545-48.601 48.601Zm-104.466-44.61a48.345 48.345 0 0 1-5.781-32.589l1.534.921 51.722 29.826a8.339 8.339 0 0 0 8.441 0l63.181-36.425v25.221a.87.87 0 0 1-.358.665l-52.335 30.184c-23.257 13.398-52.97 5.431-66.404-17.803ZM23.549 85.38a48.499 48.499 0 0 1 25.58-21.333v61.39a8.288 8.288 0 0 0 4.195 7.316l62.874 36.272-21.845 12.636a.819.819 0 0 1-.767 0L41.353 151.53c-23.211-13.454-31.171-43.144-17.804-66.405v.256Zm179.466 41.695-63.08-36.63L161.73 77.86a.819.819 0 0 1 .768 0l52.233 30.184a48.6 48.6 0 0 1-7.316 87.635v-61.391a8.544 8.544 0 0 0-4.4-7.213Zm21.742-32.69-1.535-.922-51.619-30.081a8.39 8.39 0 0 0-8.492 0L99.98 99.808V74.587a.716.716 0 0 1 .307-.665l52.233-30.133a48.652 48.652 0 0 1 72.236 50.391v.205ZM88.061 139.097l-21.845-12.585a.87.87 0 0 1-.41-.614V65.685a48.652 48.652 0 0 1 79.757-37.346l-1.535.87-51.67 29.825a8.595 8.595 0 0 0-4.246 7.367l-.051 72.697Zm11.868-25.58 28.138-16.217 28.188 16.218v32.434l-28.086 16.218-28.188-16.218-.052-32.434Z"/>
  </svg>
);

const AnthropicLogo = () => (
  <svg viewBox="0 0 24 24" className="w-5 h-5 fill-current">
    <path fillRule="evenodd" d="M13.827 3.52h3.603L24 20h-3.603l-6.57-16.48zm-7.258 0h3.767L16.906 20h-3.674l-1.343-3.461H5.017l-1.344 3.46H0L6.57 3.522zm4.132 9.959L8.453 7.687 6.205 13.48H10.7z" />
  </svg>
);

const N8nLogo = () => (
  <svg viewBox="0 0 228 120" className="w-7 h-4 fill-current">
    <path fillRule="evenodd" clipRule="evenodd" d="M204 48C192.817 48 183.42 40.3514 180.756 30H153.248C147.382 30 142.376 34.241 141.412 40.0272L140.425 45.9456C139.489 51.5648 136.646 56.4554 132.626 60C136.646 63.5446 139.489 68.4352 140.425 74.0544L141.412 79.9728C142.376 85.759 147.382 90 153.248 90H156.756C159.42 79.6486 168.817 72 180 72C193.255 72 204 82.7452 204 96C204 109.255 193.255 120 180 120C168.817 120 159.42 112.351 156.756 102H153.248C141.516 102 131.504 93.5181 129.575 81.9456L128.588 76.0272C127.624 70.241 122.618 66 116.752 66H107.244C104.58 76.3514 95.183 84 84 84C72.817 84 63.4204 76.3514 60.7561 66H47.2439C44.5796 76.3514 35.183 84 24 84C10.7452 84 0 73.2548 0 60C0 46.7452 10.7452 36 24 36C35.183 36 44.5796 43.6486 47.2439 54H60.7561C63.4204 43.6486 72.817 36 84 36C95.183 36 104.58 43.6486 107.244 54H116.752C122.618 54 127.624 49.759 128.588 43.9728L129.575 38.0544C131.504 26.4819 141.516 18 153.248 18L180.756 18C183.42 7.64864 192.817 0 204 0C217.255 0 228 10.7452 228 24C228 37.2548 217.255 48 204 48ZM204 36C210.627 36 216 30.6274 216 24C216 17.3726 210.627 12 204 12C197.373 12 192 17.3726 192 24C192 30.6274 197.373 36 204 36ZM24 72C30.6274 72 36 66.6274 36 60C36 53.3726 30.6274 48 24 48C17.3726 48 12 53.3726 12 60C12 66.6274 17.3726 72 24 72ZM96 60C96 66.6274 90.6274 72 84 72C77.3726 72 72 66.6274 72 60C72 53.3726 77.3726 48 84 48C90.6274 48 96 53.3726 96 60ZM192 96C192 102.627 186.627 108 180 108C173.373 108 168 102.627 168 96C168 89.3726 173.373 84 180 84C186.627 84 192 89.3726 192 96Z" />
  </svg>
);

const PerplexityLogo = () => (
  <svg viewBox="0 0 48 48" className="w-5 h-5 fill-none stroke-current" strokeLinecap="round" strokeLinejoin="round">
    <path d="M24 4.5v39M13.73 16.573v-9.99L24 16.573m0 14.5L13.73 41.417V27.01L24 16.573m0 0l10.27-9.99v9.99"/>
    <path d="M13.73 31.396H9.44V16.573h29.12v14.823h-4.29"/>
    <path d="M24 16.573L34.27 27.01v14.407L24 31.073"/>
  </svg>
);

const GeminiLogo = () => (
  <svg viewBox="0 0 28 28" className="w-5 h-5 fill-current">
    <path d="M14 28A14 14 0 0 1 14 0a11.36 11.36 0 0 0-8 3.37C4.14 5.17 3.1 7.5 3.1 10c0 2.5 1.04 4.83 2.9 6.63A11.36 11.36 0 0 0 14 20a11.36 11.36 0 0 0 8-3.37A9.45 9.45 0 0 0 24.9 10c0-2.5-1.04-4.83-2.9-6.63A11.36 11.36 0 0 0 14 0a14 14 0 0 1 0 28z"/>
  </svg>
);

const ElevenLabsLogo = () => (
  <svg viewBox="0 0 32 32" className="w-5 h-5 fill-current">
    <rect x="4" y="4" width="8" height="24" rx="2"/>
    <rect x="16" y="4" width="5" height="24" rx="2"/>
    <rect x="23" y="4" width="5" height="24" rx="2"/>
  </svg>
);
// ─────────────────────────────────────────────────────────────────────────────

const App: React.FC = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [contactForm, setContactForm] = useState({ name: '', email: '', phone: '', message: '', rgpd: false });
  const [contactStatus, setContactStatus] = useState<'idle' | 'loading' | 'success' | 'error'>('idle');
  const [legalModal, setLegalModal] = useState<null | 'privacidad' | 'cookies'>(null);
  const rootRef = useRef<HTMLDivElement>(null);

  useLandingAnimations(rootRef);

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
    { name: 'OpenAI', icon: <OpenAILogo /> },
    { name: 'n8n', icon: <N8nLogo /> },
    { name: 'Anthropic', icon: <AnthropicLogo /> },
    { name: 'Perplexity', icon: <PerplexityLogo /> },
    { name: 'Google Gemini', icon: <GeminiLogo /> },
    { name: 'ElevenLabs', icon: <ElevenLabsLogo /> },
  ];

  const handleContactSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!contactForm.rgpd) return;
    setContactStatus('loading');
    try {
      const res = await fetch(`${import.meta.env.VITE_WORKER_URL}/contact`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          name:    contactForm.name,
          email:   contactForm.email,
          phone:   contactForm.phone,
          message: contactForm.message,
          source:  'formulario-web',
        }),
      });
      if (!res.ok) throw new Error(`Worker /contact responded ${res.status}`);
      setContactStatus('success');
      setContactForm({ name: '', email: '', phone: '', message: '', rgpd: false });
    } catch (err) {
      console.error('[ContactForm] Error:', err);
      setContactStatus('error');
    }
  };

  return (
    <div ref={rootRef} className="relative min-h-screen text-white selection:bg-cyan-500/30 selection:text-cyan-200">
      {/* Global animated backdrop — paints its own #030712 base */}
      <SiteBackground />

      {/* Scroll progress bar */}
      <div className="fixed top-0 left-0 right-0 z-[200] h-[3px] bg-cyan-400 origin-left scale-x-0 shadow-[0_0_12px_rgba(34,211,238,0.7)]" data-scroll-progress />

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

          <button className="md:hidden text-white p-2 glass rounded-lg" aria-label={isMenuOpen ? 'Cerrar menú' : 'Abrir menú'} aria-expanded={isMenuOpen} onClick={() => setIsMenuOpen(!isMenuOpen)}>
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

      {/* Hero Section — Split layout */}
      <section data-hero className="relative min-h-[92vh] flex items-center pt-24 pb-12 overflow-hidden">
        {/* 1. Radial gradient base — negro al centro, cyan en bordes */}
        <div className="absolute inset-0 -z-30" style={{
          background: 'radial-gradient(125% 125% at 48% 0%, #030712 38%, rgba(34,211,238,0.07) 100%)'
        }} />
        {/* 2. Dot-grid — puntos en las intersecciones, no líneas continuas */}
        <div className="absolute inset-0 -z-20" style={{
          backgroundImage: `linear-gradient(to right, rgba(34,211,238,0.12) 1px, transparent 1px), linear-gradient(to bottom, rgba(34,211,238,0.12) 1px, transparent 1px)`,
          backgroundSize: '48px 48px',
          maskImage: 'repeating-linear-gradient(to right, black 0px, black 2px, transparent 2px, transparent 48px), repeating-linear-gradient(to bottom, black 0px, black 2px, transparent 2px, transparent 48px)',
          WebkitMaskImage: 'repeating-linear-gradient(to right, black 0px, black 2px, transparent 2px, transparent 48px), repeating-linear-gradient(to bottom, black 0px, black 2px, transparent 2px, transparent 48px)',
          maskComposite: 'intersect',
          WebkitMaskComposite: 'source-in',
        } as React.CSSProperties} />
        {/* 3. Aurora blob 1 — cyan, animado 22s */}
        <div data-parallax="2" className="absolute top-[-20%] left-[-12%] w-[55%] h-[70%] bg-cyan-500/14 rounded-full blur-[130px] -z-10"
             style={{ animation: 'aurora-drift-1 22s ease-in-out infinite' }} />
        {/* 4. Aurora blob 2 — azul, animado 28s, diferente fase */}
        <div data-parallax="3" className="absolute bottom-[-20%] right-[-8%] w-[50%] h-[65%] bg-blue-600/10 rounded-full blur-[120px] -z-10"
             style={{ animation: 'aurora-drift-2 28s ease-in-out infinite' }} />
        {/* 5. Noise texture — granulado sutil al 3% */}
        <div className="absolute inset-0 -z-10 opacity-[0.035] pointer-events-none" style={{
          backgroundImage: `url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='256' height='256'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.85' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)'/%3E%3C/svg%3E")`,
          backgroundRepeat: 'repeat',
          backgroundSize: '256px 256px',
        }} />

        {/* 6. Animated neural-network particle field — always-on motion */}
        <HeroParticles />

        <div className="container mx-auto px-6 z-10">
          <div className="grid lg:grid-cols-[54%_46%] gap-10 xl:gap-16 items-center">

            {/* ── Left: Copy ── */}
            <div className="text-left min-w-0">
              <div data-hero-item className="inline-flex items-center space-x-3 bg-white/5 border border-white/10 px-5 py-2 rounded-full text-[12px] font-black uppercase tracking-[0.3em] text-cyan-400 mb-6">
                <span className="w-2 h-2 bg-cyan-400 rounded-full animate-ping" />
                <span>Agencia IA · España</span>
              </div>

              <h1 data-hero-item className="text-5xl md:text-6xl lg:text-[4.2rem] xl:text-7xl font-black mb-5 leading-[1.05] tracking-tighter">
                Automatiza tu negocio.<br />
                <span className="text-gradient">Multiplica tus resultados.</span>
              </h1>

              <p data-hero-item className="text-gray-400 text-lg xl:text-xl max-w-lg mb-8 leading-relaxed font-medium">
                Chatbots, agentes de voz y software a medida para que tu equipo deje de perder tiempo en tareas repetitivas. Operativo en menos de 4 semanas.
              </p>

              <div data-hero-item className="flex flex-col sm:flex-row gap-4 mb-5">
                <a href="#contacto" className="relative overflow-hidden w-full sm:w-auto bg-cyan-400 hover:bg-cyan-300 text-black px-8 py-4 rounded-xl font-black text-[17px] flex items-center justify-center space-x-2 transition-all hover:-translate-y-1 shadow-[0_0_40px_rgba(34,211,238,0.2)] group">
                  {/* Shimmer beam */}
                  <span className="pointer-events-none absolute top-0 left-0 w-12 h-full bg-gradient-to-r from-transparent via-white/40 to-transparent -translate-x-full group-hover:[animation:shimmer-pass_0.65s_ease-out_forwards]" />
                  <span className="relative z-10">Pedir diagnóstico gratuito</span>
                  <ChevronRight className="relative z-10 w-5 h-5 group-hover:translate-x-1 transition-transform" />
                </a>
                <a href="#servicios" className="w-full sm:w-auto glass border border-white/20 hover:bg-white/10 text-white px-8 py-4 rounded-xl font-bold text-[17px] transition-all text-center hover:-translate-y-1">
                  Ver qué hacemos
                </a>
              </div>

              <p data-hero-item className="text-sm text-gray-500 font-medium">
                ¿Prefieres hablar primero?{' '}
                <a
                  href="https://wa.me/34654954602?text=Hola,%20me%20gustaría%20saber%20más%20sobre%20vuestros%20servicios"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-cyan-400 hover:text-cyan-300 font-bold underline underline-offset-2 decoration-cyan-400/30"
                >
                  Escríbenos por WhatsApp
                </a>
              </p>

              {/* Tech stack — animated marquee */}
              <div data-hero-item className="mt-10 pt-8 border-t border-white/5 min-w-0 max-w-full overflow-hidden">
                <p className="text-[11px] font-black uppercase tracking-[0.45em] text-gray-400 mb-5">Tecnología que usamos</p>
                <LogoMarquee items={techStack} speed={40} />
              </div>
            </div>

            {/* ── Right: Robot 3D interactivo (sigue el cursor) ── */}
            <div className="relative hidden lg:flex justify-center items-center">
              {/* Altura y desplazamiento calibrados para que los pies del robot
                  coincidan con la línea que separa la hero de la sección de stats. */}
              <div data-hero-mockup className="relative w-full h-[740px] translate-y-[66px]">

                {/* Ambient glow behind robot */}
                <div className="absolute inset-8 bg-cyan-400/8 blur-[80px] rounded-full -z-10" />

                {/* Spline robot — sin card, sobre el fondo propio de la hero */}
                <SplineRobot className="w-full h-full" />

                {/* Floating badge — top right */}
                <div className="absolute top-6 right-0 bg-[#00101a] border border-white/15 rounded-2xl px-4 py-2.5 shadow-2xl flex items-center gap-2.5 z-20 pointer-events-none animate-in slide-in-from-right-4 duration-1200">
                  <span className="text-2xl font-black text-emerald-400 leading-none">↓80%</span>
                  <span className="text-[11px] text-gray-400 font-bold leading-tight">tareas<br />manuales</span>
                </div>

                {/* Floating badge — bottom left */}
                <div className="absolute bottom-10 left-0 bg-[#00101a] border border-white/15 rounded-2xl px-4 py-2.5 shadow-2xl flex items-center gap-2.5 z-20 pointer-events-none animate-in slide-in-from-left-4 duration-1200">
                  <span className="text-2xl font-black text-cyan-400 leading-none">24/7</span>
                  <span className="text-[11px] text-gray-400 font-bold leading-tight">sin<br />interrupciones</span>
                </div>
              </div>
            </div>

          </div>
        </div>
      </section>

      {/* Stats Bar */}
      <section className="py-14 bg-[#020617]/50 backdrop-blur-sm border-y border-white/5">
        <div className="container mx-auto px-6">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-10 max-w-5xl mx-auto">
            {[
              { prefix: '', value: 24, suffix: '/7', label: 'Disponibilidad continua' },
              { prefix: '', value: 80, suffix: '%', label: 'Reducción de tareas manuales' },
              { prefix: '< ', value: 4, suffix: ' sem', label: 'De idea a producción' },
              { prefix: '×', value: 3, suffix: '', label: 'Retorno medio de inversión' },
            ].map((stat, idx) => (
              <div key={idx} className="gsap-reveal text-center group">
                <AnimatedCounter
                  prefix={stat.prefix}
                  value={stat.value}
                  suffix={stat.suffix}
                  className="block text-4xl md:text-5xl font-black text-cyan-400 tracking-tighter mb-2 group-hover:scale-105 transition-transform"
                />
                <div className="text-gray-500 text-[11px] font-black uppercase tracking-[0.3em]">
                  {stat.label}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      <SectionDivider accentRgb={getSectionTheme('servicios').accentRgb} />

      {/* Services Section */}
      <section id="servicios" className="py-20 bg-[#020617]/40 relative">
        <div className="container mx-auto px-6">
          <div className="flex flex-col md:flex-row md:items-end justify-between mb-20 gap-8 text-center md:text-left">
            <div className="max-w-2xl">
              <div className="text-cyan-400 font-black text-sm uppercase tracking-[0.4em] mb-4">Servicios</div>
              <h2 className="text-4xl md:text-6xl font-black leading-[1] tracking-tighter">QUÉ HACEMOS POR TU NEGOCIO</h2>
            </div>
            <p className="text-gray-400 max-w-md text-xl font-medium leading-relaxed">
              Automatizaciones listas para funcionar en tu negocio desde la primera semana.
            </p>
          </div>

          {/* Bento grid — Row 1: [Chatbots col-2][Booking col-1] · Row 2: [Voice col-2 FEATURED][Reviews col-1] · Row 3: [Software col-3] */}
          {(() => {
            const bentoSpans = [
              'md:col-span-2',
              'md:col-span-1',
              'md:col-span-2', // Voice IA — promoted
              'md:col-span-1', // Reseñas — demoted
              'md:col-span-3',
            ];
            // Subtle top-border accent per card
            const cardAccents = [
              'before:from-cyan-400/60 before:to-blue-500/40',
              'before:from-blue-400/40 before:to-cyan-400/20',
              'before:from-violet-400/70 before:to-cyan-400/50',
              'before:from-amber-400/40 before:to-yellow-400/20',
              'before:from-cyan-400/80 before:to-violet-500/60',
            ];
            const isVoice = (idx: number) => idx === 2;
            return (
              <div className="grid md:grid-cols-3 gap-5 mb-16">
                {SERVICES.map((service, idx) => {
                  const isFeatured = idx === 4;
                  const isVoiceCard = isVoice(idx);
                  const titleMinH = isFeatured ? '' : 'min-h-[56px]';
                  const descMinH = isFeatured ? '' : 'min-h-[112px]';
                  return (
                    <div
                      key={service.id}
                      data-tilt
                      className={`gsap-reveal card-glow glass rounded-3xl border border-white/5 hover:border-cyan-400/30 transition-colors group relative overflow-hidden ${bentoSpans[idx]} ${isFeatured ? 'p-7 flex flex-row items-center gap-7' : 'p-6 flex flex-col h-full'} before:absolute before:inset-x-0 before:top-0 before:h-[2px] before:bg-gradient-to-r ${cardAccents[idx]}`}
                    >
                      {/* Ambient glow */}
                      <div className={`absolute ${isFeatured ? 'top-0 left-0 w-64' : 'top-0 right-0 w-48'} h-48 bg-cyan-400/5 blur-[80px] -z-10 group-hover:bg-cyan-400/15 transition-all`} />

                      {/* Watermark icon background */}
                      <div className="absolute bottom-4 right-4 opacity-[0.04] scale-[4] origin-bottom-right pointer-events-none select-none text-white">
                        {service.icon}
                      </div>

                      {/* Voice badge */}
                      {isVoiceCard && (
                        <div className="absolute top-4 right-4 flex items-center gap-1.5 bg-violet-500/15 border border-violet-400/30 text-violet-300 text-[10px] font-black uppercase tracking-[0.3em] px-3 py-1 rounded-full z-10">
                          <span className="w-1.5 h-1.5 bg-violet-400 rounded-full animate-pulse" />
                          Destacado
                        </div>
                      )}

                      {/* Icon block — minimal glyph */}
                      <div className={`shrink-0 ${isFeatured ? 'pr-2' : 'h-12 mb-5'} flex items-center group-hover:translate-x-0.5 transition-transform relative z-10`}>
                        {React.cloneElement(service.icon as React.ReactElement, {
                          className: `w-9 h-9 ${isVoiceCard ? 'text-violet-300' : 'text-cyan-300'}`,
                          strokeWidth: 1.5,
                        })}
                      </div>

                      {/* Content */}
                      <div className={`${isFeatured ? 'flex-1' : 'flex flex-col flex-1'}`}>
                        <h3 className={`text-xl font-black mb-3 leading-tight tracking-tight ${titleMinH}`}>{service.title}</h3>
                        <p className={`text-gray-400 text-[14px] leading-relaxed mb-5 ${descMinH}`}>
                          {service.description}
                        </p>
                        <ul className={`${isFeatured ? 'flex flex-wrap gap-x-7 gap-y-2.5' : 'space-y-2.5 mt-auto'} pt-5 border-t border-white/5`}>
                          {service.features.map((feature, fIdx) => (
                            <li key={fIdx} className="flex items-start space-x-3 text-[13px] font-bold text-gray-300">
                              <div className={`w-5 h-5 ${isVoiceCard ? 'bg-violet-400/15' : 'bg-cyan-400/15'} rounded-full flex items-center justify-center shrink-0 mt-0.5`}>
                                <CheckCircle2 className={`w-3 h-3 ${isVoiceCard ? 'text-violet-400' : 'text-cyan-400'}`} />
                              </div>
                              <span>{feature}</span>
                            </li>
                          ))}
                        </ul>
                      </div>
                    </div>
                  );
                })}
              </div>
            );
          })()}

          {/* Casos de uso */}
          <div className="glass p-12 rounded-3xl border border-white/5 relative overflow-hidden">
             <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-full h-full bg-cyan-400/[0.02] blur-3xl -z-10"></div>
             <div className="text-center mb-12">
                <div className="inline-flex items-center space-x-2 bg-cyan-500/10 border border-cyan-500/20 text-cyan-400 px-5 py-2 rounded-full text-[11px] font-black uppercase tracking-[0.4em] mb-6">
                  <CheckCircle2 className="w-4 h-4" />
                  <span>Ejemplos representativos</span>
                </div>
                <h3 className="text-3xl md:text-5xl font-black tracking-tighter uppercase">Resultados reales para negocios como el tuyo</h3>
                <p className="text-gray-400 mt-4 font-medium">Ejemplos de lo que hemos automatizado</p>
             </div>
             <div className="grid md:grid-cols-3 gap-10">
               {[
                 {
                   icon: <Utensils className="w-6 h-6" />,
                   title: 'Restaurante con reservas automáticas',
                   result: 'El chatbot de WhatsApp gestiona el 80% de las reservas sin intervención del equipo.'
                 },
                 {
                   icon: <Stethoscope className="w-6 h-6" />,
                   title: 'Centro médico con recordatorios automáticos',
                   result: 'Reducción del 40% en ausencias a citas gracias a recordatorios personalizados por WhatsApp.'
                 },
                 {
                   icon: <Code2 className="w-6 h-6" />,
                   title: 'App de gestión de gastos con IA',
                   result: 'El equipo de administración procesa los tickets de gastos en segundos, no en horas.'
                 }
               ].map((caso, idx) => (
                 <div key={idx} className="gsap-reveal group">
                   <div className="w-12 h-12 bg-cyan-400/10 rounded-2xl flex items-center justify-center mb-6 text-cyan-400 group-hover:bg-cyan-400 group-hover:text-black transition-all">
                     {caso.icon}
                   </div>
                   <h4 className="text-lg font-black mb-3 uppercase tracking-tight">{caso.title}</h4>
                   <p className="text-gray-400 text-sm leading-relaxed font-medium">{caso.result}</p>
                 </div>
               ))}
             </div>
          </div>
        </div>
      </section>

      <SectionDivider accentRgb={getSectionTheme('proceso').accentRgb} />

      {/* Process Section */}
      <section id="proceso" className="py-20 bg-transparent relative overflow-hidden">
        <div className="container mx-auto px-6">
          <div className="text-center mb-24">
            <div className="text-[#3b82f6] font-black text-sm uppercase tracking-[0.4em] mb-4">Nuestro proceso</div>
            <h2 className="text-4xl md:text-6xl font-black leading-none tracking-tighter">CÓMO <br />TRABAJAMOS</h2>
          </div>

          <div className="flex flex-col lg:flex-row items-stretch justify-between gap-0 relative">
            {PROCESS.map((step, idx) => (
              <React.Fragment key={idx}>
                <div className="gsap-reveal flex-1 relative group z-10">
                  <div className="text-[140px] font-black text-white/[0.02] absolute -top-20 left-0 transition-colors group-hover:text-cyan-400/5 pointer-events-none select-none">
                    {step.number}
                  </div>
                  <div className="glass p-8 rounded-3xl border border-white/5 hover:border-[#3b82f6]/50 transition-all h-full flex flex-col pt-10 group-hover:-translate-y-3 duration-700 shadow-2xl">
                    <div className="w-14 h-14 bg-[#3b82f6] text-black rounded-2xl flex items-center justify-center mb-6 shadow-2xl shadow-[0_8px_30px_rgba(59,130,246,0.35)] group-hover:rotate-6 transition-transform">
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

      <SectionDivider accentRgb={getSectionTheme('sectores').accentRgb} />

      {/* Sectors Section */}
      <section id="sectores" className="py-16 bg-transparent">
        <div className="container mx-auto px-6">
          <div className="flex flex-col md:flex-row md:items-center justify-between mb-20 gap-8 text-center md:text-left max-w-7xl mx-auto">
            <div className="max-w-2xl">
              <div className="text-[#8b5cf6] font-black text-sm uppercase tracking-[0.4em] mb-4">Sectores</div>
              <h2 className="text-4xl md:text-6xl font-black leading-tight tracking-tighter">EN QUÉ SECTORES NOS <span className="text-gradient">ESPECIALIZAMOS</span></h2>
            </div>
            {/* Divider Line on Desktop */}
            <div className="hidden md:block w-px h-28 bg-white/10 mx-8 shrink-0"></div>
            <p className="text-gray-400 text-xl max-w-md font-medium leading-relaxed">
              Hemos diseñado nuestras soluciones específicamente para estos sectores. Prueba las demos y comprueba cómo funcionaría en tu negocio.
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6 max-w-7xl mx-auto">
            {[
              { icon: <Stethoscope className="w-7 h-7" strokeWidth={2} />, title: 'Clínicas y centros de salud', desc: 'Agenda online sin llamadas, recordatorios para reducir ausencias y recogida automática de reseñas tras la visita.' },
              { icon: <Utensils className="w-7 h-7" strokeWidth={2} />, title: 'Hostelería y restauración', desc: 'Reservas por WhatsApp, gestión de reseñas en tiempo real y respuestas instantáneas a las preguntas que se repiten cada día.' },
              { icon: <Dumbbell className="w-7 h-7" strokeWidth={2} />, title: 'Gimnasios y centros deportivos', desc: 'Reservas de clases sin saturar recepción, atención automática a leads de Instagram y campañas de reactivación para socios inactivos.' },
              { icon: <Building2 className="w-7 h-7" strokeWidth={2} />, title: 'Inmobiliarias', desc: 'Cualificación automática de compradores, coordinación de visitas con tu agenda y seguimiento post-visita sin que se enfríe el lead.' }
            ].map((sector, idx) => (
              <div key={idx} data-tilt className="gsap-reveal card-glow glass p-8 rounded-[28px] border border-white/5 hover:border-[#8b5cf6]/40 transition-colors group text-center flex flex-col items-center">
                <div className="mb-7 w-16 h-16 rounded-2xl bg-[#8b5cf6]/10 border border-[#8b5cf6]/30 flex items-center justify-center text-[#a78bfa] group-hover:bg-[#8b5cf6]/20 transition-all shadow-[0_0_30px_-12px_rgba(139,92,246,0.6)]">
                  {sector.icon}
                </div>
                <h3 className="text-[15px] font-black group-hover:text-white transition-colors leading-tight uppercase tracking-tight min-h-[44px] flex items-center justify-center">
                  {sector.title}
                </h3>
                <div className="w-10 h-px bg-gradient-to-r from-transparent via-cyan-400/40 to-transparent my-4 group-hover:via-cyan-400/70 transition-colors" />
                <p className="text-gray-400 text-[13px] leading-relaxed font-medium min-h-[80px]">
                  {sector.desc}
                </p>
              </div>
            ))}
          </div>

          <div className="text-center mt-16">
            <p className="text-gray-400 text-sm font-medium">¿No ves tu sector? <a href="#contacto" className="text-cyan-400 font-bold hover:text-cyan-300 transition-colors underline underline-offset-4 decoration-cyan-400/30">Cuéntanoslo</a> — probablemente ya tengamos una solución para ti.</p>
          </div>
        </div>
      </section>

      <SectionDivider accentRgb={getSectionTheme('demos').accentRgb} />

      {/* Demos Sections Container */}
      <div id="demos" className="bg-[#020617]/40 py-20 space-y-28">
        <section className="container mx-auto px-6">
          <div className="text-center mb-24">
             <div className="text-[#10b981] font-black text-sm uppercase tracking-[0.4em] mb-4">Demo en vivo</div>
             <h2 className="text-4xl md:text-6xl font-black tracking-tighter">PRUEBA NUESTROS ASISTENTES</h2>
          </div>
          <ChatbotDemo />
        </section>

        <section id="demos-reales" className="container mx-auto px-6">
          <div className="text-center mb-24">
             <div className="text-[#10b981] font-black text-sm uppercase tracking-[0.4em] mb-4">Caso real · Mercado del Barranco</div>
             <h2 className="text-4xl md:text-6xl font-black tracking-tighter">INTEGRACIÓN REAL<br /><span className="text-gradient">PRUÉBALA AHORA</span></h2>
          </div>
          <RealChatDemo />
        </section>
      </div>

      <SectionDivider accentRgb={getSectionTheme('equipo').accentRgb} />

      {/* Team Section */}
      <section id="equipo" className="py-20 bg-transparent relative">
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
                      loading="lazy"
                      decoding="async"
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

      <SectionDivider accentRgb={getSectionTheme('faq').accentRgb} />

      {/* FAQ Section */}
      <section id="faq" className="py-16 bg-[#020617]/40">
        <div className="container mx-auto px-6 max-w-4xl">
          <div className="text-center mb-16">
            <div className="text-[#3b82f6] font-black text-sm uppercase tracking-[0.4em] mb-4">FAQ</div>
            <h2 className="text-3xl md:text-5xl font-black mb-6 leading-tight">Preguntas <span className="text-gradient">frecuentes</span></h2>
            <p className="text-gray-400 text-xl font-medium">Las preguntas que más nos hacen antes de empezar.</p>
          </div>
          
          <div className="space-y-4">
            {[
              {
                q: '¿Necesito conocimientos técnicos?',
                a: 'No. Nosotros nos encargamos de toda la parte técnica. Recibes un sistema funcionando y formación para tu equipo. Si algo falla, nos ocupamos nosotros.'
              },
              {
                q: '¿Cuánto tiempo tarda en estar funcionando?',
                a: 'Entre 2 y 4 semanas desde que aprobamos el plan juntos. Proyectos más simples, como un chatbot básico, pueden estar listos en 1 semana.'
              },
              {
                q: '¿Cuánto cuesta?',
                a: 'Depende del servicio y la complejidad. Nuestro diagnóstico inicial es gratuito y en él te damos un presupuesto cerrado sin sorpresas.'
              },
              {
                q: '¿Qué pasa si no me convence el resultado?',
                a: 'Trabajamos con validaciones en cada fase. Tú apruebas antes de que lancemos nada. Además, ofrecemos un período de ajuste post-lanzamiento incluido.'
              },
              {
                q: '¿Y si ya tengo una web o un CRM?',
                a: 'Nos integramos con lo que ya tienes. No necesitas cambiar de herramientas ni migrar nada.'
              },
              {
                q: '¿Mis datos y los de mis clientes están seguros?',
                a: 'Cumplimos con el RGPD. Los datos se procesan en servidores europeos y con las medidas de seguridad que exige la normativa.'
              }
            ].map((item, idx) => (
              <details key={idx} className="gsap-reveal glass rounded-2xl border border-white/5 group">
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

      <SectionDivider accentRgb={getSectionTheme('contacto').accentRgb} />

      {/* Contact Section */}
      <section id="contacto" className="py-24 bg-transparent relative overflow-hidden">
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-full h-full bg-cyan-400/[0.03] blur-[150px] -z-10"></div>
        <div className="container mx-auto px-6">
          <div className="grid lg:grid-cols-2 gap-16 items-center">
            <div>
              <h2 className="text-5xl md:text-7xl font-black mb-10 leading-[0.9] tracking-tighter">
                HABLEMOS DE TU <br /><span className="text-gradient">NEGOCIO</span>
              </h2>
              <p className="text-gray-400 text-2xl mb-16 leading-relaxed font-medium max-w-lg">
                Cuéntanos qué quieres mejorar y te proponemos una solución en menos de 24 horas. Sin compromiso.
              </p>

              <div className="space-y-8">
                <div className="flex items-start space-x-8 group">
                  <div className="w-14 h-14 bg-cyan-400/10 rounded-2xl flex items-center justify-center shrink-0 group-hover:bg-cyan-400 group-hover:text-black transition-all shadow-xl">
                    <Calendar className="w-7 h-7" />
                  </div>
                  <div>
                    <h4 className="font-black text-xl mb-3 tracking-tight">DIAGNÓSTICO GRATUITO</h4>
                    <p className="text-gray-400 font-medium leading-relaxed">Analizamos tu negocio y te mostramos dónde puedes ahorrar tiempo y dinero con automatización.</p>
                  </div>
                </div>
                <div className="flex items-start space-x-8 group">
                  <div className="w-14 h-14 bg-cyan-400/10 rounded-2xl flex items-center justify-center shrink-0 group-hover:bg-cyan-400 group-hover:text-black transition-all shadow-xl">
                    <Lightbulb className="w-7 h-7" />
                  </div>
                  <div>
                    <h4 className="font-black text-xl mb-3 tracking-tight">TODO INCLUIDO</h4>
                    <p className="text-gray-400 font-medium leading-relaxed">Nos encargamos del diseño, la implementación y el mantenimiento. Tú solo ves resultados.</p>
                  </div>
                </div>
              </div>
            </div>

            <div className="glass p-8 md:p-12 rounded-3xl border border-white/10 shadow-3xl relative overflow-hidden">
              <div className="absolute top-0 right-0 w-80 h-80 bg-cyan-400/10 blur-[120px] -z-10"></div>
              <form onSubmit={handleContactSubmit} className="space-y-8">
                <div className="space-y-4">
                  <label htmlFor="contact-name" className="text-[12px] font-black uppercase tracking-[0.4em] text-gray-400 ml-1">Nombre *</label>
                  <input id="contact-name" type="text" required autoComplete="name" placeholder="Tu nombre o el de tu empresa" value={contactForm.name} onChange={e => setContactForm(f => ({ ...f, name: e.target.value }))} className="w-full bg-white/5 border border-white/10 rounded-2xl px-8 py-6 text-sm text-white focus:outline-none focus:border-cyan-400 focus:bg-white/10 transition-all placeholder:text-gray-600 font-bold" />
                </div>
                <div className="space-y-4">
                  <label htmlFor="contact-email" className="text-[12px] font-black uppercase tracking-[0.4em] text-gray-400 ml-1">Email *</label>
                  <input id="contact-email" type="email" required autoComplete="email" placeholder="ejemplo@correo.com" value={contactForm.email} onChange={e => setContactForm(f => ({ ...f, email: e.target.value }))} className="w-full bg-white/5 border border-white/10 rounded-2xl px-8 py-6 text-sm text-white focus:outline-none focus:border-cyan-400 focus:bg-white/10 transition-all placeholder:text-gray-600 font-bold" />
                </div>
                <div className="space-y-4">
                  <label htmlFor="contact-phone" className="text-[12px] font-black uppercase tracking-[0.4em] text-gray-400 ml-1">Teléfono *</label>
                  <input id="contact-phone" type="tel" required autoComplete="tel" placeholder="+34 600 000 000" value={contactForm.phone} onChange={e => setContactForm(f => ({ ...f, phone: e.target.value }))} className="w-full bg-white/5 border border-white/10 rounded-2xl px-8 py-6 text-sm text-white focus:outline-none focus:border-cyan-400 focus:bg-white/10 transition-all placeholder:text-gray-600 font-bold" />
                </div>
                <div className="space-y-4">
                  <label htmlFor="contact-message" className="text-[12px] font-black uppercase tracking-[0.4em] text-gray-400 ml-1">¿Qué quieres automatizar?</label>
                  <textarea id="contact-message" rows={3} placeholder="Ej: responder mensajes de clientes, gestionar citas, pedir reseñas..." value={contactForm.message} onChange={e => setContactForm(f => ({ ...f, message: e.target.value }))} className="w-full bg-white/5 border border-white/10 rounded-2xl px-8 py-6 text-sm text-white focus:outline-none focus:border-cyan-400 focus:bg-white/10 transition-all placeholder:text-gray-600 font-bold resize-none"></textarea>
                </div>
                <div className="flex items-start space-x-4 p-4 bg-white/5 rounded-2xl">
                  <input type="checkbox" required id="rgpd" checked={contactForm.rgpd} onChange={e => setContactForm(f => ({ ...f, rgpd: e.target.checked }))} className="mt-1 w-5 h-5 accent-cyan-400 rounded-lg" />
                  <label htmlFor="rgpd" className="text-[12px] text-gray-400 leading-relaxed font-bold">
                    He leído y acepto la <button type="button" onClick={() => setLegalModal('privacidad')} className="text-cyan-400 hover:underline font-bold">política de privacidad</button>.
                  </label>
                </div>
                {contactStatus === 'success' && (
                  <div className="flex items-center space-x-3 p-4 bg-green-500/10 border border-green-500/20 rounded-2xl">
                    <CheckCircle2 className="w-5 h-5 text-green-400 shrink-0" />
                    <p className="text-green-400 font-bold text-sm">¡Mensaje enviado! Te contactaremos en menos de 24 horas.</p>
                  </div>
                )}
                {contactStatus === 'error' && (
                  <div className="p-4 bg-red-500/10 border border-red-500/20 rounded-2xl">
                    <p className="text-red-400 font-bold text-sm">Ha ocurrido un error. Por favor, inténtalo de nuevo o escríbenos por WhatsApp.</p>
                  </div>
                )}
                <button type="submit" disabled={contactStatus === 'loading'} className="w-full bg-cyan-400 text-black py-8 rounded-3xl font-black text-2xl transition-all transform hover:scale-[1.02] active:scale-95 shadow-[0_20px_40px_rgba(34,211,238,0.4)] disabled:opacity-60 disabled:cursor-not-allowed disabled:hover:scale-100">
                  {contactStatus === 'loading' ? 'ENVIANDO...' : 'SOLICITAR DIAGNÓSTICO GRATUITO'}
                </button>
                <p className="text-center text-gray-500 text-[10px] font-black uppercase tracking-[0.3em]">
                  Respuesta Garantizada en <span className="text-cyan-400">&lt; 24 Horas</span>
                </p>
                <a
                  href="https://wa.me/34654954602?text=Hola%2C%20me%20interesa%20saber%20m%C3%A1s%20sobre%20vuestros%20servicios%20de%20automatizaci%C3%B3n"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center justify-center gap-3 w-full border-2 border-green-500 text-green-400 py-4 rounded-2xl font-black text-lg hover:bg-green-500/10 transition-all"
                >
                  <MessageCircle className="w-5 h-5" />
                  Escríbenos por WhatsApp
                </a>
              </form>
            </div>
          </div>
        </div>
      </section>

      {/* Floating Chat Widget */}
      <FloatingChatWidget />

      {/* Legal Modals */}
      {legalModal && <LegalModal type={legalModal} onClose={() => setLegalModal(null)} />}

      {/* Footer */}
      <footer className="bg-[#050d17] pt-24 pb-16 border-t border-white/8">
        <div className="container mx-auto px-6">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-16 mb-16 items-start">
            <div className="space-y-10">
              <div className="text-4xl font-black tracking-tighter">
                <span className="text-cyan-400">Edrai</span>Solutions
              </div>
              <p className="text-gray-400 text-sm leading-relaxed font-medium max-w-xs">
                Automatización con inteligencia artificial para negocios en España. Chatbots, reservas y reseñas que funcionan solos.
              </p>
              <div className="flex space-x-6">
                <a href="https://www.linkedin.com/in/ricardopichardo" target="_blank" rel="noopener noreferrer" aria-label="LinkedIn" className="w-12 h-12 bg-white/5 flex items-center justify-center rounded-2xl hover:bg-cyan-400 hover:text-black transition-all shadow-xl"><Linkedin className="w-6 h-6" /></a>
                <a href="https://www.instagram.com/edraisolutions/" target="_blank" rel="noopener noreferrer" aria-label="Instagram" className="w-12 h-12 bg-white/5 flex items-center justify-center rounded-2xl hover:bg-cyan-400 hover:text-black transition-all shadow-xl"><Instagram className="w-6 h-6" /></a>
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
                <li><button onClick={() => setLegalModal('privacidad')} className="uppercase hover:text-white transition-colors text-left">Privacidad</button></li>
                <li><a href="#contacto" className="hover:text-white transition-colors">Contacto</a></li>
              </ul>
            </div>

            <div className="lg:pt-4">
              <h4 className="font-black text-[12px] mb-10 uppercase tracking-[0.5em] text-cyan-400">Contacto</h4>
              <ul className="space-y-8 text-gray-400 text-[13px] font-bold tracking-widest uppercase">
                <li className="flex items-center space-x-4 group">
                  <Mail className="w-5 h-5 shrink-0 text-cyan-400" />
                  <a href="mailto:ricardopichardo@edraisolutions.es" className="group-hover:text-white transition-colors">ricardopichardo@edraisolutions.es</a>
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

          <div className="pt-10 border-t border-white/5 flex flex-col items-center gap-5 text-[11px] text-gray-500 font-bold uppercase tracking-[0.3em]">
            <div className="flex items-center gap-2">
              <div className="w-1.5 h-1.5 bg-green-500 rounded-full animate-pulse"></div>
              <span>Disponibles para nuevos proyectos</span>
            </div>
            <div>© 2026 Edrai Solutions. Automatización con IA.</div>
            <div className="flex items-center gap-6">
              <button onClick={() => setLegalModal('privacidad')} className="uppercase tracking-[0.3em] font-black text-[11px] hover:text-white transition-colors">Privacidad</button>
              <span className="text-white/10">·</span>
              <button onClick={() => setLegalModal('cookies')} className="uppercase tracking-[0.3em] font-black text-[11px] hover:text-white transition-colors">Cookies</button>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default App;




