"use client";

import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Star, ShieldCheck, ChevronLeft, ChevronRight, Quote } from "lucide-react";
import { reviewsData, Review } from "@/data/reviews";
import { businessConfig } from "@/config/business";
import { trackEvent } from "@/lib/analytics";

export function Reviews() {
  const [currentIndex, setCurrentIndex] = useState(0);

  const reviews = reviewsData;
  if (!reviews || reviews.length === 0) return null;

  const handlePrev = () => {
    trackEvent("review_interaction", { direction: "prev" });
    setCurrentIndex((prev) => (prev - 1 + reviews.length) % reviews.length);
  };

  const handleNext = () => {
    trackEvent("review_interaction", { direction: "next" });
    setCurrentIndex((prev) => (prev + 1) % reviews.length);
  };

  const currentReview = reviews[currentIndex];

  return (
    <section
      id="reviews"
      className="relative bg-[#f5f0eb] py-24 sm:py-32 lg:py-36 border-t border-slate-200/80 overflow-hidden"
    >
      {/* Background Soft Rose Glow */}
      <div className="absolute bottom-0 left-1/4 w-96 h-96 bg-rose-100/30 blur-[120px] rounded-full pointer-events-none" />

      <div className="max-w-[1280px] mx-auto px-5 sm:px-8 lg:px-12 relative z-10">
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-12 sm:mb-16 gap-6">
          <div className="max-w-2xl text-left">
            <span className="inline-block text-[11px] sm:text-xs font-sans font-bold uppercase tracking-[0.22em] text-[#c83b74] bg-white px-3.5 py-1 rounded-full border border-slate-200 shadow-sm mb-4">
              Guest Experiences
            </span>
            <h2 className="font-serif text-3xl sm:text-4xl md:text-5xl text-slate-900 font-normal leading-[1.18] tracking-tight mb-2">
              They came in carrying the day. <br />
              <span className="italic font-serif bg-gradient-to-r from-[#df548f] via-[#c83b74] to-[#a81d52] bg-clip-text text-transparent">
                They left feeling different.
              </span>
            </h2>
          </div>

          {/* Google Verified Rating Badge */}
          {businessConfig.reviewRating && (
            <div className="flex items-center gap-3.5 p-4 rounded-2xl bg-white border border-slate-200/90 flex-shrink-0 shadow-3d">
              <div className="w-12 h-12 rounded-xl bg-[#f5f0eb] border border-slate-200/90 shadow-button-secondary-3d flex items-center justify-center text-[#c83b74]">
                <Star className="w-5 h-5 fill-[#c83b74] text-[#c83b74]" />
              </div>
              <div>
                <div className="flex items-center gap-1.5">
                  <span className="font-serif text-xl font-bold text-slate-900">
                    {businessConfig.reviewRating}
                  </span>
                  <div className="flex text-[#c83b74]">
                    {[1, 2, 3, 4, 5].map((s) => (
                      <Star key={s} className="w-3.5 h-3.5 fill-[#c83b74] text-[#c83b74]" />
                    ))}
                  </div>
                </div>
                <span className="text-xs text-slate-600 block font-sans font-medium">
                  Based on {businessConfig.reviewCount}+ Google reviews
                </span>
              </div>
            </div>
          )}
        </div>

        {/* Featured Testimonial Card */}
        <div className="relative max-w-4xl mx-auto rounded-3xl bg-white border border-slate-200/90 p-8 sm:p-12 lg:p-14 shadow-3d">
          <Quote className="w-12 h-12 text-[#c83b74]/25 mb-6" />

          <AnimatePresence mode="wait">
            <motion.div
              key={currentReview.id}
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -16 }}
              transition={{ duration: 0.35 }}
              className="space-y-6"
            >
              {/* Star Rating in Vibrant Rose */}
              <div className="flex items-center gap-1 text-[#c83b74]">
                {[...Array(currentReview.rating)].map((_, i) => (
                  <Star key={i} className="w-4 h-4 fill-[#c83b74] text-[#c83b74]" />
                ))}
              </div>

              {/* Highlight Quote */}
              <h3 className="font-serif text-2xl sm:text-3xl text-slate-900 font-bold leading-snug">
                “{currentReview.highlight}”
              </h3>

              {/* Detailed Feedback */}
              <p className="text-sm sm:text-base text-slate-700 leading-relaxed font-medium">
                {currentReview.comment}
              </p>

              {/* Author & Treatment Meta */}
              <div className="pt-6 border-t border-slate-200/80 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                <div>
                  <h4 className="font-serif text-lg text-slate-900 font-bold">
                    {currentReview.author}
                  </h4>
                  <span className="text-xs text-slate-500 font-sans block font-medium">
                    {currentReview.location} · {currentReview.date}
                  </span>
                </div>

                <div className="flex items-center gap-2 px-4 py-2 rounded-xl bg-[#f5f0eb] border border-slate-200/90 text-xs text-[#c83b74] font-bold shadow-sm">
                  <ShieldCheck className="w-4 h-4" />
                  <span>{currentReview.treatmentTaken}</span>
                </div>
              </div>
            </motion.div>
          </AnimatePresence>

          {/* Carousel Arrows */}
          <div className="flex items-center justify-end gap-3 mt-8 pt-6 border-t border-slate-200/80">
            <span className="text-xs font-sans text-slate-600 font-medium mr-auto">
              {currentIndex + 1} of {reviews.length}
            </span>

            <button
              type="button"
              onClick={handlePrev}
              className="p-2.5 rounded-xl bg-white border border-slate-200/90 hover:border-rose/40 text-slate-800 hover:text-rose shadow-button-secondary-3d hover:-translate-y-0.5 active:translate-y-0.5 transition-all"
              aria-label="Previous Review"
            >
              <ChevronLeft className="w-5 h-5 stroke-[2.5]" />
            </button>

            <button
              type="button"
              onClick={handleNext}
              className="p-2.5 rounded-xl bg-white border border-slate-200/90 hover:border-rose/40 text-slate-800 hover:text-rose shadow-button-secondary-3d hover:-translate-y-0.5 active:translate-y-0.5 transition-all"
              aria-label="Next Review"
            >
              <ChevronRight className="w-5 h-5 stroke-[2.5]" />
            </button>
          </div>
        </div>
      </div>
    </section>
  );
}
