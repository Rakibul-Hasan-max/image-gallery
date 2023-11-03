"use client";
import { useState } from "react";
import { Images } from "../data/data";
import icon from "../../public/images/add-icon.png";

const Gallery = () => {
  // selected image store
  const [selectedImages, setSelectedImages] = useState([]);

  // image data store
  const [images, setImages] = useState(Images);
  const [draggedImage, setDraggedImage] = useState(null);

  // after click a image the data will be save  setSelectedImages
  const handleImageClick = (imageId) => {
    if (selectedImages.includes(imageId)) {
      setSelectedImages(selectedImages.filter((id) => id !== imageId));
    } else {
      setSelectedImages([...selectedImages, imageId]);
    }
  };

  const handleDragStart = (e, image) => {
    e.dataTransfer.setData("imageId", image._id);
    setDraggedImage(image);
  };

  const handleDragOver = (e) => {
    e.preventDefault();
  };

  const handleDrop = (e, targetImage) => {
    e.preventDefault();
    const sourceImageId = e.dataTransfer.getData("imageId");
    const updatedImages = images.slice();
    const sourceIndex = images.findIndex(
      (image) => image._id === sourceImageId
    );
    const targetIndex = images.findIndex(
      (image) => image._id === targetImage._id
    );

    updatedImages.splice(sourceIndex, 1);
    updatedImages.splice(targetIndex, 0, draggedImage);

    setImages(updatedImages);
    setDraggedImage(null);
  };

  const handleDelete = (e) => {
    e.preventDefault();
    const deleteItemFilter = images.filter(
      (image) => !selectedImages.includes(image._id)
    );
    setImages(deleteItemFilter);
    setSelectedImages([]);
  };

  return (
    <div className="gallery-main ">
      {/* gallery header */}

      {selectedImages.length === 0 ? (
        <p className="text-xl font-bold p-5">Gallery</p>
      ) : (
        <div className="flex justify-between p-5">
          <div className="flex justify-center items-center">
            <input className="w-4 h-4 " type="checkbox" checked />
            <p className="pl-2 text-xl font-bold">
              {selectedImages.length} FIles Selected
            </p>
          </div>
          <div className="pr-23">
            <button onClick={handleDelete} className="text-[red]">
              Delete File
            </button>
          </div>
        </div>
      )}

      <hr className="mb-5" />

      {/* gallery body  */}

      <div className="gallery-body pb-5 px-5">
        {images.map((image) => (
          <div
            className="gallery-item bg-black"
            key={image._id}
            onDragOver={handleDragOver}
            onDrop={(e) => handleDrop(e, image)}
          >
            <img
              onClick={() => handleImageClick(image._id)}
              src={image.image}
              className={` hover:opacity-[0.5]   duration-300 bg-white`}
              alt={`Image ${image._id}`}
              draggable="true"
              onDragStart={(e) => handleDragStart(e, image)}
            />
            {selectedImages.includes(image._id) && (
              <div
                onClick={() => handleImageClick(image._id)}
                className={` image-checkbox w-full h-full bg-black opacity-[0.2]`}
              >
                <input className="w-5 h-5" type="checkbox" checked />
              </div>
            )}
          </div>
        ))}
        <div className="flex flex-col justify-center items-center  min-w-[180px] min-h-[180px]">
          <img
            style={{ width: "30px", height: "30px" }}
            src={icon}
            alt="Icon"
          />
          <p>Add Image</p>
        </div>
      </div>
    </div>
  );
};

export default Gallery;
