import React, { useState } from "react";
import { fabric } from "fabric";
export function ImageUpload({
  imageInputRef,
  canvas,
  setImage,
  editedImageDataUrl
}) {
  const [imageUrl, setImageUrl] = useState("");

  const loadImageFromUrl = () => {
    if (imageUrl) {
      const img = new Image();
      img.crossOrigin = "Anonymous"; // Allow cross-origin loading
      img.src = imageUrl;
      img.onload = () => {
        const fabricImage = new fabric.Image(img);
        fabricImage.set({
          left: 200,
          top: 200,
          scaleX: 0.5,
          scaleY: 0.5
        });
        canvas.add(fabricImage);
        setImage(fabricImage);
      };
    }
  };

  const handleImageUpload = (e) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (event) => {
        const img = new Image();
        img.src = event.target.result;
        img.onload = () => {
          const fabricImage = new fabric.Image(img);
          fabricImage.set({
            left: 0,
            top: 0,
            scaleX: 0.5,
            scaleY: 0.5
          });
          canvas.add(fabricImage);
          setImage(fabricImage);
        };
      };
      reader.readAsDataURL(file);
    } else if (imageUrl) {
      loadImageFromUrl();
    }
  };
  const downloadEditedImage = () => {
    if (editedImageDataUrl) {
      const a = document.createElement("a");
      a.href = editedImageDataUrl;
      a.download = "edited_image.png"; // Customize the filename
      a.click();
    }
  };
  return (
    <div>
      <input
        type="file"
        accept="image/*"
        onChange={handleImageUpload}
        ref={imageInputRef}
        className="mb-4 p-2 border border-gray-300 rounded shadow-md "
      />
      <input
        type="url"
        placeholder="Image URL"
        value={imageUrl}
        onChange={(e) => setImageUrl(e.target.value)}
        className="m-4 p-2 border border-gray-300 rounded shadow-md"
      />
      <button
        onClick={loadImageFromUrl}
        className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded  m-2"
      >
        Load from URL
      </button>

      <button
        onClick={downloadEditedImage}
        className="bg-indigo-500 hover:bg-indigo-700 text-white font-bold py-2 px-4 rounded m-2"
      >
        Download Edited Image
      </button>
    </div>
  );
}
