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
    <div className="min-h-screen h-screen w-full overflow-hidden flex flex-col justify-center bg-[#030d17] text-white selection:bg-brand-accent/30 selection:text-white antialiased">
      <main className="w-full flex-1 flex flex-col justify-center overflow-hidden">
        {/* BLOCO 1 - VENDER SOZINHO (Hero / Headline Principal + Player) */}
        <Hero onOpenCheckout={handleOpenCheckout} />
      </main>

      {/* Interactive Checkout Modal */}
      <CheckoutModal isOpen={isCheckoutOpen} onClose={handleCloseCheckout} />
    </div>
  );
}

