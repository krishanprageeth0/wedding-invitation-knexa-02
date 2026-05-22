"use client";

import React, { useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Check, Calendar, ArrowRight, Share2, X } from "lucide-react";
import confetti from "canvas-confetti";

interface SuccessModalProps {
  isOpen: boolean;
  onClose: () => void;
  guestName: string;
  lang?: string;
  formData?: {
    attendance: "attending" | "declined";
    totalGuests: number;
    dietaryPreference: string;
  };
}

const translations = {
  en: {
    statusAttending: "Seat Secured Successfully",
    statusDeclined: "Response Recorded",
    ticketTitle: "BOTANICAL GUEST PASS",
    monogram: "R ✦ T",
    couple: "Roshan & Thisuri",
    weddingDate: "SATURDAY, 12 DECEMBER 2026",
    weddingTime: "04:30 PM (SLST)",
    venue: "Shangri-La, Colombo",
    guestNameLabel: "GUEST NAME",
    statusLabel: "STATUS",
    statusAttendingVal: "Happily Attending",
    statusDeclinedVal: "Declined with Regret",
    guestsLabel: "GUESTS",
    mealLabel: "MEAL PREFERENCE",
    googleCalendarBtn: "Add to Google Calendar",
    closeBtn: "Close Pass",
    thankYouAttending: "Your presence will illuminate our botanical celebration. Knexa System has secured your seat in our guest registry.",
    thankYouDeclined: "Thank you for letting us know. You will be missed, but your blessings are deeply felt.",
  },
  si: {
    statusAttending: "ආසනය සාර්ථකව වෙන් කරන ලදී",
    statusDeclined: "පිළිතුර සටහන් කර ගන්නා ලදී",
    ticketTitle: "රාජකීය අමුත්තන්ගේ අවසර පත්‍රය",
    monogram: "රො ✦ ති",
    couple: "රොෂාන් සහ තිසුරි",
    weddingDate: "2026 දෙසැම්බර් 12 සෙනසුරාදා",
    weddingTime: "පස්වරු 04:30 ට",
    venue: "ශැන්ග්‍රි-ලා, කොළඹ",
    guestNameLabel: "අමුත්තාගේ නම",
    statusLabel: "තත්ත්වය",
    statusAttendingVal: "සතුටින් සහභාගී වේ",
    statusDeclinedVal: "ප්‍රතික්ෂේප කර ඇත",
    guestsLabel: "අමුත්තන් ගණන",
    mealLabel: "ආහාර මනාපය",
    googleCalendarBtn: "Google දින දර්ශනයට එක් කරන්න",
    closeBtn: "අවසර පත්‍රය වසන්න",
    thankYouAttending: "ඔබගේ පැමිණීම අපගේ දිව්‍යමය විවාහ මංගල්‍යය තවත් ආලෝකමත් කරනු ඇත. නෙක්සා පද්ධතිය හරහා ඔබගේ ආසනය සාර්ථකව වෙන් කර ඇත.",
    thankYouDeclined: "අපව දැනුවත් කිරීම පිළිබඳව ස්තූතියි. ඔබගේ නොපැමිණීම අපට අඩුවක් වුවද, ඔබගේ ආශිර්වාදය අපට මහත් ශක්තියකි.",
  }
};

