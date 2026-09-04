"use client";

import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ChevronDown, HelpCircle, MessageCircle, Phone } from "lucide-react";
import { faqsData, FAQCategory, FAQItem } from "@/data/faqs";
import { getWhatsAppUrl, getCallUrl } from "@/lib/whatsapp";
import { trackEvent } from "@/lib/analytics";

export function FAQ() {
  const [activeCategory, setActiveCategory] = useState<FAQCategory>("ALL");
  const [openIds, setOpenIds] = useState<string[]>([faqsData[0].id]);

  const categories: { id: FAQCategory; label: string }[] = [
    { id: "ALL", label: "All Questions" },
    { id: "GENERAL", label: "General & First Visit" },
    { id: "TREATMENTS", label: "Treatments & Pressure" },
    { id: "BOOKING", label: "Booking & Policies" },
    { id: "FACILITIES", label: "Suites & Facilities" },
  ];

  const filteredFaqs =
    activeCategory === "ALL"
      ? faqsData
      : faqsData.filter((f) => f.category === activeCategory);

  const toggleAccordion = (id: string) => {
    trackEvent("faq_toggle", { faqId: id });
    setOpenIds((prev) =>
      prev.includes(id) ? prev.filter((item) => item !== id) : [...prev, id]
    );
  };

  return (
    <section
      id="faq"
      className="relative bg-surface-dark py-24 sm:py-32 lg:py-36 border-t border-rose/15"
    >
      <div className="max-w-[1280px] mx-auto px-5 sm:px-8 lg:px-12">
        {/* Section Header */}
        <div className="max-w-2xl text-left mb-12 sm:mb-16">
          <span className="inline-block text-[11px] sm:text-xs font-sans font-bold uppercase tracking-[0.22em] text-rose mb-3 sm:mb-4">
            Common Inquiries
          </span>
          <h2 className="font-serif text-3xl sm:text-4xl md:text-5xl text-white font-normal leading-[1.18] tracking-tight mb-4">
            Before your first visit.
          </h2>
          <p className="text-base sm:text-lg text-taupe leading-relaxed">
            Everything you need to know about our therapies, therapist standards,
            booking policies, and facilities in Neknampur.
          </p>
        </div>

        {/* Category Pills */}
        <div className="flex items-center gap-2.5 sm:gap-3.5 overflow-x-auto pb-4 mb-8 sm:mb-12 no-scrollbar -mx-5 px-5 sm:mx-0 sm:px-0">
          {categories.map((cat) => {
            const isSelected = activeCategory === cat.id;
            return (
              <button
                key={cat.id}
                type="button"
                onClick={() => {
                  setActiveCategory(cat.id);
                  trackEvent("faq_category_change", { category: cat.id });
                }}
                className={`px-4 sm:px-5 py-2.5 rounded-xl text-xs font-sans uppercase tracking-[0.14em] font-bold transition-all duration-300 flex-shrink-0 ${
                  isSelected
                    ? "bg-rose text-obsidian font-bold shadow-rose-subtle border border-rose scale-105"
                    : "bg-surface-raised border border-rose/20 text-taupe hover:text-white hover:border-rose/40"
                }`}
              >
                {cat.label}
              </button>
            );
          })}
        </div>

        {/* Accordion List */}
        <div className="max-w-3xl space-y-3.5">
          {filteredFaqs.map((faq) => {
            const isOpen = openIds.includes(faq.id);
            return (
              <div
                key={faq.id}
                className={`rounded-2xl bg-surface-raised border transition-colors overflow-hidden ${
                  isOpen ? "border-rose/40 shadow-md" : "border-rose/15 hover:border-rose/30"
                }`}
              >
                <button
                  type="button"
                  onClick={() => toggleAccordion(faq.id)}
                  aria-expanded={isOpen}
                  className="w-full p-5 sm:p-6 text-left flex items-center justify-between gap-4 focus:outline-none"
                >
                  <span className="font-serif text-lg sm:text-xl text-white font-medium">
                    {faq.question}
                  </span>
                  <div
                    className={`w-8 h-8 rounded-xl bg-surface-dark border border-rose/20 flex items-center justify-center flex-shrink-0 text-rose transition-transform duration-300 ${
                      isOpen ? "rotate-180 bg-rose/20 text-rose" : ""
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
                      <div className="px-5 sm:px-6 pb-6 pt-1 text-xs sm:text-sm text-taupe leading-relaxed border-t border-white/[0.05]">
                        {faq.answer}
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            );
          })}
        </div>

        {/* Still Have Questions Box */}
        <div className="max-w-3xl mt-12 p-6 sm:p-8 rounded-2xl bg-surface-raised border border-rose/25 flex flex-col sm:flex-row items-center justify-between gap-6 shadow-sm">
          <div>
            <h3 className="font-serif text-xl text-white font-medium mb-1">
              Have a specific question not covered here?
            </h3>
            <p className="text-xs sm:text-sm text-taupe">
              Our front desk team is always delighted to assist you with recommendations.
            </p>
          </div>

          <div className="flex items-center gap-3 flex-shrink-0">
            <a
              href={getWhatsAppUrl({ source: "faq_bottom" })}
              target="_blank"
              rel="noopener noreferrer"
              onClick={() => trackEvent("whatsapp_click", { context: "faq_bottom" })}
              className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl bg-surface-dark border border-rose/30 text-xs uppercase font-bold tracking-wider text-cream hover:text-rose hover:bg-rose/15 transition-colors"
            >
              <MessageCircle className="w-4 h-4 text-rose" />
              <span>WhatsApp</span>
            </a>

            <a
              href={getCallUrl()}
              onClick={() => trackEvent("call_click", { context: "faq_bottom" })}
              className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl bg-surface-dark border border-rose/30 text-xs uppercase font-bold tracking-wider text-cream hover:text-rose hover:bg-rose/15 transition-colors"
            >
              <Phone className="w-4 h-4 text-rose" />
              <span>Call Us</span>
            </a>
          </div>
        </div>
      </div>
    </section>
  );
}
