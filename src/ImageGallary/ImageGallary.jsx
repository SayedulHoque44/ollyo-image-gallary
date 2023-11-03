import React, { useState } from "react";
import { ImCheckboxChecked } from "react-icons/im";
import image1 from "../assets/images/image-1.webp";
import image10 from "../assets/images/image-10.jpeg";
import image11 from "../assets/images/image-11.jpeg";
import image2 from "../assets/images/image-2.webp";
import image3 from "../assets/images/image-3.webp";
import image4 from "../assets/images/image-4.webp";
import image5 from "../assets/images/image-5.webp";
import image6 from "../assets/images/image-6.webp";
import image7 from "../assets/images/image-7.webp";
import image8 from "../assets/images/image-8.webp";
import image9 from "../assets/images/image-9.webp";
import Container from "../components/Container";
import SingleImage from "./SingleImage/SingleImage";
const ImageGallary = () => {
  // State
  const [images, setImages] = useState([
    { id: 1, src: image1, isFeatured: true },
    { id: 2, src: image2, isFeatured: false },
    { id: 3, src: image3, isFeatured: false },
    { id: 4, src: image4, isFeatured: false },
    { id: 5, src: image5, isFeatured: false },
    { id: 6, src: image6, isFeatured: false },
    { id: 7, src: image7, isFeatured: false },
    { id: 8, src: image8, isFeatured: false },
    { id: 9, src: image9, isFeatured: false },
    { id: 10, src: image10, isFeatured: false },
    { id: 11, src: image11, isFeatured: false },
    // Add more images here
  ]);
  const [selectedImgesId, setSelectedImagesId] = useState([]);
  const [draggedImage, setDraggedImage] = useState(null);

  //Make Image Featured
  const handleFeatureImage = (imageId) => {
    const updatedImages = images.map((image) => {
      if (image.id === imageId) {
        image.isFeatured = true;
      } else {
        image.isFeatured = false;
      }
      return image;
    });
    setImages(updatedImages);
  };
  //Delete Images
  const handleDeleteImages = () => {
    const updatedImages = images.filter(
      (image) => !selectedImgesId.includes(image.id)
    );
    setImages(updatedImages);
    setSelectedImagesId([]);
  };

  // console.log(selectedImgesId);
  return (
    <Container>
      <div className="shadow-lg border-2 border-gray-100 p-5 my-5">
        <div
          className={`flex justify-between ease-in-out duration-300 items-center ${
            selectedImgesId.length > 0 ? "opacity-1" : "opacity-0"
          }`}>
          <div className="flex gap-3 items-center">
            <ImCheckboxChecked size={24} color="blue" />
            <p className="text-2xl font-semibold">
              {selectedImgesId.length}
              {selectedImgesId.length > 1 ? " files" : " file"} selected
            </p>
          </div>

          <button
            onClick={handleDeleteImages}
            className=" bg-red-500 text-white px-4 py-2 rounded hover:bg-red-600">
            Delete {selectedImgesId.length > 1 ? "files" : "file"}
          </button>
        </div>

        {images.length === 0 && (
          <p className="text-xl font-medium text-red-400">No Products Found</p>
        )}
        <div className="grid grid-cols-1 sm:grid-cols-3 md:grid-cols-4 xl:grid-cols-5  gap-4  m-2 p-3 ">
          {images.map((image) => (
            //we can use context provider to ignor the props drilling
            <SingleImage
              key={image.id}
              image={image}
              draggedImage={draggedImage}
              setDraggedImage={setDraggedImage}
              handleFeatureImage={handleFeatureImage}
              setSelectedImagesId={setSelectedImagesId}
              images={images}
              setImages={setImages}
              selectedImgesId={selectedImgesId}
            />
          ))}
        </div>
      </div>
    </Container>
  );
};

export default ImageGallary;
