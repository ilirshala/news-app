import React from "react";
import banner from "../../assets/newsBanner.jpg";

const HomeBanner = () => {
  return (
    <div
      className="pl-8 flex items-center justify-start w-full text-white text-2xl mb-24"
      style={{
        backgroundImage: `url(${banner})`,
        backgroundSize: "cover",
        backgroundRepeat: "no-repeat",
        backgroundPosition: "center center",
        height: "31rem",
      }}
    >
      <h1 className="text-6xl ml-0 sm:ml-48 ">News</h1>
    </div>
  );
};

export default HomeBanner;
