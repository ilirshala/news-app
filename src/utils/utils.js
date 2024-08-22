import { v4 as uuidv4 } from "uuid";
export function formatTimestamp(timestamp) {
  const date = new Date(timestamp);

  const options = {
    day: "2-digit",
    month: "short",
    year: "numeric",
  };

  const formatter = new Intl.DateTimeFormat("en-GB", options);
  return formatter.format(date);
}

export const sortByDate = (items, dateType) => {
  const sortedNews = [...items].sort((a, b) => {
    const dateA = a.publishedAt;
    const dateB = b.publishedAt;

    if (dateType === "newest") {
      return new Date(dateB) - new Date(dateA);
    } else {
      return new Date(dateA) - new Date(dateB);
    }
  });
  return sortedNews;
};

export const formatArticles = {
  NewsAPI: (response) => {
    return response.articles
      .map((article) => ({
        id: article?.id || uuidv4(),
        title: article.title,
        category: article.category || "NewsAPI",
        source: article.source.name || "NewsApi",
        url: article.url,
        description: article.description,
        publishedAt: article.publishedAt,
        author: article.author || "Unknown",
      }))
      .filter((article) => article?.title !== "[Removed]");
  },
  Guardian: (response) => {
    return response.response.results.map((article) => ({
      id: article?.id || uuidv4(),
      title: article.webTitle,
      category: article.sectionName || "General",
      source: "Guardian",
      url: article.webUrl,
      description:
        article.fields?.trailText ||
        article.fields?.bodyText ||
        "No description available",
      publishedAt: article.webPublicationDate,
      author: article.fields?.byline || "Unknown",
    }));
  },
  NYTimes: (response) => {
    return response.response.docs.map((article) => ({
      id: article?.id || uuidv4(),
      title: article.headline.main,
      category: article.section_name || "General",
      source: article?.source || "NY Times",
      url: article.web_url,
      description: article.snippet,
      publishedAt: article.pub_date,
      author: article.byline?.original || "Unknown",
    }));
  },
};

export const filterBySource = (items, source) => {
  return items?.filter(
    (item) => item.source.toLowerCase() === source?.toLowerCase()
  );
};

export const filterByAuthors = (items, authors) => {
  return items.filter((article) =>
    authors?.some((author) => article.author?.includes(author))
  );
};

export const filterBySearch = (items, searchParams) => {
  return items.filter((article) =>
    article.title?.toLowerCase().includes(searchParams.toLowerCase())
  );
};

export const filterByCategory = (items, category) => {
  return items?.filter((item) =>
    item.category.toLowerCase().includes(category)
  );
};

export const extractUniqueCategoriesFromApis = (items) => {
  const articleCategories = items.map((article) => ({
    label: article?.category,
    filterKey: article?.category,
  }));

  const uniqueCategories = articleCategories.filter(
    (category, index, self) =>
      index === self.findIndex((c) => c.filterKey === category.filterKey)
  );
  return uniqueCategories;
};

export const extractUniqueSourcesFromApis = (items) => {
  const sources = items.map((article) => ({
    label: article?.source,
    filterKey: article?.source,
  }));

  const uniqueSources = sources.filter(
    (source, index, self) =>
      index === self.findIndex((s) => s.filterKey === source.filterKey)
  );
  return uniqueSources;
};
