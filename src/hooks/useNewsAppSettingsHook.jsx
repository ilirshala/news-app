import { useEffect } from "react";
import { useSelector } from "react-redux";

export const useNewsAppSettings = () => {
  const { filteredNews } = useSelector((state) => state.getNews);

  useEffect(() => {
    const initializeSettings = () => {
      const sources = filteredNews?.map((article) => article?.source);
      console.log(sources, "sources");

      const defaultSettings = {
        categories: [
          "Technology",
          "Sports",
          "Health",
          "Business",
          "Entertainment",
        ],
        sources: sources,
        authors: [],
      };

      localStorage.setItem("newsAppSettings", JSON.stringify(defaultSettings));
    };

    const newsAppSettings = localStorage.getItem("newsAppSettings");

    if (!newsAppSettings && filteredNews.length > 0) {
      initializeSettings();
    }
  }, [filteredNews]);
};
