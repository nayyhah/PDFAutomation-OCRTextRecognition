import React from "react";
import Download from "../../SVG/download";

const ToJSON = ({ type, disabled, onClick }) => {
  return (
    <button
      type={type}
      disabled={disabled}
      onClick={onClick}
      className="border-2 hover:border-blue-text shadow-lg min-w-fit  text-blue-text hover:bg-blue-text hover:text-white text-center disabled:opacity-50 disabled:hover:bg-white disabled:hover:text-blue-text font-semibold  px-2 py-3 text-xs rounded inline-flex items-center"
    >
      <Download className="fill-current w-3.5 h-3.5 mr-2" />
      Download JSON
    </button>
  );
};

export default ToJSON;
