import { fireEvent, renderHook } from "utils/test-utils";
import { useOnscroll } from "./useOnscroll";

describe("# useOnscroll", () => {
  it("Should invoke onScroll-callback, when scrolled to the bottom", () => {
    window.innerHeight = 500;
    Object.defineProperty(document, "documentElement", {
      value: {
        scrollTop: 0,
        scrollHeight: 1000,
      },
      writable: true,
    });

    const onScroll = jest.fn();
    renderHook(() => useOnscroll(onScroll));

    fireEvent.scroll(window);
    document.documentElement.scrollTop = 1000;
    fireEvent.scroll(window);

    expect(onScroll).toHaveBeenCalled();
  });
});
