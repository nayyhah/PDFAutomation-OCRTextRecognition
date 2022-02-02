import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import LoadingSpinner from "../../components/LoadingSpinner/LoadingSpinner";
import axios from "../../helpers/axios";

const UserHistory = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [templates, setTemplates] = useState([]);
  //const [templateInfo, setTemplateInfo] = useState([]);
  let templateInfo = [];

  const navigate = useNavigate();
  //   console.log("templates", templates);
  //   console.log("templateInfo", templateInfo);

  useEffect(() => {
    const userHistoryAPI = async () => {
      try {
        setIsLoading(true);
        const response = await axios.get(
          `https://invictus-backend-dell.herokuapp.com/admin/userhistory`
        );
        //console.log("Response", response.data);
        if (response.statusText === "OK") {
          setTemplates([...response.data]);

          // setTemplateInfo({
          //   templateId: response.data[0].templateID,
          //   timestamp: response.data[0].timestamp,
          // });
        }
        // setMessage({
        //   heading: "Success!",
        //   text: `Congraulations! Your file/files have been successfully uploaded to your dashboard.`,
        // });
        setIsLoading(false);
        // setIsModalOpen(true);
      } catch (err) {
        setIsLoading(true);
        console.log(err);
        // setMessage({
        //   heading: "Error!",
        //   text: `${err.response.data.message}`,
        // });
        setIsLoading(false);
        // setIsModalOpen(true);
      }
    };

    userHistoryAPI();
  }, []);

  //console.log(templates, "templates");
  if (templates.length > 0) {
    for (let i = 0; i < templates.length; i++) {
      const data = templates[i].parsed;
      let timestamp = templates[i].timestamp;
      let templateID = templates[i].templateID;

      for (let j = 0; j < data.length; j++) {
        const item = data[j];
        //console.log(item, "item");
        templateInfo.push({
          ...item,
          timestamp: timestamp,
          templateID: templateID,
        });
      }
    }
    //console.log(finalTemplate, "finalTemplate");
  }
  //console.log("templateInfo: ", templateInfo);

  return (
    <div className="flex flex-col items-center">
      {isLoading && <LoadingSpinner />}
      {templateInfo.length === 0 && !isLoading && (
        <div className="flex flex-col items-center">
          <p className="mt-20 text-xl font-semibold text-blue-text mb-3">
            No previous history found
          </p>
          <p className="text-xl font-semibold text-blue-text">
            {" "}
            Click on the button below to start extracting your invoices
          </p>
          <button
            onClick={() => navigate("/file-upload")}
            className="mt-10 bg-blue-text hover:bg-blue-medium px-3 py-2 cursor-pointer text-center text-white rounded-sm shadow-xl"
          >
            Extract Invoice
          </button>
        </div>
      )}
      {templateInfo.length > 0 && !isLoading && templateInfo && (
        <div className="grid grid-cols-4 gap-20 mt-20">
          {templateInfo.map((template) => (
            <div
              key={template._id}
              className="px-5 py-8  w-52 rounded-md flex flex-col items-center cursor-pointer transform transition-all duration-300 ease-in-out hover:scale-110 shadow-xl"
            >
              <img
                src={template.url.slice(0, -3) + "jpg"}
                alt=""
                className="h-40 w-40 border shadow-md"
              />
              <div className="flex flex-col space-y-2 mt-5">
                <div className="flex items-center space-x-2 text-sm">
                  <p className="text-gray-400">File Type:</p>
                  <p className="text-blue-text font-light">
                    {template.filetype}
                  </p>
                </div>
                <div className="flex items-center space-x-2 text-sm">
                  <p className="text-gray-400">Template Id:</p>
                  <p className="text-blue-text font-light">
                    {template.templateID}
                  </p>
                </div>
                <div className="flex items-center space-x-2 text-sm">
                  <p className="text-gray-400">Time:</p>
                  <p className="text-blue-text font-light">
                    {template.timestamp.slice(0, 10)}
                  </p>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default UserHistory;
