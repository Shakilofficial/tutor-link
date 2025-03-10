export const categories = [
  "All",
  "Study Tips",
  "Exam Guide",
  "Tutoring",
  "Platform News",
  "Online Learning",
  "Success Stories",
] as const;

export enum BlogCategory {
  STUDY_TIPS = "Study Tips",
  EXAM_GUIDE = "Exam Guide",
  TUTORING = "Tutoring",
  PLATFORM_NEWS = "Platform News",
  ONLINE_LEARNING = "Online Learning",
  SUCCESS_STORIES = "Success Stories",
}

export const categoriesOptions = [
  { value: BlogCategory.STUDY_TIPS, label: "Study Tips" },
  { value: BlogCategory.EXAM_GUIDE, label: "Exam Guide" },
  { value: BlogCategory.TUTORING, label: "Tutoring" },
  { value: BlogCategory.PLATFORM_NEWS, label: "Platform News" },
  { value: BlogCategory.ONLINE_LEARNING, label: "Online Learning" },
  { value: BlogCategory.SUCCESS_STORIES, label: "Success Stories" },
];
