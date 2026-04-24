import React, { useState, useContext, useEffect } from "react";
import { AppContext } from "../context/AppContext";
import CourseCard from "../components/CourseCard";

const Courses = () => {
  const { courses, user } = useContext(AppContext);
  const [searchTerm, setSearchTerm] = useState("");
  const [category, setCategory] = useState("All");
  const [isLoaded, setIsLoaded] = useState(false);

  useEffect(() => {
    setIsLoaded(true);
  }, []);

  const enrolledCourses = user?.enrolledCourses || [];
  const completedCourses = user?.completedCourses || [];

  const filteredCourses = courses.filter((course) => {
    const matchesSearch =
      course.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      (course.instructor && course.instructor.toLowerCase().includes(searchTerm.toLowerCase()));
    
    // category filter (if backend supports it, otherwise default to showing all)
    const matchesCategory = category === "All" || (course.category && course.category === category);
    
    return matchesSearch && matchesCategory;
  });

  return (
    <div className="min-h-screen bg-slate-50 py-16 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-16">
          <div className="inline-block px-3 py-1 bg-emerald-500/10 border border-emerald-500/20 rounded-full text-emerald-600 text-[10px] font-black uppercase tracking-widest mb-4">
            Academic Catalog 2024
          </div>
          <h1 className="text-4xl md:text-6xl font-black text-slate-900 mb-6 tracking-tight">
            Professional Curricula
          </h1>
          <p className="text-xl text-slate-500 max-w-2xl mx-auto font-medium">
            Explore industry-vetted courses designed to bridge the gap between theory and high-performance implementation.
          </p>
        </div>

        {/* Filters and Search */}
        <div className="bg-white p-6 rounded-3xl shadow-xl shadow-slate-200/50 mb-12 flex flex-col md:flex-row gap-6 items-center justify-between border border-slate-100">
          <div className="w-full md:w-2/3 relative">
            <input
              type="text"
              placeholder="Search by module title, investigator or keyword..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full pl-14 pr-6 py-4 rounded-2xl border-2 border-slate-100 focus:ring-4 focus:ring-emerald-500/20 focus:border-emerald-500 transition-all text-slate-900 placeholder-slate-400 font-bold"
            />
            <div className="absolute left-5 top-1/2 -translate-y-1/2 text-slate-400">
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="3" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"></path></svg>
            </div>
          </div>

          <div className="w-full md:w-1/3">
            <select
              value={category}
              onChange={(e) => setCategory(e.target.value)}
              className="w-full py-4 px-6 rounded-2xl border-2 border-slate-100 focus:ring-4 focus:ring-emerald-500/20 focus:border-emerald-500 transition-all bg-white text-slate-900 font-black uppercase tracking-tighter"
            >
              <option value="All">Global Domains</option>
              <option value="Development">Full-Stack Dev</option>
              <option value="Design">Visual Design</option>
              <option value="Business">Strategic Ops</option>
            </select>
          </div>
        </div>

        {/* Course Grid */}
        <div
          className={`grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10 transition-all duration-700 ${isLoaded ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"}`}
        >
          {filteredCourses.length > 0 ? (
            filteredCourses.map((course) => (
              <CourseCard
                key={course.courseId}
                {...course}
                enrolled={
                  enrolledCourses.includes(course.courseId) ||
                  completedCourses.includes(course.courseId)
                }
              />
            ))
          ) : (
            <div className="col-span-full text-center py-24 bg-white rounded-3xl border-2 border-dashed border-slate-200">
              <div className="text-4xl mb-6 opacity-40">🔎</div>
              <h3 className="text-2xl font-black text-slate-400 uppercase tracking-widest leading-none mb-2">No Matches Identified</h3>
              <p className="text-slate-500 font-bold">Try adjusting your search parameters.</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Courses;
