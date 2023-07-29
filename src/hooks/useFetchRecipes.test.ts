import { waitFor, renderHook } from "utils/test-utils";
import { useFetchRecipes } from "./useFetchRecipes";
import mockRecipes from "../__fixtures__/mockRecipes.json";

describe("# useFetchRecipes", () => {
  const initialValues = {
    data: null,
    error: "",
    loading: false,
  };

  it("Should return loading state, when fetching recipes-list", async () => {
    const { result } = renderHook(() => useFetchRecipes());

    expect(result.current).toEqual({
      ...initialValues,
      loading: true,
    });
  });

  it("Should fetch recipes-list", async () => {
    const { result } = renderHook(() => useFetchRecipes());

    await waitFor(() => expect(result.current.loading).toEqual(false));

    expect(result.current).toEqual({
      ...initialValues,
      data: mockRecipes,
    });
  });
});
