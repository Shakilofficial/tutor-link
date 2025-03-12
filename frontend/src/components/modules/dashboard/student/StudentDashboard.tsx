/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";

import { AnimatedCounter } from "@/components/core/AnimatedCounter";
import DashboardHeader from "@/components/core/DashboardHeader";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import { motion } from "framer-motion";
import {
  BookMarked,
  BookOpen,
  Calendar,
  CheckCircle,
  DollarSign,
  Star,
  TrendingUp,
  Users,
  Zap,
} from "lucide-react";

const StudentDashboard = ({ data }: { data: any }) => {
  const stats = [
    {
      title: "Total Bookings",
      value: data.totalBookings,
      icon: BookOpen,
      description: "All-time bookings",
      color: "from-blue-500 to-blue-600",
      textColor: "text-blue-500",
      bgColor: "bg-blue-500/10",
    },
    {
      title: "Total Spent",
      value: data.totalSpent,
      prefix: "$",
      icon: DollarSign,
      description: "All-time spending",
      color: "from-green-500 to-green-600",
      textColor: "text-green-500",
      bgColor: "bg-green-500/10",
    },
    {
      title: "Upcoming Sessions",
      value: data.upcomingBookings,
      icon: Calendar,
      description: "Scheduled sessions",
      color: "from-orange-500 to-orange-600",
      textColor: "text-orange-500",
      bgColor: "bg-orange-500/10",
    },
    {
      title: "Completed Sessions",
      value: data.completedBookings,
      icon: CheckCircle,
      description: "Finished sessions",
      color: "from-purple-500 to-purple-600",
      textColor: "text-purple-500",
      bgColor: "bg-purple-500/10",
    },
  ];

  const secondaryStats = [
    {
      title: "Enrolled Subjects",
      value: data.enrolledSubjects,
      icon: BookMarked,
      color: "from-indigo-500 to-indigo-600",
      bgColor: "bg-indigo-500/10",
      textColor: "text-indigo-500",
    },
    {
      title: "Hired Tutors",
      value: data.hiredTutors,
      icon: Users,
      color: "from-pink-500 to-pink-600",
      bgColor: "bg-pink-500/10",
      textColor: "text-pink-500",
    },
    {
      title: "Reviews Written",
      value: data.reviewsWritten,
      icon: Star,
      color: "from-amber-500 to-amber-600",
      bgColor: "bg-amber-500/10",
      textColor: "text-amber-500",
    },
  ];

  const container = {
    hidden: { opacity: 0 },
    show: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
      },
    },
  };

  const item = {
    hidden: { y: 20, opacity: 0 },
    show: {
      y: 0,
      opacity: 1,
      transition: { type: "spring", stiffness: 300, damping: 24 },
    },
  };

  return (
    <motion.div
      className="space-y-8"
      initial="hidden"
      animate="show"
      variants={container}
    >
      <motion.div className="flex items-center justify-between" variants={item}>
        <DashboardHeader title="Student Dashboard" />
        <TooltipProvider>
          <Tooltip>
            <TooltipTrigger asChild>
              <Button variant="outline" size="sm" className="gap-2">
                <TrendingUp className="h-4 w-4" />
                <span>View Progress</span>
              </Button>
            </TooltipTrigger>
            <TooltipContent>
              <p>See detailed progress analytics</p>
            </TooltipContent>
          </Tooltip>
        </TooltipProvider>
      </motion.div>

      <motion.div
        className="grid gap-4 md:grid-cols-2 lg:grid-cols-4"
        variants={container}
      >
        {stats.map((stat, index) => (
          <motion.div
            key={index}
            variants={item}
            whileHover={{ y: -5, transition: { duration: 0.2 } }}
          >
            <Card className="overflow-hidden backdrop-blur-sm bg-card/60 border-muted/40 dark:shadow-inner dark:shadow-white/5">
              <div className={`h-1 bg-gradient-to-r ${stat.color}`} />
              <CardContent className="p-6">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm font-medium text-muted-foreground">
                      {stat.title}
                    </p>
                    <h3 className={`text-2xl font-bold ${stat.textColor}`}>
                      {stat.prefix && stat.prefix}
                      <AnimatedCounter value={stat.value} />
                    </h3>
                  </div>
                  <div className={`rounded-full p-2 ${stat.bgColor}`}>
                    <stat.icon className={`h-5 w-5 ${stat.textColor}`} />
                  </div>
                </div>
                <p className="text-xs text-muted-foreground mt-3">
                  {stat.description}
                </p>
              </CardContent>
            </Card>
          </motion.div>
        ))}
      </motion.div>

      <div className="grid gap-4 md:grid-cols-2">
        <motion.div variants={item}>
          <Card className="overflow-hidden backdrop-blur-sm bg-card/60 border-muted/40 dark:shadow-inner dark:shadow-white/5 h-full">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Zap className="h-5 w-5 text-primary" />
                Learning Progress
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-6">
                <motion.div
                  className="space-y-2"
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.3 }}
                >
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2">
                      <BookOpen className="h-4 w-4 text-primary" />
                      <span className="text-sm font-medium">
                        Bookings Completion
                      </span>
                    </div>
                    <span className="text-sm font-medium">
                      {data.completedBookings}/{data.totalBookings}
                    </span>
                  </div>
                  <div className="relative pt-1">
                    <div className="overflow-hidden h-2 text-xs flex rounded-full bg-primary/10">
                      <motion.div
                        className="shadow-none flex flex-col text-center whitespace-nowrap text-white justify-center bg-gradient-to-r from-primary to-orange-500"
                        initial={{ width: 0 }}
                        animate={{
                          width: `${
                            data.totalBookings > 0
                              ? (data.completedBookings / data.totalBookings) *
                                100
                              : 0
                          }%`,
                        }}
                        transition={{ duration: 1, ease: "easeOut" }}
                      />
                    </div>
                  </div>
                </motion.div>

                <motion.div
                  className="space-y-2"
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.5 }}
                >
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2">
                      <Calendar className="h-4 w-4 text-orange-500" />
                      <span className="text-sm font-medium">
                        Upcoming Sessions
                      </span>
                    </div>
                    <span className="text-sm font-medium">
                      {data.upcomingBookings}/{data.totalBookings}
                    </span>
                  </div>
                  <div className="relative pt-1">
                    <div className="overflow-hidden h-2 text-xs flex rounded-full bg-orange-500/10">
                      <motion.div
                        className="shadow-none flex flex-col text-center whitespace-nowrap text-white justify-center bg-gradient-to-r from-orange-400 to-orange-600"
                        initial={{ width: 0 }}
                        animate={{
                          width: `${
                            data.totalBookings > 0
                              ? (data.upcomingBookings / data.totalBookings) *
                                100
                              : 0
                          }%`,
                        }}
                        transition={{ duration: 1, ease: "easeOut" }}
                      />
                    </div>
                  </div>
                </motion.div>

                <motion.div
                  className="mt-8 p-4 rounded-lg bg-gradient-to-br from-primary/5 to-orange-500/5 border border-primary/10"
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.7 }}
                >
                  <h4 className="text-sm font-medium mb-2">Learning Tip</h4>
                  <p className="text-xs text-muted-foreground">
                    Regular study sessions of 25-30 minutes with short breaks in
                    between can improve retention by up to 30%.
                  </p>
                </motion.div>
              </div>
            </CardContent>
          </Card>
        </motion.div>

        <motion.div variants={item}>
          <Card className="overflow-hidden backdrop-blur-sm bg-card/60 border-muted/40 dark:shadow-inner dark:shadow-white/5 h-full">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <TrendingUp className="h-5 w-5 text-primary" />
                Learning Activity
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-3 gap-4">
                {secondaryStats.map((stat, index) => (
                  <motion.div
                    key={index}
                    className="relative group"
                    whileHover={{ scale: 1.05 }}
                    transition={{ type: "spring", stiffness: 400, damping: 10 }}
                  >
                    <div className="absolute inset-0 rounded-lg bg-gradient-to-br from-primary/20 to-orange-500/20 blur-xl opacity-0 group-hover:opacity-70 transition-opacity duration-300" />
                    <div className="relative flex flex-col items-center justify-center p-4 bg-card rounded-lg border border-border group-hover:border-primary/50 transition-colors duration-300">
                      <div
                        className={`rounded-full ${stat.bgColor} p-3 mb-2 group-hover:scale-110 transition-transform duration-300`}
                      >
                        <stat.icon className={`h-5 w-5 ${stat.textColor}`} />
                      </div>
                      <div className={`text-2xl font-bold ${stat.textColor}`}>
                        <AnimatedCounter value={stat.value} />
                      </div>
                      <div className="text-xs text-muted-foreground text-center mt-1">
                        {stat.title}
                      </div>
                    </div>
                  </motion.div>
                ))}
              </div>

              <motion.div
                className="mt-6 p-4 rounded-lg bg-gradient-to-br from-background to-accent/20 border border-border"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.9 }}
              >
                <h4 className="text-sm font-medium mb-2">Activity Summary</h4>
                <p className="text-xs text-muted-foreground">
                  You&apos;ve been making steady progress! Your engagement is{" "}
                  {data.reviewsWritten > 0 ? "active" : "getting started"}.
                  {data.hiredTutors > 0
                    ? " Your tutors are helping you excel."
                    : " Consider hiring a tutor to accelerate your learning."}
                </p>
              </motion.div>
            </CardContent>
          </Card>
        </motion.div>
      </div>

      <motion.div variants={item}>
        <Card className="overflow-hidden backdrop-blur-sm bg-card/60 border-muted/40 dark:shadow-inner dark:shadow-white/5">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Zap className="h-5 w-5 text-primary" />
              Quick Actions
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <motion.div
                className="relative group overflow-hidden"
                whileHover={{ scale: 1.02 }}
                transition={{ type: "spring", stiffness: 400, damping: 10 }}
              >
                <div className="absolute inset-0 bg-gradient-to-br from-primary/10 to-primary/5 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                <div className="flex flex-col items-center justify-center p-6 border border-border rounded-lg group-hover:border-primary/50 transition-all duration-300 relative z-10">
                  <div className="absolute -bottom-6 -right-6 w-24 h-24 bg-primary/10 rounded-full blur-xl opacity-0 group-hover:opacity-70 transition-opacity duration-300" />
                  <BookOpen className="h-8 w-8 text-primary mb-2 group-hover:scale-110 transition-transform duration-300" />
                  <h3 className="font-medium">Find a Tutor</h3>
                  <p className="text-xs text-muted-foreground text-center mt-1">
                    Browse qualified tutors
                  </p>
                </div>
              </motion.div>

              <motion.div
                className="relative group overflow-hidden"
                whileHover={{ scale: 1.02 }}
                transition={{ type: "spring", stiffness: 400, damping: 10 }}
              >
                <div className="absolute inset-0 bg-gradient-to-br from-orange-500/10 to-orange-500/5 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                <div className="flex flex-col items-center justify-center p-6 border border-border rounded-lg group-hover:border-orange-500/50 transition-all duration-300 relative z-10">
                  <div className="absolute -bottom-6 -right-6 w-24 h-24 bg-orange-500/10 rounded-full blur-xl opacity-0 group-hover:opacity-70 transition-opacity duration-300" />
                  <Calendar className="h-8 w-8 text-orange-500 mb-2 group-hover:scale-110 transition-transform duration-300" />
                  <h3 className="font-medium">Schedule a Session</h3>
                  <p className="text-xs text-muted-foreground text-center mt-1">
                    Book your next lesson
                  </p>
                </div>
              </motion.div>

              <motion.div
                className="relative group overflow-hidden"
                whileHover={{ scale: 1.02 }}
                transition={{ type: "spring", stiffness: 400, damping: 10 }}
              >
                <div className="absolute inset-0 bg-gradient-to-br from-amber-500/10 to-amber-500/5 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                <div className="flex flex-col items-center justify-center p-6 border border-border rounded-lg group-hover:border-amber-500/50 transition-all duration-300 relative z-10">
                  <div className="absolute -bottom-6 -right-6 w-24 h-24 bg-amber-500/10 rounded-full blur-xl opacity-0 group-hover:opacity-70 transition-opacity duration-300" />
                  <Star className="h-8 w-8 text-amber-500 mb-2 group-hover:scale-110 transition-transform duration-300" />
                  <h3 className="font-medium">Write a Review</h3>
                  <p className="text-xs text-muted-foreground text-center mt-1">
                    Share your experience
                  </p>
                </div>
              </motion.div>
            </div>
          </CardContent>
        </Card>
      </motion.div>
    </motion.div>
  );
};

export default StudentDashboard;
