import { api } from "api";
import { LoginFormInputs } from "components/auth-pages/LoginForm";

export const login = ({ email, password }: LoginFormInputs) => {
  return api.post("auth/login", {
    email,
    password,
  });
};

export const authMe = () => {
  return api.get("auth/me");
};
