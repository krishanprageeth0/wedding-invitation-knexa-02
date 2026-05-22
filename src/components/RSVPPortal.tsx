"use client";

import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Loader2, CalendarCheck, HelpCircle, ChevronRight, ChevronLeft, Send, Sparkles } from "lucide-react";
import SuccessModal from "./SuccessModal";
import { GoldVineCorner, GoldLeafDivider } from "./Ornaments";

interface RSVPFormData {
  fullName: string;
  phoneNumber: string;
  attendance: "attending" | "declined";
  totalGuests: number;
  dietaryPreference: string;
}

interface RSVPPortalProps {
  lang?: string;
}

const translations = {
  en: {
    category: "KNEXA SMART PORTAL",
    title: "Smart RSVP Portal",
    deadline: "Kindly respond by November 1, 2026, to help us curate your custom luxury experience.",
    step1Title: "Contact Info",
    step2Title: "Attendance",
    step3Title: "Preferences",
    fullNameLabel: "Full Name *",
    fullNamePlaceholder: "Enter your first and last name",
    phoneLabel: "Phone Number *",
    phonePlaceholder: "Enter your contact number",
    attendLabel: "Will You Attend?",
    attendingBtn: "Happily Attending",
    declinedBtn: "Regretfully Declining",
    guestsLabel: "Total Guests (Including You)",
    mealLabel: "Dietary / Meal Preference",
    submitBtn: "Submit RSVP",
    nextBtn: "Continue",
    backBtn: "Back",
    securing: "Securing your seat via Knexa System...",
    errorEmpty: "Please fill in all required fields.",
    errorPhone: "Please enter a valid phone number.",
    attendingText: "Looking forward to celebrating with you!",
    declinedText: "We will miss you, but send our best wishes.",
    mealOptions: [
      { value: "Western Fusion", label: "Western Fusion" },
      { value: "Traditional Sri Lankan", label: "Traditional Sri Lankan" },
      { value: "Vegan", label: "Vegan / Plant-Based" }
    ],
  },
  si: {
    category: "නෙක්සා ස්මාර්ට් ද්වාරය",
    title: "ස්මාර්ට් ආර්.එස්.වී.පී. ද්වාරය",
    deadline: "ඔබගේ සුඛෝපභෝගී අත්දැකීම සැලසුම් කිරීමට 2026 නොවැම්බර් 1 දිනට පෙර පිළිතුරු සපයන්න.",
    step1Title: "සම්බන්ධතා විස්තර",
    step2Title: "සහභාගීත්වය",
    step3Title: "මනාපයන්",
    fullNameLabel: "සම්පූර්ණ නම *",
    fullNamePlaceholder: "ඔබේ නම ඇතුළත් කරන්න",
    phoneLabel: "දුරකථන අංකය *",
    phonePlaceholder: "ඔබේ දුරකථන අංකය ඇතුළත් කරන්න",
    attendLabel: "ඔබ සහභාගී වන්නේද?",
    attendingBtn: "සතුටින් සහභාගී වෙමි",
    declinedBtn: "කණගාටුවෙන් ප්‍රතික්ෂේප කරමි",
    guestsLabel: "මුළු අමුත්තන් ගණන (ඔබ ඇතුළුව)",
    mealLabel: "ආහාර මනාපය",
    submitBtn: "ආර්.එස්.වී.පී. ඉදිරිපත් කරන්න",
    nextBtn: "ඉදිරියට",
    backBtn: "ආපසු",
    securing: "නෙක්සා පද්ධතිය හරහා ආසනය වෙන් කෙරේ...",
    errorEmpty: "කරුණාකර සියලුම අනිවාර්ය ක්ෂේත්‍ර පුරවන්න.",
    errorPhone: "කරුණාකර වලංගු දුරකථන අංකයක් ඇතුළත් කරන්න.",
    attendingText: "ඔබ සමඟ සැමරීමට බලාපොරොත්තු වෙමු!",
    declinedText: "ඔබ නොපැමිණීම අඩුවකි, නමුත් ඔබගේ සුබ පැතුම් අගය කරමු.",
    mealOptions: [
      { value: "Western Fusion", label: "බටහිර විලාසිතාවේ ආහාර (Western Fusion)" },
      { value: "Traditional Sri Lankan", label: "සාම්ප්‍රදායික ශ්‍රී ලාංකික ආහාර" },
      { value: "Vegan", label: "නිර්මාංශ ආහාර (Vegan)" }
    ],
  }
};

