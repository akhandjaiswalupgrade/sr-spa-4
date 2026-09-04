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
            className={`w-1.5 h-1.5 rounded-full transition-colors ${
              dot <= level ? "bg-rose" : "bg-white/15"
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
      className="group relative flex flex-col bg-surface-raised rounded-2xl border border-rose/15 hover:border-rose/40 transition-all duration-350 hover:-translate-y-1 hover:shadow-rose-glow/20 overflow-hidden"
    >
      {/* Card Image Container */}
      <div className="relative h-[260px] sm:h-[290px] lg:h-[310px] w-full overflow-hidden bg-surface-dark">
        <Image
          src={treatment.image}
          alt={treatment.name}
          fill
          sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
          className="object-cover object-center group-hover:scale-[1.035] transition-transform duration-500 ease-luxury"
        />

        {/* Ambient Gradient on Image */}
        <div className="absolute inset-0 bg-gradient-to-t from-surface-raised via-transparent to-black/30" />

        {/* Top Badges */}
        <div className="absolute top-4 left-4 right-4 flex items-center justify-between pointer-events-none">
          <span className="px-3 py-1 rounded-full bg-obsidian/90 backdrop-blur-md border border-rose/25 text-[10px] uppercase tracking-[0.2em] font-sans font-bold text-cream shadow-sm">
            {treatment.category}
          </span>

          {treatment.featured && (
            <span className="px-2.5 py-1 rounded-full bg-rose text-obsidian text-[10px] uppercase tracking-wider font-bold flex items-center gap-1 shadow-sm">
              <Sparkles className="w-3 h-3" />
              Signature
            </span>
          )}
        </div>

        {/* Bottom Image Overlay: Starting Price & Pressure */}
        <div className="absolute bottom-3 left-4 right-4 flex items-end justify-between pointer-events-none">
          <div className="bg-obsidian/90 backdrop-blur-md px-3 py-1.5 rounded-xl border border-rose/20 shadow-sm">
            <span className="text-[10px] text-muted uppercase tracking-wider block font-sans">
              From
            </span>
            <span className="text-sm font-bold text-white font-sans">
              {formatPrice(treatment.priceFrom)}
            </span>
          </div>

          {/* Pressure indicator */}
          <div className="bg-obsidian/90 backdrop-blur-md px-3 py-1.5 rounded-xl border border-rose/20 shadow-sm flex flex-col items-end">
            <span className="text-[10px] text-taupe uppercase tracking-wider mb-1 font-sans">
              Pressure: <strong className="text-cream">{treatment.pressureLabel}</strong>
            </span>
            {renderPressureDots(treatment.pressure)}
          </div>
        </div>
      </div>

      {/* Card Content */}
      <div className="flex flex-col flex-1 p-5 sm:p-6 justify-between">
        <div>
          <h3 className="font-serif text-xl sm:text-2xl text-white font-medium tracking-tight mb-2 group-hover:text-rose transition-colors duration-200">
            {treatment.name}
          </h3>

          <p className="text-xs sm:text-sm text-taupe leading-relaxed mb-4 line-clamp-2">
            {treatment.shortDescription}
          </p>

          {/* Durations Available */}
          <div className="flex items-center gap-2 mb-6">
            <Clock className="w-3.5 h-3.5 text-rose flex-shrink-0" />
            <div className="flex flex-wrap gap-1.5">
              {treatment.durations.map((d) => (
                <span
                  key={d.minutes}
                  className="px-2.5 py-0.5 rounded-lg text-[11px] font-sans font-medium bg-surface-dark border border-rose/15 text-taupe"
                >
                  {d.minutes} min
                </span>
              ))}
            </div>
          </div>
        </div>

        {/* Action Link & Book */}
        <div className="flex items-center justify-between pt-4 border-t border-white/[0.07] gap-3">
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
            className="inline-flex items-center gap-1.5 text-xs font-sans uppercase tracking-[0.16em] font-bold text-rose hover:text-rose-light transition-colors group/btn py-1"
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
            className="px-4 py-1.5 rounded-xl text-xs font-sans font-bold bg-rose/15 hover:bg-rose hover:text-obsidian border border-rose/35 hover:border-rose text-rose transition-all duration-200 shadow-sm"
          >
            Book
          </button>
        </div>
      </div>
    </motion.article>
  );
}
