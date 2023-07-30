import { Entry, EntryCollection, EntrySkeletonType } from "contentful";

export type Maybe<T> = T | null;

export type RecipesEntry = EntryCollection<
  EntrySkeletonType,
  undefined,
  string
>;

export type RecipeEntry = Entry<EntrySkeletonType, undefined, string>;

export type RecipeData = {
  id: string;
  title: string;
  image: string;
  tags: string[];
  description: string;
  chef: string;
};

export type RecipesItemData = Pick<RecipeData, "id" | "title" | "image">;
