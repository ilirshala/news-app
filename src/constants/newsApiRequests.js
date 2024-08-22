import axios from "axios";
import {
  NEWS_API_BASE_URL,
  GUARDIAN_BASE_URL,
  NYTIMES_BASE_URL,
  NEWS_API_KEY,
  GUARDIAN_API_KEY,
  NYTIMES_API_KEY,
} from "./constants";

export const sourceRequests = (query, category) => ({
  NewsAPI: () =>
    axios.get(
      `${NEWS_API_BASE_URL}${
        category === "all" ? "everything" : "top-headlines"
      }?${
        category !== "all" ? `category=${category}&` : ""
      }q=${query}&apiKey=${NEWS_API_KEY}`
    ),
  Guardian: () =>
    axios.get(
      `${GUARDIAN_BASE_URL}search?${
        category !== "all" ? `section=${category}&` : ""
      }q=${query}&api-key=${GUARDIAN_API_KEY}`
    ),
  "NY Times": () =>
    axios.get(
      `${NYTIMES_BASE_URL}articlesearch.json?${
        category !== "all" ? `fq=news_desk:("${category}")&` : ""
      }q=${query}&api-key=${NYTIMES_API_KEY}`
    ),
});
