/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { motion } from "framer-motion";
import {
  BarChart3,
  Bell,
  BookOpen,
  DollarSign,
  FileText,
  PieChart,
  Star,
  TrendingUp,
  User,
  Users,
  Zap,
} from "lucide-react";

import { AnimatedCounter } from "@/components/core/AnimatedCounter";
import DashboardHeader from "@/components/core/DashboardHeader";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";

const AdminDashboard = ({ data }: { data: any }) => {
  const stats = [
    {
      title: "Total Users",
      value: data.users.total,
      icon: Users,
      description: `${data.users.students} students, ${data.users.tutors} tutors`,
      color: "from-blue-500 to-blue-600",
      textColor: "text-blue-500",
      bgColor: "bg-blue-500/10",
    },
    {
      title: "Total Bookings",
      value: data.bookings.total,
      icon: BookOpen,
      description: `${
        data.bookings.statusCounts.find((s: any) => s.status === "confirmed")
          ?.count || 0
      } confirmed`,
      color: "from-green-500 to-green-600",
      textColor: "text-green-500",
      bgColor: "bg-green-500/10",
    },
    {
      title: "Total Revenue",
      value: data.bookings.totalRevenue,
      prefix: "$",
      icon: DollarSign,
      description: "Platform earnings",
      color: "from-orange-500 to-orange-600",
      textColor: "text-orange-500",
      bgColor: "bg-orange-500/10",
    },
    {
      title: "Total Blogs",
      value: data.blogs.total,
      icon: FileText,
      description: `${data.blogs.published} published, ${data.blogs.draft} drafts`,
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
        <DashboardHeader title="Admin Dashboard" />
        <div className="flex items-center gap-2">
          <TooltipProvider>
            <Tooltip>
              <TooltipTrigger asChild>
                <Button variant="outline" size="sm" className="gap-2">
                  <Bell className="h-4 w-4" />
                  <Badge className="h-5 w-5 text-[10px] bg-primary text-white">
                    3
                  </Badge>
                </Button>
              </TooltipTrigger>
              <TooltipContent>
                <p>3 new notifications</p>
              </TooltipContent>
            </Tooltip>
          </TooltipProvider>
          <TooltipProvider>
            <Tooltip>
              <TooltipTrigger asChild>
                <Button variant="outline" size="sm" className="gap-2">
                  <TrendingUp className="h-4 w-4" />
                  <span>View Reports</span>
                </Button>
              </TooltipTrigger>
              <TooltipContent>
                <p>See detailed platform analytics</p>
              </TooltipContent>
            </Tooltip>
          </TooltipProvider>
        </div>
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
                <Users className="h-5 w-5 text-primary" />
                User Statistics
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
                      <Users className="h-4 w-4 text-primary" />
                      <span className="text-sm font-medium">User Types</span>
                    </div>
                  </div>
                  <div className="grid grid-cols-3 gap-2">
                    <motion.div
                      className="relative group overflow-hidden"
                      whileHover={{ scale: 1.05 }}
                      transition={{
                        type: "spring",
                        stiffness: 400,
                        damping: 10,
                      }}
                    >
                      <div className="absolute inset-0 bg-gradient-to-br from-blue-500/20 to-blue-600/10 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                      <div className="flex flex-col items-center justify-center p-3 bg-blue-500/10 rounded-lg border border-blue-500/20 group-hover:border-blue-500/40 transition-colors duration-300 relative z-10">
                        <span className="text-xl font-bold text-blue-500">
                          <AnimatedCounter value={data.users.students} />
                        </span>
                        <span className="text-xs text-muted-foreground">
                          Students
                        </span>
                      </div>
                    </motion.div>
                    <motion.div
                      className="relative group overflow-hidden"
                      whileHover={{ scale: 1.05 }}
                      transition={{
                        type: "spring",
                        stiffness: 400,
                        damping: 10,
                      }}
                    >
                      <div className="absolute inset-0 bg-gradient-to-br from-green-500/20 to-green-600/10 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                      <div className="flex flex-col items-center justify-center p-3 bg-green-500/10 rounded-lg border border-green-500/20 group-hover:border-green-500/40 transition-colors duration-300 relative z-10">
                        <span className="text-xl font-bold text-green-500">
                          <AnimatedCounter value={data.users.tutors} />
                        </span>
                        <span className="text-xs text-muted-foreground">
                          Tutors
                        </span>
                      </div>
                    </motion.div>
                    <motion.div
                      className="relative group overflow-hidden"
                      whileHover={{ scale: 1.05 }}
                      transition={{
                        type: "spring",
                        stiffness: 400,
                        damping: 10,
                      }}
                    >
                      <div className="absolute inset-0 bg-gradient-to-br from-purple-500/20 to-purple-600/10 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                      <div className="flex flex-col items-center justify-center p-3 bg-purple-500/10 rounded-lg border border-purple-500/20 group-hover:border-purple-500/40 transition-colors duration-300 relative z-10">
                        <span className="text-xl font-bold text-purple-500">
                          <AnimatedCounter value={data.users.admins} />
                        </span>
                        <span className="text-xs text-muted-foreground">
                          Admins
                        </span>
                      </div>
                    </motion.div>
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
                      <User className="h-4 w-4 text-primary" />
                      <span className="text-sm font-medium">
                        Verification Status
                      </span>
                    </div>
                  </div>
                  <div className="space-y-2">
                    <div className="flex items-center justify-between text-sm">
                      <span>Verified</span>
                      <span className="font-medium">{data.users.verified}</span>
                    </div>
                    <div className="relative pt-1">
                      <div className="overflow-hidden h-2 text-xs flex rounded-full bg-primary/10">
                        <motion.div
                          className="shadow-none flex flex-col text-center whitespace-nowrap text-white justify-center bg-gradient-to-r from-primary to-primary/70"
                          initial={{ width: 0 }}
                          animate={{
                            width: `${
                              (data.users.verified / data.users.total) * 100
                            }%`,
                          }}
                          transition={{ duration: 1, ease: "easeOut" }}
                        />
                      </div>
                    </div>

                    <div className="flex items-center justify-between text-sm">
                      <span>Unverified</span>
                      <span className="font-medium">
                        {data.users.unverified}
                      </span>
                    </div>
                    <div className="relative pt-1">
                      <div className="overflow-hidden h-2 text-xs flex rounded-full bg-orange-500/10">
                        <motion.div
                          className="shadow-none flex flex-col text-center whitespace-nowrap text-white justify-center bg-gradient-to-r from-orange-500 to-orange-400"
                          initial={{ width: 0 }}
                          animate={{
                            width: `${
                              (data.users.unverified / data.users.total) * 100
                            }%`,
                          }}
                          transition={{ duration: 1, ease: "easeOut" }}
                        />
                      </div>
                    </div>
                  </div>
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
                Booking Analytics
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
                        Booking Status
                      </span>
                    </div>
                  </div>
                  <div className="grid grid-cols-2 gap-2">
                    {data.bookings.statusCounts.map(
                      (status: any, index: number) => (
                        <motion.div
                          key={index}
                          className="relative group overflow-hidden"
                          initial={{ opacity: 0, y: 20 }}
                          animate={{ opacity: 1, y: 0 }}
                          transition={{ delay: 0.3 + index * 0.1 }}
                          whileHover={{ scale: 1.02 }}
                        >
                          <div className="absolute inset-0 bg-gradient-to-r from-primary/5 to-orange-500/5 opacity-0 group-hover:opacity-100 transition-all duration-300" />
                          <div className="flex items-center justify-between p-3 bg-accent/30 rounded-lg border border-border group-hover:border-primary/30 transition-all duration-300">
                            <span className="capitalize">{status.status}</span>
                            <span className="font-bold">{status.count}</span>
                          </div>
                        </motion.div>
                      )
                    )}
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
                        Payment Status
                      </span>
                    </div>
                  </div>
                  <div className="grid grid-cols-2 gap-2">
                    {data.bookings.paymentStatusCounts.map(
                      (status: any, index: number) => (
                        <motion.div
                          key={index}
                          className="relative group overflow-hidden"
                          initial={{ opacity: 0, y: 20 }}
                          animate={{ opacity: 1, y: 0 }}
                          transition={{ delay: 0.5 + index * 0.1 }}
                          whileHover={{ scale: 1.02 }}
                        >
                          <div className="absolute inset-0 bg-gradient-to-r from-green-500/5 to-green-600/5 opacity-0 group-hover:opacity-100 transition-all duration-300" />
                          <div className="flex items-center justify-between p-3 bg-accent/30 rounded-lg border border-border group-hover:border-green-500/30 transition-all duration-300">
                            <span className="capitalize">{status.status}</span>
                            <span className="font-bold">{status.count}</span>
                          </div>
                        </motion.div>
                      )
                    )}
                  </div>
                </motion.div>

                <motion.div
                  className="mt-4 p-4 rounded-lg bg-gradient-to-br from-primary/5 to-orange-500/5 border border-primary/10"
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.7 }}
                >
                  <div className="flex items-center justify-between">
                    <h4 className="text-sm font-medium">Revenue Trend</h4>
                    <Badge variant="outline" className="text-xs">
                      This Month
                    </Badge>
                  </div>
                  <div className="flex items-center mt-2">
                    <TrendingUp className="h-4 w-4 text-green-500 mr-2" />
                    <span className="text-sm text-green-500">
                      +12.5% from last month
                    </span>
                  </div>
                </motion.div>
              </div>
            </CardContent>
          </Card>
        </motion.div>
      </div>

      <div className="grid gap-4 md:grid-cols-2">
        <motion.div variants={item}>
          <Card className="overflow-hidden backdrop-blur-sm bg-card/60 border-muted/40 dark:shadow-inner dark:shadow-white/5 h-full">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <PieChart className="h-5 w-5 text-primary" />
                Subject Analytics
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
                      <PieChart className="h-4 w-4 text-primary" />
                      <span className="text-sm font-medium">Categories</span>
                    </div>
                  </div>
                  <div className="space-y-2">
                    {data.subjects.categories.map(
                      (category: any, index: number) => (
                        <motion.div
                          key={index}
                          className="space-y-1"
                          initial={{ opacity: 0, x: -20 }}
                          animate={{ opacity: 1, x: 0 }}
                          transition={{ delay: 0.3 + index * 0.1 }}
                        >
                          <div className="flex items-center justify-between text-sm">
                            <span>{category.category}</span>
                            <span className="font-medium">
                              {category.count}
                            </span>
                          </div>
                          <div className="relative pt-1">
                            <div className="overflow-hidden h-2 text-xs flex rounded-full bg-primary/10">
                              <motion.div
                                className={`shadow-none flex flex-col text-center whitespace-nowrap text-white justify-center ${
                                  index % 2 === 0
                                    ? "bg-gradient-to-r from-primary to-primary/70"
                                    : "bg-gradient-to-r from-orange-500 to-orange-400"
                                }`}
                                initial={{ width: 0 }}
                                animate={{
                                  width: `${
                                    (category.count /
                                      data.subjects.categories.reduce(
                                        (acc: any, curr: any) =>
                                          acc + curr.count,
                                        0
                                      )) *
                                    100
                                  }%`,
                                }}
                                transition={{
                                  duration: 1,
                                  ease: "easeOut",
                                  delay: 0.3 + index * 0.1,
                                }}
                              />
                            </div>
                          </div>
                        </motion.div>
                      )
                    )}
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
                      <BarChart3 className="h-4 w-4 text-primary" />
                      <span className="text-sm font-medium">Grade Levels</span>
                    </div>
                  </div>
                  <div className="space-y-2">
                    {data.subjects.grades.map((grade: any, index: number) => (
                      <motion.div
                        key={index}
                        className="space-y-1"
                        initial={{ opacity: 0, x: -20 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ delay: 0.5 + index * 0.1 }}
                      >
                        <div className="flex items-center justify-between text-sm">
                          <span>{grade.grade}</span>
                          <span className="font-medium">{grade.count}</span>
                        </div>
                        <div className="relative pt-1">
                          <div className="overflow-hidden h-2 text-xs flex rounded-full bg-primary/10">
                            <motion.div
                              className={`shadow-none flex flex-col text-center whitespace-nowrap text-white justify-center ${
                                index % 2 === 0
                                  ? "bg-gradient-to-r from-green-500 to-green-600"
                                  : "bg-gradient-to-r from-blue-500 to-blue-600"
                              }`}
                              initial={{ width: 0 }}
                              animate={{
                                width: `${
                                  (grade.count /
                                    data.subjects.grades.reduce(
                                      (acc: any, curr: any) => acc + curr.count,
                                      0
                                    )) *
                                  100
                                }%`,
                              }}
                              transition={{
                                duration: 1,
                                ease: "easeOut",
                                delay: 0.5 + index * 0.1,
                              }}
                            />
                          </div>
                        </div>
                      </motion.div>
                    ))}
                  </div>
                </motion.div>
              </div>
            </CardContent>
          </Card>
        </motion.div>

        <motion.div variants={item}>
          <Card className="overflow-hidden backdrop-blur-sm bg-card/60 border-muted/40 dark:shadow-inner dark:shadow-white/5 h-full">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <FileText className="h-5 w-5 text-primary" />
                Content Analytics
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
                      <FileText className="h-4 w-4 text-primary" />
                      <span className="text-sm font-medium">Blog Status</span>
                    </div>
                  </div>
                  <div className="grid grid-cols-2 gap-4">
                    <motion.div
                      className="relative group overflow-hidden"
                      whileHover={{ scale: 1.05 }}
                      transition={{
                        type: "spring",
                        stiffness: 400,
                        damping: 10,
                      }}
                    >
                      <div className="absolute inset-0 bg-gradient-to-br from-green-500/20 to-green-600/10 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                      <div className="flex flex-col items-center justify-center p-4 bg-green-500/10 rounded-lg border border-green-500/20 group-hover:border-green-500/40 transition-colors duration-300 relative z-10">
                        <span className="text-2xl font-bold text-green-500">
                          <AnimatedCounter value={data.blogs.published} />
                        </span>
                        <span className="text-xs text-muted-foreground">
                          Published
                        </span>
                      </div>
                    </motion.div>
                    <motion.div
                      className="relative group overflow-hidden"
                      whileHover={{ scale: 1.05 }}
                      transition={{
                        type: "spring",
                        stiffness: 400,
                        damping: 10,
                      }}
                    >
                      <div className="absolute inset-0 bg-gradient-to-br from-orange-500/20 to-orange-600/10 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                      <div className="flex flex-col items-center justify-center p-4 bg-orange-500/10 rounded-lg border border-orange-500/20 group-hover:border-orange-500/40 transition-colors duration-300 relative z-10">
                        <span className="text-2xl font-bold text-orange-500">
                          <AnimatedCounter value={data.blogs.draft} />
                        </span>
                        <span className="text-xs text-muted-foreground">
                          Drafts
                        </span>
                      </div>
                    </motion.div>
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
                      <Star className="h-4 w-4 text-amber-500" />
                      <span className="text-sm font-medium">Reviews</span>
                    </div>
                  </div>
                  <motion.div
                    className="relative group overflow-hidden"
                    whileHover={{ scale: 1.02 }}
                    transition={{ type: "spring", stiffness: 400, damping: 10 }}
                  >
                    <div className="absolute inset-0 bg-gradient-to-br from-amber-500/10 to-amber-600/5 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                    <div className="p-4 bg-accent/50 rounded-lg border border-border group-hover:border-amber-500/30 transition-all duration-300 relative z-10">
                      <div className="flex items-center justify-between mb-2">
                        <span>Total Reviews</span>
                        <span className="font-bold">{data.reviews.total}</span>
                      </div>
                      <div className="flex items-center justify-between">
                        <span>Average Rating</span>
                        <div className="flex items-center">
                          <span className="font-bold mr-2">
                            {data.reviews.avgRating}/5
                          </span>
                          <div className="flex">
                            {[1, 2, 3, 4, 5].map((star) => (
                              <motion.div
                                key={star}
                                initial={{ scale: 0 }}
                                animate={{ scale: 1 }}
                                transition={{ delay: 0.5 + star * 0.1 }}
                              >
                                <Star
                                  className={`h-4 w-4 ${
                                    star <= Math.round(data.reviews.avgRating)
                                      ? "text-amber-400 fill-amber-400"
                                      : "text-muted-foreground/30"
                                  }`}
                                />
                              </motion.div>
                            ))}
                          </div>
                        </div>
                      </div>
                    </div>
                  </motion.div>
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
            <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
              <motion.div
                className="relative group overflow-hidden"
                whileHover={{ scale: 1.02 }}
                transition={{ type: "spring", stiffness: 400, damping: 10 }}
              >
                <div className="absolute inset-0 bg-gradient-to-br from-blue-500/10 to-blue-500/5 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                <div className="flex flex-col items-center justify-center p-6 border border-border rounded-lg group-hover:border-blue-500/50 transition-all duration-300 relative z-10">
                  <div className="absolute -bottom-6 -right-6 w-24 h-24 bg-blue-500/10 rounded-full blur-xl opacity-0 group-hover:opacity-70 transition-opacity duration-300" />
                  <Users className="h-8 w-8 text-blue-500 mb-2 group-hover:scale-110 transition-transform duration-300" />
                  <h3 className="font-medium">Manage Users</h3>
                  <p className="text-xs text-muted-foreground text-center mt-1">
                    View and edit user accounts
                  </p>
                </div>
              </motion.div>

              <motion.div
                className="relative group overflow-hidden"
                whileHover={{ scale: 1.02 }}
                transition={{ type: "spring", stiffness: 400, damping: 10 }}
              >
                <div className="absolute inset-0 bg-gradient-to-br from-green-500/10 to-green-500/5 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                <div className="flex flex-col items-center justify-center p-6 border border-border rounded-lg group-hover:border-green-500/50 transition-all duration-300 relative z-10">
                  <div className="absolute -bottom-6 -right-6 w-24 h-24 bg-green-500/10 rounded-full blur-xl opacity-0 group-hover:opacity-70 transition-opacity duration-300" />
                  <BookOpen className="h-8 w-8 text-green-500 mb-2 group-hover:scale-110 transition-transform duration-300" />
                  <h3 className="font-medium">Manage Bookings</h3>
                  <p className="text-xs text-muted-foreground text-center mt-1">
                    Review booking requests
                  </p>
                </div>
              </motion.div>

              <motion.div
                className="relative group overflow-hidden"
                whileHover={{ scale: 1.02 }}
                transition={{ type: "spring", stiffness: 400, damping: 10 }}
              >
                <div className="absolute inset-0 bg-gradient-to-br from-purple-500/10 to-purple-500/5 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                <div className="flex flex-col items-center justify-center p-6 border border-border rounded-lg group-hover:border-purple-500/50 transition-all duration-300 relative z-10">
                  <div className="absolute -bottom-6 -right-6 w-24 h-24 bg-purple-500/10 rounded-full blur-xl opacity-0 group-hover:opacity-70 transition-opacity duration-300" />
                  <FileText className="h-8 w-8 text-purple-500 mb-2 group-hover:scale-110 transition-transform duration-300" />
                  <h3 className="font-medium">Manage Blogs</h3>
                  <p className="text-xs text-muted-foreground text-center mt-1">
                    Create and edit blog posts
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
                  <h3 className="font-medium">Manage Reviews</h3>
                  <p className="text-xs text-muted-foreground text-center mt-1">
                    Moderate user reviews
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

export default AdminDashboard;
