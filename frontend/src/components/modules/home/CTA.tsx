"use client";

import { Button } from "@/components/ui/button";
import { motion } from "framer-motion";
import { BookOpen, GraduationCap } from "lucide-react";

const CTA = () => {
  return (
    <section className="relative overflow-hidden my-16">
      {/* Animated Background Gradient */}
      <motion.div
        className="absolute inset-0 bg-gradient-to-r from-primary/20 to-amber-500/20 -z-10"
        animate={{ opacity: [0.8, 1, 0.8] }}
        transition={{ duration: 5, repeat: Infinity, ease: "easeInOut" }}
      />

      <div className="container flex flex-col items-center gap-8 py-16 text-center md:py-24">
        {/* Animated Heading */}
        <motion.h2
          className="font-bold text-3xl leading-[1.1] md:text-4xl lg:text-4xl max-w-4xl"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.2 }}
        >
          Ready to transform your learning experience?
        </motion.h2>

        {/* Animated Paragraph */}
        <motion.p
          className="leading-normal text-muted-foreground md:text-xl md:leading-8"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.4 }}
        >
          Join thousands of students and tutors on TutorMatch today and start
          your journey to academic success.
        </motion.p>

        {/* Animated Buttons */}
        <motion.div
          className="flex flex-col sm:flex-row gap-4 mt-4"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.6 }}
        >
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            <Button size="lg" className="gap-2">
              <GraduationCap className="h-5 w-5" />
              Sign Up as a Student
            </Button>
          </motion.button>

          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            <Button variant="outline" size="lg" className="gap-2">
              <BookOpen className="h-5 w-5" />
              Register as a Tutor
            </Button>
          </motion.button>
        </motion.div>
      </div>
    </section>
  );
};

export default CTA;
