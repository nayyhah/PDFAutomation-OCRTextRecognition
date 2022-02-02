import React from "react";

const Input = ({
  id,
  name,
  type,
  placeholder,
  extraclass,
  error,
  showMainError,
  showIndividualError,
  ...rest
}) => {
  return (
    <div>
      <input
        className={`focus:outline-none border-b-2 w-full text-lg px-2 py-1 placeholder-gray-500 text-gray-900 ${extraclass}`}
        type={type}
        id={id}
        placeholder={placeholder}
        name={name}
        {...rest}
      />
      <div>
        {showMainError ? (
          <p></p>
        ) : showIndividualError && error ? (
          <span className="pl-1 text-xs font-semibold text-red-400">
            {error}
          </span>
        ) : (
          <p></p>
        )}
      </div>
    </div>
  );
};

export default Input;
