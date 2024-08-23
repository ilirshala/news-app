import React from "react";
import HomeBanner from "../components/home-banner";
import Articles from "../components/articles";
import { useSearchParams } from "react-router-dom";
import { useSelector } from "react-redux";

const Home = () => {
  const [searchParams] = useSearchParams();
  const { articles } = useSelector((state) => state.getArticles);

  return (
    <>
      <HomeBanner />
      <Articles articles={articles} searchParams={searchParams.get("s")} />{" "}
    </>
  );
};

export default Home;
