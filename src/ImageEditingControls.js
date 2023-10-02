import React from "react";

const ImageEditingControls = ({
  onGrayscale,
  onInvertColors,
  onRotateClockwise
}) => {
  return (
    <div>
      <h2>Image Editing Controls</h2>
      <button onClick={onGrayscale}>Grayscale</button>
      <button onClick={onInvertColors}>Invert Colors</button>
      <button onClick={onRotateClockwise}>Rotate Clockwise</button>
    </div>
  );
};

export default ImageEditingControls;
