import React from "react";
import { useSearchParams } from "react-router-dom";
import Articles from "../components/articles";

const Search = () => {
  const [searchParams] = useSearchParams();
  const query = searchParams.get("s") || "";
  return (
    <div className="mt-48">
      <p className="ml-3 lg:ml-40 font-semibold text-2xl">
        Search results for: {query}
      </p>
      <Articles searchParams={query?.toLowerCase()} />
    </div>
  );
};

export default Search;
