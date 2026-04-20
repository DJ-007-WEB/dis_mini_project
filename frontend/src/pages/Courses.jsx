import React, { useState, useContext, useEffect } from 'react';
import { AppContext } from '../context/AppContext';
import CourseCard from '../components/CourseCard';

const Courses = () => {
  const { courses, user } = useContext(AppContext);
  const [searchTerm, setSearchTerm] = useState('');
  const [category, setCategory] = useState('All');
  const [isLoaded, setIsLoaded] = useState(false);

  useEffect(() => {
    setIsLoaded(true);
  }, []);

  const filteredCourses = courses.filter(course => {
    const matchesSearch = course.title.toLowerCase().includes(searchTerm.toLowerCase()) || 
                          course.instructor.toLowerCase().includes(searchTerm.toLowerCase());
    return matchesSearch;
  });

  return (
    <div className="min-h-screen bg-gray-50 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-12">
          <h1 className="text-4xl font-extrabold text-gray-900 mb-4">Course Catalog</h1>
          <p className="text-xl text-gray-600 max-w-2xl mx-auto">
            Expand your horizons with our comprehensive selection of courses.
          </p>
        </div>

        {/* Filters and Search */}
        <div className="bg-white p-6 rounded-xl shadow-md mb-10 flex flex-col md:flex-row gap-4 items-center justify-between border border-gray-200">
          <div className="w-full md:w-1/2 relative">
            <input 
              type="text"
              placeholder="Search by course title or instructor..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              // Changed focus ring to emerald-500/emerald-200
              className="w-full pl-10 pr-4 py-3 rounded-lg border border-gray-300 focus:ring-2 focus:ring-emerald-200 focus:border-emerald-500 transition-all text-gray-900 placeholder-gray-400"
            />
            <div className="absolute left-3 top-3.5 text-gray-400">
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"></path></svg>
            </div>
          </div>
          
          <div className="w-full md:w-1/4">
            <select 
              value={category}
              onChange={(e) => setCategory(e.target.value)}
              // Changed focus ring to emerald-500/emerald-200
              className="w-full py-3 px-4 rounded-lg border border-gray-300 focus:ring-2 focus:ring-emerald-200 focus:border-emerald-500 transition-all bg-white text-gray-900"
            >
              <option value="All">All Categories</option>
              <option value="Development">Development</option>
              <option value="Design">Design</option>
              <option value="Business">Business</option>
            </select>
          </div>
        </div>

        {/* Course Grid */}
        <div className={`grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 transition-opacity duration-1000 ${isLoaded ? 'opacity-100' : 'opacity-0'}`}>
          {filteredCourses.length > 0 ? (
            filteredCourses.map(course => (
              <CourseCard 
                key={course.id}
                {...course}
                enrolled={user.enrolledCourses.includes(course.id) || user.completedCourses.includes(course.id)}
              />
            ))
          ) : (
            <div className="col-span-full text-center py-12">
              <p className="text-xl text-gray-500">No courses found matching your criteria.</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Courses;
