import React from "react";
import HomeBanner from "../components/home-banner";
import Articles from "../components/articles";
import { useSearchParams } from "react-router-dom";
import { useSelector } from "react-redux";

const Home = () => {
  const [searchParams] = useSearchParams();
  const { filteredArticles } = useSelector((state) => state.getArticles);

  return (
    <>
      <HomeBanner />
      <Articles
        filteredArticles={filteredArticles}
        searchParams={searchParams.get("s")}
      />{" "}
    </>
  );
};

export default Home;
