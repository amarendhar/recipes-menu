import { Entry, EntryFields, EntrySkeletonType } from "contentful";
import { Maybe, RecipeData, RecipesData } from "types";

type RecipeFields = {
  title: EntryFields.Text;
  photo: EntryFields.AssetLink;
  tags: EntryFields.Array<EntryFields.EntryLink<EntrySkeletonType>>;
  description: EntryFields.Text;
  chef: EntryFields.EntryLink<EntrySkeletonType>;
};

export const prepareRecipes = (data: Maybe<RecipesData>): RecipeData[] => {
  if (!data?.items) {
    return [];
  }

  const recipes: RecipeData[] = data.items.map(
    (recipe: Entry<EntrySkeletonType, undefined, string>) => {
      const fields = recipe?.fields as RecipeFields;

      const id: string = recipe.sys.id;
      const title = fields?.title || "";
      const image = (fields?.photo?.fields?.file?.url || "") as string;
      const tags =
        fields?.tags?.map((tag) => (tag?.fields?.name as string) || "") || [];
      const description = fields?.description || "";
      const chefName = (fields?.chef?.fields?.name || "") as string;

      const recipeData: RecipeData = {
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
