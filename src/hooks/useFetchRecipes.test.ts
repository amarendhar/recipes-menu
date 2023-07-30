import { act, waitFor, renderHook } from "utils/test-utils";
import { useFetchRecipes } from "./useFetchRecipes";
import * as globalConstants from "globalConstants";
import mockRecipes from "mocks/__fixtures__/mockRecipes.json";

describe("# useFetchRecipes", () => {
  const initialValues = {
    data: null,
    error: "",
    loading: false,
    cursor: 0,
    loadMore: expect.any(Function),
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

  it("Should update cursor and load new-data for the given cursor & limit, when loadMore is invoked", async () => {
    Object.defineProperty(globalConstants, "RECIPES_LIMIT", { value: 1 });
    const { result } = renderHook(() => useFetchRecipes());

    await waitFor(() => expect(result.current.loading).toEqual(false));
    expect(result.current.cursor).toEqual(0);
    expect(result.current.data).toEqual({
      ...mockRecipes,
      items: mockRecipes.items.slice(0, 1),
    });

    act(() => {
      result.current.loadMore();
    });
    await waitFor(() => {
      expect(result.current.cursor).toEqual(1);
    });
    expect(result.current.loading).toEqual(true);
    await waitFor(() => {
      expect(result.current.data).toEqual({
        ...mockRecipes,
        items: mockRecipes.items.slice(1, 2),
      });
    });

    act(() => {
      result.current.loadMore();
    });
    await waitFor(() => {
      expect(result.current.cursor).toEqual(2);
    });
    expect(result.current.loading).toEqual(true);
    await waitFor(() => {
      expect(result.current.data).toEqual({
        ...mockRecipes,
        items: mockRecipes.items.slice(2, 3),
      });
    });

    act(() => {
      result.current.loadMore();
    });
    await waitFor(() => {
      expect(result.current.cursor).toEqual(3);
    });
    expect(result.current.loading).toEqual(true);
    await waitFor(() => {
      expect(result.current.data).toEqual({
        ...mockRecipes,
        items: mockRecipes.items.slice(3, 4),
      });
    });
  });
});
