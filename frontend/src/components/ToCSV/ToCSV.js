import React from "react";
import { CSVLink } from "react-csv";
//import { data } from "../../helpers/data";
import Download from "../../SVG/download";

const headers = [
  { label: "Field", key: "title" },
  { label: "Value", key: "value" },
];

// const data = [
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

const ToCSV = ({ type, disabled, data, setSelectedOptions }) => {
  const csvReport = {
    data: data,
    headers: headers,
    filename: "download.csv",
  };
  //console.log("data from csv", data);

  return (
    <button
      type={type}
      disabled={disabled}
      className="border-2 hover:border-blue-text shadow-lg min-w-fit  text-blue-text hover:bg-blue-text hover:text-white text-center disabled:opacity-50 disabled:hover:bg-white disabled:hover:text-blue-text font-semibold  px-2 py-3 text-xs rounded inline-flex items-center"
    >
      <Download className="fill-current w-3.5 h-3.5 mr-2" />
      {!disabled && <CSVLink {...csvReport}>Download CSV</CSVLink>}
      {disabled && <span>Download CSV</span>}
    </button>
  );
};

export default ToCSV;
