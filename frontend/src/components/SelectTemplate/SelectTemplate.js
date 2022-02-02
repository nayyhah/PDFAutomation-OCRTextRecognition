import React, { useState } from "react";
import Cancel from "../../SVG/cancel";
// import Button from "../Button/Button";
// import Dropdown from "../Dropdown/Dropdown";
import Spinner from "../Spinner/Spinner";
import classes from "./selectTemplate.module.css";
import Template from "../../SVG/template";
import Template1 from "../../images/template1.jpg";
import Template2 from "../../images/template2.png";
import RightArrow from "../../SVG/right-arrow";
// import { useClickOutside } from "../../CustomHook/use-click-outside";
// import axios from "../../helpers/axios";
import CircleLoader from "../CircleLoader/CircleLoader";

const SelectTemplate = ({
  setInvoiceOptionsPreview,
  setTemplatePreview,
  files,
  setFiles,
  uploadFilesAPI,
  isLoading,
  radioOption,
  setRadioOption,
}) => {
  //const [isLoading, setIsLoading] = useState(true);
  //console.log("loading", isLoading);

  //console.log("radioOption", radioOption);

  // let domNode = useClickOutside(() => {
  //   setTemplatePreview(false);
  // });

  // const formData = new FormData();
  // if (files.length > 0) {
  //   for (let i = 0; i < files.length; i++) {
  //     formData.append("invoices", files[i]);
  //   }
  //   formData.append("tempplateid", "0");
  // }

  // const uploadFilesAPI = async () => {
  //   try {
  //     setIsLoading(true);
  //     const response = await axios.post(
  //       `https://invictus-decipher.herokuapp.com/admin/parse`,
  //       formData
  //     );
  //     console.log("Response", response);
  //     // setMessage({
  //     //   heading: "Success!",
  //     //   text: `Congraulations! Your file/files have been successfully uploaded to your dashboard.`,
  //     // });
  //     setIsLoading(false);
  //     // setIsModalOpen(true);
  //     setFiles([]);
  //   } catch (err) {
  //     setIsLoading(true);
  //     console.log(err);
  //     // setMessage({
  //     //   heading: "Error!",
  //     //   text: `${err.response.data.message}`,
  //     // });
  //     setIsLoading(false);
  //     // setIsModalOpen(true);
  //   }
  // };

  return (
    <div className={classes.modalWrapper}>
      {isLoading && (
        <div
          style={{
            filter: "blur(0px)",
            zIndex: "10000",
            position: "absolute",
            top: "280px",
          }}
        >
          <CircleLoader />
        </div>
      )}
      <div
        className={classes.modal}
        style={{ filter: isLoading ? "blur(2px)" : "blur(0px)" }}
      >
        <div className="bg-blue-modal py-4 mb-5 rounded-t-md flex justify-between">
          <div className="flex items-center space-x-1 text-white ml-3">
            <Template className="h-5 w-5" />
            <h1>Select your template</h1>
          </div>
          <div
            onClick={() => setTemplatePreview(false)}
            className="cursor-pointer mr-5"
          >
            <Cancel className="h-7 w-7 text-white hover:text-blue-dark" />
          </div>
        </div>

        <div className="flex justify-between mt-10 mb-16 px-12">
          <div className="flex items-center space-x-5">
            <span
              onClick={() =>
                setRadioOption({ id: "0", toggle: !radioOption.toggle })
              }
              className={`rounded-full shadow-md px-2 py-2 cursor-pointer ${
                radioOption.id === "0" ? "bg-blue-text" : "bg-gray-100"
              }`}
            ></span>
            <img
              src={Template1}
              alt="Template1"
              className="cursor-pointer h-48 w-40 shadow-md transform transition-all duration-300 ease-in-out hover:scale-125"
            />
          </div>
          <div className="flex items-center space-x-5">
            <span
              onClick={() => setRadioOption({ id: "1" })}
              className={`rounded-full shadow-md px-2 py-2 cursor-pointer ${
                radioOption.id === "1" ? "bg-blue-text" : "bg-gray-100"
              }`}
            ></span>
            <img
              src={Template2}
              alt="Template2"
              className="cursor-pointer h-48 w-40 shadow-md transform transition-all duration-300 ease-in-out hover:scale-125"
            />
          </div>
        </div>
        <div
          //onClick={() => setInvoiceOptionsPreview(true)}
          // onClick={() => setTemplateOptionsPreview(true)}

          className="absolute -bottom-5 left-1/2 transform -translate-x-1/2 -translate-y-1/2 bg-blue-modal hover:bg-blue-500 text-center cursor-pointer w-32 mx-auto shadow-lg rounded-sm my-5"
        >
          <button
            onClick={uploadFilesAPI}
            type="submit"
            disabled={isLoading || radioOption.id === null}
            className="w-full p-2 disabled:opacity-50 shadow-xl text-sm font-semibold text-white flex items-center justify-center space-x-2"
          >
            <div className="flex items-center">
              <span className="mr-0.5">Next</span>
              <RightArrow />
            </div>
            {isLoading && (
              <span>
                <Spinner />
              </span>
            )}
          </button>
        </div>
      </div>
    </div>
  );
};

export default SelectTemplate;
