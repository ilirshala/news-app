import HomeBanner from "./components/home-banner";
import Articles from "./components/articles";

function App() {
  return (
    <div className="w-full">
      <HomeBanner />
      {/* <SearchBar /> */}
      <Articles />{" "}
    </div>
  );
}

export default App;
