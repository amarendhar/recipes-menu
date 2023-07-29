import { EntryCollection, EntrySkeletonType } from "contentful";

export type Maybe<T> = T | null;

export type RecipesData = EntryCollection<EntrySkeletonType, undefined, string>;

export type RecipeData = {
  id: string;
  title: string;
  image: string;
  tags: string[];
  description: string;
  chefName: string;
};
