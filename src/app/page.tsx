"use client";

import React, { useState, useRef, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Envelope from "@/components/Envelope";
import Hero from "@/components/Hero";
import Narrative from "@/components/Narrative";
import Countdown from "@/components/Countdown";
import Venue from "@/components/Venue";
import Timeline from "@/components/Timeline";
import RSVPPortal from "@/components/RSVPPortal";
import TableFinder from "@/components/TableFinder";
import PhotoDropZone from "@/components/PhotoDropZone";
import GuestBook from "@/components/GuestBook";

export default function Home() {
  const [envelopeOpened, setEnvelopeOpened] = useState(false);
  const [lang, setLang] = useState<"en" | "si">("en");
  const [isPlaying, setIsPlaying] = useState(false);
  const audioRef = useRef<HTMLAudioElement | null>(null);

  // Initialize luxury ambient romantic background music
  useEffect(() => {
    // Elegant background loop song
    audioRef.current = new Audio("/audio/background.mp3");
    audioRef.current.loop = true;
    audioRef.current.volume = 0.3;

    return () => {
      if (audioRef.current) {
        audioRef.current.pause();
      }
    };
  }, []);

  const handleEnvelopeOpen = () => {
    setEnvelopeOpened(true);
    
    // Automatically attempt to play music on envelope open (highly cinematic!)
    if (audioRef.current) {
      audioRef.current
        .play()
        .then(() => {
          setIsPlaying(true);
        })
        .catch((err) => {
          console.log("Audio autoplay prevented by browser. Guest can toggle manually.", err);
        });
    }
  };

  const toggleAudio = () => {
    if (!audioRef.current) return;

    if (isPlaying) {
      audioRef.current.pause();
      setIsPlaying(false);
    } else {
      audioRef.current
        .play()
        .then(() => {
          setIsPlaying(true);
        })
        .catch((err) => {
          console.error("Audio playback error:", err);
        });
    }
  };

  return (
    <div className="relative min-h-screen bg-[#02120b] select-none text-[#fbf9f4] overflow-x-hidden font-playfair">
      
      {/* 1. Interactive Tap Envelope Intro */}
      <Envelope onOpen={handleEnvelopeOpen} />

      {/* 2. Main Premium Invitation Site (Revealed after envelope click) */}
      <AnimatePresence>
        {envelopeOpened && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 1.5, ease: "easeOut" }}
            className="flex flex-col w-full"
          >
            {/* Elegant Floating Multi-Lingual Switcher Pill at Top */}
            <motion.div
              initial={{ opacity: 0, y: -20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.5 }}
              className="fixed top-6 right-6 z-40 flex items-center gap-1.5 p-1 rounded-full bg-black/60 backdrop-blur-md border border-gold/30 shadow-[0_4px_20px_rgba(0,0,0,0.4)] select-none pointer-events-auto"
            >
              <button
                onClick={() => setLang("en")}
                className={`px-3.5 py-1.5 rounded-full text-[10px] font-sans font-bold tracking-widest uppercase transition-all duration-300 cursor-pointer ${
                  lang === "en"
                    ? "bg-gradient-to-r from-gold-dark to-gold text-[#02120b] shadow-md shadow-gold/25"
                    : "text-[#fbf9f4]/60 hover:text-gold"
                }`}
              >
                EN
              </button>
              <button
                onClick={() => setLang("si")}
                className={`px-3.5 py-1.5 rounded-full text-[10px] font-sans font-bold tracking-widest uppercase transition-all duration-300 cursor-pointer ${
                  lang === "si"
                    ? "bg-gradient-to-r from-gold-dark to-gold text-[#02120b] shadow-md shadow-gold/25"
                    : "text-[#fbf9f4]/60 hover:text-gold"
                }`}
              >
                සිං
              </button>
            </motion.div>

            {/* Rotating Vinyl Record Player & Equalizer Widget */}
            <motion.div
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: 1.2 }}
              className="fixed bottom-6 right-6 z-40 flex items-center gap-3 select-none pointer-events-auto"
            >
              {/* Pulsing sound wave equalizer bars */}
              {isPlaying && (
                <div className="flex items-end gap-1 h-6 px-2.5 py-1 rounded bg-black/45 backdrop-blur-sm border border-gold/15 shadow-sm">
                  {[1, 2, 3, 4].map((bar) => (
                    <motion.div
                      key={bar}
                      className="w-[3px] bg-gradient-to-t from-gold-dark to-gold-light rounded-full"
                      animate={{
                        height: ["4px", "20px", "6px", "16px", "4px"]
                      }}
                      transition={{
                        duration: 0.8 + bar * 0.15,
                        repeat: Infinity,
                        ease: "easeInOut"
                      }}
                    />
                  ))}
                </div>
              )}

              {/* Minimalist Rotating Vinyl Disc */}
              <button
                onClick={toggleAudio}
                className="w-14 h-14 rounded-full bg-neutral-900 border-2 border-gold shadow-[0_0_20px_rgba(212,175,55,0.25)] flex items-center justify-center relative cursor-pointer group hover:scale-105 active:scale-95 transition-all duration-300"
              >
                {/* Concentric sound groove lines */}
                <div className="absolute inset-1 rounded-full border border-neutral-800" />
                <div className="absolute inset-2 rounded-full border border-neutral-700" />
                <div className="absolute inset-3 rounded-full border border-neutral-800" />
                
                {/* Vinyl Center label */}
                <div className={`w-6 h-6 rounded-full bg-gradient-to-br from-gold-light via-gold to-gold-dark flex items-center justify-center relative transition-transform duration-1000 ${
                  isPlaying ? "animate-spin-slow" : ""
                }`}>
                  {/* Center Spindle Hole */}
                  <div className="w-1.5 h-1.5 rounded-full bg-neutral-900" />
                </div>

                {/* Glowing play state indicator marker */}
                <div className={`absolute -top-0.5 -right-0.5 w-3 h-3 rounded-full border border-white/20 transition-colors duration-300 ${
                  isPlaying ? "bg-emerald-500 animate-pulse" : "bg-gold"
                }`} />
              </button>
            </motion.div>

            {/* Core Cinematic Page Layout Sections */}
            
            {/* 1. Hero Cover Intro */}
            <Hero lang={lang} />
            
            {/* 2. Literary Love Narrative */}
            <Narrative lang={lang} />
            
            {/* 3. Celestial Countdown clock */}
            <Countdown lang={lang} />
            
            {/* 4. Luxury Venue Map & Routing */}
            <Venue lang={lang} />
            
            {/* 5. Sequence Timeline Order of the Day */}
            <Timeline lang={lang} />
            
            {/* 6. Dynamic Table Finder Search */}
            <TableFinder lang={lang} />
            
            {/* 7. Framer Motion 3-Step RSVP Portal */}
            <RSVPPortal lang={lang} />

            {/* 8. Crowdsourced Photo & Video Drop Zone */}
            <PhotoDropZone lang={lang} />

            {/* 9. Live Digital Guest Book Marquee */}
            <GuestBook lang={lang} />

            {/* Premium Knexa Brand Footer */}
            <footer className="relative bg-[#02120b] text-[#fbf9f4]/55 py-16 px-4 border-t border-gold/15 text-center overflow-hidden">
              <div className="absolute top-0 inset-x-0 h-[1px] bg-gradient-to-r from-transparent via-gold/20 to-transparent" />
              
              {/* Inner glowing effect */}
              <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-80 h-40 bg-gold/5 rounded-full blur-2xl pointer-events-none" />

              <div className="max-w-md mx-auto flex flex-col items-center gap-4 relative z-10 select-none">
                <span className="text-gold text-2xl font-cinzel tracking-[0.25em] uppercase">
                  R &amp; T
                </span>
                
                <p className="text-[10px] font-sans tracking-[0.35em] uppercase text-[#fbf9f4]/45 leading-relaxed font-semibold">
                  {lang === "si" 
                    ? "රොෂාන් සහ තිසුරි • 2026 දෙසැම්බර් 12" 
                    : "ROSHAN & THISURI • 12 DECEMBER 2026"}
                </p>
                
                <div className="h-[1px] w-12 bg-gold/20 my-2" />
                
                <div className="flex flex-col items-center justify-center gap-1.5 mt-2">
                  <span className="text-[11px] font-sans tracking-[0.25em] uppercase font-semibold text-gold-light/60">
                    POWERED BY KNEXA SYSTEM
                  </span>
                  <span className="text-[9px] font-sans tracking-[0.15em] uppercase opacity-45">
                    {lang === "si"
                      ? "ඊළඟ පරම්පරාවේ ඩිජිටල් අත්දැකීම් නිර්මාණය"
                      : "CREATING NEXT-LEVEL DIGITAL EXPERIENCES"}
                  </span>
                </div>
              </div>
            </footer>

          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
