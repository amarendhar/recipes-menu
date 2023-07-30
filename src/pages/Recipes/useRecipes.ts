import { useState, useEffect } from "react";
import { useFetchRecipes } from "hooks";
import { prepareRecipes } from "./utils";
import { RecipesItemData } from "types";

type UseRecipesProps = {
  recipes: RecipesItemData[];
  error: string;
  loading: boolean;
  loadMore: () => void;
};

export const useRecipes = (limit?: number): UseRecipesProps => {
  const { data, error, loading, loadMore } = useFetchRecipes(limit);
  const [recipes, setRecipes] = useState<RecipesItemData[]>([]);

  useEffect(() => {
    const newRecipes = prepareRecipes(data);

    setRecipes((prevRecipes) => [...prevRecipes, ...newRecipes]);
  }, [data]);

  return { recipes, error, loading, loadMore };
};
