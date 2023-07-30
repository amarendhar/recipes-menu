import { useState, useEffect } from "react";
import { useContentful } from "api";
import { Maybe, RecipeData } from "types";
import mockRecipe from "mocks/__fixtures__/mockRecipe.json";

type UseFetchRecipeProps = {
  data: Maybe<RecipeData>;
  error: string;
  loading: boolean;
};

export const useFetchRecipe = (recipeId?: string): UseFetchRecipeProps => {
  const contentfulClient = useContentful();
  const [data, setData] = useState<Maybe<RecipeData>>(null);
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (!recipeId) {
      return;
    }

    const fetchRecipe = async () => {
      try {
        setLoading(true);
        setError("");

        const data = await contentfulClient.getEntry(recipeId);
        setData(data);
        // setData(mockRecipe as RecipeData);
        setLoading(false);
      } catch (error) {
        console.log("Error -> ", error);
        setData(null);
        setError(String(error));
        setLoading(false);
      }
    };

    fetchRecipe();
  }, [recipeId, contentfulClient]);

  return {
    data,
    error,
    loading,
  };
};
