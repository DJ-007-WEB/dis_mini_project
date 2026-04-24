import React from "react";
import PropTypes from "prop-types";
import { Link } from "react-router-dom";

const CourseCard = ({
  courseId,
  title,
  instructor,
  duration,
  rating,
  image,
  enrolled,
  progress,
}) => {
  return (
    <div className="group bg-white rounded-[32px] shadow-lg shadow-slate-200/50 border border-slate-100 hover:border-emerald-400 hover:shadow-2xl hover:shadow-emerald-600/10 transition-all duration-500 hover:-translate-y-2 overflow-hidden flex flex-col h-full relative">
      {/* Badge for Enrolled Status */}
      {enrolled && (
        <div className="absolute top-4 right-4 z-20 bg-emerald-600 text-white text-[10px] font-black px-3 py-1 rounded-full shadow-lg border border-emerald-400/50 uppercase tracking-widest">
          Enrolled
        </div>
      )}

      {/* Image Section */}
      <div className="relative h-56 overflow-hidden">
        <img
          src={image || `https://source.unsplash.com/800x600/?coding,technology,${courseId}`}
          alt={title}
          className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-slate-900/60 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
      </div>

      {/* Content Section */}
      <div className="p-8 flex flex-col flex-grow">
        <div className="flex justify-between items-start mb-4">
          <div className="text-[10px] font-black text-emerald-600 uppercase tracking-widest bg-emerald-50 px-2 py-1 rounded-md">
            Academic Track
          </div>
          <div className="flex items-center gap-1 bg-amber-50 text-amber-700 text-xs font-black px-2 py-1 rounded-md border border-amber-100">
            ★ {rating || "4.8"}
          </div>
        </div>

        <h3 className="text-xl font-black text-slate-900 mb-2 line-clamp-2 leading-tight group-hover:text-emerald-700 transition-colors tracking-tight">
          {title}
        </h3>
        
        <p className="text-slate-500 font-bold text-sm mb-6 flex items-center gap-2">
           <span className="w-1.5 h-1.5 bg-emerald-500 rounded-full"></span>
           Investigator: {instructor || "Faculty Lead"}
        </p>

        {/* Progress Section for Enrolled Courses */}
        {enrolled && progress !== undefined && (
          <div className="mb-6 bg-slate-50 p-4 rounded-2xl border border-slate-100">
            <div className="flex justify-between items-center mb-2">
              <span className="text-[10px] font-black text-slate-400 uppercase tracking-widest">Mastery</span>
              <span className="text-[10px] font-black text-emerald-600">{progress}%</span>
            </div>
            <div className="w-full bg-slate-200 h-1.5 rounded-full overflow-hidden">
              <div 
                className="bg-emerald-500 h-full rounded-full transition-all duration-1000 ease-out"
                style={{ width: `${progress}%` }}
              />
            </div>
          </div>
        )}

        <div className="mt-auto pt-6 border-t border-slate-50 flex items-center justify-between">
           <div className="flex flex-col">
              <span className="text-[10px] font-black text-slate-400 uppercase tracking-widest">Duration</span>
              <span className="text-sm font-black text-slate-700">{duration || "12 Weeks"}</span>
           </div>

           <div className="w-24">
              <Link
                to={`/course/${courseId}`}
                className="block w-full text-center bg-slate-900 text-white font-black py-3 rounded-2xl hover:bg-emerald-600 hover:shadow-xl shadow-emerald-600/20 active:scale-95 transition-all text-[10px] uppercase tracking-widest"
              >
                {enrolled ? "Study" : "Join"}
              </Link>
           </div>
        </div>
      </div>
    </div>
  );
};

CourseCard.propTypes = {
  courseId: PropTypes.number.isRequired,
  title: PropTypes.string.isRequired,
  instructor: PropTypes.string,
  duration: PropTypes.string,
  rating: PropTypes.number,
  image: PropTypes.string,
  enrolled: PropTypes.bool.isRequired,
};

export default CourseCard;
