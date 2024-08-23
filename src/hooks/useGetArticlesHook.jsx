import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getAricles } from "../redux/actions/articles.action";

export const useGetArticles = () => {
  const dispatch = useDispatch();
  const { selectedCategory } = useSelector((state) => state.getArticles);
  useEffect(() => {
    dispatch(
      getAricles(
        selectedCategory === "home" ? "latest" : selectedCategory,
        selectedCategory
      )
    );
  }, [dispatch, selectedCategory]);
};
