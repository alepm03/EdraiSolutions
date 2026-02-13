import React, { useState, useRef, useEffect } from 'react';
import { 
  MessageSquare, 
  X, 
  Send, 
  Bot, 
  User,
  Minus,
  Sparkles
} from 'lucide-react';
import { GoogleGenAI } from '@google/genai';
import { ChatMessage } from '../types';

const FloatingChatWidget: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState<ChatMessage[]>([
    { role: 'model', text: '¡Hola! Soy el asistente virtual de Edrai Solutions. ¿Cómo puedo ayudarte hoy con la automatización de tu negocio?' }
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
          systemInstruction: 'Eres el asistente oficial de Edrai Solutions, expertos en automatización con IA. Tu tono es ejecutivo, tecnológico y resolutivo. Ayuda al usuario a entender cómo la IA puede optimizar sus procesos y anímale a agendar una auditoría. Sé conciso (máximo 2-3 líneas).',
          temperature: 0.7,
        }
      });

      const aiText = response.text || 'Entendido. ¿Deseas que analicemos cómo implementar esto en tu flujo operativo?';
      setMessages(prev => [...prev, { role: 'model', text: aiText }]);
    } catch (error) {
      console.error('Chat Widget Error:', error);
      setMessages(prev => [...prev, { role: 'model', text: 'Lo siento, mi conexión es algo inestable ahora mismo. ¿En qué más puedo ayudarte?' }]);
    } finally {
      setIsTyping(false);
    }
  };

  return (
    <div className="fixed bottom-6 right-6 z-[9999] flex flex-col items-end font-sans">
      {/* Chat Window */}
      {isOpen && (
        <div className="mb-6 w-[380px] sm:w-[420px] h-[600px] bg-gray-950/80 backdrop-blur-2xl rounded-3xl shadow-[0_20px_50px_rgba(0,0,0,0.5)] flex flex-col overflow-hidden border border-white/10 animate-in slide-in-from-bottom-8 fade-in duration-500">
          
          {/* Header */}
          <div className="relative bg-gradient-to-r from-cyan-950/50 to-blue-950/50 px-6 py-5 flex items-center justify-between border-b border-white/10">
            <div className="absolute inset-0 bg-white/5 opacity-20 pointer-events-none"></div>
            <div className="flex items-center space-x-4 relative z-10">
              <div className="relative">
                <div className="w-10 h-10 bg-gradient-to-br from-cyan-400 to-blue-500 rounded-xl flex items-center justify-center text-black shadow-lg shadow-cyan-500/20">
                  <Bot className="w-6 h-6" />
                </div>
                <div className="absolute -bottom-0.5 -right-0.5 w-3 h-3 bg-green-500 border-2 border-gray-900 rounded-full animate-pulse"></div>
              </div>
              <div>
                <h4 className="font-bold text-white tracking-tight flex items-center gap-1">
                  Edrai <span className="text-cyan-400">Assistant</span>
                </h4>
                <div className="flex items-center space-x-1.5">
                  <span className="text-[10px] text-cyan-400/80 font-bold uppercase tracking-widest flex items-center gap-1">
                    <Sparkles className="w-2.5 h-2.5" /> IA Activa
                  </span>
                </div>
              </div>
            </div>
            <div className="flex items-center space-x-1 relative z-10">
              <button onClick={() => setIsOpen(false)} className="p-2 text-gray-400 hover:text-white hover:bg-white/5 rounded-lg transition-all">
                <Minus className="w-5 h-5" />
              </button>
              <button onClick={() => setIsOpen(false)} className="p-2 text-gray-400 hover:text-white hover:bg-white/5 rounded-lg transition-all">
                <X className="w-5 h-5" />
              </button>
            </div>
          </div>

          {/* Messages Container */}
          <div 
            ref={scrollRef}
            className="flex-1 overflow-y-auto p-6 space-y-5 bg-gradient-to-b from-transparent to-black/20 scrollbar-thin scrollbar-thumb-white/10"
          >
            {messages.map((msg, i) => (
              <div key={i} className={`flex ${msg.role === 'user' ? 'justify-end' : 'justify-start'} animate-in fade-in slide-in-from-bottom-2 duration-300`}>
                <div className={`flex max-w-[85%] space-x-3 ${msg.role === 'user' ? 'flex-row-reverse space-x-reverse' : ''}`}>
                  {msg.role === 'model' && (
                    <div className="w-8 h-8 rounded-full bg-white/5 border border-white/10 flex items-center justify-center shrink-0 mt-1">
                      <Bot className="w-4 h-4 text-cyan-400" />
                    </div>
                  )}
                  <div className={`relative px-4 py-3 rounded-2xl text-[13px] leading-relaxed shadow-sm ${
                    msg.role === 'user' 
                      ? 'bg-gradient-to-br from-cyan-500 to-blue-600 text-white font-medium rounded-tr-none' 
                      : 'bg-white/5 text-gray-100 border border-white/10 rounded-tl-none backdrop-blur-md'
                  }`}>
                    {msg.text.split('**').map((part, index) => 
                      index % 2 === 1 ? <strong key={index} className="text-cyan-400 font-bold">{part}</strong> : part
                    )}
                  </div>
                </div>
              </div>
            ))}
            
            {isTyping && (
              <div className="flex justify-start animate-pulse">
                <div className="flex space-x-3">
                  <div className="w-8 h-8 rounded-full bg-white/5 border border-white/10 flex items-center justify-center shrink-0">
                    <Bot className="w-4 h-4 text-cyan-400" />
                  </div>
                  <div className="px-4 py-3 bg-white/5 border border-white/10 rounded-2xl rounded-tl-none flex items-center space-x-1.5">
                    <div className="w-1.5 h-1.5 bg-cyan-400/60 rounded-full animate-bounce"></div>
                    <div className="w-1.5 h-1.5 bg-cyan-400/60 rounded-full animate-bounce [animation-delay:0.2s]"></div>
                    <div className="w-1.5 h-1.5 bg-cyan-400/60 rounded-full animate-bounce [animation-delay:0.4s]"></div>
                  </div>
                </div>
              </div>
            )}
          </div>

          {/* Input Area */}
          <div className="p-5 bg-black/40 border-t border-white/10 backdrop-blur-xl">
            <form onSubmit={handleSend} className="relative flex items-center gap-2 group">
              <div className="flex-1 relative">
                <input
                  type="text"
                  value={input}
                  onChange={(e) => setInput(e.target.value)}
                  placeholder="Describe tu proyecto o consulta..."
                  className="w-full bg-white/5 border border-white/10 rounded-2xl px-5 py-4 text-sm text-white placeholder:text-gray-600 focus:outline-none focus:border-cyan-500/50 focus:ring-1 focus:ring-cyan-500/20 transition-all"
                />
              </div>
              <button 
                type="submit" 
                disabled={isTyping || !input.trim()}
                className="p-4 bg-cyan-400 text-black rounded-2xl hover:bg-cyan-300 hover:shadow-[0_0_20px_rgba(34,211,238,0.3)] transition-all disabled:opacity-40 disabled:cursor-not-allowed transform active:scale-95 flex-shrink-0"
              >
                <Send className="w-5 h-5" />
              </button>
            </form>
            <p className="mt-3 text-[10px] text-center text-gray-500 font-medium">Demo · Las respuestas son generadas por IA</p>
          </div>
        </div>
      )}

      {/* Floating Toggle Button */}
      <div className="relative">
        {!isOpen && (
          <>
            <div className="absolute inset-0 bg-cyan-400 rounded-full blur-xl opacity-20 animate-pulse"></div>
            <div className="absolute inset-0 scale-150 bg-cyan-400/10 rounded-full animate-ping [animation-duration:3s]"></div>
          </>
        )}
        <button
          onClick={() => setIsOpen(!isOpen)}
          aria-label="Toggle Chat"
          className={`relative w-16 h-16 rounded-full flex items-center justify-center shadow-[0_10px_40px_rgba(0,0,0,0.5)] transition-all duration-500 transform hover:scale-110 active:scale-95 group ${
            isOpen 
              ? 'bg-gray-800 text-white border border-white/20' 
              : 'bg-gradient-to-tr from-cyan-400 to-blue-500 text-black'
          }`}
        >
          {isOpen ? (
            <X className="w-7 h-7" />
          ) : (
            <div className="relative">
              <MessageSquare className="w-7 h-7 group-hover:rotate-6 transition-transform" />
              <span className="absolute -top-1 -right-1 w-3.5 h-3.5 bg-red-500 border-2 border-white rounded-full flex items-center justify-center">
                <span className="block w-1 h-1 bg-white rounded-full animate-pulse"></span>
              </span>
            </div>
          )}
        </button>
      </div>
    </div>
  );
};

export default FloatingChatWidget;