import React from "react";

function EditText({
  newText,
  setNewText,
  textColor,
  setTextColor,
  fontSize,
  setFontSize,
  addOverlayText,
}) {
  return (
    <div>
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
    </div>
  );
}

export default EditText;
