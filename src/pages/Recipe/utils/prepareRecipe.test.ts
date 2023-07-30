import { prepareRecipe } from "./prepareRecipe";
import { RecipeData } from "types";
import mockRecipes from "mocks/__fixtures__/mockRecipes.json";

describe("# prepareRecipe", () => {
  it("Should return prepared recipe", () => {
    const recipe = prepareRecipe(mockRecipes.items[3] as RecipeData);

    expect(recipe).toEqual({
      id: expect.any(String),
      title: expect.any(String),
      image: expect.any(String),
      tags: expect.any(Array<String>),
      description: expect.any(String),
      chef: expect.any(String),
    });

    expect(recipe).toMatchSnapshot();
  });
});
