import { EntryFields, EntrySkeletonType } from "contentful";
import { Maybe, RecipeData, RecipeListItem } from "types";

type RecipeFields = {
  title: EntryFields.Text;
  photo: EntryFields.AssetLink;
  tags: EntryFields.Array<EntryFields.EntryLink<EntrySkeletonType>>;
  description: EntryFields.Text;
  chef: EntryFields.EntryLink<EntrySkeletonType>;
};

export const prepareRecipe = (
  data: Maybe<RecipeData>
): Maybe<RecipeListItem> => {
  if (!data) {
    return null;
  }

  const fields = data?.fields as RecipeFields;

  const id: string = data.sys.id;
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
};
