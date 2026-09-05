"use client";

import React from "react";
import { Phone, MessageCircle, Navigation } from "lucide-react";
import { getWhatsAppUrl, getCallUrl, getDirectionsUrl } from "@/lib/whatsapp";
import { trackEvent } from "@/lib/analytics";

interface MobileConversionBarProps {
  hide?: boolean;
}

export function MobileConversionBar({ hide = false }: MobileConversionBarProps) {
  if (hide) return null;

  return (
    <aside
      aria-label="Quick Actions"
      className="md:hidden fixed bottom-0 left-0 right-0 z-40 bg-white/95 backdrop-blur-xl border-t border-gray-200/80 px-4 py-2.5 pb-[calc(0.6rem+env(safe-area-inset-bottom,0px))] shadow-lg transition-transform duration-300"
    >
      <div className="grid grid-cols-3 gap-2 max-w-md mx-auto">
        {/* Call Button */}
        <a
          href={getCallUrl()}
          onClick={() => trackEvent("call_click", { context: "mobile_bar" })}
          className="flex flex-col items-center justify-center py-2 px-1 rounded-xl text-slate-600 hover:text-rose hover:bg-slate-50 active:scale-95 transition-all text-center"
        >
          <Phone className="w-4 h-4 text-rose mb-1" />
          <span className="text-[10px] tracking-wider uppercase font-bold text-slate-700">
            Call
          </span>
        </a>

        {/* WhatsApp Button */}
        <a
          href={getWhatsAppUrl({ source: "mobile_bar" })}
          target="_blank"
          rel="noopener noreferrer"
          onClick={() => trackEvent("whatsapp_click", { context: "mobile_bar" })}
          className="flex flex-col items-center justify-center py-2 px-1 rounded-xl bg-rose-50 border border-rose/30 text-rose hover:bg-rose-100/60 active:scale-95 transition-all text-center shadow-sm"
        >
          <MessageCircle className="w-4 h-4 text-rose mb-1" />
          <span className="text-[10px] tracking-wider uppercase font-bold text-rose">
            WhatsApp
          </span>
        </a>

        {/* Directions Button */}
        <a
          href={getDirectionsUrl()}
          target="_blank"
          rel="noopener noreferrer"
          onClick={() => trackEvent("directions_click", { context: "mobile_bar" })}
          className="flex flex-col items-center justify-center py-2 px-1 rounded-xl text-slate-600 hover:text-rose hover:bg-slate-50 active:scale-95 transition-all text-center"
        >
          <Navigation className="w-4 h-4 text-rose mb-1" />
          <span className="text-[10px] tracking-wider uppercase font-bold text-slate-700">
            Directions
          </span>
        </a>
      </div>
    </aside>
  );
}
