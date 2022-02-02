import React, { useContext, useEffect, useState } from "react";
import DragNDrop from "../../components/DragNDrop/DragNDrop";
import FileUploader from "../../components/FileUploader/FileUploader";
import FilePreview from "../../components/FileUploader/FilePreview/FilePreview";
import Preview from "../../SVG/preview";
//import Select from "../../components/Select/Select";
//import TemplatePreview from "../../components/TemplatePreview/TemplatePreview";
import Documents from "../../images/documents.png";
import InputForm from "../../components/InputForm/InputForm";
import SelectTemplate from "../../components/SelectTemplate/SelectTemplate";
import axios from "../../helpers/axios";
import { AuthContext } from "../../Context/auth-context";

const FileUpload = () => {
  const [filePreview, setFilePreview] = useState(false);
  const [invoiceOptionsPreview, setInvoiceOptionsPreview] = useState(false);
  const [templatePreview, setTemplatePreview] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [parsedData, setParsedData] = useState([]);
  const [radioOption, setRadioOption] = useState({ id: null });

  const auth = useContext(AuthContext);
  //console.log("isLoggedIn", auth.isLoggedIn);

  const [files, setFiles] = useState([]);

  const fileDeleteHandler = (selectedFile) => {
    setFiles(files.filter((file) => file !== selectedFile));
  };

  useEffect(() => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  }, []);

  const formData = new FormData();
  if (files.length > 0) {
    for (let i = 0; i < files.length; i++) {
      formData.append("invoices", files[i]);
    }
    formData.append("templateid", radioOption.id);
  }

  const uploadFilesAPI = async () => {
    try {
      setIsLoading(true);
      const response = await axios.post(
        // `https://invictus-decipher.herokuapp.com/admin/parse`,
        auth.isLoggedIn
          ? "https://invictus-backend-dell.herokuapp.com/admin/parse"
          : "https://invictus-backend-dell.herokuapp.com/admin/noparse",
        formData
      );
      //console.log("Response", response);
      if (response.statusText === "OK") {
        setTemplatePreview(false);
        setInvoiceOptionsPreview(true);
        setParsedData([{ ...response.data }]);
      }
      // setMessage({
      //   heading: "Success!",
      //   text: `Congraulations! Your file/files have been successfully uploaded to your dashboard.`,
      // });
      setIsLoading(false);
      // setIsModalOpen(true);
      setFiles([]);
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

  return (
    <div className="bg-white max-w-screen px-20 py-28 relative">
      <div className="flex flex-col items-center mb-20">
        <div className="flex items-center space-x-3">
          <img src={Documents} alt="" className="h-7 w-7" />
          <h1 className="text-2xl font-medium">
            PDF Automation - OCR Text Recognition
          </h1>
        </div>
        <p className="ml-5 mt-2 text-xl text-gray-700 font-light">
          Magically extract the data items you want from PDF and Image
        </p>
      </div>
      <div className="bg-blue-medium max-w-screen flex items-center justify-center p-10">
        <div className="bg-blue-text flex flex-col items-center w-full py-8 border-dashed border-2 border-gray-100">
          <DragNDrop files={files} setFiles={setFiles} />
          <FileUploader files={files} setFiles={setFiles} />
          <div>
            {files.length > 0 && (
              <button
                onClick={() => setFilePreview(true)}
                className="flex items-center space-x-0.5 bg-yellow-medium hover:bg-yellow-light mt-2 px-3 py-1 rounded-sm text-sm text-center text-white shadow-lg"
              >
                <Preview className="h-4 w-4" />
                <span>Preview</span>
              </button>
            )}
          </div>
        </div>
      </div>
      <div className="flex items-center my-20">
        <div className="flex flex-col items-center text-center py-10 px-20">
          <img
            src="https://smallpdf.com/build/8b02cac98bc7cc849c266791632d6bd5.svg"
            alt=""
          />
          <div>
            <h1 className="my-3 font-semibold">Quick and easy conversion</h1>
            <p className="text-gray-700">
              With just a simple drag-and-drop, you can extract data items from
              PDF and Images within seconds. There’s no file size limit nor even
              the need to register to use our service.
            </p>
          </div>
        </div>

        <div className="flex flex-col items-center text-center py-10 px-20">
          <img
            src="https://smallpdf.com/build/5a860ad2cdc0d004838ca10b7447eb2d.svg"
            alt=""
          />
          <div>
            <h1 className="my-3 font-semibold">We keep your files safe!</h1>
            <p className="text-gray-700">
              We care about privacy. All files will be deleted from our servers
              forever after one hour. To know more about how much we care, read
              our privacy policy.
            </p>
          </div>
        </div>

        <div className="flex flex-col items-center text-center py-10 px-20">
          <img
            src="https://smallpdf.com/build/f02313a77b016e7301b40be45c03f589.svg"
            alt=""
          />
          <div>
            <h1 className="my-3 font-semibold">All platforms are welcome!</h1>
            <p className="text-gray-700">
              Our PDF Automation - OCR Text Recognition works on all computers -
              no matter if you use Mac, Windows or Linux.
            </p>
          </div>
        </div>
      </div>
      {filePreview && (
        <FilePreview
          setFilePreview={setFilePreview}
          files={files}
          fileDeleteHandler={fileDeleteHandler}
          setInvoiceOptionsPreview={setInvoiceOptionsPreview}
          setTemplatePreview={setTemplatePreview}
        />
      )}

      {templatePreview && !filePreview && (
        <SelectTemplate
          setInvoiceOptionsPreview={setInvoiceOptionsPreview}
          setFilePreview={setFilePreview}
          setTemplatePreview={setTemplatePreview}
          files={files}
          setFiles={setFiles}
          uploadFilesAPI={uploadFilesAPI}
          isLoading={isLoading}
          radioOption={radioOption}
          setRadioOption={setRadioOption}
        />
      )}
      {invoiceOptionsPreview && !templatePreview && (
        <InputForm
          setInvoiceOptionsPreview={setInvoiceOptionsPreview}
          setFilePreview={setFilePreview}
          setTemplatePreview={setTemplatePreview}
          parsedData={parsedData}
        />
      )}
      {/* {templatePreview && (
        <TemplatePreview
          setInvoiceOptionsPreview={setInvoiceOptionsPreview}
          setFilePreview={setFilePreview}
          setTemplatePreview={setTemplatePreview}
        />
      )} */}
    </div>
  );
};

export default FileUpload;
