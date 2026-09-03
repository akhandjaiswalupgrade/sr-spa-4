"use client";

import React, { useState, useEffect } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { motion, AnimatePresence } from "framer-motion";
import {
  Calendar,
  Clock,
  User,
  Phone,
  Sparkles,
  CheckCircle2,
  MessageCircle,
  AlertCircle,
} from "lucide-react";
import { Modal } from "@/components/ui/Modal";
import { Button } from "@/components/ui/Button";
import { treatmentsData } from "@/data/treatments";
import { getWhatsAppUrl } from "@/lib/whatsapp";
import { trackEvent } from "@/lib/analytics";

const bookingSchema = z.object({
  fullName: z.string().min(2, "Please provide your name (at least 2 letters)"),
  phone: z
    .string()
    .min(10, "Please enter a valid 10-digit phone number")
    .regex(/^[0-9+\s-]{10,15}$/, "Invalid phone format"),
  treatment: z.string().min(1, "Please select an experience"),
  duration: z.string().min(1, "Please select duration"),
  preferredDate: z.string().min(1, "Please choose a date"),
  preferredTime: z.string().optional(),
  guests: z.string().default("1"),
  specialRequests: z.string().optional(),
  consent: z.literal(true, {
    errorMap: () => ({ message: "You must agree to be contacted for this request" }),
  }),
});

type BookingFormData = z.infer<typeof bookingSchema>;

