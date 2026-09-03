"use client";

import React from "react";
import { motion } from "framer-motion";
import {
  MapPin,
  Clock,
  Car,
  Compass,
  Navigation,
  Phone,
  MessageCircle,
  Calendar,
} from "lucide-react";
import { businessConfig } from "@/config/business";
import { getWhatsAppUrl, getCallUrl, getDirectionsUrl } from "@/lib/whatsapp";
import { Button } from "@/components/ui/Button";
import { trackEvent } from "@/lib/analytics";

interface LocationProps {
  onOpenBooking: () => void;
}

export function Location({ onOpenBooking }: LocationProps) {
  return (
    <section
      id="visit"
      className="relative bg-obsidian py-20 sm:py-28 lg:py-36 border-t border-white/[0.07]"
    >
      <div className="max-w-[1280px] mx-auto px-5 sm:px-8 lg:px-12">
        {/* Section Header */}
        <div className="max-w-2xl text-left mb-12 sm:mb-16">
          <span className="inline-block text-[11px] sm:text-xs font-sans font-semibold uppercase tracking-[0.22em] text-gold mb-3 sm:mb-4">
            Visit Shirui
          </span>
          <h2 className="font-serif text-3xl sm:text-4xl md:text-5xl text-cream font-normal leading-[1.18] tracking-tight mb-4">
            Your escape is closer than you think.
          </h2>
          <p className="text-base sm:text-lg text-taupe leading-relaxed">
            Conveniently located in Neknampur, Hyderabad with easy connectivity to
            Gandipet, Narsingi, Manikonda, and the Financial District.
          </p>
        </div>

        {/* 2-Column Info & Map */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-stretch">
          {/* Left Column: Business Info & Actions */}
          <div className="lg:col-span-6 flex flex-col justify-between p-6 sm:p-10 rounded-feature bg-surface-raised border border-white/10 shadow-2xl">
            <div className="space-y-6">
              {/* Address */}
              <div className="flex items-start gap-4">
                <div className="w-10 h-10 rounded-xl bg-gold/10 border border-gold/20 flex items-center justify-center text-gold flex-shrink-0 mt-1">
                  <MapPin className="w-5 h-5" />
                </div>
                <div>
                  <h3 className="font-serif text-xl text-cream font-medium">
                    {businessConfig.businessName}
                  </h3>
                  <p className="text-sm text-taupe mt-1 leading-relaxed">
                    {businessConfig.addressLine1}, {businessConfig.addressLine2},{" "}
                    {businessConfig.area}, {businessConfig.city},{" "}
                    {businessConfig.state} {businessConfig.postalCode}
                  </p>
                </div>
              </div>

              {/* Opening Hours */}
              <div className="flex items-start gap-4 pt-4 border-t border-white/[0.07]">
                <div className="w-10 h-10 rounded-xl bg-gold/10 border border-gold/20 flex items-center justify-center text-gold flex-shrink-0 mt-1">
                  <Clock className="w-5 h-5" />
                </div>
                <div>
                  <h4 className="font-serif text-lg text-cream font-medium">
                    Opening Hours
                  </h4>
                  {businessConfig.openingHours.map((h, i) => (
                    <div key={i} className="text-sm text-taupe mt-0.5">
                      <span>
                        {h.days}: <strong>{h.hours}</strong>
                      </span>
                      {h.note && (
                        <span className="block text-xs text-muted mt-0.5">
                          {h.note}
                        </span>
                      )}
                    </div>
                  ))}
                </div>
              </div>

              {/* Landmark & Parking */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-4 border-t border-white/[0.07]">
                <div className="flex items-start gap-3">
                  <Compass className="w-4 h-4 text-gold flex-shrink-0 mt-0.5" />
                  <div>
                    <span className="text-[11px] font-sans uppercase tracking-wider text-muted block font-semibold">
                      Landmark
                    </span>
                    <span className="text-xs text-taupe">
                      {businessConfig.landmark}
                    </span>
                  </div>
                </div>

                <div className="flex items-start gap-3">
                  <Car className="w-4 h-4 text-gold flex-shrink-0 mt-0.5" />
                  <div>
                    <span className="text-[11px] font-sans uppercase tracking-wider text-muted block font-semibold">
                      Parking
                    </span>
                    <span className="text-xs text-taupe">
                      {businessConfig.parkingInfo}
                    </span>
                  </div>
                </div>
              </div>
            </div>

            {/* Action Buttons Grid */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-8 border-t border-white/10 mt-8">
              <a
                href={getDirectionsUrl()}
                target="_blank"
                rel="noopener noreferrer"
                onClick={() => trackEvent("directions_click", { context: "location_section" })}
                className="inline-flex items-center justify-center gap-2 py-3 px-4 rounded-full bg-gold text-obsidian font-sans font-semibold text-xs uppercase tracking-wider hover:bg-gold-light transition-all shadow-luxury-glow"
              >
                <Navigation className="w-4 h-4" />
                <span>Get Directions</span>
              </a>

              <Button
                variant="secondary"
                size="md"
                onClick={() => {
                  trackEvent("book_click", { context: "location_section" });
                  onOpenBooking();
                }}
              >
                <Calendar className="w-4 h-4 mr-2 text-gold" />
                <span>Book Visit</span>
              </Button>

              <a
                href={getWhatsAppUrl({ source: "location_section" })}
                target="_blank"
                rel="noopener noreferrer"
                onClick={() => trackEvent("whatsapp_click", { context: "location_section" })}
                className="inline-flex items-center justify-center gap-2 py-3 px-4 rounded-full bg-white/[0.04] hover:bg-white/[0.08] border border-white/10 text-cream text-xs uppercase tracking-wider font-medium transition-colors"
              >
                <MessageCircle className="w-4 h-4 text-gold" />
                <span>WhatsApp</span>
              </a>

              <a
                href={getCallUrl()}
                onClick={() => trackEvent("call_click", { context: "location_section" })}
                className="inline-flex items-center justify-center gap-2 py-3 px-4 rounded-full bg-white/[0.04] hover:bg-white/[0.08] border border-white/10 text-cream text-xs uppercase tracking-wider font-medium transition-colors"
              >
                <Phone className="w-4 h-4 text-gold" />
                <span>Call Spa</span>
              </a>
            </div>
          </div>

          {/* Right Column: Google Maps Embed with Dark Theme */}
          <div className="lg:col-span-6 rounded-feature overflow-hidden border border-white/10 shadow-2xl relative min-h-[340px] sm:min-h-[420px] bg-surface-raised">
            <iframe
              src={businessConfig.googleEmbedMapUrl || ""}
              width="100%"
              height="100%"
              style={{ border: 0, filter: "invert(90%) hue-rotate(180deg) brightness(95%) contrast(90%)" }}
              allowFullScreen={false}
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
              title="Shirui Wellness Spa Neknampur Google Maps Location"
              className="w-full h-full min-h-[340px] sm:min-h-[420px]"
            />
          </div>
        </div>
      </div>
    </section>
  );
}
