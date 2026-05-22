"use client";

import React from "react";
import { motion } from "framer-motion";
import { GoldVineCorner, GoldLeafDivider, GoldLeafFrame } from "./Ornaments";

interface HeroProps {
  lang?: string;
}

export default function Hero({ lang = "en" }: HeroProps) {
  const isSinhala = lang === "si";

  return (
    <section className="relative min-h-screen flex flex-col justify-center items-center py-24 px-6 text-center overflow-hidden bg-[#02120b] select-none">
      
      {/* 1. Absolute Corner Gold Vines (Liya Wel Decoration) */}
      <GoldVineCorner position="top-left" delay={0.2} className="opacity-80" />
      <GoldVineCorner position="top-right" delay={0.4} className="opacity-80" />

      {/* 2. Soft Ambient Dark Parallax Background with Couple Overlay */}
      <div className="absolute inset-0 z-0 pointer-events-none">
        <div 
          className="absolute inset-0 bg-cover bg-center opacity-[0.20] filter brightness-[0.25] blur-[4px]" 
          style={{ backgroundImage: "url('/couple.jpg')" }}
        />
        {/* Radial dark shadow vignette */}
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,transparent_10%,rgba(2,18,11,0.95)_80%)]" />
        <div className="absolute inset-x-0 bottom-0 h-48 bg-gradient-to-t from-[#02120b] to-transparent" />
      </div>

      {/* 3. Outer Elegant Filigree Frame */}
      <div className="absolute inset-3 md:inset-6 border border-gold/10 pointer-events-none rounded-lg z-10">
        <div className="absolute top-3 left-3 w-5 h-5 border-t border-l border-gold/25" />
        <div className="absolute top-3 right-3 w-5 h-5 border-t border-r border-gold/25" />
        <div className="absolute bottom-3 left-3 w-5 h-5 border-b border-l border-gold/25" />
        <div className="absolute bottom-3 right-3 w-5 h-5 border-b border-r border-gold/25" />
      </div>

      {/* 4. Core Visual Invitation Centerpiece */}
      <div className="max-w-md mx-auto flex flex-col items-center relative z-20 w-full pt-6">
        
        {/* Intro Tagline */}
        <motion.p
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 0.75, y: 0 }}
          transition={{ duration: 1.2, delay: 0.2 }}
          className="text-gold font-playfair tracking-[0.32em] text-[10px] md:text-xs uppercase font-medium mb-5"
        >
          {isSinhala ? "දෙමාපියන්ගේ ආශිර්වාදය ඇතිව" : "Together with their families"}
        </motion.p>

        {/* Cinematic Calligraphic Couple Names */}
        <div className="flex flex-col items-center w-full mb-6">
          <motion.h1
            initial={{ opacity: 0, x: -40 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 1.4, ease: "easeOut", delay: 0.35 }}
            className="text-[#fbf9f4] text-7xl md:text-8xl font-mea font-normal leading-[0.8] my-0 drop-shadow-[0_4px_12px_rgba(0,0,0,0.5)]"
          >
            {isSinhala ? "රොෂාන්" : "Roshan"}
          </motion.h1>
          
          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 1.2, delay: 0.7 }}
            className="text-gold font-mea text-2xl md:text-3xl my-1 ml-14 italic"
          >
            {isSinhala ? "සහ" : "and"}
          </motion.p>
          
          <motion.h1
            initial={{ opacity: 0, x: 40 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 1.4, ease: "easeOut", delay: 0.5 }}
            className="text-[#fbf9f4] text-7xl md:text-8xl font-mea font-normal leading-[0.8] my-0 drop-shadow-[0_4px_12px_rgba(0,0,0,0.5)]"
          >
            {isSinhala ? "තිසුරි" : "Thisuri"}
          </motion.h1>
        </div>

        {/* Reusable Gold Leaf Flourish Divider */}
        <GoldLeafDivider className="opacity-90" delay={0.8} />

        {/* 5. Centerpiece Portrait: Romantic Couple Framed in Gold Vines Archway */}
        <div className="w-[200px] h-[270px] md:w-[230px] md:h-[310px] my-6 relative drop-shadow-[0_15px_30px_rgba(0,0,0,0.7)] group">
          <GoldLeafFrame delay={0.9} className="w-full h-full">
            {/* Shimmer overlay */}
            <div className="absolute inset-0 bg-gradient-to-t from-black/40 via-transparent to-transparent z-10" />
            <motion.div
              whileHover={{ scale: 1.05 }}
              transition={{ duration: 0.8 }}
              className="w-full h-full bg-cover bg-center filter brightness-[0.95]"
              style={{ backgroundImage: "url('/couple.jpg')" }}
            />
          </GoldLeafFrame>
          
          {/* Subtle gold dust floating circles around the portrait */}
          <div className="absolute -top-4 -left-4 w-3 h-3 bg-gold/20 rounded-full animate-float pointer-events-none" />
          <div className="absolute -bottom-4 -right-4 w-2 h-2 bg-gold/30 rounded-full animate-float pointer-events-none" style={{ animationDelay: "2s" }} />
        </div>

        {/* Wedding Invitation Call */}
        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 0.65 }}
          transition={{ duration: 1.2, delay: 1.2 }}
          className="text-[#fbf9f4] tracking-[0.28em] text-[9px] uppercase font-semibold font-playfair mt-6 mb-4"
        >
          {isSinhala ? "ඔවුන්ගේ විවාහ මංගල්‍යයට ඔබට ආදරයෙන් ඇරයුම් කරති" : "Request the honor of your presence at their wedding"}
        </motion.p>

        {/* 6. Premium Split Date Block */}
        <div className="w-full max-w-[280px] my-3">
          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 0.8 }}
            transition={{ duration: 1.2, delay: 1.3 }}
            className="text-gold tracking-[0.55em] text-[10px] font-semibold uppercase font-playfair mb-2"
          >
            {isSinhala ? "දෙසැම්බර්" : "DECEMBER"}
          </motion.p>

          {/* Upper Expandable Line */}
          <div className="w-full h-[1px] bg-gold/25 flex justify-center">
            <motion.div
              initial={{ width: 0 }}
              animate={{ width: "100%" }}
              transition={{ duration: 1.6, ease: "easeInOut", delay: 1.4 }}
              className="h-full bg-gold/45"
            />
          </div>

          {/* Core Date & Time Info */}
          <div className="flex items-center justify-between py-3 px-1">
            <motion.span
              initial={{ opacity: 0, x: -10 }}
              animate={{ opacity: 0.65, x: 0 }}
              transition={{ duration: 1.2, delay: 1.5 }}
              className="text-[#fbf9f4] tracking-[0.22em] text-[9px] uppercase font-bold font-playfair w-1/3 text-right pr-2"
            >
              {isSinhala ? "සෙනසුරාදා" : "Saturday"}
            </motion.span>

            <div className="w-[1px] h-9 bg-gold/20 shrink-0" />

            <motion.span
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 1.4, ease: "backOut", delay: 1.6 }}
              className="text-[#fbf9f4] text-4xl md:text-5xl font-cinzel leading-none w-1/3 text-center drop-shadow-[0_2px_4px_rgba(0,0,0,0.3)]"
            >
              12
            </motion.span>

            <div className="w-[1px] h-9 bg-gold/20 shrink-0" />

            <motion.span
              initial={{ opacity: 0, x: 10 }}
              animate={{ opacity: 0.65, x: 0 }}
              transition={{ duration: 1.2, delay: 1.7 }}
              className="text-[#fbf9f4] tracking-[0.22em] text-[9px] uppercase font-bold font-playfair w-1/3 text-left pl-2"
            >
              {isSinhala ? "සවස 4:30 ට" : "At 4:30 PM"}
            </motion.span>
          </div>

          {/* Lower Expandable Line */}
          <div className="w-full h-[1px] bg-gold/25 flex justify-center">
            <motion.div
              initial={{ width: 0 }}
              animate={{ width: "100%" }}
              transition={{ duration: 1.6, ease: "easeInOut", delay: 1.4 }}
              className="h-full bg-gold/45"
            />
          </div>

          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 0.8 }}
            transition={{ duration: 1.2, delay: 1.8 }}
            className="text-gold tracking-[0.55em] text-[10px] font-semibold uppercase font-playfair mt-2"
          >
            2026
          </motion.p>
        </div>

        {/* Location Block */}
        <motion.p
          initial={{ opacity: 0, y: 15 }}
          animate={{ opacity: 0.55, y: 0 }}
          transition={{ duration: 1.4, delay: 2.0 }}
          className="text-[#fbf9f4] tracking-[0.18em] text-[10px] uppercase font-semibold font-playfair leading-relaxed mt-6"
        >
          {isSinhala ? (
            <>
              ග්‍රෑන්ඩ් බෝල්රූම්, ශැංග්‍රි-ලා හෝටලය<br />
              කොළඹ, ශ්‍රී ලංකාව
            </>
          ) : (
            <>
              The Grand Ballroom, Shangri-La Hotel<br />
              Colombo, Sri Lanka
            </>
          )}
        </motion.p>
      </div>
    </section>
  );
}
