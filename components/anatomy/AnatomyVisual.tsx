"use client";

import React from "react";
import Image from "next/image";
import { motion } from "framer-motion";
import { MuscleRegion } from "@/components/anatomy/MuscleRegionSelector";

interface AnatomyVisualProps {
  sliderValue: number; // 0 to 100
  activeRegion: MuscleRegion;
}

export function AnatomyVisual({ sliderValue, activeRegion }: AnatomyVisualProps) {
  // Compute opacity for the muscle overlay layer (0 = fully base skin, 100 = full muscle structure)
  const muscleOpacity = sliderValue / 100;

  return (
    <div className="relative w-full aspect-[16/10] sm:aspect-[16/9] lg:aspect-[16/10] min-h-[380px] sm:min-h-[500px] lg:min-h-[580px] rounded-visual overflow-hidden bg-surface-dark border border-white/10 shadow-2xl">
      {/* Base Layer: Natural Spa Client & Therapist */}
      <div className="absolute inset-0">
        <Image
          src="/images/shirui-anatomy-base.jpg"
          alt="Base treatment posture at Shirui Wellness Spa"
          fill
          sizes="(max-width: 1024px) 100vw, 60vw"
          className="object-cover object-center"
          priority
        />
      </div>

      {/* Anatomical Muscle Layer: Pixel-aligned overlay */}
      <div
        className="absolute inset-0 transition-opacity duration-150 ease-out pointer-events-none"
        style={{ opacity: muscleOpacity }}
      >
        <Image
          src="/images/shirui-anatomy-muscles.jpg"
          alt="Anatomical muscle layer visualization showing trapezius, rhomboids, deltoid and erector spinae"
          fill
          sizes="(max-width: 1024px) 100vw, 60vw"
          className="object-cover object-center"
        />
      </div>

      {/* Atmospheric Ambient Overlays */}
      <div className="absolute inset-0 bg-gradient-to-t from-obsidian/90 via-transparent to-black/20 pointer-events-none" />
      <div className="absolute inset-0 bg-gradient-to-r from-obsidian/40 via-transparent to-obsidian/40 pointer-events-none" />

      {/* Warm Relaxation Glow (Phase 3 & 4: 50% - 100%) */}
      {sliderValue >= 50 && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: (sliderValue - 50) / 50 }}
          transition={{ duration: 0.5 }}
          className="absolute inset-0 bg-[radial-gradient(ellipse_at_50%_65%,rgba(201,169,107,0.18)_0%,transparent_60%)] pointer-events-none"
        />
      )}

      {/* Active Muscle Pinpoint Glow on Body */}
      {activeRegion && (
        <div
          className="absolute z-20 -translate-x-1/2 -translate-y-1/2 pointer-events-none"
          style={{
            left: `${activeRegion.pin.x}%`,
            top: `${activeRegion.pin.y}%`,
          }}
        >
          {/* Pulsing Target Rings */}
          <div className="relative flex items-center justify-center">
            <span className="animate-ping absolute inline-flex h-10 w-10 rounded-full bg-gold opacity-75" />
            <span className="relative inline-flex rounded-full h-4 w-4 bg-gold border-2 border-obsidian shadow-luxury-glow" />

            {/* Muscle Callout Badge */}
            <motion.div
              initial={{ opacity: 0, y: 8, scale: 0.9 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              key={activeRegion.id}
              className="absolute left-6 bottom-4 whitespace-nowrap bg-obsidian/95 backdrop-blur-md border border-gold/40 rounded-xl px-3 py-1.5 shadow-2xl"
            >
              <span className="text-[10px] uppercase tracking-wider text-gold font-sans font-bold block">
                Target Zone
              </span>
              <span className="text-xs font-serif text-cream font-medium">
                {activeRegion.name}
              </span>
            </motion.div>
          </div>
        </div>
      )}

      {/* Watermark/Status Indicator */}
      <div className="absolute top-4 left-4 z-20 flex items-center gap-2 bg-obsidian/85 backdrop-blur-md px-3 py-1.5 rounded-full border border-white/10">
        <span className="w-2 h-2 rounded-full bg-gold animate-pulse" />
        <span className="text-[10px] font-sans uppercase tracking-widest text-cream/90 font-medium">
          Interactive Anatomy Simulation
        </span>
      </div>
    </div>
  );
}
