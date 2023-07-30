import { render, screen, within, waitFor } from "utils/test-utils";
import { render as rtlRender } from "@testing-library/react";
import { compiler } from "markdown-to-jsx";
import { Recipe } from ".";
import { prepareRecipe } from "./utils";
import { RecipeEntry } from "types";
import mockRecipes from "mocks/__fixtures__/mockRecipes.json";

describe("# Recipe", () => {
  const renderComponent = ({
    route = `/recipe/${mockRecipes.items[0].sys.id}`,
  } = {}) => render(<Recipe />, { route });

  it("Should render Loading-Component, when fetching recipe", async () => {
    renderComponent();

    screen.getByTestId("recipe-loading");
    expect(screen.queryByTestId("recipe-error")).not.toBeInTheDocument();
    expect(screen.queryByTestId("recipe-container")).not.toBeInTheDocument();
  });

  it("Should fetch and render recipe with details image, title, description, tags and chef", async () => {
    const recipe = prepareRecipe(mockRecipes.items[3] as RecipeEntry);
    const { container } = renderComponent({
      route: `/recipe/${recipe?.id}`,
    });

    await waitFor(() => {
      screen.getByTestId("recipe-content");
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

    expect(container).toMatchSnapshot();
  });
});
