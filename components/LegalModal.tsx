import React, { useEffect } from 'react';
import { X } from 'lucide-react';

type LegalModalType = 'privacidad' | 'cookies';

interface LegalModalProps {
  type: LegalModalType;
  onClose: () => void;
}

const PrivacidadContent: React.FC = () => (
  <div className="space-y-8 text-gray-300 text-[15px] leading-relaxed">
    <section>
      <h3 className="text-white font-black text-lg mb-3 uppercase tracking-tight">1. Responsable del tratamiento</h3>
      <p>
        <strong className="text-white">Titular:</strong> Ricardo Pichardo<br />
        <strong className="text-white">Actividad:</strong> Edrai Solutions — Automatización con IA<br />
        <strong className="text-white">Domicilio:</strong> Madrid, España<br />
        <strong className="text-white">Email de contacto:</strong>{' '}
        <a href="mailto:info@edraisolutions.es" className="text-cyan-400 hover:underline">info@edraisolutions.es</a>
      </p>
    </section>

    <section>
      <h3 className="text-white font-black text-lg mb-3 uppercase tracking-tight">2. Datos que recogemos</h3>
      <p>
        A través del formulario de contacto de esta web recogemos los siguientes datos personales que tú nos facilitas voluntariamente:
      </p>
      <ul className="list-disc list-inside mt-3 space-y-1 text-gray-400">
        <li>Nombre o razón social</li>
        <li>Dirección de correo electrónico</li>
        <li>Número de teléfono</li>
        <li>Mensaje o descripción de tu consulta</li>
      </ul>
    </section>

    <section>
      <h3 className="text-white font-black text-lg mb-3 uppercase tracking-tight">3. Finalidad del tratamiento</h3>
      <p>
        Utilizamos tus datos exclusivamente para gestionar tu consulta comercial y contactar contigo en relación con los servicios de automatización con IA que ofrecemos. No utilizamos tus datos para ningún otro fin.
      </p>
    </section>

    <section>
      <h3 className="text-white font-black text-lg mb-3 uppercase tracking-tight">4. Base legal</h3>
      <p>
        El tratamiento de tus datos se basa en el <strong className="text-white">consentimiento</strong> que nos otorgas al marcar la casilla de aceptación y enviar el formulario (Art. 6.1.a del Reglamento General de Protección de Datos — RGPD).
      </p>
    </section>

    <section>
      <h3 className="text-white font-black text-lg mb-3 uppercase tracking-tight">5. Plazo de conservación</h3>
      <p>
        Conservaremos tus datos mientras mantengamos una relación comercial activa contigo o hasta que solicites su supresión. En todo caso, los eliminaremos transcurridos <strong className="text-white">2 años</strong> desde el último contacto sin actividad.
      </p>
    </section>

    <section>
      <h3 className="text-white font-black text-lg mb-3 uppercase tracking-tight">6. Destinatarios</h3>
      <p>
        Tus datos no se ceden a terceros, salvo obligación legal. No realizamos transferencias internacionales de datos.
      </p>
    </section>

    <section>
      <h3 className="text-white font-black text-lg mb-3 uppercase tracking-tight">7. Tus derechos</h3>
      <p>
        Puedes ejercer en cualquier momento los derechos de <strong className="text-white">acceso, rectificación, supresión, oposición, portabilidad y limitación</strong> del tratamiento de tus datos, enviando un email a{' '}
        <a href="mailto:info@edraisolutions.es" className="text-cyan-400 hover:underline">info@edraisolutions.es</a>{' '}
        con el asunto "Protección de datos" e indicando el derecho que deseas ejercer.
      </p>
      <p className="mt-3">
        Si consideras que el tratamiento no se ajusta a la normativa, puedes presentar una reclamación ante la{' '}
        <a href="https://www.aepd.es" target="_blank" rel="noopener noreferrer" className="text-cyan-400 hover:underline">
          Agencia Española de Protección de Datos (AEPD)
        </a>.
      </p>
    </section>

    <section>
      <h3 className="text-white font-black text-lg mb-3 uppercase tracking-tight">8. Cambios en esta política</h3>
      <p>
        Nos reservamos el derecho a actualizar esta política cuando sea necesario. Te notificaremos cualquier cambio relevante. Última actualización: marzo de 2026.
      </p>
    </section>
  </div>
);

