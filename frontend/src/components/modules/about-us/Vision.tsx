"use client";

import SectionHeader from "@/components/core/SectionHeader";
import { motion, useScroll, useTransform } from "framer-motion";
import { BookOpen, Globe, Lightbulb, TrendingUp } from "lucide-react";
import { useRef } from "react";

const Vision = () => {
  const containerRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start end", "end start"],
  });

  const opacity = useTransform(scrollYProgress, [0, 0.5, 1], [0.6, 1, 0.6]);

  const visionItems = [
    {
      icon: <Globe className="h-8 w-8 text-primary" />,
      title: "Global Reach",
      description:
        "Expanding our platform to connect students and tutors across the globe, breaking down geographical barriers to quality education.",
    },
    {
      icon: <BookOpen className="h-8 w-8 text-primary" />,
      title: "Subject Expansion",
      description:
        "Continuously adding new subjects and specialties to meet the diverse learning needs of students at all levels.",
    },
    {
      icon: <TrendingUp className="h-8 w-8 text-primary" />,
      title: "Advanced Technology",
      description:
        "Leveraging AI and data analytics to create more personalized learning experiences and match students with the perfect tutors.",
    },
    {
      icon: <Lightbulb className="h-8 w-8 text-primary" />,
      title: "Community Building",
      description:
        "Creating a vibrant community where educators and learners can share resources, insights, and support each other's growth.",
    },
  ];
  return (
    <section ref={containerRef} className="py-20 relative overflow-hidden">
      <div className="absolute " />

      <motion.div
        style={{ opacity }}
        className="container mx-auto px-4 relative z-10"
      >
        <motion.div
          className="text-center max-w-3xl mx-auto mb-16"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
        >
          <SectionHeader
            title="Our Vision for the Future"
            subtitle=" We're just getting started. Here's where we're headed
            as we continue to transform education through connection."
          />
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {visionItems.map((item, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: index * 0.1 }}
              viewport={{ once: true }}
              className="bg-card/80 backdrop-blur-sm border border-border/50 rounded-xl p-8 shadow-md hover:shadow-lg transition-all duration-300"
            >
              <div className="bg-primary/10 rounded-full w-16 h-16 flex items-center justify-center mb-6">
                {item.icon}
              </div>
              <h3 className="text-xl font-semibold mb-3">{item.title}</h3>
              <p className="text-muted-foreground">{item.description}</p>
            </motion.div>
          ))}
        </div>

        <motion.div
          className="mt-16 text-center"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.4 }}
          viewport={{ once: true }}
        >
          <p className="text-lg text-muted-foreground italic">
            Our ultimate goal is to create a world where quality education is
            accessible to everyone, and where passionate educators can thrive by
            sharing their knowledge and expertise.
          </p>
          <p className="mt-4 font-semibold">
            — Md Shakil Hossain, Founder & CEO
          </p>
        </motion.div>
      </motion.div>
    </section>
  );
};

export default Vision;
