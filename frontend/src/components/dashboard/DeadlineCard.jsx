import React, { useState, useEffect } from "react";

const DeadlineCard = ({ courseName, title, dueDate, urgency }) => {
  const [timeLeft, setTimeLeft] = useState("");

  useEffect(() => {
    const calculateTimeLeft = () => {
      const difference = new Date(dueDate) - new Date();
      if (difference > 0) {
        const days = Math.floor(difference / (1000 * 60 * 60 * 24));
        const hours = Math.floor((difference / (1000 * 60 * 60)) % 24);
        if (days > 0) return `${days}d ${hours}h left`;
        const minutes = Math.floor((difference / 1000 / 60) % 60);
        return `${hours}h ${minutes}m left`;
      }
      return "Overdue";
    };

    setTimeLeft(calculateTimeLeft());
    const timer = setInterval(() => setTimeLeft(calculateTimeLeft()), 60000);
    return () => clearInterval(timer);
  }, [dueDate]);

  const borderColors = {
    red: "border-l-red-500",
    amber: "border-l-amber-500",
    green: "border-l-emerald-500",
  };

  const textColors = {
    red: "text-red-600",
    amber: "text-amber-600",
    green: "text-emerald-600",
  };

  return (
    <div
      className={`bg-white p-4 rounded-lg shadow-sm border border-gray-100 border-l-4 ${borderColors[urgency] || borderColors.green} hover:shadow-md transition-shadow`}
    >
      <h4
        className="font-semibold text-gray-900 text-sm truncate"
        title={courseName}
      >
        {courseName}
      </h4>
      <p className="text-gray-600 text-sm mb-2 truncate" title={title}>
        {title}
      </p>
      <div className="flex justify-between items-center text-xs font-medium">
        <span className="text-gray-500 flex items-center gap-1">
          <svg
            className="w-3 h-3"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z"
            ></path>
          </svg>
          {new Date(dueDate).toLocaleDateString()}
        </span>
        <span
          className={`${textColors[urgency] || textColors.green} flex items-center gap-1`}
        >
          <svg
            className="w-3 h-3"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z"
            ></path>
          </svg>
          {timeLeft}
        </span>
      </div>
    </div>
  );
};

export default DeadlineCard;
