"use client";
import { motion } from "framer-motion";
import { Clock, Mail, MapPin, Phone } from "lucide-react";

const OfficeLocation = () => {
  return (
    <section className="py-20 bg-card relative overflow-hidden">
      <div className="absolute top-0 left-0 w-full h-20 bg-gradient-to-b from-background to-transparent" />

      <div className="container mx-auto px-4">
        <motion.div
          className="text-center max-w-3xl mx-auto mb-16"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
        >
          <h2 className="text-3xl font-bold mb-4 bg-gradient-to-r from-primary to-orange-500 bg-clip-text text-transparent">
            Visit Our Office
          </h2>
          <p className="text-muted-foreground">
            We&apos;d love to meet you in person! Our headquarters is located in
            the heart of the city.
          </p>
        </motion.div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
            className="bg-background rounded-xl overflow-hidden shadow-xl h-[550px]"
          >
            <iframe
              src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d765.4208414220479!2d89.92839143950084!3d24.137493532479255!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x39fdfe35e458d725%3A0x363ea34388acc826!2sDelduar!5e0!3m2!1sen!2sbd!4v1741881861776!5m2!1sen!2sbd"
              width="600"
              height="550"
              loading="lazy"
            ></iframe>
          </motion.div>
          <motion.div
            initial={{ opacity: 0, x: 50 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
            className="space-y-8"
          >
            <div className="bg-background border border-border/50 rounded-xl p-8 shadow-md">
              <h3 className="text-2xl font-semibold mb-6">
                Contact Information
              </h3>

              <div className="space-y-6">
                <div className="flex items-start">
                  <div className="bg-primary/10 rounded-full p-3 mr-4">
                    <MapPin className="h-6 w-6 text-primary" />
                  </div>
                  <div>
                    <h4 className="font-medium mb-1">Address</h4>
                    <p className="text-muted-foreground">
                      Mushuria Road No: 2
                      <br />
                      Elashin 1720,
                      <br />
                      Delduar, Tangail
                      <br />
                      Dhaka Bangladesh
                    </p>
                  </div>
                </div>

                <div className="flex items-start">
                  <div className="bg-primary/10 rounded-full p-3 mr-4">
                    <Phone className="h-6 w-6 text-primary" />
                  </div>
                  <div>
                    <h4 className="font-medium mb-1">Phone</h4>
                    <p className="text-muted-foreground">+88 01620521215</p>
                    <p className="text-muted-foreground">
                      +88 01521765486 (Support)
                    </p>
                  </div>
                </div>

                <div className="flex items-start">
                  <div className="bg-primary/10 rounded-full p-3 mr-4">
                    <Mail className="h-6 w-6 text-primary" />
                  </div>
                  <div>
                    <h4 className="font-medium mb-1">Email</h4>
                    <p className="text-muted-foreground">
                      mrshakilhossain@outlook.com
                    </p>
                    <p className="text-muted-foreground">
                      mrshakilhossain@outlook.com
                    </p>
                  </div>
                </div>

                <div className="flex items-start">
                  <div className="bg-primary/10 rounded-full p-3 mr-4">
                    <Clock className="h-6 w-6 text-primary" />
                  </div>
                  <div>
                    <h4 className="font-medium mb-1">Office Hours</h4>
                    <p className="text-muted-foreground">
                      Monday - Friday: 9:00 AM - 6:00 PM
                    </p>
                    <p className="text-muted-foreground">
                      Saturday: 10:00 AM - 2:00 PM
                    </p>
                    <p className="text-muted-foreground">Friday: Closed</p>
                  </div>
                </div>
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default OfficeLocation;
