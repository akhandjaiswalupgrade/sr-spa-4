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
    <div className="relative w-full aspect-[16/10] sm:aspect-[16/9] lg:aspect-[16/10] min-h-[380px] sm:min-h-[500px] lg:min-h-[580px] rounded-2xl overflow-hidden bg-slate-100 border border-slate-200/90 shadow-3d">
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

      {/* Atmospheric Ambient Scrim */}
      <div className="absolute inset-0 bg-gradient-to-t from-black/25 via-transparent to-transparent pointer-events-none" />

      {/* Warm Relaxation Glow in Soft Rose (Phase 3 & 4: 50% - 100%) */}
      {sliderValue >= 50 && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: (sliderValue - 50) / 50 }}
          transition={{ duration: 0.5 }}
          className="absolute inset-0 bg-[radial-gradient(ellipse_at_50%_65%,rgba(200,59,116,0.22)_0%,transparent_60%)] pointer-events-none"
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
            <span className="animate-ping absolute inline-flex h-10 w-10 rounded-full bg-[#df548f] opacity-75" />
            <span className="relative inline-flex rounded-full h-4.5 w-4.5 bg-gradient-to-r from-[#df548f] to-[#c83b74] border-2 border-white shadow-md" />

            {/* Muscle Callout Badge */}
            <motion.div
              initial={{ opacity: 0, y: 8, scale: 0.9 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              key={activeRegion.id}
              className="absolute left-6 bottom-4 whitespace-nowrap bg-white/95 backdrop-blur-md border border-rose-200 rounded-xl px-4 py-2 shadow-3d"
            >
              <span className="text-[10px] uppercase tracking-wider text-[#c83b74] font-sans font-bold block">
                Target Zone
              </span>
              <span className="text-xs font-serif text-slate-900 font-bold">
                {activeRegion.name}
              </span>
            </motion.div>
          </div>
        </div>
      )}

      {/* Watermark/Status Indicator */}
      <div className="absolute top-4 left-4 z-20 flex items-center gap-2 bg-white/95 backdrop-blur-md px-4 py-2 rounded-full border border-slate-200/90 text-slate-900 shadow-3d">
        <span className="w-2.5 h-2.5 rounded-full bg-[#c83b74] animate-pulse" />
        <span className="text-[10px] font-sans uppercase tracking-widest text-slate-900 font-bold">
          Interactive Anatomy Simulation
        </span>
      </div>
    </div>
  );
}
