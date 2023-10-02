import React, { useState, useRef } from "react";
import { fabric } from "fabric";
import "./index.css";

function App() {
  const [canvas, setCanvas] = useState(null);
  const [image, setImage] = useState(null);
  const [rotationAngle, setRotationAngle] = useState(0);
  const [isGrayscale, setIsGrayscale] = useState(false);
  const [logos, setLogos] = useState([]);
  const [overlayTexts, setOverlayTexts] = useState([]);
  const [newText, setNewText] = useState("");
  const [textColor, setTextColor] = useState("black");
  const [fontSize, setFontSize] = useState(24);
  const [editedImageDataUrl, setEditedImageDataUrl] = useState(null);
  const [imageUrl, setImageUrl] = useState("");
  const imageInputRef = useRef(null);

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
            scaleY: 0.5,
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

  const loadImageFromUrl = () => {
    if (imageUrl) {
      const img = new Image();
      img.crossOrigin = "Anonymous"; // Allow cross-origin loading
      img.src = imageUrl;
      img.onload = () => {
        const fabricImage = new fabric.Image(img);
        fabricImage.set({
          left: 0,
          top: 0,
          scaleX: 0.5,
          scaleY: 0.5,
        });
        canvas.add(fabricImage);
        setImage(fabricImage);
      };
    }
  };

  const rotateImage = () => {
    if (image) {
      const newRotationAngle = (rotationAngle + 90) % 360;
      setRotationAngle(newRotationAngle);
      image.set({ angle: newRotationAngle });
      canvas.renderAll();
      updateEditedImage();
    }
  };

  const toggleGrayscale = () => {
    if (image) {
      const newIsGrayscale = !isGrayscale;
      setIsGrayscale(newIsGrayscale);

      if (newIsGrayscale) {
        image.filters.push(new fabric.Image.filters.Grayscale());
      } else {
        image.filters = [];
      }

      image.applyFilters();
      canvas.renderAll();
      updateEditedImage();
    }
  };

  const addLogo = () => {
    if (image) {
      const logoInput = document.createElement("input");
      logoInput.type = "file";
      logoInput.accept = "image/*";
      logoInput.onchange = (e) => {
        const logoFile = e.target.files[0];
        if (logoFile) {
          const reader = new FileReader();
          reader.onload = (event) => {
            const logoImage = new Image();
            logoImage.src = event.target.result;
            logoImage.onload = () => {
              const fabricLogo = new fabric.Image(logoImage);
              fabricLogo.set({
                left: 50, // Customize the position
                top: 50,
              });
              canvas.add(fabricLogo);
              setLogos([...logos, fabricLogo]);
              updateEditedImage();
            };
          };
          reader.readAsDataURL(logoFile);
        }
      };
      logoInput.click();
    }
  };

  const addOverlayText = () => {
    if (image) {
      const newTextObj = new fabric.Textbox(newText, {
        left: 100, // Customize the position
        top: 100,
        fill: textColor, // Customize the text color
        fontSize, // Customize the font size
      });
      canvas.add(newTextObj);
      setOverlayTexts([...overlayTexts, newTextObj]);
      setNewText(""); // Clear the input field
      updateEditedImage();
    }
  };

  const updateEditedImage = () => {
    const editedImageDataURL = canvas.toDataURL({
      format: "png",
      quality: 1,
    });
    setEditedImageDataUrl(editedImageDataURL);
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
    <div className="bg-gray">
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
        onClick={rotateImage}
        className="bg-green-500 hover:bg-green-700 text-white font-bold py-2 px-4 rounded  m-2"
      >
        Rotate Image
      </button>
      <button
        onClick={toggleGrayscale}
        className="bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded  m-2"
      >
        {isGrayscale ? "Remove Grayscale" : "Apply Grayscale"}
      </button>
      <button
        onClick={addLogo}
        className="bg-yellow-500 hover:bg-yellow-700 text-white font-bold py-2 px-4 rounded"
      >
        Add Logo
      </button>
      <input
        type="text"
        placeholder="Text"
        value={newText}
        onChange={(e) => setNewText(e.target.value)}
        className="m-4 p-2 border border-gray-300 rounded shadow-md "
      />
      <input
        type="color"
        value={textColor}
        onChange={(e) => setTextColor(e.target.value)}
        className="m-4 p-1 w-10 border border-gray rounded shadow-md"
      />
      <input
        type="number"
        placeholder="Font Size"
        value={fontSize}
        onChange={(e) => setFontSize(e.target.value)}
        className="mb-4 p-2 border border-gray-300 rounded shadow-md"
      />
      <button
        onClick={addOverlayText}
        className="bg-purple-500 hover:bg-purple-700 text-white font-bold py-2 px-4 rounded  m-2"
      >
        Add Overlay Text
      </button>
      <button
        onClick={downloadEditedImage}
        className="bg-indigo-500 hover:bg-indigo-700 text-white font-bold py-2 px-4 rounded m-2"
      >
        Download Edited Image
      </button>
      <canvas
        ref={(c) => {
          if (c && !canvas) {
            const newCanvas = new fabric.Canvas(c);
            setCanvas(newCanvas);
          }
        }}
        width={400}
        height={400}
      ></canvas>
      <div>
        {overlayTexts.map((text, index) => (
          <div key={index}>
            <input
              type="text"
              value={text.text}
              onChange={(e) => {
                text.set({ text: e.target.value });
                canvas.renderAll();
                updateEditedImage();
              }}
            />
            <input
              type="color"
              value={text.fill}
              onChange={(e) => {
                text.set({ fill: e.target.value });
                canvas.renderAll();
                updateEditedImage();
              }}
            />
            <input
              type="number"
              value={text.fontSize}
              onChange={(e) => {
                text.set({ fontSize: parseInt(e.target.value, 10) });
                canvas.renderAll();
                updateEditedImage();
              }}
            />
          </div>
        ))}
      </div>
    </div>
  );
}

export default App;
