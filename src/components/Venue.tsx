"use client";

import React from "react";
import { motion } from "framer-motion";
import { MapPin, Phone } from "lucide-react";
import { GoldLeafDivider } from "./Ornaments";

interface VenueProps {
  lang?: string;
}

export default function Venue({ lang = "en" }: VenueProps) {
  const isSinhala = lang === "si";
  const mapUrl = "https://www.google.com/maps/dir//Shangri-La+Colombo,+1+Galle+Face,+Colombo+00200/@6.9272304,79.840958,16z/";

  return (
    <section className="relative min-h-[90vh] flex flex-col justify-center items-center py-24 px-6 text-center overflow-hidden bg-[#02120b] select-none">
      {/* Top and Bottom Fading Masks */}
      <div className="absolute top-0 left-0 right-0 h-40 bg-gradient-to-b from-[#02120b] via-[#02120b]/80 to-transparent z-10" />
      <div className="absolute bottom-0 left-0 right-0 h-40 bg-gradient-to-t from-[#02120b] via-[#02120b]/80 to-transparent z-10" />

      {/* User Uploaded Venue Drapes Asset Background */}
      <div className="absolute inset-0 z-0 pointer-events-none">
        <div 
          className="absolute inset-0 bg-cover bg-center opacity-[0.28] filter brightness-[0.2]" 
          style={{ backgroundImage: "url('/venue.jpg')" }}
        />
        {/* Soft radial overlay shadow */}
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,transparent_20%,rgba(2,18,11,0.9)_80%)]" />
      </div>

      {/* Inner Elegant Content Border */}
      <div className="max-w-md mx-auto flex flex-col items-center relative z-20 w-full pt-10">
        
        {/* Cursive text 'the' */}
        <motion.p
          initial={{ opacity: 0, y: 15 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 1 }}
          className="text-gold font-mea text-2xl md:text-3xl leading-none my-0"
        >
          {isSinhala ? "මංගල්‍යය" : "the"}
        </motion.p>
        
        {/* Cinzel Serif Header */}
        <motion.h2
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 1.2, delay: 0.15 }}
          className="text-[#fbf9f4] text-3xl md:text-4xl font-cinzel tracking-[0.2em] uppercase mt-2 mb-2"
        >
          {isSinhala ? "පැවැත්වෙන ස්ථානය" : "Venue"}
        </motion.h2>

        <GoldLeafDivider className="opacity-80" delay={0.3} />

        {/* Shangri-La Title */}
        <motion.h3
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 1.2, delay: 0.4 }}
          className="text-gold-light text-lg md:text-xl font-cormorant tracking-[0.18em] uppercase mb-4 font-semibold text-center"
        >
          {isSinhala ? "ග්‍රෑන්ඩ් බෝල්රූම්, ශැංග්‍රි-ලා හෝටලය කොළඹ" : "The Grand Ballroom, Shangri-La Colombo"}
        </motion.h3>

        {/* Location Info & Icons */}
        <motion.div
          initial={{ opacity: 0, y: 15 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 1.4, delay: 0.5 }}
          className="flex items-start justify-center gap-3 mb-8 w-full px-4"
        >
          <span className="text-gold text-lg shrink-0 mt-0.5">📍</span>
          <p className="text-xs md:text-sm text-[#fbf9f4]/75 font-playfair leading-relaxed text-left tracking-[0.08em] uppercase max-w-[280px]">
            {isSinhala ? (
              <>
                ග්‍රෑන්ඩ් බෝල්රූම්, ශැංග්‍රි-ලා හෝටලය<br />
                1 ගාලු මුවදොර මාවත, කොළඹ 00200, ශ්‍රී ලංකාව
              </>
            ) : (
              <>
                The Grand Ballroom, Shangri-La Hotel<br />
                1 Galle Face, Colombo 00200, Sri Lanka
              </>
            )}
          </p>
        </motion.div>

        {/* Description text */}
        <motion.p
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 1.2, delay: 0.6 }}
          className="text-xs text-[#fbf9f4]/60 leading-relaxed font-playfair px-4 mb-8 uppercase tracking-[0.12em] max-w-sm"
        >
          {isSinhala ? (
            "අලංකාර පහන් ආලෝකයෙන්, සුවිසල් ස්ඵටික පහන් කූඩුවලින්, සහ මනරම් ස්වර්ණමය මල් සැරසිලිවලින් විභූතිමත් වූ මංගල ශාලාවක අපගේ විශේෂ දිනය අත්විඳින්න."
          ) : (
            "Experience our special day in an elegant, beautifully lit space surrounded by luxurious cream curtains, grand chandeliers, and gorgeous golden floral centerpieces."
          )}
        </motion.p>

        {/* Contact Numbers Row */}
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 1.2, delay: 0.7 }}
          className="flex flex-col gap-2 border-y border-gold/15 py-4 w-full px-6 mb-10"
        >
          <span className="text-[9px] tracking-[0.2em] uppercase text-gold font-semibold font-playfair mb-1 block">
            {isSinhala ? "පිළිතුරු එවීමේ සහ ඇමතුම් සහාය" : "RSVP Contact Assistance"}
          </span>
          <div className="flex flex-col sm:flex-row justify-center items-center gap-4 sm:gap-8">
            <a href="tel:0771234567" className="flex items-center gap-2 text-xs font-semibold tracking-wider text-[#fbf9f4]/80 hover:text-gold font-playfair transition-colors duration-300">
              <Phone className="w-3.5 h-3.5 text-gold" />
              <span>{isSinhala ? "රොෂාන්" : "Roshan"}: 077 123 4567</span>
            </a>
            <a href="tel:0777654321" className="flex items-center gap-2 text-xs font-semibold tracking-wider text-[#fbf9f4]/80 hover:text-gold font-playfair transition-colors duration-300">
              <Phone className="w-3.5 h-3.5 text-gold" />
              <span>{isSinhala ? "තිසුරි" : "Thisuri"}: 077 765 4321</span>
            </a>
          </div>
        </motion.div>

        {/* Get Directions Interactive button */}
        <motion.div 
          whileHover={{ scale: 1.03 }} 
          whileTap={{ scale: 0.97 }}
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 1, delay: 0.8 }}
          className="w-full max-w-[240px]"
        >
          <a
            href={mapUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="w-full py-3.5 rounded-xl border border-gold/40 bg-gold/5 hover:bg-gold text-gold hover:text-[#02120b] font-playfair font-semibold text-xs uppercase tracking-[0.2em] transition-all duration-300 flex items-center justify-center gap-3 shadow-lg hover:shadow-[0_0_15px_rgba(201,169,110,0.25)]"
          >
            <span>{isSinhala ? "මාර්ගය සොයන්න" : "Get Directions"}</span>
            <MapPin className="w-3.5 h-3.5" />
          </a>
        </motion.div>
      </div>
    </section>
  );
}
