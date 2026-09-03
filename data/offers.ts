export interface Offer {
  id: string;
  isActive: boolean;
  tag: string;
  title: string;
  subtitle: string;
  description: string;
  validity: string;
  timing: string;
  originalPrice: number;
  offerPrice: number;
  durationMinutes: number;
  image: string;
  inclusions: string[];
  terms: string;
}

export const offersData: Offer[] = [
  {
    id: "weekday-wellness",
    isActive: true,
    tag: "WEEKDAY WELLNESS PRIVILEGE",
    title: "A Little More Time For Yourself",
    subtitle: "60-Minute Custom Relaxation Session with Herbal Tea Ritual",
    description:
      "Take advantage of quieter weekday hours to pause and restore. Enjoy a full 60-minute Swedish or Deep Tissue session accompanied by an aromatic hot towel compress and post-treatment tea service.",
    validity: "Monday through Friday",
    timing: "Valid between 11:00 AM and 5:00 PM",
    originalPrice: 2799,
    offerPrice: 2199,
    durationMinutes: 60,
    image: "/images/shirui-weekday-wellness.jpg",
    inclusions: [
      "Choice of Swedish Relaxation or Deep Tissue",
      "Warmed organic botanical oil upgrade",
      "Warm lavender towel compress",
      "Artisanal herbal tea infusion",
    ],
    terms: "Prior appointment required. Cannot be combined with other ongoing promotions.",
  },
];
