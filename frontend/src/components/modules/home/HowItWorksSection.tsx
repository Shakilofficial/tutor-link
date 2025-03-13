"use client";

import tutorRead from "@/assets/home.png";
import ontut from "@/assets/on-tut.png";
import tutorschdule from "@/assets/online-tutoring-image.png";
import pntut from "@/assets/tsucc.png";
import SectionHeader from "@/components/core/SectionHeader";
import { motion } from "framer-motion";
import { BookOpen, Calendar, MessageSquare, Search } from "lucide-react";
import Image from "next/image";
const HowItWorksSection = () => {
  const steps = [
    {
      icon: <Search className="h-8 w-8 text-white" />,
      title: "Find a Tutor",
      description:
        "Search for tutors by subject, grade level, price, or availability.",
      color: "bg-primary",
      image: tutorRead,
    },
    {
      icon: <Calendar className="h-8 w-8 text-white" />,
      title: "Schedule a Session",
      description:
        "Book a session at a time that works for you, online or in-person.",
      color: "bg-orange-500",
      image: tutorschdule,
    },
    {
      icon: <BookOpen className="h-8 w-8 text-white" />,
      title: "Learn & Improve",
      description:
        "Receive personalized instruction tailored to your learning style.",
      color: "bg-blue-500",
      image: ontut,
    },
    {
      icon: <MessageSquare className="h-8 w-8 text-white" />,
      title: "Provide Feedback",
      description:
        "Rate your experience and help other students find great tutors.",
      color: "bg-green-500",
      image: pntut,
    },
  ];
  return (
    <section className="py-20 relative overflow-hidden">
      <div className="absolute top-0 left-0 w-full h-20 bg-gradient-to-b from-accent/0.5 to-transparent" />

      <div className="container px-4 mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          viewport={{ once: true }}
          className="text-center max-w-3xl mx-auto mb-16"
        >
          <SectionHeader
            title="How TutorLink Works"
            subtitle="Getting started is easy. Follow these simple steps to begin your learning journey."
          />
        </motion.div>

        <div className="space-y-20">
          {steps.map((step, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 50 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7 }}
              viewport={{ once: true, margin: "-100px" }}
              className={`flex flex-col ${
                index % 2 === 0 ? "lg:flex-row" : "lg:flex-row-reverse"
              } items-center gap-12`}
            >
              <div className="flex-1">
                <div className="max-w-lg">
                  <div
                    className={`inline-flex h-16 w-16 items-center justify-center rounded-2xl ${step.color} mb-6`}
                  >
                    {step.icon}
                    <span className="sr-only">{step.title}</span>
                  </div>

                  <h3 className="text-2xl font-bold mb-4">
                    <span className="text-primary mr-2">0{index + 1}.</span>{" "}
                    {step.title}
                  </h3>

                  <p className="text-lg text-muted-foreground mb-6">
                    {step.description}
                  </p>

                  <ul className="space-y-2">
                    {[1, 2, 3].map((item) => (
                      <li key={item} className="flex items-center">
                        <div className="h-2 w-2 rounded-full bg-primary mr-3" />
                        <span className="text-muted-foreground">
                          Feature point {item} for {step.title.toLowerCase()}
                        </span>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>

              <div className="flex-1">
                <motion.div
                  whileHover={{ scale: 1.03 }}
                  transition={{ type: "spring", stiffness: 300, damping: 10 }}
                  className="relative rounded-2xl overflow-hidden border border-border shadow-xl"
                >
                  <div className="absolute inset-0 bg-gradient-to-br from-primary/10 to-orange-500/10 mix-blend-overlay" />
                  <Image
                    src={step.image || "/placeholder.svg"}
                    alt={step.title}
                    width={500}
                    height={350}
                    className="w-full h-auto"
                  />
                </motion.div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default HowItWorksSection;
