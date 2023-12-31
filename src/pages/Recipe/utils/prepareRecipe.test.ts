import { prepareRecipe } from "./prepareRecipe";
import { RecipeEntry } from "types";
import mockRecipes from "mocks/__fixtures__/mockRecipes.json";

describe("# prepareRecipe", () => {
  it("Should return prepared recipe", () => {
    const recipe = prepareRecipe(mockRecipes.items[3] as RecipeEntry);

    expect(recipe).toEqual({
      id: expect.any(String),
      title: expect.any(String),
      image: expect.any(String),
      tags: expect.any(Array<String>),
      description: expect.any(String),
      chef: expect.any(String),
      rating: expect.any(Number),
    });

    expect(recipe).toMatchSnapshot();
  });
});
