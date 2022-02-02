import React, { useEffect, useState } from "react";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import { useAuth } from "./CustomHook/auth-hook";
import { AuthContext } from "./Context/auth-context";

import Header from "./components/Header/Header";
import Home from "./Pages/Home/Home";
import NoMatch from "./Pages/NoMatch/NoMatch";
import SignIn from "./Pages/SignIn/SignIn";
import SignUp from "./Pages/SignUp/SignUp";
import FileUpload from "./Pages/FileUpload/FileUpload";
//import DynamicForm from "./components/DynamicForm/DynamicForm";
import LoadingSpinner from "./components/LoadingSpinner/LoadingSpinner";
import UserHistory from "./Pages/UserHistory/UserHistory";
// import ToCSV from "./components/ToCSV/ToCSV";
// import ToPDF from "./components/ToPDF/ToPDF";
// import ParsingData from "./components/ParsingData/ParsingData";
// import InputForm from "./components/InputForm/InputForm";
// import SelectTemplate from "./components/SelectTemplate/SelectTemplate";
// import ToJSON from "./components/ToJSON/ToJSON";
// import CircleLoader from "./components/CircleLoader/CircleLoader";

function App() {
  const { token, login, logout, updateProfile, user } = useAuth();
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    setLoading(false);
  }, []);

  return (
    <AuthContext.Provider
      value={{
        isLoggedIn: !!token,
        token: token,
        user: user,
        login: login,
        logout: logout,
        updateProfile: updateProfile,
      }}
    >
      <BrowserRouter>
        <Header />
        {loading && <LoadingSpinner />}
        {!loading && (
          <Routes>
            <Route path="/" element={<Home />} />
            <Route
              path="/signin"
              element={token ? <Navigate to="/file-upload" /> : <SignIn />}
            />
            <Route
              path="/signup"
              element={token ? <Navigate to="/file-upload" /> : <SignUp />}
            />
            <Route path="/file-upload" element={<FileUpload />} />
            {/* <Route path="/form" element={<CircleLoader />} />
            |<Route path="/to-csv" element={<ToCSV />} />
            <Route path="/to-json" element={<ToJSON />} />
            <Route path="/parse" element={<InputForm />} />
            <Route path="/select" element={<SelectTemplate />} /> */}
            <Route path="/user-history" element={<UserHistory />} />
            <Route path="*" element={<NoMatch />} />
          </Routes>
        )}
      </BrowserRouter>
    </AuthContext.Provider>
  );
}

export default App;
