import React, { useState, useContext } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { AppContext } from '../context/AppContext';

const CourseDetail = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const { courses, user, enrollCourse } = useContext(AppContext);
  const [activeTab, setActiveTab] = useState('overview');
  const [expandedLesson, setExpandedLesson] = useState(null);

  const courseId = parseInt(id);
  const course = courses.find(c => c.id === courseId);

  if (!course) {
    return <div className="text-center py-20 text-2xl font-bold text-gray-600">Course not found</div>;
  }

  const isEnrolled = user.enrolledCourses.includes(courseId);
  const isCompleted = user.completedCourses.includes(courseId);

  const handleEnroll = () => {
    enrollCourse(courseId);
  };

  return (
    <div className="min-h-screen bg-gray-50 pb-12">
      {/* Course Header */}
      {/* Changed bg-gray-900 to bg-slate-900 */}
      <div className="bg-slate-900 text-white py-12 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto flex flex-col md:flex-row gap-8 items-center">
          <div className="w-full md:w-2/3">
            <h1 className="text-3xl md:text-5xl font-bold mb-4">{course.title}</h1>
            <p className="text-xl text-gray-300 mb-6">Instructor: {course.instructor}</p>
            <div className="flex items-center gap-6 text-sm font-medium">
              <span className="flex items-center gap-2 bg-slate-800 px-3 py-1 rounded-full">
                <span className="text-yellow-400">★</span> {course.rating} Rating
              </span>
              <span className="flex items-center gap-2 bg-slate-800 px-3 py-1 rounded-full">
                <svg className="w-4 h-4 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z"></path></svg>
                {course.duration}
              </span>
            </div>
          </div>
          <div className="w-full md:w-1/3 bg-white p-6 rounded-xl shadow-2xl text-center text-gray-900 border border-gray-200">
            <img src={course.image} alt={course.title} className="w-full h-48 object-cover rounded-lg mb-6" />
            
            {isEnrolled ? (
              <button onClick={() => navigate(`/assignment/${course.id}`)} className="w-full bg-emerald-600 hover:bg-emerald-700 text-white font-bold py-3 px-4 rounded-full transition-colors duration-300 mb-4 focus:ring-4 focus:ring-emerald-200">
                Continue Learning
              </button>
            ) : isCompleted ? (
              <button onClick={() => navigate('/certificate')} className="w-full bg-slate-700 hover:bg-slate-800 text-white font-bold py-3 px-4 rounded-full transition-colors duration-300 mb-4 focus:ring-4 focus:ring-slate-200">
                View Certificate
              </button>
            ) : (
              // Changed gradient to emerald-600 primary button
              <button onClick={handleEnroll} className="w-full bg-emerald-600 hover:bg-emerald-700 text-white font-bold py-3 px-4 rounded-full transition-all duration-300 hover:shadow-lg transform hover:-translate-y-1 mb-4 focus:ring-4 focus:ring-emerald-200">
                Enroll Now
              </button>
            )}
            <p className="text-sm text-gray-500">30-Day Money-Back Guarantee</p>
          </div>
        </div>
      </div>

      {/* Tabs */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mt-8">
        <div className="border-b border-gray-200">
          <nav className="-mb-px flex space-x-8">
            {['overview', 'lessons', 'assignments'].map((tab) => (
              <button
                key={tab}
                onClick={() => setActiveTab(tab)}
                className={`whitespace-nowrap py-4 px-1 border-b-2 font-medium text-sm capitalize transition-colors ${
                  activeTab === tab
                    // Changed indigo to emerald
                    ? 'border-emerald-600 text-emerald-600'
                    : 'border-transparent text-gray-400 hover:text-emerald-600 hover:border-emerald-300'
                }`}
              >
                {tab}
              </button>
            ))}
          </nav>
        </div>

        {/* Tab Content */}
        <div className="py-8">
          {activeTab === 'overview' && (
            <div className="bg-white p-8 rounded-xl shadow-sm border border-gray-200">
              <h3 className="text-2xl font-bold mb-4 text-gray-900">About this course</h3>
              <p className="text-gray-600 leading-relaxed mb-6">
                Master the fundamental concepts and advanced techniques in this comprehensive course. 
                Designed by industry expert {course.instructor}, you will learn practical skills that you can apply immediately.
              </p>
              <h4 className="text-xl font-bold mb-3 text-gray-900">What you will learn:</h4>
              <ul className="list-disc pl-5 space-y-2 text-gray-600">
                <li>Understand the core principles and methodologies.</li>
                <li>Build real-world projects from scratch.</li>
                <li>Best practices for scalable and maintainable code.</li>
                <li>Prepare for industry certifications and job interviews.</li>
              </ul>
            </div>
          )}

          {activeTab === 'lessons' && (
            <div className="bg-white rounded-xl shadow-sm overflow-hidden divide-y divide-gray-200 border border-gray-200">
              {course.lessons.map((lesson) => (
                <div key={lesson.id} className="w-full text-left">
                  <button 
                    onClick={() => setExpandedLesson(expandedLesson === lesson.id ? null : lesson.id)}
                    className="w-full px-6 py-4 flex justify-between items-center hover:bg-slate-50 transition-colors focus:outline-none focus:bg-slate-50"
                  >
                    <div className="flex items-center gap-4">
                      {/* Changed indigo to emerald */}
                      <div className="bg-emerald-100 text-emerald-700 w-8 h-8 rounded-full flex items-center justify-center font-bold text-sm">
                        {lesson.id % 100}
                      </div>
                      <span className="font-semibold text-gray-900">{lesson.title}</span>
                    </div>
                    <div className="flex items-center gap-4">
                      <span className="text-sm text-gray-500">{lesson.duration}</span>
                      {/* Hover scale update */}
                      <svg className={`w-5 h-5 text-gray-400 transform transition-transform ${expandedLesson === lesson.id ? 'rotate-180 text-emerald-600' : ''} hover:text-emerald-600`} fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7"></path></svg>
                    </div>
                  </button>
                  {expandedLesson === lesson.id && (
                    <div className="px-6 py-4 bg-slate-50 text-gray-600 text-sm border-t border-gray-100">
                      <p>In this lesson, you will dive deep into {lesson.title.toLowerCase()}. Pay close attention to the examples provided.</p>
                      {isEnrolled && (
                        // Changed indigo to emerald
                        <button className="mt-4 bg-emerald-100 text-emerald-800 px-4 py-2 rounded-md font-medium hover:bg-emerald-200 transition-colors">
                          Watch Video
                        </button>
                      )}
                    </div>
                  )}
                </div>
              ))}
            </div>
          )}

          {activeTab === 'assignments' && (
            <div className="bg-white p-8 rounded-xl shadow-sm border border-gray-200">
              <h3 className="text-2xl font-bold mb-6 text-gray-900">Course Assignments</h3>
              {course.assignments.map((assignment, index) => (
                // Changed border hover to emerald
                <div key={assignment.id} className="border border-gray-200 rounded-lg p-6 mb-4 hover:border-emerald-300 hover:shadow-md transition-all">
                  <div className="flex justify-between items-center mb-2">
                    <h4 className="text-lg font-semibold text-gray-900">Assignment {index + 1}</h4>
                    <span className="px-3 py-1 bg-amber-100 text-amber-800 rounded-full text-xs font-bold">Pending</span>
                  </div>
                  <p className="text-gray-600 mb-4">{assignment.question}</p>
                  {isEnrolled ? (
                    // Changed indigo to emerald
                    <button 
                      onClick={() => navigate(`/assignment/${course.id}`)}
                      className="text-emerald-600 font-medium hover:text-emerald-700 hover:underline"
                    >
                      Start Assignment &rarr;
                    </button>
                  ) : (
                    <p className="text-sm text-red-600 italic">Please enroll to complete assignments.</p>
                  )}
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default CourseDetail;
