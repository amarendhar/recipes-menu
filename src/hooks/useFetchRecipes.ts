import { useState, useEffect } from "react";
import { useContentful } from "api";
import { CONTENTFUL_CONTENT_TYPE } from "globalConstants";
import { Maybe, RecipesData } from "types";
// import mockRecipes from "../__fixtures__/mockRecipes.json";

export type UseFetchRecipesProps = {
  data: Maybe<RecipesData>;
  error: string;
  loading: boolean;
};

export const useFetchRecipes = (): UseFetchRecipesProps => {
  const contentfulClient = useContentful();
  const [data, setData] = useState<Maybe<RecipesData>>(null);
  const [error, setError] = useState("");
  const [loading, setLoading] = useState<boolean>(true);

  useEffect(() => {
    const fetchRecipes = async () => {
      try {
        setLoading(true);
        setError("");

        const data = await contentfulClient.getEntries({
          content_type: CONTENTFUL_CONTENT_TYPE,
        });

        setData(data);
        // setData(mockRecipes);
        setLoading(false);
      } catch (error) {
        setData(null);
        setError(String(error));
        setLoading(false);
      }
    };

    fetchRecipes();
  }, [contentfulClient]);

  return { data, error, loading };
};
