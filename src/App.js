import HomeBanner from "./components/home-banner";
import Articles from "./components/articles";
import Header from "./components/header";
import { useDispatch, useSelector } from "react-redux";
import { useEffect } from "react";
import { getNews } from "./store/actions/getNews.action";

function App() {
  const dispatch = useDispatch();
  const { selectedCategory } = useSelector((state) => state.getNews);

  useEffect(() => {
    dispatch(getNews(selectedCategory === "all" ? "latest" : selectedCategory));
  }, [dispatch, selectedCategory]);

  return (
    <div className="w-full">
      <Header />
      <HomeBanner />
      <Articles />{" "}
    </div>
  );
}

export default App;
