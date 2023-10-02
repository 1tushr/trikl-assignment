import React, { useState, useRef } from "react";
import { fabric } from "fabric";
import "./index";
import ImageEditingControls from "./ImageEditingControls";
import { ImageUpload } from "./ImageUploader";
function App() {
  const [canvas, setCanvas] = useState(null);
  const [image, setImage] = useState(null);
  const [editedImageDataUrl, setEditedImageDataUrl] = useState(null);

  const imageInputRef = useRef(null);

  return (
    <div className="bg-gray">
      <ImageUpload
        imageInputRef={imageInputRef}
        canvas={canvas}
        setImage={setImage}
        editedImageDataUrl={editedImageDataUrl}
      />

      <ImageEditingControls
        image={image}
        canvas={canvas}
        setEditedImageDataUrl={setEditedImageDataUrl}
      />

      <canvas
        ref={(c) => {
          if (c && !canvas) {
            const newCanvas = new fabric.Canvas(c);
            setCanvas(newCanvas);
          }
        }}
        width={900}
        height={900}
      ></canvas>
    </div>
  );
}

export default App;
