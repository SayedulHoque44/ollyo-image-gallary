import React, { useState } from "react";
import { ImCheckboxChecked } from "react-icons/im";
import image1 from "../assets/images/image-1.webp";
import image2 from "../assets/images/image-2.webp";
import image3 from "../assets/images/image-3.webp";
import image4 from "../assets/images/image-4.webp";
import image5 from "../assets/images/image-5.webp";
import image6 from "../assets/images/image-6.webp";
import image7 from "../assets/images/image-7.webp";
import Container from "../components/Container";
const ImageGallary = () => {
  const [images, setImages] = useState([
    { id: 1, src: image1, isFeatured: true },
    { id: 2, src: image2, isFeatured: false },
    { id: 3, src: image3, isFeatured: false },
    { id: 4, src: image4, isFeatured: false },
    { id: 5, src: image5, isFeatured: false },
    { id: 6, src: image6, isFeatured: false },
    { id: 7, src: image7, isFeatured: false },
    // Add more images here
  ]);
  const [selectedImages, setSelectedImages] = useState([]);
  const [draggedImage, setDraggedImage] = useState(null);
  const [selectedImgesId, setSelectedImagesId] = useState([]);
  //
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
  //
  const handleDeleteImages = () => {
    const updatedImages = images.filter(
      (image) => !selectedImages.includes(image.id)
    );
    setImages(updatedImages);
    setSelectedImages([]);
  };
  //
  const handleDragStart = (e, image) => {
    setDraggedImage(image);
  };

  const handleDragOver = (e) => {
    e.preventDefault();
  };
  //
  const handleDrop = (e, targetImage) => {
    if (draggedImage) {
      const updatedImages = [...images];
      const draggedIndex = images.findIndex(
        (image) => image.id === draggedImage.id
      );
      const targetIndex = images.findIndex(
        (image) => image.id === targetImage.id
      );

      [updatedImages[draggedIndex], updatedImages[targetIndex]] = [
        updatedImages[targetIndex],
        updatedImages[draggedIndex],
      ];

      setImages(updatedImages);
      setDraggedImage(null);
    }
  };
  //
  const handleChecked = (e, selectedImgId) => {
    const currentSelectedImagesId = [...selectedImgesId];
    if (e.target.checked) {
      currentSelectedImagesId.push(selectedImgId);
      setSelectedImagesId(currentSelectedImagesId);
    } else {
      const updateSelectedImagesId = currentSelectedImagesId.filter(
        (id) => id !== selectedImgId
      );
      setSelectedImagesId(updateSelectedImagesId);
    }
  };
  //

  const isCheked = (imageId) => {
    let checked = false;
    for (const id of selectedImgesId) {
      if (id === imageId) {
        checked = true;
        break;
      }
    }

    return checked;
  };

  //
  // console.log(selectedImgesId);
  return (
    <Container>
      <div className="shadow-lg border-2 border-gray-100 p-5">
        {selectedImgesId.length > 0 && (
          <div className="flex justify-between items-center">
            <div className="flex gap-3 items-center">
              <ImCheckboxChecked size={24} color="blue" />
              <p className="text-2xl font-semibold">
                {selectedImgesId.length} selected
              </p>
            </div>

            <button
              onClick={handleDeleteImages}
              disabled={selectedImages.length === 0}
              className=" bg-red-500 text-white px-4 py-2 rounded hover:bg-red-600">
              Delete Selected Images
            </button>
          </div>
        )}

        <div className="grid grid-cols-1 md:grid-cols-3 xl:grid-cols-4  gap-4  m-2 p-3 ">
          {images.map((image) => (
            <div
              key={image.id}
              className={`border p-2 group/item shadow-sm relative ${
                image.isFeatured ? "lg:col-span-2 row-span-2" : ""
              }`}
              draggable
              onDragStart={(e) => handleDragStart(e, image)}
              onDragOver={handleDragOver}
              onDrop={(e) => handleDrop(e, image)}>
              <picture>
                <div
                  className={`absolute ${
                    isCheked(image.id)
                      ? "opacity-1 bg-white/60"
                      : "group-hover/item:opacity-100 opacity-0 bg-black/25"
                  }  ease-in-out duration-300   top-0 bottom-0 right-0 left-0 `}>
                  <input
                    type="checkbox"
                    onChange={(e) => handleChecked(e, image.id)}
                    name="select"
                    id="select"
                    className="m-3"
                  />
                </div>

                <source srcSet={image.src} type="image/webp" />
                <img
                  src={image.src.replace(".webp", ".jpg")} // Provide a fallback image format (e.g., JPEG)
                  alt={`Image ${image.id}`}
                  className={`w-full ${
                    selectedImages.includes(image.id)
                      ? "border-4 border-blue-500"
                      : ""
                  }`}
                />
              </picture>
              <div
                className="bg-blue-500 text-white p-2 text-center cursor-pointer"
                onClick={() => handleFeatureImage(image.id)}>
                Set as Feature
              </div>
            </div>
          ))}
        </div>
      </div>
    </Container>
  );
};

export default ImageGallary;
