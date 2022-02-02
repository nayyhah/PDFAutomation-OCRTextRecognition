import React, { useState, useContext } from "react";
import { AuthContext } from "../../Context/auth-context";
import { Link } from "react-router-dom";
import { Formik } from "formik";
import * as Yup from "yup";

import Input from "../../components/Input/Input";
import Button from "../../components/Button/Button";
import Spinner from "../../components/Spinner/Spinner";
import ConfirmationModal from "../../components/ConfirmationModal/ConfirmationModal";

import Tick from "../../SVG/tick";
import Exclamation from "../../SVG/exclamation";
import useAxios from "../../CustomHook/api-hook";

const SignUp = () => {
  const [showMainError, setShowMainError] = useState(false);
  const [showIndividualError, setShowIndividualError] = useState(false);
  //const [isLoading, setIsLoading] = useState(false);
  //const [message, setMessage] = useState({});
  //const [isModalOpen, setIsModalOpen] = useState(false);

  const auth = useContext(AuthContext);

  const {
    //response,
    //error,
    isLoading,
    MakeAPICall,
    isModalOpen,
    message,
    setIsModalOpen,
  } = useAxios();

  let errorLength = 0;
  const TOTAL_VALIDATION_ELEMENTS = 5;

  const checkTotalErrors = () => {
    return TOTAL_VALIDATION_ELEMENTS === errorLength;
  };

  function checkErrors() {
    if (checkTotalErrors()) {
      setShowMainError(true);
    } else if (errorLength > 0) {
      setShowMainError(false);
      setShowIndividualError(true);
    }
  }

  const onCloseModal = () => {
    setIsModalOpen(false);
  };

  return (
    <div className="max-w-screen min-h-screen">
      <div className="mx-auto max-w-2xl shadow-xl mt-28 p-4 rounded-md">
        <h1 className="text-3xl text-center font-semibold">Sign Up</h1>
        {showMainError ? (
          <div className="text-center mt-3 mb-5 text-sm font-semibold text-red-400">
            <p>Please fill all the required fields!</p>
          </div>
        ) : null}
        <Formik
          initialValues={{
            firstName: "",
            lastName: "",
            // companyName: "",
            email: "",
            password: "",
            passwordConfirmation: "",
          }}
          validationSchema={Yup.object({
            firstName: Yup.string()
              .max(20, "Must be 20 characters or less")
              .required("First Name is Required"),
            lastName: Yup.string()
              .max(20, "Must be 20 characters or less")
              .required("Last Name is Required"),
            email: Yup.string()
              .email("Invalid email address")
              .required("Email is Required"),
            // companyName: Yup.string()
            //   .max(20, "Must be 20 characters or less")
            //   .required("Company Name is Required"),
            password: Yup.string()
              .required("Password is required")
              .min(6, "Must be 6 characters or more"),
            passwordConfirmation: Yup.string()
              .required("Password is required")
              .test("password-match", "Passwords must match", function (value) {
                return this.parent.password === value;
              }),
          })}
          onSubmit={async (values, { setSubmitting, resetForm }) => {
            setSubmitting(false);
            const { firstName, lastName, email, password } = values;
            //console.log(values);

            MakeAPICall(
              "/signup",
              "post",
              {
                firstName,
                lastName,
                username: email,
                password,
              },
              "Congratulatios! You have been signed up successfully.",
              auth
            );

            resetForm({
              firstName: "",
              lastName: "",
              companyName: "",
              email: "",
              password: "",
              passwordConfirmation: "",
            });

            // try {
            //   setIsLoading(true);
            //   const response = await axios.post("/signup", data);
            //   console.log("Response", response);
            //   setIsLoading(false);
            //   setMessage({
            //     heading: "Success!",
            //     text: `Congratulatios! You have been signed up successfully.`,
            //   });
            //   setIsLoading(false);
            //   setIsModalOpen(true);

            //   setTimeout(() => {
            //     if (response) {
            //       auth.login(response.data.user, response.data.token);
            //     }
            //   }, 2000);
            // } catch (err) {
            //   setIsLoading(true);
            //   console.log(err.response.data.message);
            //   setMessage({
            //     heading: "Error!",
            //     text: `${err.response.data.message}`,
            //   });
            //   setIsLoading(false);
            //   setIsModalOpen(true);
            // }
          }}
        >
          {(formik) => {
            errorLength = Object.keys(formik.errors).length;
            return (
              <form onSubmit={formik.handleSubmit} className="px-12 py-10">
                <div className="grid grid-cols-2 gap-10">
                  <div className="mb-5">
                    <Input
                      id="firstName"
                      name="firstName"
                      type="text"
                      autoComplete="firstName"
                      placeholder="First Name"
                      error={formik.errors.firstName}
                      showMainError={showMainError}
                      showIndividualError={showIndividualError}
                      extraclass={
                        formik.touched.firstName && formik.errors.firstName
                          ? "border-red-400"
                          : ""
                      }
                      {...formik.getFieldProps("firstName")}
                    />
                  </div>
                  <div className="mb-5">
                    <Input
                      id="lastName"
                      name="lastName"
                      type="text"
                      autoComplete="lastName"
                      placeholder="Last Name"
                      error={formik.errors.lastName}
                      showMainError={showMainError}
                      showIndividualError={showIndividualError}
                      extraclass={
                        formik.touched.lastName && formik.errors.lastName
                          ? "border-red-400"
                          : ""
                      }
                      {...formik.getFieldProps("lastName")}
                    />
                  </div>
                  <div className="mb-5 col-span-2">
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
                  {/* <div className="mb-5">
                    <Input
                      id="companyName"
                      name="companyName"
                      type="text"
                      autoComplete="companyName"
                      placeholder="Company Name"
                      error={formik.errors.companyName}
                      showMainError={showMainError}
                      showIndividualError={showIndividualError}
                      extraclass={
                        formik.touched.companyName && formik.errors.companyName
                          ? "border-red-400"
                          : ""
                      }
                      {...formik.getFieldProps("companyName")}
                    />
                  </div> */}
                  <div className="mb-5">
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
                  <div className="mb-20">
                    <Input
                      id="passwordConfirmation"
                      name="passwordConfirmation"
                      type="password"
                      autoComplete="passwordConfirmation"
                      placeholder="Password Confirmation"
                      error={formik.errors.passwordConfirmation}
                      showMainError={showMainError}
                      showIndividualError={showIndividualError}
                      extraclass={
                        formik.touched.passwordConfirmation &&
                        formik.errors.passwordConfirmation
                          ? "border-red-400"
                          : ""
                      }
                      {...formik.getFieldProps("passwordConfirmation")}
                    />
                  </div>
                </div>
                <div
                  className="bg-blue-text text-center cursor-pointer"
                  onClick={() => checkErrors()}
                >
                  <Button type="submit" disabled={isLoading}>
                    <span>Sign Up</span>
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

        <div className="mx-12 my-10 text-center">
          <div>
            <p className="text-gray-400">
              Already have an account? &nbsp;
              <span className="text-blue-text hover:underline">
                <Link to="/signin">Sign In</Link>
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

export default SignUp;
