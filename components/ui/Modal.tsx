"use client";

import React, { useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { X } from "lucide-react";
import { cn } from "@/lib/utils";

export interface ModalProps {
  isOpen: boolean;
  onClose: () => void;
  title?: string;
  subtitle?: string;
  children: React.ReactNode;
  maxWidth?: "sm" | "md" | "lg" | "xl" | "2xl";
  className?: string;
  hideCloseButton?: boolean;
  ariaLabel?: string;
}

const maxWidthClasses = {
  sm: "max-w-md",
  md: "max-w-lg",
  lg: "max-w-2xl",
  xl: "max-w-4xl",
  "2xl": "max-w-5xl",
};

export function Modal({
  isOpen,
  onClose,
  title,
  subtitle,
  children,
  maxWidth = "lg",
  className,
  hideCloseButton = false,
  ariaLabel,
}: ModalProps) {
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape" && isOpen) {
        onClose();
      }
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
  }, [isOpen, onClose]);

  return (
    <AnimatePresence>
      {isOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 overflow-y-auto">
          {/* Backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.25 }}
            onClick={onClose}
            className="fixed inset-0 bg-slate-900/40 backdrop-blur-sm"
            aria-hidden="true"
          />

          {/* Modal Container */}
          <motion.div
            initial={{ opacity: 0, scale: 0.96, y: 12 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.96, y: 12 }}
            transition={{ duration: 0.3, ease: [0.22, 1, 0.36, 1] }}
            role="dialog"
            aria-modal="true"
            aria-label={ariaLabel || title || "Dialog window"}
            className={cn(
              "relative w-full bg-white border border-gray-100 rounded-2xl shadow-xl p-6 sm:p-8 z-10 my-auto text-slate-700 max-h-[90vh] overflow-y-auto",
              maxWidthClasses[maxWidth],
              className
            )}
          >
            {/* Header */}
            {(title || !hideCloseButton) && (
              <div className="flex items-start justify-between mb-5 gap-4">
                <div>
                  {title && (
                    <h3 className="font-serif text-2xl sm:text-3xl text-slate-900 font-medium tracking-tight">
                      {title}
                    </h3>
                  )}
                  {subtitle && (
                    <p className="text-sm text-slate-600 mt-1 leading-relaxed">
                      {subtitle}
                    </p>
                  )}
                </div>

                {!hideCloseButton && (
                  <button
                    type="button"
                    onClick={onClose}
                    className="p-2 rounded-xl text-slate-400 hover:text-slate-700 hover:bg-slate-100 transition-colors focus:outline-none focus:ring-1 focus:ring-rose"
                    aria-label="Close modal"
                  >
                    <X className="w-5 h-5" />
                  </button>
                )}
              </div>
            )}

            {/* Modal Body */}
            <div>{children}</div>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
}
