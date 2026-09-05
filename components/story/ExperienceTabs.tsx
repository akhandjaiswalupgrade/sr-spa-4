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
      className="relative bg-[#f5f0eb] py-24 sm:py-32 lg:py-36 border-t border-slate-200/80"
    >
      <div className="max-w-[1280px] mx-auto px-5 sm:px-8 lg:px-12">
        {/* Section Header */}
        <div className="max-w-2xl text-left mb-12 sm:mb-16">
          <span className="inline-block text-[11px] sm:text-xs font-sans font-bold uppercase tracking-[0.22em] text-[#c83b74] bg-white px-3.5 py-1 rounded-full border border-slate-200 shadow-sm mb-4">
            Feel The Difference
          </span>
          <h2 className="font-serif text-3xl sm:text-4xl md:text-5xl text-slate-900 font-normal leading-[1.18] tracking-tight mb-4">
            The experience is in{" "}
            <span className="italic font-serif bg-gradient-to-r from-[#df548f] via-[#c83b74] to-[#a81d52] bg-clip-text text-transparent">
              the details
            </span>
            .
          </h2>
          <p className="text-base sm:text-lg text-slate-700 leading-relaxed font-medium">
            From the warmth of our lighting to the unhurried tea ritual afterward,
            discover the thoughtful nuances that make Shirui special.
          </p>
        </div>

        {/* Tab Navigation Buttons */}
        <div className="flex items-center gap-2.5 sm:gap-3.5 overflow-x-auto pb-4 mb-8 sm:mb-12 no-scrollbar -mx-5 px-5 sm:mx-0 sm:px-0">
          {experienceTabsData.map((tab) => {
            const isSelected = tab.id === activeTab;
            return (
              <button
                key={tab.id}
                type="button"
                onClick={() => setActiveTab(tab.id)}
                className={`relative flex-shrink-0 px-5 sm:px-6 py-3 rounded-xl text-xs font-sans uppercase tracking-[0.16em] transition-all duration-200 font-bold ${
                  isSelected
                    ? "bg-gradient-to-b from-[#df548f] to-[#c83b74] text-white font-bold shadow-button-3d border-t border-white/35 border-b border-rose-900/40 scale-[1.02]"
                    : "bg-white border border-slate-200/90 text-slate-700 hover:text-slate-900 hover:border-rose/40 shadow-button-secondary-3d hover:-translate-y-0.5 active:translate-y-0.5"
                }`}
              >
                <span>{tab.label}</span>
              </button>
            );
          })}
        </div>

        {/* Tab Content Display */}
        <div className="relative rounded-2xl bg-white border border-slate-200/90 overflow-hidden shadow-3d p-6 sm:p-10 lg:p-12">
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
                <span className="inline-block px-4 py-1.5 rounded-xl bg-[#f5f0eb] text-[#c83b74] border border-slate-200/90 text-xs font-sans uppercase tracking-wider font-bold shadow-sm">
                  {currentTab.highlight}
                </span>

                <h3 className="font-serif text-2xl sm:text-3xl md:text-4xl text-slate-900 font-bold leading-[1.2]">
                  {currentTab.headline}
                </h3>

                <p className="text-sm sm:text-base text-slate-700 leading-relaxed text-pretty">
                  {currentTab.body}
                </p>
              </div>

              {/* Right Image */}
              <div className="lg:col-span-6">
                <div className="relative aspect-[16/10] sm:aspect-[16/9] w-full rounded-2xl overflow-hidden border border-slate-200/90 shadow-3d">
                  <Image
                    src={currentTab.image}
                    alt={currentTab.headline}
                    fill
                    sizes="(max-width: 1024px) 100vw, 50vw"
                    className="object-cover object-center"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/25 via-transparent to-transparent pointer-events-none" />
                </div>
              </div>
            </motion.div>
          </AnimatePresence>
        </div>
      </div>
    </section>
  );
}
