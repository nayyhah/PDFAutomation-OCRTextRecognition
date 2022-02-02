import React from "react";
import classes from "./loadingSpinner.module.css";

const LoadingSpinner = () => {
  return (
    <div className={classes.wrapper}>
      <div className={classes.spinner}>
        <div className={classes.spinner1}></div>
        <div className={classes.spinner2}></div>
        <div className={classes.spinner3}></div>
      </div>
    </div>
  );
};

export default LoadingSpinner;
