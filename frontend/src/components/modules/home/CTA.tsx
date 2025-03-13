"use client";

import { Button } from "@/components/ui/button";
import { motion } from "framer-motion";
import { BookOpen, GraduationCap } from "lucide-react";
import Link from "next/link";

const CTA = () => {
  return (
    <section className="py-20 relative overflow-hidden">
      <div className="absolute bg-gradient-to-r from-primary/0.5 to-orange-950/0.5" />

      <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-primary/10 rounded-full blur-3xl opacity-60 -z-10" />
      <div className="absolute bottom-0 left-0 w-[500px] h-[500px] bg-orange-500/10 rounded-full blur-3xl opacity-60 -z-10" />

      <div className="container px-4 mx-auto">
        <div className="max-w-4xl mx-auto bg-card border border-border/50 rounded-2xl p-10 shadow-xl relative overflow-hidden">
          <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-primary to-orange-500" />
          <div className="absolute -top-24 -right-24 w-48 h-48 bg-primary/20 rounded-full blur-3xl opacity-70" />
          <div className="absolute -bottom-24 -left-24 w-48 h-48 bg-orange-500/20 rounded-full blur-3xl opacity-70" />

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            viewport={{ once: true }}
            className="text-center relative z-10"
          >
            <h2 className="text-3xl md:text-4xl font-bold mb-6">
              Ready to transform your learning experience?
            </h2>
            <p className="text-lg text-muted-foreground mb-8 max-w-2xl mx-auto">
              Join thousands of students and tutors on TutorLink today and start
              your journey to academic success.
            </p>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.2 }}
              viewport={{ once: true }}
              className="flex flex-col sm:flex-row gap-4 justify-center"
            >
              <Button
                size="lg"
                className="gap-2 bg-gradient-to-r from-primary to-orange-500 hover:opacity-90 transition-opacity"
              >
                <GraduationCap className="h-5 w-5" />
                <Link href="/register-student">Sign Up as Student</Link>
              </Button>
              <Button
                variant="outline"
                size="lg"
                className="gap-2 border-primary/50 text-primary hover:bg-primary/10"
              >
                <BookOpen className="h-5 w-5" />
                <Link href="/register-tutor">Register as Tutor</Link>
              </Button>
            </motion.div>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default CTA;
