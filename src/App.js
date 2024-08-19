import HomeBanner from "./components/home-banner";
import Articles from "./components/articles";
import Header from "./components/header";
import { useDispatch, useSelector } from "react-redux";
import { useEffect, useState } from "react";
import { getNews } from "./store/actions/getNews.action";

function App() {
  const dispatch = useDispatch();
  const { news } = useSelector((state) => state.getNews);
  const [searchValue, setSearchValue] = useState("");
  const [filterArticles, setFilterArticles] = useState(news);

  useEffect(() => {
    dispatch(getNews("latest"));
  }, []);

  useEffect(() => {
    if (news) setFilterArticles(news);
  }, [news]);

  const handleFilterSearch = (e) => {
    const searchTerm = e.target.value;
    console.log(searchTerm, "searchTerm");
    setSearchValue(searchTerm);

    const filteredArticles = news?.filter(
      (article) =>
        article?.webTitle?.toLowerCase().includes(searchTerm?.toLowerCase()) ||
        article?.title?.toLowerCase().includes(searchTerm?.toLowerCase())
    );
    console.log(filteredArticles, "filteredArticles");
    setFilterArticles(filteredArticles);
  };

  return (
    <div className="w-full">
      <Header
        searchValue={searchValue}
        handleFilterSearch={handleFilterSearch}
      />
      <HomeBanner />
      {/* <SearchBar /> */}
      <Articles news={filterArticles} />{" "}
    </div>
  );
}

export default App;
