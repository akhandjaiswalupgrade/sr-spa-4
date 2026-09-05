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
      className="relative bg-white py-24 sm:py-32 lg:py-36 border-t border-gray-100"
    >
      <div className="max-w-[1280px] mx-auto px-5 sm:px-8 lg:px-12">
        {/* Header */}
        <div className="max-w-2xl text-left mb-12 sm:mb-16">
          <span className="inline-block text-[11px] sm:text-xs font-sans font-bold uppercase tracking-[0.22em] text-[#c83b74] bg-rose-50/80 px-3.5 py-1 rounded-full border border-rose-200 shadow-sm mb-4">
            Interactive Journey
          </span>
          <h2 className="font-serif text-3xl sm:text-4xl md:text-5xl text-slate-900 font-normal leading-[1.18] tracking-tight mb-4">
            Create your{" "}
            <span className="italic font-serif bg-gradient-to-r from-[#df548f] via-[#c83b74] to-[#a81d52] bg-clip-text text-transparent">
              ideal session
            </span>
            .
          </h2>
          <p className="text-base sm:text-lg text-slate-700 leading-relaxed font-medium">
            Tell us what kind of experience you need today, and we’ll match you with
            the right treatment, duration, and pressure.
          </p>
        </div>

        {/* Wizard Container */}
        <div className="max-w-3xl mx-auto rounded-3xl bg-[#f5f0eb] border border-slate-200/90 p-6 sm:p-10 lg:p-12 shadow-3d">
          {/* Progress Bar & Steps Indicator */}
          <div className="flex items-center justify-between mb-8 pb-6 border-b border-slate-200/90">
            <div className="flex items-center gap-3">
              <span className="w-8 h-8 rounded-full bg-gradient-to-b from-[#df548f] to-[#c83b74] text-white flex items-center justify-center font-sans font-bold text-xs shadow-button-3d border-t border-white/30">
                {step}
              </span>
              <span className="text-xs font-sans uppercase tracking-widest text-slate-600 font-semibold">
                Step {step} of 4:{" "}
                <strong className="text-slate-900 font-bold">
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
                className="text-xs font-sans font-semibold text-slate-600 hover:text-rose flex items-center gap-1.5 transition-colors"
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
                <h3 className="font-serif text-2xl sm:text-3xl text-slate-900 font-bold mb-4">
                  What are you looking for?
                </h3>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5">
                  {goals.map((goal) => {
                    const isSelected = selectedGoal.id === goal.id;
                    return (
                      <button
                        key={goal.id}
                        type="button"
                        onClick={() => setSelectedGoal(goal)}
                        className={`p-4 sm:p-5 rounded-2xl text-left transition-all duration-200 ${
                          isSelected
                            ? "bg-white border-2 border-[#c83b74] shadow-3d scale-[1.02]"
                            : "bg-white border border-slate-200/90 hover:border-rose/40 shadow-button-secondary-3d hover:-translate-y-0.5 active:translate-y-0.5"
                        }`}
                      >
                        <div className="flex items-center justify-between mb-1.5">
                          <span className="font-serif text-lg text-slate-900 font-bold">
                            {goal.title}
                          </span>
                          {isSelected && (
                            <span className="w-6 h-6 rounded-full bg-gradient-to-r from-[#df548f] to-[#c83b74] text-white flex items-center justify-center shadow-sm flex-shrink-0">
                              <Check className="w-3.5 h-3.5 stroke-[3]" />
                            </span>
                          )}
                        </div>
                        <span className="text-xs text-slate-600 block leading-relaxed font-medium">
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
                <h3 className="font-serif text-2xl sm:text-3xl text-slate-900 font-bold mb-4">
                  How much time do you want?
                </h3>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5">
                  {durations.map((dur) => {
                    const isSelected = selectedDuration.minutes === dur.minutes;
                    return (
                      <button
                        key={dur.minutes}
                        type="button"
                        onClick={() => setSelectedDuration(dur)}
                        className={`p-4 sm:p-5 rounded-2xl text-left transition-all duration-200 ${
                          isSelected
                            ? "bg-white border-2 border-[#c83b74] shadow-3d scale-[1.02]"
                            : "bg-white border border-slate-200/90 hover:border-rose/40 shadow-button-secondary-3d hover:-translate-y-0.5 active:translate-y-0.5"
                        }`}
                      >
                        <div className="flex items-center justify-between mb-1.5">
                          <span className="font-serif text-xl text-slate-900 font-bold">
                            {dur.label}
                          </span>
                          {isSelected && (
                            <span className="w-6 h-6 rounded-full bg-gradient-to-r from-[#df548f] to-[#c83b74] text-white flex items-center justify-center shadow-sm flex-shrink-0">
                              <Check className="w-3.5 h-3.5 stroke-[3]" />
                            </span>
                          )}
                        </div>
                        <span className="text-xs text-slate-600 block leading-relaxed font-medium">
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
                <h3 className="font-serif text-2xl sm:text-3xl text-slate-900 font-bold mb-2">
                  What is your preferred pressure?
                </h3>
                <p className="text-xs sm:text-sm text-slate-600 mb-4 font-medium">
                  You can always adjust pressure dynamically at any moment during your therapy.
                </p>
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-3.5">
                  {pressures.map((press) => {
                    const isSelected = selectedPressure.id === press.id;
                    return (
                      <button
                        key={press.id}
                        type="button"
                        onClick={() => setSelectedPressure(press)}
                        className={`p-4 sm:p-5 rounded-2xl text-left transition-all duration-200 ${
                          isSelected
                            ? "bg-white border-2 border-[#c83b74] shadow-3d scale-[1.02]"
                            : "bg-white border border-slate-200/90 hover:border-rose/40 shadow-button-secondary-3d hover:-translate-y-0.5 active:translate-y-0.5"
                        }`}
                      >
                        <div className="flex items-center justify-between mb-1.5">
                          <span className="font-serif text-xl text-slate-900 font-bold">
                            {press.label}
                          </span>
                          {isSelected && (
                            <span className="w-6 h-6 rounded-full bg-gradient-to-r from-[#df548f] to-[#c83b74] text-white flex items-center justify-center shadow-sm flex-shrink-0">
                              <Check className="w-3.5 h-3.5 stroke-[3]" />
                            </span>
                          )}
                        </div>
                        <span className="text-xs text-slate-600 block leading-relaxed font-medium">
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
                <div className="p-6 sm:p-8 rounded-2xl bg-white border border-slate-200/90 shadow-3d relative overflow-hidden">
                  <div className="absolute top-0 right-0 px-4 py-1.5 bg-gradient-to-r from-[#df548f] to-[#c83b74] text-white text-[10px] font-sans uppercase font-bold tracking-wider rounded-bl-xl shadow-sm">
                    Tailored Match
                  </div>

                  <span className="text-[11px] font-sans uppercase tracking-[0.2em] text-[#c83b74] font-bold block mb-2">
                    Your Shirui Experience
                  </span>

                  <h3 className="font-serif text-2xl sm:text-3xl text-slate-900 font-bold mb-4">
                    {selectedGoal.treatment}
                  </h3>

                  {/* Config Summary Pills */}
                  <div className="grid grid-cols-2 sm:grid-cols-3 gap-3 mb-6 pt-4 border-t border-slate-200/80 text-xs">
                    <div>
                      <span className="text-slate-500 block uppercase tracking-wider text-[10px] font-bold font-sans">
                        Duration
                      </span>
                      <span className="font-bold text-slate-900 font-sans text-sm">
                        {selectedDuration.label}
                      </span>
                    </div>
                    <div>
                      <span className="text-slate-500 block uppercase tracking-wider text-[10px] font-bold font-sans">
                        Pressure
                      </span>
                      <span className="font-bold text-slate-900 font-sans text-sm">
                        {selectedPressure.label} Pressure
                      </span>
                    </div>
                    <div>
                      <span className="text-slate-500 block uppercase tracking-wider text-[10px] font-bold font-sans">
                        Approx. Price
                      </span>
                      <span className="font-bold text-[#c83b74] font-sans text-base">
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
                      className="inline-flex items-center justify-center gap-2 px-6 py-3.5 rounded-xl bg-white hover:bg-rose-50/60 border border-slate-200/90 text-sm font-sans font-bold text-slate-800 hover:text-rose transition-all flex-shrink-0 shadow-button-secondary-3d hover:-translate-y-0.5 active:translate-y-0.5"
                    >
                      <MessageCircle className="w-4 h-4 text-[#c83b74]" />
                      <span>WhatsApp Selection</span>
                    </a>
                  </div>
                </div>
              </motion.div>
            )}
          </AnimatePresence>

          {/* Navigation Controls (Steps 1 to 3) */}
          {step < 4 && (
            <div className="flex items-center justify-between pt-8 border-t border-slate-200/90 mt-8">
              {step > 1 ? (
                <Button variant="ghost" size="md" onClick={handlePrev} className="text-slate-700 hover:text-slate-900 font-bold">
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
