"use client";
import SectionHeader from "@/components/core/SectionHeader";
import { motion } from "framer-motion";
import {
  Clock,
  CreditCard,
  ShieldCheck,
  Star,
  Users,
  Video,
} from "lucide-react";

const container = {
  hidden: { opacity: 0, y: 20 },
  show: { opacity: 1, y: 0 },
};

const item = {
  hidden: { opacity: 0, y: 20 },
  show: { opacity: 1, y: 0 },
};

const features = [
  {
    icon: <Clock className="h-8 w-8 text-primary" />,
    title: "Find Tutors Fast",
    description:
      "Search and connect with qualified tutors in minutes, not days.",
    color: "from-primary/20 to-primary/5",
  },
  {
    icon: <CreditCard className="h-8 w-8 text-orange-500" />,
    title: "Secure Payments",
    description:
      "Pay safely through our platform with multiple payment options.",
    color: "from-orange-500/20 to-orange-500/5",
  },
  {
    icon: <ShieldCheck className="h-8 w-8 text-green-500" />,
    title: "Verified Profiles",
    description:
      "All tutors are thoroughly vetted and background-checked for your safety.",
    color: "from-green-500/20 to-green-500/5",
  },
  {
    icon: <Video className="h-8 w-8 text-blue-500" />,
    title: "Online & In-Person",
    description:
      "Choose between virtual sessions or face-to-face tutoring based on your preference.",
    color: "from-blue-500/20 to-blue-500/5",
  },
  {
    icon: <Star className="h-8 w-8 text-amber-500" />,
    title: "Expert Tutors",
    description:
      "Learn from experienced educators, professionals, and subject matter experts.",
    color: "from-amber-500/20 to-amber-500/5",
  },
  {
    icon: <Users className="h-8 w-8 text-purple-500" />,
    title: "Group Sessions",
    description:
      "Save money with small group tutoring options for you and your friends.",
    color: "from-purple-500/20 to-purple-500/5",
  },
];

const Features = () => {
  return (
    <section className="py-20 relative overflow-hidden">
      <div className="absolute bg-accent/10" />

      <div className="container px-4 mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          viewport={{ once: true }}
          className="text-center max-w-3xl mx-auto mb-16"
        >
          <SectionHeader
            title="Why Choose TutorLink?"
            subtitle="Our platform makes it easy to find the perfect tutor and start learning right away."
          />
        </motion.div>

        <motion.div
          variants={container}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true }}
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8"
        >
          {features.map((feature, index) => (
            <motion.div
              key={index}
              variants={item}
              className="group relative"
              whileHover={{ y: -5, transition: { duration: 0.2 } }}
            >
              <div
                className={`absolute inset-0 rounded-2xl bg-gradient-to-br ${feature.color} opacity-0 group-hover:opacity-100 transition-opacity duration-300`}
              />
              <div className="relative bg-card border border-border/50 rounded-2xl p-8 h-full shadow-sm hover:shadow-md transition-all duration-300 group-hover:border-primary/20 z-10">
                <div className="mb-5 inline-flex h-12 w-12 items-center justify-center rounded-xl bg-primary/10 group-hover:scale-110 transition-transform duration-300">
                  {feature.icon}
                </div>
                <h3 className="text-xl font-semibold mb-3">{feature.title}</h3>
                <p className="text-muted-foreground">{feature.description}</p>
              </div>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
};

export default Features;
