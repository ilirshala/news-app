import { useEffect } from "react";

export const useNewsAppSettings = () => {
  useEffect(() => {
    const newsAppSettings = localStorage.getItem("newsAppSettings");
    const userSettings = {
      categories: [
        "Technology",
        "Sports",
        "Health",
        "Business",
        "Entertaiment",
      ],
      sources: ["NewsAPI", "NY Times", "Guardian"],
      authors: [],
    };
    if (!newsAppSettings)
      localStorage.setItem("newsAppSettings", JSON.stringify(userSettings));
  }, []);
};
