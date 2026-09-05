"use client";

import React from "react";
import { motion } from "framer-motion";
import { businessConfig } from "@/config/business";

export function ExperienceStats() {
  const metrics = businessConfig.metrics;

  return (
    <section className="relative z-20 bg-[#f5f0eb] border-y border-slate-200/80 py-14 sm:py-20">
      <div className="max-w-[1280px] mx-auto px-5 sm:px-8 lg:px-12">
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6">
          {metrics.map((metric, idx) => (
            <motion.div
              key={idx}
              initial={{ opacity: 0, y: 16 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-40px" }}
              transition={{ duration: 0.5, delay: idx * 0.1 }}
              className="p-5 sm:p-6 rounded-2xl bg-white/90 border border-slate-200/90 shadow-3d hover:shadow-3d-hover hover:-translate-y-1 transition-all duration-300 flex flex-col items-center lg:items-start text-center lg:text-left"
            >
              <span className="font-serif text-3xl sm:text-4xl md:text-5xl font-semibold tracking-tight mb-2 bg-gradient-to-r from-[#df548f] via-[#c83b74] to-[#a81d52] bg-clip-text text-transparent">
                {metric.value}
              </span>
              <span className="font-sans text-xs sm:text-sm font-bold uppercase tracking-[0.14em] text-slate-900 mb-1">
                {metric.label}
              </span>
              <span className="font-sans text-xs text-slate-600 font-medium leading-relaxed hidden sm:block">
                {metric.sublabel}
              </span>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
