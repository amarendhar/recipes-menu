import { prepareRecipes } from "./prepareRecipes";
import { RecipesEntry } from "types";
import mockRecipes from "mocks/__fixtures__/mockRecipes.json";

describe("# prepareRepository", () => {
  it("Should return prepared recipes", () => {
    const recipes = prepareRecipes(mockRecipes as RecipesEntry);

    recipes.forEach((recipe) => {
      expect(recipe).toEqual({
        id: expect.any(String),
        title: expect.any(String),
        image: expect.any(String),
      });
    });

    expect(recipes).toMatchSnapshot();
  });
});
