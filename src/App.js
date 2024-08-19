import HomeBanner from "./components/home-banner";
import Articles from "./components/articles";
import Header from "./components/header";
import { useDispatch } from "react-redux";
import { useEffect } from "react";
import { getNews } from "./store/actions/getNews.action";

function App() {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getNews("latest"));
  }, []);

  return (
    <div className="w-full">
      <Header />
      <HomeBanner />
      <Articles />{" "}
    </div>
  );
}

export default App;
