import Features from "@/components/modules/home/Features";
import HeroSection from "@/components/modules/home/HeroSection";
import HowItWorksSection from "@/components/modules/home/HowItWorksSection";
import PopularSubjectsSection from "@/components/modules/home/PopularSubjectsSection";
import StatsSection from "@/components/modules/home/StatsSection";
import TestimonialsSection from "@/components/modules/home/TestimonialsSection";
import TrustedBySection from "@/components/modules/home/TrustedBySection";
import { getNewToken } from "@/services/authService";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Home | TutorLink",
  description:
    "Find your perfect tutor for personalized tutoring tailored to your needs.",
};

const HomePage = async () => {
  const result = await getNewToken();
  console.log(result);
  return (
    <main className="flex flex-col min-h-screen overflow-hidden my-12 space-y-10">
      <HeroSection />
      <TrustedBySection />
      <Features />
      <HowItWorksSection />
      <PopularSubjectsSection />
      <StatsSection />
      <TestimonialsSection />
    </main>
  );
};

export default HomePage;
