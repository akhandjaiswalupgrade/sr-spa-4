"use client";

import React from "react";
import Link from "next/link";
import Image from "next/image";
import {
  Phone,
  MessageCircle,
  MapPin,
  Clock,
  Instagram,
  Navigation,
  ArrowUp,
} from "lucide-react";
import { businessConfig } from "@/config/business";
import { siteConfig } from "@/config/site";
import { getWhatsAppUrl, getCallUrl, getDirectionsUrl } from "@/lib/whatsapp";
import { trackEvent } from "@/lib/analytics";

export function Footer() {
  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const handleNavClick = (href: string) => {
    const targetElement = document.querySelector(href);
    if (targetElement) {
      targetElement.scrollIntoView({ behavior: "smooth" });
    }
  };

  return (
    <footer className="bg-[#141012] text-taupe border-t border-rose/15 pt-20 sm:pt-24 pb-28 md:pb-20">
      <div className="max-w-[1280px] mx-auto px-5 sm:px-8 lg:px-12">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-12 gap-10 lg:gap-12 pb-16 border-b border-white/[0.08]">
          {/* Column 1: Brand Logo & Bio (4 cols) */}
          <div className="lg:col-span-4 space-y-4">
            <Link
              href="#"
              onClick={(e) => {
                e.preventDefault();
                scrollToTop();
              }}
              className="inline-block group focus:outline-none transition-transform duration-300 hover:scale-[1.02]"
              aria-label="Shirui Wellness Spa Homepage"
            >
              <Image
                src="/srlogo.png"
                alt="Shirui Wellness Spa"
                width={220}
                height={80}
                className="h-14 sm:h-16 w-auto object-contain filter drop-shadow-md"
              />
            </Link>

            <p className="text-xs sm:text-sm text-taupe leading-relaxed max-w-sm pt-2">
              A quieter way to experience wellness in Neknampur, Hyderabad. Designed
              for individuals seeking restorative time for themselves.
            </p>

            <div className="flex items-center gap-3 pt-3">
              {businessConfig.instagramUrl && (
                <a
                  href={businessConfig.instagramUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label="Follow Shirui Spa on Instagram"
                  className="w-10 h-10 rounded-xl bg-surface-raised hover:bg-rose hover:text-obsidian flex items-center justify-center text-cream transition-colors border border-rose/20 shadow-sm"
                >
                  <Instagram className="w-4 h-4" />
                </a>
              )}

              <a
                href={getWhatsAppUrl({ source: "footer" })}
                target="_blank"
                rel="noopener noreferrer"
                onClick={() => trackEvent("whatsapp_click", { context: "footer" })}
                aria-label="Message on WhatsApp"
                className="w-10 h-10 rounded-xl bg-surface-raised hover:bg-rose hover:text-obsidian flex items-center justify-center text-cream transition-colors border border-rose/20 shadow-sm"
              >
                <MessageCircle className="w-4 h-4" />
              </a>

              <a
                href={getCallUrl()}
                onClick={() => trackEvent("call_click", { context: "footer" })}
                aria-label="Call Spa"
                className="w-10 h-10 rounded-xl bg-surface-raised hover:bg-rose hover:text-obsidian flex items-center justify-center text-cream transition-colors border border-rose/20 shadow-sm"
              >
                <Phone className="w-4 h-4" />
              </a>
            </div>
          </div>

          {/* Column 2: Navigation Links (2.5 cols) */}
          <div className="lg:col-span-3 space-y-4">
            <span className="text-xs font-sans uppercase font-bold tracking-[0.2em] text-white block">
              Explore
            </span>
            <ul className="space-y-3 text-xs sm:text-sm font-sans font-medium">
              {siteConfig.navLinks.map((link) => (
                <li key={link.name}>
                  <a
                    href={link.href}
                    onClick={(e) => {
                      e.preventDefault();
                      handleNavClick(link.href);
                    }}
                    className="hover:text-rose transition-colors block py-0.5"
                  >
                    {link.name}
                  </a>
                </li>
              ))}
              <li>
                <a
                  href="#faq"
                  onClick={(e) => {
                    e.preventDefault();
                    handleNavClick("#faq");
                  }}
                  className="hover:text-rose transition-colors block py-0.5"
                >
                  FAQs & Advice
                </a>
              </li>
            </ul>
          </div>

          {/* Column 3: Hours & Timing (2.5 cols) */}
          <div className="lg:col-span-2 space-y-4">
            <span className="text-xs font-sans uppercase font-bold tracking-[0.2em] text-white block">
              Opening Hours
            </span>
            <div className="space-y-3 text-xs sm:text-sm font-sans">
              <div>
                <span className="text-white font-semibold block">All 7 Days</span>
                <span className="text-taupe">10:00 AM – 9:30 PM</span>
              </div>
              <div>
                <span className="text-muted block text-[11px] uppercase tracking-wider">Last Entry</span>
                <span className="text-taupe">8:30 PM</span>
              </div>
            </div>
          </div>

          {/* Column 4: Contact & Location (3 cols) */}
          <div className="lg:col-span-3 space-y-4">
            <span className="text-xs font-sans uppercase font-bold tracking-[0.2em] text-white block">
              Contact & Address
            </span>
            <div className="space-y-3 text-xs sm:text-sm font-sans">
              <p className="leading-relaxed">
                {businessConfig.addressLine1}, {businessConfig.area}, Hyderabad,
                Telangana {businessConfig.postalCode}
              </p>
              <div className="pt-1 flex flex-col gap-2">
                <a
                  href={getCallUrl()}
                  onClick={() => trackEvent("call_click", { context: "footer" })}
                  className="hover:text-rose transition-colors inline-flex items-center gap-2"
                >
                  <Phone className="w-3.5 h-3.5 text-rose" />
                  <span>{businessConfig.phone}</span>
                </a>
                <a
                  href={getDirectionsUrl()}
                  target="_blank"
                  rel="noopener noreferrer"
                  onClick={() => trackEvent("directions_click", { context: "footer" })}
                  className="hover:text-rose transition-colors inline-flex items-center gap-2"
                >
                  <Navigation className="w-3.5 h-3.5 text-rose" />
                  <span>Get Driving Directions</span>
                </a>
              </div>
            </div>
          </div>
        </div>

        {/* Bottom Copyright & Disclaimer Row */}
        <div className="pt-8 flex flex-col sm:flex-row items-center justify-between text-xs text-muted font-sans gap-4">
          <p>© {new Date().getFullYear()} Shirui Wellness Spa. All rights reserved.</p>

          <p className="text-center sm:text-right text-[11px] max-w-md leading-relaxed">
            Massage therapy is intended for relaxation and temporary tension relief.
            Not a substitute for clinical medical care.
          </p>

          <button
            type="button"
            onClick={scrollToTop}
            className="flex items-center gap-1 hover:text-rose transition-colors py-1 focus:outline-none"
            aria-label="Back to top"
          >
            <span>Back to top</span>
            <ArrowUp className="w-3.5 h-3.5 text-rose" />
          </button>
        </div>
      </div>
    </footer>
  );
}
