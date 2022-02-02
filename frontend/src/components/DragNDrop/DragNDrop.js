import React, { useCallback, useEffect, useRef } from "react";
import DragDrop from "../../SVG/drag-drop";

const DrapNDrop = ({ files, setFiles }) => {
  const dropAreaRef = useRef();

  function preventDefaults(e) {
    e.preventDefault();
    e.stopPropagation();
  }

  const handleDrop = useCallback(
    (e) => {
      let dt = e.dataTransfer;
      let files = dt.files;
      setFiles([files[0]]);
    },
    [setFiles]
  );

  useEffect(() => {
    const dropAreaRefElement = dropAreaRef.current;
    ["dragenter", "dragover", "dragleave", "drop"].forEach((eventName) => {
      dropAreaRefElement.addEventListener(eventName, preventDefaults, false);
      document.body.addEventListener(eventName, preventDefaults, false);
    });
    ["dragenter", "dragover"].forEach((eventName) => {
      dropAreaRefElement.addEventListener(
        eventName,
        () => {
          dropAreaRefElement.classList.add("highlight");
        },
        false
      );
    });
    ["dragleave", "drop"].forEach((eventName) => {
      dropAreaRefElement.addEventListener(
        eventName,
        () => {
          dropAreaRefElement.classList.remove("highlight");
        },
        false
      );
    });
    dropAreaRefElement.addEventListener("drop", handleDrop, false);
    return () => {
      try {
        dropAreaRefElement.removeEventListener("drop", handleDrop, false);
      } catch (err) {
        console.log("component Unmounted/Not present");
      }
    };
  }, [handleDrop]);

  //console.log("files from darg and drop", files);

  return (
    <div
      ref={dropAreaRef}
      className="bg-transparent w-full pt-10 pb-5 flex flex-col items-center space-y-3 text-white text-lg"
    >
      <DragDrop />
      <p>Drag and Drop your files here</p>
    </div>
  );
};

export default DrapNDrop;
