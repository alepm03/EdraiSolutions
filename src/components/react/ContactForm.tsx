import React, { useState } from 'react';
import { CheckCircle2, MessageCircle, ArrowRight } from 'lucide-react';
import { WORKER_URL } from '../../lib/env';
import { track, identifyLead, getDistinctId, EV } from '../../lib/analytics';

// Production contact form (EdraiSolutions-web App.tsx), same endpoint and
// payload: POST {WORKER_URL}/contact, which forwards to the n8n webhook.
const WA = 'https://wa.me/34654954602?text=Hola%2C%20me%20interesa%20saber%20m%C3%A1s%20sobre%20vuestros%20servicios';

type Status = 'idle' | 'loading' | 'success' | 'error';
const empty = { name: '', email: '', phone: '', message: '', rgpd: false };

const field =
  'w-full rounded-xl border border-white/10 bg-white/[0.04] px-4 py-3.5 text-[15px] text-white placeholder:text-slate-500 transition-colors focus:border-cyan-400 focus:bg-white/[0.07] focus:outline-none';
const label = 'mb-2 block text-[13px] font-semibold text-slate-300';

const ContactForm: React.FC = () => {
  const [form, setForm] = useState(empty);
  const [status, setStatus] = useState<Status>('idle');

  const submit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!form.rgpd) { track(EV.formularioSinRgpd); return; }
    setStatus('loading');
    try {
      const res = await fetch(`${WORKER_URL}/contact`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          name: form.name, email: form.email, phone: form.phone, message: form.message,
          source: 'formulario-web', analytics_id: getDistinctId(),
        }),
      });
      if (!res.ok) throw new Error(`Worker /contact responded ${res.status}`);
      identifyLead(form.email, { origen_lead: 'formulario-web' });
      track(EV.formularioEnviado, { resultado: 'ok', con_mensaje: form.message.trim().length > 0 });
      setStatus('success');
      setForm(empty);
    } catch (err) {
      track(EV.formularioEnviado, { resultado: 'error', motivo: err instanceof Error ? err.message : 'desconocido' });
      setStatus('error');
    }
  };

  return (
    <form onSubmit={submit} className="ph-no-capture grid gap-5" noValidate={false}>
      <div className="grid gap-5 sm:grid-cols-2">
        <div>
          <label htmlFor="cf-name" className={label}>Nombre *</label>
          <input id="cf-name" required autoComplete="name" placeholder="Tu nombre o el de tu negocio" className={field}
            value={form.name} onChange={(e) => setForm((f) => ({ ...f, name: e.target.value }))} />
        </div>
        <div>
          <label htmlFor="cf-phone" className={label}>Teléfono *</label>
          <input id="cf-phone" type="tel" required autoComplete="tel" placeholder="+34 600 000 000" className={field}
            value={form.phone} onChange={(e) => setForm((f) => ({ ...f, phone: e.target.value }))} />
        </div>
      </div>
      <div>
        <label htmlFor="cf-email" className={label}>Email *</label>
        <input id="cf-email" type="email" required autoComplete="email" placeholder="tu@negocio.com" className={field}
          value={form.email} onChange={(e) => setForm((f) => ({ ...f, email: e.target.value }))} />
      </div>
      <div>
        <label htmlFor="cf-msg" className={label}>¿Qué te quita más tiempo?</label>
        <textarea id="cf-msg" rows={3} placeholder="Ej.: contestar WhatsApp, confirmar citas, cuadrar facturas…" className={`${field} resize-none`}
          value={form.message} onChange={(e) => setForm((f) => ({ ...f, message: e.target.value }))} />
      </div>
      <label className="flex items-start gap-3 text-[13.5px] leading-relaxed text-slate-400">
        <input type="checkbox" required checked={form.rgpd} onChange={(e) => setForm((f) => ({ ...f, rgpd: e.target.checked }))}
          className="mt-1 h-4 w-4 shrink-0 accent-cyan-400" />
        <span>He leído y acepto la <a href="/privacidad" className="text-cyan-400 underline-offset-4 hover:underline">política de privacidad</a>.</span>
      </label>

      {status === 'success' && (
        <p role="status" className="flex items-center gap-3 rounded-xl border border-emerald-400/25 bg-emerald-400/10 p-4 text-sm font-semibold text-emerald-300">
          <CheckCircle2 className="h-5 w-5 shrink-0" /> Mensaje enviado. Te contactamos en menos de 24 horas.
        </p>
      )}
      {status === 'error' && (
        <p role="alert" className="rounded-xl border border-red-400/25 bg-red-400/10 p-4 text-sm font-semibold text-red-300">
          No se ha podido enviar. Inténtalo de nuevo o escríbenos por WhatsApp.
        </p>
      )}

      <button type="submit" disabled={status === 'loading'}
        className="inline-flex h-14 items-center justify-center gap-2 rounded-full bg-cyan-400 px-6 text-[16px] font-semibold text-[#03161c] transition hover:bg-cyan-300 active:scale-[0.99] disabled:cursor-not-allowed disabled:opacity-60">
        {status === 'loading' ? 'Enviando…' : <>Pedir diagnóstico gratuito <ArrowRight className="h-4 w-4" /></>}
      </button>
      <a href={WA} target="_blank" rel="noopener noreferrer"
        className="inline-flex h-12 items-center justify-center gap-2 rounded-full border border-white/15 text-[15px] font-semibold text-white transition hover:bg-white/5">
        <MessageCircle className="h-4 w-4" /> Prefiero escribir por WhatsApp
      </a>
      <p className="text-center text-[12.5px] text-slate-500">Respuesta en menos de 24 h · Diagnóstico de 15 minutos · Sin compromiso</p>
    </form>
  );
};

export default ContactForm;
