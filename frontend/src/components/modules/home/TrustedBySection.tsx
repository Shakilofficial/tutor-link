"use client";
import bteb from "@/assets/BTEB.png";
import btsi from "@/assets/BTSI.png";
import buet from "@/assets/BUET_LOGO.svg.png";
import bnclg from "@/assets/bn.png";
import dcgpsc from "@/assets/dcgpsc.gif";
import du from "@/assets/du.png";
import nu from "@/assets/nu.png";
import SectionHeader from "@/components/core/SectionHeader";
import { motion } from "framer-motion";
import Image from "next/image";

const TrustedBySection = () => {
  const logos = [
    {
      name: "BUET",
      logo: buet,
    },
    {
      name: "BTEB",
      logo: bteb,
    },

    { name: "DU", logo: du },
    { name: "NU", logo: nu },
    { name: "BNCLG", logo: bnclg },
    { name: "DCGPSC", logo: dcgpsc },
    {
      name: "BTSI",
      logo: btsi,
    },
  ];
  return (
    <section className="py-12 border-y border-border/30 bg-accent/20">
      <div className="container px-4 mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="text-center mb-8"
        >
          <SectionHeader title="TRUSTED BY LEADING EDUCATIONAL INSTITUTIONS" />
        </motion.div>

        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.8, delay: 0.2 }}
          className="flex flex-wrap justify-center items-center gap-8 md:gap-16"
        >
          {logos.map((logo, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.1 * index }}
              whileHover={{ scale: 1.05 }}
              className="relative grayscale hover:grayscale-0 transition-all duration-300"
            >
              <Image
                src={logo.logo || "/placeholder.svg"}
                alt={logo.name}
                width={80}
                height={80}
                className="w-auto h-auto object-contain"
              />
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
};

export default TrustedBySection;
