import { MapPin, Clock, PhoneCall, Check, ExternalLink } from "lucide-react";

export default function LocationAndDelivery() {
  const DELIVERY_COMMUNITIES = [
    { name: "Coatepec", time: "25-30 min" },
    { name: "El Grande", time: "15-20 min" },
    { name: "La Isleta", time: "20-25 min" },
    { name: "Alborada", time: "25-30 min" },
    { name: "Tuzamapan", time: "30-35 min" },
    { name: "Casa Geo", time: "35-40 min" }
  ];

  return (
    <section className="py-24 bg-brand-slate text-left relative overflow-hidden" id="ubicacion">
      {/* Background radial glow overlay */}
      <div className="absolute inset-0 opacity-15 pointer-events-none" style={{ backgroundImage: "radial-gradient(circle at 80% 20%, #ff6321 0%, transparent 40%)" }}></div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-stretch">
          
          {/* Left Column: Delivery zones information */}
          <div className="lg:col-span-6 flex flex-col justify-between space-y-8" id="entregas">
            <div className="space-y-3">
              <div className="inline-flex items-center gap-1.5 bg-brand-red/10 border border-brand-red/25 px-4 py-1.5 rounded-full text-brand-red font-mono text-xs font-semibold uppercase tracking-wider">
                <span>📍 Cobertura y Servicio</span>
              </div>
              <h2 className="font-serif italic font-extrabold text-3xl sm:text-4xl text-white tracking-tight">
                SERVICIO A DOMICILIO
              </h2>
              <p className="font-sans text-xs sm:text-sm text-gray-400 leading-relaxed">
                ¿Ganas de tacos en casa o la oficina? Preparamos y empaquetamos tu pedido en recipientes térmicos protectores para garantizar que tus tacos y tortas lleguen calientitos, frescos y listos para disfrutar en toda la región.
              </p>
            </div>

            {/* Immersive high-character block for delivery zones */}
            <div className="bg-brand-red text-brand-dark rounded-3xl p-6 sm:p-8 shadow-[0_20px_50px_rgba(255,99,33,0.3)] space-y-4 flex-1 flex flex-col justify-between">
              <div>
                <h3 className="text-xs font-bold uppercase tracking-widest mb-4 border-b border-black/20 pb-2 font-mono">
                  Zonas de Entrega Activas (Envío: $15 MXN)
                </h3>

                <div className="flex flex-wrap gap-2.5">
                  {DELIVERY_COMMUNITIES.map((zone, idx) => (
                    <div
                      key={idx}
                      className="px-3.5 py-2 bg-brand-dark/10 rounded-full text-xs font-bold font-sans border border-brand-dark/10 flex items-center gap-1.5 hover:bg-brand-dark/20 transition-all"
                    >
                      <span className="w-1.5 h-1.5 rounded-full bg-brand-dark animate-pulse"></span>
                      <span>{zone.name}</span>
                      <span className="opacity-60 font-mono text-[9px]">({zone.time})</span>
                    </div>
                  ))}
                </div>
              </div>

              <div className="pt-4 border-t border-black/10">
                <p className="text-xs italic font-serif font-medium text-brand-dark/95">
                  ⚠️ Las entregas están sujetas a condiciones climatológicas y tráfico. ¡Haz tu pedido con anticipación!
                </p>
              </div>
            </div>
          </div>

          {/* Right Column: Address and Google Maps direction details */}
          <div className="lg:col-span-6 flex flex-col justify-between space-y-8">
            <div className="space-y-3">
              <div className="inline-flex items-center gap-1.5 bg-brand-yellow/10 border border-brand-yellow/25 px-4 py-1.5 rounded-full text-brand-yellow font-mono text-xs font-semibold uppercase tracking-wider">
                <span>🏠 Nuestra Casa</span>
              </div>
              <h2 className="font-serif italic font-extrabold text-3xl sm:text-4xl text-white tracking-tight">
                VISÍTANOS EN SUCURSAL
              </h2>
              <p className="font-sans text-xs sm:text-sm text-gray-400 leading-relaxed">
                ¡El aroma del trompo recién cortado te guiará! Te esperamos con los brazos abiertos en Colonia San Gabriel, Mahuixtlán.
              </p>
            </div>

            <div className="p-6 bg-brand-dark border border-white/10 rounded-3xl space-y-6 shadow-xl flex-1 flex flex-col justify-between">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                {/* Physical Address key list */}
                <div className="flex items-start gap-2.5 text-left bg-white/[0.02] border border-white/5 p-3.5 rounded-2xl">
                  <div className="p-2 bg-brand-red/10 rounded-xl mt-0.5 shrink-0">
                    <MapPin className="w-4 h-4 text-brand-red" />
                  </div>
                  <div>
                    <h4 className="font-sans font-bold text-white text-xs">Dirección Física</h4>
                    <p className="font-sans text-[11px] text-gray-300 mt-1">Colonia San Gabriel #22,</p>
                    <p className="font-sans text-[11px] text-gray-300 font-semibold">Mahuixtlán, Veracruz.</p>
                  </div>
                </div>

                {/* Opening hours */}
                <div className="flex items-start gap-2.5 text-left bg-white/[0.02] border border-white/5 p-3.5 rounded-2xl">
                  <div className="p-2 bg-brand-yellow/10 rounded-xl mt-0.5 shrink-0">
                    <Clock className="w-4 h-4 text-brand-yellow" />
                  </div>
                  <div>
                    <h4 className="font-sans font-bold text-white text-xs">Horario de Servicio</h4>
                    <p className="font-sans text-[11px] text-gray-300 mt-1">Lunes a Domingo</p>
                    <p className="font-sans text-[11px] text-gray-300 font-semibold font-mono">8:00 AM a 6:00 PM</p>
                  </div>
                </div>
              </div>

              {/* Graphical Google Maps Link buttons callout */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 items-center bg-brand-slate hover:bg-brand-slate/80 border border-white/5 rounded-2xl p-4 transition-all">
                {/* Simulated Cartography view from design spec */}
                <div className="h-32 rounded-xl bg-zinc-950 border border-white/5 relative overflow-hidden shrink-0">
                  <div className="absolute inset-0 opacity-40 mix-blend-overlay" style={{ background: "linear-gradient(45deg, #111, #333)" }}></div>
                  <div className="absolute inset-0 flex items-center justify-center">
                    <div className="w-6 h-6 bg-brand-red rounded-full animate-pulse flex items-center justify-center">
                      <div className="w-1.5 h-1.5 bg-white rounded-full"></div>
                    </div>
                  </div>
                  <div className="absolute bottom-2 left-2 text-[8px] uppercase tracking-tighter text-white/30 italic">GPS: San Gabriel #22</div>
                </div>

                <div className="space-y-3 text-left md:pl-2">
                  <h4 className="font-serif italic font-bold text-white text-sm">Enlace Directo de Google Maps</h4>
                  <p className="font-sans text-[10px] text-gray-400 leading-relaxed">
                    Utiliza tu GPS favorito presionando el botón para guiarte en ruta directa hacia nuestra cocina.
                  </p>

                  <a
                    href="https://maps.app.goo.gl/HAJn634fSafnhiFb7?g_st=ic"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-1.5 bg-brand-yellow hover:bg-amber-400 text-brand-dark px-4 py-2.5 rounded-xl font-sans font-bold text-[10px] uppercase tracking-wide transition-all shadow-md shadow-brand-yellow/15 active:scale-98"
                  >
                    <span>Abrir GPS</span>
                    <ExternalLink className="w-3 h-3 stroke-[2.5]" />
                  </a>
                </div>
              </div>
            </div>
          </div>

        </div>

      </div>
    </section>
  );
}
