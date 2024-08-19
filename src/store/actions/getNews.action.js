import axios from "axios";

export const GET_NEWS = "GET_NEWS";
export const GET_NEWS_SUCCESS = "GET_NEWS_SUCCESS";
export const GET_NEWS_FAILURE = "GET_NEWS_FAILURE";

export const FILTER_ARTICLES = "FILTER_ARTICLES";

export const getNews = (query) => {
  return (dispatch) => {
    dispatch({ type: GET_NEWS });

    const newsOrgApiKey = process.env.REACT_APP_NEWS_API_ORG_API_KEY;
    const guardianApiKey = process.env.REACT_APP_GUARDIAN_API_KEY;
    const nyTimesApiKey = process.env.REACT_APP_NYTIMES_API_KEY;

    const newsApiRequest = axios.get(
      `https://newsapi.org/v2/everything?q=${query}&apiKey=${newsOrgApiKey}`
    );
    const guardianRequest = axios.get(
      `https://content.guardianapis.com/search?q=${query}&api-key=${guardianApiKey}`
    );
    const nytRequest = axios.get(
      `https://api.nytimes.com/svc/search/v2/articlesearch.json?q=${query}&api-key=${nyTimesApiKey}`
    );

    axios
      .all([newsApiRequest, guardianRequest, nytRequest])
      .then(
        axios.spread((newsApiResponse, guardianResponse, nytResponse) => {
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

          const guardianArticles = guardianResponse.data.response.results.map(
            (article) => ({
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
            })
          );

          const nytArticles = nytResponse.data.response.docs.map((article) => ({
            title: article.headline.main,
            category: article.section_name || "General",
            source: "NYT",
            url: article.web_url,
            description: article.snippet,
            publishedAt: article.pub_date,
            author: article.byline?.original || "Unknown",
          }));

          const articles = [
            ...newsApiArticles,
            ...guardianArticles,
            ...nytArticles,
          ];

          dispatch({ type: GET_NEWS_SUCCESS, payload: articles });
        })
      )
      .catch((error) => {
        dispatch({ type: GET_NEWS_FAILURE, payload: error });
      });
  };
};
export const filterArticles = (searchTerm) => {
  return {
    type: FILTER_ARTICLES,
    payload: searchTerm,
  };
};
