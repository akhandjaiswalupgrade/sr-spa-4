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
      className="relative bg-[#f5f0eb] py-24 sm:py-32 lg:py-36 border-t border-slate-200/80"
    >
      <div className="max-w-[1280px] mx-auto px-5 sm:px-8 lg:px-12">
        {/* Section Header */}
        <div className="max-w-2xl text-left mb-12 sm:mb-16">
          <span className="inline-block text-[11px] sm:text-xs font-sans font-bold uppercase tracking-[0.22em] text-[#c83b74] bg-white px-3.5 py-1 rounded-full border border-slate-200 shadow-sm mb-4">
            Why Shirui
          </span>
          <h2 className="font-serif text-3xl sm:text-4xl md:text-5xl text-slate-900 font-normal leading-[1.18] tracking-tight mb-4">
            The details you may not notice are the ones that{" "}
            <span className="italic font-serif bg-gradient-to-r from-[#df548f] via-[#c83b74] to-[#a81d52] bg-clip-text text-transparent">
              matter most
            </span>
            .
          </h2>
          <p className="text-base sm:text-lg text-slate-700 leading-relaxed font-medium">
            We hold ourselves to uncompromising standards of privacy, therapist
            excellence, and personalized hospitality.
          </p>
        </div>

        {/* 6 Trust Cards Grid with Tactile 3D Depth */}
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
                className="p-6 sm:p-8 rounded-2xl bg-white border border-slate-200/90 shadow-3d hover:shadow-3d-hover hover:-translate-y-1.5 transition-all duration-300 group flex flex-col justify-between"
              >
                <div>
                  <div className="w-14 h-14 rounded-2xl bg-[#f5f0eb] border border-slate-200/90 shadow-button-secondary-3d flex items-center justify-center text-[#c83b74] mb-6 group-hover:bg-gradient-to-b group-hover:from-[#df548f] group-hover:to-[#c83b74] group-hover:text-white group-hover:shadow-button-3d transition-all duration-300">
                    <Icon className="w-6 h-6 stroke-[1.8]" />
                  </div>

                  <h3 className="font-serif text-xl sm:text-2xl text-slate-900 font-bold mb-3">
                    {card.title}
                  </h3>

                  <p className="text-xs sm:text-sm text-slate-700 leading-relaxed">
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
