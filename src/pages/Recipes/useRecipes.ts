import { useMemo } from "react";
import { useFetchRecipes } from "hooks";
import { prepareRecipes } from "./utils";
import { Recipe } from "types";

type UseRecipesProps = {
  recipes: Recipe[];
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
