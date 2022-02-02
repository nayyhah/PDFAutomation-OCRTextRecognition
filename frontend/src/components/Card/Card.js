import React from "react";
import Github from "../../SVG/github";
import LinkedIn from "../../SVG/linkedin";

const Card = ({ src, title, description, github, linkedin }) => {
  return (
    <div className="w-80 cursor-pointer transform transition-all duration-300 ease-in-out hover:scale-110 shadow-xl py-10 flex flex-col items-center rounded-sm">
      <img
        src={src}
        alt={title}
        className="h-24 w-24 mb-7 shadow-lg rounded-full object-cover"
      />
      <h2 className="text-lg font-semibold">{title}</h2>
      {/* <p className="text-gray-400">Lorem ipsum dolor</p> */}
      <div className="flex items-center space-x-5 mt-5 ">
        <a rel="noreferrer" target="_blank" href={github}>
          <Github className="cursor-pointer h-6 w-6 transform transition-all duration-300 ease-in-out hover:scale-125" />
        </a>

        <a rel="noreferrer" target="_blank" href={linkedin}>
          <LinkedIn className="cursor-pointer h-6 w-6 transform transition-all duration-300 ease-in-out hover:scale-125" />
        </a>
      </div>
    </div>
  );
};

export default Card;
