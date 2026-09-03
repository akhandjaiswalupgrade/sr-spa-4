export interface GalleryItem {
  id: string;
  title: string;
  caption: string;
  category: "Space" | "Details" | "Ritual";
  image: string;
  aspectRatio: "large" | "standard" | "portrait";
}

export const galleryData: GalleryItem[] = [
  {
    id: "gal-1",
    title: "Quiet Reception Lounge",
    caption: "Dark walnut counters, limestone textures, and soft indirect lighting welcome you to slow down.",
    category: "Space",
    image: "/images/shirui-gallery-reception.jpg",
    aspectRatio: "large",
  },
  {
    id: "gal-2",
    title: "Private Treatment Suite",
    caption: "Sound-insulated single suite with acoustic isolation and adjustable warm amber illumination.",
    category: "Space",
    image: "/images/shirui-gallery-treatment-room.jpg",
    aspectRatio: "standard",
  },
  {
    id: "gal-3",
    title: "Artisanal Botanical Oils",
    caption: "Cold-pressed essential blends stored in amber glass and warmed to body temperature before use.",
    category: "Details",
    image: "/images/shirui-gallery-oils.jpg",
    aspectRatio: "portrait",
  },
  {
    id: "gal-4",
    title: "Treatment Table Craft",
    caption: "Pristine, 100% organic cream cotton linens freshly prepared prior to every single session.",
    category: "Details",
    image: "/images/shirui-gallery-treatment-detail.jpg",
    aspectRatio: "portrait",
  },
  {
    id: "gal-5",
    title: "VIP Couples Suite",
    caption: "Synchronized dual therapy suite with dedicated climate zoning and private changing amenities.",
    category: "Space",
    image: "/images/shirui-gallery-couples-room.jpg",
    aspectRatio: "large",
  },
  {
    id: "gal-6",
    title: "Post-Therapy Relaxation Lounge",
    caption: "A quiet corner to sip hot herbal tea and let your body gently transition back before departure.",
    category: "Space",
    image: "/images/shirui-gallery-relaxation.jpg",
    aspectRatio: "portrait",
  },
  {
    id: "gal-7",
    title: "Architectural Lighting Detail",
    caption: "Concealed 3000K warm glow eliminating overhead glare for maximum ocular and mental relaxation.",
    category: "Details",
    image: "/images/shirui-gallery-lighting.jpg",
    aspectRatio: "portrait",
  },
  {
    id: "gal-8",
    title: "Linen & Towel Preparation",
    caption: "Steamed, plush towels paired with hypoallergenic natural fibers.",
    category: "Ritual",
    image: "/images/shirui-gallery-towels.jpg",
    aspectRatio: "standard",
  },
];
