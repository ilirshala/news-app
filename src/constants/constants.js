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

export const categories = [
  { label: "General", filterKey: "general" },
  { label: "Business", filterKey: "business" },
  { label: "Entertainment", filterKey: "entertainment" },
  { label: "Health", filterKey: "health" },
  { label: "Science", filterKey: "science" },
  { label: "Sports", filterKey: "sports" },
  { label: "Technology", filterKey: "technology" },
  { label: "Politics", filterKey: "politics" },
  { label: "World", filterKey: "world" },
  { label: "Education", filterKey: "education" },
  { label: "Lifestyle", filterKey: "lifestyle" },
  { label: "Travel", filterKey: "travel" },
  { label: "Food", filterKey: "food" },
  { label: "Arts", filterKey: "arts" },
  { label: "Culture", filterKey: "culture" },
  { label: "Opinion", filterKey: "opinion" },
  { label: "Weather", filterKey: "weather" },
];
