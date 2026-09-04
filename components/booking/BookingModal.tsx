"use client";

import React, { useState, useEffect } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import {
  X,
  CheckCircle2,
  Phone,
  MessageCircle,
  Calendar,
  Clock,
  Sparkles,
  Info,
} from "lucide-react";
import { Modal } from "@/components/ui/Modal";
import { Button } from "@/components/ui/Button";
import { treatmentsData } from "@/data/treatments";
import { getWhatsAppUrl, getCallUrl } from "@/lib/whatsapp";
import { trackEvent } from "@/lib/analytics";

// Zod Schema Validation
const bookingSchema = z.object({
  fullName: z.string().min(2, "Please provide your full name"),
  phone: z
    .string()
    .min(10, "Please provide a valid 10-digit mobile number")
    .regex(/^[0-9+\s-]{10,14}$/, "Please enter a valid phone number"),
  treatment: z.string().min(1, "Please select an experience"),
  duration: z.string().min(1, "Please choose a session duration"),
  preferredDate: z.string().min(1, "Please select your preferred date"),
  preferredTimeSlot: z.string().min(1, "Please select a time slot"),
  guests: z.string().default("1 Guest"),
  notes: z.string().optional(),
  consent: z.literal(true, {
    errorMap: () => ({
      message: "Please agree to receive booking confirmation via WhatsApp or phone",
    }),
  }),
});

type BookingFormData = z.infer<typeof bookingSchema>;

interface BookingModalProps {
  isOpen: boolean;
  onClose: () => void;
  initialTreatment?: string;
  initialDuration?: number;
}

const timeSlots = [
  "10:00 AM – 12:00 PM (Morning Calm)",
  "12:00 PM – 03:00 PM (Afternoon Respite)",
  "03:00 PM – 06:00 PM (Evening Wind-Down)",
  "06:00 PM – 08:30 PM (Night Restorative)",
];

const durationsList = [
  "45 Minutes",
  "60 Minutes",
  "90 Minutes",
  "120 Minutes",
];

