"use client";

import SectionHeader from "@/components/core/SectionHeader";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { motion } from "framer-motion";
import { HelpCircle, Mail, MessageSquare } from "lucide-react";

const FAQContact = () => {
  return (
    <section className="py-20 relative overflow-hidden">
      <div className="absolute top-0 left-0 w-full h-20 bg-gradient-to-b from-background/5 to-transparent" />
      <div className="absolute bottom-0 left-0 w-full h-20 bg-gradient-to-t from-background/5 to-transparent" />

      <div className="container mx-auto px-4 relative z-10">
        <motion.div
          className="max-w-3xl mx-auto text-center mb-12"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
        >
          <SectionHeader
            title="Still Have Questions?"
            subtitle="If you couldn't find the answer you were looking for, feel free to reach out to our support team."
          />
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
            className="bg-card border border-border/50 rounded-xl p-8 shadow-md"
          >
            <h3 className="text-2xl font-semibold mb-6 text-center text-primary">Contact Support</h3>

            <form className="space-y-4">
              <div className="space-y-2">
                <label htmlFor="name" className="text-sm font-medium">
                  Your Name
                </label>
                <Input id="name" placeholder="Enter your name" />
              </div>

              <div className="space-y-2">
                <label htmlFor="email" className="text-sm font-medium">
                  Email Address
                </label>
                <Input id="email" type="email" placeholder="Enter your email" />
              </div>

              <div className="space-y-2">
                <label htmlFor="subject" className="text-sm font-medium">
                  Subject
                </label>
                <Input
                  id="subject"
                  placeholder="What is your question about?"
                />
              </div>

              <div className="space-y-2">
                <label htmlFor="message" className="text-sm font-medium">
                  Message
                </label>
                <Textarea
                  id="message"
                  placeholder="Please describe your question in detail"
                  rows={4}
                />
              </div>

              <Button className="w-full">Send Message</Button>
            </form>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
            className="space-y-6"
          >
            <div className="bg-card border border-border/50 rounded-xl p-6 shadow-md">
              <div className="flex items-start">
                <div className="bg-primary/10 rounded-full p-3 mr-4">
                  <Mail className="h-6 w-6 text-primary" />
                </div>
                <div>
                  <h4 className="font-medium mb-1">Email Support</h4>
                  <p className="text-muted-foreground mb-2">
                    Our support team typically responds within 24 hours.
                  </p>
                  <a
                    href="mailto:support@tutorlink.com"
                    className="text-primary hover:underline"
                  >
                    support@tutorlink.com
                  </a>
                </div>
              </div>
            </div>

            <div className="bg-card border border-border/50 rounded-xl p-6 shadow-md">
              <div className="flex items-start">
                <div className="bg-primary/10 rounded-full p-3 mr-4">
                  <MessageSquare className="h-6 w-6 text-primary" />
                </div>
                <div>
                  <h4 className="font-medium mb-1">Live Chat</h4>
                  <p className="text-muted-foreground mb-2">
                    Chat with our support team in real-time during business
                    hours.
                  </p>
                  <Button variant="outline" className="mt-2">
                    Start Chat
                  </Button>
                </div>
              </div>
            </div>

            <div className="bg-card border border-border/50 rounded-xl p-6 shadow-md">
              <div className="flex items-start">
                <div className="bg-primary/10 rounded-full p-3 mr-4">
                  <HelpCircle className="h-6 w-6 text-primary" />
                </div>
                <div>
                  <h4 className="font-medium mb-1">Help Center</h4>
                  <p className="text-muted-foreground mb-2">
                    Browse our comprehensive knowledge base for detailed guides
                    and tutorials.
                  </p>
                  <Button variant="outline" className="mt-2">
                    Visit Help Center
                  </Button>
                </div>
              </div>
            </div>

            <div className="bg-gradient-to-r from-primary/10 to-orange-500/10 rounded-xl p-6 border border-primary/20">
              <h4 className="text-lg font-semibold mb-3">Support Hours</h4>
              <div className="space-y-2 text-muted-foreground">
                <p>Monday - Friday: 9:00 AM - 8:00 PM BST</p>
                <p>Saturday: 10:00 AM - 6:00 PM BST</p>
                <p>Sunday: 12:00 PM - 5:00 PM BST</p>
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default FAQContact;
