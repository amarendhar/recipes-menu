import { useMemo } from "react";
import { useFetchRecipe } from "hooks";
import { prepareRecipe } from "./utils";

export const useRecipe = () => {
  const { data, error, loading } = useFetchRecipe();
  
  const recipe = useMemo(() => {
    return prepareRecipe(data);
  }, [data]);
  
  return { recipe, error, loading };
};
