import React, { useState } from "react";
import classes from "./form.module.css";
import Pencil from "../../SVG/pencil";
import Cancel from "../../SVG/cancel";
import Search from "../../SVG/search";
import Plus from "../../SVG/plus";
import Cross from "../../SVG/cross";
import { stringTruncateFromCenter } from "../../helpers/functions/string-truncate";
// import RightArrow from "../../SVG/right-arrow";
// import Spinner from "../Spinner/Spinner";
// import { useClickOutside } from "../../CustomHook/use-click-outside";
//import parsed from "../../helpers/parsed-data.json";
//import Dropdown from "../Dropdown/Dropdown";
import { unCamelCase } from "../../helpers/functions/un-camelcase";
//import data from "../../helpers/test.json";
import Tippy from "@tippyjs/react";
import "tippy.js/dist/tippy.css";
import Loader from "../Loader/Loader";
import ToCSV from "../ToCSV/ToCSV";
import ToJSON from "../ToJSON/ToJSON";

//let items = {};
//let keys = [];
//let finalOptions = [];
// for (let property in parsed) {
//   //console.log("property", property);
//   //console.log(parsed[property]);
//   for (let field in parsed[property]) {
//     //console.log("field", field);
//     let prop = property;
//     let val = parsed[property];
//     //console.log("val", val);
//     //let pair = { [prop + "-" + field]: value[field] };
//     let pair2 = {
//       title: unCamelCase(prop) + " -> " + field,
//       key: field,
//       value: val[field],
//       label: prop,
//     };
//     keys.push({ ...pair2 });
//     //console.log(prop + "-" + field + ":" + value[field]);
//     // items = { ...items, ...pair };
//   }
// }

// console.log("items", items);
// const newData = [{ ...items }];
// console.log("newData", newData);
// console.log("data", data);
//keys = [{ ...items }];
//console.log("keys", keys);

