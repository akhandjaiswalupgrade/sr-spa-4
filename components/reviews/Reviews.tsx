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
      className="relative bg-surface-dark py-24 sm:py-32 lg:py-36 border-t border-rose/15 overflow-hidden"
    >
      {/* Background Soft Rose Glow */}
      <div className="absolute bottom-0 left-1/4 w-96 h-96 bg-rose/5 blur-[120px] rounded-full pointer-events-none" />

      <div className="max-w-[1280px] mx-auto px-5 sm:px-8 lg:px-12 relative z-10">
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-12 sm:mb-16 gap-6">
          <div className="max-w-2xl text-left">
            <span className="inline-block text-[11px] sm:text-xs font-sans font-bold uppercase tracking-[0.22em] text-rose mb-3 sm:mb-4">
              Guest Experiences
            </span>
            <h2 className="font-serif text-3xl sm:text-4xl md:text-5xl text-white font-normal leading-[1.18] tracking-tight mb-2">
              They came in carrying the day. <br />
              <span className="italic text-rose-light">They left feeling different.</span>
            </h2>
          </div>

          {/* Google Verified Rating Badge */}
          {businessConfig.reviewRating && (
            <div className="flex items-center gap-3.5 p-4 rounded-2xl bg-surface-raised border border-rose/25 flex-shrink-0 shadow-sm">
              <div className="w-11 h-11 rounded-xl bg-rose/15 border border-rose/25 flex items-center justify-center text-rose">
                <Star className="w-5 h-5 fill-rose text-rose" />
              </div>
              <div>
                <div className="flex items-center gap-1.5">
                  <span className="font-serif text-xl font-bold text-white">
                    {businessConfig.reviewRating}
                  </span>
                  <div className="flex text-rose">
                    {[1, 2, 3, 4, 5].map((s) => (
                      <Star key={s} className="w-3.5 h-3.5 fill-rose text-rose" />
                    ))}
                  </div>
                </div>
                <span className="text-xs text-taupe block font-sans">
                  Based on {businessConfig.reviewCount}+ Google reviews
                </span>
              </div>
            </div>
          )}
        </div>

        {/* Featured Testimonial Card */}
        <div className="relative max-w-4xl mx-auto rounded-2xl bg-surface-raised border border-rose/20 p-8 sm:p-12 lg:p-14 shadow-2xl">
          <Quote className="w-12 h-12 text-rose/25 mb-6" />

          <AnimatePresence mode="wait">
            <motion.div
              key={currentReview.id}
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -16 }}
              transition={{ duration: 0.35 }}
              className="space-y-6"
            >
              {/* Star Rating in Soft Rose */}
              <div className="flex items-center gap-1 text-rose">
                {[...Array(currentReview.rating)].map((_, i) => (
                  <Star key={i} className="w-4 h-4 fill-rose text-rose" />
                ))}
              </div>

              {/* Highlight Quote */}
              <h3 className="font-serif text-2xl sm:text-3xl text-white font-medium leading-snug">
                “{currentReview.highlight}”
              </h3>

              {/* Detailed Feedback */}
              <p className="text-sm sm:text-base text-taupe leading-relaxed">
                {currentReview.comment}
              </p>

              {/* Author & Treatment Meta */}
              <div className="pt-6 border-t border-rose/15 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                <div>
                  <h4 className="font-serif text-lg text-white font-medium">
                    {currentReview.author}
                  </h4>
                  <span className="text-xs text-muted font-sans block">
                    {currentReview.location} · {currentReview.date}
                  </span>
                </div>

                <div className="flex items-center gap-2 px-3.5 py-1.5 rounded-xl bg-surface-dark border border-rose/25 text-xs text-rose font-semibold">
                  <ShieldCheck className="w-3.5 h-3.5" />
                  <span>{currentReview.treatmentTaken}</span>
                </div>
              </div>
            </motion.div>
          </AnimatePresence>

          {/* Carousel Arrows */}
          <div className="flex items-center justify-end gap-3 mt-8 pt-6 border-t border-rose/15">
            <span className="text-xs font-sans text-muted mr-auto">
              {currentIndex + 1} of {reviews.length}
            </span>

            <button
              type="button"
              onClick={handlePrev}
              className="p-2.5 rounded-xl bg-surface-dark border border-rose/20 hover:border-rose text-cream hover:text-rose transition-colors"
              aria-label="Previous Review"
            >
              <ChevronLeft className="w-5 h-5" />
            </button>

            <button
              type="button"
              onClick={handleNext}
              className="p-2.5 rounded-xl bg-surface-dark border border-rose/20 hover:border-rose text-cream hover:text-rose transition-colors"
              aria-label="Next Review"
            >
              <ChevronRight className="w-5 h-5" />
            </button>
          </div>
        </div>
      </div>
    </section>
  );
}
