"use client";

import React, { useRef, useCallback } from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { trackEvent } from "@/lib/analytics";

interface AnatomySliderProps {
  value: number; // 0 - 100
  onChange: (newValue: number) => void;
}

export function AnatomySlider({ value, onChange }: AnatomySliderProps) {
  const trackRef = useRef<HTMLDivElement>(null);

  const getPhaseInfo = (val: number) => {
    if (val < 25) return { phase: "01", label: "TENSION", state: "Muscle tightness build-up" };
    if (val < 50) return { phase: "02", label: "TREATMENT", state: "Therapist pressure applied" };
    if (val < 75) return { phase: "03", label: "RELEASE", state: "Tension begins easing" };
    return { phase: "04", label: "RELAXED", state: "Calm, restored tissue state" };
  };

  const currentPhase = getPhaseInfo(value);

  const handlePointerDown = (e: React.PointerEvent<HTMLDivElement>) => {
    e.currentTarget.setPointerCapture(e.pointerId);
    handlePointerMove(e);
    trackEvent("anatomy_interaction", { value });
  };

  const handlePointerMove = useCallback(
    (e: React.PointerEvent<HTMLDivElement>) => {
      if (e.buttons !== 1 && e.type !== "pointerdown") return;
      if (!trackRef.current) return;

      const rect = trackRef.current.getBoundingClientRect();
      const clientX = e.clientX;
      const offsetX = Math.max(0, Math.min(clientX - rect.left, rect.width));
      const percentage = Math.round((offsetX / rect.width) * 100);
      onChange(percentage);
    },
    [onChange]
  );

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === "ArrowRight" || e.key === "ArrowUp") {
      e.preventDefault();
      onChange(Math.min(100, value + 5));
    } else if (e.key === "ArrowLeft" || e.key === "ArrowDown") {
      e.preventDefault();
      onChange(Math.max(0, value - 5));
    }
  };

  return (
    <div className="w-full space-y-3 select-none">
      {/* Phase Status Banner */}
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-2">
          <span className="font-serif text-sm font-bold bg-gradient-to-r from-[#df548f] to-[#c83b74] bg-clip-text text-transparent">
            {currentPhase.phase}
          </span>
          <span className="text-xs uppercase tracking-[0.2em] font-sans font-bold text-slate-900 bg-white px-2.5 py-0.5 rounded-full border border-slate-200 shadow-sm">
            {currentPhase.label}
          </span>
        </div>
        <span className="text-xs text-slate-600 font-sans font-medium">
          {currentPhase.state} ({value}%)
        </span>
      </div>

      {/* Interactive Slider Track */}
      <div
        ref={trackRef}
        role="slider"
        aria-label="Reveal muscle visualization"
        aria-valuemin={0}
        aria-valuemax={100}
        aria-valuenow={value}
        tabIndex={0}
        onKeyDown={handleKeyDown}
        onPointerDown={handlePointerDown}
        onPointerMove={handlePointerMove}
        className="relative h-14 w-full flex items-center cursor-ew-resize touch-none focus:outline-none focus-visible:ring-2 focus-visible:ring-rose rounded-full px-2"
        style={{ touchAction: "none" }}
      >
        {/* Track Line Background with 3D Inset Groove */}
        <div className="absolute inset-x-0 h-3 bg-slate-200/90 rounded-full overflow-hidden shadow-inset-groove border border-slate-300/50">
          {/* Active Colored Fill in Rich Vibrant Rose */}
          <div
            className="h-full bg-gradient-to-r from-[#df548f] via-[#c83b74] to-[#a81d52] transition-all duration-75"
            style={{ width: `${value}%` }}
          />
        </div>

        {/* Phase Step Tick Markers */}
        <div className="absolute inset-x-0 flex justify-between px-1 pointer-events-none">
          {[0, 25, 50, 75, 100].map((step) => (
            <div
              key={step}
              className={`w-1 h-3.5 rounded-full transition-colors ${
                value >= step ? "bg-white shadow-sm" : "bg-slate-300"
              }`}
            />
          ))}
        </div>

        {/* 44px 3D Tactile Dial Drag Handle */}
        <div
          className="absolute top-1/2 -translate-y-1/2 w-11 h-11 rounded-full bg-gradient-to-b from-[#e35691] to-[#af2762] text-white shadow-dial-3d border-2 border-white flex items-center justify-center -ml-5.5 transition-transform active:scale-95 pointer-events-none"
          style={{ left: `${value}%` }}
        >
          <div className="flex items-center -space-x-1 drop-shadow-sm">
            <ChevronLeft className="w-4 h-4 text-white stroke-[2.5]" />
            <ChevronRight className="w-4 h-4 text-white stroke-[2.5]" />
          </div>
        </div>
      </div>

      {/* Slider Helper Guidance */}
      <div className="flex items-center justify-between text-[11px] text-slate-600 font-sans font-medium pt-1">
        <span>◀ Skin Surface</span>
        <span>Drag to reveal muscular structure ▶</span>
      </div>
    </div>
  );
}
