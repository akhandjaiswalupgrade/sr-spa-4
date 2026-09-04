/**
 * Analytics Tracking Utility
 * Dispatches custom events to Google Tag Manager (dataLayer) or analytics providers.
 */

declare global {
  interface Window {
    dataLayer?: Record<string, unknown>[];
  }
}

export type EventName =
  | "hero_explore_click"
  | "book_click"
  | "whatsapp_click"
  | "call_click"
  | "directions_click"
  | "treatment_category_select"
  | "treatment_view"
  | "treatment_book_click"
  | "anatomy_interaction"
  | "muscle_region_select"
  | "configurator_start"
  | "configurator_step"
  | "configurator_complete"
  | "gallery_open"
  | "gallery_slide"
  | "review_interaction"
  | "faq_open"
  | "faq_toggle"
  | "faq_category_change"
  | "booking_modal_open"
  | "booking_submit"
  | "booking_success";

export interface EventProperties {
  context?: string;
  treatmentName?: string;
  treatmentSlug?: string;
  category?: string;
  muscleRegion?: string;
  duration?: number;
  pressure?: string;
  step?: number;
  value?: string | number;
  [key: string]: unknown;
}

export function trackEvent(eventName: EventName, properties?: EventProperties): void {
  if (typeof window !== "undefined") {
    // GTM DataLayer push
    if (window.dataLayer) {
      window.dataLayer.push({
        event: eventName,
        ...properties,
        timestamp: new Date().toISOString(),
      });
    }

    // Optional console log in development
    if (process.env.NODE_ENV === "development") {
      console.log(`[Analytics] ${eventName}`, properties || {});
    }
  }
}
