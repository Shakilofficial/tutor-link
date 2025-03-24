"use client";

import type React from "react";
import { cn } from "@/lib/utils";
import { AnimatePresence, motion } from "framer-motion";
import {
  AArrowUpIcon as Abc,
  BookOpen,
  BookText,
  Calculator,
  ChevronDown,
  Code,
  GraduationCap,
  Layers,
  LineChart,
  Palette,
} from "lucide-react";
import Link from "next/link";
import { useEffect, useState } from "react";

interface Subject {
  _id: string;
  name: string;
  gradeLevel: string;
  category: string;
}

interface CategoryWithSubjects {
  subjects: Subject[];
  category: string;
}

const categoryIcons: Record<string, React.ReactNode> = {
  CSE: <Code className="h-4 w-4 text-blue-500" />,
  Arts: <Palette className="h-4 w-4 text-purple-500" />,
  Science: <Calculator className="h-4 w-4 text-green-500" />,
  General: <BookText className="h-4 w-4 text-orange-500" />,
  BBA: <LineChart className="h-4 w-4 text-red-500" />,
  Basic: <Abc className="h-4 w-4 text-teal-500" />,
  Commerce: <LineChart className="h-4 w-4 text-amber-500" />,
};

const DefaultIcon = <Layers className="h-4 w-4 text-gray-500" />;

export default function MegaMenu() {
  const [isOpen, setIsOpen] = useState(false);
  const [subjects, setSubjects] = useState<CategoryWithSubjects[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchSubjects = async () => {
      try {
        const response = await fetch(
          `${process.env.NEXT_PUBLIC_BASE_API}/subject/category`
        );
        const data = await response.json();
        setSubjects(data.data || []);
      } catch (error) {
        console.error("Error fetching subjects:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchSubjects();
  }, []);

  return (
    <div
      className="relative"
      onMouseEnter={() => setIsOpen(true)}
      onMouseLeave={() => setIsOpen(false)}
    >
      <button
        className={cn(
          "flex items-center gap-1 px-3 py-2 text-sm font-medium transition-colors duration-300 group",
          isOpen
            ? "text-primary"
            : "text-muted-foreground hover:text-foreground"
        )}
      >
        <BookOpen className="h-4 w-4 mr-1" />
        SUBJECTS
        <ChevronDown
          className={cn(
            "h-4 w-4 transition-transform duration-200",
            isOpen ? "rotate-180" : ""
          )}
        />
        <span className="absolute inset-0 z-0 rounded-md opacity-0 bg-orange-950/10 transition-opacity duration-300 group-hover:opacity-100" />
      </button>

      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 10 }}
            transition={{ duration: 0.2 }}
            className="absolute -left-20 mt-2 w-screen max-w-3xl bg-background rounded-md shadow-lg border border-border/50 overflow-hidden z-50"
          >
            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-3 gap-x-4 gap-y-2 p-4">
              {loading
                ? Array.from({ length: 8 }).map((_, index) => (
                    <div key={index} className="animate-pulse">
                      <div className="h-5 bg-gray-200 dark:bg-gray-800 rounded w-1/3 mb-2"></div>
                      <div className="space-y-1.5">
                        {Array.from({ length: 3 }).map((_, i) => (
                          <div
                            key={i}
                            className="h-3 bg-gray-100 dark:bg-gray-900 rounded w-3/4"
                          ></div>
                        ))}
                      </div>
                    </div>
                  ))
                : subjects.map((category) => (
                    <div
                      key={category.category}
                      className="space-y-1.5 min-w-[180px]"
                    >
                      <div className="flex items-center gap-1.5 border-b border-border/20 pb-1">
                        {categoryIcons[category.category] || DefaultIcon}
                        <h3 className="text-sm font-medium text-foreground">
                          {category.category}
                        </h3>
                      </div>
                      <ul className="space-y-0.5">
                        {category.subjects.map((subject) => (
                          <li key={subject?._id}>
                            <Link
                              href={`/tutors?searchTerm=${subject?.name}`}
                              className="flex items-center text-xs text-muted-foreground hover:text-primary transition-colors py-1 px-1.5 rounded hover:bg-accent/40 group"
                            >
                              <GraduationCap className="h-3 w-3 opacity-70 group-hover:opacity-100 mr-1.5" />
                              <span className="truncate">{subject?.name}</span>
                              <span className="ml-auto text-[10px] bg-accent/60 px-1 py-0.5 rounded-sm text-muted-foreground whitespace-nowrap">
                                {subject?.gradeLevel}
                              </span>
                            </Link>
                          </li>
                        ))}
                      </ul>
                    </div>
                  ))}
            </div>

            <div className="bg-accent/20 py-2 px-4 border-t border-border/20 flex items-center justify-between">
              <p className="text-xs text-muted-foreground">
                Find tutors specialized subjects
              </p>
              <Link
                href="/tutors"
                className="text-xs font-medium text-primary hover:underline flex items-center"
              >
                View all 
                <ChevronDown className="h-3 w-3 rotate-[-90deg] ml-1" />
              </Link>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
