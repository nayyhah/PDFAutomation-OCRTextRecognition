import React from "react";
import classes from "./avatar.module.css";

const Avatar = ({ user }) => {
  // console.log(user);
  return (
    <div className={classes.circle}>
      <span className={classes.name}>
        {user ? `${user.firstName[0]}${user.lastName[0]}` : "DU"}
      </span>
    </div>
  );
};

export default Avatar;
