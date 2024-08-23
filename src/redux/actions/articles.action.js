import {
  FILTER_BY_CATEGORY,
  GET_NEWS,
  GET_NEWS_FAILURE,
  GET_NEWS_SUCCESS,
} from "./types";
import { sourceRequests } from "../../constants/newsApiRequests";
import { formatArticles } from "../../utils/utils";

export const getAricles = (query, selectedCategory) => {
  return async (dispatch) => {
    dispatch({ type: GET_NEWS });

    try {
      const sources = ["NewsAPI", "Guardian", "NY Times"];
      const requests = sources.map((source) =>
        sourceRequests(query, selectedCategory)[source]()
      );

      const results = await Promise.allSettled(requests);

      const articles = results.flatMap((result, index) => {
        if (result.status === "fulfilled") {
          const source = sources[index];
          return formatArticles[source.replace(" ", "")](result.value.data);
        } else {
          console.error(`${sources[index]} failed:`, result.reason.message);
          return [];
        }
      });

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
