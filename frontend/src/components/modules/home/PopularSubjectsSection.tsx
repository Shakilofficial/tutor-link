"use client";

import { Button } from "@/components/ui/button";
import { motion } from "framer-motion";
import { ArrowRight } from "lucide-react";
import Link from "next/link";

const PopularSubjectsSection = () => {
  const subjects = [
    {
      name: "Mathematics",
      topics: ["Algebra", "Calculus", "Statistics", "Geometry"],
      color: "from-blue-500/20 to-blue-500/5",
      borderColor: "border-blue-500/20",
      hoverBorderColor: "group-hover:border-blue-500/50",
      textColor: "text-blue-500",
    },
    {
      name: "Science",
      topics: ["Physics", "Chemistry", "Biology", "Earth Science"],
      color: "from-green-500/20 to-green-500/5",
      borderColor: "border-green-500/20",
      hoverBorderColor: "group-hover:border-green-500/50",
      textColor: "text-green-500",
    },
    {
      name: "Languages",
      topics: ["English", "Spanish", "French", "Mandarin"],
      color: "from-purple-500/20 to-purple-500/5",
      borderColor: "border-purple-500/20",
      hoverBorderColor: "group-hover:border-purple-500/50",
      textColor: "text-purple-500",
    },
    {
      name: "Test Prep",
      topics: ["SAT", "ACT", "GRE", "GMAT"],
      color: "from-orange-500/20 to-orange-500/5",
      borderColor: "border-orange-500/20",
      hoverBorderColor: "group-hover:border-orange-500/50",
      textColor: "text-orange-500",
    },
    {
      name: "Computer Science",
      topics: ["Programming", "Web Development", "Data Science", "AI"],
      color: "from-cyan-500/20 to-cyan-500/5",
      borderColor: "border-cyan-500/20",
      hoverBorderColor: "group-hover:border-cyan-500/50",
      textColor: "text-cyan-500",
    },
    {
      name: "Arts & Music",
      topics: ["Drawing", "Painting", "Piano", "Guitar"],
      color: "from-pink-500/20 to-pink-500/5",
      borderColor: "border-pink-500/20",
      hoverBorderColor: "group-hover:border-pink-500/50",
      textColor: "text-pink-500",
    },
  ];

  const container = {
    hidden: { opacity: 0 },
    show: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
      },
    },
  };

  const item = {
    hidden: { opacity: 0, y: 20 },
    show: { opacity: 1, y: 0, transition: { duration: 0.5 } },
  };
  return (
    <section className="py-20 relative overflow-hidden">
      <div className="absolute inset-0 -z-10">
        <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-primary/5 rounded-full blur-3xl opacity-60" />
        <div className="absolute bottom-0 left-0 w-[500px] h-[500px] bg-orange-500/5 rounded-full blur-3xl opacity-60" />
      </div>
      <div className="flex flex-col md:flex-row md:items-end md:justify-between mb-16">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          viewport={{ once: true }}
          className="max-w-2xl"
        >
          <h2 className="text-3xl md:text-4xl font-bold mb-4 bg-gradient-to-r from-primary to-orange-500 bg-clip-text text-transparent">
            Popular Subjects
          </h2>
          <p className="text-lg text-muted-foreground">
            Browse our most popular subjects and find the perfect tutor to help
            you master any topic.
          </p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.2 }}
          viewport={{ once: true }}
        >
          <Button variant="outline" className="mt-4 md:mt-0" asChild>
            <Link href="#">
              View All Subjects
              <ArrowRight className="ml-2 h-4 w-4" />
            </Link>
          </Button>
        </motion.div>
      </div>

      <motion.div
        variants={container}
        initial="hidden"
        whileInView="show"
        viewport={{ once: true }}
        className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8"
      >
        {subjects.map((subject, index) => (
          <motion.div
            key={index}
            variants={item}
            className="group relative"
            whileHover={{ y: -5, transition: { duration: 0.2 } }}
          >
            <div
              className={`absolute inset-0 rounded-2xl bg-gradient-to-br ${subject.color} opacity-0 group-hover:opacity-100 transition-opacity duration-300`}
            />
            <div
              className={`relative bg-card border ${subject.borderColor} ${subject.hoverBorderColor} rounded-2xl p-6 h-full shadow-sm hover:shadow-md transition-all duration-300 z-10`}
            >
              <h3 className={`text-xl font-semibold mb-4 ${subject.textColor}`}>
                {subject.name}
              </h3>
              <ul className="space-y-2 mb-6">
                {subject.topics.map((topic, i) => (
                  <li key={i} className="flex items-center">
                    <div
                      className={`h-1.5 w-1.5 rounded-full ${subject.textColor} mr-2`}
                    />
                    <span className="text-muted-foreground">{topic}</span>
                  </li>
                ))}
              </ul>
              <Button
                variant="ghost"
                size="sm"
                className={`${subject.textColor}`}
                asChild
              >
                <Link href="/tutors">
                  Find Tutors
                  <ArrowRight className="ml-2 h-3 w-3" />
                </Link>
              </Button>
            </div>
          </motion.div>
        ))}
      </motion.div>
    </section>
  );
};

export default PopularSubjectsSection;
