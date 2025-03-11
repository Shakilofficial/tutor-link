import CTA from "@/components/modules/home/CTA";
import Features from "@/components/modules/home/Features";
import Hero from "@/components/modules/home/Hero";
import Testimonials from "@/components/modules/home/Testimonials";
import { getNewToken } from "@/services/authService";

const HomePage = async () => {
  const result = await getNewToken();
  console.log(result);
  return (
    <div>
      <Hero />

      <Features />
      <CTA />
      <Testimonials />
    </div>
  );
};

export default HomePage;
