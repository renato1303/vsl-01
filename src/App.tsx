import React, { useState } from "react";
import Hero from "./components/Hero";
import CheckoutModal from "./components/CheckoutModal";

export default function App() {
  const [isCheckoutOpen, setIsCheckoutOpen] = useState(false);

  const handleOpenCheckout = () => {
    window.location.href = "https://pay.cakto.com.br/35b69xb_1007417";
  };

  const handleCloseCheckout = () => {
    setIsCheckoutOpen(false);
  };

  return (
    <div className="min-h-screen w-full flex flex-col justify-center bg-white text-slate-900 selection:bg-amber-200 selection:text-slate-900 antialiased">
      <main className="w-full flex-1 flex flex-col justify-center">
        {/* BLOCO 1 - VENDER SOZINHO (Hero / Headline Principal + Player) */}
        <Hero onOpenCheckout={handleOpenCheckout} />
      </main>

      {/* Interactive Checkout Modal */}
      <CheckoutModal isOpen={isCheckoutOpen} onClose={handleCloseCheckout} />
    </div>
  );
}

