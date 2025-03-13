import AboutHero from "@/components/modules/about-us/AboutHero";
import Mission from "@/components/modules/about-us/Mission";
import OfficeLocation from "@/components/modules/about-us/OfficeLocation";
import SuccessStories from "@/components/modules/about-us/SuccessStories";
import Team from "@/components/modules/about-us/Team";
import Vision from "@/components/modules/about-us/Vision";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "About Us | TutorLink",
  description:
    "Learn about TutorLink's mission, team, and vision for transforming education through personalized tutoring.",
};
const AboutUsPage = () => {
  return (
    <main className="flex flex-col min-h-screen overflow-hidden my-12 space-y-10">
      <AboutHero />
      <Mission />
      <Team />
      <SuccessStories />
      <Vision />
      <OfficeLocation />
    </main>
  );
};

export default AboutUsPage;
