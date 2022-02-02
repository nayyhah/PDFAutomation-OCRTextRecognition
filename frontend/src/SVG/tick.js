import React from "react";

const Tick = ({ className, fill }) => {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      className={className ? className : "h-6 w-6"}
      fill={fill ? fill : "none"}
      viewBox="0 0 24 24"
      stroke="currentColor"
    >
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth={2}
        d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"
      />
    </svg>
  );
};

export default Tick;
