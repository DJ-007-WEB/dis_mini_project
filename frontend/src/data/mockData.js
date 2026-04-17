export const courses = [
  {
    id: 1,
    title: "Advanced React Patterns",
    instructor: "Sarah Johnson",
    duration: "8 weeks",
    rating: 4.8,
    enrolled: false,
    image: "https://images.unsplash.com/photo-1633356122544-f134324a6cee?w=800&q=80",
    lessons: [
      { id: 101, title: "Introduction to Patterns", duration: "15 min" },
      { id: 102, title: "Higher Order Components", duration: "25 min" },
      { id: 103, title: "Render Props", duration: "20 min" }
    ],
    assignments: [
      { id: 201, question: "What is a Higher Order Component?", options: ["A component that renders another component", "A function that takes a component and returns a new component", "A component with state", "A built-in React component"], answer: 1 }
    ]
  },
  {
    id: 2,
    title: "Fullstack Next.js",
    instructor: "Michael Chen",
    duration: "10 weeks",
    rating: 4.9,
    enrolled: false,
    image: "https://images.unsplash.com/photo-1618477388954-7852f32655cb?w=800&q=80",
    lessons: [
      { id: 104, title: "Next.js Basics", duration: "20 min" },
      { id: 105, title: "Server Side Rendering", duration: "30 min" }
    ],
    assignments: [
      { id: 202, question: "Which method is used for SSR in Next.js?", options: ["getStaticProps", "getServerSideProps", "useEffect", "componentDidMount"], answer: 1 }
    ]
  },
  {
    id: 3,
    title: "UI/UX for Developers",
    instructor: "Emma Watson",
    duration: "6 weeks",
    rating: 4.7,
    enrolled: true,
    image: "https://images.unsplash.com/photo-1561070791-2526d30994b5?w=800&q=80",
    lessons: [
      { id: 106, title: "Color Theory", duration: "15 min" },
      { id: 107, title: "Typography", duration: "20 min" }
    ],
    assignments: [
      { id: 203, question: "What does UI stand for?", options: ["User Interface", "User Integration", "Universal Interface", "Unique Identity"], answer: 0 }
    ]
  }
];

export const user = {
  name: "Alex Carter",
  enrolledCourses: [3],
  completedCourses: [5],
  certificates: [
    { id: 1, courseTitle: "Introduction to JavaScript", date: "2023-12-01" }
  ],
  learningStreak: { current: 5, best: 12 },
  weeklyActivity: [2.5, 3, 0, 4.5, 2, 3.5, 1.5],
  upcomingDeadlines: [
    { id: 1, courseId: 1, assignmentId: 201, title: 'What is a Higher Order Component?', dueDate: new Date(Date.now() + 86400000 * 0.5).toISOString(), courseName: 'Advanced React Patterns', urgency: 'red' },
    { id: 2, courseId: 2, assignmentId: 202, title: 'Which method is used for SSR in Next.js?', dueDate: new Date(Date.now() + 86400000 * 2).toISOString(), courseName: 'Fullstack Next.js', urgency: 'amber' },
    { id: 3, courseId: 3, assignmentId: 203, title: 'What does UI stand for?', dueDate: new Date(Date.now() + 86400000 * 5).toISOString(), courseName: 'UI/UX for Developers', urgency: 'green' }
  ],
  recentActivities: [
    { id: 1, type: 'lesson', title: 'Completed lesson: Color Theory', timestamp: '2 hours ago', courseId: 3 },
    { id: 2, type: 'certificate', title: 'Earned certificate: Introduction to JavaScript', timestamp: '1 day ago', courseId: null },
    { id: 3, type: 'course', title: 'Started new course: UI/UX for Developers', timestamp: '3 days ago', courseId: 3 }
  ],
  achievements: [
    { id: 1, name: 'First Course', icon: '🏆', earnedDate: '2023-10-15', description: 'Completed your first course!' },
    { id: 2, name: 'Speed Learner', icon: '⚡', earnedDate: '2023-11-20', description: 'Completed 3 lessons in one day' },
    { id: 3, name: '5 Course Streak', icon: '🔥', earnedDate: '2023-12-05', description: 'Enrolled in 5 consecutive courses' }
  ],
  totalLearningHours: 47,
  averageQuizScore: 87,
  averageCourseCompletion: 15
};
