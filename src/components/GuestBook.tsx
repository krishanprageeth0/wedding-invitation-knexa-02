"use client";

import React, { useState, FormEvent } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Heart, MessageSquare, Loader2, Sparkles } from "lucide-react";
import confetti from "canvas-confetti";
import { GoldVineCorner, GoldLeafDivider } from "./Ornaments";

interface GuestBookProps {
  lang?: string;
}

interface Blessing {
  id: number;
  name: string;
  message: string;
  date: string;
  isNew?: boolean;
}

const translations = {
  en: {
    category: "VIRTUAL GUEST BOOK",
    title: "Botanical Blessings",
    description: "Leave your warm wishes and blessings for Roshan & Thisuri. Your words will join our botanical marquee forever.",
    nameLabel: "Your Name",
    namePlaceholder: "Enter your name...",
    messageLabel: "Your Heartfelt Blessing",
    messagePlaceholder: "Write your wishes here...",
    buttonText: "Send Blessing",
    submitting: "Recording blessing on Knexa...",
    successMsg: "Blessing posted successfully!",
  },
  si: {
    category: "සජීවී අමුත්තන්ගේ සටහන් පොත",
    title: "දිව්‍යමය සුබ පැතුම්",
    description: "රොෂාන් සහ තිසුරි යුවළ වෙනුවෙන් ඔබේ ආදරණීය සුබ පැතුම් මෙතැනින් එක් කරන්න. ඒවා අපගේ සජීවී තීරුවේ දිස්වනු ඇත.",
    nameLabel: "ඔබේ නම",
    namePlaceholder: "ඔබේ නම මෙතැනින් ලියන්න...",
    messageLabel: "ඔබේ ආශිර්වාද පණිවිඩය",
    messagePlaceholder: "ඔබේ සුබ පැතුම් මෙතැනින් ලියන්න...",
    buttonText: "සුබ පැතුම එක් කරන්න",
    submitting: "සුබ පැතුම් Knexa පද්ධතියට එක් වෙමින්...",
    successMsg: "සුබ පැතුම සාර්ථකව එක් කරන ලදී!",
  }
};

