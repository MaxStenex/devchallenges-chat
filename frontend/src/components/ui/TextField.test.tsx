import { render } from "@testing-library/react";
import { TextField } from "./";

describe("TextField", () => {
  it("Should display error if it passed in props", () => {
    const { getByTestId } = render(<TextField error="Test error" label="Label" />);
    const errorMessage = getByTestId("textfield-error");

    expect(errorMessage.textContent).toBe("Test error");
  });

  it("Should correctly concat passed classname", () => {
    const { container } = render(<TextField label="Label" className="test-classname" />);
    const fieldInput = container.querySelector("input");

    expect(fieldInput?.className).toBe("input-primary test-classname");
  });
});
