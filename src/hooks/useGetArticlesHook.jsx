import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getNews } from "../redux/actions/articles.action";

export const useGetArticles = () => {
  const dispatch = useDispatch();
  const { selectedCategory } = useSelector((state) => state.getNews);
  useEffect(() => {
    dispatch(
      getNews(
        selectedCategory === "home" ? "latest" : selectedCategory,
        selectedCategory
      )
    );
  }, [dispatch, selectedCategory]);
};
