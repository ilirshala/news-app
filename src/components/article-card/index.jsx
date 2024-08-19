import React from "react";
import { FaArrowRightLong } from "react-icons/fa6";

const ArticleCard = ({ article }) => {
  return (
    <div className="p-3 border border-gray-300 rounded-lg shadow-sm transition-transform duration-300 hover:shadow-lg hover:scale-105 flex flex-col h-72 w-full sm:w-56 md:w-56 lg:w-72 xl:w-72 cursor-pointer mt-5 lg:mt-0">
      <p className="text-xs font-bold text-white mb-3 px-2 py-1 rounded-full bg-red-700 w-fit">
        {article?.sectionName || "News"}
      </p>
      <h2 className="text-md font-bold">
        {article?.title || article?.webTitle}
      </h2>
      <p className="text-sm mt-2 text-gray-600">{article?.description}</p>
      <h3 className="mt-auto cursor-pointer text-xs font-bold text-gray-500 flex items-center gap-3">
        <FaArrowRightLong size={15} className="text-gray-500" />
        Read more
      </h3>
    </div>
  );
};

export default ArticleCard;
