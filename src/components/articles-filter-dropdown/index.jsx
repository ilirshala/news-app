import React, { useState } from "react";
import { useSelector } from "react-redux";

const ArticlesFilterDropdown = ({
  items,
  title,
  handleFilterFunction,
  label,
}) => {
  const { loading } = useSelector((state) => state.getNews);
  const [isOpen, setIsOpen] = useState(false);
  const toggleDropdown = () => {
    setIsOpen(!isOpen);
  };

  return (
    <div className="relative m-auto md:m-0 w-auto inline-block text-left ">
      <p className="text-sm text-gray-600 mb-1">{label}</p>
      <button
        id="dropdownDefaultButton"
        onClick={toggleDropdown}
        className="flex items-center w-42 justify-between gap-x-1.5 rounded-md bg-white px-3 py-2 text-sm font-semibold text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 hover:bg-gray-50"
        type="button"
      >
        {loading ? (
          <div className="bg-gray-300 h-4 w-full rounded-lg animate-pulse" />
        ) : (
          title
        )}

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
          className="max-h-80 overflow-auto absolute w-40 z-10 bg-white divide-y divide-gray-100 rounded-lg shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none"
        >
          <ul
            className="text-sm text-gray-700 dark:text-gray-200"
            aria-labelledby="dropdownDefaultButton"
          >
            {items.map((item) => (
              <li
                key={item?.id || item?.label}
                className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-200 cursor-pointer"
                onClick={() => {
                  toggleDropdown();
                  handleFilterFunction(item?.filterKey);
                }}
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
