import { businessConfig } from "@/config/business";

export interface WhatsAppMessageParams {
  experience?: string;
  duration?: string | number;
  pressure?: string;
  date?: string;
  time?: string;
  guests?: number;
  customMessage?: string;
  source?: string;
}

export function getWhatsAppUrl(params?: WhatsAppMessageParams): string {
  const number = businessConfig.whatsappNumber || "919876543210";

  let text = "Hi Shirui Wellness Spa, I would like to enquire about a session.";

  if (params?.customMessage) {
    text = params.customMessage;
  } else if (params?.experience) {
    const lines = [
      "Hi Shirui Wellness Spa, I would like to enquire about a session.",
      "",
      `• Experience: ${params.experience}`,
    ];

    if (params.duration) {
      lines.push(`• Duration: ${params.duration} Minutes`);
    }
    if (params.pressure) {
      lines.push(`• Preferred Pressure: ${params.pressure}`);
    }
    if (params.date) {
      lines.push(`• Preferred Date: ${params.date}`);
    }
    if (params.time) {
      lines.push(`• Preferred Time: ${params.time}`);
    }
    if (params.guests && params.guests > 1) {
      lines.push(`• Number of Guests: ${params.guests}`);
    }

    lines.push("", "Please share available timings and confirmation details.");
    text = lines.join("\n");
  }

  return `https://wa.me/${number}?text=${encodeURIComponent(text)}`;
}

export function getCallUrl(): string {
  const phone = businessConfig.phone || "+919876543210";
  return `tel:${phone.replace(/\s+/g, "")}`;
}

export function getDirectionsUrl(): string {
  return (
    businessConfig.googleMapsUrl ||
    "https://maps.google.com/?q=Shirui+Wellness+Spa+Neknampur+Hyderabad"
  );
}