export function BookingModal({
  isOpen,
  onClose,
  initialTreatment,
  initialDuration,
}: BookingModalProps) {
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [submittedData, setSubmittedData] = useState<BookingFormData | null>(null);

  const {
    register,
    handleSubmit,
    setValue,
    reset,
    formState: { errors, isSubmitting },
  } = useForm<BookingFormData>({
    resolver: zodResolver(bookingSchema),
    defaultValues: {
      treatment: initialTreatment || treatmentsData[0]?.name || "",
      duration: initialDuration ? `${initialDuration} Minutes` : "60 Minutes",
      guests: "1 Guest",
    },
  });

  // Pre-fill initial treatment/duration when modal opens
  useEffect(() => {
    if (initialTreatment) {
      setValue("treatment", initialTreatment);
    }
    if (initialDuration) {
      setValue("duration", `${initialDuration} Minutes`);
    }
  }, [initialTreatment, initialDuration, setValue]);

  const onSubmit = async (data: BookingFormData) => {
    trackEvent("booking_submit", {
      treatmentName: data.treatment,
      duration: parseInt(data.duration, 10) || 60,
      guests: parseInt(data.guests, 10) || 1,
    });

    // Simulate quick request receipt
    await new Promise((res) => setTimeout(res, 500));

    setSubmittedData(data);
    setIsSubmitted(true);
    trackEvent("booking_success", { treatmentName: data.treatment });
  };

  const handleModalClose = () => {
    setIsSubmitted(false);
    reset();
    onClose();
  };

  return (
    <Modal
      isOpen={isOpen}
      onClose={handleModalClose}
      ariaLabel="Schedule Your Wellness Experience"
      maxWidth="2xl"
    >
      <div className="relative p-6 sm:p-8 lg:p-10 bg-surface-raised border border-rose/25 rounded-2xl shadow-2xl">
        {/* Modal Close Button */}
        <button
          type="button"
          onClick={handleModalClose}
          className="absolute top-5 right-5 p-2 rounded-xl text-taupe hover:text-rose hover:bg-surface-dark transition-colors focus:outline-none"
          aria-label="Close booking modal"
        >
          <X className="w-5 h-5" />
        </button>

        {isSubmitted && submittedData ? (
          /* Success Screen with Direct WhatsApp Confirmation Handoff */
          <div className="text-center py-6 sm:py-8 space-y-6">
            <div className="w-16 h-16 rounded-full bg-rose/15 border-2 border-rose flex items-center justify-center mx-auto text-rose shadow-rose-glow">
              <CheckCircle2 className="w-8 h-8" />
            </div>

            <div className="space-y-2">
              <h3 className="font-serif text-2xl sm:text-3xl text-white font-medium">
                Appointment Request Received
              </h3>
              <p className="text-xs sm:text-sm text-taupe max-w-md mx-auto leading-relaxed">
                Thank you, <strong className="text-white">{submittedData.fullName}</strong>. We
                have recorded your interest for{" "}
                <strong className="text-rose">{submittedData.treatment}</strong> ({submittedData.duration}).
              </p>
            </div>

            {/* Direct WhatsApp Handoff CTA */}
            <div className="p-5 rounded-2xl bg-surface-dark border border-rose/20 max-w-md mx-auto text-left space-y-3">
              <div className="flex items-center gap-2 text-xs font-bold text-rose uppercase tracking-wider">
                <Sparkles className="w-4 h-4 text-rose" />
                <span>Instant Confirmation</span>
              </div>
              <p className="text-xs text-taupe leading-relaxed">
                To guarantee your preferred time slot immediately, send your pre-filled
                appointment request to our desk on WhatsApp:
              </p>

              <a
                href={getWhatsAppUrl({
                  guestName: submittedData.fullName,
                  phone: submittedData.phone,
                  experience: submittedData.treatment,
                  duration: parseInt(submittedData.duration, 10) || 60,
                  preferredDate: submittedData.preferredDate,
                  preferredTimeSlot: submittedData.preferredTimeSlot,
                  guests: submittedData.guests,
                  notes: submittedData.notes,
                  source: "booking_modal_success",
                })}
                target="_blank"
                rel="noopener noreferrer"
                onClick={() =>
                  trackEvent("whatsapp_click", { context: "booking_modal_success" })
                }
                className="w-full flex items-center justify-center gap-2 py-3 px-4 rounded-xl bg-rose text-obsidian font-bold text-sm shadow-rose-glow hover:bg-rose-light transition-all"
              >
                <MessageCircle className="w-4 h-4" />
                <span>Confirm on WhatsApp Now</span>
              </a>
            </div>

            <div className="pt-2">
              <button
                type="button"
                onClick={handleModalClose}
                className="text-xs text-taupe hover:text-white underline font-sans"
              >
                Done / Close Window
              </button>
            </div>
          </div>
        ) : (
          /* Booking Request Form */
          <div>
            <div className="mb-6 pr-8">
              <span className="text-[10px] sm:text-[11px] font-sans font-bold uppercase tracking-[0.22em] text-rose block mb-1">
                Personalized Reservation
              </span>
              <h2 className="font-serif text-2xl sm:text-3xl text-white font-medium">
                Schedule Your Experience
              </h2>
              <p className="text-xs sm:text-sm text-taupe mt-1">
                Tell us your preferred date and time. Our team will verify therapist
                availability and confirm your booking.
              </p>
            </div>

            <form onSubmit={handleSubmit(onSubmit)} className="space-y-4 sm:space-y-5">
              {/* Name & Phone */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-sans uppercase tracking-wider text-taupe mb-1.5 font-semibold">
                    Full Name *
                  </label>
                  <input
                    type="text"
                    {...register("fullName")}
                    placeholder="e.g. Aarti Sharma"
                    className={`w-full px-4 py-2.5 rounded-xl bg-surface-dark border text-sm text-white placeholder:text-muted/60 focus:outline-none focus:ring-1 focus:ring-rose ${
                      errors.fullName ? "border-rose" : "border-rose/20"
                    }`}
                  />
                  {errors.fullName && (
                    <span className="text-[11px] text-rose mt-1 block">
                      {errors.fullName.message}
                    </span>
                  )}
                </div>

                <div>
                  <label className="block text-xs font-sans uppercase tracking-wider text-taupe mb-1.5 font-semibold">
                    Phone / WhatsApp *
                  </label>
                  <input
                    type="tel"
                    {...register("phone")}
                    placeholder="e.g. 9876543210"
                    className={`w-full px-4 py-2.5 rounded-xl bg-surface-dark border text-sm text-white placeholder:text-muted/60 focus:outline-none focus:ring-1 focus:ring-rose ${
                      errors.phone ? "border-rose" : "border-rose/20"
                    }`}
                  />
                  {errors.phone && (
                    <span className="text-[11px] text-rose mt-1 block">
                      {errors.phone.message}
                    </span>
                  )}
                </div>
              </div>

              {/* Treatment Selection & Duration */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-sans uppercase tracking-wider text-taupe mb-1.5 font-semibold">
                    Select Experience *
                  </label>
                  <select
                    {...register("treatment")}
                    className="w-full px-4 py-2.5 rounded-xl bg-surface-dark border border-rose/20 text-sm text-white focus:outline-none focus:ring-1 focus:ring-rose"
                  >
                    {treatmentsData.map((t) => (
                      <option key={t.id} value={t.name} className="bg-surface-dark text-white">
                        {t.name} ({t.category})
                      </option>
                    ))}
                  </select>
                </div>

                <div>
                  <label className="block text-xs font-sans uppercase tracking-wider text-taupe mb-1.5 font-semibold">
                    Session Duration *
                  </label>
                  <select
                    {...register("duration")}
                    className="w-full px-4 py-2.5 rounded-xl bg-surface-dark border border-rose/20 text-sm text-white focus:outline-none focus:ring-1 focus:ring-rose"
                  >
                    {durationsList.map((d) => (
                      <option key={d} value={d} className="bg-surface-dark text-white">
                        {d}
                      </option>
                    ))}
                  </select>
                </div>
              </div>

              {/* Date & Time Slot */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-sans uppercase tracking-wider text-taupe mb-1.5 font-semibold">
                    Preferred Date *
                  </label>
                  <input
                    type="date"
                    {...register("preferredDate")}
                    min={new Date().toISOString().split("T")[0]}
                    className={`w-full px-4 py-2.5 rounded-xl bg-surface-dark border text-sm text-white focus:outline-none focus:ring-1 focus:ring-rose ${
                      errors.preferredDate ? "border-rose" : "border-rose/20"
                    }`}
                  />
                  {errors.preferredDate && (
                    <span className="text-[11px] text-rose mt-1 block">
                      {errors.preferredDate.message}
                    </span>
                  )}
                </div>

                <div>
                  <label className="block text-xs font-sans uppercase tracking-wider text-taupe mb-1.5 font-semibold">
                    Preferred Time Slot *
                  </label>
                  <select
                    {...register("preferredTimeSlot")}
                    className={`w-full px-4 py-2.5 rounded-xl bg-surface-dark border text-sm text-white focus:outline-none focus:ring-1 focus:ring-rose ${
                      errors.preferredTimeSlot ? "border-rose" : "border-rose/20"
                    }`}
                  >
                    <option value="">Select a slot</option>
                    {timeSlots.map((slot) => (
                      <option key={slot} value={slot} className="bg-surface-dark text-white">
                        {slot}
                      </option>
                    ))}
                  </select>
                  {errors.preferredTimeSlot && (
                    <span className="text-[11px] text-rose mt-1 block">
                      {errors.preferredTimeSlot.message}
                    </span>
                  )}
                </div>
              </div>

              {/* Number of Guests & Custom Notes */}
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                <div className="sm:col-span-1">
                  <label className="block text-xs font-sans uppercase tracking-wider text-taupe mb-1.5 font-semibold">
                    Guests
                  </label>
                  <select
                    {...register("guests")}
                    className="w-full px-4 py-2.5 rounded-xl bg-surface-dark border border-rose/20 text-sm text-white focus:outline-none focus:ring-1 focus:ring-rose"
                  >
                    <option value="1 Guest">1 Guest (Single Suite)</option>
                    <option value="2 Guests">2 Guests (Couples Suite)</option>
                  </select>
                </div>

                <div className="sm:col-span-2">
                  <label className="block text-xs font-sans uppercase tracking-wider text-taupe mb-1.5 font-semibold">
                    Focus Areas / Special Notes (Optional)
                  </label>
                  <input
                    type="text"
                    {...register("notes")}
                    placeholder="e.g. Focus on neck tension, prefer medium pressure"
                    className="w-full px-4 py-2.5 rounded-xl bg-surface-dark border border-rose/20 text-sm text-white placeholder:text-muted/60 focus:outline-none focus:ring-1 focus:ring-rose"
                  />
                </div>
              </div>

              {/* Consent Checkbox */}
              <div className="pt-2">
                <label className="flex items-start gap-2.5 cursor-pointer">
                  <input
                    type="checkbox"
                    {...register("consent")}
                    className="mt-0.5 rounded border-rose/40 text-rose focus:ring-rose"
                  />
                  <span className="text-[11px] text-taupe leading-relaxed">
                    I agree to be contacted via WhatsApp or Phone to confirm my
                    appointment schedule and therapist availability.
                  </span>
                </label>
                {errors.consent && (
                  <span className="text-[11px] text-rose mt-1 block">
                    {errors.consent.message}
                  </span>
                )}
              </div>

              {/* Submit Buttons */}
              <div className="pt-4 flex flex-col sm:flex-row gap-3">
                <Button
                  type="submit"
                  variant="primary"
                  size="lg"
                  fullWidth
                  disabled={isSubmitting}
                  className="shadow-rose-glow"
                >
                  {isSubmitting ? "Sending Request..." : "Request Appointment"}
                </Button>

                <a
                  href={getCallUrl()}
                  onClick={() => trackEvent("call_click", { context: "booking_modal" })}
                  className="inline-flex items-center justify-center gap-2 px-6 py-3.5 rounded-xl bg-surface-dark hover:bg-rose/15 border border-rose/25 text-xs uppercase tracking-wider font-bold text-cream hover:text-rose transition-colors flex-shrink-0"
                >
                  <Phone className="w-4 h-4 text-rose" />
                  <span>Call Spa Direct</span>
                </a>
              </div>
            </form>
          </div>
        )}
      </div>
    </Modal>
  );
}
