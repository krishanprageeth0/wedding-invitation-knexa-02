"use client";

import React, { useState, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { UploadCloud, Camera, CheckCircle2, FileImage, AlertCircle, Loader2 } from "lucide-react";
import confetti from "canvas-confetti";
import { GoldVineCorner, GoldLeafDivider } from "./Ornaments";

interface PhotoDropZoneProps {
  lang?: string;
}

const translations = {
  en: {
    category: "GUEST MOMENTS",
    title: "Botanical Drop Zone",
    description: "Capture the magic! Upload your candid wedding photos and videos to Knexa's live digital album.",
    dragText: "Drag & drop photos/videos here",
    orText: "or click to browse from device",
    supportedText: "Supports JPG, PNG, HEIC & MP4 (Up to 100MB)",
    uploading: "Uploading to Knexa Secure Cloud...",
    verifying: "Verifying file format & resolution...",
    optimizing: "Optimizing image compression...",
    success: "Saved to Roshan & Thisuri's Gallery!",
    uploadAnother: "Upload Another File",
    sizeError: "File exceeds 100MB limit.",
  },
  si: {
    category: "මතකයන් එක් කරන්න",
    title: "බොටැනිකල් ඩ්‍රොප් සෝන්",
    description: "ඔබ ලබාගත් සුන්දර මංගල ඡායාරූප සහ වීඩියෝ අපගේ සජීවී ඩිජිටල් ඇල්බමයට මෙතැනින් උඩුගත කරන්න.",
    dragText: "ඡායාරූප හෝ වීඩියෝ මෙතැනට ඇද දමන්න",
    orText: "නැතහොත් උපාංගයෙන් තෝරා ගැනීමට ක්ලික් කරන්න",
    supportedText: "JPG, PNG, HEIC සහ MP4 සඳහා සහය දක්වයි (උපරිම 100MB)",
    uploading: "Knexa සුරක්ෂිත ක්ලවුඩ් වෙත උඩුගත වෙමින්...",
    verifying: "ගොනු ආකෘතිය සහ විසර්ජනය පරීක්ෂා කරමින්...",
    optimizing: "ඡායාරූප සම්පීඩනය ප්‍රශස්ත කරමින්...",
    success: "රොෂාන් සහ තිසුරිගේ ගැලරියට සුරැකුණි!",
    uploadAnother: "තවත් ගොනුවක් උඩුගත කරන්න",
    sizeError: "ගොනුව 100MB සීමාව ඉක්මවා ඇත.",
  }
};

export default function PhotoDropZone({ lang = "en" }: PhotoDropZoneProps) {
  const isSinhala = lang === "si";
  const t = isSinhala ? translations.si : translations.en;

  const [isDragActive, setIsDragActive] = useState(false);
  const [uploadState, setUploadState] = useState<"idle" | "uploading" | "success">("idle");
  const [progress, setProgress] = useState(0);
  const [statusText, setStatusText] = useState("");
  const [fileName, setFileName] = useState("");
  const [fileSize, setFileSize] = useState("");
  const [errorMsg, setErrorMsg] = useState("");
  
  const fileInputRef = useRef<HTMLInputElement | null>(null);

  const formatBytes = (bytes: number, decimals = 2) => {
    if (bytes === 0) return "0 Bytes";
    const k = 1024;
    const dm = decimals < 0 ? 0 : decimals;
    const sizes = ["Bytes", "KB", "MB", "GB"];
    const i = Math.floor(Math.log(bytes) / Math.log(k));
    return parseFloat((bytes / Math.pow(k, i)).toFixed(dm)) + " " + sizes[i];
  };

  const handleDrag = (e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    if (e.type === "dragenter" || e.type === "dragover") {
      setIsDragActive(true);
    } else if (e.type === "dragleave") {
      setIsDragActive(false);
    }
  };

  const processFile = (file: File) => {
    // 100MB size limit
    if (file.size > 100 * 1024 * 1024) {
      setErrorMsg(t.sizeError);
      return;
    }

    setErrorMsg("");
    setFileName(file.name);
    setFileSize(formatBytes(file.size));
    setUploadState("uploading");
    setProgress(0);
    setStatusText(t.uploading);

    // Simulate luxury upload sequence
    const duration = 2500; // 2.5 seconds
    const intervalTime = 50;
    const totalSteps = duration / intervalTime;
    let step = 0;

    const timer = setInterval(() => {
      step++;
      const currentProgress = Math.min(Math.round((step / totalSteps) * 100), 100);
      setProgress(currentProgress);

      // Dynamically update status texts
      if (currentProgress < 35) {
        setStatusText(t.uploading);
      } else if (currentProgress < 75) {
        setStatusText(t.verifying);
      } else if (currentProgress < 100) {
        setStatusText(t.optimizing);
      } else {
        clearInterval(timer);
        setStatusText(t.success);
        setUploadState("success");

        // Fire premium celestial confetti
        confetti({
          particleCount: 80,
          spread: 70,
          origin: { y: 0.7 },
          colors: ["#d4af37", "#b87d6c", "#e8c87a"],
        });
      }
    }, intervalTime);
  };

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setIsDragActive(false);

    if (e.dataTransfer.files && e.dataTransfer.files[0]) {
      processFile(e.dataTransfer.files[0]);
    }
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    e.preventDefault();
    if (e.target.files && e.target.files[0]) {
      processFile(e.target.files[0]);
    }
  };

  const onButtonClick = () => {
    fileInputRef.current?.click();
  };

  const resetUpload = () => {
    setUploadState("idle");
    setProgress(0);
    setFileName("");
    setFileSize("");
    setErrorMsg("");
  };

  return (
    <section id="moments" className="relative py-28 px-4 bg-[#02120b] overflow-hidden bg-sparkles flex flex-col items-center">
      <div className="absolute top-0 inset-x-0 h-[1px] bg-gradient-to-r from-transparent via-gold/25 to-transparent" />
      
      {/* Background ambient lighting */}
      <div className="absolute top-1/2 left-2/3 -translate-x-[50%] w-96 h-96 bg-gold/5 rounded-full blur-3xl pointer-events-none" />
      
      {/* Ornaments for framing */}
      <GoldVineCorner position="top-left" className="opacity-20 scale-75" />
      <GoldVineCorner position="bottom-right" className="opacity-20 scale-75" />

      <div className="max-w-xl w-full mx-auto relative z-10">
        
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
          <p className="text-xs md:text-sm text-[#fdfbf7]/60 font-playfair mt-4 max-w-sm mx-auto leading-relaxed tracking-wider uppercase">
            {t.description}
          </p>
        </motion.div>

        {/* Drop Zone Box */}
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

          <input
            ref={fileInputRef}
            type="file"
            className="hidden"
            accept="image/*,video/*"
            onChange={handleChange}
          />

          <AnimatePresence mode="wait">
            {uploadState === "idle" && (
              <motion.div
                key="idle"
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.95 }}
                transition={{ duration: 0.4 }}
                onDragEnter={handleDrag}
                onDragOver={handleDrag}
                onDragLeave={handleDrag}
                onDrop={handleDrop}
                onClick={onButtonClick}
                className={`flex flex-col items-center justify-center border-2 border-dashed rounded-xl py-12 px-6 text-center cursor-pointer transition-all duration-300 group ${
                  isDragActive
                    ? "border-gold bg-gold/10 shadow-[0_0_20px_rgba(212,175,55,0.2)]"
                    : "border-gold/25 bg-black/30 hover:border-gold/50 hover:bg-black/45"
                }`}
              >
                <div className="w-16 h-16 rounded-full border border-gold/30 flex items-center justify-center bg-gold/5 text-gold mb-6 shadow-md transition-all duration-300 group-hover:scale-110 group-hover:border-gold/60 group-hover:bg-gold/10">
                  <UploadCloud className="w-8 h-8" />
                </div>
                
                <p className="text-sm font-semibold font-playfair tracking-wide text-gold-light uppercase mb-2">
                  {t.dragText}
                </p>
                <p className="text-xs text-[#fdfbf7]/50 font-sans tracking-widest uppercase mb-4">
                  {t.orText}
                </p>
                <span className="text-[10px] text-[#fdfbf7]/40 font-sans tracking-wider">
                  {t.supportedText}
                </span>

                {errorMsg && (
                  <motion.div
                    initial={{ opacity: 0, y: 5 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="flex items-center gap-1.5 mt-4 text-rose-400 text-xs font-sans tracking-wide"
                  >
                    <AlertCircle className="w-3.5 h-3.5" />
                    <span>{errorMsg}</span>
                  </motion.div>
                )}
              </motion.div>
            )}

            {uploadState === "uploading" && (
              <motion.div
                key="uploading"
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.95 }}
                className="flex flex-col items-center py-10"
              >
                <div className="relative w-20 h-20 mb-6 flex items-center justify-center">
                  <Loader2 className="w-16 h-16 text-gold animate-spin stroke-[2]" />
                  <Camera className="w-6 h-6 text-gold absolute" />
                </div>

                <div className="w-full max-w-sm mb-4">
                  <div className="flex justify-between items-center text-xs text-[#fdfbf7]/60 mb-2 font-sans tracking-wider">
                    <span className="truncate max-w-[200px] font-medium text-gold-light/95 italic">{fileName}</span>
                    <span>{progress}%</span>
                  </div>
                  {/* Progress Bar Container */}
                  <div className="w-full h-2 bg-black/45 rounded-full overflow-hidden border border-gold/10">
                    <motion.div
                      className="h-full bg-gradient-to-r from-gold-dark via-gold to-gold-light rounded-full"
                      initial={{ width: "0%" }}
                      animate={{ width: `${progress}%` }}
                      transition={{ duration: 0.05 }}
                    />
                  </div>
                </div>

                <p className="text-xs uppercase tracking-widest text-[#fdfbf7]/80 font-cormorant font-semibold animate-pulse">
                  {statusText}
                </p>
                <span className="text-[10px] text-[#fdfbf7]/40 font-sans tracking-wide mt-1.5 uppercase">
                  {fileSize}
                </span>
              </motion.div>
            )}

            {uploadState === "success" && (
              <motion.div
                key="success"
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.95 }}
                className="flex flex-col items-center py-10 text-center"
              >
                <div className="relative w-20 h-20 mb-6 flex items-center justify-center">
                  <motion.div
                    initial={{ scale: 0 }}
                    animate={{ scale: 1 }}
                    transition={{ type: "spring", stiffness: 300, damping: 20 }}
                    className="w-16 h-16 rounded-full bg-gradient-to-br from-gold-light via-gold to-gold-dark flex items-center justify-center shadow-lg border border-gold-light/30 text-[#02120b]"
                  >
                    <CheckCircle2 className="w-10 h-10 stroke-[2.5]" />
                  </motion.div>
                  <div className="absolute inset-0 rounded-full bg-gold/15 animate-ping opacity-60 pointer-events-none" />
                </div>

                <h4 className="text-gold-light text-xl font-cinzel tracking-wider mb-2 font-normal">
                  {statusText}
                </h4>
                <p className="text-xs text-[#fdfbf7]/60 font-sans tracking-widest uppercase mb-8 max-w-xs">
                  {fileName} ({fileSize})
                </p>

                <motion.button
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  onClick={resetUpload}
                  className="px-6 py-3 rounded-lg border border-gold/40 text-gold hover:bg-gold hover:text-[#02120b] font-bold text-xs uppercase tracking-[0.2em] font-cormorant transition-all duration-300 shadow-md cursor-pointer"
                >
                  {t.uploadAnother}
                </motion.button>
              </motion.div>
            )}
          </AnimatePresence>

        </motion.div>
      </div>
    </section>
  );
}
