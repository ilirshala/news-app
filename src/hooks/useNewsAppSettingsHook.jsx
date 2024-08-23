import { useEffect } from "react";
import { useSelector } from "react-redux";

export const useNewsAppSettings = () => {
  const { articles } = useSelector((state) => state.getArticles);

  // This useeffect will be runned when we got all articles and we dont have any user settings setted up
  useEffect(() => {
    const initializeSettings = () => {
      const sources = articles?.map((article) => article?.source);
      const categories = articles
        ?.map((article) => article?.category)
        .filter(
          (category, index, self) =>
            index === self.findIndex((c) => c === category)
        );
      const uniqueSources = sources.filter(
        (source, index, self) => index === self.findIndex((s) => s === source)
      );

      const defaultSettings = {
        categories: categories,
        sources: uniqueSources,
        authors: [],
      };

      localStorage.setItem("newsAppSettings", JSON.stringify(defaultSettings));
    };

    const newsAppSettings = localStorage.getItem("newsAppSettings");

    if (!newsAppSettings && articles.length > 0) {
      initializeSettings();
    }
  }, [articles]);
};
