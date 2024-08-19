import axios from "axios";

export const GET_NEWS = "GET_NEWS";
export const GET_NEWS_SUCCESS = "GET_NEWS_SUCCESS";
export const GET_NEWS_FAILURE = "GET_NEWS_FAILURE";

export const FILTER_ARTICLES = "FILTER_ARTICLES";

const newsOrgApiKey = process.env.REACT_APP_NEWS_API_ORG_API_KEY;
const guardianApiKey = process.env.REACT_APP_GUARDIAN_API_KEY;
const newsApiOrgBaseUrl = process.env.REACT_APP_NEWS_API_ORG_BASE_URL;

export const getNews = (query) => {
  return (dispatch) => {
    dispatch({ type: GET_NEWS });
    axios
      .all([
        axios.get(
          `https://newsapi.org/v2/everything?q=${query}&apiKey=${newsOrgApiKey}`
        ),
        axios.get(
          `https://content.guardianapis.com/search?q=${query}&api-key=${guardianApiKey}`
        ),
      ])
      .then(
        axios.spread((newsApiResponse, guardianResponse) => {
          const articles = [
            ...newsApiResponse.data.articles,
            ...guardianResponse.data.response.results,
          ];
          dispatch({ type: GET_NEWS_SUCCESS, payload: articles });
        })
      )
      .catch((error) => {
        dispatch({ type: GET_NEWS_FAILURE, paylaod: error });
      });
  };
};

export const filterArticles = (searchTerm) => {
  return {
    type: FILTER_ARTICLES,
    payload: searchTerm,
  };
};
