import React, { useState, useRef, useEffect } from 'react';
import { 
  Send, 
  Paperclip, 
  MoreVertical, 
  MessageSquare, 
  Calendar, 
  Star,
  User,
  Bot,
  Lightbulb,
  CheckCircle2
} from 'lucide-react';
import { GoogleGenAI } from '@google/genai';
import { ChatMessage } from '../types';

const KNOWLEDGE_BASE = `
Contexto de Edrai Solutions:
- Somos una agencia de automatización con IA.
- Servicios: 
  1. Chatbots Propios (WhatsApp, Web, Redes): Atención 24/7, entienden contexto, escalan a humanos.
  2. Reservas Automáticas: Gestión de citas sin intervención humana, recordatorios por WhatsApp/SMS, sincronización con agendas.
  3. Gestión de Reseñas: Invitación automática tras el servicio, detección de sentimiento negativo antes de publicar, aumento de nota en Google.
- Proceso: 
  1. Diagnóstico gratuito (30 min).
  2. Propuesta a medida (coste cerrado).
  3. Implementación (2-4 semanas).
  4. Soporte continuo.
- Valor: Ahorro de tiempo, reducción de costes operativos, incremento de ventas y mejor atención.
- Cumplimiento: RGPD estricto, servidores europeos.
`;

const AGENTS = [
  {
    id: 'chatbots',
    name: 'Atención al Cliente',
    description: 'Expertos en chatbots para WhatsApp y Web.',
    icon: <MessageSquare className="w-5 h-5" />,
    color: 'bg-cyan-500',
    greeting: '¡Hola! Soy el experto en atención automatizada de Edrai. ¿Te imaginas a tu negocio respondiendo clientes por WhatsApp mientras duermes? ¿Qué dudas tienes sobre cómo lo implementamos?',
    systemPrompt: `${KNOWLEDGE_BASE}
    Eres el Especialista en Chatbots de Edrai Solutions. 
    Tu objetivo es convencer al usuario de la potencia de tener un asistente 24/7.
    REGLAS:
    1. Tono natural y directo.
    2. Respuestas de máximo 3 líneas.
    3. Si preguntan por costes, menciona que el diagnóstico inicial es gratuito para dar un presupuesto exacto.
    4. Siempre enfócate en la integración con WhatsApp y web.`
  },
  {
    id: 'booking',
    name: 'Gestor de Reservas',
    description: 'Automatización de citas y recordatorios.',
    icon: <Calendar className="w-5 h-5" />,
    color: 'bg-blue-600',
    greeting: 'Hola, un placer. Soy el gestor de logística de Edrai. ¿Cansado de perder tiempo confirmando citas por teléfono? Te cuento cómo podemos automatizar toda tu agenda hoy mismo.',
    systemPrompt: `${KNOWLEDGE_BASE}
    Eres el Gestor de Reservas de Edrai Solutions.
    Tu objetivo es explicar la eficiencia de los recordatorios automáticos y la gestión de citas.
    REGLAS:
    1. Menciona que reducimos el absentismo mediante recordatorios por WhatsApp.
    2. Explica que nos sincronizamos con su agenda actual (Google Cal, etc.).
    3. Sé breve y profesional.`
  },
  {
    id: 'reviews',
    name: 'Analista de Reputación',
    description: 'Más reseñas en Google automáticamente.',
    icon: <Star className="w-5 h-5" />,
    color: 'bg-amber-500',
    greeting: '¡Hola! Soy el analista de reseñas de Edrai. ¿Sabías que podemos pedirle una reseña a tus clientes de forma automática justo cuando están más contentos? ¿Hablamos de cómo subir tu nota en Google?',
    systemPrompt: `${KNOWLEDGE_BASE}
    Eres el Especialista en Reputación de Edrai Solutions.
    Tu objetivo es mostrar cómo la IA ayuda a conseguir más reseñas de 5 estrellas.
    REGLAS:
    1. Explica que detectamos el sentimiento negativo antes de que llegue a Google.
    2. Enfatiza que es un proceso automático tras la compra o visita.
    3. Tono analítico pero optimista.`
  }
];

