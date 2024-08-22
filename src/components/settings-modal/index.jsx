import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getNews } from "../../redux/actions/getNews.action";
import { articleCategories } from "../../constants/constants";

const SettingsModal = ({ isOpen, onClose }) => {
  const dispatch = useDispatch();
  const [selectedCategories, setSelectedCategories] = useState([]);
  const [selectedSources, setSelectedSources] = useState([]);
  const [availableAuthors, setAvailableAuthors] = useState([]);
  const [selectedAuthors, setSelectedAuthors] = useState([]);
  const [selectedAuthor, setSelectedAuthor] = useState("");
  const { filteredNews, selectedCategory } = useSelector(
    (state) => state.getNews
  );
  const articleSources = ["NewsAPI", "NY Times", "Guardian"];

  useEffect(() => {
    const newsAppSettings = JSON.parse(localStorage.getItem("newsAppSettings"));
    if (newsAppSettings) {
      setSelectedCategories(newsAppSettings?.categories);
      setSelectedSources(newsAppSettings?.sources);
      setSelectedAuthors(newsAppSettings?.authors);
    }
  }, []);

  useEffect(() => {
    const filteredBySources = filteredNews.filter((newsItem) =>
      selectedSources.includes(newsItem.source)
    );

    const authors = filteredBySources
      .map((newsItem) => newsItem?.author)
      .filter((author) => author !== "Unknown");
    setAvailableAuthors([...new Set(authors)]);
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

  const handleAddAuthor = () => {
    if (selectedAuthor && !selectedAuthors.includes(selectedAuthor)) {
      setSelectedAuthors([...selectedAuthors, selectedAuthor]);
      setSelectedAuthor("");
    }
  };

  const handleRemoveAuthor = (authorToRemove) => {
    setSelectedAuthors((prev) =>
      prev.filter((author) => author !== authorToRemove)
    );
  };

  const handleSave = () => {
    const settings = {
      categories: selectedCategories,
      sources: selectedSources,
      authors: selectedAuthors,
    };
    localStorage.setItem("newsAppSettings", JSON.stringify(settings));
    dispatch(
      getNews(
        selectedCategory === "home" ? "latest" : selectedCategory,
        selectedCategory
      )
    );
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
        className="bg-white p-4 sm:p-6 md:p-8 lg:p-10 xl:p-12 rounded-lg shadow-lg w-11/12 sm:w-3/4 md:w-1/2 lg:w-1/3 z-10"
        onClick={(e) => e.stopPropagation()}
      >
        <h2 className="text-lg sm:text-xl font-semibold mb-4">
          Select Preferences
        </h2>

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

        <div className="flex flex-col sm:flex-row justify-end mt-4">
          <button
            onClick={handleSave}
            className="bg-blue-500 text-white px-4 py-2 rounded mb-2 sm:mb-0 sm:mr-2"
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
