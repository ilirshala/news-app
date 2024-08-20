import HomeBanner from "./components/home-banner";
import Articles from "./components/articles";
import Header from "./components/header";
import SettingsModal from "./components/settings-modal";
import { useNewsAppSettings } from "./hooks/useNewsAppSettingsHook";
import { useGetArticles } from "./hooks/useGetArticlesHook";
import { useSettingsModal } from "./hooks/useSettingsModalHook";

function App() {
  const { isOpen, openModal, closeModal } = useSettingsModal();

  // This hook will be called whenever selectedCategory changes
  useGetArticles();

  //This hook will be called when app mounts to check if user has settings or not
  useNewsAppSettings();

  return (
    <div className="w-full">
      <SettingsModal isOpen={isOpen} onClose={closeModal} />
      <Header onClickSettings={openModal} />
      <HomeBanner />
      <Articles />{" "}
    </div>
  );
}

export default App;