interface BookingModalProps {
  isOpen: boolean;
  onClose: () => void;
  initialTreatment?: string;
  initialDuration?: number;
}

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
      treatment: initialTreatment || treatmentsData[0].name,
      duration: initialDuration ? `${initialDuration} Minutes` : "60 Minutes",
      guests: "1",
      preferredDate: new Date().toISOString().split("T")[0],
      preferredTime: "14:00",
      consent: true,
    },
  });

  // Update initial treatment if passed from external button
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
    await new Promise((res) => setTimeout(res, 600));

    setSubmittedData(data);
    setIsSubmitted(true);
    trackEvent("booking_success", { treatmentName: data.treatment });
  };

  const handleClose = () => {
    setIsSubmitted(false);
    setSubmittedData(null);
    reset();
    onClose();
  };

  return (
    <Modal
      isOpen={isOpen}
      onClose={handleClose}
      title={isSubmitted ? undefined : "Request Appointment"}
      subtitle={
        isSubmitted
          ? undefined
          : "Tell us when you’d like to visit. We will check suite availability and contact you promptly."
      }
      maxWidth="lg"
    >
      <AnimatePresence mode="wait">
        {isSubmitted && submittedData ? (
          /* Booking Success State */
          <motion.div
            key="success"
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.95 }}
            className="text-center py-6 space-y-6"
          >
            <div className="w-16 h-16 rounded-full bg-gold/15 border border-gold/40 flex items-center justify-center text-gold mx-auto shadow-luxury-glow">
              <CheckCircle2 className="w-9 h-9" />
            </div>

            <div className="space-y-2">
              <span className="text-xs font-sans uppercase tracking-[0.2em] text-gold font-bold">
                Request Received
              </span>
              <h3 className="font-serif text-3xl text-cream font-medium">
                Thank you, {submittedData.fullName}
              </h3>
              <p className="text-sm text-taupe max-w-md mx-auto leading-relaxed">
                We have received your appointment request for{" "}
                <strong className="text-cream">{submittedData.treatment}</strong> ({submittedData.duration}) on{" "}
                <strong className="text-cream">{submittedData.preferredDate}</strong>.
              </p>
            </div>

            {/* Instant WhatsApp Transition */}
            <div className="p-5 rounded-2xl bg-surface-dark border border-white/10 text-left space-y-3">
              <span className="text-xs font-sans text-muted block uppercase tracking-wider font-semibold">
                Fast Confirmation Available:
              </span>
              <p className="text-xs text-taupe leading-relaxed">
                Would you like to instantly verify available therapist timings over WhatsApp right now?
              </p>
              <a
                href={getWhatsAppUrl({
                  experience: submittedData.treatment,
                  duration: submittedData.duration,
                  date: submittedData.preferredDate,
                  time: submittedData.preferredTime,
                  guests: parseInt(submittedData.guests, 10),
                  source: "booking_success_modal",
                })}
                target="_blank"
                rel="noopener noreferrer"
                onClick={() =>
                  trackEvent("whatsapp_click", { context: "booking_success_modal" })
                }
                className="w-full inline-flex items-center justify-center gap-2 py-3 px-4 rounded-full bg-gold text-obsidian font-sans font-bold text-xs uppercase tracking-wider hover:bg-gold-light transition-all shadow-luxury-glow"
              >
                <MessageCircle className="w-4 h-4" />
                <span>Continue on WhatsApp</span>
              </a>
            </div>

            <Button variant="ghost" size="md" onClick={handleClose}>
              Done / Close Window
            </Button>
          </motion.div>
        ) : (
          /* Form State */
          <motion.form
            key="form"
            onSubmit={handleSubmit(onSubmit)}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="space-y-4 pt-2 text-left"
          >
            {/* Name & Phone Grid */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="block text-xs font-sans uppercase tracking-wider text-muted font-semibold mb-1.5">
                  Full Name *
                </label>
                <div className="relative">
                  <input
                    type="text"
                    {...register("fullName")}
                    placeholder="Aditya Varma"
                    className="w-full bg-surface-dark border border-white/10 focus:border-gold rounded-xl px-3.5 py-2.5 text-sm text-cream placeholder-muted/60 focus:outline-none transition-colors"
                  />
                  <User className="w-4 h-4 text-muted absolute right-3.5 top-3 pointer-events-none" />
                </div>
                {errors.fullName && (
                  <span className="text-[11px] text-red-400 mt-1 block">
                    {errors.fullName.message}
                  </span>
                )}
              </div>

              <div>
                <label className="block text-xs font-sans uppercase tracking-wider text-muted font-semibold mb-1.5">
                  Phone Number *
                </label>
                <div className="relative">
                  <input
                    type="tel"
                    {...register("phone")}
                    placeholder="+91 98765 43210"
                    className="w-full bg-surface-dark border border-white/10 focus:border-gold rounded-xl px-3.5 py-2.5 text-sm text-cream placeholder-muted/60 focus:outline-none transition-colors"
                  />
                  <Phone className="w-4 h-4 text-muted absolute right-3.5 top-3 pointer-events-none" />
                </div>
                {errors.phone && (
                  <span className="text-[11px] text-red-400 mt-1 block">
                    {errors.phone.message}
                  </span>
                )}
              </div>
            </div>

            {/* Experience Selection */}
            <div>
              <label className="block text-xs font-sans uppercase tracking-wider text-muted font-semibold mb-1.5">
                Selected Experience *
              </label>
              <select
                {...register("treatment")}
                className="w-full bg-surface-dark border border-white/10 focus:border-gold rounded-xl px-3.5 py-2.5 text-sm text-cream focus:outline-none transition-colors"
              >
                {treatmentsData.map((t) => (
                  <option key={t.id} value={t.name} className="bg-surface-raised text-cream">
                    {t.name} ({t.category})
                  </option>
                ))}
              </select>
              {errors.treatment && (
                <span className="text-[11px] text-red-400 mt-1 block">
                  {errors.treatment.message}
                </span>
              )}
            </div>

            {/* Duration, Guests, Date, Time Grid */}
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
              <div>
                <label className="block text-xs font-sans uppercase tracking-wider text-muted font-semibold mb-1.5">
                  Duration *
                </label>
                <select
                  {...register("duration")}
                  className="w-full bg-surface-dark border border-white/10 focus:border-gold rounded-xl px-2.5 py-2.5 text-xs sm:text-sm text-cream focus:outline-none transition-colors"
                >
                  <option value="45 Minutes">45 Min</option>
                  <option value="60 Minutes">60 Min</option>
                  <option value="90 Minutes">90 Min</option>
                  <option value="120 Minutes">120 Min</option>
                </select>
              </div>

              <div>
                <label className="block text-xs font-sans uppercase tracking-wider text-muted font-semibold mb-1.5">
                  Guests
                </label>
                <select
                  {...register("guests")}
                  className="w-full bg-surface-dark border border-white/10 focus:border-gold rounded-xl px-2.5 py-2.5 text-xs sm:text-sm text-cream focus:outline-none transition-colors"
                >
                  <option value="1">1 Guest</option>
                  <option value="2">2 (Couple/Friends)</option>
                  <option value="3">3 Guests</option>
                  <option value="4">4 Guests</option>
                </select>
              </div>

              <div>
                <label className="block text-xs font-sans uppercase tracking-wider text-muted font-semibold mb-1.5">
                  Date *
                </label>
                <input
                  type="date"
                  {...register("preferredDate")}
                  min={new Date().toISOString().split("T")[0]}
                  className="w-full bg-surface-dark border border-white/10 focus:border-gold rounded-xl px-2.5 py-2 text-xs sm:text-sm text-cream focus:outline-none transition-colors"
                />
              </div>

              <div>
                <label className="block text-xs font-sans uppercase tracking-wider text-muted font-semibold mb-1.5">
                  Time
                </label>
                <input
                  type="time"
                  {...register("preferredTime")}
                  className="w-full bg-surface-dark border border-white/10 focus:border-gold rounded-xl px-2.5 py-2 text-xs sm:text-sm text-cream focus:outline-none transition-colors"
                />
              </div>
            </div>

            {/* Special Request / Notes */}
            <div>
              <label className="block text-xs font-sans uppercase tracking-wider text-muted font-semibold mb-1.5">
                Special Preferences or Focus Areas (Optional)
              </label>
              <textarea
                {...register("specialRequests")}
                rows={2}
                placeholder="E.g. Extra focus on neck & shoulders, prefer medium pressure..."
                className="w-full bg-surface-dark border border-white/10 focus:border-gold rounded-xl px-3.5 py-2 text-sm text-cream placeholder-muted/60 focus:outline-none transition-colors resize-none"
              />
            </div>

            {/* Consent Checkbox */}
            <div className="flex items-start gap-2.5 pt-1">
              <input
                type="checkbox"
                id="consent"
                {...register("consent")}
                className="w-4 h-4 rounded border-white/20 bg-surface-dark text-gold focus:ring-gold mt-0.5 cursor-pointer"
              />
              <label htmlFor="consent" className="text-xs text-taupe leading-snug cursor-pointer">
                I agree to be contacted via phone or WhatsApp regarding this appointment request.
              </label>
            </div>
            {errors.consent && (
              <span className="text-[11px] text-red-400 block">
                {errors.consent.message}
              </span>
            )}

            {/* Submit Action */}
            <div className="pt-4">
              <Button
                variant="primary"
                size="lg"
                fullWidth
                disabled={isSubmitting}
                className="shadow-luxury"
              >
                {isSubmitting ? "Submitting Request..." : "Request Appointment"}
              </Button>
            </div>
          </motion.form>
        )}
      </AnimatePresence>
    </Modal>
  );
}
