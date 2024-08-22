import React from "react";
import Articles from "../components/articles";
import { useLocation } from "react-router-dom";

const Category = () => {
  const location = useLocation();
  const pathSegment = location.pathname.split("/").pop();
  return (
    <div className="mt-48">
      <h1 className="text-center mt-8 mb-10 font-bold text-2xl capitalize">
        {pathSegment}
      </h1>
      <Articles />
    </div>
  );
};

export default Category;
