import { useState, useEffect, useCallback } from "react";

let logoutTimer;

export const useAuth = () => {
  const [token, setToken] = useState(null);
  const [user, setUser] = useState(null);
  const [tokenExpirationDate, setTokenExpirationDate] = useState(null);
  //const [isVerified, setIsVerified] = useState(false);

  const login = useCallback((userData, token, expirationDate) => {
    setToken(token);
    setUser(userData);
    // if (userData.isVerified === true || userData.isVerified === false) {
    //   setIsVerified(userData.isVerified);
    //   console.log("userData", userData);
    // } else {
    //   setIsVerified(false);
    // }
    const tokenExpirationDate =
      expirationDate || new Date(new Date().getTime() + 1000 * 60 * 60 * 24);

    setTokenExpirationDate(tokenExpirationDate);

    localStorage.setItem(
      "userData",
      JSON.stringify({
        user: userData,
        token: token,
        expiration: tokenExpirationDate.toISOString(),
        //isVerified: userData.isVerified,
      })
    );
  }, []);

  const updateProfile = useCallback((userData, token, expirationDate) => {
    localStorage.removeItem("userData");
    setToken(token);
    setUser(userData);
    // if (userData.isVerified === true || userData.isVerified === false) {
    //   setIsVerified(userData.isVerified);
    //   console.log("userData", userData);
    // } else {
    //   setIsVerified(false);
    // }
    const tokenExpirationDate =
      expirationDate || new Date(new Date().getTime() + 60 * 60 * 24 * 1000);

    setTokenExpirationDate(tokenExpirationDate);

    localStorage.setItem(
      "userData",
      JSON.stringify({
        user: userData,
        token: token,
        expiration: tokenExpirationDate.toISOString(),
        //isVerified: userData.isVerified,
      })
    );
  }, []);

  const logout = useCallback(() => {
    setToken(null);
    setTokenExpirationDate(null);
    setUser(null);
    //setIsVerified(false);

    localStorage.removeItem("userData");
  }, []);

  useEffect(() => {
    if (token && tokenExpirationDate) {
      const remainingTime =
        tokenExpirationDate.getTime() - new Date().getTime();
      logoutTimer = setTimeout(logout, remainingTime);
    } else {
      clearTimeout(logoutTimer);
    }
  }, [token, tokenExpirationDate, logout]);

  useEffect(() => {
    const storedData = JSON.parse(localStorage.getItem("userData"));
    if (
      storedData &&
      storedData.token &&
      new Date(storedData.expiration) > new Date()
    ) {
      login(storedData.user, storedData.token, new Date(storedData.expiration));
    }
  }, [login]);

  return { token, login, logout, updateProfile, user };
};
