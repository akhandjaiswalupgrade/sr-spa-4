"use client";

import React from "react";
import { motion } from "framer-motion";
import { Coffee, ShieldCheck, HeartHandshake } from "lucide-react";

interface JourneyStage {
  step: string;
  title: string;
  icon: React.ElementType;
  guidelines: string[];
}

const stages: JourneyStage[] = [
  {
    step: "01",
    title: "BEFORE YOUR SESSION",
    icon: Coffee,
    guidelines: [
      "Arrive 10 to 15 minutes early to transition unhurriedly.",
      "Share your pressure preferences (Light, Medium, Firm).",
      "Mention specific muscle groups needing extra focus.",
      "Highlight any sensitive areas you want avoided.",
    ],
  },
  {
    step: "02",
    title: "DURING YOUR SESSION",
    icon: ShieldCheck,
    guidelines: [
      "Rest comfortably on premium, heated padded linens.",
      "Feel complete freedom to request more or less pressure.",
      "Therapists maintain strict draping and boundary respect.",
      "Allow your breathing to slow down naturally.",
    ],
  },
  {
    step: "03",
    title: "AFTER YOUR SESSION",
    icon: HeartHandshake,
    guidelines: [
      "Take a few peaceful moments to rest before rising.",
      "Sip warm herbal tea in our quiet relaxation lounge.",
      "Hydrate normally to support bodily circulation.",
      "Enjoy the relaxed, lighter physical feeling through your day.",
    ],
  },
];

export function BeforeDuringAfter() {
  return (
    <section className="relative bg-surface-dark py-20 sm:py-28 lg:py-36 border-t border-white/[0.07]">
      <div className="max-w-[1280px] mx-auto px-5 sm:px-8 lg:px-12">
        {/* Section Header */}
        <div className="max-w-2xl text-left mb-12 sm:mb-16">
          <span className="inline-block text-[11px] sm:text-xs font-sans font-semibold uppercase tracking-[0.22em] text-gold mb-3 sm:mb-4">
            Guest Etiquette & Flow
          </span>
          <h2 className="font-serif text-3xl sm:text-4xl md:text-5xl text-cream font-normal leading-[1.18] tracking-tight mb-4">
            Know what to expect.
          </h2>
          <p className="text-base sm:text-lg text-taupe leading-relaxed">
            Whether it is your first time visiting Shirui or your regular weekly
            ritual, here is how we ensure seamless comfort from start to finish.
          </p>
        </div>

        {/* 3 Columns */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 sm:gap-8">
          {stages.map((stage, idx) => {
            const Icon = stage.icon;
            return (
              <motion.div
                key={idx}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-40px" }}
                transition={{ duration: 0.5, delay: idx * 0.1 }}
                className="p-6 sm:p-8 rounded-card bg-surface-raised border border-white/[0.08] hover:border-gold/30 transition-all flex flex-col justify-between"
              >
                <div>
                  <div className="flex items-center justify-between mb-6">
                    <div className="w-10 h-10 rounded-xl bg-gold/10 border border-gold/20 flex items-center justify-center text-gold">
                      <Icon className="w-5 h-5" />
                    </div>
                    <span className="font-serif text-2xl font-bold text-muted/60">
                      {stage.step}
                    </span>
                  </div>

                  <h3 className="font-sans text-xs uppercase tracking-[0.2em] font-bold text-gold mb-5">
                    {stage.title}
                  </h3>

                  <ul className="space-y-3">
                    {stage.guidelines.map((item, gIdx) => (
                      <li
                        key={gIdx}
                        className="text-xs sm:text-sm text-taupe flex items-start gap-2.5 leading-relaxed"
                      >
                        <span className="w-1.5 h-1.5 rounded-full bg-gold/60 flex-shrink-0 mt-1.5" />
                        <span>{item}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
