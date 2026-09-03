"use client";

import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ChevronDown, HelpCircle } from "lucide-react";
import { faqsData, FAQItem } from "@/data/faqs";
import { trackEvent } from "@/lib/analytics";

export function FAQ() {
  const [openId, setOpenId] = useState<string | null>(faqsData[0].id);
  const [filterCategory, setFilterCategory] = useState<string>("All");

  const categories = ["All", "Treatments", "General", "Booking & Visit"];

  const filteredFaqs =
    filterCategory === "All"
      ? faqsData
      : faqsData.filter((f) => f.category === filterCategory);

  const toggleAccordion = (id: string) => {
    const isOpening = openId !== id;
    setOpenId(isOpening ? id : null);
    if (isOpening) {
      trackEvent("faq_open", { faqId: id });
    }
  };

  return (
    <section
      id="faq"
      className="relative bg-surface-dark py-20 sm:py-28 lg:py-36 border-t border-white/[0.07]"
    >
      <div className="max-w-[1280px] mx-auto px-5 sm:px-8 lg:px-12">
        {/* Section Header */}
        <div className="max-w-2xl text-left mb-12 sm:mb-16">
          <span className="inline-flex items-center gap-2 text-[11px] sm:text-xs font-sans font-semibold uppercase tracking-[0.22em] text-gold mb-3 sm:mb-4">
            <HelpCircle className="w-3.5 h-3.5" />
            Frequently Asked Questions
          </span>
          <h2 className="font-serif text-3xl sm:text-4xl md:text-5xl text-cream font-normal leading-[1.18] tracking-tight mb-4">
            Before you visit.
          </h2>
          <p className="text-base sm:text-lg text-taupe leading-relaxed">
            Everything you need to know about preparing for your session, pressure
            choices, private suites, and bookings.
          </p>
        </div>

        {/* Category Filters */}
        <div className="flex items-center gap-2 pb-4 mb-8 sm:mb-10 overflow-x-auto no-scrollbar -mx-5 px-5 sm:mx-0 sm:px-0">
          {categories.map((cat) => {
            const isSelected = filterCategory === cat;
            return (
              <button
                key={cat}
                type="button"
                onClick={() => setFilterCategory(cat)}
                className={`flex-shrink-0 px-4 py-2 rounded-full text-xs font-sans font-medium uppercase tracking-wider transition-all ${
                  isSelected
                    ? "bg-gold text-obsidian font-semibold shadow-gold-subtle"
                    : "bg-surface-raised border border-white/10 text-taupe hover:text-cream hover:border-white/20"
                }`}
              >
                {cat}
              </button>
            );
          })}
        </div>

        {/* Accordion List */}
        <div className="max-w-3xl mx-auto space-y-3.5">
          {filteredFaqs.map((faq) => {
            const isOpen = openId === faq.id;
            return (
              <div
                key={faq.id}
                className={`rounded-card border transition-all duration-300 overflow-hidden ${
                  isOpen
                    ? "bg-surface-raised border-gold/30 shadow-lg"
                    : "bg-surface-raised/70 border-white/[0.08] hover:border-white/20"
                }`}
              >
                <button
                  type="button"
                  onClick={() => toggleAccordion(faq.id)}
                  aria-expanded={isOpen}
                  className="w-full flex items-center justify-between p-5 sm:p-6 text-left focus:outline-none focus-visible:ring-1 focus-visible:ring-gold"
                >
                  <span className="font-serif text-lg sm:text-xl text-cream font-medium pr-4">
                    {faq.question}
                  </span>
                  <div
                    className={`w-8 h-8 rounded-full flex items-center justify-center flex-shrink-0 transition-all duration-300 ${
                      isOpen
                        ? "bg-gold text-obsidian rotate-180"
                        : "bg-white/[0.05] text-taupe"
                    }`}
                  >
                    <ChevronDown className="w-4 h-4" />
                  </div>
                </button>

                <AnimatePresence initial={false}>
                  {isOpen && (
                    <motion.div
                      initial={{ height: 0, opacity: 0 }}
                      animate={{ height: "auto", opacity: 1 }}
                      exit={{ height: 0, opacity: 0 }}
                      transition={{ duration: 0.3, ease: [0.22, 1, 0.36, 1] }}
                    >
                      <div className="px-5 sm:px-6 pb-6 pt-1 text-sm sm:text-base text-taupe leading-relaxed border-t border-white/[0.04]">
                        {faq.answer}
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
