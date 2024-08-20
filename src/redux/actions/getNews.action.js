import axios from "axios";
import {
  FILTER_ARTICLES,
  FILTER_BY_CATEGORY,
  FILTER_BY_DATE,
  FILTER_BY_SOURCE,
  GET_NEWS,
  GET_NEWS_FAILURE,
  GET_NEWS_SUCCESS,
} from "./types";

export const getNews = (query) => {
  return (dispatch) => {
    dispatch({ type: GET_NEWS });

    const newsOrgApiKey = process.env.REACT_APP_NEWS_API_ORG_API_KEY;
    const guardianApiKey = process.env.REACT_APP_GUARDIAN_API_KEY;
    const nyTimesApiKey = process.env.REACT_APP_NYTIMES_API_KEY;

    // Retrieve the selected sources from localStorage
    const settings = JSON.parse(localStorage.getItem("newsAppSettings"));
    const selectedSources = settings?.sources || [];

    // Create an array to hold the promises
    let requests = [];

    if (selectedSources.includes("NewsAPI")) {
      const newsApiRequest = axios.get(
        `https://newsapi.org/v2/everything?q=${query}&apiKey=${newsOrgApiKey}`
      );
      requests.push(newsApiRequest);
    }

    if (selectedSources.includes("Guardian")) {
      const guardianRequest = axios.get(
        `https://content.guardianapis.com/search?q=${query}&api-key=${guardianApiKey}`
      );
      requests.push(guardianRequest);
    }

    if (selectedSources.includes("NY Times")) {
      const nytRequest = axios.get(
        `https://api.nytimes.com/svc/search/v2/articlesearch.json?q=${query}&api-key=${nyTimesApiKey}`
      );
      requests.push(nytRequest);
    }

    // Check if there are any selected sources
    if (requests.length > 0) {
      axios
        .all(requests)
        .then(
          axios.spread((...responses) => {
            let articles = [];

            if (selectedSources.includes("NewsAPI")) {
              const newsApiResponse = responses[0];
              const newsApiArticles = newsApiResponse.data.articles.map(
                (article) => ({
                  title: article.title,
                  category: article.source.name || "NewsAPI",
                  source: "NewsAPI",
                  url: article.url,
                  description: article.description,
                  publishedAt: article.publishedAt,
                  author: article.author || "Unknown",
                })
              );
              articles = articles.concat(newsApiArticles);
            }

            if (selectedSources.includes("Guardian")) {
              const guardianResponse =
                selectedSources.includes("NewsAPI") && responses.length > 1
                  ? responses[1]
                  : responses[0];
              const guardianArticles =
                guardianResponse.data.response.results.map((article) => ({
                  title: article.webTitle,
                  category: article.sectionName,
                  source: "Guardian",
                  url: article.webUrl,
                  description:
                    article.fields?.trailText ||
                    article.fields?.bodyText ||
                    "No description available",
                  publishedAt: article.webPublicationDate,
                  author: article.fields?.byline || "Unknown",
                }));
              articles = articles.concat(guardianArticles);
            }

            if (selectedSources.includes("NY Times")) {
              const nytResponse =
                selectedSources.includes("NewsAPI") &&
                selectedSources.includes("Guardian") &&
                responses.length > 2
                  ? responses[2]
                  : selectedSources.includes("NewsAPI") ||
                    selectedSources.includes("Guardian")
                  ? responses[1]
                  : responses[0];
              const nytArticles = nytResponse.data.response.docs.map(
                (article) => ({
                  title: article.headline.main,
                  category: article.section_name || "General",
                  source: "NYT",
                  url: article.web_url,
                  description: article.snippet,
                  publishedAt: article.pub_date,
                  author: article.byline?.original || "Unknown",
                })
              );
              articles = articles.concat(nytArticles);
            }

            dispatch({ type: GET_NEWS_SUCCESS, payload: articles });
          })
        )
        .catch((error) => {
          dispatch({ type: GET_NEWS_FAILURE, payload: error });
        });
    } else {
      // Handle case where no sources are selected
      dispatch({ type: GET_NEWS_FAILURE, payload: "No sources selected" });
    }
  };
};

export const filterArticles = (searchTerm) => {
  return {
    type: FILTER_ARTICLES,
    payload: searchTerm,
  };
};
export const filterByCategory = (category) => {
  return {
    type: FILTER_BY_CATEGORY,
    payload: category,
  };
};

export const filterBySource = (source) => {
  return {
    type: FILTER_BY_SOURCE,
    payload: source,
  };
};

export const filterByDate = (type) => {
  return {
    type: FILTER_BY_DATE,
    payload: type,
  };
};
