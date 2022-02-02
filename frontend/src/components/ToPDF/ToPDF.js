import React from "react";
import pdfMake from "pdfmake/build/pdfmake.js";
import pdfFonts from "pdfmake/build/vfs_fonts.js";
import Download from "../../SVG/download";
import { data } from "../../helpers/data";

const ToPDF = () => {
  pdfMake.vfs = pdfFonts.pdfMake.vfs;

  //   const employees = [
  //     { firstName: "John", lastName: "Doe" },
  //     { firstName: "Anna", lastName: "Smith" },
  //     { firstName: "Peter", lastName: "Jones" },
  //   ];
  const document = {
    content: [{ text: "Employees", fontStyle: 15, lineHeight: 2 }],
  };
  data.forEach((d) => {
    document.content.push({
      columns: [
        { text: "First Name", width: 60 },
        { text: ":", width: 10 },
        { text: d.firstName, width: 50 },
        { text: "Last Name", width: 60 },
        { text: ":", width: 10 },
        { text: d.lastName, width: 50 },
        { text: "Email", width: 60 },
        { text: ":", width: 10 },
        { text: d.email, width: 200 },
      ],
      lineHeight: 2,
    });
  });

  const downloadPDFHandler = () => {
    pdfMake.createPdf(document).download();
  };

  return (
    <button
      onClick={downloadPDFHandler}
      className="bg-gray-300 hover:bg-gray-400 text-gray-800 font-bold p-2 text-xs rounded inline-flex items-center"
    >
      <Download className="fill-current w-3.5 h-3.5 mr-2" />
      <span>Download PDF</span>
    </button>
  );
};

export default ToPDF;
