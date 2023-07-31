import { Entry, EntryFields, EntrySkeletonType } from "contentful";
import { Maybe, RecipesEntry, RecipesItemData } from "types";

type RecipeFields = {
  title: EntryFields.Text;
  photo: EntryFields.AssetLink;
  tags: EntryFields.Array<EntryFields.EntryLink<EntrySkeletonType>>;
  description: EntryFields.Text;
  chef: EntryFields.EntryLink<EntrySkeletonType>;
};

export const prepareRecipes = (
  data: Maybe<RecipesEntry>
): RecipesItemData[] => {
  if (!data?.items) {
    return [];
  }

  const recipes: RecipesItemData[] = data.items.map(
    (recipe: Entry<EntrySkeletonType, undefined, string>) => {
      const fields = recipe?.fields as RecipeFields;

      const id: string = recipe.sys.id;
      const title = fields?.title || "";
      const image = (fields?.photo?.fields?.file?.url || "") as string;
      const rating = 0;

      const recipeData: RecipesItemData = {
        id,
        title,
        image,
        rating,
      };

      return recipeData;
    }
  );

  return recipes;
};
