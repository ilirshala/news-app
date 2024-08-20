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
  console.log(sortedNews, "sortedNews");
  return sortedNews;
};

export const formatArticles = {
  NewsAPI: (response) => {
    return response.articles.map((article) => ({
      title: article.title,
      category: article.source.name || "NewsAPI",
      source: "NewsAPI",
      url: article.url,
      description: article.description,
      publishedAt: article.publishedAt,
      author: article.author || "Unknown",
    }));
  },
  Guardian: (response) => {
    return response.response.results.map((article) => ({
      title: article.webTitle,
      category: article.sectionName,
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
      title: article.headline.main,
      category: article.section_name || "General",
      source: "NYTimes",
      url: article.web_url,
      description: article.snippet,
      publishedAt: article.pub_date,
      author: article.byline?.original || "Unknown",
    }));
  },
};
