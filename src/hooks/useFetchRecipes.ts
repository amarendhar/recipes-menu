import { useState, useEffect, useCallback } from "react";
import { useContentful } from "api";
import { RECIPES_LIMIT, CONTENTFUL_CONTENT_TYPE } from "globalConstants";
import { Maybe, RecipesEntry } from "types";

export type UseFetchRecipesProps = {
  data: Maybe<RecipesEntry>;
  error: string;
  loading: boolean;
  cursor: number;
  loadMore: () => void;
};

export const useFetchRecipes = (): UseFetchRecipesProps => {
  const contentfulClient = useContentful();
  const [data, setData] = useState<Maybe<RecipesEntry>>(null);
  const [error, setError] = useState("");
  const [loading, setLoading] = useState<boolean>(true);
  const [cursor, setCursor] = useState<number>(0);

  useEffect(() => {
    const fetchRecipes = async () => {
      try {
        setLoading(true);
        setError("");

        const data = await contentfulClient.getEntries({
          content_type: CONTENTFUL_CONTENT_TYPE,
          skip: cursor,
          limit: RECIPES_LIMIT,
        });

        setData(data);
        setLoading(false);
      } catch (error) {
        console.error("Error in fetching recipes -> ", error);
        setData(null);
        setError(String(error));
        setLoading(false);
      }
    };

    fetchRecipes();
  }, [contentfulClient, cursor]);

  const loadMore = useCallback(() => {
    if (!data?.total) {
      return;
    }

    const newCursor = cursor + RECIPES_LIMIT;
    const hasMoreRecipes = newCursor < data.total;

    if (hasMoreRecipes && !loading) {
      setCursor(newCursor);
    }
  }, [data?.total, cursor, loading]);

  return { data, error, loading, cursor, loadMore };
};
