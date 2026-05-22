import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import confetti from "canvas-confetti";
import { GoldVineCorner } from "./Ornaments";

interface EnvelopeProps {
  onOpen: () => void;
}

export default function Envelope({ onOpen }: EnvelopeProps) {
  const [isOpen, setIsOpen] = useState(false);
  const [isFullyOpened, setIsFullyOpened] = useState(false);

  const handleOpen = () => {
    if (isOpen) return;
    setIsOpen(true);

    // Trigger premium localized gold/champagne confetti spray
    setTimeout(() => {
      const end = Date.now() + 1000;
      const colors = ["#d4af37", "#0a3d2b", "#a2b997", "#e8c87a", "#ffffff"];

      (function frame() {
        confetti({
          particleCount: 6,
          angle: 60,
          spread: 60,
          origin: { x: 0, y: 0.8 },
          colors: colors,
        });
        confetti({
          particleCount: 6,
          angle: 120,
          spread: 60,
          origin: { x: 1, y: 0.8 },
          colors: colors,
        });

        if (Date.now() < end) {
          requestAnimationFrame(frame);
        }
      })();
    }, 400);

    // Complete transition and trigger parent page fade-in
    setTimeout(() => {
      setIsFullyOpened(true);
      onOpen();
    }, 2000);
  };

  // Sparkles locations for stars effect
  const sparkles = [
    { left: "8%", bottom: "22%", size: "3px", delay: "0s", duration: "2.8s" },
    { left: "14%", bottom: "18%", size: "2px", delay: "0.6s", duration: "2.3s" },
    { left: "5%", bottom: "15%", size: "4px", delay: "1.1s", duration: "3.1s" },
    { left: "85%", bottom: "25%", size: "2px", delay: "0.3s", duration: "2.6s" },
    { left: "90%", bottom: "12%", size: "3px", delay: "1.5s", duration: "2.4s" },
    { left: "78%", bottom: "20%", size: "2px", delay: "0.8s", duration: "2.9s" },
  ];

  return (
    <AnimatePresence>
      {!isFullyOpened && (
        <motion.div
          initial={{ opacity: 1 }}
          exit={{ opacity: 0, scale: 1.05, filter: "blur(8px)" }}
          transition={{ duration: 1, ease: "easeInOut" }}
          className="fixed inset-0 z-50 flex flex-col items-center justify-center bg-[#010805] px-4 overflow-hidden select-none"
        >
          {/* Corner gold leaf-vines (liya wel) */}
          <GoldVineCorner position="top-left" delay={0.2} className="opacity-75" />
          <GoldVineCorner position="top-right" delay={0.4} className="opacity-75" />
          
          {/* Background Image of Couple (Darkened & Blurred) */}
          <div className="absolute inset-0 z-0">
            <div 
              className="absolute inset-0 bg-cover bg-center opacity-45 filter brightness-[0.25]" 
              style={{ backgroundImage: "url('/couple.jpg')" }}
            />
            {/* Dark Radial Gradient Overlay */}
            <div className="absolute inset-0 bg-gradient-to-b from-black/70 via-black/40 to-black/90" />
          </div>

          {/* Floating Sparkles Overlay */}
          {sparkles.map((star, i) => (
            <div
              key={i}
              className="absolute rounded-full bg-gold pointer-events-none z-10"
              style={{
                left: star.left,
                bottom: star.bottom,
                width: star.size,
                height: star.size,
                animation: `sparkle ${star.duration} ease-in-out ${star.delay} infinite`,
              }}
            />
          ))}

          {/* Style snippet for custom sparkle animations inside this component context */}
          <style jsx global>{`
            @keyframes sparkle {
              0%, 100% { opacity: 0; transform: scale(0.6); }
              50% { opacity: 0.8; transform: scale(1.3); }
            }
          `}</style>

          {/* Luxury Cursive Typography Names */}
          <div className="relative z-10 flex flex-col items-center text-center max-w-sm mb-8 mt-12">
            <motion.p
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.1, duration: 1 }}
              className="text-[#fbf9f4]/75 font-playfair tracking-[0.32em] text-[10px] uppercase mb-4"
            >
              You Have an Invitation From
            </motion.p>
            
            <motion.h1
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.25, duration: 1.1 }}
              className="text-[#fbf9f4] text-5xl md:text-6xl font-mea font-normal leading-[0.85] my-0"
            >
              Roshan
            </motion.h1>
            
            <motion.p
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.4, duration: 1 }}
              className="text-gold font-mea text-2xl md:text-3xl my-0.5 ml-14 italic"
            >
              and
            </motion.p>
            
            <motion.h1
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.55, duration: 1.1 }}
              className="text-[#fbf9f4] text-5xl md:text-6xl font-mea font-normal leading-[0.85] my-0"
            >
              Thisuri
            </motion.h1>
          </div>

          {/* Interactive Envelope Vector Graphics Container */}
          <motion.div
            initial={{ scale: 0.9, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ delay: 0.75, duration: 1.2, ease: "easeOut" }}
            onClick={handleOpen}
            className="relative w-full max-w-[310px] md:max-w-[340px] aspect-[1.6] cursor-pointer group z-10"
            style={{ filter: "drop-shadow(0 20px 45px rgba(0,0,0,0.85))" }}
          >
            {/* SVG Envelope Canvas */}
            <svg 
              viewBox="0 0 300 190" 
              className={`w-full h-full transform transition-transform duration-1000 ease-[cubic-bezier(0.25,0,0.35,1)] ${
                isOpen ? "scale-105" : "hover:scale-[1.02]"
              }`}
            >
              <defs>
                <linearGradient id="envBody" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="0%" stopColor="#04291c" />
                  <stop offset="100%" stopColor="#02120b" />
                </linearGradient>
                <linearGradient id="flapFill" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="0%" stopColor="#0a3d2b" />
                  <stop offset="100%" stopColor="#042417" />
                </linearGradient>
                <linearGradient id="flapShadow" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="0%" stopColor="rgba(0,0,0,0.6)" />
                  <stop offset="100%" stopColor="rgba(0,0,0,0)" />
                </linearGradient>
                <linearGradient id="monogramGold" x1="0" y1="0" x2="1" y2="1">
                  <stop offset="0%" stopColor="#FFF2B2" />
                  <stop offset="50%" stopColor="#D4AF37" />
                  <stop offset="100%" stopColor="#8A640F" />
                </linearGradient>
                <radialGradient id="sealGold" cx="32%" cy="28%" r="68%">
                  <stop offset="0%" stopColor="#a5ffd2" />
                  <stop offset="35%" stopColor="#0d7c4d" />
                  <stop offset="100%" stopColor="#022a18" />
                </radialGradient>
                <radialGradient id="sealShine" cx="30%" cy="25%" r="50%">
                  <stop offset="0%" stopColor="rgba(165,255,210,0.4)" />
                  <stop offset="100%" stopColor="rgba(0,0,0,0)" />
                </radialGradient>
                <clipPath id="envClip">
                  <rect x="0" y="0" width="300" height="190" rx="4" />
                </clipPath>
              </defs>

              {/* Envelope Base Body */}
              <rect x="0" y="0" width="300" height="190" rx="4" fill="url(#envBody)" />

              {/* Envelope Flap (Closes over cards) */}
              <motion.polygon
                points="0,0 300,0 150,100"
                fill="url(#flapFill)"
                clipPath="url(#envClip)"
                animate={isOpen ? { scaleY: 0, opacity: 0 } : { scaleY: 1, opacity: 1 }}
                style={{ originY: 0 }}
                transition={{ duration: 0.6, ease: "easeInOut" }}
              />

              {/* Drop Shadow from Flap */}
              <motion.polygon
                points="0,0 300,0 150,114 150,100"
                fill="url(#flapShadow)"
                clipPath="url(#envClip)"
                opacity="0.8"
                animate={isOpen ? { scaleY: 0, opacity: 0 } : { scaleY: 1, opacity: 1 }}
                style={{ originY: 0 }}
                transition={{ duration: 0.6, ease: "easeInOut" }}
              />

              {/* Glowing Interactive Monogram Wax Seal */}
              <motion.g
                animate={isOpen ? { scale: 0, opacity: 0, y: -20 } : { scale: 1, opacity: 1 }}
                transition={{ duration: 0.5, ease: "backIn" }}
                className="origin-[150px_100px]"
              >
                {/* Outer Shadow Ring */}
                <rect x="123" y="77" width="54" height="54" rx="14" fill="rgba(0,0,0,0.65)" transform="rotate(-8,150,103)" />
                
                {/* Metallic Gold Body */}
                <rect x="125" y="75" width="50" height="50" rx="13" fill="url(#sealGold)" transform="rotate(-8,150,100)" />
                
                {/* Shiny Highlight */}
                <rect x="125" y="75" width="50" height="50" rx="13" fill="url(#sealShine)" transform="rotate(-8,150,100)" />
                
                {/* Inner Pressed Ring */}
                <rect x="131" y="81" width="38" height="38" rx="10" fill="none" stroke="url(#monogramGold)" strokeWidth="0.75" opacity="0.8" transform="rotate(-8,150,100)" />
                
                {/* Center Monogram Symbol */}
                <text x="149" y="106" textAnchor="middle" fontSize="11" fill="url(#monogramGold)" fontFamily="var(--font-cinzel), serif" letterSpacing="0.05em" fontWeight="bold" filter="drop-shadow(0px 1px 1px rgba(0,0,0,0.8))">
                  R&T
                </text>
              </motion.g>
            </svg>
          </motion.div>

          {/* Invitation Floating Tap Prompt */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: [0.4, 0.9, 0.4] }}
            transition={{ repeat: Infinity, duration: 2.2 }}
            className="mt-8 text-center z-10"
          >
            <p className="text-gold tracking-[0.32em] text-[10px] uppercase font-semibold font-playfair">
              {isOpen ? "Opening Invitation..." : "Tap Envelope to Open"}
            </p>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
