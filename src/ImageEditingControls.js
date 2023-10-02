import React, { useState } from "react";
import { fabric } from "fabric";
const ImageEditingControls = ({ image, canvas, setEditedImageDataUrl }) => {
  const [rotationAngle, setRotationAngle] = useState(0);
  const [isGrayscale, setIsGrayscale] = useState(false);
  const [newText, setNewText] = useState("");
  const [textColor, setTextColor] = useState("black");
  const [fontSize, setFontSize] = useState(24);
  const [logos, setLogos] = useState([]);
  const [overlayTexts, setOverlayTexts] = useState([]);

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
                top: 50
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

  const rotateImage = () => {
    if (image) {
      const newRotationAngle = (rotationAngle + 45) % 360;
      setRotationAngle(newRotationAngle);
      image.set({ angle: newRotationAngle });
      canvas.renderAll();
      updateEditedImage();
    }
  };

  const addOverlayText = () => {
    if (image) {
      const newTextObj = new fabric.Textbox(newText, {
        left: 100, // Customize the position
        top: 100,
        fill: textColor, // Customize the text color
        fontSize // Customize the font size
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
      quality: 1
    });
    setEditedImageDataUrl(editedImageDataURL);
  };
  return (
    <div>
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
};

export default ImageEditingControls;
