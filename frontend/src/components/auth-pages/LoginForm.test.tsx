import { act, fireEvent, render, screen } from "@testing-library/react";
import { api } from "api";
import { useRouter } from "next/router";
import { LoginForm } from "./LoginForm";

jest.mock("next/router", () => ({
  useRouter: jest.fn().mockReturnValue({ push: jest.fn() }),
}));

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

  it("After successful login redirect user to home page", async () => {
    const router = useRouter();

    jest.spyOn(api, "post").mockResolvedValue({ data: {} });

    const email = "test@test.com";
    const password = "test@test.com";

    const { getByText, getByTestId } = render(<LoginForm />);

    const emailInput = getByTestId("test-email");
    const passwordInput = getByTestId("test-password");

    fireEvent.change(emailInput, { target: { value: email } });
    fireEvent.change(passwordInput, { target: { value: password } });

    const loginBtn = getByText("Login");

    await act(() => {
      fireEvent.click(loginBtn);
    });

    expect(router.push).toBeCalled();
  });
});