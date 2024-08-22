import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import ArticleCard from "../article-card";
import SkeletonCard from "../skeleton-card";
import { sortByDate } from "../../utils/utils";
import ArticlesFilterDropdown from "../articles-filter-dropdown";

const Articles = ({ searchParams }) => {
  const { filteredNews, loading } = useSelector((state) => state.getNews);
  const [articles, setArticles] = useState(filteredNews);
  const [dateSelectLabel, setDateSelectLabel] = useState("Date");
  const [sourceSelectLabel, setSourceSelectLabel] = useState("Source");
  const [filterBySourceOptions, setFilterBySourceOptions] = useState([]);
  const settings = JSON.parse(localStorage.getItem("newsAppSettings")) || {};
  const sortByDateOptions = [
    {
      id: "newest",
      label: "Newest",
      option: "Newest",
      filterKey: "newest",
    },
    {
      id: "oldest",
      label: "Oldest",
      option: "Oldest",
      filterKey: "oldest",
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

  useEffect(() => {
    const sourcesPerUser = settings?.sources;
    if (sourcesPerUser) {
      const sourceOptions = [
        {
          id: "all-articles",
          label: "All",
          source: "all",
          filterKey: "all",
          onClick: () => console.log("All"),
        },
        ...sourcesPerUser?.map((source) => ({
          id: source,
          label: source,
          source: source,
          filterKey: source,
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
  const [filteredItems, setFilteredItems] = useState([]);

  useEffect(() => {
    if (searchParams) {
      const filterBySearch = filteredNews?.filter((article) =>
        article.title?.toLowerCase()?.includes(searchParams)
      );
      if (filterBySearch && searchParams?.length > 0) {
        setFilteredItems(filterBySearch);
      }
    } else {
      setFilteredItems(filteredNews);
    }
  }, [filteredNews, searchParams]);

  const handleSortByDate = (filterKey) => {
    const articlesToSort = filteredItems.length > 0 ? filteredItems : articles;
    const sortedItemsByDate = sortByDate(articlesToSort, filterKey);
    setDateSelectLabel(filterKey?.toUpperCase());
    if (filteredItems?.length > 0) {
      setFilteredItems(sortedItemsByDate);
    } else {
      setArticles(sortedItemsByDate);
    }
  };

  const handleSortBySource = (filterKey) => {
    setSourceSelectLabel(filterKey?.toUpperCase());
    const filterItems = articles.filter(
      (article) => article?.source.toLowerCase() === filterKey?.toLowerCase()
    );
    if (filterItems) setFilteredItems(filterItems);
  };

  return (
    <div className="w-full m-auto mb-5">
      <div className="lg:w-3/4 md:w-11/12 m-auto flex gap-3 justify-end relative mb-6">
        <ArticlesFilterDropdown
          items={sortByDateOptions}
          title={dateSelectLabel}
          handleFilterFunction={handleSortByDate}
        />
        <ArticlesFilterDropdown
          items={filterBySourceOptions}
          title={sourceSelectLabel}
          handleFilterFunction={handleSortBySource}
        />
      </div>

      <div className="flex flex-wrap gap-0 md:gap-5 lg:gap-10 xl:gap-20 lg:w-[95%] xl:w-[85%] sm:w-[95%] mx-auto">
        {loading ? (
          Array.from({ length: 4 }).map((_, index) => (
            <SkeletonCard key={index} />
          ))
        ) : articles?.length > 0 ? (
          filteredItems.length > 0 ? (
            filteredItems.map((article) => (
              <ArticleCard article={article} key={article.id} />
            ))
          ) : (
            articles.map((article) => (
              <ArticleCard article={article} key={article.id} />
            ))
          )
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
