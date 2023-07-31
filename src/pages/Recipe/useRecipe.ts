import { useState, useEffect, useCallback } from "react";
import { useParams } from "react-router-dom";
import { useFetchRecipe } from "hooks";
import { prepareRecipe } from "./utils";
import { Maybe, RecipeData } from "types";

export type UseRecipeReturnProps = {
  Recipe: Maybe<RecipeData>;
  error: string;
  loading: boolean;
  handleAddRating: (value: number) => void;
};

export const useRecipe = () => {
  const { recipeId } = useParams<{ recipeId: string }>();
  const { data, error, loading } = useFetchRecipe(recipeId);
  const [recipe, setRecipe] = useState<Maybe<RecipeData>>(null);

  useEffect(() => {
    const preparedRecipe = prepareRecipe(data);

    setRecipe(preparedRecipe);
  }, [data]);

  const handleAddRating = useCallback((rating: number) => {
    setRecipe((prevRecipe) => {
      if (!prevRecipe) {
        return null;
      }

      return { ...prevRecipe, rating };
    });
  }, []);

  return { recipe, error, loading, handleAddRating };
};
