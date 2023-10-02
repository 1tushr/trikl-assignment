import React, { useEffect, useState } from "react";
import { fabric } from "fabric";

function CanvasComponent({ canvas }) {
  const [editedImageDataUrl, setEditedImageDataUrl] = useState(null);

  useEffect(() => {
    if (canvas) {
      canvas.setWidth(400);
      canvas.setHeight(400);
    }
  }, [canvas]);

  const updateEditedImage = () => {
    const editedImageDataURL = canvas.toDataURL({
      format: "png",
      quality: 1,
    });
    setEditedImageDataUrl(editedImageDataURL);
  };

  return (
    <div>
      <canvas ref={canvas} />
      <button
        onClick={updateEditedImage}
        className="bg-indigo-500 hover:bg-indigo-700 text-white font-bold py-2 px-4 rounded m-2"
      >
        Update Edited Image
      </button>
    </div>
  );
}

export default CanvasComponent;
