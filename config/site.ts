export const siteConfig = {
  name: "Shirui Wellness Spa",
  shortName: "Shirui Spa",
  title: "Shirui Wellness Spa | Premium Spa in Gachibowli, Hyderabad",
  description:
    "Discover premium massage, body care, and facial wellness rituals at Shirui Wellness Spa in Gachibowli, Hyderabad. Explore therapies and reserve your session via WhatsApp or phone.",
  url: process.env.NEXT_PUBLIC_SITE_URL || "https://shiruispa.com",
  ogImage: "/images/shirui-og-image.jpg",
  locale: "en_IN",
  navLinks: [
    { name: "Experiences", href: "#experiences" },
    { name: "Inside the Massage", href: "#inside-massage" },
    { name: "Our Space", href: "#our-space" },
    { name: "Why Shirui", href: "#why-shirui" },
    { name: "Reviews", href: "#reviews" },
    { name: "Visit Us", href: "#visit" },
  ],
};
