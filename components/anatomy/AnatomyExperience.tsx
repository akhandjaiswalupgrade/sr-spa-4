"use client";

import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ShieldAlert, Sparkles, Activity } from "lucide-react";
import {
  MuscleRegion,
  muscleRegionsData,
  MuscleRegionSelector,
} from "@/components/anatomy/MuscleRegionSelector";
import { AnatomySlider } from "@/components/anatomy/AnatomySlider";
import { AnatomyVisual } from "@/components/anatomy/AnatomyVisual";

interface AnatomyExperienceProps {
  onOpenBooking: (initialTreatment?: string) => void;
}

const phasesCopy = [
  {
    range: [0, 24],
    phase: "01",
    label: "TENSION",
    headline: "Where tension can build.",
    body: "Long periods of sitting, commuting, working at a screen, intense exercise and everyday city stress can leave common muscle groups feeling tight, shortened, or fatigued.",
  },
  {
    range: [25, 49],
    phase: "02",
    label: "TREATMENT",
    headline: "The treatment begins.",
    body: "A trained therapist adapts manual pressure and flowing strokes around selected muscle groups based on your unique comfort, posture, and requested focus areas.",
  },
  {
    range: [50, 74],
    phase: "03",
    label: "RELEASE",
    headline: "Tension may start to ease.",
    body: "Deliberate compressions and myofascial friction encourage blood flow, helping loosen tight knots and soften the sensation of muscular stiffness.",
  },
  {
    range: [75, 100],
    phase: "04",
    label: "RELAXED",
    headline: "A calmer, restored state.",
    body: "Many people seek regular massage bodywork to feel looser, physically lighter, and deeply tranquil long after their session concludes.",
  },
];

export function AnatomyExperience({ onOpenBooking }: AnatomyExperienceProps) {
  const [sliderValue, setSliderValue] = useState<number>(35);
  const [activeRegion, setActiveRegion] = useState<MuscleRegion>(muscleRegionsData[0]);

  // Determine active phase copy
  const activePhaseCopy =
    phasesCopy.find(
      (p) => sliderValue >= p.range[0] && sliderValue <= p.range[1]
    ) || phasesCopy[0];

  return (
    <section
      id="inside-massage"
      className="relative bg-obsidian py-24 sm:py-32 lg:py-36 border-t border-rose/15 overflow-hidden"
    >
      {/* Subtle Background Glow in Soft Rose */}
      <div className="absolute top-1/2 right-0 -translate-y-1/2 w-[500px] h-[500px] bg-rose/5 blur-[130px] rounded-full pointer-events-none" />

      <div className="max-w-[1280px] mx-auto px-5 sm:px-8 lg:px-12 relative z-10">
        {/* Section Header */}
        <div className="max-w-2xl text-left mb-12 sm:mb-16">
          <span className="inline-flex items-center gap-2 text-[11px] sm:text-xs font-sans font-bold uppercase tracking-[0.22em] text-rose mb-3 sm:mb-4">
            <Activity className="w-3.5 h-3.5" />
            Inside The Massage
          </span>
          <h2 className="font-serif text-3xl sm:text-4xl md:text-5xl text-white font-normal leading-[1.18] tracking-tight mb-4">
            See what happens beneath the surface.
          </h2>
          <p className="text-base sm:text-lg text-taupe leading-relaxed">
            Explore common muscle areas people often ask therapists to focus on
            during a session, and visualize how therapeutic bodywork encourages ease.
          </p>
        </div>

        {/* 2-Column Responsive Layout */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-14 items-center">
          {/* Left Column: Interactive Slider & Phase Information */}
          <div className="lg:col-span-5 space-y-8 order-2 lg:order-1">
            {/* Live Phase Text Box */}
            <div className="p-6 sm:p-7 rounded-2xl bg-surface-raised border border-rose/20 relative overflow-hidden shadow-md">
              <div className="absolute top-0 left-0 w-1.5 h-full bg-rose" />
              <AnimatePresence mode="wait">
                <motion.div
                  key={activePhaseCopy.label}
                  initial={{ opacity: 0, y: 12 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -12 }}
                  transition={{ duration: 0.3 }}
                >
                  <span className="text-[11px] font-sans font-bold uppercase tracking-[0.2em] text-rose block mb-1.5">
                    Phase {activePhaseCopy.phase} · {activePhaseCopy.label}
                  </span>
                  <h3 className="font-serif text-2xl text-white font-medium mb-2.5">
                    {activePhaseCopy.headline}
                  </h3>
                  <p className="text-xs sm:text-sm text-taupe leading-relaxed">
                    {activePhaseCopy.body}
                  </p>
                </motion.div>
              </AnimatePresence>
            </div>

            {/* Interactive Anatomical Slider */}
            <div className="p-5 rounded-2xl bg-surface-dark border border-rose/15 shadow-sm">
              <AnatomySlider value={sliderValue} onChange={setSliderValue} />
            </div>

            {/* Muscle Region Buttons & Info Card */}
            <MuscleRegionSelector
              activeRegion={activeRegion}
              onSelectRegion={setActiveRegion}
              onSelectTreatmentName={(name) => onOpenBooking(name)}
            />

            {/* Medical Wellness Disclaimer */}
            <div className="flex items-start gap-2.5 p-3.5 rounded-xl bg-surface-raised/60 border border-rose/15 text-[11px] text-taupe/90 leading-normal">
              <ShieldAlert className="w-4 h-4 text-rose flex-shrink-0 mt-0.5" />
              <span>
                <strong className="text-cream">Educational wellness visualization only.</strong> Massage may
                help with temporary muscle tension, stiffness and relaxation. It
                is not a substitute for medical diagnosis or clinical treatment.
              </span>
            </div>
          </div>

          {/* Right Column: Visual Stage */}
          <div className="lg:col-span-7 order-1 lg:order-2">
            <AnatomyVisual
              sliderValue={sliderValue}
              activeRegion={activeRegion}
            />
          </div>
        </div>
      </div>
    </section>
  );
}
