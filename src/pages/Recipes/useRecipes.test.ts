import { act, waitFor, renderHook } from "utils/test-utils";
import { useRecipes } from "./useRecipes";
import * as prepareRecipesUtils from "./utils/prepareRecipes";
import { prepareRecipes } from "./utils";
import * as globalConstants from "globalConstants";
import { RecipesEntry } from "types";
import mockRecipes from "mocks/__fixtures__/mockRecipes.json";

describe("# useRecipes", () => {
  const initialValues = {
    recipes: [],
    error: "",
    loading: false,
    loadMore: expect.any(Function),
  };

  const recipes = prepareRecipes(mockRecipes as RecipesEntry);

  it("Should return loading state true, when fetching recipes", async () => {
    const { result } = renderHook(() => useRecipes());

    expect(result.current).toEqual({
      ...initialValues,
      loading: true,
    });
  });

  it("Should fetch all the recipes-list", async () => {
    const { result } = renderHook(() => useRecipes());

    await waitFor(() => expect(result.current.loading).toEqual(false));

    expect(result.current).toEqual({
      ...initialValues,
      recipes,
    });
  });

  it("Should prepare recipes-list, when data is available", async () => {
    const prepareRecipesSpy = jest.spyOn(prepareRecipesUtils, "prepareRecipes");
    const { result } = renderHook(() => useRecipes());

    await waitFor(() => expect(result.current.loading).toEqual(false));

    expect(prepareRecipesSpy).toHaveBeenCalledWith(mockRecipes);
  });

  it("Should load more items based on cursor & limit, when loadMore is invoked", async () => {
    Object.defineProperty(globalConstants, "RECIPES_LIMIT", { value: 1 });
    const { result } = renderHook(() => useRecipes());

    await waitFor(() => expect(result.current.loading).toEqual(false));
    expect(result.current.recipes).toEqual(recipes.slice(0, 1));

    act(() => {
      result.current.loadMore();
    });
    await waitFor(() => {
      expect(result.current.recipes).toEqual(recipes.slice(0, 2));
    });

    act(() => {
      result.current.loadMore();
    });
    await waitFor(() => {
      expect(result.current.recipes).toEqual(recipes.slice(0, 3));
    });

    act(() => {
      result.current.loadMore();
    });
    await waitFor(() => {
      expect(result.current.recipes).toEqual(recipes.slice(0, 4));
    });
  });
});
