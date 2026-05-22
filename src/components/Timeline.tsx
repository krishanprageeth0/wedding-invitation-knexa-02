"use client";

import React from "react";
import { motion } from "framer-motion";
import { GoldVineCorner, GoldLeafDivider } from "./Ornaments";

interface ScheduleItem {
  timeStr: string;
  ampm: string;
  title: string;
  desc: string;
}

interface TimelineProps {
  lang?: string;
}

export default function Timeline({ lang = "en" }: TimelineProps) {
  const isSinhala = lang === "si";

  const schedule = [
    { 
      timeStr: isSinhala ? "04:30" : "04:30", 
      ampm: isSinhala ? "සවස" : "PM", 
      title: isSinhala ? "පිළිගැනීමේ කොක්ටේල් සහ වයලීන වාදනය" : "Welcome Cocktail & Violin Solo", 
      desc: isSinhala 
        ? "අමුත්තන් පැමිණීම, මනරම් වයලීන වාදනය සහ පිළිගැනීමේ සංග්‍රහය." 
        : "Gathering of guests, soft luxury violin symphonies, and premium welcome refreshments." 
    },
    { 
      timeStr: isSinhala ? "05:15" : "05:15", 
      ampm: isSinhala ? "සවස" : "PM", 
      title: isSinhala ? "සාම්ප්‍රදායික පෝරුවේ චාරිත්‍ර" : "Traditional Poruwa Rituals", 
      desc: isSinhala 
        ? "සාම්ප්‍රදායික පෝරුවේ චාරිත්‍ර ඉටුකිරීම, මුදු හුවමාරුව සහ මංගල ආශිර්වාද ලබා ගැනීම." 
        : "The sacred Sri Lankan traditional rituals, customs, blessings, and exchange of rings." 
    },
    { 
      timeStr: isSinhala ? "07:00" : "07:00", 
      ampm: isSinhala ? "සවස" : "PM", 
      title: isSinhala ? "ශාලාවට පැමිණීම සහ මංගල උපහාරය" : "Grand Ballroom Entrance & Toast", 
      desc: isSinhala 
        ? "මනාල යුවළ සභා ගැබට පැමිණීම, මංගල කේක් කැපීම සහ ප්‍රීති ඝෝෂා මධ්‍යයේ මංගල උපහාරය." 
        : "Grand entry of the couple into the ballroom, cake cutting, and high-end champagne toast." 
    },
    { 
      timeStr: isSinhala ? "08:30" : "08:30", 
      ampm: isSinhala ? "සවස" : "PM", 
      title: isSinhala ? "රාත්‍රී භෝජන සංග්‍රහය සහ සජීවී සංගීතය" : "Sit-Down Dinner & Live Band", 
      desc: isSinhala 
        ? "ප්‍රණීත රාත්‍රී භෝජන සංග්‍රහය සහ සජීවී සංගීත කණ්ඩායමේ රිද්මයට අනුව නැටුම් ගැයුම්." 
        : "A grand gastronomic dinner served alongside high-end live music performances by the band." 
    },
    { 
      timeStr: isSinhala ? "11:30" : "11:30", 
      ampm: isSinhala ? "රාත්‍රී" : "PM", 
      title: isSinhala ? "ගිනිකෙළි සමඟින් පිටත්වීම" : "Sparkler Send-Off", 
      desc: isSinhala 
        ? "රොෂාන් සහ තිසුරි යුවළට සුබ පතමින් මනරම් ගිනිකෙළි ආලෝකය මැද සමුදීම." 
        : "Bidding a gorgeous farewell to Roshan & Thisuri under a sparkling canopy of light." 
    },
  ];

  return (
    <section className="relative py-28 px-6 bg-[#02120b] overflow-hidden bg-sparkles">
      {/* Background Vine Ornaments */}
      <GoldVineCorner position="top-right" className="opacity-30" />
      <GoldVineCorner position="bottom-left" className="opacity-30" />

      {/* Decorative Blur Spheres */}
      <div className="absolute top-1/4 left-10 w-72 h-72 bg-gold/5 rounded-full filter blur-3xl pointer-events-none" />
      <div className="absolute bottom-1/4 right-10 w-80 h-80 bg-peach/5 rounded-full filter blur-3xl pointer-events-none" />

      <div className="max-w-xl mx-auto relative z-10 flex flex-col pt-6">
        
        {/* Header Block */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 1.2 }}
          className="mb-20 text-center flex flex-col items-center select-none"
        >
          <span className="text-gold font-cormorant text-xs md:text-sm tracking-[0.3em] uppercase mb-3 block">
            {isSinhala ? "මංගල උත්සව වැඩසටහන" : "The Celebration Sequence"}
          </span>
          <h2 className="text-[#fbf9f4] text-4xl md:text-5xl font-cinzel font-normal tracking-[0.15em] uppercase leading-tight">
            {isSinhala ? "වැඩ" : "Order"}
          </h2>
          <span className="text-gold font-mea text-4xl my-1 block">
            {isSinhala ? "සටහන" : "of the"}
          </span>
          <h2 className="text-[#fbf9f4] text-4xl md:text-5xl font-cinzel font-normal tracking-[0.15em] uppercase leading-tight">
            {isSinhala ? "" : "Day"}
          </h2>
          <GoldLeafDivider className="mt-6 opacity-80" />
        </motion.div>

        {/* Timeline Container */}
        <div className="relative pl-4 pr-2 md:pl-8">
          {/* Vertical Connecting Line with gold gradient */}
          <div 
            className="absolute top-2 bottom-8 w-[1px] bg-gradient-to-b from-gold/10 via-gold/45 to-gold/10 pointer-events-none"
            style={{ left: "calc(6.5rem + 16px)" }}
          />

          {/* Timeline Items */}
          <div className="flex flex-col gap-14">
            {schedule.map((item, idx) => (
              <motion.div
                key={item.title}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-60px" }}
                transition={{ delay: idx * 0.15, duration: 1.0, ease: "easeOut" }}
                className="flex items-start w-full relative group"
              >
                {/* Time Column */}
                <div className="flex flex-col items-end w-[6.5rem] pr-6 shrink-0 select-none pt-1">
                  <span className="text-[#fbf9f4] text-2xl md:text-3xl font-playfair leading-none tracking-wide font-medium">
                    {item.timeStr}
                  </span>
                  <span className="text-gold font-cormorant text-xs tracking-widest uppercase mt-1.5 font-medium">
                    {item.ampm}
                  </span>
                </div>

                {/* Elegant Hanging Gold Leaf Vector Connector */}
                <div className="relative flex items-center justify-center shrink-0 w-8 h-8 z-10 mt-0.5">
                  {/* Outer glowing layer */}
                  <div className="absolute w-8 h-8 rounded-full border border-gold/10 group-hover:border-gold/30 group-hover:scale-125 transition-all duration-500 bg-[#02120b]/80 backdrop-blur-sm" />
                  
                  {/* Custom Leaf SVG */}
                  <motion.svg
                    viewBox="0 0 24 24"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                    className="w-4 h-4 text-gold group-hover:text-gold-light transition-colors duration-300"
                    animate={{ rotate: [0, 5, -5, 0] }}
                    transition={{
                      repeat: Infinity,
                      duration: 3,
                      delay: idx * 0.5,
                      ease: "easeInOut"
                    }}
                  >
                    {/* Hanging leaf outline and veins */}
                    <path
                      d="M12 2C12 2 15 7 15 11C15 14.866 11.866 18 8 18C8 18 10 14 10 11C10 7 12 2 12 2Z"
                      fill="currentColor"
                      fillOpacity="0.25"
                      stroke="currentColor"
                      strokeWidth="1.25"
                      strokeLinecap="round"
                    />
                    <path
                      d="M12 5Q12.5 9 10.5 13"
                      stroke="currentColor"
                      strokeWidth="0.75"
                      strokeLinecap="round"
                    />
                    <path
                      d="M12 2C12 2 11 4 9 5"
                      stroke="currentColor"
                      strokeWidth="0.75"
                      strokeLinecap="round"
                    />
                  </motion.svg>

                  {/* Pulse Ring */}
                  <span className="absolute -inset-1 rounded-full border border-gold/20 animate-ping opacity-0 group-hover:opacity-40 transition-opacity duration-500" />
                </div>

                {/* Event details card */}
                <div className="pl-6 text-left flex-1">
                  <div className="glass p-5 rounded-lg border border-gold/15 hover:border-gold/35 transition-all duration-500 group-hover:translate-x-1 group-hover:shadow-[0_4px_20px_rgba(212,175,55,0.06)] relative overflow-hidden">
                    {/* Corner decorative light */}
                    <div className="absolute top-0 right-0 w-24 h-24 bg-gradient-to-br from-gold/5 to-transparent pointer-events-none rounded-tr-lg" />
                    
                    <h3 className="text-gold-light text-base md:text-lg font-cinzel tracking-wider font-normal leading-tight mb-2 group-hover:text-gold transition-colors duration-300">
                      {item.title}
                    </h3>
                    <p className="text-cream/70 text-xs md:text-sm font-playfair leading-relaxed tracking-wide">
                      {item.desc}
                    </p>
                  </div>
                </div>

              </motion.div>
            ))}
          </div>
        </div>

      </div>
    </section>
  );
}
