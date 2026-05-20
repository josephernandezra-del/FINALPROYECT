import { motion } from "motion/react";
import { ArrowRight, Flame, Clock, MapPin, Sparkles } from "lucide-react";

import heroImageFile from "../assets/images/mastacos_hero_banner_1779291002849.png";

interface HeroProps {
  onScrollToSection: (id: string) => void;
}

export default function Hero({ onScrollToSection }: HeroProps) {
  // Use our real generated high quality taco picture
  const heroImage = heroImageFile;

  return (
    <section id="inicio" className="relative min-h-screen pt-20 flex items-center justify-center overflow-hidden bg-brand-dark">
      {/* Background Image with Deep Gradients */}
      <div className="absolute inset-0 z-0">
        <img
          src={heroImage}
          alt="Mástacos deliciosos tacos al pastor y carnitas en Mahuixtlán"
          className="w-full h-full object-cover scale-105 animate-pulse-slow filter brightness-40 contrast-105"
          referrerPolicy="no-referrer"
          id="hero-bg-image"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-brand-dark via-brand-dark/75 to-brand-dark/50" />
        <div className="absolute inset-0 bg-gradient-to-r from-brand-dark/95 via-brand-dark/40 to-transparent" />
        {/* Dynamic radial glow overlay from design template */}
        <div className="absolute inset-0 opacity-25 pointer-events-none" style={{ backgroundImage: "radial-gradient(circle at 20% 30%, #ff6321 0%, transparent 45%), radial-gradient(circle at 80% 70%, #ffc107 0%, transparent 45%)" }}></div>
      </div>

      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full py-24 md:py-32 grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
        
        {/* Left Column: Text Content */}
        <div className="lg:col-span-7 space-y-8 text-left">
          
          {/* Badge */}
          <motion.div
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="inline-flex items-center gap-1.5 bg-brand-red/10 border border-brand-red/25 px-4 py-1.5 rounded-full text-brand-red font-mono text-xs font-semibold uppercase tracking-wider"
          >
            <Sparkles className="w-3.5 h-3.5 animate-spin-slow" />
            <span>Mahuixtlán, Veracruz • Auténtico Sabor Casero</span>
          </motion.div>

          {/* Heading */}
          <div className="space-y-4">
            <motion.h2
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.15 }}
              className="font-serif italic font-extrabold text-5xl sm:text-6xl md:text-7xl lg:text-8xl text-white tracking-tight leading-none"
            >
              Los Pollos <br />
              <span className="text-brand-red text-transparent bg-clip-text bg-gradient-to-r from-brand-red to-amber-500 drop-shadow-[0_0_20px_rgba(255,99,33,0.35)] font-serif italic">Chilangos</span>
            </motion.h2>
            
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.3 }}
              className="font-sans text-gray-300 text-sm sm:text-base md:text-lg max-w-xl leading-relaxed"
            >
              Disfruta del sabor inconfundible de nuestros exquisitos tacos de <span className="text-white font-semibold">Carnitas, Pastor, Bistec, Longaniza y Chuleta</span> por solo <span className="text-brand-yellow font-bold text-lg">$16 c/u</span>. O prueba nuestras increíbles Tortas por <span className="text-brand-yellow font-bold text-lg">$35 c/u</span>. ¡Hechas al momento!
            </motion.p>
          </div>

          {/* Key Quick Info Grid */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.45 }}
            className="grid grid-cols-1 sm:grid-cols-2 gap-4 max-w-lg bg-white/[0.04] backdrop-blur-md border border-white/10 rounded-2xl p-4"
          >
            <div className="flex items-center gap-3">
              <div className="p-2.5 bg-brand-yellow/10 rounded-xl border border-brand-yellow/20">
                <Clock className="w-5 h-5 text-brand-yellow" />
              </div>
              <div>
                <h4 className="font-sans font-bold text-white text-xs">Nuestro Horario</h4>
                <p className="font-sans text-gray-300 text-xs mt-0.5 font-mono font-semibold">8 AM — 6 PM (Todos los días)</p>
              </div>
            </div>

            <div className="flex items-center gap-3">
              <div className="p-2.5 bg-brand-red/10 rounded-xl border border-brand-red/20">
                <MapPin className="w-5 h-5 text-brand-red" />
              </div>
              <div>
                <h4 className="font-sans font-bold text-white text-xs">Dirección</h4>
                <p className="font-sans text-gray-300 text-xs mt-0.5">Colonia San Gabriel #22</p>
              </div>
            </div>
          </motion.div>

          {/* CTA Buttons */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.6 }}
            className="flex flex-col sm:flex-row gap-4 pt-2"
          >
            <button
              onClick={() => onScrollToSection("menu")}
              className="group bg-brand-red hover:bg-brand-red-dark text-white font-sans font-bold text-sm tracking-wide rounded-xl px-8 py-4 flex items-center justify-center gap-2 transition-all duration-300 active:scale-95 cursor-pointer shadow-lg shadow-brand-red/25"
            >
              <span>EXPLORAR EL MENÚ</span>
              <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
            </button>

            <button
              onClick={() => onScrollToSection("chat-taquero")}
              className="bg-brand-slate hover:bg-white/10 text-[#f5f5f0] border border-white/10 font-sans font-semibold text-sm tracking-wide rounded-xl px-8 py-4 flex items-center justify-center gap-2 transition-all duration-300 cursor-pointer"
            >
              <Flame className="w-4 h-4 text-brand-red animate-pulse" />
              <span>ORDENAR CON EL TAQUERO AI</span>
            </button>
          </motion.div>

        </div>

        {/* Right Column: Visual Accent Cards / Promos */}
        <div className="lg:col-span-5 hidden lg:block relative">
          <motion.div
            initial={{ opacity: 0, scale: 0.9, rotate: 2 }}
            animate={{ opacity: 1, scale: 1, rotate: 0 }}
            transition={{ duration: 0.8, delay: 0.4 }}
            className="relative bg-brand-slate/85 backdrop-blur-xl border border-white/10 rounded-3xl p-6 shadow-2xl max-w-sm ml-auto space-y-6"
          >
            <div className="absolute -top-3 -right-3 bg-brand-red text-white text-[10px] font-mono font-bold uppercase tracking-wider px-3 py-1 rounded-full border border-white/10 rotate-6 shadow-lg">
              ¡Súper Promo!
            </div>

            <div className="space-y-2">
              <h3 className="font-display font-bold text-xl text-white">¿Rumbo al trabajo o antojo en casa?</h3>
              <p className="font-sans text-xs text-gray-400 leading-relaxed">
                Nuestros guisados se preparan todas las mañanas con carne selecta, tortillas calientitas del comal y salsas auténticas martajadas. ¡Pregúntale a Don Charly en el chat por la carne del día!
              </p>
            </div>

            <div className="border-t border-white/5 pt-4 flex items-center justify-between">
              <div>
                <p className="font-mono text-[9px] text-gray-400 uppercase tracking-widest">Taco individual</p>
                <p className="font-display font-extrabold text-2xl text-brand-yellow">$16<span className="text-xs font-normal text-gray-300 ml-1">MXN</span></p>
              </div>

              <div className="text-right">
                <p className="font-mono text-[9px] text-gray-400 uppercase tracking-widest">Torta Gigante</p>
                <p className="font-display font-extrabold text-2xl text-brand-yellow">$35<span className="text-xs font-normal text-gray-300 ml-1">MXN</span></p>
              </div>
            </div>

            <div className="bg-brand-dark/50 rounded-xl p-3 flex items-center gap-2 border border-white/5">
              <div className="w-2.5 h-2.5 rounded-full bg-emerald-500 animate-ping" />
              <p className="font-sans text-[11px] text-gray-300">
                Servicio a domicilio activo: <span className="font-semibold text-white">Coatepec, El Grande, y más</span>
              </p>
            </div>
          </motion.div>
        </div>

      </div>
    </section>
  );
}
