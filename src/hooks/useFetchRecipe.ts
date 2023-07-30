import { useState, useEffect } from "react";
import { useContentful } from "api";
import { Maybe, RecipeEntry } from "types";
import mockRecipe from "mocks/__fixtures__/mockRecipe.json";

type UseFetchRecipeProps = {
  data: Maybe<RecipeEntry>;
  error: string;
  loading: boolean;
};

export const useFetchRecipe = (recipeId?: string): UseFetchRecipeProps => {
  const contentfulClient = useContentful();
  const [data, setData] = useState<Maybe<RecipeEntry>>(null);
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
        // setData(mockRecipe as RecipeEntry);
        setLoading(false);
      } catch (error) {
        console.error("Error in fetching recipe -> ", error);
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
