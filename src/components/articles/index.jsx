import React, { useEffect, useMemo, useState } from "react";
import { useSelector } from "react-redux";
import ArticleCard from "../article-card";
import SkeletonCard from "../skeleton-card";
import {
  extractUniqueCategoriesFromApis,
  extractUniqueSourcesFromApis,
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
  const [sourceFilter, setSourceFilter] = useState("All");
  const [categoryFilter, setCategoryFilter] = useState("Default");
  const [categories, setCategories] = useState([]);
  const [filterBySourceOptions, setFilterBySourceOptions] = useState([]);

  const resetFilters = () => {
    setDateFilter("Date");
    setSourceFilter("All");
    setCategoryFilter("Default");
  };

  useEffect(() => {
    if (getArticlesSuccess) {
      resetFilters();
    }
  }, [getArticlesSuccess]);

  const handleSortByDate = (filterKey) => {
    setDateFilter(filterKey);
  };

  const handleSortBySource = (filterKey) => {
    setSourceFilter(filterKey);
  };

  const handleSortByCategory = (filterKey) => {
    setCategoryFilter(filterKey);
  };

  const filteredItems = useMemo(() => {
    const settings = JSON.parse(localStorage.getItem("newsAppSettings")) || {};
    const authors = settings?.authors;
    let items = filteredNews;
    const articlesCategories = extractUniqueCategoriesFromApis(items);
    const apiSources = extractUniqueSourcesFromApis(items);

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
    // Filter by Sources
    if (sourceFilter !== "All") {
      items = filterBySource(items, sourceFilter?.toLowerCase());
    }

    // Filter by Category
    if (categoryFilter !== "Default") {
      items = filterByCategory(items, categoryFilter?.toLowerCase());
    }

    // Checks categories from all articles and set them to Categories
    if (articlesCategories) {
      setCategories([
        { label: "Default", filterKey: "Default" },
        ...articlesCategories,
      ]);
    }

    // Checks sources from all articles and set them to Sources
    if (apiSources) {
      setFilterBySourceOptions([
        { label: "All", filterKey: "All" },
        ...apiSources,
      ]);
    }
    return items;
  }, [filteredNews, searchParams, dateFilter, sourceFilter, categoryFilter]);

  return (
    <div className="w-full m-auto mb-5">
      <div className="lg:w-3/4 md:w-11/12 m-auto flex flex-col md:flex-row gap-3 justify-end relative mb-6">
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
