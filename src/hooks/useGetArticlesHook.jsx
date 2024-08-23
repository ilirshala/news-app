import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getArticles } from "../redux/actions/articles.action";

export const useGetArticles = () => {
  const dispatch = useDispatch();
  const { selectedCategory } = useSelector((state) => state.getArticles);
  useEffect(() => {
    dispatch(
      getArticles(
        selectedCategory === "home" ? "latest" : selectedCategory,
        selectedCategory
      )
    );
  }, [dispatch, selectedCategory]);
};
