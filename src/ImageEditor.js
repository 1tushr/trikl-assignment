import React, { useState, useEffect, useRef } from "react";
import { fabric } from "fabric";
import "fabric-customise-controls";

const ImageEditor = () => {
  const [canvas, setCanvas] = useState(null);
  const [imageURL, setImageURL] = useState("");
  const canvasRef = useRef(null); // Ref for the canvas element
  const fileInputRef = useRef(null); // Ref for the file input element
  const [selectedObject, setSelectedObject] = useState(null);

  useEffect(() => {
    const newCanvas = new fabric.Canvas(canvasRef.current, {
      backgroundColor: "white",
      selection: true // Enable object selection
    });
    setCanvas(newCanvas);

    // Listen for object selection changes
    newCanvas.on("selection:created", (e) => {
      setSelectedObject(e.target);
    });
    newCanvas.on("selection:cleared", () => {
      setSelectedObject(null);
    });
  }, []);

  const handleImageURLChange = (e) => {
    setImageURL(e.target.value);
  };

  const handleImageUpload = () => {
    try {
      const img = new Image();
      img.crossOrigin = "Anonymous"; // Set crossorigin attribute to allow cross-origin requests
      img.src = imageURL;

      img.onload = () => {
        const fabricImage = new fabric.Image(img, {
          left: 0,
          top: 0
        });

        canvas.add(fabricImage);
        canvas.renderAll();
      };
    } catch (error) {
      console.error("Error loading the image:", error);
    }
  };

  const handleFileInputChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();

      reader.onload = (e) => {
        const dataUrl = e.target.result;

        fabric.Image.fromURL(dataUrl, (img) => {
          canvas.add(img);
          canvas.renderAll();
        });
      };

      reader.readAsDataURL(file);
    }
  };

  const handleGrayscale = () => {
    if (selectedObject && selectedObject.type === "image") {
      try {
        const filter = new fabric.Image.filters.Grayscale();
        selectedObject.filters.push(filter);
        selectedObject.applyFilters();
        canvas.renderAll();
      } catch (error) {
        console.error("Error applying grayscale:", error);
      }
    }
  };

  const handleRotateClockwise = () => {
    if (selectedObject && selectedObject.type === "image") {
      try {
        selectedObject.angle = (selectedObject.angle + 90) % 360;
        canvas.renderAll();
      } catch (error) {
        console.error("Error rotating image:", error);
      }
    }
  };

  return (
    <div>
      <h1>Image Editor</h1>
      <div>
        <input
          type="text"
          placeholder="Image URL"
          value={imageURL}
          onChange={handleImageURLChange}
        />
        <button onClick={handleImageUpload}>Upload Image</button>
        <button onClick={() => fileInputRef.current.click()}>
          Add Image from Device
        </button>
        <input
          type="file"
          accept="image/*"
          ref={fileInputRef}
          style={{ display: "none" }}
          onChange={handleFileInputChange}
        />
        <button onClick={handleGrayscale}>Grayscale</button>
        <button onClick={handleRotateClockwise}>Rotate Clockwise</button>
      </div>
      <div>
        <canvas
          ref={canvasRef}
          id="editor-canvas"
          width={800}
          height={600}
        ></canvas>
      </div>
    </div>
  );
};

export default ImageEditor;
