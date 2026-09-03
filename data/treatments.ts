/**
 * Treatment catalog for Shirui Wellness Spa
 * Note: Verify actual service availability & pricing before production launch.
 */

export type TreatmentCategory =
  | "ALL"
  | "RELAX"
  | "RESTORE"
  | "RELEASE"
  | "REJUVENATE"
  | "RECOVER"
  | "COUPLES";

export interface TreatmentDurationOption {
  minutes: number;
  price: number;
}

export interface Treatment {
  id: string;
  slug: string;
  name: string;
  tagline: string;
  category: TreatmentCategory;
  shortDescription: string;
  longDescription: string;
  durations: TreatmentDurationOption[];
  priceFrom: number;
  image: string;
  pressure: number; // 1 (Light) to 5 (Firm)
  pressureLabel: "Light" | "Medium" | "Firm" | "Customizable";
  tags: string[];
  recommendedFor: string[];
  featured?: boolean;
  idealForMuscleZones?: string[];
  inclusions?: string[];
}

export const treatmentCategories: { id: TreatmentCategory; label: string; description: string }[] = [
  { id: "ALL", label: "All Experiences", description: "Explore the complete wellness collection" },
  { id: "RELAX", label: "Relax", description: "Gentle, flowing rhythmic therapies to calm the nervous system" },
  { id: "RELEASE", label: "Release", description: "Focused deep pressure for chronic muscular knots and stiffness" },
  { id: "RESTORE", label: "Restore", description: "Balancing, harmonious palm and acupressure bodywork" },
  { id: "REJUVENATE", label: "Rejuvenate", description: "Full-body signature rituals with botanical aromatic oils" },
  { id: "RECOVER", label: "Recover", description: "Targeted tension relief for active lifestyles and desk fatigue" },
  { id: "COUPLES", label: "Couples", description: "Side-by-side synchronized relaxation in our private suite" },
];

