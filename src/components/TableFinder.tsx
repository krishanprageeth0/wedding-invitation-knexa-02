"use client";

import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Search, Map, Award, HelpCircle } from "lucide-react";
import { GoldLeafDivider, GoldVineCorner } from "./Ornaments";

interface TableFinderProps {
  lang?: string;
}

interface TableResult {
  tableName: string;
  location: string;
  notes: string;
  tableNameSi: string;
  locationSi: string;
  notesSi: string;
}

export default function TableFinder({ lang = "en" }: TableFinderProps) {
  const isSinhala = lang === "si";
  const [searchQuery, setSearchQuery] = useState("");
  const [result, setResult] = useState<TableResult | null>(null);
  const [searched, setSearched] = useState(false);

  const tableData: Record<string, TableResult> = {
    amara: {
      tableName: "Table 04",
      location: "Near the Dance Floor",
      notes: "Enjoy the wedding highlights and evening dance beats!",
      tableNameSi: "මේසය 04",
      locationSi: "නර්තන පථය අසල",
      notesSi: "මංගල උත්සවයේ විශේෂ අවස්ථා සහ රාත්‍රී නර්තන රිද්මයන් විඳගන්න!"
    },
    sunil: {
      tableName: "Table 04",
      location: "Near the Dance Floor",
      notes: "Enjoy the wedding highlights and evening dance beats!",
      tableNameSi: "මේසය 04",
      locationSi: "නර්තන පථය අසල",
      notesSi: "මංගල උත්සවයේ විශේෂ අවස්ථා සහ රාත්‍රී නර්තන රිද්මයන් විඳගන්න!"
    },
    chathura: {
      tableName: "Table 01",
      location: "VVIP Area - Near the Head Table",
      notes: "Front row access to the couple's speeches and traditional rituals.",
      tableNameSi: "මේසය 01",
      locationSi: "VVIP කලාපය - ප්‍රධාන මේසය අසල",
      notesSi: "මනාල යුවළගේ කතා සහ සාම්ප්‍රදායික චාරිත්‍ර ඉදිරි පෙළ සිටම නරඹන්න."
    },
    nimal: {
      tableName: "Table 02",
      location: "Family Section - Left Wing",
      notes: "Reserved for immediate family members and close relatives.",
      tableNameSi: "මේසය 02",
      locationSi: "පවුලේ සාමාජිකයින්ගේ කලාපය - වම් පස",
      notesSi: "පවුලේ ළඟම හිතවතුන් සහ ඥාතීන් සඳහා වෙන් කර ඇත."
    },
    kamal: {
      tableName: "Table 03",
      location: "Friends Section - Right Wing",
      notes: "Seating group for the couple's university colleagues and friends.",
      tableNameSi: "මේසය 03",
      locationSi: "මිතුරන්ගේ කලාපය - දකුණු පස",
      notesSi: "විශ්වවිද්‍යාල සහ පැරණි මිතුරන් සඳහා වෙන් කර ඇති කලාපයයි."
    }
  };

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    const query = searchQuery.trim().toLowerCase();
    
    if (!query) {
      setResult(null);
      setSearched(false);
      return;
    }

    if (tableData[query]) {
      setResult(tableData[query]);
    } else {
      // Premium interactive fallback
      setResult({
        tableName: "Table 05",
        location: "Main Seating Area",
        notes: `Welcome, ${searchQuery}! You are placed in the main guest section.`,
        tableNameSi: "මේසය 05",
        locationSi: "ප්‍රධාන ආසන කලාපය",
        notesSi: `සාදරයෙන් පිළිගනිමු, ${searchQuery}! ඔබ ප්‍රධාන අමුත්තන්ගේ කලාපයේ අසුන් ගන්වා ඇත.`
      });
    }
    setSearched(true);
  };

  return (
    <section id="table-finder" className="relative py-28 px-4 bg-[#02120b] overflow-hidden bg-sparkles flex flex-col items-center">
      <div className="absolute top-0 inset-x-0 h-[1px] bg-gradient-to-r from-transparent via-gold/25 to-transparent" />
      
      {/* Background ambient lighting */}
      <div className="absolute bottom-1/3 left-1/3 -translate-x-[50%] w-96 h-96 bg-gold/5 rounded-full blur-3xl pointer-events-none" />
      
      <GoldVineCorner position="bottom-left" className="opacity-25 scale-75" />
      <GoldVineCorner position="top-right" className="opacity-25 scale-75" />

      <div className="max-w-xl w-full mx-auto relative z-10">
        
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="text-center mb-12 flex flex-col items-center select-none"
        >
          <span className="text-peach tracking-[0.3em] text-xs font-semibold uppercase font-cormorant block mb-3 animate-pulse">
            {isSinhala ? "ඇසුරුම් සලසුම්කරණය" : "Interactive Seating"}
          </span>
          <h2 className="text-3xl md:text-5xl font-cinzel font-normal text-[#fbf9f4] tracking-wider leading-tight">
            {isSinhala ? "ආසන සෙවුම" : "Table Finder"}
          </h2>
          <GoldLeafDivider className="mt-4 opacity-75" />
          <p className="text-xs md:text-sm text-[#fbf9f4]/60 font-playfair mt-4 max-w-sm mx-auto leading-relaxed tracking-wider uppercase">
            {isSinhala 
              ? "ඔබගේ ආසනය පහසුවෙන් සොයා ගැනීමට ඔබගේ නම පහතින් ටයිප් කරන්න." 
              : "Discover your designated table and map layout instantly before arriving."}
          </p>
        </motion.div>

        {/* Floating Seating Search Card */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.2, duration: 1 }}
          className="relative rounded-2xl glass p-8 md:p-10 shadow-2xl overflow-hidden"
        >
          <div className="absolute top-4 left-4 w-5 h-5 border-t border-l border-gold/40 rounded-tl-sm" />
          <div className="absolute top-4 right-4 w-5 h-5 border-t border-r border-gold/40 rounded-tr-sm" />
          <div className="absolute bottom-4 left-4 w-5 h-5 border-b border-l border-gold/40 rounded-bl-sm" />
          <div className="absolute bottom-4 right-4 w-5 h-5 border-b border-r border-gold/40 rounded-br-sm" />

          <form onSubmit={handleSearch} className="flex flex-col gap-6 relative z-10">
            <div className="flex flex-col">
              <label className="text-xs uppercase tracking-widest text-gold-light/95 font-medium font-cormorant mb-2">
                {isSinhala ? "අමුත්තාගේ නම" : "Guest Name"}
              </label>
              <div className="relative">
                <input
                  type="text"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  placeholder={isSinhala ? "Amara හෝ Sunil ලෙස ටයිප් කරන්න..." : "Type 'Amara' or 'Sunil' for testing..."}
                  className="w-full pl-12 pr-4 py-3.5 rounded-lg border border-gold/20 bg-black/45 text-[#fbf9f4] placeholder-[#fbf9f4]/35 font-playfair text-sm focus:outline-none focus:border-gold focus:ring-1 focus:ring-gold transition-all duration-300 shadow-[inset_0_1px_3px_rgba(0,0,0,0.5)]"
                />
                <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-gold/60" />
              </div>
            </div>

            <motion.button
              whileHover={{ scale: 1.01 }}
              whileTap={{ scale: 0.99 }}
              type="submit"
              className="py-4 rounded-lg bg-gradient-to-r from-gold-dark to-gold text-[#02120b] hover:text-[#02120b] hover:from-gold hover:to-gold-light font-bold text-xs uppercase tracking-[0.25em] font-cormorant transition-all duration-300 shadow-lg hover:shadow-[0_0_25px_rgba(212,175,55,0.4)] border border-gold/10 cursor-pointer flex items-center justify-center gap-2"
            >
              <Search className="w-3.5 h-3.5" />
              <span>{isSinhala ? "මේසය සොයන්න" : "Search Table"}</span>
            </motion.button>
          </form>

          {/* Results Block */}
          <AnimatePresence>
            {searched && result && (
              <motion.div
                initial={{ opacity: 0, height: 0, marginTop: 0 }}
                animate={{ opacity: 1, height: "auto", marginTop: 24 }}
                exit={{ opacity: 0, height: 0, marginTop: 0 }}
                transition={{ duration: 0.5, ease: "easeInOut" }}
                className="overflow-hidden relative z-10"
              >
                <div className="p-6 bg-black/50 border border-gold/25 rounded-xl flex flex-col items-center text-center gap-4 relative overflow-hidden group">
                  <div className="absolute top-0 right-0 w-24 h-24 bg-gradient-to-br from-gold/10 to-transparent pointer-events-none" />
                  
                  {/* Decorative Icon */}
                  <div className="w-12 h-12 rounded-full border border-gold/25 flex items-center justify-center bg-gold/10 text-gold shadow-md">
                    <Map className="w-5 h-5 animate-pulse" />
                  </div>

                  <div className="flex flex-col items-center">
                    <span className="text-[10px] tracking-[0.25em] uppercase text-peach font-semibold font-cormorant">
                      {isSinhala ? "ලබා දී ඇති මේසය" : "YOUR DESIGNATED TABLE"}
                    </span>
                    <h4 className="text-gold-light text-2xl md:text-3xl font-cinzel tracking-wider leading-none mt-2 font-semibold">
                      {isSinhala ? result.tableNameSi : result.tableName}
                    </h4>
                    <p className="text-xs text-[#fbf9f4]/80 font-playfair uppercase tracking-widest mt-2 bg-gold/10 px-3 py-1 rounded-full border border-gold/10 flex items-center gap-1.5">
                      <Award className="w-3 h-3 text-gold" />
                      <span>{isSinhala ? result.locationSi : result.location}</span>
                    </p>
                  </div>

                  <div className="h-[1px] w-2/3 bg-gold/20" />

                  <p className="text-xs text-[#fbf9f4]/60 leading-relaxed font-playfair italic max-w-xs uppercase">
                    {isSinhala ? result.notesSi : result.notes}
                  </p>

                  <div className="text-[9px] text-[#fbf9f4]/35 font-sans tracking-widest uppercase flex items-center gap-1">
                    <HelpCircle className="w-2.5 h-2.5" />
                    <span>{isSinhala ? "කෝඩිනේටර්වරුන් හමුවී සහාය ලබාගත හැක" : "Coordinates on map shown near the grand lobby entrance"}</span>
                  </div>
                </div>
              </motion.div>
            )}
          </AnimatePresence>

        </motion.div>
      </div>
    </section>
  );
}
