"use client";

import SectionHeader from "@/components/core/SectionHeader";
import { motion, useScroll, useTransform } from "framer-motion";
import { BookOpen, GraduationCap, Star, Users } from "lucide-react";
import { useRef } from "react";

const StatsSection = () => {
  const containerRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start end", "end start"],
  });

  const y = useTransform(scrollYProgress, [0, 1], [100, -100]);
  const opacity = useTransform(scrollYProgress, [0, 0.5, 1], [0.6, 1, 0.6]);

  const stats = [
    {
      icon: <Users className="h-8 w-8 text-primary" />,
      value: "50,000+",
      label: "Happy Students",
      description: "Students who have improved their grades",
    },
    {
      icon: <BookOpen className="h-8 w-8 text-orange-500" />,
      value: "100+",
      label: "Subjects",
      description: "From math to music, we've got you covered",
    },
    {
      icon: <Star className="h-8 w-8 text-amber-500" />,
      value: "4.9",
      label: "Average Rating",
      description: "Based on thousands of reviews",
    },
    {
      icon: <GraduationCap className="h-8 w-8 text-blue-500" />,
      value: "5,000+",
      label: "Expert Tutors",
      description: "Qualified and experienced educators",
    },
  ];
  return (
    <section ref={containerRef} className="py-20 relative overflow-hidden">
      <motion.div
        className="absolute top-40 left-20 w-72 h-72 bg-primary/5 rounded-full blur-3xl -z-10"
        style={{ y }}
      />
      <motion.div
        className="absolute bottom-40 right-20 w-72 h-72 bg-orange-500/5 rounded-full blur-3xl -z-10"
        style={{ y: useTransform(scrollYProgress, [0, 1], [-100, 100]) }}
      />

      <motion.div style={{ opacity }} className="container px-4 mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          viewport={{ once: true }}
          className="text-center max-w-3xl mx-auto mb-16"
        >
          <SectionHeader
            title="TutorLink by the Numbers"
            subtitle="Our growing community of students and tutors is making a difference
            in education every day."
          />
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {stats.map((stat, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              viewport={{ once: true }}
              className="bg-card border border-border/50 rounded-2xl p-8 text-center shadow-sm hover:shadow-md transition-all duration-300"
            >
              <div className="inline-flex h-16 w-16 items-center justify-center rounded-full bg-primary/10 mb-6">
                {stat.icon}
              </div>
              <motion.h3
                initial={{ opacity: 0, scale: 0.5 }}
                whileInView={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.5, delay: index * 0.1 + 0.2 }}
                viewport={{ once: true }}
                className="text-4xl font-bold mb-2"
              >
                {stat.value}
              </motion.h3>
              <p className="text-lg font-medium mb-2">{stat.label}</p>
              <p className="text-sm text-muted-foreground">
                {stat.description}
              </p>
            </motion.div>
          ))}
        </div>
      </motion.div>
    </section>
  );
};

export default StatsSection;
