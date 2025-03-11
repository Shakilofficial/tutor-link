import AnimatedTestimonials from "@/components/core/AnimatedTestimonials";
import SectionHeader from "@/components/core/SectionHeader";
import { getAllReviews } from "@/services/reviewService";

const Testimonials = async () => {
  const { data: testimonials } = await getAllReviews();

  return (
    <section className="container my-16">
      <SectionHeader title="Testimonials" subtitle="What our students say" />
      <AnimatedTestimonials testimonials={testimonials} />
    </section>
  );
};

export default Testimonials;
