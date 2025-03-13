"use client";

import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { motion } from "framer-motion";
import {
  BookOpen,
  Calendar,
  CreditCard,
  HelpCircle,
  ShieldCheck,
  UserCircle,
} from "lucide-react";
import { useState } from "react";

const FAQCategories = () => {
  const [activeTab, setActiveTab] = useState("tutoring");
  const faqCategories = [
    {
      id: "tutoring",
      label: "Tutoring",
      icon: <BookOpen className="h-4 w-4" />,
      questions: [
        {
          question: "How do I find a tutor?",
          answer:
            "Finding a tutor on TutorLink is simple. Use our search feature to filter tutors by subject, grade level, price range, and availability. You can also read reviews from other students to help make your decision. Once you find a tutor you're interested in, you can view their full profile and schedule a session directly through our platform.",
        },
        {
          question: "What subjects do you offer tutoring in?",
          answer:
            "TutorLink offers tutoring in a wide range of subjects across all educational levels. This includes mathematics (algebra, calculus, statistics), sciences (biology, chemistry, physics), languages (English, Spanish, French), humanities, test preparation (SAT, ACT, GRE), and specialized subjects like computer science, music, and art. If you don't see your subject listed, contact us and we'll try to find a qualified tutor for you.",
        },
        {
          question: "Can I change tutors if I'm not satisfied?",
          answer:
            "We want to ensure you have the best learning experience possible. If you're not satisfied with your current tutor, you can easily switch to a different one at any time. Simply browse for a new tutor and book a session with them. We also encourage providing feedback to help us improve our matching process.",
        },
        {
          question: "How are tutoring sessions conducted?",
          answer:
            "Tutoring sessions can be conducted either online through our integrated video platform or in-person, depending on your preference and the tutor's availability. Our online platform includes features like screen sharing, virtual whiteboard, and document sharing to enhance the learning experience. For in-person sessions, you can arrange a meeting location that works for both you and the tutor.",
        },
      ],
    },
    {
      id: "payments",
      label: "Payments",
      icon: <CreditCard className="h-4 w-4" />,
      questions: [
        {
          question: "How are payments processed?",
          answer:
            "Payments on TutorLink are processed securely through our platform. We accept major credit cards, debit cards, and digital payment methods. When you book a session, the payment is held in escrow until the session is completed, ensuring both parties are protected. You can manage your payment methods and view your transaction history in your account settings.",
        },
        {
          question: "What is your refund policy?",
          answer:
            "If a session is cancelled by the tutor, you will receive a full refund. If you need to cancel a session, you must do so at least 24 hours in advance to receive a full refund. Cancellations made less than 24 hours before the scheduled session may be subject to a cancellation fee. If you're unsatisfied with a completed session, please contact our support team within 48 hours, and we'll work with you to resolve the issue.",
        },
        {
          question: "How much do tutoring sessions cost?",
          answer:
            "Tutoring rates vary depending on the subject, tutor's experience, and session format (online or in-person). Tutors set their own hourly rates, which typically range from $20 to $100+ per hour. You can filter tutors by price range when searching to find options that fit your budget. Some tutors also offer package discounts for booking multiple sessions in advance.",
        },
        {
          question: "Do you offer any discounts or financial aid?",
          answer:
            "Yes, we offer several ways to make tutoring more affordable. New users receive a discount on their first session. We also have a loyalty program that provides discounts after a certain number of completed sessions. For students with financial need, we offer a limited financial aid program. Contact our support team to learn more about eligibility requirements.",
        },
      ],
    },
    {
      id: "account",
      label: "Account",
      icon: <UserCircle className="h-4 w-4" />,
      questions: [
        {
          question: "How do I create an account?",
          answer:
            "Creating an account on TutorLink is free and easy. Click the 'Sign Up' button on our homepage, then enter your email address and create a password. You can sign up as either a student or a tutor. After creating your account, you'll be prompted to complete your profile with additional information such as your name, subjects of interest, and educational background.",
        },
        {
          question: "Can I have both a student and tutor account?",
          answer:
            "Yes, you can have both types of accounts. If you initially signed up as a student but would like to tutor as well (or vice versa), you can add the additional role through your account settings. Note that tutor accounts require additional verification steps, including educational background checks and subject proficiency verification.",
        },
        {
          question: "How do I reset my password?",
          answer:
            "If you've forgotten your password, click on the 'Forgot Password' link on the login page. Enter the email address associated with your account, and we'll send you a password reset link. For security reasons, this link will expire after 24 hours. If you're still having trouble accessing your account, please contact our support team for assistance.",
        },
        {
          question: "How can I delete my account?",
          answer:
            "To delete your account, go to your account settings and select the 'Delete Account' option. You'll be asked to confirm this action, as account deletion is permanent and cannot be undone. Any upcoming scheduled sessions will be cancelled, and you'll receive refunds according to our cancellation policy. If you have any outstanding payments or credits, these will be processed before account deletion.",
        },
      ],
    },
    {
      id: "scheduling",
      label: "Scheduling",
      icon: <Calendar className="h-4 w-4" />,
      questions: [
        {
          question: "How do I schedule a session?",
          answer:
            "To schedule a session, first find a tutor you'd like to work with. On their profile, you'll see their availability calendar. Select a date and time that works for you, specify the subject and any specific topics you'd like to cover, then confirm your booking. The tutor will receive a notification and can either accept or suggest an alternative time. Once confirmed, the session will appear in your dashboard.",
        },
        {
          question: "Can I cancel a session?",
          answer:
            "Yes, you can cancel a scheduled session through your dashboard. Navigate to 'My Sessions,' find the session you wish to cancel, and click the 'Cancel' button. Remember that our refund policy requires cancellations to be made at least 24 hours in advance for a full refund. Last-minute cancellations may incur a fee, as tutors reserve that time specifically for you.",
        },
        {
          question: "How far in advance should I book a session?",
          answer:
            "We recommend booking sessions at least 48-72 hours in advance to ensure you get your preferred time slot, especially for popular tutors. However, many tutors offer same-day or next-day availability for urgent needs. You can see each tutor's typical response time on their profile to help plan accordingly.",
        },
        {
          question: "Can I schedule recurring sessions?",
          answer:
            "Yes, you can set up recurring sessions with your tutor. After a successful session, you'll have the option to schedule a recurring appointment at the same time each week or on a custom schedule. Recurring sessions help maintain consistency in your learning and often lead to better results. You can modify or cancel the recurring schedule at any time through your dashboard.",
        },
      ],
    },
    {
      id: "safety",
      label: "Safety",
      icon: <ShieldCheck className="h-4 w-4" />,
      questions: [
        {
          question: "How do you verify tutors?",
          answer:
            "We have a comprehensive verification process for all tutors on our platform. This includes identity verification, educational credential checks, subject proficiency assessments, and background checks where applicable. Tutors must also complete an orientation program before they can offer services. We continuously monitor tutor performance through student feedback and ratings to maintain high quality standards.",
        },
        {
          question: "Is my personal information secure?",
          answer:
            "Protecting your privacy is a top priority. We use industry-standard encryption and security measures to safeguard your personal information. We only share the minimum necessary information with tutors to facilitate sessions. Our privacy policy details exactly what information we collect and how it's used. You can manage your privacy settings in your account to control what information is visible to others.",
        },
        {
          question: "What should I do if I have a safety concern?",
          answer:
            "If you ever feel uncomfortable during a session or have any safety concerns, you can end the session immediately and report the issue through our platform. We have a dedicated Trust & Safety team that reviews all reports promptly. In case of an emergency, please contact local authorities first, then notify us. We take all safety concerns seriously and will take appropriate action based on our investigation.",
        },
        {
          question: "Are online sessions recorded?",
          answer:
            "Online sessions can be recorded only with explicit consent from all participants. Before recording begins, everyone will receive a notification and must agree. These recordings are available only to the session participants and TutorLink administrators (if needed for dispute resolution). You can access your session recordings from your dashboard for a limited time to review learning materials.",
        },
      ],
    },
    {
      id: "other",
      label: "Other",
      icon: <HelpCircle className="h-4 w-4" />,
      questions: [
        {
          question: "How can I become a tutor on TutorLink?",
          answer:
            "To become a tutor, click the 'Become a Tutor' button on our homepage and complete the application process. You'll need to provide information about your educational background, teaching experience, and subjects you're qualified to teach. You'll also need to pass a subject proficiency assessment and complete a background check. Once approved, you can set up your profile, availability, and hourly rate to start accepting students.",
        },
        {
          question: "Do you offer group tutoring sessions?",
          answer:
            "Yes, we offer group tutoring options. Students can form study groups and book a tutor together, splitting the cost among participants. Tutors can also create group sessions for specific subjects or topics that multiple students can join. Group sessions are a cost-effective way to learn and can provide additional benefits through peer interaction and collaborative problem-solving.",
        },
        {
          question: "Is TutorLink available internationally?",
          answer:
            "Yes, TutorLink is available globally. Our platform connects students and tutors from around the world, particularly for online sessions. We support multiple languages and have tutors across different time zones to accommodate international students. Payment processing is available in multiple currencies, and our platform automatically adjusts for time zone differences when scheduling sessions.",
        },
        {
          question: "How can I provide feedback about the platform?",
          answer:
            "We value your feedback! You can provide suggestions, report issues, or share your experience through the 'Feedback' option in your account menu. After each session, you'll also be prompted to rate and review your tutor. Additionally, we conduct periodic user surveys to gather more comprehensive feedback. Your input helps us continuously improve the platform and better serve our community.",
        },
      ],
    },
  ];
  return (
    <section className="py-16 relative overflow-hidden">
      <div className="container mx-auto px-4">
        <Tabs
          defaultValue="tutoring"
          value={activeTab}
          onValueChange={setActiveTab}
        >
          <div className="flex flex-col md:flex-row gap-8">
            <motion.div
              className="md:w-1/4"
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.5 }}
              viewport={{ once: true }}
            >
              <h2 className="text-xl font-semibold mb-4">Categories</h2>
              <TabsList className="flex flex-col h-auto bg-transparent space-y-1">
                {faqCategories.map((category) => (
                  <TabsTrigger
                    key={category.id}
                    value={category.id}
                    className={`flex items-center justify-start gap-2 p-3 w-full ${
                      activeTab === category.id
                        ? "bg-primary/10 text-primary"
                        : "hover:bg-accent"
                    }`}
                  >
                    {category.icon}
                    <span>{category.label}</span>
                  </TabsTrigger>
                ))}
              </TabsList>
            </motion.div>

            <div className="md:w-3/4">
              {faqCategories.map((category) => (
                <TabsContent
                  key={category.id}
                  value={category.id}
                  className="mt-0"
                >
                  <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5 }}
                    key={category.id}
                  >
                    <h2 className="text-2xl font-bold mb-6 bg-gradient-to-r from-primary to-orange-500 bg-clip-text text-transparent">
                      {category.label} Questions
                    </h2>

                    <Accordion type="single" collapsible className="space-y-4">
                      {category.questions.map((faq, index) => (
                        <motion.div
                          key={index}
                          initial={{ opacity: 0, y: 10 }}
                          animate={{ opacity: 1, y: 0 }}
                          transition={{ duration: 0.3, delay: index * 0.1 }}
                        >
                          <AccordionItem
                            value={`item-${index}`}
                            className="border border-border/50 rounded-lg overflow-hidden bg-card shadow-sm"
                          >
                            <AccordionTrigger className="px-6 py-4 hover:bg-accent/50 transition-colors duration-200 text-left">
                              <span className="font-medium">
                                {faq.question}
                              </span>
                            </AccordionTrigger>
                            <AccordionContent className="px-6 py-4 bg-accent/20">
                              <p className="text-muted-foreground">
                                {faq.answer}
                              </p>
                            </AccordionContent>
                          </AccordionItem>
                        </motion.div>
                      ))}
                    </Accordion>
                  </motion.div>
                </TabsContent>
              ))}
            </div>
          </div>
        </Tabs>
      </div>
    </section>
  );
};

export default FAQCategories;
