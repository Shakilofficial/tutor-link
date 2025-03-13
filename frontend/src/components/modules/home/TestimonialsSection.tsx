"use client";

import SectionHeader from "@/components/core/SectionHeader";
import { Button } from "@/components/ui/button";
import { AnimatePresence, motion } from "framer-motion";
import { ChevronLeft, ChevronRight, Star } from "lucide-react";
import Image from "next/image";
import { useEffect, useState } from "react";

const TestimonialsSection = () => {
  const testimonials = [
    {
      quote:
        "My math grades improved from a C to an A- in just two months of tutoring. My tutor explains concepts in a way that finally makes sense to me!",
      author: "Rupok Ahmed",
      role: "High School Student",
      avatar:
        "https://res.cloudinary.com/dcyupktj6/image/upload/v1728502285/avatars/slol5llrclurjsaivzum.png",
      subject: "Mathematics",
      rating: 5,
    },
    {
      quote:
        "As a parent, I was struggling to help my child with their homework. TutorLink connected us with an amazing science tutor who has made learning fun again.",
      author: "Mahid Hasan",
      role: "Parent",
      avatar:
        "https://res.cloudinary.com/dcyupktj6/image/upload/v1728502257/avatars/k0iqfes5ib0r8mbvterg.avif",
      subject: "Science",
      rating: 5,
    },
    {
      quote:
        "I've been tutoring on TutorLink for over a year now. The platform makes it easy to connect with students and manage my schedule.",
      author: "Md. Shofiqul Islam",
      role: "Physics Tutor",
      avatar:
        "https://res.cloudinary.com/dcyupktj6/image/upload/v1728506293/avatars/bucohomkt90ovyisyxkt.webp",
      subject: "Physics",
      rating: 5,
    },
    {
      quote:
        "TutorLink helped me prepare for my college entrance exams. My tutor was patient, knowledgeable, and really cared about my success.",
      author: "Mir Hossain",
      role: "College Freshman",
      avatar:
        "https://res.cloudinary.com/dcyupktj6/image/upload/v1728503901/avatars/zelpsdb5rzpgrobkycwc.jpg",
      subject: "Test Prep",
      rating: 5,
    },
  ];

  const [currentIndex, setCurrentIndex] = useState(0);
  const [direction, setDirection] = useState(0);
  const [autoplay, setAutoplay] = useState(true);

  useEffect(() => {
    if (!autoplay) return;

    const interval = setInterval(() => {
      setDirection(1);
      setCurrentIndex((prevIndex) => (prevIndex + 1) % testimonials.length);
    }, 5000);

    return () => clearInterval(interval);
  }, [autoplay, testimonials.length]);

  const handlePrevious = () => {
    setAutoplay(false);
    setDirection(-1);
    setCurrentIndex(
      (prevIndex) => (prevIndex - 1 + testimonials.length) % testimonials.length
    );
  };

  const handleNext = () => {
    setAutoplay(false);
    setDirection(1);
    setCurrentIndex((prevIndex) => (prevIndex + 1) % testimonials.length);
  };

  const variants = {
    enter: (direction: number) => ({
      x: direction > 0 ? 1000 : -1000,
      opacity: 0,
    }),
    center: {
      x: 0,
      opacity: 1,
    },
    exit: (direction: number) => ({
      x: direction < 0 ? 1000 : -1000,
      opacity: 0,
    }),
  };

  return (
    <section className="py-20 bg-accent/0.5 relative overflow-hidden">
      <div className="absolute top-0 left-0 w-full h-20 bg-gradient-to-b from-background to-transparent" />
      <div className="absolute bottom-0 left-0 w-full h-20 bg-gradient-to-t from-background to-transparent" />

      <div className="container px-4 mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          viewport={{ once: true }}
          className="text-center max-w-3xl mx-auto mb-16"
        >
          <SectionHeader
            title="Success Stories"
            subtitle="Hear from students and parents who have experienced the TutorLink difference."
          />
        </motion.div>

        <div className="relative max-w-4xl mx-auto">
          <div className="relative h-[400px] overflow-hidden">
            <AnimatePresence custom={direction} initial={false}>
              <motion.div
                key={currentIndex}
                custom={direction}
                variants={variants}
                initial="enter"
                animate="center"
                exit="exit"
                transition={{ type: "spring", stiffness: 300, damping: 30 }}
                className="absolute inset-0 flex items-center justify-center"
              >
                <div className="bg-card border border-border/50 rounded-2xl p-8 shadow-lg max-w-3xl">
                  <div className="flex flex-col md:flex-row gap-6 items-start">
                    <div className="flex-shrink-0">
                      <div className="relative w-20 h-20 rounded-full overflow-hidden border-4 border-primary/20">
                        <Image
                          src={
                            testimonials[currentIndex].avatar ||
                            "/placeholder.svg"
                          }
                          alt={testimonials[currentIndex].author}
                          fill
                          className="object-cover"
                        />
                      </div>
                    </div>
                    <div className="flex-1">
                      <div className="flex mb-4">
                        {[...Array(testimonials[currentIndex].rating)].map(
                          (_, i) => (
                            <Star
                              key={i}
                              className="h-5 w-5 fill-amber-400 text-amber-400"
                            />
                          )
                        )}
                      </div>
                      <blockquote className="text-lg italic mb-6">
                        {testimonials[currentIndex].quote}
                      </blockquote>
                      <div>
                        <p className="font-semibold">
                          {testimonials[currentIndex].author}
                        </p>
                        <div className="flex items-center gap-2 text-sm text-muted-foreground">
                          <span>{testimonials[currentIndex].role}</span>
                          <span className="h-1 w-1 rounded-full bg-muted-foreground"></span>
                          <span>{testimonials[currentIndex].subject}</span>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </motion.div>
            </AnimatePresence>
          </div>

          <div className="flex justify-center mt-8 gap-4">
            <Button
              variant="outline"
              size="icon"
              onClick={handlePrevious}
              className="rounded-full h-10 w-10"
            >
              <ChevronLeft className="h-5 w-5" />
              <span className="sr-only">Previous</span>
            </Button>

            <div className="flex items-center gap-2">
              {testimonials.map((_, index) => (
                <button
                  key={index}
                  onClick={() => {
                    setAutoplay(false);
                    setDirection(index > currentIndex ? 1 : -1);
                    setCurrentIndex(index);
                  }}
                  className={`h-2.5 rounded-full transition-all duration-300 ${
                    index === currentIndex
                      ? "w-8 bg-primary"
                      : "w-2.5 bg-primary/30"
                  }`}
                  aria-label={`Go to slide ${index + 1}`}
                />
              ))}
            </div>

            <Button
              variant="outline"
              size="icon"
              onClick={handleNext}
              className="rounded-full h-10 w-10"
            >
              <ChevronRight className="h-5 w-5" />
              <span className="sr-only">Next</span>
            </Button>
          </div>
        </div>
      </div>
    </section>
  );
};

export default TestimonialsSection;
