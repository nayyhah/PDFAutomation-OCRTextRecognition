import React, { useState } from "react";

//import FileUploader from "../FileUploader";
import Spinner from "../../Spinner/Spinner";
//import useAxios from "../../../CustomHook/api-hook";
//import ConfirmationModal from "../../ConfirmationModal/ConfirmationModal";
import { stringTruncateFromCenter } from "../../../helpers/functions/string-truncate";
import { useClickOutside } from "../../../CustomHook/use-click-outside";

//import Tick from "../../../SVG/tick";
import Cross from "../../../SVG/cross";
import Cancel from "../../../SVG/cancel";
//import Exclamation from "../../../SVG/exclamation";

import classes from "./filePreview.module.css";
import RightArrow from "../../../SVG/right-arrow";
//import Collection from "../../../images/collection.png";
import Documents from "../../../SVG/documents";
import SelectTemplate from "../../SelectTemplate/SelectTemplate";
import axios from "../../../helpers/axios";

const FilePreview = ({
  setFilePreview,
  files,
  fileDeleteHandler,
  setInvoiceOptionsPreview,
  setTemplatePreview,
}) => {
  const [isLoading, setIsLoading] = useState(false);
  const [templateOptionsPreview, setTemplateOptionsPreview] = useState(false);
  // const [isModalOpen, setIsModalOpen] = useState(true);
  // const [message, setMessage] = useState("");

  // const {
  //   //response,
  //   //error,
  //   isLoading,
  //   MakeAPICall,
  //   isModalOpen,
  //   message,
  //   setIsModalOpen,
  // } = useAxios();

  // const formData = new FormData();
  // if (files.length > 0) {
  //   for (let i = 0; i < files.length; i++) {
  //     formData.append("files", files[i]);
  //   }
  //   formData.append("dashboardId", dashboardIdRef.current);
  // }

  // const onCloseModal = () => {
  //   setIsModalOpen(false);
  // };

  // const uploadFilesToDashboardAPI = () => {
  //   MakeAPICall(
  //     "/dashboard/uploadFiles",
  //     "post",
  //     formData,
  //     `Congraulations! Your file/files have been successfully uploaded to your dashboard.`,
  //     null,
  //     null,
  //     null,
  //     setFiles
  //   );
  // };
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
  //     // setFiles([]);
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

  let domNode = useClickOutside(() => {
    setFilePreview(false);
  });

  return (
    <div className={classes.modalWrapper}>
      <div className={classes.modal}>
        {/* {templateOptionsPreview && (
          <SelectTemplate
            setInvoiceOptionsPreview={setInvoiceOptionsPreview}
            setTemplateOptionsPreview={setTemplateOptionsPreview}
          />
        )} */}
        <div className="bg-blue-modal py-4 mb-5 rounded-t-md flex justify-between">
          {/* <div>
            <FileUploader files={files} setFiles={setFiles} />
            <span className="text-xs text-gray-200 ml-5">
              Allowed Types: .xls, .xlsx, .csv
            </span>
          </div> */}
          <div className="flex items-center space-x-1 text-white ml-3">
            <Documents className="h-6 w-6" />
            <h1 className="text-lg">Your Files</h1>
          </div>
          <div
            onClick={() => setFilePreview(false)}
            className="cursor-pointer mr-5"
          >
            <Cancel className="h-7 w-7 text-white hover:text-blue-dark" />
          </div>
        </div>
        <div className="flex items-center px-5 ">
          <div className="grid grid-cols-3 gap-5 justify-items-start w-full mb-2 text-gray-500 font-semibold">
            <h3>File Name</h3>
            <h3>File Type</h3>
            <h3>File Size</h3>
          </div>
        </div>
        <div className="border-b-2 border-gray-200 w-full"></div>
        <div className="h-3/5 overflow-y-auto">
          <div className="pb-20 ">
            {files.length > 0 ? (
              files.map((file) => (
                <div key={file.name} className="bg-gray-50 mb-2 px-5 flex py-2">
                  <div className="text-sm grid grid-cols-3 gap-10 justify-items-start w-full text-gray-700">
                    <h4>{stringTruncateFromCenter(file.name, 15)}</h4>
                    <h4>{stringTruncateFromCenter(file.type, 15)}</h4>
                    <h4>{`${Math.ceil(file.size / 1026)} KB`}</h4>
                  </div>
                  <div
                    className="mt-1 cursor-pointer"
                    onClick={() => fileDeleteHandler(file)}
                  >
                    <Cross className="x-circle w-4 h-4 text-red-500 hover:text-red-400 " />
                  </div>
                </div>
              ))
            ) : (
              <div className="my-10 px-10 text-gray-500 text-lg">
                <p>No files present. Add files to upload to your dashboard.</p>
              </div>
            )}
            <div
              //onClick={() => setInvoiceOptionsPreview(true)}
              onClick={() => {
                setFilePreview(false);
                setTemplatePreview(true);
              }}
              //onClick={uploadFiles}
              className="absolute -bottom-5 left-1/2 transform -translate-x-1/2 -translate-y-1/2 bg-blue-modal hover:bg-blue-500 text-center cursor-pointer w-32 mx-auto shadow-lg rounded-sm my-5"
            >
              <button
                type="submit"
                disabled={isLoading || files.length === 0}
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
      </div>
      {/* {isModalOpen && (
        <ConfirmationModal
          message={message}
          Icon={message.heading === "Error" ? Exclamation : Tick}
          onCloseModal={onCloseModal}
        />
      )} */}
    </div>
  );
};

export default FilePreview;
