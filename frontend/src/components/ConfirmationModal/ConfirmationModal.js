import React from "react";

import Cancel from "../../SVG/cancel";
import Spinner from "../Spinner/Spinner";
import classes from "./confirmModal.module.css";

const ConfirmationModal = ({
  onCloseModal,
  deleteHandler,
  Icon,
  message,
  button,
  isLoading,
}) => {
  return (
    <div className={classes.modalWrapper}>
      <div className={classes.modal}>
        <div className="flex items-center justify-between mb-5 bg-blue-text p-4 rounded-t-md">
          <div className="flex items-center space-x-2">
            <Icon className="h-7 w-7 text-white" />
            <h1 className="text-white text-xl">{message?.heading}</h1>
          </div>
          <div className="cursor-pointer" onClick={onCloseModal}>
            <Cancel className="h-7 w-7 text-white hover:text-blue-dark" />
          </div>
        </div>
        <div className="my-10 px-10 text-gray-500 text-lg">
          <p>{message?.text}</p>
        </div>
        {button && button === true && (
          <div className="flex items-center space-x-3 pb-5 ml-48 px-3">
            <button
              onClick={onCloseModal}
              className="w-28 rounded-sm shadow-lg bg-white border border-blue-text active:bg-blue-light py-2  disabled:opacity-50  text-md font-semibold text-blue-text text-center"
            >
              No
            </button>
            <button
              disabled={isLoading}
              onClick={() => deleteHandler()}
              className="w-28 rounded-sm shadow-lg bg-blue-dark  border border-blue-dark active:bg-green-900  py-2  disabled:opacity-50  text-md font-semibold text-white text-center flex items-center justify-center space-x-2"
            >
              <span>Yes</span>
              {isLoading && (
                <span>
                  <Spinner />
                </span>
              )}
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

export default ConfirmationModal;
