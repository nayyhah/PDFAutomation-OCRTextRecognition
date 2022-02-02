import React from "react";

const Button = ({ type, children, disabled }) => {
  return (
    <button
      type={type}
      disabled={disabled ? disabled : ""}
      className="active:bg-green-700 p-3 disabled:opacity-50 shadow-xl text-lg font-semibold text-white w-full flex items-center justify-center space-x-2"
    >
      {children}
    </button>
  );
};

export default Button;
