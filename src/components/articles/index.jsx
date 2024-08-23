import React, { useEffect, useMemo, useState, useCallback } from "react";
import { useSelector } from "react-redux";
import ArticleCard from "./article-card";
import SkeletonCard from "../skeleton-card";
import {
  filterByAuthors,
  filterByCategory,
  filterBySearch,
  filterBySource,
  sortByDate,
} from "../../utils";
import ArticlesFilterDropdown from "./articles-filter-dropdown";
import { sortByDateOptions } from "../../constants";

const Articles = ({ searchParams }) => {
  const { articles, loading, success } = useSelector(
    (state) => state.getArticles
  );
  const userSettings =
    JSON.parse(localStorage.getItem("newsAppSettings")) || {};
  const [dateFilter, setDateFilter] = useState("Date");
  const [sourceFilter, setSourceFilter] = useState("All");
  const [categoryFilter, setCategoryFilter] = useState("Default");

  const resetFilters = useCallback(() => {
    setDateFilter("Date");
    setSourceFilter("All");
    setCategoryFilter("Default");
  }, []);

  useEffect(() => {
    if (success) {
      resetFilters();
    }
  }, [success, resetFilters]);

  const handleSortByDate = useCallback((filterKey) => {
    setDateFilter(filterKey);
  }, []);

  const handleSortBySource = useCallback((filterKey) => {
    setSourceFilter(filterKey);
  }, []);

  const handleSortByCategory = useCallback((filterKey) => {
    setCategoryFilter(filterKey);
  }, []);

  const filterBySourceOptions = useMemo(() => {
    if (userSettings?.sources) {
      const options = userSettings?.sources.map((source) => ({
        label: source,
        filterKey: source,
      }));
      return [{ label: "All", filterKey: "All" }, ...options];
    }
    return [{ label: "All", filterKey: "All" }];
  }, [userSettings?.sources]);

  const categories = useMemo(() => {
    if (userSettings?.categories) {
      const options = userSettings?.categories.map((category) => ({
        label: category,
        filterKey: category,
      }));
      return [{ label: "Default", filterKey: "Default" }, ...options];
    }
    return [{ label: "Default", filterKey: "Default" }];
  }, [userSettings?.categories]);

  const filteredItems = useMemo(() => {
    let items = articles;

    if (searchParams) {
      items = filterBySearch(items, searchParams);
    }

    if (userSettings?.authors?.length > 0) {
      items = filterByAuthors(items, userSettings?.authors);
    }

    if (dateFilter !== "Date") {
      items = sortByDate(items, dateFilter.toLowerCase());
    }

    if (sourceFilter !== "All") {
      items = filterBySource(items, sourceFilter.toLowerCase());
    }

    if (categoryFilter !== "Default") {
      items = filterByCategory(items, categoryFilter.toLowerCase());
    }

    if (userSettings?.sources) {
      items = items.filter((article) =>
        userSettings?.sources.includes(article.source)
      );
    }

    if (userSettings?.categories) {
      items = items.filter((article) =>
        userSettings?.categories.includes(article.category)
      );
    }

    return items;
  }, [
    articles,
    searchParams,
    userSettings?.authors,
    userSettings?.sources,
    userSettings?.categories,
    dateFilter,
    sourceFilter,
    categoryFilter,
  ]);

  return (
    <div className="w-full m-auto mb-5">
      <div className="lg:w-3/4 md:w-11/12 m-auto flex flex-wrap md:flex-nowrap gap-3 justify-end relative mb-6">
        <ArticlesFilterDropdown
          items={sortByDateOptions}
          title={dateFilter}
          handleFilterFunction={handleSortByDate}
          label={"Date"}
        />
        <ArticlesFilterDropdown
          items={filterBySourceOptions}
          title={sourceFilter}
          handleFilterFunction={handleSortBySource}
          label={"Source"}
        />
        <ArticlesFilterDropdown
          items={categories}
          title={categoryFilter}
          handleFilterFunction={handleSortByCategory}
          label={"Category"}
        />
      </div>

      <div className="flex flex-wrap gap-0 md:gap-5 lg:gap-10 xl:gap-20 lg:w-[95%] xl:w-[85%] sm:w-[95%] mx-auto">
        {loading ? (
          Array.from({ length: 4 }).map((_, index) => (
            <SkeletonCard key={index} />
          ))
        ) : filteredItems.length > 0 ? (
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
