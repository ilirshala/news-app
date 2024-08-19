import React, { useEffect } from "react";
import { useSelector } from "react-redux";

const ArticleList = ({ articles }) => {
  const { news } = useSelector((state) => state.getNews);

  useEffect(() => {
    console.log(news, "news");
  }, [news]);
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
      {news?.map((article) => (
        <div key={article.id} className="bg-white shadow-md rounded-lg p-4">
          <h2 className="text-xl font-bold">
            {article.title || article.webTitle}
          </h2>
          <p>{article.description}</p>
          <a
            href={article.url || article.webUrl}
            target="_blank"
            rel="noopener noreferrer"
          >
            Read more
          </a>
        </div>
      ))}
    </div>
  );
};

export default ArticleList;
