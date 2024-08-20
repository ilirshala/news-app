import axios from "axios";
import {
  NEWS_API_BASE_URL,
  GUARDIAN_BASE_URL,
  NYTIMES_BASE_URL,
  NEWS_API_KEY,
  GUARDIAN_API_KEY,
  NYTIMES_API_KEY,
} from "./constants";

export const sourceRequests = (query) => ({
  NewsAPI: () =>
    axios.get(
      `${NEWS_API_BASE_URL}everything?q=${query}&apiKey=${NEWS_API_KEY}`
    ),
  Guardian: () =>
    axios.get(
      `${GUARDIAN_BASE_URL}search?q=${query}&api-key=${GUARDIAN_API_KEY}`
    ),
  "NY Times": () =>
    axios.get(
      `${NYTIMES_BASE_URL}articlesearch.json?q=${query}&api-key=${NYTIMES_API_KEY}`
    ),
});
