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
      <div className="relative p-6 sm:p-8 lg:p-10 bg-white border border-slate-200/90 rounded-3xl shadow-2xl">
        {/* Modal Close Button */}
        <button
          type="button"
          onClick={handleModalClose}
          className="absolute top-5 right-5 p-2.5 rounded-xl text-slate-600 hover:text-rose bg-white border border-slate-200/90 shadow-button-secondary-3d hover:-translate-y-0.5 active:translate-y-0.5 transition-all focus:outline-none"
          aria-label="Close booking modal"
        >
          <X className="w-5 h-5 stroke-[2.5]" />
        </button>

        {isSubmitted && submittedData ? (
          /* Success Screen with Direct WhatsApp Confirmation Handoff */
          <div className="text-center py-6 sm:py-8 space-y-6">
            <div className="w-16 h-16 rounded-full bg-gradient-to-b from-[#df548f] to-[#c83b74] text-white flex items-center justify-center mx-auto shadow-button-3d border-2 border-white">
              <CheckCircle2 className="w-8 h-8 stroke-[2.5]" />
            </div>

            <div className="space-y-2">
              <h3 className="font-serif text-2xl sm:text-3xl text-slate-900 font-bold">
                Appointment Request Received
              </h3>
              <p className="text-xs sm:text-sm text-slate-700 max-w-md mx-auto leading-relaxed font-medium">
                Thank you, <strong className="text-slate-900">{submittedData.fullName}</strong>. We
                have recorded your interest for{" "}
                <strong className="text-[#c83b74]">{submittedData.treatment}</strong> ({submittedData.duration}).
              </p>
            </div>

            {/* Direct WhatsApp Handoff CTA */}
            <div className="p-6 rounded-2xl bg-[#f5f0eb] border border-slate-200/90 max-w-md mx-auto text-left space-y-3 shadow-3d">
              <div className="flex items-center gap-2 text-xs font-bold text-[#c83b74] uppercase tracking-wider">
                <Sparkles className="w-4 h-4" />
                <span>Instant Confirmation</span>
              </div>
              <p className="text-xs text-slate-700 leading-relaxed font-medium">
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
                className="w-full flex items-center justify-center gap-2 py-3.5 px-4 rounded-xl bg-gradient-to-b from-[#df548f] to-[#c83b74] text-white font-bold text-sm shadow-button-3d border-t border-white/35 border-b border-rose-900/40 hover:-translate-y-0.5 active:translate-y-0.5 transition-all"
              >
                <MessageCircle className="w-4 h-4" />
                <span>Confirm on WhatsApp Now</span>
              </a>
            </div>

            <div className="pt-2">
              <button
                type="button"
                onClick={handleModalClose}
                className="text-xs text-slate-600 hover:text-slate-900 underline font-sans font-semibold"
              >
                Done / Close Window
              </button>
            </div>
          </div>
        ) : (
          /* Booking Request Form */
          <div>
            <div className="mb-6 pr-8">
              <span className="text-[10px] sm:text-[11px] font-sans font-bold uppercase tracking-[0.22em] text-[#c83b74] block mb-1">
                Personalized Reservation
              </span>
              <h2 className="font-serif text-2xl sm:text-3xl text-slate-900 font-bold">
                Schedule Your Experience
              </h2>
              <p className="text-xs sm:text-sm text-slate-700 mt-1 font-medium">
                Tell us your preferred date and time. Our team will verify therapist
                availability and confirm your booking.
              </p>
            </div>

            <form onSubmit={handleSubmit(onSubmit)} className="space-y-4 sm:space-y-5">
              {/* Name & Phone */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-sans uppercase tracking-wider text-slate-800 mb-1.5 font-bold">
                    Full Name *
                  </label>
                  <input
                    type="text"
                    {...register("fullName")}
                    placeholder="e.g. Aarti Sharma"
                    className={`w-full px-4 py-3 rounded-xl bg-white border text-sm text-slate-800 placeholder:text-slate-400 focus:outline-none focus:ring-2 focus:ring-rose/40 shadow-sm transition-all ${
                      errors.fullName ? "border-rose" : "border-slate-200/90"
                    }`}
                  />
                  {errors.fullName && (
                    <span className="text-[11px] text-[#c83b74] mt-1 block font-semibold">
                      {errors.fullName.message}
                    </span>
                  )}
                </div>

                <div>
                  <label className="block text-xs font-sans uppercase tracking-wider text-slate-800 mb-1.5 font-bold">
                    Phone / WhatsApp *
                  </label>
                  <input
                    type="tel"
                    {...register("phone")}
                    placeholder="e.g. 9876543210"
                    className={`w-full px-4 py-3 rounded-xl bg-white border text-sm text-slate-800 placeholder:text-slate-400 focus:outline-none focus:ring-2 focus:ring-rose/40 shadow-sm transition-all ${
                      errors.phone ? "border-rose" : "border-slate-200/90"
                    }`}
                  />
                  {errors.phone && (
                    <span className="text-[11px] text-[#c83b74] mt-1 block font-semibold">
                      {errors.phone.message}
                    </span>
                  )}
                </div>
              </div>

              {/* Treatment Selection & Duration */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-sans uppercase tracking-wider text-slate-800 mb-1.5 font-bold">
                    Select Experience *
                  </label>
                  <select
                    {...register("treatment")}
                    className="w-full px-4 py-3 rounded-xl bg-white border border-slate-200/90 text-sm text-slate-800 focus:outline-none focus:ring-2 focus:ring-rose/40 shadow-sm transition-all font-medium"
                  >
                    {treatmentsData.map((t) => (
                      <option key={t.id} value={t.name}>
                        {t.name} ({t.category})
                      </option>
                    ))}
                  </select>
                </div>

                <div>
                  <label className="block text-xs font-sans uppercase tracking-wider text-slate-800 mb-1.5 font-bold">
                    Session Duration *
                  </label>
                  <select
                    {...register("duration")}
                    className="w-full px-4 py-3 rounded-xl bg-white border border-slate-200/90 text-sm text-slate-800 focus:outline-none focus:ring-2 focus:ring-rose/40 shadow-sm transition-all font-medium"
                  >
                    {durationsList.map((d) => (
                      <option key={d} value={d}>
                        {d}
                      </option>
                    ))}
                  </select>
                </div>
              </div>

              {/* Date & Time Slot */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-sans uppercase tracking-wider text-slate-800 mb-1.5 font-bold">
                    Preferred Date *
                  </label>
                  <input
                    type="date"
                    {...register("preferredDate")}
                    min={new Date().toISOString().split("T")[0]}
                    className={`w-full px-4 py-3 rounded-xl bg-white border text-sm text-slate-800 focus:outline-none focus:ring-2 focus:ring-rose/40 shadow-sm transition-all font-medium ${
                      errors.preferredDate ? "border-rose" : "border-slate-200/90"
                    }`}
                  />
                  {errors.preferredDate && (
                    <span className="text-[11px] text-[#c83b74] mt-1 block font-semibold">
                      {errors.preferredDate.message}
                    </span>
                  )}
                </div>

                <div>
                  <label className="block text-xs font-sans uppercase tracking-wider text-slate-800 mb-1.5 font-bold">
                    Preferred Time Slot *
                  </label>
                  <select
                    {...register("preferredTimeSlot")}
                    className={`w-full px-4 py-3 rounded-xl bg-white border text-sm text-slate-800 focus:outline-none focus:ring-2 focus:ring-rose/40 shadow-sm transition-all font-medium ${
                      errors.preferredTimeSlot ? "border-rose" : "border-slate-200/90"
                    }`}
                  >
                    <option value="">Select a slot</option>
                    {timeSlots.map((slot) => (
                      <option key={slot} value={slot}>
                        {slot}
                      </option>
                    ))}
                  </select>
                  {errors.preferredTimeSlot && (
                    <span className="text-[11px] text-[#c83b74] mt-1 block font-semibold">
                      {errors.preferredTimeSlot.message}
                    </span>
                  )}
                </div>
              </div>

              {/* Number of Guests & Custom Notes */}
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                <div className="sm:col-span-1">
                  <label className="block text-xs font-sans uppercase tracking-wider text-slate-800 mb-1.5 font-bold">
                    Guests
                  </label>
                  <select
                    {...register("guests")}
                    className="w-full px-4 py-3 rounded-xl bg-white border border-slate-200/90 text-sm text-slate-800 focus:outline-none focus:ring-2 focus:ring-rose/40 shadow-sm transition-all font-medium"
                  >
                    <option value="1 Guest">1 Guest (Single Suite)</option>
                    <option value="2 Guests">2 Guests (Couples Suite)</option>
                  </select>
                </div>

                <div className="sm:col-span-2">
                  <label className="block text-xs font-sans uppercase tracking-wider text-slate-800 mb-1.5 font-bold">
                    Focus Areas / Special Notes (Optional)
                  </label>
                  <input
                    type="text"
                    {...register("notes")}
                    placeholder="e.g. Focus on neck tension, prefer medium pressure"
                    className="w-full px-4 py-3 rounded-xl bg-white border border-slate-200/90 text-sm text-slate-800 placeholder:text-slate-400 focus:outline-none focus:ring-2 focus:ring-rose/40 shadow-sm transition-all"
                  />
                </div>
              </div>

              {/* Consent Checkbox */}
              <div className="pt-2">
                <label className="flex items-start gap-2.5 cursor-pointer">
                  <input
                    type="checkbox"
                    {...register("consent")}
                    className="mt-0.5 rounded border-slate-300 text-rose focus:ring-rose"
                  />
                  <span className="text-[11px] text-slate-700 leading-relaxed font-medium">
                    I agree to be contacted via WhatsApp or Phone to confirm my
                    appointment schedule and therapist availability.
                  </span>
                </label>
                {errors.consent && (
                  <span className="text-[11px] text-[#c83b74] mt-1 block font-semibold">
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
                >
                  {isSubmitting ? "Sending Request..." : "Request Appointment"}
                </Button>

                <a
                  href={getCallUrl()}
                  onClick={() => trackEvent("call_click", { context: "booking_modal" })}
                  className="inline-flex items-center justify-center gap-2 px-6 py-3.5 rounded-xl bg-white hover:bg-rose-50/60 border border-slate-200/90 text-xs uppercase tracking-wider font-bold text-slate-800 hover:text-rose transition-all flex-shrink-0 shadow-button-secondary-3d hover:-translate-y-0.5 active:translate-y-0.5"
                >
                  <Phone className="w-4 h-4 text-[#c83b74]" />
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
