import { useEffect } from "react";
import { useSelector } from "react-redux";

export const useNewsAppSettings = () => {
  const { filteredArticles } = useSelector((state) => state.getArticles);

  useEffect(() => {
    const initializeSettings = () => {
      const sources = filteredArticles?.map((article) => article?.source);
      const categories = filteredArticles
        ?.map((article) => article?.category)
        .filter(
          (category, index, self) =>
            index === self.findIndex((c) => c === category)
        );
      const uniqueSources = sources.filter(
        (source, index, self) => index === self.findIndex((s) => s === source)
      );
      console.log(sources, "sources");

      const defaultSettings = {
        categories: categories,
        sources: uniqueSources,
        authors: [],
      };

      localStorage.setItem("newsAppSettings", JSON.stringify(defaultSettings));
    };

    const newsAppSettings = localStorage.getItem("newsAppSettings");

    if (!newsAppSettings && filteredArticles.length > 0) {
      initializeSettings();
    }
  }, [filteredArticles]);
};
