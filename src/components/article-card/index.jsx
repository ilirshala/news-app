import React from "react";
import { FaArrowRightLong } from "react-icons/fa6";
import { formatTimestamp } from "../../utils/utils";

const ArticleCard = ({ article }) => {
  const articleDate = article?.publishedAt;
  return (
    <div className="m-auto lg:m-0 p-3 border border-gray-300 rounded-lg shadow-sm transition-transform duration-300 hover:shadow-lg hover:scale-105 flex flex-col h-72 w-[95%] sm:w-[95%] md:w-[45%] lg:w-[30%] xl:w-[20%] cursor-pointer mt-5 lg:mt-4">
      <div className="w-full flex items-center justify-between mb-3">
        <p className="text-xs font-bold text-white  px-2 py-1 rounded-full bg-red-700 w-fit">
          {article?.sectionName || "News"}
        </p>
        <p className="text-xs font-bold text-gray-500">{article?.author}</p>
      </div>
      <p className="text-xs font-semibold text-gray-400">{article?.category}</p>
      <h2 className="text-md font-bold">{article?.title}</h2>
      <p className="text-sm mt-2 text-gray-600">{article?.description}</p>
      <div className="mt-auto w-full flex items-center justify-between">
        <h3 className="cursor-pointer text-xs font-bold text-gray-500 flex items-center gap-3">
          <FaArrowRightLong size={15} className="text-gray-500" />
          Read more
        </h3>
        <p className="text-xs font-bold text-gray-500">
          {formatTimestamp(articleDate)}
        </p>
      </div>
    </div>
  );
};

export default ArticleCard;
