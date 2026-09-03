"use client";

import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  Sparkles,
  Clock,
  SlidersHorizontal,
  Check,
  MessageCircle,
  ArrowRight,
  RotateCcw,
} from "lucide-react";
import { Button } from "@/components/ui/Button";
import { getWhatsAppUrl } from "@/lib/whatsapp";
import { formatPrice } from "@/lib/utils";
import { trackEvent } from "@/lib/analytics";

interface SessionConfiguratorProps {
  onOpenBooking: (initialTreatment?: string, initialDuration?: number) => void;
}

const goals = [
  {
    id: "relax",
    title: "Gentle Relaxation",
    subtitle: "Calm your mind & soothe daily stress",
    treatment: "Swedish Relaxation Massage",
    basePrice: 2499,
  },
  {
    id: "release",
    title: "Release Deep Tension",
    subtitle: "Focus on stubborn muscle knots & desk fatigue",
    treatment: "Deep Tissue Muscle Therapy",
    basePrice: 2799,
  },
  {
    id: "recover",
    title: "Post-Activity Recovery",
    subtitle: "Assisted mobility & tension relief for tight limbs",
    treatment: "Thai Assisted Mobility Bodywork",
    basePrice: 2899,
  },
  {
    id: "rejuvenate",
    title: "Full-Body Immersion",
    subtitle: "Flagship luxury ritual with warm compresses",
    treatment: "Signature Shirui 90-Minute Immersion",
    basePrice: 4299,
  },
  {
    id: "couples",
    title: "Couples Sanctuary",
    subtitle: "Synchronized dual therapy in private suite",
    treatment: "Couples Private Sanctuary Experience",
    basePrice: 5199,
  },
];

const durations = [
  { minutes: 45, label: "45 Minutes", desc: "Targeted focus (Express)", multiplier: 0.8 },
  { minutes: 60, label: "60 Minutes", desc: "Classic full session", multiplier: 1.0 },
  { minutes: 90, label: "90 Minutes", desc: "Deep unhurried immersion", multiplier: 1.4 },
  { minutes: 120, label: "120 Minutes", desc: "Complete head-to-toe escape", multiplier: 1.8 },
];

const pressures = [
  { id: "Light", label: "Light", desc: "Gentle, gliding effleurage to calm the nervous system" },
  { id: "Medium", label: "Medium", desc: "Balanced pressure working across muscle bellies" },
  { id: "Firm", label: "Firm", desc: "Strong, concentrated forearm & thumb pressure" },
];

