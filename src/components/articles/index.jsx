import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import ArticleCard from "../article-card";
import ArticlesFilterDropdown from "../articles-filter-dropdown";
import { filterByDate } from "../../redux/actions/getNews.action";

const Articles = () => {
  const dispatch = useDispatch();
  const { filteredNews } = useSelector((state) => state.getNews);
  const [selectedSource, setSelectedSource] = useState("All");
  const [selectedSort, setSelectedSort] = useState("Date");

  const sortByDateOptions = [
    {
      id: "default",
      label: "Default",
      onClick: () => {
        setSelectedSort("Default");
        dispatch(filterByDate(""));
      },
    },
    {
      id: "newest",
      label: "Newest",
      onClick: () => {
        setSelectedSort("Newest");
        dispatch(filterByDate("Newest"));
      },
    },
    {
      id: "oldest",
      label: "Oldest",
      onClick: () => {
        setSelectedSort("Oldest");
        dispatch(filterByDate("Oldest"));
      },
    },
  ];

  const filterBySourceOptions = [
    {
      id: "all-articles",
      label: "All",
      source: "",
      onClick: () => setSelectedSource("All"),
    },
    {
      id: "news-api-org",
      label: "NewsAPI.org",
      source: "NewsAPI",
      onClick: () => setSelectedSource("NewsAPI.org"),
    },
    {
      id: "guardian",
      label: "Guardian API",
      source: "Guardian",
      onClick: () => setSelectedSource("Guardian API"),
    },
    {
      id: "ny-times",
      label: "New York Times",
      source: "NYTimes",
      onClick: () => setSelectedSource("New York Times"),
    },
  ];

  return (
    <div className="w-full m-auto">
      <div className="lg:w-3/4 md:w-11/12 m-auto flex gap-3 justify-end relative mb-6">
        <ArticlesFilterDropdown
          items={sortByDateOptions}
          title={selectedSort}
        />
        <ArticlesFilterDropdown
          items={filterBySourceOptions}
          title={selectedSource}
        />
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