const CookiesContent: React.FC = () => (
  <div className="space-y-8 text-gray-300 text-[15px] leading-relaxed">
    <section>
      <h3 className="text-white font-black text-lg mb-3 uppercase tracking-tight">¿Qué son las cookies?</h3>
      <p>
        Las cookies son pequeños archivos de texto que los sitios web almacenan en tu dispositivo para recordar información sobre tu visita.
      </p>
    </section>

    <section>
      <h3 className="text-white font-black text-lg mb-3 uppercase tracking-tight">Cookies que usamos</h3>
      <p>
        Esta web <strong className="text-white">únicamente utiliza cookies técnicas estrictamente necesarias</strong> para su funcionamiento. Estas cookies no recogen datos personales ni rastrean tu actividad con fines publicitarios o de análisis.
      </p>
      <div className="mt-4 p-4 bg-white/5 rounded-xl border border-white/10">
        <p className="text-gray-400 text-sm">
          <strong className="text-cyan-400">Cookies técnicas:</strong> necesarias para el funcionamiento básico de la web (sesión de navegación). Se eliminan al cerrar el navegador.
        </p>
      </div>
    </section>

    <section>
      <h3 className="text-white font-black text-lg mb-3 uppercase tracking-tight">Lo que NO usamos</h3>
      <ul className="list-disc list-inside space-y-1 text-gray-400">
        <li>Cookies de analítica (Google Analytics, Hotjar, etc.)</li>
        <li>Cookies de publicidad o retargeting</li>
        <li>Cookies de redes sociales de terceros</li>
      </ul>
      <p className="mt-3 text-gray-400 text-sm italic">
        Nota: si en el futuro activamos herramientas de analítica, actualizaremos esta política y añadiremos un aviso de cookies.
      </p>
    </section>

    <section>
      <h3 className="text-white font-black text-lg mb-3 uppercase tracking-tight">Cómo gestionar las cookies</h3>
      <p>
        Puedes configurar tu navegador para bloquear o eliminar cookies. Ten en cuenta que desactivar las cookies técnicas puede afectar al funcionamiento de la web. Consulta la ayuda de tu navegador para más información.
      </p>
    </section>

    <section>
      <h3 className="text-white font-black text-lg mb-3 uppercase tracking-tight">Contacto</h3>
      <p>
        Para cualquier duda sobre el uso de cookies, escríbenos a{' '}
        <a href="mailto:info@edraisolutions.es" className="text-cyan-400 hover:underline">info@edraisolutions.es</a>.
      </p>
    </section>
  </div>
);

const LegalModal: React.FC<LegalModalProps> = ({ type, onClose }) => {
  useEffect(() => {
    const handleKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose();
    };
    document.addEventListener('keydown', handleKey);
    document.body.style.overflow = 'hidden';
    return () => {
      document.removeEventListener('keydown', handleKey);
      document.body.style.overflow = '';
    };
  }, [onClose]);

  const title = type === 'privacidad' ? 'Política de Privacidad' : 'Política de Cookies';

  return (
    <div
      className="fixed inset-0 z-[200] flex items-center justify-center p-4 md:p-8"
      onClick={(e) => { if (e.target === e.currentTarget) onClose(); }}
    >
      {/* Backdrop */}
      <div className="absolute inset-0 bg-black/80 backdrop-blur-sm" />

      {/* Modal */}
      <div className="relative w-full max-w-2xl max-h-[90vh] flex flex-col bg-[#0a1120] border border-white/10 rounded-[32px] shadow-[0_40px_80px_rgba(0,0,0,0.6)] overflow-hidden">
        {/* Header */}
        <div className="flex items-center justify-between px-8 py-6 border-b border-white/10 shrink-0">
          <div>
            <div className="text-cyan-400 font-black text-[11px] uppercase tracking-[0.4em] mb-1">Edrai Solutions</div>
            <h2 className="text-xl font-black tracking-tight">{title}</h2>
          </div>
          <button
            onClick={onClose}
            aria-label="Cerrar"
            className="w-10 h-10 flex items-center justify-center rounded-xl bg-white/5 hover:bg-white/15 text-gray-400 hover:text-white transition-all"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Content */}
        <div className="overflow-y-auto flex-1 px-8 py-8">
          {type === 'privacidad' ? <PrivacidadContent /> : <CookiesContent />}
        </div>

        {/* Footer */}
        <div className="px-8 py-5 border-t border-white/10 shrink-0 flex items-center justify-between">
          <p className="text-gray-500 text-[11px] font-bold uppercase tracking-widest">Última actualización: marzo 2026</p>
          <button
            onClick={onClose}
            className="bg-cyan-400 text-black px-6 py-2.5 rounded-xl font-black text-sm hover:bg-cyan-300 transition-all"
          >
            Entendido
          </button>
        </div>
      </div>
    </div>
  );
};

export default LegalModal;
