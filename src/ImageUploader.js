import React, { useRef } from "react";

function ImageUpload({ handleImageUpload, imageUrl, setImageUrl }) {
  const imageInputRef = useRef(null);

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
        onClick={() => imageInputRef.current.click()}
        className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded  m-2"
      >
        Load from File
      </button>
    </div>
  );
}

export default ImageUpload;
