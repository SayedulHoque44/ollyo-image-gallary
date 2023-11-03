import React from "react";

const SingleImage = ({
  image,
  setImages,
  images,
  setSelectedImagesId,
  handleFeatureImage,
  selectedImgesId,
  setDraggedImage,
  draggedImage,
}) => {
  // Its call when the image/div drag started
  const handleDragStart = (e, image) => {
    setDraggedImage(image);
  };

  // its for unnessesary event when object draged
  const handleDragOver = (e) => {
    e.preventDefault();
  };

  // Its call when drop the image/div
  const handleDrop = (e, targetImage) => {
    if (draggedImage) {
      const updatedImages = [...images];

      const draggedIndex = images.findIndex(
        (image) => image.id === draggedImage.id
      );

      const targetIndex = images.findIndex(
        (image) => image.id === targetImage.id
      );

      //is target image is feature images
      if (targetImage.isFeatured) {
        updatedImages[draggedIndex].isFeatured = true;
        updatedImages[targetIndex].isFeatured = false;
        [updatedImages[draggedIndex], updatedImages[targetIndex]] = [
          updatedImages[targetIndex],
          updatedImages[draggedIndex],
        ];
        setImages(updatedImages);
        setDraggedImage(null);
        return;
      } else if (updatedImages[draggedIndex].isFeatured) {
        updatedImages[draggedIndex].isFeatured = false;
        updatedImages[targetIndex].isFeatured = true;
        [updatedImages[draggedIndex], updatedImages[targetIndex]] = [
          updatedImages[targetIndex],
          updatedImages[draggedIndex],
        ];
        setImages(updatedImages);
        setDraggedImage(null);
        return;
      } else {
        [updatedImages[draggedIndex], updatedImages[targetIndex]] = [
          updatedImages[targetIndex],
          updatedImages[draggedIndex],
        ];
        setImages(updatedImages);
        setDraggedImage(null);
      }
    }
  };

  // Make image selected
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

  // check is image selected or not
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
  return (
    <div
      key={image.id}
      className={`border p-2 group/item shadow-sm relative cursor-pointer ${
        image.isFeatured ? "sm:col-span-2 row-span-2" : ""
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
              : "group-hover/item:opacity-100 opacity-0 bg-black/50"
          }  ease-in-out duration-300   top-0 bottom-0 right-0 left-0 `}>
          <input
            type="checkbox"
            onChange={(e) => handleChecked(e, image.id)}
            name="select"
            id="select"
            className="m-3 h-5 w-5"
          />
          <div
            className="bg-blue-500 absolute bottom-0 right-0 left-0 text-white p-2 text-center cursor-pointer"
            onClick={() => handleFeatureImage(image.id)}>
            Set as Feature
          </div>
        </div>

        <source srcSet={image.src} type="image/webp" />
        <img
          src={image.src.replace(".webp", ".jpg")} // Provide a fallback image format (e.g., JPEG)
          alt={`Image ${image.id}`}
          className={`w-full`}
        />
      </picture>
    </div>
  );
};

export default SingleImage;
