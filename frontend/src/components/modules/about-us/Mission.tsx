"use client";

import ontut from "@/assets/tutor.jpg";
import { motion } from "framer-motion";
import { BookOpen, Shield, Star, Users } from "lucide-react";
import Image from "next/image";

const Mission = () => {
  const fadeIn = {
    hidden: { opacity: 0, y: 20 },
    visible: (i: number) => ({
      opacity: 1,
      y: 0,
      transition: {
        delay: 0.1 * i,
        duration: 0.8,
        ease: "easeOut",
      },
    }),
  };

  const values = [
    {
      icon: <BookOpen className="h-8 w-8 text-primary" />,
      title: "Educational Excellence",
      description:
        "We're committed to maintaining the highest standards of educational quality across our platform.",
    },
    {
      icon: <Users className="h-8 w-8 text-primary" />,
      title: "Personalized Learning",
      description:
        "We believe that education should be tailored to each student's unique needs, learning style, and goals.",
    },
    {
      icon: <Star className="h-8 w-8 text-primary" />,
      title: "Accessibility",
      description:
        "We strive to make quality education accessible to all students, regardless of location or background.",
    },
    {
      icon: <Shield className="h-8 w-8 text-primary" />,
      title: "Trust & Safety",
      description:
        "We prioritize creating a safe, secure environment for both students and tutors on our platform.",
    },
  ];

  return (
    <section className="py-20 relative overflow-hidden">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
            className="relative"
          >
            <div className="absolute -top-10 -left-10 w-64 h-64 bg-primary/5 rounded-full blur-3xl -z-10" />
            <div className="relative h-[400px] w-full rounded-2xl overflow-hidden shadow-xl">
              <Image
                src={ontut}
                alt="Students learning together"
                fill
                className="object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/20 to-transparent" />
              <div className="absolute bottom-8 left-8 right-8">
                <h3 className="text-white text-2xl font-bold mb-2">
                  Our Mission
                </h3>
                <p className="text-white/90 text-sm">
                  To democratize education by connecting students with qualified
                  tutors who can provide personalized learning experiences that
                  inspire growth and achievement.
                </p>
              </div>
            </div>
          </motion.div>

          <div>
            <motion.h2
              className="text-3xl font-bold mb-6 bg-gradient-to-r from-primary to-orange-500 bg-clip-text text-transparent"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8 }}
              viewport={{ once: true }}
            >
              Guided by Purpose, Driven by Values
            </motion.h2>

            <motion.p
              className="text-muted-foreground mb-8"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.2 }}
              viewport={{ once: true }}
            >
              At TutorLink, we believe that everyone deserves access to quality
              education. Our platform is built on the foundation of connecting
              passionate educators with eager learners to create meaningful
              educational experiences that transcend traditional boundaries.
            </motion.p>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {values.map((value, index) => (
                <motion.div
                  key={index}
                  custom={index}
                  variants={fadeIn}
                  initial="hidden"
                  whileInView="visible"
                  viewport={{ once: true }}
                  className="bg-card border border-border/50 rounded-xl p-6 shadow-sm hover:shadow-md transition-shadow duration-300"
                >
                  <div className="bg-primary/10 rounded-full w-14 h-14 flex items-center justify-center mb-4">
                    {value.icon}
                  </div>
                  <h3 className="text-xl font-semibold mb-2">{value.title}</h3>
                  <p className="text-muted-foreground text-sm">
                    {value.description}
                  </p>
                </motion.div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Mission;
