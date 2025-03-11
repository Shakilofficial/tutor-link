/* eslint-disable react-hooks/exhaustive-deps */
"use client";

import { Testimonial } from "@/types/testimonial";
import { IconArrowLeft, IconArrowRight } from "@tabler/icons-react";
import { AnimatePresence, motion } from "framer-motion";
import { Star } from "lucide-react";
import Image from "next/image";
import { useEffect, useState } from "react";

export const AnimatedTestimonials = ({
  testimonials,
  autoplay = false,
}: {
  testimonials: Testimonial[];
  autoplay?: boolean;
}) => {
  const [active, setActive] = useState(0);

  const handleNext = () => {
    setActive((prev) => (prev + 1) % testimonials.length);
  };

  const handlePrev = () => {
    setActive((prev) => (prev - 1 + testimonials.length) % testimonials.length);
  };

  useEffect(() => {
    if (autoplay) {
      const interval = setInterval(handleNext, 5000);
      return () => clearInterval(interval);
    }
  }, [autoplay]);

  return (
    <div className="max-w-sm md:max-w-4xl mx-auto px-4 md:px-8 lg:px-12 py-12">
      <div className="relative grid grid-cols-1 md:grid-cols-2 gap-12 md:gap-20 items-center">
        {/* Image Section */}
        <div className="relative h-80 w-full">
          <AnimatePresence>
            {testimonials.map((testimonial, index) => (
              <motion.div
                key={testimonial._id}
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{
                  opacity: active === index ? 1 : 0.7,
                  scale: active === index ? 1 : 0.95,
                }}
                exit={{ opacity: 0, scale: 0.9 }}
                transition={{ duration: 0.4, ease: "easeInOut" }}
                className="absolute inset-0"
              >
                <Image
                  src={
                    testimonial.student.user.profileImage || "/placeholder.svg"
                  }
                  alt={testimonial.student.user.name}
                  fill
                  draggable={false}
                  className="rounded-3xl object-cover object-center"
                />
              </motion.div>
            ))}
          </AnimatePresence>
        </div>

        {/* Testimonial Content Section */}
        <div className="flex justify-between flex-col py-4">
          <motion.div
            key={active}
            initial={{ y: 20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            exit={{ y: -20, opacity: 0 }}
            transition={{ duration: 0.2, ease: "easeInOut" }}
          >
            <h3 className="text-xl font-bold text-foreground">
              {testimonials[active].student.user.name}
            </h3>
            <div className="flex items-center mt-2">
              {[...Array(5)].map((_, i) => (
                <Star
                  key={i}
                  className={`h-5 w-5 ${
                    i < testimonials[active].rating
                      ? "text-amber-400 fill-current"
                      : "text-muted-foreground/30"
                  }`}
                />
              ))}
            </div>
            <motion.p className="text-lg text-muted-foreground mt-6">
              {testimonials[active].comment}
            </motion.p>
          </motion.div>

          {/* Navigation Buttons */}
          <div className="flex gap-4 pt-8">
            <button
              onClick={handlePrev}
              className="h-10 w-10 rounded-full bg-primary/10 hover:bg-primary/20 flex items-center justify-center group transition-colors duration-300"
            >
              <IconArrowLeft className="h-5 w-5 text-primary group-hover:scale-110 transition-transform duration-300" />
            </button>
            <button
              onClick={handleNext}
              className="h-10 w-10 rounded-full bg-primary/10 hover:bg-primary/20 flex items-center justify-center group transition-colors duration-300"
            >
              <IconArrowRight className="h-5 w-5 text-primary group-hover:scale-110 transition-transform duration-300" />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AnimatedTestimonials;
