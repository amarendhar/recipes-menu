import { act, render, screen, within, waitFor } from "utils/test-utils";
import { render as rtlRender } from "@testing-library/react";
import { compiler } from "markdown-to-jsx";
import { Recipes } from ".";
import * as RecipeItem from "./RecipeItem";
import { prepareRecipes } from "./utils";
import { prepareRecipe } from "pages/Recipe/utils";
import { RecipeEntry, RecipesEntry } from "types";
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

  it("Should navigate to selected recipe-page", async () => {
    renderComponent();

    expect(window.location.pathname).toEqual("/");

    await waitFor(() => {
      screen.getByTestId("recipes-list");
    });

    const recipesList = screen.queryAllByTestId("recipe-item");

    act(() => {
      recipesList[3].click();
    });

    expect(window.location.pathname).toEqual(`/recipe/${recipes[3].id}`);

    // Navigate to selected recipe-page
    screen.getByTestId("recipe-loading");

    const recipe = prepareRecipe(mockRecipes.items[3] as RecipeEntry);
    await waitFor(() => {
      screen.getByTestId("recipe-container");
    });

    expect(
      (screen.getByTestId("recipe-image") as HTMLImageElement).src
    ).toContain(recipe?.image);
    expect(
      (screen.getByTestId("recipe-image") as HTMLImageElement).alt
    ).toEqual(recipe?.title);
    expect(screen.getByTestId("recipe-title").textContent).toEqual(
      recipe?.title
    );
    expect(screen.getByTestId("recipe-description").textContent).toEqual(
      rtlRender(compiler(recipe?.description as string)).container.textContent
    );

    const recipeTagsContainer = screen.getByTestId("recipe-tags-container");
    within(recipeTagsContainer).getByText("Tags:");

    const recipeTags = screen.getAllByTestId("recipe-tag");
    recipe?.tags?.forEach((tagName, key) => {
      const recipeTag = recipeTags[key];
      expect(recipeTag.textContent).toEqual(tagName);
    });

    expect(screen.getByTestId("recipe-chef").textContent).toEqual(
      `Chef:${recipe?.chef}`
    );
  });
});
