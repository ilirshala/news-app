import axios from "axios";
import {
  FILTER_BY_CATEGORY,
  GET_NEWS,
  GET_NEWS_FAILURE,
  GET_NEWS_SUCCESS,
} from "./types";
import { sourceRequests } from "../../constants/newsApiRequests";
import { formatArticles } from "../../utils/utils";

export const getNews = (query, selectedSource, selectedCategory) => {
  return async (dispatch) => {
    dispatch({ type: GET_NEWS });

    try {
      const settings =
        JSON.parse(localStorage.getItem("newsAppSettings")) || {};
      const selectedSources = settings.sources || [];

      if (selectedSources.length === 0) {
        throw new Error("No sources selected");
      }

      let articles = [];

      if (selectedSource?.toLowerCase() === "all") {
        const requests = selectedSources.map((source) =>
          sourceRequests(query, selectedCategory)[source]()
        );

        const responses = await axios.all(requests);
        articles = responses.flatMap((response, index) => {
          const source = selectedSources[index];
          return formatArticles[source.replace(" ", "")](response.data);
        });
      } else if (selectedSources.includes(selectedSource)) {
        const response = await sourceRequests(query, selectedCategory)[
          selectedSource
        ]();
        articles = formatArticles[selectedSource.replace(" ", "")](
          response.data
        );
      } else {
        throw new Error("Selected source not found in settings");
      }

      dispatch({ type: GET_NEWS_SUCCESS, payload: articles });
    } catch (error) {
      dispatch({ type: GET_NEWS_FAILURE, payload: error.message });
    }
  };
};

export const filterByCategory = (category) => {
  return {
    type: FILTER_BY_CATEGORY,
    payload: category,
  };
};
