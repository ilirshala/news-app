import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import ArticleCard from "../article-card";
import { filterByDate } from "../../redux/actions/getNews.action";
import ArticlesFilters from "./articles-filters";

const Articles = () => {
  const dispatch = useDispatch();
  const { filteredNews } = useSelector((state) => state.getNews);
  const [selectedSource, setSelectedSource] = useState("All");
  const [selectedSort, setSelectedSort] = useState("Date");
  const [articles, setArticles] = useState(filteredNews);

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
      source: "NY Times",
      onClick: () => setSelectedSource("New York Times"),
    },
  ];

  useEffect(() => {
    const settings = JSON.parse(localStorage.getItem("newsAppSettings")) || {};
    if (settings?.author?.length > 0) {
      const filteredByAuthor = filteredNews?.filter((article) =>
        article?.author?.includes(settings.author)
      );
      setArticles(filteredByAuthor);
    } else {
      setArticles(filteredNews);
    }
  }, [filteredNews]);

  return (
    <div className="w-full m-auto mb-5">
      <ArticlesFilters
        sortByDateOptions={sortByDateOptions}
        selectedSort={selectedSort}
        filterBySourceOptions={filterBySourceOptions}
        selectedSource={selectedSource}
      />

      <div className="flex flex-wrap gap-0 md:gap-5 lg:gap-10 xl:gap-20 lg:w-[95%] xl:w-[85%] sm:w-[95%] mx-auto">
        {articles?.map((article) => (
          <ArticleCard article={article} key={article.id} />
        ))}
      </div>
    </div>
  );
};

export default Articles;
