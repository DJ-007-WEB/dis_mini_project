import React from 'react';
import { Link } from 'react-router-dom';

const RecommendedCourseCard = ({ id, title, instructor, image }) => {
  return (
    <div className="flex bg-white rounded-lg shadow-sm border border-gray-100 overflow-hidden hover:shadow-md hover:border-emerald-300 transition-all group h-24">
      <img src={image} alt={title} className="w-24 h-full object-cover group-hover:scale-105 transition-transform duration-500" />
      <div className="p-3 flex flex-col justify-center flex-1 min-w-0">
        <h4 className="font-semibold text-gray-900 text-sm truncate mb-1" title={title}>{title}</h4>
        <p className="text-xs text-gray-500 truncate mb-2">{instructor}</p>
        <Link 
          to={`/course/${id}`}
          className="text-xs font-bold text-emerald-600 hover:text-emerald-700 inline-flex items-center gap-1 w-max"
        >
          View Course
          <svg className="w-3 h-3 group-hover:translate-x-1 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 5l7 7-7 7"></path></svg>
        </Link>
      </div>
    </div>
  );
};

export default RecommendedCourseCard;
