"use client";

import React, { useState, useEffect } from "react";
import Image from "next/image";
import { motion, AnimatePresence } from "framer-motion";
import { X, Clock, Check, MessageCircle, Sparkles, Shield, ChevronRight } from "lucide-react";
import { Treatment, TreatmentDurationOption } from "@/data/treatments";
import { Button } from "@/components/ui/Button";
import { formatPrice } from "@/lib/utils";
import { getWhatsAppUrl } from "@/lib/whatsapp";
import { trackEvent } from "@/lib/analytics";

interface TreatmentDrawerProps {
  treatment: Treatment | null;
  isOpen: boolean;
  onClose: () => void;
  onBook: (treatmentName: string, duration?: number) => void;
}

export function TreatmentDrawer({
  treatment,
  isOpen,
  onClose,
  onBook,
}: TreatmentDrawerProps) {
  const [selectedDuration, setSelectedDuration] = useState<TreatmentDurationOption | null>(null);

  // Set default duration when treatment opens
  useEffect(() => {
    if (treatment && treatment.durations.length > 0) {
      setSelectedDuration(treatment.durations[0]);
    }
  }, [treatment]);

  // Lock body scroll and listen for ESC
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape" && isOpen) {
        onClose();
      }
    };

    if (isOpen) {
      document.body.style.overflow = "hidden";
      window.addEventListener("keydown", handleKeyDown);
    } else {
      document.body.style.overflow = "unset";
    }

    return () => {
      document.body.style.overflow = "unset";
      window.removeEventListener("keydown", handleKeyDown);
    };
  }, [isOpen, onClose]);

  if (!treatment) return null;

  return (
    <AnimatePresence>
      {isOpen && (
        <div className="fixed inset-0 z-50 overflow-hidden">
          {/* Backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3 }}
            onClick={onClose}
            className="fixed inset-0 bg-slate-900/40 backdrop-blur-sm"
            aria-hidden="true"
          />

          {/* Drawer Container */}
          <div className="fixed inset-y-0 right-0 max-w-full flex pl-0 sm:pl-10">
            <motion.div
              initial={{ x: "100%" }}
              animate={{ x: 0 }}
              exit={{ x: "100%" }}
              transition={{ duration: 0.4, ease: [0.22, 1, 0.36, 1] }}
              role="dialog"
              aria-modal="true"
              aria-labelledby="drawer-title"
              className="w-screen max-w-xl bg-white border-l border-gray-100 shadow-2xl flex flex-col h-full overflow-y-auto text-slate-700"
            >
              {/* Image & Header */}
              <div className="relative h-64 sm:h-72 w-full bg-slate-100 flex-shrink-0">
                <Image
                  src={treatment.image}
                  alt={treatment.name}
                  fill
                  sizes="(max-width: 640px) 100vw, 600px"
                  className="object-cover object-center"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/40 via-transparent to-transparent pointer-events-none" />

                {/* Close Button */}
                <button
                  type="button"
                  onClick={onClose}
                  className="absolute top-4 right-4 z-10 p-2.5 rounded-xl bg-white/90 backdrop-blur-md text-slate-700 hover:text-rose border border-gray-200 transition-colors shadow-sm"
                  aria-label="Close details"
                >
                  <X className="w-5 h-5" />
                </button>

                {/* Category Badge */}
                <div className="absolute bottom-4 left-6 right-6 flex items-center justify-between">
                  <span className="px-3.5 py-1 rounded-full bg-white/95 backdrop-blur-md border border-rose/30 text-xs uppercase tracking-[0.2em] font-sans font-bold text-rose shadow-sm">
                    {treatment.category}
                  </span>
                </div>
              </div>

              {/* Drawer Body */}
              <div className="p-6 sm:p-8 flex-1 flex flex-col justify-between">
                <div>
                  <h2
                    id="drawer-title"
                    className="font-serif text-2xl sm:text-3xl text-slate-900 font-medium tracking-tight mb-2"
                  >
                    {treatment.name}
                  </h2>
                  <p className="text-sm text-rose italic font-serif mb-6">
                    {treatment.tagline}
                  </p>

                  {/* Duration & Price Selector */}
                  <div className="mb-6 p-4 rounded-2xl bg-[#f5f0eb] border border-slate-200/90 shadow-inner">
                    <span className="text-[11px] uppercase tracking-[0.16em] text-slate-800 font-sans font-bold block mb-3">
                      Select Session Duration & Pricing:
                    </span>
                    <div className="grid grid-cols-2 sm:grid-cols-3 gap-2.5">
                      {treatment.durations.map((d) => (
                        <button
                          key={d.minutes}
                          type="button"
                          onClick={() => setSelectedDuration(d)}
                          className={`flex flex-col items-center justify-center p-3 rounded-xl transition-all duration-200 ${
                            selectedDuration?.minutes === d.minutes
                              ? "bg-gradient-to-b from-[#df548f] to-[#c83b74] text-white shadow-button-3d border-t border-white/30 border-b border-rose-900/40 font-bold scale-[1.02]"
                              : "bg-white border border-slate-200/90 text-slate-700 shadow-button-secondary-3d hover:border-rose/40 hover:text-slate-900 hover:-translate-y-0.5"
                          }`}
                        >
                          <span className={`text-xs font-bold uppercase tracking-wider font-sans ${selectedDuration?.minutes === d.minutes ? "text-white" : "text-slate-700"}`}>
                            {d.minutes} Minutes
                          </span>
                          <span className={`text-sm font-bold mt-1 font-sans ${selectedDuration?.minutes === d.minutes ? "text-rose-100" : "text-[#c83b74]"}`}>
                            {formatPrice(d.price)}
                          </span>
                        </button>
                      ))}
                    </div>
                  </div>

                  {/* Pressure Rating */}
                  <div className="flex items-center justify-between py-3.5 border-y border-slate-200/80 mb-6">
                    <span className="text-xs font-sans font-semibold text-slate-700">
                      Therapy Pressure Intensity
                    </span>
                    <div className="flex items-center gap-2">
                      <span className="text-xs font-bold text-slate-900 font-sans">
                        {treatment.pressureLabel} ({treatment.pressure}/5)
                      </span>
                      <div className="flex items-center gap-1.5">
                        {[1, 2, 3, 4, 5].map((dot) => (
                          <span
                            key={dot}
                            className={`w-2.5 h-2.5 rounded-full ring-1 ring-black/5 shadow-sm transition-transform ${
                              dot <= treatment.pressure
                                ? "bg-gradient-to-b from-[#df548f] to-[#c83b74] shadow-rose/20 scale-110"
                                : "bg-slate-200 border border-slate-300/60"
                            }`}
                          />
                        ))}
                      </div>
                    </div>
                  </div>

                  {/* Long Description */}
                  <div className="mb-6">
                    <h3 className="text-xs uppercase tracking-[0.18em] font-sans font-bold text-slate-900 mb-2">
                      About this experience
                    </h3>
                    <p className="text-sm sm:text-base text-slate-700 leading-relaxed">
                      {treatment.longDescription}
                    </p>
                  </div>

                  {/* Inclusions */}
                  {treatment.inclusions && (
                    <div className="mb-6">
                      <h3 className="text-xs uppercase tracking-[0.18em] font-sans font-bold text-slate-900 mb-3">
                        Experience Inclusions
                      </h3>
                      <ul className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
                        {treatment.inclusions.map((inc, idx) => (
                          <li
                            key={idx}
                            className="flex items-center gap-2 text-xs sm:text-sm text-slate-800 font-sans"
                          >
                            <Check className="w-4 h-4 text-[#c83b74] flex-shrink-0" />
                            <span>{inc}</span>
                          </li>
                        ))}
                      </ul>
                    </div>
                  )}

                  {/* Recommended For Tags */}
                  <div className="mb-8">
                    <h3 className="text-xs uppercase tracking-[0.18em] font-sans font-bold text-slate-900 mb-3">
                      Recommended For
                    </h3>
                    <div className="flex flex-wrap gap-2">
                      {treatment.recommendedFor.map((item, idx) => (
                        <span
                          key={idx}
                          className="px-3 py-1.5 rounded-lg text-xs font-sans font-semibold bg-[#f5f0eb] border border-slate-200/90 text-slate-700 shadow-sm"
                        >
                          {item}
                        </span>
                      ))}
                    </div>
                  </div>
                </div>

                {/* Bottom Action CTAs */}
                <div className="pt-6 border-t border-slate-200/80 flex flex-col sm:flex-row gap-3">
                  <Button
                    variant="primary"
                    size="lg"
                    fullWidth
                    onClick={() => {
                      onBook(treatment.name, selectedDuration?.minutes);
                      onClose();
                    }}
                  >
                    Request Appointment ({selectedDuration ? formatPrice(selectedDuration.price) : ""})
                  </Button>

                  <a
                    href={getWhatsAppUrl({
                      experience: treatment.name,
                      duration: selectedDuration?.minutes,
                      pressure: treatment.pressureLabel,
                      source: "treatment_drawer",
                    })}
                    target="_blank"
                    rel="noopener noreferrer"
                    onClick={() =>
                      trackEvent("whatsapp_click", {
                        treatmentName: treatment.name,
                        duration: selectedDuration?.minutes,
                        context: "treatment_drawer",
                      })
                    }
                    className="inline-flex items-center justify-center gap-2 px-6 py-3.5 rounded-xl bg-white hover:bg-rose-50/60 border border-slate-200/90 text-sm font-sans font-bold text-slate-800 hover:text-rose transition-all flex-shrink-0 shadow-button-secondary-3d hover:-translate-y-0.5 active:translate-y-0.5"
                  >
                    <MessageCircle className="w-4 h-4 text-[#c83b74]" />
                    <span>WhatsApp</span>
                  </a>
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      )}
    </AnimatePresence>
  );
}
