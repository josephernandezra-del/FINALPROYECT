import { useState } from "react";
import { motion } from "motion/react";
import { X, ShoppingBag, Plus, Minus, Trash2, Send, Check } from "lucide-react";
import { CartItem, DELIVERY_ZONES, DeliveryZoneType } from "../types";

interface CartProps {
  isOpen: boolean;
  onClose: () => void;
  cart: CartItem[];
  onUpdateQuantity: (id: string, newQty: number) => void;
  onRemoveItem: (id: string) => void;
  onClearCart: () => void;
}

export default function Cart({
  isOpen,
  onClose,
  cart,
  onUpdateQuantity,
  onRemoveItem,
  onClearCart
}: CartProps) {
  const [deliveryType, setDeliveryType] = useState<"domicilio" | "sucursal">("domicilio");
  const [deliveryZone, setDeliveryZone] = useState<DeliveryZoneType | "">("");
  const [deliveryAddress, setDeliveryAddress] = useState("");
  const [customerName, setCustomerName] = useState("");
  const [customerPhone, setCustomerPhone] = useState("");
  const [extraInstructions, setExtraInstructions] = useState("");

  const subtotal = cart.reduce((sums, item) => sums + item.price * item.quantity, 0);
  const deliveryFee = deliveryType === "domicilio" ? 15 : 0; // standard low cost shipping fee
  const grandTotal = subtotal + deliveryFee;

  const handleGenerateWhatsAppString = () => {
    if (cart.length === 0) return;

    let text = `🌮 *NUEVO PEDIDO DE MÁSTACOS MAHUISTLÁN* 🌮\n`;
    text += `------------------------------------------------\n`;
    text += `*Cliente:* ${customerName || "No especificado"}\n`;
    text += `*Modalidad:* ${deliveryType === "domicilio" ? "🛵 Servicio a Domicilio" : "🚶 Recojo en Sucursal"}\n`;
    text += `------------------------------------------------\n\n`;
    text += `*DETALLE DE MI ORDEN:*\n`;

    cart.forEach((item) => {
      const optionDetails: string[] = [];
      if (item.onion) optionDetails.push("con cebolla");
      if (item.cilantro) optionDetails.push("con cilantro");
      if (item.type === "taco" && item.meat === "pastor" && item.pineapple) optionDetails.push("con piña");
      
      const salsaMap = {
        verde: "salsa verde 🟢",
        roja: "salsa roja 🔴",
        ambas: "ambas salsas 🟢🔴",
        ninguna: "sin salsa ❌"
      };
      optionDetails.push(`salsa: ${salsaMap[item.salsa]}`);

      const specStr = optionDetails.join(", ");
      
      text += `• *${item.quantity}x ${item.name}* ($${item.price * item.quantity} MXN)\n`;
      text += `  ↳ _(${specStr})_\n`;
      if (item.notes) {
        text += `  ↳ _*Nota:* ${item.notes}_\n`;
      }
    });

    text += `\n------------------------------------------------\n`;
    text += `*Resumen de Cuenta:*\n`;
    text += `• Subtotal comida: $${subtotal} MXN\n`;
    if (deliveryType === "domicilio") {
      text += `• Costo reparto: $${deliveryFee} MXN\n`;
    }
    text += `• *Total Neto a pagar:* $${grandTotal} MXN\n`;
    text += `------------------------------------------------\n\n`;

    if (deliveryType === "domicilio") {
      text += `📍 *DATOS DE ENTREGA:*\n`;
      text += `• *Dirección:* ${deliveryAddress || "Falta especificar dirección"}\n`;
      text += `• *Zona / Localidad:* ${deliveryZone || "Falta especificar zona"}\n`;
    } else {
      text += `📍 *DATOS DE RECOGIDA:*\n`;
      text += `• Recoger en sucursal: Col. San Gabriel #22, Mahuixtlán\n`;
    }

    if (customerPhone) {
      text += `• *Celular:* ${customerPhone}\n`;
    }
    if (extraInstructions) {
      text += `• *Notas del pedido:* ${extraInstructions}\n`;
    }

    text += `\n¡Agradecemos confirmar la recepción del pedido para meterlo al comal! 🔥`;

    const encodedText = encodeURIComponent(text);
    
    // We can open WhatsApp direct link. The user didn't share a target direct WhatsApp phone, 
    // so we can let them open WhatsApp using a blank number or custom target, 
    // but the best pattern is using the standard contact link where possible. 
    // Let's configure it so it defaults to the main restaurant link or opens web whatsapp.
    // If they configure their own phone later, they can, but let's build a nice target structure:
    // It opens to a default or prompts them. 
    // Since mastacos.mx has actual Veracruz numbers, let's look at what we can use. We can let them send it!
    const whatsappUrl = `https://api.whatsapp.com/send?text=${encodedText}`;
    window.open(whatsappUrl, "_blank");
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex justify-end">
      {/* Backdrop */}
      <div
        onClick={onClose}
        className="absolute inset-0 bg-brand-dark/80 backdrop-blur-sm transition-opacity"
      />

      {/* Cart Drawer */}
      <div className="relative w-full max-w-md bg-brand-slate h-full flex flex-col shadow-2xl z-10 animate-in slide-in-from-right duration-300">
        
        {/* Drawer Header */}
        <div className="p-6 bg-brand-dark/90 border-b border-white/5 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <ShoppingBag className="w-5 h-5 text-brand-yellow" />
            <h3 className="font-display font-bold text-lg text-white">Tu Pedido</h3>
            <span className="bg-brand-yellow/10 text-brand-yellow text-xs px-2.5 py-0.5 rounded-full font-mono font-medium">
              {cart.reduce((sums, item) => sums + item.quantity, 0)} pzs
            </span>
          </div>

          <button
            onClick={onClose}
            className="p-2 text-gray-400 hover:text-white hover:bg-white/5 rounded-xl transition-colors cursor-pointer"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Drawer Body content */}
        <div className="flex-grow overflow-y-auto p-6 space-y-6">
          
          {cart.length === 0 ? (
            <div className="h-full flex flex-col items-center justify-center text-center space-y-3 py-16">
              <div className="bg-brand-dark p-6 rounded-full border border-white/5">
                <ShoppingBag className="w-12 h-12 text-gray-600 stroke-[1.5]" />
              </div>
              <h4 className="font-display font-bold text-gray-300 text-sm">Tu pedido está vacío</h4>
              <p className="font-sans text-xs text-gray-500 max-w-xs">
                Visita el menú y agrega unos ricos tacos al pastor, de carnitas o de chuleta con todo.
              </p>
              <button
                onClick={onClose}
                className="mt-2 bg-brand-yellow hover:bg-amber-400 text-brand-dark font-sans font-bold text-xs py-2.5 px-4 rounded-xl cursor-pointer"
              >
                VER EL MENÚ
              </button>
            </div>
          ) : (
            <>
              {/* Reset list trigger */}
              <div className="flex items-center justify-between border-b border-white/5 pb-3">
                <p className="font-mono text-[10px] text-gray-400 uppercase tracking-wider">Tus Antojos Seleccionados:</p>
                <button
                  onClick={onClearCart}
                  className="font-sans text-xs font-semibold text-brand-red hover:underline cursor-pointer flex items-center gap-1"
                >
                  <Trash2 className="w-3.5 h-3.5" />
                  <span>Vaciar todo</span>
                </button>
              </div>

              {/* Items List */}
              <div className="space-y-4 max-h-[35vh] overflow-y-auto pr-1">
                {cart.map((item) => {
                  const itemsPriceTotal = item.price * item.quantity;
                  const ingredientSummary = [
                    item.onion && "cebolla",
                    item.cilantro && "cilantro",
                    item.pineapple && "piña",
                    item.salsa !== "ninguna" && `salsa ${item.salsa}`
                  ].filter(Boolean).join(", ");

                  return (
                    <div
                      key={item.id}
                      className="bg-brand-dark/40 border border-white/5 rounded-2xl p-4 flex gap-3 items-start relative group hover:border-white/15 transition-all"
                    >
                      {/* Emoji Icon */}
                      <div className="w-9 h-9 bg-brand-slate rounded-xl flex items-center justify-center shadow-inner shrink-0 text-base">
                        {item.type === "taco" ? "🌮" : "🥪"}
                      </div>

                      {/* Info data */}
                      <div className="flex-grow space-y-1.5 text-left">
                        <div className="flex items-start justify-between">
                          <h4 className="font-sans font-bold text-white text-xs sm:text-sm">{item.name}</h4>
                          <span className="font-display font-extrabold text-brand-yellow text-xs sm:text-sm">${itemsPriceTotal}</span>
                        </div>
                        
                        <p className="font-sans text-[10px] text-gray-400 leading-relaxed capitalize">
                          {ingredientSummary}
                        </p>

                        {item.notes && (
                          <p className="font-sans text-[10px] text-brand-yellow italic bg-brand-yellow/5 px-2 py-1 rounded-md border border-brand-yellow/10">
                            Nota: "{item.notes}"
                          </p>
                        )}

                        {/* Quantity manipulators */}
                        <div className="flex items-center justify-between pt-2">
                          <div className="flex items-center gap-2.5 bg-brand-dark px-2 py-1 rounded-lg border border-white/5">
                            <button
                              onClick={() => {
                                if (item.quantity === 1) {
                                  onRemoveItem(item.id);
                                } else {
                                  onUpdateQuantity(item.id, item.quantity - 1);
                                }
                              }}
                              className="text-gray-400 hover:text-white font-bold text-xs font-mono w-4 h-4 flex items-center justify-center cursor-pointer"
                            >
                              -
                            </button>
                            <span className="font-mono text-xs font-bold text-white w-5 text-center">{item.quantity}</span>
                            <button
                              onClick={() => onUpdateQuantity(item.id, item.quantity + 1)}
                              className="text-brand-yellow hover:text-white font-bold text-xs font-mono w-4 h-4 flex items-center justify-center cursor-pointer"
                            >
                              +
                            </button>
                          </div>

                          <button
                            onClick={() => onRemoveItem(item.id)}
                            className="bg-brand-slate hover:bg-brand-red/10 text-gray-400 hover:text-brand-red p-1.5 rounded-lg border border-white/5 transition-colors cursor-pointer"
                            title="Quitar"
                          >
                            <Trash2 className="w-3.5 h-3.5" />
                          </button>
                        </div>

                      </div>
                    </div>
                  );
                })}
              </div>

              {/* Delivery Details Form */}
              <div className="border-t border-white/5 pt-4 space-y-4">
                <p className="font-mono text-[10px] text-gray-400 uppercase tracking-wider">Detalles de la Entrega:</p>
                
                {/* Delivery Type selector (domicilio u ocurra) */}
                <div className="grid grid-cols-2 gap-2 bg-brand-dark/60 p-1 rounded-xl border border-white/5">
                  <button
                    onClick={() => setDeliveryType("domicilio")}
                    className={`font-sans font-semibold text-xs py-2 px-3 rounded-lg transition-all cursor-pointer ${
                      deliveryType === "domicilio" ? "bg-brand-red text-white font-bold" : "text-gray-400 hover:text-white font-medium"
                    }`}
                  >
                    🛵 A Domicilio
                  </button>
                  <button
                    onClick={() => setDeliveryType("sucursal")}
                    className={`font-sans font-semibold text-xs py-2 px-3 rounded-lg transition-all cursor-pointer ${
                      deliveryType === "sucursal" ? "bg-brand-red text-white" : "text-gray-400 hover:text-white"
                    }`}
                  >
                    🚶 Recoger en local
                  </button>
                </div>

                {/* Form fields depending on delivery type */}
                <div className="space-y-3 bg-brand-dark/30 rounded-2xl p-4 border border-white/5">
                  <div className="space-y-1">
                    <label className="font-sans font-bold text-[11px] text-white block">Tu Nombre (Requerido):</label>
                    <input
                      type="text"
                      required
                      value={customerName}
                      onChange={(e) => setCustomerName(e.target.value)}
                      placeholder="Ej. Martín García"
                      className="w-full bg-brand-dark/80 border border-white/5 focus:border-brand-yellow font-sans text-xs text-white px-3.5 py-2.5 rounded-xl outline-none transition-all"
                    />
                  </div>

                  <div className="space-y-1">
                    <label className="font-sans font-bold text-[11px] text-white block">Tu Teléfono (Requerido):</label>
                    <input
                      type="tel"
                      required
                      value={customerPhone}
                      onChange={(e) => setCustomerPhone(e.target.value)}
                      placeholder="Ej. 228 123 4567"
                      className="w-full bg-brand-dark/80 border border-white/5 focus:border-brand-yellow font-sans text-xs text-white px-3.5 py-2.5 rounded-xl outline-none transition-all"
                    />
                  </div>

                  {deliveryType === "domicilio" && (
                    <>
                      {/* Delivery Zone dropdown */}
                      <div className="space-y-1">
                        <label className="font-sans font-bold text-[11px] text-white block">Zona de Reparto (Requerido):</label>
                        <select
                          value={deliveryZone}
                          required
                          onChange={(e) => setDeliveryZone(e.target.value as any)}
                          className="w-full bg-brand-dark/80 border border-white/5 focus:border-brand-yellow font-sans text-xs text-white px-3.5 py-2.5 rounded-xl outline-none transition-all cursor-pointer"
                        >
                          <option value="" disabled>-- Selecciona tu localidad --</option>
                          {DELIVERY_ZONES.map((zone) => (
                            <option key={zone} value={zone}>{zone}</option>
                          ))}
                        </select>
                      </div>

                      {/* Address details */}
                      <div className="space-y-1">
                        <label className="font-sans font-bold text-[11px] text-white block">Dirección de Entrega (Requerido):</label>
                        <input
                          type="text"
                          required
                          value={deliveryAddress}
                          onChange={(e) => setDeliveryAddress(e.target.value)}
                          placeholder="Calle, número, colonia, referencias..."
                          className="w-full bg-brand-dark/80 border border-white/5 focus:border-brand-yellow font-sans text-xs text-white px-3.5 py-2.5 rounded-xl outline-none transition-all"
                        />
                      </div>
                    </>
                  )}

                  {/* Extra notes */}
                  <div className="space-y-1">
                    <label className="font-sans font-bold text-[11px] text-white block">Indicaciones Extra (Opcional):</label>
                    <input
                      type="text"
                      value={extraInstructions}
                      onChange={(e) => setExtraInstructions(e.target.value)}
                      placeholder="Ej. Pagaré con billete de $500, tocar fuerte..."
                      className="w-full bg-brand-dark/80 border border-white/5 focus:border-brand-yellow font-sans text-xs text-white px-3.5 py-2.5 rounded-xl outline-none transition-all"
                    />
                  </div>
                </div>

              </div>
            </>
          )}

        </div>

        {/* Drawer Footer Account summary */}
        {cart.length > 0 && (
          <div className="p-6 bg-brand-dark/90 border-t border-white/5 space-y-4">
            
            {/* Breakdowns */}
            <div className="space-y-1.5">
              <div className="flex items-center justify-between text-xs text-gray-400">
                <span>Subtotal Comida:</span>
                <span className="font-mono text-white">${subtotal} MXN</span>
              </div>
              
              {deliveryType === "domicilio" && (
                <div className="flex items-center justify-between text-xs text-gray-400">
                  <span>Reparto a domicilio:</span>
                  <span className="font-mono text-white">${deliveryFee} MXN</span>
                </div>
              )}

              <div className="flex items-center justify-between pt-2 border-t border-white/5">
                <span className="font-sans font-bold text-sm text-white">Total a pagar:</span>
                <span className="font-display font-black text-brand-yellow text-xl">${grandTotal} MXN</span>
              </div>
            </div>

            {/* SEND ORDER BUTTON TO WHATSAPP */}
            <button
              onClick={handleGenerateWhatsAppString}
              disabled={!customerName.trim() || !customerPhone.trim() || (deliveryType === "domicilio" && (!deliveryAddress.trim() || !deliveryZone))}
              className="w-full bg-brand-red disabled:opacity-30 disabled:cursor-not-allowed hover:bg-brand-red-dark text-white font-sans font-bold text-xs tracking-wider uppercase rounded-2xl py-4 flex items-center justify-center gap-2 transform active:scale-98 transition-all cursor-pointer shadow-lg shadow-brand-red/15"
              id="cart-whatsapp-submit-btn"
            >
              <Send className="w-4 h-4 text-white shrink-0" />
              <span>COMPARTIR PEDIDO POR WHATSAPP</span>
            </button>

            {/* Validation warning */}
            {(!customerName.trim() || !customerPhone.trim() || (deliveryType === "domicilio" && (!deliveryAddress.trim() || !deliveryZone))) && (
              <p className="font-sans text-[10px] text-rose-400 text-center">
                * Por favor completa tu nombre, celular y dirección para habilitar el envío por WhatsApp.
              </p>
            )}

          </div>
        )}

      </div>
    </div>
  );
}
