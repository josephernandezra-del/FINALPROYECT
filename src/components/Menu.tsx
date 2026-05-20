import { useState } from "react";
import { motion, AnimatePresence } from "motion/react";
import { Plus, Check, Info, Settings, Flame } from "lucide-react";
import { CartItem } from "../types";

interface MenuProps {
  onAddToCart: (item: CartItem) => void;
}

export default function Menu({ onAddToCart }: MenuProps) {
  // Meats list as per user details
  const MEAT_TYPES = [
    { key: "pastor", label: "Al Pastor", desc: "Adobo secreto, cortado del trompo tradicional con piña doradita.", icon: "🍍" },
    { key: "carnitas", label: "Carnitas", desc: "Cerdo tierno confitado en manteca a la manera tradicional de Michoacán.", icon: "🐖" },
    { key: "bistec", label: "Bistec", desc: "Bistec de res premium sazonado e higiénicamente asado a la plancha.", icon: "🥩" },
    { key: "longaniza", label: "Longaniza", desc: "Longaniza premium con un toque picante y especias mexicanas.", icon: "🌶️" },
    { key: "chuleta", label: "Chuleta de Puerco", desc: "Corte de chuleta jugosa tierneada y asada con maestría.", icon: "🍖" }
  ];

  const PRODUCT_CATEGORIES = [
    {
      id: "tacos",
      title: "Nuestros Tacos",
      subtitle: "Servidos en tortillas de maíz calientes, dobles, con opción de verdura fresca y piña.",
      price: 16,
      badge: "El Rey de la Taquería",
      image: "/src/assets/images/regenerated_image_1779293327747.jpg" // using our updated taco image
    },
    {
      id: "tortas",
      title: "Nuestras Tortas",
      subtitle: "Pan telera crujiente con mayonesa, lechuga, tomate fresco, rebanadas de aguacate y queso manchego derretido.",
      price: 35,
      badge: "Sabor Monumental",
      image: "/src/assets/images/regenerated_image_1779291589586.jpg" // using our updated torta image
    }
  ];

  // State handles customization modal/selector
  const [selectedProduct, setSelectedProduct] = useState<{
    type: "taco" | "torta";
    price: number;
  } | null>(null);

  const [customizeItem, setCustomizeItem] = useState<{
    meat: string;
    quantity: number;
    onion: boolean;
    cilantro: boolean;
    pineapple: boolean;
    salsa: "verde" | "roja" | "ninguna" | "ambas";
    notes: string;
  }>({
    meat: "pastor",
    quantity: 1,
    onion: true,
    cilantro: true,
    pineapple: true,
    salsa: "ambas",
    notes: ""
  });

  const [notification, setNotification] = useState<string | null>(null);

  const handleOpenCustomization = (type: "taco" | "torta", price: number) => {
    setSelectedProduct({ type, price });
    setCustomizeItem({
      meat: "pastor",
      quantity: 1,
      onion: true,
      cilantro: true,
      pineapple: type === "taco" || type === "torta", // default true
      salsa: "ambas",
      notes: ""
    });
  };

  const handleAddToCart = () => {
    if (!selectedProduct) return;

    const meatLabel = MEAT_TYPES.find(m => m.key === customizeItem.meat)?.label || "Pastor";
    const itemLabel = selectedProduct.type === "taco" ? "Taco" : "Torta";
    
    const newItem: CartItem = {
      id: `${selectedProduct.type}-${customizeItem.meat}-${Date.now()}`,
      name: `${itemLabel} de ${meatLabel}`,
      type: selectedProduct.type,
      meat: customizeItem.meat,
      price: selectedProduct.price,
      quantity: customizeItem.quantity,
      onion: customizeItem.onion,
      cilantro: customizeItem.cilantro,
      pineapple: customizeItem.meat === "pastor" ? customizeItem.pineapple : false,
      salsa: customizeItem.salsa,
      notes: customizeItem.notes.trim() || undefined
    };

    onAddToCart(newItem);

    // Show quick nice feedback
    setNotification(`¡Agregado al pedido: ${customizeItem.quantity}x ${itemLabel} de ${meatLabel}!`);
    setTimeout(() => setNotification(null), 3000);

    // Close
    setSelectedProduct(null);
  };

  return (
    <section id="menu" className="py-24 bg-brand-dark/95 border-t border-white/5 relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Header Title with Dual Price Column from Design Spec */}
        <div className="flex flex-col md:flex-row justify-between items-start md:items-end mb-16 gap-8 border-b border-white/5 pb-8 max-w-5xl mx-auto">
          <div className="space-y-3 text-left">
            <div className="inline-flex items-center gap-1.5 bg-brand-red/10 border border-brand-red/25 px-4 py-1.5 rounded-full text-brand-red font-mono text-xs font-semibold uppercase tracking-wider">
              <Flame className="w-3.5 h-3.5" />
              <span>Sabor Hecho con Corazón</span>
            </div>
            <h2 className="font-serif italic text-5xl sm:text-6xl text-white leading-tight">
              Nuestro <span className="text-brand-red font-serif italic">Menú</span>
            </h2>
            <p className="font-sans text-gray-400 text-xs sm:text-sm max-w-xl leading-relaxed">
              Nuestros clásicos tacos de plancha y trompo, así como tortas con ingredientes premium de primera calidad. Selecciona abajo para personalizar tu preparación libremente.
            </p>
          </div>

          <div className="flex gap-6 bg-white/[0.03] border border-white/5 p-4 rounded-2xl shrink-0">
            <div className="text-center min-w-[70px]">
              <p className="text-[10px] uppercase tracking-widest text-white/40 mb-1 font-mono">Tacos</p>
              <p className="text-3xl font-black font-mono text-brand-yellow">$16</p>
            </div>
            <div className="w-px h-12 bg-white/25 self-center"></div>
            <div className="text-center min-w-[70px]">
              <p className="text-[10px] uppercase tracking-widest text-white/40 mb-1 font-mono">Tortas</p>
              <p className="text-3xl font-black font-mono text-brand-yellow">$35</p>
            </div>
          </div>
        </div>

        {/* Global Floating Notification */}
        <AnimatePresence>
          {notification && (
            <motion.div
              initial={{ opacity: 0, y: 50, scale: 0.95 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, scale: 0.95 }}
              className="fixed bottom-6 left-1/2 transform -translate-x-1/2 z-50 bg-emerald-500 text-white font-sans text-sm font-bold px-6 py-3.5 rounded-2xl shadow-2xl flex items-center gap-2 border border-emerald-400"
            >
              <Check className="w-5 h-5 bg-white/20 p-0.5 rounded-full" />
              <span>{notification}</span>
            </motion.div>
          )}
        </AnimatePresence>

        {/* Categories Grid (Tacos vs Tortas) */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-start mb-16">
          {PRODUCT_CATEGORIES.map((cat) => (
            <div
              key={cat.id}
              className="bg-brand-slate border border-white/10 rounded-3xl overflow-hidden shadow-2xl hover:border-brand-yellow/30 transition-all duration-300 flex flex-col h-full group"
            >
              {/* Category Image Cover */}
              <div className="h-56 w-full relative overflow-hidden">
                <img
                  src={cat.image}
                  alt={cat.title}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
                  referrerPolicy="no-referrer"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-brand-slate via-brand-slate/30 to-transparent" />
                <div className="absolute top-4 left-4 bg-brand-yellow text-brand-dark text-[10px] font-mono font-bold uppercase tracking-wider px-3 py-1 rounded-full border border-white/10 shadow-lg">
                  {cat.badge}
                </div>
                <div className="absolute bottom-4 right-4 bg-brand-dark/80 backdrop-blur-md px-4 py-1.5 rounded-xl border border-white/10">
                  <p className="font-display font-black text-brand-yellow text-xl sm:text-2xl">
                    ${cat.price} <span className="text-xs font-normal text-gray-300">c/u</span>
                  </p>
                </div>
              </div>

              {/* Category info */}
              <div className="p-6 sm:p-8 flex flex-col justify-between flex-grow space-y-6">
                <div className="space-y-3">
                  <h3 className="font-serif italic font-extrabold text-3xl text-white group-hover:text-brand-red transition-colors">{cat.title}</h3>
                  <p className="font-sans text-sm text-gray-300 leading-relaxed min-h-[48px]">{cat.subtitle}</p>
                </div>

                {/* Micro-Menu with direct customizing option */}
                <div className="bg-brand-dark/40 rounded-2xl p-4 border border-white/5 space-y-4">
                  <h4 className="font-mono text-xs text-brand-yellow uppercase tracking-widest font-bold flex items-center gap-1.5">
                    <Settings className="w-4 h-4 animate-spin-slow" />
                    <span>Rellenos a elegir:</span>
                  </h4>
                  <div className="flex flex-wrap gap-2">
                    {MEAT_TYPES.map(m => (
                      <span key={m.key} className="bg-brand-slate border border-white/5 text-gray-300 text-xs py-1.5 px-3 rounded-lg flex items-center gap-1">
                        <span>{m.icon}</span>
                        <span className="font-sans text-[11px] font-medium">{m.label}</span>
                      </span>
                    ))}
                  </div>
                </div>

                <button
                  onClick={() => handleOpenCustomization(cat.id as "taco" | "torta", cat.price)}
                  className="w-full bg-brand-red hover:bg-[#ff4e00] text-white font-sans font-bold text-sm tracking-wide rounded-2xl py-4 flex items-center justify-center gap-2 transform active:scale-98 transition-all cursor-pointer shadow-lg shadow-brand-red/10"
                >
                  <Plus className="w-5 h-5 stroke-[3px]" />
                  <span>ARMAR Y AGREGAR PEDIDO</span>
                </button>
              </div>
            </div>
          ))}
        </div>

        {/* Meat details section */}
        <div className="bg-brand-slate border border-white/5 rounded-3xl p-6 sm:p-8 space-y-8">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-white/5 pb-6">
            <div>
              <h3 className="font-serif italic font-extrabold text-2xl text-white">Nuestras Carnes y Preparación</h3>
              <p className="font-sans text-xs text-gray-300 mt-1 font-medium">Conoce cada una de nuestras opciones preparadas con técnicas tradicionales de la casa.</p>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {MEAT_TYPES.map((meat) => (
              <div
                key={meat.key}
                className="bg-brand-dark/30 hover:bg-brand-dark/60 rounded-2xl p-4 border border-white/[0.04] transition-all space-y-2 text-left"
              >
                <div className="flex items-center gap-2">
                  <span className="text-2xl">{meat.icon}</span>
                  <h4 className="font-serif italic text-lg font-bold text-white">{meat.label}</h4>
                </div>
                <p className="font-sans text-xs text-gray-400 leading-relaxed">{meat.desc}</p>
              </div>
            ))}
          </div>
        </div>

      </div>

      {/* Modal Customization dialog */}
      <AnimatePresence>
        {selectedProduct && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
            {/* Backdrop */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setSelectedProduct(null)}
              className="absolute inset-0 bg-brand-dark/80 backdrop-blur-md"
            />

            {/* Modal Body */}
            <motion.div
              initial={{ scale: 0.95, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.95, opacity: 0 }}
              className="relative w-full max-w-xl bg-brand-slate border border-white/10 rounded-3xl overflow-hidden shadow-2xl z-10 text-left"
            >
              {/* Graphic Title Header */}
              <div className="bg-gradient-to-r from-brand-yellow to-amber-500 p-6 flex justify-between items-center text-brand-dark">
                <div>
                  <h3 className="font-display font-extrabold text-2xl uppercase tracking-tight">
                    Personalizar {selectedProduct.type === "taco" ? "Taco" : "Torta"}
                  </h3>
                  <p className="font-sans text-xs font-semibold text-brand-dark/70 mt-0.5">Precio Unitario: ${selectedProduct.price} MXN</p>
                </div>
                <button
                  onClick={() => setSelectedProduct(null)}
                  className="bg-brand-dark/10 hover:bg-brand-dark/20 p-2 rounded-full cursor-pointer transition-colors"
                >
                  <span className="font-sans font-black text-sm">✖</span>
                </button>
              </div>

              {/* Customizer options details */}
              <div className="p-6 space-y-6 max-h-[70vh] overflow-y-auto">
                
                {/* 1. Choice of meat */}
                <div className="space-y-3">
                  <label className="font-sans font-bold text-sm text-white block">1. Escoge tu carne o guisado:</label>
                  <div className="grid grid-cols-2 xs:grid-cols-2 sm:grid-cols-3 gap-2">
                    {MEAT_TYPES.map((meat) => (
                      <button
                        key={meat.key}
                        onClick={() => setCustomizeItem({ ...customizeItem, meat: meat.key })}
                        className={`p-3 rounded-xl border text-left font-sans transition-all flex items-center gap-2 cursor-pointer ${
                          customizeItem.meat === meat.key
                            ? "bg-brand-yellow/15 border-brand-yellow text-white"
                            : "bg-brand-dark/40 border-white/5 text-gray-400 hover:border-white/20"
                        }`}
                      >
                        <span className="text-xl">{meat.icon}</span>
                        <span className="text-xs font-semibold">{meat.label}</span>
                      </button>
                    ))}
                  </div>
                </div>

                {/* 2. Custom toppings/verdura */}
                <div className="space-y-3 pt-2">
                  <label className="font-sans font-bold text-sm text-white block">2. Verdura y Complementos:</label>
                  <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                    
                    {/* Cilantro */}
                    <button
                      onClick={() => setCustomizeItem({ ...customizeItem, cilantro: !customizeItem.cilantro })}
                      className={`p-3 rounded-xl border transition-all text-left flex items-center justify-between cursor-pointer ${
                        customizeItem.cilantro 
                          ? "bg-brand-dark/60 border-brand-yellow text-white" 
                          : "bg-brand-dark/20 border-white/5 text-gray-500"
                      }`}
                    >
                      <span className="font-sans text-xs font-semibold">Cilantro</span>
                      <span className={`w-4 h-4 rounded-full flex items-center justify-center text-[8px] border ${
                        customizeItem.cilantro ? "bg-brand-yellow border-brand-yellow text-brand-dark" : "border-white/20"
                      }`}>
                        {customizeItem.cilantro && "✓"}
                      </span>
                    </button>

                    {/* Onion */}
                    <button
                      onClick={() => setCustomizeItem({ ...customizeItem, onion: !customizeItem.onion })}
                      className={`p-3 rounded-xl border transition-all text-left flex items-center justify-between cursor-pointer ${
                        customizeItem.onion 
                          ? "bg-brand-dark/60 border-brand-yellow text-white" 
                          : "bg-brand-dark/20 border-white/5 text-gray-500"
                      }`}
                    >
                      <span className="font-sans text-xs font-semibold">Cebolla</span>
                      <span className={`w-4 h-4 rounded-full flex items-center justify-center text-[8px] border ${
                        customizeItem.onion ? "bg-brand-yellow border-brand-yellow text-brand-dark" : "border-white/20"
                      }`}>
                        {customizeItem.onion && "✓"}
                      </span>
                    </button>

                    {/* Pineapple - only render/make active for Pastor */}
                    <button
                      disabled={customizeItem.meat !== "pastor"}
                      onClick={() => setCustomizeItem({ ...customizeItem, pineapple: !customizeItem.pineapple })}
                      className={`p-3 rounded-xl border transition-all text-left flex items-center justify-between ${
                        customizeItem.meat !== "pastor"
                          ? "opacity-30 cursor-not-allowed bg-brand-dark/10 border-transparent text-gray-600"
                          : customizeItem.pineapple 
                            ? "bg-brand-dark/60 border-brand-yellow text-white cursor-pointer" 
                            : "bg-brand-dark/20 border-white/5 text-gray-500 cursor-pointer"
                      }`}
                    >
                      <span className="font-sans text-xs font-semibold flex items-center gap-1">
                        <span>Piña</span>
                        {customizeItem.meat === "pastor" && <span className="text-[10px] text-amber-500">(Pastor)</span>}
                      </span>
                      <span className={`w-4 h-4 rounded-full flex items-center justify-center text-[8px] border ${
                        customizeItem.meat === "pastor" && customizeItem.pineapple 
                          ? "bg-brand-yellow border-brand-yellow text-brand-dark" 
                          : "border-white/20"
                      }`}>
                        {customizeItem.meat === "pastor" && customizeItem.pineapple && "✓"}
                      </span>
                    </button>

                  </div>
                </div>

                {/* 3. Salsa Selection */}
                <div className="space-y-3 pt-2">
                  <label className="font-sans font-bold text-sm text-white block">3. Selección de Salsa:</label>
                  <div className="grid grid-cols-2 xs:grid-cols-2 sm:grid-cols-4 gap-2">
                    {[
                      { key: "ambas", label: "Ambas salsas", tag: "🟢🔴" },
                      { key: "verde", label: "Sólo Verde", tag: "🟢 (Pica poco)" },
                      { key: "roja", label: "Sólo Roja", tag: "🔴 (Sí pica)" },
                      { key: "ninguna", label: "Sin salsa", tag: "❌" }
                    ].map((salsaOpt) => (
                      <button
                        key={salsaOpt.key}
                        onClick={() => setCustomizeItem({ ...customizeItem, salsa: salsaOpt.key as any })}
                        className={`p-2.5 rounded-xl border text-center font-sans tracking-tight transition-all block cursor-pointer ${
                          customizeItem.salsa === salsaOpt.key
                            ? "bg-brand-red/10 border-brand-red text-brand-red"
                            : "bg-brand-dark/40 border-white/5 text-gray-400 hover:border-white/20"
                        }`}
                      >
                        <p className="font-display font-medium text-xs text-white">{salsaOpt.label}</p>
                        <p className="text-[10px] text-gray-400 mt-1">{salsaOpt.tag}</p>
                      </button>
                    ))}
                  </div>
                </div>

                {/* 4. Quantity controls */}
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pt-4 border-t border-white/5">
                  <div className="space-y-1">
                    <label className="font-sans font-bold text-sm text-white block">4. ¿Cuántos quieres ordenar?</label>
                    <p className="font-sans text-[11px] text-gray-400">Arma un buen plato o pídelos para compartir.</p>
                  </div>

                  <div className="flex items-center gap-4 bg-brand-dark/80 rounded-2xl p-2.5 border border-white/5">
                    <button
                      onClick={() => setCustomizeItem({ ...customizeItem, quantity: Math.max(1, customizeItem.quantity - 1) })}
                      className="bg-brand-slate hover:bg-white/10 text-white w-9 h-9 rounded-xl flex items-center justify-center font-bold font-sans cursor-pointer transition-colors"
                    >
                      -
                    </button>
                    <span className="font-mono text-lg font-bold text-white w-8 text-center">{customizeItem.quantity}</span>
                    <button
                      onClick={() => setCustomizeItem({ ...customizeItem, quantity: customizeItem.quantity + 1 })}
                      className="bg-brand-yellow text-brand-dark hover:bg-amber-400 w-9 h-9 rounded-xl flex items-center justify-center font-bold font-sans cursor-pointer transition-all"
                    >
                      +
                    </button>
                  </div>
                </div>

                {/* 5. Custom notes */}
                <div className="space-y-2">
                  <label className="font-sans font-bold text-sm text-white block">Instrucciones Especiales (Opcional):</label>
                  <input
                    type="text"
                    value={customizeItem.notes}
                    onChange={(e) => setCustomizeItem({ ...customizeItem, notes: e.target.value })}
                    placeholder="Ej. La carne bien doradita, limones extra, etc."
                    className="w-full bg-brand-dark/60 border border-white/5 hover:border-white/20 focus:border-brand-yellow font-sans text-xs text-white px-4 py-3.5 rounded-xl outline-none transition-all"
                  />
                </div>

              </div>

              {/* Modal footer summary & confirm */}
              <div className="bg-brand-dark/85 border-t border-white/5 p-6 flex items-center justify-between gap-4">
                <div>
                  <p className="font-mono text-[9px] text-gray-400 uppercase tracking-widest leading-none">Total por esta cantidad:</p>
                  <p className="font-display font-extrabold text-2xl text-brand-yellow mt-1">
                    ${selectedProduct.price * customizeItem.quantity} <span className="text-xs font-normal text-gray-300">MXN</span>
                  </p>
                </div>

                <button
                  onClick={handleAddToCart}
                  className="bg-brand-yellow hover:bg-amber-400 text-brand-dark font-sans font-bold text-xs tracking-wider uppercase rounded-xl px-6 py-4 flex items-center justify-center gap-1 cursor-pointer shadow-lg shadow-brand-yellow/15 active:scale-97 transition-all"
                >
                  <span>Agregar al Carrito</span>
                  <span>({customizeItem.quantity} pza)</span>
                </button>
              </div>

            </motion.div>
          </div>
        )}
      </AnimatePresence>

    </section>
  );
}
