import { useEffect } from "react";

export const useNewsAppSettings = () => {
  useEffect(() => {
    const newsAppSettings = localStorage.getItem("newsAppSettings");
    const userSettings = {
      categories: [
        "All",
        "Technology",
        "Sports",
        "Health",
        "Business",
        "Entertaiment",
      ],
      sources: ["NewsAPI", "New York Times API", "Guardian API"],
      authors: [],
    };
    if (!newsAppSettings)
      localStorage.setItem("newsAppSettings", JSON.stringify(userSettings));
  }, []);
};
