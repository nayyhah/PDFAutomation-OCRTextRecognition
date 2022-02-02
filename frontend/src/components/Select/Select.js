import React, { useState, useRef } from "react";
import { components } from "react-select";
import { default as ReactSelect } from "react-select";
import Cancel from "../../SVG/cancel";
import classes from "./select.module.css";
import Refresh from "../../SVG/refresh";
import { useClickOutside } from "../../CustomHook/use-click-outside";
import RightArrow from "../../SVG/right-arrow";
import Spinner from "../Spinner/Spinner";
import Adjustments from "../../SVG/adjustments";

const Option = (props) => {
  return (
    <div>
      <components.Option {...props}>
        <input
          type="checkbox"
          checked={props.isSelected}
          onChange={() => null}
        />{" "}
        <label>{props.label}</label>
      </components.Option>
    </div>
  );
};

const MoreSelectedBadge = ({ items }) => {
  const style = {
    marginLeft: "auto",
    background: "#E8FFFC",
    borderRadius: "4px",
    fontFamily: "inherit",
    fontSize: "10px",
    fontWeight: "500",
    padding: "4px",
    order: 99,
    color: "#00342D",
    marginTop: "3px",
  };

  const title = items.join(", ");
  const length = items.length;
  const label = `+ ${length} item${length !== 1 ? "s" : ""} `;

  return (
    <div style={style} title={title}>
      {label}
    </div>
  );
};

const MultiValue = ({ index, getValue, ...props }) => {
  const maxToShow = 1;
  const overflow = getValue()
    .slice(maxToShow)
    .map((x) => x.label);

  return index < maxToShow ? (
    <components.MultiValue {...props} />
  ) : index === maxToShow ? (
    <MoreSelectedBadge items={overflow} />
  ) : null;
};

const Select = ({
  setInvoiceOptionsPreview,
  setFilePreview,
  setTemplatePreview,
}) => {
  const [selectedOptions, setSelectedOptions] = useState([]);
  const [isLoading, setIsLoading] = useState(false);

  const valueRef = useRef(selectedOptions);
  valueRef.current = selectedOptions;

  const selectAllOption = {
    value: "<SELECT_ALL>",
    label: "Select All",
  };

  const isSelectAllSelected = () => {
    return valueRef.current.length === options.length;
  };

  const isOptionSelected = (option) => {
    return (
      valueRef.current.some(({ value }) => value === option.value) ||
      isSelectAllSelected()
    );
  };

  const getOptions = () => [selectAllOption, ...options];

  const getValue = () =>
    isSelectAllSelected() ? [selectAllOption] : selectedOptions;

  const customStyles = {
    control: (base, state) => ({
      ...base,
      width: "250px",
      border: "1.5px solid #00BFA5",
      boxShadow:
        "rgba(0, 0, 0, 0.1) 0px 4px 6px -1px, rgba(0, 0, 0, 0.06) 0px 2px 4px -1px;",
      "&:hover": {
        borderColor: "inherit",
        boxShadow: "0 0 0 1.5px #00BFA5",
      },
      fontSize: "13px",
    }),
    option: (base, state) => ({
      ...base,
      backgroundColor: "#FFFFF",
      "&:hover": {
        backgroundColor: "#E8FFFC",
      },
      color: "black",
    }),
  };

  const handleChange = (newValue, actionMeta) => {
    const { action, option, removedValue } = actionMeta;
    if (action === "select-option" && option.value === selectAllOption.value) {
      setSelectedOptions(options, actionMeta);
      //onChangeFilterOptions(options, id);
    } else if (
      (action === "deselect-option" &&
        option.value === selectAllOption.value) ||
      (action === "remove-value" &&
        removedValue.value === selectAllOption.value)
    ) {
      setSelectedOptions([], actionMeta);
      //onChangeFilterOptions([], id);
    } else if (
      actionMeta.action === "deselect-option" &&
      isSelectAllSelected()
    ) {
      setSelectedOptions(
        options.filter(({ value }) => value !== option.value),
        actionMeta
      );
      //   onChangeFilterOptions(
      //     options.filter(({ value }) => value !== option.value),
      //     id
      //   );
    } else {
      setSelectedOptions(newValue || [], actionMeta);
      //onChangeFilterOptions(newValue || [], id);
    }
  };

  const resetButtonHandler = () => {
    setSelectedOptions([]);
    //onChangeFilterOptions([], id);
  };

  let domNode = useClickOutside(() => {
    setInvoiceOptionsPreview(false);
    setFilePreview(false);
  });

  const options = [
    { value: "AL", label: "Alabama" },
    { value: "AK", label: "Alaska" },
    { value: "AS", label: "American Samoa" },
    { value: "AZ", label: "Arizona" },
    { value: "AR", label: "Arkansas" },
    { value: "CA", label: "California" },
    { value: "CO", label: "Colorado" },
    { value: "CT", label: "Connecticut" },
    { value: "DE", label: "Delaware" },
    { value: "DC", label: "District Of Columbia" },
    { value: "FM", label: "Federated States Of Micronesia" },
    { value: "FL", label: "Florida" },
  ];

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
            <Adjustments className="h-5 w-5" />
            <p className="text-lg">Select the data items you want to extract</p>
          </div>
          <div
            onClick={() => {
              setInvoiceOptionsPreview(false);
              setFilePreview(false);
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
        <div className="mt-5 w-72 mx-auto flex items-center justify-center">
          <ReactSelect
            isMulti
            value={getValue()}
            options={getOptions()}
            styles={customStyles}
            onChange={handleChange}
            allowSelectAll={true}
            closeMenuOnSelect={false}
            hideSelectedOptions={false}
            isOptionSelected={isOptionSelected}
            components={{
              Option,
              MultiValue,
            }}
          />
          <button
            className="ml-5 flex items-center justify-center space-x-0.5 bg-red-600 hover:bg-red-500 px-3 py-1 rounded-sm text-sm text-center text-white shadow-lg"
            onClick={resetButtonHandler}
          >
            <Refresh className="h-3.5 w-3.5" />
            <span>Reset</span>
          </button>
        </div>

        {/* </div> */}
        <div
          onClick={() => {
            //setInvoiceOptionsPreview(false);
            setTemplatePreview(true);
          }}
          className="absolute -bottom-5 left-1/2 transform -translate-x-1/2 -translate-y-1/2 bg-blue-modal hover:bg-blue-500 text-center cursor-pointer w-32 mx-auto shadow-lg rounded-sm my-5"
        >
          <button
            type="submit"
            disabled={isLoading}
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

export default Select;
