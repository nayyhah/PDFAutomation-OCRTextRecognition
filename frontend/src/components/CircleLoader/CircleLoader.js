import React from "react";
import "./circleLoader.styles.css";

const CircleLoader = () => {
  return (
    <div>
      <div className="row">
        <div className="col-sm-2 col-xs-4 text-center">
          <div className="dots-loader"> </div>
        </div>
      </div>
    </div>
  );
};

export default CircleLoader;
