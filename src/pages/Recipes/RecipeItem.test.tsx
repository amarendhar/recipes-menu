import { render, screen } from "utils/test-utils";
import { RecipeItem } from "./RecipeItem";
import { prepareRecipes } from "./utils";
import { RecipesItemData, RecipesEntry } from "types";
import mockRecipes from "mocks/__fixtures__/mockRecipes.json";

describe("# RecipeItem", () => {
  const recipes = prepareRecipes(mockRecipes as RecipesEntry);

  const renderComponent = (recipe: RecipesItemData) =>
    render(<RecipeItem recipe={recipe} />, { route: null });

  it("Should render recipe-item with recipe image and title", async () => {
    const recipe = recipes[0];
    const { container } = renderComponent(recipe);

    expect(screen.getByTestId("recipe-item").getAttribute("href")).toEqual(
      `/recipe/${recipe.id}`
    );
    expect(
      (screen.getByTestId("recipe-image") as HTMLImageElement).src
    ).toContain(recipe.image);
    expect(
      (screen.getByTestId("recipe-image") as HTMLImageElement).alt
    ).toEqual(recipe.title);
    expect(screen.getByTestId("recipe-name").textContent).toEqual(recipe.title);

    expect(container).toMatchSnapshot();
  });
});
