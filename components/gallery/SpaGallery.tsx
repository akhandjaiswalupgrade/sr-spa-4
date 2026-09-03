"use client";

import React, { useState, useRef } from "react";
import Image from "next/image";
import { motion } from "framer-motion";
import { Maximize2, ChevronLeft, ChevronRight } from "lucide-react";
import { galleryData, GalleryItem } from "@/data/gallery";
import { GalleryLightbox } from "@/components/gallery/GalleryLightbox";
import { trackEvent } from "@/lib/analytics";

export function SpaGallery() {
  const [lightboxOpen, setLightboxOpen] = useState(false);
  const [selectedIndex, setSelectedIndex] = useState(0);
  const scrollContainerRef = useRef<HTMLDivElement>(null);

  const handleOpenLightbox = (index: number) => {
    trackEvent("gallery_open", { index });
    setSelectedIndex(index);
    setLightboxOpen(true);
  };

  const scrollLeft = () => {
    if (scrollContainerRef.current) {
      scrollContainerRef.current.scrollBy({ left: -400, behavior: "smooth" });
    }
  };

  const scrollRight = () => {
    if (scrollContainerRef.current) {
      scrollContainerRef.current.scrollBy({ left: 400, behavior: "smooth" });
    }
  };

  return (
    <section
      id="our-space"
      className="relative bg-obsidian py-20 sm:py-28 lg:py-36 border-t border-white/[0.07] overflow-hidden"
    >
      <div className="max-w-[1280px] mx-auto px-5 sm:px-8 lg:px-12">
        {/* Section Header with Navigation Controls */}
        <div className="flex flex-col sm:flex-row sm:items-end justify-between mb-10 sm:mb-14 gap-6">
          <div className="max-w-2xl text-left">
            <span className="inline-block text-[11px] sm:text-xs font-sans font-semibold uppercase tracking-[0.22em] text-gold mb-3 sm:mb-4">
              Our Space
            </span>
            <h2 className="font-serif text-3xl sm:text-4xl md:text-5xl text-cream font-normal leading-[1.18] tracking-tight mb-4">
              Step inside Shirui.
            </h2>
            <p className="text-base sm:text-lg text-taupe leading-relaxed">
              A closer look at our private treatment suites, tactile limestone walls,
              and tranquil architectural lighting.
            </p>
          </div>

          {/* Left/Right Scroll Arrows */}
          <div className="hidden sm:flex items-center gap-3 flex-shrink-0">
            <button
              type="button"
              onClick={scrollLeft}
              className="p-3 rounded-full bg-surface-raised border border-white/10 hover:border-gold/40 text-cream hover:text-gold transition-colors"
              aria-label="Scroll Gallery Left"
            >
              <ChevronLeft className="w-5 h-5" />
            </button>
            <button
              type="button"
              onClick={scrollRight}
              className="p-3 rounded-full bg-surface-raised border border-white/10 hover:border-gold/40 text-cream hover:text-gold transition-colors"
              aria-label="Scroll Gallery Right"
            >
              <ChevronRight className="w-5 h-5" />
            </button>
          </div>
        </div>

        {/* Draggable / Scrollable Strip */}
        <div
          ref={scrollContainerRef}
          className="flex items-center gap-5 sm:gap-6 overflow-x-auto pb-6 no-scrollbar -mx-5 px-5 sm:mx-0 sm:px-0 scroll-smooth cursor-grab active:cursor-grabbing"
        >
          {galleryData.map((item, idx) => {
            const isLarge = item.aspectRatio === "large";
            const widthClass = isLarge
              ? "w-[320px] sm:w-[480px] lg:w-[560px]"
              : "w-[260px] sm:w-[340px] lg:w-[380px]";

            return (
              <motion.div
                key={item.id}
                initial={{ opacity: 0, scale: 0.96 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true, margin: "-40px" }}
                transition={{ duration: 0.5, delay: idx * 0.06 }}
                onClick={() => handleOpenLightbox(idx)}
                className={`relative flex-shrink-0 ${widthClass} h-[340px] sm:h-[420px] rounded-card overflow-hidden border border-white/10 group cursor-pointer shadow-xl bg-surface-raised`}
              >
                <Image
                  src={item.image}
                  alt={item.title}
                  fill
                  sizes="(max-width: 768px) 300px, 500px"
                  className="object-cover object-center group-hover:scale-105 transition-transform duration-700 ease-luxury"
                />

                {/* Ambient Overlay */}
                <div className="absolute inset-0 bg-gradient-to-t from-obsidian/90 via-black/20 to-transparent group-hover:from-obsidian/95 transition-colors" />

                {/* Hover Expand Icon */}
                <div className="absolute top-4 right-4 p-2.5 rounded-full bg-obsidian/80 backdrop-blur-md border border-white/10 text-cream opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                  <Maximize2 className="w-4 h-4 text-gold" />
                </div>

                {/* Bottom Caption Overlay */}
                <div className="absolute bottom-5 left-5 right-5">
                  <span className="text-[10px] uppercase tracking-[0.2em] font-sans font-bold text-gold block mb-1">
                    {item.category}
                  </span>
                  <h3 className="font-serif text-lg sm:text-xl text-cream font-medium">
                    {item.title}
                  </h3>
                  <p className="text-xs text-taupe mt-1 line-clamp-1">
                    {item.caption}
                  </p>
                </div>
              </motion.div>
            );
          })}
        </div>
      </div>

      {/* Lightbox Modal */}
      <GalleryLightbox
        items={galleryData}
        currentIndex={selectedIndex}
        isOpen={lightboxOpen}
        onClose={() => setLightboxOpen(false)}
        onNavigate={setSelectedIndex}
      />
    </section>
  );
}
