/**
 * Business Configuration for Shirui Wellness Spa
 * Single source of truth for location, contact, and operational details.
 * If any value is null, UI components will gracefully hide or adjust corresponding actions.
 */

export interface BusinessConfig {
  businessName: string;
  shortName: string;
  tagline: string;
  eyebrow: string;
  phone: string | null;
  whatsappNumber: string | null;
  email: string | null;
  addressLine1: string;
  addressLine2: string;
  area: string;
  city: string;
  state: string;
  postalCode: string;
  country: string;
  landmark: string;
  parkingInfo: string;
  latitude: number | null;
  longitude: number | null;
  googleMapsUrl: string | null;
  googleEmbedMapUrl: string | null;
  instagramUrl: string | null;
  openingHours: {
    days: string;
    hours: string;
    note?: string;
  }[];
  reviewRating: number | null;
  reviewCount: number | null;
  isVerifiedGoogle: boolean;
  metrics: {
    value: string;
    label: string;
    sublabel: string;
  }[];
}

export const businessConfig: BusinessConfig = {
  businessName: "Shirui Wellness Spa",
  shortName: "Shirui",
  tagline: "A Quieter You, A Brighter Tomorrow",
  eyebrow: "PREMIUM WELLNESS · GACHIBOWLI, HYDERABAD",
  phone: "+91 81259 37788", // Brochure business phone
  whatsappNumber: "918125937788", // Brochure WhatsApp number
  email: "care@shiruispa.com",
  addressLine1: "Plot 16, First Floor, KK Pride",
  addressLine2: "Gachibowli",
  area: "Gachibowli",
  city: "Hyderabad",
  state: "Telangana",
  postalCode: "500032",
  country: "India",
  landmark: "KK Pride Building, Gachibowli",
  parkingInfo: "Dedicated guest parking available directly on premises.",
  latitude: 17.436,
  longitude: 78.3585,
  googleMapsUrl: "https://maps.google.com/?q=KK+Pride+Gachibowli+Hyderabad",
  googleEmbedMapUrl: "https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3806.495204482089!2d78.3585098!3d17.4360212!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3bcb938066f103d3%3A0x6a05e26b4d37c92b!2sKK%20Pride%2C%20Gachibowli%2C%20Hyderabad%2C%20Telangana%20500032!5e0!3m2!1sen!2sin!4v1700000000000!5m2!1sen!2sin",
  instagramUrl: "https://instagram.com/shiruiwellnessspa",
  openingHours: [
    {
      days: "Open Daily (All 7 Days)",
      hours: "10:00 AM – 9:00 PM",
      note: "No Off Days · Last appointment accepted at 8:00 PM",
    },
  ],
  reviewRating: 4.9,
  reviewCount: 280,
  isVerifiedGoogle: true,
  metrics: [
    {
      value: "17+",
      label: "Wellness Rituals",
      sublabel: "Massages, scrubs & facial care",
    },
    {
      value: "30–120 MIN",
      label: "Session Options",
      sublabel: "Express to deep immersions",
    },
    {
      value: "7 DAYS",
      label: "Open Daily",
      sublabel: "10:00 AM – 9:00 PM (No Off Days)",
    },
    {
      value: "PRIVATE",
      label: "Sanctuary Suites",
      sublabel: "Single & couples treatment suites",
    },
  ],
};
