"use client";

import React from "react";
import { motion } from "framer-motion";
import {
  DoorClosed,
  ShieldCheck,
  Sparkles,
  SlidersHorizontal,
  Moon,
  Receipt,
} from "lucide-react";

interface TrustCard {
  icon: React.ElementType;
  title: string;
  description: string;
}

const trustCards: TrustCard[] = [
  {
    icon: DoorClosed,
    title: "Private Treatment Rooms",
    description:
      "Independent, sound-dampened single suites with dedicated climate zoning and private changing amenities.",
  },
  {
    icon: ShieldCheck,
    title: "Professional Care",
    description:
      "Trained wellness therapists delivering attentive care with strict boundary respect and hygiene standards.",
  },
  {
    icon: Sparkles,
    title: "Fresh Preparation",
    description:
      "100% organic cotton linens, sanitized headrests, and freshly warmed botanical oils prepared for each guest.",
  },
  {
    icon: SlidersHorizontal,
    title: "Pressure Preference",
    description:
      "Light, medium, or firm calibrated to your exact comfort and updated dynamically throughout your session.",
  },
  {
    icon: Moon,
    title: "Premium Ambience",
    description:
      "Concealed 3000K warm lighting, subtle natural materials, and quiet acoustics designed to quiet mental chatter.",
  },
  {
    icon: Receipt,
    title: "Clear Experience",
    description:
      "Transparent duration options, inclusions, and fixed pricing with zero hidden fees or rushed handoffs.",
  },
];

export function WhyShirui() {
  return (
    <section
      id="why-shirui"
      className="relative bg-surface-dark py-20 sm:py-28 lg:py-36 border-t border-white/[0.07]"
    >
      <div className="max-w-[1280px] mx-auto px-5 sm:px-8 lg:px-12">
        {/* Section Header */}
        <div className="max-w-2xl text-left mb-12 sm:mb-16">
          <span className="inline-block text-[11px] sm:text-xs font-sans font-semibold uppercase tracking-[0.22em] text-gold mb-3 sm:mb-4">
            Why Shirui
          </span>
          <h2 className="font-serif text-3xl sm:text-4xl md:text-5xl text-cream font-normal leading-[1.18] tracking-tight mb-4">
            The details you may not notice are the ones that matter most.
          </h2>
          <p className="text-base sm:text-lg text-taupe leading-relaxed">
            We hold ourselves to uncompromising standards of privacy, therapist
            excellence, and personalized hospitality.
          </p>
        </div>

        {/* 6 Trust Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8">
          {trustCards.map((card, idx) => {
            const Icon = card.icon;
            return (
              <motion.div
                key={idx}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-40px" }}
                transition={{ duration: 0.5, delay: idx * 0.08 }}
                className="p-6 sm:p-8 rounded-card bg-surface-raised border border-white/[0.08] hover:border-gold/30 hover:-translate-y-1 transition-all duration-300 group flex flex-col justify-between"
              >
                <div>
                  <div className="w-12 h-12 rounded-2xl bg-gold/10 border border-gold/20 flex items-center justify-center text-gold mb-6 group-hover:bg-gold group-hover:text-obsidian transition-colors duration-300">
                    <Icon className="w-6 h-6" />
                  </div>

                  <h3 className="font-serif text-xl sm:text-2xl text-cream font-medium mb-3">
                    {card.title}
                  </h3>

                  <p className="text-xs sm:text-sm text-taupe leading-relaxed">
                    {card.description}
                  </p>
                </div>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
