import {
  Entry,
  EntryFields,
  EntryCollection,
  EntrySkeletonType,
} from "contentful";
import { Maybe, Recipe } from "types";

type RecipeFields = {
  title: EntryFields.Text;
  photo: EntryFields.AssetLink;
  tags: EntryFields.Array<EntryFields.EntryLink<EntrySkeletonType>>;
  description: EntryFields.Text;
  chef: EntryFields.EntryLink<EntrySkeletonType>;
};

export const prepareRecipes = (
  data: Maybe<EntryCollection<EntrySkeletonType, undefined, string>>
): Recipe[] => {
  if (!data?.items) {
    return [];
  }

  const recipes: Recipe[] = data.items.map(
    (recipe: Entry<EntrySkeletonType, undefined, string>) => {
      const fields = recipe?.fields as RecipeFields;

      const id: string = recipe.sys.id;
      const title = fields?.title || "";
      const image = (fields?.photo?.fields?.file?.url || "") as string;
      const tags = fields?.tags?.map(
        (tag) => (tag?.fields?.name as string) || ""
      );
      const description = fields?.description || "";
      const chefName = (fields?.chef?.fields?.name || "") as string;

      const recipeData: Recipe = {
        id,
        title,
        image,
        tags,
        description,
        chefName,
      };

      return recipeData;
    }
  );

  return recipes;
};
