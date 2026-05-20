import { useState, useEffect } from "react";
import Header from "./components/Header";
import Hero from "./components/Hero";
import Menu from "./components/Menu";
import LocationAndDelivery from "./components/LocationAndDelivery";
import TaqueroAI from "./components/TaqueroAI";
import Cart from "./components/Cart";
import { CartItem } from "./types";
import { Flame, Star, MessageSquare, Phone, MapPin, Sparkles } from "lucide-react";

export default function App() {
  const [cart, setCart] = useState<CartItem[]>(() => {
    try {
      const stored = localStorage.getItem("mastacos_cart_v1");
      return stored ? JSON.parse(stored) : [];
    } catch {
      return [];
    }
  });

  const [isCartOpen, setIsCartOpen] = useState(false);
  const [activeSection, setActiveSection] = useState("inicio");

  // Save cart to local storage whenever it changes
  useEffect(() => {
    try {
      localStorage.setItem("mastacos_cart_v1", JSON.stringify(cart));
    } catch (e) {
      console.error("Failed to save cart to localStorage", e);
    }
  }, [cart]);

  // Track active section on scroll
  useEffect(() => {
    const handleScroll = () => {
      const sections = ["inicio", "menu", "chat-taquero", "ubicacion", "entregas"];
      const scrollPosition = window.scrollY + 200;

      for (const section of sections) {
        const el = document.getElementById(section);
        if (el) {
          const top = el.offsetTop;
          const height = el.offsetHeight;
          if (scrollPosition >= top && scrollPosition < top + height) {
            setActiveSection(section);
            break;
          }
        }
      }
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const handleScrollToSection = (id: string) => {
    const element = document.getElementById(id);
    if (element) {
      element.scrollIntoView({ behavior: "smooth", block: "start" });
      setActiveSection(id);
    }
  };

  const handleAddToCart = (newItem: CartItem) => {
    setCart((prevCart) => {
      // Look for a duplicate item with same type, meat, toppings, salsa, and notes
      const duplicateIndex = prevCart.findIndex(
        (item) =>
          item.type === newItem.type &&
          item.meat === newItem.meat &&
          item.onion === newItem.onion &&
          item.cilantro === newItem.cilantro &&
          item.pineapple === newItem.pineapple &&
          item.salsa === newItem.salsa &&
          (item.notes || "") === (newItem.notes || "")
      );

      if (duplicateIndex > -1) {
        // Increment quantity of existing item
        const updated = [...prevCart];
        updated[duplicateIndex] = {
          ...updated[duplicateIndex],
          quantity: updated[duplicateIndex].quantity + newItem.quantity,
        };
        return updated;
      }

      // Add as a new entry
      return [...prevCart, newItem];
    });
  };

  const handleUpdateQuantity = (id: string, newQty: number) => {
    if (newQty <= 0) {
      handleRemoveItem(id);
      return;
    }
    setCart((prev) =>
      prev.map((item) => (item.id === id ? { ...item, quantity: newQty } : item))
    );
  };

  const handleRemoveItem = (id: string) => {
    setCart((prev) => prev.filter((item) => item.id !== id));
  };

  const handleClearCart = () => {
    setCart([]);
  };

  return (
    <div className="min-h-screen bg-brand-dark text-white font-sans selection:bg-brand-yellow selection:text-brand-dark antialiased">
      {/* Navigation Header */}
      <Header
        cart={cart}
        onOpenCart={() => setIsCartOpen(true)}
        onScrollToSection={handleScrollToSection}
        activeSection={activeSection}
      />

      {/* Main Sections */}
      <main className="transition-all duration-300">
        <Hero onScrollToSection={handleScrollToSection} />
        
        <Menu onAddToCart={handleAddToCart} />
        
        <TaqueroAI />
        
        <LocationAndDelivery />
      </main>

      {/* Slide-out Cart Panel Container */}
      <Cart
        isOpen={isCartOpen}
        onClose={() => setIsCartOpen(false)}
        cart={cart}
        onUpdateQuantity={handleUpdateQuantity}
        onRemoveItem={handleRemoveItem}
        onClearCart={handleClearCart}
      />

      {/* Page Footer */}
      <footer className="bg-brand-dark border-t border-white/5 py-12 text-left relative overflow-hidden">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 grid grid-cols-1 md:grid-cols-4 gap-8">
          
          {/* Logo & Info column */}
          <div className="md:col-span-2 space-y-4">
            <div className="flex items-center gap-2.5">
              <div className="w-9 h-9 bg-brand-red rounded-full flex items-center justify-center font-serif text-base font-bold italic text-brand-dark">
                P
              </div>
              <h3 className="font-serif italic font-bold text-lg uppercase tracking-tight text-[#f5f5f0]">
                LOS POLLOS <span className="text-brand-red">CHILANGOS</span>
              </h3>
            </div>
            <p className="font-sans text-xs text-gray-400 max-w-sm leading-relaxed">
              Orgullosamente sirviendo las mejores tortas y tacos artesanales en Colonia San Gabriel #22, Mahuixtlán, Veracruz. Preparación diaria bajo rigurosos estándares de higiene y gran sabor.
            </p>
          </div>

          {/* Sabor Links columns */}
          <div className="space-y-3">
            <h4 className="font-mono text-xs text-brand-yellow font-bold uppercase tracking-wider">De Nuestro Menú</h4>
            <ul className="space-y-2 text-xs text-gray-400 font-sans">
              <li className="hover:text-white transition-colors cursor-pointer" onClick={() => handleScrollToSection("menu")}>• Tacos de Pastor ($16)</li>
              <li className="hover:text-white transition-colors cursor-pointer" onClick={() => handleScrollToSection("menu")}>• Tacos de Carnitas ($16)</li>
              <li className="hover:text-white transition-colors cursor-pointer" onClick={() => handleScrollToSection("menu")}>• Tortas de Chuleta ($35)</li>
              <li className="hover:text-white transition-colors cursor-pointer" onClick={() => handleScrollToSection("menu")}>• Tortas de Bistec ($35)</li>
            </ul>
          </div>

          {/* Horario/Soporte columns */}
          <div className="space-y-3">
            <h4 className="font-mono text-xs text-brand-yellow font-bold uppercase tracking-wider">¿Tienes Antojo?</h4>
            <div className="space-y-2 text-xs text-gray-400 leading-relaxed font-sans">
              <p>📍 San Gabriel #22, Mahuixtlán</p>
              <p>⏰ Todos los días: 8 AM - 6 PM</p>
              <a 
                href="https://maps.app.goo.gl/HAJn634fSafnhiFb7?g_st=ic" 
                target="_blank" 
                rel="noreferrer" 
                className="text-brand-yellow hover:underline block font-semibold mt-1"
              >
                🗺️ RUTA EN GOOGLE MAPS
              </a>
            </div>
          </div>

        </div>

        {/* Legal bar bottom */}
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 border-t border-white/5 pt-8 mt-8 flex flex-col sm:flex-row items-center justify-between text-[11px] text-gray-500 font-sans gap-4">
          <p>© 2026 Los Pollos Chilangos Mahuixtlán. Todos los derechos reservados.</p>
          <div className="flex items-center gap-1">
            <span>Sabor veracruzano de corazón ❤️</span>
          </div>
        </div>
      </footer>
    </div>
  );
}
