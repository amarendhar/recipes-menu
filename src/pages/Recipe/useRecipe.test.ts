import { waitFor, renderHook } from "utils/test-utils";
import { useRecipe } from "./useRecipe";
import * as prepareRecipeUtils from "./utils/prepareRecipe";
import { prepareRecipe } from "./utils";
import { RecipeEntry } from "types";
import mockRecipes from "mocks/__fixtures__/mockRecipes.json";

describe("# useRecipe", () => {
  const initialValues = {
    recipe: null,
    error: "",
    loading: false,
  };

  it("Should return loading state true, when fetching recipe", async () => {
    const recipe = prepareRecipe(mockRecipes.items[0] as RecipeEntry);
    const { result } = renderHook(() => useRecipe(), {
      route: `/recipe/${recipe?.id}`,
    });

    expect(result.current).toEqual({
      ...initialValues,
      loading: true,
    });
  });

  it("Should fetch the recipe", async () => {
    const recipe = prepareRecipe(mockRecipes.items[1] as RecipeEntry);
    const { result } = renderHook(() => useRecipe(), {
      route: `/recipe/${recipe?.id}`,
    });

    await waitFor(() => expect(result.current.loading).toEqual(false));

    expect(result.current).toEqual({
      ...initialValues,
      recipe,
    });
  });

  it("Should prepare recipe, when data is available", async () => {
    const recipe = prepareRecipe(mockRecipes.items[2] as RecipeEntry);
    const prepareRecipeSpy = jest.spyOn(prepareRecipeUtils, "prepareRecipe");
    const { result } = renderHook(() => useRecipe(), {
      route: `/recipe/${recipe?.id}`,
    });

    await waitFor(() => expect(result.current.loading).toEqual(false));

    expect(prepareRecipeSpy).toHaveBeenCalledWith(mockRecipes.items[2]);
  });
});
