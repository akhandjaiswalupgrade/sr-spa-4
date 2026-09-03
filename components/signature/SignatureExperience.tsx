"use client";

import React from "react";
import Image from "next/image";
import { motion } from "framer-motion";
import { Sparkles, Check, Clock, MessageCircle } from "lucide-react";
import { Button } from "@/components/ui/Button";
import { getWhatsAppUrl } from "@/lib/whatsapp";
import { trackEvent } from "@/lib/analytics";

interface SignatureExperienceProps {
  onOpenBooking: (initialTreatment?: string, initialDuration?: number) => void;
}

const inclusions = [
  "Full-body customized therapeutic bodywork",
  "Dedicated cervical & shoulder-blade tension release",
  "Warmed natural botanical essential oil upgrade",
  "Warm herbal compress applied across trapezius",
  "Restorative foot reflexology pressure finish",
  "Unhurried herbal tea infusion in relaxation lounge",
];

export function SignatureExperience({ onOpenBooking }: SignatureExperienceProps) {
  const treatmentName = "Signature Shirui 90-Minute Immersion";

  return (
    <section className="relative bg-surface-dark py-20 sm:py-28 lg:py-36 border-t border-white/[0.07] overflow-hidden">
      <div className="max-w-[1280px] mx-auto px-5 sm:px-8 lg:px-12">
        <div className="rounded-feature bg-surface-raised border border-white/10 overflow-hidden shadow-2xl p-6 sm:p-10 lg:p-14 relative">
          {/* Background Ambient Glow */}
          <div className="absolute top-0 right-0 w-96 h-96 bg-gold/10 blur-[100px] rounded-full pointer-events-none" />

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-14 items-center relative z-10">
            {/* Left Content */}
            <div className="lg:col-span-6 space-y-6">
              <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-gold/10 border border-gold/20 text-gold">
                <Sparkles className="w-3.5 h-3.5" />
                <span className="text-[11px] font-sans font-bold uppercase tracking-[0.2em]">
                  Flagship Experience
                </span>
              </div>

              <h2 className="font-serif text-3xl sm:text-4xl md:text-5xl text-cream font-normal leading-[1.15]">
                90 minutes of doing <br />
                <span className="italic text-gold-light">absolutely nothing.</span>
              </h2>

              <p className="text-base sm:text-lg text-taupe leading-relaxed text-pretty">
                A longer, unhurried session designed specifically for guests who want
                ample time to settle deeply into the experience, release persistent
                physical tension, and fully disconnect from their day.
              </p>

              {/* Inclusions Grid */}
              <div className="pt-2">
                <span className="text-xs uppercase tracking-[0.18em] font-sans font-semibold text-muted block mb-3">
                  What’s Included in the 90-Minute Session:
                </span>
                <ul className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
                  {inclusions.map((item, idx) => (
                    <li
                      key={idx}
                      className="flex items-center gap-2 text-xs sm:text-sm text-cream/90 font-sans"
                    >
                      <Check className="w-4 h-4 text-gold flex-shrink-0" />
                      <span>{item}</span>
                    </li>
                  ))}
                </ul>
              </div>

              {/* CTAs */}
              <div className="pt-4 flex flex-col sm:flex-row items-stretch sm:items-center gap-3">
                <Button
                  variant="primary"
                  size="lg"
                  onClick={() => {
                    trackEvent("treatment_book_click", { treatmentName, duration: 90 });
                    onOpenBooking(treatmentName, 90);
                  }}
                >
                  Reserve Signature Session (₹4,299)
                </Button>

                <a
                  href={getWhatsAppUrl({
                    experience: treatmentName,
                    duration: 90,
                    source: "signature_section",
                  })}
                  target="_blank"
                  rel="noopener noreferrer"
                  onClick={() =>
                    trackEvent("whatsapp_click", {
                      context: "signature_section",
                      treatmentName,
                    })
                  }
                  className="inline-flex items-center justify-center gap-2 px-6 py-3.5 rounded-full bg-white/[0.05] hover:bg-white/[0.1] border border-white/15 text-sm font-sans font-medium text-cream hover:text-gold transition-colors"
                >
                  <MessageCircle className="w-4 h-4 text-gold" />
                  <span>Enquire via WhatsApp</span>
                </a>
              </div>
            </div>

            {/* Right Visual */}
            <div className="lg:col-span-6">
              <div className="relative aspect-[16/10] sm:aspect-[4/3] lg:aspect-[16/11] w-full rounded-visual overflow-hidden border border-white/10 shadow-2xl group">
                <Image
                  src="/images/shirui-signature-treatment.jpg"
                  alt="Flagship 90-minute signature massage at Shirui Wellness Spa Hyderabad"
                  fill
                  sizes="(max-width: 1024px) 100vw, 50vw"
                  className="object-cover object-center group-hover:scale-105 transition-transform duration-700 ease-luxury"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-obsidian/70 via-transparent to-transparent" />
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
