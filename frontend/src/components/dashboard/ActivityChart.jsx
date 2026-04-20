import React, { memo } from 'react';

const ActivityChart = ({ data = [], dateRange = '7 days' }) => {
  const maxHours = Math.max(...data, 5); // Default min scale 5
  const days = ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'];

  return (
    <div className="bg-white p-6 rounded-xl shadow-md border border-gray-200">
      <div className="flex justify-between items-center mb-6">
        <h3 className="text-xl font-bold text-gray-900">Weekly Activity</h3>
        <select className="text-sm border border-gray-300 rounded-md p-1 bg-white text-gray-700 focus:ring-emerald-500 focus:border-emerald-500">
          <option>7 days</option>
          <option>30 days</option>
          <option>90 days</option>
        </select>
      </div>
      
      <div className="h-48 flex items-end justify-between gap-2 relative mt-4">
        {/* Y-axis labels */}
        <div className="absolute -left-2 top-0 bottom-0 flex flex-col justify-between text-xs text-gray-400 py-1">
          <span>{Math.ceil(maxHours)}h</span>
          <span>{Math.ceil(maxHours / 2)}h</span>
          <span>0h</span>
        </div>
        
        {/* Grid lines */}
        <div className="absolute inset-0 flex flex-col justify-between pointer-events-none pl-6 border-b border-gray-200">
          <div className="border-t border-gray-100 w-full h-0 border-dashed"></div>
          <div className="border-t border-gray-100 w-full h-0 border-dashed"></div>
          <div className="w-full h-0"></div>
        </div>

        {/* Bars */}
        <div className="flex justify-between items-end w-full h-full pl-6 relative z-10">
          {data.map((value, idx) => {
            const heightPercentage = `${(value / maxHours) * 100}%`;
            return (
              <div key={idx} className="flex flex-col items-center group w-full px-1 sm:px-2">
                <div className="relative w-full flex justify-center h-full items-end pb-1">
                  <div 
                    className="w-full max-w-[40px] bg-emerald-600 rounded-t-md transition-all duration-1000 ease-out group-hover:bg-emerald-500"
                    style={{ height: heightPercentage }}
                  ></div>
                  {/* Tooltip */}
                  <div className="opacity-0 group-hover:opacity-100 absolute -top-8 bg-slate-800 text-white text-xs px-2 py-1 rounded pointer-events-none transition-opacity whitespace-nowrap z-20">
                    {value} hrs
                  </div>
                </div>
                <span className="text-xs text-gray-500 mt-2">{days[idx % 7]}</span>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
};

export default memo(ActivityChart);
