export interface Review {
  id: string;
  author: string;
  location: string;
  rating: number;
  date: string;
  source: string;
  treatmentTaken: string;
  comment: string;
  highlight: string;
}

export const reviewsData: Review[] = [
  {
    id: "rev-1",
    author: "Aditya Varma",
    location: "Financial District, Hyderabad",
    rating: 5,
    date: "2 weeks ago",
    source: "Google Verified Guest",
    treatmentTaken: "Deep Tissue Muscle Therapy",
    highlight: "The tension in my shoulders simply melted away.",
    comment:
      "Working 12-hour days at my desk left my neck and upper back completely knotted. The therapist at Shirui understood exactly where the tightness was without me having to over-explain. The pressure was firm yet deeply relaxing. The calm, dimly lit atmosphere makes you forget the chaotic Hyderabad traffic outside.",
  },
  {
    id: "rev-2",
    author: "Pooja Reddy",
    location: "Kokapet, Hyderabad",
    rating: 5,
    date: "1 month ago",
    source: "Google Verified Guest",
    treatmentTaken: "Signature Shirui 90-Minute Immersion",
    highlight: "Hands down the most peaceful spa in Hyderabad.",
    comment:
      "Shirui doesn't feel like a standard commercial spa—it feels like a sanctuary. The private suites are exceptionally clean, warm, and quiet. The warm herbal compress during the signature 90-minute treatment was sheer bliss. I walked out feeling like a completely renewed person.",
  },
  {
    id: "rev-3",
    author: "Vikram & Sneha R.",
    location: "Gachibowli, Hyderabad",
    rating: 5,
    date: "3 weeks ago",
    source: "Google Verified Guest",
    treatmentTaken: "Couples Sanctuary Experience",
    highlight: "Remarkably private, respectful, and serene.",
    comment:
      "Booked the couples suite for our anniversary. The synchronized therapy was flawless, and the staff maintained utter professionalism throughout. The subtle natural stone and walnut aesthetics gave it a 5-star boutique resort feel right in Neknampur.",
  },
  {
    id: "rev-4",
    author: "Rohit Krishnan",
    location: "Jubilee Hills, Hyderabad",
    rating: 5,
    date: "1 month ago",
    source: "Google Verified Guest",
    treatmentTaken: "Swedish Relaxation Massage",
    highlight: "Attentive therapists who truly listen to pressure preferences.",
    comment:
      "I appreciate that they take the time before the session to ask about pressure levels and focus areas. The warmed oils smelled subtle and natural, not overpowering. An immaculate, serene place that respects your time and peace.",
  },
  {
    id: "rev-5",
    author: "Ananya Sen",
    location: "Narsingi, Hyderabad",
    rating: 5,
    date: "2 months ago",
    source: "Google Verified Guest",
    treatmentTaken: "Head, Neck & Shoulder Relief",
    highlight: "Instant relief for screen-time fatigue.",
    comment:
      "Popped in for the 45-minute head and shoulder session after a grueling workweek. The therapist's technique on the upper trapezius was incredible. Extremely clean linens, warm lighting, and zero unnecessary chatter.",
  },
];
