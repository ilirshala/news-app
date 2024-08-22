import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import ArticleCard from "../article-card";
import { filterByDate } from "../../redux/actions/getNews.action";
import ArticlesFilters from "./articles-filters";
import SkeletonCard from "../skeleton-card";

const Articles = () => {
  const dispatch = useDispatch();
  const { filteredNews, selectedSource, loading } = useSelector(
    (state) => state.getNews
  );
  const [selectedSort, setSelectedSort] = useState("Date");
  const [articles, setArticles] = useState(filteredNews);
  const settings = JSON.parse(localStorage.getItem("newsAppSettings")) || {};
  const [filterBySourceOptions, setFilterBySourceOptions] = useState();

  useEffect(() => {
    console.log(selectedSource, "selectedSource");
  }, [selectedSource]);

  const sortByDateOptions = [
    {
      id: "default",
      label: "Default",
      option: "",
      onClick: () => {
        setSelectedSort("Default");
        dispatch(filterByDate(""));
      },
    },
    {
      id: "newest",
      label: "Newest",
      option: "Newest",
      onClick: () => {
        setSelectedSort("Newest");
        dispatch(filterByDate("Newest"));
      },
    },
    {
      id: "oldest",
      label: "Oldest",
      option: "Oldest",
      onClick: () => {
        setSelectedSort("Oldest");
        dispatch(filterByDate("Oldest"));
      },
    },
  ];

  useEffect(() => {
    const sourcesPerUser = settings?.sources;

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
  }, [settings?.sources]);

  useEffect(() => {
    if (settings?.author?.length > 0) {
      const filteredByAuthor = filteredNews?.filter((article) =>
        article?.author?.includes(settings.author)
      );
      setArticles(filteredByAuthor);
    } else {
      setArticles(filteredNews);
    }
  }, [filteredNews, settings.author]);

  return (
    <div className="w-full m-auto mb-5">
      <ArticlesFilters
        sortByDateOptions={sortByDateOptions}
        selectedSort={selectedSort}
        filterBySourceOptions={filterBySourceOptions}
        selectedSource={selectedSource}
      />

      <div className="flex flex-wrap gap-0 md:gap-5 lg:gap-10 xl:gap-20 lg:w-[95%] xl:w-[85%] sm:w-[95%] mx-auto">
        {loading
          ? Array.from({ length: 4 }).map((_, index) => (
              <SkeletonCard key={index} />
            ))
          : articles?.map((article) => (
              <ArticleCard article={article} key={article.id} />
            ))}
      </div>
    </div>
  );
};

export default Articles;
