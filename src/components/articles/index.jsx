import React, { useEffect, useMemo, useState } from "react";
import { useSelector } from "react-redux";
import ArticleCard from "../article-card";
import SkeletonCard from "../skeleton-card";
import {
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
    const userSources = settings?.sources;
    const userCategories = settings?.categories;
    let items = filteredNews;
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

    if (userSources) {
      const filterByUserSources = items?.filter((article) =>
        userSources.includes(article?.source)
      );
      const modifiedUserSourcesArray = userSources?.map((source) => ({
        label: source,
        filterKey: source,
      }));
      setFilterBySourceOptions([
        { label: "All", filterKey: "All" },
        ...modifiedUserSourcesArray,
      ]);
      items = filterByUserSources;
    }
    if (userCategories) {
      const modifiedUserCategories = userCategories?.map((category) => ({
        label: category,
        filterKey: category,
      }));
      setCategories([
        { label: "Default", filterKey: "Default" },
        ...modifiedUserCategories,
      ]);
      const filterByUserCategories = items?.filter((article) =>
        userCategories.includes(article?.category)
      );
      console.log(filterByUserCategories, "filterByUserCategories");
      items = filterByUserCategories;
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
