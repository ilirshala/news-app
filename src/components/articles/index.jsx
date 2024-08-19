import React from "react";
import { useSelector } from "react-redux";
import ArticleCard from "../article-card";

const Articles = () => {
  const { filteredNews } = useSelector((state) => state.getNews);

  console.log(filteredNews, "filteredNews");
  return (
    <div className="w-11/12 lg:w-2/3 m-auto flex items-center gap-4 flex-wrap">
      {filteredNews?.map((article) => (
        <ArticleCard article={article} key={article.id} />
      ))}
    </div>
  );
};

export default Articles;
