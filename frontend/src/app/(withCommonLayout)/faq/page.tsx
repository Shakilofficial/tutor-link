import FAQCategories from "@/components/modules/faq/FAQCategories";
import FAQContact from "@/components/modules/faq/FAQContact";
import FAQHero from "@/components/modules/faq/FAQHero";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "FAQ | TutorLink",
  description:
    "Find answers to frequently asked questions about TutorLink's tutoring services, payments, and more.",
};
const FAQPage = () => {
  return (
    <main className="flex flex-col min-h-screen overflow-hidden my-12 space-y-10">
      <FAQHero />
      <FAQCategories />
      <FAQContact />
    </main>
  );
};

export default FAQPage;
