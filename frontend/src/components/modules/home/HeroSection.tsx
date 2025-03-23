"use client";
import heroImg from "@/assets/bc-tut.png";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { motion } from "framer-motion";
import { BookOpen, GraduationCap, Search } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { useState } from "react";

const HeroSection = () => {
  const [searchQuery, setSearchQuery] = useState("");

  return (
    <section className="relative pt-24 pb-20 overflow-hidden">
      <div className="absolute ">
        <div className="absolute top-0 -right-80 w-[640px] h-[640px]" />
        <div className="absolute -bottom-40 -left-40 w-[640px] h-[640px]" />
        <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-full h-full bg-[radial-gradient(ellipse_at_center,rgba(251,146,60,0.05),transparent_50%)]" />
      </div>

      <div className="container px-4 mx-auto relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="text-center lg:text-left"
          >
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2, duration: 0.8 }}
              className="inline-block px-4 py-1.5 mb-6 rounded-full bg-primary/10 text-primary text-sm font-medium"
            >
              #1 Tutoring Platform for Students
            </motion.div>

            <motion.h1
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3, duration: 0.8 }}
              className="text-4xl md:text-5xl lg:text-6xl font-bold mb-6 leading-tight"
            >
              Find Your Perfect <br />
              <span className="bg-gradient-to-r from-primary to-orange-500 bg-clip-text text-transparent">
                Tutor Match
              </span>
            </motion.h1>

            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.4, duration: 0.8 }}
              className="text-lg text-muted-foreground mb-8 max-w-lg mx-auto lg:mx-0"
            >
              Connect with qualified tutors for personalized learning
              experiences. Boost your grades and confidence with one-on-one
              tutoring tailored to your needs.
            </motion.p>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.5, duration: 0.8 }}
              className="relative max-w-md mx-auto lg:mx-0 mb-8"
            >
              <div className="relative">
                <div className="absolute inset-0 -z-10 rounded-lg bg-gradient-to-r from-primary/20 via-orange-500/20 to-primary/20 blur-md opacity-70" />
                <div className="flex items-center rounded-lg border bg-background/80 p-1.5 backdrop-blur">
                  <div className="flex w-full items-center gap-2 rounded-md bg-background px-3 py-2">
                    <Search className="h-5 w-5 text-muted-foreground" />
                    <Input
                      type="text"
                      placeholder="Search by subject, grade level, or tutor name..."
                      className="flex-1 border-0 bg-transparent p-0 shadow-none focus-visible:ring-0"
                      value={searchQuery}
                      onChange={(e) => setSearchQuery(e.target.value)}
                    />
                  </div>
                  <Button className="ml-auto">Search</Button>
                </div>
              </div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.6, duration: 0.8 }}
              className="flex flex-col sm:flex-row gap-4 justify-center lg:justify-start"
            >
              <Link href="/register-student" passHref>
                <Button
                  size="lg"
                  className="gap-2 bg-gradient-to-r from-primary to-orange-500 hover:opacity-90 transition-opacity"
                >
                  <GraduationCap className="h-5 w-5" />
                  Sign Up as Student
                </Button>
              </Link>
              <Link href="/register-tutor" passHref>
                <Button
                  variant="outline"
                  size="lg"
                  className="gap-2 border-primary/50 text-primary hover:bg-primary/10"
                >
                  <BookOpen className="h-5 w-5" />
                  Register as Tutor
                </Button>
              </Link>
            </motion.div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.3, duration: 0.8 }}
            className="relative"
          >
            <div className="relative h-[500px] w-full">
              <div className="absolute top-0 right-0 h-64 w-64 rounded-full blur-3xl -z-10" />
              <div className="absolute -bottom-10 -left-10 h-64 w-64 rounded-full blur-3xl -z-10" />

              <div className="absolute inset-0 flex items-center justify-center">
                <div className="relative w-full max-w-lg aspect-square">
                  <div className="absolute inset-0 rounded-2xl bg-gradient-to-r from-primary/20 to-orange-500/20 blur-xl opacity-70 animate-pulse" />
                  <div className="relative h-full w-full rounded-2xl overflow-hidden border border-primary/20 shadow-xl">
                    <Image
                      src={heroImg}
                      alt="Student learning with tutor"
                      fill
                      className="object-cover"
                    />
                  </div>

                  <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.7, duration: 0.8 }}
                    className="absolute -top-6 -left-6 bg-background rounded-lg p-3 shadow-lg border border-border"
                  >
                    <div className="flex items-center gap-2">
                      <div className="h-8 w-8 rounded-full bg-green-500/20 flex items-center justify-center">
                        <GraduationCap className="h-4 w-4 text-green-500" />
                      </div>
                      <div>
                        <div className="text-sm font-medium">500+</div>
                        <div className="text-xs text-muted-foreground">
                          Expert Tutors
                        </div>
                      </div>
                    </div>
                  </motion.div>

                  <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.8, duration: 0.8 }}
                    className="absolute -bottom-6 -right-6 bg-background rounded-lg p-3 shadow-lg border border-border"
                  >
                    <div className="flex items-center gap-2">
                      <div className="h-8 w-8 rounded-full bg-accent/20 flex items-center justify-center">
                        <BookOpen className="h-4 w-4 text-blue-500" />
                      </div>
                      <div>
                        <div className="text-sm font-medium">50+</div>
                        <div className="text-xs text-muted-foreground">
                          Subjects
                        </div>
                      </div>
                    </div>
                  </motion.div>
                </div>
              </div>
            </div>
          </motion.div>
        </div>

        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 1, duration: 0.8 }}
          className="flex flex-col items-center justify-center mt-8 mb-4"
        >
          <span className="text-xs text-muted-foreground mb-2">
            Scroll to explore
          </span>
          <motion.div
            animate={{ y: [0, 10, 0] }}
            transition={{ repeat: Number.POSITIVE_INFINITY, duration: 1.5 }}
            className="h-10 w-6 rounded-full border border-border flex items-center justify-center"
          >
            <motion.div
              animate={{ height: ["30%", "60%", "30%"] }}
              transition={{ repeat: Number.POSITIVE_INFINITY, duration: 1.5 }}
              className="h-3 w-1 bg-primary rounded-full"
            />
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
};

export default HeroSection;
