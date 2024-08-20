import React from "react";
import { useSelector } from "react-redux";
import ArticleCard from "../article-card";
import DropdownButton from "../articles-filter-dropdown";

const Articles = () => {
  const { filteredNews } = useSelector((state) => state.getNews);

  const sortByDateOptions = [
    {
      id: "newest",
      label: "Newest",
      onClick: () => console.log("Hello world"),
    },
    {
      id: "oldest",
      label: "Oldest",
      onClick: () => console.log("Hello world"),
    },
  ];

  const filterBySourceOptions = [
    {
      id: "all-articles",
      label: "All",
      source: "",
    },
    {
      id: "news-api-org",
      label: "NewsAPI.org",
      source: "NewsAPI",
    },
    {
      id: "guardian",
      label: "Guardian API",
      source: "Guardian",
    },
    {
      id: "ny-times",
      label: "New York Times API",
      source: "NYT",
    },
  ];

  console.log(filteredNews, "filteredNews");
  return (
    <div className="w-full m-auto">
      <div className="lg:w-3/4 md:w-11/12 m-auto flex gap-3 justify-end relative mb-6">
        <DropdownButton items={sortByDateOptions} title={"Date"} />
        <DropdownButton items={filterBySourceOptions} title={"Source"} />
      </div>

      <div className="flex flex-wrap gap-0 md:gap-5 lg:gap-10 xl:gap-20 lg:w-[95%] xl:w-[85%] sm:w-[95%] mx-auto">
        {filteredNews?.map((article) => (
          <ArticleCard article={article} key={article.id} />
        ))}
      </div>
    </div>
  );
};

export default Articles;
