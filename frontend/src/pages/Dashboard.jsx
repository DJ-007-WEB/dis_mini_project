import React, { useContext } from 'react';
import { AppContext } from '../context/AppContext';
import CourseCard from '../components/CourseCard';
import ProgressBar from '../components/ProgressBar';

const Dashboard = () => {
  const { courses, user } = useContext(AppContext);

  const enrolledCoursesList = courses.filter(course => user.enrolledCourses.includes(course.id));
  const completedCoursesList = courses.filter(course => user.completedCourses.includes(course.id));

  return (
    <div className="min-h-screen bg-gray-50 py-8 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        {/* Changed indigo-600 to emerald-600 */}
        <div className="bg-white rounded-xl shadow-md p-8 mb-8 border-l-4 border-emerald-600">
          <h1 className="text-3xl font-bold text-gray-900 mb-2">Welcome back, {user.name}!</h1>
          <p className="text-gray-600">Ready to continue your learning journey?</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12">
          {/* Changed to In Progress Stats colors */}
          <div className="bg-blue-50 border border-blue-200 rounded-xl shadow-md p-6 flex items-center space-x-4 hover:shadow-lg hover:border-emerald-300 transition-all">
            <div className="bg-blue-100 p-4 rounded-full text-blue-800">
              <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 6v6m0 0v6m0-6h6m-6 0H6"></path></svg>
            </div>
            <div>
              <p className="text-sm font-medium text-gray-500">In Progress</p>
              <p className="text-2xl font-bold text-gray-900">{user.enrolledCourses.length}</p>
            </div>
          </div>
          {/* Changed to Completed Stats colors */}
          <div className="bg-green-50 border border-green-200 rounded-xl shadow-md p-6 flex items-center space-x-4 hover:shadow-lg hover:border-emerald-300 transition-all">
            <div className="bg-green-100 p-4 rounded-full text-green-800">
              <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"></path></svg>
            </div>
            <div>
              <p className="text-sm font-medium text-gray-500">Completed</p>
              <p className="text-2xl font-bold text-gray-900">{user.completedCourses.length}</p>
            </div>
          </div>
          {/* Changed to Total/Certificates Stats colors */}
          <div className="bg-slate-50 border border-slate-200 rounded-xl shadow-md p-6 flex items-center space-x-4 hover:shadow-lg hover:border-emerald-300 transition-all">
            <div className="bg-slate-200 p-4 rounded-full text-slate-800">
              <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"></path></svg>
            </div>
            <div>
              <p className="text-sm font-medium text-gray-500">Certificates Earned</p>
              <p className="text-2xl font-bold text-gray-900">{user.certificates.length}</p>
            </div>
          </div>
        </div>

        <h2 className="text-2xl font-bold text-gray-900 mb-6">Courses In Progress</h2>
        {enrolledCoursesList.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mb-12">
            {enrolledCoursesList.map(course => (
              <div key={course.id} className="relative">
                <CourseCard {...course} enrolled={true} />
                <div className="absolute top-0 left-0 right-0 p-4 bg-gradient-to-b from-black/50 to-transparent rounded-t-xl z-10">
                  {/* ProgressBar color updated in component directly, default is emerald */}
                  <ProgressBar percentage={Math.floor(Math.random() * 80) + 10} />
                </div>
              </div>
            ))}
          </div>
        ) : (
          <div className="bg-white rounded-xl shadow-md p-8 text-center mb-12 border border-gray-200">
            <p className="text-gray-500 mb-4">You are not enrolled in any courses currently.</p>
          </div>
        )}

        <h2 className="text-2xl font-bold text-gray-900 mb-6">Completed Courses</h2>
        {completedCoursesList.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {completedCoursesList.map(course => (
              <div key={course.id} className="opacity-80 hover:opacity-100 transition-opacity">
                <CourseCard {...course} enrolled={true} />
              </div>
            ))}
          </div>
        ) : (
          <div className="bg-white rounded-xl shadow-md p-8 text-center border border-gray-200">
            <p className="text-gray-500">You haven't completed any courses yet. Keep learning!</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default Dashboard;
