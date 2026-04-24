import React, { useState, useEffect, useContext, useCallback } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { AppContext } from "../context/AppContext";

const Assignment = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const { courses, completeCourse, addAlert } = useContext(AppContext);

  const BASE_URL = import.meta.env.VITE_API_URL || "";
  const courseId = parseInt(id);
  const course = courses.find((c) => c.courseId === courseId);

  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [selectedAnswers, setSelectedAnswers] = useState({});
  const [timeLeft, setTimeLeft] = useState(600); // 10 minutes
  const [questions, setQuestions] = useState([]);
  const [loading, setLoading] = useState(true);

  const fetchQuestions = useCallback(async () => {
    try {
      setLoading(true);
      // Fetch assignments first
      const assignRes = await fetch(`${BASE_URL}/api/assignments?courseId=${courseId}`);
      if (assignRes.ok) {
        const assignments = await assignRes.json();
        if (assignments.length > 0) {
          // Fetch questions for the first assignment
          const qnRes = await fetch(`${BASE_URL}/api/questions?assignId=${assignments[0].assignId}`);
          if (qnRes.ok) {
            const qnData = await qnRes.json();
            setQuestions(qnData);
          }
        }
      }
    } catch (err) {
      console.error("Failed to fetch questions", err);
    } finally {
      setLoading(false);
    }
  }, [BASE_URL, courseId]);

  useEffect(() => {
    if (courseId) {
      fetchQuestions();
    }
  }, [courseId, fetchQuestions]);

  const handleSubmit = useCallback(() => {
    if (questions.length === 0) return;
    
    let score = 0;
    questions.forEach((q, index) => {
      if (selectedAnswers[index] === q.correctOption) {
        score += 1;
      }
    });

    const percentage = (score / questions.length) * 100;

    if (percentage >= 70) {
      completeCourse(courseId);
      addAlert(
        "success",
        `Academic Excellence! You passed with a score of ${percentage}%`
      );
      navigate("/certificate");
    } else {
      addAlert(
        "error",
        `Score: ${percentage}%. 70% required for graduation. Please re-evaluate the material.`
      );
      navigate(`/course/${courseId}`);
    }
  }, [questions, selectedAnswers, completeCourse, courseId, addAlert, navigate]);

  useEffect(() => {
    if (questions.length === 0) return;

    const timer = setInterval(() => {
      setTimeLeft((prev) => {
        if (prev <= 1) {
          clearInterval(timer);
          handleSubmit();
          return 0;
        }
        return prev - 1;
      });
    }, 1000);

    return () => clearInterval(timer);
  }, [questions, handleSubmit]);

  const formatTime = (seconds) => {
    const m = Math.floor(seconds / 60)
      .toString()
      .padStart(2, "0");
    const s = (seconds % 60).toString().padStart(2, "0");
    return `${m}:${s}`;
  };

  if (!course) {
    return <div className="text-center py-20 text-xl font-bold text-slate-400">Course identity not found.</div>;
  }

  if (loading) {
    return (
      <div className="min-h-screen bg-slate-900 flex items-center justify-center">
        <div className="text-center">
          <div className="w-16 h-16 border-4 border-emerald-500 border-t-transparent rounded-full animate-spin mx-auto mb-6"></div>
          <p className="text-white font-black uppercase tracking-widest text-xs">Accessing Secure Examination Hall...</p>
        </div>
      </div>
    );
  }

  const currentQuestion = questions[currentQuestionIndex];

  const handleOptionSelect = (option) => {
    setSelectedAnswers((prev) => ({
      ...prev,
      [currentQuestionIndex]: option,
    }));
  };

  return (
    <div className="min-h-screen bg-slate-50 py-16 px-4">
      <div className="max-w-4xl mx-auto">
        <div className="bg-white rounded-[40px] shadow-2xl border border-slate-200 overflow-hidden fade-in">
          {/* Examination Header */}
          <div className="bg-slate-900 p-10 text-white flex flex-col md:flex-row justify-between items-center gap-8 border-b-8 border-emerald-600">
            <div>
              <div className="inline-block px-3 py-1 bg-emerald-500/20 rounded-full text-emerald-400 text-[10px] font-black uppercase tracking-widest mb-4">
                Proctored Academic Assessment
              </div>
              <h1 className="text-3xl font-black tracking-tight mb-2 uppercase">
                {course.title}
              </h1>
              <p className="text-slate-400 font-bold text-sm">
                Module {currentQuestionIndex + 1} of {questions.length} / Final Examination
              </p>
            </div>
            
            <div className="bg-slate-800/80 backdrop-blur-md px-8 py-4 rounded-3xl border border-slate-700 flex flex-col items-center">
               <span className="text-[10px] font-black text-slate-500 uppercase tracking-widest mb-1">Time Remaining</span>
               <span className="font-mono text-3xl font-black text-emerald-400">
                 {formatTime(timeLeft)}
               </span>
            </div>
          </div>

          {!questions || questions.length === 0 ? (
            <div className="p-20 text-center">
               <svg className="w-20 h-20 text-slate-200 mx-auto mb-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9.172 9.172a4 4 0 015.656 0M9 10h.01M15 10h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"></path></svg>
               <h3 className="text-2xl font-black text-slate-400 uppercase tracking-widest leading-none mb-4">Paper Not Set</h3>
               <p className="text-slate-500 font-medium max-w-sm mx-auto">Examination material for this module is currently restricted or undergoing maintenance.</p>
               <button onClick={() => navigate(-1)} className="mt-8 text-emerald-600 font-black uppercase tracking-widest text-xs hover:underline">Return to Coursehall</button>
            </div>
          ) : (
            <div className="p-10 md:p-16">
              {/* Question Text */}
              <div className="mb-12">
                <div className="text-slate-300 font-black text-6xl mb-4 opacity-20">
                  {(currentQuestionIndex + 1).toString().padStart(2, "0")}
                </div>
                <h2 className="text-2xl md:text-3xl font-black text-slate-900 leading-tight">
                  {currentQuestion.qnText}
                </h2>
              </div>

              {/* Options Grid */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-12">
                {["A", "B", "C", "D"].map((option) => (
                  <button
                    key={option}
                    onClick={() => handleOptionSelect(option)}
                    className={`group relative flex items-center p-6 rounded-2xl border-2 transition-all duration-300 text-left ${
                      selectedAnswers[currentQuestionIndex] === option
                        ? "bg-emerald-600 border-emerald-600 text-white shadow-xl shadow-emerald-600/20 scale-[1.02] z-10"
                        : "bg-white border-slate-100 hover:border-emerald-200 hover:bg-slate-50 text-slate-700"
                    }`}
                  >
                    <div className={`w-8 h-8 rounded-lg flex items-center justify-center font-black mr-4 transition-colors ${
                       selectedAnswers[currentQuestionIndex] === option
                        ? "bg-white/20 text-white"
                        : "bg-slate-100 text-slate-500 group-hover:bg-emerald-100 group-hover:text-emerald-600"
                    }`}>
                      {option}
                    </div>
                    <span className="font-bold">{currentQuestion[option.toLowerCase()]}</span>
                    
                    {selectedAnswers[currentQuestionIndex] === option && (
                       <svg className="w-6 h-6 ml-auto" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="4" d="M5 13l4 4L19 7"></path></svg>
                    )}
                  </button>
                ))}
              </div>

              {/* Progress Bar (Inline) */}
              <div className="w-full h-2 bg-slate-100 rounded-full mb-12 overflow-hidden">
                 <div 
                   className="h-full bg-emerald-500 transition-all duration-500 shadow-[0_0_10px_rgba(16,185,129,0.5)]" 
                   style={{ width: `${((currentQuestionIndex + 1) / questions.length) * 100}%` }}
                 ></div>
              </div>

              {/* Navigation */}
              <div className="flex flex-col md:flex-row justify-between items-center pt-10 border-t border-slate-100 gap-6">
                <button
                  onClick={() => setCurrentQuestionIndex(prev => prev - 1)}
                  disabled={currentQuestionIndex === 0}
                  className="w-full md:w-auto px-10 py-4 border-2 border-slate-200 text-slate-400 rounded-2xl font-black uppercase tracking-widest text-xs hover:border-slate-900 hover:text-slate-900 disabled:opacity-30 disabled:cursor-not-allowed transition-all"
                >
                  Previous Module
                </button>

                {currentQuestionIndex === questions.length - 1 ? (
                  <button
                    onClick={handleSubmit}
                    disabled={Object.keys(selectedAnswers).length < questions.length}
                    className="w-full md:w-auto px-16 py-4 bg-emerald-600 text-white rounded-2xl font-black uppercase tracking-widest text-xs shadow-2xl shadow-emerald-600/30 hover:bg-emerald-500 hover:-translate-y-1 active:scale-95 transition-all disabled:opacity-50 disabled:grayscale disabled:cursor-not-allowed"
                  >
                    Submit Examination
                  </button>
                ) : (
                  <button
                    onClick={() => setCurrentQuestionIndex(prev => prev + 1)}
                    className="w-full md:w-auto px-16 py-4 bg-slate-900 text-white rounded-2xl font-black uppercase tracking-widest text-xs shadow-2xl shadow-slate-900/10 hover:bg-slate-800 hover:-translate-y-1 active:scale-95 transition-all flex items-center justify-center gap-2"
                  >
                    Next Question <span>→</span>
                  </button>
                )}
              </div>
            </div>
          )}
        </div>
        
        <p className="text-center mt-8 text-slate-400 font-bold text-xs uppercase tracking-widest">
           Secure Exam Environment. Do not refresh this page.
        </p>
      </div>
    </div>
  );
};

export default Assignment;
