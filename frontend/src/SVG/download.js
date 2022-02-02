import React from "react";

const Download = ({ className }) => {
  return (
    <svg
      className={className ? className : "fill-current w-4 h-4"}
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 20 20"
    >
      <path d="M13 8V2H7v6H2l8 8 8-8h-5zM0 18h20v2H0v-2z" />
    </svg>
  );
};

export default Download;
