import HomeBanner from "./components/home-banner";
import Articles from "./components/articles";
import Header from "./components/header";

function App() {
  return (
    <div className="w-full">
      <Header />
      <HomeBanner />
      {/* <SearchBar /> */}
      <Articles />{" "}
    </div>
  );
}

export default App;
