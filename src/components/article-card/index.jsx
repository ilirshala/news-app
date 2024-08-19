import React from "react";

const ArticleCard = ({ article }) => {
  return (
    <div className="p-3 border-gray-400 rounded-lg shadow-sm transition-transform duration-300 hover:shadow-lg hover:scale-105 flex flex-col h-72 w-full sm:w-56 md:w-64 lg:w-72 xl:w-72 cursor-pointer">
      <p className="text-xs font-bold text-gray-500 mb-3">
        {article?.sectionName}
      </p>
      <h2 className="text-md font-bold">{article.title || article.webTitle}</h2>
      <p className="text-sm mt-2 text-gray-600">
        Lorem ipsum dolor sit amet consectetur adipisicing elit. Iste explicabo
        dolorum sunt quasi nobis numquam dolores. Unde hic ducimus quasi.
      </p>
      <h3 className="mt-auto cursor-pointer text-xs font-bold text-gray-500">
        Read more
      </h3>
    </div>
  );
};

export default ArticleCard;
