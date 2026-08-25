import React, { useState } from "react";
import { Package, AlertTriangle, ListChecks, CheckSquare, ShieldCheck } from "lucide-react";
import { motion } from "motion/react";

interface Deliverable {
  id: string;
  icon: React.ReactNode;
  badge?: string;
  title: string;
  description: string;
}

const DELIVERABLES: Deliverable[] = [
  {
    id: "1",
    icon: <ListChecks className="h-6 w-6 text-brand-accent" />,
    title: "Checklist Método Pinguim Completo",
    description: "Um passo a passo diário em formato de checklist simples para pais atarefados, detalhando as micro-atitudes que garantem a harmonia digital sem esquecer de nada."
  },
  {
    id: "2",
    icon: <CheckSquare className="h-6 w-6 text-brand-light" />,
    title: "Template de Atividades e Rituais Offline",
    description: "Um catálogo completo de dinâmicas familiares e brincadeiras lúdicas separadas por idade, projetadas para manter a criança engajada de verdade na vida offline."
  },
  {
    id: "3",
    icon: <ShieldCheck className="h-6 w-6 text-brand-accent" />,
    title: "Guia de Sobrevivência para Birras e Crises",
    description: "Ferramentas práticas de comunicação assertiva baseadas em psicologia infantil para acalmar a criança durante transições de telas sem gritos ou punições."
  },
  {
    id: "4",
    icon: <AlertTriangle className="h-6 w-6 text-brand-light" />,
    title: "Lista Negra dos 7 Erros Comuns",
    description: "Descubra os comportamentos involuntários que os pais cometem na hora de restringir a tecnologia e que acabam agravando a resistência dos filhos."
  }
];

export default function Entregaveis() {
  const [hoveredCardId, setHoveredCardId] = useState<string | null>(null);
  const [mouseCoords, setMouseCoords] = useState({ x: 0, y: 0 });

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>, cardId: string) => {
    const rect = e.currentTarget.getBoundingClientRect();
    setMouseCoords({ x: e.clientX - rect.left, y: e.clientY - rect.top });
    setHoveredCardId(cardId);
  };

  return (
    <section className="bg-gradient-to-b from-[#020912] via-[#0c2e4f] to-[#030b15] py-20 sm:py-28 border-t border-white/5 relative overflow-hidden">
      
      {/* Visual accents */}
      <div className="absolute top-1/4 left-10 -z-10 h-80 w-80 rounded-full bg-emerald-500/5 blur-[120px]" />
      <div className="absolute bottom-1/4 right-10 -z-10 h-80 w-80 rounded-full bg-brand-light/5 blur-[120px]" />

      <div className="mx-auto max-w-7xl px-4 sm:px-8">
        
        {/* Deliverables Section Title */}
        <div className="mx-auto max-w-3xl text-center mb-10 sm:mb-16">
          
          <motion.h2 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.1 }}
            className="font-display text-2xl sm:text-3xl font-extrabold tracking-tight text-white sm:text-4xl"
          >
            Tudo o que você vai receber ao se inscrever no Método Pinguim
          </motion.h2>
          <motion.p 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="mt-3 font-sans text-xs sm:text-base text-white/80"
          >
            Um ecossistema completo de entrega com ferramentas práticas, manuais de orientação e suporte exclusivo.
          </motion.p>
        </div>

        {/* Deliverables Grid */}
        <div className="grid gap-5 md:grid-cols-2 max-w-5xl mx-auto mb-16 sm:mb-24">
          {DELIVERABLES.map((item, idx) => {
            const isHovered = hoveredCardId === item.id;
            return (
              <motion.div 
                key={item.id} 
                initial={{ opacity: 0, y: 25 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.45, delay: idx * 0.08 }}
                onMouseMove={(e) => handleMouseMove(e, item.id)}
                onMouseEnter={() => setHoveredCardId(item.id)}
                onMouseLeave={() => setHoveredCardId(null)}
                className={`relative flex gap-4 p-5 sm:p-6 rounded-2xl border transition-all duration-300 backdrop-blur-md overflow-hidden ${
                  isHovered 
                    ? "border-brand-light/30 bg-white/[0.08] shadow-[0_8px_30px_rgb(0,0,0,0.12)]" 
                    : "border-white/10 bg-white/5 shadow-[inset_0_1px_1px_rgba(255,255,255,0.02)]"
                }`}
              >
                {/* Spotlight Cursor Glow */}
                {isHovered && (
                  <div 
                    className="pointer-events-none absolute -inset-px rounded-2xl opacity-100 transition duration-300"
                    style={{
                      background: `radial-gradient(150px circle at ${mouseCoords.x}px ${mouseCoords.y}px, rgba(56,189,248,0.12), transparent 80%)`
                    }}
                  />
                )}

                <div className="relative z-10 flex h-11 w-11 sm:h-12 sm:w-12 shrink-0 items-center justify-center rounded-xl bg-white/10 border border-white/5">
                  {item.icon}
                </div>
                <div className="relative z-10 space-y-1">
                  <h3 className="font-display text-sm sm:text-base font-bold text-white leading-snug">
                    {item.title}
                  </h3>
                  <p className="font-sans text-xs sm:text-sm text-white/70 leading-relaxed">
                    {item.description}
                  </p>
                </div>
              </motion.div>
            );
          })}
        </div>

      </div>
    </section>
  );
}
