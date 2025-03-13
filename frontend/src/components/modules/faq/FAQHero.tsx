"use client";
import { motion } from "framer-motion";

const FAQHero = () => {
  return (
    <section className="relative py-20 md:py-28 overflow-hidden">
      <div className="absolute inset-0 bg-gradient-to-b from-background via-background to-accent/0.5 -z-10" />

      <div className="absolute top-20 right-10 w-72 h-72 bg-primary/10 rounded-full blur-3xl -z-10" />
      <div className="absolute bottom-10 left-10 w-60 h-60 bg-orange-500/10 rounded-full blur-3xl -z-10" />

      <div className="container mx-auto px-4">
        <motion.div
          className="max-w-3xl mx-auto text-center"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
        >
          <motion.h1
            className="text-4xl md:text-5xl font-bold mb-6 bg-gradient-to-r from-primary to-orange-500 bg-clip-text text-transparent"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
          >
            Frequently Asked Questions
          </motion.h1>

          <motion.p
            className="text-lg text-muted-foreground mb-8"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.4 }}
          >
            Find answers to common questions about TutorLink&apos;s platform,
            services, and policies.
          </motion.p>
        </motion.div>
      </div>
    </section>
  );
};

export default FAQHero;
