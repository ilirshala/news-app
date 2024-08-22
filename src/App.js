import HomeBanner from "./components/home-banner";
import Articles from "./components/articles";
import Header from "./components/header";
import SettingsModal from "./components/settings-modal";
import { useNewsAppSettings } from "./hooks/useNewsAppSettingsHook";
import { useGetArticles } from "./hooks/useGetArticlesHook";
import { useSettingsModal } from "./hooks/useSettingsModalHook";
import { useSearchParams } from "react-router-dom";

function App() {
  const { isOpen, openModal, closeModal } = useSettingsModal();
  const [searchParams] = useSearchParams();

  // This hook will be called whenever selectedCategory changes
  useGetArticles();

  //This hook will be called when app mounts to check if user has settings or not
  useNewsAppSettings();
  console.log(searchParams.get("search"), "searhc");

  return (
    <div className="w-full">
      <SettingsModal isOpen={isOpen} onClose={closeModal} />
      <Header onClickSettings={openModal} />
      <HomeBanner />
      <Articles searchParams={searchParams.get("s")} />{" "}
    </div>
  );
}

export default App;
