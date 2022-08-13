import { render, screen } from "@testing-library/react";
import { LoginForm } from "./LoginForm";

describe("LoginForm", () => {
  it("Renders a login button", () => {
    render(<LoginForm />);

    const loginBtn = screen.getByText("Login");

    expect(loginBtn).toBeInTheDocument();
  });
});
