export type FAQCategory = "General" | "Treatments" | "Booking & Visit" | "ALL";

export interface FAQItem {
  id: string;
  category: "General" | "Treatments" | "Booking & Visit";
  question: string;
  answer: string;
}

export const faqsData: FAQItem[] = [
  {
    id: "faq-1",
    category: "Treatments",
    question: "What massage should I choose?",
    answer:
      "If you're seeking gentle relaxation and stress relief, our Swedish or Aromatherapy massage is ideal. For chronic stiffness, neck/shoulder tension, or post-workout soreness, we recommend our Deep Tissue or Thai-Style assisted mobility sessions. You can also use our interactive Session Configurator on this page or consult our spa host on arrival.",
  },
  {
    id: "faq-2",
    category: "General",
    question: "What happens during my first visit?",
    answer:
      "Upon arriving, you will be welcomed in our quiet reception area. You'll have a brief consultation where you can share your pressure preferences, areas needing attention, and any areas to avoid. Your therapist will then escort you to your private suite, ensuring you are comfortable and settled before your session begins.",
  },
  {
    id: "faq-3",
    category: "Booking & Visit",
    question: "Do I need to book in advance?",
    answer:
      "Appointments are strongly recommended, especially for evening slots (after 5 PM) and weekends, to secure your preferred therapist and private suite. However, we welcome same-day enquiries via WhatsApp or phone call.",
  },
  {
    id: "faq-4",
    category: "General",
    question: "Are treatments done in private rooms?",
    answer:
      "Yes. Every therapy is carried out in dedicated, acoustically isolated private treatment suites with private changing amenities, ambient lighting, and soothing acoustic design. We also offer dedicated couples suites for simultaneous treatments.",
  },
  {
    id: "faq-5",
    category: "Treatments",
    question: "Can I choose my pressure level?",
    answer:
      "Absolutely. Before every session begins, your therapist will discuss whether you prefer light, medium, or firm pressure. During the treatment, you are always encouraged to speak up to ask for deeper pressure or lighter touch at any time.",
  },
  {
    id: "faq-6",
    category: "Booking & Visit",
    question: "What is your cancellation and rescheduling policy?",
    answer:
      "We understand plans change. We appreciate at least 2 hours' notice if you need to reschedule or cancel your appointment so our therapists can adjust their schedule. Simply message us on WhatsApp or call our desk.",
  },
  {
    id: "faq-7",
    category: "General",
    question: "How are rooms and linens sanitized?",
    answer:
      "Hygienic excellence is fundamental to Shirui. All linens, towels, and robes are freshly laundered and single-use for each guest. Treatment beds, face cradles, and suites are thoroughly sanitized between sessions using medical-grade disinfectant protocols.",
  },
  {
    id: "faq-8",
    category: "Treatments",
    question: "What oils and products are used during therapy?",
    answer:
      "We exclusively use 100% cold-pressed natural plant carrier oils (sweet almond, jojoba, and sesame) infused with therapeutic-grade botanical essential oils (lavender, lemongrass, eucalyptus, and rose). Our oils are skin-friendly, non-staining, and deeply nourishing.",
  },
  {
    id: "faq-9",
    category: "Booking & Visit",
    question: "Where is Shirui Spa located and is there parking?",
    answer:
      "We are located on Main Road, Neknampur, Hyderabad (near Alkapur Township). Convenient complimentary dedicated four-wheeler and two-wheeler parking is available directly on premises for spa guests.",
  },
  {
    id: "faq-10",
    category: "General",
    question: "What should I wear to my appointment?",
    answer:
      "Wear whatever you feel comfortable in. In your private suite, you will be provided with fresh disposable undergarments and soft plush robes. Professional draping techniques are strictly adhered to throughout every moment of your therapy.",
  },
  {
    id: "faq-11",
    category: "Treatments",
    question: "Is massage therapy safe if I have health conditions?",
    answer:
      "Massage is generally safe and beneficial for most adults. However, if you are pregnant, have acute injuries, recent surgery, cardiovascular conditions, or contagious skin conditions, please inform us in advance so we can guide you toward safe, approved modalities.",
  },
  {
    id: "faq-12",
    category: "Booking & Visit",
    question: "What payment methods do you accept?",
    answer:
      "We accept all major UPI apps (Google Pay, PhonePe, Paytm), credit and debit cards, and cash. Transparent pricing is guaranteed with zero hidden fees.",
  },
  {
    id: "faq-13",
    category: "General",
    question: "Can I purchase gift cards or packages?",
    answer:
      "Yes. We offer beautifully packaged physical gift cards and customized digital gift vouchers for loved ones, as well as privileged multi-session wellness passes with preferred pricing. Enquire via WhatsApp or at our front desk.",
  },
];
