"use client";
import { HoverEffect } from "@/components/core/HoverEffect";
import SectionHeader from "@/components/core/SectionHeader";
import {
  Clock,
  CreditCard,
  ShieldCheck,
  Star,
  Users,
  Video,
} from "lucide-react";

const features = [
  {
    name: "Find Tutors Fast",
    description:
      "Search and connect with qualified tutors in minutes, not days.",
    icon: Clock,
  },
  {
    name: "Secure Payments",
    description:
      "Pay safely through our platform with multiple payment options.",
    icon: CreditCard,
  },
  {
    name: "Verified Profiles",
    description:
      "All tutors are thoroughly vetted and background-checked for your safety.",
    icon: ShieldCheck,
  },
  {
    name: "Online & In-Person",
    description:
      "Choose between virtual sessions or face-to-face tutoring based on your preference.",
    icon: Video,
  },
  {
    name: "Expert Tutors",
    description:
      "Learn from experienced educators, professionals, and subject matter experts.",
    icon: Star,
  },
  {
    name: "Group Sessions",
    description:
      "Save money with small group tutoring options for you and your friends.",
    icon: Users,
  },
];

const Features = () => {
  return (
    <section className="container my-16">
      <SectionHeader
        title="Why Choose TutorLink?"
        subtitle="Our platform makes it easy to find the perfect tutor and start learning right away."
      />
      <div className="max-w-5xl mx-auto px-8">
        <HoverEffect items={features} />
      </div>
    </section>
  );
};

export default Features;
