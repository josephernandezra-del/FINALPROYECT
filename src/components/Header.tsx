import { useState } from "react";
import { ShoppingBag, Phone, Menu, X, Flame } from "lucide-react";
import { CartItem } from "../types";

interface HeaderProps {
  cart: CartItem[];
  onOpenCart: () => void;
  onScrollToSection: (id: string) => void;
  activeSection: string;
}

export default function Header({
  cart,
  onOpenCart,
  onScrollToSection,
  activeSection
}: HeaderProps) {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const totalItems = cart.reduce((sums, item) => sums + item.quantity, 0);

  const navLinks = [
    { name: "Inicio", id: "inicio" },
    { name: "Menú", id: "menu" },
    { name: "El Taquero AI", id: "chat-taquero" },
    { name: "Ubicación", id: "ubicacion" },
    { name: "Entregas", id: "entregas" }
  ];

  const handleLinkClick = (id: string) => {
    onScrollToSection(id);
    setMobileMenuOpen(false);
  };

  return (
    <header className="fixed top-0 left-0 w-full z-40 bg-brand-dark/95 backdrop-blur-md border-b border-white/5 transition-all duration-300">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-20 flex items-center justify-between">
        
        {/* Logo */}
        <div 
          onClick={() => handleLinkClick("inicio")} 
          className="flex items-center gap-3 cursor-pointer group"
          id="header-logo"
        >
          <div className="w-11 h-11 bg-brand-red rounded-full flex items-center justify-center font-serif text-xl font-extrabold italic shadow-[0_0_20px_rgba(255,99,33,0.4)] text-brand-dark group-hover:bg-brand-yellow group-hover:shadow-brand-yellow/30 transition-all duration-300">
            P
          </div>
          <div className="text-left">
            <h1 className="font-serif italic font-bold text-lg sm:text-xl tracking-tight uppercase leading-none text-[#f5f5f0]">
              LOS POLLOS <span className="text-brand-red">CHILANGOS</span>
            </h1>
            <p className="font-mono text-[8px] sm:text-[9px] uppercase tracking-[0.2em] text-white/50 -mt-0.5">MAHUISTLÁN, VER. • SABOR CASERO</p>
          </div>
        </div>

        {/* Desktop Navigation */}
        <nav className="hidden md:flex items-center gap-8">
          {navLinks.map((link) => (
            <button
              key={link.id}
              onClick={() => handleLinkClick(link.id)}
              className={`font-sans font-medium text-sm transition-colors duration-200 cursor-pointer relative py-2 ${
                activeSection === link.id ? "text-brand-yellow" : "text-gray-300 hover:text-white"
              }`}
            >
              {link.name}
              {activeSection === link.id && (
                <span className="absolute bottom-0 left-0 w-full h-[2px] bg-brand-yellow rounded-full" />
              )}
            </button>
          ))}
        </nav>

        {/* Action Buttons */}
        <div className="flex items-center gap-3 sm:gap-4">
          
          {/* WhatsApp Direct Call */}
          <a
            href="https://maps.app.goo.gl/HAJn634fSafnhiFb7?g_st=ic"
            target="_blank"
            rel="noopener noreferrer"
            className="hidden lg:flex items-center gap-2 bg-brand-slate hover:bg-brand-slate/80 border border-white/10 text-white rounded-full px-4 py-2 text-xs font-semibold tracking-wide transition-colors"
          >
            <Phone className="w-3.5 h-3.5 text-brand-yellow" />
            <span>¿HACER PEDIDO?</span>
          </a>

          {/* Cart Trigger */}
          <button
            onClick={onOpenCart}
            className="relative bg-brand-yellow hover:bg-amber-400 text-brand-dark rounded-xl p-3 flex items-center justify-center transition-all duration-200 active:scale-95 cursor-pointer shadow-lg shadow-brand-yellow/15"
            id="header-cart-btn"
          >
            <ShoppingBag className="w-5 h-5 font-bold" />
            {totalItems > 0 && (
              <span className="absolute -top-1.5 -right-1.5 bg-brand-red text-white text-[10px] font-bold rounded-full w-5 h-5 flex items-center justify-center border-2 border-brand-dark animate-pulse">
                {totalItems}
              </span>
            )}
          </button>

          {/* Mobile Menu Trigger */}
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="md:hidden bg-brand-slate text-white p-2.5 rounded-xl border border-white/5 cursor-pointer"
          >
            {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
          </button>
        </div>
      </div>

      {/* Mobile Menu Panel */}
      {mobileMenuOpen && (
        <div className="md:hidden bg-brand-dark border-t border-white/5 p-4 space-y-3 absolute top-20 left-0 w-full shadow-2xl animate-in fade-in slide-in-from-top-4 duration-200">
          {navLinks.map((link) => (
            <button
              key={link.id}
              onClick={() => handleLinkClick(link.id)}
              className={`block w-full text-left font-sans font-medium p-3 rounded-lg text-sm transition-colors ${
                activeSection === link.id 
                  ? "bg-brand-yellow/10 text-brand-yellow font-bold" 
                  : "text-gray-300 hover:bg-brand-slate hover:text-white"
              }`}
            >
              {link.name}
            </button>
          ))}
          <a
            href="https://maps.app.goo.gl/HAJn634fSafnhiFb7?g_st=ic"
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center justify-center gap-2 bg-brand-yellow text-brand-dark font-bold text-sm rounded-xl py-3 w-full"
          >
            <Phone className="w-4 h-4" />
            <span>ORDENAR DIRECTO</span>
          </a>
        </div>
      )}
    </header>
  );
}
