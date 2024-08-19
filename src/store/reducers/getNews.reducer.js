// src/reducers/getNewsReducer.js

import {
  GET_NEWS,
  GET_NEWS_FAILURE,
  GET_NEWS_SUCCESS,
} from "../actions/getNews.action";

const initialState = {
  loading: false,
  news: [],
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
        loading: false,
        news: action.payload,
        error: "",
      };
    case GET_NEWS_FAILURE:
      return {
        loading: false,
        news: [],
        error: action.payload,
      };
    default:
      return state;
  }
};

export default getNewsReducer;