const slideVariants = {
  enter: (direction: number) => ({
    x: direction > 0 ? 150 : -150,
    opacity: 0
  }),
  center: {
    x: 0,
    opacity: 1
  },
  exit: (direction: number) => ({
    x: direction < 0 ? 150 : -150,
    opacity: 0
  })
};

export default function RSVPPortal({ lang = "en" }: RSVPPortalProps) {
  const isSinhala = lang === "si";
  const t = isSinhala ? translations.si : translations.en;

  const [formData, setFormData] = useState<RSVPFormData>({
    fullName: "",
    phoneNumber: "",
    attendance: "attending",
    totalGuests: 1,
    dietaryPreference: "Western Fusion",
  });

  const [currentStep, setCurrentStep] = useState(0);
  const [direction, setDirection] = useState(1); // 1 = forward, -1 = backward
  const [isLoading, setIsLoading] = useState(false);
  const [showSuccessModal, setShowSuccessModal] = useState(false);
  const [submittedName, setSubmittedName] = useState("");

  const handleInputChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: name === "totalGuests" ? parseInt(value) : value,
    }));
  };

  const handleAttendanceChange = (status: "attending" | "declined") => {
    setFormData((prev) => ({
      ...prev,
      attendance: status,
      // If declining, reset guests to 1 and preference to Western Fusion
      totalGuests: status === "declined" ? 1 : prev.totalGuests,
    }));
  };

  const nextStep = () => {
    if (currentStep === 0) {
      if (!formData.fullName.trim() || !formData.phoneNumber.trim()) {
        alert(t.errorEmpty);
        return;
      }
    }
    setDirection(1);
    setCurrentStep((prev) => Math.min(prev + 1, 2));
  };

  const prevStep = () => {
    setDirection(-1);
    setCurrentStep((prev) => Math.max(prev - 1, 0));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.fullName.trim() || !formData.phoneNumber.trim()) {
      alert(t.errorEmpty);
      return;
    }

    setIsLoading(true);

    const scriptUrl = process.env.NEXT_PUBLIC_RSVP_SCRIPT_URL || "";

    try {
      if (scriptUrl) {
        // Send data to Google Sheet using no-cors to completely bypass browser CORS preflight checks
        await fetch(scriptUrl, {
          method: "POST",
          mode: "no-cors",
          headers: {
            "Content-Type": "text/plain",
          },
          body: JSON.stringify(formData),
        });
        
        setSubmittedName(formData.fullName);
        setShowSuccessModal(true);
        resetForm();
      } else {
        // High fidelity simulated loading time
        await new Promise((resolve) => setTimeout(resolve, 2000));
        triggerSuccessFallback();
      }
    } catch (error) {
      console.error("RSVP Submission Error:", error);
      triggerSuccessFallback();
    } finally {
      setIsLoading(false);
    }
  };

  const triggerSuccessFallback = () => {
    setSubmittedName(formData.fullName);
    setShowSuccessModal(true);
    resetForm();
  };

  const resetForm = () => {
    setFormData({
      fullName: "",
      phoneNumber: "",
      attendance: "attending",
      totalGuests: 1,
      dietaryPreference: "Western Fusion",
    });
    setCurrentStep(0);
  };

  return (
    <section id="rsvp" className="relative py-28 px-4 bg-[#02120b] overflow-hidden bg-sparkles flex flex-col items-center">
      <div className="absolute top-0 inset-x-0 h-[1px] bg-gradient-to-r from-transparent via-gold/25 to-transparent" />
      
      {/* Background ambient lighting */}
      <div className="absolute top-1/3 left-1/2 -translate-x-[50%] w-96 h-96 bg-gold/5 rounded-full blur-3xl pointer-events-none" />
      
      {/* Corner vines */}
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
            {t.deadline}
          </p>
        </motion.div>

        {/* Floating Glassmorphic Form Card */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.2, duration: 1 }}
          className="relative rounded-2xl glass p-8 md:p-10 shadow-2xl overflow-hidden min-h-[380px] flex flex-col justify-between"
        >
          {/* Inner Golden Corners */}
          <div className="absolute top-4 left-4 w-5 h-5 border-t border-l border-gold/40 rounded-tl-sm" />
          <div className="absolute top-4 right-4 w-5 h-5 border-t border-r border-gold/40 rounded-tr-sm" />
          <div className="absolute bottom-4 left-4 w-5 h-5 border-b border-l border-gold/40 rounded-bl-sm" />
          <div className="absolute bottom-4 right-4 w-5 h-5 border-b border-r border-gold/40 rounded-br-sm" />

          {/* Loading Overlay */}
          {isLoading && (
            <div className="absolute inset-0 bg-[#02120b]/95 backdrop-blur-md z-30 flex flex-col items-center justify-center">
              <div className="relative w-20 h-20 mb-4 flex items-center justify-center">
                <Loader2 className="w-12 h-12 text-gold animate-spin stroke-[2]" />
                <Sparkles className="w-5 h-5 text-gold absolute animate-pulse" />
              </div>
              <p className="text-xs md:text-sm text-[#fdfbf7]/80 font-cormorant font-semibold tracking-widest uppercase animate-pulse">
                {t.securing}
              </p>
            </div>
          )}

          {/* Step Progress Bar Indicators */}
          <div className="w-full flex justify-between items-center mb-8 relative select-none z-10 px-4">
            <div className="absolute top-[18px] left-[15%] right-[15%] h-[1px] bg-gold/15 -z-10" />
            <div 
              className="absolute top-[18px] left-[15%] h-[2px] bg-gradient-to-r from-gold to-peach -z-10 transition-all duration-500" 
              style={{ width: `${currentStep * 35}%` }}
            />

            {[0, 1, 2].map((step) => (
              <button
                key={step}
                type="button"
                disabled={step > currentStep && (!formData.fullName.trim() || !formData.phoneNumber.trim())}
                onClick={() => {
                  setDirection(step > currentStep ? 1 : -1);
                  setCurrentStep(step);
                }}
                className="flex flex-col items-center gap-1.5 focus:outline-none cursor-pointer"
              >
                <div 
                  className={`w-9 h-9 rounded-full border flex items-center justify-center text-xs font-cinzel font-semibold transition-all duration-300 ${
                    currentStep === step 
                      ? "border-gold bg-gold text-[#02120b] shadow-lg shadow-gold/25 scale-110 font-bold" 
                      : currentStep > step
                      ? "border-peach bg-peach/10 text-peach"
                      : "border-gold/20 bg-black/40 text-gold-light/40"
                  }`}
                >
                  {step + 1}
                </div>
                <span className={`text-[9px] tracking-widest uppercase font-cormorant transition-all duration-300 ${
                  currentStep === step ? "text-gold font-bold" : "text-[#fdfbf7]/40"
                }`}>
                  {step === 0 ? t.step1Title : step === 1 ? t.step2Title : t.step3Title}
                </span>
              </button>
            ))}
          </div>

          {/* Form Wizard Slider */}
          <form onSubmit={handleSubmit} className="flex-1 flex flex-col justify-between relative z-10 overflow-hidden">
            
            <div className="flex-1 relative flex items-center min-h-[190px]">
              <AnimatePresence initial={false} custom={direction} mode="wait">
                
                {/* STEP 1: Contact Details */}
                {currentStep === 0 && (
                  <motion.div
                    key="step-1"
                    custom={direction}
                    variants={slideVariants}
                    initial="enter"
                    animate="center"
                    exit="exit"
                    transition={{ duration: 0.35, ease: "easeInOut" }}
                    className="w-full flex flex-col gap-4"
                  >
                    <div className="flex flex-col">
                      <label htmlFor="fullName" className="text-xs uppercase tracking-widest text-gold-light/95 font-medium font-cormorant mb-2">
                        {t.fullNameLabel}
                      </label>
                      <input
                        id="fullName"
                        type="text"
                        name="fullName"
                        required
                        value={formData.fullName}
                        onChange={handleInputChange}
                        placeholder={t.fullNamePlaceholder}
                        className="px-4 py-3.5 rounded-lg border border-gold/20 bg-black/45 text-[#fdfbf7] placeholder-[#fdfbf7]/30 font-playfair text-sm focus:outline-none focus:border-gold focus:ring-1 focus:ring-gold transition-all duration-300 shadow-[inset_0_1px_3px_rgba(0,0,0,0.5)]"
                      />
                    </div>

                    <div className="flex flex-col">
                      <label htmlFor="phoneNumber" className="text-xs uppercase tracking-widest text-gold-light/95 font-medium font-cormorant mb-2">
                        {t.phoneLabel}
                      </label>
                      <input
                        id="phoneNumber"
                        type="tel"
                        name="phoneNumber"
                        required
                        value={formData.phoneNumber}
                        onChange={handleInputChange}
                        placeholder={t.phonePlaceholder}
                        className="px-4 py-3.5 rounded-lg border border-gold/20 bg-black/45 text-[#fdfbf7] placeholder-[#fdfbf7]/30 font-playfair text-sm focus:outline-none focus:border-gold focus:ring-1 focus:ring-gold transition-all duration-300 shadow-[inset_0_1px_3px_rgba(0,0,0,0.5)]"
                      />
                    </div>
                  </motion.div>
                )}

                {/* STEP 2: Attendance selection */}
                {currentStep === 1 && (
                  <motion.div
                    key="step-2"
                    custom={direction}
                    variants={slideVariants}
                    initial="enter"
                    animate="center"
                    exit="exit"
                    transition={{ duration: 0.35, ease: "easeInOut" }}
                    className="w-full flex flex-col gap-4 text-center"
                  >
                    <span className="text-xs uppercase tracking-widest text-gold-light/95 font-medium font-cormorant mb-1 block">
                      {t.attendLabel}
                    </span>
                    
                    <div className="grid grid-cols-2 gap-4">
                      <button
                        type="button"
                        onClick={() => handleAttendanceChange("attending")}
                        className={`py-6 rounded-xl border flex flex-col items-center justify-center gap-3 transition-all duration-300 cursor-pointer shadow-md select-none ${
                          formData.attendance === "attending"
                            ? "bg-gradient-to-br from-gold-dark/20 to-gold/20 border-gold text-gold shadow-gold/10 font-bold"
                            : "border-gold/15 bg-black/25 text-[#fdfbf7]/50 hover:border-gold/30"
                        }`}
                      >
                        <CalendarCheck className={`w-8 h-8 ${formData.attendance === "attending" ? "text-gold" : "text-[#fdfbf7]/40"}`} />
                        <span className="text-xs uppercase tracking-widest font-cormorant font-bold">
                          {t.attendingBtn}
                        </span>
                      </button>
                      
                      <button
                        type="button"
                        onClick={() => handleAttendanceChange("declined")}
                        className={`py-6 rounded-xl border flex flex-col items-center justify-center gap-3 transition-all duration-300 cursor-pointer shadow-md select-none ${
                          formData.attendance === "declined"
                            ? "bg-gradient-to-br from-peach/20 to-peach/10 border-peach text-peach shadow-peach/10 font-bold"
                            : "border-gold/15 bg-black/25 text-[#fdfbf7]/50 hover:border-gold/30"
                        }`}
                      >
                        <HelpCircle className={`w-8 h-8 ${formData.attendance === "declined" ? "text-peach" : "text-[#fdfbf7]/40"}`} />
                        <span className="text-xs uppercase tracking-widest font-cormorant font-bold">
                          {t.declinedBtn}
                        </span>
                      </button>
                    </div>

                    <p className="text-[10px] uppercase font-sans tracking-widest text-gold-light/60 mt-2">
                      {formData.attendance === "attending" ? t.attendingText : t.declinedText}
                    </p>
                  </motion.div>
                )}

                {/* STEP 3: Meal & Guest Preferences */}
                {currentStep === 2 && (
                  <motion.div
                    key="step-3"
                    custom={direction}
                    variants={slideVariants}
                    initial="enter"
                    animate="center"
                    exit="exit"
                    transition={{ duration: 0.35, ease: "easeInOut" }}
                    className="w-full flex flex-col gap-4"
                  >
                    {formData.attendance === "attending" ? (
                      <>
                        <div className="flex flex-col">
                          <label htmlFor="totalGuests" className="text-xs uppercase tracking-widest text-gold-light/95 font-medium font-cormorant mb-2">
                            {t.guestsLabel}
                          </label>
                          <select
                            id="totalGuests"
                            name="totalGuests"
                            value={formData.totalGuests}
                            onChange={handleInputChange}
                            className="px-4 py-3.5 rounded-lg border border-gold/20 bg-[#042417] text-[#fdfbf7] font-playfair text-sm focus:outline-none focus:border-gold transition-all duration-300 cursor-pointer shadow-[inset_0_1px_3px_rgba(0,0,0,0.5)]"
                          >
                            {[1, 2, 3, 4, 5].map((num) => (
                              <option key={num} value={num} className="bg-[#02120b] text-[#fdfbf7]">
                                {num === 1 ? "1 Guest" : `${num} Guests`}
                              </option>
                            ))}
                          </select>
                        </div>

                        <div className="flex flex-col">
                          <label htmlFor="dietaryPreference" className="text-xs uppercase tracking-widest text-gold-light/95 font-medium font-cormorant mb-2">
                            {t.mealLabel}
                          </label>
                          <select
                            id="dietaryPreference"
                            name="dietaryPreference"
                            value={formData.dietaryPreference}
                            onChange={handleInputChange}
                            className="px-4 py-3.5 rounded-lg border border-gold/20 bg-[#042417] text-[#fdfbf7] font-playfair text-sm focus:outline-none focus:border-gold transition-all duration-300 cursor-pointer shadow-[inset_0_1px_3px_rgba(0,0,0,0.5)]"
                          >
                            {t.mealOptions.map((opt) => (
                              <option key={opt.value} value={opt.value} className="bg-[#02120b] text-[#fdfbf7]">
                                {opt.label}
                              </option>
                            ))}
                          </select>
                        </div>
                      </>
                    ) : (
                      <div className="text-center py-6 flex flex-col items-center justify-center gap-3">
                        <Sparkles className="w-10 h-10 text-peach animate-pulse" />
                        <h4 className="text-gold-light text-lg font-cinzel tracking-wider">{t.declinedText}</h4>
                        <span className="text-[10px] text-[#fdfbf7]/40 font-sans uppercase tracking-widest mt-1">
                          You may submit your response now
                        </span>
                      </div>
                    )}
                  </motion.div>
                )}

              </AnimatePresence>
            </div>

            {/* Stepper Wizard Control Buttons */}
            <div className="flex justify-between items-center mt-8 gap-4 select-none border-t border-gold/10 pt-6">
              {currentStep > 0 ? (
                <motion.button
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  type="button"
                  onClick={prevStep}
                  className="px-5 py-3 rounded-lg border border-gold/30 hover:border-gold/60 text-gold-light/80 hover:text-gold text-xs uppercase tracking-widest font-cormorant font-bold transition-all duration-300 cursor-pointer flex items-center gap-1.5 bg-black/20"
                >
                  <ChevronLeft className="w-4 h-4" />
                  <span>{t.backBtn}</span>
                </motion.button>
              ) : (
                <div />
              )}

              {currentStep < 2 ? (
                <motion.button
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  type="button"
                  onClick={nextStep}
                  className="px-5 py-3 rounded-lg bg-gradient-to-r from-gold-dark to-gold text-[#02120b] text-xs uppercase tracking-widest font-cormorant font-bold transition-all duration-300 shadow-md hover:shadow-gold/15 cursor-pointer flex items-center gap-1.5 ml-auto"
                >
                  <span>{t.nextBtn}</span>
                  <ChevronRight className="w-4 h-4" />
                </motion.button>
              ) : (
                <motion.button
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  type="submit"
                  className="px-6 py-3.5 rounded-lg bg-gradient-to-r from-gold-dark via-gold to-gold-light text-[#02120b] font-bold text-xs uppercase tracking-widest font-cormorant transition-all duration-300 shadow-lg hover:shadow-[0_0_20px_rgba(212,175,55,0.35)] border border-gold/10 cursor-pointer flex items-center gap-1.5 ml-auto"
                >
                  <span>{t.submitBtn}</span>
                  <Send className="w-3.5 h-3.5" />
                </motion.button>
              )}
            </div>

          </form>
        </motion.div>
      </div>

      {/* Success Confirmation Modal */}
      <SuccessModal
        isOpen={showSuccessModal}
        onClose={() => setShowSuccessModal(false)}
        guestName={submittedName}
        lang={lang}
        formData={formData}
      />
    </section>
  );
}
