/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";

import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { motion } from "framer-motion";
import {
  Award,
  BookOpen,
  Calendar,
  CheckCircle,
  Clock,
  DollarSign,
  Star,
  TrendingUp,
  Zap,
} from "lucide-react";

import { AnimatedCounter } from "@/components/core/AnimatedCounter";
import DashboardHeader from "@/components/core/DashboardHeader";
import { Button } from "@/components/ui/button";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";

const TutorDashboard = ({ data }: { data: any }) => {
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
      title: "Total Earnings",
      value: data.totalEarnings,
      prefix: "$",
      icon: DollarSign,
      description: "All-time revenue",
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
        <DashboardHeader title="Tutor Dashboard" />
        <TooltipProvider>
          <Tooltip>
            <TooltipTrigger asChild>
              <Button variant="outline" size="sm" className="gap-2">
                <TrendingUp className="h-4 w-4" />
                <span>View Analytics</span>
              </Button>
            </TooltipTrigger>
            <TooltipContent>
              <p>See detailed performance analytics</p>
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
                <Award className="h-5 w-5 text-primary" />
                Performance Metrics
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
                      <Star className="h-4 w-4 text-amber-500" />
                      <span className="text-sm font-medium">
                        Average Rating
                      </span>
                    </div>
                    <span className="text-sm font-medium">
                      {data.avgRating}/5
                    </span>
                  </div>
                  <div className="flex">
                    {[1, 2, 3, 4, 5].map((star) => (
                      <motion.div
                        key={star}
                        initial={{ scale: 0 }}
                        animate={{ scale: 1 }}
                        transition={{ delay: 0.3 + star * 0.1 }}
                      >
                        <Star
                          className={`h-5 w-5 ${
                            star <= Math.round(data.avgRating)
                              ? "text-amber-400 fill-amber-400"
                              : "text-muted-foreground/30"
                          }`}
                        />
                      </motion.div>
                    ))}
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
                      <DollarSign className="h-4 w-4 text-green-500" />
                      <span className="text-sm font-medium">
                        Hourly Rate vs Platform Average
                      </span>
                    </div>
                  </div>
                  <div className="flex items-center justify-between text-sm">
                    <span>
                      Your Rate:{" "}
                      <span className="font-bold">${data.hourlyRate}</span>
                    </span>
                    <span>
                      Platform Avg:{" "}
                      <span className="font-bold">
                        ${data.platformAvgHourlyRate.toFixed(2)}
                      </span>
                    </span>
                  </div>
                  <div className="relative pt-4">
                    <div className="h-2 w-full bg-gradient-to-r from-background to-background/50 rounded-full" />
                    <motion.div
                      className="absolute top-4 h-4 w-4 bg-primary rounded-full transform -translate-x-1/2 shadow-lg shadow-primary/20"
                      initial={{ left: 0 }}
                      animate={{
                        left: `${
                          (data.hourlyRate /
                            (Math.max(
                              data.hourlyRate,
                              data.platformAvgHourlyRate
                            ) *
                              1.5)) *
                          100
                        }%`,
                      }}
                      transition={{ duration: 1, delay: 0.6, type: "spring" }}
                    />
                    <motion.div
                      className="absolute top-4 h-4 w-4 bg-gray-500 rounded-full transform -translate-x-1/2 shadow-lg shadow-gray-500/20"
                      initial={{ left: 0 }}
                      animate={{
                        left: `${
                          (data.platformAvgHourlyRate /
                            (Math.max(
                              data.hourlyRate,
                              data.platformAvgHourlyRate
                            ) *
                              1.5)) *
                          100
                        }%`,
                      }}
                      transition={{ duration: 1, delay: 0.8, type: "spring" }}
                    />
                  </div>
                </motion.div>

                <motion.div
                  className="mt-8 p-4 rounded-lg bg-gradient-to-br from-primary/5 to-orange-500/5 border border-primary/10"
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.7 }}
                >
                  <h4 className="text-sm font-medium mb-2">
                    Performance Insight
                  </h4>
                  <p className="text-xs text-muted-foreground">
                    {data.avgRating > 4
                      ? "Your ratings are excellent! Students appreciate your teaching style."
                      : data.avgRating > 3
                      ? "You're doing well. Consider asking for feedback to improve further."
                      : "Focus on improving your teaching approach to boost your ratings."}
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
                <BookOpen className="h-5 w-5 text-primary" />
                Subjects Taught
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {data.subjectsTaught.map((subject: any, index: number) => (
                  <motion.div
                    key={subject._id}
                    className="relative group overflow-hidden"
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.3 + index * 0.1 }}
                    whileHover={{ scale: 1.02 }}
                  >
                    <div className="absolute inset-0 bg-gradient-to-r from-primary/5 to-orange-500/5 opacity-0 group-hover:opacity-100 transition-all duration-300" />
                    <div className="flex items-center justify-between p-3 bg-accent/30 rounded-lg border border-border group-hover:border-primary/30 transition-all duration-300">
                      <div>
                        <h4 className="font-medium">{subject.name}</h4>
                        <div className="flex items-center gap-2 mt-1">
                          <Badge
                            variant="outline"
                            className="text-xs bg-background/50 backdrop-blur-sm"
                          >
                            {subject.gradeLevel}
                          </Badge>
                          <Badge variant="secondary" className="text-xs">
                            {subject.category}
                          </Badge>
                        </div>
                      </div>
                      <BookOpen className="h-5 w-5 text-primary group-hover:scale-110 transition-transform duration-300" />
                    </div>
                  </motion.div>
                ))}

                <motion.div
                  className="flex items-center justify-between mt-4 p-3 rounded-lg bg-gradient-to-br from-background to-accent/20 border border-border"
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.7 }}
                >
                  <div className="flex items-center gap-2">
                    <Clock className="h-4 w-4 text-primary" />
                    <span className="text-sm">
                      Available Time Slots:{" "}
                      <span className="font-bold">
                        {data.availabilitySlots}
                      </span>
                    </span>
                  </div>
                  <Badge
                    variant="outline"
                    className="cursor-pointer hover:bg-primary/10 transition-colors duration-300"
                  >
                    Manage Schedule
                  </Badge>
                </motion.div>
              </div>
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
                  <Calendar className="h-8 w-8 text-primary mb-2 group-hover:scale-110 transition-transform duration-300" />
                  <h3 className="font-medium">Manage Bookings</h3>
                  <p className="text-xs text-muted-foreground text-center mt-1">
                    View and respond to requests
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
                  <Clock className="h-8 w-8 text-orange-500 mb-2 group-hover:scale-110 transition-transform duration-300" />
                  <h3 className="font-medium">Update Availability</h3>
                  <p className="text-xs text-muted-foreground text-center mt-1">
                    Set your teaching schedule
                  </p>
                </div>
              </motion.div>

              <motion.div
                className="relative group overflow-hidden"
                whileHover={{ scale: 1.02 }}
                transition={{ type: "spring", stiffness: 400, damping: 10 }}
              >
                <div className="absolute inset-0 bg-gradient-to-br from-blue-500/10 to-blue-500/5 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                <div className="flex flex-col items-center justify-center p-6 border border-border rounded-lg group-hover:border-blue-500/50 transition-all duration-300 relative z-10">
                  <div className="absolute -bottom-6 -right-6 w-24 h-24 bg-blue-500/10 rounded-full blur-xl opacity-0 group-hover:opacity-70 transition-opacity duration-300" />
                  <TrendingUp className="h-8 w-8 text-blue-500 mb-2 group-hover:scale-110 transition-transform duration-300" />
                  <h3 className="font-medium">View Analytics</h3>
                  <p className="text-xs text-muted-foreground text-center mt-1">
                    Track your performance
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

export default TutorDashboard;
