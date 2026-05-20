import { useState, useRef, useEffect } from "react";
import { motion, AnimatePresence } from "motion/react";
import { Send, Sparkles, MessageSquare, Flame, Trash2, ArrowRight } from "lucide-react";
import { Message } from "../types";

export default function TaqueroAI() {
  const [messages, setMessages] = useState<Message[]>([
    {
      id: "welcome",
      role: "assistant",
      content: "¡Qué onda güerito! ¡Pásele a lo barrido! Soy Don Charly, tu taquero de confianza aquí en Mahuixtlán. ¿De qué le vamos a dar hoy? Tenemos unos ricos tacos de pastor doraditos o unas tortas de carnitas con harto queso que están para chuparse los dedos. ¡Dime qué se te antoja y te armo la cuenta!"
    }
  ]);
  const [inputValue, setInputValue] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const chatEndRef = useRef<HTMLDivElement>(null);

  // Auto-scroll on new messages
  useEffect(() => {
    chatEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  const handleSendMessage = async (textToSend?: string) => {
    const text = textToSend || inputValue.trim();
    if (!text || isLoading) return;

    if (!textToSend) {
      setInputValue("");
    }

    const userMessage: Message = {
      id: `user-${Date.now()}`,
      role: "user",
      content: text
    };

    const updatedMessages = [...messages, userMessage];
    setMessages(updatedMessages);
    setIsLoading(true);

    try {
      const response = await fetch("/api/chat", {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify({
          messages: updatedMessages.map(m => ({
            role: m.role,
            content: m.content
          }))
        })
      });

      if (!response.ok) {
        throw new Error("Error en la respuesta de Don Charly");
      }

      const data = await response.json();
      
      setMessages((prev) => [
        ...prev,
        {
          id: `ai-${Date.now()}`,
          role: "assistant",
          content: data.reply || "¡Híjole marchante! Se me andaban quemando las tortillas y no alcancé a contestarte bien. ¿Me repites la pregunta?"
        }
      ]);
    } catch (error) {
      console.error("Error communicating with AI taquero:", error);
      setMessages((prev) => [
        ...prev,
        {
          id: `error-${Date.now()}`,
          role: "assistant",
          content: "¡Oye marchante, fíjate que la terminal de cobro y el internet andan fallando un poco! Pero tú dime, ¿qué más te andabas saboreando?"
        }
      ]);
    } finally {
      setIsLoading(false);
    }
  };

  const handleClearHistory = () => {
    setMessages([
      {
        id: "welcome",
        role: "assistant",
        content: "¡Sale y vale! Mesa limpia y comal listo. ¿De qué le vamos a preparar su orden, jefe?"
      }
    ]);
  };

  // Quick prompt suggestions
  const SUGGESTIONS = [
    "Sugiéreme una orden de tacos",
    "¿Qué precio tienen las tortas?",
    "¿Llegan a mi domicilio en Coatepec?",
    "Quiero 3 tacos de chuleta y 2 tortas de pastor, ¿cuánto es?"
  ];

  return (
    <section id="chat-taquero" className="py-24 bg-brand-dark relative border-t border-white/5">
      {/* Decorative details */}
      <div className="absolute top-1/2 left-10 w-72 h-72 bg-brand-yellow/5 rounded-full blur-3xl -translate-y-1/2 pointer-events-none" />
      <div className="absolute top-1/3 right-10 w-64 h-64 bg-brand-red/5 rounded-full blur-3xl -translate-y-1/2 pointer-events-none" />

      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        {/* Section Header */}
        <div className="text-center max-w-2xl mx-auto mb-12 space-y-4">
          <div className="inline-flex items-center gap-1.5 bg-brand-yellow/10 border border-brand-yellow/20 px-4 py-1.5 rounded-full text-brand-yellow font-mono text-xs font-semibold uppercase tracking-wider">
            <Sparkles className="w-3.5 h-3.5 text-brand-yellow animate-pulse" />
            <span>Asistente por Inteligencia Artificial</span>
          </div>
          <h2 className="font-serif italic font-extrabold text-4xl text-white tracking-tight">
            Pregúntale a <span className="text-brand-red font-serif italic">Don Charly</span>
          </h2>
          <p className="font-sans text-gray-400 text-xs sm:text-sm leading-relaxed">
            ¿Tienes dudas del menú, la cobertura de entrega, o quieres que calculemos el costo total de tu antojo? Conversa de inmediato con nuestro sabio taquero virtual impulsado por Google Gemini.
          </p>
        </div>

        {/* Chat Interface Container */}
        <div className="bg-brand-slate border border-white/10 rounded-3xl overflow-hidden shadow-2xl flex flex-col h-[550px]" id="taquero-chat-panel">
          
          {/* Panel Top Heading Title */}
          <div className="bg-brand-dark/60 border-b border-white/5 p-4 sm:p-5 flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="relative">
                <div className="bg-gradient-to-tr from-brand-red to-brand-yellow w-10 h-10 rounded-xl flex items-center justify-center font-bold text-white text-base shadow-md">
                  👨‍🍳
                </div>
                <div className="absolute -bottom-0.5 -right-0.5 w-3 h-3 bg-emerald-500 rounded-full border-2 border-brand-slate animate-pulse" />
              </div>
              <div>
                <h3 className="font-serif italic font-bold text-base text-white flex items-center gap-1.5">
                  Don Charly <span className="text-[10px] bg-brand-red/20 text-brand-red px-2 py-0.5 rounded-full uppercase font-mono font-medium tracking-wide">Taquero AI</span>
                </h3>
                <p className="font-sans text-[10px] text-gray-400">Atendiendo de volada | En línea</p>
              </div>
            </div>

            <button
              onClick={handleClearHistory}
              title="Limpiar platica"
              className="bg-brand-slate hover:bg-white/5 border border-white/5 text-gray-400 hover:text-white p-2/5 sm:px-3 sm:py-2 rounded-xl text-xs flex items-center gap-1.5 cursor-pointer transition-colors"
            >
              <Trash2 className="w-3.5 h-3.5" />
              <span className="hidden sm:inline">Limpiar chat</span>
            </button>
          </div>

          {/* Messages Display Area */}
          <div className="flex-grow p-4 sm:p-6 overflow-y-auto space-y-4 font-sans text-sm scroll-smooth">
            {messages.map((msg) => (
              <div
                key={msg.id}
                className={`flex gap-3 max-w-[85%] ${msg.role === "user" ? "ml-auto flex-row-reverse" : "mr-auto"}`}
              >
                {/* Avatar Icon */}
                <div className={`w-8 h-8 rounded-lg flex items-center justify-center shrink-0 shadow-sm ${
                   msg.role === "user" ? "bg-brand-red text-white font-bold text-xs" : "bg-brand-dark border border-white/5 text-base"
                }`}>
                  {msg.role === "user" ? "Tú" : "👨‍🍳"}
                </div>

                {/* Bubble message body */}
                <div className={`rounded-2xl px-4 py-3 text-left leading-relaxed ${
                  msg.role === "user"
                    ? "bg-brand-red text-white font-medium border border-brand-red/15 shadow-md"
                    : "bg-brand-dark/50 border border-white/5 text-gray-100"
                }`}>
                  <p className="whitespace-pre-line text-xs sm:text-sm">{msg.content}</p>
                </div>
              </div>
            ))}

            {isLoading && (
              <div className="flex gap-3 mr-auto max-w-[80%] animate-pulse">
                <div className="w-8 h-8 rounded-lg bg-brand-dark border border-white/5 flex items-center justify-center shrink-0">
                  👨‍🍳
                </div>
                <div className="bg-brand-dark/30 border border-white/5 rounded-2xl px-5 py-3 flex items-center gap-2">
                  <div className="w-1.5 h-1.5 bg-brand-yellow rounded-full animate-bounce" />
                  <div className="w-1.5 h-1.5 bg-brand-yellow rounded-full animate-bounce [animation-delay:0.2s]" />
                  <div className="w-1.5 h-1.5 bg-brand-yellow rounded-full animate-bounce [animation-delay:0.4s]" />
                </div>
              </div>
            )}
            <div ref={chatEndRef} />
          </div>

          {/* Suggested prompts buttons */}
          <div className="px-4 py-2 border-t border-white/[0.04] bg-brand-dark/10 overflow-x-auto whitespace-nowrap flex gap-2 no-scrollbar">
            {SUGGESTIONS.map((sug, idx) => (
              <button
                key={idx}
                disabled={isLoading}
                onClick={() => handleSendMessage(sug)}
                className="bg-brand-dark/60 hover:bg-brand-dark border border-white/5 text-gray-400 hover:text-white text-[11px] font-sans px-3.5 py-2 rounded-xl cursor-pointer transition-colors max-w-xs truncate"
              >
                {sug}
              </button>
            ))}
          </div>

          {/* Form write fields */}
          <div className="p-4 border-t border-white/5 bg-brand-dark/20 flex items-center gap-2.5">
            <input
              type="text"
              value={inputValue}
              onChange={(e) => setInputValue(e.target.value)}
              onKeyDown={(e) => e.key === "Enter" && handleSendMessage()}
              disabled={isLoading}
              placeholder="Pregúntale a Don Charly..."
              className="flex-grow bg-brand-dark/80 border border-white/5 focus:border-brand-yellow/50 rounded-xl px-4 py-3.5 font-sans text-xs sm:text-sm text-white outline-none transition-all placeholder:text-gray-500"
            />

            <button
              onClick={() => handleSendMessage()}
              disabled={isLoading || !inputValue.trim()}
              className="bg-brand-yellow hover:bg-amber-400 text-brand-dark p-3.5 rounded-xl flex items-center justify-center transition-all cursor-pointer transform active:scale-95 disabled:opacity-40 disabled:cursor-not-allowed shadow-md shadow-brand-yellow/10"
              id="taquero-chat-submit-btn"
            >
              <Send className="w-4 h-4 text-brand-dark stroke-[3px]" />
            </button>
          </div>

        </div>

      </div>
    </section>
  );
}