export function SessionConfigurator({ onOpenBooking }: SessionConfiguratorProps) {
  const [step, setStep] = useState<number>(1);
  const [selectedGoal, setSelectedGoal] = useState(goals[0]);
  const [selectedDuration, setSelectedDuration] = useState(durations[1]);
  const [selectedPressure, setSelectedPressure] = useState(pressures[1]);

  const estimatedPrice = Math.round(
    selectedGoal.basePrice * (selectedDuration.minutes / 60)
  );

  const handleNext = () => {
    trackEvent("configurator_step", { step: step + 1 });
    setStep((s) => Math.min(4, s + 1));
  };

  const handlePrev = () => {
    setStep((s) => Math.max(1, s - 1));
  };

  const handleReset = () => {
    setStep(1);
    setSelectedGoal(goals[0]);
    setSelectedDuration(durations[1]);
    setSelectedPressure(pressures[1]);
  };

  return (
    <section
      id="build-session"
      className="relative bg-obsidian py-20 sm:py-28 lg:py-36 border-t border-white/[0.07]"
    >
      <div className="max-w-[1280px] mx-auto px-5 sm:px-8 lg:px-12">
        {/* Header */}
        <div className="max-w-2xl text-left mb-12 sm:mb-16">
          <span className="inline-block text-[11px] sm:text-xs font-sans font-semibold uppercase tracking-[0.22em] text-gold mb-3 sm:mb-4">
            Interactive Journey
          </span>
          <h2 className="font-serif text-3xl sm:text-4xl md:text-5xl text-cream font-normal leading-[1.18] tracking-tight mb-4">
            Create your ideal session.
          </h2>
          <p className="text-base sm:text-lg text-taupe leading-relaxed">
            Tell us what kind of experience you need today, and we’ll match you with
            the right treatment, duration, and pressure.
          </p>
        </div>

        {/* Wizard Container */}
        <div className="max-w-3xl mx-auto rounded-feature bg-surface-raised border border-white/10 p-6 sm:p-10 lg:p-12 shadow-2xl">
          {/* Progress Bar & Steps Indicator */}
          <div className="flex items-center justify-between mb-8 pb-6 border-b border-white/10">
            <div className="flex items-center gap-2">
              <span className="w-8 h-8 rounded-full bg-gold text-obsidian flex items-center justify-center font-sans font-bold text-xs">
                {step}
              </span>
              <span className="text-xs font-sans uppercase tracking-widest text-taupe font-semibold">
                Step {step} of 4:{" "}
                <strong className="text-cream">
                  {step === 1 && "Your Goal"}
                  {step === 2 && "Duration"}
                  {step === 3 && "Pressure"}
                  {step === 4 && "Your Recommendation"}
                </strong>
              </span>
            </div>

            {step > 1 && (
              <button
                type="button"
                onClick={handleReset}
                className="text-xs font-sans text-muted hover:text-gold flex items-center gap-1 transition-colors"
              >
                <RotateCcw className="w-3.5 h-3.5" />
                <span>Start Over</span>
              </button>
            )}
          </div>

          {/* Wizard Content Steps */}
          <AnimatePresence mode="wait">
            {/* Step 1: Goal */}
            {step === 1 && (
              <motion.div
                key="step1"
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -20 }}
                transition={{ duration: 0.3 }}
                className="space-y-4"
              >
                <h3 className="font-serif text-2xl sm:text-3xl text-cream font-medium mb-4">
                  What are you looking for?
                </h3>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  {goals.map((goal) => {
                    const isSelected = selectedGoal.id === goal.id;
                    return (
                      <button
                        key={goal.id}
                        type="button"
                        onClick={() => setSelectedGoal(goal)}
                        className={`p-4 sm:p-5 rounded-2xl text-left border transition-all ${
                          isSelected
                            ? "bg-gold/15 border-gold shadow-gold-subtle scale-[1.02]"
                            : "bg-surface-dark border-white/10 hover:border-white/20"
                        }`}
                      >
                        <div className="flex items-center justify-between mb-1">
                          <span className="font-serif text-lg text-cream font-medium">
                            {goal.title}
                          </span>
                          {isSelected && (
                            <Check className="w-4 h-4 text-gold flex-shrink-0" />
                          )}
                        </div>
                        <span className="text-xs text-taupe block leading-relaxed">
                          {goal.subtitle}
                        </span>
                      </button>
                    );
                  })}
                </div>
              </motion.div>
            )}

            {/* Step 2: Duration */}
            {step === 2 && (
              <motion.div
                key="step2"
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -20 }}
                transition={{ duration: 0.3 }}
                className="space-y-4"
              >
                <h3 className="font-serif text-2xl sm:text-3xl text-cream font-medium mb-4">
                  How much time do you want?
                </h3>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  {durations.map((dur) => {
                    const isSelected = selectedDuration.minutes === dur.minutes;
                    return (
                      <button
                        key={dur.minutes}
                        type="button"
                        onClick={() => setSelectedDuration(dur)}
                        className={`p-4 sm:p-5 rounded-2xl text-left border transition-all ${
                          isSelected
                            ? "bg-gold/15 border-gold shadow-gold-subtle scale-[1.02]"
                            : "bg-surface-dark border-white/10 hover:border-white/20"
                        }`}
                      >
                        <div className="flex items-center justify-between mb-1">
                          <span className="font-serif text-xl text-cream font-medium">
                            {dur.label}
                          </span>
                          {isSelected && (
                            <Check className="w-4 h-4 text-gold flex-shrink-0" />
                          )}
                        </div>
                        <span className="text-xs text-taupe block leading-relaxed">
                          {dur.desc}
                        </span>
                      </button>
                    );
                  })}
                </div>
              </motion.div>
            )}

            {/* Step 3: Pressure */}
            {step === 3 && (
              <motion.div
                key="step3"
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -20 }}
                transition={{ duration: 0.3 }}
                className="space-y-4"
              >
                <h3 className="font-serif text-2xl sm:text-3xl text-cream font-medium mb-2">
                  What is your preferred pressure?
                </h3>
                <p className="text-xs sm:text-sm text-taupe mb-4">
                  You can always adjust pressure dynamically at any moment during your therapy.
                </p>
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                  {pressures.map((press) => {
                    const isSelected = selectedPressure.id === press.id;
                    return (
                      <button
                        key={press.id}
                        type="button"
                        onClick={() => setSelectedPressure(press)}
                        className={`p-4 sm:p-5 rounded-2xl text-left border transition-all ${
                          isSelected
                            ? "bg-gold/15 border-gold shadow-gold-subtle scale-[1.02]"
                            : "bg-surface-dark border-white/10 hover:border-white/20"
                        }`}
                      >
                        <div className="flex items-center justify-between mb-1.5">
                          <span className="font-serif text-xl text-cream font-medium">
                            {press.label}
                          </span>
                          {isSelected && (
                            <Check className="w-4 h-4 text-gold flex-shrink-0" />
                          )}
                        </div>
                        <span className="text-xs text-taupe block leading-relaxed">
                          {press.desc}
                        </span>
                      </button>
                    );
                  })}
                </div>
              </motion.div>
            )}

            {/* Step 4: Tailored Recommendation Result */}
            {step === 4 && (
              <motion.div
                key="step4"
                initial={{ opacity: 0, scale: 0.96 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.96 }}
                transition={{ duration: 0.4 }}
                className="space-y-6"
              >
                <div className="p-6 rounded-2xl bg-surface-dark border border-gold/40 shadow-luxury relative overflow-hidden">
                  <div className="absolute top-0 right-0 px-3 py-1 bg-gold text-obsidian text-[10px] font-sans uppercase font-bold tracking-wider rounded-bl-xl">
                    Tailored Match
                  </div>

                  <span className="text-[11px] font-sans uppercase tracking-[0.2em] text-gold font-semibold block mb-2">
                    Your Shirui Experience
                  </span>

                  <h3 className="font-serif text-2xl sm:text-3xl text-cream font-medium mb-4">
                    {selectedGoal.treatment}
                  </h3>

                  {/* Config Summary Pills */}
                  <div className="grid grid-cols-2 sm:grid-cols-3 gap-3 mb-6 pt-4 border-t border-white/10 text-xs">
                    <div>
                      <span className="text-muted block uppercase tracking-wider text-[10px]">
                        Duration
                      </span>
                      <span className="font-semibold text-cream font-sans">
                        {selectedDuration.label}
                      </span>
                    </div>
                    <div>
                      <span className="text-muted block uppercase tracking-wider text-[10px]">
                        Pressure
                      </span>
                      <span className="font-semibold text-cream font-sans">
                        {selectedPressure.label} Pressure
                      </span>
                    </div>
                    <div>
                      <span className="text-muted block uppercase tracking-wider text-[10px]">
                        Approx. Price
                      </span>
                      <span className="font-bold text-gold font-sans text-sm">
                        {formatPrice(estimatedPrice)}
                      </span>
                    </div>
                  </div>

                  {/* Dual Call to Action */}
                  <div className="flex flex-col sm:flex-row gap-3 pt-2">
                    <Button
                      variant="primary"
                      size="lg"
                      fullWidth
                      onClick={() => {
                        trackEvent("configurator_complete", {
                          treatment: selectedGoal.treatment,
                          duration: selectedDuration.minutes,
                          pressure: selectedPressure.id,
                        });
                        onOpenBooking(selectedGoal.treatment, selectedDuration.minutes);
                      }}
                    >
                      Book This Experience
                    </Button>

                    <a
                      href={getWhatsAppUrl({
                        experience: selectedGoal.treatment,
                        duration: selectedDuration.minutes,
                        pressure: selectedPressure.label,
                        source: "session_configurator",
                      })}
                      target="_blank"
                      rel="noopener noreferrer"
                      onClick={() =>
                        trackEvent("whatsapp_click", {
                          context: "session_configurator",
                          treatment: selectedGoal.treatment,
                        })
                      }
                      className="inline-flex items-center justify-center gap-2 px-6 py-3.5 rounded-full bg-white/[0.05] hover:bg-white/[0.1] border border-white/15 text-sm font-sans font-medium text-cream hover:text-gold transition-colors flex-shrink-0"
                    >
                      <MessageCircle className="w-4 h-4 text-gold" />
                      <span>WhatsApp Selection</span>
                    </a>
                  </div>
                </div>
              </motion.div>
            )}
          </AnimatePresence>

          {/* Navigation Controls (Steps 1 to 3) */}
          {step < 4 && (
            <div className="flex items-center justify-between pt-8 border-t border-white/10 mt-8">
              {step > 1 ? (
                <Button variant="ghost" size="md" onClick={handlePrev}>
                  ← Back
                </Button>
              ) : (
                <div />
              )}

              <Button variant="primary" size="md" onClick={handleNext}>
                <span>Continue</span>
                <ArrowRight className="w-4 h-4 ml-1" />
              </Button>
            </div>
          )}
        </div>
      </div>
    </section>
  );
}
