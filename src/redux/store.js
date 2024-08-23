import { combineReducers } from "redux";
import { thunk } from "redux-thunk";
import { createStore, applyMiddleware } from "redux";
import getArticlesReducer from "./reducers/articles.reducer";

export const rootReducer = combineReducers({
  getArticles: getArticlesReducer,
});

export const store = createStore(rootReducer, applyMiddleware(thunk));
