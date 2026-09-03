"use client";

import React from "react";
import { Sparkles, ArrowRight } from "lucide-react";
import { trackEvent } from "@/lib/analytics";

export interface MuscleRegion {
  id: string;
  name: string;
  muscleName: string;
  description: string;
  recommendedTreatments: {
    name: string;
    slug: string;
  }[];
  // SVG Pin coordinates (% of width & height on back visual)
  pin: { x: number; y: number };
  highlightArea: string; // descriptive SVG path or polygon
}

export const muscleRegionsData: MuscleRegion[] = [
  {
    id: "neck-shoulders",
    name: "Neck & Shoulders",
    muscleName: "Upper Trapezius & Levator Scapulae",
    description:
      "Commonly requested after long hours of screen use, laptop posture, driving or stressful workdays.",
    recommendedTreatments: [
      { name: "Swedish Relaxation", slug: "swedish-relaxation" },
      { name: "Deep Tissue Therapy", slug: "deep-tissue-massage" },
      { name: "Head, Neck & Shoulder Focus", slug: "head-neck-shoulder-relief" },
    ],
    pin: { x: 40, y: 68 },
    highlightArea: "M 32 65 Q 40 58 48 65 Q 44 75 32 75 Z",
  },
  {
    id: "upper-back",
    name: "Upper Back",
    muscleName: "Rhomboids & Mid-Trapezius",
    description:
      "The shoulder-blade region can feel fatigued after prolonged sitting, repetitive lifting, or workout training.",
    recommendedTreatments: [
      { name: "Deep Tissue Therapy", slug: "deep-tissue-massage" },
      { name: "Balinese Acupressure", slug: "balinese-massage" },
      { name: "Signature Shirui 90-Min", slug: "signature-shirui-massage" },
    ],
    pin: { x: 49, y: 72 },
    highlightArea: "M 42 66 Q 52 64 58 72 Q 48 80 42 74 Z",
  },
  {
    id: "mid-back",
    name: "Mid Back",
    muscleName: "Latissimus Dorsi & Thoracic Paraspinals",
    description:
      "Stabilizes trunk posture and can feel restricted after long periods in ergonomic office chairs.",
    recommendedTreatments: [
      { name: "Balinese Acupressure", slug: "balinese-massage" },
      { name: "Swedish Relaxation", slug: "swedish-relaxation" },
      { name: "Signature Shirui", slug: "signature-shirui-massage" },
    ],
    pin: { x: 55, y: 76 },
    highlightArea: "M 48 70 Q 60 72 62 82 Q 50 82 48 74 Z",
  },
  {
    id: "lower-back",
    name: "Lower Back",
    muscleName: "Erector Spinae & Thoracolumbar Fascia",
    description:
      "People commonly request focused attention here after prolonged sitting or standing. Therapists adapt pressure carefully around your lumbar comfort.",
    recommendedTreatments: [
      { name: "Deep Tissue Therapy", slug: "deep-tissue-massage" },
      { name: "Signature Shirui 90-Min", slug: "signature-shirui-massage" },
      { name: "Swedish Relaxation", slug: "swedish-relaxation" },
    ],
    pin: { x: 62, y: 76 },
    highlightArea: "M 55 72 Q 68 74 68 84 Q 56 86 54 76 Z",
  },
  {
    id: "legs",
    name: "Legs & Glutes",
    muscleName: "Gluteus Medius & Hamstring Bands",
    description:
      "Essential for active mobility, running, and relieving heavy leg sensations after prolonged standing.",
    recommendedTreatments: [
      { name: "Thai Assisted Mobility", slug: "thai-assisted-bodywork" },
      { name: "Balinese Acupressure", slug: "balinese-massage" },
      { name: "Deep Tissue Therapy", slug: "deep-tissue-massage" },
    ],
    pin: { x: 74, y: 74 },
    highlightArea: "M 66 72 Q 80 72 82 82 Q 68 84 66 74 Z",
  },
  {
    id: "feet",
    name: "Feet & Calves",
    muscleName: "Plantar Fascia & Gastrocnemius",
    description:
      "Reflexology pressure points revitalize tired feet, supporting overall body balance and systemic relaxation.",
    recommendedTreatments: [
      { name: "Restorative Foot Care", slug: "foot-relaxation-therapy" },
      { name: "Aromatherapy Botanical", slug: "aromatherapy-massage" },
      { name: "Signature Shirui Immersion", slug: "signature-shirui-massage" },
    ],
    pin: { x: 86, y: 72 },
    highlightArea: "M 80 70 Q 92 70 94 80 Q 82 82 80 72 Z",
  },
];

interface MuscleRegionSelectorProps {
  activeRegion: MuscleRegion;
  onSelectRegion: (region: MuscleRegion) => void;
  onSelectTreatmentName: (name: string) => void;
}

export function MuscleRegionSelector({
  activeRegion,
  onSelectRegion,
  onSelectTreatmentName,
}: MuscleRegionSelectorProps) {
  return (
    <div className="space-y-4">
      {/* Zone Button Pills */}
      <div>
        <span className="text-[11px] uppercase tracking-[0.16em] font-sans font-semibold text-muted block mb-2.5">
          Select Muscle Region to Explore:
        </span>
        <div className="flex flex-wrap gap-2">
          {muscleRegionsData.map((region) => {
            const isSelected = activeRegion.id === region.id;
            return (
              <button
                key={region.id}
                type="button"
                onClick={() => {
                  trackEvent("muscle_region_select", { muscleRegion: region.name });
                  onSelectRegion(region);
                }}
                className={`px-3 py-1.5 rounded-full text-xs font-sans font-medium transition-all ${
                  isSelected
                    ? "bg-gold text-obsidian font-semibold shadow-gold-subtle scale-105"
                    : "bg-surface-raised border border-white/10 text-taupe hover:text-cream hover:border-white/20"
                }`}
              >
                {region.name}
              </button>
            );
          })}
        </div>
      </div>

      {/* Selected Region Detailed Card */}
      <div className="p-4 sm:p-5 rounded-2xl bg-surface-raised/80 border border-white/10">
        <div className="flex items-center justify-between gap-2 mb-1.5">
          <h4 className="font-serif text-lg sm:text-xl text-cream font-medium">
            {activeRegion.name}
          </h4>
          <span className="text-[11px] font-sans text-gold font-medium bg-gold/10 px-2 py-0.5 rounded-full">
            {activeRegion.muscleName}
          </span>
        </div>

        <p className="text-xs sm:text-sm text-taupe leading-relaxed mb-4">
          {activeRegion.description}
        </p>

        {/* Recommended Therapies */}
        <div className="pt-3 border-t border-white/[0.07]">
          <span className="text-[10px] uppercase tracking-[0.16em] font-sans font-semibold text-muted block mb-2">
            Recommended Experiences:
          </span>
          <div className="flex flex-wrap gap-2">
            {activeRegion.recommendedTreatments.map((t, idx) => (
              <button
                key={idx}
                type="button"
                onClick={() => onSelectTreatmentName(t.name)}
                className="inline-flex items-center gap-1.5 text-xs font-sans font-medium text-gold hover:text-gold-light bg-white/[0.04] hover:bg-white/[0.08] px-2.5 py-1 rounded-lg border border-gold/20 transition-colors"
              >
                <span>{t.name}</span>
                <ArrowRight className="w-3 h-3" />
              </button>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