export default function SuccessModal({
  isOpen,
  onClose,
  guestName,
  lang = "en",
  formData = { attendance: "attending", totalGuests: 1, dietaryPreference: "None" }
}: SuccessModalProps) {
  const isSinhala = lang === "si";
  const t = isSinhala ? translations.si : translations.en;

  useEffect(() => {
    if (isOpen && formData.attendance === "attending") {
      const duration = 2.5 * 1000;
      const animationEnd = Date.now() + duration;
      const defaults = { startVelocity: 30, spread: 360, ticks: 60, zIndex: 100 };

      const randomInRange = (min: number, max: number) => {
        return Math.random() * (max - min) + min;
      };

      const interval: NodeJS.Timeout = setInterval(() => {
        const timeLeft = animationEnd - Date.now();

        if (timeLeft <= 0) {
          return clearInterval(interval);
        }

        const particleCount = 40 * (timeLeft / duration);
        confetti({
          ...defaults,
          particleCount,
          colors: ["#d4af37", "#b87d6c", "#e8c87a"],
          origin: { x: randomInRange(0.1, 0.3), y: Math.random() - 0.2 }
        });
        confetti({
          ...defaults,
          particleCount,
          colors: ["#d4af37", "#b87d6c", "#e8c87a"],
          origin: { x: randomInRange(0.7, 0.9), y: Math.random() - 0.2 }
        });
      }, 250);

      return () => clearInterval(interval);
    }
  }, [isOpen, formData.attendance]);

  // Pre-compiled Google Calendar Sync Link
  const getGoogleCalendarUrl = () => {
    const title = encodeURIComponent(
      isSinhala 
        ? "රොෂාන් සහ තිසුරිගේ එමරල්ඩ් බොටැනිකල් මංගල්‍යය" 
        : "Roshan & Thisuri's Emerald Botanical Luxe Wedding"
    );
    const details = encodeURIComponent(
      isSinhala
        ? "රොෂාන් සහ තිසුරිගේ විවාහ මංගල්‍යයට ඔබට ගෞරවයෙන් ඇරයුම් කරමු. ස්ථානය: ග්‍රෑන්ඩ් බෝල්රූම්, ශැන්ග්‍රි-ලා කොළඹ."
        : "You are cordially invited to celebrate the emerald botanical union of Roshan & Thisuri at The Grand Ballroom, Shangri-La Colombo. Placed via Knexa Smart Portal."
    );
    const location = encodeURIComponent("The Grand Ballroom, Shangri-La Colombo, Sri Lanka");
    
    // Saturday, 12th December 2026, 4:30 PM (16:30) to 11:30 PM (23:30) in Asia/Colombo timezone
    // 20261212T163000 / 20261212T233000
    return `https://www.google.com/calendar/render?action=TEMPLATE&text=${title}&dates=20261212T163000/20261212T233000&ctz=Asia/Colombo&details=${details}&location=${location}&sf=true&output=xml`;
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 overflow-y-auto">
          {/* Dark Glass Backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            className="fixed inset-0 bg-[#02120b]/90 backdrop-blur-md z-40"
          />

          {/* Ticket Container */}
          <motion.div
            initial={{ opacity: 0, scale: 0.9, y: 30 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.9, y: 30 }}
            transition={{ type: "spring", damping: 25, stiffness: 260 }}
            className="relative w-full max-w-md my-8 rounded-2xl glass-dark text-center shadow-2xl z-50 border border-gold/45 bg-[#02120b]/95 overflow-hidden flex flex-col items-center"
          >
            {/* Elegant Corner Ornaments */}
            <div className="absolute top-4 left-4 w-4 h-4 border-t border-l border-gold/30" />
            <div className="absolute top-4 right-4 w-4 h-4 border-t border-r border-gold/30" />
            <div className="absolute bottom-4 left-4 w-4 h-4 border-b border-l border-gold/30" />
            <div className="absolute bottom-4 right-4 w-4 h-4 border-b border-r border-gold/30" />

            {/* Close Button */}
            <button
              onClick={onClose}
              className="absolute top-4 right-4 z-50 text-gold-light/60 hover:text-gold transition-colors duration-200 cursor-pointer"
            >
              <X className="w-5 h-5" />
            </button>

            {/* Header Success Section */}
            <div className="p-6 pb-2 mt-4">
              <div className="relative w-16 h-16 mx-auto mb-4 flex items-center justify-center">
                <motion.div
                  initial={{ scale: 0 }}
                  animate={{ scale: 1 }}
                  transition={{ type: "spring", delay: 0.2 }}
                  className="w-12 h-12 rounded-full bg-gradient-to-br from-gold-light via-gold to-gold-dark flex items-center justify-center shadow-lg relative z-10 text-[#02120b]"
                >
                  <Check className="w-6 h-6 stroke-[3]" />
                </motion.div>
                <div className="absolute inset-0 rounded-full bg-gold/15 animate-ping opacity-60 pointer-events-none" />
              </div>

              <h4 className="text-peach font-cormorant text-xs tracking-[0.3em] uppercase mb-1 font-semibold animate-pulse">
                {formData.attendance === "attending" ? t.statusAttending : t.statusDeclined}
              </h4>
              <p className="text-xs text-[#fbf9f4]/60 font-sans tracking-wide max-w-xs mx-auto mt-2 leading-relaxed">
                {formData.attendance === "attending" ? t.thankYouAttending : t.thankYouDeclined}
              </p>
            </div>

            {/* The Luxury Digital Ticket Pass */}
            {formData.attendance === "attending" && (
              <div className="w-full px-6 pb-6 mt-2 relative select-none">
                
                {/* Perforated ticket divider lines (semi-circle ticket cutouts) */}
                <div className="absolute left-0 top-[90px] -translate-x-1/2 w-6 h-6 rounded-full bg-[#02120b] border-r border-gold/45 z-10" />
                <div className="absolute right-0 top-[90px] translate-x-1/2 w-6 h-6 rounded-full bg-[#02120b] border-l border-gold/45 z-10" />

                <div className="border border-gold/30 rounded-xl bg-black/45 overflow-hidden shadow-2xl relative">
                  
                  {/* Gold Foil Pattern Overlay */}
                  <div className="absolute inset-0 bg-sparkles opacity-10 pointer-events-none" />

                  {/* Ticket Header Stub */}
                  <div className="p-4 bg-[var(--color-navy)]/60 border-b border-dashed border-gold/30 flex flex-col items-center">
                    <span className="text-[9px] tracking-[0.35em] text-gold font-semibold font-cormorant mb-1">
                      {t.ticketTitle}
                    </span>
                    <h3 className="text-lg font-cinzel text-gold-light tracking-widest font-semibold">
                      {t.monogram}
                    </h3>
                    <p className="text-[10px] text-[#fbf9f4]/50 font-sans tracking-widest uppercase mt-0.5">
                      {t.couple}
                    </p>
                  </div>

                  {/* Perforated line effect */}
                  <div className="w-full flex justify-between items-center px-1 py-1">
                    <div className="w-full border-t border-dashed border-gold/20" />
                  </div>

                  {/* Ticket Main Stub Body */}
                  <div className="p-5 flex flex-col gap-4 text-left">
                    
                    {/* Guest Name & Status */}
                    <div className="grid grid-cols-2 gap-4 border-b border-gold/10 pb-3">
                      <div>
                        <span className="text-[8px] tracking-widest text-[#fbf9f4]/40 font-sans uppercase">
                          {t.guestNameLabel}
                        </span>
                        <p className="text-xs text-gold-light font-playfair font-semibold truncate uppercase mt-0.5">
                          {guestName}
                        </p>
                      </div>
                      <div>
                        <span className="text-[8px] tracking-widest text-[#fbf9f4]/40 font-sans uppercase">
                          {t.statusLabel}
                        </span>
                        <p className="text-xs text-[#fbf9f4] font-playfair font-semibold uppercase mt-0.5 flex items-center gap-1">
                          <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse" />
                          <span>{t.statusAttendingVal}</span>
                        </p>
                      </div>
                    </div>

                    {/* Preferences */}
                    <div className="grid grid-cols-2 gap-4 border-b border-gold/10 pb-3">
                      <div>
                        <span className="text-[8px] tracking-widest text-[#fbf9f4]/40 font-sans uppercase">
                          {t.guestsLabel}
                        </span>
                        <p className="text-xs text-[#fbf9f4] font-playfair font-semibold mt-0.5">
                          {formData.totalGuests === 1 ? `1 GUEST` : `${formData.totalGuests} GUESTS`}
                        </p>
                      </div>
                      <div>
                        <span className="text-[8px] tracking-widest text-[#fbf9f4]/40 font-sans uppercase">
                          {t.mealLabel}
                        </span>
                        <p className="text-xs text-gold-light font-playfair font-semibold mt-0.5 truncate uppercase">
                          {formData.dietaryPreference}
                        </p>
                      </div>
                    </div>

                    {/* Wedding Schedule */}
                    <div className="border-b border-gold/10 pb-3">
                      <span className="text-[8px] tracking-widest text-[#fbf9f4]/40 font-sans uppercase">
                        SCHEDULE &amp; VENUE
                      </span>
                      <p className="text-[10px] text-[#fbf9f4]/90 font-sans font-semibold mt-0.5 tracking-wider">
                        {t.weddingDate}
                      </p>
                      <p className="text-[9px] text-peach font-semibold tracking-wider">
                        {t.weddingTime}
                      </p>
                      <p className="text-[9px] text-gold/80 font-sans tracking-widest uppercase mt-0.5">
                        {t.venue}
                      </p>
                    </div>

                    {/* Ticket Bottom QR Stub */}
                    <div className="flex items-center justify-between mt-2 pt-2">
                      <div className="flex flex-col">
                        <span className="text-[8px] tracking-[0.25em] text-gold font-semibold font-cormorant uppercase">
                          SECURE GATE PASS
                        </span>
                        <span className="text-[7px] text-[#fbf9f4]/35 font-sans mt-0.5 tracking-widest">
                          SYSTEM: KNEXA_v16_DEMO
                        </span>
                        <span className="text-[7px] text-emerald-400 font-sans tracking-widest">
                          STATUS: VERIFIED
                        </span>
                      </div>

                      {/* Stunning vector geometric QR code representational SVG */}
                      <div className="w-16 h-16 p-1.5 bg-white rounded-lg flex items-center justify-center shadow-lg border border-gold/30">
                        <svg viewBox="0 0 100 100" className="w-full h-full text-black">
                          {/* Outer frame */}
                          <rect x="0" y="0" width="25" height="25" fill="currentColor" />
                          <rect x="3" y="3" width="19" height="19" fill="white" />
                          <rect x="7" y="7" width="11" height="11" fill="currentColor" />

                          <rect x="75" y="0" width="25" height="25" fill="currentColor" />
                          <rect x="78" y="3" width="19" height="19" fill="white" />
                          <rect x="82" y="7" width="11" height="11" fill="currentColor" />

                          <rect x="0" y="75" width="25" height="25" fill="currentColor" />
                          <rect x="3" y="78" width="19" height="19" fill="white" />
                          <rect x="7" y="82" width="11" height="11" fill="currentColor" />

                          {/* Alignment marker */}
                          <rect x="70" y="70" width="10" height="10" fill="currentColor" />
                          <rect x="72" y="72" width="6" height="6" fill="white" />
                          <rect x="74" y="74" width="2" height="2" fill="currentColor" />

                          {/* Random noise pixels for authentic high-fidelity look */}
                          <rect x="35" y="5" width="5" height="5" fill="currentColor" />
                          <rect x="45" y="10" width="5" height="10" fill="currentColor" />
                          <rect x="55" y="0" width="10" height="5" fill="currentColor" />
                          <rect x="30" y="20" width="15" height="5" fill="currentColor" />
                          <rect x="60" y="20" width="5" height="10" fill="currentColor" />

                          <rect x="5" y="35" width="5" height="10" fill="currentColor" />
                          <rect x="15" y="45" width="10" height="5" fill="currentColor" />
                          <rect x="0" y="60" width="10" height="5" fill="currentColor" />
                          <rect x="20" y="55" width="5" height="15" fill="currentColor" />

                          <rect x="35" y="35" width="10" height="10" fill="currentColor" />
                          <rect x="50" y="35" width="10" height="5" fill="currentColor" />
                          <rect x="40" y="50" width="15" height="5" fill="currentColor" />
                          <rect x="35" y="60" width="5" height="10" fill="currentColor" />

                          <rect x="80" y="35" width="15" height="5" fill="currentColor" />
                          <rect x="75" y="45" width="5" height="15" fill="currentColor" />
                          <rect x="90" y="55" width="10" height="10" fill="currentColor" />
                          <rect x="85" y="85" width="15" height="5" fill="currentColor" />
                          <rect x="35" y="85" width="15" height="10" fill="currentColor" />
                          <rect x="55" y="75" width="10" height="5" fill="currentColor" />
                          <rect x="50" y="85" width="15" height="5" fill="currentColor" />
                        </svg>
                      </div>
                    </div>

                  </div>

                </div>
              </div>
            )}

            {/* Interactive Actions Panel */}
            <div className="w-full px-6 pb-8 flex flex-col gap-3">
              {formData.attendance === "attending" && (
                <motion.button
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  onClick={() => window.open(getGoogleCalendarUrl(), "_blank")}
                  className="w-full py-4 rounded-xl bg-gradient-to-r from-gold-dark via-gold to-gold-light text-[#02120b] font-bold text-xs uppercase tracking-[0.2em] font-cormorant shadow-lg hover:shadow-[0_0_20px_rgba(212,175,55,0.3)] transition-all duration-300 border border-gold/15 cursor-pointer flex items-center justify-center gap-2"
                >
                  <Calendar className="w-4 h-4" />
                  <span>{t.googleCalendarBtn}</span>
                </motion.button>
              )}

              <motion.button
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                onClick={onClose}
                className="w-full py-4 rounded-xl border border-gold/30 hover:border-gold/60 bg-black/30 hover:bg-black/45 text-gold-light font-bold text-xs uppercase tracking-[0.2em] font-cormorant transition-all duration-300 shadow-md cursor-pointer flex items-center justify-center gap-2"
              >
                <span>{t.closeBtn}</span>
                <ArrowRight className="w-4 h-4" />
              </motion.button>
            </div>

          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
}
