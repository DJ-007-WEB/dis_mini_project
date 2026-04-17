import React from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';

const CourseCard = ({ id, title, instructor, duration, rating, image, enrolled }) => {
  return (
    // Added border-gray-200 and hover:border-emerald-300
    <div className="bg-white rounded-xl shadow-md border border-gray-200 hover:border-emerald-400 hover:shadow-2xl transition-all duration-300 hover:scale-105 overflow-hidden flex flex-col">
      <img src={image} alt={title} className="w-full h-48 object-cover" />
      <div className="p-6 flex flex-col flex-grow">
        <div className="flex justify-between items-start mb-2">
          <h3 className="text-xl font-bold text-gray-900 line-clamp-2">{title}</h3>
          <span className="bg-amber-100 text-amber-800 text-xs font-semibold px-2.5 py-0.5 rounded flex items-center">
            ★ {rating}
          </span>
        </div>
        <p className="text-gray-600 mb-4">{instructor}</p>
        <div className="text-sm text-gray-500 mb-6 flex-grow">
          <span>Duration: {duration}</span>
        </div>
        <div className="mt-auto">
          {enrolled ? (
            // Changed green to emerald badge
            <div className="w-full text-center bg-emerald-100 text-emerald-800 border border-emerald-200 font-semibold py-2 rounded-full cursor-default">
              Enrolled
            </div>
          ) : (
            // Changed indigo/purple to emerald-600 and hover
            <Link 
              to={`/course/${id}`}
              className="block w-full text-center bg-emerald-600 text-white font-semibold py-2 rounded-full hover:bg-emerald-700 hover:shadow-lg focus:ring-4 focus:ring-emerald-200 transition-all"
            >
              Enroll Now
            </Link>
          )}
        </div>
      </div>
    </div>
  );
};

CourseCard.propTypes = {
  id: PropTypes.oneOfType([PropTypes.string, PropTypes.number]).isRequired,
  title: PropTypes.string.isRequired,
  instructor: PropTypes.string.isRequired,
  duration: PropTypes.string.isRequired,
  rating: PropTypes.number.isRequired,
  image: PropTypes.string.isRequired,
  enrolled: PropTypes.bool.isRequired
};

export default CourseCard;
