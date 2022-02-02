import React, { useContext, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { AuthContext } from "../../Context/auth-context";
import Avatar from "../../SVG/Avatar/Avatar";
import { useClickOutside } from "../../CustomHook/use-click-outside";
import classes from "./header.module.css";
import Logo from "../../images/icon.png";

const Header = () => {
  const auth = useContext(AuthContext);

  const [openMyAccount, setOpenMyAccount] = useState(false);
  const [openDashboard, setOpenDashboard] = useState(false);
  const navigate = useNavigate();

  const logoutHandler = () => {
    auth.logout();
    navigate("/signin");
    setOpenMyAccount(false);
  };

  // const myProfileHandler = () => {
  //   navigate("/update-profile");
  //   setOpenMyAccount(false);
  // };

  const myAccountHandler = () => {
    if (openMyAccount === true) {
      setOpenMyAccount(false);
    } else {
      setOpenMyAccount(true);
    }
    setOpenDashboard(false);
  };

  const dashboardHandler = () => {
    setOpenDashboard(!openDashboard);
    setOpenMyAccount(false);
    navigate("/user-history");
  };

  let domNode = useClickOutside(() => {
    setOpenMyAccount(false);
    setOpenDashboard(false);
  });
  return (
    <div className="border border-gray-200 max-w-screen h-16 px-10  bg-gray-background shadow-sm overflow-hidden flex items-center justify-between">
      <Link
        to="/"
        className="flex items-center space-x-2 curosr-pointer text-3xl font-semibold text-blue-dark hover:text-blue-text"
      >
        <img src={Logo} alt="" className="h-10 w-10 mt-2" />
        <span>Decipher</span>
      </Link>
      {!auth.isLoggedIn && (
        <div className="flex items-center space-x-5">
          <Link
            to="/signin"
            className="rounded-sm px-3 py-1 text-xl text-center font-light text-blue-text hover:text-blue-modal"
          >
            Sign In
          </Link>
          <Link
            to="/signup"
            className="rounded-sm px-3 py-1 text-xl text-center font-light text-blue-text hover:text-blue-modal"
          >
            Sign Up
          </Link>
        </div>
      )}
      {auth.isLoggedIn && (
        <div>
          <div onClick={myAccountHandler} className="cursor-pointer">
            <Avatar user={auth.user} />
          </div>

          {openMyAccount && (
            <ul
              ref={domNode}
              className={`w-52 rounded-sm shadow-lg border py-2 absolute right-10 top-14 z-20 bg-white cursor-pointer ${classes.modal}`}
            >
              <li
                onClick={dashboardHandler}
                className="px-8 py-2 mb-1 hover:bg-blue-text hover:text-white"
              >
                My Dashboards
              </li>
              {/* <li
                onClick={myProfileHandler}
                className="px-8 py-2 mb-1 hover:bg-blue-text hover:text-white"
              >
                My Profile
              </li> */}
              <li
                onClick={logoutHandler}
                className="px-8 py-2 mb-1 hover:bg-blue-text hover:text-white"
              >
                Logout
              </li>
            </ul>
          )}
        </div>
      )}
    </div>
  );
};

export default Header;
