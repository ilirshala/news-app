import { sortByDate } from "../../utils/utils";
import {
  GET_NEWS,
  GET_NEWS_FAILURE,
  GET_NEWS_SUCCESS,
  FILTER_BY_CATEGORY,
} from "../actions/types";

const initialState = {
  getArticlesSuccess: false,
  loading: false,
  news: [],
  filteredNews: [],
  error: "",
  selectedCategory: "home",
};

const getNewsReducer = (state = initialState, action) => {
  switch (action.type) {
    case GET_NEWS:
      return {
        ...state,
        loading: true,
        getArticlesSuccess: false,
      };
    case GET_NEWS_SUCCESS: {
      let news = action.payload;
      if (state.dateType) {
        news = sortByDate(news, state.dateType.toLowerCase());
      }
      return {
        ...state,
        loading: false,
        news,
        filteredNews: news,
        error: "",
        getArticlesSuccess: true,
      };
    }
    case GET_NEWS_FAILURE:
      return {
        ...state,
        loading: false,
        news: [],
        filteredNews: [],
        error: action.payload,
        getArticlesSuccess: false,
      };
    case FILTER_BY_CATEGORY:
      return {
        ...state,
        selectedCategory: action.payload,
      };
    default:
      return state;
  }
};

export default getNewsReducer;
