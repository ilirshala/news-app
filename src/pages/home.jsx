import React from "react";
import HomeBanner from "../components/home-banner";
import Articles from "../components/articles";
import { useSearchParams } from "react-router-dom";
import { useSelector } from "react-redux";

const Home = () => {
  const [searchParams] = useSearchParams();
  const { filteredNews } = useSelector((state) => state.getNews);

  return (
    <>
      <HomeBanner />
      <Articles
        filteredNews={filteredNews}
        searchParams={searchParams.get("s")}
      />{" "}
    </>
  );
};

export default Home;
