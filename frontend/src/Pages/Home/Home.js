import React, { useEffect, useRef } from "react";
import ConvertFile from "../../images/convert-file.png";
import RightArrow from "../../SVG/right-arrow";
import { useNavigate } from "react-router-dom";
import HomePage from "../../images/home.png";
import Neha from "../../images/Neha.png";
import Card from "../../components/Card/Card";
import Aaditya from "../../images/Aaditya.jpeg";
import Nirali from "../../images/Nirali.png";
import Shubham from "../../images/Shubham.jpeg";
import Aditya from "../../images/Aditya.png";

const Home = () => {
  const navigate = useNavigate();
  const scrollToRef = (ref) =>
    //console.log(ref.current.offsetTop)
    window.scrollTo({ top: 660, behavior: "smooth" });

  useEffect(() => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  }, []);

  const myRef = useRef(null);
  const executeScroll = () => scrollToRef(myRef);

  return (
    <div className="bg-white max-w-screen scroll-smooth">
      <div className="w-full h-screen flex justify-around">
        <div className="mt-40" style={{ width: "45%" }}>
          <h1 className="text-4xl font-semibold">
            PDF Automation - OCR Text Recognition
          </h1>
          <p className="text-xl mt-7 leading-9 font-semibold text-gray-800">
            Upload your scanned documnets, identify the data items you want to
            extract and your extracted data is ready to be downloaded as files.
          </p>
          <div className="flex items-center space-x-10">
            <div
              onClick={() => navigate("/signup")}
              className="w-32 mt-10 shadow-lg bg-blue-text hover:bg-blue-medium text-white cursor-pointer py-3 px-3 rounded-md  leading-4 font-bold focus:outline-none"
            >
              <button className="font-semibold flex items-center">
                <span className="mr-0.5">Get Started</span>
                <RightArrow />
              </button>
            </div>
            <div
              onClick={executeScroll}
              className="w-40 mt-10 shadow-lg border hover:text-blue-medium border-blue-text hover:border-blue-dark text-blue-text cursor-pointer py-3 px-3 rounded-md  leading-4 font-bold focus:outline-none"
            >
              <button className="font-semibold flex items-center">
                <span className="mr-0.5">Start Extracting</span>
                <RightArrow />
              </button>
            </div>
          </div>
        </div>
        <div className="mt-10">
          <img src={HomePage} alt="" />
        </div>
      </div>
      <div
        ref={myRef}
        style={{ height: "35rem" }}
        className="bg-blue-text max-w-screen flex items-center justify-center"
      >
        <div className="flex flex-col items-center">
          <div>
            <img src={ConvertFile} alt="" className="h-50 w-65" />
          </div>
          <div
            onClick={() => navigate("/file-upload")}
            className="shadow-lg bg-white cursor-pointer py-3 px-3 border border-gray-300 rounded-md  leading-4 font-bold text-gray-700 hover:text-green-500 hover:border-green-300 focus:outline-none focus:border-green-300 focus:shadow-outline-green active:bg-gray-50 active:text-green-800"
          >
            <button className="font-semibold flex items-center">
              <span className="mr-0.5">Extract Invoice</span>
              <RightArrow />
            </button>
          </div>
        </div>
      </div>
      <div className="bg-white max-w-screen h-screen text-center">
        <h1 className="mt-20 px-16 text-4xl font-semibold">
          The Team Invictus
        </h1>
        <div className="flex items-center space-x-10 px-16 mt-20">
          <Card
            src={Nirali}
            title="Nirali Sahoo"
            github="https://github.com/nizz009"
            linkedin="https://www.linkedin.com/in/niralisahoo/"
          />
          <Card
            src={Neha}
            title="Neha Jha"
            github="https://github.com/nayyhah"
            linkedin="https://www.linkedin.com/in/nayyhah/"
          />
          <Card
            src={Aaditya}
            title="Aaditya Agrawal"
            github="https://github.com/Codemonk-adi"
            linkedin="https://www.linkedin.com/in/aaditya-agrawal-2448b01a3"
          />
          <Card
            src={Shubham}
            title="Shubham Pendharkar"
            github="https://github.com/shakspen"
            linkedin="https://www.linkedin.com/in/shubham-pendharkar-66673b1a0/"
          />
          <Card
            src={Aditya}
            title="Aditya Agarwal"
            github="https://github.com/AdityaAgarwaal"
            linkedin="https://www.linkedin.com/in/aditya-agarwal-8b9a771a0/"
          />
        </div>
      </div>
    </div>
  );
};

export default Home;
