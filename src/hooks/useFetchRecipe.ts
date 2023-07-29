import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { useContentful } from "api";
import { Maybe, RecipeData } from "types";
import mockRecipe from "../__fixtures__/mockRecipe.json";

type UseFetchRecipeProps = {
  data: Maybe<RecipeData>;
  error: string;
  loading: boolean;
};

export const useFetchRecipe = (): UseFetchRecipeProps => {
  const contentfulClient = useContentful();
  const { recipeId } = useParams<{ recipeId: string }>();
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
