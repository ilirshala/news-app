import React, { useState } from "react";
import { FaSearch } from "react-icons/fa";
import { useSearchParams } from "react-router-dom";

const SearchInput = ({ isScrolled }) => {
  const [searchParams, setSearchParams] = useSearchParams();
  const [searchValue, setSearchValue] = useState("");
  const handleFilterSearch = (e) => {
    setSearchValue(e.target.value);
    if (e.target.value.length > 0) {
      setSearchParams({ s: e.target.value });
    } else {
      setSearchParams({});
    }
  };

  const handleSearchWithEnter = (e) => {
    if (e.key === "Enter") {
      handleFilterSearch();
    }
  };

  return (
    <div
      className={`flex items-center gap-3 border rounded-md px-4 py-2 ${
        isScrolled ? "border-gray-300" : "border-gray-700"
      } focus-within:ring-2 focus-within:ring-blue-300`}
    >
      <input
        type="text"
        placeholder="Search..."
        className={`p-1 w-64 bg-transparent outline-none ${
          isScrolled ? "text-black" : "text-white"
        }`}
        value={searchValue}
        onChange={(e) => handleFilterSearch(e)}
        onKeyDown={handleSearchWithEnter}
      />
      <FaSearch
        className={`text-2xl cursor-pointer ${
          isScrolled ? "text-black" : "text-white"
        }`}
        onClick={handleFilterSearch}
      />
    </div>
  );
};

export default SearchInput;
