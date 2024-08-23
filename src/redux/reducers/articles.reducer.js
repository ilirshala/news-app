import {
  GET_ARTICLES,
  GET_ARTICLES_FAILURE,
  GET_ARTICLES_SUCCESS,
  FILTER_BY_CATEGORY,
} from "../actions/types";

const initialState = {
  success: false,
  loading: false,
  articles: [],
  error: "",
  selectedCategory: "home",
};

const getArticlesReducer = (state = initialState, action) => {
  switch (action.type) {
    case GET_ARTICLES:
      return {
        ...state,
        loading: true,
        success: false,
      };
    case GET_ARTICLES_SUCCESS: {
      let articles = action.payload;
      return {
        ...state,
        loading: false,
        articles,
        error: "",
        success: true,
      };
    }
    case GET_ARTICLES_FAILURE:
      return {
        ...state,
        loading: false,
        articles: [],
        error: action.payload,
        success: false,
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

export default getArticlesReducer;
