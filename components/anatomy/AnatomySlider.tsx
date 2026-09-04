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
          <span className="font-serif text-sm text-rose font-bold">
            {currentPhase.phase}
          </span>
          <span className="text-xs uppercase tracking-[0.2em] font-sans font-bold text-white">
            {currentPhase.label}
          </span>
        </div>
        <span className="text-xs text-taupe font-sans">
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
        className="relative h-12 w-full flex items-center cursor-ew-resize touch-none focus:outline-none focus-visible:ring-2 focus-visible:ring-rose rounded-full px-2"
        style={{ touchAction: "none" }}
      >
        {/* Track Line Background */}
        <div className="absolute inset-x-0 h-2.5 bg-white/10 rounded-full overflow-hidden">
          {/* Active Colored Fill in Soft Pink */}
          <div
            className="h-full bg-gradient-to-r from-rose/40 via-rose to-rose-light transition-all duration-75"
            style={{ width: `${value}%` }}
          />
        </div>

        {/* Phase Step Tick Markers */}
        <div className="absolute inset-x-0 flex justify-between px-1 pointer-events-none">
          {[0, 25, 50, 75, 100].map((step) => (
            <div
              key={step}
              className={`w-1 h-3 rounded-full transition-colors ${
                value >= step ? "bg-rose" : "bg-white/20"
              }`}
            />
          ))}
        </div>

        {/* 44px Circular Drag Handle */}
        <div
          className="absolute top-1/2 -translate-y-1/2 w-11 h-11 rounded-full bg-rose text-obsidian shadow-rose-glow flex items-center justify-center -ml-5.5 transition-transform active:scale-110 pointer-events-none"
          style={{ left: `${value}%` }}
        >
          <div className="flex items-center -space-x-1">
            <ChevronLeft className="w-4 h-4 text-obsidian font-bold" />
            <ChevronRight className="w-4 h-4 text-obsidian font-bold" />
          </div>
        </div>
      </div>

      {/* Slider Helper Guidance */}
      <div className="flex items-center justify-between text-[11px] text-muted font-sans pt-1">
        <span>◀ Skin Surface</span>
        <span>Drag to reveal muscular structure ▶</span>
      </div>
    </div>
  );
}
