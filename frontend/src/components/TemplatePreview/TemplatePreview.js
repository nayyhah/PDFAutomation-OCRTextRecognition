import React, { useState } from "react";
import { useClickOutside } from "../../CustomHook/use-click-outside";
import Template from "../../SVG/template";
import Cancel from "../../SVG/cancel";
import RightArrow from "../../SVG/right-arrow";
import Spinner from "../Spinner/Spinner";
import classes from "./templatePreview.module.css";

const TemplatePreview = ({
  setInvoiceOptionsPreview,
  setFilePreview,
  setTemplatePreview,
}) => {
  const [isLoading, setIsLoading] = useState(false);

  let domNode = useClickOutside(() => {
    setTemplatePreview(false);
    setInvoiceOptionsPreview(false);
    setFilePreview(false);
  });

  return (
    <div className={classes.modalWrapper} ref={domNode}>
      <div className={classes.modal}>
        <div className="bg-blue-modal py-4 mb-5 rounded-t-md flex justify-between w-full">
          {/* <div>
            <FileUploader files={files} setFiles={setFiles} />
            <span className="text-xs text-gray-200 ml-5">
              Allowed Types: .xls, .xlsx, .csv
            </span>
          </div> */}
          <div className="flex items-center space-x-1.5 text-white ml-3">
            <Template className="h-5 w-5" />
            <p className="text-lg">Select your template</p>
          </div>
          <div
            onClick={() => {
              setInvoiceOptionsPreview(false);
              setFilePreview(false);
              setTemplatePreview(false);
            }}
            className="cursor-pointer mr-5"
          >
            <Cancel className="h-7 w-7 text-white hover:text-blue-dark" />
          </div>
        </div>
        {/* <div className="mt-10 mx-auto w-80 bg-blue-light rounded-sm shadow-xl flex flex-col items-center">
          <h1 className="text-md font-semibold my-2 text-blue-dark font-sans">
            Select your choices
          </h1> */}

        {/* </div> */}
        <div
          //onClick={() => setInvoiceOptionsPreview(true)}
          className="absolute -bottom-5 left-1/2 transform -translate-x-1/2 -translate-y-1/2 bg-blue-modal hover:bg-blue-500 text-center cursor-pointer w-32 mx-auto shadow-lg rounded-sm my-5"
        >
          <button
            type="submit"
            disabled={isLoading}
            className="w-full p-2 disabled:opacity-50 shadow-xl text-sm font-semibold text-white flex items-center justify-center space-x-2"
          >
            <div className="flex items-center">
              <span className="mr-0.5">Download</span>
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

export default TemplatePreview;
