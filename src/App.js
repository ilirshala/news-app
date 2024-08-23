import { useNewsAppSettings } from "./hooks/useNewsAppSettingsHook";
import { useGetArticles } from "./hooks/useGetArticlesHook";
import Home from "./pages/home";

function App() {
  // Fetch articles when selectedCategory changes
  useGetArticles();

  // Initialize app settings on mount
  useNewsAppSettings();

  return (
    <div className="w-full">
      <Home />
    </div>
  );
}

export default App;
