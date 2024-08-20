import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getNews } from "../store/actions/getNews.action";

export const useGetArticles = () => {
  const dispatch = useDispatch();
  const { selectedCategory } = useSelector((state) => state.getNews);
  useEffect(() => {
    dispatch(getNews(selectedCategory === "all" ? "latest" : selectedCategory));
  }, [dispatch, selectedCategory]);
};
