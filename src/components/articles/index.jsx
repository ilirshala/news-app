import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import ArticleCard from "../article-card";
import { filterByDate } from "../../redux/actions/getNews.action";
import ArticlesFilters from "./articles-filters";
import SkeletonCard from "../skeleton-card";

const Articles = () => {
  const dispatch = useDispatch();
  const { filteredNews, selectedSource, loading, dateType } = useSelector(
    (state) => state.getNews
  );
  const [articles, setArticles] = useState(filteredNews);
  const [filterBySourceOptions, setFilterBySourceOptions] = useState([]);

  console.log(articles, "articles");

  const sortByDateOptions = [
    {
      id: "default",
      label: "Default",
      option: "",
      onClick: () => {
        dispatch(filterByDate("Date"));
      },
    },
    {
      id: "newest",
      label: "Newest",
      option: "Newest",
      onClick: () => {
        dispatch(filterByDate("Newest"));
      },
    },
    {
      id: "oldest",
      label: "Oldest",
      option: "Oldest",
      onClick: () => {
        dispatch(filterByDate("Oldest"));
      },
    },
  ];

  useEffect(() => {
    const settings = JSON.parse(localStorage.getItem("newsAppSettings")) || {};

    const authors = settings?.authors;
    if (authors?.length > 0) {
      const filteredByAuthors = filteredNews.filter((article) =>
        authors?.some((author) => article.author?.includes(author))
      );
      setArticles(filteredByAuthors);
    } else {
      setArticles(filteredNews);
    }
  }, [filteredNews]);

  const settings = JSON.parse(localStorage.getItem("newsAppSettings")) || {};

  useEffect(() => {
    const sourcesPerUser = settings?.sources;
    if (sourcesPerUser) {
      const sourceOptions = [
        {
          id: "all-articles",
          label: "All",
          source: "all",
          onClick: () => console.log("All"),
        },
        ...sourcesPerUser?.map((source) => ({
          id: source,
          label: source,
          source: source,
          onClick: () => console.log("source", source),
        })),
      ];

      setFilterBySourceOptions((prevOptions) => {
        const prevIds = prevOptions?.map((option) => option.id);
        const newIds = sourceOptions.map((option) => option.id);

        if (JSON.stringify(prevIds) !== JSON.stringify(newIds)) {
          return sourceOptions;
        }

        return prevOptions;
      });
    }
  }, [settings?.sources]);

  return (
    <div className="w-full m-auto mb-5">
      <ArticlesFilters
        sortByDateOptions={sortByDateOptions}
        selectedSort={dateType}
        filterBySourceOptions={filterBySourceOptions}
        selectedSource={selectedSource}
      />

      <div className="flex flex-wrap gap-0 md:gap-5 lg:gap-10 xl:gap-20 lg:w-[95%] xl:w-[85%] sm:w-[95%] mx-auto">
        {loading ? (
          Array.from({ length: 4 }).map((_, index) => (
            <SkeletonCard key={index} />
          ))
        ) : articles?.length > 0 ? (
          articles.map((article) => (
            <ArticleCard article={article} key={article.id} />
          ))
        ) : (
          <div className="w-full text-center py-10 text-gray-500">
            No articles available at the moment. Please check back later.
          </div>
        )}
      </div>
    </div>
  );
};

export default Articles;
