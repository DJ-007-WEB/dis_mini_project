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
  ]
};
