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
      className="relative bg-white py-24 sm:py-32 lg:py-36 border-t border-gray-100 overflow-hidden"
    >
      <div className="max-w-[1280px] mx-auto px-5 sm:px-8 lg:px-12">
        {/* Section Header with Navigation Controls */}
        <div className="flex flex-col sm:flex-row sm:items-end justify-between mb-10 sm:mb-14 gap-6">
          <div className="max-w-2xl text-left">
            <span className="inline-block text-[11px] sm:text-xs font-sans font-bold uppercase tracking-[0.22em] text-[#c83b74] bg-rose-50/80 px-3.5 py-1 rounded-full border border-rose-200 shadow-sm mb-4">
              Our Space
            </span>
            <h2 className="font-serif text-3xl sm:text-4xl md:text-5xl text-slate-900 font-normal leading-[1.18] tracking-tight mb-4">
              Step inside{" "}
              <span className="italic font-serif bg-gradient-to-r from-[#df548f] via-[#c83b74] to-[#a81d52] bg-clip-text text-transparent">
                Shirui
              </span>
              .
            </h2>
            <p className="text-base sm:text-lg text-slate-700 leading-relaxed font-medium">
              A closer look at our private treatment suites, tactile limestone walls,
              and tranquil architectural lighting.
            </p>
          </div>

          {/* Left/Right Scroll Arrows */}
          <div className="hidden sm:flex items-center gap-3 flex-shrink-0">
            <button
              type="button"
              onClick={scrollLeft}
              className="p-3.5 rounded-xl bg-white border border-slate-200/90 hover:border-rose/40 text-slate-800 hover:text-rose shadow-button-secondary-3d hover:-translate-y-0.5 active:translate-y-0.5 transition-all"
              aria-label="Scroll Gallery Left"
            >
              <ChevronLeft className="w-5 h-5 stroke-[2.5]" />
            </button>
            <button
              type="button"
              onClick={scrollRight}
              className="p-3.5 rounded-xl bg-white border border-slate-200/90 hover:border-rose/40 text-slate-800 hover:text-rose shadow-button-secondary-3d hover:-translate-y-0.5 active:translate-y-0.5 transition-all"
              aria-label="Scroll Gallery Right"
            >
              <ChevronRight className="w-5 h-5 stroke-[2.5]" />
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
                className={`relative flex-shrink-0 ${widthClass} h-[340px] sm:h-[420px] rounded-2xl overflow-hidden border border-slate-200/90 hover:border-rose/50 group cursor-pointer shadow-3d hover:shadow-3d-hover hover:-translate-y-1.5 transition-all duration-300 bg-white`}
              >
                <Image
                  src={item.image}
                  alt={item.title}
                  fill
                  sizes="(max-width: 768px) 300px, 500px"
                  className="object-cover object-center group-hover:scale-105 transition-transform duration-700 ease-luxury"
                />

                {/* Ambient Overlay for caption readability */}
                <div className="absolute inset-0 bg-gradient-to-t from-slate-950/85 via-slate-950/25 to-transparent group-hover:from-slate-950/95 transition-colors" />

                {/* Hover Expand Icon */}
                <div className="absolute top-4 right-4 p-2.5 rounded-xl bg-white/95 backdrop-blur-md border border-slate-200 text-slate-800 opacity-0 group-hover:opacity-100 transition-opacity duration-300 shadow-3d">
                  <Maximize2 className="w-4 h-4 text-[#c83b74]" />
                </div>

                {/* Bottom Caption Overlay */}
                <div className="absolute bottom-5 left-5 right-5">
                  <span className="text-[10px] uppercase tracking-[0.2em] font-sans font-bold text-rose-300 block mb-1">
                    {item.category}
                  </span>
                  <h3 className="font-serif text-lg sm:text-xl text-white font-bold">
                    {item.title}
                  </h3>
                  <p className="text-xs text-slate-200 mt-1 line-clamp-1 font-medium">
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
