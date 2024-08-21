import React from "react";
import { FiSettings } from "react-icons/fi";
import { useDispatch, useSelector } from "react-redux";
import {
  filterArticles,
  filterByCategory,
} from "../../redux/actions/getNews.action";
import { useScrollHook } from "../../hooks/useScrollHook";

const Header = ({ onClickSettings }) => {
  const dispatch = useDispatch();
  const { selectedCategory } = useSelector((state) => state.getNews);
  const { isScrolled } = useScrollHook();
  const newsAppSettings = JSON.parse(localStorage.getItem("newsAppSettings"));

  console.log(selectedCategory, "selectedCategory");

  const handleFilterSearch = (e) => {
    const searchTerm = e.target.value;
    dispatch(filterArticles(searchTerm));
  };

  const handleCategoryClick = (category) => {
    console.log(category, "category");
    dispatch(filterByCategory(category?.toLowerCase()));
  };

  return (
    <header
      className={`fixed top-0 left-0 z-40 w-full flex flex-col items-center lg:items-start justify-center lg:justify-between  transition-all duration-300 ${
        isScrolled ? "bg-white shadow-lg" : "bg-transparent"
      }`}
    >
      <div className="px-3 md:px-20 lg:px-32   w-full flex items-center justify-between">
        <div
          className={`text-xl font-bold ${
            isScrolled ? "text-black" : "text-white"
          }`}
        >
          newsApp
        </div>
        <div className="flex items-center space-x-4 my-4 ">
          <input
            type="text"
            placeholder="Search..."
            className={`p-2 w-64 border rounded-md focus:outline-none focus:ring focus:border-blue-300 bg-transparent ${
              isScrolled ? "text-black" : "text-white"
            }`}
            onChange={handleFilterSearch}
          />
          <FiSettings
            className={`text-2xl cursor-pointer ${
              isScrolled ? "text-black" : "text-white"
            }`}
            onClick={onClickSettings}
          />
        </div>
      </div>
      <nav
        className={`w-full overflow-x-auto mt-2 py-2 ${
          isScrolled && "border-t border-gray-200"
        }`}
      >
        <ul className="w-11/12 flex justify-normal md:justify-center lg:justify-center space-x-4 lg:space-x-8 m-auto">
          {newsAppSettings &&
            ["All", ...newsAppSettings?.categories]?.map((category) => (
              <li key={category}>
                <button
                  onClick={() => handleCategoryClick(category)}
                  className={`p-2 rounded-md transition-all duration-300 ${
                    isScrolled ? "text-black" : "text-white"
                  } ${
                    selectedCategory.toLowerCase() === category.toLowerCase()
                      ? isScrolled
                        ? "bg-gray-200"
                        : "bg-gray-700"
                      : ""
                  } ${isScrolled ? "hover:bg-gray-200" : "hover:bg-gray-700"}`}
                >
                  {category}
                </button>
              </li>
            ))}
        </ul>
      </nav>
    </header>
  );
};

export default Header;
