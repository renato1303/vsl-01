import React, { useEffect, useRef, useState } from "react";
import { ArrowRight } from "lucide-react";

interface HeroProps {
  onOpenCheckout: () => void;
}

const PLAYER_ID = "6aa9d68d94f6c11851eff92c";
const SCRIPT_URL = `https://scripts.converteai.net/da948446-e37f-4a02-ad47-b15ab29871d1/players/${PLAYER_ID}/v4/player.js`;
const CHECKOUT_URL = "https://pay.cakto.com.br/35b69xb_1007417";

// Delay configuration: 9 minutes (540 seconds)
const DELAY_SECONDS = 9 * 60; // 540s

export default function Hero({ onOpenCheckout }: HeroProps) {
  const playerContainerRef = useRef<HTMLDivElement>(null);
  const [showCta, setShowCta] = useState(false);

  useEffect(() => {
    // Purge any stored resume / end-of-video state so it never starts finished
    try {
      localStorage.removeItem("metodo_pinguim_cta_unlocked");
      for (let i = localStorage.length - 1; i >= 0; i--) {
        const key = localStorage.key(i);
        if (key && (key.includes("resume") || key.includes(PLAYER_ID) || key.includes("smartplayer"))) {
          localStorage.removeItem(key);
        }
      }
    } catch {
      // ignore
    }

    // Set timer for 9 minutes (540s)
    const timer = setTimeout(() => {
      setShowCta(true);
      try {
        localStorage.setItem("metodo_pinguim_cta_unlocked", "true");
      } catch {}
    }, DELAY_SECONDS * 1000);

    return () => clearTimeout(timer);
  }, []);

  // Listen for VTurb player timeupdate message events
  useEffect(() => {
    const handleMessage = (event: MessageEvent) => {
      try {
        if (typeof event.data === "string" && event.data.includes("currentTime")) {
          const data = JSON.parse(event.data);
          if (data.currentTime >= DELAY_SECONDS) {
            setShowCta(true);
            localStorage.setItem("metodo_pinguim_cta_unlocked", "true");
          }
        }
      } catch {
        // ignore non-json messages
      }
    };

    window.addEventListener("message", handleMessage);
    return () => window.removeEventListener("message", handleMessage);
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
    <section className="relative w-full pt-2 pb-6 sm:py-8 flex flex-col items-center overflow-hidden bg-gradient-to-b from-white via-slate-50/50 to-white px-4">
      {/* Subtle soft lighting in background */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 -z-10 h-72 w-[600px] max-w-full rounded-full bg-amber-100/35 blur-[90px]" />
      <div className="absolute top-1/3 right-10 -z-10 h-60 w-60 rounded-full bg-sky-100/30 blur-[100px]" />
      
      <div className="mx-auto max-w-4xl w-full flex flex-col items-center text-center">
        <div className="flex flex-col items-center text-center space-y-3 sm:space-y-4 max-w-3xl w-full mx-auto fade-in-up">
          
          {/* Main Headline */}
          <div className="px-1">
            <h1 className="font-display text-xl sm:text-2xl md:text-3xl lg:text-[34px] font-extrabold tracking-tight text-slate-900 leading-snug sm:leading-tight max-w-3xl mx-auto">
              Reduza a{" "}
              <span className="relative inline-block px-1 sm:px-1.5 py-0.5 mx-0.5">
                <span className="relative z-10 text-slate-950 font-black">
                  dependência do celular
                </span>
                {/* Yellow Handcrafted Brush Marker Effect */}
                <span
                  className="absolute inset-x-0 -inset-y-0.5 -z-10 transform -rotate-1 pointer-events-none"
                  style={{
                    background: "linear-gradient(100deg, #FEF08A 0%, #FDE047 30%, #FACC15 75%, #FDE047 100%)",
                    borderRadius: "4px 10px 5px 9px / 7px 4px 9px 5px",
                    boxShadow: "0 2px 8px -1px rgba(234, 179, 8, 0.4)",
                  }}
                />
                <svg
                  className="absolute -inset-x-2 -bottom-1 w-[calc(100%+16px)] h-3 sm:h-3.5 -z-10 pointer-events-none opacity-85"
                  viewBox="0 0 260 14"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                  preserveAspectRatio="none"
                >
                  <path
                    d="M 3,8 C 45,2 135,1 256,5 C 259,5 258,9 255,9 C 185,12 85,13 4,11 C 1,11 1,8 3,8 Z"
                    fill="#EAB308"
                  />
                </svg>
              </span>{" "}
              dos seus filhos reorganizando rotina, limites e presença com o{" "}
              <span className="font-black text-black underline underline-offset-[5px] decoration-[2.5px] decoration-black">Método Pinguim</span>.
            </h1>
          </div>

          {/* VTurb Video Player */}
          <div className="w-full max-w-2xl mx-auto rounded-xl sm:rounded-2xl overflow-hidden shadow-2xl shadow-slate-300/60 border border-slate-200/90 bg-black">
            <div ref={playerContainerRef} className="w-full" />
          </div>

          {/* High-Converting CTA Button Area with 9-Minute Delay & Pulsing Effect */}
          {showCta && (
            <div className="relative flex flex-col items-center w-full max-w-md mx-auto pt-2 animate-in fade-in zoom-in-95 duration-700">
              <div className="relative w-full">
                {/* Background ambient glowing green pulse layer */}
                <div className="absolute -inset-1 bg-gradient-to-r from-emerald-500 via-green-400 to-emerald-500 rounded-full blur-md opacity-70 animate-pulse pointer-events-none" />
                
                <a
                  href={CHECKOUT_URL}
                  target="_blank"
                  rel="noopener noreferrer"
                  onClick={onOpenCheckout}
                  className="relative animate-pulse-cta group cursor-pointer w-full inline-flex items-center justify-center gap-2.5 rounded-full bg-gradient-to-r from-emerald-500 via-green-500 to-emerald-600 px-6 py-4 text-xs sm:text-sm font-black uppercase tracking-wider text-white shadow-xl shadow-emerald-600/30 transition-all hover:brightness-110 active:scale-[0.98]"
                >
                  Quero adquirir o método pinguim
                  <ArrowRight className="h-4.5 w-4.5 transition-transform group-hover:translate-x-1.5 stroke-[3]" />
                </a>
              </div>
            </div>
          )}

        </div>
      </div>
    </section>
  );
}
