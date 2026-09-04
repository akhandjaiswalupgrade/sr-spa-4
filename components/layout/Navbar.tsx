"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import Image from "next/image";
import { motion, AnimatePresence } from "framer-motion";
import { Menu, X, Phone, MessageCircle, ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/Button";
import { siteConfig } from "@/config/site";
import { getWhatsAppUrl, getCallUrl } from "@/lib/whatsapp";
import { trackEvent } from "@/lib/analytics";

interface NavbarProps {
  onOpenBooking: (initialTreatment?: string) => void;
}

export function Navbar({ onOpenBooking }: NavbarProps) {
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 30) {
        setIsScrolled(true);
      } else {
        setIsScrolled(false);
      }
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    handleScroll();
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // Lock body scroll when mobile menu is open
  useEffect(() => {
    if (mobileMenuOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "unset";
    }
    return () => {
      document.body.style.overflow = "unset";
    };
  }, [mobileMenuOpen]);

  const handleNavClick = (href: string) => {
    setMobileMenuOpen(false);
    const targetElement = document.querySelector(href);
    if (targetElement) {
      targetElement.scrollIntoView({ behavior: "smooth" });
    }
  };

  return (
    <>
      <header
        className={`fixed top-0 left-0 right-0 z-40 transition-all duration-500 ${
          isScrolled
            ? "bg-obsidian/92 backdrop-blur-xl border-b border-rose/15 shadow-xl py-2.5 sm:py-3.5"
            : "bg-gradient-to-b from-obsidian/90 via-obsidian/40 to-transparent py-4 sm:py-6"
        }`}
      >
        <div className="max-w-[1280px] mx-auto px-5 sm:px-8 lg:px-12 flex items-center justify-between">
          {/* Logo Integration */}
          <Link
            href="#"
            onClick={(e) => {
              e.preventDefault();
              window.scrollTo({ top: 0, behavior: "smooth" });
            }}
            className="group flex items-center focus:outline-none transition-transform duration-300 hover:scale-[1.02]"
            aria-label="Shirui Wellness Spa Homepage"
          >
            <div className="relative h-11 sm:h-14 w-auto flex items-center">
              <Image
                src="/srlogo.png"
                alt="Shirui Wellness Spa"
                width={190}
                height={68}
                priority
                className="h-11 sm:h-14 w-auto object-contain filter drop-shadow-md"
              />
            </div>
          </Link>

          {/* Desktop Navigation Links */}
          <nav className="hidden lg:flex items-center gap-7 text-[13px] uppercase tracking-[0.14em] font-sans font-semibold text-taupe">
            {siteConfig.navLinks.map((link) => (
              <a
                key={link.name}
                href={link.href}
                onClick={(e) => {
                  e.preventDefault();
                  handleNavClick(link.href);
                }}
                className="hover:text-cream transition-colors duration-200 relative py-1 after:content-[''] after:absolute after:bottom-0 after:left-0 after:w-0 after:h-[2px] after:bg-rose hover:after:w-full after:transition-all after:duration-300"
              >
                {link.name}
              </a>
            ))}
          </nav>

          {/* Action Button & Mobile Toggle */}
          <div className="flex items-center gap-3">
            <div className="hidden sm:block">
              <Button
                variant="primary"
                size="sm"
                onClick={() => {
                  trackEvent("book_click", { context: "navbar" });
                  onOpenBooking();
                }}
                className="shadow-rose-glow"
              >
                Book Experience
              </Button>
            </div>

            {/* Mobile Hamburger Button */}
            <button
              type="button"
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="lg:hidden p-2.5 rounded-xl text-cream hover:text-rose hover:bg-white/5 transition-colors duration-200 focus:outline-none focus:ring-1 focus:ring-rose"
              aria-label={mobileMenuOpen ? "Close Navigation Menu" : "Open Navigation Menu"}
              aria-expanded={mobileMenuOpen}
            >
              {mobileMenuOpen ? (
                <X className="w-6 h-6" />
              ) : (
                <Menu className="w-6 h-6" />
              )}
            </button>
          </div>
        </div>
      </header>

      {/* Full-Screen Mobile Navigation Overlay */}
      <AnimatePresence>
        {mobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.35, ease: [0.22, 1, 0.36, 1] }}
            className="fixed inset-0 z-50 bg-obsidian/98 backdrop-blur-2xl flex flex-col justify-between p-6 sm:p-10 lg:hidden overflow-y-auto"
          >
            {/* Mobile Menu Header */}
            <div className="flex items-center justify-between pb-5 border-b border-rose/15">
              <Image
                src="/srlogo.png"
                alt="Shirui Wellness Spa"
                width={160}
                height={56}
                className="h-11 w-auto object-contain"
                priority
              />

              <button
                type="button"
                onClick={() => setMobileMenuOpen(false)}
                className="p-2.5 rounded-xl text-taupe hover:text-cream hover:bg-white/5 transition-colors focus:outline-none"
                aria-label="Close menu"
              >
                <X className="w-6 h-6" />
              </button>
            </div>

            {/* Mobile Navigation Links */}
            <nav className="flex flex-col gap-5 my-auto py-6">
              {siteConfig.navLinks.map((link, idx) => (
                <motion.a
                  key={link.name}
                  href={link.href}
                  initial={{ opacity: 0, x: -16 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.05 * idx, duration: 0.3 }}
                  onClick={(e) => {
                    e.preventDefault();
                    handleNavClick(link.href);
                  }}
                  className="font-serif text-2xl sm:text-3xl text-cream/90 hover:text-rose transition-colors flex items-center justify-between py-1"
                >
                  <span>{link.name}</span>
                  <ArrowRight className="w-4 h-4 text-rose opacity-70" />
                </motion.a>
              ))}
            </nav>

            {/* Mobile Menu Footer Actions */}
            <div className="flex flex-col gap-3 pt-6 border-t border-rose/15">
              <Button
                variant="primary"
                fullWidth
                size="lg"
                onClick={() => {
                  setMobileMenuOpen(false);
                  trackEvent("book_click", { context: "mobile_menu" });
                  onOpenBooking();
                }}
              >
                Book An Experience
              </Button>

              <div className="grid grid-cols-2 gap-3">
                <a
                  href={getWhatsAppUrl({ source: "mobile_menu" })}
                  target="_blank"
                  rel="noopener noreferrer"
                  onClick={() => trackEvent("whatsapp_click", { context: "mobile_menu" })}
                  className="flex items-center justify-center gap-2 py-3.5 rounded-xl bg-surface-raised border border-rose/25 text-xs tracking-wider uppercase font-semibold text-cream hover:bg-rose/15 transition-colors"
                >
                  <MessageCircle className="w-4 h-4 text-rose" />
                  WhatsApp
                </a>

                <a
                  href={getCallUrl()}
                  onClick={() => trackEvent("call_click", { context: "mobile_menu" })}
                  className="flex items-center justify-center gap-2 py-3.5 rounded-xl bg-surface-raised border border-rose/25 text-xs tracking-wider uppercase font-semibold text-cream hover:bg-rose/15 transition-colors"
                >
                  <Phone className="w-4 h-4 text-rose" />
                  Call Spa
                </a>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
