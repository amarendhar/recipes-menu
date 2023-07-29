import { prepareRecipes } from "./prepareRecipes";
import { RecipesData } from "types";
import mockRecipes from "../../../__fixtures__/mockRecipes.json";

describe("# prepareRepository", () => {
  it("Should return prepared repository", () => {
    const recipes = prepareRecipes(mockRecipes as RecipesData);

    recipes.forEach((recipe) => {
      expect(recipe).toEqual({
        id: expect.any(String),
        title: expect.any(String),
        image: expect.any(String),
        tags: expect.any(Array<String>),
        description: expect.any(String),
        chefName: expect.any(String),
      });
    });

    expect(recipes).toMatchSnapshot();
  });
});
