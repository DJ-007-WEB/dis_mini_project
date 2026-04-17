import React, { useState, useEffect, useContext } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { AppContext } from '../context/AppContext';

const Assignment = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const { courses, completeCourse, addAlert } = useContext(AppContext);
  
  const courseId = parseInt(id);
  const course = courses.find(c => c.id === courseId);
  
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [selectedAnswers, setSelectedAnswers] = useState({});
  const [timeLeft, setTimeLeft] = useState(600); // 10 minutes

  useEffect(() => {
    if (!course) return;

    const timer = setInterval(() => {
      setTimeLeft(prev => {
        if (prev <= 1) {
          clearInterval(timer);
          handleSubmit();
          return 0;
        }
        return prev - 1;
      });
    }, 1000);

    return () => clearInterval(timer);
  }, [course]);

  if (!course) {
    return <div className="text-center py-20 text-xl">Course not found.</div>;
  }

  const assignments = course.assignments || [];
  const currentQuestion = assignments[currentQuestionIndex];

  const handleOptionSelect = (optionIndex) => {
    setSelectedAnswers(prev => ({
      ...prev,
      [currentQuestionIndex]: optionIndex
    }));
  };

  const handleNext = () => {
    if (currentQuestionIndex < assignments.length - 1) {
      setCurrentQuestionIndex(prev => prev + 1);
    }
  };

  const handlePrev = () => {
    if (currentQuestionIndex > 0) {
      setCurrentQuestionIndex(prev => prev - 1);
    }
  };

  const handleSubmit = () => {
    let score = 0;
    assignments.forEach((assignment, index) => {
      if (selectedAnswers[index] === assignment.answer) {
        score += 1;
      }
    });

    const percentage = (score / assignments.length) * 100;
    
    if (percentage >= 70) {
      completeCourse(courseId);
      addAlert('success', `Congratulations! You passed with a score of ${percentage}%`);
      navigate('/certificate');
    } else {
      addAlert('error', `You scored ${percentage}%. Please review the material and try again.`);
      navigate(`/course/${courseId}`);
    }
  };

  const formatTime = (seconds) => {
    const m = Math.floor(seconds / 60).toString().padStart(2, '0');
    const s = (seconds % 60).toString().padStart(2, '0');
    return `${m}:${s}`;
  };

  return (
    <div className="min-h-screen bg-gray-50 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-3xl mx-auto bg-white rounded-xl shadow-lg border border-gray-200 overflow-hidden">
        {/* Header */}
        {/* Changed gradient to emerald/slate */}
        <div className="bg-gradient-to-r from-emerald-600 to-slate-800 p-6 text-white flex justify-between items-center">
          <div>
            <h1 className="text-2xl font-bold">{course.title} - Final Assessment</h1>
            <p className="text-emerald-50">Question {currentQuestionIndex + 1} of {assignments.length}</p>
          </div>
          <div className="bg-white/20 px-4 py-2 rounded-lg backdrop-blur-sm border border-white/30 flex items-center gap-2">
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z"></path></svg>
            <span className="font-mono text-xl font-bold">{formatTime(timeLeft)}</span>
          </div>
        </div>

        {/* Content */}
        {assignments.length > 0 ? (
          <div className="p-8">
            <div className="mb-8">
              <h2 className="text-xl text-gray-900 font-semibold mb-6">
                {currentQuestion.question}
              </h2>
              <div className="space-y-4">
                {currentQuestion.options.map((option, index) => (
                  <label 
                    key={index} 
                    className={`block p-4 border rounded-lg cursor-pointer transition-all ${
                      selectedAnswers[currentQuestionIndex] === index 
                        // Changed border-indigo-600 bg-indigo-50 to border-emerald-600 bg-emerald-50
                        ? 'border-emerald-600 bg-emerald-50 shadow-md' 
                        : 'border-gray-200 hover:border-emerald-300 hover:bg-slate-50'
                    }`}
                  >
                    <div className="flex items-center">
                      <input 
                        type="radio" 
                        name={`question-${currentQuestionIndex}`}
                        value={index}
                        checked={selectedAnswers[currentQuestionIndex] === index}
                        onChange={() => handleOptionSelect(index)}
                        // Changed indigo to emerald
                        className="h-5 w-5 text-emerald-600 focus:ring-emerald-500 border-gray-300"
                      />
                      <span className="ml-3 text-gray-900">{option}</span>
                    </div>
                  </label>
                ))}
              </div>
            </div>

            {/* Navigation */}
            <div className="flex justify-between items-center pt-6 border-t border-gray-200">
              <button
                onClick={handlePrev}
                disabled={currentQuestionIndex === 0}
                // Changed outline button
                className="px-6 py-2 border-2 border-slate-700 text-slate-700 rounded-md font-medium hover:bg-slate-50 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
              >
                Previous
              </button>
              
              {currentQuestionIndex === assignments.length - 1 ? (
                <button
                  onClick={handleSubmit}
                  disabled={Object.keys(selectedAnswers).length < assignments.length}
                  // Changed submit button gradient to solid emerald
                  className="px-8 py-2 bg-emerald-600 text-white rounded-md font-bold hover:bg-emerald-700 focus:ring-4 focus:ring-emerald-200 disabled:opacity-50 disabled:cursor-not-allowed transition-all transform hover:-translate-y-0.5"
                >
                  Submit Assessment
                </button>
              ) : (
                <button
                  onClick={handleNext}
                  // Changed indigo to emerald
                  className="px-6 py-2 bg-emerald-600 text-white rounded-md font-medium hover:bg-emerald-700 focus:ring-4 focus:ring-emerald-200 transition-colors"
                >
                  Next
                </button>
              )}
            </div>
          </div>
        ) : (
          <div className="p-8 text-center text-gray-500">No assignments available for this course.</div>
        )}
      </div>
    </div>
  );
};

export default Assignment;
