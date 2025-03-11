"use client";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { BookOpen, GraduationCap, Search } from "lucide-react";
import { useState } from "react";

export default function Hero() {
  const [searchQuery, setSearchQuery] = useState("");

  return (
    <section className="container flex min-h-[calc(100vh-4rem)] max-w-screen-2xl flex-col items-center justify-center space-y-10 text-center ">
      <div className="space-y-6">
        <h1 className="bg-gradient-to-br from-foreground from-30% via-foreground/90 to-foreground/70 bg-clip-text text-4xl font-bold tracking-tight text-transparent sm:text-5xl md:text-6xl lg:text-7xl">
          Find Your Perfect
          <br />
          <span className="text-primary">Tutor Today</span>
        </h1>
        <p className="mx-auto max-w-[42rem] leading-normal text-muted-foreground sm:text-xl sm:leading-8">
          Connect with qualified tutors for personalized learning experiences in
          any subject. Boost your grades and confidence with one-on-one
          tutoring.
        </p>
      </div>

      <div className="w-full max-w-3xl">
        <div className="relative">
          <div className="absolute inset-0 -z-10 rounded-lg bg-gradient-to-r from-orange-500/20 via-amber-500/20 to-orange-500/20 blur-xl" />
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
      </div>

      <div className="flex flex-col gap-6 sm:flex-row sm:gap-8">
        <Button size="lg" className="gap-2">
          <GraduationCap className="h-5 w-5" />
          Sign Up as a Student
        </Button>
        <Button variant="outline" size="lg" className="gap-2">
          <BookOpen className="h-5 w-5" />
          Register as a Tutor
        </Button>
      </div>
    </section>
  );
}
