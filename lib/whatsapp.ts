import { businessConfig } from "@/config/business";

export interface WhatsAppMessageParams {
  experience?: string;
  duration?: string | number;
  pressure?: string;
  date?: string;
  time?: string;
  guests?: string | number;
  guestName?: string;
  phone?: string;
  preferredDate?: string;
  preferredTimeSlot?: string;
  notes?: string;
  customMessage?: string;
  source?: string;
}

export function getWhatsAppUrl(params?: WhatsAppMessageParams): string {
  const number = businessConfig.whatsappNumber || "919876543210";

  let text = "Hi Shirui Wellness Spa, I would like to enquire about a session.";

  if (params?.customMessage) {
    text = params.customMessage;
  } else if (params?.guestName || params?.experience) {
    const lines = [
      "Hi Shirui Wellness Spa, I would like to enquire about a session.",
      "",
    ];

    if (params.guestName) {
      lines.push(`• Guest Name: ${params.guestName}`);
    }
    if (params.phone) {
      lines.push(`• Contact: ${params.phone}`);
    }
    if (params.experience) {
      lines.push(`• Experience: ${params.experience}`);
    }
    if (params.duration) {
      lines.push(`• Duration: ${params.duration} Minutes`);
    }
    if (params.pressure) {
      lines.push(`• Preferred Pressure: ${params.pressure}`);
    }
    if (params.preferredDate || params.date) {
      lines.push(`• Preferred Date: ${params.preferredDate || params.date}`);
    }
    if (params.preferredTimeSlot || params.time) {
      lines.push(`• Preferred Time Slot: ${params.preferredTimeSlot || params.time}`);
    }
    if (params.guests) {
      lines.push(`• Guests: ${params.guests}`);
    }
    if (params.notes) {
      lines.push(`• Special Notes: ${params.notes}`);
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
