import { combineReducers } from "redux";
import { thunk } from "redux-thunk";
import { createStore, applyMiddleware } from "redux";
import getNewsReducer from "./reducers/getNews.reducer";

export const rootReducer = combineReducers({
  getNews: getNewsReducer,
});

export const store = createStore(rootReducer, applyMiddleware(thunk));
