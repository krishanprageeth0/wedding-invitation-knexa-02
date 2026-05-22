"use client";

import React from "react";
import { motion } from "framer-motion";

// 1. Beautiful Corner Vines (sprouting organic leaves and curlicues)
interface CornerProps {
  position?: "top-left" | "top-right" | "bottom-left" | "bottom-right";
  className?: string;
  delay?: number;
}

export function GoldVineCorner({ position = "top-left", className = "", delay = 0 }: CornerProps) {
  let rotationClass = "";
  if (position === "top-right") rotationClass = "rotate-90 origin-top-right right-0 top-0";
  else if (position === "bottom-left") rotationClass = "-rotate-90 origin-bottom-left left-0 bottom-0";
  else if (position === "bottom-right") rotationClass = "rotate-180 origin-bottom-right right-0 bottom-0";
  else rotationClass = "left-0 top-0";

  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.85 }}
      whileInView={{ opacity: 0.65, scale: 1 }}
      viewport={{ once: true }}
      transition={{ duration: 1.8, delay, ease: "easeOut" }}
      className={`absolute w-32 h-32 md:w-40 md:h-40 pointer-events-none z-0 select-none animate-leaf-sway ${rotationClass} ${className}`}
    >
      <svg
        viewBox="0 0 200 200"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        className="w-full h-full text-gold opacity-90 drop-shadow-[0_2px_8px_rgba(201,169,110,0.2)]"
      >
        {/* Main stem curl */}
        <path
          d="M 5,5 Q 120,30 160,120 Q 170,140 185,185"
          stroke="currentColor"
          strokeWidth="1.5"
          strokeLinecap="round"
        />
        <path
          d="M 5,5 Q 70,10 110,70 Q 130,100 150,150"
          stroke="currentColor"
          strokeWidth="0.75"
          strokeDasharray="3 3"
          strokeLinecap="round"
        />
        {/* Swirly sub-stem 1 */}
        <path
          d="M 60,20 Q 100,5 120,40"
          stroke="currentColor"
          strokeWidth="1"
          strokeLinecap="round"
        />
        {/* Swirly sub-stem 2 */}
        <path
          d="M 120,70 Q 160,60 170,100 Q 175,120 160,135"
          stroke="currentColor"
          strokeWidth="1"
          strokeLinecap="round"
        />
        {/* Hand-drawn organic leaves */}
        {/* Leaf 1 */}
        <path
          d="M 30,10 C 40,0 50,5 45,15 C 40,25 30,20 30,10 Z"
          fill="currentColor"
          fillOpacity="0.12"
          stroke="currentColor"
          strokeWidth="1"
        />
        {/* Leaf 2 */}
        <path
          d="M 75,18 C 90,8 95,20 85,28 C 75,35 70,25 75,18 Z"
          fill="currentColor"
          fillOpacity="0.12"
          stroke="currentColor"
          strokeWidth="1"
        />
        {/* Leaf 3 */}
        <path
          d="M 118,30 C 135,25 138,40 125,48 C 112,55 110,40 118,30 Z"
          fill="currentColor"
          fillOpacity="0.12"
          stroke="currentColor"
          strokeWidth="1"
        />
        {/* Leaf 4 */}
        <path
          d="M 148,82 C 165,80 165,95 152,102 C 140,108 138,95 148,82 Z"
          fill="currentColor"
          fillOpacity="0.12"
          stroke="currentColor"
          strokeWidth="1"
        />
        {/* Leaf 5 */}
        <path
          d="M 160,130 C 180,135 175,150 160,152 C 145,154 148,140 160,130 Z"
          fill="currentColor"
          fillOpacity="0.12"
          stroke="currentColor"
          strokeWidth="1"
        />
        {/* Tiny buds/circles */}
        <circle cx="50" cy="8" r="2.5" fill="currentColor" />
        <circle cx="102" cy="12" r="2.5" fill="currentColor" />
        <circle cx="152" cy="50" r="3" fill="currentColor" />
        <circle cx="178" cy="115" r="2" fill="currentColor" />
      </svg>
    </motion.div>
  );
}

