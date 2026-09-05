"use client";

import React from "react";
import Image from "next/image";
import { motion } from "framer-motion";
import { Clock, ArrowRight, Sparkles } from "lucide-react";
import { Treatment } from "@/data/treatments";
import { formatPrice } from "@/lib/utils";
import { trackEvent } from "@/lib/analytics";

interface TreatmentCardProps {
  treatment: Treatment;
  onSelect: (treatment: Treatment) => void;
  onQuickBook: (treatmentName: string) => void;
}

export function TreatmentCard({
  treatment,
  onSelect,
  onQuickBook,
}: TreatmentCardProps) {
  const renderPressureDots = (level: number) => {
    return (
      <div className="flex items-center gap-1" aria-label={`Pressure level ${level} of 5`}>
        {[1, 2, 3, 4, 5].map((dot) => (
          <span
            key={dot}
            className={`w-2 h-2 rounded-full transition-all ${
              dot <= level
                ? "bg-gradient-to-b from-[#e04f8b] to-[#b82963] shadow-sm ring-1 ring-white"
                : "bg-slate-200 ring-1 ring-slate-100"
            }`}
          />
        ))}
      </div>
    );
  };

  return (
    <motion.article
      layout
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, scale: 0.95 }}
      transition={{ duration: 0.4, ease: [0.22, 1, 0.36, 1] }}
      className="group relative flex flex-col bg-white rounded-2xl border border-slate-200/90 hover:border-rose/40 transition-all duration-350 hover:-translate-y-2 shadow-3d hover:shadow-3d-hover overflow-hidden"
    >
      {/* Card Image Container */}
      <div className="relative h-[260px] sm:h-[290px] lg:h-[310px] w-full overflow-hidden bg-slate-100">
        <Image
          src={treatment.image}
          alt={treatment.name}
          fill
          sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
          className="object-cover object-center group-hover:scale-[1.035] transition-transform duration-500 ease-luxury"
        />

        {/* Ambient Scrim on Image */}
        <div className="absolute inset-0 bg-gradient-to-t from-black/40 via-transparent to-transparent pointer-events-none" />

        {/* Top Badges */}
        <div className="absolute top-4 left-4 right-4 flex items-center justify-between pointer-events-none">
          <span className="px-3 py-1 rounded-full bg-white/95 backdrop-blur-md border border-slate-200/90 text-[10px] uppercase tracking-[0.2em] font-sans font-bold text-slate-800 shadow-sm">
            {treatment.category}
          </span>

          {treatment.featured && (
            <span className="px-3 py-1 rounded-full bg-gradient-to-r from-[#df548f] to-[#b82963] text-white text-[10px] uppercase tracking-wider font-bold flex items-center gap-1 shadow-button-3d border-t border-white/30">
              <Sparkles className="w-3 h-3" />
              Signature
            </span>
          )}
        </div>

        {/* Bottom Image Overlay: Starting Price & Pressure */}
        <div className="absolute bottom-3 left-4 right-4 flex items-end justify-between pointer-events-none">
          <div className="bg-white/95 backdrop-blur-md px-3.5 py-1.5 rounded-xl border border-slate-200/90 shadow-md">
            <span className="text-[10px] text-slate-500 uppercase tracking-wider block font-sans font-medium">
              From
            </span>
            <span className="text-sm font-extrabold text-slate-900 font-sans">
              {formatPrice(treatment.priceFrom)}
            </span>
          </div>

          {/* Pressure indicator */}
          <div className="bg-white/95 backdrop-blur-md px-3.5 py-1.5 rounded-xl border border-slate-200/90 shadow-md flex flex-col items-end">
            <span className="text-[10px] text-slate-600 uppercase tracking-wider mb-1 font-sans font-medium">
              Pressure: <strong className="text-slate-900 font-bold">{treatment.pressureLabel}</strong>
            </span>
            {renderPressureDots(treatment.pressure)}
          </div>
        </div>
      </div>

      {/* Card Content */}
      <div className="flex flex-col flex-1 p-5 sm:p-6 justify-between">
        <div>
          <h3 className="font-serif text-xl sm:text-2xl text-slate-900 font-medium tracking-tight mb-2 group-hover:text-rose transition-colors duration-200">
            {treatment.name}
          </h3>

          <p className="text-xs sm:text-sm text-slate-600 leading-relaxed mb-4 line-clamp-2">
            {treatment.shortDescription}
          </p>

          {/* Durations Available */}
          <div className="flex items-center gap-2 mb-6">
            <Clock className="w-3.5 h-3.5 text-rose flex-shrink-0" />
            <div className="flex flex-wrap gap-1.5">
              {treatment.durations.map((d) => (
                <span
                  key={d.minutes}
                  className="px-2.5 py-0.5 rounded-lg text-[11px] font-sans font-semibold bg-white border border-slate-200/90 text-slate-700 shadow-sm"
                >
                  {d.minutes} min
                </span>
              ))}
            </div>
          </div>
        </div>

        {/* Action Link & Book */}
        <div className="flex items-center justify-between pt-4 border-t border-slate-100 gap-3">
          <button
            type="button"
            onClick={() => {
              trackEvent("treatment_view", {
                treatmentName: treatment.name,
                treatmentSlug: treatment.slug,
                category: treatment.category,
              });
              onSelect(treatment);
            }}
            className="inline-flex items-center gap-1.5 text-xs font-sans uppercase tracking-[0.16em] font-bold text-rose hover:text-rose-dark transition-colors group/btn py-1"
          >
            <span>Explore Details</span>
            <ArrowRight className="w-3.5 h-3.5 text-rose group-hover/btn:translate-x-1 transition-transform" />
          </button>

          <button
            type="button"
            onClick={() => {
              trackEvent("treatment_book_click", {
                treatmentName: treatment.name,
                treatmentSlug: treatment.slug,
              });
              onQuickBook(treatment.name);
            }}
            className="px-5 py-2 rounded-xl text-xs font-sans font-bold bg-gradient-to-b from-[#e35691] via-[#c83b74] to-[#af2762] text-white shadow-button-3d hover:from-[#eb68a0] hover:to-[#bc2e6a] hover:-translate-y-0.5 active:translate-y-0.5 active:shadow-inner border-t border-white/30 border-b border-rose-900/40 transition-all"
          >
            Book
          </button>
        </div>
      </div>
    </motion.article>
  );
}
