import React from "react";
import { FaRegImage } from "react-icons/fa";
const AddImage = () => {
  return (
    <div
      className={`border-dashed border-2 p-2 group/item shadow-sm relative cursor-pointer flex items-center justify-center`}>
      <div className="flex flex-col items-center space-y-2">
        <FaRegImage size={30} />
        <h3 className="text-xl font-semibold">Add Image</h3>
      </div>
    </div>
  );
};

export default AddImage;
