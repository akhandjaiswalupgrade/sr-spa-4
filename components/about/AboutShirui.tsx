"use client";

import React from "react";
import Image from "next/image";
import { motion } from "framer-motion";
import { Sparkles, CheckCircle2 } from "lucide-react";
import { Button } from "@/components/ui/Button";
import { trackEvent } from "@/lib/analytics";

interface AboutShiruiProps {
  onOpenBooking: () => void;
}

export function AboutShirui({ onOpenBooking }: AboutShiruiProps) {
  const scrollToExperiences = () => {
    trackEvent("hero_explore_click", { context: "about_section" });
    const el = document.getElementById("experiences");
    if (el) {
      el.scrollIntoView({ behavior: "smooth" });
    }
  };

  return (
    <section
      id="about"
      className="relative bg-obsidian py-24 sm:py-32 lg:py-36 overflow-hidden"
    >
      <div className="max-w-[1280px] mx-auto px-5 sm:px-8 lg:px-12">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-center">
          {/* Mobile Image (Order 1 on mobile, 2 on desktop) */}
          <motion.div
            initial={{ opacity: 0, scale: 0.96 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true, margin: "-80px" }}
            transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
            className="lg:col-span-6 xl:col-span-7 order-1 lg:order-2"
          >
            <div className="relative aspect-[4/5] sm:aspect-[4/3] lg:aspect-[4/5] max-h-[640px] w-full rounded-2xl overflow-hidden border border-rose/20 shadow-2xl group">
              <Image
                src="/images/shirui-about-experience.jpg"
                alt="A tranquil moment transitioning into Shirui Wellness Spa sanctuary in Neknampur"
                fill
                sizes="(max-width: 1024px) 100vw, 55vw"
                className="object-cover object-center group-hover:scale-105 transition-transform duration-700 ease-luxury"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-obsidian/85 via-transparent to-black/20" />

              {/* Floating Atmosphere Badge */}
              <div className="absolute bottom-6 left-6 right-6 sm:right-auto bg-surface-raised/95 backdrop-blur-md border border-rose/25 rounded-2xl p-4 sm:p-5 flex items-center gap-4 shadow-xl">
                <div className="w-10 h-10 rounded-xl bg-rose/15 flex items-center justify-center flex-shrink-0 text-rose border border-rose/25">
                  <Sparkles className="w-5 h-5" />
                </div>
                <div>
                  <span className="block font-serif text-base text-white font-medium">
                    A Quiet Urban Escape
                  </span>
                  <span className="block text-xs text-taupe mt-0.5 font-sans">
                    Thoughtful soundproofing & warm ambient lighting
                  </span>
                </div>
              </div>
            </div>
          </motion.div>

          {/* Editorial Copy (Order 2 on mobile, 1 on desktop) */}
          <motion.div
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-80px" }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="lg:col-span-6 xl:col-span-5 order-2 lg:order-1 text-left"
          >
            {/* Eyebrow */}
            <span className="inline-block text-[11px] sm:text-xs font-sans font-bold uppercase tracking-[0.22em] text-rose mb-3 sm:mb-4">
              The Shirui Experience
            </span>

            {/* Headline */}
            <h2 className="font-serif text-3xl sm:text-4xl md:text-5xl text-white font-normal leading-[1.18] tracking-tight mb-6">
              Wellness should feel like an experience,{" "}
              <span className="italic text-rose-light">not an appointment.</span>
            </h2>

            {/* Paragraph 1 */}
            <p className="text-base sm:text-lg text-taupe leading-relaxed mb-5 text-pretty">
              Shirui Wellness Spa is designed as a quiet escape from the pace of
              the city. Every detail — from the atmosphere and treatment room to
              pressure preferences and session duration — is intended to help
              you slow down and feel comfortable.
            </p>

            {/* Paragraph 2 */}
            <p className="text-sm sm:text-base text-taupe/90 leading-relaxed mb-8">
              We believe true restoration happens in private, unhurried
              surroundings. With dedicated single suites, immaculate linen
              sanitation, and attentive therapist care, your session is tailored
              exclusively around your comfort.
            </p>

            {/* Key Pillars */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5 mb-10">
              <div className="flex items-center gap-2.5 text-xs sm:text-sm text-cream font-medium">
                <CheckCircle2 className="w-4 h-4 text-rose flex-shrink-0" />
                <span>Total acoustic privacy</span>
              </div>
              <div className="flex items-center gap-2.5 text-xs sm:text-sm text-cream font-medium">
                <CheckCircle2 className="w-4 h-4 text-rose flex-shrink-0" />
                <span>Customized touch & pressure</span>
              </div>
              <div className="flex items-center gap-2.5 text-xs sm:text-sm text-cream font-medium">
                <CheckCircle2 className="w-4 h-4 text-rose flex-shrink-0" />
                <span>100% natural botanical oils</span>
              </div>
              <div className="flex items-center gap-2.5 text-xs sm:text-sm text-cream font-medium">
                <CheckCircle2 className="w-4 h-4 text-rose flex-shrink-0" />
                <span>Fresh single-guest linens</span>
              </div>
            </div>

            {/* CTA */}
            <div className="flex flex-wrap items-center gap-4">
              <Button variant="primary" size="md" onClick={scrollToExperiences}>
                Discover Experiences
              </Button>
              <Button
                variant="ghost"
                size="md"
                onClick={() => {
                  trackEvent("book_click", { context: "about_cta" });
                  onOpenBooking();
                }}
                className="text-rose hover:text-rose-light font-semibold"
              >
                Reserve Your Time →
              </Button>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
