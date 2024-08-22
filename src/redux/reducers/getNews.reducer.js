import { sortByDate } from "../../utils/utils";
import {
  GET_NEWS,
  GET_NEWS_FAILURE,
  GET_NEWS_SUCCESS,
  FILTER_ARTICLES,
  FILTER_BY_CATEGORY,
  FILTER_BY_SOURCE,
  FILTER_BY_DATE,
} from "../actions/types";

const initialState = {
  loading: false,
  news: [],
  filteredNews: [],
  error: "",
  selectedCategory: "all",
  selectedSource: "All",
  dateType: "Date",
  searchTerm: "",
};

const getNewsReducer = (state = initialState, action) => {
  switch (action.type) {
    case GET_NEWS:
      return {
        ...state,
        loading: true,
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
      };
    }
    case GET_NEWS_FAILURE:
      return {
        ...state,
        loading: false,
        news: [],
        filteredNews: [],
        error: action.payload,
      };
    case FILTER_ARTICLES:
      const searchTerm = action.payload.toLowerCase();
      const filteredArticles = state.news.filter(
        (article) =>
          article?.webTitle?.toLowerCase().includes(searchTerm) ||
          article?.title?.toLowerCase().includes(searchTerm)
      );
      return {
        ...state,
        filteredNews: filteredArticles,
        searchTerm: searchTerm,
      };
    case FILTER_BY_CATEGORY:
      return {
        ...state,
        selectedCategory: action.payload,
      };
    case FILTER_BY_SOURCE:
      const source = action.payload?.toLowerCase();

      if (!source || source === "all") {
        return {
          ...state,
          filteredNews: state.news,
        };
      }
      const filteredBySource = state.news.filter(
        (article) => article?.source?.toLowerCase() === source
      );
      return {
        ...state,
        filteredNews: filteredBySource,
        selectedSource: action.payload,
      };
    case FILTER_BY_DATE:
      const dateType = action.payload?.toLowerCase();
      const selectedSource = state.selectedSource.toLowerCase();
      const searchValue = state.searchTerm.toLowerCase();
      if (!dateType && !selectedSource) {
        return {
          ...state,
          filteredNews: state.news,
        };
      }

      const filtered = state.news.filter(
        (article) => article?.source?.toLowerCase() === selectedSource
      );

      const filterBySearchValue = state.news.filter((article) =>
        article.title.toLowerCase().includes(searchValue)
      );

      const sortedNews = sortByDate(
        selectedSource !== "all"
          ? filtered
          : searchValue.length > 0
          ? filterBySearchValue
          : state.news,
        dateType
      );
      return {
        ...state,
        filteredNews: sortedNews,
        dateType: action.payload,
      };
    default:
      return state;
  }
};

export default getNewsReducer;
