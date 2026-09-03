"use client";

import React from "react";
import { motion } from "framer-motion";
import { businessConfig } from "@/config/business";

export function ExperienceStats() {
  const metrics = businessConfig.metrics;

  return (
    <section className="relative z-20 bg-surface-dark border-y border-white/[0.07] py-10 sm:py-14">
      <div className="max-w-[1280px] mx-auto px-5 sm:px-8 lg:px-12">
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-6 sm:gap-8 lg:gap-0 lg:divide-x lg:divide-white/10">
          {metrics.map((metric, idx) => (
            <motion.div
              key={idx}
              initial={{ opacity: 0, y: 16 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-40px" }}
              transition={{ duration: 0.5, delay: idx * 0.1 }}
              className="flex flex-col items-center lg:items-start text-center lg:text-left lg:px-8 first:lg:pl-0 last:lg:pr-0"
            >
              <span className="font-serif text-3xl sm:text-4xl md:text-5xl text-cream font-medium tracking-tight mb-1.5 text-gold">
                {metric.value}
              </span>
              <span className="font-sans text-xs sm:text-sm font-semibold uppercase tracking-[0.14em] text-cream/90 mb-1">
                {metric.label}
              </span>
              <span className="font-sans text-xs text-muted leading-relaxed hidden sm:block">
                {metric.sublabel}
              </span>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
