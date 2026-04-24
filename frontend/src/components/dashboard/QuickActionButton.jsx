import React from "react";

const QuickActionButton = ({ icon, label, onClick }) => {
  return (
    <button
      onClick={onClick}
      className="flex flex-col items-center justify-center p-4 bg-white rounded-xl shadow-sm border border-gray-200 hover:border-emerald-400 hover:shadow-md transition-all duration-300 group outline-none focus:ring-2 focus:ring-emerald-500 focus:ring-offset-2 w-full h-full"
    >
      <div className="bg-emerald-50 text-emerald-600 p-3 rounded-full mb-3 group-hover:bg-emerald-600 group-hover:text-white transition-colors duration-300">
        {icon}
      </div>
      <span className="text-sm font-medium text-gray-800 group-hover:text-emerald-700 transition-colors text-center">
        {label}
      </span>
    </button>
  );
};

export default QuickActionButton;
