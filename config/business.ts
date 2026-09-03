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
  tagline: "A quiet escape from the pace of Hyderabad.",
  eyebrow: "PREMIUM WELLNESS · NEKNAMPUR, HYDERABAD",
  phone: "+919876543210", // Editable business phone
  whatsappNumber: "919876543210", // Editable WhatsApp number (with country code, no +)
  email: "care@shiruispa.com",
  addressLine1: "Plot No. 42, Green Valley Enclave",
  addressLine2: "Neknampur Road, Gandipet Mandal",
  area: "Neknampur",
  city: "Hyderabad",
  state: "Telangana",
  postalCode: "500089",
  country: "India",
  landmark: "Near Neknampur Lake & Heritage Valley",
  parkingInfo: "Dedicated valet and reserved on-site guest parking available.",
  latitude: 17.3912,
  longitude: 78.3698,
  googleMapsUrl: "https://maps.google.com/?q=Shirui+Wellness+Spa+Neknampur+Hyderabad",
  googleEmbedMapUrl: "https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d15229.431713506163!2d78.36214227702334!3d17.394541395982855!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3bcb96f01f705193%3A0xe5a1dfae9e3a6c98!2sNeknampur%2C%20Hyderabad%2C%20Telangana!5e0!3m2!1sen!2sin!4v1700000000000!5m2!1sen!2sin",
  instagramUrl: "https://instagram.com/shiruiwellnessspa",
  openingHours: [
    {
      days: "Monday – Sunday (All 7 Days)",
      hours: "10:00 AM – 9:30 PM",
      note: "Last appointment accepted at 8:30 PM",
    },
  ],
  reviewRating: 4.9,
  reviewCount: 280,
  isVerifiedGoogle: true,
  metrics: [
    {
      value: "10+",
      label: "Wellness Experiences",
      sublabel: "Targeted body & mind therapies",
    },
    {
      value: "45–120 MIN",
      label: "Session Options",
      sublabel: "Customized to your schedule",
    },
    {
      value: "7 DAYS",
      label: "Open Weekly",
      sublabel: "10:00 AM – 9:30 PM Daily",
    },
    {
      value: "PRIVATE",
      label: "Treatment Suites",
      sublabel: "Tranquil sound-dampened rooms",
    },
  ],
};
