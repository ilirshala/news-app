import React from "react";
import ArticlesFilterDropdown from "../../articles-filter-dropdown";

const ArticlesFilters = ({
  sortByDateOptions,
  selectedSort,
  filterBySourceOptions,
  selectedSource,
}) => {
  return (
    <div className="lg:w-3/4 md:w-11/12 m-auto flex gap-3 justify-end relative mb-6">
      <ArticlesFilterDropdown items={sortByDateOptions} title={selectedSort} />
      <ArticlesFilterDropdown
        items={filterBySourceOptions}
        title={selectedSource}
      />
    </div>
  );
};

export default ArticlesFilters;
