import { api } from "api";
import { LoginFormInputs } from "components/auth-pages/LoginForm";
import { RegisterFormInputs } from "components/auth-pages/RegisterForm";

export const login = ({ email, password }: LoginFormInputs) => {
  return api.post("auth/login", {
    email,
    password,
  });
};

export const register = ({
  email,
  username,
  password,
}: Omit<RegisterFormInputs, "confirmPassword">) => {
  return api.post("auth/register", {
    email,
    password,
    username,
  });
};

export const authMe = () => {
  return api.get("auth/me");
};

export const logout = () => {
  return api.post("auth/logout");
};
