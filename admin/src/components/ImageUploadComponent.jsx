import React from "react";
import { IconUpload, IconX } from "@tabler/icons-react";
import Loading from "../components/Loading";

const ImageUploadComponent = ({
  file,
  setFile,
  isUploading,
  uploadedImage,
  setUploadedImage,
  theme,
}) => {
  const handleFileChange = (e) => {
    setFile(e.target.files[0]);
  };

  const handleRemoveImage = () => {
    setFile(null);
    setUploadedImage(null);
  };

  const bgClass = theme === "dark" ? "bg-transparent" : "bg-transparent ring-2";
  const borderClass = theme === "dark" ? "border-gray-600" : "border-gray-300";
  const textClass = theme === "dark" ? "text-gray-800" : "text-gay-800";
  const textGray = theme === "dark" ? "text-gray-200" : "text-gray-700";

  return (
    <div className={`max-w-fit mx-auto ${bgClass} shadow-md rounded-lg overflow-hidden mt-2 mb-2`}>
      <div className="p-1 relative">
        <div className="flex items-center justify-between">
          <label className="flex items-center text-gray-600 relative">
            <input
              type="file"
              onChange={handleFileChange}
              className="hidden"
              data-max-size="5120"
              accept=".jpg, .png, .jpeg, .webp, .avif"
            />
            <span className={`rounded-md  ring-1 ring-blue-500  ${borderClass} p-1 cursor-pointer`}>
              <IconUpload size={24} strokeWidth={1.5} />
            </span>
            <span className={`ml-2 ${textClass}`}>Choose Image</span>
          </label>
          {isUploading && (
            <div className={`absolute top-0 right-0 -mt-2 -mr-2 ${textGray}`}>
              <Loading />
            </div>
          )}
        </div>
        {uploadedImage && (
          <div className="mt-4 relative">
            <button
              onClick={handleRemoveImage}
              className="absolute top-0 right-0 m-2 p-1 bg-gray-200 rounded-full hover:bg-gray-300 focus:outline-none"
            >
              <IconX size={20} strokeWidth={1.5} />
            </button>
            <img
              src={uploadedImage}
              alt="Uploaded"
              className="w-full h-auto rounded-md"
            />
          </div>
        )}
      </div>
    </div>
  );
};

export default ImageUploadComponent;
