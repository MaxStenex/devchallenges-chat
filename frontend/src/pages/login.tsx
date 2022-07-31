import { FormWrapper, LoginForm } from "components/auth-pages";
import React, { ReactElement } from "react";

const LoginPage = () => {
  return (
    <FormWrapper title="Welcome back!" linkHref="/register" linkText="Need an account?">
      <LoginForm />
    </FormWrapper>
  );
};

export default LoginPage;

LoginPage.getLayout = function getLayout(page: ReactElement) {
  return page;
};
