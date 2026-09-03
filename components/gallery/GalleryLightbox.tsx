"use client";

import React, { useEffect, useCallback } from "react";
import Image from "next/image";
import { motion, AnimatePresence } from "framer-motion";
import { X, ChevronLeft, ChevronRight } from "lucide-react";
import { GalleryItem } from "@/data/gallery";

interface GalleryLightboxProps {
  items: GalleryItem[];
  currentIndex: number;
  isOpen: boolean;
  onClose: () => void;
  onNavigate: (newIndex: number) => void;
}

export function GalleryLightbox({
  items,
  currentIndex,
  isOpen,
  onClose,
  onNavigate,
}: GalleryLightboxProps) {
  const currentItem = items[currentIndex];

  const handlePrev = useCallback(() => {
    onNavigate((currentIndex - 1 + items.length) % items.length);
  }, [currentIndex, items.length, onNavigate]);

  const handleNext = useCallback(() => {
    onNavigate((currentIndex + 1) % items.length);
  }, [currentIndex, items.length, onNavigate]);

  // Keyboard navigation
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (!isOpen) return;
      if (e.key === "Escape") onClose();
      if (e.key === "ArrowLeft") handlePrev();
      if (e.key === "ArrowRight") handleNext();
    };

    if (isOpen) {
      document.body.style.overflow = "hidden";
      window.addEventListener("keydown", handleKeyDown);
    } else {
      document.body.style.overflow = "unset";
    }

    return () => {
      document.body.style.overflow = "unset";
      window.removeEventListener("keydown", handleKeyDown);
    };
  }, [isOpen, onClose, handlePrev, handleNext]);

  if (!isOpen || !currentItem) return null;

  return (
    <AnimatePresence>
      <div
        role="dialog"
        aria-modal="true"
        aria-label="Image Gallery Lightbox"
        className="fixed inset-0 z-50 flex items-center justify-center bg-black/95 backdrop-blur-xl p-4 sm:p-8"
      >
        {/* Close Button */}
        <button
          type="button"
          onClick={onClose}
          className="absolute top-4 right-4 sm:top-6 sm:right-6 z-50 p-3 rounded-full bg-surface-raised/80 hover:bg-gold hover:text-obsidian text-cream border border-white/10 transition-colors"
          aria-label="Close Lightbox (Esc)"
        >
          <X className="w-6 h-6" />
        </button>

        {/* Previous Button */}
        <button
          type="button"
          onClick={handlePrev}
          className="absolute left-3 sm:left-6 top-1/2 -translate-y-1/2 z-50 p-3 sm:p-4 rounded-full bg-surface-raised/80 hover:bg-gold hover:text-obsidian text-cream border border-white/10 transition-colors shadow-2xl"
          aria-label="Previous Image (Left Arrow)"
        >
          <ChevronLeft className="w-6 h-6" />
        </button>

        {/* Next Button */}
        <button
          type="button"
          onClick={handleNext}
          className="absolute right-3 sm:right-6 top-1/2 -translate-y-1/2 z-50 p-3 sm:p-4 rounded-full bg-surface-raised/80 hover:bg-gold hover:text-obsidian text-cream border border-white/10 transition-colors shadow-2xl"
          aria-label="Next Image (Right Arrow)"
        >
          <ChevronRight className="w-6 h-6" />
        </button>

        {/* Main Lightbox Content Stage */}
        <div className="relative max-w-5xl w-full max-h-[85vh] flex flex-col items-center justify-center">
          <motion.div
            key={currentItem.id}
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.95 }}
            transition={{ duration: 0.3 }}
            className="relative w-full aspect-[16/10] sm:aspect-[16/9] max-h-[70vh] rounded-visual overflow-hidden border border-white/10 shadow-2xl bg-surface-dark"
          >
            <Image
              src={currentItem.image}
              alt={currentItem.title}
              fill
              sizes="(max-width: 1280px) 100vw, 1200px"
              className="object-contain sm:object-cover object-center"
              priority
            />
          </motion.div>

          {/* Caption & Counter */}
          <div className="w-full text-center mt-4 sm:mt-6 px-4">
            <div className="flex items-center justify-center gap-2 mb-1">
              <span className="text-[10px] uppercase tracking-[0.2em] font-sans font-bold text-gold">
                {currentItem.category}
              </span>
              <span className="text-muted text-xs">·</span>
              <span className="text-xs text-muted font-sans font-medium">
                {currentIndex + 1} of {items.length}
              </span>
            </div>

            <h3 className="font-serif text-xl sm:text-2xl text-cream font-medium">
              {currentItem.title}
            </h3>

            <p className="text-xs sm:text-sm text-taupe mt-1 max-w-xl mx-auto line-clamp-2">
              {currentItem.caption}
            </p>
          </div>
        </div>
      </div>
    </AnimatePresence>
  );
}
