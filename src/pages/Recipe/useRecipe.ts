import { useMemo } from "react";
import { useParams } from "react-router-dom";
import { useFetchRecipe } from "hooks";
import { prepareRecipe } from "./utils";

export const useRecipe = () => {
  const { recipeId } = useParams<{ recipeId: string }>();
  const { data, error, loading } = useFetchRecipe(recipeId);

  const recipe = useMemo(() => {
    return prepareRecipe(data);
  }, [data]);

  return { recipe, error, loading };
};
