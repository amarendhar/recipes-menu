import {
  act,
  render,
  screen,
  within,
  waitFor,
  fireEvent,
} from "utils/test-utils";
import { Recipes } from ".";
import * as RecipeItem from "./RecipeItem";
import { prepareRecipes } from "./utils";
import { RecipesEntry } from "types";
import mockRecipes from "mocks/__fixtures__/mockRecipes.json";

describe("# Recipes", () => {
  const recipes = prepareRecipes(mockRecipes as RecipesEntry);

  const renderComponent = ({ route = "/" } = {}) =>
    render(<Recipes />, { route });

  it("Should render Loading-Component, when fetching recipes-list", async () => {
    renderComponent();

    screen.getByTestId("recipes-loading");
    expect(screen.queryByTestId("recipes-error")).not.toBeInTheDocument();
    expect(screen.queryByTestId("recipes-container")).not.toBeInTheDocument();
  });

  it("Should fetch and render recipes-list with recipe-items, when recipes-list data is available", async () => {
    const RecipeItemSpy = jest.spyOn(RecipeItem, "RecipeItem");
    renderComponent();

    await waitFor(() => {
      screen.getByTestId("recipes-list");
    });

    expect(RecipeItemSpy).toHaveBeenCalledTimes(recipes.length);

    const recipesList = screen.queryAllByTestId("recipe-item");
    recipes.forEach((recipe, key) => {
      const recipeItem = recipesList[key];

      expect(RecipeItemSpy).toHaveBeenCalledWith(
        {
          recipe,
          handleAddRating: expect.any(Function),
        },
        {}
      );
      expect(recipeItem.getAttribute("href")).toEqual(`/recipe/${recipe.id}`);

      expect(
        (within(recipeItem).getByTestId("recipe-image") as HTMLImageElement).src
      ).toContain(recipe.image);
      expect(
        (within(recipeItem).getByTestId("recipe-image") as HTMLImageElement).alt
      ).toEqual(recipe.title);
      expect(within(recipeItem).getByTestId("recipe-name").textContent).toEqual(
        recipe.title
      );
    });
  });

  it("Should navigate to selected recipe-page", async () => {
    renderComponent();

    expect(window.location.pathname).toEqual("/");

    await waitFor(() => {
      screen.getByTestId("recipes-list");
    });

    const recipesList = screen.queryAllByTestId("recipe-item");

    act(() => {
      recipesList[0].click();
    });

    expect(window.location.pathname).toEqual(`/recipe/${recipes[0].id}`);
  });

  it("Should update rating of a recipe, when rating is changed", async () => {
    renderComponent();

    await waitFor(() => {
      screen.getByTestId("recipes-list");
    });

    const recipeItem = screen.queryAllByTestId("recipe-item")[0];
    expect(
      (within(recipeItem).getByTestId("rating") as HTMLInputElement).value
    ).toEqual("0");

    act(() => {
      within(recipeItem).getByTestId("rating-3").click();
    });
    expect(
      (within(recipeItem).getByTestId("rating") as HTMLInputElement).value
    ).toEqual("3");
  });
});
