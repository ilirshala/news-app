import axios from "axios";
import {
  NEWS_API_BASE_URL,
  GUARDIAN_BASE_URL,
  NYTIMES_BASE_URL,
  NEWS_API_KEY,
  GUARDIAN_API_KEY,
  NYTIMES_API_KEY,
} from ".";

export const sourceRequests = (query, category, page = 1, pageSize = 20) => ({
  NewsAPI: () =>
    axios.get(
      `${NEWS_API_BASE_URL}${
        category === "home" ? "everything" : "top-headlines"
      }?${
        category !== "home" ? `category=${category}&` : ""
      }q=${query}&page=${page}&pageSize=${pageSize}&apiKey=${NEWS_API_KEY}`
    ),
  Guardian: () =>
    axios.get(
      `${GUARDIAN_BASE_URL}search?${
        category !== "home" ? `section=${category}&` : ""
      }q=${query}&page=${page}&page-size=${pageSize}&api-key=${GUARDIAN_API_KEY}`
    ),
  "NY Times": () =>
    axios.get(
      `${NYTIMES_BASE_URL}articlesearch.json?${
        category !== "home" ? `fq=news_desk:("${category}")&` : ""
      }q=${query}&page=${page}&api-key=${NYTIMES_API_KEY}`
    ),
});