const InputForm = ({
  setInvoiceOptionsPreview,
  setFilePreview,
  setTemplatePreview,
  parsedData,
}) => {
  const [currentValue, setCurrentValue] = useState("");
  const [allValues, setAllValues] = useState([]);
  //const [isLoading, setIsLoading] = useState(false);
  const [filteredData, setFilteredData] = useState([]);
  const [isFieldsLoading, setIsFieldsLoading] = useState(false);
  const [selectedOptions, setSelectedOptions] = useState([]);
  //console.log("parsedData", parsedData);

  let keys = [];
  if (parsedData) {
    let data = parsedData[0];
    for (let index in data) {
      let item = data[index];
      //let item = items[i];
      //console.log(item, "item");
      for (let property in item) {
        //console.log("property", property);
        //console.log(parsed[property]);
        for (let field in item[property]) {
          //console.log("field", field);
          let prop = property;
          let val = item[property];
          //let value = parsed[property];
          //let pair = { [prop + "-" + field]: value[field] };
          let pair2;
          if (prop === "Product") {
            let productInformation = "";
            let productValue = val[field];
            for (let pro in productValue) {
              productInformation += pro + " -> " + productValue[pro] + " ";
            }
            pair2 = {
              title: unCamelCase(prop) + " -> " + field,
              key: field,
              //value: val[field],
              value: productInformation,
              label: prop,
            };
          } else {
            pair2 = {
              title: unCamelCase(prop) + " -> " + field,
              key: field,
              value: val[field],
              label: prop,
            };
          }
          keys.push({ ...pair2 });
          //console.log(prop + "-" + field + ":" + value[field]);
          // items = { ...items, ...pair };
        }
      }
    }
  }
  console.log("keys", keys);
  //console.log("allValues", allValues);

  const handleInputChange = (e) => {
    const searchWord = e.target.value;
    setCurrentValue(searchWord);
    setIsFieldsLoading(true);
    const newFilter = keys.filter((value) => {
      //console.log(value[searchWord], "value");
      return value.title.toLowerCase().includes(searchWord.toLowerCase());
    });

    if (searchWord === "") {
      setFilteredData([]);
    } else {
      setFilteredData(newFilter);
    }
    setTimeout(() => {
      setIsFieldsLoading(false);
    }, 1000);
  };

  const clearInput = () => {
    setFilteredData([]);
    setCurrentValue("");
  };

  const handleKeyPress = (e) => {
    if (e.key === "Enter") {
      if (currentValue !== "") {
        setAllValues([...allValues, currentValue]);
      }
      setCurrentValue("");
    }
  };
  const addButtonHandler = () => {
    if (currentValue !== "") {
      setAllValues([...allValues, currentValue]);
    }

    setCurrentValue("");
  };
  //console.log("allValues", allValues);

  const deleteFieldHandler = (idx) => {
    const filteredValues = allValues.filter((value, index) => index !== idx);
    //console.log("filteredValues", filteredValues);
    setAllValues([...filteredValues]);
  };

  // let domNode = useClickOutside(() => {
  //   setInvoiceOptionsPreview(false);
  //   setFilePreview(false);
  // });

  const addListFieldHandler = (value) => {
    setCurrentValue(value.title);
    const newFilter = filteredData.filter((val) => val.title !== value.title);
    setFilteredData(newFilter);
  };

  const showOptionsHandler = (type) => {
    let finalOptions = [];
    if (allValues.length > 0) {
      for (let i = 0; i < allValues.length; i++) {
        const foundData = keys.filter((val) => val.title === allValues[i]);
        //console.log(foundData, "foundData");
        finalOptions.push(...foundData);
      }
    }
    setSelectedOptions([...finalOptions]);
    console.log(finalOptions, "finalOptions");
    if (type === "JSON") {
      onDownload(finalOptions);
    }
  };

  // const jsonData = [
  //   {
  //     title: " From -> Tax ID/EIN/VAT No.",
  //     key: "Tax ID/EIN/VAT No.",
  //     value: "",
  //     label: "From",
  //   },
  //   {
  //     title: " Billing Info -> Invoice Line Total",
  //     key: "Invoice Line Total",
  //     value: "5.33",
  //     label: "BillingInfo",
  //   },
  //   {
  //     title: " Second Box -> Waybill Number",
  //     key: "Waybill Number",
  //     value: "1AA5259YP8R",
  //     label: "SecondBox",
  //   },
  // ];

  function download(content, fileName, contentType) {
    const a = document.createElement("a");
    const file = new Blob([content], { type: contentType });
    a.href = URL.createObjectURL(file);
    a.download = fileName;
    a.click();
  }
  //console.log("selectedOptions", selectedOptions);
  const onDownload = (finalOptions) => {
    download(JSON.stringify(finalOptions), "download.json", "text/plain");
  };

  return (
    <div className={classes.modalWrapper}>
      <div className={classes.modal}>
        <div className="bg-blue-modal py-4 mb-5 rounded-t-md flex justify-between">
          <div className="flex items-center space-x-1 text-white ml-3">
            <Pencil />

            <h1>Enter the fields you want to extract</h1>
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
        <div className="">
          <div className="w-3/4 ml-5">
            <div className="border-b-2 border-gray-200 flex items-center space-x-2">
              <Search className="text-blue-modal h-5 w-5 self-end mb-1 cursor-pointer" />
              <input
                type="text"
                name="items"
                id="items"
                className="grow focus:outline-none pt-2 pb-1 px-3"
                value={currentValue ? currentValue : ""}
                onChange={handleInputChange}
                onKeyPress={handleKeyPress}
                placeholder="Enter the filed name"
                autoComplete="off"
              />
              {isFieldsLoading && <Loader />}
              {filteredData.length !== 0 && !isFieldsLoading && (
                <Cancel
                  onClick={clearInput}
                  className="text-blue-modal hover:text-blue-text h-5 w-5 self-end cursor-pointer mb-1"
                />
              )}
            </div>
            {filteredData.length !== 0 && !isFieldsLoading && (
              <ul className="shadow-lg w-full rounded-md">
                {filteredData.slice(0, 5).map((value, key) => {
                  return (
                    <li
                      onClick={() => addListFieldHandler(value)}
                      className="font-light text-sm mb-2 py-2 px-5 cursor-pointer hover:bg-blue-50 hover:text-blue-modal hover:font-medium"
                      key={key}
                    >
                      {value.title}
                    </li>
                  );
                })}
              </ul>
            )}
          </div>

          {/* <div className="">
            <Dropdown items={items} />
          </div> */}

          <button
            style={{ top: "95px" }}
            className="absolute right-6 flex items-center space-x-2 active:bg-blue-dark rounded-full ml-5 cursor-pointer transform transition-all duration-300 ease-in-out hover:scale-110"
            onClick={addButtonHandler}
          >
            <Plus />
            <span className="font-light text-blue-text text-sm">Add filed</span>
          </button>
        </div>
        <ul className="px-10 pt-10 pb-20 grid grid-cols-4">
          {allValues.map((value, index) => (
            <Tippy key={index} content={<span>{value}</span>}>
              <li className="bg-gray-light transform transition-all duration-300 ease-in-out hover:scale-110 cursor-pointer max-w-fit px-3 py-1.5 rounded-full text-xs text-center my-2 shadow-md flex items-center space-x-3">
                <span className="text-gray-medium text-xs font-semibold">
                  {stringTruncateFromCenter(value, 7)}
                </span>
                <Cross
                  onClick={() => deleteFieldHandler(index)}
                  className="h-4 w-4 text-gray-500 cursor-pointer hover:text-blue-text"
                />
              </li>
            </Tippy>
          ))}
        </ul>
        <div className="flex items-center space-x-10 absolute bottom-2 left-1/2 transform -translate-x-1/2 -translate-y-1/2">
          <div
            onClick={() => showOptionsHandler("CSV")}
            //className="bg-white text-black hover:text-blue-text text-center cursor-pointer min-w-fit mx-auto shadow-lg rounded-sm my-5"
          >
            {/* <button
              type="submit"
              disabled={isLoading || allValues.length === 0}
              className="w-full p-2 disabled:opacity-50 shadow-xl text-sm font-semibold text-white flex items-center justify-center space-x-2"
            >
              <div className="flex items-center">
                <span className="mr-0.5">Download CSV</span>
                <RightArrow />
              </div>
              {isLoading && (
                <span>
                  <Spinner />
                </span>
              )}
            </button> */}
            <ToCSV
              type="submit"
              disabled={allValues.length === 0}
              data={selectedOptions}
              setSelectedOptions={setSelectedOptions}
            />
          </div>
          <div
          //onClick={() => onDownload()}
          //className="bg-white text-black hover:text-blue-text text-center cursor-pointer min-w-fit mx-auto shadow-lg rounded-sm my-5"
          >
            {/* <button
              type="submit"
              disabled={isLoading || allValues.length === 0}
              className="w-full p-2 disabled:opacity-50 shadow-xl text-sm font-semibold text-white flex items-center justify-center space-x-2"
            >
              <div className="flex items-center">
                <span className="mr-0.5">Download JSON</span>
                <RightArrow />
              </div>
              {isLoading && (
                <span>
                  <Spinner />
                </span>
              )}
            </button> */}
            <ToJSON
              type="submit"
              disabled={allValues.length === 0}
              onClick={() => showOptionsHandler("JSON")}
              data={selectedOptions}
              setSelectedOptions={setSelectedOptions}
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default InputForm;
