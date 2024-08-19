import {
  GET_NEWS,
  GET_NEWS_FAILURE,
  GET_NEWS_SUCCESS,
  FILTER_ARTICLES,
} from "../actions/getNews.action";

const initialState = {
  loading: false,
  news: [],
  filteredNews: [],
  error: "",
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
    default:
      return state;
  }
};

export default getNewsReducer;
