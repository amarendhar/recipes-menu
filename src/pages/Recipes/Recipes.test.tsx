import { act, render, screen, within, waitFor } from "utils/test-utils";
import { Recipes } from ".";
import * as RecipeItem from "./RecipeItem";
import { prepareRecipes } from "./utils";
import { RecipesData } from "types";
import mockRecipes from "../../__fixtures__/mockRecipes.json";

describe("# Recipes", () => {
  const recipes = prepareRecipes(mockRecipes as RecipesData);

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

      expect(RecipeItemSpy).toHaveBeenCalledWith({ recipe }, {});
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
});
