import React from "react";
import { FiSettings } from "react-icons/fi";
import { useDispatch, useSelector } from "react-redux";
import { filterByCategory } from "../../redux/actions/articles.action";
import { useScrollHook } from "../../hooks/useScrollHook";
import SearchInput from "../search-input";
import { articleCategories } from "../../constants/constants";

const Header = ({ onClickSettings }) => {
  const dispatch = useDispatch();
  const { selectedCategory } = useSelector((state) => state.getNews);
  const { isScrolled } = useScrollHook();

  const handleCategoryClick = (category) => {
    dispatch(filterByCategory(category.toLowerCase()));
  };

  return (
    <header
      className={`fixed top-0 left-0 z-40 w-full flex flex-col items-center lg:items-start justify-center lg:justify-between transition-all duration-300 ${
        isScrolled ? "bg-white shadow-lg" : "bg-transparent"
      }`}
    >
      <div className="px-3 md:px-20 lg:px-32 w-full flex items-center justify-between">
        <div
          className={`text-xl font-bold cursor-pointer ${
            isScrolled ? "text-black" : "text-white"
          }`}
        >
          newsApp
        </div>
        <div className="flex items-center space-x-4 my-4">
          <div className="hidden md:block">
            <SearchInput isScrolled={isScrolled} />
          </div>

          <FiSettings
            className={`text-2xl cursor-pointer ${
              isScrolled ? "text-black" : "text-white"
            }`}
            onClick={onClickSettings}
          />
        </div>
      </div>
      <div className="block md:hidden">
        <SearchInput isScrolled={isScrolled} />
      </div>
      <nav
        className={`w-full overflow-x-auto mt-2 py-2 ${
          isScrolled && "border-t border-gray-200"
        }`}
      >
        <ul className="w-11/12 flex justify-normal md:justify-center lg:justify-center space-x-4 lg:space-x-8 m-auto">
          {articleCategories.map((category) => (
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
