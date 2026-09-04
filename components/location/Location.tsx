"use client";

import React from "react";
import {
  MapPin,
  Clock,
  Car,
  Compass,
  Navigation,
  Phone,
  MessageCircle,
} from "lucide-react";
import { businessConfig } from "@/config/business";
import { Button } from "@/components/ui/Button";
import { getWhatsAppUrl, getCallUrl, getDirectionsUrl } from "@/lib/whatsapp";
import { trackEvent } from "@/lib/analytics";

interface LocationProps {
  onOpenBooking: () => void;
}

export function Location({ onOpenBooking }: LocationProps) {
  return (
    <section
      id="location"
      className="relative bg-obsidian py-24 sm:py-32 lg:py-36 border-t border-rose/15"
    >
      <div className="max-w-[1280px] mx-auto px-5 sm:px-8 lg:px-12">
        {/* Section Header */}
        <div className="max-w-2xl text-left mb-12 sm:mb-16">
          <span className="inline-block text-[11px] sm:text-xs font-sans font-bold uppercase tracking-[0.22em] text-rose mb-3 sm:mb-4">
            Visit Shirui
          </span>
          <h2 className="font-serif text-3xl sm:text-4xl md:text-5xl text-white font-normal leading-[1.18] tracking-tight mb-4">
            A quiet sanctuary in Neknampur.
          </h2>
          <p className="text-base sm:text-lg text-taupe leading-relaxed">
            Conveniently accessible for residents of Neknampur, Manikonda,
            Narsingi, Puppalguda, and the wider Financial District.
          </p>
        </div>

        {/* 2-Column Responsive Layout */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-14 items-stretch">
          {/* Left Column: Business Logistics */}
          <div className="lg:col-span-6 flex flex-col justify-between space-y-6">
            <div className="space-y-6">
              {/* Address */}
              <div className="p-6 rounded-2xl bg-surface-raised border border-rose/15 shadow-sm">
                <div className="flex items-start gap-4">
                  <div className="w-11 h-11 rounded-xl bg-rose/15 border border-rose/25 flex items-center justify-center text-rose flex-shrink-0">
                    <MapPin className="w-5 h-5" />
                  </div>
                  <div>
                    <h3 className="font-serif text-xl text-white font-medium mb-1">
                      Our Address
                    </h3>
                    <p className="text-sm text-taupe leading-relaxed">
                      {businessConfig.addressLine1}
                      <br />
                      {businessConfig.addressLine2}
                      <br />
                      {businessConfig.area}, Hyderabad, Telangana {businessConfig.postalCode}
                    </p>
                  </div>
                </div>
              </div>

              {/* Hours */}
              <div className="p-6 rounded-2xl bg-surface-raised border border-rose/15 shadow-sm">
                <div className="flex items-start gap-4">
                  <div className="w-11 h-11 rounded-xl bg-rose/15 border border-rose/25 flex items-center justify-center text-rose flex-shrink-0">
                    <Clock className="w-5 h-5" />
                  </div>
                  <div>
                    <h3 className="font-serif text-xl text-white font-medium mb-1">
                      Hours & Scheduling
                    </h3>
                    <p className="text-sm text-taupe leading-relaxed">
                      <strong className="text-white">Monday to Sunday:</strong> 10:00 AM – 9:30 PM
                      <br />
                      <span className="text-xs text-muted">
                        Last appointment accepted at 8:30 PM
                      </span>
                    </p>
                  </div>
                </div>
              </div>

              {/* Landmark & Parking */}
              <div className="p-6 rounded-2xl bg-surface-raised border border-rose/15 shadow-sm">
                <div className="flex items-start gap-4">
                  <div className="w-11 h-11 rounded-xl bg-rose/15 border border-rose/25 flex items-center justify-center text-rose flex-shrink-0">
                    <Car className="w-5 h-5" />
                  </div>
                  <div>
                    <h3 className="font-serif text-xl text-white font-medium mb-1">
                      Landmark & Parking
                    </h3>
                    <p className="text-sm text-taupe leading-relaxed">
                      {businessConfig.landmark}
                      <br />
                      <span className="text-xs text-taupe/90">
                        {businessConfig.parkingInfo}
                      </span>
                    </p>
                  </div>
                </div>
              </div>
            </div>

            {/* Quick Contact & Action Buttons */}
            <div className="flex flex-wrap items-center gap-3 pt-2">
              <a
                href={getDirectionsUrl()}
                target="_blank"
                rel="noopener noreferrer"
                onClick={() => trackEvent("directions_click", { context: "location_section" })}
                className="inline-flex items-center gap-2 px-6 py-3.5 rounded-xl bg-rose text-obsidian font-bold text-sm shadow-rose-glow hover:bg-rose-light transition-all"
              >
                <Navigation className="w-4 h-4" />
                <span>Get Directions</span>
              </a>

              <a
                href={getWhatsAppUrl({ source: "location_section" })}
                target="_blank"
                rel="noopener noreferrer"
                onClick={() => trackEvent("whatsapp_click", { context: "location_section" })}
                className="inline-flex items-center gap-2 px-6 py-3.5 rounded-xl bg-surface-raised border border-rose/25 text-sm font-semibold text-cream hover:bg-rose/15 hover:text-rose transition-colors"
              >
                <MessageCircle className="w-4 h-4 text-rose" />
                <span>WhatsApp</span>
              </a>

              <a
                href={getCallUrl()}
                onClick={() => trackEvent("call_click", { context: "location_section" })}
                className="inline-flex items-center gap-2 px-6 py-3.5 rounded-xl bg-surface-raised border border-rose/25 text-sm font-semibold text-cream hover:bg-rose/15 hover:text-rose transition-colors"
              >
                <Phone className="w-4 h-4 text-rose" />
                <span>Call Spa</span>
              </a>
            </div>
          </div>

          {/* Right Column: Google Maps Embed */}
          <div className="lg:col-span-6 min-h-[380px] sm:min-h-[460px] rounded-2xl overflow-hidden border border-rose/20 shadow-2xl relative bg-surface-raised">
            <iframe
              title="Shirui Wellness Spa Google Maps Location"
              src={businessConfig.googleEmbedMapUrl || "https://maps.google.com/?q=Shirui+Wellness+Spa+Neknampur+Hyderabad"}
              width="100%"
              height="100%"
              style={{ border: 0, minHeight: "100%", filter: "invert(90%) hue-rotate(180deg) brightness(95%) contrast(90%)" }}
              allowFullScreen={false}
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
              className="absolute inset-0 w-full h-full"
            />
          </div>
        </div>
      </div>
    </section>
  );
}
