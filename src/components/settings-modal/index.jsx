import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getAricles } from "../../redux/actions/articles.action";
import {
  extractUniqueCategoriesFromApis,
  extractUniqueSourcesFromApis,
} from "../../utils/utils";
import SelectPreferences from "./select-preferences";
import SelectAuthors from "./select-authors";
import ModalButtons from "./modal-buttons";

const SettingsModal = ({ isOpen, onClose }) => {
  const dispatch = useDispatch();
  const [selectedCategories, setSelectedCategories] = useState([]);
  const [selectedSources, setSelectedSources] = useState([]);
  const [availableAuthors, setAvailableAuthors] = useState([]);
  const [selectedAuthors, setSelectedAuthors] = useState([]);
  const { filteredNews, selectedCategory } = useSelector(
    (state) => state.getNews
  );

  const apiSources = extractUniqueSourcesFromApis(filteredNews);
  const apiCategories = extractUniqueCategoriesFromApis(filteredNews);

  useEffect(() => {
    const loadSettings = () => {
      const settings = JSON.parse(localStorage.getItem("newsAppSettings"));
      if (settings) {
        setSelectedCategories(settings.categories || []);
        setSelectedSources(settings.sources || []);
        setSelectedAuthors(settings.authors || []);
      }
    };
    loadSettings();
  }, [filteredNews]);

  useEffect(() => {
    const updateAvailableAuthors = () => {
      const filteredBySources = filteredNews.filter((newsItem) =>
        selectedSources.includes(newsItem.source)
      );
      const authors = filteredBySources
        .map((newsItem) => newsItem.author)
        .filter((author) => author && author !== "Unknown");
      setAvailableAuthors([...new Set(authors)]);
    };
    updateAvailableAuthors();
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

  const handleAddAuthor = (e) => {
    setSelectedAuthors([...selectedAuthors, e]);
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
      getAricles(
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

        <SelectPreferences
          label={"Categories"}
          items={apiCategories}
          selectedItems={selectedCategories}
          setSelectedItems={setSelectedCategories}
          toggleSelection={toggleSelection}
        />

        <SelectPreferences
          label={"Sources"}
          items={apiSources}
          selectedItems={selectedSources}
          setSelectedItems={setSelectedSources}
          toggleSelection={toggleSelection}
        />
        <SelectAuthors
          availableAuthors={availableAuthors}
          handleAddAuthor={handleAddAuthor}
          selectedAuthors={selectedAuthors}
          handleRemoveAuthor={handleRemoveAuthor}
        />

        <ModalButtons handleSave={handleSave} onClose={onClose} />
      </div>
    </div>
  );
};

export default SettingsModal;
