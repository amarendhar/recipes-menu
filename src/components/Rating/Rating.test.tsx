import { act, render, screen } from "utils/test-utils";
import { Rating } from ".";

describe("# Rating", () => {
  const initialProps = {
    value: 0,
    onChange: jest.fn(),
  };
  const renderComponent = () =>
    render(<Rating {...initialProps} />, { route: null });

  it("Should update rating, when rating is changed", async () => {
    const { container } = renderComponent();

    expect((screen.getByTestId("rating") as HTMLInputElement).value).toEqual(
      "0"
    );

    act(() => {
      screen.getByTestId("rating-3").click();
    });
    expect(initialProps.onChange).toHaveBeenCalledWith(3);
    expect((screen.getByTestId("rating") as HTMLInputElement).value).toEqual(
      "3"
    );

    expect(container).toMatchSnapshot();
  });

  it("Should re-render with new rating value, when new value-prop is passed", async () => {
    const newProps = {
      value: 3,
      onChange: jest.fn(),
    };

    const { rerender } = renderComponent();
    expect((screen.getByTestId("rating") as HTMLInputElement).value).toEqual(
      "0"
    );

    rerender(<Rating {...newProps} />);
    expect((screen.getByTestId("rating") as HTMLInputElement).value).toEqual(
      "3"
    );
  });
});
