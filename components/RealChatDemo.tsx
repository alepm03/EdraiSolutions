import React, { useState, useRef, useEffect } from 'react';
import {
  Send,
  Bot,
  User,
  Activity,
  Store,
  AlertCircle,
  Sparkles
} from 'lucide-react';

interface Message {
  role: 'user' | 'bot';
  text: string;
}

// TODO: sustituir el patrón de webhook por el widget real de
// ricardopm01/barranco-webchat cuando tengamos acceso al repositorio.
// Mientras tanto, VITE_N8N_WEBHOOK_URL debe apuntar al endpoint del bot del Barranco.
const DEMO_CONFIG = {
  clientName: 'Mercado del Barranco',
  tagline: 'Demo Real en Vivo',
  sidebarDescription:
    'Estás hablando con el asistente real que atiende a los visitantes del Mercado Lonja del Barranco de Sevilla: una integración en producción de Edrai Solutions.',
  welcomeMessage:
    '¡Hola! Soy el asistente del **Mercado del Barranco**. ¿En qué puedo ayudarte? Puedo informarte sobre horarios, puestos y gastronomía, reservas o eventos.',
  inputPlaceholder: 'Pregunta por horarios, puestos, reservas o eventos...',
  offlineError:
    'Demo no disponible en este momento. Escríbenos por WhatsApp para una demo en directo.',
  connectionError:
    'No se pudo conectar con el asistente. El entorno de pruebas podría estar offline.',
  fallbackReply:
    'Lo siento, estoy experimentando dificultades técnicas para conectar con mi base de datos.',
};

