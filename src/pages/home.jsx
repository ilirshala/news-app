import React from "react";
import HomeBanner from "../components/home-banner";
import Articles from "../components/articles";
import { useSearchParams } from "react-router-dom";
import { useSelector } from "react-redux";
import SettingsModal from "../components/settings-modal";
import Header from "../components/header";
import { useSettingsModal } from "../hooks/useSettingsModalHook";

const Home = () => {
  const [searchParams] = useSearchParams();
  const { articles } = useSelector((state) => state.getArticles);
  const { isOpen, openModal, closeModal } = useSettingsModal();

  return (
    <>
      <SettingsModal isOpen={isOpen} onClose={closeModal} />
      <Header onClickSettings={openModal} />
      <HomeBanner />
      <Articles articles={articles} searchParams={searchParams.get("s")} />{" "}
    </>
  );
};

export default Home;
