// CanvasControls.js
import React from "react";

function CanvasControls({ rotateImage, toggleGrayscale, addLogo }) {
  return (
    <div>
      <button
        onClick={rotateImage}
        className="bg-green-500 hover:bg-green-700 text-white font-bold py-2 px-4 rounded m-2"
      >
        Rotate Image
      </button>
      <button
        onClick={toggleGrayscale}
        className="bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded m-2"
      >
        Apply Grayscale
      </button>
      <button
        onClick={addLogo}
        className="bg-yellow-500 hover:bg-yellow-700 text-white font-bold py-2 px-4 rounded m-2"
      >
        Add Logo
      </button>
    </div>
  );
}

export default CanvasControls;
