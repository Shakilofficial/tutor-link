"use client";

import SectionHeader from "@/components/core/SectionHeader";
import { motion, useScroll, useTransform } from "framer-motion";
import { Quote, Star } from "lucide-react";
import Image from "next/image";
import { useRef } from "react";

const SuccessStories = () => {
  const containerRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start end", "end start"],
  });

  const y = useTransform(scrollYProgress, [0, 1], [100, -100]);

  const stories = [
    {
      name: "Moshiur Rahman",
      role: "High School Student",
      image:
        "https://res.cloudinary.com/dcyupktj6/image/upload/v1728502285/avatars/slol5llrclurjsaivzum.png",
      quote:
        "TutorLink helped me raise my calculus grade from a C to an A- in just two months. My tutor explained concepts in ways that finally made sense to me!",
      improvement: "Grade improved from C to A-",
      subject: "Calculus",
    },
    {
      name: "Orna Islam Oishi",
      role: "Parent",
      image:
        "https://res.cloudinary.com/dcyupktj6/image/upload/v1741424371/dae0t0sdqt-1741424370016-profileImage-fe-avatar.jpg",
      quote:
        "Finding a qualified physics tutor for my son was a struggle until we discovered TutorLink. The platform made it easy to find someone who could adapt to his learning style.",
      improvement: "Confidence boost in physics",
      subject: "Physics",
    },
    {
      name: "Muhit Al Hasan",
      role: "College Student",
      image:
        "https://res.cloudinary.com/dcyupktj6/image/upload/v1741827520/l9xccnsbdd-1741827518173-thumbnail-avatar-tutorlink.png",
      quote:
        "As a first-generation college student, I needed extra help with my advanced courses. TutorLink connected me with tutors who not only helped me academically but also mentored me.",
      improvement: "Maintained 3.8 GPA",
      subject: "Computer Science",
    },
  ];
  return (
    <section ref={containerRef} className="py-20 relative overflow-hidden">
      <div className="absolute inset-0 bg-gradient-to-b from-background via-background/95 to-background" />

      <motion.div
        className="absolute top-40 left-20 w-72 h-72 bg-primary/5 rounded-full blur-3xl -z-10"
        style={{ y }}
      />
      <motion.div
        className="absolute bottom-40 right-20 w-72 h-72 bg-orange-500/5 rounded-full blur-3xl -z-10"
        style={{ y: useTransform(scrollYProgress, [0, 1], [-100, 100]) }}
      />

      <div className="container mx-auto px-4 relative z-10">
        <motion.div
          className="text-center max-w-3xl mx-auto mb-16"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
        >
          <SectionHeader
            title="Success Stories"
            subtitle="Real stories from students and parents who have experienced the
            transformative power of personalized tutoring through our platform."
          />
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {stories.map((story, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 50 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: index * 0.2 }}
              viewport={{ once: true }}
              className="bg-card border border-border/50 rounded-xl overflow-hidden shadow-lg hover:shadow-xl transition-all duration-300"
            >
              <div className="p-8 relative">
                <Quote className="absolute top-6 right-6 h-12 w-12 text-primary/10" />

                <div className="flex items-center mb-6">
                  <div className="relative h-16 w-16 rounded-full overflow-hidden border-2 border-primary/20 mr-4">
                    <Image
                      src={story.image || "/placeholder.svg"}
                      alt={story.name}
                      fill
                      className="object-cover"
                    />
                  </div>
                  <div>
                    <h3 className="text-lg font-semibold">{story.name}</h3>
                    <p className="text-sm text-muted-foreground">
                      {story.role}
                    </p>
                  </div>
                </div>

                <p className="text-muted-foreground mb-6 italic">
                  {story.quote}
                </p>

                <div className="bg-accent/30 rounded-lg p-4">
                  <div className="flex items-center mb-2">
                    <Star className="h-4 w-4 text-amber-500 mr-1 fill-amber-500" />
                    <span className="text-sm font-medium">
                      {story.improvement}
                    </span>
                  </div>
                  <p className="text-xs text-muted-foreground">
                    Subject: {story.subject}
                  </p>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default SuccessStories;
