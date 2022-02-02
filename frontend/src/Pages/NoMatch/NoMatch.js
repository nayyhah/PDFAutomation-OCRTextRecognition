import React from "react";

import { useNavigate } from "react-router-dom";
import Error from "../../images/error.png";

function NoMatch() {
  const navigate = useNavigate();
  return (
    <div className="flex flex-col items-center py-10">
      <h1 className="text-5xl font-semibold text-red-600 -mb-3">
        Page Not Found
      </h1>
      <img src={Error} alt="Not Found" className="h-80 w-80" />
      <h2 className="text-3xl font-semibold mb-2 -mt-5">
        Looks like you're lost
      </h2>
      <p className="text-md font-semibold text-gray-400 mb-10">
        The page you are looking for is not available
      </p>
      <button
        onClick={() => navigate("/")}
        className="bg-blue-text hover:bg-blue-medium px-3 py-2 cursor-pointer text-center text-white rounded-sm shadow-xl"
      >
        Go to Home
      </button>
    </div>
  );
}

export default NoMatch;
