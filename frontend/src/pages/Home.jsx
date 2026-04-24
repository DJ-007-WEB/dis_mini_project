import React, { useContext } from "react";
import { Link } from "react-router-dom";
import { AppContext } from "../context/AppContext";
import CourseCard from "../components/CourseCard";

const Home = () => {
  const { courses, user, isAuthenticated } = useContext(AppContext);
  const featuredCourses = courses.slice(0, 3);

  return (
    <div className="min-h-screen bg-slate-50">
      {/* Hero Section - Premium Overhaul */}
      <div className="relative bg-slate-900 pt-20 pb-32 overflow-hidden">
        {/* Abstract Background Shapes */}
        <div className="absolute top-0 left-0 w-full h-full overflow-hidden pointer-events-none">
          <div className="absolute -top-24 -left-24 w-96 h-96 bg-emerald-500/10 rounded-full blur-3xl"></div>
          <div className="absolute top-1/2 -right-48 w-[500px] h-[500px] bg-emerald-600/5 rounded-full blur-3xl"></div>
        </div>

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 text-center">
          <div className="inline-block px-4 py-1.5 mb-6 bg-emerald-500/10 border border-emerald-500/20 rounded-full backdrop-blur-sm">
            <span className="text-emerald-400 text-xs font-black uppercase tracking-widest leading-none">
              Welcome to the Future of Learning
            </span>
          </div>
          <h1 className="text-5xl md:text-7xl font-black tracking-tight mb-8 text-white max-w-4xl mx-auto leading-tight">
            Knowledge is the <span className="text-emerald-500">Ultimate</span>{" "}
            Antigravity.
          </h1>
          <p className="text-xl md:text-2xl font-medium mb-12 max-w-2xl mx-auto text-slate-400 leading-relaxed">
            Elevate your career with premium courses designed by industry
            leaders. Join 50,000+ students mastering tomorrow's skills today.
          </p>
          <div className="flex flex-col sm:flex-row justify-center gap-6">
            <Link
              to="/courses"
              className="bg-emerald-600 text-white font-black py-5 px-12 rounded-2xl shadow-2xl shadow-emerald-600/30 hover:bg-emerald-500 hover:-translate-y-1 transition-all duration-300 text-lg uppercase tracking-wider"
            >
              Explore Catalog
            </Link>
            {isAuthenticated ? (
              <Link
                to="/dashboard"
                className="bg-slate-800 text-white font-bold py-5 px-12 rounded-2xl border border-slate-700 hover:bg-slate-700 transition-all duration-300 text-lg"
              >
                Go to Learning Hall
              </Link>
            ) : (
              <Link
                to="/signup"
                className="bg-white text-slate-900 font-bold py-5 px-12 rounded-2xl hover:bg-slate-100 transition-all duration-300 text-lg"
              >
                Start Free Trial
              </Link>
            )}
          </div>
        </div>
      </div>

      {/* Trust & Stats Section */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 -mt-16 relative z-20">
        <div className="bg-white rounded-[32px] shadow-2xl p-10 grid grid-cols-1 md:grid-cols-3 gap-12 text-center border border-slate-100">
          <div className="flex flex-col items-center">
            <div className="w-16 h-16 bg-emerald-50 rounded-2xl flex items-center justify-center mb-4">
              <svg className="w-8 h-8 text-emerald-600" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253"></path></svg>
            </div>
            <div className="text-4xl font-black text-slate-900 mb-1">150+</div>
            <div className="text-slate-500 font-bold uppercase tracking-widest text-xs">Premium Courses</div>
          </div>
          <div className="flex flex-col items-center">
            <div className="w-16 h-16 bg-slate-50 rounded-2xl flex items-center justify-center mb-4">
              <svg className="w-8 h-8 text-slate-600" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1zm0 0h6v-1a6 6 0 00-9-5.197M13 7a4 4 0 11-8 0 4 4 0 018 0z"></path></svg>
            </div>
            <div className="text-4xl font-black text-slate-900 mb-1">50K+</div>
            <div className="text-slate-500 font-bold uppercase tracking-widest text-xs">Active Scholars</div>
          </div>
          <div className="flex flex-col items-center">
            <div className="w-16 h-16 bg-emerald-50 rounded-2xl flex items-center justify-center mb-4">
              <svg className="w-8 h-8 text-emerald-600" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z"></path></svg>
            </div>
            <div className="text-4xl font-black text-slate-900 mb-1">98%</div>
            <div className="text-slate-500 font-bold uppercase tracking-widest text-xs">Success Rate</div>
          </div>
        </div>
      </div>

      {/* Featured Courses - Modern Grid */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-24">
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-16 gap-6">
          <div className="max-w-2xl">
            <h2 className="text-4xl font-black text-slate-900 mb-4 tracking-tight">
              Curated for Excellence.
            </h2>
            <p className="text-lg text-slate-500 font-medium">
              Hand-picked courses from the world's most sought-after instructors. 
              Start your transformation today.
            </p>
          </div>
          <Link
            to="/courses"
            className="inline-flex items-center gap-3 text-emerald-600 font-black uppercase tracking-widest text-sm hover:gap-5 transition-all"
          >
            All Courses <span>→</span>
          </Link>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10">
          {featuredCourses.map((course) => (
            <div key={course.id} className="fade-in">
              <CourseCard
                {...course}
                enrolled={
                  isAuthenticated &&
                  (user.enrolledCourses.includes(course.id) ||
                    user.completedCourses.includes(course.id))
                }
              />
            </div>
          ))}
        </div>
      </div>

      {/* CTA Section */}
      <div className="bg-emerald-600 py-20">
        <div className="max-w-4xl mx-auto text-center px-4">
          <h2 className="text-3xl md:text-5xl font-black text-white mb-8">
            Ready to gravity-proof your career?
          </h2>
          <Link 
            to="/signup" 
            className="inline-block bg-slate-900 text-white font-black py-5 px-16 rounded-2xl hover:bg-slate-800 transition-all text-xl"
          >
            Get Started for Free
          </Link>
        </div>
      </div>
    </div>
  );
};

export default Home;
