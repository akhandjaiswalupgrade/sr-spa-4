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
    question: "Do I need an appointment?",
    answer:
      "We strongly recommend reserving in advance to ensure your preferred time slot and private suite are ready for you. However, walk-in guests are welcomed based on therapist and room availability.",
  },
  {
    id: "faq-4",
    category: "Booking & Visit",
    question: "How early should I arrive?",
    answer:
      "We suggest arriving 10 to 15 minutes before your scheduled appointment. This allows you to unwind, enjoy a warm herbal refreshment, and discuss your preferences without feeling rushed.",
  },
  {
    id: "faq-5",
    category: "Treatments",
    question: "Can I choose my preferred pressure?",
    answer:
      "Yes, absolutely. You can choose Light, Medium, or Firm pressure before your session starts. You are also encouraged to communicate with your therapist at any point during the massage to increase or decrease pressure.",
  },
  {
    id: "faq-6",
    category: "Treatments",
    question: "What should I wear?",
    answer:
      "Wear whatever you feel most comfortable in. During oil-based massage treatments, you will be provided with disposable spa undergarments and fully draped with clean cream linens, with only the area being treated exposed. For dry Thai-style bodywork, loose and breathable cotton linen attire is provided.",
  },
  {
    id: "faq-7",
    category: "General",
    question: "Are the treatment rooms private?",
    answer:
      "Yes. Every treatment room at Shirui is an independent, sound-dampened private suite with personal climate control, dimmable ambient lighting, and dedicated changing space to ensure complete personal privacy.",
  },
  {
    id: "faq-8",
    category: "Treatments",
    question: "What session durations are available?",
    answer:
      "We offer 45-minute (targeted), 60-minute, 90-minute (signature full body), and 120-minute comprehensive immersion sessions depending on the chosen therapy.",
  },
  {
    id: "faq-9",
    category: "Booking & Visit",
    question: "Can I book through WhatsApp?",
    answer:
      "Yes! WhatsApp is one of our fastest booking channels. Simply click any 'WhatsApp' button on this website to send us a pre-filled message with your desired treatment, date, and preferred time.",
  },
  {
    id: "faq-10",
    category: "Booking & Visit",
    question: "Where is Shirui Wellness Spa located?",
    answer:
      "We are located in Neknampur, Hyderabad, in close proximity to Gandipet, Narsingi, and Manikonda, just minutes from the Financial District and Outer Ring Road (ORR).",
  },
  {
    id: "faq-11",
    category: "Booking & Visit",
    question: "What are your opening hours?",
    answer:
      "Shirui Wellness Spa is open 7 days a week from 10:00 AM to 9:30 PM. Our last treatment slot commences at 8:30 PM.",
  },
  {
    id: "faq-12",
    category: "Treatments",
    question: "Do you offer couple experiences?",
    answer:
      "Yes. We have a dedicated VIP Couple's Sanctuary Suite featuring dual massage beds where you and your partner or friend can enjoy customized treatments simultaneously.",
  },
  {
    id: "faq-13",
    category: "Booking & Visit",
    question: "Which payment methods do you accept?",
    answer:
      "We accept all major credit and debit cards (Visa, MasterCard, RuPay), UPI (Google Pay, PhonePe, Paytm), net banking, and cash.",
  },
];
