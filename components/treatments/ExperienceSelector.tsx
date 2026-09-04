"use client";

import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  Treatment,
  TreatmentCategory,
  treatmentCategories,
  treatmentsData,
} from "@/data/treatments";
import { TreatmentCard } from "@/components/treatments/TreatmentCard";
import { TreatmentDrawer } from "@/components/treatments/TreatmentDrawer";
import { trackEvent } from "@/lib/analytics";

interface ExperienceSelectorProps {
  onOpenBooking: (initialTreatment?: string, initialDuration?: number) => void;
}

export function ExperienceSelector({ onOpenBooking }: ExperienceSelectorProps) {
  const [activeCategory, setActiveCategory] = useState<TreatmentCategory>("ALL");
  const [selectedTreatment, setSelectedTreatment] = useState<Treatment | null>(null);
  const [isDrawerOpen, setIsDrawerOpen] = useState(false);

  const filteredTreatments =
    activeCategory === "ALL"
      ? treatmentsData
      : treatmentsData.filter((t) => t.category === activeCategory);

  const handleCategoryChange = (category: TreatmentCategory) => {
    setActiveCategory(category);
    trackEvent("treatment_category_select", { category });
  };

  const handleSelectTreatment = (treatment: Treatment) => {
    setSelectedTreatment(treatment);
    setIsDrawerOpen(true);
  };

  const handleQuickBook = (treatmentName: string, duration?: number) => {
    onOpenBooking(treatmentName, duration);
  };

  return (
    <section
      id="experiences"
      className="relative bg-surface-dark py-24 sm:py-32 lg:py-36 border-t border-rose/15"
    >
      <div className="max-w-[1280px] mx-auto px-5 sm:px-8 lg:px-12">
        {/* Section Header */}
        <div className="max-w-2xl text-left mb-12 sm:mb-16">
          <span className="inline-block text-[11px] sm:text-xs font-sans font-bold uppercase tracking-[0.22em] text-rose mb-3 sm:mb-4">
            Choose Your Experience
          </span>
          <h2 className="font-serif text-3xl sm:text-4xl md:text-5xl text-white font-normal leading-[1.18] tracking-tight mb-4">
            What does your body need today?
          </h2>
          <p className="text-base sm:text-lg text-taupe leading-relaxed">
            Different days call for different ways to unwind. Select a category below
            to find your ideal therapy.
          </p>
        </div>

        {/* Category Filter Tabs */}
        <div className="flex items-center gap-2.5 sm:gap-3.5 overflow-x-auto pb-4 mb-10 sm:mb-14 no-scrollbar -mx-5 px-5 sm:mx-0 sm:px-0">
          {treatmentCategories.map((cat) => {
            const isActive = activeCategory === cat.id;
            return (
              <button
                key={cat.id}
                type="button"
                onClick={() => handleCategoryChange(cat.id)}
                className={`relative flex-shrink-0 px-5 sm:px-6 py-2.5 rounded-xl text-xs font-sans font-bold uppercase tracking-[0.14em] transition-all duration-300 ${
                  isActive
                    ? "bg-rose text-obsidian font-bold shadow-rose-glow scale-105 border border-rose"
                    : "bg-surface-raised border border-rose/20 text-taupe hover:text-white hover:border-rose/40"
                }`}
              >
                <span>{cat.label}</span>
              </button>
            );
          })}
        </div>

        {/* Treatment Cards Grid */}
        <motion.div
          layout
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8"
        >
          <AnimatePresence mode="popLayout">
            {filteredTreatments.map((treatment) => (
              <TreatmentCard
                key={treatment.id}
                treatment={treatment}
                onSelect={handleSelectTreatment}
                onQuickBook={handleQuickBook}
              />
            ))}
          </AnimatePresence>
        </motion.div>
      </div>

      {/* Details Slide-Over Drawer */}
      <TreatmentDrawer
        treatment={selectedTreatment}
        isOpen={isDrawerOpen}
        onClose={() => setIsDrawerOpen(false)}
        onBook={handleQuickBook}
      />
    </section>
  );
}
