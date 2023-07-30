import { waitFor, renderHook } from "utils/test-utils";
import { useFetchRecipe } from "./useFetchRecipe";
import mockRecipes from "mocks/__fixtures__/mockRecipes.json";

describe("# useFetchRecipe", () => {
  const initialValues = {
    data: null,
    error: "",
    loading: false,
  };

  const mockRecipe = mockRecipes.items[0];
  it("Should return loading state, when fetching recipe", async () => {
    const { result } = renderHook(() => useFetchRecipe(mockRecipe.sys.id));

    expect(result.current).toEqual({
      ...initialValues,
      loading: true,
    });
  });

  it("Should fetch recipe", async () => {
    const { result } = renderHook(() => useFetchRecipe(mockRecipe.sys.id));

    await waitFor(() => expect(result.current.loading).toEqual(false));

    expect(result.current).toEqual({
      ...initialValues,
      data: mockRecipe,
    });
  });
});
