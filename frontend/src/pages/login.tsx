import { FormWrapper } from "components/auth-pages";
import { TextField } from "components/ui";
import React, { ReactElement } from "react";

const LoginPage = () => {
  return (
    <FormWrapper title="Welcome back!" linkHref="/register" linkText="Need an account?">
      <form>
        <div className="space-y-4">
          <TextField label="Email" />
          <TextField label="Password" />
        </div>
        <button className="btn-primary mt-8 block w-full">Login</button>
      </form>
    </FormWrapper>
  );
};

export default LoginPage;

LoginPage.getLayout = function getLayout(page: ReactElement) {
  return page;
};
