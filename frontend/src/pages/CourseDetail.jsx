import React, { useState, useContext, useEffect, useCallback } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { AppContext } from "../context/AppContext";

const CourseDetail = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const { courses, user, enrollCourse } = useContext(AppContext);
  const [activeTab, setActiveTab] = useState("overview");
  const [expandedLesson, setExpandedLesson] = useState(null);
  const [lessons, setLessons] = useState([]);
  const [assignments, setAssignments] = useState([]);
  const [loading, setLoading] = useState(true);

  const BASE_URL = import.meta.env.VITE_API_URL || "";
  const courseId = parseInt(id);
  const course = courses.find((c) => c.courseId === courseId);

  const fetchContent = useCallback(async () => {
    try {
      setLoading(true);
      const [lessonsRes, assignmentsRes] = await Promise.all([
        fetch(`${BASE_URL}/api/lessons?courseId=${courseId}`),
        fetch(`${BASE_URL}/api/assignments?courseId=${courseId}`),
      ]);

      if (lessonsRes.ok) {
        const lessonsData = await lessonsRes.json();
        setLessons(lessonsData);
      }
      if (assignmentsRes.ok) {
        const assignmentsData = await assignmentsRes.json();
        setAssignments(assignmentsData);
      }
    } catch (err) {
      console.error("Failed to fetch course content", err);
    } finally {
      setLoading(false);
    }
  }, [BASE_URL, courseId]);

  useEffect(() => {
    if (course) {
      fetchContent();
    }
  }, [course, fetchContent]);

  if (!course) {
    return (
      <div className="text-center py-20 text-2xl font-bold text-gray-600">
        Course not found
      </div>
    );
  }

  const isEnrolled = user?.enrolledCourses?.includes(courseId);
  const isCompleted = user?.completedCourses?.includes(courseId);

  const handleEnroll = () => {
    enrollCourse(courseId);
  };

  return (
    <div className="min-h-screen bg-slate-50 pb-12">
      {/* Course Header */}
      <div className="bg-slate-900 text-white py-16 px-4 sm:px-6 lg:px-8 relative overflow-hidden">
        <div className="absolute top-0 right-0 w-1/3 h-full bg-emerald-500/5 blur-3xl pointer-events-none"></div>
        <div className="max-w-7xl mx-auto flex flex-col md:flex-row gap-12 items-center relative z-10">
          <div className="w-full md:w-2/3">
            <div className="inline-block px-3 py-1 bg-emerald-500/20 border border-emerald-500/30 rounded-full text-emerald-400 text-xs font-black uppercase tracking-widest mb-6">
              Official Curriculum
            </div>
            <h1 className="text-4xl md:text-6xl font-black mb-6 leading-tight">
              {course.title}
            </h1>
            <p className="text-xl text-slate-400 mb-8 max-w-2xl font-medium leading-relaxed">
              Master professional techniques with guided sessions led by {course.instructor || "Expert Lead"}. 
              Join a community of thousands of active scholars.
            </p>
            <div className="flex flex-wrap items-center gap-6 text-sm">
              <div className="flex items-center gap-2 bg-slate-800/50 backdrop-blur-sm border border-slate-700 px-4 py-2 rounded-xl">
                <span className="text-yellow-400 text-lg">★</span>
                <span className="font-bold text-slate-200">4.9 Rating</span>
              </div>
              <div className="flex items-center gap-2 bg-slate-800/50 backdrop-blur-sm border border-slate-700 px-4 py-2 rounded-xl">
                <svg className="w-5 h-5 text-emerald-500" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z"></path></svg>
                <span className="font-bold text-slate-200">12 Weeks Duration</span>
              </div>
              <div className="flex items-center gap-2 bg-slate-800/50 backdrop-blur-sm border border-slate-700 px-4 py-2 rounded-xl">
                <svg className="w-5 h-5 text-emerald-500" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z"></path></svg>
                <span className="font-bold text-slate-200">15.2k Enrolled</span>
              </div>
            </div>
          </div>
          
          <div className="w-full md:w-96 bg-white p-8 rounded-[32px] shadow-2xl text-center text-slate-900 border border-slate-100 flex flex-col shrink-0">
            <div className="relative group mb-8 rounded-2xl overflow-hidden shadow-lg aspect-video">
              <img
                src={`https://source.unsplash.com/800x450/?coding,technology,${courseId}`}
                alt={course.title}
                className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
              />
              <div className="absolute inset-0 bg-slate-900/40 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none">
                <div className="w-16 h-16 bg-white rounded-full flex items-center justify-center shadow-2xl">
                  <svg className="w-8 h-8 text-emerald-600 ml-1" fill="currentColor" viewBox="0 0 24 24"><path d="M8 5v14l11-7z" /></svg>
                </div>
              </div>
            </div>

            <div className="mb-8">
              <div className="text-4xl font-black text-slate-900 mb-2">Free Enrollment</div>
              <p className="text-slate-500 font-medium">Limited time academic access</p>
            </div>

            {isEnrolled ? (
              <button
                onClick={() => navigate(`/assignment/${courseId}`)}
                className="w-full bg-emerald-600 hover:bg-emerald-700 text-white font-black py-5 px-4 rounded-2xl transition-all duration-300 shadow-xl shadow-emerald-600/20 active:scale-95 mb-6 uppercase tracking-wider text-sm"
              >
                Continue Learning hall
              </button>
            ) : isCompleted ? (
              <button
                onClick={() => navigate("/certificate")}
                className="w-full bg-slate-900 hover:bg-slate-800 text-white font-black py-5 px-4 rounded-2xl transition-all duration-300 shadow-xl shadow-slate-900/20 active:scale-95 mb-6 uppercase tracking-wider text-sm"
              >
                View Graduation Certificate
              </button>
            ) : (
              <button
                onClick={handleEnroll}
                className="w-full bg-emerald-600 hover:bg-emerald-700 text-white font-black py-5 px-4 rounded-2xl transition-all duration-300 shadow-xl shadow-emerald-600/30 active:scale-95 mb-6 uppercase tracking-wider text-sm"
              >
                Enroll in Course
              </button>
            )}
            <div className="flex flex-col gap-4 text-left">
               <div className="flex items-center gap-3 text-slate-600 text-sm font-bold">
                 <svg className="w-5 h-5 text-emerald-500" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7"></path></svg>
                 Full Lifetime Access
               </div>
               <div className="flex items-center gap-3 text-slate-600 text-sm font-bold">
                 <svg className="w-5 h-5 text-emerald-500" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7"></path></svg>
                 Official Certificate
               </div>
               <div className="flex items-center gap-3 text-slate-600 text-sm font-bold">
                 <svg className="w-5 h-5 text-emerald-500" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7"></path></svg>
                 Direct Support
               </div>
            </div>
          </div>
        </div>
      </div>

      {/* Tabs */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mt-12">
        <div className="bg-white rounded-3xl shadow-sm border border-slate-200 overflow-hidden">
          <div className="border-b border-slate-100 flex p-2 bg-slate-50/50">
            {["overview", "lessons", "assignments"].map((tab) => (
              <button
                key={tab}
                onClick={() => setActiveTab(tab)}
                className={`flex-1 py-4 px-1 rounded-2xl font-black text-xs uppercase tracking-widest transition-all ${
                  activeTab === tab
                    ? "bg-white text-emerald-600 shadow-sm"
                    : "text-slate-400 hover:text-slate-600 hover:bg-white/50"
                }`}
              >
                {tab}
              </button>
            ))}
          </div>

          <div className="p-10">
            {activeTab === "overview" && (
              <div className="max-w-3xl animate-in fade-in slide-in-from-bottom-4 duration-500">
                <h3 className="text-3xl font-black mb-6 text-slate-900 tracking-tight">
                  Professional Curriculum Overview
                </h3>
                <p className="text-lg text-slate-600 leading-relaxed mb-8 font-medium">
                  {course.description || `This course is meticulously designed to take you from fundamentals to advanced mastery in ${course.title}. You'll engage in deep-dive theoretical sessions coupled with intensive practical implementations.`}
                </p>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                  <div className="space-y-4">
                    <h4 className="text-xl font-bold text-slate-900 border-l-4 border-emerald-500 pl-4">Core Competencies</h4>
                    <ul className="space-y-3 text-slate-600 font-medium">
                      <li className="flex gap-2"><span>→</span> Strategic industry frameworks</li>
                      <li className="flex gap-2"><span>→</span> High-performance architecture</li>
                      <li className="flex gap-2"><span>→</span> Error handling & Optimization</li>
                    </ul>
                  </div>
                  <div className="space-y-4">
                    <h4 className="text-xl font-bold text-slate-900 border-l-4 border-emerald-500 pl-4">Deliverables</h4>
                    <ul className="space-y-3 text-slate-600 font-medium">
                      <li className="flex gap-2"><span>→</span> Verified digital credentials</li>
                      <li className="flex gap-2"><span>→</span> Practical project portfolio</li>
                      <li className="flex gap-2"><span>→</span> Resource knowledge base</li>
                    </ul>
                  </div>
                </div>
              </div>
            )}

            {activeTab === "lessons" && (
              <div className="space-y-4 animate-in fade-in slide-in-from-bottom-4 duration-500">
                {loading ? (
                  <div className="text-center py-12 text-slate-400 font-bold uppercase tracking-widest text-xs animate-pulse">Synchronizing Material...</div>
                ) : lessons.length > 0 ? (
                  lessons.map((lesson, idx) => (
                    <div key={lesson.lessonId} className="group border border-slate-200 rounded-2xl overflow-hidden hover:border-emerald-200 transition-all">
                      <button
                        onClick={() => setExpandedLesson(expandedLesson === lesson.lessonId ? null : lesson.lessonId)}
                        className="w-full px-8 py-6 flex justify-between items-center text-left bg-white hover:bg-slate-50 transition-colors"
                      >
                        <div className="flex items-center gap-6">
                          <div className="w-12 h-12 bg-slate-900 text-white rounded-xl flex items-center justify-center font-black text-lg group-hover:bg-emerald-600 transition-colors">
                            {idx + 1}
                          </div>
                          <div>
                            <span className="block font-black text-slate-900 group-hover:text-emerald-700 transition-colors">
                              {lesson.title}
                            </span>
                            <span className="text-xs font-bold text-slate-400 uppercase tracking-widest">Core Module</span>
                          </div>
                        </div>
                        <svg className={`w-6 h-6 text-slate-300 transition-transform ${expandedLesson === lesson.lessonId ? "rotate-180 text-emerald-600" : ""}`} fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="3" d="M19 9l-7 7-7-7"></path></svg>
                      </button>
                      {expandedLesson === lesson.lessonId && (
                        <div className="px-8 py-8 bg-slate-50/50 border-t border-slate-100">
                          <p className="text-slate-600 font-medium leading-relaxed mb-6">
                            {lesson.desc}
                          </p>
                          {isEnrolled && (
                            <button className="bg-emerald-600 hover:bg-emerald-700 text-white px-8 py-3 rounded-xl font-black text-xs uppercase tracking-widest transition-all shadow-lg shadow-emerald-600/10 active:scale-95">
                              Watch Masterclass
                            </button>
                          )}
                        </div>
                      )}
                    </div>
                  ))
                ) : (
                  <div className="p-12 text-center text-slate-400 font-bold italic">Curriculum content is being updated.</div>
                )}
              </div>
            )}

            {activeTab === "assignments" && (
              <div className="space-y-6 animate-in fade-in slide-in-from-bottom-4 duration-500">
                {loading ? (
                   <div className="text-center py-12 text-slate-400 font-bold uppercase tracking-widest text-xs animate-pulse">Preparing Assessments...</div>
                ) : assignments.length > 0 ? (
                  assignments.map((assignment, index) => (
                    <div key={assignment.assignId} className="bg-slate-50/50 border border-slate-200 rounded-3xl p-8 hover:border-emerald-300 hover:bg-white transition-all group">
                      <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-6 gap-4">
                        <div>
                          <div className="flex items-center gap-3 mb-2">
                             <div className="w-8 h-8 bg-emerald-100 text-emerald-700 rounded-lg flex items-center justify-center font-black text-xs">
                               Q{index + 1}
                             </div>
                             <h4 className="text-2xl font-black text-slate-900 group-hover:text-emerald-700 transition-colors">
                                {assignment.title}
                             </h4>
                          </div>
                          <span className="px-3 py-1 bg-amber-100 text-amber-800 rounded-lg text-[10px] font-black uppercase tracking-widest">
                            Graded Component
                          </span>
                        </div>
                        {isEnrolled ? (
                          <button
                            onClick={() => navigate(`/assignment/${courseId}`)}
                            className="bg-slate-900 text-white font-black py-4 px-8 rounded-2xl hover:bg-emerald-600 transition-all text-xs uppercase tracking-widest active:scale-95 shadow-xl shadow-slate-900/10"
                          >
                            Enter Examination Hall &rarr;
                          </button>
                        ) : (
                          <div className="bg-red-50 text-red-600 px-4 py-2 rounded-xl text-xs font-black uppercase tracking-widest border border-red-100">
                             Enrollment Required
                          </div>
                        )}
                      </div>
                      <p className="text-slate-600 font-medium border-l-4 border-slate-200 pl-6 leading-relaxed italic uppercase text-sm">
                        {assignment.desc}
                      </p>
                    </div>
                  ))
                ) : (
                  <div className="p-12 text-center text-slate-400 font-bold italic">Examination material not yet available.</div>
                )}
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default CourseDetail;