// 2. Beautiful Centered Botanical Divider (Sprouting leaves)
export function GoldLeafDivider({ className = "", delay = 0.2 }) {
  return (
    <motion.div
      initial={{ opacity: 0, scaleX: 0 }}
      whileInView={{ opacity: 1, scaleX: 1 }}
      viewport={{ once: true }}
      transition={{ duration: 1.4, delay, ease: "easeOut" }}
      className={`flex items-center justify-center gap-4 my-6 w-full max-w-[280px] ${className}`}
    >
      <div className="h-[1px] flex-1 bg-gradient-to-r from-transparent to-gold/60" />
      <svg
        viewBox="0 0 100 24"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        className="w-14 h-5 text-gold shrink-0 drop-shadow-[0_0_4px_rgba(201,169,110,0.3)]"
      >
        {/* Center stem */}
        <path d="M 5,12 Q 50,8 95,12" stroke="currentColor" strokeWidth="1" strokeLinecap="round" />
        {/* Leaf sprout center */}
        <path
          d="M 50,12 C 46,2 54,2 50,12 Z"
          fill="currentColor"
          fillOpacity="0.15"
          stroke="currentColor"
          strokeWidth="0.75"
        />
        {/* Left sprout */}
        <path
          d="M 32,10 C 26,4 32,0 35,8"
          stroke="currentColor"
          strokeWidth="0.75"
          strokeLinecap="round"
        />
        <circle cx="35" cy="8" r="1.5" fill="currentColor" />
        {/* Right sprout */}
        <path
          d="M 68,10 C 74,4 68,0 65,8"
          stroke="currentColor"
          strokeWidth="0.75"
          strokeLinecap="round"
        />
        <circle cx="65" cy="8" r="1.5" fill="currentColor" />
      </svg>
      <div className="h-[1px] flex-1 bg-gradient-to-r from-gold/60 to-transparent" />
    </motion.div>
  );
}

// 3. Artistic Botanical Arch/Oval Frame for Photos or Details
interface FrameProps {
  children: React.ReactNode;
  className?: string;
  delay?: number;
}

export function GoldLeafFrame({ children, className = "", delay = 0.3 }: FrameProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 1.6, delay, ease: "easeOut" }}
      className={`relative p-2 md:p-3 ${className}`}
    >
      {/* Decorative Gold Leaf Path Frame Wrapping the Container */}
      <svg
        viewBox="0 0 320 420"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        className="absolute inset-0 w-full h-full text-gold pointer-events-none z-10 opacity-75"
        preserveAspectRatio="none"
      >
        {/* Arch Border */}
        <path
          d="M 12,408 L 12,140 C 12,45 308,45 308,140 L 308,408 Z"
          stroke="currentColor"
          strokeWidth="1.25"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
        {/* Outer Fine Dotted Border */}
        <path
          d="M 6,414 L 6,138 C 6,35 314,35 314,138 L 314,414 Z"
          stroke="currentColor"
          strokeWidth="0.75"
          strokeDasharray="4 4"
          strokeOpacity="0.6"
        />
        
        {/* Left Side Foliage sprouting at base and arch top */}
        {/* Leaf Top Left */}
        <path
          d="M 28,100 C 10,90 15,75 30,85 C 40,92 35,102 28,100 Z"
          fill="currentColor"
          fillOpacity="0.15"
          stroke="currentColor"
          strokeWidth="0.75"
        />
        <path
          d="M 12,120 Q 25,115 32,95"
          stroke="currentColor"
          strokeWidth="1"
          strokeLinecap="round"
        />
        
        {/* Leaf Arch Peak Left */}
        <path
          d="M 85,45 C 75,25 90,20 95,35 C 98,45 90,50 85,45 Z"
          fill="currentColor"
          fillOpacity="0.15"
          stroke="currentColor"
          strokeWidth="0.75"
        />
        <path
          d="M 100,52 Q 95,35 80,38"
          stroke="currentColor"
          strokeWidth="1"
          strokeLinecap="round"
        />

        {/* Right Side Foliage */}
        {/* Leaf Top Right */}
        <path
          d="M 292,100 C 310,90 305,75 290,85 C 280,92 285,102 292,100 Z"
          fill="currentColor"
          fillOpacity="0.15"
          stroke="currentColor"
          strokeWidth="0.75"
        />
        <path
          d="M 308,120 Q 295,115 288,95"
          stroke="currentColor"
          strokeWidth="1"
          strokeLinecap="round"
        />
        
        {/* Leaf Arch Peak Right */}
        <path
          d="M 235,45 C 245,25 230,20 225,35 C 222,45 230,50 235,45 Z"
          fill="currentColor"
          fillOpacity="0.15"
          stroke="currentColor"
          strokeWidth="0.75"
        />
        <path
          d="M 220,52 Q 225,35 240,38"
          stroke="currentColor"
          strokeWidth="1"
          strokeLinecap="round"
        />

        {/* Base corner decorations */}
        <circle cx="12" cy="408" r="3" fill="currentColor" />
        <circle cx="308" cy="408" r="3" fill="currentColor" />
      </svg>
      
      {/* Framed Content */}
      <div className="relative z-0 overflow-hidden w-full h-full rounded-t-full rounded-b-lg">
        {children}
      </div>
    </motion.div>
  );
}
