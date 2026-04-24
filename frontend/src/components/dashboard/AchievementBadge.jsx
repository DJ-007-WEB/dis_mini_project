import React from "react";

const AchievementBadge = ({ name, icon, description, earnedDate }) => {
  return (
    <div className="flex flex-col items-center group relative cursor-help w-20">
      <div className="w-16 h-16 rounded-full bg-gradient-to-br from-emerald-100 to-emerald-50 border-2 border-emerald-200 flex items-center justify-center text-2xl shadow-sm group-hover:scale-110 group-hover:shadow-md transition-all duration-300 group-hover:border-emerald-400">
        {icon}
      </div>
      <span className="text-xs font-semibold text-gray-700 mt-2 text-center w-full truncate">
        {name}
      </span>

      {/* Tooltip */}
      <div className="opacity-0 group-hover:opacity-100 absolute bottom-full mb-2 w-48 bg-slate-800 text-white text-xs rounded p-2 pointer-events-none transition-opacity z-10 text-center shadow-lg transform -translate-x-1/2 left-1/2">
        <p className="font-bold mb-1">{name}</p>
        <p className="text-gray-300 font-light mb-1">{description}</p>
        <p className="text-emerald-300 text-[10px]">
          Earned: {new Date(earnedDate).toLocaleDateString()}
        </p>
        {/* Tooltip arrow */}
        <div className="absolute top-full left-1/2 transform -translate-x-1/2 -mt-1 border-4 border-transparent border-t-slate-800"></div>
      </div>
    </div>
  );
};

export default AchievementBadge;
