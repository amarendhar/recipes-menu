import { Entry, EntryCollection, EntrySkeletonType } from "contentful";

export type Maybe<T> = T | null;

export type RecipesData = EntryCollection<EntrySkeletonType, undefined, string>;
export type RecipeData = Entry<EntrySkeletonType, undefined, string>;

export type RecipeListItem = {
  id: string;
  title: string;
  image: string;
  tags: string[];
  description: string;
  chef: string;
};
