import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getNews } from "../redux/actions/getNews.action";

export const useGetArticles = () => {
  const dispatch = useDispatch();
  const { selectedCategory, selectedSource } = useSelector(
    (state) => state.getNews
  );
  useEffect(() => {
    dispatch(
      getNews(
        selectedCategory === "all" ? "latest" : selectedCategory,
        selectedSource,
        selectedCategory
      )
    );
  }, [dispatch, selectedCategory, selectedSource]);
};
