import React from 'react';
import { Scale } from 'lucide-react';

// Real client testimonials. Figures come from the Mercado del Barranco chatbot
// database (Supabase, 24/06 to 27/09/2026); the event-closing time is the
// client's own account of their process. Quotes pending client sign-off.

const BARRANCO_STATS = [
  { value: <>+200</>, label: 'mensajes de clientes respondidos al mes' },
  { value: <>2<span className="text-cyan-400">/</span>3</>, label: 'de las conversaciones llegan en inglés' },
  { value: <>+90%</>, label: 'de las conversaciones resueltas sin pasar al equipo' },
  {
    value: <>&minus;2 <span className="text-[0.55em] tracking-normal text-cyan-400">sem.</span></>,
    label: 'hasta dos semanas antes para cerrar un evento: un formulario sustituye a 5+ correos',
  },
];

const QuoteMark: React.FC = () => (
  <div aria-hidden="true" className="font-serif text-5xl leading-[0.8] h-6 text-cyan-400/60">&ldquo;</div>
);

const ClientTestimonials: React.FC = () => (
  <section id="clientes" className="py-20 bg-transparent">
    <div className="container mx-auto px-6 max-w-6xl">
      <div className="mb-14">
        <div className="text-[#22d3ee] font-black text-sm uppercase tracking-[0.4em] mb-4">Clientes reales</div>
        <h2 className="text-4xl md:text-6xl font-black tracking-tighter uppercase leading-none">
          Lo que dicen<br />los que ya lo usan
        </h2>
        <p className="text-gray-400 text-lg font-medium mt-5">Negocios reales, con su nombre, su logo y sus números.</p>
      </div>

      <div className="grid md:grid-cols-2 gap-5">
        {/* Featured: Mercado del Barranco */}
        <figure className="gsap-reveal md:col-span-2 grid lg:grid-cols-[1.1fr_1fr] gap-8 lg:gap-10 p-8 md:p-10 rounded-[28px] border border-cyan-400/20 bg-gradient-to-br from-cyan-400/[0.07] via-white/[0.03] to-white/[0.03]">
          <div className="flex flex-col">
            <QuoteMark />
            <blockquote className="text-xl md:text-[1.35rem] font-semibold leading-relaxed text-slate-200 tracking-tight mb-7">
              Nos escriben turistas de todo el mundo, la mayoría en inglés. El chatbot resuelve horarios, carta y cómo llegar al momento, y las peticiones de grupos y eventos nos llegan ya con todos los datos.
            </blockquote>
            <figcaption className="mt-auto flex items-center gap-3">
              <img src="/static/cliente-barranco.webp" alt="Logo de Mercado del Barranco" width={46} height={46} loading="lazy" className="w-[46px] h-[46px] rounded-xl border border-white/15" />
              <div>
                <div className="text-[14.5px] font-extrabold">Equipo Mercado del Barranco</div>
                <div className="text-[12.5px] font-medium text-slate-400">Mercado gastronómico · Sevilla</div>
              </div>
            </figcaption>
            <a href="#demos-reales" className="mt-5 text-[13px] font-bold text-cyan-400 hover:underline underline-offset-4">
              Pruébalo tú mismo: es el chatbot de la demo de arriba ↑
            </a>
          </div>
          <div className="grid grid-cols-2 gap-3 content-start">
            {BARRANCO_STATS.map((s, i) => (
              <div key={i} className="rounded-[18px] border border-white/10 bg-[#020617]/55 p-4 md:p-5">
                <div className="text-3xl md:text-[2.1rem] font-black tracking-tighter leading-none tabular-nums">{s.value}</div>
                <div className="text-[12.5px] font-medium text-slate-400 mt-2 leading-snug">{s.label}</div>
              </div>
            ))}
            <div className="col-span-2 text-[11px] text-slate-500">
              Datos reales del chatbot. Tiempo de cierre de eventos según el equipo del Mercado.
            </div>
          </div>
        </figure>

        {/* I Jump Skydive */}
        <figure className="gsap-reveal glass flex flex-col p-8 rounded-[28px] border border-white/10">
          <QuoteMark />
          <blockquote className="text-lg font-semibold leading-relaxed text-slate-200 tracking-tight mb-7">
            Reservas, caja y finanzas estaban repartidas entre hojas de cálculo y WhatsApp. Ahora todo el equipo ve lo mismo, al momento, desde el aeródromo.
          </blockquote>
          <figcaption className="mt-auto flex items-center gap-3">
            <img src="/static/cliente-ijump.webp" alt="Logo de I Jump Skydive" width={46} height={46} loading="lazy" className="w-[46px] h-[46px] rounded-xl border border-white/15" />
            <div>
              <div className="text-[14.5px] font-extrabold">Raúl</div>
              <div className="text-[12.5px] font-medium text-slate-400">Socio fundador · I Jump Skydive</div>
            </div>
          </figcaption>
          <p className="text-[12.5px] text-slate-500 mt-5 pt-4 border-t border-white/10 leading-relaxed">
            Chatbot de atención + software de gestión a medida: reservas, agenda diaria, caja, finanzas y CRM en una sola app.
          </p>
        </figure>

        {/* Illustrative example, clearly labelled as not a client */}
        <figure className="gsap-reveal flex flex-col p-8 rounded-[28px] border border-dashed border-white/10">
          <div className="self-start mb-5 text-[10px] font-extrabold uppercase tracking-[0.12em] text-slate-500 border border-white/10 rounded-full px-2.5 py-1">
            Ejemplo ilustrativo, no es un cliente
          </div>
          <QuoteMark />
          <blockquote className="text-lg font-semibold leading-relaxed text-slate-200 tracking-tight mb-7">
            La IA clasifica las consultas y responde lo administrativo, citas, documentación, estado del caso, y prepara borradores. El equipo solo entra en lo que de verdad requiere criterio legal.
          </blockquote>
          <figcaption className="mt-auto flex items-center gap-3">
            <div className="w-[46px] h-[46px] rounded-xl border border-dashed border-slate-400/35 bg-slate-400/10 flex items-center justify-center text-slate-400">
              <Scale className="w-5 h-5" />
            </div>
            <div>
              <div className="text-[14.5px] font-extrabold">Despacho de abogados</div>
              <div className="text-[12.5px] font-medium text-slate-400">Automatización de correo</div>
            </div>
          </figcaption>
        </figure>
      </div>
    </div>
  </section>
);

export default ClientTestimonials;
