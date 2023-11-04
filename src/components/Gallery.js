"use client";
import { useState } from "react";
import { Images } from "../data/data";
import AddImage from "./AddImage";

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
        <p className="text-xl font-bold py-5">Gallery</p>
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

      <div onDragOver={handleDragOver} className="gallery-body ">
        {images?.map((image) => (
          <div
            className="gallery-item relative"
            key={image._id}
            onDrop={(e) => handleDrop(e, image)}
          >
            <div
              className="w-full h-full"
              draggable="true"
              onDragStart={(e) => handleDragStart(e, image)}
            >
              <img
                src={image.image}
                className={` hover:opacity-[0.5] w-full h-full rounded duration-300 bg-white`}
                alt={`Image ${image._id}`}
              />

              <div className="absolute w-full  h-full bg-black top-0 left-0 opacity-0  hover:opacity-50 duration-300 cursor-move">
                <input
                  checked={false}
                  readOnly
                  onClick={() => handleImageClick(image._id)}
                  className="h-5 w-5 ml-5 mt-5 cursor-pointer"
                  type="checkbox"
                  name="checkbox"
                  id={image._id}
                />
              </div>
            </div>
            {selectedImages.includes(image._id) && (
              <div
                className={` absolute w-full h-full bg-black top-0 left-0 opacity-30 cursor-auto`}
              >
                <input
                  id={image._id}
                  defaultChecked
                  onClick={() => handleImageClick(image._id)}
                  className="h-5 w-5 ml-5 mt-5 cursor-pointer"
                  type="checkbox"
                  name="checkbox2"
                />
              </div>
            )}
          </div>
        ))}
        <AddImage setImages={setImages} images={images} />
      </div>
    </div>
  );
};

export default Gallery;
