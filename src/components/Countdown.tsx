"use client";

import React, { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { Phone } from "lucide-react";
import { GoldVineCorner, GoldLeafDivider } from "./Ornaments";

interface TimeLeft {
  days: number;
  hours: number;
  minutes: number;
  seconds: number;
}

interface CountdownProps {
  lang?: string;
}

export default function Countdown({ lang = "en" }: CountdownProps) {
  const targetDate = new Date("2026-12-12T16:30:00").getTime();
  const [timeLeft, setTimeLeft] = useState<TimeLeft | null>(null);
  const isSinhala = lang === "si";

  useEffect(() => {
    const calculateTimeLeft = () => {
      const difference = targetDate - Date.now();
      
      if (difference <= 0) {
        setTimeLeft({ days: 0, hours: 0, minutes: 0, seconds: 0 });
        return;
      }

      setTimeLeft({
        days: Math.floor(difference / (1000 * 60 * 60 * 24)),
        hours: Math.floor((difference / (1000 * 60 * 60)) % 24),
        minutes: Math.floor((difference / 1000 / 60) % 60),
        seconds: Math.floor((difference / 1000) % 60),
      });
    };

    calculateTimeLeft();
    const timer = setInterval(calculateTimeLeft, 1000);

    return () => clearInterval(timer);
  }, [targetDate]);

  if (!timeLeft) return null;

  const countdownItems = [
    { label: isSinhala ? "දින" : "Days", value: timeLeft.days },
    { label: isSinhala ? "පැය" : "Hours", value: timeLeft.hours },
    { label: isSinhala ? "මිනිත්තු" : "Minutes", value: timeLeft.minutes },
    { label: isSinhala ? "තත්පර" : "Seconds", value: timeLeft.seconds },
  ];

  return (
    <section id="countdown" className="relative py-28 px-4 bg-[#02120b] text-[#fbf9f4] overflow-hidden bg-sparkles flex flex-col items-center">
      {/* Decorative Top Border */}
      <div className="absolute top-0 inset-x-0 h-[1px] bg-gradient-to-r from-transparent via-gold/30 to-transparent" />
      
      {/* Background Ornament sways */}
      <GoldVineCorner position="bottom-right" className="opacity-20 scale-75" />
      <GoldVineCorner position="top-left" className="opacity-20 scale-75" />

      {/* Decorative Blur Spheres */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-80 h-80 bg-gold/5 rounded-full filter blur-3xl pointer-events-none" />

      <div className="max-w-xl w-full mx-auto text-center relative z-10 flex flex-col items-center pt-6">
        
        {/* Contact Numbers block at the top */}
        <motion.div
          initial={{ opacity: 0, y: -10 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 1.2 }}
          className="mb-14 flex flex-col sm:flex-row items-center gap-4 sm:gap-8 justify-center select-none"
        >
          <a 
            href="tel:0771234567" 
            className="flex items-center gap-2.5 px-5 py-2.5 rounded-full border border-gold/15 bg-black/30 text-xs tracking-[0.2em] font-cormorant text-gold hover:text-[#02120b] hover:bg-gold hover:border-gold transition-all duration-500 uppercase font-semibold group shadow-md"
          >
            <Phone className="w-3 h-3 group-hover:scale-110 transition-transform duration-300" />
            <span>{isSinhala ? "රොෂාන්" : "Roshan"}: 077 123 4567</span>
          </a>
          <a 
            href="tel:0777654321" 
            className="flex items-center gap-2.5 px-5 py-2.5 rounded-full border border-gold/15 bg-black/30 text-xs tracking-[0.2em] font-cormorant text-gold hover:text-[#02120b] hover:bg-gold hover:border-gold transition-all duration-500 uppercase font-semibold group shadow-md"
          >
            <Phone className="w-3 h-3 group-hover:scale-110 transition-transform duration-300" />
            <span>{isSinhala ? "තිසුරි" : "Thisuri"}: 077 765 4321</span>
          </a>
        </motion.div>

        {/* Cursive text */}
        <motion.p
          initial={{ opacity: 0, y: 10 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 1 }}
          className="text-gold font-mea text-3xl leading-none my-0"
        >
          {isSinhala ? "මංගල" : "the"}
        </motion.p>

        {/* Main Header */}
        <motion.h2
          initial={{ opacity: 0, y: 15 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 1.2, delay: 0.15 }}
          className="text-[#fbf9f4] text-4xl md:text-5xl font-cinzel font-normal tracking-[0.2em] uppercase mt-2 mb-2 leading-none"
        >
          {isSinhala ? "දින ගණනය" : "Countdown"}
        </motion.h2>

        {/* Subtitle */}
        <motion.p
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 1, delay: 0.3 }}
          className="text-xs text-peach/85 leading-relaxed font-cormorant tracking-[0.3em] uppercase mt-2"
        >
          {isSinhala ? "යුගයෙන් යුගයට නොනිමෙන සෙනෙහසින්" : "To forever and beyond"}
        </motion.p>

        <GoldLeafDivider className="my-10 opacity-70" />

        {/* Elegant Countdown Layout with thin colon dividers */}
        <div className="flex items-center justify-center gap-3 md:gap-5 w-full max-w-md select-none">
          {countdownItems.map((item, idx) => (
            <React.Fragment key={item.label}>
              <motion.div
                initial={{ opacity: 0, scale: 0.9, y: 15 }}
                whileInView={{ opacity: 1, scale: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: idx * 0.1, duration: 0.8 }}
                className="flex flex-col items-center w-16 sm:w-20 md:w-24 shrink-0"
              >
                {/* Custom Glass Card Frame */}
                <div className="glass w-full py-4 md:py-6 rounded-xl border border-gold/15 hover:border-gold/35 transition-colors duration-500 shadow-xl flex items-center justify-center relative overflow-hidden group">
                  <div className="absolute inset-0 bg-gradient-to-b from-transparent via-gold/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                  
                  <span className="font-playfair text-3xl sm:text-4xl md:text-5xl text-[#fbf9f4] font-medium leading-none tracking-wide tabular-nums">
                    {String(item.value).padStart(2, "0")}
                  </span>
                </div>
                
                <span className="text-[10px] uppercase tracking-[0.2em] font-cormorant text-peach mt-3 font-semibold">
                  {item.label}
                </span>
              </motion.div>
              
              {idx < countdownItems.length - 1 && (
                <span className="text-gold font-playfair text-2xl sm:text-3xl leading-none -mt-6 select-none opacity-45">
                  :
                </span>
              )}
            </React.Fragment>
          ))}
        </div>

        {/* Date Display */}
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ delay: 0.5, duration: 1.2 }}
          className="mt-16 text-[#fbf9f4]/60 text-xs tracking-[0.25em] font-cormorant uppercase font-medium border-t border-gold/10 pt-4 px-6"
        >
          {isSinhala ? "2026 දෙසැම්බර් 12 සෙනසුරාදා • සවස 04:30 ට" : "SATURDAY, DECEMBER 12, 2026 • 04:30 PM"}
        </motion.div>
      </div>
    </section>
  );
}
