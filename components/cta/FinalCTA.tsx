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
    <section className="relative bg-gradient-to-b from-[#f5f0eb] via-white to-white py-28 sm:py-36 overflow-hidden border-t border-slate-200/80 text-center">
      {/* Cinematic Background Image with Light Airy Vignette */}
      <div className="absolute inset-0 z-0">
        <Image
          src="/images/shirui-final-cta.jpg"
          alt="Tranquil relaxation suite at Shirui Wellness Spa"
          fill
          sizes="100vw"
          className="object-cover object-center opacity-15"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-white via-white/80 to-[#f5f0eb]/90" />
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_50%_50%,rgba(200,59,116,0.08)_0%,transparent_70%)]" />
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
          <span className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-white/95 border border-slate-200/90 backdrop-blur-md text-[11px] sm:text-xs font-sans font-bold uppercase tracking-[0.22em] text-[#c83b74] shadow-3d">
            <Sparkles className="w-3.5 h-3.5" />
            Your Time Starts Here
          </span>

          {/* Headline */}
          <h2 className="font-serif text-3xl sm:text-5xl md:text-6xl text-slate-900 font-normal leading-[1.12]">
            You’ve done enough for today. <br />
            <span className="italic font-serif bg-gradient-to-r from-[#df548f] via-[#c83b74] to-[#a81d52] bg-clip-text text-transparent">
              Let someone take care of you.
            </span>
          </h2>

          <p className="text-base sm:text-lg text-slate-700 font-sans leading-relaxed max-w-xl mx-auto text-pretty font-medium">
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
            >
              Book Your Experience
            </Button>

            <a
              href={getWhatsAppUrl({ source: "final_cta" })}
              target="_blank"
              rel="noopener noreferrer"
              onClick={() => trackEvent("whatsapp_click", { context: "final_cta" })}
              className="inline-flex items-center justify-center gap-2 px-8 py-4 rounded-xl bg-white hover:bg-rose-50/60 border border-slate-200/90 text-base font-sans font-bold text-slate-800 hover:text-rose transition-all shadow-button-secondary-3d hover:-translate-y-0.5 active:translate-y-0.5"
            >
              <MessageCircle className="w-5 h-5 text-[#c83b74]" />
              <span>WhatsApp Us</span>
            </a>

            <a
              href={getCallUrl()}
              onClick={() => trackEvent("call_click", { context: "final_cta" })}
              className="inline-flex items-center justify-center gap-2 px-8 py-4 rounded-xl bg-white hover:bg-rose-50/60 border border-slate-200/90 text-base font-sans font-bold text-slate-800 hover:text-rose transition-all shadow-button-secondary-3d hover:-translate-y-0.5 active:translate-y-0.5"
            >
              <Phone className="w-5 h-5 text-[#c83b74]" />
              <span>Call Now</span>
            </a>
          </div>

          <p className="text-xs text-slate-600 pt-2 font-sans font-semibold">
            Open daily 10:00 AM – 9:30 PM · Single Suites · Neknampur, Hyderabad
          </p>
        </motion.div>
      </div>
    </section>
  );
}
