import React, { useContext } from "react";
import { useNavigate } from "react-router-dom";
import { AppContext } from "../context/AppContext";
import CourseCard from "../components/CourseCard";
import ProgressBar from "../components/ProgressBar";

import ActivityChart from "../components/dashboard/ActivityChart";
import DeadlineCard from "../components/dashboard/DeadlineCard";
import ActivityFeed from "../components/dashboard/ActivityFeed";
import AchievementBadge from "../components/dashboard/AchievementBadge";
import QuickActionButton from "../components/dashboard/QuickActionButton";
import RecommendedCourseCard from "../components/dashboard/RecommendedCourseCard";

const Dashboard = () => {
  const { courses, user } = useContext(AppContext);
  const navigate = useNavigate();

  const enrolledCourses = user?.enrolledCourses || [];
  const enrolledCoursesList = courses.filter((course) =>
    enrolledCourses.includes(course.courseId),
  );
  const recommendedCoursesList = courses
    .filter((course) => !enrolledCourses.includes(course.courseId))
    .slice(0, 3);

  // Safe fallbacks for user data in case mockData is not fully updated yet
  const stats = {
    currentStreak: user?.learningStreak?.current || 0,
    bestStreak: user?.learningStreak?.best || 0,
    weeklyActivity: user?.weeklyActivity || [],
    upcomingDeadlines: user?.upcomingDeadlines || [],
    recentActivities: user?.recentActivities || [],
    achievements: user?.achievements || [],
    totalLearningHours: user?.totalLearningHours || 0,
    averageQuizScore: user?.averageQuizScore || 0,
    averageCourseCompletion: user?.averageCourseCompletion || 0,
  };

  return (
    <div className="min-h-screen bg-gray-50 py-8 px-4 sm:px-6 lg:px-8 font-sans">
      <div className="max-w-7xl mx-auto opacity-0 animate-[fadeIn_0.5s_ease-out_forwards]">
        {/* Welcome & Streak Section */}
        <div className="flex flex-col lg:flex-row gap-6 mb-8">
          <div className="flex-1 bg-white rounded-xl shadow-md p-8 border-l-4 border-emerald-600 flex flex-col justify-center transition-all hover:shadow-lg">
            <h1 className="text-3xl font-bold text-gray-900 mb-2">
              Welcome back, {user?.name}!
            </h1>
            <p className="text-gray-600">
              You're making great progress. Ready to continue your learning
              journey?
            </p>
          </div>

          <div className="lg:w-80 bg-gradient-to-br from-slate-900 to-slate-800 rounded-xl shadow-md p-6 text-white flex items-center gap-6 relative overflow-hidden transition-all hover:shadow-lg">
            <div className="absolute -right-4 -top-4 text-emerald-500/20 w-32 h-32">
              <svg fill="currentColor" viewBox="0 0 24 24">
                <path d="M12 2C8.686 2 6 4.686 6 8c0 2.846 1.954 5.253 4.593 5.864L12 22l1.407-8.136C16.046 13.253 18 10.846 18 8c0-3.314-2.686-6-6-6zm0 14.5l-.5-2.889A4.01 4.01 0 018 10c0-2.206 1.794-4 4-4s4 1.794 4 4a4.01 4.01 0 01-3.5 3.611L12 16.5z" />
              </svg>
            </div>
            <div className="w-16 h-16 rounded-full bg-emerald-600/20 flex items-center justify-center text-3xl z-10 animate-pulse border border-emerald-500/30 shadow-[0_0_15px_rgba(5,150,105,0.4)]">
              🔥
            </div>
            <div className="z-10">
              <p className="text-emerald-400 text-sm font-semibold uppercase tracking-wider mb-1">
                Learning Streak
              </p>
              <div className="flex items-baseline gap-2">
                <span className="text-4xl font-extrabold">
                  {stats.currentStreak}
                </span>
                <span className="text-slate-400 text-sm font-medium">days</span>
              </div>
              <p className="text-xs text-slate-400 mt-1">
                Best: {stats.bestStreak} days
              </p>
            </div>
          </div>
        </div>

        {/* CSS Grid Layout for Main Content */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
          {/* Main Column (70%) */}
          <div className="lg:col-span-8 flex flex-col gap-8">
            {/* Performance Metrics Cards */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div className="bg-white border border-gray-200 rounded-xl shadow-sm p-5 hover:shadow-md hover:border-emerald-300 transition-all group">
                <p className="text-xs font-bold text-gray-500 uppercase tracking-wide mb-1">
                  Total Hours
                </p>
                <div className="flex items-end gap-2">
                  <span className="text-3xl font-extrabold text-slate-800 group-hover:text-emerald-600 transition-colors">
                    {stats.totalLearningHours}
                  </span>
                  <span className="text-sm text-gray-500 mb-1">hrs</span>
                </div>
              </div>
              <div className="bg-white border border-gray-200 rounded-xl shadow-sm p-5 hover:shadow-md hover:border-emerald-300 transition-all group">
                <p className="text-xs font-bold text-gray-500 uppercase tracking-wide mb-1">
                  Quiz Average
                </p>
                <div className="flex items-end gap-2">
                  <span className="text-3xl font-extrabold text-slate-800 group-hover:text-emerald-600 transition-colors">
                    {stats.averageQuizScore}
                  </span>
                  <span className="text-sm text-gray-500 mb-1">%</span>
                </div>
              </div>
              <div className="bg-white border border-gray-200 rounded-xl shadow-sm p-5 hover:shadow-md hover:border-emerald-300 transition-all group">
                <p className="text-xs font-bold text-gray-500 uppercase tracking-wide mb-1">
                  Completion Avg
                </p>
                <div className="flex items-end gap-2">
                  <span className="text-3xl font-extrabold text-slate-800 group-hover:text-emerald-600 transition-colors">
                    {stats.averageCourseCompletion}
                  </span>
                  <span className="text-sm text-gray-500 mb-1">
                    days/course
                  </span>
                </div>
              </div>
            </div>

            {/* Activity Chart */}
            <div
              className="animate-[fadeIn_0.6s_ease-out_forwards] opacity-0"
              style={{ animationDelay: "0.1s" }}
            >
              <ActivityChart data={stats.weeklyActivity} />
            </div>

            {/* Courses In Progress */}
            <div
              className="animate-[fadeIn_0.6s_ease-out_forwards] opacity-0"
              style={{ animationDelay: "0.2s" }}
            >
              <div className="flex justify-between items-center mb-6">
                <h2 className="text-2xl font-bold text-gray-900">
                  In Progress
                </h2>
                <button
                  onClick={() => navigate("/courses")}
                  className="text-sm font-semibold text-emerald-600 hover:text-emerald-700"
                >
                  View All
                </button>
              </div>
              {enrolledCoursesList.length > 0 ? (
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                  {enrolledCoursesList.map((course) => (
                    <CourseCard
                      key={course.courseId}
                      {...course}
                      enrolled={true}
                      progress={((course.courseId * 13) % 65) + 20}
                    />
                  ))}
                </div>
              ) : (
                <div className="bg-white rounded-xl shadow-sm p-8 text-center border border-gray-200">
                  <p className="text-gray-500">
                    You are not enrolled in any courses currently.
                  </p>
                  <button
                    onClick={() => navigate("/courses")}
                    className="mt-4 bg-emerald-600 text-white px-6 py-2 rounded-full font-medium hover:bg-emerald-700 transition-colors"
                  >
                    Browse Catalog
                  </button>
                </div>
              )}
            </div>

            {/* Recent Activity Feed */}
            <div
              className="bg-white p-6 rounded-xl shadow-md border border-gray-200 animate-[fadeIn_0.6s_ease-out_forwards] opacity-0"
              style={{ animationDelay: "0.3s" }}
            >
              <div className="flex justify-between items-center mb-6">
                <h3 className="text-xl font-bold text-gray-900">
                  Recent Activity
                </h3>
                <div className="flex gap-2">
                  <button className="px-3 py-1 text-xs font-medium rounded-full bg-slate-100 text-slate-700 hover:bg-slate-200 transition-colors focus:ring-2 focus:ring-emerald-500">
                    All
                  </button>
                  <button className="px-3 py-1 text-xs font-medium rounded-full bg-slate-100 text-slate-700 hover:bg-slate-200 transition-colors focus:ring-2 focus:ring-emerald-500">
                    Courses
                  </button>
                </div>
              </div>
              <ActivityFeed activities={stats.recentActivities} />
            </div>
          </div>

          {/* Sidebar Column (30%) */}
          <div className="lg:col-span-4 flex flex-col gap-8">
            {/* Quick Actions */}
            <div
              className="animate-[fadeIn_0.6s_ease-out_forwards] opacity-0"
              style={{ animationDelay: "0.1s" }}
            >
              <h3 className="text-lg font-bold text-gray-900 mb-4">
                Quick Actions
              </h3>
              <div className="grid grid-cols-2 gap-4">
                <QuickActionButton
                  icon={
                    <svg
                      className="w-6 h-6"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth="2"
                        d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
                      ></path>
                    </svg>
                  }
                  label="Browse"
                  onClick={() => navigate("/courses")}
                />
                <QuickActionButton
                  icon={
                    <svg
                      className="w-6 h-6"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth="2"
                        d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"
                      ></path>
                    </svg>
                  }
                  label="Certificates"
                  onClick={() => navigate("/certificate")}
                />
                <QuickActionButton
                  icon={
                    <svg
                      className="w-6 h-6"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth="2"
                        d="M12 6v6m0 0v6m0-6h6m-6 0H6"
                      ></path>
                    </svg>
                  }
                  label="My Courses"
                  onClick={() => navigate("/dashboard")}
                />
                <QuickActionButton
                  icon={
                    <svg
                      className="w-6 h-6"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth="2"
                        d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4"
                      ></path>
                    </svg>
                  }
                  label="Report"
                  onClick={() => alert("Downloading progress report...")}
                />
              </div>
            </div>

            {/* Upcoming Deadlines */}
            <div
              className="bg-white p-6 rounded-xl shadow-md border border-gray-200 animate-[fadeIn_0.6s_ease-out_forwards] opacity-0"
              style={{ animationDelay: "0.2s" }}
            >
              <div className="flex justify-between items-center mb-6">
                <h3 className="text-lg font-bold text-gray-900">
                  Upcoming Deadlines
                </h3>
                <span className="bg-emerald-100 text-emerald-800 text-xs font-bold px-2 py-1 rounded-full">
                  {stats.upcomingDeadlines.length}
                </span>
              </div>
              {stats.upcomingDeadlines.length > 0 ? (
                <div className="flex flex-col gap-3">
                  {stats.upcomingDeadlines.map((deadline) => (
                    <DeadlineCard key={deadline.id} {...deadline} />
                  ))}
                </div>
              ) : (
                <div className="text-center py-6 text-gray-500 text-sm">
                  <span className="text-2xl mb-2 block">🎉</span>
                  You're all caught up!
                </div>
              )}
            </div>

            {/* Achievement Badges */}
            <div
              className="bg-white p-6 rounded-xl shadow-md border border-gray-200 animate-[fadeIn_0.6s_ease-out_forwards] opacity-0"
              style={{ animationDelay: "0.3s" }}
            >
              <h3 className="text-lg font-bold text-gray-900 mb-6">
                Achievements
              </h3>
              {stats.achievements.length > 0 ? (
                <div className="flex flex-wrap gap-4 justify-start">
                  {stats.achievements.map((badge) => (
                    <AchievementBadge key={badge.id} {...badge} />
                  ))}
                </div>
              ) : (
                <div className="text-center py-4 text-gray-500 text-sm italic">
                  Complete courses to unlock badges
                </div>
              )}
            </div>

            {/* Recommended Courses */}
            <div
              className="animate-[fadeIn_0.6s_ease-out_forwards] opacity-0"
              style={{ animationDelay: "0.4s" }}
            >
              <h3 className="text-lg font-bold text-gray-900 mb-4">
                Recommended for you
              </h3>
              <div className="flex flex-col gap-3">
                {recommendedCoursesList.map((course) => (
                  <RecommendedCourseCard key={course.courseId} {...course} />
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Global CSS for fade-in animations */}
      <style
        dangerouslySetInnerHTML={{
          __html: `
        @keyframes fadeIn {
          from { opacity: 0; transform: translateY(10px); }
          to { opacity: 1; transform: translateY(0); }
        }
      `,
        }}
      />
    </div>
  );
};

export default Dashboard;
