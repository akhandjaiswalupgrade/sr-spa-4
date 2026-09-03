"use client";

import React from "react";
import Image from "next/image";
import { motion } from "framer-motion";
import { MessageCircle, Phone, Sparkles } from "lucide-react";
import { Button } from "@/components/ui/Button";
import { getWhatsAppUrl, getCallUrl } from "@/lib/whatsapp";
import { trackEvent } from "@/lib/analytics";

interface FinalCTAProps {
  onOpenBooking: () => void;
}

export function FinalCTA({ onOpenBooking }: FinalCTAProps) {
  return (
    <section className="relative min-h-[70vh] flex items-center justify-center bg-obsidian py-24 sm:py-32 overflow-hidden border-t border-white/[0.07]">
      {/* Cinematic Ambient Image Background */}
      <div className="absolute inset-0 z-0">
        <Image
          src="/images/shirui-final-cta.jpg"
          alt="Tranquil evening treatment room waiting at Shirui Wellness Spa Neknampur"
          fill
          sizes="100vw"
          className="object-cover object-center"
        />
        {/* Deep Multi-Layer Vignette */}
        <div className="absolute inset-0 bg-obsidian/85 backdrop-blur-[2px]" />
        <div className="absolute inset-0 bg-gradient-to-t from-obsidian via-transparent to-obsidian" />
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(201,169,107,0.12)_0%,transparent_70%)]" />
      </div>

      {/* Centered Content */}
      <div className="relative z-10 max-w-3xl mx-auto px-5 sm:px-8 text-center">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7 }}
          className="space-y-6 sm:space-y-8"
        >
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-gold/10 border border-gold/20 text-gold mx-auto">
            <Sparkles className="w-3.5 h-3.5" />
            <span className="text-[11px] font-sans font-bold uppercase tracking-[0.22em]">
              Your Time
            </span>
          </div>

          <h2 className="font-serif text-4xl sm:text-5xl md:text-6xl text-cream font-normal leading-[1.1] tracking-tight">
            You’ve done enough for today.
          </h2>

          <p className="text-base sm:text-xl text-taupe font-sans font-normal leading-relaxed max-w-xl mx-auto text-pretty">
            Give yourself an hour where nothing else needs your attention. Step into
            a private sanctuary built for quiet restoration.
          </p>

          {/* Action CTAs */}
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4 pt-4">
            <Button
              variant="primary"
              size="lg"
              onClick={() => {
                trackEvent("book_click", { context: "final_cta" });
                onOpenBooking();
              }}
              className="shadow-luxury"
            >
              Book Your Experience
            </Button>

            <a
              href={getWhatsAppUrl({ source: "final_cta" })}
              target="_blank"
              rel="noopener noreferrer"
              onClick={() => trackEvent("whatsapp_click", { context: "final_cta" })}
              className="inline-flex items-center justify-center gap-2 h-14 px-8 rounded-full bg-surface-raised border border-white/15 text-cream hover:text-gold hover:border-gold/40 transition-colors font-sans text-base font-medium"
            >
              <MessageCircle className="w-4 h-4 text-gold" />
              <span>WhatsApp Shirui</span>
            </a>

            <a
              href={getCallUrl()}
              onClick={() => trackEvent("call_click", { context: "final_cta" })}
              className="inline-flex items-center justify-center gap-2 h-14 px-6 rounded-full bg-white/[0.04] border border-white/10 text-taupe hover:text-cream hover:bg-white/[0.08] transition-colors font-sans text-base font-medium"
            >
              <Phone className="w-4 h-4 text-gold" />
              <span>Call Now</span>
            </a>
          </div>

          {/* Location Badge */}
          <span className="block text-xs uppercase tracking-[0.24em] font-sans font-semibold text-muted pt-4">
            Neknampur · Hyderabad
          </span>
        </motion.div>
      </div>
    </section>
  );
}
