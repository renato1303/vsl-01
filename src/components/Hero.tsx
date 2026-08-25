import React, { useEffect, useRef, useState } from "react";
import { ArrowRight } from "lucide-react";

interface HeroProps {
  onOpenCheckout: () => void;
}

const PLAYER_ID = "6a8e0449107f2d3d63440b0b";
const SCRIPT_URL = `https://scripts.converteai.net/da948446-e37f-4a02-ad47-b15ab29871d1/players/${PLAYER_ID}/v4/player.js`;

// Delay configuration: 9 minutes (540 seconds)
const DELAY_SECONDS = 9 * 60; // 540s

export default function Hero({ onOpenCheckout }: HeroProps) {
  const playerContainerRef = useRef<HTMLDivElement>(null);
  const [showCta, setShowCta] = useState(false);

  useEffect(() => {
    // 1. Check if user already unlocked the CTA in previous session or current session
    const storedAlreadyShown = localStorage.getItem("metodo_pinguim_cta_unlocked");
    if (storedAlreadyShown === "true") {
      setShowCta(true);
    } else {
      // Set timer for 9 minutes
      const timer = setTimeout(() => {
        setShowCta(true);
        localStorage.setItem("metodo_pinguim_cta_unlocked", "true");
      }, DELAY_SECONDS * 1000);

      return () => clearTimeout(timer);
    }
  }, []);

  useEffect(() => {
    if (!playerContainerRef.current) return;

    // Insert the custom smartplayer tag with placeholder
    playerContainerRef.current.innerHTML = `
      <vturb-smartplayer id="vid-${PLAYER_ID}" style="display: block; margin: 0 auto; width: 100%;">
        <div class="vturb-player-placeholder" style="position: relative; width: 100%; padding: 75% 0 0; z-index: 0; background-color: black;"></div>
      </vturb-smartplayer>
    `;

    // Remove any previously injected script to force fresh initialization
    const existing = document.querySelector(`script[src="${SCRIPT_URL}"]`);
    if (existing) {
      existing.remove();
    }

    const script = document.createElement("script");
    script.src = SCRIPT_URL;
    script.async = true;
    document.head.appendChild(script);

    return () => {
      // cleanup if unmounted
    };
  }, []);

  return (
    <section className="relative w-full h-full flex flex-col justify-center items-center overflow-hidden bg-gradient-to-b from-[#030d17] via-[#0D3B66] to-[#04101e] px-4 py-3 sm:py-6">
      {/* Absolute high-end layout accents, clean and minimal */}
      <div className="absolute top-0 left-1/4 -z-10 h-[400px] w-[400px] rounded-full bg-brand-light/15 blur-[120px]" />
      <div className="absolute right-10 bottom-10 -z-10 h-60 w-60 rounded-full bg-brand-accent/5 blur-[120px]" />
      
      <div className="mx-auto max-w-4xl w-full flex flex-col items-center justify-center text-center">
        <div className="flex flex-col items-center text-center space-y-2.5 sm:space-y-4 max-w-3xl w-full mx-auto fade-in-up">
          
          <div>
            <h1 className="font-display text-base sm:text-xl md:text-2xl lg:text-3xl font-extrabold tracking-tight text-white leading-tight max-w-2xl mx-auto">
              Descubra como <span className="text-brand-accent">reduzir a dependência do celular dos seus filhos</span>, reorganizando rotina, limites e presença dentro de casa com o <span className="text-brand-light">Método Pinguim</span> mesmo que hoje limitar as telas pareça impossível!
            </h1>
          </div>

          {/* VTurb Video Player */}
          <div className="w-full max-w-2xl mx-auto rounded-xl sm:rounded-2xl overflow-hidden shadow-2xl shadow-black/80 border border-white/10 bg-black">
            <div ref={playerContainerRef} className="w-full" />
          </div>

          {/* High-Converting CTA Button Area with 9-Minute Delay */}
          {showCta && (
            <div className="flex flex-col items-center w-full max-w-md mx-auto pt-1 animate-in fade-in zoom-in-95 duration-700">
              <button
                onClick={onOpenCheckout}
                className="group cursor-pointer w-full inline-flex items-center justify-center gap-2 rounded-full bg-brand-accent px-5 py-3 sm:px-7 sm:py-3.5 text-xs sm:text-sm font-extrabold tracking-tight text-brand-dark shadow-xl shadow-brand-accent/20 transition-all hover:bg-white hover:shadow-white/20 hover:scale-[1.01] active:scale-[0.99]"
              >
                Quero adquirir o método pinguim
                <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
              </button>
            </div>
          )}

        </div>
      </div>
    </section>
  );
}
