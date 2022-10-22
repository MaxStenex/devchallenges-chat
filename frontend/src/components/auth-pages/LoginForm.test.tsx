import { act, fireEvent, render, screen } from "@testing-library/react";
import { api } from "api";
import { LoginForm } from "./LoginForm";

describe("LoginForm", () => {
  it("If user not found show error message", async () => {
    jest.spyOn(api, "post").mockRejectedValue({
      response: {
        status: 401,
      },
    });

    const { getByText, getByTestId } = render(<LoginForm />);

    const emailInput = getByTestId("test-email");
    const passwordInput = getByTestId("test-password");

    fireEvent.change(emailInput, { target: { value: "email@email.com" } });
    fireEvent.change(passwordInput, { target: { value: "password" } });

    const loginBtn = getByText("Login");

    await act(() => {
      fireEvent.click(loginBtn);
    });

    expect(screen.getAllByText("Invalid email or password")[0]).toBeInTheDocument();
  });
});
