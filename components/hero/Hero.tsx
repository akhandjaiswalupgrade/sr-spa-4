"use client";

import React, { useState, useEffect } from "react";
import Image from "next/image";
import { motion } from "framer-motion";
import { ArrowDown, Sparkles, ShieldCheck, Clock, DoorClosed } from "lucide-react";
import { Button } from "@/components/ui/Button";
import { trackEvent } from "@/lib/analytics";

interface HeroProps {
  onOpenBooking: () => void;
}

export function Hero({ onOpenBooking }: HeroProps) {
  const [mouseOffset, setMouseOffset] = useState({ x: 0, y: 0 });

  useEffect(() => {
    // Subtle pointer parallax on desktop
    const handleMouseMove = (e: MouseEvent) => {
      if (window.innerWidth < 1024) return;
      const { innerWidth, innerHeight } = window;
      const x = (e.clientX / innerWidth - 0.5) * 12;
      const y = (e.clientY / innerHeight - 0.5) * 12;
      setMouseOffset({ x, y });
    };

    window.addEventListener("mousemove", handleMouseMove, { passive: true });
    return () => window.removeEventListener("mousemove", handleMouseMove);
  }, []);

  const scrollToExperiences = () => {
    trackEvent("hero_explore_click", { context: "hero_cta" });
    const el = document.getElementById("experiences");
    if (el) {
      el.scrollIntoView({ behavior: "smooth" });
    }
  };

  return (
    <section className="relative min-h-[100svh] flex items-center justify-center overflow-hidden bg-obsidian pt-24 pb-16 lg:py-0">
      {/* Background Image with Subtle Parallax */}
      <motion.div
        className="absolute inset-0 z-0 scale-105"
        animate={{
          x: -mouseOffset.x,
          y: -mouseOffset.y,
        }}
        transition={{ type: "tween", ease: "easeOut", duration: 0.8 }}
      >
        <Image
          src="/images/shirui-hero-spa-room.jpg"
          alt="Shirui Wellness Spa Luxury Treatment Suite in Neknampur Hyderabad"
          fill
          priority
          sizes="100vw"
          className="object-cover object-center lg:object-[65%_center]"
        />

        {/* Sophisticated Multi-Layer Vignette and Gradients */}
        <div className="absolute inset-0 bg-gradient-to-r from-obsidian/95 via-obsidian/75 to-obsidian/40 lg:to-transparent" />
        <div className="absolute inset-0 bg-gradient-to-t from-obsidian via-transparent to-obsidian/40" />
        <div className="absolute inset-0 bg-black/30" />
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_30%_50%,rgba(201,169,107,0.08)_0%,transparent_65%)]" />
      </motion.div>

      {/* Hero Content Container */}
      <div className="relative z-10 w-full max-w-[1280px] mx-auto px-5 sm:px-8 lg:px-12 flex flex-col justify-center min-h-[calc(100svh-6rem)]">
        <div className="max-w-[740px] text-left">
          {/* Eyebrow */}
          <motion.div
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.1 }}
            className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-white/[0.06] border border-white/10 backdrop-blur-md mb-5 sm:mb-6"
          >
            <span className="w-1.5 h-1.5 rounded-full bg-gold animate-pulse" />
            <span className="text-[11px] sm:text-xs uppercase tracking-[0.22em] font-sans font-medium text-cream/90">
              Premium Wellness · Neknampur, Hyderabad
            </span>
          </motion.div>

          {/* Main Headline */}
          <motion.h1
            initial={{ opacity: 0, y: 22 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.25, ease: [0.22, 1, 0.36, 1] }}
            className="font-serif text-4xl sm:text-6xl md:text-7xl lg:text-[76px] xl:text-[84px] text-cream font-normal leading-[1.08] tracking-[-0.01em] mb-6 sm:mb-7"
          >
            Leave the noise behind. <br />
            <span className="italic font-normal text-gold-light">
              Feel yourself again.
            </span>
          </motion.h1>

          {/* Subtitle / Description */}
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.4 }}
            className="text-base sm:text-lg md:text-xl text-taupe font-sans font-normal leading-relaxed max-w-[620px] mb-8 sm:mb-10 text-pretty"
          >
            Thoughtfully designed massage and wellness experiences for the moments
            when your body asks you to slow down.
          </motion.p>

          {/* Action Buttons */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.55 }}
            className="flex flex-col sm:flex-row items-stretch sm:items-center gap-4 mb-12 sm:mb-16"
          >
            <Button
              variant="primary"
              size="lg"
              onClick={() => {
                trackEvent("book_click", { context: "hero_primary" });
                onOpenBooking();
              }}
              className="shadow-luxury"
            >
              Book Your Session
            </Button>

            <Button
              variant="secondary"
              size="lg"
              onClick={scrollToExperiences}
            >
              Explore Experiences
            </Button>
          </motion.div>

          {/* Trust Row */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 1, delay: 0.7 }}
            className="grid grid-cols-1 sm:grid-cols-3 gap-3 sm:gap-6 pt-6 border-t border-white/10 max-w-[640px]"
          >
            <div className="flex items-center gap-2.5 text-xs text-cream/80">
              <DoorClosed className="w-4 h-4 text-gold flex-shrink-0" />
              <span className="font-sans font-medium">Private Treatment Suites</span>
            </div>
            <div className="flex items-center gap-2.5 text-xs text-cream/80">
              <ShieldCheck className="w-4 h-4 text-gold flex-shrink-0" />
              <span className="font-sans font-medium">Professional Therapists</span>
            </div>
            <div className="flex items-center gap-2.5 text-xs text-cream/80">
              <Clock className="w-4 h-4 text-gold flex-shrink-0" />
              <span className="font-sans font-medium">Open 7 Days (10am–9:30pm)</span>
            </div>
          </motion.div>
        </div>
      </div>

      {/* Scroll Down Indicator */}
      <motion.button
        type="button"
        onClick={scrollToExperiences}
        initial={{ opacity: 0, y: -10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 1, duration: 0.8 }}
        className="absolute bottom-6 sm:bottom-8 left-1/2 -translate-x-1/2 z-20 flex flex-col items-center gap-2 text-muted hover:text-gold transition-colors group cursor-pointer focus:outline-none"
        aria-label="Scroll down to discover experiences"
      >
        <span className="text-[10px] tracking-[0.24em] uppercase font-sans font-medium text-taupe group-hover:text-gold transition-colors">
          Scroll to Experience
        </span>
        <motion.div
          animate={{ y: [0, 6, 0] }}
          transition={{ repeat: Infinity, duration: 2, ease: "easeInOut" }}
          className="w-5 h-8 rounded-full border border-white/20 flex items-start justify-center p-1 group-hover:border-gold/40 transition-colors"
        >
          <div className="w-1 h-2 bg-gold rounded-full" />
        </motion.div>
      </motion.button>
    </section>
  );
}
