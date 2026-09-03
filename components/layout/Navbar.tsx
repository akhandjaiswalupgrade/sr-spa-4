"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";
import { Menu, X, Phone, MessageCircle, ArrowRight } from "lucide-react";
import { Button } from "@/lib/../components/ui/Button";
import { siteConfig } from "@/config/site";
import { businessConfig } from "@/config/business";
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
      if (window.scrollY > 40) {
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
            ? "bg-obsidian/85 backdrop-blur-xl border-b border-white/[0.07] shadow-lg py-3 sm:py-4"
            : "bg-transparent py-5 sm:py-7"
        }`}
      >
        <div className="max-w-[1280px] mx-auto px-5 sm:px-8 lg:px-12 flex items-center justify-between">
          {/* Logo */}
          <Link
            href="#"
            onClick={(e) => {
              e.preventDefault();
              window.scrollTo({ top: 0, behavior: "smooth" });
            }}
            className="group flex flex-col items-start focus:outline-none"
            aria-label="Shirui Wellness Spa Homepage"
          >
            <span className="font-serif text-2xl sm:text-3xl tracking-wider text-cream font-medium leading-none group-hover:text-gold transition-colors duration-300">
              SHIRUI
            </span>
            <span className="text-[9px] sm:text-[10px] tracking-[0.28em] text-taupe uppercase font-sans font-medium mt-1">
              Wellness Spa
            </span>
          </Link>

          {/* Desktop Navigation Links */}
          <nav className="hidden lg:flex items-center gap-8 text-[13px] uppercase tracking-[0.14em] font-sans font-medium text-taupe">
            {siteConfig.navLinks.map((link) => (
              <a
                key={link.name}
                href={link.href}
                onClick={(e) => {
                  e.preventDefault();
                  handleNavClick(link.href);
                }}
                className="hover:text-cream transition-colors duration-200 relative py-1 after:content-[''] after:absolute after:bottom-0 after:left-0 after:w-0 after:h-[1px] after:bg-gold hover:after:w-full after:transition-all after:duration-300"
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
                className="shadow-sm"
              >
                Book Experience
              </Button>
            </div>

            {/* Mobile Hamburger Button */}
            <button
              type="button"
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="lg:hidden p-2.5 rounded-full text-cream hover:text-gold hover:bg-white/5 transition-colors duration-200 focus:outline-none focus:ring-1 focus:ring-gold"
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
            className="fixed inset-0 z-50 bg-obsidian/98 backdrop-blur-2xl flex flex-col justify-between p-6 sm:p-10 lg:hidden"
          >
            {/* Mobile Menu Header */}
            <div className="flex items-center justify-between pb-6 border-b border-white/10">
              <div className="flex flex-col">
                <span className="font-serif text-2xl tracking-wider text-cream font-medium leading-none">
                  SHIRUI
                </span>
                <span className="text-[9px] tracking-[0.28em] text-taupe uppercase font-sans font-medium mt-1">
                  Wellness Spa
                </span>
              </div>

              <button
                type="button"
                onClick={() => setMobileMenuOpen(false)}
                className="p-2.5 rounded-full text-taupe hover:text-cream hover:bg-white/5 transition-colors focus:outline-none"
                aria-label="Close menu"
              >
                <X className="w-6 h-6" />
              </button>
            </div>

            {/* Mobile Navigation Links */}
            <nav className="flex flex-col gap-6 my-auto py-6">
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
                  className="font-serif text-2xl sm:text-3xl text-cream/90 hover:text-gold transition-colors flex items-center justify-between"
                >
                  <span>{link.name}</span>
                  <ArrowRight className="w-4 h-4 text-muted opacity-60" />
                </motion.a>
              ))}
            </nav>

            {/* Mobile Menu Footer Actions */}
            <div className="flex flex-col gap-3 pt-6 border-t border-white/10">
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
                  className="flex items-center justify-center gap-2 py-3 rounded-full bg-white/[0.05] border border-white/10 text-xs tracking-wider uppercase font-medium text-cream hover:bg-white/10 transition-colors"
                >
                  <MessageCircle className="w-4 h-4 text-gold" />
                  WhatsApp
                </a>

                <a
                  href={getCallUrl()}
                  onClick={() => trackEvent("call_click", { context: "mobile_menu" })}
                  className="flex items-center justify-center gap-2 py-3 rounded-full bg-white/[0.05] border border-white/10 text-xs tracking-wider uppercase font-medium text-cream hover:bg-white/10 transition-colors"
                >
                  <Phone className="w-4 h-4 text-gold" />
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
