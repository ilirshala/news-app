import React, { useState, useEffect } from "react";
import { FiSettings } from "react-icons/fi"; // Importing settings icon from react-icons

const Header = () => {
  const [isScrolled, setIsScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 0) {
        setIsScrolled(true);
      } else {
        setIsScrolled(false);
      }
    };

    window.addEventListener("scroll", handleScroll);
    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  return (
    <header
      className={`px-3 fixed top-0 left-0 z-40 w-full flex items-center justify-center lg:justify-between md:px-20 lg:px-32 md:justify-between gap-2 lg:gap-0 p-4 transition-all duration-300 ${
        isScrolled ? "bg-white shadow-lg" : "bg-transparent"
      }`}
    >
      <div
        className={`text-xl font-bold ${
          isScrolled ? "text-black" : "text-white"
        }`}
      >
        newsApp
      </div>
      <div className="flex items-center space-x-4">
        <input
          type="text"
          placeholder="Search..."
          className={`p-2 w-64 border rounded-md focus:outline-none focus:ring focus:border-blue-300 bg-transparent ${
            isScrolled ? "text-black" : "text-white"
          }`}
        />
        <FiSettings
          className={`text-2xl cursor-pointer ${
            isScrolled ? "text-black" : "text-white"
          }`}
        />
      </div>
    </header>
  );
};

export default Header;
