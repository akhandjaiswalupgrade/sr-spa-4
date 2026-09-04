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
            className="fixed inset-0 bg-black/85 backdrop-blur-sm"
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
              className="w-screen max-w-xl bg-surface-raised border-l border-rose/20 shadow-2xl flex flex-col h-full overflow-y-auto text-cream"
            >
              {/* Image & Header */}
              <div className="relative h-64 sm:h-72 w-full bg-surface-dark flex-shrink-0">
                <Image
                  src={treatment.image}
                  alt={treatment.name}
                  fill
                  sizes="(max-width: 640px) 100vw, 600px"
                  className="object-cover object-center"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-surface-raised via-black/40 to-transparent" />

                {/* Close Button */}
                <button
                  type="button"
                  onClick={onClose}
                  className="absolute top-4 right-4 z-10 p-2.5 rounded-xl bg-obsidian/85 backdrop-blur-md text-cream hover:text-rose border border-rose/20 transition-colors"
                  aria-label="Close details"
                >
                  <X className="w-5 h-5" />
                </button>

                {/* Category Badge */}
                <div className="absolute bottom-4 left-6 right-6 flex items-center justify-between">
                  <span className="px-3.5 py-1 rounded-full bg-obsidian/90 backdrop-blur-md border border-rose/30 text-xs uppercase tracking-[0.2em] font-sans font-bold text-rose">
                    {treatment.category}
                  </span>
                </div>
              </div>

              {/* Drawer Body */}
              <div className="p-6 sm:p-8 flex-1 flex flex-col justify-between">
                <div>
                  <h2
                    id="drawer-title"
                    className="font-serif text-2xl sm:text-3xl text-white font-medium tracking-tight mb-2"
                  >
                    {treatment.name}
                  </h2>
                  <p className="text-sm text-rose-light italic font-serif mb-6">
                    {treatment.tagline}
                  </p>

                  {/* Duration & Price Selector */}
                  <div className="mb-6 p-4 rounded-xl bg-surface-dark border border-rose/15">
                    <span className="text-[11px] uppercase tracking-[0.16em] text-taupe font-sans font-bold block mb-3">
                      Select Session Duration & Pricing:
                    </span>
                    <div className="grid grid-cols-2 sm:grid-cols-3 gap-2.5">
                      {treatment.durations.map((d) => (
                        <button
                          key={d.minutes}
                          type="button"
                          onClick={() => setSelectedDuration(d)}
                          className={`flex flex-col items-center justify-center p-3 rounded-xl border transition-all ${
                            selectedDuration?.minutes === d.minutes
                              ? "bg-rose/20 border-rose text-white shadow-sm"
                              : "bg-surface-raised border-rose/15 text-taupe hover:border-rose/35 hover:text-white"
                          }`}
                        >
                          <span className="text-xs font-bold uppercase tracking-wider font-sans">
                            {d.minutes} Minutes
                          </span>
                          <span className="text-sm font-bold text-rose mt-1 font-sans">
                            {formatPrice(d.price)}
                          </span>
                        </button>
                      ))}
                    </div>
                  </div>

                  {/* Pressure Rating */}
                  <div className="flex items-center justify-between py-3.5 border-y border-white/[0.07] mb-6">
                    <span className="text-xs font-sans font-medium text-taupe">
                      Therapy Pressure Intensity
                    </span>
                    <div className="flex items-center gap-2">
                      <span className="text-xs font-bold text-cream font-sans">
                        {treatment.pressureLabel} ({treatment.pressure}/5)
                      </span>
                      <div className="flex items-center gap-1">
                        {[1, 2, 3, 4, 5].map((dot) => (
                          <span
                            key={dot}
                            className={`w-2 h-2 rounded-full ${
                              dot <= treatment.pressure ? "bg-rose" : "bg-white/15"
                            }`}
                          />
                        ))}
                      </div>
                    </div>
                  </div>

                  {/* Long Description */}
                  <div className="mb-6">
                    <h3 className="text-xs uppercase tracking-[0.18em] font-sans font-bold text-taupe mb-2">
                      About this experience
                    </h3>
                    <p className="text-sm sm:text-base text-taupe leading-relaxed">
                      {treatment.longDescription}
                    </p>
                  </div>

                  {/* Inclusions */}
                  {treatment.inclusions && (
                    <div className="mb-6">
                      <h3 className="text-xs uppercase tracking-[0.18em] font-sans font-bold text-taupe mb-3">
                        Experience Inclusions
                      </h3>
                      <ul className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
                        {treatment.inclusions.map((inc, idx) => (
                          <li
                            key={idx}
                            className="flex items-center gap-2 text-xs sm:text-sm text-cream font-sans"
                          >
                            <Check className="w-4 h-4 text-rose flex-shrink-0" />
                            <span>{inc}</span>
                          </li>
                        ))}
                      </ul>
                    </div>
                  )}

                  {/* Recommended For Tags */}
                  <div className="mb-8">
                    <h3 className="text-xs uppercase tracking-[0.18em] font-sans font-bold text-taupe mb-3">
                      Recommended For
                    </h3>
                    <div className="flex flex-wrap gap-2">
                      {treatment.recommendedFor.map((item, idx) => (
                        <span
                          key={idx}
                          className="px-3 py-1 rounded-lg text-xs font-sans font-medium bg-surface-dark border border-rose/15 text-taupe"
                        >
                          {item}
                        </span>
                      ))}
                    </div>
                  </div>
                </div>

                {/* Bottom Action CTAs */}
                <div className="pt-6 border-t border-rose/15 flex flex-col sm:flex-row gap-3">
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
                    className="inline-flex items-center justify-center gap-2 px-6 py-3.5 rounded-xl bg-surface-dark hover:bg-rose/15 border border-rose/25 text-sm font-sans font-semibold text-cream hover:text-rose transition-colors flex-shrink-0"
                  >
                    <MessageCircle className="w-4 h-4 text-rose" />
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