export const treatmentsData: Treatment[] = [
  {
    id: "swedish-relaxation",
    slug: "swedish-relaxation",
    name: "Swedish Relaxation Massage",
    tagline: "Gentle, continuous gliding strokes to quiet the mind",
    category: "RELAX",
    shortDescription:
      "A classic therapeutic full-body massage using long, soothing strokes and light-to-medium pressure to promote overall body relaxation.",
    longDescription:
      "Designed for complete ease and stress relief, our Swedish massage utilizes warmed botanical oils and classic effleurage strokes. Your therapist works systematically across muscle groups to encourage circulatory flow and ease daily tension.",
    durations: [
      { minutes: 60, price: 2499 },
      { minutes: 90, price: 3499 },
    ],
    priceFrom: 2499,
    image: "/images/shirui-treatment-swedish.jpg",
    pressure: 2,
    pressureLabel: "Light",
    tags: ["Full Body", "Stress Relief", "Gentle"],
    recommendedFor: ["First-time visitors", "Mental fatigue", "Overall light relaxation", "Gentle stress release"],
    featured: true,
    idealForMuscleZones: ["neck-shoulders", "upper-back", "legs"],
    inclusions: ["Warmed herbal oil blend", "Full-body flowing strokes", "Warm towel compress finish"],
  },
  {
    id: "deep-tissue",
    slug: "deep-tissue-massage",
    name: "Deep Tissue Muscle Therapy",
    tagline: "Intensive targeted work on persistent muscular tightness",
    category: "RELEASE",
    shortDescription:
      "Controlled firm pressure and slow, deliberate friction targeting deeper muscular layers and common postural tension points.",
    longDescription:
      "Focused on releasing chronic muscular knots caused by prolonged sitting, driving, or intense physical activity. Your therapist applies measured forearm and thumb pressure along shoulder blades, lower back, and hips to help loosen tight bands of muscle tissue.",
    durations: [
      { minutes: 60, price: 2799 },
      { minutes: 90, price: 3899 },
      { minutes: 120, price: 4999 },
    ],
    priceFrom: 2799,
    image: "/images/shirui-treatment-deep-tissue.jpg",
    pressure: 4,
    pressureLabel: "Firm",
    tags: ["Deep Pressure", "Muscle Knots", "Desk Fatigue"],
    recommendedFor: ["Desk workers", "Athletes & gym goers", "Persistent shoulder stiffness", "Lower back fatigue"],
    featured: true,
    idealForMuscleZones: ["neck-shoulders", "upper-back", "mid-back", "lower-back"],
    inclusions: ["Targeted trigger point work", "Slow myofascial friction", "Therapeutic warming compress"],
  },
  {
    id: "aromatherapy",
    slug: "aromatherapy-massage",
    name: "Aromatherapy Botanical Massage",
    tagline: "Sensory restoration blending essential botanical extracts",
    category: "RELAX",
    shortDescription:
      "Light, rhythmic massage paired with cold-pressed natural essential oils selected to inspire a calm, grounded emotional state.",
    longDescription:
      "An immersive multi-sensory experience pairing gentle full-body strokes with your choice of pure essential oils—such as grounding sandalwood, calming lavender, or refreshing bergamot—warmed to release natural botanical essences.",
    durations: [
      { minutes: 60, price: 2699 },
      { minutes: 90, price: 3699 },
    ],
    priceFrom: 2699,
    image: "/images/shirui-treatment-aromatherapy.jpg",
    pressure: 2,
    pressureLabel: "Light",
    tags: ["Essential Oils", "Calm", "Sensory"],
    recommendedFor: ["Sensory unwinding", "Sleep improvement", "Gentle restoration", "Mild stress"],
    featured: false,
    idealForMuscleZones: ["neck-shoulders", "feet", "upper-back"],
    inclusions: ["Custom botanical oil choice", "Gentle lymphatic stimulation", "Inhalation ritual"],
  },
  {
    id: "balinese",
    slug: "balinese-massage",
    name: "Balinese Acupressure & Palm Massage",
    tagline: "Rhythmic palm pressure and gentle meridian stretches",
    category: "RESTORE",
    shortDescription:
      "A traditional blend of gentle stretching, long palm glides, and skin-rolling techniques to restore harmony and natural energy.",
    longDescription:
      "Balinese bodywork harmoniously combines acupressure, gentle mobility stretches, and firm rhythmic palm kneading. It is particularly effective for releasing sluggishness and restoring balanced full-body vitality.",
    durations: [
      { minutes: 60, price: 2699 },
      { minutes: 90, price: 3799 },
    ],
    priceFrom: 2699,
    image: "/images/shirui-treatment-balinese.jpg",
    pressure: 3,
    pressureLabel: "Medium",
    tags: ["Acupressure", "Palm Pressure", "Vitality"],
    recommendedFor: ["General fatigue", "Circulatory sluggishness", "Whole-body balance", "Mid-level pressure preference"],
    featured: false,
    idealForMuscleZones: ["upper-back", "mid-back", "legs"],
    inclusions: ["Acupressure point therapy", "Rhythmic palm kneading", "Warm towel wipe-down"],
  },
  {
    id: "thai-assisted",
    slug: "thai-assisted-bodywork",
    name: "Thai Assisted Mobility Bodywork",
    tagline: "Active assisted stretches and pressure along energy lines",
    category: "RECOVER",
    shortDescription:
      "Dry therapy performed in comfortable spa attire incorporating passive yoga stretches, rhythmic rocking, and deep compression.",
    longDescription:
      "Unlike oil massages, Thai bodywork is conducted while you wear loose, comfortable linen attire on a supportive floor or low platform. Your therapist guides you through gentle assisted spinal twists, hamstring lengthening, and chest openings.",
    durations: [
      { minutes: 60, price: 2899 },
      { minutes: 90, price: 3999 },
    ],
    priceFrom: 2899,
    image: "/images/shirui-treatment-thai.jpg",
    pressure: 4,
    pressureLabel: "Firm",
    tags: ["Assisted Stretch", "Flexibility", "No Oil"],
    recommendedFor: ["Joint stiffness", "Limited mobility", "Pre/post workout recovery", "Active individuals"],
    featured: false,
    idealForMuscleZones: ["legs", "lower-back", "neck-shoulders"],
    inclusions: ["Loose linen spa attire provided", "Assisted full-body stretching", "Joint mobility release"],
  },
  {
    id: "signature-shirui",
    slug: "signature-shirui-massage",
    name: "Signature Shirui 90-Minute Immersion",
    tagline: "Our flagship holistic experience tailored to your exact comfort",
    category: "REJUVENATE",
    shortDescription:
      "A seamless fusion of customized pressure, warmed organic herbal compresses, and dedicated back-and-shoulder tension release.",
    longDescription:
      "Our premier 90-minute flagship experience. Beginning with an attentive consultation regarding your pressure and tension focus areas, this bespoke ritual merges Swedish glide, deep tissue precision on high-tension areas, and warm herbal compress applications.",
    durations: [
      { minutes: 90, price: 4299 },
      { minutes: 120, price: 5499 },
    ],
    priceFrom: 4299,
    image: "/images/shirui-signature-treatment.jpg",
    pressure: 3,
    pressureLabel: "Customizable",
    tags: ["Flagship", "Custom Pressure", "90-Min Immersion", "Herbal Compress"],
    recommendedFor: ["Ultimate relaxation", "Full sensory escape", "Complex tension areas", "Gifting & special occasions"],
    featured: true,
    idealForMuscleZones: ["neck-shoulders", "upper-back", "lower-back", "feet"],
    inclusions: [
      "Personalized pressure adaptation",
      "Full-body therapeutic massage",
      "Warm herbal compress on shoulders",
      "Foot reflexology finish",
      "Herbal tea infusion service",
    ],
  },
  {
    id: "couples-experience",
    slug: "couples-wellness-experience",
    name: "Couples Private Sanctuary Experience",
    tagline: "Shared serene relaxation in our private double treatment suite",
    category: "COUPLES",
    shortDescription:
      "Two side-by-side synchronized treatments in our soundproof, softly illuminated couple's suite with personalized therapist pairing.",
    longDescription:
      "Step into a private haven built for two. Both guests select their own preferred massage style and pressure—whether one desires deep tissue and the other gentle aromatherapy—synchronized simultaneously by two experienced therapists in an atmosphere of complete quiet.",
    durations: [
      { minutes: 60, price: 5199 },
      { minutes: 90, price: 6999 },
      { minutes: 120, price: 8999 },
    ],
    priceFrom: 5199,
    image: "/images/shirui-treatment-couples.jpg",
    pressure: 3,
    pressureLabel: "Customizable",
    tags: ["Couples", "Private Suite", "Synchronized"],
    recommendedFor: ["Anniversaries", "Shared quiet time", "Relaxing with partner or friend", "Special occasions"],
    featured: true,
    idealForMuscleZones: ["neck-shoulders", "upper-back", "legs"],
    inclusions: [
      "Private VIP suite with dual tables",
      "Individualized massage selection per guest",
      "Post-treatment herbal tea service",
    ],
  },
  {
    id: "head-neck-shoulder",
    slug: "head-neck-shoulder-relief",
    name: "Head, Neck & Shoulder Focus",
    tagline: "Concentrated express tension release for screen and desk fatigue",
    category: "RELEASE",
    shortDescription:
      "A focused session dedicated specifically to the upper trapezius, cervical spine, occipital base, and deltoids.",
    longDescription:
      "Tailored for individuals experiencing tight neck muscles, computer-screen fatigue, or upper back tension. The therapist zeroes in on the trapezius, levator scapulae, and occipital ridges using targeted friction and soothing acupressure.",
    durations: [
      { minutes: 45, price: 1899 },
      { minutes: 60, price: 2399 },
    ],
    priceFrom: 1899,
    image: "/images/shirui-treatment-neck-shoulder.jpg",
    pressure: 4,
    pressureLabel: "Firm",
    tags: ["Targeted", "Neck & Shoulders", "Express"],
    recommendedFor: ["Laptop/phone strain", "Midday tension break", "Frequent commuters", "Upper back stiffness"],
    featured: false,
    idealForMuscleZones: ["neck-shoulders", "upper-back"],
    inclusions: ["Focused cervical & trapezius work", "Scalp acupressure release", "Warm neck compress"],
  },
  {
    id: "foot-reflexology",
    slug: "foot-relaxation-therapy",
    name: "Restorative Foot & Lower Leg Care",
    tagline: "Revitalizing acupressure for tired feet and heavy calves",
    category: "RECOVER",
    shortDescription:
      "Stimulating pressure-point therapy across foot zones combined with soothing upward calf strokes to relieve heavy legs.",
    longDescription:
      "Resting in a deeply cushioned lounger, experience a warm herbal foot soak followed by precise pressure point manipulation on soles and arches. Upward lymphatic glides along the calves encourage lightness after prolonged standing or walking.",
    durations: [
      { minutes: 45, price: 1799 },
      { minutes: 60, price: 2299 },
    ],
    priceFrom: 1799,
    image: "/images/shirui-treatment-foot.jpg",
    pressure: 3,
    pressureLabel: "Medium",
    tags: ["Foot Care", "Acupressure", "Heavy Legs"],
    recommendedFor: ["Standing professionals", "Travelers", "Shoe fatigue", "Quick rejuvenation"],
    featured: false,
    idealForMuscleZones: ["feet", "legs"],
    inclusions: ["Warm botanical foot bath", "Reflex point acupressure", "Calf soothing massage"],
  },
];
