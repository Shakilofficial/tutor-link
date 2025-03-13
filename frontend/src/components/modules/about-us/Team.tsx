"use client";

import SectionHeader from "@/components/core/SectionHeader";
import { motion } from "framer-motion";
import { Facebook, Github, Linkedin, Twitter } from "lucide-react";
import Image from "next/image";
const Team = () => {
  const teamMembers = [
    {
      name: "Md Shakil Hossain",
      role: "Founder & CEO",
      bio: "Former professor with 15+ years in education technology, passionate about making quality education accessible to all.",
      image:
        "https://res.cloudinary.com/dcyupktj6/image/upload/v1728503901/avatars/zelpsdb5rzpgrobkycwc.jpg",
      social: {
        linkedin: "#",
        twitter: "#",
        facebook: "#",
      },
    },
    {
      name: "Md Wahid Raza",
      role: "CTO",
      bio: "Tech innovator with experience at leading EdTech companies, focused on creating seamless learning experiences.",
      image:
        "https://res.cloudinary.com/dcyupktj6/image/upload/v1728502285/avatars/slol5llrclurjsaivzum.png",
      social: {
        linkedin: "#",
        twitter: "#",
        github: "#",
      },
    },
    {
      name: "Sadia Nuzhat Khan",
      role: "Head of Education",
      bio: "Former school principal and curriculum developer dedicated to maintaining educational excellence.",
      image:
        "https://res.cloudinary.com/dcyupktj6/image/upload/v1741424371/dae0t0sdqt-1741424370016-profileImage-fe-avatar.jpg",
      social: {
        linkedin: "#",
        twitter: "#",
      },
    },
    {
      name: "Shahid Hasan",
      role: "Head of Operations",
      bio: "Operations expert with a background in scaling educational platforms globally.",
      image:
        "https://res.cloudinary.com/dcyupktj6/image/upload/v1741827520/l9xccnsbdd-1741827518173-thumbnail-avatar-tutorlink.png",
      social: {
        linkedin: "#",
        twitter: "#",
      },
    },
  ];
  return (
    <section className="py-20 bg-accent/0.5 relative overflow-hidden">
      <div className="absolute top-0 left-0 w-full h-20 bg-gradient-to-b from-background/5 to-transparent" />
      <div className="absolute bottom-0 left-0 w-full h-20 bg-gradient-to-t from-background/5 to-transparent" />
      <div className="absolute -top-40 -right-40 w-80 h-80 bg-primary/5 rounded-full blur-3xl" />
      <div className="absolute -bottom-40 -left-40 w-80 h-80 bg-orange-900/10 rounded-full blur-3xl" />

      <div className="container mx-auto px-4 relative z-10">
        <motion.div
          className="text-center max-w-3xl mx-auto mb-16"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
        >
          <SectionHeader
            title="Meet Our Team"
            subtitle="Our diverse team of education experts, technologists, and
            visionaries is united by a shared passion for transforming how
            people learn and teach."
          />
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {teamMembers.map((member, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: index * 0.1 }}
              viewport={{ once: true }}
              className="group"
            >
              <div className="bg-card border border-border/50 rounded-xl overflow-hidden shadow-md hover:shadow-xl transition-all duration-300 h-full">
                <div className="relative h-64 overflow-hidden">
                  <Image
                    src={member.image || "/placeholder.svg"}
                    alt={member.name}
                    fill
                    className="object-cover transition-transform duration-500 group-hover:scale-105"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                  <div className="absolute bottom-0 left-0 right-0 p-4 transform translate-y-full group-hover:translate-y-0 transition-transform duration-300">
                    <div className="flex justify-center space-x-3">
                      {member.social.linkedin && (
                        <a
                          href={member.social.linkedin}
                          className="bg-white/20 p-2 rounded-full hover:bg-primary/80 transition-colors duration-300"
                        >
                          <Linkedin className="h-4 w-4 text-white" />
                        </a>
                      )}
                      {member.social.twitter && (
                        <a
                          href={member.social.twitter}
                          className="bg-white/20 p-2 rounded-full hover:bg-primary/80 transition-colors duration-300"
                        >
                          <Twitter className="h-4 w-4 text-white" />
                        </a>
                      )}
                      {member.social.facebook && (
                        <a
                          href={member.social.facebook}
                          className="bg-white/20 p-2 rounded-full hover:bg-primary/80 transition-colors duration-300"
                        >
                          <Facebook className="h-4 w-4 text-white" />
                        </a>
                      )}
                      {member.social.github && (
                        <a
                          href={member.social.github}
                          className="bg-white/20 p-2 rounded-full hover:bg-primary/80 transition-colors duration-300"
                        >
                          <Github className="h-4 w-4 text-white" />
                        </a>
                      )}
                    </div>
                  </div>
                </div>
                <div className="p-6">
                  <h3 className="text-xl font-semibold mb-1">{member.name}</h3>
                  <p className="text-primary text-sm mb-3">{member.role}</p>
                  <p className="text-muted-foreground text-sm">{member.bio}</p>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Team;
