import { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "../helpers/axios";

const useAxios = () => {
  const navigate = useNavigate();
  const [response, setResponse] = useState(null);
  const [error, setError] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [message, setMessage] = useState("");

  const MakeAPICall = async (
    url,
    method,
    body = null,
    text = null,
    auth = null,
    redirect = null,
    reLoad = null,
    setFiles = null,
    update = null
  ) => {
    try {
      setIsLoading(true);

      const response = await axios[method](url, body);
      console.log(response);

      setResponse(response);
      setMessage({
        heading: "Success!",
        text: text,
      });
      setIsLoading(false);

      if (text !== null) {
        setIsModalOpen(true);
      }

      if (response && auth !== null && update === true) {
        const token = JSON.parse(localStorage.getItem("userData")).token;
        if (response) {
          auth.updateProfile({ ...response?.data?.user, ...body }, token);
        }
      }

      if (response && auth !== null && update === null) {
        setTimeout(() => {
          if (response) {
            auth.login(response?.data?.user, response?.data?.token);
          }
        }, 2000);
      }
      if (response && redirect === true) {
        setTimeout(() => {
          navigate("/signin");
        }, 2000);
      }
      if (response && reLoad === true) {
        setTimeout(() => {
          window.location.reload();
        }, 3000);
      }

      if (response && setFiles !== null) {
        setFiles([]);
      }
    } catch (err) {
      setIsLoading(true);
      console.log(err);

      setError(err);
      setMessage({
        heading: "Error!",
        text: `${err?.response?.data?.message}`,
      });

      setIsLoading(false);
      setIsModalOpen(true);
    }
  };

  return {
    response,
    error,
    isLoading,
    MakeAPICall,
    isModalOpen,
    message,
    setIsModalOpen,
  };
};

export default useAxios;
