import { useState, useEffect } from "react";
import { EntryCollection, EntrySkeletonType } from "contentful";
import { client } from "utils";
import { Maybe } from "types";
import { CONTENT_TYPE } from "globalConstants";
// import mockRecipes from "../__fixtures__/mockRecipes.json";

type UseFetchRecipesProps = {
  data: Maybe<EntryCollection<EntrySkeletonType, undefined, string>>;
  error: string;
  loading: boolean;
};

export const useFetchRecipes = (): UseFetchRecipesProps => {
  const [data, setData] = useState<Maybe<UseFetchRecipesProps["data"]>>(null);
  const [error, setError] = useState("");
  const [loading, setLoading] = useState<boolean>(true);

  useEffect(() => {
    const fetchRecipes = async () => {
      try {
        setLoading(true);
        setError("");

        const data = await client.getEntries({
          content_type: CONTENT_TYPE,
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
  }, []);

  return { data, error, loading };
};
