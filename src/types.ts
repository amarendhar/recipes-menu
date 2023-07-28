export type Maybe<T> = T | null;

export type Recipe = {
  id: string;
  title: string;
  image: string;
  tags: string[];
  description: string;
  chefName: string;
};
