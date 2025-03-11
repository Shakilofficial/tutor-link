"use client";
import { Button } from "@/components/ui/button";
import { LampContainer } from "@/components/ui/core/Lamp";
import { Input } from "@/components/ui/input";
import { motion } from "framer-motion";
import { BookOpen, GraduationCap, Search } from "lucide-react";
import Link from "next/link";
import { AnimatedTooltipPreview } from "./Tooltip";

const Hero = () => {
  return (
    <LampContainer>
      <div className="w-full flex flex-col items-center text-center space-y-12 md:space-y-16">
        <motion.h1
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.5, duration: 0.8 }}
          className="text-3xl font-bold text-gray-700 dark:text-gray-200 md:text-5xl "
        >
          Find Your Tutor
        </motion.h1>
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.7, duration: 0.8 }}
          className="flex flex-col sm:flex-row items-center space-y-4 sm:space-y-0 sm:space-x-4"
        >
          <div className="relative w-full sm:w-80">
            <Input
              type="text"
              placeholder="Search for a subject or tutor..."
              className="w-full pl-10 pr-4 py-2 rounded-full"
            />
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground" />
          </div>
          <Link href="/tutors">
            <Button size="lg" className="w-full sm:w-auto rounded-full">
              Find a Tutor
            </Button>
          </Link>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.9, duration: 0.8 }}
          className="mt-6 flex justify-center items-center space-x-8"
        >
          <div className="text-center">
            <p className="text-4xl font-bold text-primary">100+</p>
            <p className="text-sm text-muted-foreground">Expert Tutors</p>
          </div>
          <div className="text-center">
            <p className="text-4xl font-bold text-primary">500+</p>
            <p className="text-sm text-muted-foreground">Happy Students</p>
          </div>
          <div className="text-center">
            <p className="text-4xl font-bold text-primary">50+</p>
            <p className="text-sm text-muted-foreground">Subjects</p>
          </div>
        </motion.div>
      </div>

      <div className="flex flex-col gap-6 sm:flex-row sm:gap-8 my-16">
        <Link href="/register-student" passHref>
          <Button size="lg" className="gap-2">
            <GraduationCap className="h-5 w-5" />
            Sign Up as a Student
          </Button>
        </Link>
        <Link href="/register-tutor" passHref>
          <Button variant="outline" size="lg" className="gap-2">
            <BookOpen className="h-5 w-5" />
            Register as a Tutor
          </Button>
        </Link>
      </div>
      <AnimatedTooltipPreview />
    </LampContainer>
  );
};

export default Hero;
