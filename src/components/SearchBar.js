import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { getNews } from "../store/actions/getNews.action";

const SearchBar = () => {
  const [query, setQuery] = useState("");
  const dispatch = useDispatch();

  const handleSearch = () => {
    dispatch(getNews(query));
  };

  return (
    <div>
      <input
        type="text"
        value={query}
        onChange={(e) => setQuery(e.target.value)}
        placeholder="Search for articles..."
        className="border p-2 rounded-md"
      />
      <button
        onClick={handleSearch}
        className="ml-2 p-2 bg-blue-500 text-white rounded-md"
      >
        Search
      </button>
    </div>
  );
};

export default SearchBar;
