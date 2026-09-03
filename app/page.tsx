"use client";

import React, { useState } from "react";
import { Navbar } from "@/components/layout/Navbar";
import { Hero } from "@/components/hero/Hero";
import { ExperienceStats } from "@/components/stats/ExperienceStats";
import { AboutShirui } from "@/components/about/AboutShirui";
import { ExperienceSelector } from "@/components/treatments/ExperienceSelector";
import { AnatomyExperience } from "@/components/anatomy/AnatomyExperience";
import { ExperienceTabs } from "@/components/story/ExperienceTabs";
import { CinematicStory } from "@/components/story/CinematicStory";
import { WhyShirui } from "@/components/trust/WhyShirui";
import { SessionConfigurator } from "@/components/configurator/SessionConfigurator";
import { SignatureExperience } from "@/components/signature/SignatureExperience";
import { OfferSection } from "@/components/offers/OfferSection";
import { BeforeDuringAfter } from "@/components/journey/BeforeDuringAfter";
import { SpaGallery } from "@/components/gallery/SpaGallery";
import { Reviews } from "@/components/reviews/Reviews";
import { Location } from "@/components/location/Location";
import { FAQ } from "@/components/faq/FAQ";
import { FinalCTA } from "@/components/cta/FinalCTA";
import { Footer } from "@/components/layout/Footer";
import { MobileConversionBar } from "@/components/layout/MobileConversionBar";
import { BookingModal } from "@/components/booking/BookingModal";

export default function HomePage() {
  const [bookingModalOpen, setBookingModalOpen] = useState(false);
  const [preselectedTreatment, setPreselectedTreatment] = useState<string | undefined>();
  const [preselectedDuration, setPreselectedDuration] = useState<number | undefined>();

  const handleOpenBooking = (initialTreatment?: string, initialDuration?: number) => {
    setPreselectedTreatment(initialTreatment);
    setPreselectedDuration(initialDuration);
    setBookingModalOpen(true);
  };

  const handleCloseBooking = () => {
    setBookingModalOpen(false);
  };

  return (
    <main className="relative bg-obsidian text-cream flex flex-col min-h-screen">
      {/* 1. Fixed Navigation Header */}
      <Navbar onOpenBooking={handleOpenBooking} />

      {/* 2. Hero Section */}
      <Hero onOpenBooking={handleOpenBooking} />

      {/* 3. Experience Snapshot Metrics */}
      <ExperienceStats />

      {/* 4. Brand Introduction */}
      <AboutShirui onOpenBooking={handleOpenBooking} />

      {/* 5. Treatment Discovery & Side Drawer */}
      <ExperienceSelector onOpenBooking={handleOpenBooking} />

      {/* 6. Signature Anatomical Interactive Simulation */}
      <AnatomyExperience onOpenBooking={handleOpenBooking} />

      {/* 7. Feel The Difference Feature Tabs */}
      <ExperienceTabs />

      {/* 8. Cinematic Story Chapters (Arrive, Breathe, Restore) */}
      <CinematicStory />

      {/* 9. Why Shirui Trust Cards */}
      <WhyShirui />

      {/* 10. 4-Step Session Configurator */}
      <SessionConfigurator onOpenBooking={handleOpenBooking} />

      {/* 11. Flagship 90-Minute Signature Experience */}
      <SignatureExperience onOpenBooking={handleOpenBooking} />

      {/* 12. Active Special Offer Section */}
      <OfferSection onOpenBooking={handleOpenBooking} />

      {/* 13. Before / During / After Journey Guide */}
      <BeforeDuringAfter />

      {/* 14. Draggable Spa Gallery & Fullscreen Lightbox */}
      <SpaGallery />

      {/* 15. Guest Reviews & Google Rating */}
      <Reviews />

      {/* 16. Location, Timings & Interactive Map */}
      <Location onOpenBooking={handleOpenBooking} />

      {/* 17. Frequently Asked Questions Accordion */}
      <FAQ />

      {/* 18. Final Cinematic Closing CTA */}
      <FinalCTA onOpenBooking={handleOpenBooking} />

      {/* 19. Complete 4-Column Footer */}
      <Footer />

      {/* 20. Mobile Persistent Conversion Bar (Call / WhatsApp / Directions) */}
      <MobileConversionBar hide={bookingModalOpen} />

      {/* 21. Global Accessible Booking Modal */}
      <BookingModal
        isOpen={bookingModalOpen}
        onClose={handleCloseBooking}
        initialTreatment={preselectedTreatment}
        initialDuration={preselectedDuration}
      />
    </main>
  );
}
