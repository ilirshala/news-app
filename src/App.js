import { useEffect } from "react";
import { useDispatch } from "react-redux";
import { getNews } from "./store/actions/getNews.action";
import ArticleList from "./components/ArticleList";
import SearchBar from "./components/SearchBar";

function App() {
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(getNews("latest"));
  }, []);
  return (
    <div className="app">
      <SearchBar />
      <ArticleList />
      <h1 className="text-3xl font-bold underline">Hello world!</h1>
    </div>
  );
}

export default App;
