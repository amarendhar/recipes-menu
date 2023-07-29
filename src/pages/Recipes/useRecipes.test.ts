import { waitFor, renderHook } from "utils/test-utils";
import { useRecipes } from "./useRecipes";
import * as prepareRecipesUtils from "./utils/prepareRecipes";
import { prepareRecipes } from "./utils";
import { RecipesData } from "types";
import mockRecipes from "../../__fixtures__/mockRecipes.json";

describe("# useRecipes", () => {
  const initialValues = {
    recipes: [],
    error: "",
    loading: false,
  };

  const recipes = prepareRecipes(mockRecipes as RecipesData);

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
});
