import React, { useContext } from 'react';
import { Link } from 'react-router-dom';
import { AppContext } from '../context/AppContext';
import CourseCard from '../components/CourseCard';

const Home = () => {
  const { courses, user, isAuthenticated } = useContext(AppContext);
  const featuredCourses = courses.slice(0, 3);

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Hero Section */}
      <div className="bg-gradient-to-br from-slate-900 via-slate-800 to-emerald-900 text-white py-20 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto text-center">
          <h1 className="text-4xl md:text-6xl font-extrabold tracking-tight mb-6 text-white">
            Unlock Your Potential with LearnHub
          </h1>
          <p className="text-xl md:text-2xl font-light mb-10 max-w-3xl mx-auto opacity-90 text-white">
            Join thousands of learners and master new skills with our expert-led online courses.
          </p>
          <div className="flex justify-center gap-4">
            <Link 
              to="/courses" 
              className="bg-emerald-600 text-white font-bold py-3 px-8 rounded-full shadow-lg hover:bg-emerald-700 transition-all duration-300 hover:scale-105 focus:ring-4 focus:ring-emerald-200"
            >
              Explore Courses
            </Link>
            {isAuthenticated ? (
              <Link 
                to="/dashboard" 
                className="bg-transparent border-2 border-white text-white font-bold py-3 px-8 rounded-full hover:bg-white hover:text-slate-900 transition-all duration-300"
              >
                My Dashboard
              </Link>
            ) : (
              <Link 
                to="/signup" 
                className="bg-transparent border-2 border-white text-white font-bold py-3 px-8 rounded-full hover:bg-white hover:text-slate-900 transition-all duration-300"
              >
                Get Started
              </Link>
            )}
          </div>
        </div>
      </div>

      {/* Statistics Section */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 -mt-16">
        <div className="bg-white rounded-xl shadow-xl p-8 grid grid-cols-1 md:grid-cols-3 gap-8 text-center divide-y md:divide-y-0 md:divide-x divide-gray-200">
          <div className="p-4">
            <div className="text-4xl font-bold text-emerald-600 mb-2">150+</div>
            <div className="text-gray-600 font-medium uppercase tracking-wide">Expert Courses</div>
          </div>
          <div className="p-4">
            <div className="text-4xl font-bold text-slate-800 mb-2">50k+</div>
            <div className="text-gray-600 font-medium uppercase tracking-wide">Active Students</div>
          </div>
          <div className="p-4">
            <div className="text-4xl font-bold text-emerald-600 mb-2">98%</div>
            <div className="text-gray-600 font-medium uppercase tracking-wide">Completion Rate</div>
          </div>
        </div>
      </div>

      {/* Featured Courses */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">Featured Courses</h2>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            Discover our most popular courses and start learning today.
          </p>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {featuredCourses.map(course => (
            <CourseCard 
              key={course.id}
              {...course}
              enrolled={isAuthenticated && (user.enrolledCourses.includes(course.id) || user.completedCourses.includes(course.id))}
            />
          ))}
        </div>
        <div className="text-center mt-12">
          <Link 
            to="/courses"
            className="inline-block bg-slate-700 text-white font-semibold py-3 px-8 rounded-full hover:bg-slate-800 focus:ring-4 focus:ring-slate-200 transition-colors duration-300"
          >
            View All Courses
          </Link>
        </div>
      </div>
    </div>
  );
};

export default Home;
