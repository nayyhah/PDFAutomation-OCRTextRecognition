import React from "react";

const Documents = ({ className }) => {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      className={className ? className : "h-5 w-5"}
      width="20"
      height="21"
      fill="none"
      viewBox="0 0 20 21"
    >
      <path
        fill="none"
        stroke="none"
        strokeWidth="0.765"
        d="M0.382 0.464H19.617V19.698999999999998H0.382z"
      ></path>
      <path
        fill="#fff"
        d="M15.658 6.008l-4.084-4.083a.53.53 0 00-.408-.175H5.333a1.17 1.17 0 00-1.167 1.167v14a1.17 1.17 0 001.167 1.166h9.333a1.17 1.17 0 001.167-1.166v-10.5a.53.53 0 00-.175-.409zM11.166 3.15l3.267 3.267h-3.267V3.15zm3.5 13.767H5.333v-14h4.666v3.5a1.17 1.17 0 001.167 1.166h3.5v9.334z"
      ></path>
      <path
        fill="#fff"
        d="M6.5 13.418h7v1.167h-7v-1.167zM6.5 9.918h7v1.167h-7V9.918z"
      ></path>
    </svg>
  );
};

export default Documents;
