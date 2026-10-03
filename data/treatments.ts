/**
 * Treatment catalog for Shirui Wellness Spa
 * Extracted directly from official business brochure.
 * All 17 services are listed without price indicators.
 */

export type TreatmentCategory =
  | "ALL"
  | "MASSAGE"
  | "SPECIALISED"
  | "EXPRESS"
  | "FACIAL"
  | "COUPLES";

export interface TreatmentDurationOption {
  minutes: number;
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
  { id: "ALL", label: "All Rituals", description: "Explore the complete collection of 17 wellness rituals" },
  { id: "MASSAGE", label: "Premium Massages", description: "Classic therapeutic and restorative full-body therapies" },
  { id: "SPECIALISED", label: "Specialised Care", description: "Targeted bodywork for active recovery, lymph drainage & couples" },
  { id: "EXPRESS", label: "Express Wellness", description: "Focused 30–60 min treatments for head, neck, feet & body scrubs" },
  { id: "FACIAL", label: "Facial & Skin", description: "Nourishing, glow-enhancing botanical and brightening facial rituals" },
  { id: "COUPLES", label: "Couples Suite", description: "Synchronized dual therapy in our private soundproof suite" },
];

export const treatmentsData: Treatment[] = [
  // 1. Premium Massage Therapies (Brochure Page 4)
  {
    id: "swedish-massage",
    slug: "swedish-massage",
    name: "Swedish Massage",
    tagline: "Gentle, soothing care for everyday relaxation",
    category: "MASSAGE",
    shortDescription:
      "A classic full-body therapy using smooth, gliding strokes and gentle kneads to release daily tension and improve circulation.",
    longDescription:
      "The timeless Swedish massage is crafted for complete calm. Your therapist glides across muscle groups with warm organic oils using long, rhythmic effleurage movements that quiet mental static and release physical fatigue.",
    durations: [{ minutes: 60 }, { minutes: 90 }, { minutes: 120 }],
    image: "/images/shirui-treatment-swedish.jpg",
    pressure: 2,
    pressureLabel: "Light",
    tags: ["Full Body", "Stress Relief", "Gentle Care", "Circulation"],
    recommendedFor: ["First-time visitors", "Daily fatigue", "Gentle unwind", "Calming the nervous system"],
    featured: true,
    idealForMuscleZones: ["neck-shoulders", "upper-back", "legs"],
    inclusions: ["Warmed herbal oil blend", "Full-body flowing strokes", "Warm towel compress finish"],
  },
  {
    id: "deep-tissue-massage",
    slug: "deep-tissue-massage",
    name: "Deep Tissue Massage",
    tagline: "Focused pressure for stubborn tension & persistent knots",
    category: "MASSAGE",
    shortDescription:
      "Slow, deliberate friction and concentrated pressure reaching deeper muscle layers to alleviate persistent tightness.",
    longDescription:
      "Targeted at persistent knots and chronic postural strain from prolonged desk work or travel. Your therapist employs slow, firm strokes and targeted finger and forearm pressure to dissolve tightness and restore functional mobility.",
    durations: [{ minutes: 60 }, { minutes: 90 }, { minutes: 120 }],
    image: "/images/shirui-treatment-deep-tissue.jpg",
    pressure: 4,
    pressureLabel: "Firm",
    tags: ["Deep Pressure", "Muscle Knots", "Desk Fatigue", "Firm"],
    recommendedFor: ["Desk workers", "Severe muscle knots", "Persistent back stiffness", "Deep release seekers"],
    featured: true,
    idealForMuscleZones: ["neck-shoulders", "upper-back", "mid-back", "lower-back"],
    inclusions: ["Targeted trigger point work", "Slow myofascial friction", "Therapeutic warming compress"],
  },
  {
    id: "aromatherapy-massage",
    slug: "aromatherapy-massage",
    name: "Aromatherapy Massage",
    tagline: "Sensory restoration blending pure essential botanicals",
    category: "MASSAGE",
    shortDescription:
      "Rhythmic, soothing strokes paired with pure botanical essential oils chosen to balance your emotions and calm the mind.",
    longDescription:
      "A sensorial sanctuary pairing gentle full-body massage with steam-distilled pure botanical oils—such as soothing lavender, grounding sandalwood, or revitalizing citrus. The natural essences enter through inhalation and skin absorption to ease mental unrest.",
    durations: [{ minutes: 60 }, { minutes: 90 }, { minutes: 120 }],
    image: "/images/shirui-treatment-aromatherapy.jpg",
    pressure: 2,
    pressureLabel: "Light",
    tags: ["Essential Oils", "Emotional Balance", "Sensory Unwind", "Calm"],
    recommendedFor: ["Stress & overwhelm", "Sleep improvement", "Sensory restoration", "Mindful unwinding"],
    featured: false,
    idealForMuscleZones: ["neck-shoulders", "feet", "upper-back"],
    inclusions: ["Custom botanical essential oil selection", "Gentle inhalation ritual", "Warm towel finish"],
  },
  {
    id: "balinese-massage",
    slug: "balinese-massage",
    name: "Balinese Massage",
    tagline: "Harmonious stretch, acupressure & rhythmic palm strokes",
    category: "MASSAGE",
    shortDescription:
      "An ancient holistic therapy combining palm pressure, skin rolling, gentle acupressure, and warm oils to restore vitality.",
    longDescription:
      "Rooted in Indonesian healing traditions, Balinese massage harmonizes gentle mobility stretches with rhythmic palm kneading and acupressure along energy pathways. It stimulates micro-circulation and leaves you feeling deeply grounded and refreshed.",
    durations: [{ minutes: 60 }, { minutes: 90 }, { minutes: 120 }],
    image: "/images/shirui-treatment-balinese.jpg",
    pressure: 3,
    pressureLabel: "Medium",
    tags: ["Acupressure", "Palm Pressure", "Meridian Energy", "Harmony"],
    recommendedFor: ["General fatigue", "Sluggish circulation", "Whole-body harmony", "Balanced medium pressure"],
    featured: false,
    idealForMuscleZones: ["upper-back", "mid-back", "legs"],
    inclusions: ["Acupressure point therapy", "Rhythmic palm kneading", "Warm floral towel compress"],
  },
  {
    id: "thai-massage",
    slug: "thai-massage",
    name: "Thai Massage",
    tagline: "Assisted yoga stretching & rhythmic energy line pressure",
    category: "MASSAGE",
    shortDescription:
      "Dry assisted bodywork incorporating passive yoga stretches, rhythmic rocking, and deep compression in comfortable linen attire.",
    longDescription:
      "Performed oil-free in comfortable loose linen attire on a supportive low platform. Your therapist guides your limbs through passive yoga stretches, gentle spinal twists, and rhythmic thumb and palm compression along the body's 'Sen' energy lines.",
    durations: [{ minutes: 60 }, { minutes: 90 }, { minutes: 120 }],
    image: "/images/shirui-treatment-thai.jpg",
    pressure: 4,
    pressureLabel: "Firm",
    tags: ["Assisted Stretch", "Flexibility", "No Oil", "Dry Bodywork"],
    recommendedFor: ["Joint stiffness", "Limited mobility", "Yoga enthusiasts", "Post-travel restoration"],
    featured: false,
    idealForMuscleZones: ["legs", "lower-back", "neck-shoulders"],
    inclusions: ["Comfortable spa linens provided", "Assisted full-body stretching", "Joint mobility decompression"],
  },
  {
    id: "shirui-signature-massage",
    slug: "shirui-signature-massage",
    name: "Shirui Signature Massage",
    tagline: "Our premier holistic journey curated to your exact comfort",
    category: "MASSAGE",
    shortDescription:
      "A seamless fusion of customized pressure, warmed herbal compresses, and dedicated tension release for ultimate tranquility.",
    longDescription:
      "Our flagship holistic experience. Beginning with a personal consultation regarding your pressure and tension focus areas, this bespoke ritual merges Swedish glide, deep tissue precision, warm steamed herbal poultices, and a restorative head-and-foot finish.",
    durations: [{ minutes: 60 }, { minutes: 90 }, { minutes: 120 }],
    image: "/images/shirui-signature-treatment.jpg",
    pressure: 3,
    pressureLabel: "Customizable",
    tags: ["Flagship", "Custom Pressure", "Herbal Compress", "Signature Ritual"],
    recommendedFor: ["Complete head-to-toe renewal", "Full sensory escape", "Special celebrations", "Excellence in bodywork"],
    featured: true,
    idealForMuscleZones: ["neck-shoulders", "upper-back", "lower-back", "feet"],
    inclusions: ["Personalized pressure calibration", "Warm herbal compress therapy", "Foot reflexology finish", "Artisanal herbal tea infusion"],
  },

  // 2. Specialised Care (Brochure Page 5)
  {
    id: "sports-gym-massage",
    slug: "sports-gym-massage",
    name: "Sports / Gym Massage",
    tagline: "Targeted recovery for muscle soreness, fatigue & active bodies",
    category: "SPECIALISED",
    shortDescription:
      "Concentrated muscular recovery addressing delayed-onset muscle soreness (DOMS), tight tendons, and joint stiffness.",
    longDescription:
      "Designed for active athletes, fitness enthusiasts, and gym-goers. Your therapist applies firm, deep myofascial release, cross-fiber friction, and assisted passive stretching to break down metabolic buildup, relieve soreness, and restore muscular elasticity.",
    durations: [{ minutes: 60 }, { minutes: 90 }, { minutes: 120 }],
    image: "/images/shirui-treatment-sports.jpg",
    pressure: 5,
    pressureLabel: "Firm",
    tags: ["Sports Recovery", "Gym Goers", "DOMS Relief", "Firm Pressure"],
    recommendedFor: ["Workout soreness", "Athletes & fitness lovers", "Heavy lifters & runners", "Muscular stiffness"],
    featured: true,
    idealForMuscleZones: ["legs", "lower-back", "upper-back", "neck-shoulders"],
    inclusions: ["Cross-fiber friction", "Myofascial tension release", "Recovery cooling botanical balm"],
  },
  {
    id: "lymphatic-drainage-massage",
    slug: "lymphatic-drainage-massage",
    name: "Lymphatic Drainage Massage",
    tagline: "Gentle rhythmic stimulation for natural lymph flow & lightness",
    category: "SPECIALISED",
    shortDescription:
      "Subtle, rhythmic pumping motions supporting the body's natural lymph circulation to diminish fluid retention and heaviness.",
    longDescription:
      "A delicate, highly specialized technique using very gentle, precise directional skin-stretching strokes along the lymph channels. Encourages natural lymph fluid drainage, aids the body in releasing accumulated metabolic fluids, reduces puffiness, and leaves a profound sensation of lightness.",
    durations: [{ minutes: 60 }, { minutes: 90 }, { minutes: 120 }],
    image: "/images/shirui-treatment-lymphatic.jpg",
    pressure: 1,
    pressureLabel: "Light",
    tags: ["Detoxification", "Fluid Relief", "Gentle Rhythmic", "Lightness"],
    recommendedFor: ["Fluid retention & puffiness", "Post-travel sluggishness", "Immunity support", "Gentle healing seekers"],
    featured: false,
    idealForMuscleZones: ["legs", "arms", "neck-shoulders"],
    inclusions: ["Specialized directional stroke mapping", "Light lymph node activation", "Soothing herbal hydration"],
  },
  {
    id: "couples-massage",
    slug: "couples-massage",
    name: "Couples Massage",
    tagline: "Side-by-side synchronized relaxation in our private double suite",
    category: "COUPLES",
    shortDescription:
      "Two synchronized treatments in our soundproof, softly illuminated couples suite with personalized therapist pairing.",
    longDescription:
      "Enter an intimate sanctuary designed for two. Both guests select their preferred massage style and pressure—whether one desires deep tissue and the other gentle aromatherapy—conducted simultaneously by two skilled therapists in total serenity.",
    durations: [{ minutes: 60 }, { minutes: 90 }, { minutes: 120 }],
    image: "/images/shirui-treatment-couples.jpg",
    pressure: 3,
    pressureLabel: "Customizable",
    tags: ["Couples", "Private Suite", "Synchronized", "Celebration"],
    recommendedFor: ["Anniversaries & dates", "Shared quiet time", "Relaxing with partner or friend", "Special gift"],
    featured: true,
    idealForMuscleZones: ["neck-shoulders", "upper-back", "legs"],
    inclusions: ["Private double sanctuary suite", "Individual therapy preferences per guest", "Aromatic towel compress", "Post-treatment tea service"],
  },

  // 3. Express Wellness (Brochure Page 6)
  {
    id: "foot-reflexology",
    slug: "foot-reflexology",
    name: "Foot Reflexology",
    tagline: "Restores balance & lightness through targeted pressure points",
    category: "EXPRESS",
    shortDescription:
      "Stimulating acupressure on foot reflex zones combined with upward calf strokes to melt fatigue and revive tired feet.",
    longDescription:
      "Resting in a deeply cushioned lounger, experience a warm herbal soak followed by focused thumb acupressure along reflex zones that correspond to full-body wellness. Releases heavy-leg sensations after prolonged standing or commuting.",
    durations: [{ minutes: 30 }, { minutes: 60 }],
    image: "/images/shirui-treatment-foot.jpg",
    pressure: 3,
    pressureLabel: "Medium",
    tags: ["Foot Care", "Acupressure", "Heavy Legs", "Express Relief"],
    recommendedFor: ["Standing professionals", "Commuters & travelers", "Foot fatigue", "Quick midday relief"],
    featured: false,
    idealForMuscleZones: ["feet", "legs"],
    inclusions: ["Warm botanical foot bath", "Reflex point acupressure", "Calf soothing massage"],
  },
  {
    id: "head-massage",
    slug: "head-massage",
    name: "Head Massage",
    tagline: "Traditional cranial champi releasing scalp tension & mental fatigue",
    category: "EXPRESS",
    shortDescription:
      "Concentrated scalp, temple, and crown bodywork designed to melt away mental exhaustion, headaches, and screen strain.",
    longDescription:
      "Rooted in traditional Indian champi rituals, this focused therapy uses soothing rhythmic finger strokes across the scalp, occipital base, and temples with warmed botanical oils. Perfect for releasing persistent mental fog and screen-induced tension.",
    durations: [{ minutes: 30 }, { minutes: 45 }],
    image: "/images/shirui-treatment-head.jpg",
    pressure: 3,
    pressureLabel: "Medium",
    tags: ["Scalp Therapy", "Mental Clarity", "Migraine Relief", "Express"],
    recommendedFor: ["Mental stress & overthinking", "Screen-induced eye strain", "Headaches & tension", "Quick rejuvenation"],
    featured: false,
    idealForMuscleZones: ["neck-shoulders", "scalp"],
    inclusions: ["Warm herbal oil scalp therapy", "Temple & crown acupressure", "Warm towel neck wrap"],
  },
  {
    id: "head-neck-shoulder",
    slug: "head-neck-shoulder",
    name: "Head, Neck & Shoulder Massage",
    tagline: "Concentrated express relief for desk stiffness & tech-neck",
    category: "EXPRESS",
    shortDescription:
      "A focused session targeting the trapezius, cervical spine, and shoulder blades to dissolve stubborn desk posture tightness.",
    longDescription:
      "Tailored specifically for laptop strain and commuting stiffness. Your therapist zeroes in on the upper trapezius, levator scapulae, and base of the neck, releasing acute muscular knots and restoring pain-free neck mobility.",
    durations: [{ minutes: 30 }, { minutes: 45 }],
    image: "/images/shirui-treatment-neck-shoulder.jpg",
    pressure: 4,
    pressureLabel: "Firm",
    tags: ["Desk Fatigue", "Tech Neck", "Upper Back", "Targeted Express"],
    recommendedFor: ["IT professionals & desk workers", "Neck stiffness", "Shoulder tightness", "Short respite"],
    featured: false,
    idealForMuscleZones: ["neck-shoulders", "upper-back"],
    inclusions: ["Focused trapezius friction", "Cervical spine release", "Warm herbal compress"],
  },
  {
    id: "body-scrub",
    slug: "body-scrub",
    name: "Body Scrub",
    tagline: "Nourishing botanical exfoliation for polished, refreshed skin",
    category: "EXPRESS",
    shortDescription:
      "A rejuvenating full-body scrub using gentle botanical salts and nourishing oils to polish away dull skin cells.",
    longDescription:
      "Gentle natural sea crystals and botanical extracts are worked in sweeping circular motions across the skin. Buffs away dead cellular layers, stimulates micro-circulation, and deeply hydrates for an extraordinarily soft, velvety finish.",
    durations: [{ minutes: 30 }, { minutes: 60 }],
    image: "/images/shirui-treatment-body-scrub.jpg",
    pressure: 3,
    pressureLabel: "Medium",
    tags: ["Exfoliation", "Silky Skin", "Botanical Polish", "Body Care"],
    recommendedFor: ["Dull skin texture", "Pre-event preparation", "Deep skin hydration", "Silky renewal"],
    featured: false,
    idealForMuscleZones: ["arms", "legs", "back"],
    inclusions: ["All-natural botanical exfoliant", "Warm rinse preparation", "Nourishing moisture seal"],
  },

  // 4. Facial & Skin Rituals (Brochure Page 7)
  {
    id: "fruit-facial",
    slug: "fruit-facial",
    name: "Fruit Facial",
    tagline: "Natural antioxidant nourishment for fresh, radiant skin",
    category: "FACIAL",
    shortDescription:
      "Infuses the skin with fresh fruit enzymes, vitamins, and botanical extracts to restore youthful, dewy vitality.",
    longDescription:
      "A delicious, natural treat for stressed skin. Fresh fruit extracts rich in alpha-hydroxy acids, vitamins, and antioxidants gently cleanse, exfoliate, and deeply replenish moisture, leaving your complexion soft, vibrant, and glowing.",
    durations: [{ minutes: 30 }, { minutes: 45 }],
    image: "/images/shirui-treatment-fruit-facial.jpg",
    pressure: 1,
    pressureLabel: "Light",
    tags: ["Natural Enzymes", "Dewy Glow", "Antioxidants", "Gentle Facial"],
    recommendedFor: ["Sensitive or tired skin", "Natural skincare lovers", "Gentle glow", "Everyday nourishment"],
    featured: false,
    idealForMuscleZones: ["face", "neck-shoulders"],
    inclusions: ["Botanical fruit cleanse", "Gentle fruit enzyme mask", "Hydrating serum finish"],
  },
  {
    id: "gold-facial",
    slug: "gold-facial",
    name: "Gold Facial",
    tagline: "Luxurious cell-renewing ritual for deep illumination & glow",
    category: "FACIAL",
    shortDescription:
      "An opulent facial combining fine gold-infused serums and lifting massage to revitalize collagen and restore radiant glow.",
    longDescription:
      "Indulge in royal pampering. Fine cosmetic gold particles, peptides, and botanical oils stimulate cellular metabolism, improve skin elasticity, and impart an unmistakably luminous, reflective sheen to your face.",
    durations: [{ minutes: 30 }, { minutes: 45 }],
    image: "/images/shirui-treatment-gold-facial.jpg",
    pressure: 1,
    pressureLabel: "Light",
    tags: ["Luxury Care", "Gold Infusion", "Radiance", "Firming"],
    recommendedFor: ["Special occasions & celebrations", "Dull complexion", "Anti-aging & firming", "Royal pampering"],
    featured: true,
    idealForMuscleZones: ["face", "neck-shoulders"],
    inclusions: ["Pure gold leaf serum infusion", "Lymphatic face contouring", "Luminous mask finish"],
  },
  {
    id: "de-tan-pack",
    slug: "de-tan-pack",
    name: "De-Tan Pack",
    tagline: "Revives sun-exposed skin, corrects pigmentation & evens tone",
    category: "FACIAL",
    shortDescription:
      "A soothing botanical formulation designed to reverse sun damage, soothe heat sensitivity, and restore even skin tone.",
    longDescription:
      "Specially formulated for intense sun exposure. Natural cooling clays and brightening botanical actives gently draw out impurities, reduce melanin buildup from UV rays, and soothe sun-stressed dermal layers.",
    durations: [{ minutes: 30 }, { minutes: 45 }],
    image: "/images/shirui-treatment-detan.jpg",
    pressure: 1,
    pressureLabel: "Light",
    tags: ["Sun Damage Relief", "Skin Brightening", "Cooling Pack", "Even Tone"],
    recommendedFor: ["Sun exposure & tanning", "Uneven skin tone", "Outdoor athletes & commuters", "Heat calming"],
    featured: false,
    idealForMuscleZones: ["face", "neck-shoulders", "arms"],
    inclusions: ["Cooling herbal cleanse", "Targeted brightening de-tan mask", "Calming SPF hydration barrier"],
  },
  {
    id: "o3-whitening-facial",
    slug: "o3-whitening-facial",
    name: "O3 Whitening Facial",
    tagline: "Oxygenating brightening ritual for clarified, illuminated skin",
    category: "FACIAL",
    shortDescription:
      "Advanced oxygen-infused therapy that clarifies pores, addresses hyperpigmentation, and imparts a crystal-clear complexion.",
    longDescription:
      "Powered by advanced oxygenating actives and potent botanical brighten-complexes, this ritual purifies pores deeply, combats dark spots, and revitalizes oxygen-deprived skin cells for an exceptionally bright, clear, and uniform radiance.",
    durations: [{ minutes: 30 }, { minutes: 45 }],
    image: "/images/shirui-treatment-o3-facial.jpg",
    pressure: 1,
    pressureLabel: "Light",
    tags: ["Oxygenating Care", "Brightening", "Clear Skin", "Pigmentation Relief"],
    recommendedFor: ["Dull or tired complexion", "Hyperpigmentation", "Pollution-exposed skin", "Deep luminosity"],
    featured: false,
    idealForMuscleZones: ["face", "neck-shoulders"],
    inclusions: ["Oxygenating clarifying wash", "Deep pore micro-exfoliation", "O3 brightening infusion mask"],
  },
];