const ChatbotDemo: React.FC = () => {
  const [selectedAgent, setSelectedAgent] = useState(AGENTS[0]);
  const [messages, setMessages] = useState<ChatMessage[]>([
    { role: 'model', text: AGENTS[0].greeting }
  ]);
  const [input, setInput] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const scrollRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
    }
  }, [messages, isTyping]);

  const handleSend = async (e?: React.FormEvent) => {
    e?.preventDefault();
    if (!input.trim() || isTyping) return;

    const userMessage = input.trim();
    setInput('');
    setMessages(prev => [...prev, { role: 'user', text: userMessage }]);
    setIsTyping(true);

    try {
      const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });
      const response = await ai.models.generateContent({
        model: 'gemini-3-flash-preview',
        contents: [...messages, { role: 'user', text: userMessage }].map(m => ({
          role: m.role,
          parts: [{ text: m.text }]
        })),
        config: {
          systemInstruction: selectedAgent.systemPrompt,
          temperature: 0.6,
        }
      });

      const aiText = response.text || 'Entendido. ¿Deseas que profundicemos en algún detalle de este servicio?';
      setMessages(prev => [...prev, { role: 'model', text: aiText }]);
    } catch (error) {
      console.error('Gemini API Error:', error);
      setMessages(prev => [...prev, { role: 'model', text: 'Error de conexión. Estoy reconectando con los sistemas de Edrai...' }]);
    } finally {
      setIsTyping(false);
    }
  };

  const changeAgent = (agent: typeof AGENTS[0]) => {
    if (selectedAgent.id === agent.id) return;
    setSelectedAgent(agent);
    setMessages([
      { role: 'model', text: agent.greeting }
    ]);
  };

  return (
    <div className="grid lg:grid-cols-12 gap-12 max-w-6xl mx-auto">
      {/* Selection Area */}
      <div className="lg:col-span-5 space-y-6">
        <h4 className="text-xl font-black mb-6 flex items-center gap-2 uppercase tracking-tight">
          Pruebe nuestros asistentes:
        </h4>
        <div className="space-y-4">
          {AGENTS.map((agent) => (
            <button
              key={agent.id}
              onClick={() => changeAgent(agent)}
              className={`w-full text-left p-6 rounded-2xl border transition-all flex items-center gap-6 group relative overflow-hidden ${
                selectedAgent.id === agent.id 
                  ? 'bg-cyan-500/10 border-cyan-400 shadow-[0_0_30px_rgba(34,211,238,0.1)]' 
                  : 'bg-white/5 border-white/10 hover:border-white/20'
              }`}
            >
              <div className={`w-12 h-12 rounded-xl flex items-center justify-center shrink-0 ${
                selectedAgent.id === agent.id ? agent.color : 'bg-white/10'
              } text-white transition-all shadow-lg`}>
                 {agent.icon}
              </div>
              <div className="flex-1">
                <div className="font-black text-lg mb-1 flex items-center justify-between">
                  {agent.name}
                  {selectedAgent.id === agent.id && (
                    <div className="w-5 h-5 bg-cyan-400 rounded-full flex items-center justify-center animate-pulse">
                      <CheckCircle2 className="w-3 h-3 text-black" />
                    </div>
                  )}
                </div>
                <p className="text-gray-400 text-[11px] leading-relaxed uppercase tracking-wider font-bold opacity-70">
                  {agent.description}
                </p>
              </div>
            </button>
          ))}
        </div>

        <div className="bg-gradient-to-br from-[#0a1120] to-black p-8 rounded-3xl border border-white/5 mt-12 relative overflow-hidden group">
          <div className="absolute top-0 right-0 w-32 h-32 bg-cyan-400/5 blur-[60px] group-hover:bg-cyan-400/15 transition-all"></div>
          <div className="flex items-center gap-3 mb-4 text-cyan-400">
            <Lightbulb className="w-6 h-6" />
            <h5 className="font-black text-lg uppercase tracking-tight">Sistemas Propietarios</h5>
          </div>
          <p className="text-gray-400 text-[15px] mb-6 leading-relaxed font-medium">
            Nuestros asistentes no son "chatbots genéricos". Están entrenados específicamente con los datos y flujos operativos de <strong className="text-cyan-400">su propio negocio</strong>.
          </p>
          <a href="#contacto" className="block text-center bg-cyan-400 text-black px-6 py-4 rounded-xl font-black text-sm w-full hover:bg-cyan-300 transition-all transform hover:scale-[1.02]">
            Agendar diagnóstico gratuito
          </a>
        </div>
      </div>

      {/* Chat Window */}
      <div className="lg:col-span-7 h-[680px] flex flex-col glass rounded-[40px] overflow-hidden border border-white/10 relative shadow-2xl">
        {/* Chat Header */}
        <div className="px-8 py-6 border-b border-white/10 flex items-center justify-between bg-white/[0.02]">
          <div className="flex items-center space-x-4">
            <div className={`w-12 h-12 rounded-2xl flex items-center justify-center text-white shadow-xl ${selectedAgent.color} transition-all duration-500`}>
              {selectedAgent.icon}
            </div>
            <div>
              <div className="font-black text-xl tracking-tight">{selectedAgent.name}</div>
              <div className="flex items-center space-x-2">
                <span className="w-2 h-2 bg-green-500 rounded-full animate-pulse"></span>
                <span className="text-[11px] text-gray-500 uppercase tracking-[0.2em] font-black">Asistente en línea</span>
              </div>
            </div>
          </div>
          <button className="p-2 text-gray-600 hover:text-white transition-colors"><MoreVertical className="w-6 h-6" /></button>
        </div>

        {/* Messages */}
        <div 
          ref={scrollRef}
          className="flex-1 overflow-y-auto p-8 space-y-8 scrollbar-thin scrollbar-thumb-white/10"
        >
          {messages.map((msg, i) => (
            <div key={i} className={`flex ${msg.role === 'user' ? 'justify-end' : 'justify-start'}`}>
              <div className={`flex max-w-[90%] space-x-4 ${msg.role === 'user' ? 'flex-row-reverse space-x-reverse' : ''}`}>
                <div className={`w-10 h-10 rounded-xl flex items-center justify-center shrink-0 shadow-lg ${msg.role === 'user' ? 'bg-cyan-400 text-black' : 'bg-white/10 text-white'}`}>
                  {msg.role === 'user' ? <User className="w-6 h-6" /> : <Bot className="w-6 h-6" />}
                </div>
                <div className={`px-6 py-4 rounded-3xl text-[15px] leading-relaxed whitespace-pre-wrap font-medium ${
                  msg.role === 'user' 
                    ? 'bg-cyan-400 text-black font-bold rounded-tr-none' 
                    : 'bg-white/[0.03] text-gray-200 border border-white/5 rounded-tl-none backdrop-blur-sm shadow-xl'
                }`}>
                  {msg.text.split('**').map((part, index) => 
                    index % 2 === 1 ? <strong key={index} className="text-cyan-400 font-bold">{part}</strong> : part
                  )}
                </div>
              </div>
            </div>
          ))}
          {isTyping && (
            <div className="flex justify-start">
               <div className="flex max-w-[80%] space-x-4">
                <div className="w-10 h-10 rounded-xl flex items-center justify-center shrink-0 bg-white/10 text-white shadow-lg">
                  <Bot className="w-6 h-6" />
                </div>
                <div className="px-6 py-4 rounded-3xl bg-white/[0.03] border border-white/5 rounded-tl-none flex items-center space-x-2">
                  <div className="w-2 h-2 bg-cyan-400 rounded-full animate-bounce [animation-delay:-0.3s]"></div>
                  <div className="w-2 h-2 bg-cyan-400 rounded-full animate-bounce [animation-delay:-0.15s]"></div>
                  <div className="w-2 h-2 bg-cyan-400 rounded-full animate-bounce"></div>
                </div>
              </div>
            </div>
          )}
        </div>

        {/* Input Area */}
        <div className="p-6 border-t border-white/10 bg-white/[0.02]">
          <form onSubmit={handleSend} className="relative flex items-center">
            <input
              type="text"
              value={input}
              onChange={(e) => setInput(e.target.value)}
              placeholder={`Habla con nuestro experto en ${selectedAgent.name.toLowerCase()}...`}
              className="w-full bg-white/5 border border-white/10 rounded-2xl py-5 pl-7 pr-32 text-sm text-white focus:outline-none focus:border-cyan-400/50 transition-all focus:bg-white/10 placeholder:text-gray-700 font-bold"
            />
            <div className="absolute right-3 flex items-center space-x-2">
              <button 
                type="submit" 
                disabled={isTyping || !input.trim()}
                className="bg-cyan-400 text-black px-5 py-3 rounded-xl hover:bg-cyan-300 transition-all disabled:opacity-50 disabled:cursor-not-allowed font-black flex items-center gap-2 shadow-lg shadow-cyan-400/20"
              >
                <span>Enviar</span>
                <Send className="w-4 h-4" />
              </button>
            </div>
          </form>
          <div className="mt-4 text-center">
             <p className="text-[11px] text-gray-500 uppercase tracking-wider font-bold">Demo de Edrai Solutions · Respuestas generadas por IA</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ChatbotDemo;