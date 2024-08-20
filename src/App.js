import HomeBanner from "./components/home-banner";
import Articles from "./components/articles";
import Header from "./components/header";
import { useDispatch, useSelector } from "react-redux";
import { useEffect, useState } from "react";
import { getNews } from "./store/actions/getNews.action";
import SettingsModal from "./components/settings-modal";

function App() {
  const dispatch = useDispatch();
  const { selectedCategory } = useSelector((state) => state.getNews);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const openModal = () => setIsModalOpen(true);
  const closeModal = () => setIsModalOpen(false);

  useEffect(() => {
    dispatch(getNews(selectedCategory === "all" ? "latest" : selectedCategory));
  }, [dispatch, selectedCategory]);

  useEffect(() => {
    const newsAppSettings = localStorage.getItem("newsAppSettings");
    const userSettings = {
      categories: [
        "All",
        "Technology",
        "Sports",
        "Health",
        "Business",
        "Entertaiment",
      ],
      sources: ["NewsAPI", "New York Times API", "Guardian API"],
      authors: [],
    };
    if (!newsAppSettings)
      localStorage.setItem("newsAppSettings", JSON.stringify(userSettings));
  }, []);

  return (
    <div className="w-full">
      <SettingsModal isOpen={isModalOpen} onClose={closeModal} />
      <Header onClickSettings={openModal} />
      <HomeBanner />
      <Articles />{" "}
    </div>
  );
}

export default App;
