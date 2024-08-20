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
