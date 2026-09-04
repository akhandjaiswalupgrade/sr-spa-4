"use client";

import React from "react";
import Image from "next/image";
import { motion } from "framer-motion";

interface StoryChapter {
  step: string;
  headline: string;
  description: string;
  image: string;
}

const chapters: StoryChapter[] = [
  {
    step: "01 · ARRIVE",
    headline: "Leave Hyderabad outside for a while.",
    description:
      "Step through the doors into a sound-dampened, fragrance-infused sanctuary where traffic and deadlines immediately fade.",
    image: "/images/shirui-story-arrive.jpg",
  },
  {
    step: "02 · BREATHE",
    headline: "Your time starts slowing down here.",
    description:
      "Unwind with a warm herbal tonic, discuss your focus areas and pressure preferences, and settle into your softly lit private suite.",
    image: "/images/shirui-story-breathe.jpg",
  },
  {
    step: "03 · RESTORE",
    headline: "For a while, your body has nothing else to do.",
    description:
      "Surrender every tight muscle fiber as calibrated bodywork and warmed botanical extracts work systematically to restore your ease.",
    image: "/images/shirui-story-restore.jpg",
  },
];

export function CinematicStory() {
  return (
    <section className="relative bg-obsidian py-24 sm:py-32 lg:py-36 border-t border-rose/15">
      <div className="max-w-[1280px] mx-auto px-5 sm:px-8 lg:px-12">
        {/* Section Header */}
        <div className="max-w-2xl text-left mb-16 sm:mb-24">
          <span className="inline-block text-[11px] sm:text-xs font-sans font-bold uppercase tracking-[0.22em] text-rose mb-3 sm:mb-4">
            The Journey
          </span>
          <h2 className="font-serif text-3xl sm:text-4xl md:text-5xl text-white font-normal leading-[1.18] tracking-tight">
            How your afternoon unfolds.
          </h2>
        </div>

        {/* 3 Story Chapters Grid */}
        <div className="space-y-20 sm:space-y-28">
          {chapters.map((chap, idx) => {
            const isEven = idx % 2 === 1;
            return (
              <motion.div
                key={idx}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-60px" }}
                transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
                className={`grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-14 items-center ${
                  isEven ? "lg:flex-row-reverse" : ""
                }`}
              >
                {/* Visual */}
                <div
                  className={`lg:col-span-7 ${
                    isEven ? "lg:order-2" : "lg:order-1"
                  }`}
                >
                  <div className="relative aspect-[16/10] sm:aspect-[16/9] w-full rounded-2xl overflow-hidden border border-rose/20 shadow-2xl group">
                    <Image
                      src={chap.image}
                      alt={chap.headline}
                      fill
                      sizes="(max-width: 1024px) 100vw, 60vw"
                      className="object-cover object-center group-hover:scale-105 transition-transform duration-700 ease-luxury"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-obsidian/85 via-transparent to-black/20" />
                  </div>
                </div>

                {/* Copy */}
                <div
                  className={`lg:col-span-5 ${
                    isEven ? "lg:order-1" : "lg:order-2"
                  } space-y-4`}
                >
                  <span className="text-xs font-sans font-bold uppercase tracking-[0.24em] text-rose">
                    {chap.step}
                  </span>
                  <h3 className="font-serif text-2xl sm:text-3xl md:text-4xl text-white font-normal leading-tight">
                    {chap.headline}
                  </h3>
                  <p className="text-sm sm:text-base text-taupe leading-relaxed text-pretty">
                    {chap.description}
                  </p>
                </div>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
