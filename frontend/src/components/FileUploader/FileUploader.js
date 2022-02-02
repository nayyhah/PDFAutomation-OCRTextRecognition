import React from "react";

import classes from "./fileUploader.module.css";
import Search from "../../SVG/search";

const FileUploader = ({ files, setFiles }) => {
  // let FILE_SIZE;

  const handleFileChange = (e) => {
    let allFiles = e.target.files;
    let filesArr = Array.prototype.slice.call(allFiles);
    setFiles([...files, ...filesArr]);

    // FILE_SIZE = Math.ceil(e.target.files[0].size / (1026 * 1026));
    // if (FILE_SIZE > 4) {
    //   setFileName(
    //     "File too big. Upload files of size less than or equal to 4MB"
    //   );
    //   selectFile(null);
    // } else {
    //   setFileName(e.target.files[0].name);
    //   selectFile(e.target.files[0]);
    // }
    // console.log("FILE_SIZE in MB", FILE_SIZE);
  };
  //console.log("files from uploader", files);

  return (
    <div className="mb-1">
      <input
        className={classes.custom}
        type="file"
        multiple
        name="FileData"
        id="FileData"
        onChange={handleFileChange}
      />
      <label
        htmlFor="FileData"
        className="flex items-center justify-center space-x-1 shadow-lg bg-white cursor-pointer py-3 px-3 border border-gray-300 rounded-md leading-4 font-medium text-gray-700 hover:text-green-500 hover:border-green-300 focus:outline-none focus:border-green-300 focus:shadow-outline-green active:bg-gray-50 active:text-green-800"
      >
        <Search />
        <span>Choose Files</span>
      </label>
    </div>
  );
};

export default FileUploader;
