import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { filterBySource } from "../../redux/actions/getNews.action";

const ArticlesFilterDropdown = ({ title, items }) => {
  const [isOpen, setIsOpen] = useState(false);
  const dispatch = useDispatch();
  const toggleDropdown = () => {
    setIsOpen(!isOpen);
  };

  const handleDropdownItemClick = (item) => {
    dispatch(filterBySource(item.source));
    item?.onClick();
    toggleDropdown();
  };

  return (
    <div className="relative inline-block text-left">
      <button
        id="dropdownDefaultButton"
        onClick={toggleDropdown}
        className="flex items-center w-40 justify-between gap-x-1.5 rounded-md bg-white px-3 py-2 text-sm font-semibold text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 hover:bg-gray-50"
        type="button"
      >
        {title}
        <svg
          className="w-2.5 h-2.5 ms-3"
          aria-hidden="true"
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 10 6"
        >
          <path
            stroke="currentColor"
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth="2"
            d="m1 1 4 4 4-4"
          />
        </svg>
      </button>

      {isOpen && (
        <div
          id="dropdown"
          className="absolute w-40 z-10 bg-white divide-y divide-gray-100 rounded-lg shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none"
        >
          <ul
            className="text-sm text-gray-700 dark:text-gray-200"
            aria-labelledby="dropdownDefaultButton"
          >
            {items.map((item) => (
              <li
                key={item?.id || item?.label}
                className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-200 cursor-pointer"
                onClick={() => handleDropdownItemClick(item)}
              >
                {item.label}
              </li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
};

export default ArticlesFilterDropdown;
