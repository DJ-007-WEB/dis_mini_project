export const courses = [
  {
    courseId: 1,
    title: "Advanced React Patterns",
    instructor: "Sarah Johnson",
    duration: "8 weeks",
    rating: 4.8,
    enrolled: false,
    image:
      "https://images.unsplash.com/photo-1633356122544-f134324a6cee?w=800&q=80",
    lessons: [
      { lessonId: 101, title: "Introduction to Patterns", duration: "15 min" },
      { lessonId: 102, title: "Higher Order Components", duration: "25 min" },
      { lessonId: 103, title: "Render Props", duration: "20 min" },
    ],
    assignments: [
      {
        assignId: 201,
        title: "Pattern Selection",
        desc: "Choose the correct pattern for higher order logic.",
      },
    ],
  },
  {
    courseId: 2,
    title: "Fullstack Next.js",
    instructor: "Michael Chen",
    duration: "10 weeks",
    rating: 4.9,
    enrolled: false,
    image:
      "https://images.unsplash.com/photo-1618477388954-7852f32655cb?w=800&q=80",
    lessons: [
      { lessonId: 104, title: "Next.js Basics", duration: "20 min" },
      { lessonId: 105, title: "Server Side Rendering", duration: "30 min" },
    ],
    assignments: [
      {
        assignId: 202,
        title: "SSR Implementation",
        desc: "Evaluate server side rendering performance.",
      },
    ],
  },
  {
    courseId: 3,
    title: "UI/UX for Developers",
    instructor: "Emma Watson",
    duration: "6 weeks",
    rating: 4.7,
    enrolled: true,
    image:
      "https://images.unsplash.com/photo-1561070791-2526d30994b5?w=800&q=80",
    lessons: [
      { lessonId: 106, title: "Color Theory", duration: "15 min" },
      { lessonId: 107, title: "Typography", duration: "20 min" },
    ],
    assignments: [
      {
        assignId: 203,
        title: "Visual Hierarchy",
        desc: "Check your understanding of UI spacing.",
      },
    ],
  },
];

export const user = {
  name: "Alex Carter",
  studentId: 1,
  enrolledCourses: [3],
  completedCourses: [5],
  certificates: [
    { certId: 1, courseTitle: "Introduction to JavaScript", date: "2023-12-01" },
  ],
  learningStreak: { current: 5, best: 12 },
  weeklyActivity: [2.5, 3, 0, 4.5, 2, 3.5, 1.5],
  upcomingDeadlines: [
    {
      id: 1,
      courseId: 1,
      assignmentId: 201,
      title: "What is a Higher Order Component?",
      dueDate: new Date(Date.now() + 86400000 * 0.5).toISOString(),
      courseName: "Advanced React Patterns",
      urgency: "red",
    },
    {
      id: 2,
      courseId: 2,
      assignmentId: 202,
      title: "Which method is used for SSR in Next.js?",
      dueDate: new Date(Date.now() + 86400000 * 2).toISOString(),
      courseName: "Fullstack Next.js",
      urgency: "amber",
    },
    {
      id: 3,
      courseId: 3,
      assignmentId: 203,
      title: "What does UI stand for?",
      dueDate: new Date(Date.now() + 86400000 * 5).toISOString(),
      courseName: "UI/UX for Developers",
      urgency: "green",
    },
  ],
  recentActivities: [
    {
      id: 1,
      type: "lesson",
      title: "Completed lesson: Color Theory",
      timestamp: "2 hours ago",
      courseId: 3,
    },
    {
      id: 2,
      type: "certificate",
      title: "Earned certificate: Introduction to JavaScript",
      timestamp: "1 day ago",
      courseId: null,
    },
    {
      id: 3,
      type: "course",
      title: "Started new course: UI/UX for Developers",
      timestamp: "3 days ago",
      courseId: 3,
    },
  ],
  achievements: [
    {
      id: 1,
      name: "First Course",
      icon: "🏆",
      earnedDate: "2023-10-15",
      description: "Completed your first course!",
    },
    {
      id: 2,
      name: "Speed Learner",
      icon: "⚡",
      earnedDate: "2023-11-20",
      description: "Completed 3 lessons in one day",
    },
    {
      id: 3,
      name: "5 Course Streak",
      icon: "🔥",
      earnedDate: "2023-12-05",
      description: "Enrolled in 5 consecutive courses",
    },
  ],
  totalLearningHours: 47,
  averageQuizScore: 87,
  averageCourseCompletion: 15,
};
