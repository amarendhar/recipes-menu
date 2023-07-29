import { useMemo } from "react";
import { useFetchRecipes } from "hooks";
import { prepareRecipes } from "./utils";
import { RecipeListItem } from "types";

type UseRecipesProps = {
  recipes: RecipeListItem[];
  error: string;
  loading: boolean;
};

export const useRecipes = (): UseRecipesProps => {
  const { data, error, loading } = useFetchRecipes();

  const recipes = useMemo(() => {
    return prepareRecipes(data);
  }, [data]);

  return { recipes, error, loading };
};
