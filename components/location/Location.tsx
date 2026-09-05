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
      className="relative bg-white py-24 sm:py-32 lg:py-36 border-t border-gray-100"
    >
      <div className="max-w-[1280px] mx-auto px-5 sm:px-8 lg:px-12">
        {/* Section Header */}
        <div className="max-w-2xl text-left mb-12 sm:mb-16">
          <span className="inline-block text-[11px] sm:text-xs font-sans font-bold uppercase tracking-[0.22em] text-[#c83b74] bg-rose-50/80 px-3.5 py-1 rounded-full border border-rose-200 shadow-sm mb-4">
            Visit Shirui
          </span>
          <h2 className="font-serif text-3xl sm:text-4xl md:text-5xl text-slate-900 font-normal leading-[1.18] tracking-tight mb-4">
            A quiet sanctuary in{" "}
            <span className="italic font-serif bg-gradient-to-r from-[#df548f] via-[#c83b74] to-[#a81d52] bg-clip-text text-transparent">
              Neknampur
            </span>
            .
          </h2>
          <p className="text-base sm:text-lg text-slate-700 leading-relaxed font-medium">
            Conveniently accessible for residents of Neknampur, Manikonda,
            Narsingi, Puppalguda, and the wider Financial District.
          </p>
        </div>

        {/* 2-Column Responsive Layout */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-14 items-stretch">
          {/* Left Column: Business Logistics */}
          <div className="lg:col-span-6 flex flex-col justify-between space-y-6">
            <div className="space-y-4">
              {/* Address */}
              <div className="p-6 rounded-2xl bg-[#f5f0eb] border border-slate-200/90 shadow-3d">
                <div className="flex items-start gap-4">
                  <div className="w-12 h-12 rounded-xl bg-white border border-slate-200/90 shadow-button-secondary-3d flex items-center justify-center text-[#c83b74] flex-shrink-0">
                    <MapPin className="w-5 h-5 stroke-[2]" />
                  </div>
                  <div>
                    <h3 className="font-serif text-xl text-slate-900 font-bold mb-1">
                      Our Address
                    </h3>
                    <p className="text-sm text-slate-700 leading-relaxed font-medium">
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
              <div className="p-6 rounded-2xl bg-[#f5f0eb] border border-slate-200/90 shadow-3d">
                <div className="flex items-start gap-4">
                  <div className="w-12 h-12 rounded-xl bg-white border border-slate-200/90 shadow-button-secondary-3d flex items-center justify-center text-[#c83b74] flex-shrink-0">
                    <Clock className="w-5 h-5 stroke-[2]" />
                  </div>
                  <div>
                    <h3 className="font-serif text-xl text-slate-900 font-bold mb-1">
                      Hours & Scheduling
                    </h3>
                    <p className="text-sm text-slate-700 leading-relaxed font-medium">
                      <strong className="text-slate-900">Monday to Sunday:</strong> 10:00 AM – 9:30 PM
                      <br />
                      <span className="text-xs text-slate-600 font-semibold">
                        Last appointment accepted at 8:30 PM
                      </span>
                    </p>
                  </div>
                </div>
              </div>

              {/* Landmark & Parking */}
              <div className="p-6 rounded-2xl bg-[#f5f0eb] border border-slate-200/90 shadow-3d">
                <div className="flex items-start gap-4">
                  <div className="w-12 h-12 rounded-xl bg-white border border-slate-200/90 shadow-button-secondary-3d flex items-center justify-center text-[#c83b74] flex-shrink-0">
                    <Car className="w-5 h-5 stroke-[2]" />
                  </div>
                  <div>
                    <h3 className="font-serif text-xl text-slate-900 font-bold mb-1">
                      Landmark & Parking
                    </h3>
                    <p className="text-sm text-slate-700 leading-relaxed font-medium">
                      {businessConfig.landmark}
                      <br />
                      <span className="text-xs text-slate-600 font-semibold">
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
                className="inline-flex items-center gap-2 px-6 py-3.5 rounded-xl bg-gradient-to-b from-[#df548f] to-[#c83b74] text-white font-bold text-sm shadow-button-3d border-t border-white/35 border-b border-rose-900/40 hover:-translate-y-0.5 active:translate-y-0.5 transition-all"
              >
                <Navigation className="w-4 h-4" />
                <span>Get Directions</span>
              </a>

              <a
                href={getWhatsAppUrl({ source: "location_section" })}
                target="_blank"
                rel="noopener noreferrer"
                onClick={() => trackEvent("whatsapp_click", { context: "location_section" })}
                className="inline-flex items-center gap-2 px-6 py-3.5 rounded-xl bg-white border border-slate-200/90 text-sm font-bold text-slate-800 hover:bg-rose-50/60 hover:text-rose shadow-button-secondary-3d hover:-translate-y-0.5 active:translate-y-0.5 transition-all"
              >
                <MessageCircle className="w-4 h-4 text-[#c83b74]" />
                <span>WhatsApp</span>
              </a>

              <a
                href={getCallUrl()}
                onClick={() => trackEvent("call_click", { context: "location_section" })}
                className="inline-flex items-center gap-2 px-6 py-3.5 rounded-xl bg-white border border-slate-200/90 text-sm font-bold text-slate-800 hover:bg-rose-50/60 hover:text-rose shadow-button-secondary-3d hover:-translate-y-0.5 active:translate-y-0.5 transition-all"
              >
                <Phone className="w-4 h-4 text-[#c83b74]" />
                <span>Call Spa</span>
              </a>
            </div>
          </div>

          {/* Right Column: Google Maps Embed */}
          <div className="lg:col-span-6 min-h-[380px] sm:min-h-[460px] rounded-2xl overflow-hidden border border-slate-200/90 shadow-3d relative bg-white">
            <iframe
              title="Shirui Wellness Spa Google Maps Location"
              src={businessConfig.googleEmbedMapUrl || "https://maps.google.com/?q=Shirui+Wellness+Spa+Neknampur+Hyderabad"}
              width="100%"
              height="100%"
              style={{ border: 0, minHeight: "100%" }}
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
