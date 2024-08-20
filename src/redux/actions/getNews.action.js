import axios from "axios";
import {
  FILTER_ARTICLES,
  FILTER_BY_CATEGORY,
  FILTER_BY_DATE,
  FILTER_BY_SOURCE,
  GET_NEWS,
  GET_NEWS_FAILURE,
  GET_NEWS_SUCCESS,
} from "./types";
import { sourceRequests } from "../../constants/newsApiRequests";
import { formatArticles } from "../../utils/utils";

export const getNews = (query) => {
  return async (dispatch) => {
    dispatch({ type: GET_NEWS });
    try {
      const settings =
        JSON.parse(localStorage.getItem("newsAppSettings")) || {};
      const selectedSources = settings.sources || [];

      if (selectedSources.length === 0) {
        throw new Error("No sources selected");
      }

      const requests = selectedSources.map((source) =>
        sourceRequests(query)[source]()
      );

      const responses = await axios.all(requests);

      const articles = responses.flatMap((response, index) => {
        const source = selectedSources[index];
        return formatArticles[source.replace(" ", "")](response.data);
      });

      dispatch({ type: GET_NEWS_SUCCESS, payload: articles });
    } catch (error) {
      dispatch({ type: GET_NEWS_FAILURE, payload: error.message });
    }
  };
};

export const filterArticles = (searchTerm) => {
  return {
    type: FILTER_ARTICLES,
    payload: searchTerm,
  };
};
export const filterByCategory = (category) => {
  return {
    type: FILTER_BY_CATEGORY,
    payload: category,
  };
};

export const filterBySource = (source) => {
  return {
    type: FILTER_BY_SOURCE,
    payload: source,
  };
};

export const filterByDate = (type) => {
  return {
    type: FILTER_BY_DATE,
    payload: type,
  };
};
