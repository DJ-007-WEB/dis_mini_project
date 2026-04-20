import React from 'react';
import PropTypes from 'prop-types';

const ProgressBar = ({ percentage, color = "bg-emerald-600" }) => {
  return (
    // Changed bg-gray-700 to bg-gray-200
    <div className="w-full bg-gray-200 rounded-full h-4 mb-4 relative overflow-hidden">
      {/* Changed to emerald-600 */}
      <div 
        className={`${color} h-4 rounded-full transition-all duration-1000 ease-out flex items-center justify-center`} 
        style={{ width: `${percentage}%` }}
      >
        {percentage > 10 && (
          <span className="text-xs font-semibold text-white px-2">
            {percentage}%
          </span>
        )}
      </div>
    </div>
  );
};

ProgressBar.propTypes = {
  percentage: PropTypes.number.isRequired,
  color: PropTypes.string
};

export default ProgressBar;
