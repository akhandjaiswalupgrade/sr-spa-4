"use client";

import React, { useState } from "react";
import Image from "next/image";
import { motion, AnimatePresence } from "framer-motion";

interface ExperienceTab {
  id: string;
  label: string;
  headline: string;
  body: string;
  image: string;
  highlight: string;
}

const experienceTabsData: ExperienceTab[] = [
  {
    id: "space",
    label: "The Space",
    headline: "A space designed to quiet everything outside.",
    body: "Warm lighting, acoustic isolation, textured limestone and dark walnut wood help slow down your racing thoughts the moment you step into your private suite.",
    image: "/images/shirui-experience-space.jpg",
    highlight: "Private sound-insulated single suites",
  },
  {
    id: "ritual",
    label: "The Ritual",
    headline: "Your experience begins before the first touch.",
    body: "Your session starts with pre-treatment dialogue, aroma preferences, and unhurried time to settle onto a heated, premium-padded massage table.",
    image: "/images/shirui-experience-ritual.jpg",
    highlight: "Attentive pre-treatment consultation",
  },
  {
    id: "touch",
    label: "The Touch",
    headline: "Pressure should work with your comfort.",
    body: "Trained therapists understand that deeper pressure does not mean discomfort. Every glide, palm compression, and thumb hold is calibrated to your comfort.",
    image: "/images/shirui-experience-touch.jpg",
    highlight: "Calibrated manual pressure",
  },
  {
    id: "care",
    label: "The Care",
    headline: "Clean. Private. Thoughtfully prepared.",
    body: "Immaculately laundered single-use cream linens, sanitized headrests, and pure botanical extracts guarantee uncompromised hygiene and peace of mind.",
    image: "/images/shirui-experience-care.jpg",
    highlight: "Strict hygienic sanitation protocols",
  },
  {
    id: "after-feeling",
    label: "The After-Feeling",
    headline: "Leave feeling lighter than you arrived.",
    body: "No rushing out. Take your time enjoying warm herbal tea in our relaxation lounge while your muscles retain their restored, tension-free ease.",
    image: "/images/shirui-experience-after.jpg",
    highlight: "Unhurried recovery & herbal infusion",
  },
];

export function ExperienceTabs() {
  const [activeTab, setActiveTab] = useState<string>(experienceTabsData[0].id);

  const currentTab =
    experienceTabsData.find((t) => t.id === activeTab) || experienceTabsData[0];

  return (
    <section
      id="experience-story"
      className="relative bg-surface-dark py-20 sm:py-28 lg:py-36 border-t border-white/[0.07]"
    >
      <div className="max-w-[1280px] mx-auto px-5 sm:px-8 lg:px-12">
        {/* Section Header */}
        <div className="max-w-2xl text-left mb-12 sm:mb-16">
          <span className="inline-block text-[11px] sm:text-xs font-sans font-semibold uppercase tracking-[0.22em] text-gold mb-3 sm:mb-4">
            Feel The Difference
          </span>
          <h2 className="font-serif text-3xl sm:text-4xl md:text-5xl text-cream font-normal leading-[1.18] tracking-tight mb-4">
            The experience is in the details.
          </h2>
          <p className="text-base sm:text-lg text-taupe leading-relaxed">
            From the warmth of our lighting to the unhurried tea ritual afterward,
            discover the thoughtful nuances that make Shirui special.
          </p>
        </div>

        {/* Tab Navigation Buttons */}
        <div className="flex items-center gap-2 sm:gap-3 overflow-x-auto pb-4 mb-8 sm:mb-12 no-scrollbar -mx-5 px-5 sm:mx-0 sm:px-0">
          {experienceTabsData.map((tab) => {
            const isSelected = tab.id === activeTab;
            return (
              <button
                key={tab.id}
                type="button"
                onClick={() => setActiveTab(tab.id)}
                className={`relative flex-shrink-0 px-5 py-3 rounded-full text-xs font-sans uppercase tracking-[0.16em] transition-all duration-300 font-medium ${
                  isSelected
                    ? "bg-gold text-obsidian font-semibold shadow-luxury-glow"
                    : "bg-surface-raised border border-white/10 text-taupe hover:text-cream hover:border-white/20"
                }`}
              >
                <span>{tab.label}</span>
              </button>
            );
          })}
        </div>

        {/* Tab Content Display */}
        <div className="relative rounded-feature bg-surface-raised border border-white/10 overflow-hidden shadow-2xl p-6 sm:p-10 lg:p-12">
          <AnimatePresence mode="wait">
            <motion.div
              key={currentTab.id}
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -16 }}
              transition={{ duration: 0.4, ease: [0.22, 1, 0.36, 1] }}
              className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-center"
            >
              {/* Left Text */}
              <div className="lg:col-span-6 space-y-6">
                <span className="inline-block px-3 py-1 rounded-full bg-gold/10 text-gold border border-gold/20 text-xs font-sans uppercase tracking-wider font-semibold">
                  {currentTab.highlight}
                </span>

                <h3 className="font-serif text-2xl sm:text-3xl md:text-4xl text-cream font-normal leading-[1.2]">
                  {currentTab.headline}
                </h3>

                <p className="text-sm sm:text-base text-taupe leading-relaxed text-pretty">
                  {currentTab.body}
                </p>
              </div>

              {/* Right Image */}
              <div className="lg:col-span-6">
                <div className="relative aspect-[16/10] sm:aspect-[16/9] w-full rounded-visual overflow-hidden border border-white/10 shadow-lg">
                  <Image
                    src={currentTab.image}
                    alt={currentTab.headline}
                    fill
                    sizes="(max-width: 1024px) 100vw, 50vw"
                    className="object-cover object-center"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-obsidian/60 via-transparent to-transparent" />
                </div>
              </div>
            </motion.div>
          </AnimatePresence>
        </div>
      </div>
    </section>
  );
}
