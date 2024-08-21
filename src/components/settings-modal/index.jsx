import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getNews } from "../../redux/actions/getNews.action";
import { articleCategories, articleSources } from "../../constants/constants";

const SettingsModal = ({ isOpen, onClose }) => {
  const dispatch = useDispatch();
  const newsAppSettings = JSON.parse(localStorage.getItem("newsAppSettings"));
  const [selectedCategories, setSelectedCategories] = useState(
    newsAppSettings?.categories
  );
  const [selectedSources, setSelectedSources] = useState(
    newsAppSettings?.sources
  );
  const [authors, setAuthors] = useState([]);
  const [selectedAuthor, setSelectedAuthor] = useState("");
  const { filteredNews } = useSelector((state) => state.getNews);

  useEffect(() => {
    const filteredBySources = filteredNews.filter((newsItem) =>
      selectedSources.includes(newsItem.source)
    );

    const authors = filteredBySources
      .map((newsItem) => newsItem?.author)
      .filter((author) => author !== "Unknown");
    setAuthors(authors);
  }, [filteredNews, selectedSources]);

  const toggleSelection = (selectedList, setSelectedList, value) => {
    setSelectedList((prev) => {
      if (prev?.includes(value)) {
        return prev.filter((item) => item !== value);
      } else {
        return [...prev, value];
      }
    });
  };

  const handleSave = () => {
    const settings = {
      categories: selectedCategories,
      sources: selectedSources,
      author: selectedAuthor,
    };
    localStorage.setItem("newsAppSettings", JSON.stringify(settings));
    dispatch(getNews("latest"));
    onClose();
  };

  return (
    <div
      className={`fixed inset-0 flex items-center justify-center z-50 transition-opacity ${
        isOpen ? "opacity-100" : "opacity-0 pointer-events-none"
      }`}
    >
      <div
        className="fixed inset-0 bg-black opacity-50"
        onClick={onClose}
      ></div>

      <div
        className="bg-white p-6 rounded-lg shadow-lg w-1/2 z-10"
        onClick={(e) => e.stopPropagation()}
      >
        <h2 className="text-xl font-semibold mb-4">Select Preferences</h2>

        <div className="mb-4">
          <label className="block text-gray-700">Categories:</label>
          <div className="mt-2 flex flex-wrap">
            {articleCategories?.map((category, index) => (
              <button
                key={index}
                onClick={() =>
                  toggleSelection(
                    selectedCategories,
                    setSelectedCategories,
                    category
                  )
                }
                className={`m-1 px-2 py-1 rounded border ${
                  selectedCategories?.includes(category)
                    ? "bg-blue-500 text-white"
                    : "bg-gray-200 text-gray-700"
                }`}
              >
                {category}
              </button>
            ))}
          </div>
        </div>

        <div className="mb-4">
          <label className="block text-gray-700">Sources:</label>
          <div className="mt-2 flex flex-wrap">
            {articleSources?.map((source, index) => (
              <button
                key={index}
                onClick={() =>
                  toggleSelection(selectedSources, setSelectedSources, source)
                }
                className={`m-1 px-2 py-1 rounded border ${
                  selectedSources?.includes(source)
                    ? "bg-blue-500 text-white"
                    : "bg-gray-200 text-gray-700"
                }`}
              >
                {source}
              </button>
            ))}
          </div>
        </div>

        <div className="mb-4">
          <label className="block text-gray-700">Author:</label>
          <select
            value={selectedAuthor}
            onChange={(e) => setSelectedAuthor(e.target.value)}
            className="mt-2 p-2 border border-gray-300 rounded w-full"
          >
            <option value="">Select an author</option>
            {authors?.map((author, index) => (
              <option key={index} value={author}>
                {author}
              </option>
            ))}
          </select>
        </div>

        <div className="flex justify-end mt-4">
          <button
            onClick={handleSave}
            className="bg-blue-500 text-white px-4 py-2 rounded mr-2"
          >
            Save
          </button>
          <button
            onClick={onClose}
            className="bg-gray-500 text-white px-4 py-2 rounded"
          >
            Cancel
          </button>
        </div>
      </div>
    </div>
  );
};

export default SettingsModal;
