import React, { useEffect, useMemo, useState } from "react";
import { useSelector } from "react-redux";
import ArticleCard from "../article-card";
import SkeletonCard from "../skeleton-card";
import {
  extractUniqueCategoriesFromApis,
  filterByAuthors,
  filterByCategory,
  filterBySearch,
  filterBySource,
  sortByDate,
} from "../../utils/utils";
import ArticlesFilterDropdown from "../articles-filter-dropdown";
import { sortByDateOptions } from "../../constants/constants";

const Articles = ({ searchParams }) => {
  const { filteredNews, loading, getArticlesSuccess } = useSelector(
    (state) => state.getNews
  );
  const [dateFilter, setDateFilter] = useState("Date");
  const [sourceFilter, setSourceFilter] = useState("Source");
  const [categoryFilter, setCategoryFilter] = useState("General");
  const [categories, setCategories] = useState([]);
  const [filterBySourceOptions, setFilterBySourceOptions] = useState([]);
  const settings = JSON.parse(localStorage.getItem("newsAppSettings")) || {};

  const resetFilters = () => {
    setDateFilter("Date");
    setSourceFilter("Source");
    setCategoryFilter("General");
  };

  useEffect(() => {
    if (getArticlesSuccess) {
      resetFilters();
    }
  }, [getArticlesSuccess]);

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

      console.log(sourcesPerUser, "sourcesPerUser");

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

  const handleSortByDate = (filterKey) => {
    setDateFilter(filterKey?.toUpperCase());
  };

  const handleSortBySource = (filterKey) => {
    setSourceFilter(filterKey?.toUpperCase());
  };

  const handleSortByCategory = (filterKey) => {
    setCategoryFilter(filterKey?.toUpperCase());
  };

  const filteredItems = useMemo(() => {
    const settings = JSON.parse(localStorage.getItem("newsAppSettings")) || {};
    const authors = settings?.authors;
    let items = filteredNews;
    const articlesCategories = extractUniqueCategoriesFromApis(items);

    // Filter by search
    if (searchParams) {
      items = filterBySearch(items, searchParams);
    }
    // Filter by selected authors
    if (authors?.length > 0) {
      items = filterByAuthors(items, authors);
    }
    // Sort by date NEWEST / OLDEST
    if (dateFilter !== "Date") {
      items = sortByDate(items, dateFilter.toLowerCase());
    }
    // Filter by peronalized Sources
    if (sourceFilter !== "Source") {
      items = filterBySource(items, sourceFilter?.toLowerCase());
    }

    if (categoryFilter !== "General") {
      items = filterByCategory(items, categoryFilter?.toLowerCase());
    }

    if (articlesCategories) {
      setCategories(articlesCategories);
    }

    return items;
  }, [filteredNews, searchParams, dateFilter, sourceFilter, categoryFilter]);

  console.log(filteredItems, "filteredItems");
  return (
    <div className="w-full m-auto mb-5">
      <div className="lg:w-3/4 md:w-11/12 m-auto flex flex-col md:flex-row gap-3 justify-end relative mb-6">
        <ArticlesFilterDropdown
          items={sortByDateOptions}
          title={dateFilter}
          handleFilterFunction={handleSortByDate}
        />
        <ArticlesFilterDropdown
          items={filterBySourceOptions}
          title={sourceFilter}
          handleFilterFunction={handleSortBySource}
        />
        <ArticlesFilterDropdown
          items={categories}
          title={categoryFilter}
          handleFilterFunction={handleSortByCategory}
        />
      </div>

      <div className="flex flex-wrap gap-0 md:gap-5 lg:gap-10 xl:gap-20 lg:w-[95%] xl:w-[85%] sm:w-[95%] mx-auto">
        {loading ? (
          Array.from({ length: 4 }).map((_, index) => (
            <SkeletonCard key={index} />
          ))
        ) : filteredItems?.length > 0 ? (
          filteredItems.map((article) => (
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
