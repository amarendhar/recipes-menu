import { Entry, EntryFields, EntrySkeletonType } from "contentful";
import { Maybe, RecipeListItem, RecipesData } from "types";

type RecipeFields = {
  title: EntryFields.Text;
  photo: EntryFields.AssetLink;
  tags: EntryFields.Array<EntryFields.EntryLink<EntrySkeletonType>>;
  description: EntryFields.Text;
  chef: EntryFields.EntryLink<EntrySkeletonType>;
};

export const prepareRecipes = (data: Maybe<RecipesData>): RecipeListItem[] => {
  if (!data?.items) {
    return [];
  }

  const recipes: RecipeListItem[] = data.items.map(
    (recipe: Entry<EntrySkeletonType, undefined, string>) => {
      const fields = recipe?.fields as RecipeFields;

      const id: string = recipe.sys.id;
      const title = fields?.title || "";
      const image = (fields?.photo?.fields?.file?.url || "") as string;
      const tags =
        fields?.tags?.map((tag) => (tag?.fields?.name as string) || "") || [];
      const description = fields?.description || "";
      const chef = (fields?.chef?.fields?.name || "") as string;

      const recipeData: RecipeListItem = {
        id,
        title,
        image,
        tags,
        description,
        chef,
      };

      return recipeData;
    }
  );

  return recipes;
};
