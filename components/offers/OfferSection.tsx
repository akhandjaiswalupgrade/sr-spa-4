"use client";

import React from "react";
import Image from "next/image";
import { motion } from "framer-motion";
import { Sparkles, Calendar, Clock, Check } from "lucide-react";
import { offersData } from "@/data/offers";
import { Button } from "@/components/ui/Button";
import { formatPrice } from "@/lib/utils";
import { trackEvent } from "@/lib/analytics";

interface OfferSectionProps {
  onOpenBooking: (initialTreatment?: string, initialDuration?: number) => void;
}

export function OfferSection({ onOpenBooking }: OfferSectionProps) {
  // Find active offer
  const activeOffer = offersData.find((o) => o.isActive);
  if (!activeOffer) return null;

  return (
    <section className="relative bg-obsidian py-24 sm:py-32 border-t border-rose/15">
      <div className="max-w-[1280px] mx-auto px-5 sm:px-8 lg:px-12">
        <div className="rounded-2xl bg-surface-raised border border-rose/30 p-6 sm:p-10 lg:p-12 shadow-2xl relative overflow-hidden">
          {/* Subtle Top Rose Highlight */}
          <div className="absolute top-0 inset-x-0 h-1 bg-gradient-to-r from-transparent via-rose to-transparent" />

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-center">
            {/* Left Content */}
            <div className="lg:col-span-7 space-y-5 text-left">
              <span className="inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-full bg-rose/15 text-rose text-[10px] sm:text-xs font-sans font-bold uppercase tracking-widest border border-rose/25">
                <Sparkles className="w-3.5 h-3.5" />
                {activeOffer.tag}
              </span>

              <h2 className="font-serif text-2xl sm:text-3xl md:text-4xl text-white font-normal">
                {activeOffer.title}
              </h2>

              <p className="text-sm sm:text-base text-taupe leading-relaxed text-pretty">
                {activeOffer.description}
              </p>

              {/* Timing & Validity Tags */}
              <div className="flex flex-wrap items-center gap-3 text-xs text-cream font-sans">
                <div className="flex items-center gap-1.5 bg-surface-dark px-3.5 py-2 rounded-xl border border-rose/15">
                  <Calendar className="w-3.5 h-3.5 text-rose" />
                  <span>{activeOffer.validity}</span>
                </div>
                <div className="flex items-center gap-1.5 bg-surface-dark px-3.5 py-2 rounded-xl border border-rose/15">
                  <Clock className="w-3.5 h-3.5 text-rose" />
                  <span>{activeOffer.timing}</span>
                </div>
              </div>

              {/* Inclusions */}
              <div className="pt-2">
                <ul className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
                  {activeOffer.inclusions.map((inc, idx) => (
                    <li
                      key={idx}
                      className="flex items-center gap-2 text-xs sm:text-sm text-cream font-sans"
                    >
                      <Check className="w-3.5 h-3.5 text-rose flex-shrink-0" />
                      <span>{inc}</span>
                    </li>
                  ))}
                </ul>
              </div>

              {/* Pricing & CTA */}
              <div className="pt-4 flex flex-wrap items-center gap-4">
                <div className="flex items-baseline gap-2.5">
                  <span className="text-2xl sm:text-3xl font-serif font-bold text-rose">
                    {formatPrice(activeOffer.offerPrice)}
                  </span>
                  <span className="text-sm text-muted line-through">
                    {formatPrice(activeOffer.originalPrice)}
                  </span>
                </div>

                <Button
                  variant="primary"
                  size="md"
                  onClick={() => {
                    trackEvent("book_click", { context: "offer_section", offerId: activeOffer.id });
                    onOpenBooking(activeOffer.subtitle, activeOffer.durationMinutes);
                  }}
                >
                  Reserve Weekday Session
                </Button>
              </div>

              <span className="block text-[11px] text-muted italic font-sans pt-1">
                {activeOffer.terms}
              </span>
            </div>

            {/* Right Visual */}
            <div className="lg:col-span-5">
              <div className="relative aspect-[4/3] sm:aspect-[16/10] w-full rounded-2xl overflow-hidden border border-rose/20 shadow-lg">
                <Image
                  src={activeOffer.image}
                  alt={activeOffer.title}
                  fill
                  sizes="(max-width: 1024px) 100vw, 40vw"
                  className="object-cover object-center"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-obsidian/60 via-transparent to-transparent" />
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