const RealChatDemo: React.FC = () => {
  const webhookUrl = import.meta.env.VITE_N8N_WEBHOOK_URL;
  const [messages, setMessages] = useState<Message[]>([
    { role: 'bot', text: DEMO_CONFIG.welcomeMessage }
  ]);
  const [input, setInput] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const scrollRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
    }
  }, [messages, isLoading]);

  const handleSend = async (e?: React.FormEvent) => {
    e?.preventDefault();
    if (!input.trim() || isLoading) return;
    if (!webhookUrl) {
      setError(DEMO_CONFIG.offlineError);
      return;
    }

    const userMessage = input.trim();
    setInput('');
    setError(null);
    setMessages(prev => [...prev, { role: 'user', text: userMessage }]);
    setIsLoading(true);

    try {
      const response = await fetch(webhookUrl, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ chatInput: userMessage }),
      });

      if (!response.ok) throw new Error('Error en la conexión con el servidor');

      const data = await response.json();
      const botText = data.output || data.text || data.response || 'He recibido tu mensaje, pero no puedo procesar una respuesta ahora mismo.';

      setMessages(prev => [...prev, { role: 'bot', text: botText }]);
    } catch (err) {
      console.error('Chat Error:', err);
      setError(DEMO_CONFIG.connectionError);
      setMessages(prev => [...prev, { role: 'bot', text: DEMO_CONFIG.fallbackReply }]);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="max-w-5xl mx-auto">
      <div className="glass rounded-[40px] overflow-hidden border border-white/10 shadow-2xl relative">
        <div className="absolute top-0 right-0 w-64 h-64 bg-cyan-500/5 blur-[100px] pointer-events-none"></div>

        <div className="grid lg:grid-cols-12">
          {/* Info Sidebar */}
          <div className="lg:col-span-4 p-8 lg:p-12 border-b lg:border-b-0 lg:border-r border-white/10 bg-white/[0.01]">
            <div className="flex items-center gap-4 mb-8">
              <div className="w-14 h-14 bg-cyan-400 rounded-2xl flex items-center justify-center text-black shadow-lg shadow-cyan-400/20">
                <Store className="w-7 h-7" />
              </div>
              <div>
                <h3 className="font-black text-2xl leading-none tracking-tight uppercase">{DEMO_CONFIG.clientName}</h3>
                <span className="text-[11px] text-cyan-400 font-black uppercase tracking-widest mt-1 block">{DEMO_CONFIG.tagline}</span>
              </div>
            </div>

            <p className="text-gray-400 text-[15px] leading-relaxed mb-8 font-medium">
              {DEMO_CONFIG.sidebarDescription}
            </p>

            <div className="space-y-4">
              <div className="flex items-center gap-3 text-xs font-black text-gray-500 uppercase tracking-widest">
                <Activity className="w-4 h-4 text-cyan-400" />
                <span>Latencia: ~1.2s</span>
              </div>
              <div className="flex items-center gap-3 text-xs font-black text-gray-500 uppercase tracking-widest">
                <Sparkles className="w-4 h-4 text-cyan-400" />
                <span>Motor: AI Agent</span>
              </div>
            </div>

            {error && (
              <div className="mt-8 p-4 bg-red-500/10 border border-red-500/20 rounded-2xl flex gap-3 items-start">
                <AlertCircle className="w-5 h-5 text-red-500 shrink-0 mt-0.5" />
                <p className="text-[11px] text-red-200 leading-tight font-bold uppercase">{error}</p>
              </div>
            )}
          </div>

          {/* Chat Area */}
          <div className="lg:col-span-8 flex flex-col h-[600px] bg-black/20">
            <div className="flex-1 overflow-y-auto p-6 lg:p-10 space-y-6 scrollbar-thin scrollbar-thumb-white/10" ref={scrollRef}>
              {messages.map((msg, i) => (
                <div key={i} className={`flex ${msg.role === 'user' ? 'justify-end' : 'justify-start'} animate-in fade-in slide-in-from-bottom-2 duration-300`}>
                  <div className={`flex max-w-[85%] gap-4 ${msg.role === 'user' ? 'flex-row-reverse' : ''}`}>
                    <div className={`w-10 h-10 rounded-xl flex items-center justify-center shrink-0 shadow-lg ${
                      msg.role === 'user' ? 'bg-cyan-400 text-black' : 'bg-white/10 text-white'
                    }`}>
                      {msg.role === 'user' ? <User className="w-5 h-5" /> : <Bot className="w-5 h-5" />}
                    </div>
                    <div className={`px-6 py-4 rounded-3xl text-[15px] leading-relaxed font-medium ${
                      msg.role === 'user'
                        ? 'bg-gradient-to-br from-cyan-500 to-blue-600 text-white font-bold rounded-tr-none shadow-xl shadow-cyan-500/10'
                        : 'bg-white/5 text-gray-200 border border-white/5 rounded-tl-none backdrop-blur-md'
                    }`}>
                      {msg.text.split('**').map((part, index) =>
                        index % 2 === 1 ? <strong key={index} className="text-cyan-400 font-bold">{part}</strong> : part
                      )}
                    </div>
                  </div>
                </div>
              ))}
              {isLoading && (
                <div className="flex justify-start animate-pulse">
                  <div className="flex gap-4">
                    <div className="w-10 h-10 rounded-xl bg-white/10 flex items-center justify-center text-white shadow-lg">
                      <Bot className="w-5 h-5" />
                    </div>
                    <div className="px-6 py-4 bg-white/5 border border-white/5 rounded-2xl rounded-tl-none flex items-center gap-1.5">
                      <div className="w-1.5 h-1.5 bg-cyan-400 rounded-full animate-bounce"></div>
                      <div className="w-1.5 h-1.5 bg-cyan-400 rounded-full animate-bounce [animation-delay:0.2s]"></div>
                      <div className="w-1.5 h-1.5 bg-cyan-400 rounded-full animate-bounce [animation-delay:0.4s]"></div>
                    </div>
                  </div>
                </div>
              )}
            </div>

            {/* Input Form */}
            <div className="p-6 border-t border-white/5 bg-white/[0.01]">
              <form onSubmit={handleSend} className="relative flex items-center gap-3">
                <input
                  type="text"
                  value={input}
                  onChange={(e) => setInput(e.target.value)}
                  placeholder={DEMO_CONFIG.inputPlaceholder}
                  className="w-full bg-white/5 border border-white/10 rounded-2xl px-6 py-4 text-sm text-white placeholder:text-gray-600 focus:outline-none focus:border-cyan-400/50 transition-all font-bold"
                />
                <button
                  type="submit"
                  disabled={isLoading || !input.trim()}
                  aria-label="Enviar mensaje"
                  className="p-4 bg-cyan-400 text-black rounded-2xl hover:bg-cyan-300 transition-all disabled:opacity-40 disabled:cursor-not-allowed transform active:scale-95 flex-shrink-0 shadow-lg shadow-cyan-400/20"
                >
                  <Send className="w-5 h-5" />
                </button>
              </form>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default RealChatDemo;
