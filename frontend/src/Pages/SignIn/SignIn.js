import React, { useContext, useState } from "react";
import { AuthContext } from "../../Context/auth-context";
import { Link } from "react-router-dom";
import { Formik } from "formik";
import * as Yup from "yup";

import Input from "../../components/Input/Input";
import Button from "../../components/Button/Button";
import Spinner from "../../components/Spinner/Spinner";
import ConfirmationModal from "../../components/ConfirmationModal/ConfirmationModal";

import Exclamation from "../../SVG/exclamation";
import Tick from "../../SVG/tick";
import useAxios from "../../CustomHook/api-hook";
//import useAxios from "../../CustomHook/api-hook";

//let errorLength;

const SignIn = () => {
  const [showMainError, setShowMainError] = useState(false);
  const [showIndividualError, setShowIndividualError] = useState(false);
  //const [isLoading, setIsLoading] = useState(false);
  //const [message, setMessage] = useState({});
  //const [isModalOpen, setIsModalOpen] = useState(false);

  const {
    //response,
    //error,
    isLoading,
    MakeAPICall,
    isModalOpen,
    message,
    setIsModalOpen,
  } = useAxios();

  const auth = useContext(AuthContext);

  let errorLength;
  const TOTAL_VALIDATION_ELEMENTS = 2;

  const checkTotalErrors = () => {
    return TOTAL_VALIDATION_ELEMENTS === errorLength;
  };

  const onCloseModal = () => {
    setIsModalOpen(false);
  };

  function checkErrors() {
    if (checkTotalErrors()) {
      setShowMainError(true);
    } else if (errorLength > 0) {
      setShowMainError(false);
      setShowIndividualError(true);
    }
  }

  // const signInAPI = async (email, password) => {
  //   try {
  //     setIsLoading(true);
  //     const response = await axios.post("/signin", { email, password });
  //     console.log("Response", response);
  //     setIsLoading(false);
  //     setMessage({
  //       heading: "Success!",
  //       text: `Congratulatios! You have been signed in successfully.`,
  //     });
  //     setIsLoading(false);
  //     setIsModalOpen(true);

  //     setTimeout(() => {
  //       if (response) {
  //         auth.login(response.data.user, response.data.token);
  //       }
  //     }, 2000);
  //   } catch (err) {
  //     setIsLoading(true);
  //     console.log(err.response.data.message);
  //     setMessage({
  //       heading: "Error!",
  //       text: `${err.response.data.message}`,
  //     });
  //     setIsLoading(false);
  //     setIsModalOpen(true);
  //   }
  // };

  return (
    <div className="max-w-screen min-h-screen">
      <div className="mx-auto max-w-lg shadow-xl mt-28 p-4 rounded-md">
        <h1 className="text-3xl text-center font-semibold">Sign In</h1>
        {showMainError ? (
          <div className="text-center mt-3 mb-5 text-sm font-semibold text-red-400">
            <p>Please fill all the required fields!</p>
          </div>
        ) : null}
        <Formik
          initialValues={{
            email: "",
            password: "",
          }}
          validationSchema={Yup.object({
            email: Yup.string()
              .email("Invalid email address")
              .required("Email is Required"),
            password: Yup.string()
              .required("Password is required")
              .min(6, "Must be 6 characters or more"),
          })}
          onSubmit={async (values, { setSubmitting, resetForm }) => {
            const { email, password } = values;
            //console.log("email", email, "password", password);

            MakeAPICall(
              "/login",
              "post",
              { username: email, password },
              null,
              auth
            );

            setSubmitting(false);
            resetForm({ email: "", password: "" });
          }}
        >
          {(formik) => {
            errorLength = Object.keys(formik.errors).length;

            return (
              <form onSubmit={formik.handleSubmit} className="px-12 py-10">
                <div>
                  <div className="mb-10">
                    <Input
                      id="email"
                      name="email"
                      type="text"
                      autoComplete="email"
                      placeholder="Email"
                      error={formik.errors.email}
                      showMainError={showMainError}
                      showIndividualError={showIndividualError}
                      extraclass={
                        formik.touched.email && formik.errors.email
                          ? "border-red-400"
                          : ""
                      }
                      {...formik.getFieldProps("email")}
                    />
                  </div>
                  <div className="mb-16">
                    <Input
                      id="password"
                      name="password"
                      type="password"
                      autoComplete="current-password"
                      placeholder="Password"
                      error={formik.errors.password}
                      showMainError={showMainError}
                      showIndividualError={showIndividualError}
                      extraclass={
                        formik.touched.password && formik.errors.password
                          ? "border-red-400"
                          : ""
                      }
                      {...formik.getFieldProps("password")}
                    />
                  </div>
                </div>
                <div
                  className="bg-blue-text text-center cursor-pointer"
                  onClick={() => checkErrors()}
                >
                  <Button type="submit" disabled={isLoading}>
                    <span>Sign In</span>
                    {isLoading && (
                      <span>
                        <Spinner />
                      </span>
                    )}
                  </Button>
                </div>
              </form>
            );
          }}
        </Formik>

        <div className="mx-12 my-5 text-center">
          {/* <div className="mb-2">
            <p className="text-gray-400">
              Forgot &nbsp;
              <span className="text-blue-text hover:underline">
                <Link to="/forgot-password">Password?</Link>
              </span>
            </p>
          </div> */}
          <div>
            <p className="text-gray-400">
              Don't have an account? &nbsp;
              <span className="text-blue-text hover:underline">
                <Link to="/signup">Sign Up</Link>
              </span>
            </p>
          </div>
        </div>
      </div>
      {isModalOpen && (
        <ConfirmationModal
          message={message}
          Icon={message.heading === "Error" ? Exclamation : Tick}
          onCloseModal={onCloseModal}
        />
      )}
    </div>
  );
};

export default SignIn;
