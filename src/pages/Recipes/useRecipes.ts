import { useState, useEffect, useCallback } from "react";
import { useFetchRecipes } from "hooks";
import { prepareRecipes } from "./utils";
import { RecipesItemData } from "types";

export type UseRecipesProps = {
  recipes: RecipesItemData[];
  error: string;
  loading: boolean;
  loadMore: () => void;
  handleAddRating: (value: { recipeId: string; rating: number }) => void;
};

export const useRecipes = (): UseRecipesProps => {
  const { data, error, loading, loadMore } = useFetchRecipes();
  const [recipes, setRecipes] = useState<RecipesItemData[]>([]);

  useEffect(() => {
    const preparedRecipes = prepareRecipes(data);

    setRecipes((prevRecipes) => [...prevRecipes, ...preparedRecipes]);
  }, [data]);

  const handleAddRating = useCallback(
    ({ recipeId, rating }: { recipeId: string; rating: number }) => {
      setRecipes((prevRecipes) =>
        prevRecipes.map((prevRecipe) => ({
          ...prevRecipe,
          rating: recipeId === prevRecipe.id ? rating : prevRecipe.rating,
        }))
      );
    },
    []
  );

  return { recipes, error, loading, loadMore, handleAddRating };
};
