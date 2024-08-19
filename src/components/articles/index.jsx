import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import ArticleCard from "../article-card";
import { getNews } from "../../store/actions/getNews.action";

const guardianApiKey = process.env.REACT_APP_GUARDIAN_API_KEY;
const Articles = ({ articles }) => {
  const dispatch = useDispatch();
  // const { news } = useSelector((state) => state.getNews);

  const [article, setArticle] = useState([]);

  useEffect(() => {
    dispatch(getNews("latest"));
  }, []);

  useEffect(() => {
    const fetchNews = async (query) => {
      await fetch(
        `https://content.guardianapis.com/search?q=${query}&api-key=${guardianApiKey}`
      )
        .then((response) => response.json())
        .then((json) => {
          console.log(json.response.results, "json");
          setArticle(json?.response?.results);
        });
    };
    fetchNews("latest");
  }, []);
  return (
    <div className="w-11/12 lg:w-2/3 m-auto flex items-center gap-4 flex-wrap">
      <ArticleCard article={article} />
      {article?.map((article) => (
        <ArticleCard article={article} key={article.id} />
        // <div key={article.id} className="bg-white shadow-md rounded-lg p-4">
        //   <h2 className="text-xl font-bold">
        //     {article.title || article.webTitle}
        //   </h2>
        //   <p>{article.description}</p>
        //   <a
        //     href={article.url || article.webUrl}
        //     target="_blank"
        //     rel="noopener noreferrer"
        //   >
        //     Read more
        //   </a>
        // </div>
      ))}
    </div>
  );
};

export default Articles;