export default function GuestBook({ lang = "en" }: GuestBookProps) {
  const isSinhala = lang === "si";
  const t = isSinhala ? translations.si : translations.en;

  const [blessings, setBlessings] = useState<Blessing[]>([
    {
      id: 1,
      name: "Amara & Sunil",
      message: "Wishing you a lifetime of emerald love, laughter, and endless joy! You both look magnificent together.",
      date: "12 Dec 2026",
      isNew: false
    },
    {
      id: 2,
      name: "Kasun & Minoli",
      message: "රොෂාන් සහ තිසුරි, ඔබ දෙපළගේ විවාහ ජීවිතය සතුටින් හා ආදරයෙන් පිරි වාසනාවන්ත එකක් වේවා කියා පතමු!",
      date: "12 Dec 2026",
      isNew: false
    },
    {
      id: 3,
      name: "Sarah Jenkins",
      message: "The most stunning digital invitation I have ever seen. Sending all my love from London! Happy wedding day!",
      date: "12 Dec 2026",
      isNew: false
    },
    {
      id: 4,
      name: "Nihal Perera",
      message: "Shangri-La හි පැවැත්වෙන මෙම රාජකීය උත්සවයට සහභාගී වීමට ලැබීම මහත් ගෞරවයක්. සුභ මංගල්‍යයක් වේවා!",
      date: "12 Dec 2026",
      isNew: false
    },
    {
      id: 5,
      name: "Chathura & Piyumi",
      message: "May the lush emerald gardens of life bring you both boundless blessings, harmony, and grand prosperity.",
      date: "12 Dec 2026",
      isNew: false
    },
    {
      id: 6,
      name: "Dr. Rohitha Bandara",
      message: "මංගල දිනය මෙන්ම ඔබේ ඉදිරි හෙට දවසත් තාරකාවන් සේ ආලෝකමත් වේවා! මගේ හදපිරි සුබ පැතුම්!",
      date: "12 Dec 2026",
      isNew: false
    }
  ]);

  const [name, setName] = useState("");
  const [message, setMessage] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [success, setSuccess] = useState(false);

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();
    if (!name.trim() || !message.trim()) return;

    setIsSubmitting(true);

    // Simulate API storage delay
    setTimeout(() => {
      const newBlessing: Blessing = {
        id: Date.now(),
        name: name.trim(),
        message: message.trim(),
        date: "12 Dec 2026",
        isNew: true
      };

      setBlessings((prev) => [newBlessing, ...prev]);
      setIsSubmitting(false);
      setName("");
      setMessage("");
      setSuccess(true);

      // Heart confetti explosion
      confetti({
        particleCount: 60,
        spread: 60,
        colors: ["#b87d6c", "#d4af37", "#fbf9f4"],
        origin: { y: 0.8 }
      });

      // Clear success notification
      setTimeout(() => setSuccess(false), 3000);
    }, 1500);
  };

  return (
    <section id="guestbook" className="relative py-28 px-4 bg-[#02120b] overflow-hidden bg-sparkles flex flex-col items-center">
      <div className="absolute top-0 inset-x-0 h-[1px] bg-gradient-to-r from-transparent via-gold/25 to-transparent" />
      
      {/* Background ambient lighting */}
      <div className="absolute bottom-1/2 right-1/3 -translate-x-[50%] w-96 h-96 bg-gold/5 rounded-full blur-3xl pointer-events-none" />
      
      <GoldVineCorner position="bottom-left" className="opacity-20 scale-75" />
      <GoldVineCorner position="top-right" className="opacity-20 scale-75" />

      <div className="max-w-4xl w-full mx-auto relative z-10">
        
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="text-center mb-12 flex flex-col items-center select-none"
        >
          <span className="text-peach tracking-[0.3em] text-xs font-semibold uppercase font-cormorant block mb-3 animate-pulse">
            {t.category}
          </span>
          <h2 className="text-3xl md:text-5xl font-cinzel font-normal text-[#fdfbf7] tracking-wider leading-tight">
            {t.title}
          </h2>
          <GoldLeafDivider className="mt-4 opacity-75" />
          <p className="text-xs md:text-sm text-[#fdfbf7]/60 font-playfair mt-4 max-w-lg mx-auto leading-relaxed tracking-wider uppercase">
            {t.description}
          </p>
        </motion.div>

        {/* Real-time Infinite Scrolling Marquee */}
        <div className="w-screen relative left-1/2 -translate-x-1/2 overflow-hidden py-6 mb-16 select-none bg-black/20 border-y border-gold/10">
          <div className="animate-marquee gap-6 px-4">
            {/* Double the list to support perfect infinite scroll loop */}
            {[...blessings, ...blessings].map((item, idx) => (
              <div
                key={`${item.id}-${idx}`}
                className={`w-[290px] md:w-[340px] shrink-0 rounded-xl p-5 md:p-6 glass transition-all duration-300 ${
                  item.isNew 
                    ? "border-gold/60 animate-pulse-gold bg-gold/5" 
                    : "border-gold/15 bg-navy/40"
                }`}
              >
                <div className="flex justify-between items-start mb-3">
                  <div className="flex items-center gap-2">
                    <div className="w-8 h-8 rounded-full border border-gold/20 flex items-center justify-center bg-gold/10 text-gold text-xs font-cinzel font-bold">
                      {item.name.substring(0, 2).toUpperCase()}
                    </div>
                    <div className="flex flex-col">
                      <span className="text-xs font-semibold font-playfair text-gold-light truncate max-w-[150px]">
                        {item.name}
                      </span>
                      <span className="text-[9px] text-[#fdfbf7]/40 font-sans tracking-wide uppercase">
                        {item.date}
                      </span>
                    </div>
                  </div>
                  <Heart className={`w-3.5 h-3.5 ${item.isNew ? "text-peach fill-peach animate-bounce" : "text-gold/45"}`} />
                </div>
                
                <p className="text-xs text-[#fdfbf7]/75 font-playfair leading-relaxed tracking-wide italic font-light h-[64px] overflow-y-auto">
                  "{item.message}"
                </p>
              </div>
            ))}
          </div>
        </div>

        {/* Blessing Submission Form */}
        <div className="max-w-xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.2, duration: 1 }}
            className="relative rounded-2xl glass p-8 md:p-10 shadow-2xl overflow-hidden"
          >
            {/* Inner Golden Corners */}
            <div className="absolute top-4 left-4 w-5 h-5 border-t border-l border-gold/40 rounded-tl-sm" />
            <div className="absolute top-4 right-4 w-5 h-5 border-t border-r border-gold/40 rounded-tr-sm" />
            <div className="absolute bottom-4 left-4 w-5 h-5 border-b border-l border-gold/40 rounded-bl-sm" />
            <div className="absolute bottom-4 right-4 w-5 h-5 border-b border-r border-gold/40 rounded-br-sm" />

            {/* Submitting Overlay */}
            {isSubmitting && (
              <div className="absolute inset-0 bg-[#02120b]/90 backdrop-blur-sm z-20 flex flex-col items-center justify-center">
                <Loader2 className="w-12 h-12 text-gold animate-spin mb-4" />
                <p className="text-xs md:text-sm text-[#fdfbf7]/80 font-cormorant font-semibold tracking-widest uppercase animate-pulse">
                  {t.submitting}
                </p>
              </div>
            )}

            <form onSubmit={handleSubmit} className="flex flex-col gap-5 relative z-10">
              
              {/* Name field */}
              <div className="flex flex-col">
                <label htmlFor="guestName" className="text-xs uppercase tracking-widest text-gold-light/95 font-medium font-cormorant mb-2">
                  {t.nameLabel} *
                </label>
                <input
                  id="guestName"
                  type="text"
                  required
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  placeholder={t.namePlaceholder}
                  className="px-4 py-3 rounded-lg border border-gold/20 bg-black/45 text-[#fdfbf7] placeholder-[#fdfbf7]/30 font-playfair text-sm focus:outline-none focus:border-gold focus:ring-1 focus:ring-gold transition-all duration-300 shadow-[inset_0_1px_3px_rgba(0,0,0,0.5)]"
                />
              </div>

              {/* Message field */}
              <div className="flex flex-col">
                <label htmlFor="guestMessage" className="text-xs uppercase tracking-widest text-gold-light/95 font-medium font-cormorant mb-2">
                  {t.messageLabel} *
                </label>
                <textarea
                  id="guestMessage"
                  required
                  rows={4}
                  value={message}
                  onChange={(e) => setMessage(e.target.value)}
                  placeholder={t.messagePlaceholder}
                  className="px-4 py-3 rounded-lg border border-gold/20 bg-black/45 text-[#fdfbf7] placeholder-[#fdfbf7]/30 font-playfair text-sm focus:outline-none focus:border-gold focus:ring-1 focus:ring-gold transition-all duration-300 resize-none shadow-[inset_0_1px_3px_rgba(0,0,0,0.5)]"
                />
              </div>

              {/* Success message */}
              <AnimatePresence>
                {success && (
                  <motion.div
                    initial={{ opacity: 0, y: -10 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -10 }}
                    className="flex items-center justify-center gap-1.5 p-3 rounded bg-gold/10 border border-gold/20 text-gold-light text-xs font-playfair uppercase tracking-wider text-center"
                  >
                    <Sparkles className="w-4 h-4 text-gold animate-pulse" />
                    <span>{t.successMsg}</span>
                  </motion.div>
                )}
              </AnimatePresence>

              {/* Submit button */}
              <motion.button
                whileHover={{ scale: 1.01 }}
                whileTap={{ scale: 0.99 }}
                type="submit"
                className="mt-2 py-4 rounded-lg bg-gradient-to-r from-gold-dark to-gold text-[#02120b] hover:text-[#02120b] hover:from-gold hover:to-gold-light font-bold text-xs uppercase tracking-[0.25em] font-cormorant transition-all duration-300 shadow-lg hover:shadow-[0_0_25px_rgba(212,175,55,0.4)] border border-gold/10 cursor-pointer flex items-center justify-center gap-2"
              >
                <MessageSquare className="w-3.5 h-3.5" />
                <span>{t.buttonText}</span>
              </motion.button>

            </form>
          </motion.div>
        </div>

      </div>
    </section>
  );
}
