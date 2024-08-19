import { useEffect } from "react";
import { useDispatch } from "react-redux";
import { getNews } from "./store/actions/getNews.action";
import ArticleList from "./components/ArticleList";
import SearchBar from "./components/SearchBar";

function App() {
  return (
    <div className="app">
      <SearchBar />
      <ArticleList />
    </div>
  );
}

export default App;
