export const NEWS_API_BASE_URL = process.env.REACT_APP_NEWS_API_ORG_BASE_URL;
export const GUARDIAN_BASE_URL = process.env.REACT_APP_GUARDIAN_BASE_URL;
export const NYTIMES_BASE_URL = process.env.REACT_APP_NYTIMES_BASE_URL;

export const NEWS_API_KEY = process.env.REACT_APP_NEWS_API_ORG_API_KEY;
export const GUARDIAN_API_KEY = process.env.REACT_APP_GUARDIAN_API_KEY;
export const NYTIMES_API_KEY = process.env.REACT_APP_NYTIMES_API_KEY;

export const articleCategories = [
  "Technology",
  "Sports",
  "Health",
  "Business",
  "Entertaiment",
];
export const articleSources = ["NewsAPI", "NY Times", "Guardian"];

export const sortByDateOptions = [
  {
    id: "newest",
    label: "Newest",
    filterKey: "newest",
  },
  {
    id: "oldest",
    label: "Oldest",
    filterKey: "oldest",
  },
];
