import React from "react";

const SelectAuthors = ({
  selectedAuthor,
  setSelectedAuthor,
  availableAuthors,
  handleAddAuthor,
  selectedAuthors,
  handleRemoveAuthor,
}) => {
  return (
    <div className="mb-4">
      <label className="block text-gray-700">Authors:</label>
      <select
        value={selectedAuthor}
        onChange={(e) => setSelectedAuthor(e.target.value)}
        className="mt-2 p-2 border border-gray-300 rounded w-full"
      >
        <option value="">Select an author</option>
        {availableAuthors?.map((author, index) => (
          <option key={index} value={author}>
            {author}
          </option>
        ))}
      </select>
      <button
        onClick={handleAddAuthor}
        className="mt-2 bg-blue-500 text-white px-4 py-2 rounded"
      >
        Add Author
      </button>
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
