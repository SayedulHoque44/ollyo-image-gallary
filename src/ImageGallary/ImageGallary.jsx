import React, { useState } from "react";
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
  return (
    <Container>
      <div className="grid grid-cols-4  gap-4">
        {images.map((image) => (
          <div
            key={image.id}
            className={`border p-2 ${
              image.isFeatured ? "lg:col-span-2 row-span-2" : ""
            }`}
            draggable
            onDragStart={(e) => handleDragStart(e, image)}
            onDragOver={handleDragOver}
            onDrop={(e) => handleDrop(e, image)}>
            <picture>
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
      <button
        onClick={handleDeleteImages}
        disabled={selectedImages.length === 0}
        className="mt-4 bg-red-500 text-white px-4 py-2 rounded hover:bg-red-600">
        Delete Selected Images
      </button>
    </Container>
  );
};

export default ImageGallary;
