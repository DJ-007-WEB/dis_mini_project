import React, { useEffect } from "react";
import PropTypes from "prop-types";

const AlertMessage = ({ id, type, message, onClose }) => {
  useEffect(() => {
    const timer = setTimeout(() => {
      onClose(id);
    }, 3000);
    return () => clearTimeout(timer);
  }, [id, onClose]);

  // Updated status colors
  const typeStyles = {
    success: "bg-green-50 border-green-500 text-green-800",
    error: "bg-red-50 border-red-500 text-red-800",
    warning: "bg-amber-50 border-amber-500 text-amber-800",
    info: "bg-blue-50 border-blue-500 text-blue-800",
  };

  return (
    <div
      className={`border px-4 py-3 rounded relative mb-2 shadow-md transition-all duration-300 ${typeStyles[type] || typeStyles.info}`}
      role="alert"
    >
      <span className="block sm:inline">{message}</span>
      <button
        className="absolute top-0 bottom-0 right-0 px-4 py-3"
        onClick={() => onClose(id)}
      >
        <span className="text-xl hover:text-slate-900 transform hover:scale-110">
          &times;
        </span>
      </button>
    </div>
  );
};

AlertMessage.propTypes = {
  id: PropTypes.number.isRequired,
  type: PropTypes.oneOf(["success", "error", "warning", "info"]).isRequired,
  message: PropTypes.string.isRequired,
  onClose: PropTypes.func.isRequired,
};

export default AlertMessage;
