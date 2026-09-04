"use client";

import React from "react";
import { motion } from "framer-motion";
import { businessConfig } from "@/config/business";

export function ExperienceStats() {
  const metrics = businessConfig.metrics;

  return (
    <section className="relative z-20 bg-surface-dark border-y border-rose/15 py-14 sm:py-20">
      <div className="max-w-[1280px] mx-auto px-5 sm:px-8 lg:px-12">
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-8 sm:gap-10 lg:gap-0 lg:divide-x lg:divide-rose/15">
          {metrics.map((metric, idx) => (
            <motion.div
              key={idx}
              initial={{ opacity: 0, y: 16 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-40px" }}
              transition={{ duration: 0.5, delay: idx * 0.1 }}
              className="flex flex-col items-center lg:items-start text-center lg:text-left lg:px-8 first:lg:pl-0 last:lg:pr-0"
            >
              <span className="font-serif text-3xl sm:text-4xl md:text-5xl font-medium tracking-tight mb-2 text-rose">
                {metric.value}
              </span>
              <span className="font-sans text-xs sm:text-sm font-bold uppercase tracking-[0.14em] text-white mb-1">
                {metric.label}
              </span>
              <span className="font-sans text-xs text-taupe leading-relaxed hidden sm:block">
                {metric.sublabel}
              </span>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
