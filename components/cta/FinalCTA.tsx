"use client";

import React from "react";
import Image from "next/image";
import { motion } from "framer-motion";
import { Sparkles, MessageCircle, Phone } from "lucide-react";
import { Button } from "@/components/ui/Button";
import { getWhatsAppUrl, getCallUrl } from "@/lib/whatsapp";
import { trackEvent } from "@/lib/analytics";

interface FinalCTAProps {
  onOpenBooking: () => void;
}

export function FinalCTA({ onOpenBooking }: FinalCTAProps) {
  return (
    <section className="relative bg-obsidian py-28 sm:py-36 overflow-hidden border-t border-rose/15 text-center">
      {/* Cinematic Background Image with Warm Plum Vignette */}
      <div className="absolute inset-0 z-0">
        <Image
          src="/images/shirui-final-cta.jpg"
          alt="Tranquil relaxation suite at Shirui Wellness Spa"
          fill
          sizes="100vw"
          className="object-cover object-center filter brightness-40"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-obsidian via-obsidian/85 to-obsidian/95" />
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_50%_50%,rgba(232,140,178,0.14)_0%,transparent_65%)]" />
      </div>

      {/* Content */}
      <div className="relative z-10 max-w-[800px] mx-auto px-5 sm:px-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-60px" }}
          transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
          className="space-y-6"
        >
          {/* Eyebrow */}
          <span className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-surface-raised/90 border border-rose/25 backdrop-blur-md text-[11px] sm:text-xs font-sans font-bold uppercase tracking-[0.22em] text-rose">
            <Sparkles className="w-3.5 h-3.5" />
            Your Time Starts Here
          </span>

          {/* Headline */}
          <h2 className="font-serif text-3xl sm:text-5xl md:text-6xl text-white font-normal leading-[1.12]">
            You’ve done enough for today. <br />
            <span className="italic text-rose-light">Let someone take care of you.</span>
          </h2>

          <p className="text-base sm:text-lg text-taupe font-sans leading-relaxed max-w-xl mx-auto text-pretty">
            Take an hour or two for yourself in our private Neknampur sanctuary.
            Walk in carrying the day, leave feeling completely restored.
          </p>

          {/* Action CTAs */}
          <div className="pt-4 flex flex-col sm:flex-row items-center justify-center gap-4">
            <Button
              variant="primary"
              size="lg"
              onClick={() => {
                trackEvent("book_click", { context: "final_cta" });
                onOpenBooking();
              }}
              className="shadow-rose-glow"
            >
              Book Your Experience
            </Button>

            <a
              href={getWhatsAppUrl({ source: "final_cta" })}
              target="_blank"
              rel="noopener noreferrer"
              onClick={() => trackEvent("whatsapp_click", { context: "final_cta" })}
              className="inline-flex items-center justify-center gap-2 px-8 py-4 rounded-xl bg-surface-raised hover:bg-rose/15 border border-rose/30 text-base font-sans font-bold text-cream hover:text-rose transition-colors"
            >
              <MessageCircle className="w-5 h-5 text-rose" />
              <span>WhatsApp Us</span>
            </a>

            <a
              href={getCallUrl()}
              onClick={() => trackEvent("call_click", { context: "final_cta" })}
              className="inline-flex items-center justify-center gap-2 px-8 py-4 rounded-xl bg-surface-raised hover:bg-rose/15 border border-rose/30 text-base font-sans font-bold text-cream hover:text-rose transition-colors"
            >
              <Phone className="w-5 h-5 text-rose" />
              <span>Call Now</span>
            </a>
          </div>

          <p className="text-xs text-muted pt-2 font-sans">
            Open daily 10:00 AM – 9:30 PM · Single Suites · Neknampur, Hyderabad
          </p>
        </motion.div>
      </div>
    </section>
  );
}
