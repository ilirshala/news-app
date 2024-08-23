import React from "react";

const SelectAuthors = ({
  availableAuthors,
  handleAddAuthor,
  selectedAuthors,
  handleRemoveAuthor,
}) => {
  return (
    <div className="mb-4">
      <label className="block text-gray-700">Authors:</label>
      <select
        onChange={(e) => handleAddAuthor(e.target.value)}
        className="mt-2 p-2 border border-gray-300 rounded w-full"
      >
        <option value="">Select an author</option>
        {availableAuthors?.map((author, index) => (
          <option key={index} value={author}>
            {author}
          </option>
        ))}
      </select>
      <div className="mt-2 flex flex-wrap">
        {selectedAuthors?.map((author, index) => (
          <span
            key={index}
            className="inline-flex items-center bg-gray-200 text-gray-700 px-2 py-1 rounded mr-2 mb-2"
          >
            {author}
            <button
              onClick={() => handleRemoveAuthor(author)}
              className="ml-2 text-red-500"
            >
              &times;
            </button>
          </span>
        ))}
      </div>
    </div>
  );
};

export default SelectAuthors;
