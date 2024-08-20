import {
  GET_NEWS,
  GET_NEWS_FAILURE,
  GET_NEWS_SUCCESS,
  FILTER_ARTICLES,
  FILTER_BY_CATEGORY,
  FILTER_BY_SOURCE,
} from "../actions/getNews.action";

const initialState = {
  loading: false,
  news: [],
  filteredNews: [],
  error: "",
  selectedCategory: "all",
};

const getNewsReducer = (state = initialState, action) => {
  switch (action.type) {
    case GET_NEWS:
      return {
        ...state,
        loading: true,
      };
    case GET_NEWS_SUCCESS:
      return {
        ...state,
        loading: false,
        news: action.payload,
        filteredNews: action.payload,
        error: "",
      };
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
      };

    case FILTER_BY_CATEGORY:
      return {
        ...state,
        selectedCategory: action.payload,
      };
    case FILTER_BY_SOURCE:
      const source = action.payload?.toLowerCase();
      const filteredBySource = state.news.filter(
        (article) => article?.source?.toLowerCase() === source
      );
      console.log(filteredBySource, "filteredBySource");
      return {
        ...state,
        filteredNews: filteredBySource,
      };
    default:
      return state;
  }
};

export default getNewsReducer;
